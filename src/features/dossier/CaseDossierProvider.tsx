import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { CaseDossierState, NewCaseDossierItemInput, CaseDossierItem } from "./case-dossier-types";
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
          triageComplete: complete === false ? false : dossier.triageComplete
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
          triageComplete: false
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
          triageComplete: false
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
          triageComplete: false
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
          triageComplete: false
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
      reopenTriage
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
