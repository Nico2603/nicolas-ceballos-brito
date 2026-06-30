import { SOCIAL_LINKS } from '../constants/social'

export const graduation = {
  degree: 'Ingeniero en Sistemas y Telecomunicaciones',
  institution: 'Universidad Católica de Pereira',
  institutionUrl: 'https://www.ucp.edu.co/',
  year: 2025,
  period: '2021 – 2025',
  highlight:
    'Graduado con trayectoria en semilleros de investigación, representación estudiantil, programación competitiva e Industria 4.0.',
} as const

export const heroBio =
  'Ingeniero en Sistemas y Telecomunicaciones graduado de la Universidad Católica de Pereira. Lidero el desarrollo de Prosavis y construyo soluciones móvil, web e IA con impacto real en Colombia.'

export const aboutIntro =
  'Soy Ingeniero en Sistemas y Telecomunicaciones de la Universidad Católica de Pereira (2025). Lidero el desarrollo de Prosavis como App Lead Developer y desarrollo aplicaciones cross-platform en Neacsu Horizont Ventures. Mi experiencia abarca machine learning para mantenimiento predictivo, chatbots con IA, desarrollo web con React y TypeScript, y formación en venture studios de inteligencia artificial. Como representante estudiantil y participante en semilleros de investigación obtuve certificaciones en SQL, Power BI, UX/UI y metodologías ágiles.'

export interface CurrentRole {
  id: string
  title: string
  company: string
  period: string
  description: string
  highlights: string[]
  tags: string[]
  linkedinUrl: string
  featured?: boolean
  initials: string
}

export const currentRoles: CurrentRole[] = [
  {
    id: 'prosavis',
    title: 'App Lead Developer',
    company: 'Prosavis',
    period: 'Jul 2025 – Presente',
    description:
      'Dirijo el desarrollo, estrategia y lanzamiento de Prosavis, una plataforma móvil de servicios en Colombia.',
    highlights: [
      'Gestión de equipo de producto, roadmap y partnerships',
      'Arquitectura móvil con Flutter y backend Firebase',
      'Marketing digital y estrategia de lanzamiento',
    ],
    tags: ['Flutter', 'Firebase', 'Producto', 'Roadmap'],
    linkedinUrl: SOCIAL_LINKS.linkedin,
    featured: true,
    initials: 'P',
  },
  {
    id: 'neacsu',
    title: 'Cross-Platform Mobile Application Developer',
    company: 'Neacsu Horizont Ventures',
    period: 'Jul 2025 – Presente',
    description:
      'Desarrollo el ciclo completo de productos móviles y cross-platform, desde requisitos hasta despliegue.',
    highlights: [
      'Landing pages, APIs backend y bases de datos',
      'Flutter, React Native y metodologías ágiles con CI/CD',
      'Testing automatizado y optimización de UX',
    ],
    tags: ['Flutter', 'React Native', 'CI/CD', 'APIs'],
    linkedinUrl: SOCIAL_LINKS.linkedin,
    initials: 'NH',
  },
  {
    id: 'teilur',
    title: 'AI Engineer Training — Venture Studio',
    company: 'Teilur.ai / Modin.ai',
    period: 'Mar 2025 – Ago 2025',
    description:
      'Programa de formación en ingeniería de IA y desarrollo de MVPs impulsados por inteligencia artificial.',
    highlights: [
      'MVPs con herramientas de IA de vanguardia',
      'Entorno ágil de venture studio en LATAM',
      'Transformación de ideas en productos escalables',
    ],
    tags: ['IA', 'MVPs', 'Venture Studio', 'GenAI'],
    linkedinUrl: SOCIAL_LINKS.linkedin,
    initials: 'T',
  },
]

export const PROFESSIONAL_JOB_TITLE =
  'Ingeniero en Sistemas y Telecomunicaciones · App Lead Developer'

export const PROFESSIONAL_DESCRIPTION = heroBio

export const PROFESSIONAL_WORKS_FOR = {
  name: 'Prosavis',
  url: SOCIAL_LINKS.linkedin,
} as const
