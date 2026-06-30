import { motion, useReducedMotion } from 'framer-motion'
import { Heart, RotateCcw } from 'lucide-react'
import {
  FORM_SUCCESS_ANOTHER,
  FORM_SUCCESS_GREETING,
  FORM_SUCCESS_RESPONSE,
  FORM_SUCCESS_TITLE,
  FORM_SUCCESS_TRUST,
} from '../data/contact'

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.28, ease: EASE_SMOOTH },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_SMOOTH },
  },
}

const RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315]

interface ContactFormSuccessProps {
  submittedName: string
  onReset: () => void
}

export default function ContactFormSuccess({ submittedName, onReset }: ContactFormSuccessProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      role="status"
      aria-live="polite"
      className="relative flex flex-col items-center text-center py-4 md:py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="relative mb-8" aria-hidden="true">
        <motion.div
          className="absolute inset-0 -m-6 rounded-full blur-2xl"
          style={{
            background:
              'radial-gradient(circle, color-mix(in srgb, var(--color-accent-primary) 35%, transparent) 0%, color-mix(in srgb, var(--color-accent-primary) 12%, transparent) 55%, transparent 72%)',
          }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.8, ease: EASE_SMOOTH, delay: 0.05 }
          }
        />

        {RAY_ANGLES.map((angle, index) => (
          <motion.span
            key={angle}
            className="absolute left-1/2 top-1/2 h-10 w-0.5 origin-bottom rounded-full"
            style={{
              marginLeft: '-1px',
              marginTop: '-44px',
              rotate: `${angle}deg`,
              background:
                'linear-gradient(to top, color-mix(in srgb, var(--color-accent-primary) 55%, transparent), transparent)',
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 0.7, scaleY: 1 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    delay: 0.2 + index * 0.04,
                    duration: 0.45,
                    ease: EASE_SMOOTH,
                  }
            }
          />
        ))}

        <motion.div
          className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 shadow-lg"
          style={{
            borderColor: 'color-mix(in srgb, var(--color-accent-primary) 45%, transparent)',
            background:
              'linear-gradient(145deg, color-mix(in srgb, var(--color-accent-primary) 22%, transparent) 0%, color-mix(in srgb, var(--color-accent-primary) 14%, transparent) 100%)',
            boxShadow: '0 12px 40px color-mix(in srgb, var(--color-accent-primary) 22%, transparent)',
          }}
          initial={shouldReduceMotion ? false : { scale: 0, rotate: -24 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 280, damping: 18, delay: 0.08 }
          }
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
            <motion.path
              d="M9 18.5L15.5 25L27 12"
              stroke="var(--color-accent-primary)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={shouldReduceMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { delay: 0.35, duration: 0.45, ease: EASE_SMOOTH }
              }
            />
          </svg>
        </motion.div>
      </div>

      <motion.p
        variants={itemVariants}
        className="font-semibold text-xs uppercase tracking-[0.2em] mb-3"
        style={{ color: 'var(--color-accent-primary)' }}
      >
        {FORM_SUCCESS_GREETING(submittedName)}
      </motion.p>

      <motion.h3
        variants={itemVariants}
        className="font-display text-2xl md:text-3xl font-semibold mb-4 tracking-tight leading-tight"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {FORM_SUCCESS_TITLE}
      </motion.h3>

      <motion.p
        variants={itemVariants}
        className="text-base leading-relaxed max-w-sm mb-2"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {FORM_SUCCESS_TRUST}
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
        style={{
          backgroundColor: 'var(--color-accent-badge-bg)',
          color: 'var(--color-accent-badge-text)',
        }}
      >
        <Heart className="w-4 h-4 shrink-0" strokeWidth={2} aria-hidden="true" />
        <p className="text-sm font-medium">{FORM_SUCCESS_RESPONSE}</p>
      </motion.div>

      <motion.button
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
      </motion.button>
    </motion.div>
  )
}
