import type { DocumentTypeId } from "./document-type-ids";
import type { DocumentTemplate } from "./template-types";


export const MOCK_TEMPLATES: DocumentTemplate[] = [
  {
    id: "veritas-standard",
    name: "Modelo Veritas Padrão",
    description: "Estrutura ágil para relatórios de perícia fundamentada.",
    supportedDocumentTypes: ["laudo-psicologico", "relatorio-psicologico", "parecer-psicologico", "estudo-laudo-social", "parecer-social"],
    sourceModel: "MODELO_1_Veritas_Pericial.docx",
    scope: "general",
    status: "active"
  },
  {
    id: "veritas-multiprofessional",
    name: "Modelo Multiprofissional Veritas",
    description: "Estrutura integrada para perícias conjuntas e exames psicossociais complexos.",
    supportedDocumentTypes: ["relatorio-psicossocial", "relatorio-multiprofissional", "laudo-multiprofissional"],
    sourceModel: "MODELO_Laudo_Multiprofissional.docx",
    scope: "multiprofessional",
    status: "active"
  }
];

export function getTemplatesForDocumentType(documentTypeId: DocumentTypeId): DocumentTemplate[] {
  return MOCK_TEMPLATES.filter(t => t.supportedDocumentTypes.includes(documentTypeId));
}

export function getTemplateById(id: string): DocumentTemplate | undefined {
  return MOCK_TEMPLATES.find(t => t.id === id);
}

export function getActiveTemplates(): DocumentTemplate[] {
  return MOCK_TEMPLATES.filter(t => t.status === "active");
}
