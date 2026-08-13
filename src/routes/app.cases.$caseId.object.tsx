import { createFileRoute, useParams } from "@tanstack/react-router";
import { Scale, Target, Ruler, Info, AlertTriangle, CheckCircle2, Circle } from "lucide-react";
import { useCaseDossier } from "@/features/dossier/CaseDossierProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CaseTechnicalScope } from "@/features/dossier/case-dossier-types";

export const Route = createFileRoute("/app/cases/$caseId/object")({
  component: CaseObjectPage,
});

function CaseObjectPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/object" });
  const { 
    getDossier, 
    updateTechnicalScope, 
    setTechnicalScopeSources, 
    canConfirmTechnicalScope, 
    confirmTechnicalScope, 
    reopenTechnicalScope 
  } = useCaseDossier();

  const dossier = getDossier(caseId);

  if (!dossier) {
    return (
      <div className="p-6 text-white/60">
        Dossiê indisponível para este caso.
      </div>
    );
  }

  const { technicalScope } = dossier;
  const isConfirmed = technicalScope.confirmed;

  const handleFieldChange = (field: keyof Pick<CaseTechnicalScope, "object" | "purpose" | "limits">, value: string) => {
    if (isConfirmed) return;
    updateTechnicalScope(caseId, { [field]: value });
  };

  const handleToggleSource = (sourceId: string) => {
    if (isConfirmed) return;
    const current = technicalScope.sourceIds;
    const next = current.includes(sourceId)
      ? current.filter(id => id !== sourceId)
      : [...current, sourceId];
    setTechnicalScopeSources(caseId, next);
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
    <div className="p-6 space-y-6 pb-40 max-w-4xl mx-auto">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Objeto e Finalidade</h2>
        <p className="text-white/40 text-sm">Delimitação profissional do escopo técnico.</p>
      </div>

      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-3 text-sm text-blue-200/80">
        <Info className="w-5 h-5 flex-shrink-0 text-blue-400" />
        <p>
          O objeto, a finalidade e os limites são definidos pela profissional responsável. O Veritas não os infere automaticamente a partir das fontes.
        </p>
      </div>

      {/* Status da Triagem */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5">
        <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Triagem:</span>
        <span className={cn(
          "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded",
          dossier.triageComplete ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"
        )}>
          {dossier.triageComplete ? "Concluída" : "Pendente"}
        </span>
        {!dossier.triageComplete && (
          <span className="text-[10px] text-amber-400/60 ml-auto italic">
            Conclua a Triagem antes de confirmar o escopo técnico.
          </span>
        )}
      </div>

      {/* Formulário Principal */}
      <div className="space-y-6">
        <div className="space-y-3">
          <label 
            htmlFor="scope-object"
            className="flex items-center gap-2 text-veritas-electric text-[10px] uppercase tracking-widest font-bold"
          >
            <Target className="w-4 h-4" />
            Objeto da atuação/perícia
          </label>
          <textarea
            id="scope-object"
            value={technicalScope.object}
            onChange={(e) => handleFieldChange("object", e.target.value)}
            disabled={isConfirmed}
            readOnly={isConfirmed}
            placeholder="Descreva de forma objetiva o que deverá ser tecnicamente examinado."
            className={cn(
              "w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm min-h-[100px] focus:outline-none focus:border-veritas-electric/50 transition-colors resize-none leading-relaxed",
              isConfirmed && "opacity-60 cursor-default"
            )}
          />
        </div>

        <div className="space-y-3">
          <label 
            htmlFor="scope-purpose"
            className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-widest font-bold"
          >
            <Scale className="w-4 h-4" />
            Finalidade
          </label>
          <textarea
            id="scope-purpose"
            value={technicalScope.purpose}
            onChange={(e) => handleFieldChange("purpose", e.target.value)}
            disabled={isConfirmed}
            readOnly={isConfirmed}
            placeholder="Indique a finalidade técnica da atuação."
            className={cn(
              "w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm min-h-[80px] focus:outline-none focus:border-white/20 transition-colors resize-none leading-relaxed",
              isConfirmed && "opacity-60 cursor-default"
            )}
          />
        </div>

        <div className="space-y-3">
          <label 
            htmlFor="scope-limits"
            className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-widest font-bold"
          >
            <Ruler className="w-4 h-4" />
            Limites técnicos
          </label>
          <textarea
            id="scope-limits"
            value={technicalScope.limits}
            onChange={(e) => handleFieldChange("limits", e.target.value)}
            disabled={isConfirmed}
            readOnly={isConfirmed}
            placeholder="Registre limites de competência, dados ou procedimentos aplicáveis."
            className={cn(
              "w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm min-h-[80px] focus:outline-none focus:border-white/20 transition-colors resize-none leading-relaxed",
              isConfirmed && "opacity-60 cursor-default"
            )}
          />
        </div>
      </div>

      {/* Fontes de Fundamentação */}
      <div className="space-y-4 pt-4 border-t border-white/5">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] uppercase tracking-widest font-bold text-white/40">Fontes vinculadas ao escopo</h3>
          <span className="text-[10px] text-white/20">
            {technicalScope.sourceIds.length} selecionada(s)
          </span>
        </div>

        {dossier.items.length === 0 ? (
          <div className="p-8 text-center border border-dashed border-white/5 rounded-2xl">
            <p className="text-xs text-white/20">Nenhuma fonte disponível para vinculação.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {dossier.items.map((item) => {
              const selected = technicalScope.sourceIds.includes(item.id);
              return (
                <div 
                  key={item.id}
                  onClick={() => handleToggleSource(item.id)}
                  className={cn(
                    "p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4",
                    selected 
                      ? "bg-veritas-electric/5 border-veritas-electric/20" 
                      : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05]",
                    isConfirmed && "cursor-default opacity-80"
                  )}
                >
                  <div 
                    role="checkbox"
                    aria-checked={selected}
                    aria-label={`Vincular ${item.id} — ${item.title}`}
                    className={cn(
                      "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                      selected ? "bg-veritas-electric border-veritas-electric" : "border-white/20"
                    )}
                  >
                    {selected && <CheckCircle2 className="w-3 h-3 text-black" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-veritas-electric">{item.id}</span>
                      <h4 className="text-sm font-medium text-white/80 truncate">{item.title}</h4>
                    </div>
                    <span className="text-[9px] font-bold text-white/20 uppercase tracking-tighter">
                      {TRACEABILITY_LABELS[item.traceability]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Ação Final */}
      <div className="w-full pt-6">
        {isConfirmed ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center gap-2 text-green-400 bg-green-500/10 py-3 rounded-2xl border border-green-500/20 font-bold uppercase tracking-widest text-xs">
              <CheckCircle2 className="w-4 h-4" />
              Escopo técnico confirmado
            </div>
            <Button 
              type="button"
              onClick={() => reopenTechnicalScope(caseId)}
              variant="outline" 
              className="w-full h-14 rounded-2xl border-white/10 hover:bg-white/5"
            >
              Reabrir escopo técnico
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {!canConfirmTechnicalScope(caseId) && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <p className="text-[10px] uppercase tracking-widest font-bold text-amber-400">Requisitos pendentes</p>
                <ul className="space-y-1 text-xs text-amber-200/60 list-disc list-inside">
                  {!dossier.triageComplete && <li>Triagem ainda não concluída.</li>}
                  {!technicalScope.object.trim() && <li>Informe o objeto.</li>}
                  {!technicalScope.purpose.trim() && <li>Informe a finalidade.</li>}
                  {!technicalScope.limits.trim() && <li>Informe os limites.</li>}
                  {technicalScope.sourceIds.length === 0 && <li>Vincule pelo menos uma fonte.</li>}
                </ul>
              </div>
            )}
            
            <div className="flex flex-col gap-2">
              <Button 
                type="button"
                onClick={() => confirmTechnicalScope(caseId)}
                disabled={!canConfirmTechnicalScope(caseId)}
                className={cn(
                  "w-full h-14 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all",
                  canConfirmTechnicalScope(caseId) 
                    ? "bg-veritas-electric hover:bg-veritas-electric/90 text-white" 
                    : "bg-white/5 text-white/20 border-white/5"
                )}
              >
                Confirmar escopo técnico
              </Button>
              <p className="text-[10px] text-white/20 text-center italic">
                Confirmar o escopo técnico não aprova o Gate de Suficiência.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}