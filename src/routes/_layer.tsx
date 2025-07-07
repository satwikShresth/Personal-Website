import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Container, Flex } from '@chakra-ui/react'
import NavBar from '@/components/nav'

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
          mt={"6"}
          maxWidth={"1600px"}
          flex="1"
        >
          <Outlet />
        </Container>
      </Flex>
    </Flex>
  )
})
