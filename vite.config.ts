import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { Connect } from 'vite'

const GA_MEASUREMENT_ID_DEFAULT = 'G-QFQFLD69P3'

const CRITICAL_FONT_PATTERNS = [
  'fraunces-latin-700-normal',
  'plus-jakarta-sans-latin-400-normal',
]

function injectCriticalFontPreload(): Plugin {
  return {
    name: 'inject-critical-font-preload',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html

        const fontFiles = Object.values(ctx.bundle)
          .filter((file) => file.type === 'asset' && file.fileName.endsWith('.woff2'))
          .map((file) => file.fileName)
          .filter((fileName) => CRITICAL_FONT_PATTERNS.some((pattern) => fileName.includes(pattern)))

        if (fontFiles.length === 0) return html

        const preloads = fontFiles
          .map(
            (fileName) =>
              `<link rel="preload" href="/${fileName}" as="font" type="font/woff2" crossorigin>`,
          )
          .join('\n    ')

        return html.replace('</head>', `    ${preloads}\n  </head>`)
      },
    },
  }
}

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
    plugins: [
      react(),
      tailwindcss(),
      spaFallback(),
      injectGaMeasurementId(env),
      injectCriticalFontPreload(),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (
              id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router')
            ) {
              return 'vendor-react'
            }
            if (id.includes('node_modules/framer-motion')) {
              return 'vendor-motion'
            }
            if (id.includes('node_modules/lenis')) {
              return 'vendor-lenis'
            }
            return undefined
          },
        },
      },
    },
  }
})
