import { GITHUB_USERNAME } from '../constants/social'
import type { GitHubRepo } from '../types'

function buildFallbackRepo(
  name: string,
  description: string,
  language: string,
  stars = 0,
): GitHubRepo {
  return {
    id: name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0),
    name,
    description,
    html_url: `https://github.com/${GITHUB_USERNAME}/${name}`,
    homepage: null,
    language,
    stargazers_count: stars,
    forks_count: 0,
    private: false,
    fork: false,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2025-12-01T00:00:00Z',
    topics: [],
  }
}

export const FALLBACK_GITHUB_REPOS: GitHubRepo[] = [
  buildFallbackRepo(
    'ChatBot-MentalHealth',
    'Chatbot especializado en apoyo de salud mental utilizando IA para proporcionar recursos y soporte emocional.',
    'Python',
  ),
  buildFallbackRepo(
    'PdM-Manager',
    'Sistema avanzado de gestión para mantenimiento predictivo con React, Node.js y machine learning.',
    'JavaScript',
  ),
  buildFallbackRepo(
    'FastQA-HomePage',
    'Página de inicio moderna para plataforma de preguntas y respuestas rápidas.',
    'HTML',
  ),
  buildFallbackRepo(
    'magiacafetera-ui',
    'Interfaz elegante para aplicación de café colombiano premium con Angular y TypeScript.',
    'TypeScript',
  ),
  buildFallbackRepo(
    'nicolas-ceballos-brito',
    'Portafolio profesional con React, TypeScript y Vite.',
    'TypeScript',
  ),
]

const fallbackLanguages = new Set(
  FALLBACK_GITHUB_REPOS.filter((repo) => repo.language).map((repo) => repo.language),
)

export const FALLBACK_GITHUB_STATS = {
  totalRepos: FALLBACK_GITHUB_REPOS.length,
  totalStars: FALLBACK_GITHUB_REPOS.reduce((sum, repo) => sum + repo.stargazers_count, 0),
  totalForks: FALLBACK_GITHUB_REPOS.reduce((sum, repo) => sum + repo.forks_count, 0),
  totalLanguages: fallbackLanguages.size,
}
