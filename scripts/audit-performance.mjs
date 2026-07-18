import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const root = resolve(scriptDir, '..')
const reportsDir = resolve(root, 'reports', 'lighthouse')
const latestReportPath = resolve(root, 'reports', 'performance-latest.json')
const diffReportPath = resolve(root, 'reports', 'performance-diff.json')
const opportunitiesPath = resolve(root, 'reports', 'performance-opportunities.json')
const baselinePath = resolve(root, 'reports', 'performance-baseline.json')
const budgetPath = resolve(root, 'performance-budget.json')

const DEFAULT_URL = 'https://nicolasceballosbrito.com'
const DEFAULT_ROUTES = ['/']

const OPPORTUNITY_AUDITS = [
  'unused-javascript',
  'render-blocking-resources',
  'uses-responsive-images',
  'font-display-insight',
  'forced-reflow-insight',
]

const args = process.argv.slice(2)
const isQuick = args.includes('--quick')
const isFull = args.includes('--full')
const isAssert = args.includes('--assert')
const urlArg = args.find((arg) => arg.startsWith('--url='))
const runsArg = args.find((arg) => arg.startsWith('--runs='))
const routesArg = args.find((arg) => arg.startsWith('--routes='))
const throttleArg = args.find((arg) => arg.startsWith('--throttle='))

const baseUrl = urlArg?.slice('--url='.length) ?? DEFAULT_URL
const runCount = runsArg
  ? Number.parseInt(runsArg.slice('--runs='.length), 10)
  : isQuick
    ? 1
    : 3

const routes = routesArg
  ? routesArg
      .slice('--routes='.length)
      .split(',')
      .map((route) => route.trim())
      .filter(Boolean)
  : DEFAULT_ROUTES

const throttlePreset = throttleArg?.slice('--throttle='.length) ?? null

const profiles = isFull
  ? [
      { name: 'mobile', formFactor: 'mobile', mobile: true },
      { name: 'desktop', formFactor: 'desktop', mobile: false },
    ]
  : [{ name: 'mobile', formFactor: 'mobile', mobile: true }]

const THROTTLE_PRESETS = {
  '3g': {
    method: 'devtools',
    rttMs: 150,
    throughputKbps: 1638.4,
    cpuSlowdownMultiplier: 4,
  },
}

function buildTargetUrl(route) {
  if (route === '/') return baseUrl.replace(/\/$/, '')
  const normalizedBase = baseUrl.replace(/\/$/, '')
  const normalizedRoute = route.startsWith('/') ? route : `/${route}`
  return `${normalizedBase}${normalizedRoute}`
}

