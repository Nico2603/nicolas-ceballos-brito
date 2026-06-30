import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Footer from '../components/Footer'
import SeoHelmet from '../components/SeoHelmet'
import { FULL_NAME } from '../constants/social'
import { getAllGuias } from '../data/guias/content'
import { buildGuiasIndexStructuredData } from '../lib/structured-data'

const pageTitle = `Guías técnicas | ${FULL_NAME}`
const pageDescription =
  'Guías prácticas sobre portafolio de desarrollador, machine learning para estudiantes y React con TypeScript en proyectos reales.'

export default function GuiasIndex() {
  const guias = getAllGuias()
  const breadcrumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Guías', path: '/guias' },
  ]

  return (
    <>
      <SeoHelmet
        title={pageTitle}
        description={pageDescription}
        canonicalPath="/guias"
        structuredData={buildGuiasIndexStructuredData(breadcrumbs)}
      />

      <main className="pt-28">
        <section className="bg-[var(--color-bg-primary)] py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-label)]">
              Recursos
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl text-[var(--color-text-primary)]">
              Guías técnicas
            </h1>
            <p className="direct-answer mt-6 text-lg leading-relaxed font-medium text-[var(--color-text-primary)]">
              Artículos prácticos sobre desarrollo web, inteligencia artificial y buenas prácticas para
              estudiantes y desarrolladores en formación.
            </p>

            <div className="mt-12 space-y-6">
              {guias.map((guia) => (
                <article
                  key={guia.slug}
                  className="rounded-2xl border p-6 bg-[var(--color-bg-card)] border-[var(--color-border-light)]"
                >
                  <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                    <Link to={guia.path} className="hover:text-[var(--color-accent-primary)] transition-colors">
                      {guia.title.split('|')[0]?.trim()}
                    </Link>
                  </h2>
                  <p className="mt-3 leading-relaxed text-[var(--color-text-secondary)]">
                    {guia.directAnswer}
                  </p>
                  <Link
                    to={guia.path}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent-primary)] hover:underline"
                  >
                    Leer guía
                    <ArrowRight size={14} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
