import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CONTACT_SECTION_HREF } from '../../data/contact'
import type { CatalogFamily, CatalogProject } from '../../data/catalog'
import { buildArticleStructuredData, type BreadcrumbItem } from '../../lib/structured-data'
import { GitHubIcon } from '../icons/SocialIcons'
import FaqAccordion from '../FaqAccordion'
import Footer from '../Footer'
import SeoHelmet from '../SeoHelmet'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

interface ProjectArticleLayoutProps {
  family: CatalogFamily
  project: CatalogProject
  siblings: CatalogProject[]
}

export default function ProjectArticleLayout({
  family,
  project,
  siblings,
}: ProjectArticleLayoutProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Inicio', path: '/' },
    { name: family.navLabel, path: family.path },
    { name: project.title, path: project.path },
  ]

  return (
    <>
      <SeoHelmet
        title={project.pageTitle}
        description={project.pageDescription}
        canonicalPath={project.path}
        keywords={project.stack.join(', ')}
        structuredData={buildArticleStructuredData(
          project.path,
          project.pageTitle,
          project.pageDescription,
          project.faq,
          breadcrumbs,
          '2024-10-01',
          '2026-08-29',
        )}
      />

      <article className="pt-28">
        <header className="px-4 py-16 md:py-20" style={{ background: 'var(--gradient-hero)' }}>
          <div className="mx-auto max-w-3xl">
            <Link
              to={family.path}
              className="inline-flex items-center gap-1 text-sm font-medium mb-6 text-[var(--hero-eyebrow)] hover:underline"
            >
              <ArrowLeft size={14} />
              {family.navLabel}
            </Link>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-3 text-[var(--hero-eyebrow)]">
              {project.eyebrow}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--hero-text)] leading-tight">
              {project.title}
            </h1>
            <p className="direct-answer mt-5 text-lg leading-relaxed text-[var(--hero-text-muted)]">
              {project.lead}
            </p>
            {(project.period || project.role) && (
              <p className="mt-4 text-sm text-[var(--hero-text-muted)]">
                {[project.period, project.role].filter(Boolean).join(' · ')}
              </p>
            )}
            {project.forkCredit && (
              <p className="mt-3 text-sm text-[var(--hero-text-muted)]">{project.forkCredit}</p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              {project.repoUrl && (
                <Button variant="secondary" href={project.repoUrl} external>
                  <GitHubIcon size={18} />
                  Repositorio
                </Button>
              )}
              {project.liveUrl && (
                <Button variant="primary" href={project.liveUrl} external={project.liveUrl.startsWith('http')}>
                  <ExternalLink size={16} />
                  {project.liveUrlLabel ?? 'Abrir'}
                </Button>
              )}
              <Button variant="ghost" to={CONTACT_SECTION_HREF}>
                Encargar algo así
              </Button>
            </div>
          </div>
        </header>

        <section className="px-4 py-12 bg-[var(--color-bg-primary)]">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-semibold mb-3 text-[var(--color-text-primary)]">
              El propósito
            </h2>
            <p className="leading-relaxed text-[var(--color-text-secondary)]">{project.purpose}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
            <ul className="mt-6 space-y-2 text-[var(--color-text-secondary)]">
              {project.highlights.map((item) => (
                <li key={item}>— {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-4 py-12 bg-[var(--color-bg-secondary)]">
          <div className="mx-auto max-w-3xl space-y-12">
            {project.body.map((section) => (
              <div key={section.heading} className="guia-section">
                <h2 className="font-display text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
                  {section.heading}
                </h2>
                <div className="space-y-4 leading-relaxed text-[var(--color-text-secondary)]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 56)}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {siblings.length > 0 && (
          <section className="px-4 py-12 bg-[var(--color-bg-primary)]">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
                En la misma línea
              </h2>
              <ul className="space-y-3">
                {siblings.map((sibling) => (
                  <li key={sibling.slug}>
                    <Link
                      to={sibling.path}
                      className="inline-flex items-center gap-1 font-medium text-[var(--color-accent-primary)] hover:underline"
                    >
                      {sibling.title}
                      <ArrowRight size={14} />
                    </Link>
                    <p className="text-sm text-[var(--color-text-secondary)]">{sibling.lead}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section id="faq" className="px-4 py-16 bg-[var(--color-bg-secondary)]">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 font-display text-3xl font-semibold text-[var(--color-text-primary)]">
              Preguntas
            </h2>
            <FaqAccordion items={project.faq} />
          </div>
        </section>
      </article>

      <Footer />
    </>
  )
}
