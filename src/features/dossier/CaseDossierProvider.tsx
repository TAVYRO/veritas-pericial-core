import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { CaseDossierState, NewCaseDossierItemInput, CaseDossierItem, CaseTechnicalScope, NewCaseQuestionInput, CaseQuestion, CaseInterview, NewCaseInterviewInput } from "./case-dossier-types";
import { INITIAL_DOSSIERS } from "./mock-dossiers";

interface CaseDossierContextType {
  getDossier: (caseId: string) => CaseDossierState | undefined;
  setMaterialsCollectionComplete: (caseId: string, complete: boolean) => void;
  addDossierItem: (caseId: string, input: NewCaseDossierItemInput) => void;
  setTriageReviewed: (caseId: string, sourceId: string, reviewed: boolean) => void;
  setTriageNote: (caseId: string, sourceId: string, note: string) => void;
  canCompleteTriage: (caseId: string) => boolean;
  completeTriage: (caseId: string) => void;
  reopenTriage: (caseId: string) => void;
  updateTechnicalScope: (caseId: string, patch: Partial<Pick<CaseTechnicalScope, "object" | "purpose" | "limits">>) => void;
  setTechnicalScopeSources: (caseId: string, sourceIds: string[]) => void;
  canConfirmTechnicalScope: (caseId: string) => boolean;
  confirmTechnicalScope: (caseId: string) => void;
  reopenTechnicalScope: (caseId: string) => void;
  addCaseQuestion: (caseId: string, input: NewCaseQuestionInput) => void;
  updateCaseQuestion: (caseId: string, questionId: string, patch: Partial<Pick<CaseQuestion, "text" | "author" | "sourceIds">>) => void;
  removeCaseQuestion: (caseId: string, questionId: string) => void;
  setCaseQuestionResponse: (caseId: string, questionId: string, response: string) => void;
  setCaseQuestionInsufficient: (caseId: string, questionId: string) => void;
  clearCaseQuestionResponse: (caseId: string, questionId: string) => void;
  addCaseInterview: (caseId: string, input: NewCaseInterviewInput) => void;
  updateCaseInterview: (caseId: string, interviewId: string, patch: Partial<Pick<CaseInterview, "personName" | "relation" | "professionalIds" | "purpose" | "status" | "scheduledAt" | "completedAt" | "questionIds">>) => void;
  removeCaseInterview: (caseId: string, interviewId: string) => void;
}

const CaseDossierContext = createContext<CaseDossierContextType | undefined>(undefined);

