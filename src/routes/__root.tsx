import { Box } from '@chakra-ui/react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Box position="relative">
          <Outlet />
          <TanStackRouterDevtools />
        </Box>
      </>
    )
  }
})
