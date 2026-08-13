import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { CaseDossierState, NewCaseDossierItemInput, CaseDossierItem } from "./case-dossier-types";
import { INITIAL_DOSSIERS } from "./mock-dossiers";

interface CaseDossierContextType {
  getDossier: (caseId: string) => CaseDossierState | undefined;
  setMaterialsCollectionComplete: (caseId: string, complete: boolean) => void;
  addDossierItem: (caseId: string, input: NewCaseDossierItemInput) => void;
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
          materialsCollectionComplete: complete
        }
      };
    });
  }, []);

  const addDossierItem = useCallback((caseId: string, input: NewCaseDossierItemInput) => {
    setDossiers(prev => {
      const dossier = prev[caseId];
      if (!dossier) return prev;
      if (!input.title.trim() || !input.origin.trim() || !input.theme.trim() || !input.processReference.trim() || !input.location.trim()) return prev;

      const existingIds = dossier.items.map(i => i.id);
      let maxNum = 0;
      for (const id of existingIds) {
        const match = /^F(\d+)$/.exec(id);
        if (match) {
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
          materialsCollectionComplete: false
        }
      };
    });
  }, []);

  return (
    <CaseDossierContext.Provider value={{ getDossier, setMaterialsCollectionComplete, addDossierItem }}>
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
