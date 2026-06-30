import { Helmet } from 'react-helmet-async'
import {
  SEO_KEYWORDS,
  SEO_OG_IMAGE,
  SEO_OG_IMAGE_ALT,
  SEO_OG_IMAGE_HEIGHT,
  SEO_OG_IMAGE_WIDTH,
  SEO_SITE_NAME,
} from '../constants/seo'
import { SITE_URL, TWITTER_HANDLE } from '../constants/social'

interface SeoHelmetProps {
  title: string
  description: string
  canonicalPath: string
  ogType?: 'website' | 'article'
  keywords?: string
  structuredData?: Record<string, unknown> | Record<string, unknown>[]
  noindex?: boolean
}

function normalizePath(path: string): string {
  if (path === '/') return '/'
  return path.endsWith('/') ? path.slice(0, -1) : path
}

export default function SeoHelmet({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  keywords = SEO_KEYWORDS,
  structuredData,
  noindex = false,
}: SeoHelmetProps) {
  const path = normalizePath(canonicalPath)
  const canonicalUrl = `${SITE_URL}${path === '/' ? '/' : path}`
  const robots = noindex ? 'noindex,nofollow' : 'index,follow'

  const jsonLdBlocks = structuredData
    ? Array.isArray(structuredData)
      ? structuredData
      : [structuredData]
    : []

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <meta name="theme-color" content="#2a5c82" />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" href={canonicalUrl} hrefLang="es-CO" />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content="es_CO" />
      <meta property="og:site_name" content={SEO_SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={SEO_OG_IMAGE} />
      <meta property="og:image:width" content={String(SEO_OG_IMAGE_WIDTH)} />
      <meta property="og:image:height" content={String(SEO_OG_IMAGE_HEIGHT)} />
      <meta property="og:image:alt" content={SEO_OG_IMAGE_ALT} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SEO_OG_IMAGE} />
      <meta name="twitter:image:alt" content={SEO_OG_IMAGE_ALT} />
      {jsonLdBlocks.map((block, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  )
}
