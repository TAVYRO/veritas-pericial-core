
export type TraceabilityKind = 
  | "documento" 
  | "relato" 
  | "observacao" 
  | "inferencia" 
  | "hipotese" 
  | "nao-confirmado";

export type EditorialMarker = "confirmar" | "pendente";

export interface DocumentPreviewParagraph {
  id: string;
  text: string;
  traceability?: TraceabilityKind;
  editorialMarker?: EditorialMarker;
}

export interface DocumentPreviewSection {
  id: string;
  title: string;
  paragraphs: DocumentPreviewParagraph[];
}

export interface DocumentPreviewSuggestion {
  text: string;
  note: string;
}

export interface DocumentPreviewData {
  sections: DocumentPreviewSection[];
  assistedSuggestion?: DocumentPreviewSuggestion;
  footerNote?: string;
}

export type DocumentViewerMode = "draft" | "review" | "inspection";
