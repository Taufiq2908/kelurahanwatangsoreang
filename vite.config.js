import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // ── Base URL ──────────────────────────────────────────────────────────────
  // Keep '/' for local dev and GitHub Pages at root domain.
  // For a project page (e.g. https://user.github.io/repo/), change to '/repo/'
  base: '/',

  // ── Path aliases ──────────────────────────────────────────────────────────
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  // ── Build optimization ────────────────────────────────────────────────────
  build: {
    // Target modern browsers for smaller output
    target: 'es2020',

    // Raise chunk warning to 600 kB (our lazy-split bundles are reasonable)
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Granular manual chunks for better caching
        manualChunks: {
          // React ecosystem
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // Animation library
          'vendor-motion': ['framer-motion'],
          // Icon library
          'vendor-icons': ['lucide-react'],
          // Map library
          'vendor-leaflet': ['leaflet', 'react-leaflet', 'react-leaflet-cluster'],
        },
      },
    },
  },

  // ── Dev server ────────────────────────────────────────────────────────────
  server: {
    port: 5173,
    open: false,
  },
})
