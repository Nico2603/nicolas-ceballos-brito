import { AlertCircle, Loader2, SearchX } from 'lucide-react'
import Footer from '../components/Footer'
import RepositoryCard from '../components/RepositoryCard'
import RepositoryFilters from '../components/RepositoryFilters'
import SeoHelmet from '../components/SeoHelmet'
import Card from '../components/ui/Card'
import SectionHeader from '../components/ui/SectionHeader'
import {
  SEO_REPOSITORIES_DESCRIPTION,
  SEO_REPOSITORIES_KEYWORDS,
  SEO_REPOSITORIES_TITLE,
} from '../constants/seo-pages'
import { useGitHubRepos } from '../hooks/useGitHubRepos'
import { buildRepositoriesStructuredData, getRepositoriesSnapshot } from '../lib/structured-data'

export default function Repositories() {
  const { repos, filters, updateFilters, clearFilters, languages, stats, loading, error } =
    useGitHubRepos()

  const breadcrumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Repositorios', path: '/repositories' },
  ]

  return (
    <>
      <SeoHelmet
        title={SEO_REPOSITORIES_TITLE}
        description={SEO_REPOSITORIES_DESCRIPTION}
        canonicalPath="/repositories"
        keywords={SEO_REPOSITORIES_KEYWORDS}
        structuredData={buildRepositoriesStructuredData(
          SEO_REPOSITORIES_TITLE,
          SEO_REPOSITORIES_DESCRIPTION,
          getRepositoriesSnapshot(),
          breadcrumbs,
        )}
      />

      <section className="pt-32 pb-8 px-4" style={{ background: 'var(--gradient-hero)' }}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="GitHub"
            title="Mis"
            highlight="repositorios"
            description="Colección completa de proyectos con filtros avanzados por lenguaje, estrellas y más."
            align="left"
            className="[&_h2]:text-white [&_p]:text-white/80 [&_p:first-of-type]:text-[var(--color-accent-cta)]"
          />
          <p className="direct-answer mt-4 text-white/80 max-w-2xl leading-relaxed">
            {SEO_REPOSITORIES_DESCRIPTION}
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-[var(--color-bg-primary)]">
        <div className="max-w-6xl mx-auto">
          {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Repositorios', value: stats.totalRepos },
                { label: 'Estrellas', value: stats.totalStars },
                { label: 'Forks', value: stats.totalForks },
                { label: 'Lenguajes', value: stats.totalLanguages },
              ].map((stat) => (
                <Card key={stat.label} hover={false}>
                  <div className="p-4 text-center">
                    <div className="font-display text-2xl font-bold text-[var(--color-text-primary)]">
                      {stat.value}
                    </div>
                    <div className="text-sm text-[var(--color-text-secondary)]">{stat.label}</div>
                  </div>
                </Card>
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
              <Loader2 size={40} className="animate-spin text-[var(--color-accent-primary)]" />
              <p className="text-[var(--color-text-secondary)]">Cargando repositorios...</p>
            </div>
          )}

          {error && (
            <Card>
              <div className="p-12 text-center">
                <AlertCircle size={48} className="mx-auto mb-4 text-red-500" />
                <p className="text-[var(--color-text-secondary)]">{error}</p>
              </div>
            </Card>
          )}

          {!loading && !error && repos.length === 0 && (
            <Card>
              <div className="p-12 text-center">
                <SearchX size={48} className="mx-auto mb-4 text-[var(--color-accent-primary)]" />
                <p className="text-[var(--color-text-secondary)]">
                  No se encontraron repositorios con los filtros seleccionados.
                </p>
              </div>
            </Card>
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
