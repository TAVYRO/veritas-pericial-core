import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/record/session")({
  component: () => <div>Gravação em Andamento</div>,
});
