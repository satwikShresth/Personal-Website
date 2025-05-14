import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Box, Flex } from '@chakra-ui/react'
import NavBar from '@/components/nav'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/_layer')({
  component: () => (
    <Flex
      direction="column"
      minH="100vh"
      width="100%"
    >
      <NavBar id={"intro-section"} />
      <Flex
        flex="1"
        width="100%"
        overflowX="hidden"
      >
        <Box
          width="100%"
          maxWidth="1600px"
          mx="auto"
          px={{ base: 4, md: 6, lg: 8 }}
          pt={6}
        >
          <Outlet />
        </Box>
      </Flex>
      <Box as={Footer} />
    </Flex>
  )
})
