import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Box, Center, Container, Flex } from '@chakra-ui/react'
import NavBar from '@/components/nav'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/_layer')({
  component: () => (
    <>
      <Center height="100%" width="100%" >
        <Flex direction="column" w="90%"  >
          <NavBar id={"intro-section"} />
          <Flex minHeight={0} minH="95vh" flex={"1"} scrollbar={"hidden"} direction="column" overflowY="auto">
            <Container mt={"6"} maxWidth={"1600px"}>
              <Outlet />
            </Container>
          </Flex>
          <Box as={Footer} mt={"auto"} />
        </Flex>
      </Center>
    </>
  )
})

