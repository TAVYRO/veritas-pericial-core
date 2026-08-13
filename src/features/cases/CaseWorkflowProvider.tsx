import type React from "react";
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";
import type { CaseData, CaseWorkflowState, DocumentTypeId, DocumentVersionRef } from "./case-types";
import { INITIAL_WORKFLOWS, MOCK_CASES } from "./mock-cases";

interface CaseWorkflowContextType {
	getCase: (caseId: string) => CaseData | undefined;
	getWorkflow: (caseId: string) => CaseWorkflowState | undefined;
	updateCase: (caseId: string, patch: Partial<CaseData>) => void;
	updateWorkflow: (caseId: string, patch: Partial<CaseWorkflowState>) => void;
	setDocumentType: (caseId: string, documentType: DocumentTypeId, modality: string) => void;
	setTemplate: (caseId: string, templateId: string | null) => void;
	setCurrentVersion: (caseId: string, version: DocumentVersionRef) => void;
	setAuditApproved: (caseId: string, approved: boolean) => void;
	setProfessionalReviewApproved: (caseId: string, approved: boolean) => void;
	setCaseIsolationConfirmed: (caseId: string, confirmed: boolean) => void;
	setSufficiencyApproved: (caseId: string, approved: boolean) => void;
	authorizeSignature: (
		caseId: string,
		professionalId: string,
		versionId: string,
	) => void;
	revokeSignature: (
		caseId: string,
		professionalId: string,
		versionId: string,
	) => void;
	releaseFinal: (caseId: string) => void;
	// Derived state helpers
	getApprovalsCount: (caseId: string) => number;
	isFullyApproved: (caseId: string) => boolean;
	areRequiredSignaturesAuthorized: (caseId: string) => boolean;
	isSignatureApproved: (
		caseId: string,
		professionalId: string,
		versionId: string,
	) => boolean;
}

const CaseWorkflowContext = createContext<CaseWorkflowContextType | undefined>(
	undefined,
);

export function CaseWorkflowProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	// Initialize states from mocks to avoid direct mutation
	const [cases, setCases] = useState<Record<string, CaseData>>(() => ({ ...MOCK_CASES }));
	const [workflows, setWorkflows] = useState<Record<string, CaseWorkflowState>>(() => ({ ...INITIAL_WORKFLOWS }));

	const getCase = useCallback((caseId: string) => {
		return cases[caseId];
	}, [cases]);

	const getWorkflow = useCallback(
		(caseId: string) => {
			return workflows[caseId];
		},
		[workflows],
	);

	const invalidateFinalIfNecessary = useCallback((caseId: string) => {
		setWorkflows(prev => {
			const workflow = prev[caseId];
			if (!workflow || !workflow.finalReleased) return prev;
			
			// We can't easily calculate areRequiredSignaturesAuthorized here without recursion 
			// or passing more data. We'll handle invalidation inside each setter for simplicity 
			// and correctness in this phase.
			return prev;
		});
	}, []);

	const updateCase = useCallback((caseId: string, patch: Partial<CaseData>) => {
		setCases(prev => {
			const current = prev[caseId];
			if (!current) return prev;
			return { ...prev, [caseId]: { ...current, ...patch } };
		});
		// If critical fields change, we should probably invalidate final, 
		// but CaseData fields are mostly static after creation in this phase.
	}, []);

	const updateWorkflow = useCallback(
		(caseId: string, patch: Partial<CaseWorkflowState>) => {
			setWorkflows((prev) => {
				const current = prev[caseId];
				if (!current) return prev;
				
				const nextWorkflow = { ...current, ...patch };
				
				// Critical fields invalidation logic
				const criticalFieldsChanged = 
					(patch.auditApproved === false && current.auditApproved === true) ||
					(patch.professionalReviewApproved === false && current.professionalReviewApproved === true) ||
					(patch.caseIsolationConfirmed === false && current.caseIsolationConfirmed === true) ||
					(patch.currentVersion && patch.currentVersion.id !== current.currentVersion.id);

				if (criticalFieldsChanged && nextWorkflow.finalReleased) {
					nextWorkflow.finalReleased = false;
				}

				return {
					...prev,
					[caseId]: nextWorkflow,
				};
			});
		},
		[],
	);

	const setDocumentType = useCallback((caseId: string, documentType: DocumentTypeId, modality: string) => {
		updateCase(caseId, { documentType, modality });
		updateWorkflow(caseId, { documentType });
	}, [updateCase, updateWorkflow]);

	const setTemplate = useCallback((caseId: string, templateId: string | null) => {
		updateWorkflow(caseId, { templateId });
	}, [updateWorkflow]);

	const setCurrentVersion = useCallback((caseId: string, version: DocumentVersionRef) => {
		updateWorkflow(caseId, { currentVersion: version });
	}, [updateWorkflow]);

	const setAuditApproved = useCallback((caseId: string, auditApproved: boolean) => {
		updateWorkflow(caseId, { auditApproved });
	}, [updateWorkflow]);

	const setProfessionalReviewApproved = useCallback((caseId: string, professionalReviewApproved: boolean) => {
		updateWorkflow(caseId, { professionalReviewApproved });
	}, [updateWorkflow]);

	const setCaseIsolationConfirmed = useCallback((caseId: string, caseIsolationConfirmed: boolean) => {
		updateWorkflow(caseId, { caseIsolationConfirmed });
	}, [updateWorkflow]);

	const setSufficiencyApproved = useCallback((caseId: string, sufficiencyApproved: boolean) => {
		updateWorkflow(caseId, { sufficiencyApproved });
	}, [updateWorkflow]);

	const authorizeSignature = useCallback(
		(caseId: string, professionalId: string, versionId: string) => {
			setWorkflows((prev) => {
				const current = prev[caseId];
				if (!current) return prev;

				const exists = current.signatureAuthorizations.some(
					(a) =>
						a.professionalId === professionalId && a.versionId === versionId,
				);

				let nextAuthorizations;
				if (exists) {
					nextAuthorizations = current.signatureAuthorizations.map(
						(a) =>
							a.professionalId === professionalId &&
							a.versionId === versionId
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
				const isRequired = caseData?.professionals.find(p => p.id === professionalId)?.isRequiredSigner;
				
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
				(a) =>
					a.professionalId === professionalId &&
					a.versionId === versionId &&
					a.authorized,
			);
		},
		[workflows],
	);

	const areRequiredSignaturesAuthorized = useCallback(
		(caseId: string) => {
			const caseData = getCase(caseId);
			const workflow = workflows[caseId];
			if (!caseData || !workflow) return false;

			const requiredProfessionals = caseData.professionals.filter(
				(p) => p.isRequiredSigner,
			);
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
			updateWorkflow,
			setDocumentType,
			setTemplate,
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
			updateWorkflow,
			setDocumentType,
			setTemplate,
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

	return (
		<CaseWorkflowContext.Provider value={value}>
			{children}
		</CaseWorkflowContext.Provider>
	);
}

export function useCaseWorkflow() {
	const context = useContext(CaseWorkflowContext);
	if (context === undefined) {
		throw new Error(
			"useCaseWorkflow must be used within a CaseWorkflowProvider",
		);
	}
	return context;
}
