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

const DESPUES = '/images/cases/marcela/despues'

export const MARCELA_AFTER_SHOTS: CaseShot[] = [
  {
    id: 'after-home-psico',
    src: `${DESPUES}/home-psico.webp`,
    alt: 'Portada nueva de psicología: Marcela Brito Avellaneda, menú Integrarte, Acompañamiento y Contacto, titular Sobreviviste. Ahora elige cómo vivir.',
    caption: 'Psicología · nombre completo, menú corto y promesa en texto',
    finding: 'Un camino clínico',
    viewport: 'desktop',
  },
  {
    id: 'after-contacto',
    src: `${DESPUES}/contacto.webp`,
    alt: 'Contacto nuevo con aviso de no enviar historias clínicas, correo, WhatsApp y casilla de autorización',
    caption: 'Contacto · sin historia clínica y con consentimiento',
    finding: 'Formulario avisado',
    viewport: 'desktop',
  },
  {
    id: 'after-akashicos',
    src: `${DESPUES}/akashicos.webp`,
    alt: 'Portada de Registros Akáshicos en su subdominio, con menú Primeros Pasos, Profundiza y Contacto',
    caption: 'Registros Akáshicos · otro host y otro menú',
    finding: 'El segundo camino',
    viewport: 'desktop',
  },
  {
    id: 'after-m-home',
    src: `${DESPUES}/m-home.webp`,
    alt: 'Portada de psicología en móvil, en español, sin banner de cookies',
    caption: 'Móvil · primer tramo de psicología',
    finding: 'Sin cookies en inglés',
    viewport: 'mobile',
  },
  {
    id: 'after-m-menu',
    src: `${DESPUES}/m-menu.webp`,
    alt: 'Menú móvil de psicología: Integrarte, Acompañamiento, Consulta y Contacto',
    caption: 'Móvil · menú sin Inicio Copy',
    finding: 'Navegación cerrada',
    viewport: 'mobile',
  },
  {
    id: 'after-m-contacto',
    src: `${DESPUES}/m-contacto.webp`,
    alt: 'Formulario de contacto en móvil, con motivo Consulta y autorización de datos',
    caption: 'Móvil · contacto con consentimiento',
    finding: 'Formulario avisado',
    viewport: 'mobile',
  },
]

export const MARCELA_CASE_MEDIA: CaseMedia = {
  before: MARCELA_BEFORE_SHOTS,
  after: MARCELA_AFTER_SHOTS,
  afterSlots: [],
}

export const MARCELA_HOME_PREVIEWS = MARCELA_BEFORE_SHOTS.filter((shot) =>
  shot.id === 'home-hero' || shot.id === 'adios-trauma' || shot.id === 'contacto',
)

export const MARCELA_HOME_AFTER = MARCELA_AFTER_SHOTS.filter((shot) =>
  shot.id === 'after-home-psico' || shot.id === 'after-contacto' || shot.id === 'after-akashicos',
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
