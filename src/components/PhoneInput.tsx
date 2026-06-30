import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import CountryFlag from './CountryFlag'
import { getPhoneCountry, phoneCountries } from '../data/phone-countries'
import { digitsOnly } from '../lib/phone'

interface PhoneInputProps {
  id: string
  countryId: string
  value: string
  onCountryChange: (countryId: string) => void
  onChange: (nationalDigits: string) => void
  error?: string
  label: string
}

const fieldStyle = {
  backgroundColor: 'var(--color-bg-primary)',
  borderColor: 'var(--color-border-light)',
  color: 'var(--color-text-primary)',
} as const

const focusRingClass =
  'focus-within:ring-2 focus-within:ring-[var(--color-accent-primary)]/10 group-focus-within/phone:border-[var(--color-accent-primary)]'

export default function PhoneInput({
  id,
  countryId,
  value,
  onCountryChange,
  onChange,
  error,
  label,
}: PhoneInputProps) {
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false)
  const countryMenuRef = useRef<HTMLDivElement>(null)
  const country = getPhoneCountry(countryId)
  const nationalDigits = digitsOnly(value)
  const displayValue = country.formatNational(nationalDigits)

  const handleCountryChange = (nextCountryId: string) => {
    onCountryChange(nextCountryId)
    const nextCountry = getPhoneCountry(nextCountryId)
    onChange(digitsOnly(value).slice(0, nextCountry.maxDigits))
    setIsCountryMenuOpen(false)
  }

  const handleNumberChange = (raw: string) => {
    onChange(digitsOnly(raw).slice(0, country.maxDigits))
  }

  useEffect(() => {
    if (!isCountryMenuOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!countryMenuRef.current?.contains(event.target as Node)) {
        setIsCountryMenuOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCountryMenuOpen(false)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isCountryMenuOpen])

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1.5"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {label}
      </label>
      <div
        className={`group/phone flex gap-2 rounded-xl ${focusRingClass}`}
        style={error ? { boxShadow: '0 0 0 1px #DC2626' } : undefined}
      >
        <div className="relative shrink-0" ref={countryMenuRef}>
          <button
            type="button"
            aria-label="Seleccionar país e indicativo telefónico"
            aria-haspopup="listbox"
            aria-expanded={isCountryMenuOpen}
            onClick={() => setIsCountryMenuOpen((prev) => !prev)}
            className={`flex h-full items-center gap-2 border rounded-xl px-3 py-3 min-w-[7.25rem] transition-colors duration-200 ${focusRingClass}`}
            style={fieldStyle}
          >
            <CountryFlag countryId={country.id} title={country.name} />
            <span className="text-sm font-semibold tabular-nums tracking-tight">{country.dialCode}</span>
            <ChevronDown
              className={`w-4 h-4 shrink-0 opacity-45 transition-transform duration-200 ${
                isCountryMenuOpen ? 'rotate-180' : ''
              }`}
              strokeWidth={2}
            />
          </button>

          {isCountryMenuOpen ? (
            <div
              role="listbox"
              className="absolute z-40 mt-2 w-[17rem] rounded-xl border shadow-xl overflow-hidden"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border-light)',
              }}
            >
              <ul className="max-h-72 overflow-auto py-1">
                {phoneCountries.map((item) => {
                  const isSelected = item.id === countryId

                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleCountryChange(item.id)}
                        className="w-full flex items-center justify-between gap-3 px-3 py-2.5 text-left transition-colors duration-150 hover:bg-[var(--color-accent-badge-bg)]"
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <CountryFlag countryId={item.id} title={item.name} />
                          <span
                            className="text-sm truncate"
                            style={{ color: 'var(--color-text-primary)' }}
                          >
                            {item.name}
                          </span>
                        </span>
                        <span className="flex items-center gap-2 shrink-0">
                          <span
                            className="text-sm font-medium tabular-nums"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            {item.dialCode}
                          </span>
                          {isSelected ? (
                            <Check
                              className="w-4 h-4"
                              style={{ color: 'var(--color-accent-primary)' }}
                              strokeWidth={2.25}
                            />
                          ) : null}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : null}
        </div>

        <input
          id={id}
          name="phone"
          type="tel"
          required
          autoComplete="tel-national"
          inputMode="numeric"
          value={displayValue}
          onChange={(e) => handleNumberChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          placeholder={country.placeholder}
          maxLength={country.maxDigits + 6}
          className={`min-w-0 flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent-primary)] transition-all duration-200 ${focusRingClass}`}
          style={fieldStyle}
        />
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm" style={{ color: '#DC2626' }} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
