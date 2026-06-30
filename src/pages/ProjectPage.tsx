import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Star } from 'lucide-react'
import Footer from '../components/Footer'
import SeoHelmet from '../components/SeoHelmet'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { PROJECT_SLUGS } from '../constants/seo-routes'
import { getProjectBySlug } from '../data/projects'
import { buildProjectStructuredData } from '../lib/structured-data'
import { GitHubIcon } from '../components/icons/SocialIcons'

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()

  if (!slug || !PROJECT_SLUGS.includes(slug as (typeof PROJECT_SLUGS)[number])) {
    return <Navigate to="/" replace />
  }

  const project = getProjectBySlug(slug)
  if (!project) return <Navigate to="/" replace />

  const breadcrumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Portafolio', path: '/#portafolio' },
    { name: project.title, path: project.path },
  ]

  const structuredData = buildProjectStructuredData(project, breadcrumbs)

  return (
    <>
      <SeoHelmet
        title={project.pageTitle}
        description={project.pageDescription}
        canonicalPath={project.path}
        keywords={project.techStack.join(', ')}
        structuredData={structuredData}
      />

      <main className="pt-28">
        <article className="bg-[var(--color-bg-primary)] py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-label)]">
              Proyecto destacado
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl text-[var(--color-text-primary)]">
              {project.title}
            </h1>
            <p className="direct-answer mt-6 text-lg leading-relaxed font-medium text-[var(--color-text-primary)]">
              {project.directAnswer}
            </p>

            {project.imageUrl && (
              <div className="mt-8 rounded-2xl overflow-hidden border border-[var(--color-border-light)]">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.techStack.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
              <span className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
                <Star size={14} className="text-[var(--color-accent-cta)]" />
                {project.stars} estrellas
              </span>
              {project.language && <Badge variant="muted">{project.language}</Badge>}
            </div>

            <p className="mt-8 leading-relaxed text-[var(--color-text-secondary)]">
              {project.description}
            </p>

            <section className="mt-10">
              <h2 className="text-2xl font-semibold mb-4 text-[var(--color-text-primary)]">
                Aspectos destacados
              </h2>
              <ul className="space-y-3">
                {project.highlights.map((item) => (
                  <li key={item} className="text-[var(--color-text-secondary)] leading-relaxed">
                    • {item}
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button variant="primary" href={project.repoUrl} external>
                <GitHubIcon size={18} />
                Ver código en GitHub
              </Button>
              <Button variant="secondary" to="/" trailingIcon={<ArrowLeft size={14} />}>
                Volver al portafolio
              </Button>
            </div>

            <nav className="mt-10 flex flex-wrap gap-4 text-sm">
              <Link to="/desarrollo-web" className="text-[var(--color-accent-primary)] hover:underline">
                Desarrollo web
              </Link>
              <Link to="/inteligencia-artificial" className="text-[var(--color-accent-primary)] hover:underline">
                Inteligencia artificial
              </Link>
              <Link to="/repositories" className="text-[var(--color-accent-primary)] hover:underline">
                Todos los repositorios
                <ExternalLink size={12} className="inline ml-1" />
              </Link>
            </nav>
          </div>
        </article>
      </main>

      <Footer />
    </>
  )
}
