import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/record")({
  component: () => <div className="p-6 text-white">Gravar Entrevista (Em breve)</div>,
});
