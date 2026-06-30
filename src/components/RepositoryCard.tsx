import { motion } from 'framer-motion'
import { Clock, ExternalLink, GitFork, Star } from 'lucide-react'
import { GitHubIcon } from './icons/SocialIcons'
import { getTimeSince } from '../lib/github'
import type { GitHubRepo } from '../types'

interface RepositoryCardProps {
  repo: GitHubRepo
  index: number
}

export default function RepositoryCard({ repo, index }: RepositoryCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="glass-card rounded-xl p-6 flex flex-col h-full"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-display font-semibold text-lg" style={{ color: 'var(--color-primary)' }}>
          {repo.name}
        </h3>
        <span
          className="text-xs px-2 py-1 rounded-full shrink-0"
          style={{
            background: repo.private ? 'rgba(255,0,0,0.1)' : 'rgba(0,128,0,0.1)',
            color: repo.private ? '#c00' : 'var(--color-secondary)',
          }}
        >
          {repo.private ? 'Privado' : 'Público'}
        </span>
      </div>

      <p className="text-sm flex-grow mb-4" style={{ color: 'var(--color-text-secondary)' }}>
        {repo.description || 'Sin descripción disponible'}
      </p>

      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics.map((topic) => (
            <span
              key={topic}
              className="text-xs px-2 py-1 rounded-full"
              style={{ background: 'var(--color-tertiary)', color: 'var(--color-primary)' }}
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-4 text-xs mb-4" style={{ color: 'var(--color-text-secondary)' }}>
        {repo.language && (
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: 'var(--color-accent)' }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star size={12} />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork size={12} />
          {repo.forks_count}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={12} />
          Actualizado {getTimeSince(new Date(repo.updated_at))}
        </span>
      </div>

      <div className="flex gap-3 mt-auto">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white"
          style={{ background: 'var(--color-primary)' }}
        >
          <GitHubIcon size={14} />
          Ver en GitHub
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border"
            style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-secondary)' }}
          >
            <ExternalLink size={14} />
            Demo
          </a>
        )}
      </div>
    </motion.article>
  )
}
