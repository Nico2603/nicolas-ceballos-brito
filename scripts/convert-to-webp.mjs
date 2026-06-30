import { readdir, unlink, stat } from 'node:fs/promises'
import { dirname, join, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const imagesDir = join(scriptDir, '../public/images')
const rasterExt = new Set(['.jpg', '.jpeg', '.png'])

const files = await readdir(imagesDir)

for (const file of files) {
  const ext = extname(file).toLowerCase()
  if (!rasterExt.has(ext)) continue

  const input = join(imagesDir, file)
  const outputName = `${basename(file, ext)}.webp`
  const output = join(imagesDir, outputName)

  await sharp(input).webp({ quality: 82, effort: 4 }).toFile(output)

  const inputSize = (await stat(input)).size
  const outputSize = (await stat(output)).size
  console.log(
    `${file} → ${outputName} (${Math.round(outputSize / 1024)}KB, was ${Math.round(inputSize / 1024)}KB)`,
  )

  await unlink(input)
}

console.log('Conversión a WebP completada.')
