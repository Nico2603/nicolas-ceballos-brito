import { useCallback, useState, type FormEvent } from 'react'
import { DEFAULT_PHONE_COUNTRY_ID, getPhoneCountry } from '../data/phone-countries'
import { trackGenerateLead } from '../lib/analytics'
import { submitContactEmail } from '../lib/contact-email'
import { digitsOnly, isValidPhoneForCountry } from '../lib/phone'
import { FORM_ERROR_MESSAGE } from '../data/contact'

export interface ContactFormFields {
  name: string
  email: string
  phoneCountry: string
  phone: string
  message: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EMPTY_FIELDS: ContactFormFields = {
  name: '',
  email: '',
  phoneCountry: DEFAULT_PHONE_COUNTRY_ID,
  phone: '',
  message: '',
}

function validateFields(fields: ContactFormFields): ContactFormErrors {
  const errors: ContactFormErrors = {}
  const name = fields.name.trim()
  const email = fields.email.trim()

  if (name.length < 2) {
    errors.name = 'Escribe tu nombre (mínimo 2 caracteres).'
  }

  if (email.length > 0 && !EMAIL_PATTERN.test(email)) {
    errors.email = 'Ingresa un correo electrónico válido.'
  }

  if (!fields.phone.trim()) {
    const country = getPhoneCountry(fields.phoneCountry)
    errors.phone = `Ingresa un número de teléfono válido (ej. ${country.placeholder}).`
  } else if (!isValidPhoneForCountry(fields.phoneCountry, digitsOnly(fields.phone))) {
    const country = getPhoneCountry(fields.phoneCountry)
    errors.phone = `Ingresa un número de teléfono válido (ej. ${country.placeholder}).`
  }

  if (fields.message.trim().length < 10) {
    errors.message = 'Cuéntame un poco más (mínimo 10 caracteres).'
  }

  return errors
}

export function useContactForm() {
  const [fields, setFields] = useState<ContactFormFields>(EMPTY_FIELDS)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submittedName, setSubmittedName] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const updateField = useCallback((field: keyof ContactFormFields, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
    setErrorMessage(null)
  }, [])

  const resetForm = useCallback(() => {
    setIsSuccess(false)
    setSubmittedName('')
    setFields(EMPTY_FIELDS)
    setErrors({})
    setErrorMessage(null)
  }, [])

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setErrorMessage(null)

      const nextErrors = validateFields(fields)
      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors)
        return
      }

      setIsSubmitting(true)
      setErrors({})

      const result = await submitContactEmail(fields)

      if (result.ok) {
        trackGenerateLead('contact_form')
        setSubmittedName(fields.name.trim())
        setFields(EMPTY_FIELDS)
        setIsSuccess(true)
      } else {
        setErrorMessage(result.error ?? FORM_ERROR_MESSAGE)
      }

      setIsSubmitting(false)
    },
    [fields],
  )

  return {
    fields,
    errors,
    isSubmitting,
    isSuccess,
    submittedName,
    errorMessage,
    updateField,
    handleSubmit,
    resetForm,
  }
}
