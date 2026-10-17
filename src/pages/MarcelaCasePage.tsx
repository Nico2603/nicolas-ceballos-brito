import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import DeviceFrame from '../components/cases/DeviceFrame'
import FaqAccordion from '../components/FaqAccordion'
import Footer from '../components/Footer'
import SeoHelmet from '../components/SeoHelmet'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { CONTACT_SECTION_HREF } from '../data/contact'
import {
  getFamilyById,
  getProjectBySlug,
  getSiblingProjects,
} from '../data/catalog'
import { buildArticleStructuredData, type BreadcrumbItem } from '../lib/structured-data'

const SLUG = 'marcela-brito-avellaneda'

export default function MarcelaCasePage() {
  const project = getProjectBySlug(SLUG)
  if (!project) return <Navigate to="/" replace />

  const family = getFamilyById(project.familyId)
  if (!family) return <Navigate to="/" replace />

  const media = project.caseMedia
  const beforeDesktop = media?.before.filter((shot) => shot.viewport === 'desktop') ?? []
  const beforeMobile = media?.before.filter((shot) => shot.viewport === 'mobile') ?? []
  const afterDesktop = media?.after.filter((shot) => shot.viewport === 'desktop') ?? []
  const afterMobile = media?.after.filter((shot) => shot.viewport === 'mobile') ?? []
  const afterSlots = media?.afterSlots ?? []
  const siblings = getSiblingProjects(project)

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
          '2026-09-13',
          '2026-10-16',
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
            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <Button variant="primary" href={project.liveUrl} external>
                  <ExternalLink size={16} />
                  {project.liveUrlLabel ?? 'Sitio actual'}
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

        <section className="px-4 py-16 bg-[var(--color-bg-secondary)]">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[var(--color-accent-label)] mb-3">
              Antes · 13 septiembre 2026
            </p>
            <h2 className="font-display text-3xl font-semibold text-[var(--color-text-primary)] mb-3">
              El constructor que había que reemplazar
            </h2>
            <p className="max-w-2xl text-[var(--color-text-secondary)] leading-relaxed mb-10">
              Capturas del documento en Chrome, sin la bandeja del navegador. Cada marco
              señala un hallazgo de la auditoría: no es un moodboard, es evidencia.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {beforeDesktop.map((shot) => (
                <DeviceFrame
                  key={shot.id}
                  src={shot.src}
                  alt={shot.alt}
                  caption={shot.caption}
                  finding={shot.finding}
                  viewport="desktop"
                />
              ))}
            </div>
          </div>
        </section>

        {beforeMobile.length > 0 && (
          <section className="px-4 py-16 bg-[var(--color-bg-primary)]">
            <div className="mx-auto max-w-6xl">
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[var(--color-accent-label)] mb-3">
                Antes · móvil
              </p>
              <h2 className="font-display text-3xl font-semibold text-[var(--color-text-primary)] mb-3">
                El mismo sitio a 390
              </h2>
              <p className="max-w-2xl text-[var(--color-text-secondary)] leading-relaxed mb-10">
                El mismo sitio a 390 píxeles: cookies en inglés, Inicio Copy y un recurso
                gratuito sin destinos. Sirve para medir el móvil de la versión nueva.
              </p>
              <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
                {beforeMobile.map((shot) => (
                  <div key={shot.id} className="snap-start shrink-0 w-[17rem]">
                    <DeviceFrame
                      src={shot.src}
                      alt={shot.alt}
                      caption={shot.caption}
                      finding={shot.finding}
                      viewport="mobile"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-4 py-16 bg-[var(--color-bg-secondary)]">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[var(--color-accent-label)] mb-3">
              Después · en curso
            </p>
            <h2 className="font-display text-3xl font-semibold text-[var(--color-text-primary)] mb-3">
              La versión que ya está en el aire
            </h2>
            <p className="max-w-2xl text-[var(--color-text-secondary)] leading-relaxed mb-10">
              Tomadas el 16 de octubre de 2026 sobre el dominio vivo. Psicología y
              Registros Akáshicos ya no comparten menú. El contacto pide consentimiento
              y no invita a contar la historia clínica. Sigue en proceso: faltan la
              hamaca, los enlaces de Integrarte y los niveles 3 y 4.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {afterDesktop.map((shot) => (
                <DeviceFrame
                  key={shot.id}
                  src={shot.src}
                  alt={shot.alt}
                  caption={shot.caption}
                  finding={shot.finding}
                  viewport="desktop"
                />
              ))}
            </div>
          </div>
        </section>

        {afterMobile.length > 0 && (
          <section className="px-4 py-16 bg-[var(--color-bg-primary)]">
            <div className="mx-auto max-w-6xl">
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[var(--color-accent-label)] mb-3">
                Después · móvil
              </p>
              <h2 className="font-display text-3xl font-semibold text-[var(--color-text-primary)] mb-3">
                El primer tramo a 390
              </h2>
              <p className="max-w-2xl text-[var(--color-text-secondary)] leading-relaxed mb-10">
                Portada, menú y contacto en el ancho de un teléfono. Ya no hay banner de
                cookies en inglés ni el ítem Inicio Copy.
              </p>
              <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
                {afterMobile.map((shot) => (
                  <div key={shot.id} className="snap-start shrink-0 w-[17rem]">
                    <DeviceFrame
                      src={shot.src}
                      alt={shot.alt}
                      caption={shot.caption}
                      finding={shot.finding}
                      viewport="mobile"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {afterSlots.length > 0 && (
          <section className="px-4 py-16 bg-[var(--color-bg-secondary)]">
            <div className="mx-auto max-w-6xl">
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[var(--color-accent-label)] mb-3">
                Todavía sin fotografiar
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {afterSlots.map((slot) => (
                  <DeviceFrame
                    key={slot.id}
                    alt={`Espacio reservado: ${slot.label}`}
                    emptyLabel="En proceso"
                    emptyDetail={slot.label}
                    viewport={slot.viewport === 'mobile' ? 'mobile' : 'desktop'}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-4 py-12 bg-[var(--color-bg-primary)]">
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
          <section className="px-4 py-12 bg-[var(--color-bg-secondary)]">
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

        <section id="faq" className="px-4 py-16 bg-[var(--color-bg-primary)]">
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
