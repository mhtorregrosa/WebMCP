import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative asset URLs keep the static build portable across GitHub project
  // Pages, a future custom domain, and local preview without rebuild-time hacks.
  base: './',
})
