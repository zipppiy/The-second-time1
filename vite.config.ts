import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          react: ['react', 'react-dom', 'react-router-dom'],
          audio: ['howler'],
          motion: ['framer-motion'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['three', 'howler'],
  },
})
