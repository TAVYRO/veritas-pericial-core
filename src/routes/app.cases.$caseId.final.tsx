import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Download, FileText, FileDown, Inspect, CheckCircle2, Sparkles, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/app/cases/$caseId/final")({
  component: FinalPage,
});

function FinalPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/final" });

  return (
    <div className="p-6 space-y-8 pb-32">
      <header className="text-center space-y-4">
        <div className="w-16 h-16 bg-veritas-electric/10 rounded-3xl mx-auto flex items-center justify-center border border-veritas-electric/20 animate-pulse-glow">
          <Sparkles className="w-8 h-8 text-veritas-electric" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight italic">Conclusão Documental</h2>
          <p className="text-xs text-white/40 mt-1 uppercase tracking-[0.2em] font-bold">Versão Oficial de Entrega</p>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-4 text-center group hover:bg-white/10 transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">DOCX FINAL</h3>
            <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold mt-1">Microsoft Word</p>
          </div>
          <Download className="w-4 h-4 text-white/20 group-hover:text-white/60" />
        </div>

        <div className="bg-white/5 border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-4 text-center group hover:bg-white/10 transition-all cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
            <FileDown className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">PDF FINAL</h3>
            <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold mt-1">Adobe Portable</p>
          </div>
          <Download className="w-4 h-4 text-white/20 group-hover:text-white/60" />
        </div>
      </div>

      <div className="space-y-4">
        <Link 
          to="/app/cases/$caseId/final/inspection" 
          params={{ caseId }}
          className="w-full bg-veritas-graphite border border-white/5 p-5 rounded-2xl flex items-center justify-between group hover:border-veritas-electric/40 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-veritas-electric transition-colors">
              <Inspect className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Inspeção Visual Final</h3>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Verificar formatação e equivalência</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-veritas-electric transition-all" />
        </Link>
      </div>

      <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center gap-4">
        <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
        <div>
          <h4 className="text-sm font-bold text-white">Documento final pronto para entrega</h4>
          <p className="text-xs text-white/60 leading-relaxed">Versão final aprovada e preparada para utilização pela profissional responsável.</p>
        </div>
      </div>
    </div>
  );
}