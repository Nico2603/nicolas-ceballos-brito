import { ArrowLeft } from 'lucide-react'
import Footer from '../components/Footer'
import GitHubStats from '../components/GitHubStats'
import SeoHelmet from '../components/SeoHelmet'
import SkillsSection from '../components/SkillsSection'
import SocialLinks from '../components/SocialLinks'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import SectionHeader from '../components/ui/SectionHeader'
import { aboutIntro } from '../data/content'
import {
  SEO_ABOUT_DESCRIPTION,
  SEO_ABOUT_KEYWORDS,
  SEO_ABOUT_TITLE,
} from '../constants/seo-pages'
import { buildAboutStructuredData } from '../lib/structured-data'

export default function About() {
  const breadcrumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Acerca de mí', path: '/about' },
  ]

  return (
    <>
      <SeoHelmet
        title={SEO_ABOUT_TITLE}
        description={SEO_ABOUT_DESCRIPTION}
        canonicalPath="/about"
        keywords={SEO_ABOUT_KEYWORDS}
        structuredData={buildAboutStructuredData(
          SEO_ABOUT_TITLE,
          SEO_ABOUT_DESCRIPTION,
          breadcrumbs,
        )}
      />

      <section
        id="about-pro"
        className="pt-32 pb-16 px-4"
        style={{ background: 'var(--gradient-hero)' }}
      >
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Sobre mí"
            title="Nicolás Ceballos Brito"
            align="left"
            className="!mb-0 [&_h2]:text-white [&_p]:text-white/80"
          />
        </div>
      </section>

      <section className="py-16 px-4 bg-[var(--color-bg-primary)]">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-12">
            <div className="p-8 grid md:grid-cols-[200px_1fr] gap-8 items-center">
              <div className="profile-image w-40 h-40 md:w-48 md:h-48 rounded-xl mx-auto" />
              <p className="direct-answer leading-relaxed text-[var(--color-text-secondary)]">
                {aboutIntro}
              </p>
            </div>
          </Card>

          <SkillsSection />

          <div className="mt-12">
            <GitHubStats />
          </div>

          <div className="mt-12 text-center">
            <h3 className="font-display text-xl font-semibold mb-6 text-[var(--color-text-primary)]">
              Conecta conmigo
            </h3>
            <SocialLinks />
          </div>

          <div className="text-center mt-12">
            <Button variant="secondary" to="/" trailingIcon={<ArrowLeft size={14} />}>
              Volver al inicio
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
