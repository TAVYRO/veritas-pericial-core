import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register/profile")({
  component: () => (
    <div className="min-h-screen veritas-hero-gradient flex flex-col p-6 items-center justify-center">
      <h1 className="text-2xl font-bold text-veritas-silver">Etapa 3 (Em breve)</h1>
    </div>
  ),
});