import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/psychic-fortnight/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
