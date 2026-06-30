import {
  buildWhatsappBookingUrl,
  CONTACT_EMAIL,
  WHATSAPP_PHONE_DISPLAY,
  WHATSAPP_URL,
} from '../constants/social'

export const CONTACT_SECTION_LABEL = 'Contacto'
export const CONTACT_HEADING_START = '¿Trabajamos '
export const CONTACT_HEADING_ACCENT = 'juntos?'
export const CONTACT_SUBCOPY =
  'Estoy disponible para colaborar en proyectos desafiantes. Cuéntame tu idea y te responderé en menos de 48 horas.'

export interface ContactInfoItem {
  icon: 'map-pin' | 'whatsapp' | 'mail'
  title: string
  value: string
  href?: string
}

export const contactInfoItems: ContactInfoItem[] = [
  {
    icon: 'map-pin',
    title: 'Ubicación',
    value: 'Pereira, Colombia — disponible remoto',
  },
  {
    icon: 'whatsapp',
    title: 'WhatsApp',
    value: WHATSAPP_PHONE_DISPLAY,
    href: WHATSAPP_URL,
  },
  {
    icon: 'mail',
    title: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
]

export const FORM_TITLE = 'Envíame un mensaje'
export const FORM_SUBMIT_TEXT = 'Enviar mensaje'
export const FORM_SENDING_TEXT = 'Enviando…'
export const FORM_PHONE_LABEL = 'Teléfono'
export const FORM_PHONE_PLACEHOLDER = '313 595 9733'
export const WHATSAPP_CTA_TEXT = 'Escribir por WhatsApp'
export const WHATSAPP_PRIMARY_URL = buildWhatsappBookingUrl('seccion contacto')
export const FORM_SUCCESS_TITLE = '¡Gracias por contactarme!'
export const FORM_SUCCESS_TRUST =
  'Aprecio que hayas tomado el tiempo de escribirme. Revisaré tu mensaje con atención.'
export const FORM_SUCCESS_RESPONSE = 'Te responderé en menos de 48 horas.'
export const FORM_SUCCESS_GREETING = (name: string) =>
  name ? `Gracias, ${name}.` : 'Tu mensaje llegó con éxito.'
export const FORM_SUCCESS_ANOTHER = 'Enviar otro mensaje'
export const FORM_ERROR_MESSAGE =
  'No pudimos enviar tu mensaje. Intenta de nuevo o escríbeme por WhatsApp.'
