import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react'
import { graduation } from '../data/profile'
import { FULL_NAME } from '../constants/social'
import { heroBio } from '../data/content'
import Button from './ui/Button'
import HeroAurora from './HeroAurora'
import HeroGrid from './HeroGrid'
import SocialLinks from './SocialLinks'
import TypingAnimation from './TypingAnimation'

const miniStats = [
  { value: String(graduation.year), label: 'Graduado UCP' },
  { value: '5+', label: 'Años programando' },
  { value: 'IA', label: 'ML & Data Science' },
]

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.15 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const floatProfile = {
  y: [0, -12, 0],
  transition: { duration: 5.5, repeat: Infinity, ease: 'easeInOut' as const },
}

export default function Hero() {
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

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 w-full"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-left">
            <motion.p
              variants={staggerItem}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-bold text-[var(--color-amber-bright)] mb-5 hero-eyebrow-glow"
            >
              <Sparkles size={14} className="text-[var(--color-cyan-bright)]" />
              Full-Stack Developer · Ing. Sistemas
            </motion.p>

            <motion.h1
              variants={staggerItem}
              className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-[1.05] hero-headline-glow"
            >
              {FULL_NAME.split(' ').map((word, i) => (
                <span key={word}>
                  {i === 1 ? (
                    <span className="text-gradient-accent">{word}</span>
                  ) : (
                    word
                  )}
                  {i < FULL_NAME.split(' ').length - 1 ? ' ' : ''}
                </span>
              ))}
            </motion.h1>

            <motion.div variants={staggerItem} className="mb-6">
              <TypingAnimation className="text-[var(--color-cyan-glow)] font-semibold hero-subcopy-glow" />
            </motion.div>

            <motion.p
              variants={staggerItem}
              className="direct-answer text-base md:text-lg leading-relaxed text-white/95 mb-8 max-w-xl hero-subcopy-glow"
            >
              {heroBio}
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-wrap gap-3 mb-8">
              <Button
                variant="primary"
                href="#portafolio"
                trailingIcon={<ArrowRight size={14} />}
                className="!text-[var(--color-navy-deep)] !shadow-[var(--shadow-cta)] hover:!shadow-[var(--shadow-glow-amber)]"
              >
                Ver proyectos
              </Button>
              <Button
                variant="ghost"
                to="/about"
                className="!text-white !border-white/40 !bg-white/10 hover:!bg-white/20 hover:!border-[var(--color-cyan-bright)] backdrop-blur-sm"
              >
                Sobre mí
              </Button>
            </motion.div>

            <motion.div variants={staggerItem}>
              <SocialLinks variant="onDark" />
            </motion.div>
          </div>

          <motion.div variants={staggerItem} className="flex flex-col items-center gap-6">
            <motion.div animate={floatProfile} className="relative">
              <div className="hero-profile-ring" aria-hidden />
              <div className="relative rounded-2xl p-[3px] bg-white/10 backdrop-blur-sm hero-profile-glow">
                <div className="profile-image w-56 h-56 md:w-72 md:h-72 rounded-[14px]" />
              </div>
            </motion.div>

            <div className="grid grid-cols-3 gap-3 w-full max-w-md">
              {miniStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="rounded-xl bg-[rgba(3,7,18,0.55)] backdrop-blur-md border border-white/20 px-3 py-3 text-center shadow-[var(--shadow-glow-cyan)]"
                >
                  <div className="font-display text-xl font-bold text-[var(--color-cyan-glow)]">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-white/85 leading-tight mt-0.5 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.a
        href="#portafolio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/70 hover:text-[var(--color-cyan-bright)] transition-colors"
        aria-label="Desplazarse a proyectos"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">Explorar</span>
        <ChevronDown size={22} className="animate-[scroll-hint_2s_ease-in-out_infinite]" />
      </motion.a>
    </section>
  )
}
