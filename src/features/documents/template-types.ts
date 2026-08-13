import { DocumentTypeId } from "../cases/case-types";

export type TemplateStatus = "active" | "draft" | "deprecated";
export type TemplateScope = "general" | "psychology" | "social-work" | "multiprofessional";
export type TemplateId = "veritas-standard" | "veritas-multiprofessional";

export interface DocumentTemplate {
  id: TemplateId;
  name: string;
  description: string;
  supportedDocumentTypes: DocumentTypeId[];
  sourceModel: string; // Metadata only
  scope: TemplateScope;
  status: TemplateStatus;
}