function runLighthouse(profile, runIndex, targetUrl, routeSlug) {
  const suffix = runCount > 1 ? `-run${runIndex + 1}` : ''
  const routePart = routeSlug === 'home' ? '' : `-${routeSlug}`
  const outputPath = resolve(reportsDir, `${profile.name}${routePart}${suffix}.json`)

  const lighthouseArgs = [
    'lighthouse',
    targetUrl,
    '--only-categories=performance,accessibility,best-practices,seo',
    '--output=json',
    `--output-path=${outputPath}`,
    '--chrome-flags=--headless --no-sandbox',
    '--quiet',
  ]

  if (profile.formFactor === 'desktop') {
    // Official desktop preset: correct viewport, UA, and unthrottled network/CPU.
    lighthouseArgs.push('--preset=desktop')
  } else {
    lighthouseArgs.push(`--form-factor=${profile.formFactor}`)
    lighthouseArgs.push(`--screenEmulation.mobile=${profile.mobile}`)
  }

  if (throttlePreset && THROTTLE_PRESETS[throttlePreset]) {
    const preset = THROTTLE_PRESETS[throttlePreset]
    lighthouseArgs.push(`--throttling-method=${preset.method}`)
    lighthouseArgs.push(`--throttling.rttMs=${preset.rttMs}`)
    lighthouseArgs.push(`--throttling.throughputKbps=${preset.throughputKbps}`)
    lighthouseArgs.push(`--throttling.cpuSlowdownMultiplier=${preset.cpuSlowdownMultiplier}`)
  }

  return new Promise((resolveRun, reject) => {
    const child = spawn('npx', lighthouseArgs, {
      cwd: root,
      stdio: 'inherit',
      shell: true,
    })

    child.on('error', reject)
    child.on('close', (code) => {
      if (code !== 0) {
        reject(
          new Error(
            `Lighthouse ${profile.name} ${routeSlug} run ${runIndex + 1} exited with code ${code}`,
          ),
        )
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

function routeSlug(route) {
  if (route === '/') return 'home'
  return route.replace(/^\//, '').replace(/\//g, '-')
}

function extractLcpElement(audits) {
  const lcpAudit = audits['largest-contentful-paint-element']
  const items = lcpAudit?.details?.items
  if (!Array.isArray(items) || items.length === 0) return null
  const node = items[0]?.node
  return node?.selector ?? node?.snippet ?? null
}

function extractInp(audits) {
  const inpAudit = audits['interaction-to-next-paint'] ?? audits['experimental-interaction-to-next-paint']
  if (inpAudit?.numericValue != null) return inpAudit.numericValue
  const insight = audits['inp-insight']
  if (insight?.numericValue != null) return insight.numericValue
  return null
}

function summarizeReport(reportPath, route, profileName) {
  const report = JSON.parse(readFileSync(reportPath, 'utf8'))
  const audits = report.audits ?? {}
  const categories = report.categories ?? {}

  return {
    profile: profileName,
    route,
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
      ttfb: audits['server-response-time']?.displayValue ?? 'n/a',
      inp: audits['interaction-to-next-paint']?.displayValue ?? 'n/a',
    },
    rawMetrics: {
      lcp: audits['largest-contentful-paint']?.numericValue ?? null,
      fcp: audits['first-contentful-paint']?.numericValue ?? null,
      tbt: audits['total-blocking-time']?.numericValue ?? null,
      cls: audits['cumulative-layout-shift']?.numericValue ?? null,
      si: audits['speed-index']?.numericValue ?? null,
      tti: audits['interactive']?.numericValue ?? null,
      ttfb: audits['server-response-time']?.numericValue ?? null,
      inp: extractInp(audits),
    },
    lcpElement: extractLcpElement(audits),
    opportunities: extractOpportunities(audits),
  }
}

function extractOpportunities(audits) {
  return OPPORTUNITY_AUDITS.map((auditId) => {
    const audit = audits[auditId]
    if (!audit) return null
    return {
      id: auditId,
      title: audit.title,
      score: audit.score,
      displayValue: audit.displayValue ?? null,
      numericValue: audit.numericValue ?? null,
      wastedBytes: audit.details?.overallSavingsBytes ?? audit.details?.wastedBytes ?? null,
    }
  }).filter(Boolean)
}

function aggregateRuns(runs) {
  const { profile, route } = runs[0]
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
    route,
    runs: runs.length,
    scores,
    metrics,
    rawMetrics,
    lcpElement: runs.find((run) => run.lcpElement)?.lcpElement ?? null,
    opportunities: runs[runs.length - 1].opportunities,
  }
}

function loadTargets() {
  if (existsSync(budgetPath)) {
    const budget = JSON.parse(readFileSync(budgetPath, 'utf8'))
    return budget.lighthouse ?? {}
  }

  if (existsSync(baselinePath)) {
    const baseline = JSON.parse(readFileSync(baselinePath, 'utf8'))
    return baseline.targets ?? {}
  }

  return {}
}

function assertTargets(summaries) {
  const targets = loadTargets()
  const failures = []

  for (const summary of summaries) {
    const profileKey = summary.profile === 'mobile' ? 'performanceMobile' : 'performanceDesktop'
    const minScore = targets[profileKey]
    const perfScore = summary.scores.performance

    if (minScore != null && perfScore < minScore) {
      failures.push(
        `${summary.profile}${summary.route !== '/' ? ` (${summary.route})` : ''}: performance ${perfScore} < ${minScore}`,
      )
    }

    if (targets.lcpMs != null && summary.rawMetrics.lcp != null && summary.rawMetrics.lcp > targets.lcpMs) {
      failures.push(`${summary.profile}: LCP ${summary.metrics.lcp} > ${targets.lcpMs}ms`)
    }

    if (targets.fcpMs != null && summary.rawMetrics.fcp != null && summary.rawMetrics.fcp > targets.fcpMs) {
      failures.push(`${summary.profile}: FCP ${summary.metrics.fcp} > ${targets.fcpMs}ms`)
    }

    if (targets.tbtMs != null && summary.rawMetrics.tbt != null && summary.rawMetrics.tbt > targets.tbtMs) {
      failures.push(`${summary.profile}: TBT ${summary.metrics.tbt} > ${targets.tbtMs}ms`)
    }

    if (targets.clsMax != null && summary.rawMetrics.cls != null && summary.rawMetrics.cls > targets.clsMax) {
      failures.push(`${summary.profile}: CLS ${summary.metrics.cls} > ${targets.clsMax}`)
    }

    if (
      targets.speedIndexMs != null &&
      summary.rawMetrics.si != null &&
      summary.rawMetrics.si > targets.speedIndexMs
    ) {
      failures.push(`${summary.profile}: Speed Index ${summary.metrics.si} > ${targets.speedIndexMs}ms`)
    }
  }

  return failures
}

function buildDiff(previous, current) {
  if (!previous?.summaries) return null

  const deltas = []
  for (const summary of current.summaries) {
    const prev = previous.summaries.find(
      (item) => item.profile === summary.profile && item.route === summary.route,
    )
    if (!prev) continue

    const metricDelta = Object.fromEntries(
      Object.keys(summary.rawMetrics).map((key) => {
        const currentValue = summary.rawMetrics[key]
        const previousValue = prev.rawMetrics?.[key]
        if (currentValue == null || previousValue == null) return [key, null]
        return [key, Number((currentValue - previousValue).toFixed(2))]
      }),
    )

    deltas.push({
      profile: summary.profile,
      route: summary.route,
      scores: Object.fromEntries(
        Object.keys(summary.scores).map((key) => [key, summary.scores[key] - (prev.scores?.[key] ?? 0)]),
      ),
      rawMetrics: metricDelta,
    })
  }

  return {
    capturedAt: new Date().toISOString(),
    previousCapturedAt: previous.capturedAt,
    deltas,
  }
}

function printSummary(summaries) {
  console.log('\n=== Performance audit summary ===')
  console.log(`URL: ${baseUrl}`)
  console.log(`Routes: ${routes.join(', ')}`)
  console.log(`Runs per profile: ${runCount} (median reported)`)
  if (throttlePreset) console.log(`Throttle: ${throttlePreset}`)

  for (const summary of summaries) {
    const routeLabel = summary.route === '/' ? '' : ` route=${summary.route}`
    console.log(`\n[${summary.profile}${routeLabel}] (${summary.runs} run(s))`)
    console.log(`  Scores: ${JSON.stringify(summary.scores)}`)
    console.log(`  Metrics: ${JSON.stringify(summary.metrics)}`)
    if (summary.lcpElement) console.log(`  LCP element: ${summary.lcpElement}`)
  }
}

async function main() {
  mkdirSync(reportsDir, { recursive: true })
  mkdirSync(dirname(latestReportPath), { recursive: true })

  const previousSnapshot = existsSync(latestReportPath)
    ? JSON.parse(readFileSync(latestReportPath, 'utf8'))
    : null

  const summaries = []
  const allOpportunities = []

  for (const route of routes) {
    const targetUrl = buildTargetUrl(route)
    const slug = routeSlug(route)

    for (const profile of profiles) {
      const runs = []
      for (let i = 0; i < runCount; i += 1) {
        console.log(
          `\nRunning Lighthouse (${profile.name}, ${route}) — run ${i + 1}/${runCount}...`,
        )
        const reportPath = await runLighthouse(profile, i, targetUrl, slug)
        runs.push(summarizeReport(reportPath, route, profile.name))
      }
      const aggregated = aggregateRuns(runs)
      summaries.push(aggregated)
      allOpportunities.push({
        profile: profile.name,
        route,
        items: aggregated.opportunities,
      })
    }
  }

  const payload = {
    capturedAt: new Date().toISOString(),
    url: baseUrl,
    routes,
    runsPerProfile: runCount,
    aggregation: 'median',
    throttle: throttlePreset,
    summaries,
  }

  const diff = buildDiff(previousSnapshot, payload)
  if (diff) {
    writeFileSync(diffReportPath, JSON.stringify(diff, null, 2))
  }

  writeFileSync(opportunitiesPath, JSON.stringify({ capturedAt: payload.capturedAt, profiles: allOpportunities }, null, 2))
  writeFileSync(resolve(reportsDir, 'summary.json'), JSON.stringify(payload, null, 2))
  writeFileSync(latestReportPath, JSON.stringify(payload, null, 2))

  printSummary(summaries)
  console.log(`\nReports saved to ${reportsDir}`)
  console.log(`Latest snapshot: ${latestReportPath}`)
  if (diff) console.log(`Diff report: ${diffReportPath}`)
  console.log(`Opportunities: ${opportunitiesPath}`)

  if (isAssert) {
    const failures = assertTargets(summaries)
    if (failures.length > 0) {
      console.error('\nAssert failures:')
      for (const failure of failures) {
        console.error(`  - ${failure}`)
      }
      process.exit(1)
    }
    console.log('\nAssert passed against performance budget.')
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
