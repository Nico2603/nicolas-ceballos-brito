import { catalogFamilies } from './families'
import { catalogProjects } from './projects'
import type { CatalogFamily, CatalogProject, FamilyId } from './types'

export type { CatalogFamily, CatalogProject, CatalogSection, FamilyId } from './types'
export { catalogFamilies } from './families'
export { catalogProjects } from './projects'

export const LEGACY_PROJECT_REDIRECTS: Record<string, string> = {
  'chatbot-mental-health': '/salud-mental/chatbot-mental-health-bert',
  'pdm-manager': '/mantenimiento-predictivo/pdm-manager',
  'fastqa-homepage': '/webs/fastqa-homepage',
  'magiacafetera-ui': '/webs/magiacafetera-ui',
}

export function getFamilyById(id: FamilyId): CatalogFamily | undefined {
  return catalogFamilies.find((family) => family.id === id)
}

export function getFamilyByPath(path: string): CatalogFamily | undefined {
  return catalogFamilies.find((family) => family.path === path)
}

export function getProjectBySlug(slug: string): CatalogProject | undefined {
  return catalogProjects.find((project) => project.slug === slug)
}

export function getProjectByPath(path: string): CatalogProject | undefined {
  return catalogProjects.find((project) => project.path === path)
}

export function getProjectsForFamily(id: FamilyId): CatalogProject[] {
  const family = getFamilyById(id)
  if (!family) return []
  return family.projectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is CatalogProject => Boolean(project))
}

export function getSiblingProjects(project: CatalogProject): CatalogProject[] {
  return getProjectsForFamily(project.familyId).filter((item) => item.slug !== project.slug)
}

export function getCatalogPrerenderPaths(): string[] {
  return [...catalogFamilies.map((family) => family.path), ...catalogProjects.map((project) => project.path)]
}
