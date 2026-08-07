import { ArrowRight, ChevronDown } from 'lucide-react'
import { useRef } from 'react'
import { PROFILE_IMAGE } from '../constants/lcp-image'
import { FULL_NAME } from '../constants/social'
import { heroBio } from '../data/content'
import { PROSAVIS_NAME, PROSAVIS_ROLE_TITLE } from '../data/prosavis'
import { useHeroDecorSettle } from '../hooks/useHeroDecorSettle'
import Button from './ui/Button'
import DeferredHeroDecor from './DeferredHeroDecor'
import SocialLinks from './SocialLinks'
import DeferredTypingAnimation from './DeferredTypingAnimation'

const nameWords = FULL_NAME.split(' ')

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  useHeroDecorSettle(heroRef)

  return (
    <section
      ref={heroRef}
      id="inicio"
      className="relative min-h-[100dvh] flex items-center pt-28 pb-20 overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
    >
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero-scrim)' }} aria-hidden />
      <div className="absolute inset-0 hero-grid-bg opacity-50 mix-blend-screen" aria-hidden />
      <DeferredHeroDecor />

      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full hero-stagger">
        <div className="grid md:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="md:col-span-7 text-left">
            <p className="hero-entrance hero-entrance-delay-1 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold text-[var(--hero-eyebrow)] mb-5 hero-eyebrow-glow">
              <span className="h-px w-6 bg-[var(--color-accent-primary)]/70" aria-hidden />
              {PROSAVIS_ROLE_TITLE} · {PROSAVIS_NAME}
            </p>

            <h1 className="hero-lcp-visible font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--hero-text)] mb-4 leading-[1.05] text-balance hero-headline-glow">
              {nameWords.map((word, i) => (
                <span key={word}>
                  {i === 1 ? (
                    <span className="text-gradient-accent">{word}</span>
                  ) : (
                    word
                  )}
                  {i < nameWords.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h1>

            <div className="hero-entrance hero-entrance-delay-3 mb-6">
              <DeferredTypingAnimation className="text-[var(--hero-subtitle)] font-semibold hero-subcopy-glow" />
            </div>

            <p className="hero-entrance hero-entrance-delay-4 direct-answer text-base md:text-lg leading-relaxed text-[var(--hero-text-muted)] mb-8 max-w-xl hero-subcopy-glow">
              {heroBio}
            </p>

            <div className="hero-cta-entrance hero-cta-row mb-8">
              <a href="#contacto" className="hero-btn-primary">
                <span>Hablemos de tu proyecto</span>
                <ArrowRight size={16} strokeWidth={2.25} aria-hidden />
              </a>
              <Button variant="ghost" href="#ahora" className="hero-btn-secondary">
                Ver trabajo actual
              </Button>
            </div>

            <div className="hero-social-entrance">
              <SocialLinks className="hero-social-links !justify-start" />
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="hero-entrance hero-entrance-delay-3 hero-profile-float relative">
              <div className="hero-profile-ring" aria-hidden />
              <div className="relative rounded-2xl p-[3px] bg-white/10 backdrop-blur-sm hero-profile-glow">
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
                  className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-[14px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#ahora"
        className="hero-scroll-hint-entrance absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[var(--hero-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors"
        aria-label="Desplazarse al trabajo actual en Prosavis"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">Ahora</span>
        <ChevronDown size={22} className="hero-scroll-chevron" />
      </a>
    </section>
  )
}
