import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const port = Number(env.VITE_PORT) || 3000

  return {
    plugins: [react()],
    server: {
      port,
    },
  }
})
