export interface PhoneCountry {
  id: string
  name: string
  dialCode: string
  maxDigits: number
  minDigits: number
  placeholder: string
  formatNational: (digits: string) => string
  isValidNational: (digits: string) => boolean
}

function digitsOnly(value: string): string {
  return value.replace(/\D/g, '')
}

function formatGrouped(digits: string, groups: number[]): string {
  const parts: string[] = []
  let offset = 0
  for (const size of groups) {
    if (offset >= digits.length) break
    parts.push(digits.slice(offset, offset + size))
    offset += size
  }
  return parts.join(' ')
}

export const DEFAULT_PHONE_COUNTRY_ID = 'CO'

export const phoneCountries: PhoneCountry[] = [
  {
    id: 'CO',
    name: 'Colombia',
    dialCode: '+57',
    maxDigits: 10,
    minDigits: 10,
    placeholder: '313 595 9733',
    formatNational: (value) => formatGrouped(digitsOnly(value).slice(0, 10), [3, 3, 4]),
    isValidNational: (digits) => digits.length === 10 && digits[0] === '3',
  },
  {
    id: 'MX',
    name: 'México',
    dialCode: '+52',
    maxDigits: 10,
    minDigits: 10,
    placeholder: '55 1234 5678',
    formatNational: (value) => formatGrouped(digitsOnly(value).slice(0, 10), [2, 4, 4]),
    isValidNational: (digits) => digits.length === 10,
  },
  {
    id: 'US',
    name: 'Estados Unidos',
    dialCode: '+1',
    maxDigits: 10,
    minDigits: 10,
    placeholder: '(555) 123-4567',
    formatNational: (value) => {
      const d = digitsOnly(value).slice(0, 10)
      if (d.length <= 3) return d
      if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`
      return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
    },
    isValidNational: (digits) => digits.length === 10,
  },
  {
    id: 'ES',
    name: 'España',
    dialCode: '+34',
    maxDigits: 9,
    minDigits: 9,
    placeholder: '612 34 56 78',
    formatNational: (value) => formatGrouped(digitsOnly(value).slice(0, 9), [3, 2, 2, 2]),
    isValidNational: (digits) => digits.length === 9,
  },
  {
    id: 'AR',
    name: 'Argentina',
    dialCode: '+54',
    maxDigits: 10,
    minDigits: 10,
    placeholder: '11 2345 6789',
    formatNational: (value) => formatGrouped(digitsOnly(value).slice(0, 10), [2, 4, 4]),
    isValidNational: (digits) => digits.length === 10,
  },
  {
    id: 'PE',
    name: 'Perú',
    dialCode: '+51',
    maxDigits: 9,
    minDigits: 9,
    placeholder: '912 345 678',
    formatNational: (value) => formatGrouped(digitsOnly(value).slice(0, 9), [3, 3, 3]),
    isValidNational: (digits) => digits.length === 9,
  },
  {
    id: 'EC',
    name: 'Ecuador',
    dialCode: '+593',
    maxDigits: 9,
    minDigits: 9,
    placeholder: '99 123 4567',
    formatNational: (value) => formatGrouped(digitsOnly(value).slice(0, 9), [2, 3, 4]),
    isValidNational: (digits) => digits.length === 9,
  },
  {
    id: 'CL',
    name: 'Chile',
    dialCode: '+56',
    maxDigits: 9,
    minDigits: 9,
    placeholder: '9 1234 5678',
    formatNational: (value) => formatGrouped(digitsOnly(value).slice(0, 9), [1, 4, 4]),
    isValidNational: (digits) => digits.length === 9,
  },
  {
    id: 'VE',
    name: 'Venezuela',
    dialCode: '+58',
    maxDigits: 10,
    minDigits: 10,
    placeholder: '412 123 4567',
    formatNational: (value) => formatGrouped(digitsOnly(value).slice(0, 10), [3, 3, 4]),
    isValidNational: (digits) => digits.length === 10,
  },
  {
    id: 'PA',
    name: 'Panamá',
    dialCode: '+507',
    maxDigits: 8,
    minDigits: 8,
    placeholder: '6123 4567',
    formatNational: (value) => formatGrouped(digitsOnly(value).slice(0, 8), [4, 4]),
    isValidNational: (digits) => digits.length === 8,
  },
  {
    id: 'CR',
    name: 'Costa Rica',
    dialCode: '+506',
    maxDigits: 8,
    minDigits: 8,
    placeholder: '8312 3456',
    formatNational: (value) => formatGrouped(digitsOnly(value).slice(0, 8), [4, 4]),
    isValidNational: (digits) => digits.length === 8,
  },
]

const countryById = new Map(phoneCountries.map((country) => [country.id, country]))

export function getPhoneCountry(countryId: string): PhoneCountry {
  return countryById.get(countryId) ?? countryById.get(DEFAULT_PHONE_COUNTRY_ID)!
}
