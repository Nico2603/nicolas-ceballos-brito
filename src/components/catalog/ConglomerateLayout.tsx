import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CONTACT_SECTION_HREF } from '../../data/contact'
import type { CatalogFamily, CatalogProject } from '../../data/catalog'
import { buildExpertiseStructuredData, type BreadcrumbItem } from '../../lib/structured-data'
import FaqAccordion from '../FaqAccordion'
import Footer from '../Footer'
import SeoHelmet from '../SeoHelmet'
import Button from '../ui/Button'
import Card from '../ui/Card'
import SectionHeader from '../ui/SectionHeader'

interface ConglomerateLayoutProps {
  family: CatalogFamily
  projects: CatalogProject[]
}

export default function ConglomerateLayout({ family, projects }: ConglomerateLayoutProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Inicio', path: '/' },
    { name: family.navLabel, path: family.path },
  ]

  return (
    <>
      <SeoHelmet
        title={family.pageTitle}
        description={family.pageDescription}
        canonicalPath={family.path}
        structuredData={buildExpertiseStructuredData(
          family.path,
          family.pageTitle,
          family.pageDescription,
          family.faq,
          family.navLabel,
          breadcrumbs,
        )}
      />

      <section className="pt-32 pb-12 px-4" style={{ background: 'var(--gradient-hero)' }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow={family.eyebrow}
            title={family.title}
            highlight={family.highlight}
            align="left"
            tone="hero"
            className="!mb-4"
          />
          <p className="direct-answer text-lg leading-relaxed text-[var(--hero-text-muted)] max-w-3xl">
            {family.thesis}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" to={CONTACT_SECTION_HREF}>
              Hablemos del encargo
            </Button>
            <Button variant="ghost" to="/repositories">
              Ver repositorios
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-[var(--color-bg-primary)]">
        <div className="max-w-3xl mx-auto space-y-12">
          {family.story.map((section) => (
            <article key={section.heading}>
              <h2 className="font-display text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
                {section.heading}
              </h2>
              <div className="space-y-4 leading-relaxed text-[var(--color-text-secondary)]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 56)}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {projects.length > 0 && (
        <section className="py-16 px-4 bg-[var(--color-bg-secondary)]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl font-semibold mb-8 text-[var(--color-text-primary)]">
              Proyectos de esta línea
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card key={project.slug}>
                  <div className="p-6 flex flex-col h-full">
                    <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-2 text-[var(--color-accent-label)]">
                      {project.eyebrow}
                    </p>
                    <h3 className="font-display text-xl font-semibold mb-3 text-[var(--color-text-primary)]">
                      {project.title}
                    </h3>
                    <p className="leading-relaxed text-[var(--color-text-secondary)] mb-6 flex-1">
                      {project.lead}
                    </p>
                    <Link
                      to={project.path}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent-primary)] hover:underline"
                    >
                      Leer el caso
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-4 bg-[var(--color-bg-primary)]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <Card hover={false}>
            <div className="p-6">
              <h2 className="font-display text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
                Para quién es
              </h2>
              <ul className="space-y-3">
                {family.audience.map((item) => (
                  <li key={item} className="flex gap-2 text-[var(--color-text-secondary)]">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-icon)]"
                      strokeWidth={2}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
          <Card hover={false}>
            <div className="p-6">
              <h2 className="font-display text-xl font-semibold mb-4 text-[var(--color-text-primary)]">
                Qué puedo construir
              </h2>
              <ul className="space-y-3">
                {family.offer.map((item) => (
                  <li key={item} className="flex gap-2 text-[var(--color-text-secondary)]">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-icon)]"
                      strokeWidth={2}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </section>

      <section id="faq" className="py-16 px-4 bg-[var(--color-bg-secondary)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-6 text-center font-display text-3xl font-semibold text-[var(--color-text-primary)]">
            Preguntas de esta línea
          </h2>
          <FaqAccordion items={family.faq} />
        </div>
      </section>

      <Footer />
    </>
  )
}
