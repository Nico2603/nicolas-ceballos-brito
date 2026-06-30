import {
  PROFESSIONAL_ALUMNI,
  PROFESSIONAL_CREDENTIALS,
  PROFESSIONAL_DESCRIPTION,
  PROFESSIONAL_FULL_NAME,
  PROFESSIONAL_JOB_TITLE,
  PROFESSIONAL_KNOWS_ABOUT,
  PROFESSIONAL_SAME_AS,
  PROFESSIONAL_SHORT_NAME,
} from '../constants/credentials'
import { SEO_OG_IMAGE, SEO_SITE_NAME } from '../constants/seo'
import { EMAIL, FULL_NAME, SITE_URL } from '../constants/social'
import { faqItems } from '../data/faq'
import type { ProjectSeo } from '../data/projects'

export interface TopicFaqItem {
  question: string
  answer: string
}

export interface BreadcrumbItem {
  name: string
  path: string
}

function personNode() {
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: PROFESSIONAL_FULL_NAME,
    givenName: PROFESSIONAL_SHORT_NAME,
    jobTitle: PROFESSIONAL_JOB_TITLE,
    description: PROFESSIONAL_DESCRIPTION,
    url: `${SITE_URL}/about`,
    image: SEO_OG_IMAGE,
    email: EMAIL,
    worksFor: { '@id': `${SITE_URL}/#organization` },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: PROFESSIONAL_ALUMNI.name,
      url: PROFESSIONAL_ALUMNI.url,
    },
    hasCredential: PROFESSIONAL_CREDENTIALS.map((credential) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: credential.category,
      recognizedBy: {
        '@type': 'Organization',
        name: credential.issuer,
      },
    })),
    knowsAbout: [...PROFESSIONAL_KNOWS_ABOUT],
    sameAs: [...PROFESSIONAL_SAME_AS],
  }
}

function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: FULL_NAME,
    url: SITE_URL,
    logo: SEO_OG_IMAGE,
    email: EMAIL,
    sameAs: [...PROFESSIONAL_SAME_AS],
  }
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SEO_SITE_NAME,
    url: SITE_URL,
    inLanguage: 'es-CO',
    publisher: { '@id': `${SITE_URL}/#person` },
    author: { '@id': `${SITE_URL}/#person` },
  }
}

function faqPageNode(id: string, faq: TopicFaqItem[]) {
  return {
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

function breadcrumbNode(path: string, items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}${path}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '/' : item.path}`,
    })),
  }
}

function speakableNode(pageUrl: string, cssSelectors: string[]) {
  return {
    '@type': 'WebPage',
    '@id': `${pageUrl}#speakable`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  }
}

export function buildHomeStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode(),
      personNode(),
      organizationNode(),
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: SEO_SITE_NAME,
        description: PROFESSIONAL_DESCRIPTION,
        inLanguage: 'es-CO',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#person` },
        mainEntity: { '@id': `${SITE_URL}/#person` },
      },
      faqPageNode(`${SITE_URL}/#faq`, faqItems),
      speakableNode(`${SITE_URL}/`, ['#inicio h1', '#inicio .direct-answer', '#faq h2', '.faq-answer']),
    ],
  }
}

export function buildAboutStructuredData(title: string, description: string, breadcrumbs: BreadcrumbItem[]) {
  const pageUrl = `${SITE_URL}/about`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode(),
      personNode(),
      organizationNode(),
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: 'es-CO',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#person` },
        mainEntity: { '@id': `${SITE_URL}/#person` },
      },
      breadcrumbNode('/about', breadcrumbs),
      speakableNode(pageUrl, ['#about-pro h1', '#about-pro .direct-answer']),
    ],
  }
}

export function buildRepositoriesStructuredData(
  title: string,
  description: string,
  repos: { name: string; url: string; description: string }[],
  breadcrumbs: BreadcrumbItem[],
) {
  const pageUrl = `${SITE_URL}/repositories`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode(),
      personNode(),
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: 'es-CO',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        author: { '@id': `${SITE_URL}/#person` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: repos.map((repo, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'SoftwareSourceCode',
              name: repo.name,
              url: repo.url,
              description: repo.description,
              author: { '@id': `${SITE_URL}/#person` },
              codeRepository: repo.url,
            },
          })),
        },
      },
      breadcrumbNode('/repositories', breadcrumbs),
      speakableNode(pageUrl, ['main h1', 'main .direct-answer']),
    ],
  }
}

