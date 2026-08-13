import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/app/cases/new/review")({
  validateSearch: (search) => z.object({
    mode: z.string().optional(),
    caseNumber: z.string().optional(),
    professionals: z.array(z.string()).optional(),
    docType: z.string().optional(),
  }).parse(search),
  component: () => <div>Review (Placeholder)</div>,
});
