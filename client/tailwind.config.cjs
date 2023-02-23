/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}"
  ],
  theme: {
    // screen: {
    //   sm: '480px',
    //   md: '768px',
    //   lg: '976px',
    //   xl: '1440px'
    // },
    extend: {
      colors: {
        'Ecru': "#D6BF89",
        'Myrtle': "#2E7C76",
        '11Gray': "#B9BABB",
        'Fogra': "#010202",
        'Jet': "#2D2D2E",
      },
    },
  },
  plugins: [],
}
