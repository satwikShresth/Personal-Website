import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Icon,
  Link,
  Separator,
  Text
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box as="footer" width="100%">
      <Separator />
      <Container maxW="container.xl" py={2}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
        >
          <Text fontSize="sm">
            © {new Date().getFullYear()} Satwik Shresth. All rights reserved.
          </Text>
          <HStack mt={0} gap={5} >
            <Button
              as={Link}
              variant={"outline"}
              borderRadius={"lg"}
              _hover={{
                color: "accent"
              }}
              href="https://github.com/satwikShresth"
            >
              <FaGithub width={10} height={10} />
              Github
            </Button>
            <Button
              as={Link}
              variant={"outline"}
              borderRadius={"lg"}
              _hover={{
                color: "accent"
              }}
              href="https://linkedin.com/in/satwik-shresth/"
            >
              <Icon
                as={FaLinkedin}
                w={5}
                h={5}
              />
              LinkedIn
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
