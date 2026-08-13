import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/cases/new/process")({
  component: () => <div className="p-6 text-white">Novo Processo (Em breve)</div>,
});
