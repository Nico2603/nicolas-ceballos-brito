import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Cpu, Database, Globe } from 'lucide-react'
import { getAllGuias } from '../data/guias/content'
import SectionHeader from './ui/SectionHeader'
import SectionWrapper from './SectionWrapper'
import Card from './ui/Card'

const expertiseLinks = [
  {
    title: 'Desarrollo web',
    description: 'React, TypeScript, Node.js y despliegue en Vercel.',
    path: '/desarrollo-web',
    icon: Globe,
  },
  {
    title: 'Inteligencia artificial',
    description: 'Machine learning, NLP y proyectos con Python.',
    path: '/inteligencia-artificial',
    icon: Cpu,
  },
  {
    title: 'Análisis de datos',
    description: 'Power BI, SQL y visualización para decisiones.',
    path: '/analisis-datos',
    icon: Database,
  },
] as const

export default function RecursosSection() {
  const guias = getAllGuias()

  return (
    <SectionWrapper id="recursos" className="py-20 px-4 bg-[var(--color-bg-primary)]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Recursos"
          title="Guías y"
          highlight="expertise"
          description="Contenido técnico indexable para desarrolladores, reclutadores y motores de búsqueda."
        />

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)]">
                Guías técnicas
              </h3>
              <Link
                to="/guias"
                className="inline-flex items-center gap-1 text-sm text-[var(--color-accent-primary)] hover:underline"
              >
                Ver todas
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-4">
              {guias.map((guia) => (
                <Card key={guia.slug} hover>
                  <Link to={guia.path} className="block p-6 group">
                    <div className="flex items-start gap-3">
                      <BookOpen
                        size={20}
                        className="mt-0.5 shrink-0 text-[var(--color-accent-primary)]"
                        aria-hidden
                      />
                      <div>
                        <p className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors">
                          {guia.title.split('|')[0]?.trim()}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)] line-clamp-2">
                          {guia.directAnswer}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-[var(--color-text-primary)] mb-5">
              Áreas de expertise
            </h3>
            <div className="space-y-4">
              {expertiseLinks.map((item) => {
                const Icon = item.icon
                return (
                  <Card key={item.path} hover>
                    <Link to={item.path} className="block p-6 group">
                      <div className="flex items-start gap-3">
                        <Icon
                          size={20}
                          className="mt-0.5 shrink-0 text-[var(--color-accent-primary)]"
                          aria-hidden
                        />
                        <div>
                          <p className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
