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
  /** One-line home blurb. Family pages keep `thesis`. */
  hubLead: string
  story: CatalogSection[]
  audience: string[]
  offer: string[]
  faq: TopicFaqItem[]
  projectSlugs: string[]
}

export type CaseViewport = 'desktop' | 'mobile'

export interface CaseShot {
  id: string
  src: string
  alt: string
  caption: string
  finding: string
  viewport: CaseViewport
}

export interface CaseMedia {
  before: CaseShot[]
  /** Reserved slots only. Do not attach after screenshots until the redesign is ready. */
  afterSlots: Array<{
    id: string
    label: string
    viewport: CaseViewport
  }>
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
  caseMedia?: CaseMedia
}
