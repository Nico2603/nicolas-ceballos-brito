import type { CSSProperties, ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
  style?: CSSProperties
}

export default function SectionWrapper({ children, className = '', id, style }: SectionWrapperProps) {
  return (
    <section id={id} className={`section-reveal ${className}`.trim()} style={style}>
      {children}
    </section>
  )
}
