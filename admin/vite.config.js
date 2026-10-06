import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/admin/',
  server: {
    proxy: {
      '/allproducts': 'http://localhost:4000',
      '/removeproduct': 'http://localhost:4000',
      '/addproduct': 'http://localhost:4000',
      '/upload': 'http://localhost:4000',
      '/images': 'http://localhost:4000',
    },
  },
})
