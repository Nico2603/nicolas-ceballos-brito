import { DEFAULT_PHONE_COUNTRY_ID, getPhoneCountry } from '../data/phone-countries'

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '')
}

export function normalizePhone(value: string): string {
  const trimmed = value.trim()
  if (trimmed.startsWith('+')) {
    return `+${trimmed.slice(1).replace(/[\s\-()]/g, '')}`
  }
  return trimmed.replace(/[\s\-()]/g, '')
}

export function toInternationalPhone(countryId: string, nationalDigits: string): string {
  const country = getPhoneCountry(countryId)
  const dialDigits = country.dialCode.replace('+', '')
  return `+${dialDigits}${nationalDigits}`
}

export function formatPhoneDisplay(countryId: string, nationalDigits: string): string {
  const country = getPhoneCountry(countryId)
  const formatted = country.formatNational(nationalDigits)
  return `${country.dialCode} ${formatted}`.trim()
}

export function isValidPhoneForCountry(countryId: string, nationalDigits: string): boolean {
  const country = getPhoneCountry(countryId)
  const digits = digitsOnly(nationalDigits)
  if (digits.length < country.minDigits || digits.length > country.maxDigits) {
    return false
  }
  return country.isValidNational(digits)
}

/** @deprecated Usar isValidPhoneForCountry con país explícito */
export function isValidColombianPhone(value: string): boolean {
  const normalized = normalizePhone(value)
  const digits = normalized.startsWith('+') ? normalized.slice(1) : normalized

  if (digits.startsWith('57')) {
    return isValidPhoneForCountry(DEFAULT_PHONE_COUNTRY_ID, digits.slice(2))
  }

  return isValidPhoneForCountry(DEFAULT_PHONE_COUNTRY_ID, digits)
}
