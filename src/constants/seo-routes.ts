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

export const PRERENDER_ROUTES: SeoRoute[] = [
  { path: '/', changefreq: 'monthly', priority: 1.0 },
  { path: '/about', changefreq: 'monthly', priority: 0.9 },
  { path: '/repositories', changefreq: 'weekly', priority: 0.85 },
  { path: '/proyectos/chatbot-mental-health', changefreq: 'monthly', priority: 0.8 },
  { path: '/proyectos/pdm-manager', changefreq: 'monthly', priority: 0.8 },
  { path: '/proyectos/fastqa-homepage', changefreq: 'monthly', priority: 0.8 },
  { path: '/proyectos/magiacafetera-ui', changefreq: 'monthly', priority: 0.8 },
  { path: '/desarrollo-web', changefreq: 'monthly', priority: 0.85 },
  { path: '/inteligencia-artificial', changefreq: 'monthly', priority: 0.85 },
  { path: '/analisis-datos', changefreq: 'monthly', priority: 0.85 },
  { path: '/guias/como-estructurar-portafolio-desarrollador', changefreq: 'monthly', priority: 0.75 },
  { path: '/guias/machine-learning-proyectos-estudiantes', changefreq: 'monthly', priority: 0.75 },
  { path: '/guias/react-typescript-proyectos-reales', changefreq: 'monthly', priority: 0.75 },
]
