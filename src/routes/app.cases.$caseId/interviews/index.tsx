import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/cases/$caseId/interviews/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/cases/$caseId/interviews/"!</div>
}
