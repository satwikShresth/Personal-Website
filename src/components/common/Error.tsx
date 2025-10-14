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
import { useRouter } from '@tanstack/react-router'
import { FaRedo, FaHome } from 'react-icons/fa'
import { BiError } from 'react-icons/bi'

interface ErrorProps {
  error?: Error
  reset?: () => void
}

export function Error({ error, reset }: ErrorProps) {
  const router = useRouter()

  const handleReset = () => {
    if (reset) {
      reset()
    } else {
      router.invalidate()
    }
  }

  const handleGoHome = () => {
    router.navigate({ to: '/' })
  }

  return (
    <AbsoluteCenter width="100%" axis="horizontal" mt="44">
      <Box
        width="100%"
        py={{ base: 8, md: 12 }}
        px={{ base: 4, md: 8 }}
        textAlign="center"
      >
        <VStack gap={6} maxW="600px" mx="auto">
          {/* Error Icon Display */}
          <Box position="relative">
            <Box
              position="relative"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                position="absolute"
                width={{ base: '120px', md: '150px' }}
                height={{ base: '120px', md: '150px' }}
                borderRadius="full"
                bg="red.500"
                opacity={0.1}
              />
              <Icon
                as={BiError}
                boxSize={{ base: '80px', md: '100px' }}
                color="red.500"
              />
            </Box>
          </Box>

          {/* Error Message */}
          <VStack gap={3}>
            <Heading
              as="h2"
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight="bold"
            >
              Something Went Wrong
            </Heading>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="muted"
              maxW="500px"
            >
              We encountered an unexpected error. Don't worry, it's not your
              fault. Please try again or return to the home page.
            </Text>
            {error && (
              <Box
                mt={2}
                p={4}
                borderRadius="lg"
                bg="card"
                width="100%"
                maxW="500px"
              >
                <Text
                  fontSize="sm"
                  color="muted"
                  fontFamily="mono"
                  textAlign="left"
                  wordBreak="break-word"
                >
                  {error.message || 'Unknown error occurred'}
                </Text>
              </Box>
            )}
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
            <Button
              variant="solid"
              colorScheme="red"
              borderRadius="lg"
              size={{ base: 'md', md: 'lg' }}
              width={{ base: '100%', sm: 'auto' }}
              onClick={handleReset}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              <Icon as={FaRedo} mr={2} />
              Try Again
            </Button>
            <Button
              variant="outline"
              borderRadius="lg"
              size={{ base: 'md', md: 'lg' }}
              width={{ base: '100%', sm: 'auto' }}
              onClick={handleGoHome}
              _hover={{
                color: 'accent',
                borderColor: 'accent',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
            >
              <Icon as={FaHome} mr={2} />
              Go Home
            </Button>
          </Flex>

          {/* Help Text */}
          <Box mt={4}>
            <Text fontSize="sm" color="muted">
              If this problem persists, please contact support or check your
              connection.
            </Text>
          </Box>
        </VStack>
      </Box>
    </AbsoluteCenter>
  )
}
