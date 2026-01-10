import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
// import viteCppjsPlugin from '@cpp.js/plugin-vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson(), /*viteCppjsPlugin()*/]
});
