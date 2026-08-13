import type { CaseDossierState } from "@/features/dossier/case-dossier-types";

export type CaseCriticalGapKind =
  | "official-question-insufficient"
  | "cancelled-interview";

export interface CaseCriticalGap {
  id: string;
  kind: CaseCriticalGapKind;
  title: string;
  reason: string;
  blocking: true;
  questionId: string | null;
  interviewId: string | null;
  sourceIds: string[];
  relatedQuestionIds: string[];
}

/**
 * Motor puro de derivação das Lacunas Críticas.
 * Deriva lacunas exclusivamente de estados reais existentes no CaseDossierState.
 * 
 * Regras:
 * 1. QO insuficiente (kind === "official" && responseStatus === "insufficient")
 * 2. Entrevista cancelada (status === "cancelled")
 */
export function deriveCaseCriticalGaps(
  dossier: CaseDossierState
): CaseCriticalGap[] {
  const gaps: CaseCriticalGap[] = [];

  // 1. Quesitos Oficiais Insuficientes
  const insufficientQuestions = dossier.questions.filter(
    (q) => q.kind === "official" && q.responseStatus === "insufficient"
  );

  for (const question of insufficientQuestions) {
    gaps.push({
      id: `GAP-${question.id}`,
      kind: "official-question-insufficient",
      title: question.text,
      reason: "O quesito oficial foi marcado como insuficiente para resposta com os elementos atualmente registrados.",
      blocking: true,
      questionId: question.id,
      interviewId: null,
      sourceIds: [...question.sourceIds],
      relatedQuestionIds: [question.id],
    });
  }

  // 2. Entrevistas Canceladas
  const cancelledInterviews = dossier.interviews.filter(
    (i) => i.status === "cancelled"
  );

  for (const interview of cancelledInterviews) {
    // Localizar QEs vinculadas (existem em questions && kind === interview && em interview.questionIds)
    const relatedQEs = dossier.questions.filter(
      (q) => q.kind === "interview" && interview.questionIds.includes(q.id)
    );

    // Coletar sourceIds das QEs relacionadas
    const rawSourceIds: string[] = [];
    for (const qe of relatedQEs) {
      rawSourceIds.push(...qe.sourceIds);
    }

    // Remover duplicados
    const uniqueSourceIds = Array.from(new Set(rawSourceIds));
    
    // Preservar ordem canônica de dossier.items
    const orderedSourceIds = dossier.items
      .map((item) => item.id)
      .filter((id) => uniqueSourceIds.includes(id));

    // relatedQuestionIds deve conter somente IDs que existem em dossier.questions 
    // E kind === "interview" E estão em interview.questionIds.
    // A ordem deve seguir dossier.questions.
    const orderedRelatedQuestionIds = dossier.questions
      .filter((q) => q.kind === "interview" && interview.questionIds.includes(q.id))
      .map((q) => q.id);

    gaps.push({
      id: `GAP-${interview.id}`,
      kind: "cancelled-interview",
      title: `Entrevista cancelada: ${interview.personName}`,
      reason: "A entrevista registrada como necessária não foi concluída e permanece como impedimento para a suficiência do caso.",
      blocking: true,
      questionId: null,
      interviewId: interview.id,
      sourceIds: orderedSourceIds,
      relatedQuestionIds: orderedRelatedQuestionIds,
    });
  }

  // Máximo de 5 lacunas seguindo a prioridade (QO primeiro, depois Entrevistas)
  return gaps.slice(0, 5);
}
