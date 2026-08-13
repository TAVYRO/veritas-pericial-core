import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/profile")({
  component: () => <div className="p-6 text-white">Perfil (Em breve)</div>,
});
