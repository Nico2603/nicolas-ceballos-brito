import { MapPin, Mail, ArrowRight, Loader2 } from 'lucide-react'
import { AnimatePresence, m } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import ContactFormSuccess from './ContactFormSuccess'
import PhoneInput from './PhoneInput'
import WhatsAppIcon from './icons/WhatsAppIcon'
import {
  CONTACT_SECTION_LABEL,
  CONTACT_HEADING_START,
  CONTACT_HEADING_ACCENT,
  CONTACT_SUBCOPY,
  contactInfoItems,
  FORM_TITLE,
  FORM_SUBMIT_TEXT,
  FORM_SENDING_TEXT,
  FORM_PHONE_LABEL,
  WHATSAPP_CTA_TEXT,
  WHATSAPP_PRIMARY_URL,
} from '../data/contact'
import { useContactForm } from '../hooks/useContactForm'
import { trackContactClick } from '../lib/analytics'

const inputStyle = {
  backgroundColor: 'var(--color-bg-primary)',
  borderColor: 'var(--color-border-light)',
  color: 'var(--color-text-primary)',
} as const

const errorStyle = { color: '#DC2626' } as const

const formExit = {
  opacity: 0,
  y: -16,
  scale: 0.98,
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
}

const inputFocusClass =
  'focus:outline-none focus:border-[var(--color-accent-primary)] focus:ring-2 focus:ring-[var(--color-accent-primary)]/10'

export default function Contact() {
  const {
    fields,
    errors,
    isSubmitting,
    isSuccess,
    submittedName,
    errorMessage,
    updateField,
    handleSubmit,
    resetForm,
  } = useContactForm()

  return (
    <SectionWrapper id="contacto" className="py-20 md:py-24 px-4 bg-[var(--color-bg-secondary)] section-mesh-bg relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <p
              className="font-semibold text-xs uppercase tracking-[0.2em] mb-3"
              style={{ color: 'var(--color-accent-primary)' }}
            >
              {CONTACT_SECTION_LABEL}
            </p>
            <h2
              className="font-display text-3xl md:text-5xl font-semibold mb-6 tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {CONTACT_HEADING_START}
              <span style={{ color: 'var(--color-accent-primary)' }}>{CONTACT_HEADING_ACCENT}</span>
            </h2>
            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {CONTACT_SUBCOPY}
            </p>

            <div className="space-y-4">
              {contactInfoItems.map((item) => {
                const iconEl =
                  item.icon === 'whatsapp' ? (
                    <WhatsAppIcon className="w-6 h-6" />
                  ) : item.icon === 'map-pin' ? (
                    <MapPin
                      className="w-5 h-5"
                      strokeWidth={1.75}
                      style={{ color: 'var(--color-accent-primary)' }}
                    />
                  ) : (
                    <Mail
                      className="w-5 h-5"
                      strokeWidth={1.75}
                      style={{ color: 'var(--color-accent-primary)' }}
                    />
                  )

                const valueContent = item.href ? (
                  <a
                    href={item.href}
                    target={item.icon === 'whatsapp' ? '_blank' : undefined}
                    rel={item.icon === 'whatsapp' ? 'noopener noreferrer' : undefined}
                    onClick={
                      item.icon === 'whatsapp'
                        ? () => trackContactClick('whatsapp', 'contacto_info')
                        : item.icon === 'mail'
                          ? () => trackContactClick('email', 'contacto_info')
                          : undefined
                    }
                    className="text-sm hover:underline transition-colors duration-200"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {item.value}
                  </p>
                )

                return (
                  <div key={item.icon} className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'var(--color-accent-badge-bg)' }}
                    >
                      {iconEl}
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                        {item.title}
                      </p>
                      {valueContent}
                    </div>
                  </div>
                )
              })}
            </div>

            <a
              href={WHATSAPP_PRIMARY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContactClick('whatsapp', 'contacto_cta')}
              className="group inline-flex items-center gap-3 mt-8 bg-[var(--color-accent-cta)] text-[var(--color-navy-deep)] font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-[var(--shadow-cta)] hover:scale-[1.02] hover:brightness-105"
            >
              <WhatsAppIcon className="w-5 h-5" variant="light" />
              <span>{WHATSAPP_CTA_TEXT}</span>
              <ArrowRight
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </a>
          </div>

          <m.div
            layout
            className="rounded-2xl p-8 border shadow-sm overflow-hidden"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderColor: 'var(--color-border-light)',
            }}
            transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isSuccess ? (
                <ContactFormSuccess
                  key="success"
                  submittedName={submittedName}
                  onReset={resetForm}
                />
              ) : (
                <m.div
                  key="form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={formExit}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3
                    className="text-xl font-semibold mb-6"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {FORM_TITLE}
                  </h3>
                  <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                    <input
                      type="checkbox"
                      name="botcheck"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-1.5"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        Nombre
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        minLength={2}
                        autoComplete="name"
                        value={fields.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        aria-invalid={errors.name ? true : undefined}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        placeholder="Tu nombre"
                        className={`w-full border rounded-xl px-4 py-3 transition-all duration-200 ${inputFocusClass}`}
                        style={inputStyle}
                      />
                      {errors.name ? (
                        <p id="name-error" className="mt-1.5 text-sm" style={errorStyle} role="alert">
                          {errors.name}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1.5"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        Correo electrónico
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={fields.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        aria-invalid={errors.email ? true : undefined}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        placeholder="tu@correo.com"
                        className={`w-full border rounded-xl px-4 py-3 transition-all duration-200 ${inputFocusClass}`}
                        style={inputStyle}
                      />
                      {errors.email ? (
                        <p id="email-error" className="mt-1.5 text-sm" style={errorStyle} role="alert">
                          {errors.email}
                        </p>
                      ) : null}
                    </div>
                    <PhoneInput
                      id="phone"
                      label={FORM_PHONE_LABEL}
                      countryId={fields.phoneCountry}
                      value={fields.phone}
                      onCountryChange={(countryId) => updateField('phoneCountry', countryId)}
                      onChange={(nationalDigits) => updateField('phone', nationalDigits)}
                      error={errors.phone}
                    />
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-1.5"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        Mensaje
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        minLength={10}
                        value={fields.message}
                        onChange={(e) => updateField('message', e.target.value)}
                        aria-invalid={errors.message ? true : undefined}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        placeholder="Cuéntame sobre tu proyecto o propuesta..."
                        className={`w-full border rounded-xl px-4 py-3 transition-all duration-200 resize-none ${inputFocusClass}`}
                        style={inputStyle}
                      />
                      {errors.message ? (
                        <p id="message-error" className="mt-1.5 text-sm" style={errorStyle} role="alert">
                          {errors.message}
                        </p>
                      ) : null}
                    </div>
                    {errorMessage ? (
                      <p
                        className="text-sm rounded-xl px-4 py-3"
                        style={{
                          backgroundColor: 'rgba(220, 38, 38, 0.08)',
                          color: '#DC2626',
                        }}
                        role="alert"
                      >
                        {errorMessage}
                      </p>
                    ) : null}
                    <m.button
                      type="submit"
                      disabled={isSubmitting}
                      whileTap={isSubmitting ? undefined : { scale: 0.985 }}
                      className="w-full font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: 'var(--color-accent-cta)',
                        color: 'var(--color-navy-deep)',
                      }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                          {FORM_SENDING_TEXT}
                        </>
                      ) : (
                        FORM_SUBMIT_TEXT
                      )}
                    </m.button>
                  </form>
                </m.div>
              )}
            </AnimatePresence>
          </m.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
