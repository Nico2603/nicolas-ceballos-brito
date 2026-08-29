import { Navigate, useLocation } from 'react-router-dom'
import ConglomerateLayout from '../components/catalog/ConglomerateLayout'
import { getFamilyByPath, getProjectsForFamily } from '../data/catalog'

export default function ConglomeratePage() {
  const { pathname } = useLocation()
  const family = getFamilyByPath(pathname)
  if (!family) return <Navigate to="/" replace />

  return <ConglomerateLayout family={family} projects={getProjectsForFamily(family.id)} />
}
