import { motion } from 'framer-motion'
import {
  Brain,
  Cloud,
  Code,
  Database,
  GitBranch,
  Laptop,
  Wrench,
} from 'lucide-react'
import { skillCategories } from '../data/content'

const categoryIcons: Record<string, typeof Code> = {
  code: Code,
  laptop: Laptop,
  brain: Brain,
  database: Database,
  'git-branch': GitBranch,
  cloud: Cloud,
  wrench: Wrench,
}

export default function SkillsSection() {
  return (
    <div className="space-y-8">
      <h2 className="font-display text-3xl font-bold text-center" style={{ color: 'var(--color-primary)' }}>
        💻 Tecnologías & Habilidades
      </h2>

      {skillCategories.map((category, index) => {
        const Icon = categoryIcons[category.icon] ?? Code

        return (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="glass-card rounded-2xl p-6 md:p-8 max-w-4xl mx-auto"
          >
            <h3 className="font-display text-xl font-semibold mb-6 flex items-center justify-center gap-2" style={{ color: 'var(--color-primary)' }}>
              <Icon size={22} style={{ color: 'var(--color-secondary)' }} />
              {category.title}
            </h3>

            <div className="space-y-6">
              {category.subcategories.map((sub) => (
                <div key={sub.title}>
                  <h4 className="font-medium mb-3 text-center" style={{ color: 'var(--color-secondary)' }}>
                    {sub.title}
                  </h4>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {sub.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full text-sm font-medium text-white shadow-sm"
                        style={{ background: 'linear-gradient(45deg, var(--color-accent), var(--color-secondary))' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {sub.iconsUrl && (
                    <div className="flex justify-center">
                      <img src={sub.iconsUrl} alt={sub.title} className="rounded-lg max-w-full" loading="lazy" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
