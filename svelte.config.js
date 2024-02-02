import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
require('dotenv').config();
import adapter from '@sveltejs/adapter-node';

const port = parseInt(process.env.VITE_PORT, 10)

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		listen: port
	},

	preprocess: [vitePreprocess({})]
};

export default config;
