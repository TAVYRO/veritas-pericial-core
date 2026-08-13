import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/cases/$caseId/blocks')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/cases/$caseId/blocks"!</div>
}
