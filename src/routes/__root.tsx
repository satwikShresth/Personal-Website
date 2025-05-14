import { Box, Center } from '@chakra-ui/react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Center>
          <Box width="80%" position="relative">
            <Outlet />
            <TanStackRouterDevtools />
          </Box>
        </Center>
      </>
    )
  }
})
