import { createFileRoute } from '@tanstack/react-router'
import posts from '@/posts'
import { Activities } from '@/components/Writeup'

export const Route = createFileRoute('/_layer/writeups/$post')({
  loader: ({ params: { post } }) => {
    return posts[post]
  },
  component: () => {
    const { metadata, component } = Route.useLoaderData()
    return (<Activities.Post MdxCompoenent={component} metadata={metadata} />)
  },
})
