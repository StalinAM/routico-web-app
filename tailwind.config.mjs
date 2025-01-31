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
    },
    keyframes: {
      'scale-up-center': {
        '0%': { transform: 'scale(0.5)' },
        '100%': { transform: 'scale(1)' }
      },
      'scale-down-center': {
        '0%': { transform: 'scale(1)' },
        '100%': { transform: 'scale(0.5)' }
      }
    },
    animation: {
      'scale-up-center': 'scale-up-center 0.3s ease-out',
      'scale-down-center': 'scale-down-center 0.3s ease-out'
    }
  },
  plugins: []
}
