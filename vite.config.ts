import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['spashscreen.png', 'navibar.png'],
      manifest: {
        name: 'WongShare',
        short_name: 'WongShare',
        description: 'Vue.js PWA with DaisyUI',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'spashscreen.png',
            sizes: 'any',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
