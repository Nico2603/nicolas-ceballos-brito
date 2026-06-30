import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const root = join(scriptDir, '..')
const ogPath = join(root, 'public/images/og-image.webp')

const OG_WIDTH = 1200
const OG_HEIGHT = 630

const FULL_NAME = 'Nicolás Ceballos Brito'
const EYEBROW = 'Full-Stack Developer · Ing. Sistemas'
const DOMAIN = 'nicolasceballosbrito.com'

function buildOgSvg() {
  const gridLines = Array.from({ length: 26 }, (_, index) => {
    const x = 48 * index
    return `<line x1="${x}" y1="0" x2="${x}" y2="${OG_HEIGHT}" stroke="#1E293B" stroke-width="1" opacity="0.35" />`
  }).join('')

  const horizontalGrid = Array.from({ length: 14 }, (_, index) => {
    const y = 48 * index
    return `<line x1="0" y1="${y}" x2="${OG_WIDTH}" y2="${y}" stroke="#1E293B" stroke-width="1" opacity="0.35" />`
  }).join('')

  return `<svg width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0B1220"/>
      <stop offset="55%" stop-color="#111827"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <radialGradient id="glow-cyan" cx="78%" cy="28%" r="42%">
      <stop offset="0%" stop-color="#22D3EE" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#22D3EE" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow-amber" cx="18%" cy="82%" r="35%">
      <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#F59E0B" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent-bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#22D3EE"/>
      <stop offset="100%" stop-color="#0891B2"/>
    </linearGradient>
  </defs>

  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#bg)"/>
  <g opacity="0.55">${gridLines}${horizontalGrid}</g>
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#glow-cyan)"/>
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#glow-amber)"/>

  <rect x="72" y="72" width="88" height="88" rx="18" fill="#1A2332" stroke="#22D3EE" stroke-width="2.5"/>
  <text x="116" y="128" text-anchor="middle" fill="#F8FAFC" font-family="Segoe UI, system-ui, sans-serif" font-size="34" font-weight="700">NC</text>

  <rect x="72" y="196" width="112" height="4" rx="2" fill="url(#accent-bar)"/>

  <text x="72" y="248" fill="#FBBF24" font-family="Segoe UI, system-ui, sans-serif" font-size="22" font-weight="700" letter-spacing="6">${EYEBROW.toUpperCase()}</text>

  <text x="72" y="332" fill="#F8FAFC" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="700">Nicolás Ceballos</text>
  <text x="72" y="408" fill="#F8FAFC" font-family="Georgia, 'Times New Roman', serif" font-size="64" font-weight="700">Brito</text>

  <text x="72" y="472" fill="#22D3EE" font-family="Segoe UI, system-ui, sans-serif" font-size="28" font-weight="600">React · TypeScript · Flutter · IA</text>

  <text x="72" y="548" fill="#94A3B8" font-family="Segoe UI, system-ui, sans-serif" font-size="24" font-weight="500">${DOMAIN}</text>

  <circle cx="1010" cy="120" r="72" fill="none" stroke="#22D3EE" stroke-width="2" opacity="0.35"/>
  <circle cx="1010" cy="120" r="48" fill="none" stroke="#F59E0B" stroke-width="2" opacity="0.45"/>
  <rect x="900" y="360" width="220" height="220" rx="28" fill="#1A2332" opacity="0.55" stroke="#1E293B" stroke-width="2"/>
  <text x="1010" y="492" text-anchor="middle" fill="#64748B" font-family="Segoe UI, system-ui, sans-serif" font-size="96" font-weight="700" opacity="0.45">NC</text>
</svg>`
}

async function main() {
  const svg = buildOgSvg()
  const buffer = await sharp(Buffer.from(svg))
    .resize(OG_WIDTH, OG_HEIGHT)
    .webp({ quality: 88, effort: 4 })
    .toBuffer()

  await mkdir(dirname(ogPath), { recursive: true })
  await writeFile(ogPath, buffer)
  console.log(`og-image.webp generado (${OG_WIDTH}×${OG_HEIGHT}) — tarjeta de marca sin foto`)
}

main().catch((error) => {
  console.error('generate-og-image failed:', error)
  process.exit(1)
})
