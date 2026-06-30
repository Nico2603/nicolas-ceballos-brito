import { buildHomeStructuredDataJson } from '../src/lib/structured-data.ts'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const indexPath = resolve(process.cwd(), 'index.html')
const placeholder = '<!-- INJECT_HOME_JSON_LD -->'

let html = readFileSync(indexPath, 'utf8')
const jsonLd = buildHomeStructuredDataJson()
const scriptBlock = `<script type="application/ld+json">\n${jsonLd}\n    </script>`

if (html.includes(placeholder)) {
  html = html.replace(placeholder, scriptBlock)
} else if (html.includes('application/ld+json')) {
  html = html.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    scriptBlock,
  )
} else {
  html = html.replace('</head>', `    ${scriptBlock}\n  </head>`)
}

writeFileSync(indexPath, html, 'utf8')
console.log('index.html: JSON-LD unificado desde buildHomeStructuredData()')
