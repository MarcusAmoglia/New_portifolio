import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/New_portifolio/',  
  server: {
    port: 5174,
    strictPort: false
  }
})