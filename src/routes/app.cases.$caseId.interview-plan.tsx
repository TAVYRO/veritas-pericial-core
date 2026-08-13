import { createFileRoute, useParams } from "@tanstack/react-router";
import { User, ClipboardList, Target, Clock, Plus, Trash2, Edit2, Check, X, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCaseDossier } from "@/features/dossier/CaseDossierProvider";
import { useCaseWorkflow } from "@/features/cases/CaseWorkflowProvider";
import { useState } from "react";
import type { CaseInterviewStatus, CaseInterview, NewCaseInterviewInput } from "@/features/dossier/case-dossier-types";

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

export const Route = createFileRoute("/app/cases/$caseId/interview-plan")({
  component: CaseInterviewPlanPage,
});

function CaseInterviewPlanPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/interview-plan" });
  const { getDossier, addCaseInterview, removeCaseInterview, updateCaseInterview } = useCaseDossier();
  const { getCase } = useCaseWorkflow();
  
  const dossier = getDossier(caseId);
  const caseData = getCase(caseId);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [personName, setPersonName] = useState("");
  const [relation, setRelation] = useState("");
  const [purpose, setPurpose] = useState("");
  const [status, setStatus] = useState<CaseInterviewStatus>("planned");
  const [selectedProfessionalIds, setSelectedProfessionalIds] = useState<string[]>([]);
  const [scheduledAt, setScheduledAt] = useState("");
  const [completedAt, setCompletedAt] = useState("");
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);

  if (!dossier || !caseData) {
    return <div className="p-6 text-white/40">Dossiê indisponível para este caso.</div>;
  }

  const { interviews, questions } = dossier;
  const { professionals } = caseData;
  const interviewQuestions = questions.filter(q => q.kind === "interview");

  const resetForm = () => {
    setPersonName("");
    setRelation("");
    setPurpose("");
    setStatus("planned");
    setSelectedProfessionalIds([]);
    setScheduledAt("");
    setCompletedAt("");
    setSelectedQuestionIds([]);
    setEditingId(null);
    setIsAdding(false);
    setErrorMessage(null);
  };

  const handleEdit = (interview: CaseInterview) => {
    setPersonName(interview.personName);
    setRelation(interview.relation);
    setPurpose(interview.purpose);
    setStatus(interview.status);
    setSelectedProfessionalIds(interview.professionalIds);
    setScheduledAt(interview.scheduledAt || "");
    setCompletedAt(interview.completedAt || "");
    setSelectedQuestionIds(interview.questionIds);
    setEditingId(interview.id);
    setIsAdding(false);
    setErrorMessage(null);
  };

  const validate = () => {
    if (!personName.trim()) return "Informe o nome da pessoa.";
    if (!relation.trim()) return "Informe a relação/vínculo.";
    if (!purpose.trim()) return "Informe o objetivo da entrevista.";
    if (selectedProfessionalIds.length === 0) return "Selecione pelo menos 1 profissional.";
    
    if (status === "scheduled" && !scheduledAt) return "Informe a data/agendamento.";
    if (status === "completed" && !completedAt) return "Informe a data de realização.";
    
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setErrorMessage(error);
      return;
    }

    const input: NewCaseInterviewInput = {
      personName,
      relation,
      purpose,
      status,
      professionalIds: selectedProfessionalIds,
      scheduledAt: scheduledAt || null,
      completedAt: completedAt || null,
      questionIds: selectedQuestionIds,
    };

    if (editingId) {
      updateCaseInterview(caseId, editingId, input);
    } else {
      addCaseInterview(caseId, input);
    }
    resetForm();
  };

  const handleStatusChange = (newStatus: CaseInterviewStatus) => {
    setStatus(newStatus);
    if (newStatus === "not-applicable") {
      setScheduledAt("");
      setCompletedAt("");
    } else if (["planned", "scheduled", "cancelled"].includes(newStatus)) {
      setCompletedAt("");
    }
  };

  return (
    <div className="p-6 space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Plano de Entrevistas</h2>
          <p className="text-white/40 text-sm">Planejamento e acompanhamento das entrevistas deste caso.</p>
        </div>
        {!isAdding && !editingId && (
          <button 
            onClick={() => setIsAdding(true)}
            aria-label="Adicionar entrevista"
            className="w-10 h-10 rounded-full bg-veritas-electric text-white flex items-center justify-center shadow-lg shadow-veritas-electric/20"
          >
            <Plus className="w-6 h-6" />
          </button>
        )}
      </div>

      {(isAdding || editingId) && (
        <form onSubmit={handleSubmit} className="p-5 rounded-2xl bg-veritas-electric/5 border border-veritas-electric/20 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-veritas-electric uppercase tracking-widest">
                {editingId ? "Editar Entrevista" : "Nova Entrevista"}
            </h3>
            <button type="button" onClick={resetForm} aria-label="Fechar formulário" className="text-white/40 hover:text-white">
                <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="personName" className="text-[10px] text-white/40 uppercase font-bold tracking-widest px-1">Pessoa / Entrevistado</label>
              <input
                id="personName"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                placeholder="Nome da pessoa entrevistada"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-veritas-electric/50 transition-colors outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="relation" className="text-[10px] text-white/40 uppercase font-bold tracking-widest px-1">Relação / Vínculo</label>
              <input
                id="relation"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                placeholder="Informe a relação ou vínculo"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-veritas-electric/50 transition-colors outline-none"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label htmlFor="purpose" className="text-[10px] text-white/40 uppercase font-bold tracking-widest px-1">Objetivo da Entrevista</label>
              <textarea
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="Descreva o que se pretende apurar..."
                rows={2}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-veritas-electric/50 transition-colors outline-none resize-none"
              />
            </div>

            <div className="space-y-1.5">
                <label className="text-[10px] text-white/40 uppercase font-bold tracking-widest px-1">Profissionais Responsáveis</label>
                <div className="space-y-2 max-h-32 overflow-y-auto p-2 bg-white/5 rounded-xl border border-white/10">
                    {professionals.map(pro => (
                        <div key={pro.id} className="flex items-center gap-2">
                            <input 
                                type="checkbox"
                                id={`pro-${pro.id}`}
                                checked={selectedProfessionalIds.includes(pro.id)}
                                onChange={(e) => {
                                    if (e.target.checked) setSelectedProfessionalIds([...selectedProfessionalIds, pro.id]);
                                    else setSelectedProfessionalIds(selectedProfessionalIds.filter(id => id !== pro.id));
                                }}
                                className="w-4 h-4 rounded border-white/20 bg-white/5 text-veritas-electric focus:ring-veritas-electric/50"
                            />
                            <label htmlFor={`pro-${pro.id}`} className="text-xs text-white/80 cursor-pointer">
                                {pro.name} <span className="text-[10px] text-white/40">{pro.profession}{pro.registration ? ` • ${pro.registration}` : ""}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="status" className="text-[10px] text-white/40 uppercase font-bold tracking-widest px-1">Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => handleStatusChange(e.target.value as CaseInterviewStatus)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-veritas-electric/50 appearance-none"
              >
                {Object.entries(STATUS_LABELS).map(([val, label]) => (
                  <option key={val} value={val} className="bg-veritas-graphite">{label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="scheduledAt" className="text-[10px] text-white/40 uppercase font-bold tracking-widest px-1">Agendamento</label>
              <input
                id="scheduledAt"
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-veritas-electric/50 transition-colors outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="completedAt" className="text-[10px] text-white/40 uppercase font-bold tracking-widest px-1">Realização</label>
              <input
                id="completedAt"
                type="datetime-local"
                value={completedAt}
                onChange={(e) => setCompletedAt(e.target.value)}
                disabled={status !== "completed"}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-veritas-electric/50 transition-colors outline-none disabled:opacity-30"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[10px] text-white/40 uppercase font-bold tracking-widest px-1">Vincular Perguntas (QE)</label>
                {interviewQuestions.length === 0 ? (
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[10px] text-white/40 italic">
                        Nenhuma pergunta de entrevista registrada.
                    </div>
                ) : (
                    <div className="space-y-2 max-h-40 overflow-y-auto p-2 bg-white/5 rounded-xl border border-white/10">
                        {interviewQuestions.map(q => (
                            <div key={q.id} className="flex items-start gap-2">
                                <input 
                                    type="checkbox"
                                    id={`q-${q.id}`}
                                    checked={selectedQuestionIds.includes(q.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) setSelectedQuestionIds([...selectedQuestionIds, q.id]);
                                        else setSelectedQuestionIds(selectedQuestionIds.filter(id => id !== q.id));
                                    }}
                                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-veritas-electric focus:ring-veritas-electric/50"
                                />
                                <label htmlFor={`q-${q.id}`} className="text-[11px] text-white/80 cursor-pointer leading-tight py-0.5">
                                    <span className="font-bold text-veritas-electric mr-1">{q.id}:</span>
                                    {q.text}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
          </div>

          {errorMessage && (
            <p className="text-xs text-red-400 font-medium px-1">{errorMessage}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-3 bg-veritas-electric text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-veritas-electric/90 transition-colors shadow-lg shadow-veritas-electric/20"
            >
              {editingId ? "Salvar Alterações" : "Registrar Entrevista"}
            </button>
          </div>
        </form>
      )}

      {interviews.length === 0 ? (
        <div className="text-center py-12 px-6 border border-white/5 rounded-3xl bg-white/5 space-y-4">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                <ClipboardList className="w-8 h-8 text-white/20" />
            </div>
            <p className="text-white/40 text-sm">Nenhuma entrevista planejada para este caso.</p>
            {!isAdding && (
                <button onClick={() => setIsAdding(true)} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-full transition-colors">
                    Adicionar agora
                </button>
            )}
        </div>
      ) : (
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div key={interview.id} className="p-5 rounded-3xl bg-white/5 border border-white/5 space-y-5 hover:border-white/10 transition-colors group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-veritas-graphite flex items-center justify-center border border-white/10 group-hover:border-veritas-electric/30 transition-colors">
                    <User className="w-6 h-6 text-white/40 group-hover:text-veritas-electric transition-colors" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold text-veritas-electric tracking-widest uppercase">{interview.id}</span>
                        <h3 className="text-sm font-bold text-white tracking-tight">{interview.personName}</h3>
                    </div>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{interview.relation}</p>
                  </div>
                </div>
                <Badge className={`${STATUS_BADGE_CLASSES[interview.status]} px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest border-none`}>
                  {STATUS_LABELS[interview.status]}
                </Badge>
              </div>

              <div className="grid gap-3 pt-1">
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
                            <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5" />
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
                            <p className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Perguntas Vinculadas</p>
                            <p className="text-[10px] text-white/60">
                                {interview.questionIds.join(", ")}
                            </p>
                        </div>
                    </div>
                )}
              </div>
              
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                {deletingId === interview.id ? (
                    <div className="flex items-center gap-3 bg-red-500/10 p-2 rounded-xl">
                        <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Remover entrevista?</span>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setDeletingId(null)} 
                                className="px-3 py-1 bg-white/5 text-white/60 text-[9px] font-bold uppercase tracking-widest rounded-md"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={() => {
                                    removeCaseInterview(caseId, interview.id);
                                    setDeletingId(null);
                                }} 
                                className="px-3 py-1 bg-red-500 text-white text-[9px] font-bold uppercase tracking-widest rounded-md"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <button 
                            onClick={() => handleEdit(interview)} 
                            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white/40 hover:text-veritas-electric transition-colors"
                            aria-label="Editar entrevista"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => setDeletingId(interview.id)} 
                            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white/40 hover:text-red-400 transition-colors"
                            aria-label="Remover entrevista"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
