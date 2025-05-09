import { Box } from '@chakra-ui/react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <Box position="relative">
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            // bgSize='cover'
            bgAttachment='fixed'
            bgPos='50% 100%'
            // bgRepeat='no-repeat'
            bgImage="url('/bg.png')"
            bgSize="200px 300px"
            opacity={0.1}
            zIndex={-1}
          />
          <Box position="relative" zIndex={1}>
            <Outlet />
            <TanStackRouterDevtools />
          </Box>
        </Box>
      </>
    )
  }
})
