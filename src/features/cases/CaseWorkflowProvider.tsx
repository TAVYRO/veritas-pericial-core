import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { CaseData, CaseWorkflowState, DocumentTypeId, SignatureAuthorization } from './case-types';
import { MOCK_CASES, INITIAL_WORKFLOWS } from './mock-cases';

interface CaseWorkflowContextType {
  getCase: (caseId: string) => CaseData | undefined;
  getWorkflow: (caseId: string) => CaseWorkflowState | undefined;
  updateWorkflow: (caseId: string, patch: Partial<CaseWorkflowState>) => void;
  authorizeSignature: (caseId: string, professionalId: string, versionId: string) => void;
  revokeSignature: (caseId: string, professionalId: string, versionId: string) => void;
  releaseFinal: (caseId: string) => void;
  // Derived state helpers
  getApprovalsCount: (caseId: string) => number;
  isFullyApproved: (caseId: string) => boolean;
  isSignatureApproved: (caseId: string, professionalId: string, versionId: string) => boolean;
}

const CaseWorkflowContext = createContext<CaseWorkflowContextType | undefined>(undefined);

export function CaseWorkflowProvider({ children }: { children: React.ReactNode }) {
  // Using simple React state for memory-only persistence during SPA session
  const [workflows, setWorkflows] = useState<Record<string, CaseWorkflowState>>(INITIAL_WORKFLOWS);

  const getCase = useCallback((caseId: string) => {
    return MOCK_CASES[caseId];
  }, []);

  const getWorkflow = useCallback((caseId: string) => {
    return workflows[caseId];
  }, [workflows]);

  const updateWorkflow = useCallback((caseId: string, patch: Partial<CaseWorkflowState>) => {
    setWorkflows(prev => {
      const current = prev[caseId];
      if (!current) return prev;
      return {
        ...prev,
        [caseId]: { ...current, ...patch }
      };
    });
  }, []);

  const authorizeSignature = useCallback((caseId: string, professionalId: string, versionId: string) => {
    setWorkflows(prev => {
      const current = prev[caseId];
      if (!current) return prev;
      
      const exists = current.signatureAuthorizations.some(
        a => a.professionalId === professionalId && a.versionId === versionId
      );
      
      if (exists) {
        return {
          ...prev,
          [caseId]: {
            ...current,
            signatureAuthorizations: current.signatureAuthorizations.map(a => 
              (a.professionalId === professionalId && a.versionId === versionId)
                ? { ...a, authorized: true }
                : a
            )
          }
        };
      }

      return {
        ...prev,
        [caseId]: {
          ...current,
          signatureAuthorizations: [
            ...current.signatureAuthorizations,
            { professionalId, versionId, authorized: true }
          ]
        }
      };
    });
  }, []);

  const revokeSignature = useCallback((caseId: string, professionalId: string, versionId: string) => {
    setWorkflows(prev => {
      const current = prev[caseId];
      if (!current) return prev;
      
      return {
        ...prev,
        [caseId]: {
          ...current,
          signatureAuthorizations: current.signatureAuthorizations.map(a => 
            (a.professionalId === professionalId && a.versionId === versionId)
              ? { ...a, authorized: false }
              : a
          )
        }
      };
    });
  }, []);

  const isSignatureApproved = useCallback((caseId: string, professionalId: string, versionId: string) => {
    const workflow = workflows[caseId];
    if (!workflow) return false;
    return workflow.signatureAuthorizations.some(
      a => a.professionalId === professionalId && a.versionId === versionId && a.authorized
    );
  }, [workflows]);

  const areAllRequiredSignaturesAuthorized = useCallback((caseId: string) => {
    const caseData = getCase(caseId);
    const workflow = workflows[caseId];
    if (!caseData || !workflow) return false;

    const requiredProfessionals = caseData.professionals.filter(p => p.isRequiredSigner);
    return requiredProfessionals.every(p => 
      isSignatureApproved(caseId, p.id, workflow.currentVersion.id)
    );
  }, [getCase, workflows, isSignatureApproved]);

  const getApprovalsCount = useCallback((caseId: string) => {
    const workflow = workflows[caseId];
    if (!workflow) return 0;

    let count = 0;
    if (workflow.professionalReviewApproved) count++;
    if (workflow.auditApproved) count++;
    if (workflow.caseIsolationConfirmed) count++;
    if (areAllRequiredSignaturesAuthorized(caseId)) count++;
    
    return count;
  }, [workflows, areAllRequiredSignaturesAuthorized]);

  const isFullyApproved = useCallback((caseId: string) => {
    return getApprovalsCount(caseId) === 4;
  }, [getApprovalsCount]);

  const releaseFinal = useCallback((caseId: string) => {
    if (isFullyApproved(caseId)) {
      updateWorkflow(caseId, { finalReleased: true });
    }
  }, [isFullyApproved, updateWorkflow]);

  const value = useMemo(() => ({
    getCase,
    getWorkflow,
    updateWorkflow,
    authorizeSignature,
    revokeSignature,
    releaseFinal,
    getApprovalsCount,
    isFullyApproved,
    isSignatureApproved
  }), [
    getCase, 
    getWorkflow, 
    updateWorkflow, 
    authorizeSignature, 
    revokeSignature, 
    releaseFinal, 
    getApprovalsCount, 
    isFullyApproved, 
    isSignatureApproved
  ]);

  return (
    <CaseWorkflowContext.Provider value={value}>
      {children}
    </CaseWorkflowContext.Provider>
  );
}

export function useCaseWorkflow() {
  const context = useContext(CaseWorkflowContext);
  if (context === undefined) {
    throw new Error('useCaseWorkflow must be used within a CaseWorkflowProvider');
  }
  return context;
}
