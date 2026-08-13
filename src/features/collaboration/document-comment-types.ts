/**
 * Status de um comentário documental.
 */
export type DocumentCommentStatus = "open" | "resolved";

/**
 * Comentário vinculado a uma versão específica de um documento de caso.
 * V01 ≠ V02: comentários não migram automaticamente entre versões.
 */
export interface DocumentComment {
  /** Identidade canônica do comentário. */
  id: string;
  /** Caso ao qual o comentário pertence. */
  caseId: string;
  /** Versão do documento à qual o comentário está vinculado. */
  versionId: string;
  /** ProfessionalProfile que criou o comentário. */
  authorProfessionalId: string;
  /** Corpo textual do comentário. */
  body: string;
  /** Status atual do comentário. */
  status: DocumentCommentStatus;
  /** Seção opcionalmente referenciada no documento. */
  sectionId?: string;
  /** Parágrafo opcionalmente referenciado no documento. */
  paragraphId?: string;
  /** Timestamp de criação em formato ISO 8601. */
  createdAt: string;
}
