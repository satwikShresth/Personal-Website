import {
  AbsoluteCenter,
  Box,
  Heading,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`
export function Loading() {
  return (
    <AbsoluteCenter width="100%" axis="horizontal" mt="44">
      <Box
        width="100%"
        py={{ base: 8, md: 12 }}
        px={{ base: 4, md: 8 }}
        textAlign="center"
      >
        <VStack gap={6} maxW="600px" mx="auto">
          {/* Animated Spinner */}
          <Box position="relative">
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width={{ base: '120px', md: '150px' }}
              height={{ base: '120px', md: '150px' }}
              borderRadius="full"
              bg="accent"
              opacity={0.1}
              animation={`${pulse} 2s ease-in-out infinite`}
            />
            <Spinner
              size="xl"
              color="accent"
              width={{ base: '60px', md: '80px' }}
              height={{ base: '60px', md: '80px' }}
            />
          </Box>

          {/* Loading Message */}
          <VStack gap={2}>
            <Heading
              as="h2"
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="bold"
            >
              Loading
            </Heading>
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              color="muted"
              maxW="400px"
            >
              Please wait while we prepare your content...
            </Text>
          </VStack>

          {/* Animated Dots */}
          <Box display="flex" gap={2} mt={2}>
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                width="8px"
                height="8px"
                borderRadius="full"
                bg="accent"
                animation={`${pulse} 1.4s ease-in-out infinite`}
                css={{
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </Box>
        </VStack>
      </Box>
    </AbsoluteCenter>
  )
}
