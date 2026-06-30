import { access } from 'node:fs/promises'
import { rename, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const root = join(scriptDir, '..')
const imagesDir = join(root, 'public/images')

async function fileExists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function optimizeProfileImage() {
  const picPath = join(imagesDir, 'pic.webp')
  if (!(await fileExists(picPath))) {
    console.log('pic.webp no encontrado; omitiendo variantes responsive')
    return
  }

  const input = await sharp(picPath).toBuffer()

  await sharp(input)
    .resize(224, 224, { fit: 'cover', position: 'centre' })
    .webp({ quality: 82, effort: 4 })
    .toFile(join(imagesDir, 'pic-224.webp'))

  await sharp(input)
    .resize(288, 288, { fit: 'cover', position: 'centre' })
    .webp({ quality: 82, effort: 4 })
    .toFile(join(imagesDir, 'pic-288.webp'))

  await sharp(input)
    .resize(576, 576, { fit: 'cover', position: 'centre' })
    .webp({ quality: 82, effort: 4 })
    .toFile(join(imagesDir, 'pic-576.webp'))

  console.log('Variantes pic-224.webp, pic-288.webp y pic-576.webp generadas')
}

async function generateCarouselVariant(imagePath, filename) {
  const meta = await sharp(imagePath).metadata()
  const baseName = filename.replace('.webp', '')
  const width640 = Math.min(meta.width ?? 640, 640)

  await sharp(imagePath)
    .resize(width640, undefined, { withoutEnlargement: true })
    .webp({ quality: 78, effort: 4 })
    .toFile(join(imagesDir, `${baseName}-640.webp`))

  console.log(`${baseName}-640.webp generado`)
}

async function compressCarouselImages() {
  const carouselImages = ['p1.webp', 'p2.webp', 'p3.webp', 'p4.webp', 'p5.webp']

  for (const filename of carouselImages) {
    const imagePath = join(imagesDir, filename)
    if (!(await fileExists(imagePath))) continue

    try {
      await generateCarouselVariant(imagePath, filename)

      const meta = await sharp(imagePath).metadata()
      const maxWidth = 960
      const needsResize = meta.width && meta.width > maxWidth

      const pipeline = sharp(imagePath)
      const output = needsResize
        ? pipeline.resize(maxWidth, undefined, { withoutEnlargement: true })
        : pipeline

      const buffer = await output.webp({ quality: 80, effort: 4 }).toBuffer()
      const tempPath = join(imagesDir, `.${filename}.tmp`)
      await writeFile(tempPath, buffer)
      await rename(tempPath, imagePath)
      console.log(`${filename} comprimido${needsResize ? ` (max ${maxWidth}px)` : ''}`)
    } catch (error) {
      console.warn(`${filename}: no se pudo optimizar`, error instanceof Error ? error.message : error)
    }
  }
}

await optimizeProfileImage()
await compressCarouselImages()
