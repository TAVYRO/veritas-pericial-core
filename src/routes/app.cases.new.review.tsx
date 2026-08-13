import { createFileRoute, Link } from "@tanstack/react-router";
import { BottomNavigation } from "@/components/veritas/BottomNavigation";
import { z } from "zod";
import { ChevronRight, FileText, User, Scale, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/cases/new/review")({
  validateSearch: (search) => z.object({
    mode: z.string().optional(),
    caseNumber: z.string().optional(),
    professionals: z.array(z.string()).optional(),
    docType: z.string().optional(),
  }).parse(search),
  component: ReviewPage,
});

function ReviewPage() {
  const { mode, caseNumber, professionals = [], docType } = Route.useSearch();

  return (
    <div className="min-h-screen bg-[#0A0D14] pb-24 text-white">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
      
      <header className="sticky top-0 z-50 px-6 pt-[calc(1.5rem+env(safe-area-inset-top))] pb-6 bg-[#0A0D14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <Link to="/app/cases/new/document-type" search={{ mode, caseNumber, professionals }} className="text-white/40 hover:text-white transition-colors">
            Voltar
          </Link>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="w-8 h-1 rounded-full bg-veritas-electric" />
            ))}
          </div>
          <div className="w-12" />
        </div>
        <h1 className="text-xl font-semibold tracking-tight">Revisão Final</h1>
        <p className="text-white/40 text-xs mt-1">Confirme os dados antes de iniciar</p>
      </header>

      <main className="p-6 space-y-6 relative">
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
            <div className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-veritas-electric shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-white/30">Processo</p>
                <p className="text-sm font-medium">{caseNumber || "0000000-00.2024.8.26.0000"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-veritas-violet shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-white/30">Modo de Operação</p>
                <p className="text-sm font-medium capitalize">{mode === 'automatic' ? 'Totalmente Automatizado' : 'Modo Guiado'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-veritas-electric shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-white/30">Profissionais</p>
                <p className="text-sm font-medium">{professionals.length} selecionado(s)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-veritas-violet shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-white/30">Modalidade</p>
                <p className="text-sm font-medium">{docType}</p>
              </div>
            </div>
          </div>
        </div>

        <Button 
          className="w-full h-14 rounded-2xl bg-veritas-electric hover:bg-veritas-electric/90 text-white font-semibold text-lg shadow-xl shadow-veritas-electric/20"
          asChild
        >
          <Link to="/app/cases/demo-case/materials">
            Criar ambiente do caso
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>

        <p className="text-[10px] text-white/20 text-center px-4">
          Ao criar o ambiente, a Veritas iniciará o processamento preliminar dos dados fornecidos.
        </p>
      </main>

      <BottomNavigation />
    </div>
  );
}
