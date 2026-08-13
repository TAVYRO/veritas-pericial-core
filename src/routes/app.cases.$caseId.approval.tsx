import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/app/cases/$caseId/approval")({
  component: () => <Navigate to="/app/cases/$caseId/approvals" params={Route.useParams()} />,
});
