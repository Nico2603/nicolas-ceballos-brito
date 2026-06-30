import { GITHUB_USERNAME } from '../constants/social'
import type { GitHubRepo, RepoFilters, RepoSortOption } from '../types'

export async function fetchAllGitHubRepos(): Promise<GitHubRepo[]> {
  let page = 1
  let allRepos: GitHubRepo[] = []
  let hasMore = true

  while (hasMore) {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}&sort=updated&direction=desc`,
    )

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const repos = (await response.json()) as GitHubRepo[]

    if (repos.length === 0) {
      hasMore = false
    } else {
      allRepos = allRepos.concat(repos)
      page++
    }
  }

  return allRepos.filter((repo) => !repo.fork)
}

export async function enhanceReposWithTopics(repos: GitHubRepo[]): Promise<GitHubRepo[]> {
  const enhanced = await Promise.all(
    repos.slice(0, 10).map(async (repo) => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}`,
          { headers: { Accept: 'application/vnd.github.mercy-preview+json' } },
        )

        if (response.ok) {
          const data = (await response.json()) as GitHubRepo
          return { ...repo, topics: data.topics ?? [] }
        }
      } catch {
        // Topics opcionales
      }

      return { ...repo, topics: [] }
    }),
  )

  const rest = repos.slice(10).map((repo) => ({ ...repo, topics: repo.topics ?? [] }))
  return [...enhanced, ...rest]
}

export function sortRepos(repos: GitHubRepo[], sortBy: RepoSortOption): GitHubRepo[] {
  const sorted = [...repos]

  sorted.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'stars':
        return b.stargazers_count - a.stargazers_count
      case 'forks':
        return b.forks_count - a.forks_count
      case 'created':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      case 'updated':
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      default: {
        const _exhaustive: never = sortBy
        return _exhaustive
      }
    }
  })

  return sorted
}

export function filterRepos(repos: GitHubRepo[], filters: RepoFilters): GitHubRepo[] {
  const searchTerm = filters.search.toLowerCase().trim()

  const filtered = repos.filter((repo) => {
    const matchesSearch =
      !searchTerm ||
      repo.name.toLowerCase().includes(searchTerm) ||
      (repo.description?.toLowerCase().includes(searchTerm) ?? false)

    const matchesLanguage = !filters.language || repo.language === filters.language
    const matchesStars = repo.stargazers_count >= filters.minStars

    return matchesSearch && matchesLanguage && matchesStars
  })

  return sortRepos(filtered, filters.sortBy)
}

export function getUniqueLanguages(repos: GitHubRepo[]): string[] {
  const languages = new Set<string>()

  repos.forEach((repo) => {
    if (repo.language) languages.add(repo.language)
  })

  return Array.from(languages).sort()
}

export function getRepoStats(repos: GitHubRepo[]) {
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0)
  const languages = new Set(repos.filter((repo) => repo.language).map((repo) => repo.language))

  return {
    totalRepos: repos.length,
    totalStars,
    totalForks,
    totalLanguages: languages.size,
  }
}

export function getTimeSince(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const intervals = [
    { label: 'año', seconds: 31536000 },
    { label: 'mes', seconds: 2592000 },
    { label: 'día', seconds: 86400 },
    { label: 'hora', seconds: 3600 },
    { label: 'minuto', seconds: 60 },
  ]

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds)
    if (count > 0) {
      return `hace ${count} ${interval.label}${count === 1 ? '' : 's'}`
    }
  }

  return 'hace un momento'
}

export function openGmailCompose(email: string, subject: string, body: string): void {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )

  if (isMobile) return

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.open(gmailUrl, '_blank')
}
