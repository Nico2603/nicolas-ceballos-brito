const LINKEDIN_CANONICAL_HOST = 'www.linkedin.com'

/**
 * Normaliza URLs de LinkedIn al host canónico www.linkedin.com.
 * Corrige hosts mal formados del scraper (p. ej. es.www.linkedin.com).
 */
export function normalizeLinkedInUrl(url: string): string {
  const trimmed = url.trim()
  if (!trimmed) return trimmed

  try {
    const parsed = new URL(trimmed)
    if (!parsed.hostname.toLowerCase().includes('linkedin.com')) {
      return trimmed
    }

    parsed.protocol = 'https:'
    parsed.hostname = LINKEDIN_CANONICAL_HOST
    return parsed.toString()
  } catch {
    return trimmed
      .replace(/https?:\/\/(?:[a-z]{2}\.)?www\.linkedin\.com/gi, `https://${LINKEDIN_CANONICAL_HOST}`)
      .replace(/https?:\/\/linkedin\.com/gi, `https://${LINKEDIN_CANONICAL_HOST}`)
  }
}

/** Patrones de host inválidos que provocan NXDOMAIN en Safari. */
export const INVALID_LINKEDIN_HOST_PATTERNS = [/es\.www\.linkedin/i, /www\.es\.linkedin/i] as const

export function isInvalidLinkedInUrl(url: string): boolean {
  return INVALID_LINKEDIN_HOST_PATTERNS.some((pattern) => pattern.test(url))
}
