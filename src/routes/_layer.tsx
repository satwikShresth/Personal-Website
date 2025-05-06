import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Box, Center, Container, Flex } from '@chakra-ui/react'
import NavBar from '@/components/nav'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/_layer')({
  component: () => (
    <>
      <Center height="100%" width="100%" >
        <Flex direction="column" w="90%" h="100vh" >
          <NavBar />
          <Flex flex="1" scrollbar={"hidden"} direction="column" p={4} overflowY="auto">
            <Container mt={20}>
              <Container maxWidth={"1600px"}>
                <Outlet />
              </Container>
            </Container>
          </Flex>
          <Footer />
        </Flex>
      </Center>
    </>
  )
})

