import { buildWhatsappBookingUrl } from '../constants/social'
import { trackContactClick } from '../lib/analytics'
import WhatsAppIcon from './icons/WhatsAppIcon'

export default function FloatingWhatsAppButton() {
  const whatsappUrl = buildWhatsappBookingUrl('boton flotante')

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackContactClick('whatsapp', 'boton_flotante')}
      className="hidden md:inline-flex fixed bottom-6 right-6 z-40 items-center gap-2 rounded-full bg-[var(--color-accent-cta)] px-5 py-3 font-semibold text-[var(--color-navy-deep)] shadow-[var(--shadow-cta)] transition-all duration-300 hover:scale-105 hover:brightness-105"
      aria-label="Escribir por WhatsApp"
    >
      <WhatsAppIcon className="h-5 w-5" variant="light" />
      <span>WhatsApp</span>
    </a>
  )
}
