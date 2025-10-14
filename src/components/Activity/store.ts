import { create } from 'zustand'
import { createZustandContext } from 'zustand-context'
import { persist } from 'zustand/middleware'

export type ActivityMetadata = {
  title: string
  date: string
  description: string
  tags: Array<string>
  slug?: string
  estimatedReadTime?: number
}

export type ActivityPost = {
  component: any
  metadata: ActivityMetadata
}

export type ActivityPosts = {
  [slug: string]: ActivityPost
}

export type ActivityMetadataStore = {
  // State
  activityPosts: Array<ActivityMetadata>
  componentPaths: Record<string, string> // Maps slug to component path/name
  selectedTags: Array<string>
  searchQuery: string
  readPosts: Array<string> // Stores slugs of read posts
  currentPost: string | null // Current post slug

  // Selectors
  getFilteredPosts: () => Array<ActivityMetadata>
  getAllTags: () => Array<string>
  getRandomPosts: (count: number) => Array<ActivityMetadata>
  getReadPosts: () => Array<ActivityMetadata>
  getUnreadPosts: () => Array<ActivityMetadata>
  searchByTitle: (query: string) => Array<ActivityMetadata>
  searchByTags: (tags: Array<string>) => Array<ActivityMetadata>
  getActivityPostBySlug: (slug: string) => ActivityMetadata | undefined
  getComponentPathBySlug: (slug: string) => string | undefined

  // Actions
  setSelectedTags: (tags: Array<string>) => void
  setSearchQuery: (query: string) => void
  markPostAsRead: (slug: string) => void
  setCurrentPost: (slug: string | null) => void
}

export const [ActivityMetadataProvider, useActivityMetadataStore] =
  createZustandContext((initialState: { activityPosts?: ActivityPosts }) =>
    create<ActivityMetadataStore>()(
      persist(
        (set, get) => {
          const processedActivityPosts: Array<ActivityMetadata> = []
          const processedComponentPaths: Record<string, string> = {}

          Object.entries(initialState).forEach(([slug, post]) => {
            // @ts-ignore: somthing
            processedActivityPosts.push({
              ...post.metadata,
              slug,
            })
            processedComponentPaths[slug] = slug
          })

          return {
            activityPosts: processedActivityPosts,
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
              const { activityPosts, selectedTags, searchQuery } = get()

              return activityPosts.filter((post) => {
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
              const { activityPosts } = get()
              const allTags = new Set<string>()

              activityPosts.forEach((post) => {
                post.tags.forEach((tag) => allTags.add(tag))
              })

              return Array.from(allTags).sort()
            },

            getRandomPosts: (count) => {
              const { activityPosts, currentPost } = get()

              // Filter out the current post
              const availablePosts = currentPost
                ? activityPosts.filter((post) => post.slug !== currentPost)
                : activityPosts

              if (availablePosts.length <= count) {
                return availablePosts
              }

              // Get random posts
              const randomPosts: Array<ActivityMetadata> = []
              const tempPosts = [...availablePosts]

              for (let i = 0; i < count && tempPosts.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * tempPosts.length)
                randomPosts.push(tempPosts[randomIndex])
                tempPosts.splice(randomIndex, 1)
              }

              return randomPosts
            },

            getReadPosts: () => {
              const { activityPosts, readPosts } = get()
              return activityPosts.filter(
                (post) => post.slug && readPosts.includes(post.slug),
              )
            },

            getUnreadPosts: () => {
              const { activityPosts, readPosts } = get()
              return activityPosts.filter(
                (post) => !post.slug || !readPosts.includes(post.slug),
              )
            },

            searchByTitle: (query) => {
              const { activityPosts } = get()
              if (!query) return []

              const lowercaseQuery = query.toLowerCase()
              return activityPosts.filter((post) =>
                post.title.toLowerCase().includes(lowercaseQuery),
              )
            },

            searchByTags: (tags) => {
              const { activityPosts } = get()
              if (!tags.length) return activityPosts

              return activityPosts.filter((post) =>
                tags.some((tag) => post.tags.includes(tag)),
              )
            },

            getActivityPostBySlug: (slug) => {
              const { activityPosts } = get()
              return activityPosts.find((post) => post.slug === slug)
            },

            getComponentPathBySlug: (slug) => {
              const { componentPaths } = get()
              return componentPaths[slug]
            },
          }
        },
        {
          name: 'activity-metadata-storage',
          partialize: (state) => ({ readPosts: state.readPosts }), // Only persist readPosts
        },
      ),
    ),
  )
