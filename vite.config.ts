import type { ConfigEnv } from 'vite'
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { svgsprites } from './vite_plugins/svgsprites'

// https://vitejs.dev/config/
export default defineConfig(({ command }: ConfigEnv) => ({
  define: {
    isDev: command === 'serve',
  },
  plugins: [
    basicSsl(),
    UnoCSS() as any,
    react(),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: command === 'serve',
    }),
    svgsprites({ noOptimizeList: ['chart', 'category', 'export', 'noty', 'catLogo'] }),
  ],
}))
