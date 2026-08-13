import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/cases/$caseId/signatures')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/cases/$caseId/signatures"!</div>
}
