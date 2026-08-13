/**
 * Papel nominal de um profissional dentro de um caso.
 * Role não é permissão: a autorização real será definida em C2.4.
 */
export type CaseMemberRole =
  | "responsible"
  | "coexpert"
  | "reviewer"
  | "signer";

/**
 * CaseMember representa a associação de um ProfessionalProfile a um caso específico.
 * Não depende de PartnerRelationship e não concede acesso automaticamente.
 */
export interface CaseMember {
  /** Identidade canônica da associação ao caso. */
  id: string;
  /** Caso específico ao qual o profissional está associado. */
  caseId: string;
  /** ProfessionalProfile associado. */
  professionalId: string;
  /** Papel nominal do profissional dentro daquele caso. */
  role: CaseMemberRole;
}
