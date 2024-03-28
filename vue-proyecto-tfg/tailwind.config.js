/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        backGround: '#EEF2F7',
        primaryTitle: '#B1A090',
        primary: '#D9D9D9',
        secondary: '#6A524B'
      }
    }
  },
  plugins: []
}
