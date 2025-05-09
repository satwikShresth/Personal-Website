import { Box, Button, Flex, HStack, Heading, Icon, Image, Link, Text } from "@chakra-ui/react";
import PHOTO from "/my_photo.jpeg"
import { FaArrowRight, FaGithub, FaLinkedin } from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";

function IntroPage() {
  return (
    <Flex flexWrap={"wrap"} >
      <Box
        width={"500px"}
        borderRadius="full"
        overflow="hidden"
        aspectRatio={.8}
        boxShadow="xl"
        as={Image}
        src={PHOTO}
      />

      <Box
        flex="1"
        alignSelf="center"
        ml={10}
      >
        <Heading
          as="h1"
          fontSize={"6xl"}
          lineHeight="1.1"
          mb={6}
        >
          Satwik <Box as="span" color="accent">Shresth</Box>
        </Heading>
        <Heading
          as="h2"
          fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
          fontWeight="medium"
          lineHeight="1.3"
          mb={8}
        >
          Full Stack Engineer with experience in
          <br />
          high-performance systems and web solutions
        </Heading>
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
              ml={3}
            >
              <HStack >
                <Text fontSize="xl" fontWeight="bold">Susquehanna International Group</Text>
                <FaArrowRight />
              </HStack>
            </Link>
          </Flex>
          <Text mb={3}>
            Engineered high-performance C++ systems processing over 5.8 billion
            market data messages daily with nanosecond latency
          </Text>
        </Box>
        <Text fontSize="lg" mb={4} lineHeight="tall">
          I blend my experience in low-level performance optimization with modern web development.
        </Text>
        <Text fontSize="lg" mb={8} lineHeight="tall">
          Recently, I have been focusing on creating full stack web applications that deliver end-to-end solutions
          while maintaining high performance, scalability, and clean architecture.
        </Text>
        <Flex
          wrap="wrap"
          gap={3}
          mb={12}
          justify={{ base: "center", lg: "flex-start" }}
        >
          <Button
            as={Link}
            variant={"outline"}
            href="/resume.pdf"
            borderRadius={"lg"}
          >
            <Icon as={GrDocumentPdf} w={6} h={6} />
            Resume
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
        </Flex>
      </Box>
    </Flex>
  )
}

export default IntroPage;
