import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Center, Container, Flex } from '@chakra-ui/react'
import NavBar from '@/components/nav'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/_layer')({
  component: () => (
    <>
      <Center height="100%" width="100%" >
        <Flex direction="column" w="90%" h="100vh" >
          <Flex flex="1" scrollbar={"hidden"} direction="column" overflowY="auto">
            <NavBar />
            <Container mt={"6"} maxWidth={"1600px"}>
              <Outlet />
            </Container>
          </Flex>
          <Footer />
        </Flex>
      </Center>
    </>
  )
})

