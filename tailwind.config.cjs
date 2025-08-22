/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#134324',
        secondary: '#33a8a7',
        accent: '#238aa6',
      },
    },
  },
  plugins: [],
}