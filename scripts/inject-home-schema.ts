import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  buildFullHomeStructuredDataJson,
  buildHomeStructuredDataJson,
} from '../src/lib/structured-data.ts'

const indexPath = resolve(process.cwd(), 'index.html')
const schemaDir = resolve(process.cwd(), 'public/schema')
const schemaPath = resolve(schemaDir, 'home.jsonld')
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

mkdirSync(schemaDir, { recursive: true })
writeFileSync(schemaPath, buildFullHomeStructuredDataJson(), 'utf8')

console.log('index.html: JSON-LD lite inyectado desde buildHomeStructuredData()')
console.log('public/schema/home.jsonld: schema completo generado')
