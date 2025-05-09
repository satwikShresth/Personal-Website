import { createFileRoute } from '@tanstack/react-router'
import { Box, Center, Separator, VStack } from '@chakra-ui/react'
import HeatMap from '@uiw/react-heat-map';
import ProjectsPage from '@/components/Project'

// Option 1: Gradient Separator
const GradientSeparator = ({ id }: { id: string }) => (
  <Box width="80%" my={4}>
    <Separator
      borderWidth="2px"
      borderRadius="full"
      height="4px"
      borderColor={"colorPalette.300"}
    />
    <Box id={id} />
  </Box>
);
export const Route = createFileRoute('/_layer/projects')({
  component: () => {
    return (
      <Center id={"intro-section"}>
        <VStack width="100%" mt={2} gap={"10"} >
          <Box as={ProjectsPage} />
        </VStack>
      </Center>
    )
  }
})

