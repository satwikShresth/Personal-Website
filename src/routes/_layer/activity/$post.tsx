import { createFileRoute } from '@tanstack/react-router'
import posts from '@/posts'
import { Activities } from '@/components/Activity'

export const Route = createFileRoute('/_layer/activity/$post')({
  loader: ({ params: { post } }) => {
    return posts[post]
  },
  component: () => {
    const { metadata, component } = Route.useLoaderData()
    return (<Activities.Post MdxCompoenent={component} metadata={metadata} />)
  },
})
