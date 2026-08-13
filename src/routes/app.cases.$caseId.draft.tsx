import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/app/cases/$caseId/draft")({
  component: () => <div className="p-6 text-white">Rascunho (Em breve)</div>
});
