import { m } from 'framer-motion'
import { Brain, Code, Database, GitBranch } from 'lucide-react'
import { skillCategories } from '../data/content'
import Badge from './ui/Badge'
import Card from './ui/Card'
import SectionHeader from './ui/SectionHeader'

const categoryIcons: Record<string, typeof Code> = {
  code: Code,
  brain: Brain,
  database: Database,
  'git-branch': GitBranch,
}

export default function SkillsSection() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Stack técnico"
        title="Tecnologías &"
        highlight="habilidades"
        align="center"
      />

      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => {
          const Icon = categoryIcons[category.icon] ?? Code

          return (
            <m.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2 text-[var(--color-text-primary)]">
                    <Icon size={20} className="text-[var(--color-accent-primary)]" />
                    {category.title}
                  </h3>

                  <div className="space-y-4">
                    {category.subcategories.map((sub) => (
                      <div key={sub.title}>
                        <h4 className="text-xs uppercase tracking-wider font-medium mb-2 text-[var(--color-text-secondary)]">
                          {sub.title}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {sub.tags.map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </m.div>
          )
        })}
      </div>
    </div>
  )
}
