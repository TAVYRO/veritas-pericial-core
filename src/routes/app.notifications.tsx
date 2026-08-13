import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/notifications")({
  component: () => <div className="p-6 text-white">Notificações (Em breve)</div>,
});
