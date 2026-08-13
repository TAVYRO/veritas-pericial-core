import { createFileRoute, useParams } from "@tanstack/react-router";
import { User, ClipboardList, Target, Clock, Plus, Trash2, Edit2, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCaseDossier } from "@/features/dossier/CaseDossierProvider";
import { useCaseWorkflow } from "@/features/cases/CaseWorkflowProvider";
import { useState } from "react";
import type { CaseInterviewStatus } from "@/features/dossier/case-dossier-types";

const STATUS_LABELS: Record<CaseInterviewStatus, string> = {
  planned: "Planejada",
  scheduled: "Agendada",
  completed: "Realizada",
  "not-applicable": "Não se aplica",
  cancelled: "Cancelada",
};

export const Route = createFileRoute("/app/cases/$caseId/interview-plan")({
  component: CaseInterviewPlanPage,
});

function CaseInterviewPlanPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/interview-plan" });
  const { getDossier, addCaseInterview, removeCaseInterview, updateCaseInterview } = useCaseDossier();
  const { getCase } = useCaseWorkflow();
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const dossier = getDossier(caseId);
  const caseData = getCase(caseId);

  if (!dossier || !caseData) {
    return <div className="p-6 text-white/40">Dossiê indisponível para este caso.</div>;
  }

  const { interviews } = dossier;
  const { professionals } = caseData;

  return (
    <div className="p-6 space-y-6 pb-24">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Plano de Entrevistas</h2>
        <p className="text-white/40 text-sm">Planejamento e acompanhamento das entrevistas deste caso.</p>
      </div>

      {interviews.length === 0 ? (
        <div className="text-center py-10 border border-white/5 rounded-2xl bg-white/5 text-white/40">
            Nenhuma entrevista planejada para este caso.
        </div>
      ) : (
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div key={interview.id} className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                    <User className="w-5 h-5 text-white/40" />
                  </div>
                  <div>
                    <h3 className="font-medium">{interview.personName}</h3>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">{interview.relation}</p>
                  </div>
                </div>
                <Badge className="bg-white/10 text-white/60">
                  {STATUS_LABELS[interview.status]}
                </Badge>
              </div>

              <div className="space-y-2 pt-2 text-xs text-white/60">
                <p>Objetivo: <span className="text-white">{interview.purpose}</span></p>
                <p>Profissionais: <span className="text-white">
                    {interview.professionalIds.map(id => {
                        const pro = professionals.find(p => p.id === id);
                        return pro ? pro.name : "Profissional não localizado";
                    }).join(", ")}
                </span></p>
                {interview.scheduledAt && <p>Agendamento: <span className="text-white">{interview.scheduledAt.replace("T", " • ")}</span></p>}
                {interview.completedAt && <p>Realização: <span className="text-white">{interview.completedAt.replace("T", " • ")}</span></p>}
              </div>
              
              <div className="flex gap-2 pt-2">
                <button onClick={() => setEditingId(interview.id)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/60">
                    <Edit2 className="w-4 h-4" />
                </button>
                {deletingId === interview.id ? (
                    <div className="flex items-center gap-2">
                        <button onClick={() => setDeletingId(null)} className="text-[10px] text-white/60">Cancelar</button>
                        <button onClick={() => removeCaseInterview(caseId, interview.id)} className="text-[10px] text-red-400 font-bold">Confirmar remoção</button>
                    </div>
                ) : (
                    <button onClick={() => setDeletingId(interview.id)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-red-400/60 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
