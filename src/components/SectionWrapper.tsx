import { m } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
  style?: CSSProperties
}

export default function SectionWrapper({ children, className = '', id, style }: SectionWrapperProps) {
  return (
    <m.section
      id={id}
      initial={{ opacity: 1, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </m.section>
  )
}
