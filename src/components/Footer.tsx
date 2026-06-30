import { Link } from 'react-router-dom'
import { FULL_NAME, SOCIAL_LINKS } from '../constants/social'
import SocialLinks from './SocialLinks'

const footerLinks = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Portafolio', href: '/#portafolio' },
  { label: 'Sobre mí', href: '/about' },
  { label: 'Repositorios', href: '/repositories' },
  { label: 'Contacto', href: '/#contacto' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-12 text-white bg-[var(--color-navy-deep)]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-display text-lg font-bold mb-2">{FULL_NAME}</p>
            <p className="text-sm text-white/70 leading-relaxed">
              Desarrollador full-stack apasionado por la innovación tecnológica y el impacto real.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-accent-cta)] mb-4">
              Navegación
            </p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-accent-cta)] mb-4">
              Redes
            </p>
            <SocialLinks size="sm" variant="onDark" />
            <a
              href={SOCIAL_LINKS.huggingface}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-sm text-white/70 hover:text-white transition-colors"
            >
              Hugging Face →
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-white/60">
            © {year} {FULL_NAME}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
