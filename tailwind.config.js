/** @type {import('tailwindcss').Config} */
require('dotenv').config()

export default {
    content: [
        "./src/**/*.{html,js,svelte,ts,css}",
        "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
    ],
    plugins: [
        require('flowbite/plugin')
    ],
    darkMode: 'media',
}

