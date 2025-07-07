import { createFileRoute } from '@tanstack/react-router'
import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Input,
  Portal,
  Select,
  SimpleGrid,
  Text,
  createListCollection,
} from '@chakra-ui/react'
import { FaFilter } from 'react-icons/fa'
import { useBlogMetadataStore } from '@/components/Blog/store'
import { Blog } from '@/components/Blog'
import { useColorModeValue } from '@/components/ui/color-mode'

export const Route = createFileRoute('/_layer/blog/')({
  component: BlogPage,
})

function BlogPage() {
  const {
    selectedTags,
    searchQuery,
    getAllTags,
    getFilteredPosts,
    setSelectedTags,
    setSearchQuery,
  } = useBlogMetadataStore()
  const headingColor = useColorModeValue('gray.800', 'white')

  const tags = createListCollection({
    items: getAllTags().map((value) => ({ label: value, value })),
  })
  const filteredPosts = getFilteredPosts()

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <>
      <Box textAlign="left" mb={10}>
        <Heading
          as="h1"
          fontSize={{ base: '4xl', md: '6xl' }}
          fontWeight="extrabold"
          color={headingColor}
          mb={6}
        >
          Explore{' '}
          <Box as="span" color={'accent'}>
            Blogs
          </Box>
        </Heading>

        <Text
          fontSize={{ base: 'xl', md: '2xl' }}
          maxW="container.lg"
          mx="auto"
          opacity={0.9}
          letterSpacing="wide"
        >
          Random brain dumps: occasional flair and inevitable tangents.
        </Text>
      </Box>

      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align={{ base: 'stretch', md: 'center' }}
        gap={4}
        mb={4}
      >
        {/* Search */}
        <Box width={{ base: '100%', md: '40%' }}>
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearchChange}
            borderRadius="lg"
          ></Input>
        </Box>

        {/* Filter Controls */}
        <HStack>
          <Select.Root
            collection={tags}
            multiple
            width="150px"
            value={selectedTags}
            onValueChange={(e) => setSelectedTags(e.value)}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Tags" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {tags?.items?.map((tags) => (
                    <Select.Item item={tags} key={tags.value}>
                      {tags.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        </HStack>
      </Flex>

      {/* Blog Posts Grid */}
      <Box>
        <HStack mb={4}>
          <Heading as="h2" size="lg">
            All Posts
          </Heading>
          <Badge fontSize="md" borderRadius="full">
            {filteredPosts.length}
          </Badge>
        </HStack>

        {filteredPosts.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={'5'}>
            {filteredPosts.map((post) => (
              <Blog.Card
                key={post.slug}
                slug={post.slug || 'default-slug'}
                title={post.title}
                date={post.date}
                description={post.description}
                tags={post.tags}
                estimatedReadTime={post.estimatedReadTime}
                variant="normal"
              />
            ))}
          </SimpleGrid>
        ) : (
          <Box textAlign="center" py={10} borderRadius="lg">
            <Icon as={FaFilter} fontSize="3xl" mb={3} />
            <Text fontSize="lg">No posts match your filters.</Text>
            <Text color="gray.500">
              Try adjusting your search or tag selections.
            </Text>

            {selectedTags.length > 0 && (
              <Button
                borderRadius={'lg'}
                mt={4}
                color="accent"
                variant="outline"
                onClick={() => setSelectedTags([])}
              >
                Clear Tag Filters
              </Button>
            )}

            {searchQuery && (
              <Button
                borderRadius={'lg'}
                mt={4}
                ml={selectedTags.length > 0 ? 2 : 0}
                color="accent"
                variant="outline"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </Button>
            )}
          </Box>
        )}
      </Box>
    </>
  )
}
