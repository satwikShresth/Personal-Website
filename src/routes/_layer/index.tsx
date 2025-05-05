import { createFileRoute } from '@tanstack/react-router'
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';
import {
  FaArrowRight,
  FaCode,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa';

export const Route = createFileRoute('/_layer/')({
  component: () => (
    <Center minH="84vh" width="100%">
      <Box mb={20} width="100%">
        <Container maxW="container.xl">
          {/* Main Content */}
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "center", md: "flex-start" }}
            gap={{ base: 8, md: 12 }}
          >
            <Box
              w={{ base: "60%", sm: "50%", md: "30%", lg: "40%" }}
              borderRadius="full"
              overflow="hidden"
              aspectRatio={.8}
              boxShadow="xl"
              bg="card"
              mx={{ base: "auto", md: 0 }}
              alignSelf={{ base: "center", md: "flex-start" }}
            >
              <Box
                w="full"
                h="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={FaCode} w={20} h={20} color="accent" />
              </Box>
            </Box>
            <Box
              flex="1"
              mt={{ base: 6, md: 0 }}
              alignSelf={{ base: "center", md: "flex-end" }}
            >
              <Heading
                as="h1"
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                color="accent"
                lineHeight="1.1"
                mb={6}
              >
                Hey, I'm Satwik<Box as="span" color="text">.</Box>
              </Heading>
              <Heading
                as="h2"
                fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
                fontWeight="medium"
                lineHeight="1.3"
                mb={8}
              >
                Full Stack Developer with experience in
                <br />
                high-performance systems and elegant web solutions
              </Heading>
              {/* Experience Highlight */}
              <Box
                mb={8}
                p={6}
                borderRadius="xl"
                bg="card"
                boxShadow="md"
              >
                <Flex
                  direction={{ base: "column", sm: "row" }}
                  align={{ base: "flex-start", sm: "center" }}
                  mb={4}
                >
                  <Heading size="md" mb={{ base: 2, sm: 0 }}>Recently at</Heading>
                  <Link
                    href="https://sig.com"
                    ml={{ base: 0, sm: 3 }}
                  >
                    <HStack >
                      <Text fontSize="xl" fontWeight="bold">Susquehanna International Group</Text>
                      <FaArrowRight size={12} />
                    </HStack>
                  </Link>
                </Flex>
                <Text mb={3}>
                  Engineered high-performance C++ systems processing over 5.8 billion
                  market data messages daily with nanosecond latency
                </Text>
              </Box>
              <Text fontSize="lg" mb={4} lineHeight="tall">
                I blend experience in low-level performance optimization with modern web development.
              </Text>
              <Text fontSize="lg" mb={8} lineHeight="tall">
                Recently, I have been focusing on creating full stack web applications that deliver exceptional user experiences
                while maintaining high performance, scalability, and clean architecture.
              </Text>
              {/* Call to Action */}
              <HStack mb={12}>
                <Button
                  variant="outline"
                  size="lg"
                  borderRadius={"lg"}
                >
                  About Me
                </Button>
                <Button
                  as={Link}
                  variant={"outline"}
                  href="https://github.com/satwikShresth"
                  borderRadius={"lg"}
                >
                  <Icon as={FaGithub} w={6} h={6} />
                  Github
                </Button>
                <Button
                  as={Link}
                  variant={"outline"}
                  href="https://linkedin.com/in/satwik-shresth/"
                  borderRadius={"lg"}
                >
                  <Icon as={FaLinkedin} w={6} h={6} />
                  linkedIn
                </Button>
              </HStack>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Center>
  )
})
