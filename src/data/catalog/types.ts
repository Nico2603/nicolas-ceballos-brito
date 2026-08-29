import type { TopicFaqItem } from '../../lib/structured-data'

export type FamilyId =
  | 'salud-mental'
  | 'mantenimiento-predictivo'
  | 'productos-clinicos'
  | 'webs'
  | 'aula'
  | 'academicos'
  | 'prosavis'

export interface CatalogSection {
  heading: string
  paragraphs: string[]
}

export interface CatalogFamily {
  id: FamilyId
  path: string
  navLabel: string
  eyebrow: string
  title: string
  highlight: string
  pageTitle: string
  pageDescription: string
  thesis: string
  story: CatalogSection[]
  audience: string[]
  offer: string[]
  faq: TopicFaqItem[]
  projectSlugs: string[]
}

export interface CatalogProject {
  slug: string
  familyId: FamilyId
  path: string
  title: string
  pageTitle: string
  pageDescription: string
  eyebrow: string
  lead: string
  period?: string
  role?: string
  purpose: string
  stack: string[]
  highlights: string[]
  body: CatalogSection[]
  repoUrl?: string
  liveUrl?: string
  liveUrlLabel?: string
  forkCredit?: string
  faq: TopicFaqItem[]
}
