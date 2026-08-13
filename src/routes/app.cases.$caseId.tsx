import { createFileRoute, redirect } from "@tanstack/react-router";
import { CaseShell } from "@/components/veritas/CaseShell";

export const Route = createFileRoute("/app/cases/$caseId")({
  loader: ({ params }) => {
    // If we land exactly on the case ID, redirect to materials
    if (window.location.pathname === `/app/cases/${params.caseId}`) {
      throw redirect({
        to: "/app/cases/$caseId/materials",
        params: { caseId: params.caseId },
      });
    }
  },
  component: CaseShell,
});
