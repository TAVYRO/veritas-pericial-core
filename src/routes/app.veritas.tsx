import { createFileRoute, Link } from "@tanstack/react-router";
import { BottomNavigation } from "@/components/veritas/BottomNavigation";
import { ChevronRight, Sparkles, BookOpen, FileText, History } from "lucide-react";

export const Route = createFileRoute("/app/veritas")({
  component: VeritasSkillScreen,
});

function VeritasSkillScreen() {
  return (
    <div className="min-h-screen bg-[#0A0D14] pb-24 text-white selection:bg-veritas-electric/30">
      {/* Grid background effect */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 px-6 pt-[calc(1.5rem+env(safe-area-inset-top))] pb-6 bg-[#0A0D14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-veritas-electric animate-pulse-glow" />
          <h1 className="text-xl font-semibold tracking-tight">Veritas</h1>
        </div>
        <p className="text-white/50 text-sm">Como deseja trabalhar?</p>
      </header>

      <main className="p-6 space-y-6 relative">
        {/* Main Cards */}
        <div className="grid gap-4">
          {/* Card 1: Fazer tudo de uma vez */}
          <Link
            to="/app/cases/new/process"
            search={{ mode: "automatic" }}
            className="group block p-5 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-veritas-electric/40 hover:bg-white/[0.12] transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-veritas-electric/20 border border-veritas-electric/30">
                <Sparkles className="w-6 h-6 text-veritas-electric" />
              </div>
              <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-veritas-electric group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-medium mb-2">FAZER TUDO DE UMA VEZ</h3>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Envie o material bruto. A Veritas organiza fontes, estrutura o caso, verifica lacunas
              e prepara o rascunho para revisão profissional.
            </p>
            <div className="inline-flex items-center text-sm font-medium text-veritas-electric group-hover:underline">
              Começar
            </div>
          </Link>

          {/* Card 2: Passo a passo */}
          <Link
            to="/app/cases/new/process"
            search={{ mode: "guided" }}
            className="group block p-5 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-veritas-violet/40 hover:bg-white/[0.12] transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-xl bg-veritas-violet/20 border border-veritas-violet/30">
                <BookOpen className="w-6 h-6 text-veritas-violet" />
              </div>
              <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-veritas-violet group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-lg font-medium mb-2">FAZER PASSO A PASSO</h3>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Conduza o caso por materiais, quesitos, entrevistas, suficiência, redação e auditoria.
            </p>
            <div className="inline-flex items-center text-sm font-medium text-veritas-violet group-hover:underline">
              Iniciar modo guiado
            </div>
          </Link>

          <div className="grid grid-cols-2 gap-4">
            {/* Card 3: Revisar */}
            <Link
              to="/app/review"
              className="group block p-5 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-white/30 hover:bg-white/[0.12] transition-all duration-300"
            >
              <FileText className="w-6 h-6 text-white/60 mb-3 group-hover:text-white transition-colors" />
              <h3 className="text-base font-medium mb-2 uppercase text-[13px] tracking-wide">
                Revisar documento
              </h3>
              <p className="text-[11px] text-white/40 leading-relaxed">
                Revise estrutura, coerência, fontes, quesitos, competências e possíveis resíduos de
                outro processo.
              </p>
            </Link>

            {/* Card 4: Continuar */}
            <Link
              to="/app/cases/continue"
              className="group block p-5 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-white/30 hover:bg-white/[0.12] transition-all duration-300"
            >
              <History className="w-6 h-6 text-white/60 mb-3 group-hover:text-white transition-colors" />
              <h3 className="text-base font-medium mb-2 uppercase text-[13px] tracking-wide">
                Continuar um caso
              </h3>
              <p className="text-[11px] text-white/40 leading-relaxed">
                Retome exatamente a etapa de um trabalho já iniciado.
              </p>
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 mt-8">
          <p className="text-[11px] leading-relaxed text-white/40 text-center italic">
            Veritas auxilia. A avaliação, interpretação, decisão e responsabilidade permanecem com a
            profissional.
          </p>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
