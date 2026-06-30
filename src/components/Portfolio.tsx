import { Code, ExternalLink, GitBranch, Loader2, Star, Trophy } from 'lucide-react'
import { GitHubIcon } from './icons/SocialIcons'
import { featuredProjects } from '../data/content'
import { getProjectSlugById } from '../data/projects'
import { useGitHubRepos } from '../hooks/useGitHubRepos'
import ProjectCard from './ProjectCard'
import SectionWrapper from './SectionWrapper'
import Button from './ui/Button'
import Card from './ui/Card'
import SectionHeader from './ui/SectionHeader'

const statIcons = {
  code: Code,
  star: Star,
  'git-branch': GitBranch,
} as const

export default function Portfolio() {
  const { stats, loading } = useGitHubRepos()

  const portfolioStats = [
    { icon: 'code' as const, value: loading ? '…' : `${stats.totalRepos}`, label: 'Repositorios' },
    { icon: 'star' as const, value: loading ? '…' : `${stats.totalStars}`, label: 'Estrellas' },
    { icon: 'git-branch' as const, value: loading ? '…' : `${stats.totalLanguages}`, label: 'Lenguajes' },
  ]

  return (
    <SectionWrapper id="portafolio" className="py-20 px-4 bg-[var(--color-bg-primary)] section-mesh-bg relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Portafolio"
          title="Proyectos"
          highlight="destacados"
          description="Seis proyectos donde aplico tecnologías modernas para resolver desafíos reales."
        />

        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12">
          {portfolioStats.map((stat) => {
            const Icon = statIcons[stat.icon]
            return (
              <Card key={stat.label} hover={false}>
                <div className="p-4 text-center">
                  {loading ? (
                    <Loader2 size={24} className="mx-auto mb-2 animate-spin text-[var(--color-accent-primary)]" />
                  ) : (
                    <Icon size={24} className="mx-auto mb-2 text-[var(--color-accent-primary)]" />
                  )}
                  <div className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)]">{stat.label}</div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="mb-8">
          <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-2 text-[var(--color-text-primary)]">
            <Trophy size={22} className="text-[var(--color-accent-cta)]" />
            Proyectos Destacados
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
              >
                <ProjectCard
                  project={project}
                  featured={index === 0}
                  projectPath={getProjectSlugById(project.id)}
                />
              </div>
            ))}
          </div>
        </div>

        <Card>
          <div className="p-8 text-center">
            <h3 className="font-display text-xl font-semibold mb-3 flex items-center justify-center gap-2 text-[var(--color-text-primary)]">
              <GitHubIcon size={22} />
              ¿Quieres explorar todos mis repositorios?
            </h3>
            <p className="mb-6 text-[var(--color-text-secondary)]">
              Descubre mi colección completa de proyectos con filtros avanzados.
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
