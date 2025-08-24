import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    open: true,
    allowedHosts: ['1bb64ea0a7e3.ngrok-free.app']
  },
})
