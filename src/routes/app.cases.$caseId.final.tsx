import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/app/cases/$caseId/final")({
  component: () => <div className="p-6 text-white">Final (Em breve)</div>
});
