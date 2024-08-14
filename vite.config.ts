import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import { svgsprites } from './vite_plugins/svgsprites'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  define: {
    isDev: command === 'serve',
  },
  plugins: [
    UnoCSS(),
    react(),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: command === 'serve',
    }),
    svgsprites({ noOptimizeList: ['chart', 'category', 'export', 'noty', 'catLogo'] }),
  ],
}))
