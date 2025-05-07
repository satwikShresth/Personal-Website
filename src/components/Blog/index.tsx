import Card from "./Card";
import Post from "./Post";
import { BlogMetadataProvider } from "./store";
import type { ReactNode } from "react";

export const Blog = {
  Root: ({ blogPosts, children }: { blogPosts: any, children: ReactNode }) => {  // Fixed children prop pattern
    return (
      <BlogMetadataProvider initialValue={{ ...blogPosts }}>
        {children}
      </BlogMetadataProvider>
    );
  },
  Post,
  Card
}
