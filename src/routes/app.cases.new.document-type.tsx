import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/app/cases/new/document-type")({
  validateSearch: (search) => z.object({
    mode: z.string().optional(),
    caseNumber: z.string().optional(),
    professionals: z.array(z.string()).optional(),
  }).parse(search),
  component: () => <div>Document Type (Placeholder)</div>,
});
