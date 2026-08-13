import { createFileRoute, Link } from "@tanstack/react-router";
import { BottomNavigation } from "@/components/veritas/BottomNavigation";
import { z } from "zod";
import {
  ChevronRight,
  FileText,
  Scale,
  User,
  Calendar,
  MapPin,
  Building2,
  Briefcase,
  Gavel,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/app/cases/new/process")({
  validateSearch: (search) =>
    z
      .object({
        mode: z.enum(["automatic", "guided"]).optional(),
      })
      .parse(search),
  component: NewCaseProcessPage,
});

function NewCaseProcessPage() {
  const { mode } = Route.useSearch();

  return (
    <div className="min-h-screen bg-[#0A0D14] pb-24 text-white">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />

      <header className="sticky top-0 z-50 px-6 pt-[calc(1.5rem+env(safe-area-inset-top))] pb-6 bg-[#0A0D14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <Link to="/app/veritas" className="text-white/40 hover:text-white transition-colors">
            Cancelar
          </Link>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`w-8 h-1 rounded-full ${s === 1 ? "bg-veritas-electric" : "bg-white/10"}`}
              />
            ))}
          </div>
          <div className="w-12" />
        </div>
        <h1 className="text-xl font-semibold tracking-tight">Dados do Processo</h1>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] uppercase tracking-widest font-bold text-white/30">
            Modo:
          </span>
          <span
            className={`text-[10px] uppercase tracking-widest font-bold ${mode === "automatic" ? "text-veritas-electric" : "text-veritas-violet"}`}
          >
            {mode === "automatic" ? "Automático" : "Guiado"}
          </span>
        </div>
      </header>

      <main className="p-6 space-y-8 relative">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white/60 text-xs">Número do Processo</Label>
              <Input
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                placeholder="0000000-00.0000.0.00.0000"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/60 text-xs">Tribunal</Label>
                <Input
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                  placeholder="Ex: TJSP"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white/60 text-xs">Comarca</Label>
                <Input
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                  placeholder="Ex: São Paulo"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/60 text-xs">Vara</Label>
                <Input
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                  placeholder="Ex: 1ª Vara Cível"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white/60 text-xs">Magistrado</Label>
                <Input
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                  placeholder="Nome do Juiz(a)"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white/60 text-xs">Classe</Label>
              <Input
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                placeholder="Ex: Procedimento Comum"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/60 text-xs">Assunto</Label>
              <Input
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                placeholder="Ex: Indenização por Dano Moral"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/60 text-xs">Solicitante</Label>
              <Input
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                placeholder="Juízo, Requerente, Requerido..."
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/60 text-xs">Objeto Inicial</Label>
              <textarea
                className="w-full h-24 p-3 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-veritas-electric transition-all"
                placeholder="Resumo do que deve ser periciado..."
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/60 text-xs">Finalidade</Label>
              <Input
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                placeholder="Ex: Avaliação de Dano"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white/60 text-xs">Prazo (dias)</Label>
                <Input
                  type="number"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20"
                  placeholder="Ex: 30"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white/60 text-xs">Data de Referência</Label>
                <Input type="date" className="bg-white/5 border-white/10 text-white" />
              </div>
            </div>
          </div>
        </div>

        <Button
          className="w-full h-14 rounded-2xl bg-veritas-electric hover:bg-veritas-electric/90 text-white font-semibold text-lg shadow-lg shadow-veritas-electric/20"
          asChild
        >
          <Link
            to="/app/cases/new/professionals"
            search={{ mode, caseNumber: "0000000-00.2024.8.26.0000" }}
          >
            Continuar
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
      </main>

      <BottomNavigation />
    </div>
  );
}
