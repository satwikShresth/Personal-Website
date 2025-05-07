import { createFileRoute } from '@tanstack/react-router'
import { Box, Center, Separator, VStack } from '@chakra-ui/react'
import HomePage from '@/components/Home'
import ProjectsPage from '@/components/Project'
import ExperiencePage from '@/components/Experience';

// Option 1: Gradient Separator
const GradientSeparator = () => (
  <Box width="80%" my={4}>
    <Separator
      borderWidth="2px"
      borderRadius="full"
      height="4px"
      opacity="0.8"
    />
  </Box>
);
export const Route = createFileRoute('/_layer/home')({
  component: () => {
    return (
      <Center>
        <VStack width="100%" mt={2} gap={"14"}>
          <Box as={HomePage} />
          <GradientSeparator />
          <Box as={ExperiencePage} />
          <GradientSeparator />
          <Box as={ProjectsPage} />
        </VStack>
      </Center>
    )
  }
})
