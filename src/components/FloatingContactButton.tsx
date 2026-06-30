import type { MouseEvent } from 'react'
import { Mail } from 'lucide-react'
import { EMAIL, MAILTO_BODY, MAILTO_SUBJECT } from '../constants/social'
import { openGmailCompose } from '../lib/github'

export default function FloatingContactButton() {
  const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent(MAILTO_SUBJECT)}&body=${encodeURIComponent(MAILTO_BODY)}`

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
    if (!isMobile) {
      e.preventDefault()
      openGmailCompose(EMAIL, MAILTO_SUBJECT, MAILTO_BODY)
    }
  }

  return (
    <a
      href={mailtoHref}
      onClick={handleClick}
      className="hidden md:inline-flex fixed bottom-6 right-6 z-40 items-center gap-2 rounded-full bg-[var(--color-accent-cta)] px-5 py-3 font-semibold text-[var(--color-navy-deep)] shadow-[var(--shadow-cta)] transition-all duration-300 hover:scale-105 hover:brightness-105"
      aria-label="Enviar correo"
    >
      <Mail size={20} />
      <span>Contacto</span>
    </a>
  )
}
