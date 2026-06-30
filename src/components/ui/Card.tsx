import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  id?: string
}

export default function Card({ children, className = '', hover = true, id }: CardProps) {
  return (
    <div
      id={id}
      className={`rounded-2xl p-[1px] bg-[var(--color-border-light)] shadow-[var(--shadow-card)] ${
        hover ? 'transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5' : ''
      } ${className}`}
    >
      <div className="rounded-[15px] bg-[var(--color-bg-card)] h-full overflow-hidden">
        {children}
      </div>
    </div>
  )
}
