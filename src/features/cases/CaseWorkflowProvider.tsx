import type React from "react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type {
  CaseData,
  CaseWorkflowState,
  DocumentTypeId,
  DocumentVersionRef,
  CaseProfessional,
} from "./case-types";
import type { TemplateId } from "../documents/template-ids";
import { INITIAL_WORKFLOWS, MOCK_CASES } from "./mock-cases";

interface CaseWorkflowContextType {
  getCase: (caseId: string) => CaseData | undefined;
  getWorkflow: (caseId: string) => CaseWorkflowState | undefined;
  updateCase: (
    caseId: string,
    patch: Omit<Partial<CaseData>, "id" | "documentType" | "modality" | "professionals">,
  ) => void;
  setDocumentType: (caseId: string, documentType: DocumentTypeId, modality: string) => void;
  setTemplate: (caseId: string, templateId: TemplateId | null) => void;
  setProfessionals: (caseId: string, professionals: CaseProfessional[]) => void;
  setCurrentVersion: (caseId: string, version: DocumentVersionRef) => void;
  setAuditApproved: (caseId: string, approved: boolean) => void;
  setProfessionalReviewApproved: (caseId: string, approved: boolean) => void;
  setCaseIsolationConfirmed: (caseId: string, confirmed: boolean) => void;
  setSufficiencyApproved: (caseId: string, approved: boolean) => void;
  authorizeSignature: (caseId: string, professionalId: string, versionId: string) => void;
  revokeSignature: (caseId: string, professionalId: string, versionId: string) => void;
  releaseFinal: (caseId: string) => void;
  // Derived state helpers
  getApprovalsCount: (caseId: string) => number;
  isFullyApproved: (caseId: string) => boolean;
  areRequiredSignaturesAuthorized: (caseId: string) => boolean;
  isSignatureApproved: (caseId: string, professionalId: string, versionId: string) => boolean;
}

const CaseWorkflowContext = createContext<CaseWorkflowContextType | undefined>(undefined);

