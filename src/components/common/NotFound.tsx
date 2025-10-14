import {
  AbsoluteCenter,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Link } from '@tanstack/react-router'
import { FaHome } from 'react-icons/fa'

export function NotFound() {
  return (
    <AbsoluteCenter width="100%" axis="horizontal" mt='44' >
      <Box
        width="100%"
        py={{ base: 8, md: 12 }}
        px={{ base: 4, md: 8 }}
        textAlign="center"
      >
        <VStack gap={6} maxW="600px" mx="auto">
          {/* 404 Large Display */}
          <Box position="relative">
            <Heading
              as="h1"
              fontSize={{ base: '8xl', md: '9xl' }}
              fontWeight="bold"
              color="accent"
              lineHeight="1"
              opacity={0.9}
            >
              404
            </Heading>
          </Box>

          {/* Error Message */}
          <VStack gap={3}>
            <Heading
              as="h2"
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight="bold"
            >
              Page Not Found
            </Heading>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="muted"
              maxW="500px"
            >
              Oops! The page you're looking for seems to have wandered off into
              the digital void. It might have been moved, deleted, or never
              existed.
            </Text>
          </VStack>

          {/* Action Buttons */}
          <Flex
            gap={3}
            wrap="wrap"
            justify="center"
            mt={4}
            direction={{ base: 'column', sm: 'row' }}
            width={{ base: '100%', sm: 'auto' }}
          >
            <Link to="/">
              <Button
                variant="solid"
                colorScheme="teal"
                borderRadius="lg"
                size={{ base: 'md', md: 'lg' }}
                width={{ base: '100%', sm: 'auto' }}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                <Icon as={FaHome} mr={2} />
                Back to Home
              </Button>
            </Link>
          </Flex>

          {/* Helpful Links */}
          <Box mt={4}>
            <Text fontSize="sm" color="muted" mb={2}>
              You might want to check out:
            </Text>
            <Flex gap={3} wrap="wrap" justify="center" fontSize="sm">
              <Link to="/projects">
                <Text
                  color="accent"
                  _hover={{ textDecoration: 'underline' }}
                  cursor="pointer"
                >
                  Projects
                </Text>
              </Link>
              <Text color="muted">•</Text>
              <Link to="/experience">
                <Text
                  color="accent"
                  _hover={{ textDecoration: 'underline' }}
                  cursor="pointer"
                >
                  Experience
                </Text>
              </Link>
              <Text color="muted">•</Text>
              <Link to="/activity">
                <Text
                  color="accent"
                  _hover={{ textDecoration: 'underline' }}
                  cursor="pointer"
                >
                  Activity
                </Text>
              </Link>
            </Flex>
          </Box>
        </VStack>
      </Box>
    </AbsoluteCenter>
  )
}
