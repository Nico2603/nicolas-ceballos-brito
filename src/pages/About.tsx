import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import GitHubStats from '../components/GitHubStats'
import { SimpleNavbar } from '../components/Navbar'
import SeoHelmet from '../components/SeoHelmet'
import SkillsSection from '../components/SkillsSection'
import SocialLinks from '../components/SocialLinks'
import TypingAnimation from '../components/TypingAnimation'
import { aboutIntro } from '../data/content'
import { FULL_NAME, SOCIAL_LINKS } from '../constants/social'

const connectBadges = [
  { href: SOCIAL_LINKS.github, src: 'https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white', alt: 'GitHub' },
  { href: SOCIAL_LINKS.linkedin, src: 'https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white', alt: 'LinkedIn' },
  { href: SOCIAL_LINKS.twitter, src: 'https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white', alt: 'Twitter' },
  { href: SOCIAL_LINKS.facebook, src: 'https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white', alt: 'Facebook' },
  { href: SOCIAL_LINKS.instagram, src: 'https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white', alt: 'Instagram' },
  { href: SOCIAL_LINKS.huggingface, src: 'https://img.shields.io/badge/Hugging%20Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black', alt: 'Hugging Face' },
]

export default function About() {
  return (
    <>
      <SeoHelmet
        title={`Acerca de mí — ${FULL_NAME}`}
        description="Conoce más sobre mis habilidades, experiencia y pasión por la tecnología."
        canonicalPath="/about"
      />
      <SimpleNavbar />

      <section className="pt-28 pb-16 text-center" style={{ background: 'var(--gradient-hero)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="font-display text-4xl font-bold text-white mb-4">{FULL_NAME}</h1>
          <TypingAnimation />
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-8 mb-12">
            <div className="grid md:grid-cols-[120px_1fr_120px] gap-6 items-center">
              <img
                src="https://raw.githubusercontent.com/iCharlesZ/FigureBed/master/img/octocat.gif"
                alt="Octocat"
                className="w-24 mx-auto rounded-lg hidden md:block"
                loading="lazy"
              />
              <p className="text-center leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {aboutIntro}
              </p>
              <img
                src="https://raw.githubusercontent.com/deut-erium/deut-erium/refs/heads/master/assets/computer.gif"
                alt="Computer"
                className="w-24 mx-auto rounded-lg hidden md:block"
                loading="lazy"
              />
            </div>
          </div>

          <SkillsSection />

          <div className="mt-12">
            <GitHubStats />
          </div>

          <div className="mt-12 text-center">
            <h3 className="font-display text-xl font-semibold mb-6" style={{ color: 'var(--color-primary)' }}>
              Conecta conmigo
            </h3>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {connectBadges.map((badge) => (
                <a key={badge.alt} href={badge.href} target="_blank" rel="noopener noreferrer">
                  <img src={badge.src} alt={badge.alt} loading="lazy" />
                </a>
              ))}
            </div>
            <SocialLinks />
          </div>

          <div className="text-center mt-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white transition-all hover:-translate-y-1"
              style={{ background: 'linear-gradient(45deg, var(--color-primary), var(--color-secondary))' }}
            >
              <ArrowLeft size={18} />
              Volver al Inicio
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
