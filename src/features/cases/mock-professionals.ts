import { CaseProfessional } from "./case-types";

export const PROFESSIONALS: CaseProfessional[] = [
  { 
    id: "p1", 
    name: "Dra. Mônica Hazama", 
    profession: "Psicóloga", 
    registration: "CRP 06/12345", 
    discipline: "psychology",
    initials: "MH",
    isRequiredSigner: true 
  },
  { 
    id: "p2", 
    name: "Dr. Roberto Silva", 
    profession: "Assistente Social", 
    registration: "CRESS 12345", 
    discipline: "social-work",
    initials: "RS",
    isRequiredSigner: true 
  },
  { 
    id: "p3", 
    name: "Dra. Ana Paula", 
    profession: "Psicóloga", 
    registration: "CRP 06/54321", 
    discipline: "psychology",
    initials: "AP",
    isRequiredSigner: true 
  },
];

export function getProfessionalById(id: string): CaseProfessional | undefined {
  return PROFESSIONALS.find(p => p.id === id);
}
