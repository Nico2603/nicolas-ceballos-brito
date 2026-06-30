import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'
import { PROFILE_IMAGE } from '../constants/lcp-image'
import { graduation } from '../data/profile'
import { FULL_NAME } from '../constants/social'
import { heroBio } from '../data/content'
import { useTheme } from '../context/ThemeContext'
import Button from './ui/Button'
import HeroAurora from './HeroAurora'
import HeroGrid from './HeroGrid'
import SocialLinks from './SocialLinks'
import DeferredTypingAnimation from './DeferredTypingAnimation'

const miniStats = [
  { value: String(graduation.year), label: 'Graduado UCP' },
  { value: '5+', label: 'Años programando' },
  { value: 'IA', label: 'ML & Data Science' },
]

const nameWords = FULL_NAME.split(' ')

export default function Hero() {
  const { theme } = useTheme()
  const isDarkHero = theme === 'dark'

  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] flex items-center pt-28 pb-20 overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
    >
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero-scrim)' }} aria-hidden />
      <div className="absolute inset-0 hero-grid-bg opacity-50 mix-blend-screen" aria-hidden />
      <HeroAurora />
      <HeroGrid />

      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full hero-stagger">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-left">
            <p className="hero-entrance hero-entrance-delay-1 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-[var(--hero-eyebrow)] mb-5 hero-eyebrow-glow">
              <Sparkles size={14} className="text-[var(--color-accent-primary)]" />
              Full-Stack Developer · Ing. Sistemas
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

            <div className="hero-cta-entrance flex flex-wrap gap-3 mb-8">
              <Button
                variant="primary"
                href="#portafolio"
                trailingIcon={<ArrowRight size={14} />}
                className="!bg-[var(--color-amber-bright)] !text-[#0A0F1A] !font-bold !shadow-[var(--shadow-cta)] hover:!brightness-110 hover:!shadow-[var(--shadow-glow-amber)]"
              >
                Ver proyectos
              </Button>
              <Button
                variant="ghost"
                to="/about"
                className={
                  isDarkHero
                    ? '!text-white !border-white/60 !bg-white/10 hover:!bg-white/20 hover:!border-[var(--color-cyan-bright)] backdrop-blur-sm'
                    : '!text-[var(--hero-text)] !border-[var(--color-accent-primary)]/35 !bg-white/70 hover:!bg-white/90 hover:!border-[var(--color-accent-primary)] backdrop-blur-sm'
                }
              >
                Sobre mí
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

            <div className="grid grid-cols-3 gap-3 w-full max-w-md">
              {miniStats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`hero-stat-entrance hero-stat-entrance-delay-${i} rounded-xl backdrop-blur-md border px-3 py-3 text-center shadow-[var(--shadow-glow-cyan)] bg-[var(--hero-stat-surface)] border-[var(--hero-stat-border)] transition-transform duration-300 hover:scale-105 hover:-translate-y-1`}
                >
                  <div className="font-display text-xl font-bold text-[var(--color-accent-primary)]">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-[var(--hero-text-muted)] leading-tight mt-0.5 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a
        href="#portafolio"
        className="hero-scroll-hint-entrance absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[var(--hero-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors"
        aria-label="Desplazarse a proyectos"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">Explorar</span>
        <ChevronDown size={22} className="animate-[scroll-hint_2s_ease-in-out_infinite]" />
      </a>
    </section>
  )
}
