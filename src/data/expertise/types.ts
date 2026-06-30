import type { NarrativeSection } from '../../types/content'
import type { BreadcrumbItem, TopicFaqItem } from '../../lib/structured-data'

export interface ExpertiseContent {
  pageTitle: string
  pageDescription: string
  slug: string
  topicName: string
  breadcrumbs: BreadcrumbItem[]
  eyebrow: string
  h1: string
  lead: string
  sections: NarrativeSection[]
  leftCardTitle: string
  leftCardItems: string[]
  rightCardTitle: string
  rightCardItems: string[]
  faqTitle: string
  faq: TopicFaqItem[]
}
