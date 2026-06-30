import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import puppeteer from 'puppeteer'
import { SOCIAL_LINKS } from '../src/constants/social.ts'

const PROFILE_URL = SOCIAL_LINKS.linkedin
const RAW_OUTPUT = resolve(process.cwd(), 'src/data/linkedin-sync.raw.json')

/** Función serializada para el browser — sin helpers de TypeScript/esbuild */
const BROWSER_SCRAPE_FN = `() => {
  function text(sel) {
    var el = document.querySelector(sel);
    return el && el.textContent ? el.textContent.trim() : null;
  }

  var headline = text('h1') || text('.text-heading-xlarge');
  var about =
    text('#about ~ div .inline-show-more-text') ||
    text('section[data-section="summary"] .inline-show-more-text') ||
    text('.pv-about__summary-text') ||
    text('[class*="about"] .inline-show-more-text');

  var experience = [];
  document.querySelectorAll('section').forEach(function(section) {
    var id = section.id || '';
    if (id.indexOf('experience') === -1) return;
    section.querySelectorAll('li').forEach(function(el) {
      var title = text.call(null, 'h3') || (el.querySelector('h3, .t-bold') && el.querySelector('h3, .t-bold').textContent.trim());
      var companyEl = el.querySelector('h4, .t-14, span[aria-hidden="true"]');
      var company = companyEl ? companyEl.textContent.trim() : null;
      var periodEl = el.querySelector('.pvs-entity__caption-wrapper, .t-black--light, span.pvs-entity__caption-wrapper');
      var period = periodEl ? periodEl.textContent.trim() : '';
      if (title && company) {
        experience.push({ title: title, company: company, period: period });
      }
    });
  });

  var education = [];
  document.querySelectorAll('section').forEach(function(section) {
    var id = section.id || '';
    if (id.indexOf('education') === -1) return;
    section.querySelectorAll('li').forEach(function(el) {
      var school = el.querySelector('h3, .t-bold');
      var periodEl = el.querySelector('.pvs-entity__caption-wrapper');
      if (school) {
        education.push({
          school: school.textContent.trim(),
          period: periodEl ? periodEl.textContent.trim() : '',
        });
      }
    });
  });

  var posts = [];
  document.querySelectorAll('a[href*="/posts/"], a[href*="activity-"]').forEach(function(link) {
    var href = link.href;
    if (!href || posts.some(function(p) { return p.url === href; })) return;
    var container = link.closest('div[data-urn], .feed-shared-update-v2, li');
    var textEl = container && container.querySelector('.feed-shared-text, .update-components-text, span[dir="ltr"]');
    var timeEl = container && container.querySelector('time');
    posts.push({
      text: textEl ? textEl.textContent.trim().slice(0, 400) : link.textContent.trim(),
      url: href,
      date: timeEl ? (timeEl.getAttribute('datetime') || timeEl.textContent.trim()) : null,
    });
  });

  return { headline: headline, about: about, experience: experience, education: education, posts: posts };
}`

interface ScrapedData {
  scrapedAt: string
  headline: string | null
  about: string | null
  experience: { title: string; company: string; period: string }[]
  education: { school: string; period: string }[]
  posts: { text: string; url: string; date: string | null }[]
}

async function scrapeLinkedInProfile(): Promise<ScrapedData> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  try {
    const page = await browser.newPage()
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    )
    await page.goto(PROFILE_URL, { waitUntil: 'domcontentloaded', timeout: 90000 })
    await new Promise((r) => setTimeout(r, 3000))

    const data = (await page.evaluate(BROWSER_SCRAPE_FN)) as Omit<ScrapedData, 'scrapedAt'>

    return {
      scrapedAt: new Date().toISOString(),
      ...data,
    }
  } finally {
    await browser.close()
  }
}


function writeProfileTs(data: ScrapedData): void {
  writeFileSync(RAW_OUTPUT, JSON.stringify(data, null, 2), 'utf8')
  console.log(`✓ Snapshot: ${RAW_OUTPUT}`)
  console.log(`  Headline: ${data.headline ?? '(vacío)'}`)
  console.log(`  About: ${data.about ? `${data.about.slice(0, 80)}…` : '(vacío)'}`)
  console.log(`  Experiencia: ${data.experience.length} entradas`)
  console.log(`  Educación: ${data.education.length} entradas`)
  console.log(`  Posts/actividad: ${data.posts.length} entradas`)

  if (data.posts.length > 0) {
    console.log('\nPosts detectados:')
    data.posts.slice(0, 10).forEach((p) => console.log(`  → ${p.url}`))
  }
}

async function main(): Promise<void> {
  console.log(`Sincronizando LinkedIn: ${PROFILE_URL}\n`)

  try {
    const data = await scrapeLinkedInProfile()
    writeProfileTs(data)
    console.log('\n✓ Sync completado. Revisa linkedin-sync.raw.json para datos crudos.')
  } catch (error) {
    console.error('✗ Error:', error)
    process.exit(1)
  }
}

main()
