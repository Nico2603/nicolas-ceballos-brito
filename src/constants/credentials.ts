import { SOCIAL_LINKS } from './social'
import {
  PROFESSIONAL_DESCRIPTION as PROFILE_DESCRIPTION,
  PROFESSIONAL_JOB_TITLE as PROFILE_JOB_TITLE,
  PROFESSIONAL_WORKS_FOR as PROFILE_WORKS_FOR,
  graduation,
} from '../data/profile'

export const PROFESSIONAL_FULL_NAME = 'Nicolás Ceballos Brito'

export const PROFESSIONAL_SHORT_NAME = 'Nicolás'

export const PROFESSIONAL_JOB_TITLE = PROFILE_JOB_TITLE

export const PROFESSIONAL_DESCRIPTION = PROFILE_DESCRIPTION

export const PROFESSIONAL_ALUMNI = {
  name: graduation.institution,
  url: graduation.institutionUrl,
} as const

export const PROFESSIONAL_WORKS_FOR = PROFILE_WORKS_FOR

export const PROFESSIONAL_EXPERIENCE = [
  {
    title: 'App Lead Developer',
    company: 'Prosavis',
    startDate: '2025-07',
  },
  {
    title: 'Cross-Platform Mobile Application Developer',
    company: 'Neacsu Horizont Ventures',
    startDate: '2025-07',
  },
] as const

export const PROFESSIONAL_CREDENTIALS = [
  { category: 'SQL', issuer: 'Certificación profesional' },
  { category: 'Power BI', issuer: 'Certificación profesional' },
  { category: 'UX/UI', issuer: 'Certificación profesional' },
  { category: 'Metodologías ágiles', issuer: 'Certificación profesional' },
] as const

export const PROFESSIONAL_KNOWS_ABOUT = [
  'Desarrollo web',
  'React',
  'TypeScript',
  'JavaScript',
  'Python',
  'Machine Learning',
  'Inteligencia artificial',
  'Análisis de datos',
  'Power BI',
  'Node.js',
  'Docker',
  'Flutter',
  'Industria 4.0',
  'Mantenimiento predictivo',
  'Programación competitiva',
] as const

export const PROFESSIONAL_SAME_AS = [
  SOCIAL_LINKS.github,
  SOCIAL_LINKS.linkedin,
  SOCIAL_LINKS.twitter,
  SOCIAL_LINKS.instagram,
  SOCIAL_LINKS.facebook,
  SOCIAL_LINKS.huggingface,
] as const
