import { Link as RouterLink, linkOptions, useNavigate } from '@tanstack/react-router';
import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Tag,
  Text,
} from '@chakra-ui/react';
import { FaArrowRight, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { Tooltip } from '../ui/tooltip';
import { useBlogMetadataStore } from './store';
import { useColorModeValue } from '@/components/ui/color-mode';

export type BlogCardProps = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: Array<string>;
  image?: string;
  variant?: 'normal' | 'suggested';
  showReadMore?: boolean;
  estimatedReadTime?: number;
};

export function BlogCard({
  slug,
  title,
  date,
  description,
  tags,
  image,
  variant = 'normal',
  estimatedReadTime,
}: BlogCardProps) {
  const { markPostAsRead, readPosts } = useBlogMetadataStore();
  const navigate = useNavigate();

  const isRead = readPosts.includes(slug);

  const mutedColor = useColorModeValue('gray.500', 'gray.400');

  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleClick = () => {
    markPostAsRead(slug);
    navigate({ to: "/blog/$post", params: { post: slug } })
  };

  // Calculate estimated read time if not provided
  const readTime = estimatedReadTime || Math.ceil(description.length / 1000) + 2;

  if (variant === 'suggested') {
    return (
      <Card.Root
        direction={{ base: 'column', md: 'row' }}
        overflow="hidden"
        p={4}
        m={4}
        cursor={"pointer"}
        height="100%"
        _hover={{
          transform: 'translateY(-4px)',
          boxShadow: 'xl',
          borderColor: 'accent',
        }}
        transition="all 0.3s ease"
        onClick={handleClick}
        position="relative"
      >
        {
          isRead && (
            <Tooltip content="You've read this article">
              <Tag.Root borderRadius={"xl"}>
                <Tag.Label>
                  Read
                </Tag.Label>
              </Tag.Root>
            </Tooltip>
          )
        }

        {
          image && (
            <Box
              overflow="hidden"
              borderRadius="lg"
              minW={{ base: '100%', md: '220px' }}
              maxW={{ base: '100%', md: '220px' }}
              mr={{ base: 0, md: 4 }}
              mb={{ base: 4, md: 0 }}
            >
              <Image
                objectFit="cover"
                w="100%"
                h="100%"
                src={image}
                alt={title}
                borderRadius="lg"
                transition="transform 0.5s"
                _hover={{ transform: 'scale(1.05)' }}
              />
            </Box>
          )
        }

        <Flex flex="1" flexDirection="column" justifyContent="space-between">
          <CardBody p={0}>
            <Box mb={3}>
              <Badge colorScheme="teal" mb={2} px={2} py={1} borderRadius="md">Suggested</Badge>
              <HStack color={mutedColor} fontSize="sm" mt={1} >
                <Icon as={FaCalendarAlt} fontSize="xs" />
                <Text>{formattedDate}</Text>
                {estimatedReadTime && (
                  <>
                    <Text>•</Text>
                    <Icon as={FaClock} fontSize="xs" />
                    <Text>{readTime} min read</Text>
                  </>
                )}
              </HStack>
            </Box>

            <Heading
              as="h2"
              size="lg"
              color={"accent"}
              fontWeight="700"
              mb={3}
              lineHeight="1.2"
            >
              {title}
            </Heading>

            <Text fontSize="md" mb={4} lineHeight="1.6">
              {description}
            </Text>

            <Flex flexWrap="wrap" gap={2} mt={3}>
              {tags.map((tag) => (
                <Badge
                  key={`${slug}-${tag}`}
                  colorScheme="teal"
                  variant="subtle"
                  px={2}
                  py={1}
                  borderRadius="md"
                  fontSize="xs"
                >
                  {tag}
                </Badge>
              ))}
            </Flex>
          </CardBody>

          <CardFooter p={0} mt={4}>
            <Button
              borderRadius={"lg"}
              colorScheme="teal"
              as={RouterLink}
              {...linkOptions({
                to: '/blog/$post',
                params: { post: slug }

              })}
              variant="solid"
              size="md"
              width="auto"
              px={6}
            >
              <FaArrowRight />
              Read Article
            </Button>
          </CardFooter>
        </Flex>
      </Card.Root >
    );
  }

  // Normal variant (default)
  return (
    <Card.Root
      borderRadius="xl"
      overflow="hidden"
      m={10}
      bgBlendMode={"lighten"}
      cursor={"pointer"}
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: 'xl',
        borderColor: 'accent',
      }}
      transition="all 0.3s ease"
      position="relative"
      onClick={handleClick}
    >

      {image && (
        <Box position="relative" overflow="hidden">
          <Image
            src={image}
            alt={title}
            height="200px"
            width="100%"
            objectFit="cover"
            transition="transform 0.5s"
            _hover={{ transform: 'scale(1.05)' }}
          />
          <Box
            position="absolute"
            bottom={0}
            width="100%"
            height="40%"
            bgGradient="linear(to-t, blackAlpha.600, transparent)"
          />
        </Box>
      )}

      <CardBody p={5}>
        <HStack color={mutedColor} fontSize="sm" mb={3} justifyContent={"space-between"}>
          <HStack>
            <Icon as={FaCalendarAlt} fontSize="xs" />
            <Text>{formattedDate}</Text>
            {estimatedReadTime && (
              <>
                <Text>•</Text>
                <Icon as={FaClock} fontSize="xs" />
                <Text>{readTime} min read</Text>
              </>
            )}
          </HStack>

          <HStack>
            {isRead && (
              <Box>
                <Tooltip content="You've read this article">
                  <Tag.Root>
                    <Tag.Label>
                      Read
                    </Tag.Label>
                  </Tag.Root>
                </Tooltip>
              </Box>
            )}
          </HStack>

        </HStack>

        <Heading
          as="h2"
          fontSize="xl"
          color={"accent"}
          fontWeight="700"
          mb={3}
          lineHeight="1.3"
        >
          {title}
        </Heading>

        <Text fontSize="md" mb={4} lineHeight="1.6">
          {description}
        </Text>

        <Flex flexWrap="wrap" gap={2} mt="auto">
          {tags.map((tag) => (
            <Badge
              key={`${slug}-${tag}`}
              colorScheme="teal"
              variant="subtle"
              px={2}
              py={1}
              borderRadius="md"
              fontSize="xs"
            >
              {tag}
            </Badge>
          ))}
        </Flex>
      </CardBody>

    </Card.Root>
  );
}

export default BlogCard;
