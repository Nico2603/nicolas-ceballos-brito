import type { NarrativeSection } from '../types/content'
import type { TopicFaqItem, BreadcrumbItem } from '../lib/structured-data'
import ContentImageFigure from './ContentImageFigure'
import FaqAccordion from './FaqAccordion'
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react'
import { SOCIAL_LINKS } from '../constants/social'
import { CONTACT_SECTION_HREF } from '../data/contact'
import Footer from './Footer'
import SeoHelmet from './SeoHelmet'
import { buildExpertiseStructuredData } from '../lib/structured-data'
import { GitHubIcon } from './icons/SocialIcons'
import Button from './ui/Button'

interface ExpertiseLandingLayoutProps {
  pageTitle: string
  pageDescription: string
  slug: string
  topicName: string
  breadcrumbs: BreadcrumbItem[]
  eyebrow: string
  h1: string
  lead: string
  sections?: NarrativeSection[]
  leftCardTitle: string
  leftCardItems: string[]
  rightCardTitle: string
  rightCardItems: string[]
  faqTitle: string
  faq: TopicFaqItem[]
}

export default function ExpertiseLandingLayout({
  pageTitle,
  pageDescription,
  slug,
  topicName,
  breadcrumbs,
  eyebrow,
  h1,
  lead,
  sections,
  leftCardTitle,
  leftCardItems,
  rightCardTitle,
  rightCardItems,
  faqTitle,
  faq,
}: ExpertiseLandingLayoutProps) {
  const structuredData = buildExpertiseStructuredData(
    slug,
    pageTitle,
    pageDescription,
    faq,
    topicName,
    breadcrumbs,
  )

  return (
    <>
      <SeoHelmet
        title={pageTitle}
        description={pageDescription}
        canonicalPath={slug}
        structuredData={structuredData}
      />

      <main className="pt-28">
        <section className="bg-[var(--color-bg-primary)] py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-label)]">
              {eyebrow}
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl text-[var(--color-text-primary)]">
              {h1}
            </h1>
            <p className="direct-answer mt-5 text-lg leading-relaxed text-[var(--color-text-secondary)]">
              {lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="primary" to={CONTACT_SECTION_HREF}>
                <Mail size={18} />
                Contactar
              </Button>
              <Button variant="secondary" href={SOCIAL_LINKS.github} external>
                <GitHubIcon size={18} />
                Ver GitHub
              </Button>
              <Button variant="ghost" to="/about" trailingIcon={<ArrowRight size={14} />}>
                Sobre mí
              </Button>
            </div>
          </div>
        </section>

        {sections && sections.length > 0 && (
          <section className="bg-[var(--color-bg-secondary)] py-16 md:py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
              {sections.map((section) => (
                <article key={section.heading} className="mb-12 last:mb-0">
                  <h2 className="mb-4 text-2xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                    {section.heading}
                  </h2>
                  <div className="space-y-4 leading-relaxed text-[var(--color-text-secondary)]">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>
                  {section.image && <ContentImageFigure image={section.image} />}
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="bg-[var(--color-bg-primary)] py-16 md:py-20">
          <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            <article className="rounded-2xl border p-6 bg-[var(--color-bg-card)] border-[var(--color-border-light)]">
              <h2 className="mb-4 text-xl font-semibold text-[var(--color-text-primary)]">
                {leftCardTitle}
              </h2>
              <ul className="space-y-3">
                {leftCardItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-icon)]"
                      strokeWidth={2}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl border p-6 bg-[var(--color-bg-card)] border-[var(--color-border-light)]">
              <h2 className="mb-4 text-xl font-semibold text-[var(--color-text-primary)]">
                {rightCardTitle}
              </h2>
              <ul className="space-y-3">
                {rightCardItems.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-icon)]"
                      strokeWidth={2}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section id="faq" className="bg-[var(--color-bg-primary)] py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-center font-display text-3xl font-semibold tracking-tight md:text-4xl text-[var(--color-text-primary)]">
              {faqTitle}
            </h2>
            <FaqAccordion items={faq} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
