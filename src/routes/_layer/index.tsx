// Home Route
import { createFileRoute } from '@tanstack/react-router'
import {
  AbsoluteCenter,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Text,
} from '@chakra-ui/react'
import { Link as RLink } from '@tanstack/react-router'
import PHOTO from '/my_photo.png'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { GrDocumentPdf } from 'react-icons/gr'

export const Route = createFileRoute('/_layer/')({
  component: () => {
    return (
      <Box display={'grid'} width="100%">
        <Box as={IntroPage} alignSelf={'center'} />
      </Box>
    )
  },
})



function IntroPage() {
  return (
    <AbsoluteCenter width={'100%'}>
      <Box
        width="100%"
        mt={{ base: '12', md: 12 }}
        py={{ base: 8, md: 12 }}
        px={{ base: 2, md: 4 }}
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="center"
          width="100%"
          gap={{ base: 4, md: 10 }}
        >
          {/* Image Container */}
          <Box
            width={{ base: '100%', md: 'auto' }}
            display="flex"
            justifyContent="center"
            px={{ base: 2, md: 0 }}
          >
            <Image
              boxShadow="lg"
              borderRadius="lg"
              width={{ base: '180px', sm: '280px', md: '350px' }}
              height={{ base: '180px', sm: '280px', md: '350px' }}
              objectFit="cover"
              src={PHOTO}
              alt="Satwik Shresth"
            />
          </Box>

          {/* Content Container */}
          <Box
            flex="1"
            mt={{ base: 4, md: 0 }}
            width={{ base: '100%', md: 'auto' }}
            maxW={{ base: '100%', md: '950px' }}
            px={{ base: 2, md: 0 }}
          >
            <Heading
              as="h1"
              fontSize={{ base: 'xl', sm: '3xl', md: '4xl' }}
              lineHeight="1.1"
              mb={4}
              textAlign={{ base: 'center', md: 'left' }}
            >
              Satwik{' '}
              <Box as="span" color="accent">
                Shresth
              </Box>
            </Heading>

            <Card.Root mb={4} p={{ base: 3, md: 4 }} borderRadius="xl">
              <Card.Title
                as={Link}
                fontSize={{ base: 'sm', md: 'md' }}
                display="flex"
                alignItems="center"
                gap={1}
                flexWrap="wrap"
              >
                I like to code
              </Card.Title>
              <Card.Description>
                <Text fontSize={{ base: 'sm', md: 'md' }}>
                  {"Check out my "}
                  <RLink to='/projects'><Link _hover={{ textDecoration: 'underline' }}>projects</Link></RLink>{", "}
                  <RLink to='/experience'><Link _hover={{ textDecoration: 'underline' }}>experiences</Link></RLink>{", "}
                  <RLink to='/activity'><Link _hover={{ textDecoration: 'underline' }}>activities</Link></RLink> etc....
                </Text>
              </Card.Description>
            </Card.Root>

            <Text fontSize={{ base: 'md', md: 'lg' }} mb={4} lineHeight="tall">
              Lately, I have been focusing on <Text as='del' fontSize={'md'} fontWeight='extralight' >creating full stack web
                applications that deliver end-to-end solutions while maintaining
                high performance, scalability, and clean architecture</Text>{" "}
              hiking, climbing & exploring national parks.
            </Text>

            <Flex
              wrap="wrap"
              gap={2}
              mb={4}
              justify={{ base: 'center', md: 'flex-start' }}
            >
              <Link href="/resume.pdf" >
                <Button
                  _hover={{
                    color: 'accent',
                  }}
                  variant="outline"
                  borderRadius="lg"
                  size={{ base: 'sm', md: 'md' }}
                >
                  <Icon
                    as={GrDocumentPdf}
                    w={{ base: 4, md: 6 }}
                    h={{ base: 4, md: 6 }}
                    mr={2}
                  />
                  Resume
                </Button>
              </Link>
              <Link href="https://github.com/satwikShresth" >
                <Button
                  variant="outline"
                  _hover={{
                    color: 'accent',
                  }}
                  borderRadius="lg"
                  size={{ base: 'sm', md: 'md' }}
                >
                  <Icon
                    as={FaGithub}
                    w={{ base: 4, md: 6 }}
                    h={{ base: 4, md: 6 }}
                    mr={2}
                  />
                  Github
                </Button>
              </Link>
              <Link href="https://linkedin.com/in/satwik-shresth/" >
                <Button
                  _hover={{
                    color: 'accent',
                  }}
                  variant="outline"
                  borderRadius="lg"
                  size={{ base: 'sm', md: 'md' }}
                >
                  <Icon
                    as={FaLinkedin}
                    w={{ base: 4, md: 6 }}
                    h={{ base: 4, md: 6 }}
                    mr={2}
                  />
                  LinkedIn
                </Button>
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </AbsoluteCenter>
  )
}

