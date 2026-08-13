import { TraceabilityKind } from "@/features/documents/document-preview-types";

export type MaterialKind =
  | "pdf"
  | "docx"
  | "image"
  | "spreadsheet"
  | "zip"
  | "audio"
  | "video"
  | "transcript"
  | "note";

export type LegibilityLevel =
  | "high"
  | "medium"
  | "low"
  | "not-applicable";

export type DuplicateStatus =
  | "no"
  | "possible"
  | "yes";

export interface CaseDossierItem {
  id: string;
  title: string;
  materialKind: MaterialKind;
  traceability: TraceabilityKind;
  origin: string;
  date: string | null;
  theme: string;
  processReference: string;
  location: string;
  legibility: LegibilityLevel;
  limitations: string[];
  duplicateStatus: DuplicateStatus;
}

export interface CaseDossierState {
  caseId: string;
  items: CaseDossierItem[];
  materialsCollectionComplete: boolean;
}
