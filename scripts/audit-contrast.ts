import { spawn, type ChildProcess } from 'node:child_process'
import { createServer } from 'node:net'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { AxePuppeteer } from '@axe-core/puppeteer'
import chromium from '@sparticuz/chromium'
import puppeteer, { type Browser, type Page } from 'puppeteer'
import puppeteerCore from 'puppeteer-core'
import { PRERENDER_ROUTES } from '../src/constants/seo-routes.ts'
import { navLinks } from '../src/data/navigation.ts'

const THEME_STORAGE_KEY = 'nicolas-portfolio-theme'
const OUTPUT_DIR = resolve(process.cwd(), 'audit-output')
const SCREENSHOTS_DIR = resolve(OUTPUT_DIR, 'screenshots')

const HOME_SECTIONS = navLinks
  .filter((link) => link.href.startsWith('#'))
  .map((link) => ({ id: link.href.slice(1), label: link.label }))

type Theme = 'light' | 'dark'

interface ContrastViolation {
  route: string
  theme: Theme
  section: string
  html: string
  selector: string
  contrastRatio: number | null
  foreground: string
  background: string
  message: string
}

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

function routeSlug(routePath: string): string {
  if (routePath === '/') return 'home'
  return routePath.replace(/^\//, '').replace(/\//g, '__')
}

async function applyTheme(page: Page, theme: Theme): Promise<void> {
  await page.evaluateOnNewDocument(
    (key, t) => {
      localStorage.setItem(key, t)
    },
    THEME_STORAGE_KEY,
    theme,
  )
}

async function ensureTheme(page: Page, theme: Theme): Promise<void> {
  await page.evaluate(
    (key, t) => {
      localStorage.setItem(key, t)
      document.documentElement.classList.toggle('dark', t === 'dark')
    },
    THEME_STORAGE_KEY,
    theme,
  )
}

async function takeScreenshot(
  page: Page,
  theme: Theme,
  routePath: string,
  section: string,
): Promise<void> {
  const dir = resolve(SCREENSHOTS_DIR, theme)
  mkdirSync(dir, { recursive: true })
  const suffix = section === 'full' ? '' : `__${section}`
  const filePath = resolve(dir, `${routeSlug(routePath)}${suffix}.png`)
  await page.screenshot({ path: filePath, fullPage: section !== 'full' && routePath === '/' ? false : true })
}

async function scrollToSection(page: Page, sectionId: string): Promise<void> {
  await page.evaluate((id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' })
  }, sectionId)
  await new Promise((r) => setTimeout(r, 600))
}

async function runAxeContrast(
  page: Page,
  routePath: string,
  theme: Theme,
  section: string,
): Promise<ContrastViolation[]> {
  const results = await new AxePuppeteer(page).withRules(['color-contrast']).analyze()
  const violations: ContrastViolation[] = []

  for (const violation of results.violations) {
    for (const node of violation.nodes) {
      const contrastData = node.any.find((item) => item.id === 'color-contrast')
      const ratio = contrastData?.data?.contrastRatio
        ? Number(contrastData.data.contrastRatio)
        : null
      const fg = contrastData?.data?.fgColor ?? 'unknown'
      const bg = contrastData?.data?.bgColor ?? 'unknown'

      violations.push({
        route: routePath,
        theme,
        section,
        html: node.html,
        selector: node.target.join(' > '),
        contrastRatio: ratio,
        foreground: String(fg),
        background: String(bg),
        message: node.failureSummary ?? violation.help,
      })
    }
  }

  return violations
}

async function auditRoute(
  browser: Browser,
  previewUrl: string,
  routePath: string,
  theme: Theme,
): Promise<ContrastViolation[]> {
  const page = await browser.newPage()
  const url = `${previewUrl}${routePath === '/' ? '/' : routePath}`
  const routeSelector = waitSelectorForRoute(routePath)
  const allViolations: ContrastViolation[] = []

  try {
    await applyTheme(page, theme)
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 90_000 })
    await page.waitForSelector('#root', { timeout: 30_000 })
    await ensureTheme(page, theme)
    await page.waitForSelector(routeSelector, { timeout: 45_000 })
    await new Promise((r) => setTimeout(r, 800))

    if (routePath === '/') {
      for (const section of HOME_SECTIONS) {
        await scrollToSection(page, section.id)
        await takeScreenshot(page, theme, routePath, section.id)
        const sectionViolations = await runAxeContrast(page, routePath, theme, section.id)
        allViolations.push(...sectionViolations)
      }
    } else {
      await takeScreenshot(page, theme, routePath, 'full')
      const violations = await runAxeContrast(page, routePath, theme, 'full')
      allViolations.push(...violations)
    }
  } finally {
    await page.close()
  }

  const count = allViolations.length
  const status = count === 0 ? 'OK' : `${count} violation(s)`
  console.log(`  [${theme}] ${routePath}: ${status}`)

  return allViolations
}

async function main(): Promise<void> {
  mkdirSync(OUTPUT_DIR, { recursive: true })
  mkdirSync(SCREENSHOTS_DIR, { recursive: true })

  // Tras `npm run build`, prerender puede retener Puppeteer unos segundos en Windows
  await new Promise((r) => setTimeout(r, 2_000))

  const port = await getAvailablePort()
  const previewUrl = `http://127.0.0.1:${port}`
  const preview = startPreview(port)

  const themes: Theme[] = ['light', 'dark']
  const allViolations: ContrastViolation[] = []

  try {
    await waitForServer(previewUrl)
    const browser = await launchBrowser()

    try {
      for (const theme of themes) {
        console.log(`\nAuditing theme: ${theme}`)
        for (const route of PRERENDER_ROUTES) {
          const violations = await auditRoute(browser, previewUrl, route.path, theme)
          allViolations.push(...violations)
        }
      }
    } finally {
      await browser.close()
    }
  } finally {
    preview.kill('SIGTERM')
  }

  const report = {
    generatedAt: new Date().toISOString(),
    routesAudited: PRERENDER_ROUTES.length,
    themesAudited: themes.length,
    totalCombinations: PRERENDER_ROUTES.length * themes.length,
    violationCount: allViolations.length,
    violations: allViolations,
  }

  const reportPath = resolve(OUTPUT_DIR, 'report.json')
  writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8')

  console.log(`\nReport: ${reportPath}`)
  console.log(`Violations: ${allViolations.length}`)

  if (allViolations.length > 0) {
    process.exit(1)
  }
}

main().catch((error: unknown) => {
  console.error('Contrast audit failed:', error)
  process.exit(1)
})
