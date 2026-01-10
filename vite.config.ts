import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import wasm from "vite-plugin-wasm";

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson(), wasm()],
	build: {
		target: 'esnext'
	}
});
