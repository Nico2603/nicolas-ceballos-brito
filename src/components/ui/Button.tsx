import { m } from 'framer-motion'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon'

interface ButtonBaseProps {
  variant?: ButtonVariant
  children: ReactNode
  trailingIcon?: ReactNode
  className?: string
  animated?: boolean
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; to?: undefined }

type ButtonAsLink = ButtonBaseProps & {
  href: string
  external?: boolean
  to?: undefined
} & Omit<ButtonHTMLAttributes<HTMLAnchorElement>, 'href'>

type ButtonAsRouterLink = ButtonBaseProps & {
  to: string
  href?: undefined
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsRouterLink

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-accent-cta)] text-[var(--color-navy-deep)] shadow-[var(--shadow-cta)] hover:brightness-110 hover:shadow-[var(--shadow-glow-amber)]',
  secondary:
    'bg-transparent border-2 border-[var(--color-btn-secondary-bg)] text-[var(--color-text-primary)] hover:bg-[var(--color-btn-secondary-bg)] hover:text-[var(--color-btn-secondary-text)]',
  ghost:
    'bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-light)] hover:bg-[var(--color-bg-secondary)]',
  icon:
    'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] p-2.5 rounded-full',
}

function getClasses(variant: ButtonVariant, className: string) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold text-sm transition-all duration-300 rounded-full'
  const size = variant === 'icon' ? '' : 'px-6 py-2.5'
  return `${base} ${size} ${variantClasses[variant]} ${className}`
}

const motionProps = {
  whileHover: { scale: 1.04, y: -2 },
  whileTap: { scale: 0.97 },
} as const

function MotionWrap({
  animated,
  children,
}: {
  animated: boolean
  children: ReactNode
}) {
  if (!animated) {
    return <>{children}</>
  }

  return <m.div {...motionProps}>{children}</m.div>
}

export default function Button(props: ButtonProps) {
  const { variant = 'primary', children, trailingIcon, className = '', animated = false } = props
  const classes = getClasses(variant, className)

  const inner = (
    <>
      {children}
      {trailingIcon && (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-black/10">
          {trailingIcon}
        </span>
      )}
    </>
  )

  if ('to' in props && props.to) {
    return (
      <MotionWrap animated={animated}>
        <Link to={props.to} className={classes}>
          {inner}
        </Link>
      </MotionWrap>
    )
  }

  if ('href' in props && props.href) {
    const { href, external, onClick, ...rest } = props as ButtonAsLink
    return (
      <MotionWrap animated={animated}>
        <a
          href={href}
          className={classes}
          onClick={onClick}
          target={external || href.startsWith('http') ? '_blank' : undefined}
          rel={external || href.startsWith('http') ? 'noopener noreferrer' : undefined}
          {...rest}
        >
          {inner}
        </a>
      </MotionWrap>
    )
  }

  const { onClick, disabled, type = 'button', ...rest } = props as ButtonAsButton
  return (
    <MotionWrap animated={animated}>
      <button type={type} onClick={onClick} disabled={disabled} className={classes} {...rest}>
        {inner}
      </button>
    </MotionWrap>
  )
}
