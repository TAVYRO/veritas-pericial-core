import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, HelpCircle, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/cases/$caseId/draft/questions")({
  component: DraftQuestionsPage,
});

const OFFICIAL_QUESTIONS = [
  {
    id: "Q1",
    author: "Juízo (Magistrado)",
    text: "Existe algum impedimento técnico ou risco para a criança na manutenção do regime de visitas atual?",
    response: "Não foram identificados riscos imediatos à integridade física ou psicológica. Recomenda-se, contudo, a transição assistida para fortalecer o vínculo paterno-filial."
  },
  {
    id: "Q2",
    author: "Ministério Público",
    text: "Há indícios de alienação parental praticada por algum dos genitores?",
    response: "Observa-se dinâmica de alta conflitualidade e triangulação, porém os elementos colhidos até o momento são insuficientes para uma afirmação conclusiva de alienação parental estruturada."
  },
  {
    id: "Q3",
    author: "Assistente Técnico (Genitor)",
    text: "Qual o grau de maturidade emocional da criança para expressar sua vontade real sem influências externas?",
    response: "" // Empty to show "sem elementos"
  }
];

function DraftQuestionsPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/draft/questions" });

  return (
    <div className="flex flex-col h-screen bg-veritas-ink">
      <header className="sticky top-0 z-50 bg-veritas-graphite border-b border-white/5 p-4 flex items-center gap-3">
        <Link to="/app/cases/$caseId/draft" params={{ caseId }} className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <ChevronLeft className="w-5 h-5 text-white/40" />
        </Link>
        <h2 className="text-sm font-bold text-white tracking-tight uppercase tracking-widest">Respostas aos Quesitos</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-32">
        {OFFICIAL_QUESTIONS.map((q) => (
          <div key={q.id} className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="px-2 py-0.5 bg-veritas-violet/20 text-veritas-violet text-[9px] font-bold uppercase tracking-widest rounded">
                  {q.author}
                </span>
                <h3 className="text-sm font-bold text-white leading-tight">{q.id}. {q.text}</h3>
              </div>
              <HelpCircle className="w-5 h-5 text-white/20 shrink-0" />
            </div>

            <div className="space-y-2">
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Resposta Técnica</p>
              {q.response ? (
                <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl">
                  <p className="text-sm text-white/80 leading-relaxed italic">"{q.response}"</p>
                </div>
              ) : (
                <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-xl flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <p className="text-xs text-red-400 font-medium italic">Sem elementos técnicos suficientes para resposta conclusiva.</p>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2">
               <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2">
                 <Edit3 className="w-3 h-3" />
                 Editar Resposta
               </button>
               <button className="p-2 bg-white/5 hover:bg-white/10 text-white/40 rounded-lg">
                 <MessageSquare className="w-4 h-4" />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Edit3 = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
);