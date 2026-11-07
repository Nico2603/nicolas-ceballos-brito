import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const root = join(scriptDir, '..')
const ogPath = join(root, 'public/images/og-image.webp')

const OG_WIDTH = 1200
const OG_HEIGHT = 630

const ROLE = 'Ingeniero en Sistemas y Telecomunicaciones'
const DOMAIN = 'nicolasceballosbrito.com'

function ncb(x, y, scale) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <path d="M2 28V4L16 28V4" fill="none" stroke="#E85D4C" stroke-width="3.4" stroke-linecap="square" stroke-linejoin="miter"/>
    <path d="M36 7.5H26.5V24.5H36" fill="none" stroke="#E85D4C" stroke-width="3.4" stroke-linecap="square" stroke-linejoin="miter"/>
    <path fill="#E85D4C" fill-rule="evenodd" d="M44 4.2h10.4c4.7 0 7.6 2.7 7.6 6.2 0 2.8-2 4.8-5.4 5.2v.4c3.8.4 6 2.6 6 5.8 0 3.8-3.2 6-8.4 6H44V4.2zm3.6 3.8h6c2.6 0 4 1.2 4 2.8s-1.4 2.8-4.2 2.8h-5.8V8zm0 9.2h6.4c3 0 4.6 1.4 4.6 3.4s-1.6 3.6-4.8 3.6H47.6v-7z"/>
  </g>`
}

function buildOgSvg() {
  return `<svg width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="#0B0E13"/>
  ${ncb(72, 250, 4.2)}
  <text x="380" y="290" fill="#ECE8E1" font-family="Segoe UI, system-ui, sans-serif" font-size="64" font-weight="600">Nicolás Ceballos</text>
  <text x="380" y="368" fill="#ECE8E1" font-family="Segoe UI, system-ui, sans-serif" font-size="64" font-weight="600">Brito</text>
  <text x="380" y="428" fill="#8AA0B8" font-family="Segoe UI, system-ui, sans-serif" font-size="26" font-weight="500">${ROLE}</text>
  <text x="380" y="478" fill="#B7B1A8" font-family="Segoe UI, system-ui, sans-serif" font-size="22" font-weight="500">${DOMAIN}</text>
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
