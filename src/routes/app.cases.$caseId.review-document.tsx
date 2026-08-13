import { createFileRoute } from "@tanstack/react-router";
import { Eye, FileText, Lock } from "lucide-react";

export const Route = createFileRoute("/app/cases/$caseId/review-document")({
  component: ReviewDocumentPage,
});

function ReviewDocumentPage() {
  return (
    <div className="p-6 space-y-6 pb-32">
      <header className="space-y-1">
        <h2 className="text-xl font-bold text-white tracking-tight">Preview do Documento</h2>
        <p className="text-xs text-white/40">Visualização prévia da estrutura final.</p>
      </header>

      <div className="relative group">
        {/* Document Preview Frame */}
        <div className="bg-white shadow-2xl rounded-sm p-12 max-w-2xl mx-auto text-black/20 font-serif min-h-[800px] relative overflow-hidden select-none pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center rotate-[-30deg]">
            <h1 className="text-6xl font-bold opacity-5 uppercase tracking-[2em]">REVISÃO</h1>
          </div>
          
          <div className="space-y-8 blur-[1px]">
            <div className="text-center space-y-2 mb-12 border-b border-black/5 pb-8">
              <div className="h-4 bg-black/5 w-48 mx-auto" />
              <div className="h-3 bg-black/5 w-32 mx-auto" />
            </div>

            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-black/5 w-24" />
                <div className="space-y-2">
                  <div className="h-3 bg-black/5 w-full" />
                  <div className="h-3 bg-black/5 w-full" />
                  <div className="h-3 bg-black/5 w-4/5" />
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-12 left-0 right-0 text-center border-t border-black/5 pt-8 mx-12">
            <div className="h-10 bg-black/5 w-64 mx-auto rounded" />
          </div>
        </div>

        {/* Overlay Notice */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0D14]/60 backdrop-blur-[2px] rounded-sm transition-all group-hover:bg-[#0A0D14]/40">
          <div className="bg-veritas-graphite border border-white/10 p-6 rounded-2xl flex flex-col items-center gap-4 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
              <Lock className="w-6 h-6 text-white/40" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Documento para revisão — sem assinatura</h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Esta versão não possui validade jurídica.</p>
            </div>
            <button className="px-6 py-2 bg-veritas-electric text-white text-[10px] font-bold uppercase tracking-widest rounded-lg flex items-center gap-2">
              <Eye className="w-3 h-3" />
              Ver Detalhes da Revisão
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}