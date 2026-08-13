import { createFileRoute, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { HelpCircle, Sparkles, MessageSquare, Info, Plus, Trash2, Edit2, CheckCircle2, AlertTriangle, X } from "lucide-react";
import { useCaseDossier } from "@/features/dossier/CaseDossierProvider";
import type { CaseQuestionKind, NewCaseQuestionInput } from "@/features/dossier/case-dossier-types";

export const Route = createFileRoute("/app/cases/$caseId/questions")({
  component: CaseQuestionsPage,
});

function CaseQuestionsPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/questions" });
  const { getDossier, addCaseQuestion, updateCaseQuestion, removeCaseQuestion } = useCaseDossier();
  const dossier = getDossier(caseId);

  const [tab, setTab] = useState<CaseQuestionKind | "complementary">("official");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  if (!dossier) {
    return (
      <div className="flex items-center justify-center h-full text-white/40 text-sm">
        Dossiê indisponível para este caso.
      </div>
    );
  }

  const questions = dossier.questions.filter(q => {
    if (tab === "complementary") return q.kind === "complementary";
    return q.kind === tab;
  });

  const resetForm = () => {
    setText("");
    setAuthor("");
    setSelectedSources([]);
    setError(null);
    setIsAdding(false);
    setEditingId(null);
  };

  const handleAdd = () => {
    if (!text.trim()) {
      setError("Informe o texto antes de registrar.");
      return;
    }

    const input: NewCaseQuestionInput = {
      kind: tab as CaseQuestionKind,
      text: text.trim(),
      author: tab === "interview" ? null : (author.trim() || null),
      sourceIds: selectedSources,
    };

    addCaseQuestion(caseId, input);
    resetForm();
  };

  const handleUpdate = (id: string) => {
    if (!text.trim()) {
      setError("Informe o texto antes de registrar.");
      return;
    }

    updateCaseQuestion(caseId, id, {
      text: text.trim(),
      author: tab === "interview" ? null : (author.trim() || null),
      sourceIds: selectedSources,
    });
    resetForm();
  };

  const startEdit = (q: any) => {
    setEditingId(q.id);
    setText(q.text);
    setAuthor(q.author || "");
    setSelectedSources(q.sourceIds);
    setIsAdding(false);
  };

  const toggleSource = (id: string) => {
    setSelectedSources(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full bg-veritas-ink">
      <div className="flex border-b border-white/5 bg-[#0A0D14]/50 overflow-x-auto scrollbar-hide" role="tablist">
        {[
          { id: "official", label: `Oficiais (${dossier.questions.filter(q => q.kind === "official").length})`, icon: HelpCircle },
          { id: "complementary", label: `Complementares (${dossier.questions.filter(q => q.kind === "complementary").length})`, icon: Sparkles },
          { id: "interview", label: `Entrevista (${dossier.questions.filter(q => q.kind === "interview").length})`, icon: MessageSquare },
        ].map(t => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            type="button"
            onClick={() => { setTab(t.id as any); resetForm(); }}
            className={cn(
              "flex-1 min-w-[100px] py-4 flex flex-col items-center gap-1 transition-all relative shrink-0",
              tab === t.id ? "text-veritas-electric" : "text-white/20"
            )}
          >
            <t.icon className="w-4 h-4" />
            <span className="text-[9px] uppercase tracking-widest font-bold text-center px-2">{t.label}</span>
            {tab === t.id && <div className="absolute bottom-0 w-8 h-0.5 bg-veritas-electric rounded-full" />}
          </button>
        ))}
      </div>

      <div className="flex-1 p-6 space-y-4 pb-40 overflow-y-auto scrollbar-hide">
        {tab === "official" && (
          <div className="p-4 rounded-xl bg-veritas-electric/5 border border-veritas-electric/10 flex gap-3">
            <Info className="w-4 h-4 text-veritas-electric shrink-0 mt-0.5" />
            <p className="text-[11px] text-veritas-electric/80 leading-relaxed italic">
              Quesitos oficiais são registrados conforme constam nos autos ou são informados pela profissional responsável.
            </p>
          </div>
        )}

        {tab === "complementary" && (
          <div className="p-4 rounded-xl bg-veritas-violet/5 border border-veritas-violet/10 flex gap-3">
            <Info className="w-4 h-4 text-veritas-violet shrink-0 mt-0.5" />
            <p className="text-[11px] text-veritas-violet/80 leading-relaxed italic">
              Quesitos complementares são registrados separadamente dos quesitos oficiais.
            </p>
          </div>
        )}

        {tab === "interview" && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex gap-3">
            <Info className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
            <p className="text-[11px] text-white/40 leading-relaxed italic">
              Perguntas de entrevista integram o roteiro de coleta e não são quesitos oficiais.
            </p>
          </div>
        )}

        {!isAdding && editingId === null && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="w-full p-4 rounded-2xl border-2 border-dashed border-white/5 hover:border-veritas-electric/30 hover:bg-veritas-electric/5 text-white/40 hover:text-veritas-electric transition-all flex items-center justify-center gap-2 group"
          >
            <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Registrar item</span>
          </button>
        )}

        {(isAdding || editingId !== null) && (
          <div className="p-5 rounded-2xl bg-white/5 border border-veritas-electric/20 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-veritas-electric">
                {editingId ? "Editar Item" : "Novo Registro"}
              </h3>
              <button type="button" onClick={resetForm} className="text-white/20 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label htmlFor="q-text" className="text-[10px] text-white/40 uppercase tracking-widest font-bold ml-1">Texto do Quesito</label>
                <textarea
                  id="q-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Digite o texto aqui..."
                  className="w-full bg-veritas-graphite border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-veritas-electric transition-colors min-h-[100px] resize-none"
                />
              </div>

              {tab !== "interview" && (
                <div className="space-y-1.5">
                  <label htmlFor="q-author" className="text-[10px] text-white/40 uppercase tracking-widest font-bold ml-1">Autor / Origem (Opcional)</label>
                  <input
                    id="q-author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Ex: Juízo, MP, Requerente..."
                    className="w-full bg-veritas-graphite border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-veritas-electric transition-colors"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold ml-1">Fontes Vinculadas (Opcional)</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {dossier.items.map(item => (
                    <label
                      key={item.id}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer",
                        selectedSources.includes(item.id)
                          ? "bg-veritas-electric/10 border-veritas-electric/30 text-veritas-electric"
                          : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSources.includes(item.id)}
                        onChange={() => toggleSource(item.id)}
                        className="w-4 h-4 rounded border-white/10 bg-transparent text-veritas-electric focus:ring-0 focus:ring-offset-0"
                      />
                      <span className="text-xs font-medium truncate">
                        <span className="font-bold mr-1.5">{item.id}</span>
                        {item.title}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {error && (
              <p className="text-[10px] text-red-400 font-bold bg-red-400/10 p-2 rounded-lg text-center">{error}</p>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => editingId ? handleUpdate(editingId) : handleAdd()}
                className="flex-1 py-3 bg-veritas-electric hover:bg-veritas-electric/90 text-veritas-ink text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors"
              >
                {editingId ? "Salvar Alterações" : "Confirmar Registro"}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {questions.length === 0 && !isAdding && (
            <div className="text-center py-12 px-6">
              <p className="text-sm text-white/20 italic">
                {tab === "official" ? "Nenhum quesito oficial registrado." : 
                 tab === "complementary" ? "Nenhum quesito complementar registrado." : 
                 "Nenhuma pergunta de entrevista registrada."}
              </p>
            </div>
          )}

          {questions.map((q) => (
            <div key={q.id} className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4 group transition-all hover:bg-white/[0.07] break-words">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-veritas-electric font-black text-xs tracking-tighter">{q.id}</span>
                    {q.author && (
                      <span className="px-2 py-0.5 bg-veritas-violet/20 text-veritas-violet text-[8px] font-bold uppercase tracking-widest rounded">
                        {q.author}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-white/90 leading-relaxed">{q.text}</p>
                </div>
                
                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => startEdit(q)}
                    aria-label="Editar"
                    className="p-2 text-white/20 hover:text-veritas-electric transition-colors hover:bg-veritas-electric/10 rounded-lg"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeCaseQuestion(caseId, q.id)}
                    aria-label="Remover"
                    className="p-2 text-white/20 hover:text-red-400 transition-colors hover:bg-red-400/10 rounded-lg"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {q.sourceIds.length > 0 && (
                <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-3">
                  {q.sourceIds.map(sid => (
                    <span key={sid} className="px-2 py-0.5 bg-white/5 text-white/40 text-[9px] font-bold rounded-md">
                      {sid}
                    </span>
                  ))}
                </div>
              )}

              {q.kind !== "interview" && (
                <div className="flex items-center gap-2 pt-1 border-t border-white/5 pt-3 mt-3">
                  {q.responseStatus === "answered" ? (
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Respondido</span>
                    </div>
                  ) : q.responseStatus === "insufficient" ? (
                    <div className="flex items-center gap-1.5 text-amber-400">
                      <AlertTriangle className="w-3 h-3" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Sem elementos suficientes</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-white/20">
                      <HelpCircle className="w-3 h-3" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Pendente</span>
                    </div>
                  )}
                </div>
              )}

              {q.kind === "interview" && (
                <div className="flex items-center gap-1.5 text-white/20 pt-1 border-t border-white/5 pt-3 mt-3">
                  <MessageSquare className="w-3 h-3" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Pergunta de entrevista</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
