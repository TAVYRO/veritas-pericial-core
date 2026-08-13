import { createFileRoute, useParams } from "@tanstack/react-router";
import { 
  CheckCircle2, 
  MinusCircle, 
  AlertCircle,
  ShieldCheck,
  ShieldAlert
} from "lucide-react";
import { useCaseDossier } from "@/features/dossier/CaseDossierProvider";
import { useCaseWorkflow } from "@/features/cases/CaseWorkflowProvider";
import { evaluateCaseSufficiency, CaseSufficiencyStatus } from "@/features/cases/case-sufficiency";

export const Route = createFileRoute("/app/cases/$caseId/sufficiency")({
  component: SufficiencyPage,
});

const STATUS_CONFIG: Record<CaseSufficiencyStatus, { icon: React.ReactNode, classes: string, label: string }> = {
  "OK": {
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    classes: "text-emerald-500",
    label: "OK"
  },
  "FALTA": {
    icon: <AlertCircle className="w-4 h-4 text-rose-500" />,
    classes: "text-rose-500",
    label: "FALTA"
  },
  "NÃO SE APLICA": {
    icon: <MinusCircle className="w-4 h-4 text-white/20" />,
    classes: "text-white/20",
    label: "NÃO SE APLICA"
  }
};

function SufficiencyPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/sufficiency" });
  const { getDossier } = useCaseDossier();
  const { getCase } = useCaseWorkflow();

  const dossier = getDossier(caseId);
  const caseData = getCase(caseId);

  if (!dossier || !caseData) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-white/20" />
        <p className="text-white/60">Dossiê indisponível para este caso.</p>
      </div>
    );
  }

  const evaluation = evaluateCaseSufficiency(caseData, dossier);

  // Group items by category preserving motor order
  const groupedItems: { category: string, items: typeof evaluation.items }[] = [];
  evaluation.items.forEach(item => {
    let group = groupedItems.find(g => g.category === item.category);
    if (!group) {
      group = { category: item.category, items: [] };
      groupedItems.push(group);
    }
    group.items.push(item);
  });

  return (
    <div className="p-6 space-y-6 pb-24 max-w-full overflow-hidden">
      {/* Header with Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-white">Gate de Suficiência</h2>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Progresso:</span>
            <span className="text-sm font-bold text-veritas-electric">{evaluation.progress}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div 
          className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={evaluation.progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso de suficiência do caso"
        >
          <div 
            className="h-full bg-veritas-electric transition-all duration-500 ease-out"
            style={{ width: `${evaluation.progress}%` }}
          />
        </div>
      </div>

      {/* Summary Area */}
      <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
        evaluation.isSufficient 
          ? "bg-emerald-500/5 border-emerald-500/10" 
          : "bg-rose-500/5 border-rose-500/10"
      }`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
          evaluation.isSufficient ? "bg-emerald-500/20" : "bg-rose-500/20"
        }`}>
          {evaluation.isSufficient 
            ? <ShieldCheck className="w-5 h-5 text-emerald-500" />
            : <ShieldAlert className="w-5 h-5 text-rose-500" />
          }
        </div>
        <div className="space-y-0.5">
          <p className={`text-sm font-bold ${evaluation.isSufficient ? "text-emerald-500" : "text-rose-500"}`}>
            {evaluation.isSufficient ? "Gate de Suficiência atendido" : "Gate de Suficiência pendente"}
          </p>
          <p className="text-xs text-white/60">
            {evaluation.isSufficient 
              ? "Os critérios aplicáveis avaliados estão atendidos."
              : `${evaluation.missingCount} critério(s) ainda requer(em) atenção.`
            }
          </p>
          {!evaluation.isSufficient && (
            <p className="text-[10px] text-white/40 mt-1">
              Revise os itens marcados como FALTA nos respectivos domínios do caso.
            </p>
          )}
        </div>
      </div>

      {/* Criteria Groups */}
      <div className="space-y-8">
        {groupedItems.map((group, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-1">
              {group.category}
            </h3>
            <div className="grid gap-2">
              {group.items.map((item) => {
                const config = STATUS_CONFIG[item.status];
                return (
                  <div key={item.id} className="bg-white/5 border border-white/5 rounded-xl p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-white/90">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-[8px] font-bold uppercase tracking-widest ${config.classes}`}>
                          {config.label}
                        </span>
                        {config.icon}
                      </div>
                    </div>
                    <p className="text-[10px] text-white/40 leading-relaxed break-words">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
