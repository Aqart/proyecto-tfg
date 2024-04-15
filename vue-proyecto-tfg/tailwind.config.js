/** @type {import('tailwindcss').Config} */
import textShadow from 'tailwindcss-textshadow'
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bgFrom: '#fff7f0',
        bgTo: '#f1f6fc',
        primary: '#D9D9D9',
        secondary: '#6A524B',
        third: '#756B61',
        fourth: '#F5E0CB',
        stone: '#DACEBE',
        stoneBackground: {
          // Seleccionar con guión
          1: '#BFAE99',
          2: '#F2EADF',
          3: '#59544F',
          4: '#D9D0C7',
          5: '#A6847C'
        },
        stoneBackgroundContrast: {
          1: '#509396',
          2: '#A5302F',
          3: '#4F595A',
          4: '#2F6A70',
          5: '#7C97A6'
        }
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
