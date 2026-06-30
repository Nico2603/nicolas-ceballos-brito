import { motion } from 'framer-motion'
import { Calendar, ExternalLink } from 'lucide-react'
import { SOCIAL_LINKS } from '../constants/social'
import {
  getFeaturedLinkedInPost,
  getSecondaryLinkedInPosts,
  linkedInPosts,
} from '../data/linkedin-posts'
import { formatPublishedDate, formatRelativeDate } from '../lib/format-date'
import { LinkedInIcon } from './icons/SocialIcons'
import SectionWrapper from './SectionWrapper'
import Badge from './ui/Badge'
import Button from './ui/Button'
import Card from './ui/Card'
import SectionHeader from './ui/SectionHeader'

function PostImage({ imageUrl, title }: { imageUrl?: string; title: string }) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt=""
        className="w-full h-full object-cover"
        loading="lazy"
      />
    )
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0A66C2]/20 to-[var(--color-accent-primary)]/10">
      <LinkedInIcon size={48} className="text-[#0A66C2]/60" />
      <span className="sr-only">{title}</span>
    </div>
  )
}

export default function LinkedInFeed() {
  const featured = getFeaturedLinkedInPost()
  const secondary = getSecondaryLinkedInPosts()

  if (linkedInPosts.length === 0) return null

  return (
    <SectionWrapper id="actualizaciones" className="py-20 px-4 bg-[var(--color-bg-primary)] section-mesh-bg relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Actualizaciones"
          title="Desde"
          highlight="LinkedIn"
          description="Noticias recientes, hitos profesionales y reflexiones compartidas en mi perfil."
        />

        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <Card className="overflow-hidden">
              <article className="grid md:grid-cols-5 gap-0">
                <div className="md:col-span-2 h-56 md:h-auto md:min-h-[280px] overflow-hidden">
                  <PostImage imageUrl={featured.imageUrl} title={featured.title} />
                </div>
                <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <Badge variant="muted">Destacado</Badge>
                    <span className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                      <Calendar size={14} />
                      <time dateTime={featured.publishedAt}>
                        {formatRelativeDate(featured.publishedAt)} · {formatPublishedDate(featured.publishedAt)}
                      </time>
                    </span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
                    {featured.title}
                  </h3>
                  <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed mb-4">
                    {featured.excerpt}
                  </p>
                  {featured.tags && featured.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {featured.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  )}
                  <Button
                    variant="primary"
                    href={featured.postUrl}
                    external
                    className="self-start"
                    trailingIcon={<ExternalLink size={14} />}
                  >
                    <LinkedInIcon size={16} />
                    Leer en LinkedIn
                  </Button>
                </div>
              </article>
            </Card>
          </motion.div>
        )}

        {secondary.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {secondary.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="h-full">
                  <article className="flex flex-col h-full">
                    <div className="h-40 overflow-hidden rounded-t-[15px]">
                      <PostImage imageUrl={post.imageUrl} title={post.title} />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <time
                        dateTime={post.publishedAt}
                        className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] mb-2"
                      >
                        <Calendar size={12} />
                        {formatRelativeDate(post.publishedAt)}
                      </time>
                      <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)] mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                      <Button
                        variant="ghost"
                        href={post.postUrl}
                        external
                        className="self-start !text-sm !px-0"
                        trailingIcon={<ExternalLink size={14} />}
                      >
                        Ver publicación
                      </Button>
                    </div>
                  </article>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button variant="secondary" href={SOCIAL_LINKS.linkedin} external trailingIcon={<ExternalLink size={14} />}>
            <LinkedInIcon size={18} />
            Ver perfil completo en LinkedIn
          </Button>
        </div>
      </div>
    </SectionWrapper>
  )
}
