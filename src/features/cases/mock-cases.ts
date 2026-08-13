import type { CaseData, CaseWorkflowState } from "./case-types";

export const MOCK_CASES: Record<string, CaseData> = {
	"demo-case": {
		id: "demo-case",
		caseNumber: "0000000-00.2024.8.26.0000",
		court: "1ª Vara Cível",
		district: "São Paulo",
		state: "SP",
		documentType: "relatorio-psicossocial",
		modality: "Relatório Psicossocial",
		professionals: [
			{
				id: "p1",
				name: "Dra. Mônica Hazama",
				profession: "Psicóloga Perita",
				registration: "CRP 06/123456",
				discipline: "psychology",
				initials: "MH",
				isRequiredSigner: true,
			},
			{
				id: "p2",
				name: "Dr. Roberto Silva",
				profession: "Assistente Social",
				registration: "CRESS 12.345",
				discipline: "social-work",
				initials: "RS",
				isRequiredSigner: true,
			},
		],
		currentStage: "Materiais",
		createdAt: "2024-08-13T04:00:00.000Z",
	},
};

export const INITIAL_WORKFLOWS: Record<string, CaseWorkflowState> = {
	"demo-case": {
		caseId: "demo-case",
		documentType: "relatorio-psicossocial",
		templateId: "mock-template-id",
		currentVersion: {
			id: "v01",
			number: 1,
			label: "V01",
			status: "draft",
		},
		sufficiencyApproved: true,
		auditApproved: true,
		professionalReviewApproved: true,
		caseIsolationConfirmed: true,
		signatureAuthorizations: [], // Initially not authorized
		finalReleased: false,
	},
};
