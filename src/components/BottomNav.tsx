import { Briefcase, FolderGit2, Home, Mail, User } from 'lucide-react'
import { useActiveSection } from '../hooks/useActiveSection'
import { useSmartNavigation } from '../hooks/useSmartNavigation'

const dockItems = [
  { id: 'inicio' as const, label: 'Inicio', icon: Home, href: '#inicio' },
  { id: 'portafolio' as const, label: 'Proyectos', icon: Briefcase, href: '#portafolio' },
  { id: 'about' as const, label: 'Sobre mí', icon: User, href: '/about' },
  { id: 'repositories' as const, label: 'Repos', icon: FolderGit2, href: '/repositories' },
  { id: 'contacto' as const, label: 'Contacto', icon: Mail, href: '#contacto' },
]

export default function BottomNav() {
  const activeSection = useActiveSection()
  const { handleNavClick } = useSmartNavigation()

  return (
    <nav
      className="md:hidden fixed bottom-5 inset-x-4 z-40 rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-nav-bg)] backdrop-blur-xl shadow-[var(--shadow-nav)]"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
      aria-label="Navegación principal"
    >
      <ul className="flex items-center justify-around px-2 py-2">
        {dockItems.map(({ id, label, icon: Icon, href }) => {
          const isActive = activeSection === id
          return (
            <li key={id}>
              <button
                onClick={() => handleNavClick(href)}
                className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-colors ${
                  isActive
                    ? 'text-[var(--color-accent-primary)]'
                    : 'text-[var(--color-text-secondary)]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
