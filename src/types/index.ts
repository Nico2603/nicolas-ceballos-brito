export type ProjectStatus = 'active' | 'coming-soon' | 'ideation'

export interface Project {
  id: string
  title: string
  description: string
  stars: number
  language: string
  techTags: string[]
  imageUrl: string
  repoUrl: string
  demoUrl?: string
  status: ProjectStatus
}

export interface LaboresSlide {
  id: string
  title: string
  description: string
  image: string
  detailUrl: string
  alt: string
}

export interface PortfolioStat {
  icon: 'code' | 'star' | 'git-branch'
  value: string
  label: string
}

export interface SkillSubcategory {
  title: string
  tags: string[]
  iconsUrl?: string
}

export interface SkillCategory {
  title: string
  icon: string
  subcategories: SkillSubcategory[]
}

export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  private: boolean
  fork: boolean
  created_at: string
  updated_at: string
  topics?: string[]
}

export type RepoSortOption = 'updated' | 'created' | 'name' | 'stars' | 'forks'

export interface RepoFilters {
  search: string
  language: string
  sortBy: RepoSortOption
  minStars: number
}
