import { createFileRoute } from "@tanstack/react-router";
import { BottomNavigation } from "@/components/veritas/BottomNavigation";

export const Route = createFileRoute("/app/review")({
  component: () => (
    <div className="min-h-screen veritas-hero-gradient pb-24 text-white">
      <div className="p-6">Revisar Documento Existente (Em breve)</div>
      <BottomNavigation />
    </div>
  ),
});
