import Card from './Card'
import Post from './Post'
import { ActivityMetadataProvider } from './store'
import type { ReactNode } from 'react'

export const Activities = {
  Root: ({ posts, children }: { posts: any; children: ReactNode }) => {
    // Fixed children prop pattern
    return (
      <ActivityMetadataProvider initialValue={{ ...posts }}>
        {children}
      </ActivityMetadataProvider>
    )
  },
  Post,
  Card,
}
