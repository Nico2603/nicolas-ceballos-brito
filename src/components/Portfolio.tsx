import { Code, ExternalLink, GitBranch, Star, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GitHubIcon } from './icons/SocialIcons'
import { featuredProjects, portfolioStats } from '../data/content'
import ProjectCard from './ProjectCard'
import SectionWrapper from './SectionWrapper'

const statIcons = {
  code: Code,
  star: Star,
  'git-branch': GitBranch,
} as const

export default function Portfolio() {
  return (
    <SectionWrapper id="portafolio" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3" style={{ color: 'var(--color-primary)' }}>
            <GitHubIcon size={32} />
            Mi Portafolio de Proyectos
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Estos son mis <strong>6 proyectos más destacados</strong> donde aplico tecnologías modernas para resolver desafíos reales.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12">
          {portfolioStats.map((stat) => {
            const Icon = statIcons[stat.icon]
            return (
              <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
                <Icon size={24} className="mx-auto mb-2" style={{ color: 'var(--color-secondary)' }} />
                <div className="font-display text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  {stat.label}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mb-8">
          <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
            <Trophy size={22} className="text-yellow-500" />
            Proyectos Destacados
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8 text-center">
          <h3 className="font-display text-xl font-semibold mb-3 flex items-center justify-center gap-2" style={{ color: 'var(--color-primary)' }}>
            <GitHubIcon size={22} />
            ¿Quieres explorar todos mis repositorios?
          </h3>
          <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            Descubre mi colección completa de proyectos con filtros avanzados.
          </p>
          <Link
            to="/repositories"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-lg"
            style={{ background: 'linear-gradient(45deg, var(--color-primary), var(--color-secondary))' }}
          >
            <GitBranch size={18} />
            Explorar Todos mis Repositorios
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </SectionWrapper>
  )
}
