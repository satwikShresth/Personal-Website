import { createFileRoute } from '@tanstack/react-router'
import { Box, Center, VStack } from '@chakra-ui/react'
import ProjectsPage from '@/components/Project'

export const Route = createFileRoute('/_layer/projects')({
  component: () => {
    return (
      <Center>
        <VStack width="100%" mt={2} gap={"10"} >
          <Box id={"project-page-container"} as={ProjectsPage} />
        </VStack>
      </Center>
    )
  }
})

