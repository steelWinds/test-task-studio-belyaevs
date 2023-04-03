import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader({ defaultImport: 'component' }),
    VitePWA({
      includeAssets: [
        '/favicon-16x16',
        '/favicon-32x32',
        '/apple-touch-icon.png',
        '/masked-icon.svg',
      ],
      devOptions: {
        enabled: true
      },
      workbox: {
        sourcemap: true,
        globPatterns: ['**/*.{js,ts,css,html,png,svg}']
      },
      manifest: {
        name: 'Vue Stopwatch App',
        short_name: 'V-Stopwatch',
        description: 'Watch your time!',
        theme_color: '#34495E',
        display_override: ["fullscreen", "minimal-ui"],
        display: 'standalone',
        background_color: '#353638',
        lang: 'en',
        categories: ['lifestyle', 'fitness'],
        screenshots: [
          {
            src: '/screenshots/1.png',
            sizes: '2750x1280'
          },
          {
            src: '/screenshots/2.png',
            sizes: '2750x1280'
          },
          {
            src: '/screenshots/3.png',
            sizes: '2750x1280'
          },
          {
            src: '/screenshots/4.png',
            sizes: '1414x1280'
          }
        ],
        icons: [
          {
            src: '/192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: '/512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/1024.png',
            sizes: '1024x1024',
            type: 'image/png'
          },
          {
            src: '/maskable.png',
            sizes: '512x512',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
})
