/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#5C2D91',
          magenta: '#D63384',
          lavender: '#E8D7FF',
          pink: '#FF4DA6',
          dark: '#0a0510',
          light: '#FFFFFF',
          lightBg: '#fdf8ff',
          lightText: '#1a0a2e',
          lightMuted: '#6b5880',
          lightCard: '#f5eeff'
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Montserrat', 'sans-serif'],
        condensed: ['Oswald', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #5C2D91, #D63384, #FF4DA6)',
        'dark-bg': 'radial-gradient(circle at top right, #3a155c, #0a0510 60%)'
      }
    },
  },
  plugins: [],
}
