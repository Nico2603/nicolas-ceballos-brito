import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FULL_NAME } from '../constants/social'
import { heroBio } from '../data/content'
import SectionWrapper from './SectionWrapper'
import SocialLinks from './SocialLinks'

export default function Hero() {
  return (
    <SectionWrapper
      id="inicio"
      className="min-h-screen flex items-center pt-24 pb-16"
      style={{ background: 'var(--gradient-hero)' }}
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="profile-image w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto mb-8 border-4 border-white/40 shadow-xl" />
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">
          {FULL_NAME}
        </h1>
        <p className="text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto text-white/90">
          {heroBio}
        </p>
        <Link
          to="/about"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg mb-8"
          style={{ background: 'linear-gradient(45deg, var(--color-primary), var(--color-secondary))' }}
        >
          Conoce más de mí
          <ArrowRight size={18} />
        </Link>
        <SocialLinks />
      </div>
    </SectionWrapper>
  )
}
