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
    'bg-[var(--color-accent-cta)] text-[var(--color-navy-deep)] hover:brightness-110',
  secondary:
    'bg-transparent border-2 border-[var(--color-btn-secondary-bg)] text-[var(--color-text-primary)] hover:bg-[var(--color-btn-secondary-bg)] hover:text-[var(--color-btn-secondary-text)]',
  ghost:
    'bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-light)] hover:bg-[var(--color-bg-secondary)]',
  icon:
    'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] p-2.5 rounded-sm',
}

function getClasses(variant: ButtonVariant, className: string) {
  const base =
    'box-border inline-flex flex-row items-center justify-center gap-2 font-medium text-sm leading-none transition-colors duration-200 rounded-sm no-underline'
  const size = variant === 'icon' ? '' : 'h-11 px-6'
  return `${base} ${size} ${variantClasses[variant]} ${className}`
}

export default function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    children,
    trailingIcon,
    className = '',
    animated: _animated = false,
    ...domProps
  } = props
  void _animated
  const classes = getClasses(variant, className)

  const content = (
    <>
      {children}
      {trailingIcon ? <span className="inline-flex shrink-0 translate-y-px" aria-hidden>{trailingIcon}</span> : null}
    </>
  )

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {content}
      </Link>
    )
  }

  if ('href' in props && props.href) {
    const { href, external, onClick, ...rest } = domProps as Omit<
      ButtonAsLink,
      'variant' | 'children' | 'trailingIcon' | 'className' | 'animated'
    >
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target={external || href.startsWith('http') ? '_blank' : undefined}
        rel={external || href.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...rest}
      >
        {content}
      </a>
    )
  }

  const { onClick, disabled, type = 'button', ...rest } = domProps as Omit<
    ButtonAsButton,
    'variant' | 'children' | 'trailingIcon' | 'className' | 'animated'
  >
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...rest}>
      {content}
    </button>
  )
}
