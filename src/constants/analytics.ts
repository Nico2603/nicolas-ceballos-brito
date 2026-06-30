/** ID de medición GA4 del flujo «Start» (nicolasceballosbrito.com). */
export const GA_MEASUREMENT_ID_DEFAULT = 'G-QFQFLD69P3'

export const GA_MEASUREMENT_ID =
  import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() || GA_MEASUREMENT_ID_DEFAULT
