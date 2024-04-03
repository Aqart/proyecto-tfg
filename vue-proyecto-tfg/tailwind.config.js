/** @type {import('tailwindcss').Config} */
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
      }
    }
  },
  plugins: []
}
