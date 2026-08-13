import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/search")({
  component: () => <div className="p-6 text-white">Busca (Em breve)</div>,
});
