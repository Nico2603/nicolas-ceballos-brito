import { FULL_NAME } from '../constants/social'

type MarcaVariant = 'header' | 'hero' | 'footer'

function Ncb({ frame }: { frame: string }) {
  return (
    <svg viewBox="0 0 68 32" className={`${frame} shrink-0`} aria-hidden>
      <path
        className="marca-n"
        d="M2 28V4L16 28V4"
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        className="marca-c"
        d="M36 7.5H26.5V24.5H36"
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path
        className="marca-b"
        fill="currentColor"
        fillRule="evenodd"
        d="M44 4.2h10.4c4.7 0 7.6 2.7 7.6 6.2 0 2.8-2 4.8-5.4 5.2v.4c3.8.4 6 2.6 6 5.8 0 3.8-3.2 6-8.4 6H44V4.2zm3.6 3.8h6c2.6 0 4 1.2 4 2.8s-1.4 2.8-4.2 2.8h-5.8V8zm0 9.2h6.4c3 0 4.6 1.4 4.6 3.4s-1.6 3.6-4.8 3.6H47.6v-7z"
      />
    </svg>
  )
}

function Wordmark({ className }: { className: string }) {
  return (
    <span className={`font-sans font-medium tracking-[-0.04em] ${className}`}>
      Nicol<span className="text-[var(--color-accent-cta)]">á</span>s
    </span>
  )
}

interface MarcaProps {
  variant: MarcaVariant
}

export default function Marca({ variant }: MarcaProps) {
  switch (variant) {
    case 'header':
      return (
        <span className="marca inline-flex text-[var(--color-text-primary)]">
          <Wordmark className="text-[15px] leading-none" />
        </span>
      )
    case 'hero':
      return (
        <span className="marca marca-ensamble inline-flex flex-col items-start gap-3 text-[var(--hero-text)]">
          <Ncb frame="h-7 w-auto" />
          <span className="filete" aria-hidden />
        </span>
      )
    case 'footer':
      return (
        <span className="marca mb-3 inline-flex items-center gap-3 text-white">
          <Ncb frame="h-8 w-auto" />
          <span className="font-sans text-lg font-medium leading-tight tracking-[-0.03em]">{FULL_NAME}</span>
        </span>
      )
    default: {
      const exhaustive: never = variant
      return exhaustive
    }
  }
}
