/** @type {import('tailwindcss').Config} */
require('dotenv').config()

// let themeList = process.env.VITE_THEME_LIST.replace("[", "").replace("]", "").split(',');
let themeList = process.env.VITE_THEME_LIST.split(',');

export default {
  content: ['./src/**/*.{html,svelte,js,ts,css}'],
  plugins: [require('daisyui')],
  daisyui: {
      themes: themeList,
  }
}

