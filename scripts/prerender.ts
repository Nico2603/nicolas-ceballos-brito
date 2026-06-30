import { spawn, type ChildProcess } from 'node:child_process'
import { createServer } from 'node:net'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import chromium from '@sparticuz/chromium'
import puppeteer, { type Browser } from 'puppeteer'
import puppeteerCore from 'puppeteer-core'
import { PRERENDER_ROUTES } from '../src/constants/seo-routes.ts'
import { FULL_NAME } from '../src/constants/social.ts'

const ROUTE_TITLES: Record<string, string> = {
  '/': `${FULL_NAME} — Portafolio Profesional`,
  '/about': `Acerca de mí — ${FULL_NAME}`,
  '/repositories': `Repositorios — ${FULL_NAME}`,
  '/desarrollo-web': `Desarrollo Web — ${FULL_NAME}`,
  '/inteligencia-artificial': `Inteligencia Artificial — ${FULL_NAME}`,
  '/analisis-datos': `Análisis de Datos — ${FULL_NAME}`,
}

import { PROFILE_IMAGE_PRELOAD } from '../src/constants/lcp-image.ts'

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
      return '#repositories-hero'
    default:
      return 'main h1'
  }
}

function stripPreviewOrigin(html: string, port: number): string {
  const origins = [
    `http://127.0.0.1:${port}`,
    `http://localhost:${port}`,
    `https://127.0.0.1:${port}`,
    `https://localhost:${port}`,
  ]

  let result = html
  for (const origin of origins) {
    result = result.replaceAll(origin, '')
  }

  return result.replace(/https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/gi, '')
}

function assertNoLocalhostReferences(html: string, routePath: string): void {
  if (/127\.0\.0\.1|localhost/i.test(html)) {
    throw new Error(
      `Prerendered HTML for ${routePath} still contains localhost/127.0.0.1 references`,
    )
  }
}

function injectBeforeHeadClose(html: string, snippet: string): string {
  if (html.includes(snippet)) return html
  return html.replace('</head>', `    ${snippet}\n  </head>`)
}

function stripHomeJsonLd(html: string): string {
  return html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g,
    (block) => {
      if (
        block.includes('#website') ||
        block.includes('#faq') ||
        block.includes('"@type": "FAQPage"') ||
        block.includes('"@type":"FAQPage"')
      ) {
        return ''
      }
      return block
    },
  )
}

function injectLcpPreload(html: string): string {
  const snippet = `<link rel="preload" as="image" href="${PROFILE_IMAGE_PRELOAD.href}" type="image/webp" fetchpriority="high" imagesrcset="${PROFILE_IMAGE_PRELOAD.srcSet}" imagesizes="${PROFILE_IMAGE_PRELOAD.sizes}" />`
  if (html.includes('rel="preload" as="image"') && html.includes(PROFILE_IMAGE_PRELOAD.href)) {
    return html
  }
  return injectBeforeHeadClose(html, snippet)
}

function postProcessHtml(html: string, routePath: string, port: number): string {
  let processed = stripPreviewOrigin(html, port)

  if (routePath === '/') {
    processed = injectLcpPreload(processed)
  } else {
    processed = stripHomeJsonLd(processed)
  }

  assertNoLocalhostReferences(processed, routePath)
  return processed
}

async function prerenderRoute(browser: Browser, previewUrl: string, routePath: string, port: number): Promise<void> {
  const page = await browser.newPage()
  await page.setRequestInterception(true)
  page.on('request', (request) => {
    const url = request.url()
    if (url.includes('googletagmanager.com') || url.includes('google-analytics.com')) {
      request.abort()
      return
    }
    request.continue()
  })

  const url = `${previewUrl}${routePath === '/' ? '/' : routePath}`
  const routeSelector = waitSelectorForRoute(routePath)
  const expectedTitle = ROUTE_TITLES[routePath]

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90_000 })
  await page.waitForSelector('#root', { timeout: 30_000 })
  await page.waitForSelector(routeSelector, { timeout: 45_000 })

  if (expectedTitle) {
    await page.waitForFunction(
      (title) => document.title === title,
      { timeout: 45_000 },
      expectedTitle,
    )
  } else {
    await page.waitForFunction(
      () => document.title && document.title.length > 0,
      { timeout: 45_000 },
    )
  }

  const rawHtml = await page.content()
  const html = postProcessHtml(rawHtml, routePath, port)
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
      const routesToRender = [
        ...PRERENDER_ROUTES.filter((route) => route.path !== '/'),
        ...PRERENDER_ROUTES.filter((route) => route.path === '/'),
      ]
      for (const route of routesToRender) {
        await prerenderRoute(browser, previewUrl, route.path, port)
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
