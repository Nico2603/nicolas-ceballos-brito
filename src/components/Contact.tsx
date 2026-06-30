import type { MouseEvent } from 'react'
import { EMAIL, MAILTO_BODY, MAILTO_SUBJECT } from '../constants/social'
import { openGmailCompose } from '../lib/github'
import SectionWrapper from './SectionWrapper'
import SocialLinks from './SocialLinks'

export default function Contact() {
  const handleEmailClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
    if (!isMobile) {
      e.preventDefault()
      openGmailCompose(EMAIL, MAILTO_SUBJECT, MAILTO_BODY)
    }
  }

  return (
    <SectionWrapper id="contacto" className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--color-primary)' }}>
          ¿Quieres trabajar conmigo?
        </h2>
        <div className="glass-card rounded-2xl p-8">
          <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            ¿Buscas un profesional apasionado por la tecnología y la innovación? Estoy disponible para colaborar en proyectos desafiantes que requieran soluciones creativas y eficientes.
          </p>
          <a
            href={`mailto:${EMAIL}?subject=${encodeURIComponent(MAILTO_SUBJECT)}&body=${encodeURIComponent(MAILTO_BODY)}`}
            onClick={handleEmailClick}
            className="inline-block px-8 py-3 rounded-full font-semibold text-white mb-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            style={{ background: 'linear-gradient(45deg, var(--color-primary), var(--color-secondary))' }}
          >
            Envíame un correo
          </a>
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
            O conéctate conmigo en redes:
          </p>
          <SocialLinks />
        </div>
      </div>
    </SectionWrapper>
  )
}
