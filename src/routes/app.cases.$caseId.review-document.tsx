import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/cases/$caseId/review-document')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/cases/$caseId/review-document"!</div>
}
