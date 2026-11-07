import { m } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import {
  FORM_SUCCESS_ANOTHER,
  FORM_SUCCESS_GREETING,
  FORM_SUCCESS_RESPONSE,
  FORM_SUCCESS_TITLE,
  FORM_SUCCESS_TRUST,
} from '../data/contact'

const EASE_SMOOTH = [0.2, 0.8, 0.2, 1] as const

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.28, ease: EASE_SMOOTH },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE_SMOOTH },
  },
}

interface ContactFormSuccessProps {
  submittedName: string
  onReset: () => void
}

export default function ContactFormSuccess({ submittedName, onReset }: ContactFormSuccessProps) {
  return (
    <m.div
      role="status"
      aria-live="polite"
      className="relative flex flex-col items-center text-center py-4 md:py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="mb-6 flex justify-center" aria-hidden="true">
        <span className="filete" />
      </div>

      <m.p
        variants={itemVariants}
        className="font-mono text-sm mb-3"
        style={{ color: 'var(--color-accent-primary)' }}
      >
        {FORM_SUCCESS_GREETING(submittedName)}
      </m.p>

      <m.h3
        variants={itemVariants}
        className="font-display text-2xl md:text-3xl font-semibold mb-4 tracking-tight leading-tight"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {FORM_SUCCESS_TITLE}
      </m.h3>

      <m.p
        variants={itemVariants}
        className="text-base leading-relaxed max-w-sm mb-2"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {FORM_SUCCESS_TRUST}
      </m.p>

      <m.div
        variants={itemVariants}
        className="inline-flex items-center gap-2 mb-8"
        style={{
          backgroundColor: 'var(--color-accent-badge-bg)',
          color: 'var(--color-accent-badge-text)',
        }}
      >
        <p className="text-sm font-medium">{FORM_SUCCESS_RESPONSE}</p>
      </m.div>

      <m.button
        variants={itemVariants}
        type="button"
        onClick={onReset}
        className="group inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:opacity-80"
        style={{ color: 'var(--color-accent-primary)' }}
      >
        <RotateCcw
          className="w-4 h-4 transition-transform duration-300 group-hover:-rotate-45"
          strokeWidth={2}
          aria-hidden="true"
        />
        {FORM_SUCCESS_ANOTHER}
      </m.button>
    </m.div>
  )
}
