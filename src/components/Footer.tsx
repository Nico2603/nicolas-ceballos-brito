import { Link } from 'react-router-dom'
import { FULL_NAME, SOCIAL_LINKS } from '../constants/social'
import { GUIDE_SLUGS } from '../constants/seo-routes'
import { getGuiaBySlug } from '../data/guias/content'
import SocialLinks from './SocialLinks'

const footerLinks = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Portafolio', href: '/#portafolio' },
  { label: 'Sobre mí', href: '/about' },
  { label: 'Repositorios', href: '/repositories' },
  { label: 'Contacto', href: '/#contacto' },
]

const expertiseLinks = [
  { label: 'Desarrollo web', href: '/desarrollo-web' },
  { label: 'Inteligencia artificial', href: '/inteligencia-artificial' },
  { label: 'Análisis de datos', href: '/analisis-datos' },
]

const guideLinks = GUIDE_SLUGS.map((slug) => {
  const guia = getGuiaBySlug(slug)
  return {
    label: guia?.title.split('|')[0]?.trim() ?? slug,
    href: `/guias/${slug}`,
  }
})

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-12 text-white bg-[var(--color-navy-deep)]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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
              <li>
                <Link
                  to="/guias"
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Guías técnicas
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-accent-cta)] mb-4">
              Expertise
            </p>
            <ul className="space-y-2 mb-6">
              {expertiseLinks.map((link) => (
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
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-accent-cta)] mb-4">
              Guías
            </p>
            <ul className="space-y-2">
              {guideLinks.map((link) => (
                <li key={link.href}>
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
            <div className="mt-6 space-y-2">
              <Link
                to="/politica-privacidad"
                className="block text-sm text-white/70 hover:text-white transition-colors"
              >
                Política de privacidad
              </Link>
              <a
                href="/llms.txt"
                className="block text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                Archivo para IA (llms.txt)
              </a>
            </div>
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
