import type { DocumentTypeId } from "../documents/document-type-ids";
import type { TemplateId } from "./template-ids";

export type TemplateStatus = "active" | "draft" | "deprecated";
export type TemplateScope = "general" | "psychology" | "social-work" | "multiprofessional";
export type { TemplateId };

export interface DocumentTemplate {
  id: TemplateId;
  name: string;
  description: string;
  supportedDocumentTypes: DocumentTypeId[];
  sourceModel: string; // Metadata only
  scope: TemplateScope;
  status: TemplateStatus;
}
