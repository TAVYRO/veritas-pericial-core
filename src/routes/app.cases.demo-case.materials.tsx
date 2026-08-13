import { createFileRoute } from "@tanstack/react-router";
import { BottomNavigation } from "@/components/veritas/BottomNavigation";

export const Route = createFileRoute("/app/cases/demo-case/materials")({
  component: () => (
    <div className="min-h-screen veritas-hero-gradient pb-24 text-white">
      <div className="p-6">Materiais do Caso (Demo)</div>
      <BottomNavigation />
    </div>
  ),
});
