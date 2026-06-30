import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
  style?: CSSProperties
}

export default function SectionWrapper({ children, className = '', id, style }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 56, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ type: 'spring', stiffness: 260, damping: 28 }}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  )
}
