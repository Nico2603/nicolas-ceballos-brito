export const GITHUB_USERNAME = 'Nico2603'

export const SITE_URL = 'https://nicolasceballosbrito.com'

export const FULL_NAME = 'Nicolás Ceballos Brito'

export const EMAIL = 'nicolasceballosbrito@gmail.com'

export const CONTACT_EMAIL = EMAIL

export const WHATSAPP_PHONE_E164 = '573135959733'
export const WHATSAPP_PHONE_DISPLAY = '+57 313 595 9733'
export const WHATSAPP_DEFAULT_MESSAGE = 'Hola Nicolás, me interesa colaborar contigo'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`
export const WHATSAPP_BOOKING_MESSAGE = 'Hola Nicolás, me interesa colaborar contigo en un proyecto'
export function buildWhatsappBookingUrl(source: string): string {
  const message = `${WHATSAPP_BOOKING_MESSAGE}. Llegué desde: ${source}`
  return `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent(message)}`
}
export const WHATSAPP_BOOKING_URL = buildWhatsappBookingUrl('sitio web')

export const TWITTER_HANDLE = '@NicolasCBrito'

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/NicolasCeballosBrito',
  twitter: 'https://twitter.com/NicolasCBrito',
  instagram: 'https://www.instagram.com/nico_ceballos26/',
  linkedin: 'https://www.linkedin.com/in/nicolas-ceballos-brito/',
  github: 'https://github.com/Nico2603',
  huggingface: 'https://huggingface.co/Flackoooo',
} as const

export const MAILTO_SUBJECT = 'Propuesta de Colaboración'

export const MAILTO_BODY =
  'Hola Nicolás, me gustaría discutir una oportunidad de colaboración en el siguiente proyecto:'
