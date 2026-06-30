import { aboutIntro, heroBio } from '../data/content'
import { GITHUB_USERNAME, FULL_NAME } from './social'

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1).trim()}…`
}

export const SEO_HOME_TITLE = `${FULL_NAME} — Portafolio Profesional`

export const SEO_HOME_DESCRIPTION = truncate(heroBio, 160)

export const SEO_HOME_KEYWORDS =
  'Nicolás Ceballos Brito, desarrollador web, portafolio, React, TypeScript, machine learning, ingeniería de sistemas, Pereira, Colombia'

export const SEO_ABOUT_TITLE = `Acerca de mí — ${FULL_NAME}`

export const SEO_ABOUT_DESCRIPTION = truncate(aboutIntro, 160)

export const SEO_ABOUT_KEYWORDS =
  'Nicolás Ceballos Brito, ingeniero de sistemas, Universidad Católica de Pereira, habilidades técnicas, Power BI, SQL, UX/UI'

export const SEO_REPOSITORIES_TITLE = `Repositorios — ${FULL_NAME}`

export const SEO_REPOSITORIES_DESCRIPTION = `Explora los repositorios open source de ${FULL_NAME} (@${GITHUB_USERNAME}) en GitHub: desarrollo web, machine learning, Python, React y más.`

export const SEO_REPOSITORIES_KEYWORDS =
  'GitHub, repositorios, open source, Nicolás Ceballos Brito, Nico2603, proyectos de software'
