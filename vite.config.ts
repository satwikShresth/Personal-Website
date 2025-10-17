import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import mdx from '@mdx-js/rollup';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { devtools } from '@tanstack/devtools-vite';

const ReactCompilerConfig = {};

// https://vitejs.dev/config/
export default defineConfig({
   server: {
      port: 3000
   },
   build: {
      modulePreload: { polyfill: true },
      rollupOptions: {
         external: ['bun:sqlite', 'bun:test', 'bun:ffi', 'bun']
      }
   },
   ssr: {
      noExternal: [
         '@chakra-ui/react',
         '@emotion/react',
         '@emotion/styled',
         'framer-motion'
      ]
   },
   optimizeDeps: {
      include: [
         '@emotion/react',
         '@emotion/styled',
         '@chakra-ui/react',
         'framer-motion'
      ]
   },
   plugins: [
      devtools(),
      {
         enforce: 'pre',
         ...mdx({
            include: './src/posts/*',
            providerImportSource: '@mdx-js/react',
            jsx: false, // Compile JSX away so the file is immediately runnable
            remarkPlugins: [],
            rehypePlugins: []
         })
      },
      tsconfigPaths({
         projects: ['./tsconfig.json']
      }),
      tanstackStart(),
      nitroV2Plugin({
         preset: 'bun',
         compatibilityDate: '2025-10-10'
      }),
      viteReact({
         babel: {
            plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]]
         }
      }),
      tailwindcss()
   ],
   resolve: {
      alias: {
         '@': resolve(__dirname, './src'),
         '@pkg': resolve(__dirname, './packages')
      }
   }
});
