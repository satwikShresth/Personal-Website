import { create } from 'zustand'
import { createZustandContext } from 'zustand-context'
import { persist } from 'zustand/middleware'

export type BlogMetadata = {
  title: string
  date: string
  description: string
  tags: Array<string>
  slug?: string
  estimatedReadTime?: number
}

export type BlogPost = {
  component: any
  metadata: BlogMetadata
}

export type BlogPosts = {
  [slug: string]: BlogPost
}

export type BlogMetadataStore = {
  // State
  blogPosts: Array<BlogMetadata>
  componentPaths: Record<string, string> // Maps slug to component path/name
  selectedTags: Array<string>
  searchQuery: string
  readPosts: Array<string> // Stores slugs of read posts
  currentPost: string | null // Current post slug

  // Selectors
  getFilteredPosts: () => Array<BlogMetadata>
  getAllTags: () => Array<string>
  getRandomPosts: (count: number) => Array<BlogMetadata>
  getReadPosts: () => Array<BlogMetadata>
  getUnreadPosts: () => Array<BlogMetadata>
  searchByTitle: (query: string) => Array<BlogMetadata>
  searchByTags: (tags: Array<string>) => Array<BlogMetadata>
  getBlogPostBySlug: (slug: string) => BlogMetadata | undefined
  getComponentPathBySlug: (slug: string) => string | undefined

  // Actions
  setSelectedTags: (tags: Array<string>) => void
  setSearchQuery: (query: string) => void
  markPostAsRead: (slug: string) => void
  setCurrentPost: (slug: string | null) => void
}

export const [BlogMetadataProvider, useBlogMetadataStore] =
  createZustandContext((initialState: { blogPosts?: BlogPosts }) =>
    create<BlogMetadataStore>()(
      persist(
        (set, get) => {
          const processedBlogPosts: Array<BlogMetadata> = []
          const processedComponentPaths: Record<string, string> = {}

          Object.entries(initialState).forEach(([slug, post]) => {
            processedBlogPosts.push({
              ...post.metadata,
              slug,
            })
            processedComponentPaths[slug] = slug
          })

          return {
            blogPosts: processedBlogPosts,
            componentPaths: processedComponentPaths,
            selectedTags: [],
            searchQuery: '',
            readPosts: [],
            currentPost: null,

            // Actions
            setSelectedTags: (tags) => set({ selectedTags: tags }),

            setSearchQuery: (query) => set({ searchQuery: query }),

            markPostAsRead: (slug) =>
              set((state) => {
                if (state.readPosts.includes(slug)) {
                  return state
                }
                return { readPosts: [...state.readPosts, slug] }
              }),

            setCurrentPost: (slug) => {
              // Mark post as read when setting it as current
              if (slug) {
                get().markPostAsRead(slug)
              }
              set({ currentPost: slug })
            },

            // Selectors
            getFilteredPosts: () => {
              const { blogPosts, selectedTags, searchQuery } = get()

              return blogPosts.filter((post) => {
                // Filter by search query
                const matchesSearch = searchQuery
                  ? post.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    post.description
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  : true

                // Filter by tags
                const matchesTags = selectedTags.length
                  ? selectedTags.some((tag) => post.tags.includes(tag))
                  : true

                return matchesSearch && matchesTags
              })
            },

            getAllTags: () => {
              const { blogPosts } = get()
              const allTags = new Set<string>()

              blogPosts.forEach((post) => {
                post.tags.forEach((tag) => allTags.add(tag))
              })

              return Array.from(allTags).sort()
            },

            getRandomPosts: (count) => {
              const { blogPosts, currentPost } = get()

              // Filter out the current post
              const availablePosts = currentPost
                ? blogPosts.filter((post) => post.slug !== currentPost)
                : blogPosts

              if (availablePosts.length <= count) {
                return availablePosts
              }

              // Get random posts
              const randomPosts: Array<BlogMetadata> = []
              const tempPosts = [...availablePosts]

              for (let i = 0; i < count && tempPosts.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * tempPosts.length)
                randomPosts.push(tempPosts[randomIndex])
                tempPosts.splice(randomIndex, 1)
              }

              return randomPosts
            },

            getReadPosts: () => {
              const { blogPosts, readPosts } = get()
              return blogPosts.filter(
                (post) => post.slug && readPosts.includes(post.slug),
              )
            },

            getUnreadPosts: () => {
              const { blogPosts, readPosts } = get()
              return blogPosts.filter(
                (post) => !post.slug || !readPosts.includes(post.slug),
              )
            },

            searchByTitle: (query) => {
              const { blogPosts } = get()
              if (!query) return []

              const lowercaseQuery = query.toLowerCase()
              return blogPosts.filter((post) =>
                post.title.toLowerCase().includes(lowercaseQuery),
              )
            },

            searchByTags: (tags) => {
              const { blogPosts } = get()
              if (!tags.length) return blogPosts

              return blogPosts.filter((post) =>
                tags.some((tag) => post.tags.includes(tag)),
              )
            },

            getBlogPostBySlug: (slug) => {
              const { blogPosts } = get()
              return blogPosts.find((post) => post.slug === slug)
            },

            getComponentPathBySlug: (slug) => {
              const { componentPaths } = get()
              return componentPaths[slug]
            },
          }
        },
        {
          name: 'blog-metadata-storage',
          partialize: (state) => ({ readPosts: state.readPosts }), // Only persist readPosts
        },
      ),
    ),
  )
