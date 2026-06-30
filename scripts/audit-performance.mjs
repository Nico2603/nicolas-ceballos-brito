import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const root = resolve(scriptDir, '..')
const reportsDir = resolve(root, 'reports', 'lighthouse')

const DEFAULT_URL = 'https://nicolasceballosbrito.com'
const args = process.argv.slice(2)
const isQuick = args.includes('--quick')
const isFull = args.includes('--full')
const urlArg = args.find((arg) => arg.startsWith('--url='))
const targetUrl = urlArg?.slice('--url='.length) ?? DEFAULT_URL

const profiles = isFull
  ? [
      { name: 'mobile', formFactor: 'mobile', mobile: true },
      { name: 'desktop', formFactor: 'desktop', mobile: false },
    ]
  : [{ name: 'mobile', formFactor: 'mobile', mobile: true }]

function runLighthouse(profile) {
  const outputPath = resolve(reportsDir, `${profile.name}.json`)
  const lighthouseArgs = [
    'lighthouse',
    targetUrl,
    '--only-categories=performance,accessibility,best-practices,seo',
    `--form-factor=${profile.formFactor}`,
    `--screenEmulation.mobile=${profile.mobile}`,
    '--output=json',
    `--output-path=${outputPath}`,
    '--chrome-flags=--headless --no-sandbox',
    '--quiet',
  ]

  return new Promise((resolveRun, reject) => {
    const child = spawn('npx', lighthouseArgs, {
      cwd: root,
      stdio: 'inherit',
      shell: true,
    })

    child.on('error', reject)
    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Lighthouse ${profile.name} exited with code ${code}`))
        return
      }
      resolveRun(outputPath)
    })
  })
}

function summarizeReport(reportPath) {
  const report = JSON.parse(readFileSync(reportPath, 'utf8'))
  const audits = report.audits ?? {}
  const categories = report.categories ?? {}

  return {
    profile: reportPath.includes('desktop') ? 'desktop' : 'mobile',
    scores: Object.fromEntries(
      Object.entries(categories).map(([key, value]) => [key, Math.round((value.score ?? 0) * 100)]),
    ),
    metrics: {
      lcp: audits['largest-contentful-paint']?.displayValue ?? 'n/a',
      fcp: audits['first-contentful-paint']?.displayValue ?? 'n/a',
      tbt: audits['total-blocking-time']?.displayValue ?? 'n/a',
      cls: audits['cumulative-layout-shift']?.displayValue ?? 'n/a',
      si: audits['speed-index']?.displayValue ?? 'n/a',
      tti: audits['interactive']?.displayValue ?? 'n/a',
    },
  }
}

function printSummary(summaries) {
  console.log('\n=== Performance audit summary ===')
  console.log(`URL: ${targetUrl}`)
  for (const summary of summaries) {
    console.log(`\n[${summary.profile}]`)
    console.log(`  Scores: ${JSON.stringify(summary.scores)}`)
    console.log(`  Metrics: ${JSON.stringify(summary.metrics)}`)
  }
}

async function main() {
  mkdirSync(reportsDir, { recursive: true })

  const summaries = []
  for (const profile of profiles) {
    console.log(`\nRunning Lighthouse (${profile.name})...`)
    const reportPath = await runLighthouse(profile)
    const summary = summarizeReport(reportPath)
    summaries.push(summary)
  }

  const summaryPath = resolve(reportsDir, 'summary.json')
  writeFileSync(summaryPath, JSON.stringify({ url: targetUrl, summaries }, null, 2))
  printSummary(summaries)
  console.log(`\nReports saved to ${reportsDir}`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
