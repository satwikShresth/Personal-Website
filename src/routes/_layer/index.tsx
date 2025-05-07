import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_layer/')({
  loader: () => {
    throw redirect({ to: "/home" })
  },
})
