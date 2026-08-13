import { createFileRoute } from "@tanstack/react-router";
import { BottomNavigation } from "@/components/veritas/BottomNavigation";

export const Route = createFileRoute("/app/veritas")({
  component: () => (
    <div className="min-h-screen veritas-hero-gradient pb-24 text-white">
      <div className="p-6">IA Veritas (Em breve)</div>
      <BottomNavigation />
    </div>
  ),
});
