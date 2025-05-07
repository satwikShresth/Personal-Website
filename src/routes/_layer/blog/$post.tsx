import { createFileRoute } from '@tanstack/react-router'
import mdx from '@/components/mdx'
import { Blog } from '@/components/Blog'

export const Route = createFileRoute('/_layer/blog/$post')({
  loader: ({ params: { post } }) => {
    return mdx[post]
  },
  component: () => {
    const { metadata, component } = Route.useLoaderData();
    return (
      <>
        <Blog.Post MdxCompoenent={component} metadata={metadata} />
      </>
    )
  }
})

