import { createFileRoute } from '@tanstack/react-router'
import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import {
  FaBookOpen,
  FaExternalLinkAlt,
  FaGithub,
  FaRobot,
  FaServer,
  FaTerminal,
} from 'react-icons/fa';
import SHELVED from "/shelved.png"
import { FiArchive } from 'react-icons/fi';
import { useColorModeValue } from '@/components/ui/color-mode';

// Projects data with icons
const projects = [
  {
    name: "Shelved",
    image: <Image src={SHELVED} />,
    liveUrl: "https://shelved.satwik.dev",
    githubUrl: "https://github.com/satwikShresth/shelved",
    techStack: ["Docker", "Deno", "Express.js", "JavaScript", "Knex.js", "Node.js", "Postgres"],
    description: [
      "Full-stack app for tracking and reviewing media content with social features",
      "Robust authentication, rate-limiting and LRU Cache implementation",
      "Integration of multiple API data sources"
    ]
  },
  {
    name: "Library",
    icon: FaBookOpen,
    liveUrl: "https://cs478.satwik.dev",
    githubUrl: "https://github.com/satwikShresth/Library",
    techStack: ["Docker", "Drizzle ORM", "TanStack Query", "Express.js", "JsonWebToken", "React.js", "SQLite", "Zod"],
    description: [
      "Fully typed book management system with complete CRUD operations",
      "Security-focused with protection against XSS and CSRF attacks",
      "Containerized deployment via Docker Compose"
    ]
  },
  {
    name: "Concurrent FTP UDP Server",
    icon: FaServer,
    githubUrl: "https://github.com/satwikShresth/FileTransferProtocol",
    techStack: ["C++", "UDP", "POSIX Threads", "Make"],
    description: [
      "Thread pool architecture for handling multiple client connections",
      "Custom channel-based communication for efficient data distribution",
      "Thread-safe concurrent file operations"
    ]
  },
  {
    name: "Path Finding Visualizer",
    icon: FaRobot,
    githubUrl: "https://github.com/satwikShresth/PathFinding_Cpp",
    techStack: ["SFML", "CMake", "C++"],
    description: [
      "Interactive visualization of A* and Dijkstra's algorithms",
      "Dynamic maze generation with Kruskal's algorithm"
    ]
  },
  {
    name: "NeoVim Configuration",
    icon: FaTerminal,
    githubUrl: "https://github.com/satwikShresth/.config/tree/main/nvim",
    techStack: ["Ghostty", "Lua", "Neovim", "Bash", "tmux", "jq", "fzf", "ripgrep"],
    description: [
      "VSCode-level functionality with <50ms load time",
      "Integrated terminal workflow with tmux and telescope",
      "Complete LSP setup with auto-completion and diagnostics"
    ]
  }
];

const ProjectItem = ({ project, index }) => {
  const bgGradient = useColorModeValue(
    'linear(to-br, teal.50, gray.50)',
    'linear(to-br, teal.900, gray.900)'
  );
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      p={{ base: 6, md: 8 }}
      borderRadius="2xl"
      border="1px"
      borderColor={borderColor}
      boxShadow="xl"
      _hover={{
        transform: 'translateY(-8px)',
        boxShadow: '2xl',
        borderColor: 'teal.200',
      }}
      transition="all 0.4s"
      position="relative"
      overflow="hidden"
      my={8}
    >
      {/* Background gradient decoration */}
      <Box
        position="absolute"
        top="0"
        right="0"
        width="40%"
        height="40%"
        bgGradient={bgGradient}
        opacity="0.3"
        borderBottomLeftRadius="full"
        zIndex="0"
      />

      <Grid templateColumns={{ base: "1fr", md: "auto 1fr" }} gap={8}>
        {/* Icon Section */}
        <GridItem>
          <Flex
            width={{ base: "80px", md: "100px" }}
            height={{ base: "80px", md: "100px" }}
            justify="center"
            align="center"
          >
            {project.icon && <Icon as={project.icon} boxSize={{ base: 8, md: 10 }} />}
            {project?.image}
          </Flex>
        </GridItem>

        {/* Content Section */}
        <GridItem>
          <VStack align="start" zIndex="1" position="relative">
            {/* Header */}
            <Flex
              w="full"
              direction={{ base: "column", sm: "row" }}
              justify="space-between"
              align={{ base: "start", sm: "center" }}
              gap={4}
            >
              <Heading
                size="xl"
                color="teal.500"
                fontWeight="700"
              >
                {project.name}
              </Heading>

              <HStack >
                {project.liveUrl && (
                  <Button
                    variant={"outline"}
                    borderRadius={"lg"}
                    as={Link}
                    href={project.liveUrl}
                    isExternal
                    size="md"
                    leftIcon={<FaExternalLinkAlt />}
                    colorScheme="teal"
                  >
                    Live
                  </Button>
                )}

                {project.githubUrl && (
                  <IconButton
                    as={Link}
                    href={project.githubUrl}
                    isExternal
                    size="md"
                    variant="outline"
                    colorScheme="teal"
                  >
                    <FaGithub />
                  </IconButton>
                )}
              </HStack>
            </Flex>

            {/* Tech Stack */}
            <Flex flexWrap="wrap" gap={3}>
              {project.techStack.map((tech, idx) => (
                <Badge
                  key={idx}
                  colorScheme="teal"
                  variant="subtle"
                  px={3}
                  py={1.5}
                  borderRadius="md"
                  fontSize="sm"
                >
                  {tech}
                </Badge>
              ))}
            </Flex>

            {/* Description */}
            <VStack align="start" pt={3}>
              {project.description.map((item, idx) => (
                <HStack key={idx} align="start" >
                  <Box
                    as="span"
                    fontSize="md"
                    color="teal.500"
                    pt={1}
                  >
                    ●
                  </Box>
                  <Text fontSize="md" fontWeight="medium" lineHeight="tall">
                    {item}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export const Route = createFileRoute('/_layer/projects')({
  component: ProjectsPage
});

function ProjectsPage() {
  const headingColor = useColorModeValue('gray.800', 'white');
  const accentColor = useColorModeValue('teal.500', 'teal.300');

  return (
    <Box py={10}>
      <Container maxW="container.xl">
        <VStack align="stretch">
          <Box textAlign="left">
            <Heading
              as="h1"
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="extrabold"
              color={headingColor}
              mb={6}
            >
              My <Box as="span" color={accentColor}>Projects</Box>
            </Heading>

            <Text
              fontSize={{ base: "xl", md: "2xl" }}
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
              <ProjectItem key={idx} project={project} index={idx} />
            ))}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}

export default ProjectsPage;
