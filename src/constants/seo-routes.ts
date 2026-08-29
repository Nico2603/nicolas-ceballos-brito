import { getCatalogPrerenderPaths } from '../data/catalog'

export interface SeoRoute {
  path: string
  changefreq: 'weekly' | 'monthly' | 'yearly'
  priority: number
}

export const PROJECT_SLUGS = [
  'chatbot-mental-health',
  'pdm-manager',
  'fastqa-homepage',
  'magiacafetera-ui',
] as const

export type ProjectSlug = (typeof PROJECT_SLUGS)[number]

export const GUIDE_SLUGS = [
  'como-estructurar-portafolio-desarrollador',
  'machine-learning-proyectos-estudiantes',
  'react-typescript-proyectos-reales',
] as const

export type GuideSlug = (typeof GUIDE_SLUGS)[number]

export const EXPERTISE_SLUGS = [
  '/desarrollo-web',
  '/inteligencia-artificial',
  '/analisis-datos',
] as const

const catalogRoutes: SeoRoute[] = getCatalogPrerenderPaths().map((path) => ({
  path,
  changefreq: 'monthly',
  priority: path.split('/').filter(Boolean).length === 1 ? 0.86 : 0.8,
}))

export const PRERENDER_ROUTES: SeoRoute[] = [
  { path: '/', changefreq: 'monthly', priority: 1.0 },
  { path: '/about', changefreq: 'monthly', priority: 0.9 },
  { path: '/repositories', changefreq: 'weekly', priority: 0.85 },
  ...catalogRoutes,
  { path: '/desarrollo-web', changefreq: 'monthly', priority: 0.85 },
  { path: '/inteligencia-artificial', changefreq: 'monthly', priority: 0.85 },
  { path: '/analisis-datos', changefreq: 'monthly', priority: 0.85 },
  { path: '/guias', changefreq: 'monthly', priority: 0.8 },
  { path: '/guias/como-estructurar-portafolio-desarrollador', changefreq: 'monthly', priority: 0.75 },
  { path: '/guias/machine-learning-proyectos-estudiantes', changefreq: 'monthly', priority: 0.75 },
  { path: '/guias/react-typescript-proyectos-reales', changefreq: 'monthly', priority: 0.75 },
  { path: '/politica-privacidad', changefreq: 'yearly', priority: 0.3 },
]
