import type { ReactNode } from 'react';
import { Box, Center } from '@chakra-ui/react';
import {
   Outlet,
   HeadContent,
   Scripts,
   createRootRouteWithContext
} from '@tanstack/react-router';
import { TanStackDevtools } from '@tanstack/react-devtools';
import TanStackRouterDevtools from '@/integrations/tanstack-router';
import TanStackQueryDevtools from '@/integrations/tanstack-query';
import appCss from '../styles.css?url';
import type { QueryClient } from '@tanstack/react-query';

interface MyRouterContext {
   queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
   head: () => ({
      meta: [
         { title: 'Satwik' },
         { charSet: 'utf-8' },
         { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
         { name: 'theme-color', content: '#000000' },
         { name: 'Satwik', content: 'personal portfolio website with blogs' }
      ],
      links: [
         { rel: 'stylesheet', href: appCss },
         { rel: 'icon', href: '/favicon.png' },
         { rel: 'manifest', href: '/manifest.json' }
      ],
      scripts: [
         { defer: true, src: 'https://assets.onedollarstats.com/stonks.js' },
         {
            defer: true,
            src: 'https://assets.onedollarstats.com/stonks.js',
            'data-debug': 'satwik.dev'
         }
      ]
   }),
   shellComponent: RootShellComponent,
   component: RootComponent
});

function RootComponent() {
   return (
      <Center>
         <Box width="100%" maxWidth={'1800px'} position="relative">
            <Outlet />
            <TanStackDevtools
               config={{
                  position: 'bottom-left'
               }}
               plugins={[TanStackRouterDevtools, TanStackQueryDevtools]}
            />
         </Box>
      </Center>
   );
}

function RootShellComponent({ children }: Readonly<{ children: ReactNode }>) {
   return (
      <html>
         <head>
            <HeadContent />
         </head>
         <body>
            {children}
            <Scripts />
         </body>
      </html>
   );
}
