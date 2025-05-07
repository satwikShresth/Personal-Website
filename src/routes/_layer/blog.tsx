import {
  Badge,
  Box,
  Code,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  Separator,
  Table,
  Text,
} from '@chakra-ui/react';
import { Outlet, createFileRoute } from '@tanstack/react-router';
import { MDXProvider } from '@mdx-js/react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { Blog } from '@/components/Blog';
import mdx from '@/components/mdx';

export const Route = createFileRoute('/_layer/blog')({
  component: () => {
    const textColor = useColorModeValue('gray.700', 'gray.200');
    const headingColor = useColorModeValue('gray.800', 'white');
    const accentColor = useColorModeValue('teal.500', 'teal.300');
    const blockquoteBg = useColorModeValue('gray.50', 'gray.700');
    const blockquoteBorder = useColorModeValue('teal.500', 'teal.300');
    const codeBg = useColorModeValue('gray.50', 'gray.700');

    const components = {
      h1: (props: any) => (
        <Heading
          as="h1"
          fontSize={{ base: "4xl", md: "5xl" }}
          fontWeight="extrabold"
          color={headingColor}
          mt={10}
          mb={6}
          {...props}
        />
      ),
      h2: (props: any) => (
        <Heading
          as="h2"
          fontSize={{ base: "3xl", md: "4xl" }}
          fontWeight="bold"
          color={headingColor}
          mt={8}
          mb={4}
          {...props}
        />
      ),
      h3: (props: any) => (
        <Heading
          as="h3"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          color={headingColor}
          mt={6}
          mb={3}
          {...props}
        />
      ),
      h4: (props: any) => (
        <Heading
          as="h4"
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="bold"
          color={headingColor}
          mt={5}
          mb={2}
          {...props}
        />
      ),
      p: (props: any) => (
        <Text
          fontSize={{ base: "md", md: "lg" }}
          lineHeight="tall"
          color={textColor}
          mb={4}
          letterSpacing="wide"
          {...props}
        />
      ),
      a: (props: any) => (
        <Link
          color={accentColor}
          fontWeight="medium"
          textDecoration="underline"
          textDecorationColor={accentColor}
          _hover={{ textDecoration: "none" }}
          {...props}
        />
      ),
      blockquote: (props: any) => (
        <Box
          as="blockquote"
          borderLeftWidth="4px"
          borderLeftColor={blockquoteBorder}
          bg={blockquoteBg}
          px={6}
          py={4}
          my={6}
          borderRadius="md"
          fontSize={{ base: "md", md: "lg" }}
          fontStyle="italic"
          {...props}
        />
      ),
      code: (props: any) => (
        <Code
          bg={codeBg}
          px={2}
          py={1}
          borderRadius="md"
          fontSize={{ base: "sm", md: "md" }}
          {...props}
        />
      ),
      pre: (props: any) => (
        <Box
          as="pre"
          bg={codeBg}
          p={4}
          borderRadius="md"
          overflowX="auto"
          my={6}
          fontSize={{ base: "sm", md: "md" }}
          {...props}
        />
      ),
      hr: (props: any) => <Separator my={8} borderColor={accentColor} opacity={0.6} {...props} />,
      img: (props: any) => (
        <Image
          my={6}
          borderRadius="lg"
          mx="auto"
          maxH="500px"
          objectFit="contain"
          {...props}
        />
      ),
      // Updated table components for Chakra UI v3 compound components
      table: (props: any) => (
        <Box overflowX="auto" mb={6}>
          <Table.Root width="full" {...props} />
        </Box>
      ),
      thead: (props: any) => <Table.Header {...props} />,
      tbody: (props: any) => <Table.Body {...props} />,
      tr: (props: any) => <Table.Row {...props} />,
      th: (props: any) => (
        <Table.HeaderCell
          bg={useColorModeValue('gray.50', 'gray.700')}
          fontWeight="semibold"
          p={2}
          textAlign="start"
          {...props}
        />
      ),
      td: (props: any) => (
        <Table.Cell
          p={2}
          borderTopWidth="1px"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          {...props}
        />
      ),
      // Custom component for blog post metadata like date, tags, etc.
      BlogMeta: ({ date, tags, readTime }: any) => (
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={{ base: 2, md: 4 }}
          mb={8}
          mt={2}
          align={{ base: "flex-start", md: "center" }}
        >
          {date && (
            <Text fontSize="md" color="gray.500">
              {date}
            </Text>
          )}
          {readTime && (
            <Text fontSize="md" color="gray.500">
              {readTime} min read
            </Text>
          )}
          {tags && tags.length > 0 && (
            <Flex gap={2} flexWrap="wrap" mt={{ base: 2, md: 0 }}>
              {tags.map((tag: string, index: number) => (
                <Badge
                  key={index}
                  colorScheme="teal"
                  fontSize="sm"
                  fontWeight="medium"
                  px={2}
                  py={1}
                  borderRadius="md"
                >
                  {tag}
                </Badge>
              ))}
            </Flex>
          )}
        </Flex>
      ),
      // Component for featured image at the top of blog posts
      FeaturedImage: ({ src, alt, caption }: any) => (
        <Box my={8}>
          <Image
            src={src}
            alt={alt || "Featured image"}
            borderRadius="lg"
            w="full"
            maxH="500px"
            objectFit="cover"
          />
          {caption && (
            <Text fontSize="sm" color="gray.500" textAlign="center" mt={2}>
              {caption}
            </Text>
          )}
        </Box>
      ),
    };
    return (
      <Container>
        <MDXProvider components={{ ...components }}>
          <Blog.Root blogPosts={mdx}>
            <Outlet />
          </Blog.Root>
        </MDXProvider>
      </Container>
    );
  },
});
