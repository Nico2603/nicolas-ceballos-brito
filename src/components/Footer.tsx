import { FULL_NAME } from '../constants/social'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-8 text-center text-white" style={{ background: 'var(--gradient-footer)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-sm opacity-90">
          © {year} {FULL_NAME}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
