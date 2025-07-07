// Home Route
import { createFileRoute } from '@tanstack/react-router'
import { Box } from '@chakra-ui/react'
import IntroPage from '@/components/Intro'

export const Route = createFileRoute('/_layer/home')({
  component: () => {
    return (
      <Box display={'grid'} width="100%">
        <Box as={IntroPage} alignSelf={'center'} />
      </Box>
    )
  },
})
