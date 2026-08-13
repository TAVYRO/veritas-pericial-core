import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { 
  Flag, 
  AlertTriangle, 
  Lock, 
  HelpCircle,
  ArrowRight
} from "lucide-react";
import { useCaseDossier } from "@/features/dossier/CaseDossierProvider";
import { deriveCaseCriticalGaps, type CaseCriticalGapKind } from "@/features/cases/case-critical-gaps";

export const Route = createFileRoute("/app/cases/$caseId/critical-gaps")({
  component: CriticalGapsPage,
});

const KIND_LABELS: Record<CaseCriticalGapKind, string> = {
  "official-question-insufficient": "Quesito oficial insuficiente",
  "cancelled-interview": "Entrevista cancelada"
};

function CriticalGapsPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/critical-gaps" });
  const { getDossier } = useCaseDossier();
  const dossier = getDossier(caseId);

  if (!dossier) {
    return (
      <div className="p-6 text-white/40 text-sm">
        Dossiê indisponível para este caso.
      </div>
    );
  }

  const gaps = deriveCaseCriticalGaps(dossier);

  return (
    <div className="p-6 space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-white">Lacunas Críticas</h2>
        <div className="flex items-center gap-2">
          <Flag className="w-4 h-4 text-veritas-violet" />
          <span className="text-sm font-bold text-white/60">{gaps.length} identificada(s)</span>
        </div>
      </div>

      <div className="space-y-4">
        {gaps.length === 0 ? (
          <div className="p-8 text-center space-y-3 bg-white/5 border border-dashed border-white/10 rounded-2xl">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <HelpCircle className="w-6 h-6 text-white/20" />
            </div>
            <p className="text-sm text-white/60 font-medium">Nenhuma lacuna crítica derivada dos dados atuais.</p>
            <p className="text-[10px] text-white/40 leading-relaxed max-w-xs mx-auto">
              Pendências gerais do Gate de Suficiência podem continuar existindo sem constituir uma lacuna crítica.
            </p>
          </div>
        ) : (
          gaps.map((gap) => (
            <div key={gap.id} className="bg-white/5 border border-rose-500/20 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-rose-400">
                  <Lock className="w-3 h-3" aria-hidden="true" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">LACUNA BLOQUEANTE</span>
                </div>
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{gap.id}</span>
              </div>

              <div className="space-y-1">
                <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Origem</p>
                <p className="text-xs text-white/80 font-medium">{KIND_LABELS[gap.kind]}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Título</p>
                <p className="text-sm text-white/90 font-medium leading-relaxed break-words">
                  {gap.title}
                </p>
              </div>
              
              <div className="bg-black/20 rounded-xl p-3">
                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Motivo</p>
                <p className="text-xs text-white/60 leading-relaxed italic break-words">
                  {gap.reason}
                </p>
              </div>

              {gap.sourceIds.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Fontes relacionadas</p>
                  <div className="flex flex-wrap gap-1.5">
                    {gap.sourceIds.map(sid => {
                      const item = dossier.items.find(i => i.id === sid);
                      return (
                        <span key={sid} className="px-2 py-1 bg-white/5 text-white/60 text-[9px] font-bold rounded-md border border-white/5">
                          {sid}{item ? ` — ${item.title}` : ""}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {gap.relatedQuestionIds.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Quesitos relacionados</p>
                  <div className="space-y-1.5">
                    {gap.relatedQuestionIds.map(qid => {
                      const question = dossier.questions.find(q => q.id === qid);
                      return (
                        <div key={qid} className="p-2 bg-white/5 rounded-lg border border-white/5">
                          <p className="text-[9px] text-veritas-electric font-bold mb-0.5">{qid}</p>
                          {question && (
                            <p className="text-[10px] text-white/60 leading-tight line-clamp-2 italic">
                              "{question.text}"
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="pt-2">
                {gap.kind === "official-question-insufficient" ? (
                  <Link 
                    to="/app/cases/$caseId/questions" 
                    params={{ caseId }}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all border border-white/5 group"
                  >
                    Revisar quesitos
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ) : (
                  <Link 
                    to="/app/cases/$caseId/interview-plan" 
                    params={{ caseId }}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-veritas-violet/10 hover:bg-veritas-violet/20 text-veritas-violet text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all border border-veritas-violet/10 group"
                  >
                    Revisar plano de entrevistas
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {gaps.length > 0 && (
        <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-2xl flex gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" aria-hidden="true" />
          <p className="text-[10px] text-rose-500/80 leading-relaxed">
            Existem lacunas críticas bloqueantes derivadas dos dados atuais. Revise as respectivas origens antes de prosseguir.
          </p>
        </div>
      )}
    </div>
  );
}
