import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '@chakra-ui/react'
import NavBar from '@/components/nav'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/_layer')({
  component: () => (
    <>
      <Flex direction="column" h="100vh">
        <NavBar />
        <Flex flex="1" scrollbar={"hidden"} direction="column" p={4} overflowY="auto">
          <Box mt={10}>
            <Outlet />
          </Box>
        </Flex>
        <Footer />
      </Flex>
    </>
  )
})

