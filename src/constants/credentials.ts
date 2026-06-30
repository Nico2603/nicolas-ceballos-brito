import { SOCIAL_LINKS } from './social'
import {
  PROFESSIONAL_DESCRIPTION as PROFILE_DESCRIPTION,
  PROFESSIONAL_JOB_TITLE as PROFILE_JOB_TITLE,
  PROFESSIONAL_WORKS_FOR as PROFILE_WORKS_FOR,
  graduation,
} from '../data/profile'
import { linkedInCertifications, linkedInExperience } from '../data/linkedin-profile'

export const PROFESSIONAL_FULL_NAME = 'Nicolás Ceballos Brito'

export const PROFESSIONAL_SHORT_NAME = 'Nicolás'

export const PROFESSIONAL_JOB_TITLE = PROFILE_JOB_TITLE

export const PROFESSIONAL_DESCRIPTION = PROFILE_DESCRIPTION

export const PROFESSIONAL_ALUMNI = {
  name: graduation.institution,
  url: graduation.institutionUrl,
} as const

export const PROFESSIONAL_WORKS_FOR = PROFILE_WORKS_FOR

export const PROFESSIONAL_EXPERIENCE = linkedInExperience
  .filter((role) => role.current)
  .map((role) => ({
    title: role.title,
    company: role.company,
    startDate: role.period.split('–')[0]?.trim() ?? role.period,
  }))

export const PROFESSIONAL_CREDENTIALS = linkedInCertifications.map((cert) => ({
  category: cert.name,
  issuer: cert.issuer,
  credentialUrl: cert.credentialUrl,
})) as readonly { category: string; issuer: string; credentialUrl?: string }[]

export const PROFESSIONAL_KNOWS_ABOUT = [
  'Desarrollo web',
  'React',
  'TypeScript',
  'JavaScript',
  'Python',
  'Flutter',
  'Machine Learning',
  'Inteligencia artificial',
  'Análisis de datos',
  'Power BI',
  'Node.js',
  'Docker',
  'Industria 4.0',
  'Mantenimiento predictivo',
  'Programación competitiva',
  'CI/CD',
  'Venture Studio',
  'Desarrollo móvil',
] as const

export const PROFESSIONAL_SAME_AS = [
  SOCIAL_LINKS.github,
  SOCIAL_LINKS.linkedin,
  SOCIAL_LINKS.twitter,
  SOCIAL_LINKS.instagram,
  SOCIAL_LINKS.facebook,
  SOCIAL_LINKS.huggingface,
] as const
