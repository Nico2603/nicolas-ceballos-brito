import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import puppeteer from 'puppeteer'
import { SOCIAL_LINKS } from '../src/constants/social.ts'
import { currentRoles, graduation, heroBio } from '../src/data/profile.ts'
import { linkedInPosts } from '../src/data/linkedin-posts.ts'

const PROFILE_URL = SOCIAL_LINKS.linkedin
const RAW_OUTPUT = resolve(process.cwd(), 'src/data/linkedin-sync.raw.json')
const STALE_DAYS = 60

interface SyncedProfile {
  scrapedAt: string
  headline: string | null
  about: string | null
  experience: { title: string; company: string; period: string }[]
  education: { school: string; period: string }[]
  posts: { text: string; url: string; date: string | null }[]
}

async function scrapeLinkedInProfile(): Promise<SyncedProfile> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    const page = await browser.newPage()
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    )
    await page.goto(PROFILE_URL, { waitUntil: 'networkidle2', timeout: 60000 })

    const data = await page.evaluate(() => {
      const textContent = (selector: string) =>
        document.querySelector(selector)?.textContent?.trim() ?? null

      const headline = textContent('h1') ?? textContent('[data-generated-suggestion-target]')

      const about =
        textContent('#about ~ div .inline-show-more-text') ??
        textContent('section[data-section="summary"] .inline-show-more-text') ??
        textContent('.pv-about__summary-text')

      const experience: { title: string; company: string; period: string }[] = []
      document.querySelectorAll('section[id*="experience"] li, .experience-item').forEach((el) => {
        const title = el.querySelector('h3, .t-bold')?.textContent?.trim()
        const company = el.querySelector('h4, .t-14')?.textContent?.trim()
        const period = el.querySelector('.pvs-entity__caption-wrapper, .t-black--light')?.textContent?.trim()
        if (title && company) {
          experience.push({ title, company, period: period ?? '' })
        }
      })

      const education: { school: string; period: string }[] = []
      document.querySelectorAll('section[id*="education"] li').forEach((el) => {
        const school = el.querySelector('h3, .t-bold')?.textContent?.trim()
        const period = el.querySelector('.pvs-entity__caption-wrapper')?.textContent?.trim()
        if (school) {
          education.push({ school, period: period ?? '' })
        }
      })

      const posts: { text: string; url: string; date: string | null }[] = []
      document.querySelectorAll('div[data-urn*="activity"], .feed-shared-update-v2').forEach((el) => {
        const text = el.querySelector('.feed-shared-text, .update-components-text')?.textContent?.trim()
        const link = el.querySelector('a[href*="/posts/"], a[href*="activity"]') as HTMLAnchorElement | null
        const date = el.querySelector('time')?.getAttribute('datetime') ?? null
        if (text && link?.href) {
          posts.push({ text: text.slice(0, 300), url: link.href, date })
        }
      })

      return { headline, about, experience, education, posts }
    })

    return {
      scrapedAt: new Date().toISOString(),
      ...data,
    }
  } finally {
    await browser.close()
  }
}

function daysSince(isoDate: string): number {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return Number.POSITIVE_INFINITY
  return (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
}

function compareWithCurated(synced: SyncedProfile): void {
  console.log('\n--- Comparación con datos curados ---\n')

  if (synced.headline) {
    console.log(`Headline LinkedIn: ${synced.headline}`)
    console.log(`Bio local (heroBio): ${heroBio.slice(0, 80)}…`)
  }

  if (synced.experience.length > 0) {
    console.log('\nExperiencia en LinkedIn (primeras 3):')
    synced.experience.slice(0, 3).forEach((exp) => {
      console.log(`  • ${exp.title} @ ${exp.company} (${exp.period})`)
    })

    const localCompanies = new Set(currentRoles.map((r) => r.company.toLowerCase()))
    const newRoles = synced.experience.filter(
      (exp) => !localCompanies.has(exp.company.toLowerCase()),
    )
    if (newRoles.length > 0) {
      console.log('\n⚠ Roles en LinkedIn no presentes en profile.ts:')
      newRoles.forEach((role) => console.log(`  → ${role.title} @ ${role.company}`))
    }
  } else {
    console.log('\n⚠ No se extrajo experiencia (LinkedIn puede haber bloqueado el scraping).')
    console.log('  Actualiza profile.ts manualmente si hubo cambios en tu perfil.')
  }

  const curatedUrls = new Set(linkedInPosts.map((p) => p.postUrl))
  const newPosts = synced.posts.filter((p) => !curatedUrls.has(p.url))

  if (newPosts.length > 0) {
    console.log('\n⚠ Posts nuevos en LinkedIn no presentes en linkedin-posts.ts:')
    newPosts.slice(0, 5).forEach((post) => {
      console.log(`  → ${post.url}`)
      console.log(`    "${post.text.slice(0, 100)}…"`)
    })
    console.log('\n  Añade los posts relevantes a src/data/linkedin-posts.ts')
  } else if (synced.posts.length === 0) {
    console.log('\n⚠ No se extrajeron posts (requieren sesión o perfil restringido).')
    console.log('  Actualiza linkedin-posts.ts manualmente con tus publicaciones recientes.')
  } else {
    console.log('\n✓ No hay posts nuevos detectados respecto a linkedin-posts.ts')
  }

  const stalePosts = linkedInPosts.filter((post) => daysSince(post.publishedAt) > STALE_DAYS)
  if (stalePosts.length > 0) {
    console.log(`\n⚠ Posts con más de ${STALE_DAYS} días (considera actualizar):`)
    stalePosts.forEach((post) => {
      console.log(`  → ${post.title} (${post.publishedAt})`)
    })
  }

  const featured = linkedInPosts.find((p) => p.featured)
  if (featured && daysSince(featured.publishedAt) > STALE_DAYS) {
    console.log(`\n⚠ El post destacado tiene más de ${STALE_DAYS} días. Considera marcar uno más reciente como featured.`)
  }

  console.log('\n--- Graduación local ---')
  console.log(`  ${graduation.degree} — ${graduation.institution} (${graduation.year})`)
}

async function main(): Promise<void> {
  console.log(`Sincronizando perfil LinkedIn: ${PROFILE_URL}`)
  console.log('(Este script NO modifica los archivos curados automáticamente)\n')

  let synced: SyncedProfile

  try {
    synced = await scrapeLinkedInProfile()
    writeFileSync(RAW_OUTPUT, JSON.stringify(synced, null, 2), 'utf8')
    console.log(`✓ Datos crudos guardados en ${RAW_OUTPUT}`)
  } catch (error) {
    console.error('✗ Error al scrapear LinkedIn:', error)

    if (existsSync(RAW_OUTPUT)) {
      console.log(`\nUsando último snapshot: ${RAW_OUTPUT}`)
      synced = JSON.parse(readFileSync(RAW_OUTPUT, 'utf8')) as SyncedProfile
    } else {
      console.log('\nSin snapshot previo. Revisa profile.ts y linkedin-posts.ts manualmente.')
      process.exit(1)
    }
  }

  compareWithCurated(synced)
  console.log('\nListo. Ejecuta este script periódicamente para detectar cambios en LinkedIn.')
}

main()
