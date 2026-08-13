import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/app/cases/$caseId/review")({
  component: () => <div className="p-6 text-white">Revisão (Em breve)</div>
});
