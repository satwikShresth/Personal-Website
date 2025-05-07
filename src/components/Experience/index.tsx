import { FaCheckCircle } from 'react-icons/fa';
import { Badge, Box, Container, Flex, Heading, Text, Timeline, VStack } from '@chakra-ui/react';
import { experiences } from './data';
import { useColorModeValue } from '@/components/ui/color-mode';

function ExperiencePage() {
  const headingColor = useColorModeValue('gray.800', 'white');
  const accentColor = useColorModeValue('teal.500', 'teal.300');

  return (
    <Container id={"experience-section"}>
      <VStack align="stretch" mt={1}>

        <Box textAlign="left">
          <Heading
            as="h1"
            fontSize={"5xl"}
            fontWeight="extrabold"
            color={headingColor}
            mb={2}
          >
            Professional <Box as="span" color={accentColor}>Experience</Box>
          </Heading>

          <Text
            fontSize={"2xl"}
            maxW="container.lg"
            mx="auto"
            opacity={0.9}
            letterSpacing="wide"
          >
            My Journey as a professional in the industry
          </Text>
        </Box>

        <Timeline.Root mt={10} variant="solid" size="xl" colorPalette="teal">
          {experiences.map((exp, index) => (
            <Timeline.Item key={index}>
              <Timeline.Connector>
                <Timeline.Separator />
                <Timeline.Indicator boxSize={"20"} overflow={"clip"} borderRadius={"lg"} borderColor={accentColor} borderWidth={"medium"}>
                  {exp.image}
                </Timeline.Indicator>
              </Timeline.Connector>

              <Timeline.Content gap={4} mt={-1}>
                <Timeline.Title>
                  <VStack align="start">
                    <Heading as="h2" size="lg" fontWeight="bold">{exp.position}</Heading>
                    <Flex gap={2} alignItems="center" mt={"-1"}>
                      <Text fontWeight="bold" fontSize="xl">{exp.company}</Text>
                      <Text fontSize="md" mt={1.4}>• {exp.location}</Text>
                    </Flex>
                    <Text fontSize="md" fontWeight="medium" mt={-1}>{exp.team}</Text>
                    <Text fontSize="lg" fontWeight="semibold" color="teal.500" mt={1}>{exp.period}</Text>
                  </VStack>
                </Timeline.Title>

                <Timeline.Description>
                  <VStack align="start" mt={2}>
                    {exp.responsibilities.map((resp, idx) => (
                      <Flex key={idx} alignItems="flex-start" gap={3}>
                        <Box mt={1} color="teal.500">
                          <FaCheckCircle size={20} />
                        </Box>
                        <Text mt={1.5} fontSize="lg">{resp}</Text>
                      </Flex>
                    ))}
                  </VStack>
                </Timeline.Description>

                <Flex mt={4} flexWrap="wrap" gap={3}>
                  {exp.technologies.map((tech, idx) => (
                    <Badge
                      key={idx}
                      colorPalette="teal"
                      fontSize="md"
                      fontWeight="medium"
                      px={4}
                      py={2}
                      borderRadius="md"
                    >
                      {tech}
                    </Badge>
                  ))}
                </Flex>
                <Box mt={5}></Box>

              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline.Root>
      </VStack>
    </Container>
  );
}

export default ExperiencePage;
