/** Información pública de Prosavis (web, stores, LinkedIn). Sin datos internos. */

export const PROSAVIS_NAME = 'Prosavis'

export const PROSAVIS_URL = 'https://prosavis.com/'

export const PROSAVIS_LIMPIEZA_URL = 'https://prosavis.com/limpieza'

export const PROSAVIS_PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.prosavis.app'

export const PROSAVIS_APP_STORE_URL =
  'https://apps.apple.com/co/app/prosavis/id6754036487'

export const PROSAVIS_ROLE_TITLE = 'App Lead Developer'

export const PROSAVIS_PERIOD = 'Jul 2025 – Presente'

export const PROSAVIS_TAGLINE =
  'La app de confianza para servicios verificados en Colombia'

export const PROSAVIS_SUMMARY =
  'Prosavis conecta personas y empresas con profesionales verificados para el hogar y la oficina: limpieza, plomería, electricidad y más. Incluye búsqueda inteligente, mapa interactivo, chat en tiempo real, agenda y pagos seguros — con cobertura nacional del marketplace y una vertical fuerte de limpieza en el Eje Cafetero.'

export const PROSAVIS_ROLE_SUMMARY =
  'Como App Lead Developer dirijo el desarrollo, la estrategia y el lanzamiento del producto: roadmap, equipo técnico, experiencia móvil y alianzas. Trabajo en una compañía que está creciendo con fuerza en el sector de servicios locales en Colombia.'

export const PROSAVIS_GROWTH_LINE =
  'Marketplace en expansión · producto vivo en producción · stack multi-superficie'

export const PROSAVIS_SUITE = [
  {
    name: 'App móvil',
    detail: 'Producto principal en Android e iOS para contratar servicios verificados.',
  },
  {
    name: 'Web',
    detail: 'Sitio público en prosavis.com con captación, limpieza especializada y conversión.',
  },
  {
    name: 'Panel operativo',
    detail: 'Herramientas internas para operar y escalar el negocio día a día.',
  },
  {
    name: 'Consola de usuario',
    detail: 'Experiencia digital para gestionar cuentas y flujos del cliente.',
  },
  {
    name: 'CRM WhatsApp',
    detail: 'Canal de conversación y seguimiento cercano al cliente.',
  },
  {
    name: 'Backend & datos',
    detail: 'Infraestructura Firebase y APIs que sostienen la suite en producción.',
  },
] as const

export const PROSAVIS_HIGHLIGHTS = [
  'Profesionales verificados y calificaciones reales',
  'Pagos seguros (Wompi) y agendamiento en la app',
  'IA para búsqueda y asistencia al usuario',
  'Prosavis Limpieza en Pereira, Dosquebradas y Cerritos',
] as const

/** Assets públicos de Prosavis-Web / branding (copiados a este sitio). */
export const PROSAVIS_IMAGES = {
  logo: {
    src: '/images/prosavis/logo.svg',
    alt: 'Logo Prosavis',
    width: 56,
    height: 56,
  },
  wordmark: {
    src: '/images/prosavis/nombre.webp',
    alt: 'Prosavis',
    width: 480,
    height: 76,
  },
  og: {
    src: '/images/prosavis/og-prosavis.webp',
    alt: 'Prosavis — servicios verificados en Colombia',
    width: 1200,
    height: 630,
  },
  limpieza: {
    src: '/images/prosavis/limpieza-hero.webp',
    alt: 'Profesional de Prosavis Limpieza en servicio',
    width: 1200,
    height: 900,
  },
  relax: {
    src: '/images/prosavis/limpieza-relax.webp',
    alt: 'Cliente disfrutando mientras Prosavis se encarga',
    width: 1200,
    height: 900,
  },
  mascot: {
    src: '/images/prosavis/prosavito.webp',
    alt: 'Prosavito, mascota de Prosavis',
    width: 320,
    height: 320,
  },
  badgePlay: {
    src: '/images/prosavis/badge-google-play.webp',
    alt: 'Disponible en Google Play',
    width: 180,
    height: 70,
  },
  badgeAppStore: {
    src: '/images/prosavis/badge-app-store.svg',
    alt: 'Consíguelo en el App Store',
    width: 148,
    height: 50,
  },
} as const
