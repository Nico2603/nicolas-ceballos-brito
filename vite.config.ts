import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { Connect } from 'vite'

const GA_MEASUREMENT_ID_DEFAULT = 'G-QFQFLD69P3'

function injectGaMeasurementId(env: Record<string, string>) {
  const measurementId = env.VITE_GA_MEASUREMENT_ID?.trim() || GA_MEASUREMENT_ID_DEFAULT
  return {
    name: 'inject-ga-measurement-id',
    transformIndexHtml(html: string) {
      return html.replaceAll(GA_MEASUREMENT_ID_DEFAULT, measurementId)
    },
  }
}

function spaFallback(): { name: string; configurePreviewServer: (server: { middlewares: Connect.Server }) => void } {
  return {
    name: 'spa-fallback',
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url ?? ''
        if (
          url.includes('.') ||
          url.startsWith('/@') ||
          url.startsWith('/api/') ||
          url.startsWith('/assets/')
        ) {
          next()
          return
        }
        req.url = '/index.html'
        next()
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), spaFallback(), injectGaMeasurementId(env)],
  }
})
