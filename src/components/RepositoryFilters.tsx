import { Search, X } from 'lucide-react'
import type { RepoFilters, RepoSortOption } from '../types'

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

export default function RepositoryFilters({
  filters,
  languages,
  onUpdate,
  onClear,
}: RepositoryFiltersProps) {
  return (
    <div className="glass-card rounded-2xl p-6 mb-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
          <input
            type="text"
            placeholder="Buscar repositorios..."
            value={filters.search}
            onChange={(e) => onUpdate({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border bg-white/50 text-sm outline-none focus:ring-2"
            style={{ borderColor: 'var(--color-glass-border)' }}
          />
        </div>

        <select
          value={filters.language}
          onChange={(e) => onUpdate({ language: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border bg-white/50 text-sm outline-none"
          style={{ borderColor: 'var(--color-glass-border)' }}
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
          className="w-full px-4 py-2.5 rounded-xl border bg-white/50 text-sm outline-none"
          style={{ borderColor: 'var(--color-glass-border)' }}
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
          className="w-full px-4 py-2.5 rounded-xl border bg-white/50 text-sm outline-none"
          style={{ borderColor: 'var(--color-glass-border)' }}
        />
      </div>

      <button
        onClick={onClear}
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium hover:opacity-80"
        style={{ color: 'var(--color-secondary)' }}
      >
        <X size={14} />
        Limpiar filtros
      </button>
    </div>
  )
}
