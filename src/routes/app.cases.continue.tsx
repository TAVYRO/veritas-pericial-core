import { createFileRoute } from "@tanstack/react-router";
import { BottomNavigation } from "@/components/veritas/BottomNavigation";

export const Route = createFileRoute("/app/cases/continue")({
  component: () => (
    <div className="min-h-screen veritas-hero-gradient pb-24 text-white">
      <div className="p-6">Continuar um Caso (Em breve)</div>
      <BottomNavigation />
    </div>
  ),
});
