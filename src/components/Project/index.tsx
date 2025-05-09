import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { projects } from './data';
import ProjectItem from './items';
import { useColorModeValue } from '@/components/ui/color-mode';



function ProjectsPage() {
  const headingColor = useColorModeValue('gray.800', 'white');

  return (
    <Container>
      <VStack align="stretch">
        <Box textAlign="left">
          <Heading
            as="h1"
            fontSize={"5xl"}
            fontWeight="extrabold"
            color={headingColor}
            mb={2}
          >
            Personal <Box as="span" color={"accent"}>Projects</Box>
          </Heading>

          <Text
            fontSize={"2xl"}
            maxW="container.lg"
            mx="auto"
            opacity={0.9}
            letterSpacing="wide"
          >
            Full-stack applications, high-performance systems, and developer tools
          </Text>
        </Box>

        <VStack align="stretch">
          {projects.map((project, idx) => (
            <ProjectItem key={idx} project={project} />
          ))}
        </VStack>
      </VStack>
    </Container>
  );
}

export default ProjectsPage;
