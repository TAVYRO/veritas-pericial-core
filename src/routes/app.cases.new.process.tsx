import { createFileRoute } from "@tanstack/react-router";
import { BottomNavigation } from "@/components/veritas/BottomNavigation";
import { z } from "zod";

export const Route = createFileRoute("/app/cases/new/process")({
  validateSearch: (search) => z.object({
    mode: z.enum(["automatic", "guided"]).optional(),
  }).parse(search),
  component: () => (
    <div className="min-h-screen veritas-hero-gradient pb-24 text-white">
      <div className="p-6">Novo Processo (Em breve)</div>
      <BottomNavigation />
    </div>
  ),
});
