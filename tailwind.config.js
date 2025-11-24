/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0a0a0a',
          dark: '#121212',
          gray: '#1e1e1e',
          blue: '#2563eb',
          blueLight: '#60a5fa',
          white: '#ffffff',
          textGray: '#9ca3af'
        }
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', 'sans-serif'],
        display: ['"Rajdhani"', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}