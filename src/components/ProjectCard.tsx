import { ExternalLink, Star } from 'lucide-react'
import { GitHubIcon } from './icons/SocialIcons'
import type { Project } from '../types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {

  return (
    <article
      id={project.id}
      className="glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-4xl"
            style={{ background: 'linear-gradient(135deg, var(--color-secondary), var(--color-accent))' }}
          >
            {project.status === 'coming-soon' ? '⏳' : '💡'}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <div className="flex flex-wrap gap-2">
            {project.techTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-display text-xl font-semibold" style={{ color: 'var(--color-primary)' }}>
            {project.title}
          </h3>
          {project.status === 'active' && (
            <div className="flex items-center gap-3 text-sm shrink-0" style={{ color: 'var(--color-text-secondary)' }}>
              <span className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500" />
                {project.stars}
              </span>
              {project.language && <span>{project.language}</span>}
            </div>
          )}
        </div>

        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
          {project.description}
        </p>

        <div className="flex gap-3">
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white transition-all hover:opacity-90"
              style={{ background: 'var(--color-primary)' }}
            >
              <GitHubIcon size={16} />
              Ver Código
            </a>
          ) : (
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium opacity-60 cursor-not-allowed"
              style={{ background: 'var(--color-secondary)', color: 'white' }}
            >
              {project.status === 'coming-soon' ? 'Próximamente' : 'En ideación'}
            </span>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all hover:bg-white/20"
              style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-secondary)' }}
            >
              <ExternalLink size={16} />
              Demo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
