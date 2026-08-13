import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/cases/demo-case")({
  component: () => <div className="p-6 text-white bg-veritas-graphite-dark min-h-screen">Detalhes do Caso (Demonstração)</div>,
});