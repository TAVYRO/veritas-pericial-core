import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { CaseDossierState } from "./case-dossier-types";
import { INITIAL_DOSSIERS } from "./mock-dossiers";

interface CaseDossierContextType {
  getDossier: (caseId: string) => CaseDossierState | undefined;
  setMaterialsCollectionComplete: (caseId: string, complete: boolean) => void;
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

  return (
    <CaseDossierContext.Provider value={{ getDossier, setMaterialsCollectionComplete }}>
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
