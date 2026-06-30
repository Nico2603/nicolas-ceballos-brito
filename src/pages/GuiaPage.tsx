import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import ContentImageFigure from '../components/ContentImageFigure'
import Footer from '../components/Footer'
import SeoHelmet from '../components/SeoHelmet'
import Button from '../components/ui/Button'
import { GUIDE_SLUGS } from '../constants/seo-routes'
import { EMAIL } from '../constants/social'
import { getGuiaBySlug } from '../data/guias/content'
import { buildArticleStructuredData } from '../lib/structured-data'

export default function GuiaPage() {
  const { slug } = useParams<{ slug: string }>()

  if (!slug || !GUIDE_SLUGS.includes(slug as (typeof GUIDE_SLUGS)[number])) {
    return <Navigate to="/" replace />
  }

  const guia = getGuiaBySlug(slug)
  if (!guia) return <Navigate to="/" replace />

  const breadcrumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Guías', path: '/guias' },
    { name: guia.title.split('|')[0]?.trim() ?? guia.title, path: guia.path },
  ]

  const structuredData = buildArticleStructuredData(
    guia.path,
    guia.title,
    guia.description,
    guia.faq,
    breadcrumbs,
    guia.datePublished,
    guia.dateModified,
  )

  return (
    <>
      <SeoHelmet
        title={guia.title}
        description={guia.description}
        canonicalPath={guia.path}
        ogType="article"
        keywords={guia.keywords}
        structuredData={structuredData}
        articlePublishedTime={guia.datePublished}
        articleModifiedTime={guia.dateModified}
      />

      <main className="pt-28">
        <article className="bg-[var(--color-bg-primary)] py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-label)]">
              Guía técnica
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl text-[var(--color-text-primary)]">
              {guia.title.split('|')[0]?.trim()}
            </h1>
            <p className="direct-answer mt-6 text-lg leading-relaxed font-medium text-[var(--color-text-primary)]">
              {guia.directAnswer}
            </p>

            {guia.sections.map((section) => (
              <section key={section.heading} className="guia-section mt-10">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                  {section.heading}
                </h2>
                <div className="space-y-4 leading-relaxed text-[var(--color-text-secondary)]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
                {section.image && <ContentImageFigure image={section.image} />}
              </section>
            ))}

            <section className="mt-12">
              <h2 className="mb-6 text-2xl font-semibold text-[var(--color-text-primary)]">
                Preguntas frecuentes
              </h2>
              <div className="space-y-4">
                {guia.faq.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-xl border p-5 bg-[var(--color-bg-card)] border-[var(--color-border-light)]"
                  >
                    <h3 className="font-semibold text-[var(--color-text-primary)]">{item.question}</h3>
                    <p className="faq-answer mt-2 leading-relaxed text-[var(--color-text-secondary)]">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-12 rounded-2xl border p-6 bg-[var(--color-bg-card)] border-[var(--color-border-light)]">
              <p className="mb-4 text-[var(--color-text-secondary)]">
                ¿Te interesa colaborar en un proyecto similar? Escríbeme y conversemos sobre tu idea.
              </p>
              <Button variant="primary" href={`mailto:${EMAIL}`} trailingIcon={<ArrowRight size={14} />}>
                Contactar por email
              </Button>
            </div>

            <nav className="mt-10 flex flex-wrap gap-4 text-sm">
              <Link to="/guias" className="text-[var(--color-accent-primary)] hover:underline">
                Todas las guías
              </Link>
              <Link to="/desarrollo-web" className="text-[var(--color-accent-primary)] hover:underline">
                Desarrollo web
              </Link>
              <Link to="/inteligencia-artificial" className="text-[var(--color-accent-primary)] hover:underline">
                Inteligencia artificial
              </Link>
              <Link to="/about" className="text-[var(--color-accent-primary)] hover:underline">
                Sobre mí
              </Link>
            </nav>
          </div>
        </article>
      </main>

      <Footer />
    </>
  )
}
