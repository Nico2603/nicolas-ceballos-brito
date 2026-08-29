import { Navigate, useLocation } from 'react-router-dom'
import ProjectArticleLayout from '../components/catalog/ProjectArticleLayout'
import { getFamilyById, getProjectByPath, getSiblingProjects } from '../data/catalog'

export default function CatalogProjectPage() {
  const { pathname } = useLocation()
  const project = getProjectByPath(pathname)
  if (!project) return <Navigate to="/" replace />

  const family = getFamilyById(project.familyId)
  if (!family) return <Navigate to="/" replace />

  return (
    <ProjectArticleLayout family={family} project={project} siblings={getSiblingProjects(project)} />
  )
}
