import { createFileRoute } from "@tanstack/react-router";
import { CaseShell } from "@/components/veritas/CaseShell";

export const Route = createFileRoute("/app/cases/$caseId")({
  component: CaseShell,
});