export function CaseDossierProvider({ children }: { children: ReactNode }) {
  const [dossiers, setDossiers] = useState<Record<string, CaseDossierState>>(INITIAL_DOSSIERS);

  const getDossier = useCallback((caseId: string) => {
    return dossiers[caseId];
  }, [dossiers]);

  const setMaterialsCollectionComplete = useCallback((caseId: string, complete: boolean) => {
    setDossiers(prev => {
      const dossier = prev[caseId];
      if (!dossier) return prev;
      
      return {
        ...prev,
        [caseId]: {
          ...dossier,
          materialsCollectionComplete: complete,
          triageComplete: complete === false ? false : dossier.triageComplete,
          technicalScope: complete === false ? { ...dossier.technicalScope, confirmed: false } : dossier.technicalScope
        }
      };
    });
  }, []);

  const addDossierItem = useCallback((caseId: string, input: NewCaseDossierItemInput) => {
    setDossiers(prev => {
      const dossier = prev[caseId];
      if (!dossier) return prev;
      if (!input.title.trim() || !input.origin.trim() || !input.theme.trim() || !input.processReference.trim() || !input.location.trim()) return prev;
      
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (input.date !== null && !dateRegex.test(input.date)) return prev;

      const existingIds = dossier.items.map(i => i.id);
      let maxNum = 0;
      for (const id of existingIds) {
        const match = /^F(\d+)$/.exec(id);
        if (match && match[1]) {
          const num = parseInt(match[1], 10);
          if (!isNaN(num)) maxNum = Math.max(maxNum, num);
        }
      }
      const newId = `F${(maxNum + 1).toString().padStart(2, "0")}`;
      
      const newItem: CaseDossierItem = {
        ...input,
        id: newId,
        title: input.title.trim(),
        origin: input.origin.trim(),
        theme: input.theme.trim(),
        processReference: input.processReference.trim(),
        location: input.location.trim(),
        limitations: input.limitations.map(l => l.trim()).filter(l => l !== ""),
      };

      return {
        ...prev,
        [caseId]: {
          ...dossier,
          items: [...dossier.items, newItem],
          materialsCollectionComplete: false,
          triageComplete: false,
          technicalScope: { ...dossier.technicalScope, confirmed: false }
        }
      };
    });
  }, []);

  const setTriageReviewed = useCallback((caseId: string, sourceId: string, reviewed: boolean) => {
    setDossiers(prev => {
      const dossier = prev[caseId];
      if (!dossier || !dossier.items.some(item => item.id === sourceId)) return prev;

      const existingReview = dossier.triageReviews.find(r => r.sourceId === sourceId);
      
      if (existingReview && existingReview.reviewed === reviewed) return prev;

      let newReviews;
      if (existingReview) {
        newReviews = dossier.triageReviews.map(r => 
          r.sourceId === sourceId ? { ...r, reviewed } : r
        );
      } else {
        newReviews = [...dossier.triageReviews, { sourceId, reviewed, note: "" }];
      }

      return {
        ...prev,
        [caseId]: {
          ...dossier,
          triageReviews: newReviews,
          triageComplete: false,
          technicalScope: { ...dossier.technicalScope, confirmed: false }
        }
      };
    });
  }, []);

  const setTriageNote = useCallback((caseId: string, sourceId: string, note: string) => {
    setDossiers(prev => {
      const dossier = prev[caseId];
      if (!dossier || !dossier.items.some(item => item.id === sourceId)) return prev;

      const existingReview = dossier.triageReviews.find(r => r.sourceId === sourceId);
      
      if (existingReview && existingReview.note === note) return prev;

      let newReviews;
      if (existingReview) {
        newReviews = dossier.triageReviews.map(r => 
          r.sourceId === sourceId ? { ...r, note } : r
        );
      } else {
        newReviews = [...dossier.triageReviews, { sourceId, reviewed: false, note }];
      }

      return {
        ...prev,
        [caseId]: {
          ...dossier,
          triageReviews: newReviews,
          triageComplete: false,
          technicalScope: { ...dossier.technicalScope, confirmed: false }
        }
      };
    });
  }, []);

  const canCompleteTriage = useCallback((caseId: string) => {
    const dossier = dossiers[caseId];
    if (!dossier) return false;
    if (!dossier.materialsCollectionComplete) return false;
    if (dossier.items.length === 0) return false;
    
    return dossier.items.every(item => {
      const review = dossier.triageReviews.find(r => r.sourceId === item.id);
      return review?.reviewed === true;
    });
  }, [dossiers]);

  const completeTriage = useCallback((caseId: string) => {
    setDossiers(prev => {
      const dossier = prev[caseId];
      if (!dossier) return prev;
      
      const canComplete = dossier.materialsCollectionComplete && 
                          dossier.items.length > 0 && 
                          dossier.items.every(item => {
                            const review = dossier.triageReviews.find(r => r.sourceId === item.id);
                            return review?.reviewed === true;
                          });
      
      if (!canComplete) return prev;

      return {
        ...prev,
        [caseId]: {
          ...dossier,
          triageComplete: true
        }
      };
    });
  }, []);

  const reopenTriage = useCallback((caseId: string) => {
    setDossiers(prev => {
      const dossier = prev[caseId];
      if (!dossier) return prev;

      return {
        ...prev,
        [caseId]: {
          ...dossier,
          triageComplete: false,
          technicalScope: { ...dossier.technicalScope, confirmed: false }
        }
      };
    });
  }, []);

  const updateTechnicalScope = useCallback((caseId: string, patch: Partial<Pick<CaseTechnicalScope, "object" | "purpose" | "limits">>) => {
    setDossiers(prev => {
      const dossier = prev[caseId];
      if (!dossier) return prev;

      const hasChange = (patch.object !== undefined && patch.object !== dossier.technicalScope.object) ||
                        (patch.purpose !== undefined && patch.purpose !== dossier.technicalScope.purpose) ||
                        (patch.limits !== undefined && patch.limits !== dossier.technicalScope.limits);

      if (!hasChange) return prev;

      return {
        ...prev,
        [caseId]: {
          ...dossier,
          technicalScope: {
            ...dossier.technicalScope,
            ...patch,
            confirmed: false
          }
        }
      };
    });
  }, []);

  const setTechnicalScopeSources = useCallback((caseId: string, sourceIds: string[]) => {
    setDossiers(prev => {
      const dossier = prev[caseId];
      if (!dossier) return prev;

      const requestedIds = new Set(sourceIds);
      const canonicalIds = dossier.items
        .map(item => item.id)
        .filter(id => requestedIds.has(id));
      
      const currentIds = dossier.technicalScope.sourceIds;
      const hasChange = canonicalIds.length !== currentIds.length || 
                        canonicalIds.some((id, idx) => id !== currentIds[idx]);

      if (!hasChange) return prev;

      return {
        ...prev,
        [caseId]: {
          ...dossier,
          technicalScope: {
            ...dossier.technicalScope,
            sourceIds: canonicalIds,
            confirmed: false
          }
        }
      };
    });
  }, []);

  const canConfirmTechnicalScope = useCallback((caseId: string) => {
    const dossier = dossiers[caseId];
    if (!dossier) return false;
    if (!dossier.triageComplete) return false;
    
    const scope = dossier.technicalScope;
    if (!scope.object.trim()) return false;
    if (!scope.purpose.trim()) return false;
    if (!scope.limits.trim()) return false;
    if (scope.sourceIds.length === 0) return false;

    const allSourcesExist = scope.sourceIds.every(id => 
      dossier.items.some(item => item.id === id)
    );
    
    return allSourcesExist;
  }, [dossiers]);

  const confirmTechnicalScope = useCallback((caseId: string) => {
    setDossiers(prev => {
      const dossier = prev[caseId];
      if (!dossier) return prev;

      const scope = dossier.technicalScope;
      const canConfirm = dossier.triageComplete &&
                         scope.object.trim() !== "" &&
                         scope.purpose.trim() !== "" &&
                         scope.limits.trim() !== "" &&
                         scope.sourceIds.length > 0 &&
                         scope.sourceIds.every(id => dossier.items.some(item => item.id === id));

      if (!canConfirm) return prev;

      return {
        ...prev,
        [caseId]: {
          ...dossier,
          technicalScope: {
            ...scope,
            object: scope.object.trim(),
            purpose: scope.purpose.trim(),
            limits: scope.limits.trim(),
            confirmed: true
          }
        }
      };
    });
  }, []);

  const reopenTechnicalScope = useCallback((caseId: string) => {
    setDossiers(prev => {
      const dossier = prev[caseId];
      if (!dossier) return prev;

      return {
        ...prev,
        [caseId]: {
          ...dossier,
          technicalScope: {
            ...dossier.technicalScope,
            confirmed: false
          }
        }
      };
    });
  }, []);

  const addCaseQuestion = useCallback((caseId: string, input: NewCaseQuestionInput) => {
    setDossiers(prev => {
      const dossier = prev[caseId];
      if (!dossier) return prev;
      if (!input.text.trim()) return prev;

      const prefix = input.kind === "official" ? "QO" : input.kind === "complementary" ? "QC" : "QE";
      const existingIds = dossier.questions
        .filter(q => q.id.startsWith(prefix))
        .map(q => q.id);

      let maxNum = 0;
      const regex = new RegExp(`^${prefix}(\\d+)$`);
      for (const id of existingIds) {
        const match = regex.exec(id);
        if (match && match[1]) {
          const num = parseInt(match[1], 10);
          if (!isNaN(num)) maxNum = Math.max(maxNum, num);
        }
      }

      const newId = `${prefix}${(maxNum + 1).toString().padStart(2, "0")}`;
      
      const normalizedAuthor = input.author && input.author.trim() !== "" ? input.author.trim() : null;
      
      const canonicalSourceIds = dossier.items
        .map(item => item.id)
        .filter(id => input.sourceIds.includes(id));

      const newQuestion: CaseQuestion = {
        id: newId,
        kind: input.kind,
        text: input.text.trim(),
        author: input.kind === "interview" ? null : normalizedAuthor,
        sourceIds: canonicalSourceIds,
        response: "",
        responseStatus: "pending"
      };

      return {
        ...prev,
        [caseId]: {
          ...dossier,
          questions: [...dossier.questions, newQuestion]
        }
      };
    });
  }, []);

  const updateCaseQuestion = useCallback((caseId: string, questionId: string, patch: Partial<Pick<CaseQuestion, "text" | "author" | "sourceIds">>) => {
    setDossiers(prev => {
      const dossier = prev[caseId];
      if (!dossier) return prev;
      
      const question = dossier.questions.find(q => q.id === questionId);
      if (!question) return prev;

      const normalizedAuthor = patch.author !== undefined 
        ? (patch.author && patch.author.trim() !== "" ? patch.author.trim() : null)
        : question.author;

      const canonicalSourceIds = patch.sourceIds !== undefined
        ? dossier.items.map(item => item.id).filter(id => patch.sourceIds!.includes(id))
        : question.sourceIds;

      const text = patch.text !== undefined ? patch.text.trim() : question.text;
      if (patch.text !== undefined && !text) return prev;

      // Detect real change
      const hasTextChanged = text !== question.text;
      const hasAuthorChanged = normalizedAuthor !== question.author;
      const hasSourcesChanged = canonicalSourceIds.length !== question.sourceIds.length ||
        canonicalSourceIds.some((id, idx) => id !== question.sourceIds[idx]);

      if (!hasTextChanged && !hasAuthorChanged && !hasSourcesChanged) {
        return prev;
      }

      const updatedQuestion: CaseQuestion = {
        ...question,
        text,
        author: question.kind === "interview" ? null : normalizedAuthor,
        sourceIds: canonicalSourceIds,
        responseStatus: (question.kind !== "interview" && (question.responseStatus === "answered" || question.responseStatus === "insufficient")) 
          ? "pending" 
          : question.responseStatus
      };

      return {
        ...prev,
        [caseId]: {
          ...dossier,
          questions: dossier.questions.map(q => q.id === questionId ? updatedQuestion : q)
        }
      };
    });
  }, []);

  const removeCaseQuestion = useCallback((caseId: string, questionId: string) => {
    setDossiers(prev => {
      const dossier = prev[caseId];
      if (!dossier) return prev;

      return {
        ...prev,
        [caseId]: {
          ...dossier,
          questions: dossier.questions.filter(q => q.id !== questionId),
          interviews: dossier.interviews.map(interview => ({
            ...interview,
            questionIds: interview.questionIds.filter(id => id !== questionId)
          }))
        }
      };
    });
  }, []);

  const addCaseInterview = useCallback((caseId: string, input: NewCaseInterviewInput) => {
    setDossiers(prev => {
      const dossier = prev[caseId];
      if (!dossier) return prev;

      // Normalization and validation
      const personName = input.personName.trim();
      const relation = input.relation.trim();
      const purpose = input.purpose.trim();

      if (!personName || !relation || !purpose) return prev;

      const professionalIds = Array.from(new Set(
        input.professionalIds
          .map(id => id.trim())
          .filter(id => id !== "")
      ));

      if (professionalIds.length === 0) return prev;

      const scheduledAt = input.scheduledAt?.trim() || null;
      const completedAt = input.completedAt?.trim() || null;

      // Status invariants
      if (input.status === "scheduled" && !scheduledAt) return prev;
      if (input.status === "completed" && !completedAt) return prev;

      const finalScheduledAt = (input.status === "planned" || input.status === "scheduled" || input.status === "completed" || input.status === "cancelled") ? scheduledAt : null;
      const finalCompletedAt = (input.status === "completed") ? completedAt : null;

      // Final invariant check after status-specific rules
      if (input.status === "scheduled" && !finalScheduledAt) return prev;
      if (input.status === "completed" && !finalCompletedAt) return prev;

      // Canonical questionIds
      const canonicalQuestionIds = dossier.questions
        .filter(q => q.kind === "interview" && input.questionIds.includes(q.id))
        .map(q => q.id);

      // Generate ENTxx ID
      const existingIds = dossier.interviews.map(i => i.id);
      let maxNum = 0;
      for (const id of existingIds) {
        const match = /^ENT(\d+)$/.exec(id);
        if (match && match[1]) {
          const num = parseInt(match[1], 10);
          if (!isNaN(num)) maxNum = Math.max(maxNum, num);
        }
      }
      const newId = `ENT${(maxNum + 1).toString().padStart(2, "0")}`;

      const newInterview: CaseInterview = {
        id: newId,
        personName,
        relation,
        purpose,
        professionalIds,
        status: input.status,
        scheduledAt: finalScheduledAt,
        completedAt: finalCompletedAt,
        questionIds: canonicalQuestionIds
      };

      return {
        ...prev,
        [caseId]: {
          ...dossier,
          interviews: [...dossier.interviews, newInterview]
        }
      };
    });
  }, []);

  const updateCaseInterview = useCallback((caseId: string, interviewId: string, patch: Partial<Pick<CaseInterview, "personName" | "relation" | "professionalIds" | "purpose" | "status" | "scheduledAt" | "completedAt" | "questionIds">>) => {
    setDossiers(prev => {
      const dossier = prev[caseId];
      if (!dossier) return prev;

      const interview = dossier.interviews.find(i => i.id === interviewId);
      if (!interview) return prev;

      // Normalization
      const personName = patch.personName !== undefined ? patch.personName.trim() : interview.personName;
      const relation = patch.relation !== undefined ? patch.relation.trim() : interview.relation;
      const purpose = patch.purpose !== undefined ? patch.purpose.trim() : interview.purpose;

      // Required field validation
      if (patch.personName !== undefined && !personName) return prev;
      if (patch.relation !== undefined && !relation) return prev;
      if (patch.purpose !== undefined && !purpose) return prev;

      let professionalIds = interview.professionalIds;
      if (patch.professionalIds !== undefined) {
        professionalIds = Array.from(new Set(
          patch.professionalIds
            .map(id => id.trim())
            .filter(id => id !== "")
        ));
        if (professionalIds.length === 0) return prev;
      }

      const scheduledAt = patch.scheduledAt !== undefined ? (patch.scheduledAt?.trim() || null) : interview.scheduledAt;
      const completedAt = patch.completedAt !== undefined ? (patch.completedAt?.trim() || null) : interview.completedAt;
      const status = patch.status !== undefined ? patch.status : interview.status;

      // Status invariants apply to the final resulting state
      let finalScheduledAt = scheduledAt;
      let finalCompletedAt = completedAt;

      if (status === "planned") {
        finalCompletedAt = null;
      } else if (status === "scheduled") {
        if (!scheduledAt) return prev;
        finalCompletedAt = null;
      } else if (status === "completed") {
        if (!completedAt) return prev;
      } else if (status === "not-applicable") {
        finalScheduledAt = null;
        finalCompletedAt = null;
      } else if (status === "cancelled") {
        finalCompletedAt = null;
      }

      const questionIds = patch.questionIds !== undefined
        ? dossier.questions.filter(q => q.kind === "interview" && patch.questionIds!.includes(q.id)).map(q => q.id)
        : interview.questionIds;

      // Change detection
      const hasChanged = personName !== interview.personName ||
        relation !== interview.relation ||
        purpose !== interview.purpose ||
        status !== interview.status ||
        finalScheduledAt !== interview.scheduledAt ||
        finalCompletedAt !== interview.completedAt ||
        professionalIds.length !== interview.professionalIds.length ||
        professionalIds.some((id, idx) => id !== interview.professionalIds[idx]) ||
        questionIds.length !== interview.questionIds.length ||
        questionIds.some((id, idx) => id !== interview.questionIds[idx]);

      if (!hasChanged) return prev;

      const updatedInterview: CaseInterview = {
        ...interview,
        personName,
        relation,
        purpose,
        professionalIds,
        status,
        scheduledAt: finalScheduledAt,
        completedAt: finalCompletedAt,
        questionIds
      };

      return {
        ...prev,
        [caseId]: {
          ...dossier,
          interviews: dossier.interviews.map(i => i.id === interviewId ? updatedInterview : i)
        }
      };
    });
  }, []);

  const removeCaseInterview = useCallback((caseId: string, interviewId: string) => {
    setDossiers(prev => {
      const dossier = prev[caseId];
      if (!dossier) return prev;
      if (!dossier.interviews.some(i => i.id === interviewId)) return prev;

      return {
        ...prev,
        [caseId]: {
          ...dossier,
          interviews: dossier.interviews.filter(i => i.id !== interviewId)
        }
      };
    });
  }, []);

  const setCaseQuestionResponse = useCallback((caseId: string, questionId: string, response: string) => {
    setDossiers(prev => {
      const dossier = prev[caseId];
      if (!dossier) return prev;

      const question = dossier.questions.find(q => q.id === questionId);
      if (!question || question.kind === "interview") return prev;

      if (!response.trim()) return prev;

      const updatedQuestion: CaseQuestion = {
        ...question,
        response: response.trim(),
        responseStatus: "answered"
      };

      return {
        ...prev,
        [caseId]: {
          ...dossier,
          questions: dossier.questions.map(q => q.id === questionId ? updatedQuestion : q)
        }
      };
    });
  }, []);

  const setCaseQuestionInsufficient = useCallback((caseId: string, questionId: string) => {
    setDossiers(prev => {
      const dossier = prev[caseId];
      if (!dossier) return prev;

      const question = dossier.questions.find(q => q.id === questionId);
      if (!question || question.kind === "interview") return prev;

      const updatedQuestion: CaseQuestion = {
        ...question,
        response: "",
        responseStatus: "insufficient"
      };

      return {
        ...prev,
        [caseId]: {
          ...dossier,
          questions: dossier.questions.map(q => q.id === questionId ? updatedQuestion : q)
        }
      };
    });
  }, []);

  const clearCaseQuestionResponse = useCallback((caseId: string, questionId: string) => {
    setDossiers(prev => {
      const dossier = prev[caseId];
      if (!dossier) return prev;

      const question = dossier.questions.find(q => q.id === questionId);
      if (!question) return prev;

      const updatedQuestion: CaseQuestion = {
        ...question,
        response: "",
        responseStatus: "pending"
      };

      return {
        ...prev,
        [caseId]: {
          ...dossier,
          questions: dossier.questions.map(q => q.id === questionId ? updatedQuestion : q)
        }
      };
    });
  }, []);

  return (

    <CaseDossierContext.Provider value={{ 
      getDossier, 
      setMaterialsCollectionComplete, 
      addDossierItem,
      setTriageReviewed,
      setTriageNote,
      canCompleteTriage,
      completeTriage,
      reopenTriage,
      updateTechnicalScope,
      setTechnicalScopeSources,
      canConfirmTechnicalScope,
      confirmTechnicalScope,
      reopenTechnicalScope,
      addCaseQuestion,
      updateCaseQuestion,
      removeCaseQuestion,
      setCaseQuestionResponse,
      setCaseQuestionInsufficient,
      clearCaseQuestionResponse,
      addCaseInterview,
      updateCaseInterview,
      removeCaseInterview
    }}>

      {children}
    </CaseDossierContext.Provider>
  );
}

export function useCaseDossier() {
  const context = useContext(CaseDossierContext);
  if (context === undefined) {
    throw new Error("useCaseDossier must be used within a CaseDossierProvider");
  }
  return context;
}
