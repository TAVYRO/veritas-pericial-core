import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { FileText, Edit3, MessageSquare, Check, X, RefreshCw, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/cases/$caseId/draft")({
  component: DraftPage,
});

function DraftPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/draft" });

  return (
    <div className="flex flex-col h-full bg-veritas-ink">
      {/* Permanent Status Bar */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Rascunho — Não Finalizado</span>
        </div>
        <div className="flex gap-4">
           <Link to="/app/cases/$caseId/draft/edit" params={{ caseId }} className="text-[10px] font-bold text-veritas-electric uppercase tracking-widest hover:underline">
             Abrir Editor
           </Link>
           <Link to="/app/cases/$caseId/draft/questions" params={{ caseId }} className="text-[10px] font-bold text-veritas-violet uppercase tracking-widest hover:underline">
             Responder Quesitos
           </Link>
        </div>
      </div>

      <div className="p-6 space-y-8 pb-32 overflow-y-auto">
        {/* Document Content */}
        <div className="bg-white shadow-2xl rounded-sm p-8 max-w-2xl mx-auto text-black font-serif min-h-[1000px] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none select-none">
            <h1 className="text-4xl font-bold rotate-12">RASCUNHO</h1>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-justify">
            <div className="text-center space-y-1 mb-8">
              <p className="font-bold uppercase">Tribunal de Justiça do Estado de São Paulo</p>
              <p className="uppercase">1ª Vara Cível - Foro Central</p>
              <p className="text-xs italic">Processo nº 0000000-00.2024.8.26.0000</p>
            </div>

            <section>
              <h3 className="font-bold uppercase border-b border-black/10 pb-1 mb-3">1. Identificação</h3>
              <p>O presente relatório técnico refere-se à avaliação psicológica e social da criança P.S.S., filho de Maria Silva e João Santos, no âmbito da ação de regulamentação de visitas.</p>
            </section>

            <section className="relative group">
              <h3 className="font-bold uppercase border-b border-black/10 pb-1 mb-3">2. Metodologia</h3>
              <p>Foram realizadas entrevistas individuais com os genitores, observação lúdica com a criança e análise documental dos autos. <span className="bg-amber-200 px-1 rounded">[PENDENTE: Visita domiciliar]</span></p>
            </section>

            <section className="bg-veritas-electric/5 p-4 rounded-md border border-veritas-electric/20 my-6">
              <div className="flex items-center gap-2 mb-2 text-veritas-electric">
                <RefreshCw className="w-3 h-3" />
                <span className="text-[9px] font-bold uppercase tracking-widest">✨ Sugestão Veritas</span>
              </div>
              <p className="text-xs italic text-veritas-electric/80 leading-relaxed">
                "Observa-se na dinâmica interacional uma tendência à triangulação do conflito conjugal na figura da criança, o que pode caracterizar, em análise preliminar, prejuízo ao desenvolvimento emocional saudável."
              </p>
              <div className="flex gap-2 mt-3">
                <button className="px-2 py-1 bg-veritas-electric text-white text-[9px] font-bold uppercase rounded">Aceitar</button>
                <button className="px-2 py-1 bg-white border border-veritas-electric/20 text-veritas-electric text-[9px] font-bold uppercase rounded">Ignorar</button>
              </div>
            </section>

            <section>
              <h3 className="font-bold uppercase border-b border-black/10 pb-1 mb-3">3. Análise Técnica</h3>
              <p>A genitora Maria Silva relata dificuldades na comunicação com o genitor, afirmando que este não demonstra interesse genuíno nas necessidades rotineiras do filho. <span className="bg-emerald-100 text-emerald-800 px-1 rounded">[CONFIRMAR: Relato F01]</span></p>
              <p className="mt-2">Por outro lado, o genitor João Santos sustenta que suas tentativas de aproximação são sistematicamente frustradas por intervenções da família materna.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}