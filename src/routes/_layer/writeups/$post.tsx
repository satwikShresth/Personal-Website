import { createFileRoute } from '@tanstack/react-router';
import posts from '@/posts';
import { Writeup } from '@/components/Writeup';

export const Route = createFileRoute('/_layer/writeups/$post')({
   loader: ({ params: { post } }) => {
      return posts[post];
   },
   component: () => {
      const { metadata, component } = Route.useLoaderData();
      return <Writeup.Post MdxCompoenent={component} metadata={metadata} />;
   }
});
