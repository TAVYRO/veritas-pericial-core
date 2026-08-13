import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/app/cases/$caseId/audit")({
  component: () => <div className="p-6 text-white">Auditoria (Em breve)</div>
});
