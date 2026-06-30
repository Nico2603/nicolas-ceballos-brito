import { motion } from 'framer-motion'
import { Award, BookOpen, ExternalLink, Globe, Languages } from 'lucide-react'
import {
  linkedInCertifications,
  linkedInEducation,
  linkedInLanguages,
  linkedInProjects,
  linkedInSkills,
} from '../data/linkedin-profile'
import Badge from './ui/Badge'
import Button from './ui/Button'
import Card from './ui/Card'
import SectionHeader from './ui/SectionHeader'

function formatIssuedDate(iso: string): string {
  const [year, month] = iso.split('-')
  if (!year || !month) return iso
  const date = new Date(Number(year), Number(month) - 1)
  return new Intl.DateTimeFormat('es-CO', { month: 'long', year: 'numeric' }).format(date)
}

export default function LinkedInProfileDetails() {
  return (
    <div className="space-y-16">
      <div>
        <SectionHeader
          eyebrow="LinkedIn"
          title="Formación"
          highlight="académica"
          align="left"
          description="Educación extraída del perfil de LinkedIn."
        />
        <div className="grid gap-6">
          {linkedInEducation.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <Card>
                <div className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-[var(--color-text-primary)]">
                        {edu.degree}
                      </h3>
                      <p className="text-sm font-medium text-[var(--color-accent-primary)]">{edu.school}</p>
                    </div>
                    <Badge variant="muted">{edu.period}</Badge>
                  </div>
                  {edu.location && (
                    <p className="text-xs text-[var(--color-text-secondary)] mb-2">{edu.location}</p>
                  )}
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{edu.description}</p>
                  {edu.activities && (
                    <p className="text-xs text-[var(--color-text-secondary)] mt-3 pt-3 border-t border-[var(--color-border)]">
                      {edu.activities}
                    </p>
                  )}
                  {edu.schoolUrl && (
                    <Button
                      variant="ghost"
                      href={edu.schoolUrl}
                      external
                      className="mt-4 !text-sm !px-0"
                      trailingIcon={<ExternalLink size={14} />}
                    >
                      Ver institución
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <SectionHeader
          eyebrow="LinkedIn"
          title="Licencias y"
          highlight="certificaciones"
          align="left"
          description={`${linkedInCertifications.length} certificaciones verificables en LinkedIn.`}
        />
        <div className="grid sm:grid-cols-2 gap-4">
          {linkedInCertifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04, duration: 0.4 }}
            >
              <Card className="h-full">
                <div className="p-5 flex flex-col h-full">
                  <div className="flex items-start gap-3 mb-2">
                    <Award size={18} className="shrink-0 mt-0.5 text-[var(--color-accent-primary)]" />
                    <h3 className="font-display text-sm font-semibold text-[var(--color-text-primary)] leading-snug">
                      {cert.name}
                    </h3>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] mb-1">{cert.issuer}</p>
                  <p className="text-xs text-[var(--color-accent-label)] mb-3">
                    Emitida: {formatIssuedDate(cert.issuedDate)}
                  </p>
                  {cert.credentialUrl && (
                    <Button
                      variant="ghost"
                      href={cert.credentialUrl}
                      external
                      className="mt-auto self-start !text-xs !px-0"
                      trailingIcon={<ExternalLink size={12} />}
                    >
                      Ver credencial
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <SectionHeader
          eyebrow="LinkedIn"
          title="Proyectos"
          highlight="destacados"
          align="left"
        />
        <div className="grid md:grid-cols-2 gap-6">
          {linkedInProjects.map((project) => (
            <Card key={project.id}>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={18} className="text-[var(--color-accent-primary)]" />
                  <h3 className="font-display font-semibold text-[var(--color-text-primary)]">{project.name}</h3>
                </div>
                <Badge variant="muted" className="mb-3">
                  {project.period}
                </Badge>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{project.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <SectionHeader
          eyebrow="LinkedIn"
          title="Habilidades"
          highlight="endosadas"
          align="left"
        />
        <Card>
          <div className="p-6 flex flex-wrap gap-2">
            {linkedInSkills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </Card>
      </div>

      <div>
        <SectionHeader
          eyebrow="LinkedIn"
          title="Idiomas"
          align="left"
        />
        <div className="grid sm:grid-cols-2 gap-4">
          {linkedInLanguages.map((lang) => (
            <Card key={lang.name}>
              <div className="p-5 flex items-center gap-3">
                <Languages size={20} className="text-[var(--color-accent-primary)]" />
                <div>
                  <p className="font-semibold text-[var(--color-text-primary)]">{lang.name}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{lang.proficiency}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <p className="text-xs text-center text-[var(--color-text-secondary)] flex items-center justify-center gap-1">
        <Globe size={12} />
        Datos sincronizados desde LinkedIn
      </p>
    </div>
  )
}
