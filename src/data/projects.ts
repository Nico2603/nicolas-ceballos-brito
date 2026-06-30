import type { ProjectSlug } from '../constants/seo-routes'
import { featuredProjects } from './content'

export interface ProjectSeo {
  slug: ProjectSlug
  path: string
  title: string
  pageTitle: string
  pageDescription: string
  directAnswer: string
  description: string
  language: string
  techStack: string[]
  highlights: string[]
  repoUrl: string
  imageUrl: string
  stars: number
}

const projectMeta: Record<
  ProjectSlug,
  { slug: ProjectSlug; directAnswer: string; highlights: string[]; pageDescription: string }
> = {
  'chatbot-mental-health': {
    slug: 'chatbot-mental-health',
    directAnswer:
      'ChatBot-MentalHealth es un chatbot de apoyo en salud mental desarrollado con Python, Flask e inteligencia artificial para ofrecer recursos y acompañamiento emocional a usuarios que lo necesiten.',
    highlights: [
      'Procesamiento de lenguaje natural para conversaciones empáticas',
      'API REST con Flask para integración flexible',
      'Enfoque en accesibilidad y privacidad del usuario',
    ],
    pageDescription:
      'Chatbot de salud mental con IA, Python y Flask. Proyecto open source de Nicolás Ceballos Brito para apoyo emocional automatizado.',
  },
  'pdm-manager': {
    slug: 'pdm-manager',
    directAnswer:
      'PdM-Manager es un sistema de gestión de mantenimiento predictivo que combina React, Node.js y machine learning para optimizar recursos industriales y prevenir fallos técnicos.',
    highlights: [
      'Dashboard interactivo con React y visualización de datos',
      'Modelos de ML para predicción de fallos industriales',
      'Arquitectura full-stack con API Node.js',
    ],
    pageDescription:
      'Sistema de mantenimiento predictivo con React, Node.js y ML. Proyecto industrial de Nicolás Ceballos Brito para Industria 4.0.',
  },
  'fastqa-homepage': {
    slug: 'fastqa-homepage',
    directAnswer:
      'FastQA-HomePage es una landing page moderna para una plataforma de preguntas y respuestas rápidas, con diseño centrado en la experiencia del usuario usando HTML, CSS y JavaScript.',
    highlights: [
      'Diseño responsive y accesible',
      'Animaciones y microinteracciones en vanilla JS',
      'Estructura semántica optimizada para SEO',
    ],
    pageDescription:
      'Landing page para plataforma Q&A con HTML, CSS y JavaScript. Proyecto frontend de Nicolás Ceballos Brito.',
  },
  'magiacafetera-ui': {
    slug: 'magiacafetera-ui',
    directAnswer:
      'magiacafetera-ui es una interfaz elegante para una aplicación de café colombiano premium, desarrollada con Angular, TypeScript y SASS con enfoque en diseño visual refinado.',
    highlights: [
      'Componentes reutilizables en Angular',
      'Estilos modulares con SASS',
      'Experiencia de usuario orientada a marca premium',
    ],
    pageDescription:
      'UI para app de café colombiano con Angular, TypeScript y SASS. Proyecto frontend de Nicolás Ceballos Brito.',
  },
}

const slugById: Record<string, ProjectSlug> = {
  'portafolio-chatbot': 'chatbot-mental-health',
  'portafolio-pdm': 'pdm-manager',
  'portafolio-fastqa': 'fastqa-homepage',
  'portafolio-magia': 'magiacafetera-ui',
}

export const projectsSeo: ProjectSeo[] = featuredProjects
  .filter((p) => p.status === 'active' && slugById[p.id])
  .map((project) => {
    const slug = slugById[project.id]!
    const meta = projectMeta[slug]
    return {
      slug,
      path: `/proyectos/${slug}`,
      title: project.title,
      pageTitle: `${project.title} — Proyecto de Nicolás Ceballos Brito`,
      pageDescription: meta.pageDescription,
      directAnswer: meta.directAnswer,
      description: project.description,
      language: project.language,
      techStack: project.techTags,
      highlights: meta.highlights,
      repoUrl: project.repoUrl,
      imageUrl: project.imageUrl,
      stars: project.stars,
    }
  })

export function getProjectBySlug(slug: string): ProjectSeo | undefined {
  return projectsSeo.find((p) => p.slug === slug)
}

export function getProjectSlugById(id: string): string | undefined {
  const projectSlug = slugById[id]
  return projectSlug ? `/proyectos/${projectSlug}` : undefined
}
