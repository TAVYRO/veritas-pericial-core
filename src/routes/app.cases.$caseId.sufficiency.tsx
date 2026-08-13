import { createFileRoute } from "@tanstack/react-router";
import { BottomNavigation } from "@/components/veritas/BottomNavigation";

export const Route = createFileRoute("/app/cases/$caseId/sufficiency")({
  component: () => <div className="p-6 text-white">Suficiência (Em breve)</div>
});
