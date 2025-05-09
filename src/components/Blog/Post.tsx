import { useMDXComponents } from "@mdx-js/react";
import { Badge, Box, Container, Flex, HStack, Heading, Image, Separator, Text, VStack } from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";
import { useColorModeValue } from "../ui/color-mode";
import authorImage from "/my_photo.jpeg"
import type { BlogMetadata } from "./store";

interface PostProps {
  MdxCompoenent: any;
  metadata: BlogMetadata;
}
function Post({ MdxCompoenent, metadata }: PostProps) {
  const headingColor = useColorModeValue('gray.800', 'white');
  const publishDate = metadata.date;
  const tags = metadata.tags;
  const author = "Satwik Shresth";
  const Content = useMDXComponents(MdxCompoenent);

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
            const title = metadata.title || "";
            const words = title.trim().split(/\s+/);

            if (words.length <= 1) {
              return <Box as="span" color={"accent"}>{title}</Box>;
            }

            const lastWord = words.pop();
            const normalText = words.join(' ');

            return (
              <>
                {normalText}{' '}
                <Box as="span" color={"accent"}>{lastWord}</Box>
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
          {metadata.description}
        </Text>

        {/* Metadata display */}
        <Flex
          mb={10}
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <VStack align="flex-start" width="100%">
            {/* Tags */}
            <Flex alignItems="center" flexWrap="wrap">
              {tags.map((tag, idx) => (
                <Badge
                  mr={4}
                  key={idx}
                  variant="solid"
                  bgColor="accent"
                  fontSize="sm"
                  fontWeight="medium"
                  px={3}
                  py={1}
                  borderRadius="md"
                  mb={2}
                >
                  <Text color={"white"}>{tag}</Text>
                </Badge>
              ))}
            </Flex>

            {/* Author and Date */}
            <HStack >
              {/* Author */}
              <Flex alignItems="center">
                <Box
                  width="30px"
                  height="30px"
                  borderRadius="full"
                  overflow="hidden"
                  borderWidth="2px"
                  borderColor={"accent"}
                  mr={2}
                >
                  <Image src={authorImage} alt={author} width="100%" height="100%" objectFit="cover" />
                </Box>
                <Text fontSize="md">{author}</Text>
              </Flex>

              {/* Date */}
              <Flex alignItems="center">
                <Box color={"accent"} mr={2}>
                  <FaCalendarAlt />
                </Box>
                <Text fontSize="md">{publishDate}</Text>
              </Flex>
            </HStack>
          </VStack>
        </Flex>

        <Separator mb={8} width={"70%"} borderColor={"accent"} />
      </Box>

      <Box className="mdx-content">
        {Content}
      </Box>
    </Container>
  );
}

export default Post;
