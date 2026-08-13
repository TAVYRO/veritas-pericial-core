import { CaseData } from "./case-types";
import { CaseDossierState, CaseQuestion, CaseInterview } from "../dossier/case-dossier-types";

export type CaseSufficiencyStatus = "OK" | "FALTA" | "NÃO SE APLICA";

export interface CaseSufficiencyItem {
  id: string;
  category: string;
  label: string;
  status: CaseSufficiencyStatus;
  detail: string;
}

export interface CaseSufficiencyEvaluation {
  items: CaseSufficiencyItem[];
  progress: number;
  isSufficient: boolean;
  missingCount: number;
}

/**
 * Motor puro de avaliação do Gate de Suficiência.
 * Baseia-se exclusivamente em fatos presentes no CaseData e CaseDossierState.
 */
export function evaluateCaseSufficiency(
  caseData: CaseData,
  dossier: CaseDossierState
): CaseSufficiencyEvaluation {
  const items: CaseSufficiencyItem[] = [
    evaluateCaseIdentification(caseData),
    evaluateCaseProfessionals(caseData),
    evaluateDocumentModality(caseData),
    evaluateMaterials(dossier),
    evaluateTriage(dossier),
    evaluateTechnicalScope(dossier),
    evaluateOfficialQuestions(dossier),
    evaluateOfficialAnswers(dossier),
    evaluateInterviews(dossier),
  ];

  const applicableItems = items.filter((item) => item.status !== "NÃO SE APLICA");
  const okCount = applicableItems.filter((item) => item.status === "OK").length;
  const missingCount = items.filter((item) => item.status === "FALTA").length;

  const progress =
    applicableItems.length > 0
      ? Math.round((okCount / applicableItems.length) * 100)
      : 0;

  const isSufficient = missingCount === 0 && items.length > 0;

  return {
    items,
    progress,
    isSufficient,
    missingCount,
  };
}

// --- Funções Auxiliares de Avaliação (Puras) ---

function evaluateCaseIdentification(caseData: CaseData): CaseSufficiencyItem {
  const isOk =
    caseData.caseNumber.trim() !== "" &&
    caseData.court.trim() !== "" &&
    caseData.district.trim() !== "" &&
    caseData.state.trim() !== "";

  return {
    id: "case-identification",
    category: "Identificação",
    label: "Dados do processo",
    status: isOk ? "OK" : "FALTA",
    detail: isOk
      ? "Dados de identificação do processo preenchidos."
      : "Número, tribunal, comarca ou estado pendentes.",
  };
}

function evaluateCaseProfessionals(caseData: CaseData): CaseSufficiencyItem {
  const isOk = caseData.professionals.length > 0;

  return {
    id: "case-professionals",
    category: "Identificação",
    label: "Profissionais do caso",
    status: isOk ? "OK" : "FALTA",
    detail: isOk
      ? `${caseData.professionals.length} profissional(is) vinculado(s).`
      : "Nenhum profissional vinculado ao caso.",
  };
}

function evaluateDocumentModality(caseData: CaseData): CaseSufficiencyItem {
  const isOk =
    !!caseData.documentType && caseData.modality.trim() !== "";

  return {
    id: "document-modality",
    category: "Identificação",
    label: "Modalidade documental",
    status: isOk ? "OK" : "FALTA",
    detail: isOk
      ? `Tipo e modalidade definidos: ${caseData.modality}.`
      : "Tipo de documento ou modalidade não definida.",
  };
}

function evaluateMaterials(dossier: CaseDossierState): CaseSufficiencyItem {
  const isOk =
    dossier.items.length > 0 && dossier.materialsCollectionComplete === true;

  return {
    id: "materials",
    category: "Coleta e fontes",
    label: "Materiais coletados",
    status: isOk ? "OK" : "FALTA",
    detail: isOk
      ? `${dossier.items.length} material(is) registrado(s) e coleta marcada como concluída.`
      : dossier.items.length === 0
      ? "Nenhum material coletado."
      : "Coleta de materiais ainda não foi marcada como concluída.",
  };
}

function evaluateTriage(dossier: CaseDossierState): CaseSufficiencyItem {
  const isOk = dossier.triageComplete === true;

  return {
    id: "triage",
    category: "Coleta e fontes",
    label: "Triagem dos materiais",
    status: isOk ? "OK" : "FALTA",
    detail: isOk
      ? "Triagem dos materiais marcada como concluída."
      : "Triagem ainda não foi concluída.",
  };
}

