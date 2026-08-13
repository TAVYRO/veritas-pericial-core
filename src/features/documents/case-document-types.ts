import type { TraceabilityKind, EditorialMarker } from "./document-preview-types";

/**
 * Identidade única de uma versão documental.
 * Obrigatória para impedir mistura entre V01, V02 etc.
 */
export interface CaseDocumentKey {
  caseId: string;
  versionId: string;
}

/**
 * Parágrafo canônico que representa o conteúdo REAL da versão documental.
 * Exclui campos de sugestão, IA ou aceitação temporária.
 */
export interface CaseDocumentParagraph {
  id: string;
  text: string;
  traceability?: TraceabilityKind | undefined;
  editorialMarker?: EditorialMarker | undefined;
}

/**
 * Seção canônica do documento.
 */
export interface CaseDocumentSection {
  id: string;
  title: string;
  paragraphs: CaseDocumentParagraph[];
}

/**
 * Conteúdo oficial da versão documental.
 * Foca exclusivamente no CORPO textual, delegando metadados processuais e
 * de workflow para CaseData e CaseWorkflow.
 */
export interface CaseDocumentVersion {
  caseId: string;
  versionId: string;
  sections: CaseDocumentSection[];
  footerNote?: string | undefined;
}

/**
 * Inputs tipados para operações futuras de edição.
 */
export type NewCaseDocumentSectionInput = Omit<CaseDocumentSection, "id">;
export type NewCaseDocumentParagraphInput = Omit<CaseDocumentParagraph, "id">;
