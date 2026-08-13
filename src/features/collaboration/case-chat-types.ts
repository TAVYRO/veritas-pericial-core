/**
 * Mensagem de chat dentro de um caso específico.
 * Chat não é global: pertence sempre a um caseId autorizado.
 */
export interface CaseChatMessage {
  /** Identidade canônica da mensagem. */
  id: string;
  /** Caso ao qual a mensagem pertence. */
  caseId: string;
  /** ProfessionalProfile que escreveu a mensagem. */
  authorProfessionalId: string;
  /** Corpo textual da mensagem. */
  body: string;
  /** Timestamp de criação em formato ISO 8601. */
  createdAt: string;
}
