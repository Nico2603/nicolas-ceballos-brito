import { linkedInActivity } from '../src/data/linkedin-profile.ts'
import {
  isInvalidLinkedInUrl,
  normalizeLinkedInUrl,
} from '../src/lib/normalize-linkedin-url.ts'

let failed = false

for (const entry of linkedInActivity) {
  if (isInvalidLinkedInUrl(entry.url)) {
    console.error(`✗ URL de LinkedIn inválida (${entry.id}): ${entry.url}`)
    failed = true
    continue
  }

  const normalized = normalizeLinkedInUrl(entry.url)
  if (isInvalidLinkedInUrl(normalized)) {
    console.error(`✗ URL de LinkedIn sigue inválida tras normalizar (${entry.id}): ${normalized}`)
    failed = true
    continue
  }

  try {
    const host = new URL(normalized).hostname.toLowerCase()
    if (host !== 'www.linkedin.com') {
      console.error(`✗ Host de LinkedIn inesperado (${entry.id}): ${host}`)
      failed = true
    }
  } catch {
    console.error(`✗ URL de LinkedIn mal formada (${entry.id}): ${entry.url}`)
    failed = true
  }
}

if (failed) {
  console.error('\nCorrige las URLs en src/data/linkedin-profile.ts antes del build.')
  process.exit(1)
}

console.log(`✓ ${linkedInActivity.length} URLs de LinkedIn validadas`)
