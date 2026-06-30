import { ExternalLink, GitBranch } from 'lucide-react'
import { GitHubIcon } from './icons/SocialIcons'
import { featuredProjects } from '../data/content'
import { getProjectSlugById } from '../data/projects'
import { useGitHubRepos } from '../hooks/useGitHubRepos'
import ProjectCard from './ProjectCard'
import SectionWrapper from './SectionWrapper'
import Button from './ui/Button'
import Card from './ui/Card'
import SectionHeader from './ui/SectionHeader'

export default function Portfolio() {
  const { stats, loading } = useGitHubRepos()

  const statsLine = loading
    ? 'Cargando estadísticas de GitHub…'
    : `${stats.totalRepos} repositorios · ${stats.totalStars} estrellas · ${stats.totalLanguages} lenguajes`

  return (
    <SectionWrapper id="portafolio" className="py-20 px-4 bg-[var(--color-bg-primary)] section-mesh-bg relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Código abierto"
          title="Proyectos"
          highlight="en GitHub"
          description="Cuatro repositorios donde aplico tecnologías modernas para resolver desafíos reales."
        />

        <p className="text-center text-sm text-[var(--color-text-secondary)] mb-10 -mt-6">{statsLine}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              projectPath={getProjectSlugById(project.id)}
            />
          ))}
        </div>

        <Card>
          <div className="p-8 text-center">
            <h3 className="font-display text-xl font-semibold mb-3 flex items-center justify-center gap-2 text-[var(--color-text-primary)]">
              <GitHubIcon size={22} />
              ¿Quieres explorar todos mis repositorios?
            </h3>
            <p className="mb-6 text-[var(--color-text-secondary)]">
              Descubre la colección completa con filtros por lenguaje, estrellas y fecha.
            </p>
            <Button
              variant="secondary"
              to="/repositories"
              trailingIcon={<ExternalLink size={14} />}
            >
              <GitBranch size={18} />
              Explorar repositorios
            </Button>
          </div>
        </Card>
      </div>
    </SectionWrapper>
  )
}
