import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  VStack,
} from '@chakra-ui/react'
import { FaArrowLeft, FaHardHat } from 'react-icons/fa'

export default function PageUnderConstruction() {
  return (
    <Center minH="84vh" width="100%">
      <Box mb={20} width="100%">
        <Container maxW="container.xl">
          {/* Main Content */}
          <Flex direction="column" justify="center" align="center" gap={8}>
            <Box
              w={{ base: '60%', sm: '50%', md: '30%' }}
              borderRadius="full"
              overflow="hidden"
              aspectRatio={1}
              boxShadow="xl"
              bg="card"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={FaHardHat} w={20} h={20} color="accent" />
            </Box>

            <VStack textAlign="center">
              <Heading
                as="h1"
                fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
                color="accent"
                lineHeight="1.1"
              >
                Page Under Construction
                <Box as="span" color="text">
                  .
                </Box>
              </Heading>

              {/* Call to Action */}
              <Button
                variant="outline"
                size="lg"
                borderRadius="lg"
                onClick={() => window.history.back()}
                _hover={{
                  color: 'accent',
                }}
              >
                {<FaArrowLeft />}
                Go Back
              </Button>
            </VStack>
          </Flex>
        </Container>
      </Box>
    </Center>
  )
}
