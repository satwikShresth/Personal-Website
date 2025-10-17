import { createClient, defaultPlugins } from '@hey-api/openapi-ts';
import { join } from 'node:path';

createClient({
   input: { path: join(__dirname, 'openapi.json') },
   output: {
      path: join(__dirname, 'client')
   },
   plugins: [
      ...defaultPlugins,
      {
         name: '@hey-api/client-axios',
         runtimeConfigPath: join(__dirname, '..', 'index.ts'),
         exportFromIndex: true
      },
      {
         name: 'zod',
         compatibilityVersion: 'mini'
      },
      {
         name: '@hey-api/sdk',
         operationId: true,
         validator: {
            request: true
         },
         exportFromIndex: true
      }
   ]
});
