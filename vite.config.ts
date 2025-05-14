import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import mdx from '@mdx-js/rollup'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

const ReactCompilerConfig = {}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        include: './src/components/mdx/*',
        providerImportSource: '@mdx-js/react',
        jsx: false, // Compile JSX away so the file is immediately runnable
        remarkPlugins: [],
        rehypePlugins: [],
      }),
    },
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
    tailwindcss(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
