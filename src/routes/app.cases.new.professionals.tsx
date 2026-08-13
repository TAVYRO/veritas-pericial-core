import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/app/cases/new/professionals")({
  validateSearch: (search) => z.object({
    mode: z.string().optional(),
    caseNumber: z.string().optional(),
  }).parse(search),
  component: () => <div>Professionals (Placeholder)</div>,
});
