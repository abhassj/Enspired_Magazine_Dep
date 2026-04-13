import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Pre-compress JS/CSS bundles into .gz and .br variants so hosts
    // (Vercel / Netlify / CloudFront) can serve them without runtime cost.
    compression({
      algorithm: 'gzip',
      exclude: [/\.(png|jpe?g|webp|avif|svg|gif|ico|woff2?)$/i],
      threshold: 1024,
    }),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(png|jpe?g|webp|avif|svg|gif|ico|woff2?)$/i],
      threshold: 1024,
    }),
  ],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1400,
    sourcemap: false,
    // Inline assets smaller than 4KB as base64 to eliminate extra HTTP requests
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          spline: ['@splinetool/react-spline', '@splinetool/runtime'],
          icons: ['lucide-react'],
        },
      },
    },
  },
})
