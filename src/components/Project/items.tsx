import { Badge, Box, Button, Flex, Grid, GridItem, HStack, Heading, Icon, IconButton, Text, VStack } from "@chakra-ui/react";
import { Link, linkOptions } from "@tanstack/react-router";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { useColorModeValue } from "../ui/color-mode";
import type { Projects } from "./data.tsx";

interface ProjectItemProps {
  project: Projects;
}

const ProjectItem = ({ project }: ProjectItemProps) => {

  return (
    <Box
      p={8}
      transition="all 0.4s"
      position="relative"
      overflow="hidden"
      borderRadius={"lg"} borderWidth={"thin"}
      my={8}
    >
      <Box
        position="absolute"
        top="0"
        right="0"
        width="40%"
        height="40%"
        opacity="0.3"
        borderBottomLeftRadius="full"
        zIndex="0"
      />

      <Grid templateColumns={{ base: "1fr", md: "auto 1fr" }} gap={8} >
        <GridItem>
          <Flex
            width={{ base: "80px", md: "100px" }}
            height={{ base: "80px", md: "100px" }}
            justify="center"
            align="center"
          >
            {project.icon && <Icon as={project.icon} boxSize={20} color={"accent"} />}
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
                fontWeight="700"
              >
                {project.name}
              </Heading>

              <HStack>
                {project.liveUrl && (
                  <Button
                    variant={"outline"}
                    borderRadius={"lg"}
                    size="md"
                    as={Link}
                    {...linkOptions({
                      to: project.liveUrl,
                      preload: "render"
                    })}
                  >
                    Live
                    <Icon as={FiExternalLink} w={4} h={4} mb={.4} />
                  </Button>
                )}

                {project.githubUrl && (
                  <IconButton
                    borderRadius={"lg"}
                    size="md"
                    variant="outline"
                    as={Link}
                    {...linkOptions({
                      to: project.githubUrl,
                      preload: "intent"
                    })}
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
                      color="accent"
                      pt={"2px"}
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
