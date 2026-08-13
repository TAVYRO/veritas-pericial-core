import { CaseProfessional } from "./case-types";

export const PROFESSIONALS: CaseProfessional[] = [
  { id: "p1", name: "Dra. Mônica Hazama", profession: "Psicóloga", registration: "CRP 06/12345", isRequiredSigner: true },
  { id: "p2", name: "Dr. Roberto Silva", profession: "Assistente Social", registration: "CRESS 12345", isRequiredSigner: true },
  { id: "p3", name: "Dra. Ana Paula", profession: "Psicóloga", registration: "CRP 06/54321", isRequiredSigner: true },
];

export type ProfessionalDiscipline = "psychology" | "social-work";

export const PROFESSIONAL_DISCIPLINES: Record<string, ProfessionalDiscipline> = {
  "p1": "psychology",
  "p2": "social-work",
  "p3": "psychology"
};
