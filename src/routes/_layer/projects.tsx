import { createFileRoute } from '@tanstack/react-router'
import { Box, Center, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { useColorModeValue } from '@/components/ui/color-mode'
import { ProjectItem, projects } from '@/components/Project'
import { orpc } from '@/orpc/client'

export const Route = createFileRoute('/_layer/projects')({
  loader: ({ context: { queryClient } }) => queryClient.prefetchQuery(orpc.s3.getInspirationVideoLink.queryOptions()),
  component: ProjectsPage
})

function ProjectsPage() {
  const headingColor = useColorModeValue('gray.800', 'white')
  return (
    <Center>
      <VStack width="100%" mt={2} gap={'10'}>
        <Box id={'project-page-container'}>
          <Container>
            <VStack align="stretch">
              <Box textAlign="left">
                <Heading
                  as="h1"
                  fontSize={'5xl'}
                  fontWeight="extrabold"
                  color={headingColor}
                  mb={2}
                >
                  Personal{' '}
                  <Box as="span" color={'accent'}>
                    Projects
                  </Box>
                </Heading>

                <Text
                  fontSize={'2xl'}
                  maxW="container.lg"
                  mx="auto"
                  opacity={0.9}
                  letterSpacing="wide"
                >
                  Full-stack applications, high-performance systems and developer
                  tools
                </Text>
              </Box>

              <VStack align="stretch">
                {projects.map((project, idx) => (
                  <ProjectItem key={idx} project={project} />
                ))}
              </VStack>
            </VStack>
          </Container>
        </Box>
      </VStack>
    </Center>
  )
}
