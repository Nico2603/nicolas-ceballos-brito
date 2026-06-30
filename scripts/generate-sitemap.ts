import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { PRERENDER_ROUTES } from '../src/constants/seo-routes.ts'
import { SITE_URL } from '../src/constants/social.ts'

const today = new Date().toISOString().slice(0, 10)

const urls = PRERENDER_ROUTES.map((route) => {
  const loc = route.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${route.path}`
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(2)}</priority>
  </url>`
}).join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

const outputPath = resolve(process.cwd(), 'public/sitemap.xml')
writeFileSync(outputPath, xml, 'utf8')
console.log(`Generated sitemap with ${PRERENDER_ROUTES.length} URLs`)
