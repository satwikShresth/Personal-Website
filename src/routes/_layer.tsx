import { Outlet, createFileRoute } from '@tanstack/react-router'
import { Flex } from '@chakra-ui/react'
import NavBar from '@/components/nav'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/_layer')({
  component: () => (
    <>
      <Flex direction="column" h="100vh">
        <NavBar />
        <Flex flex="1" direction="column" p={4} overflowY="auto">
          <Outlet />
        </Flex>
        <Footer />
      </Flex>
    </>
  )
})