function evaluateTechnicalScope(dossier: CaseDossierState): CaseSufficiencyItem {
  const isOk = dossier.technicalScope.confirmed === true;

  return {
    id: "technical-scope",
    category: "Delimitação técnica",
    label: "Objeto, finalidade e limites",
    status: isOk ? "OK" : "FALTA",
    detail: isOk
      ? "Escopo técnico confirmado pelo profissional."
      : "Objeto, finalidade ou limites não confirmados.",
  };
}

function evaluateOfficialQuestions(dossier: CaseDossierState): CaseSufficiencyItem {
  const officials = dossier.questions.filter((q) => q.kind === "official");

  if (officials.length === 0) {
    return {
      id: "official-questions",
      category: "Quesitos",
      label: "Quesitos oficiais",
      status: "NÃO SE APLICA",
      detail: "Nenhum quesito oficial foi registrado para este caso.",
    };
  }

  return {
    id: "official-questions",
    category: "Quesitos",
    label: "Quesitos oficiais",
    status: "OK",
    detail: `${officials.length} quesito(s) oficial(is) registrado(s).`,
  };
}

function evaluateOfficialAnswers(dossier: CaseDossierState): CaseSufficiencyItem {
  const officials = dossier.questions.filter((q) => q.kind === "official");

  if (officials.length === 0) {
    return {
      id: "official-answers",
      category: "Quesitos",
      label: "Respostas aos quesitos oficiais",
      status: "NÃO SE APLICA",
      detail: "Nenhum quesito oficial foi registrado para este caso.",
    };
  }

  const answeredCount = officials.filter((q) => q.responseStatus === "answered").length;
  const isOk = answeredCount === officials.length;

  return {
    id: "official-answers",
    category: "Quesitos",
    label: "Respostas aos quesitos oficiais",
    status: isOk ? "OK" : "FALTA",
    detail: isOk
      ? `Todos os ${officials.length} quesitos oficiais estão respondidos.`
      : `${answeredCount} de ${officials.length} quesitos oficiais estão respondidos.`,
  };
}

function evaluateInterviews(dossier: CaseDossierState): CaseSufficiencyItem {
  const interviews = dossier.interviews;

  if (interviews.length === 0) {
    return {
      id: "interviews",
      category: "Procedimentos",
      label: "Entrevistas planejadas",
      status: "FALTA",
      detail: "Nenhuma decisão de entrevista foi registrada.",
    };
  }

  const allNotApplicable = interviews.every((i) => i.status === "not-applicable");
  if (allNotApplicable) {
    return {
      id: "interviews",
      category: "Procedimentos",
      label: "Entrevistas planejadas",
      status: "NÃO SE APLICA",
      detail: "As entrevistas registradas foram marcadas como não aplicáveis.",
    };
  }

  const blockingStatuses = ["planned", "scheduled", "cancelled"];
  const hasBlocking = interviews.some((i) => blockingStatuses.includes(i.status));

  if (hasBlocking) {
    const plannedCount = interviews.filter((i) => i.status === "planned").length;
    const scheduledCount = interviews.filter((i) => i.status === "scheduled").length;
    const cancelledCount = interviews.filter((i) => i.status === "cancelled").length;
    
    const details = [];
    if (plannedCount > 0) details.push(`${plannedCount} planejada(s)`);
    if (scheduledCount > 0) details.push(`${scheduledCount} agendada(s)`);
    if (cancelledCount > 0) details.push(`${cancelledCount} cancelada(s)`);

    return {
      id: "interviews",
      category: "Procedimentos",
      label: "Entrevistas planejadas",
      status: "FALTA",
      detail: `Entrevistas pendentes ou canceladas: ${details.join(", ")}.`,
    };
  }

  const completedCount = interviews.filter((i) => i.status === "completed").length;
  // Se chegamos aqui, ou são completed ou not-applicable, e pelo menos uma completed deve existir (devido ao allNotApplicable check anterior)
  return {
    id: "interviews",
    category: "Procedimentos",
    label: "Entrevistas planejadas",
    status: "OK",
    detail: `${completedCount} entrevista(s) concluída(s).`,
  };
}
