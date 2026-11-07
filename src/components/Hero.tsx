import { ArrowRight } from 'lucide-react'
import { PROFILE_IMAGE } from '../constants/lcp-image'
import { FULL_NAME } from '../constants/social'
import { heroBio } from '../data/content'
import { PROSAVIS_NAME, PROSAVIS_ROLE_TITLE } from '../data/prosavis'
import Marca from './Marca'
import SocialLinks from './SocialLinks'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] flex items-center pt-28 pb-20 overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
        <div className="grid md:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="md:col-span-7 text-left">
            <Marca variant="hero" />

            <h1 className="hero-lcp-visible font-sans text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-[-0.04em] text-[var(--hero-text)] mt-5 mb-4 leading-[1.05] text-balance">
              {FULL_NAME}
            </h1>

            <p className="hero-entrance hero-entrance-delay-2 text-base md:text-lg font-medium text-[var(--hero-subtitle)] mb-6">
              {PROSAVIS_ROLE_TITLE} en {PROSAVIS_NAME}
            </p>

            <p className="hero-entrance hero-entrance-delay-3 direct-answer text-base md:text-lg leading-relaxed text-[var(--hero-text-muted)] mb-8 max-w-xl">
              {heroBio}
            </p>

            <div className="hero-cta-entrance hero-cta-row mb-8">
              <a href="#contacto" className="hero-btn-primary">
                <span>Hablemos de tu proyecto</span>
                <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
              </a>
              <a href="#ahora" className="hero-text-link">
                Ver trabajo actual
              </a>
            </div>

            <div className="hero-social-entrance">
              <SocialLinks className="hero-social-links !justify-start" />
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center md:justify-end">
            <img
              src={PROFILE_IMAGE.src}
              srcSet={PROFILE_IMAGE.srcSet}
              sizes={PROFILE_IMAGE.sizes}
              width={PROFILE_IMAGE.width}
              height={PROFILE_IMAGE.height}
              alt={`Foto de perfil de ${FULL_NAME}`}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="hero-entrance hero-entrance-delay-3 mt-40 md:mt-0 w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-[15px] object-cover border border-[var(--color-border-light)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
