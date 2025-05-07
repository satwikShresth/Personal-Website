import { Badge, Box, Button, Flex, Grid, GridItem, HStack, Heading, Icon, IconButton, Text, VStack } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { useColorModeValue } from "../ui/color-mode";
import type { Projects } from "./data.tsx";

interface ProjectItemProps {
  project: Projects;
}

const ProjectItem = ({ project }: ProjectItemProps) => {
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
            {project.image && project.image}
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

              <HStack>
                {project.liveUrl && (
                  <Button
                    variant={"outline"}
                    borderRadius={"lg"}
                    isExternal
                    size="md"
                    colorScheme="teal"
                    as={Link}
                    href={project.liveUrl}
                  >
                    Live
                    <Icon as={FiExternalLink} w={4} h={4} mb={.4} />
                  </Button>
                )}

                {project.githubUrl && (
                  <IconButton
                    borderRadius={"lg"}
                    isExternal
                    size="md"
                    variant="outline"
                    colorScheme="teal"
                    as={Link}
                    href={project.githubUrl}
                  >
                    <FaGithub />
                  </IconButton>
                )}
              </HStack>
            </Flex>

            {/* Tech Stack */}
            <Flex flexWrap="wrap" gap={3}>
              {project
                .techStack
                .map((tech, idx) => (
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
              {project
                .description
                .map((item, idx) => (
                  <HStack key={idx} align="start" >
                    <Box
                      as="span"
                      fontSize="md"
                      color="teal.500"
                      pt={1}
                    >
                      ●
                    </Box>
                    <Text fontSize="md" fontVariant={"inherit"} fontWeight="medium" lineHeight="tall">
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

export default ProjectItem;
