import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Box, Container, Flex } from '@chakra-ui/react'
import NavBar from '@/components/nav'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/_layer')({
  component: () => (
    <Flex
      direction="column"
      minH="100vh"
      w="90%"
      mx="auto"
    >
      <NavBar id={"intro-section"} />
      <Flex
        flex="1"
        scrollbar={"hidden"}
        overflowY="auto"
      >
        <Container
          position={"relative"}
          mt={"6"}
          maxWidth={"1600px"}
          flex="1"
        >
          <Outlet />
        </Container>
      </Flex>
      <Box as={Footer} />
    </Flex>
  )
})
