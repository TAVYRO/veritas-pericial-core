import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/profile/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/profile/edit"!</div>
}
