import { motion } from 'framer-motion'
import { Clock, ExternalLink, GitFork, Star } from 'lucide-react'
import { GitHubIcon } from './icons/SocialIcons'
import { getTimeSince } from '../lib/github'
import type { GitHubRepo } from '../types'
import Badge from './ui/Badge'
import Button from './ui/Button'
import Card from './ui/Card'

interface RepositoryCardProps {
  repo: GitHubRepo
  index: number
}

export default function RepositoryCard({ repo, index }: RepositoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="h-full"
    >
      <Card className="h-full">
        <article className="p-6 flex flex-col h-full">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-display font-semibold text-lg text-[var(--color-text-primary)]">
              {repo.name}
            </h3>
            <Badge variant={repo.private ? 'muted' : 'default'}>
              {repo.private ? 'Privado' : 'Público'}
            </Badge>
          </div>

          <p className="text-sm flex-grow mb-4 text-[var(--color-text-secondary)]">
            {repo.description || 'Sin descripción disponible'}
          </p>

          {repo.topics && repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {repo.topics.map((topic) => (
                <Badge key={topic} variant="muted">
                  {topic}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-4 text-xs mb-4 text-[var(--color-text-secondary)]">
            {repo.language && <Badge>{repo.language}</Badge>}
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
              {getTimeSince(new Date(repo.updated_at))}
            </span>
          </div>

          <div className="flex gap-3 mt-auto flex-wrap">
            <Button variant="primary" href={repo.html_url} external className="!text-sm !px-4 !py-2">
              <GitHubIcon size={14} />
              Ver en GitHub
            </Button>
            {repo.homepage && (
              <Button
                variant="ghost"
                href={repo.homepage}
                external
                className="!text-sm !px-4 !py-2"
                trailingIcon={<ExternalLink size={14} />}
              >
                Demo
              </Button>
            )}
          </div>
        </article>
      </Card>
    </motion.div>
  )
}
