import { Navigate, useParams } from 'react-router-dom'
import { LEGACY_PROJECT_REDIRECTS } from '../data/catalog'

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const destination = slug ? LEGACY_PROJECT_REDIRECTS[slug] : undefined
  return <Navigate to={destination ?? '/'} replace />
}
