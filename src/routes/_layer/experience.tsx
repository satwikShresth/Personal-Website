import { createFileRoute } from '@tanstack/react-router'
import { Box, Center, VStack } from '@chakra-ui/react'
import ExperiencePage from '@/components/Experience'

export const Route = createFileRoute('/_layer/experience')({
  component: () => {
    return (
      <Center>
        <VStack width="100%" mt={2} gap={'10'}>
          <Box as={ExperiencePage} />
        </VStack>
      </Center>
    )
  },
})
