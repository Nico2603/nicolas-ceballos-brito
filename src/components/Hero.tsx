import { ArrowRight } from 'lucide-react'
import { FULL_NAME } from '../constants/social'
import { heroBio } from '../data/content'
import Card from './ui/Card'
import Button from './ui/Button'
import HeroGrid from './HeroGrid'
import SectionWrapper from './SectionWrapper'
import SocialLinks from './SocialLinks'
import TypingAnimation from './TypingAnimation'

const miniStats = [
  { value: '10º', label: 'Semestre Ing. Sistemas' },
  { value: '5+', label: 'Años programando' },
  { value: 'IA', label: 'ML & Data Science' },
]

export default function Hero() {
  return (
    <SectionWrapper
      id="inicio"
      className="relative min-h-[100dvh] flex items-center pt-28 pb-16 overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
    >
      <div
        className="absolute inset-0 hero-grid-bg"
        style={{ background: 'var(--gradient-hero-scrim)' }}
        aria-hidden
      />
      <div className="absolute inset-0 hero-grid-bg opacity-40" aria-hidden />
      <HeroGrid />

      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-accent-cta)] mb-4">
              Full-Stack Developer
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {FULL_NAME}
            </h1>
            <div className="mb-6 text-white/90">
              <TypingAnimation className="text-[var(--color-cyan-bright)]" />
            </div>
            <p className="direct-answer text-base md:text-lg leading-relaxed text-white/80 mb-8 max-w-xl">
              {heroBio}
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                variant="primary"
                href="#portafolio"
                trailingIcon={<ArrowRight size={14} />}
                className="!text-[var(--color-navy-deep)]"
              >
                Ver proyectos
              </Button>
              <Button variant="ghost" to="/about" className="!text-white !border-white/30 hover:!bg-white/10">
                Sobre mí
              </Button>
            </div>
            <SocialLinks variant="onDark" />
          </div>

          <div className="flex flex-col items-center gap-6">
            <Card hover={false} className="!p-[3px] !bg-white/20 shadow-2xl">
              <div className="profile-image w-56 h-56 md:w-64 md:h-64 rounded-[13px]" />
            </Card>
            <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
              {miniStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 px-3 py-3 text-center"
                >
                  <div className="font-display text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-[10px] text-white/70 leading-tight mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
