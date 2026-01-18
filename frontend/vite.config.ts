import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    host: true, // Expose to network (allows mobile access)
    port: 5173,
    strictPort: false,
  },
})
