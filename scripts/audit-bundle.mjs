import { createGzip } from 'node:zlib'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
const scriptDir = dirname(fileURLToPath(import.meta.url))
const root = resolve(scriptDir, '..')
const distAssets = resolve(root, 'dist', 'assets')
const budgetPath = resolve(root, 'performance-budget.json')
const outputPath = resolve(root, 'reports', 'bundle-budget.json')

function gzipSize(buffer) {
  return new Promise((resolveSize, reject) => {
    const chunks = []
    const gzip = createGzip()
    gzip.on('data', (chunk) => chunks.push(chunk))
    gzip.on('end', () => resolveSize(Buffer.concat(chunks).length))
    gzip.on('error', reject)
    gzip.end(buffer)
  })
}

function categorizeChunk(fileName) {
  if (fileName.includes('vendor-react')) return 'vendor-react'
  if (fileName.includes('vendor-motion')) return 'vendor-motion'
  if (fileName.includes('vendor-lenis')) return 'vendor-lenis'
  if (fileName.startsWith('index-')) return 'entry'
  return 'other'
}

async function main() {
  const budget = JSON.parse(readFileSync(budgetPath, 'utf8'))
  const files = readdirSync(distAssets).filter((name) => name.endsWith('.js'))

  const chunks = []
  for (const fileName of files) {
    const filePath = join(distAssets, fileName)
    const raw = readFileSync(filePath)
    const gzipKb = (await gzipSize(raw)) / 1024
    chunks.push({
      file: fileName,
      category: categorizeChunk(fileName),
      rawKb: Number((statSync(filePath).size / 1024).toFixed(2)),
      gzipKb: Number(gzipKb.toFixed(2)),
    })
  }

  const byCategory = Object.fromEntries(
    ['vendor-react', 'vendor-motion', 'vendor-lenis', 'entry', 'other'].map((category) => {
      const items = chunks.filter((chunk) => chunk.category === category)
      const gzipKb = Number(items.reduce((sum, item) => sum + item.gzipKb, 0).toFixed(2))
      return [category, { files: items.length, gzipKb }]
    }),
  )

  const combinedVendorGzipKb = Number(
    (
      byCategory['vendor-react'].gzipKb +
      byCategory['vendor-motion'].gzipKb +
      byCategory['vendor-lenis'].gzipKb +
      byCategory.entry.gzipKb
    ).toFixed(2),
  )

  const violations = []
  const { bundle } = budget

  if (combinedVendorGzipKb > bundle.combinedVendorGzipKb) {
    violations.push(
      `combined vendor+entry gzip ${combinedVendorGzipKb} KiB > ${bundle.combinedVendorGzipKb} KiB`,
    )
  }

  for (const [category, limitKey] of [
    ['vendor-react', 'vendorReactGzipKb'],
    ['vendor-motion', 'vendorMotionGzipKb'],
    ['vendor-lenis', 'vendorLenisGzipKb'],
    ['entry', 'entryGzipKb'],
  ]) {
    const actual = byCategory[category].gzipKb
    const limit = bundle[limitKey]
    if (actual > limit) {
      violations.push(`${category} gzip ${actual} KiB > ${limit} KiB`)
    }
  }

  const payload = {
    capturedAt: new Date().toISOString(),
    dist: 'dist/assets',
    chunks,
    byCategory,
    combinedVendorGzipKb,
    budget: bundle,
    passed: violations.length === 0,
    violations,
  }

  writeFileSync(outputPath, JSON.stringify(payload, null, 2))

  console.log('\n=== Bundle budget audit ===')
  console.log(`Combined vendor+entry (gzip): ${combinedVendorGzipKb} KiB / ${bundle.combinedVendorGzipKb} KiB`)
  for (const [category, data] of Object.entries(byCategory)) {
    if (data.files > 0) {
      console.log(`  ${category}: ${data.gzipKb} KiB (${data.files} file(s))`)
    }
  }

  if (violations.length > 0) {
    console.error('\nBudget violations:')
    for (const violation of violations) {
      console.error(`  - ${violation}`)
    }
    process.exit(1)
  }

  console.log(`\nReport saved to ${outputPath}`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
