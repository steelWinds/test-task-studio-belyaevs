/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}"
  ],
  theme: {
    extend: {
      colors: {
        gray: '#9E9E9E',
        'dark-gray': '#696969',
        black: '#353638'
      }
    },
  },
  plugins: [],
}
