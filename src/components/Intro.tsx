// IntroPage Component
import { AbsoluteCenter, Box, Button, Card, Flex, Heading, Icon, Image, Link, Text } from "@chakra-ui/react";
import { Link as RLink } from "@tanstack/react-router";
import PHOTO from "/my_photo.png"
import { FaArrowRight, FaGithub, FaLinkedin } from "react-icons/fa";
import { GrDocumentPdf } from "react-icons/gr";

function IntroPage() {
  return (
    <AbsoluteCenter width={"100%"}>
      <Flex
        direction={{ base: "column", md: "row" }}
        alignContent="center"
        width="100%"
        gap={{ base: 6, md: 10 }}
        py={{ base: 4, md: 8 }}
      >
        {/* Image Container */}
        <Box
          width={{ base: "100%", md: "auto" }}
          display="flex"
          justifyContent="center"
          px={{ base: 4, md: 0 }}
        >
          <Image
            boxShadow="lg"
            borderRadius="lg"
            width={{ base: "240px", sm: "280px", md: "350px" }}
            height={{ base: "240px", sm: "280px", md: "350px" }}
            objectFit="cover"
            src={PHOTO}
            alt="Satwik Shresth"
          />
        </Box>

        {/* Content Container */}
        <Box
          flex="1"
          mt={"5"}
          width={{ base: "100%", md: "auto" }}
          maxW={{ base: "100%", md: "950px" }}
          px={{ base: 4, md: 0 }}
        >
          <Heading
            as="h1"
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            lineHeight="1.1"
            mb={4}
            textAlign={{ base: "center", md: "left" }}
          >
            Satwik <Box as="span" color="accent">Shresth</Box>
          </Heading>

          <Card.Root
            mb={6}
            p={4}
            borderRadius="xl"
          >
            <RLink to="/blog/$post" params={{ post: "sig" }}>
              <Card.Title
                as={Link}
                fontSize="md"
                display="flex"
                alignItems="center"
                gap={1}
              >
                Recently at
                <Text fontWeight="bold">Susquehanna International Group</Text>
                <Icon as={FaArrowRight} h="12px" />
              </Card.Title>
            </RLink>
            <Card.Description>
              <Text>
                Engineered high-performance C++ systems processing over 5.8 billion
                market data messages daily with nanosecond latency
              </Text>
            </Card.Description>
          </Card.Root>

          <Text fontSize="lg" mb={6} lineHeight="tall">
            Lately, I have been focusing on creating full stack web applications that deliver end-to-end solutions while maintaining high performance, scalability, and clean architecture.
          </Text>

          <Flex
            wrap="wrap"
            gap={3}
            mb={6}
            justify={{ base: "center", md: "flex-start" }}
          >
            <Button
              as={Link}
              _hover={{
                color: "accent"
              }}
              variant="outline"
              href="/resume.pdf"
              borderRadius="lg"
            >
              {window.stonks?.event && window.stonks.event("checked resume")}
              <Icon as={GrDocumentPdf} w={6} h={6} mr={2} />
              Resume
            </Button>
            <Button
              as={Link}
              variant="outline"
              _hover={{
                color: "accent"
              }}
              href="https://github.com/satwikShresth"
              borderRadius="lg"
            >
              {window.stonks?.event && window.stonks.event("visited github")}
              <Icon as={FaGithub} w={6} h={6} mr={2} />
              Github
            </Button>
            <Button
              _hover={{
                color: "accent"
              }}
              as={Link}
              variant="outline"
              href="https://linkedin.com/in/satwik-shresth/"
              borderRadius="lg"
            >
              {window.stonks?.event && window.stonks.event("checked linkedIn")}
              <Icon as={FaLinkedin} w={6} h={6} mr={2} />
              LinkedIn
            </Button>
          </Flex>
        </Box>
      </Flex>
    </AbsoluteCenter>
  );
}

export default IntroPage;
