import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, HelpCircle, CheckCircle2, AlertTriangle, MessageSquare, Edit3, Save, XCircle, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useCaseDossier } from "@/features/dossier/CaseDossierProvider";
import { cn } from "@/lib/utils";
import type { CaseQuestion } from "@/features/dossier/case-dossier-types";

export const Route = createFileRoute("/app/cases/$caseId/draft/questions")({
  component: DraftQuestionsPage,
});

function DraftQuestionsPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/draft/questions" });
  const { getDossier, setCaseQuestionResponse, setCaseQuestionInsufficient, clearCaseQuestionResponse } = useCaseDossier();
  const dossier = getDossier(caseId);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempResponse, setTempResponse] = useState("");

  if (!dossier) {
    return (
      <div className="flex flex-col h-screen bg-veritas-ink">
        <header className="sticky top-0 z-50 bg-veritas-graphite border-b border-white/5 p-4 flex items-center gap-3">
          <Link to="/app/cases/$caseId/draft" params={{ caseId }} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <ChevronLeft className="w-5 h-5 text-white/40" />
          </Link>
          <h2 className="text-sm font-bold text-white tracking-tight uppercase tracking-widest">Respostas aos Quesitos</h2>
        </header>
        <div className="flex-1 flex items-center justify-center text-white/40 text-sm">
          Dossiê indisponível para este caso.
        </div>
      </div>
    );
  }

  const officialQuestions = dossier.questions.filter(q => q.kind === "official");
  const complementaryQuestions = dossier.questions.filter(q => q.kind === "complementary");
  const displayQuestions = [...officialQuestions, ...complementaryQuestions];

  const handleStartEdit = (q: CaseQuestion) => {
    setEditingId(q.id);
    setTempResponse(q.response);
  };

  const handleSaveResponse = (id: string) => {
    setCaseQuestionResponse(caseId, id, tempResponse);
    setEditingId(null);
    setTempResponse("");
  };

  const handleMarkInsufficient = (id: string) => {
    setCaseQuestionInsufficient(caseId, id);
    setEditingId(null);
    setTempResponse("");
  };

  const handleClear = (id: string) => {
    clearCaseQuestionResponse(caseId, id);
    setEditingId(null);
    setTempResponse("");
  };

  return (
    <div className="flex flex-col h-screen bg-veritas-ink">
      <header className="sticky top-0 z-50 bg-veritas-graphite border-b border-white/5 p-4 flex items-center gap-3">
        <Link to="/app/cases/$caseId/draft" params={{ caseId: dossier.caseId }} className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <ChevronLeft className="w-5 h-5 text-white/40" />
        </Link>
        <h2 className="text-sm font-bold text-white tracking-tight uppercase tracking-widest">Respostas aos Quesitos</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-40 scrollbar-hide">
        {displayQuestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <HelpCircle className="w-12 h-12 text-white/10" />
            <p className="text-sm text-white/40 italic">Nenhum quesito registrado para resposta.</p>
          </div>
        ) : (
          displayQuestions.map((q) => (
            <div key={q.id} className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-4 break-words group transition-all hover:bg-white/[0.07]">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-veritas-electric font-black text-xs tracking-tighter">{q.id}</span>
                    <span className={cn(
                      "px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded",
                      q.kind === "official" ? "bg-veritas-electric/20 text-veritas-electric" : "bg-veritas-violet/20 text-veritas-violet"
                    )}>
                      {q.kind === "official" ? "Oficial" : "Complementar"}
                    </span>
                    {q.author && (
                      <span className="px-2 py-0.5 bg-white/5 text-white/40 text-[8px] font-bold uppercase tracking-widest rounded">
                        {q.author}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white leading-tight">{q.text}</h3>
                </div>
                <HelpCircle className="w-5 h-5 text-white/20 shrink-0" />
              </div>

              {q.sourceIds.length > 0 && (
                <div className="flex flex-wrap gap-1.5 py-1">
                  {q.sourceIds.map(sid => (
                    <span key={sid} className="px-2 py-0.5 bg-white/5 text-white/40 text-[9px] font-bold rounded-md border border-white/5">
                      {sid}
                    </span>
                  ))}
                </div>
              )}

              <div className="space-y-3 pt-2">
                <label htmlFor={`response-${q.id}`} className="text-[10px] text-white/40 uppercase tracking-widest font-black ml-1">Resposta Técnica</label>
                
                {editingId === q.id ? (
                  <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                    <textarea
                      id={`response-${q.id}`}
                      value={tempResponse}
                      onChange={(e) => setTempResponse(e.target.value)}
                      placeholder="Redigir resposta técnica..."
                      className="w-full bg-veritas-graphite border border-veritas-electric/30 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-veritas-electric transition-colors min-h-[150px] resize-none italic"
                    />
                    <div className="flex gap-2">
                      <button 
                        type="button"
                        onClick={() => setEditingId(null)}
                        className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors"
                      >
                        Cancelar
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleSaveResponse(q.id)}
                        className="flex-1 py-3 bg-veritas-electric hover:bg-veritas-electric/90 text-veritas-ink text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        <Save className="w-3.5 h-3.5" />
                        Salvar Resposta
                      </button>
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleMarkInsufficient(q.id)}
                      className="w-full py-2.5 bg-amber-400/5 hover:bg-amber-400/10 text-amber-400 text-[9px] font-bold uppercase tracking-widest rounded-xl border border-amber-400/20 transition-all flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-3 h-3" />
                      Marcar sem elementos suficientes
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {q.responseStatus === "answered" ? (
                      <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl">
                        <p className="text-sm text-white/80 leading-relaxed italic">"{q.response}"</p>
                      </div>
                    ) : q.responseStatus === "insufficient" ? (
                      <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-xl flex items-center gap-3">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <p className="text-xs text-amber-400 font-medium italic leading-relaxed">
                          Sem elementos técnicos suficientes para resposta no estado atual.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-white/5 border border-dashed border-white/10 p-6 rounded-xl flex flex-col items-center justify-center gap-2">
                        <HelpCircle className="w-5 h-5 text-white/10" />
                        <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Resposta técnica pendente.</p>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <button 
                        type="button"
                        onClick={() => handleStartEdit(q)}
                        className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-veritas-electric" />
                        {q.responseStatus === "pending" ? "Redigir Resposta" : "Editar Resposta"}
                      </button>
                      
                      {(q.responseStatus === "answered" || q.responseStatus === "insufficient") && (
                        <button 
                          type="button"
                          onClick={() => handleClear(q.id)}
                          className="p-2.5 bg-white/5 hover:bg-red-400/10 text-white/20 hover:text-red-400 rounded-xl transition-all"
                          title="Reabrir / Limpar"
                          aria-label={`Reabrir resposta ${q.id}`}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
