/**
 * Tipos de eventos de atividade auditáveis dentro de um caso.
 */
export type CaseActivityEventKind =
  | "partner-requested"
  | "partner-accepted"
  | "partner-rejected"
  | "partner-removed"
  | "partner-blocked"
  | "case-invite-sent"
  | "case-invite-accepted"
  | "case-member-joined"
  | "case-member-role-changed"
  | "case-member-removed"
  | "chat-message-created"
  | "document-comment-created"
  | "document-comment-resolved"
  | "document-comment-reopened"
  | "document-section-updated"
  | "document-conflict-detected"
  | "version-created"
  | "review-approved"
  | "audit-approved"
  | "signature-authorized"
  | "signature-applied"
  | "final-released";

/**
 * Evento de atividade auditável vinculado a um caso.
 */
export interface CaseActivityEvent {
  /** Identidade canônica do evento. */
  id: string;
  /** Caso ao qual o evento pertence. */
  caseId: string;
  /** ProfessionalProfile que executou a ação. */
  actorProfessionalId: string;
  /** Tipo do evento. */
  kind: CaseActivityEventKind;
  /** Timestamp de criação em formato ISO 8601. */
  createdAt: string;
  /** Versão opcionalmente relacionada ao evento. */
  versionId?: string;
}
