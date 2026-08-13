import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { User, Calendar, Clock, ArrowRight, ClipboardList, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCaseDossier } from "@/features/dossier/CaseDossierProvider";
import { useCaseWorkflow } from "@/features/cases/CaseWorkflowProvider";
import type { CaseInterviewStatus } from "@/features/dossier/case-dossier-types";

const STATUS_LABELS: Record<CaseInterviewStatus, string> = {
  planned: "Planejada",
  scheduled: "Agendada",
  completed: "Realizada",
  "not-applicable": "Não se aplica",
  cancelled: "Cancelada",
};

const STATUS_BADGE_CLASSES: Record<CaseInterviewStatus, string> = {
  planned: "bg-white/10 text-white/40",
  scheduled: "bg-veritas-electric/20 text-veritas-electric",
  completed: "bg-emerald-500/20 text-emerald-400",
  "not-applicable": "bg-white/5 text-white/20",
  cancelled: "bg-red-500/20 text-red-400",
};

export const Route = createFileRoute("/app/cases/$caseId/interviews")({
  component: InterviewsList,
});

function InterviewsList() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/interviews" });
  const { getDossier } = useCaseDossier();
  const { getCase } = useCaseWorkflow();

  const dossier = getDossier(caseId);
  const caseData = getCase(caseId);

  if (!dossier || !caseData) {
    return <div className="p-6 text-white/40">Dossiê indisponível para este caso.</div>;
  }

  const { interviews } = dossier;
  const { professionals } = caseData;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-tight text-white">Entrevistas</h2>
          <p className="text-white/40 text-sm">Registros planejados e realizados neste caso.</p>
        </div>
        <Link
          to="/app/cases/$caseId/interview-plan"
          params={{ caseId }}
          className="px-4 py-2 bg-veritas-electric text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-veritas-electric/90 transition-colors flex items-center gap-2 shadow-lg shadow-veritas-electric/20"
        >
          <ClipboardList className="w-3.5 h-3.5" />
          Gerenciar plano
        </Link>
      </div>

      {interviews.length === 0 ? (
        <div className="text-center py-12 px-6 border border-white/5 rounded-3xl bg-white/5 space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                <User className="w-8 h-8 text-white/20" />
            </div>
            <p className="text-white/40 text-sm">Nenhuma entrevista registrada para este caso.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="group relative bg-white/5 border border-white/5 rounded-3xl p-5 hover:bg-white/[0.07] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-veritas-graphite border border-white/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-white/40 group-hover:text-veritas-electric transition-colors" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold text-veritas-electric tracking-widest uppercase">{interview.id}</span>
                        <h3 className="text-sm font-bold text-white tracking-tight">{interview.personName}</h3>
                    </div>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{interview.relation}</p>
                  </div>
                </div>
                <Badge className={`${STATUS_BADGE_CLASSES[interview.status]} px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest border-none`}>
                  {STATUS_LABELS[interview.status]}
                </Badge>
              </div>

              <div className="grid gap-3 mb-6">
                <div className="flex items-start gap-3">
                    <Target className="w-3.5 h-3.5 text-veritas-electric mt-0.5" />
                    <div className="space-y-0.5">
                        <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Objetivo</p>
                        <p className="text-xs text-white/80 leading-relaxed">{interview.purpose}</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <ClipboardList className="w-3.5 h-3.5 text-veritas-violet mt-0.5" />
                    <div className="space-y-0.5">
                        <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Profissionais</p>
                        <p className="text-xs text-white/80 leading-relaxed">
                            {interview.professionalIds.map((id, idx) => {
                                const pro = professionals.find(p => p.id === id);
                                return (
                                    <span key={id}>
                                        {pro ? pro.name : "Profissional não localizado"}
                                        {idx < interview.professionalIds.length - 1 ? ", " : ""}
                                    </span>
                                );
                            })}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {interview.scheduledAt && (
                        <div className="flex items-start gap-3">
                            <Calendar className="w-3.5 h-3.5 text-veritas-electric mt-0.5" />
                            <div className="space-y-0.5">
                                <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Agendamento</p>
                                <p className="text-xs text-white/80">{interview.scheduledAt.replace("T", " • ")}</p>
                            </div>
                        </div>
                    )}
                    {interview.completedAt && (
                        <div className="flex items-start gap-3">
                            <Clock className="w-3.5 h-3.5 text-veritas-violet mt-0.5" />
                            <div className="space-y-0.5">
                                <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Realização</p>
                                <p className="text-xs text-white/80">{interview.completedAt.replace("T", " • ")}</p>
                            </div>
                        </div>
                    )}
                </div>

                {interview.questionIds.length > 0 && (
                    <div className="flex items-start gap-3">
                        <ArrowRight className="w-3.5 h-3.5 text-white/20 mt-0.5" />
                        <div className="space-y-0.5">
                            <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">QE Vinculadas</p>
                            <p className="text-[10px] text-white/60">
                                {interview.questionIds.length} pergunta(s): {interview.questionIds.join(", ")}
                            </p>
                        </div>
                    </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
