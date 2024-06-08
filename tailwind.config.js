let defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // fontFamily: {
    //   Roboto: ['Inter var',...defaultTheme.fontFamily.Roboto],
    // },
    extend: {
        colors: {
            'primary': '#6de768',
            'secondary': '#db9304',
            'danger': '#e3342f',
            'success': '#3490dc',
        },
        screens: {
            "1000px": "1050px",
            "1100px": "1110px",
            "800px": "800px",
            "1300px": "1300px",
            "400px": "400px",
        },
    },
  },
  plugins: [
      '@tailwindcss/forms',
      '@tailwindcss/typography',
      '@tailwindcss/aspect-ratio',
      '@tailwindcss/line-clamp',
  ],
}