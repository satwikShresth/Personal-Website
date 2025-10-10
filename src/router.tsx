import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { Provider as ChakraProvider } from '@/components/ui/provider'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { QueryClient } from '@tanstack/react-query';


export function getRouter() {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultViewTransition: true,
    Wrap: ({ children }) => {
      return (
        <ChakraProvider>
          {children}
        </ChakraProvider>
      );
    }
  })

  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
