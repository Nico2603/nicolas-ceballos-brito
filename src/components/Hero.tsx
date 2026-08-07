import { ArrowRight, ChevronDown, ExternalLink } from 'lucide-react'
import { useRef } from 'react'
import { PROFILE_IMAGE } from '../constants/lcp-image'
import { FULL_NAME } from '../constants/social'
import { heroBio } from '../data/content'
import {
  PROSAVIS_NAME,
  PROSAVIS_PERIOD,
  PROSAVIS_ROLE_TITLE,
  PROSAVIS_URL,
} from '../data/prosavis'
import { useTheme } from '../context/ThemeContext'
import { useHeroDecorSettle } from '../hooks/useHeroDecorSettle'
import Button from './ui/Button'
import DeferredHeroDecor from './DeferredHeroDecor'
import SocialLinks from './SocialLinks'
import DeferredTypingAnimation from './DeferredTypingAnimation'

const nameWords = FULL_NAME.split(' ')

const currentSignals = [
  { value: PROSAVIS_NAME, label: 'Empresa actual' },
  { value: 'Lead', label: PROSAVIS_ROLE_TITLE },
  { value: 'Live', label: 'Producto en producción' },
]

export default function Hero() {
  const { theme } = useTheme()
  const isDarkHero = theme === 'dark'
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
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-left">
            <p className="hero-entrance hero-entrance-delay-1 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-semibold text-[var(--hero-eyebrow)] mb-5 hero-eyebrow-glow">
              <span className="h-px w-6 bg-[var(--color-accent-primary)]/70" aria-hidden />
              {PROSAVIS_ROLE_TITLE} · {PROSAVIS_NAME}
            </p>

            <h1 className="hero-lcp-visible font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--hero-text)] mb-4 leading-[1.05] hero-headline-glow">
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
              <Button
                variant="ghost"
                href="#ahora"
                className={
                  isDarkHero
                    ? 'hero-btn-secondary !text-white !border-white/45 !bg-white/8 hover:!bg-white/14 hover:!border-[var(--color-cyan-bright)]'
                    : 'hero-btn-secondary !text-[var(--hero-text)] !border-[var(--color-accent-primary)]/30 !bg-white/75 hover:!bg-white/95 hover:!border-[var(--color-accent-primary)]'
                }
              >
                Ver trabajo actual
              </Button>
            </div>

            <div className="hero-social-entrance">
              <SocialLinks variant={isDarkHero ? 'onDark' : 'default'} />
            </div>
          </div>

          <div className="hero-entrance hero-entrance-delay-3 flex flex-col items-center gap-6">
            <div className="hero-profile-float relative">
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
                  className="w-56 h-56 md:w-72 md:h-72 rounded-[14px] object-cover"
                />
              </div>
            </div>

            <a
              href={PROSAVIS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-md rounded-xl backdrop-blur-md border px-4 py-3 text-left shadow-[var(--shadow-glow-cyan)] bg-[var(--hero-stat-surface)] border-[var(--hero-stat-border)] transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-0.5 group"
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[var(--hero-text-muted)]">
                  Ahora · {PROSAVIS_PERIOD}
                </p>
                <ExternalLink
                  size={14}
                  className="text-[var(--color-accent-primary)] opacity-70 group-hover:opacity-100 transition-opacity"
                  aria-hidden
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {currentSignals.map((signal, i) => (
                  <div
                    key={signal.label}
                    className={`hero-stat-entrance hero-stat-entrance-delay-${i} text-center`}
                  >
                    <div className="font-display text-sm md:text-base font-bold text-[var(--color-accent-primary)] leading-tight">
                      {signal.value}
                    </div>
                    <div className="text-[10px] text-[var(--hero-text-muted)] leading-tight mt-0.5 font-medium">
                      {signal.label}
                    </div>
                  </div>
                ))}
              </div>
            </a>
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
