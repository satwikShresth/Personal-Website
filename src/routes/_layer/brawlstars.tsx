import { createFileRoute } from '@tanstack/react-router'
import PageUnderConstruction from '@/components/PageUnderConstruction'

export const Route = createFileRoute('/_layer/brawlstars')({
  component: () => (<><PageUnderConstruction /></>)
})

