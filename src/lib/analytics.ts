import { GA_MEASUREMENT_ID } from '../constants/analytics'

type AnalyticsEventParams = Record<string, string | number | boolean | undefined>

let initialized = false
let ready = false
let lastTrackedPath: string | null = null
let initPromise: Promise<void> | null = null
const pendingEvents: Array<{ name: string; params?: AnalyticsEventParams }> = []

function isValidGaMeasurementId(value: string | undefined): value is string {
  return Boolean(value && /^G-[A-Z0-9]+$/.test(value))
}

function ensureDataLayer(): void {
  window.dataLayer = window.dataLayer ?? []
}

function hasScriptBySrc(src: string): boolean {
  return Boolean(document.querySelector(`script[src="${src}"]`))
}

function loadScript(scriptId: string, src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById(scriptId)) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.async = true
    script.src = src
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`No se pudo cargar el script: ${src}`))
    document.head.appendChild(script)
  })
}

async function initGa(measurementId: string): Promise<void> {
  ensureDataLayer()

  window.gtag =
    window.gtag ??
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args)
    }

  const gtagSrc = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  const tagPreloaded = hasScriptBySrc(gtagSrc)

  if (!tagPreloaded) {
    await loadScript('ga-base-script', gtagSrc)
    window.gtag('js', new Date())
    window.gtag('config', measurementId, { send_page_view: false })
  }

  ready = true
}

function scheduleDeferredInit(callback: () => void): void {
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(() => callback(), { timeout: 4000 })
    return
  }

  globalThis.setTimeout(callback, 2000)
}

export async function initGoogleAnalytics(): Promise<void> {
  if (initPromise) return initPromise
  if (initialized) return

  initPromise = new Promise<void>((resolve) => {
    scheduleDeferredInit(() => {
      void (async () => {
        try {
          if (isValidGaMeasurementId(GA_MEASUREMENT_ID)) {
            await initGa(GA_MEASUREMENT_ID)
            initialized = true
            flushPendingEvents()
            resolve()
            return
          }

          initialized = true
          console.warn(
            `[analytics] No se inicializó GA4: ID inválido (${GA_MEASUREMENT_ID ?? 'vacío'})`,
          )
          resolve()
        } catch (error: unknown) {
          ready = false
          initialized = true
          console.warn('[analytics] Falló la inicialización de GA4', error)
          resolve()
        } finally {
          initPromise = null
        }
      })()
    })
  })

  return initPromise
}

function flushPendingEvents(): void {
  if (!ready || pendingEvents.length === 0) return

  for (const event of pendingEvents) {
    window.gtag?.('event', event.name, event.params)
  }

  pendingEvents.length = 0
}

export function trackEvent(name: string, params?: AnalyticsEventParams): void {
  if (ready) {
    window.gtag?.('event', name, params)
    return
  }

  pendingEvents.push({ name, params })
  void initGoogleAnalytics()
}

export function trackPageView(path: string): void {
  if (path === lastTrackedPath) return
  lastTrackedPath = path

  const pageParams = {
    page_path: path,
    page_location: `${window.location.origin}${path}`,
    page_title: document.title,
  }

  if (ready && isValidGaMeasurementId(GA_MEASUREMENT_ID)) {
    window.gtag?.('config', GA_MEASUREMENT_ID, pageParams)
    return
  }

  trackEvent('page_view', pageParams)
}

/** Evento recomendado GA4 al enviar el formulario de contacto con éxito. */
export function trackGenerateLead(method: string): void {
  trackEvent('generate_lead', {
    currency: 'COP',
    value: 0,
    lead_source: method,
  })
}

/** Clic en enlace de WhatsApp u otro canal de contacto directo. */
export function trackContactClick(channel: string, source: string): void {
  trackEvent('contact', {
    method: channel,
    content: source,
  })
}
