import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/cases")({
  component: () => <div className="p-6 text-white">Casos (Em breve)</div>,
});
