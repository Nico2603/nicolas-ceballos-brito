import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { TopicFaqItem } from '../lib/structured-data'

interface FaqAccordionItemProps {
  item: TopicFaqItem
  index: number
}

function FaqAccordionItem({ item, index }: FaqAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const baseId = useId()
  const panelId = `${baseId}-panel-${index}`
  const triggerId = `${baseId}-trigger-${index}`

  return (
    <article className="rounded-xl border bg-[var(--color-bg-card)] border-[var(--color-border-light)]">
      <button
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <h3 className="flex-1 text-center font-display font-semibold text-[var(--color-text-primary)]">
          {item.question}
        </h3>
        <ChevronDown
          size={18}
          className={`shrink-0 text-[var(--color-accent-primary)] transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={`faq-collapse ${isOpen ? 'faq-collapse-open' : ''}`}
        aria-hidden={!isOpen}
      >
        <div className="faq-collapse-inner">
          <p className="faq-answer px-5 pb-5 text-center text-justify leading-relaxed text-[var(--color-text-secondary)]">
            {item.answer}
          </p>
        </div>
      </div>
    </article>
  )
}

interface FaqAccordionProps {
  items: TopicFaqItem[]
  className?: string
}

export default function FaqAccordion({ items, className = '' }: FaqAccordionProps) {
  return (
    <div className={`mx-auto max-w-3xl space-y-4 ${className}`}>
      {items.map((item, index) => (
        <FaqAccordionItem key={item.question} item={item} index={index} />
      ))}
    </div>
  )
}
