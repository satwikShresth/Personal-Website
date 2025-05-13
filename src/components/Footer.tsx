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
import { linkOptions } from '@tanstack/react-router';
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
          <HStack mt={{ base: 4, md: 0 }} gap={5} >
            <Button
              as={Link}
              variant={"outline"}
              borderRadius={"lg"}
              _hover={{
                color: "accent"
              }}
              {...linkOptions({
                to: "https://github.com/satwikShresth",
                preload: "intent"
              })}
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
              {...linkOptions({
                to: "https://linkedin.com/in/satwik-shresth/",
                preload: "intent"
              })}
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
