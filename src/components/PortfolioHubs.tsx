import { m } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  catalogFamilies,
  getFamilyById,
  getProjectsForFamily,
  type CatalogFamily,
  type FamilyId,
} from '../data/catalog'
import SectionWrapper from './SectionWrapper'
import Card from './ui/Card'
import SectionHeader from './ui/SectionHeader'
import Button from './ui/Button'

const FAMILY_ACCENT: Record<FamilyId, string> = {
  'salud-mental': '#7BAF9E',
  'mantenimiento-predictivo': '#C4A574',
  'productos-clinicos': '#5B8FA8',
  webs: '#7BA3C9',
  aula: '#7BA3C9',
  academicos: '#8B7E74',
  prosavis: '#3D5A80',
}

const HUB_GROUPS: readonly {
  id: string
  label: string
  featured: boolean
  familyIds: readonly FamilyId[]
}[] = [
  {
    id: 'producto',
    label: 'Producto',
    featured: true,
    familyIds: ['salud-mental', 'mantenimiento-predictivo'],
  },
  {
    id: 'encargo',
    label: 'Encargo',
    featured: false,
    familyIds: ['productos-clinicos', 'webs', 'prosavis'],
  },
  {
    id: 'formacion',
    label: 'Formación',
    featured: false,
    familyIds: ['aula', 'academicos'],
  },
]

const reveal = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' as const },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
}

function familiesIn(ids: readonly FamilyId[]): CatalogFamily[] {
  return ids
    .map((id) => getFamilyById(id))
    .filter((family): family is CatalogFamily => Boolean(family))
}

function FeaturedLine({ family, index }: { family: CatalogFamily; index: number }) {
  const projects = getProjectsForFamily(family.id)
  const accent = FAMILY_ACCENT[family.id]

  return (
    <m.div {...reveal} transition={{ ...reveal.transition, delay: index * 0.08 }}>
      <Card className="h-full">
        <div className="h-full flex flex-col">
          <div className="h-1 w-full" style={{ backgroundColor: accent }} aria-hidden />
          <div className="p-6 md:p-7 flex flex-col flex-1">
            <p className="text-xs uppercase tracking-[0.2em] font-semibold mb-2 text-[var(--color-accent-label)]">
              {family.eyebrow}
            </p>
            <h3 className="font-display text-2xl md:text-[1.7rem] font-semibold mb-3 text-[var(--color-text-primary)] text-balance">
              <Link
                to={family.path}
                className="hover:text-[var(--color-accent-primary)] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              >
                {family.navLabel}
              </Link>
            </h3>
            <p className="leading-relaxed text-[var(--color-text-secondary)] mb-5">
              {family.hubLead}
            </p>
            {projects.length > 0 && (
              <ul className="mb-6 flex flex-wrap gap-2">
                {projects.slice(0, 3).map((project) => (
                  <li key={project.slug}>
                    <Link
                      to={project.path}
                      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] ring-1 ring-[var(--color-border-light)] hover:text-[var(--color-accent-primary)] hover:ring-[var(--color-accent-primary)]/40 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    >
                      {project.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Link
              to={family.path}
              className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent-primary)] group"
            >
              Ver {family.navLabel.toLowerCase()}
              <ArrowRight
                size={14}
                className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </Card>
    </m.div>
  )
}

function IndexLine({ family }: { family: CatalogFamily }) {
  const accent = FAMILY_ACCENT[family.id]
  const projectCount = family.projectSlugs.length

  return (
    <li>
      <Link
        to={family.path}
        className="group grid grid-cols-[auto_1fr_auto] gap-4 md:gap-6 items-start py-5 border-b border-[var(--color-border-light)]"
      >
        <span
          className="mt-2 h-8 w-1 rounded-full"
          style={{ backgroundColor: accent }}
          aria-hidden
        />
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.2em] font-semibold mb-1 text-[var(--color-accent-label)]">
            {family.eyebrow}
          </p>
          <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)] mb-1.5 group-hover:text-[var(--color-accent-primary)] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
            {family.navLabel}
          </h3>
          <p className="text-sm md:text-[0.95rem] leading-relaxed text-[var(--color-text-secondary)] max-w-2xl">
            {family.hubLead}
          </p>
          {projectCount > 0 && (
            <p className="mt-2 text-xs text-[var(--color-text-secondary)]/80">
              {projectCount} {projectCount === 1 ? 'proyecto' : 'proyectos'}
            </p>
          )}
        </div>
        <ArrowRight
          size={16}
          className="mt-2 shrink-0 text-[var(--color-accent-primary)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
          aria-hidden
        />
      </Link>
    </li>
  )
}

const groupedIds = new Set(HUB_GROUPS.flatMap((group) => group.familyIds))
const leftoverFamilies = catalogFamilies.filter((family) => !groupedIds.has(family.id))

export default function PortfolioHubs() {
  return (
    <SectionWrapper id="portafolio" className="py-20 px-4 bg-[var(--color-bg-primary)] section-mesh-bg relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          align="left"
          eyebrow="Oficio"
          title="Líneas de"
          highlight="trabajo"
          description="Producto propio, encargo y formación. Salud mental e industria de un lado; clínicas, webs y Prosavis del otro; el aula y la universidad como origen."
        />

        <div className="space-y-12 md:space-y-14">
          {HUB_GROUPS.map((group) => {
            const families = familiesIn(group.familyIds)
            if (families.length === 0) return null

            return (
              <section key={group.id} aria-labelledby={`hub-${group.id}`}>
                <p
                  id={`hub-${group.id}`}
                  className="text-xs uppercase tracking-[0.22em] font-bold mb-5 text-[var(--color-accent-label)]"
                >
                  {group.label}
                </p>
                {group.featured ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {families.map((family, index) => (
                      <FeaturedLine key={family.id} family={family} index={index} />
                    ))}
                  </div>
                ) : (
                  <ol className="border-t border-[var(--color-border-light)]">
                    {families.map((family) => (
                      <IndexLine key={family.id} family={family} />
                    ))}
                  </ol>
                )}
              </section>
            )
          })}
          {leftoverFamilies.length > 0 && (
            <section aria-labelledby="hub-otras">
              <p
                id="hub-otras"
                className="text-xs uppercase tracking-[0.22em] font-bold mb-5 text-[var(--color-accent-label)]"
              >
                Otras líneas
              </p>
              <ol className="border-t border-[var(--color-border-light)]">
                {leftoverFamilies.map((family) => (
                  <IndexLine key={family.id} family={family} />
                ))}
              </ol>
            </section>
          )}
        </div>

        <div className="mt-12 text-center">
          <Button variant="secondary" to="/repositories">
            Todos los repositorios en GitHub
          </Button>
        </div>
      </div>
    </SectionWrapper>
  )
}
