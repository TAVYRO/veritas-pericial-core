import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/app/cases/$caseId/review")({
  component: () => <Navigate to="/app/cases/$caseId/professional-review" params={Route.useParams()} />,
});
