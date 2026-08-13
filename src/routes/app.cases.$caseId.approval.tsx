import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/app/cases/$caseId/approval")({
  component: () => <div className="p-6 text-white">Aprovação (Em breve)</div>
});
