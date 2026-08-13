import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/cases/$caseId/final/inspection')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/cases/$caseId/final/inspection"!</div>
}
