import type { LinkedInPost } from '../types'
import { SOCIAL_LINKS } from '../constants/social'

export const linkedInPosts: LinkedInPost[] = [
  {
    id: 'graduacion-ucp-2025',
    title: 'Ingeniero en Sistemas y Telecomunicaciones — UCP 2025',
    excerpt:
      'Culmino mi formación en Ingeniería de Sistemas y Telecomunicaciones en la Universidad Católica de Pereira. Cuatro años de semilleros, programación competitiva, representación estudiantil y proyectos de IA aplicada.',
    publishedAt: '2025-12-15',
    imageUrl: '/images/p2.webp',
    postUrl: SOCIAL_LINKS.linkedin,
    featured: true,
    tags: ['Graduación', 'UCP', 'Ingeniería'],
  },
  {
    id: 'prosavis-launch',
    title: 'Liderando el desarrollo de Prosavis',
    excerpt:
      'Como App Lead Developer dirijo la estrategia, el roadmap y el lanzamiento de Prosavis: una plataforma móvil de servicios pensada para Colombia, con equipo de producto y partnerships activos.',
    publishedAt: '2025-11-20',
    postUrl: SOCIAL_LINKS.linkedin,
    tags: ['Prosavis', 'Producto', 'Flutter'],
  },
  {
    id: 'compromiso-comunitario',
    title: 'Compromiso comunitario y liderazgo estudiantil',
    excerpt:
      'Lideré una iniciativa de impacto social para asistir a más de 500 familias, movilizando recursos para entregar 170 kits educativos. El compromiso universitario con el desarrollo comunitario sostenible.',
    publishedAt: '2024-05-10',
    imageUrl: '/images/p4.webp',
    postUrl:
      'https://www.linkedin.com/posts/nicolas-ceballos-brito_compromisocomunitario-solidaridad-liderazgoestudiantil-activity-7193365777515773953-7wOj',
    tags: ['Liderazgo', 'Comunidad', 'UCP'],
  },
  {
    id: 'venture-studio-ia',
    title: 'Formación en IA y Venture Studio',
    excerpt:
      'Participé en el programa AI Engineer Training & Venture Studio de Teilur.ai, desarrollando MVPs impulsados por inteligencia artificial en un entorno ágil de alto rendimiento.',
    publishedAt: '2025-06-01',
    postUrl: SOCIAL_LINKS.linkedin,
    tags: ['IA', 'Venture Studio', 'MVPs'],
  },
]

export function getFeaturedLinkedInPost(): LinkedInPost | undefined {
  return linkedInPosts.find((post) => post.featured)
}

export function getSecondaryLinkedInPosts(): LinkedInPost[] {
  return linkedInPosts.filter((post) => !post.featured)
}
