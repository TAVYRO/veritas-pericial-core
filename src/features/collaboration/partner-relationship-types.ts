/**
 * Status de uma relação profissional entre dois perfis.
 */
export type PartnerRelationshipStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "removed"
  | "blocked";

/**
 * PartnerRelationship representa uma relação profissional entre dois ProfessionalProfiles.
 * Não concede acesso a casos e não inclui permissões, chat, comentários ou assinatura.
 */
export interface PartnerRelationship {
  /** Identidade canônica da relação no domínio da aplicação. */
  id: string;
  /** Profissional que iniciou a solicitação de parceria. */
  requesterProfessionalId: string;
  /** Profissional destinatário da solicitação. */
  targetProfessionalId: string;
  /** Estado atual da relação profissional. */
  status: PartnerRelationshipStatus;
}
