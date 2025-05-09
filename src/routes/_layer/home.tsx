import { createFileRoute } from '@tanstack/react-router'
import { Box, Center, Separator, VStack } from '@chakra-ui/react'
import IntroPage from '@/components/Intro'
import ExperiencePage from '@/components/Experience';

// Option 1: Gradient Separator
const GradientSeparator = ({ id }: { id: string }) => (
  <Box width="80%" my={4}>
    <Separator
      borderWidth="2px"
      borderRadius="full"
      height="4px"
      borderColor={"accent"}
    />
    <Box id={id} />
  </Box>
);
export const Route = createFileRoute('/_layer/home')({
  component: () => {
    return (
      <Center id={"intro-section"}>
        <VStack width="100%" mt={2} gap={"10"} >
          <Box as={IntroPage} />
          <GradientSeparator id={"experience-section"} />
          <Box as={ExperiencePage} />
        </VStack>
      </Center>
    )
  }
})
