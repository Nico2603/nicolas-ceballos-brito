import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { catalogFamilies, getProjectsForFamily } from '../data/catalog'
import SectionWrapper from './SectionWrapper'
import Card from './ui/Card'
import SectionHeader from './ui/SectionHeader'
import Button from './ui/Button'

export default function PortfolioHubs() {
  return (
    <SectionWrapper id="portafolio" className="py-20 px-4 bg-[var(--color-bg-primary)] section-mesh-bg relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Oficio"
          title="Líneas de"
          highlight="trabajo"
          description="No es una grilla de cuatro cards. Es el mapa de cómo me contrato: salud mental, industria, clínicas, webs, aula, formación y Prosavis. Entra a un tema y lee la historia."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {catalogFamilies.map((family) => {
            const projects = getProjectsForFamily(family.id)

            return (
              <Card key={family.id}>
                <div className="p-6 h-full flex flex-col">
                  <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-2 text-[var(--color-accent-label)]">
                    {family.eyebrow}
                  </p>
                  <h3 className="font-display text-2xl font-semibold mb-3 text-[var(--color-text-primary)]">
                    {family.navLabel}
                  </h3>
                  <p className="leading-relaxed text-[var(--color-text-secondary)] mb-4 flex-1">
                    {family.thesis}
                  </p>
                  {projects.length > 0 && (
                    <ul className="mb-5 space-y-1 text-sm text-[var(--color-text-secondary)]">
                      {projects.slice(0, 3).map((project) => (
                        <li key={project.slug}>
                          <Link
                            to={project.path}
                            className="hover:text-[var(--color-accent-primary)] hover:underline"
                          >
                            {project.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    to={family.path}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-accent-primary)] hover:underline"
                  >
                    Abrir {family.navLabel.toLowerCase()}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Button variant="secondary" to="/repositories">
            Todos los repositorios en GitHub
          </Button>
        </div>
      </div>
    </SectionWrapper>
  )
}
