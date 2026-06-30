import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const root = join(scriptDir, '..')
const ogPath = join(root, 'public/images/og-image.webp')
const applePath = join(root, 'public/apple-touch-icon.png')

const OG_WIDTH = 1200
const OG_HEIGHT = 630
const APPLE_SIZE = 180

const ogInput = await readFile(ogPath)
const ogMeta = await sharp(ogInput).metadata()

if (ogMeta.width !== OG_WIDTH || ogMeta.height !== OG_HEIGHT) {
  const buffer = await sharp(ogInput)
    .resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover', position: 'centre' })
    .webp({ quality: 85, effort: 4 })
    .toBuffer()
  await writeFile(ogPath, buffer)
  console.log(`og-image.webp normalizado a ${OG_WIDTH}×${OG_HEIGHT}`)
} else {
  console.log(`og-image.webp ya es ${OG_WIDTH}×${OG_HEIGHT}`)
}

const ogForApple = await readFile(ogPath)

await sharp(ogForApple)
  .resize(APPLE_SIZE, APPLE_SIZE, { fit: 'cover', position: 'left' })
  .png()
  .toFile(applePath)
console.log(`apple-touch-icon.png generado (${APPLE_SIZE}×${APPLE_SIZE})`)
