import { createFileRoute, useParams } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2, Circle, FileText, Info, Lock } from "lucide-react";
import { useCaseDossier } from "@/features/dossier/CaseDossierProvider";
import { Button } from "@/components/ui/button";
import { TraceabilityMarker } from "@/components/veritas/TraceabilityMarker";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/cases/$caseId/triage")({
  component: CaseTriagePage,
});

function CaseTriagePage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/triage" });
  const { 
    getDossier, 
    setTriageReviewed, 
    setTriageNote, 
    canCompleteTriage, 
    completeTriage, 
    reopenTriage 
  } = useCaseDossier();

  const dossier = getDossier(caseId);

  if (!dossier) {
    return (
      <div className="p-6 text-white/60">
        Dossiê indisponível para este caso.
      </div>
    );
  }

  const reviewedCount = dossier.items.filter(item => {
    const review = dossier.triageReviews.find(r => r.sourceId === item.id);
    return review?.reviewed === true;
  }).length;

  const handleToggleReviewed = (sourceId: string, current: boolean) => {
    if (dossier.triageComplete) return;
    setTriageReviewed(caseId, sourceId, !current);
  };

  const handleNoteChange = (sourceId: string, note: string) => {
    if (dossier.triageComplete) return;
    setTriageNote(caseId, sourceId, note);
  };

  const TRACEABILITY_LABELS: Record<string, string> = {
    documento: "DOCUMENTO",
    relato: "RELATO",
    observacao: "OBSERVAÇÃO",
    inferencia: "INFERÊNCIA",
    hipotese: "HIPÓTESE",
    "nao-confirmado": "NÃO CONFIRMADO",
  };

  return (
    <div className="p-6 space-y-6 pb-32 max-w-4xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Triagem do Caso</h2>
        <p className="text-white/40 text-sm">
          Revisão profissional do inventário e dos metadados das fontes.
        </p>
      </div>

      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-3 text-sm text-blue-200/80">
        <Info className="w-5 h-5 flex-shrink-0 text-blue-400" />
        <p>
          A triagem organiza a revisão profissional dos metadados registrados. Ela não confirma autenticidade, veracidade, suficiência ou conteúdo das fontes.
        </p>
      </div>

      {/* Resumo da Triagem */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
          <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Fontes registradas</span>
          <p className="text-xl font-mono">{dossier.items.length}</p>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
          <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Fontes revisadas</span>
          <p className="text-xl font-mono">{reviewedCount}/{dossier.items.length}</p>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
          <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Conferência</span>
          <p className={cn("text-xs font-semibold", dossier.materialsCollectionComplete ? "text-green-400" : "text-amber-400")}>
            {dossier.materialsCollectionComplete ? "Concluída" : "Pendente"}
          </p>
        </div>
        <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
          <span className="text-[10px] text-white/40 uppercase tracking-wider font-bold">Triagem</span>
          <p className={cn("text-xs font-semibold", dossier.triageComplete ? "text-green-400" : "text-blue-400")}>
            {dossier.triageComplete ? "Concluída" : "Em andamento"}
          </p>
        </div>
      </div>

      {dossier.items.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed border-white/10 rounded-3xl">
          <p className="text-white/40">Nenhuma fonte registrada no inventário.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {dossier.items.map((item) => {
            const review = dossier.triageReviews.find(r => r.sourceId === item.id);
            const isReviewed = review?.reviewed || false;
            const note = review?.note || "";

            // Pontos de atenção
            const attentionPoints = [];
            if (item.limitations.length > 0) attentionPoints.push("Limitações registradas");
            if (item.duplicateStatus === "possible") attentionPoints.push("Possível duplicidade");
            if (item.duplicateStatus === "yes") attentionPoints.push("Duplicidade indicada");
            if (item.legibility === "low") attentionPoints.push("Baixa legibilidade");

            return (
              <div 
                key={item.id} 
                className={cn(
                  "p-5 rounded-2xl border transition-all space-y-4",
                  isReviewed ? "bg-white/5 border-white/10" : "bg-white/[0.02] border-white/5"
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-veritas-electric font-bold">{item.id}</span>
                      <h3 className="font-medium text-white/90 break-words">{item.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 text-[10px] uppercase font-bold tracking-tight">
                      <span className="px-1.5 py-0.5 rounded bg-white/5 text-white/60">
                        {TRACEABILITY_LABELS[item.traceability]}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-white/5 text-white/60">
                        {item.origin}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-white/5 text-white/60">
                        {item.theme}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-white/5 text-white/60">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-start">
                    <span className={cn("text-[10px] font-bold uppercase tracking-widest", isReviewed ? "text-green-400" : "text-white/20")}>
                      {isReviewed ? "Revisada" : "Pendente"}
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={isReviewed}
                      aria-label={isReviewed ? `Marcar ${item.id} como pendente na triagem` : `Marcar ${item.id} como revisada na triagem`}
                      disabled={dossier.triageComplete}
                      onClick={() => handleToggleReviewed(item.id, isReviewed)}
                      className={cn(
                        "p-2 rounded-full transition-colors",
                        isReviewed ? "bg-green-500 text-black" : "bg-white/5 text-white/20 hover:bg-white/10",
                        dossier.triageComplete && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {isReviewed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {attentionPoints.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-amber-400/80">Pontos de atenção do inventário</span>
                    <div className="flex flex-wrap gap-2">
                      {attentionPoints.map((point, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-400 font-medium">
                          <AlertCircle className="w-3 h-3" />
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label 
                    htmlFor={`note-${item.id}`}
                    className="text-[10px] uppercase tracking-widest font-bold text-white/40"
                  >
                    Nota de triagem — opcional
                  </label>
                  <textarea
                    id={`note-${item.id}`}
                    value={note}
                    onChange={(e) => handleNoteChange(item.id, e.target.value)}
                    disabled={dossier.triageComplete}
                    readOnly={dossier.triageComplete}
                    maxLength={1000}
                    placeholder="Registro profissional de triagem..."
                    className={cn(
                      "w-full bg-black/40 border border-white/5 rounded-xl p-3 text-sm min-h-[80px] focus:outline-none focus:border-veritas-electric/50 transition-colors resize-none",
                      dossier.triageComplete && "opacity-50 cursor-default"
                    )}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Botões de Ação */}
      <div className="fixed bottom-24 left-6 right-6 flex justify-center pointer-events-none">
        <div className="w-full max-w-4xl pointer-events-auto">
          {dossier.triageComplete ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center gap-2 text-green-400 bg-green-500/10 py-3 rounded-2xl border border-green-500/20 font-bold uppercase tracking-widest text-xs">
                <CheckCircle2 className="w-4 h-4" />
                Triagem técnica concluída
              </div>
              <Button 
                onClick={() => reopenTriage(caseId)}
                variant="outline" 
                className="w-full h-14 rounded-2xl border-white/10 hover:bg-white/5"
              >
                Reabrir triagem
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {!canCompleteTriage(caseId) && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-amber-400">Requisitos pendentes</p>
                  <ul className="space-y-1 text-xs text-amber-200/60 list-disc list-inside">
                    {!dossier.materialsCollectionComplete && <li>Conclua a conferência dos materiais antes de concluir a triagem.</li>}
                    {dossier.items.length === 0 && <li>Nenhuma fonte registrada no inventário.</li>}
                    {dossier.items.length > 0 && reviewedCount < dossier.items.length && (
                      <li>Existem {dossier.items.length - reviewedCount} fonte(s) pendente(s) de revisão.</li>
                    )}
                  </ul>
                </div>
              )}
              
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={() => completeTriage(caseId)}
                  disabled={!canCompleteTriage(caseId)}
                  className={cn(
                    "w-full h-14 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all",
                    canCompleteTriage(caseId) 
                      ? "bg-veritas-electric hover:bg-veritas-electric/90 text-white" 
                      : "bg-white/5 text-white/20 border-white/5"
                  )}
                >
                  Concluir triagem técnica
                </Button>
                <p className="text-[10px] text-white/20 text-center italic">
                  Concluir a triagem não aprova o Gate de Suficiência.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}