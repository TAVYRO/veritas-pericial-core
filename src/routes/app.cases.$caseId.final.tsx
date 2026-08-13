import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  FileText,
  Inspect,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  AlertCircle,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { useCaseWorkflow } from "@/features/cases/CaseWorkflowProvider";

export const Route = createFileRoute("/app/cases/$caseId/final")({
  component: FinalPage,
});

function FinalPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/final" });
  const { getWorkflow } = useCaseWorkflow();

  const workflow = getWorkflow(caseId);

  // 1. Handle case where workflow is not found (Workflow Ausente)
  if (!workflow) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
          <AlertCircle className="w-8 h-8 text-white/20" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">Estado documental indisponível</h2>
          <p className="text-sm text-white/40 max-w-[240px] mx-auto">
            Não foi possível localizar os dados de workflow para este caso.
          </p>
        </div>
        <Link
          to="/app/cases"
          className="flex items-center gap-2 text-veritas-electric text-sm font-bold hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Meus Casos
        </Link>
      </div>
    );
  }

  // 2. Handle Blocked State (finalReleased === false)
  if (!workflow.finalReleased) {
    return (
      <div className="p-6 space-y-8 pb-32 max-w-2xl mx-auto">
        <header className="text-center space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-3xl mx-auto flex items-center justify-center border border-white/10">
            <Lock className="w-8 h-8 text-white/20" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight italic">
              Versão final ainda não liberada
            </h2>
            <p className="text-xs text-white/40 mt-1 uppercase tracking-[0.15em] font-bold">
              Aguardando confirmação de liberação
            </p>
          </div>
        </header>

        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4 text-center">
          <p className="text-sm text-white/60 leading-relaxed">
            A liberação final depende da conclusão e confirmação do Portão de Aprovações.
          </p>
          <div className="pt-2">
            <Link
              to="/app/cases/$caseId/approvals"
              params={{ caseId }}
              className="inline-flex items-center gap-2 bg-veritas-electric text-veritas-graphite px-6 py-3 rounded-xl text-sm font-bold hover:bg-veritas-electric/90 transition-all focus:ring-2 focus:ring-veritas-electric focus:ring-offset-2 focus:ring-offset-veritas-graphite outline-none"
            >
              Ver Portão de Aprovações
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {workflow.currentVersion && (
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-white/20" />
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">
                Versão Atual
              </span>
            </div>
            <span className="text-sm font-black text-veritas-electric bg-veritas-electric/10 px-3 py-1 rounded-lg border border-veritas-electric/20">
              {workflow.currentVersion.label}
            </span>
          </div>
        )}
      </div>
    );
  }

  // 3. Handle Released State (finalReleased === true)
  return (
    <div className="p-6 space-y-8 pb-32 max-w-2xl mx-auto">
      <header className="text-center space-y-4">
        <div className="w-16 h-16 bg-veritas-electric/10 rounded-3xl mx-auto flex items-center justify-center border border-veritas-electric/20 animate-pulse-glow">
          <Sparkles className="w-8 h-8 text-veritas-electric" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight italic">
            Versão final aprovada
          </h2>
          <p className="text-xs text-white/40 mt-1 uppercase tracking-[0.15em] font-bold">
            {workflow.currentVersion.label} • Documento final liberado
          </p>
        </div>
      </header>

      {/* 
        Note: DOCX/PDF Cards removed per instruction 8 & 9. 
        Geração real não existe nesta etapa.
      */}

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
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
                Revisar a pré-visualização documental
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-veritas-electric transition-all" />
        </Link>
      </div>

      <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center gap-4">
        <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
        <div>
          <h4 className="text-sm font-bold text-white">Liberação Concluída</h4>
          <p className="text-xs text-white/60 leading-relaxed">
            O fluxo de trabalho foi finalizado e a versão {workflow.currentVersion.label} está
            liberada para as próximas etapas administrativas.
          </p>
        </div>
      </div>
    </div>
  );
}
