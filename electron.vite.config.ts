import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@/lib': resolve(__dirname, 'src/main/lib'),
        '@shared': resolve(__dirname, 'src/shared'),
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    assetsInclude: ["src/renderer/assets/**/*"],
    resolve: {
      alias: {
        '@renderer': resolve(__dirname, 'src/renderer/src'),
        '@shared': resolve(__dirname, 'src/shared'),
        '@/hooks': resolve(__dirname, 'src/renderer/src/hooks'),
        '@/assets': resolve(__dirname, 'src/renderer/src/assets'),
        '@/store': resolve(__dirname, 'src/renderer/src/store'),
        '@/components': resolve(__dirname, 'src/renderer/src/components'),
        '@/mocks': resolve(__dirname, 'src/renderer/src/mocks'),
      }
    },
    plugins: [react()]
  }
})
