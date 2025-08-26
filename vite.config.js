import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@components': resolve(__dirname, 'src/components'),
      '@services': resolve(__dirname, 'src/services')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [resolve(__dirname, 'src/styles')]
      }
    }
  }
})
