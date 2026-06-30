import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/nicolas-ceballos-brito/',
  plugins: [react(), tailwindcss()],
})
