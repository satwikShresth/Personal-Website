// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

import mdx from '@astrojs/mdx';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jacobniv.xyz',
  server: {
    port: 5173
  },
  integrations: [
    svelte({}),
    mdx(),
    sitemap()
  ],
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  }
});
