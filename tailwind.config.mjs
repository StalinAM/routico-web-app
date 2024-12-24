/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        azur: {
          50: '#ffffff',
          200: '#dcd9ff',
          400: '#b8b3ff',
          600: '#6941C6',
          800: '#3e388b'
        }
      }
    }
  },
  plugins: []
}
