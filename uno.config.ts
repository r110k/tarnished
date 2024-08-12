import {
  defineConfig, presetAttributify, presetIcons,
  presetTypography, presetUno, transformerAttributifyJsx,
} from 'unocss'

export default defineConfig({
  theme: {},
  shortcuts: {
    'g-btn': 'h-48px w-100% b-none text-white bg-#041616 rounded-8px cursor-pointer',
  },
  safelist: [],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'middle' },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerAttributifyJsx(),
  ],
})
