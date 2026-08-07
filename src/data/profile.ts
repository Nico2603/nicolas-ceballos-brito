import {
  linkedInAbout,
  linkedInEducation,
  linkedInExperience,
  linkedInHeadline,
  linkedInLocation,
  linkedInTypingLines,
  type LinkedInExperienceEntry,
} from './linkedin-profile'
import { SOCIAL_LINKS } from '../constants/social'

const ucpEducation = linkedInEducation.find((e) => e.id === 'ucp')!

export const graduation = {
  degree: ucpEducation.degree,
  institution: ucpEducation.school,
  institutionUrl: ucpEducation.schoolUrl ?? 'https://www.ucp.edu.co/',
  year: 2025,
  period: ucpEducation.period,
  highlight: ucpEducation.description,
  activities: ucpEducation.activities,
} as const

export const heroBio =
  'App Lead Developer en Prosavis, la plataforma de servicios verificados en Colombia. Diseño y construyo productos web y móvil para startups y empresas — disponible para proyectos freelance y colaboraciones selectas.'

export const aboutIntro = linkedInAbout

export type CurrentRole = LinkedInExperienceEntry & {
  linkedinUrl: string
  tags: string[]
}

function roleTags(role: LinkedInExperienceEntry): string[] {
  if (role.id === 'prosavis') return ['CTO', 'Producto', 'Flutter', 'Firebase']
  if (role.id === 'neacsu') return ['Flutter', 'React Native', 'CI/CD', 'APIs']
  if (role.id === 'modin' || role.id === 'teilur') return ['IA', 'MVPs', 'Venture Studio', 'GenAI']
  return []
}

export const currentRoles: CurrentRole[] = linkedInExperience.map((role) => ({
  ...role,
  linkedinUrl: role.companyUrl ?? SOCIAL_LINKS.linkedin,
  tags: roleTags(role),
}))

export const PROFESSIONAL_JOB_TITLE = linkedInHeadline.split('|')[0]?.trim() ?? linkedInHeadline

export const PROFESSIONAL_DESCRIPTION = linkedInAbout

export const PROFESSIONAL_WORKS_FOR = {
  name: 'Prosavis',
  url: SOCIAL_LINKS.linkedin,
} as const

export const PROFESSIONAL_LOCATION = linkedInLocation

export { linkedInTypingLines }
