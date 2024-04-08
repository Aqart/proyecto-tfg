/** @type {import('tailwindcss').Config} */
import textShadow from 'tailwindcss-textshadow'
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bgFrom: '#fff7f0',
        bgTo: '#f1f6fc',
        primaryTitle: '#B1A090',
        primary: '#D9D9D9',
        secondary: '#6A524B',
        stone: '#DACEBE'
      },
      textShadow: {
        default: '0 2px 5px rgba(0, 0, 0, 0.1)'
        // puedes añadir más variantes si lo necesitas
      }
    }
  },
  variants: {
    extend: {
      textShadow: ['responsive']
    }
  },
  plugins: [textShadow]
}
