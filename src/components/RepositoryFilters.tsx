import { Search, X } from 'lucide-react'
import type { RepoFilters, RepoSortOption } from '../types'
import Card from './ui/Card'

interface RepositoryFiltersProps {
  filters: RepoFilters
  languages: string[]
  onUpdate: (partial: Partial<RepoFilters>) => void
  onClear: () => void
}

const sortOptions: { value: RepoSortOption; label: string }[] = [
  { value: 'updated', label: 'Última actualización' },
  { value: 'created', label: 'Fecha de creación' },
  { value: 'name', label: 'Nombre' },
  { value: 'stars', label: 'Estrellas' },
  { value: 'forks', label: 'Forks' },
]

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-[var(--color-border-light)] bg-[var(--color-bg-card)] text-sm text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-[var(--color-accent-primary)]/40 transition-shadow'

export default function RepositoryFilters({
  filters,
  languages,
  onUpdate,
  onClear,
}: RepositoryFiltersProps) {
  return (
    <Card hover={false} className="mb-8">
      <div className="p-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
            <input
              type="text"
              placeholder="Buscar repositorios..."
              value={filters.search}
              onChange={(e) => onUpdate({ search: e.target.value })}
              className={`${inputClass} pl-10`}
            />
          </div>

          <select
            value={filters.language}
            onChange={(e) => onUpdate({ language: e.target.value })}
            className={inputClass}
          >
            <option value="">Todos los lenguajes</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>

          <select
            value={filters.sortBy}
            onChange={(e) => onUpdate({ sortBy: e.target.value as RepoSortOption })}
            className={inputClass}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <input
            type="number"
            min={0}
            placeholder="Mín. estrellas"
            value={filters.minStars || ''}
            onChange={(e) => onUpdate({ minStars: parseInt(e.target.value) || 0 })}
            className={inputClass}
          />
        </div>

        <button
          onClick={onClear}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent-primary)] hover:opacity-80 transition-opacity"
        >
          <X size={14} />
          Limpiar filtros
        </button>
      </div>
    </Card>
  )
}
