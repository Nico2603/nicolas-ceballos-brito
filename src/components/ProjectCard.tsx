import { ExternalLink, Star } from 'lucide-react'
import { GitHubIcon } from './icons/SocialIcons'
import type { Project } from '../types'
import Badge from './ui/Badge'
import Button from './ui/Button'
import Card from './ui/Card'

interface ProjectCardProps {
  project: Project
  featured?: boolean
  projectPath?: string
}

export default function ProjectCard({ project, featured = false, projectPath }: ProjectCardProps) {
  return (
    <Card id={project.id} className="project-card h-full">
      <article className="flex flex-col h-full">
        <div className={`relative overflow-hidden ${featured ? 'h-64 md:h-80' : 'h-48'}`}>
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl bg-[var(--color-bg-secondary)]">
              {project.status === 'coming-soon' ? '⏳' : '💡'}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy-deep)]/80 to-transparent flex items-end p-4">
            <div className="flex flex-wrap gap-2">
              {project.techTags.map((tag) => (
                <Badge key={tag} variant="muted" className="!bg-white/15 !text-white">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3
              className={`font-display font-semibold text-[var(--color-text-primary)] ${featured ? 'text-2xl' : 'text-xl'}`}
            >
              {project.title}
            </h3>
            {project.status === 'active' && (
              <div className="flex items-center gap-3 text-sm shrink-0 text-[var(--color-text-secondary)]">
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-[var(--color-accent-cta)]" />
                  {project.stars}
                </span>
                {project.language && <Badge>{project.language}</Badge>}
              </div>
            )}
          </div>

          <p className="text-sm leading-relaxed mb-4 flex-grow text-[var(--color-text-secondary)]">
            {project.description}
          </p>

          <div className="flex gap-3 flex-wrap">
            {projectPath && project.status === 'active' && (
              <Button variant="primary" to={projectPath} className="!text-sm !px-4 !py-2">
                Ver proyecto
              </Button>
            )}
            {project.repoUrl ? (
              <Button
                variant={projectPath ? 'secondary' : 'primary'}
                href={project.repoUrl}
                external
                className="!text-sm !px-4 !py-2"
              >
                <GitHubIcon size={16} />
                Ver código
              </Button>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium opacity-60 bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]">
                {project.status === 'coming-soon' ? 'Próximamente' : 'En ideación'}
              </span>
            )}
            {project.demoUrl && (
              <Button
                variant="ghost"
                href={project.demoUrl}
                external
                className="!text-sm !px-4 !py-2"
                trailingIcon={<ExternalLink size={14} />}
              >
                Demo
              </Button>
            )}
          </div>
        </div>
      </article>
    </Card>
  )
}