export function buildProjectStructuredData(project: ProjectSeo, breadcrumbs: BreadcrumbItem[]) {
  const pageUrl = `${SITE_URL}${project.path}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode(),
      personNode(),
      {
        '@type': 'SoftwareSourceCode',
        '@id': `${pageUrl}#project`,
        name: project.title,
        description: project.description,
        url: pageUrl,
        codeRepository: project.repoUrl,
        programmingLanguage: project.language,
        keywords: project.techStack.join(', '),
        author: { '@id': `${SITE_URL}/#person` },
        creator: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: project.pageTitle,
        description: project.pageDescription,
        inLanguage: 'es-CO',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${pageUrl}#project` },
        mainEntity: { '@id': `${pageUrl}#project` },
        author: { '@id': `${SITE_URL}/#person` },
      },
      breadcrumbNode(project.path, breadcrumbs),
      speakableNode(pageUrl, ['main h1', 'main .direct-answer']),
    ],
  }
}

export function buildExpertiseStructuredData(
  slug: string,
  title: string,
  description: string,
  faq: TopicFaqItem[],
  topicName: string,
  breadcrumbs: BreadcrumbItem[],
) {
  const pageUrl = `${SITE_URL}${slug}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode(),
      personNode(),
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: 'es-CO',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#person` },
        mainEntity: {
          '@type': 'Thing',
          name: topicName,
          description,
        },
        author: { '@id': `${SITE_URL}/#person` },
      },
      faqPageNode(`${pageUrl}#faq`, faq),
      breadcrumbNode(slug, breadcrumbs),
      speakableNode(pageUrl, ['main h1', 'main .direct-answer']),
    ],
  }
}

export function buildArticleStructuredData(
  slug: string,
  title: string,
  description: string,
  faq: TopicFaqItem[],
  breadcrumbs: BreadcrumbItem[],
  datePublished: string,
  dateModified: string,
) {
  const pageUrl = `${SITE_URL}${slug}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode(),
      personNode(),
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: title,
        description,
        url: pageUrl,
        inLanguage: 'es-CO',
        datePublished,
        dateModified,
        author: { '@id': `${SITE_URL}/#person` },
        publisher: { '@id': `${SITE_URL}/#person` },
        image: SEO_OG_IMAGE,
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: 'es-CO',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#person` },
      },
      faqPageNode(`${pageUrl}#faq`, faq),
      breadcrumbNode(slug, breadcrumbs),
      speakableNode(pageUrl, ['main h1', 'main .direct-answer', 'main .guia-section h2']),
    ],
  }
}

export function getRepositoriesSnapshot() {
  return [
    {
      name: 'ChatBot-MentalHealth',
      url: 'https://github.com/Nico2603/ChatBot-MentalHealth',
      description:
        'Chatbot especializado en apoyo de salud mental utilizando IA para proporcionar recursos y soporte emocional.',
    },
    {
      name: 'PdM-Manager',
      url: 'https://github.com/Nico2603/PdM-Manager',
      description:
        'Sistema avanzado de gestión para mantenimiento predictivo con React, Node.js y machine learning.',
    },
    {
      name: 'FastQA-HomePage',
      url: 'https://github.com/Nico2603/FastQA-HomePage',
      description: 'Página de inicio moderna para plataforma de preguntas y respuestas rápidas.',
    },
    {
      name: 'magiacafetera-ui',
      url: 'https://github.com/Nico2603/magiacafetera-ui',
      description: 'Interfaz elegante para aplicación de café colombiano premium con Angular y TypeScript.',
    },
  ]
}

export function buildHomeStructuredDataJson(): string {
  return JSON.stringify(buildHomeStructuredData(), null, 2)
}
