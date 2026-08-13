import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/cases/$caseId/")({
  loader: ({ params }) => {
    throw redirect({
      to: "/app/cases/$caseId/materials",
      params: { caseId: params.caseId },
    });
  },
});