import type { MouseEvent } from 'react'
import { Mail, MapPin } from 'lucide-react'
import { EMAIL, MAILTO_BODY, MAILTO_SUBJECT } from '../constants/social'
import { openGmailCompose } from '../lib/github'
import SectionWrapper from './SectionWrapper'
import SocialLinks from './SocialLinks'
import Button from './ui/Button'
import Card from './ui/Card'
import SectionHeader from './ui/SectionHeader'

const contactItems = [
  {
    icon: Mail,
    title: 'Email',
    description: 'La forma más directa de contactarme para colaboraciones.',
    action: 'nicolasceballosbrito@gmail.com',
  },
  {
    icon: MapPin,
    title: 'Ubicación',
    description: 'Basado en Pereira, Colombia — disponible remoto.',
    action: 'Pereira, CO',
  },
]

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

  const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent(MAILTO_SUBJECT)}&body=${encodeURIComponent(MAILTO_BODY)}`

  return (
    <SectionWrapper id="contacto" className="py-20 px-4 bg-[var(--color-bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Contacto"
          title="¿Trabajamos"
          highlight="juntos?"
          description="Estoy disponible para colaborar en proyectos desafiantes que requieran soluciones creativas y eficientes."
          align="left"
        />

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {contactItems.map(({ icon: Icon, title, description, action }) => (
              <Card key={title}>
                <div className="p-6 flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-badge-bg)] flex items-center justify-center shrink-0">
                    <Icon size={22} className="text-[var(--color-accent-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-[var(--color-text-primary)] mb-1">
                      {title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-2">{description}</p>
                    <p className="text-sm font-medium text-[var(--color-accent-primary)]">{action}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card>
            <div className="p-8 flex flex-col justify-center h-full">
              <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                Envíame un mensaje
              </h3>
              <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                Cuéntame sobre tu proyecto, idea o propuesta. Respondo en menos de 48 horas.
              </p>
              <Button
                variant="primary"
                href={mailtoHref}
                onClick={handleEmailClick}
                trailingIcon={<Mail size={14} />}
                className="self-start mb-8"
              >
                Enviar correo
              </Button>
              <p className="text-sm text-[var(--color-text-secondary)] mb-4">O conéctate en redes:</p>
              <SocialLinks size="sm" />
            </div>
          </Card>
        </div>
      </div>
    </SectionWrapper>
  )
}
