import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/review_/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/review_/"!</div>
}
