import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const root = resolve(scriptDir, '..')
const reportsDir = resolve(root, 'reports', 'lighthouse')
const latestReportPath = resolve(root, 'reports', 'performance-latest.json')

const DEFAULT_URL = 'https://nicolasceballosbrito.com'
const args = process.argv.slice(2)
const isQuick = args.includes('--quick')
const isFull = args.includes('--full')
const urlArg = args.find((arg) => arg.startsWith('--url='))
const runsArg = args.find((arg) => arg.startsWith('--runs='))
const targetUrl = urlArg?.slice('--url='.length) ?? DEFAULT_URL
const runCount = runsArg
  ? Number.parseInt(runsArg.slice('--runs='.length), 10)
  : isQuick
    ? 1
    : 3

const profiles = isFull
  ? [
      { name: 'mobile', formFactor: 'mobile', mobile: true },
      { name: 'desktop', formFactor: 'desktop', mobile: false },
    ]
  : [{ name: 'mobile', formFactor: 'mobile', mobile: true }]

function runLighthouse(profile, runIndex) {
  const suffix = runCount > 1 ? `-run${runIndex + 1}` : ''
  const outputPath = resolve(reportsDir, `${profile.name}${suffix}.json`)
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
        reject(new Error(`Lighthouse ${profile.name} run ${runIndex + 1} exited with code ${code}`))
        return
      }
      resolveRun(outputPath)
    })
  })
}

function parseMetricValue(displayValue) {
  if (!displayValue || displayValue === 'n/a') return null
  const normalized = displayValue.replace(/,/g, '').trim()
  if (normalized.endsWith(' ms')) {
    return Number.parseFloat(normalized)
  }
  if (normalized.endsWith(' s')) {
    return Number.parseFloat(normalized) * 1000
  }
  if (normalized.endsWith(' s')) {
    return Number.parseFloat(normalized) * 1000
  }
  const numeric = Number.parseFloat(normalized)
  return Number.isFinite(numeric) ? numeric : null
}

function formatMetricValue(ms, originalDisplay) {
  if (ms == null) return 'n/a'
  if (originalDisplay?.includes(' ms')) return `${Math.round(ms)} ms`
  return `${(ms / 1000).toFixed(1)} s`
}

function median(values) {
  const sorted = values.filter((value) => value != null).sort((a, b) => a - b)
  if (sorted.length === 0) return null
  const mid = Math.floor(sorted.length / 2)
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2
  }
  return sorted[mid]
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
    rawMetrics: {
      lcp: audits['largest-contentful-paint']?.numericValue ?? null,
      fcp: audits['first-contentful-paint']?.numericValue ?? null,
      tbt: audits['total-blocking-time']?.numericValue ?? null,
      cls: audits['cumulative-layout-shift']?.numericValue ?? null,
      si: audits['speed-index']?.numericValue ?? null,
      tti: audits['interactive']?.numericValue ?? null,
    },
  }
}

function aggregateRuns(runs) {
  const profile = runs[0].profile
  const scoreKeys = Object.keys(runs[0].scores)
  const scores = Object.fromEntries(
    scoreKeys.map((key) => [key, Math.round(median(runs.map((run) => run.scores[key])) ?? 0)]),
  )

  const metricKeys = Object.keys(runs[0].metrics)
  const rawMetrics = Object.fromEntries(
    metricKeys.map((key) => {
      const values = runs.map((run) => run.rawMetrics[key] ?? parseMetricValue(run.metrics[key]))
      return [key, median(values)]
    }),
  )

  const metrics = Object.fromEntries(
    metricKeys.map((key) => [
      key,
      key === 'cls'
        ? rawMetrics[key] != null
          ? String(rawMetrics[key])
          : 'n/a'
        : formatMetricValue(rawMetrics[key], runs[0].metrics[key]),
    ]),
  )

  return {
    profile,
    runs: runs.length,
    scores,
    metrics,
    rawMetrics,
  }
}

function printSummary(summaries) {
  console.log('\n=== Performance audit summary ===')
  console.log(`URL: ${targetUrl}`)
  console.log(`Runs per profile: ${runCount} (median reported)`)
  for (const summary of summaries) {
    console.log(`\n[${summary.profile}] (${summary.runs} run(s))`)
    console.log(`  Scores: ${JSON.stringify(summary.scores)}`)
    console.log(`  Metrics: ${JSON.stringify(summary.metrics)}`)
  }
}

async function main() {
  mkdirSync(reportsDir, { recursive: true })
  mkdirSync(dirname(latestReportPath), { recursive: true })

  const summaries = []
  for (const profile of profiles) {
    const runs = []
    for (let i = 0; i < runCount; i += 1) {
      console.log(`\nRunning Lighthouse (${profile.name}) — run ${i + 1}/${runCount}...`)
      const reportPath = await runLighthouse(profile, i)
      runs.push(summarizeReport(reportPath))
    }
    summaries.push(aggregateRuns(runs))
  }

  const payload = {
    capturedAt: new Date().toISOString(),
    url: targetUrl,
    runsPerProfile: runCount,
    aggregation: 'median',
    summaries,
  }

  const summaryPath = resolve(reportsDir, 'summary.json')
  writeFileSync(summaryPath, JSON.stringify(payload, null, 2))
  writeFileSync(latestReportPath, JSON.stringify(payload, null, 2))
  printSummary(summaries)
  console.log(`\nReports saved to ${reportsDir}`)
  console.log(`Latest snapshot: ${latestReportPath}`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
