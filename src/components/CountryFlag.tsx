import CO from 'country-flag-icons/react/3x2/CO'
import AR from 'country-flag-icons/react/3x2/AR'
import CL from 'country-flag-icons/react/3x2/CL'
import CR from 'country-flag-icons/react/3x2/CR'
import EC from 'country-flag-icons/react/3x2/EC'
import ES from 'country-flag-icons/react/3x2/ES'
import MX from 'country-flag-icons/react/3x2/MX'
import PA from 'country-flag-icons/react/3x2/PA'
import PE from 'country-flag-icons/react/3x2/PE'
import US from 'country-flag-icons/react/3x2/US'
import VE from 'country-flag-icons/react/3x2/VE'

type FlagComponent = typeof CO

const FLAG_ICONS: Record<string, FlagComponent> = {
  AR,
  CL,
  CO,
  CR,
  EC,
  ES,
  MX,
  PA,
  PE,
  US,
  VE,
}

interface CountryFlagProps {
  countryId: string
  title: string
  className?: string
}

export default function CountryFlag({
  countryId,
  title,
  className = 'h-4 w-6 shrink-0',
}: CountryFlagProps) {
  const Flag = FLAG_ICONS[countryId] ?? CO

  return (
    <span
      title={title}
      aria-label={title}
      role="img"
      className={`inline-flex overflow-hidden rounded-[3px] shadow-sm ring-1 ring-black/10 dark:ring-white/15 ${className}`}
    >
      <Flag aria-hidden className="h-full w-full" />
    </span>
  )
}
