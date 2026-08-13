export type DocumentTypeId =
	| "laudo-psicologico"
	| "relatorio-psicologico"
	| "parecer-psicologico"
	| "estudo-laudo-social"
	| "parecer-social"
	| "relatorio-psicossocial"
	| "relatorio-multiprofissional"
	| "laudo-multiprofissional";

export interface CaseProfessional {
	id: string;
	name: string;
	profession: string;
	registration: string;
	isRequiredSigner: boolean;
}

export interface DocumentVersionRef {
	id: string;
	label: string;
	number: number;
	status: "draft" | "review" | "approved" | "final" | "archived";
}

export interface CaseData {
	id: string;
	caseNumber: string;
	court: string;
	district: string;
	state: string;
	documentType: DocumentTypeId;
	modality: string; // Display name
	professionals: CaseProfessional[];
	currentStage: string;
	createdAt: string;
}

export interface SignatureAuthorization {
	professionalId: string;
	versionId: string;
	authorized: boolean;
}

export interface CaseWorkflowState {
	caseId: string;
	documentType: DocumentTypeId;
	templateId: string | null;
	currentVersion: DocumentVersionRef;
	sufficiencyApproved: boolean;
	auditApproved: boolean;
	professionalReviewApproved: boolean;
	caseIsolationConfirmed: boolean;
	signatureAuthorizations: SignatureAuthorization[];
	finalReleased: boolean;
}
