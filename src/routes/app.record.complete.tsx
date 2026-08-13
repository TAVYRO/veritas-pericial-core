import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/record/complete")({
  component: () => <div>Gravação Finalizada</div>,
});
