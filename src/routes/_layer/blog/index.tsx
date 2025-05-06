import { createFileRoute } from '@tanstack/react-router';
import {
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Separator,
  Text
} from '@chakra-ui/react';
import { FaCalendarAlt } from 'react-icons/fa';
import { useMDXComponents } from '@mdx-js/react';
import type { Metadata } from '@/components/mdx/types';
import Posts from '@/components/mdx';
import { useColorModeValue } from '@/components/ui/color-mode';
import authorImage from "/my_photo.jpeg"

export const Route = createFileRoute('/_layer/blog/')({
  component: BlogComponent,
});

function BlogComponent() {
  const headingColor = useColorModeValue('gray.800', 'white');
  const accentColor = useColorModeValue('teal.500', 'teal.300');
  const Welcome = useMDXComponents(Posts.welcome.component);
  const metadataTyped = Posts?.welcome?.metadata as Metadata;
  const publishDate = metadataTyped.date;
  const tags = metadataTyped.tags;
  const author = "Satwik Shresth";

  return (
    <Container maxW="container.xl" py={12}>
      {/* Header section */}
      <Box textAlign="left">
        <Heading
          as="h1"
          fontSize={{ base: "4xl", md: "6xl" }}
          fontWeight="extrabold"
          color={headingColor}
          mb={6}
        >
          {(() => {
            const title = metadataTyped.title || "";
            const words = title.trim().split(/\s+/);

            if (words.length <= 1) {
              return <Box as="span" color={accentColor}>{title}</Box>;
            }

            const lastWord = words.pop();
            const normalText = words.join(' ');

            return (
              <>
                {normalText}{' '}
                <Box as="span" color={accentColor}>{lastWord}</Box>
              </>
            );
          })()}
        </Heading>

        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          maxW="container.lg"
          mx="auto"
          opacity={0.9}
          letterSpacing="wide"
          mb={6}
        >
          {metadataTyped.description}
        </Text>

        {/* Metadata display */}
        <Flex
          mb={10}
          flexWrap="wrap"
          alignItems="center"
        >
          {/* Date */}
          <Flex alignItems="center" mr={4}>
            <Box color={accentColor} mr={2}>
              <FaCalendarAlt />
            </Box>
            <Text fontSize="md">{publishDate}</Text>
          </Flex>

          {/* Author */}
          <Flex alignItems="center" mr={4}>
            <Box
              width="30px"
              height="30px"
              borderRadius="full"
              overflow="hidden"
              borderWidth="2px"
              borderColor={accentColor}
              mr={2}
            >
              <Image src={authorImage} alt={author} width="100%" height="100%" objectFit="cover" />
            </Box>
            <Text fontSize="md">{author}</Text>
          </Flex>

          {/* Tags */}
          <Flex alignItems="center" flexWrap="wrap">
            {tags.map((tag, idx) => (
              <Badge
                key={idx}
                variant="solid"
                colorScheme="teal"
                fontSize="sm"
                fontWeight="medium"
                px={3}
                py={1}
                borderRadius="md"
                mr={2}
                mb={2}
              >
                {tag}
              </Badge>
            ))}
          </Flex>
        </Flex>

        <Separator mb={8} width={"70%"} borderColor={`${accentColor}30`} />
      </Box>

      {/* Content section */}
      <Box className="mdx-content">
        {Welcome}
      </Box>
    </Container>
  );
}

export default BlogComponent;
