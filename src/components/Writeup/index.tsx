import Card from './Card';
import Post from './Post';
import { WriteupMetadataProvider } from './store';
import type { ReactNode } from 'react';

export const Activities = {
   Root: ({ posts, children }: { posts: any; children: ReactNode }) => {
      // Fixed children prop pattern
      return (
         <WriteupMetadataProvider initialValue={{ ...posts }}>
            {children}
         </WriteupMetadataProvider>
      );
   },
   Post,
   Card
};
