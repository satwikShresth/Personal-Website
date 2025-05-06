import { Badge, Box, Container, Flex, Heading, Image, Text, Timeline, VStack } from '@chakra-ui/react';
import { createFileRoute } from '@tanstack/react-router';
import { FaCheckCircle } from 'react-icons/fa';
import { useColorModeValue } from '@/components/ui/color-mode';
import SIG from '/sig.jpg';
import OPEX from '/opex.png';
import DREXEL from '/drexel.png';

export const Route = createFileRoute('/_layer/experience')({
  component: ExperienceComponent,
});

function ExperienceComponent() {

  const experiences = [
    {
      company: 'Susquehanna International Group',
      location: 'Bala Cynwyd, PA',
      position: 'Software Engineer Co-op',
      team: 'Team Order Routing and Quoting (TORQ)',
      period: 'September 2023 - March 2024',
      responsibilities: [
        'Built a C++ protocol metrics publisher that tails multiple files to process 5.8 billion messages per day',
        'Developed a concurrent Kafka consumer client using Python to process 500 million messages in under 5 minutes',
        'Developed a FastAPI proxy to integrate Grafana with an internal messaging platform via RESTful API',
        'Designed CI/CD pipeline for Kubernetes deployment and automated testing for projects on GitLab'
      ],
      image: <Image src={SIG} />,
      technologies: ['C++', 'Python', 'Kafka', 'FastAPI', 'Kubernetes', 'GitLab CI/CD', 'Grafana']
    },
    {
      company: 'OPEX Corporation',
      location: 'Moorestown, NJ',
      position: 'Software Engineer Co-op',
      team: 'Warehouse Automation and Robotics',
      period: 'September 2022 - March 2023',
      responsibilities: [
        'Engineered async Windows inter-process communication solution among C++ applications, reducing latency by 80%',
        'Developed Python tool with Doxygen integrating 15,000 pages of documentation into a C++ robot host application'
      ],
      image: <Image src={OPEX} height={70} />,
      technologies: ['C++', 'Python', 'Windows IPC', 'Doxygen']
    },
    {
      company: 'Drexel University',
      location: 'Philadelphia, PA',
      position: 'Teaching Assistant',
      team: 'College of Computing & Informatics',
      period: 'September 2022 - March 2025',
      responsibilities: [
        'Mentoring over 150 students during weekly labs and tutoring hours by helping them grasp complex concepts',
        'Developed a Python tool to automate compiling & organizing assignments, reducing the time spent grading by 80%'
      ],
      image: <Image src={DREXEL} />,
      technologies: ['Python', 'Mentoring', 'Computer Science']
    }
  ];
  const headingColor = useColorModeValue('gray.800', 'white');
  const accentColor = useColorModeValue('teal.500', 'teal.300');


  return (
    <Container maxW="container.xl" py={12}>
      <Box textAlign="left">
        <Heading
          as="h1"
          fontSize={{ base: "4xl", md: "6xl" }}
          fontWeight="extrabold"
          color={headingColor}
          mb={6}
        >
          Professional <Box as="span" color={accentColor}>Experience</Box>
        </Heading>

        <Text
          fontSize={{ base: "xl", md: "2xl" }}
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
              <Timeline.Indicator boxSize={"16"} overflow={"clip"} borderRadius={"lg"} borderColor={accentColor} borderWidth={"medium"}>
                {exp.image}
              </Timeline.Indicator>
            </Timeline.Connector>

            <Timeline.Content gap={6} mt={-1}>
              <Timeline.Title>
                <VStack align="start" >
                  <Heading as="h2" size="lg" fontWeight="bold">{exp.position}</Heading>
                  <Flex gap={2} alignItems="center">
                    <Text fontWeight="bold" fontSize="xl">{exp.company}</Text>
                    <Text color="gray.300" fontSize="md" mt={1.4}>• {exp.location}</Text>
                  </Flex>
                  <Text fontSize="md" fontWeight="medium">{exp.team}</Text>
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
    </Container>
  );
}

export default ExperienceComponent;
