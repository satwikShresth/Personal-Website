import { createFileRoute } from '@tanstack/react-router'
import { AbsoluteCenter, Box } from '@chakra-ui/react'
import IntroPage from '@/components/Intro'

export const Route = createFileRoute('/_layer/home')({
  component: () => {
    return (
      <AbsoluteCenter mt={5} minW={"full"}>
        <Box as={IntroPage} />
      </AbsoluteCenter>
    )
  }
})
