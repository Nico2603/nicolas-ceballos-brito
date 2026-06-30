import { spawn, type ChildProcess } from 'node:child_process'
import { createServer } from 'node:net'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import chromium from '@sparticuz/chromium'
import puppeteer, { type Browser } from 'puppeteer'
import puppeteerCore from 'puppeteer-core'
import { PRERENDER_ROUTES } from '../src/constants/seo-routes.ts'
import { SITE_URL } from '../src/constants/social.ts'

const isVercelBuild = process.env.VERCEL === '1'

async function launchBrowser(): Promise<Browser> {
  if (isVercelBuild) {
    return puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    }) as Promise<Browser>
  }

  return puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
}

const DIST_DIR = resolve(process.cwd(), 'dist')

async function getAvailablePort(): Promise<number> {
  return new Promise((resolvePort, reject) => {
    const server = createServer()
    server.unref()
    server.on('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      if (!address || typeof address === 'string') {
        server.close()
        reject(new Error('Could not resolve preview port'))
        return
      }
      const { port } = address
      server.close(() => resolvePort(port))
    })
  })
}

function waitForServer(url: string, timeoutMs = 60_000): Promise<void> {
  const start = Date.now()

  return new Promise((resolvePromise, reject) => {
    const check = async () => {
      try {
        const response = await fetch(url)
        if (response.ok) {
          resolvePromise()
          return
        }
      } catch {
        // Server not ready yet
      }

      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Preview server did not start within ${timeoutMs}ms`))
        return
      }

      setTimeout(check, 500)
    }

    void check()
  })
}

function startPreview(port: number): ChildProcess {
  const child = spawn(
    process.platform === 'win32' ? 'npm.cmd' : 'npm',
    ['run', 'preview', '--', '--port', String(port), '--strictPort', '--host', '127.0.0.1'],
    {
      cwd: process.cwd(),
      stdio: 'pipe',
      shell: process.platform === 'win32',
      env: { ...process.env },
    },
  )

  child.stdout?.on('data', (chunk: Buffer) => {
    const message = chunk.toString()
    if (message.includes('Local:')) console.log(message.trim())
  })

  child.stderr?.on('data', (chunk: Buffer) => {
    const message = chunk.toString().trim()
    if (message) console.error(message)
  })

  return child
}

function outputPathForRoute(routePath: string): string {
  if (routePath === '/') return resolve(DIST_DIR, 'index.html')
  const normalized = routePath.replace(/^\//, '').replace(/\/$/, '')
  return resolve(DIST_DIR, normalized, 'index.html')
}

function waitSelectorForRoute(routePath: string): string {
  switch (routePath) {
    case '/':
      return '#inicio'
    case '/about':
      return '#about-pro'
    case '/repositories':
      return 'main h1'
    default:
      return 'main h1'
  }
}

async function prerenderRoute(browser: Browser, previewUrl: string, routePath: string): Promise<void> {
  const page = await browser.newPage()
  const url = `${previewUrl}${routePath === '/' ? '/' : routePath}`
  const expectedCanonical =
    routePath === '/' ? `${SITE_URL}/` : `${SITE_URL}${routePath}`
  const routeSelector = waitSelectorForRoute(routePath)

  await page.goto(url, { waitUntil: 'networkidle0', timeout: 90_000 })
  await page.waitForSelector('#root', { timeout: 30_000 })
  await page.waitForSelector(routeSelector, { timeout: 45_000 })
  await page.waitForFunction(
    (canonical) => {
      const link = document.querySelector('link[rel="canonical"]')
      return link?.getAttribute('href') === canonical
    },
    { timeout: 45_000 },
    expectedCanonical,
  )

  const html = await page.content()
  const outputPath = outputPathForRoute(routePath)
  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, html, 'utf8')
  console.log(`Prerendered ${routePath} -> ${outputPath}`)
  await page.close()
}

async function main(): Promise<void> {
  const port = await getAvailablePort()
  const previewUrl = `http://127.0.0.1:${port}`
  const preview = startPreview(port)

  try {
    await waitForServer(previewUrl)
    const browser = await launchBrowser()

    try {
      for (const route of PRERENDER_ROUTES) {
        await prerenderRoute(browser, previewUrl, route.path)
      }
    } finally {
      await browser.close()
    }
  } finally {
    preview.kill('SIGTERM')
  }

  console.log(`Prerender complete: ${PRERENDER_ROUTES.length} routes`)
}

main().catch((error: unknown) => {
  console.error('Prerender failed:', error)
  process.exit(1)
})
