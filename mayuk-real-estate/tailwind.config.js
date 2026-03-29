/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mayuk: {
          red: '#DC2626',
          'red-light': '#EF4444',
          'red-dark': '#B91C1C',
          white: '#FFFFFF',
          'gray-light': '#F3F4F6',
          'gray-dark': '#1F2937',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

