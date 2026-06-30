import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  enhanceReposWithTopics,
  fetchAllGitHubRepos,
  filterRepos,
  getRepoStats,
  getUniqueLanguages,
} from '../lib/github'
import type { GitHubRepo, RepoFilters } from '../types'

const defaultFilters: RepoFilters = {
  search: '',
  language: '',
  sortBy: 'updated',
  minStars: 0,
}

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [filters, setFilters] = useState<RepoFilters>(defaultFilters)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const fetched = await fetchAllGitHubRepos()
        const enhanced = await enhanceReposWithTopics(fetched)
        if (!controller.signal.aborted) {
          setRepos(enhanced)
        }
      } catch {
        if (!controller.signal.aborted) {
          setError('No se pudieron cargar los repositorios. Intenta de nuevo más tarde.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void load()
    return () => controller.abort()
  }, [])

  const filteredRepos = useMemo(() => filterRepos(repos, filters), [repos, filters])
  const languages = useMemo(() => getUniqueLanguages(repos), [repos])
  const stats = useMemo(() => getRepoStats(repos), [repos])

  const updateFilters = useCallback((partial: Partial<RepoFilters>) => {
    setFilters((prev) => ({ ...prev, ...partial }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters)
  }, [])

  return {
    repos: filteredRepos,
    allRepos: repos,
    filters,
    updateFilters,
    clearFilters,
    languages,
    stats,
    loading,
    error,
  }
}
