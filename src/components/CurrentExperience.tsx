import { m } from 'framer-motion'
import { Briefcase, ExternalLink, GraduationCap, MapPin } from 'lucide-react'
import { currentRoles, graduation, PROFESSIONAL_LOCATION } from '../data/profile'
import SectionWrapper from './SectionWrapper'
import Badge from './ui/Badge'
import Button from './ui/Button'
import Card from './ui/Card'
import SectionHeader from './ui/SectionHeader'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export default function CurrentExperience() {
  return (
    <SectionWrapper id="experiencia" className="py-20 px-4 bg-[var(--color-bg-secondary)] relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="LinkedIn"
          title="Experiencia"
          highlight="profesional"
          description={`Extraída de mi perfil en LinkedIn · ${PROFESSIONAL_LOCATION}`}
        />

        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="space-y-8"
        >
          <m.div variants={itemVariants}>
            <Card hover={false} className="overflow-hidden border-[var(--color-accent-primary)]/30">
              <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 bg-gradient-to-r from-[var(--color-accent-primary)]/10 to-transparent">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-accent-primary)]/20 shrink-0">
                  <GraduationCap size={32} className="text-[var(--color-accent-primary)]" />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="muted">{graduation.period}</Badge>
                    <Badge>{graduation.degree}</Badge>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-[var(--color-text-primary)] mb-2">
                    {graduation.institution}
                  </h3>
                  <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed mb-2">
                    {graduation.highlight}
                  </p>
                  {graduation.activities && (
                    <p className="text-xs text-[var(--color-text-secondary)]">{graduation.activities}</p>
                  )}
                </div>
              </div>
            </Card>
          </m.div>

          <div className="grid md:grid-cols-2 gap-6">
            {currentRoles.map((role) => (
              <m.div
                key={role.id}
                variants={itemVariants}
                className={role.featured ? 'md:col-span-2' : ''}
              >
                <Card className={`h-full ${role.featured ? 'ring-2 ring-[var(--color-accent-cta)]/40' : ''}`}>
                  <article className="p-6 flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="flex items-center justify-center w-12 h-12 rounded-xl font-display font-bold text-lg shrink-0 bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)]"
                        aria-hidden
                      >
                        {role.initials}
                      </div>
                      <div className="min-w-0 flex-grow">
                        <p className="text-xs uppercase tracking-wider font-semibold text-[var(--color-accent-label)] mb-1">
                          {role.period}
                        </p>
                        <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)] leading-tight">
                          {role.title}
                        </h3>
                        <p className="text-sm font-medium text-[var(--color-accent-primary)]">{role.company}</p>
                        <p className="text-xs text-[var(--color-text-secondary)] flex items-center gap-1 mt-1">
                          <MapPin size={12} />
                          {role.location}
                        </p>
                      </div>
                      {role.current && <Badge variant="accent">Actual</Badge>}
                    </div>

                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4 flex-grow">
                      {role.description}
                    </p>

                    {(role.department || role.level) && (
                      <p className="text-xs text-[var(--color-text-secondary)] mb-3 flex items-center gap-1">
                        <Briefcase size={12} />
                        {[role.department, role.level].filter(Boolean).join(' · ')}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {role.tags.map((tag) => (
                        <Badge key={tag} variant="muted">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      variant="secondary"
                      href={role.linkedinUrl}
                      external
                      className="self-start !text-sm"
                      trailingIcon={<ExternalLink size={14} />}
                    >
                      Ver en LinkedIn
                    </Button>
                  </article>
                </Card>
              </m.div>
            ))}
          </div>
        </m.div>
      </div>
    </SectionWrapper>
  )
}
