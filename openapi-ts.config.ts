import { defaultPlugins, defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: './brawlstars.openapi.yml',
  output: 'src/client',
  plugins: [
    ...defaultPlugins,
    {
      name: '@hey-api/client-axios',
      runtimeConfigPath: './src/client.ts',
    },
    '@tanstack/react-query',
    {
      name: '@hey-api/schemas',
      type: 'json',
    },
    {
      name: '@hey-api/sdk',
      asClass: true,
      operationId: true,
    },
  ],
})
