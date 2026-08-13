import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  ChevronLeft,
  Save,
  MessageSquare,
  Eye,
  Edit3,
  Check,
  X,
  RefreshCw,
  Search,
} from "lucide-react";

export const Route = createFileRoute("/app/cases/$caseId/draft/edit")({
  component: DraftEditPage,
});

function DraftEditPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/draft/edit" });

  return (
    <div className="flex flex-col h-screen bg-veritas-ink">
      <header className="sticky top-0 z-50 bg-veritas-graphite border-b border-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/app/cases/$caseId/draft"
            params={{ caseId }}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white/40" />
          </Link>
          <h2 className="text-sm font-bold text-white tracking-tight uppercase tracking-widest">
            Editor de Relatório
          </h2>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/60 rounded-lg text-xs font-bold transition-colors">
            Rascunho Salvo
          </button>
          <button className="px-3 py-1.5 bg-veritas-electric text-white rounded-lg text-xs font-bold flex items-center gap-2">
            <Save className="w-3 h-3" />
            Finalizar
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Editor Area */}
        <div className="flex-1 overflow-y-auto p-8 bg-white/5">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  Seção: Metodologia
                </span>
                <div className="flex gap-2">
                  <button className="p-1.5 hover:bg-white/10 rounded text-white/40">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:bg-white/10 rounded text-white/40">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <textarea
                className="w-full bg-transparent text-white text-sm leading-relaxed border-none focus:ring-0 p-0 min-h-[200px] resize-none"
                defaultValue="Foram realizadas entrevistas individuais com os genitores, observação lúdica com a criança e análise documental dos autos. [PENDENTE: Visita domiciliar]"
              />
            </div>

            {/* Suggested Content Card */}
            <div className="bg-veritas-electric/5 border border-veritas-electric/20 p-6 rounded-xl space-y-4 animate-fade-in-up">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-veritas-electric">
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    ✨ Sugestão Veritas
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-veritas-electric text-white rounded-lg hover:bg-veritas-electric/90 transition-colors">
                    <Check className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white/10 text-white/60 rounded-lg hover:bg-white/20 transition-colors">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white/10 text-white/60 rounded-lg hover:bg-white/20 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-white/90 leading-relaxed font-medium">
                "O padrão interacional observado sugere uma dinâmica familiar polarizada, na qual a
                criança é exposta a conteúdos depreciativos acerca da figura paterna, o que
                compromete a neutralidade técnica e o bem-estar psicológico do menor."
              </p>
            </div>
          </div>
        </div>

        {/* Floating Controls Placeholder */}
        <div className="w-16 bg-veritas-graphite border-l border-white/5 flex flex-col items-center py-6 gap-6">
          <button className="p-3 bg-veritas-electric/20 text-veritas-electric rounded-xl">
            <Edit3 className="w-5 h-5" />
          </button>
          <button className="p-3 text-white/20 hover:text-white/40">
            <MessageSquare className="w-5 h-5" />
          </button>
          <button className="p-3 text-white/20 hover:text-white/40">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-3 text-white/20 hover:text-white/40">
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
