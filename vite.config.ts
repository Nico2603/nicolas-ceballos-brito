import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { Connect } from 'vite'

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

export default defineConfig({
  plugins: [react(), tailwindcss(), spaFallback()],
})