export function CaseWorkflowProvider({ children }: { children: React.ReactNode }) {
  // Initialize states from mocks to avoid direct mutation
  const [cases, setCases] = useState<Record<string, CaseData>>(() => ({ ...MOCK_CASES }));
  const [workflows, setWorkflows] = useState<Record<string, CaseWorkflowState>>(() => ({
    ...INITIAL_WORKFLOWS,
  }));

  const getCase = useCallback(
    (caseId: string) => {
      return cases[caseId];
    },
    [cases],
  );

  const getWorkflow = useCallback(
    (caseId: string) => {
      return workflows[caseId];
    },
    [workflows],
  );

  const updateCaseData = useCallback((caseId: string, patch: Partial<CaseData>) => {
    setCases((prev) => {
      const current = prev[caseId];
      if (!current) return prev;
      return { ...prev, [caseId]: { ...current, ...patch } };
    });
  }, []);

  const updateCase = useCallback(
    (
      caseId: string,
      patch: Omit<Partial<CaseData>, "id" | "documentType" | "modality" | "professionals">,
    ) => {
      updateCaseData(caseId, patch);
    },
    [updateCaseData],
  );

  const updateWorkflow = useCallback((caseId: string, patch: Partial<CaseWorkflowState>) => {
    setWorkflows((prev) => {
      const current = prev[caseId];
      if (!current) return prev;

      const nextWorkflow = { ...current, ...patch };

      // Critical fields invalidation logic
      const criticalFieldsChanged =
        (patch.auditApproved === false && current.auditApproved === true) ||
        (patch.professionalReviewApproved === false &&
          current.professionalReviewApproved === true) ||
        (patch.caseIsolationConfirmed === false && current.caseIsolationConfirmed === true) ||
        (patch.currentVersion && patch.currentVersion.id !== current.currentVersion.id) ||
        (patch.documentType && patch.documentType !== current.documentType) ||
        (patch.templateId && patch.templateId !== current.templateId);

      if (criticalFieldsChanged && nextWorkflow.finalReleased) {
        nextWorkflow.finalReleased = false;
      }

      return {
        ...prev,
        [caseId]: nextWorkflow,
      };
    });
  }, []);

  const setDocumentType = useCallback(
    (caseId: string, documentType: DocumentTypeId, modality: string) => {
      const currentCase = getCase(caseId);
      const currentWorkflow = getWorkflow(caseId);

      const changed =
        currentCase?.documentType !== documentType || currentCase?.modality !== modality;

      updateCaseData(caseId, { documentType, modality });

      if (changed && currentWorkflow?.finalReleased) {
        updateWorkflow(caseId, { documentType, finalReleased: false });
      } else {
        updateWorkflow(caseId, { documentType });
      }
    },
    [getCase, getWorkflow, updateCaseData, updateWorkflow],
  );

  const setTemplate = useCallback(
    (caseId: string, templateId: TemplateId | null) => {
      const current = getWorkflow(caseId);
      if (!current) return;

      const changed = current.templateId !== templateId;

      if (changed && current.finalReleased) {
        updateWorkflow(caseId, { templateId, finalReleased: false });
      } else {
        updateWorkflow(caseId, { templateId });
      }
    },
    [getWorkflow, updateWorkflow],
  );

  const setProfessionals = useCallback(
    (caseId: string, professionals: CaseProfessional[]) => {
      const currentCase = cases[caseId];
      if (!currentCase) return;

      // Detect changes in required signers to invalidate final
      const currentRequiredIds = currentCase.professionals
        .filter((p) => p.isRequiredSigner)
        .map((p) => p.id)
        .sort()
        .join(",");
      const nextRequiredIds = professionals
        .filter((p) => p.isRequiredSigner)
        .map((p) => p.id)
        .sort()
        .join(",");

      updateCaseData(caseId, { professionals });

      if (currentRequiredIds !== nextRequiredIds) {
        const currentWorkflow = workflows[caseId];
        if (currentWorkflow?.finalReleased) {
          updateWorkflow(caseId, { finalReleased: false });
        }
      }
    },
    [cases, workflows, updateCaseData, updateWorkflow],
  );

  const setCurrentVersion = useCallback(
    (caseId: string, version: DocumentVersionRef) => {
      updateWorkflow(caseId, { currentVersion: version });
    },
    [updateWorkflow],
  );

  const setAuditApproved = useCallback(
    (caseId: string, auditApproved: boolean) => {
      updateWorkflow(caseId, { auditApproved });
    },
    [updateWorkflow],
  );

  const setProfessionalReviewApproved = useCallback(
    (caseId: string, professionalReviewApproved: boolean) => {
      updateWorkflow(caseId, { professionalReviewApproved });
    },
    [updateWorkflow],
  );

  const setCaseIsolationConfirmed = useCallback(
    (caseId: string, caseIsolationConfirmed: boolean) => {
      updateWorkflow(caseId, { caseIsolationConfirmed });
    },
    [updateWorkflow],
  );

  const setSufficiencyApproved = useCallback(
    (caseId: string, sufficiencyApproved: boolean) => {
      updateWorkflow(caseId, { sufficiencyApproved });
    },
    [updateWorkflow],
  );

  const authorizeSignature = useCallback(
    (caseId: string, professionalId: string, versionId: string) => {
      setWorkflows((prev) => {
        const current = prev[caseId];
        if (!current) return prev;

        const exists = current.signatureAuthorizations.some(
          (a) => a.professionalId === professionalId && a.versionId === versionId,
        );

        let nextAuthorizations;
        if (exists) {
          nextAuthorizations = current.signatureAuthorizations.map((a) =>
            a.professionalId === professionalId && a.versionId === versionId
              ? { ...a, authorized: true }
              : a,
          );
        } else {
          nextAuthorizations = [
            ...current.signatureAuthorizations,
            { professionalId, versionId, authorized: true },
          ];
        }

        return {
          ...prev,
          [caseId]: {
            ...current,
            signatureAuthorizations: nextAuthorizations,
          },
        };
      });
    },
    [],
  );

  const revokeSignature = useCallback(
    (caseId: string, professionalId: string, versionId: string) => {
      setWorkflows((prev) => {
        const current = prev[caseId];
        if (!current) return prev;

        const nextWorkflow = {
          ...current,
          signatureAuthorizations: current.signatureAuthorizations.map((a) =>
            a.professionalId === professionalId && a.versionId === versionId
              ? { ...a, authorized: false }
              : a,
          ),
        };

        // If revoking an authorized signature, check if it was required for current version
        const caseData = cases[caseId];
        const isRequired = caseData?.professionals.find(
          (p) => p.id === professionalId,
        )?.isRequiredSigner;

        if (isRequired && versionId === current.currentVersion.id && nextWorkflow.finalReleased) {
          nextWorkflow.finalReleased = false;
        }

        return {
          ...prev,
          [caseId]: nextWorkflow,
        };
      });
    },
    [cases],
  );

  const isSignatureApproved = useCallback(
    (caseId: string, professionalId: string, versionId: string) => {
      const workflow = workflows[caseId];
      if (!workflow) return false;
      return workflow.signatureAuthorizations.some(
        (a) => a.professionalId === professionalId && a.versionId === versionId && a.authorized,
      );
    },
    [workflows],
  );

  const areRequiredSignaturesAuthorized = useCallback(
    (caseId: string) => {
      const caseData = getCase(caseId);
      const workflow = workflows[caseId];
      if (!caseData || !workflow) return false;

      const requiredProfessionals = caseData.professionals.filter((p) => p.isRequiredSigner);

      if (requiredProfessionals.length === 0) return false;

      return requiredProfessionals.every((p) =>
        isSignatureApproved(caseId, p.id, workflow.currentVersion.id),
      );
    },
    [getCase, workflows, isSignatureApproved],
  );

  const getApprovalsCount = useCallback(
    (caseId: string) => {
      const workflow = workflows[caseId];
      if (!workflow) return 0;

      let count = 0;
      if (workflow.professionalReviewApproved) count++;
      if (workflow.auditApproved) count++;
      if (workflow.caseIsolationConfirmed) count++;
      if (areRequiredSignaturesAuthorized(caseId)) count++;

      return count;
    },
    [workflows, areRequiredSignaturesAuthorized],
  );

  const isFullyApproved = useCallback(
    (caseId: string) => {
      return getApprovalsCount(caseId) === 4;
    },
    [getApprovalsCount],
  );

  const releaseFinal = useCallback(
    (caseId: string) => {
      if (isFullyApproved(caseId)) {
        updateWorkflow(caseId, { finalReleased: true });
      }
    },
    [isFullyApproved, updateWorkflow],
  );

  const value = useMemo(
    () => ({
      getCase,
      getWorkflow,
      updateCase,
      setDocumentType,
      setTemplate,
      setProfessionals,
      setCurrentVersion,
      setAuditApproved,
      setProfessionalReviewApproved,
      setCaseIsolationConfirmed,
      setSufficiencyApproved,
      authorizeSignature,
      revokeSignature,
      releaseFinal,
      getApprovalsCount,
      isFullyApproved,
      areRequiredSignaturesAuthorized,
      isSignatureApproved,
    }),
    [
      getCase,
      getWorkflow,
      updateCase,
      setDocumentType,
      setTemplate,
      setProfessionals,
      setCurrentVersion,
      setAuditApproved,
      setProfessionalReviewApproved,
      setCaseIsolationConfirmed,
      setSufficiencyApproved,
      authorizeSignature,
      revokeSignature,
      releaseFinal,
      getApprovalsCount,
      isFullyApproved,
      areRequiredSignaturesAuthorized,
      isSignatureApproved,
    ],
  );

  return <CaseWorkflowContext.Provider value={value}>{children}</CaseWorkflowContext.Provider>;
}

export function useCaseWorkflow() {
  const context = useContext(CaseWorkflowContext);
  if (context === undefined) {
    throw new Error("useCaseWorkflow must be used within a CaseWorkflowProvider");
  }
  return context;
}
