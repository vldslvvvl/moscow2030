import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // Increase limits for large files
    fs: {
      strict: false
    },
    // Improve HMR
    hmr: {
      overlay: false
    },
    // Speed up startup
    watch: {
      usePolling: false
    }
  },
  build: {
    // Build optimization
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    },
    // Image optimization
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    // Pre-optimize dependencies
    include: ['react', 'react-dom'],
    // Speed up pre-bundling
    force: false
  },
  // Optimization for large images
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.webp'],
  // Increase limits for large file processing
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false
  },
  // Improve performance
  esbuild: {
    jsxInject: `import React from 'react'`
  }
})
