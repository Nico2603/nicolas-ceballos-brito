import { Link } from 'react-router-dom'
import { getProjectBySlug } from '../data/catalog'
import SectionWrapper from './SectionWrapper'
import SectionHeader from './ui/SectionHeader'

const SELECTED = [
  'marcela-brito-avellaneda',
  'maria',
  'pdm-manager',
  'rayito-de-sol',
] as const

const FALLBACK_SHOT: Record<string, string> = {
  'marcela-brito-avellaneda': '/images/cases/marcela/despues/home-psico.webp',
  'rayito-de-sol': '/images/cases/landings/thumb-rayito.webp',
}

export default function SelectedWork() {
  const projects = SELECTED.map((slug) => getProjectBySlug(slug)).filter((project) => project != null)

  return (
    <SectionWrapper id="trabajo" className="py-20 px-4 bg-[var(--color-bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          plain
          eyebrow="Trabajo seleccionado"
          title="Cuatro piezas, con resultado"
          description="No es el catálogo entero. Es lo que puedo enseñar: qué quedó andando y una captura cuando existe."
        />
        <ul className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const shot = project.shots?.[0]?.src ?? FALLBACK_SHOT[project.slug]
            return (
              <li key={project.slug} className="border border-[var(--color-border-light)] bg-[var(--color-bg-card)]">
                {shot && (
                  <img
                    src={shot}
                    alt={project.shots?.[0]?.alt ?? project.title}
                    className="w-full aspect-[16/10] object-cover object-top border-b border-[var(--color-border-light)]"
                  />
                )}
                <div className="p-6">
                  <p className="font-mono text-sm text-[var(--color-text-secondary)] mb-2">
                    {[project.period, project.role].filter(Boolean).join(' · ')}
                  </p>
                  <h3 className="font-sans text-2xl font-medium tracking-[-0.03em] text-[var(--color-text-primary)] mb-3">
                    <Link to={project.path} className="hover:text-[var(--color-accent-cta)]">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    {project.outcome ?? project.lead}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </SectionWrapper>
  )
}
