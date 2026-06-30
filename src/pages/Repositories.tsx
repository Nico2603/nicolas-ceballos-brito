import { AlertCircle, Loader2, SearchX } from 'lucide-react'
import { GitHubIcon } from '../components/icons/SocialIcons'
import Footer from '../components/Footer'
import { SimpleNavbar } from '../components/Navbar'
import RepositoryCard from '../components/RepositoryCard'
import RepositoryFilters from '../components/RepositoryFilters'
import SeoHelmet from '../components/SeoHelmet'
import { FULL_NAME } from '../constants/social'
import { useGitHubRepos } from '../hooks/useGitHubRepos'

export default function Repositories() {
  const { repos, filters, updateFilters, clearFilters, languages, stats, loading, error } =
    useGitHubRepos()

  return (
    <>
      <SeoHelmet
        title={`Repositorios — ${FULL_NAME}`}
        description="Explora todos mis repositorios de GitHub con filtros avanzados."
        canonicalPath="/repositories"
      />
      <SimpleNavbar />

      <section className="pt-28 pb-8 px-4 text-center" style={{ background: 'var(--gradient-hero)' }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <GitHubIcon size={36} />
            Mis Repositorios
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            Explora mi colección completa de proyectos con filtros avanzados por lenguaje, estrellas y más.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Repositorios', value: stats.totalRepos },
                { label: 'Estrellas', value: stats.totalStars },
                { label: 'Forks', value: stats.totalForks },
                { label: 'Lenguajes', value: stats.totalLanguages },
              ].map((stat) => (
                <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
                  <div className="font-display text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          <RepositoryFilters
            filters={filters}
            languages={languages}
            onUpdate={updateFilters}
            onClear={clearFilters}
          />

          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 size={40} className="animate-spin" style={{ color: 'var(--color-secondary)' }} />
              <p style={{ color: 'var(--color-text-secondary)' }}>Cargando repositorios...</p>
            </div>
          )}

          {error && (
            <div className="glass-card rounded-2xl p-12 text-center">
              <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
              <p style={{ color: 'var(--color-text-secondary)' }}>{error}</p>
            </div>
          )}

          {!loading && !error && repos.length === 0 && (
            <div className="glass-card rounded-2xl p-12 text-center">
              <SearchX size={48} className="mx-auto mb-4" style={{ color: 'var(--color-secondary)' }} />
              <p style={{ color: 'var(--color-text-secondary)' }}>
                No se encontraron repositorios con los filtros seleccionados.
              </p>
            </div>
          )}

          {!loading && !error && repos.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, index) => (
                <RepositoryCard key={repo.id} repo={repo} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
