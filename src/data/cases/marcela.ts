import type { CaseMedia, CaseShot } from '../catalog/types'

const ANTES = '/images/cases/marcela/antes'

export const MARCELA_BEFORE_SHOTS: CaseShot[] = [
  {
    id: 'home-hero',
    src: `${ANTES}/home-hero.webp`,
    alt: 'Portada viva de marcelabritoavellaneda.com: promesa en imagen y banner de cookies en inglés',
    caption: 'Portada · promesa dentro de una imagen, sin H1 de texto',
    finding: 'Promesa ambigua + cookies en inglés',
    viewport: 'desktop',
  },
  {
    id: 'home-menu',
    src: `${ANTES}/home-menu.webp`,
    alt: 'Menú de la portada con el ítem Inicio Copy publicado',
    caption: 'Navegación · Inicio Copy indexable',
    finding: 'Arquitectura editorial sin terminar',
    viewport: 'desktop',
  },
  {
    id: 'inicio-copy',
    src: `${ANTES}/inicio-copy.webp`,
    alt: 'Página /inicio-copy, duplicado público de la portada',
    caption: 'Ruta /inicio-copy publicada',
    finding: 'Duplicado indexable',
    viewport: 'desktop',
  },
  {
    id: 'adios-trauma',
    src: `${ANTES}/adios-trauma.webp`,
    alt: 'Recurso Adiós Trauma con rótulos de YouTube, Spotify y Docs sin enlace',
    caption: 'Adiós Trauma · 36 rótulos sin destino',
    finding: 'Embudo clínico roto',
    viewport: 'desktop',
  },
  {
    id: 'contacto',
    src: `${ANTES}/contacto.webp`,
    alt: 'Formulario de contacto con mensaje libre y sin aviso sobre datos clínicos',
    caption: 'Contacto · mensaje libre sin consentimiento contextual',
    finding: 'Formulario sensible',
    viewport: 'desktop',
  },
  {
    id: 'consulta',
    src: `${ANTES}/consulta.webp`,
    alt: 'Página de consulta psicológica del sitio actual',
    caption: 'Consulta psicológica',
    finding: 'Oferta clínica',
    viewport: 'desktop',
  },
  {
    id: 'ra2',
    src: `${ANTES}/ra2.webp`,
    alt: 'Certificación akáshica Nivel 2 bajo la misma marca de psicóloga',
    caption: 'Nivel 2 · autoridad clínica sobre oferta espiritual',
    finding: 'C1 · autoridad mezclada',
    viewport: 'desktop',
  },
  {
    id: 'libros',
    src: `${ANTES}/libros.webp`,
    alt: 'Catálogo de libros que mezcla línea clínica y espiritual',
    caption: 'Libros · catálogo mezclado, fuera del menú',
    finding: 'Catálogo sin jerarquía',
    viewport: 'desktop',
  },
  {
    id: 'renacer-500',
    src: `${ANTES}/renacer-500.webp`,
    alt: 'Chrome no resuelve renacer.marcelabritoavellaneda.com: DNS NXDOMAIN',
    caption: 'Renacer · el subdominio no resuelve',
    finding: 'Oferta caída',
    viewport: 'desktop',
  },
  {
    id: 'm-home',
    src: `${ANTES}/m-home.webp`,
    alt: 'Portada en viewport móvil con cookies en inglés tapando el recorrido',
    caption: 'Móvil · portada y cookies en inglés',
    finding: 'Cookies EN',
    viewport: 'mobile',
  },
  {
    id: 'm-menu',
    src: `${ANTES}/m-menu.webp`,
    alt: 'Menú móvil abierto con Inicio Copy',
    caption: 'Móvil · menú con Inicio Copy',
    finding: 'Inicio Copy',
    viewport: 'mobile',
  },
  {
    id: 'm-adios-trauma',
    src: `${ANTES}/m-adios-trauma.webp`,
    alt: 'Adiós Trauma en móvil: rótulos de video y audio sin enlace',
    caption: 'Móvil · Adiós Trauma sin destinos',
    finding: 'Embudo clínico roto',
    viewport: 'mobile',
  },
  {
    id: 'm-contacto',
    src: `${ANTES}/m-contacto.webp`,
    alt: 'Formulario de contacto en móvil',
    caption: 'Móvil · contacto sin aviso clínico',
    finding: 'Formulario sensible',
    viewport: 'mobile',
  },
]

export const MARCELA_CASE_MEDIA: CaseMedia = {
  before: MARCELA_BEFORE_SHOTS,
  afterSlots: [
    { id: 'after-home', label: 'Portada · dos caminos claros', viewport: 'desktop' },
    { id: 'after-contacto', label: 'Contacto · mínimo y avisado', viewport: 'desktop' },
    { id: 'after-mobile', label: 'Móvil · primer tramo usable', viewport: 'mobile' },
  ],
}

export const MARCELA_HOME_PREVIEWS = MARCELA_BEFORE_SHOTS.filter((shot) =>
  shot.id === 'home-hero' || shot.id === 'adios-trauma' || shot.id === 'contacto',
)

export const LANDING_THUMBS = {
  nicolas: {
    src: '/images/cases/landings/thumb-nicolas.webp',
    alt: 'Portada de nicolasceballosbrito.com',
    href: 'https://nicolasceballosbrito.com',
    label: 'Este portafolio',
    stack: 'React · Vite · Ink & Steel',
  },
  rayito: {
    src: '/images/cases/landings/thumb-rayito.webp',
    alt: 'Portada de rayitodesolpsico.com',
    href: 'https://rayitodesolpsico.com',
    label: 'Rayito de Sol',
    stack: 'React · marca de Camila',
  },
} as const
