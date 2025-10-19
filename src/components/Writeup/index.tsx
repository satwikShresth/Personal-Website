import Card from './Card';
import Post from './Post';
import { WriteupMetadataProvider } from './store';
import type { ReactNode } from 'react';

export const Writeup = {
   Root: ({ posts, children }: { posts: any; children: ReactNode }) => {
      return (
         <WriteupMetadataProvider initialValue={{ ...posts }}>
            {children}
         </WriteupMetadataProvider>
      );
   },
   Post,
   Card
};
