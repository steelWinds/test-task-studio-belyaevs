/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}"
  ],
  theme: {
    extend: {
      colors: {
        gray: 'lab(65 0 0)',
        'dark-gray': 'lab(44 0 0)',
        black: 'lab(23 0 -1)',
        green: 'lab(67 -44 17)'
      }
    },
  },
  plugins: [],
}
