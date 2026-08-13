import { z } from "zod";
import type { DocumentTypeId } from "../cases/case-types";

export const DOCUMENT_TYPE_IDS = [
  "laudo-psicologico",
  "relatorio-psicologico",
  "parecer-psicologico",
  "estudo-laudo-social",
  "parecer-social",
  "relatorio-psicossocial",
  "relatorio-multiprofissional",
  "laudo-multiprofissional",
] as const;

export const documentTypeIdSchema = z.enum(DOCUMENT_TYPE_IDS);

export type Discipline = "psychology" | "social-work" | "multiprofessional";

export interface DocumentTypeDefinition {
  id: DocumentTypeId;
  label: string;
  discipline: Discipline;
  description: string;
}

export const DOCUMENT_TYPES: DocumentTypeDefinition[] = [
  // PSICOLOGIA
  {
    id: "laudo-psicologico",
    label: "Laudo Psicológico",
    discipline: "psychology",
    description: "Documento escrito, resultante de um processo de avaliação psicológica."
  },
  {
    id: "relatorio-psicologico",
    label: "Relatório Psicológico",
    discipline: "psychology",
    description: "Exposição descritiva sobre situações e/ou condições psicológicas."
  },
  {
    id: "parecer-psicologico",
    label: "Parecer Psicológico",
    discipline: "psychology",
    description: "Documento fundamentado e resumido sobre uma questão focal do campo psicológico."
  },
  // SERVIÇO SOCIAL
  {
    id: "estudo-laudo-social",
    label: "Estudo/Laudo Social",
    discipline: "social-work",
    description: "Análise técnica da realidade social com base em estudo socioeconômico."
  },
  {
    id: "parecer-social",
    label: "Parecer Social",
    discipline: "social-work",
    description: "Opinião técnica fundamentada sobre a matéria social."
  },
  // MULTIPROFISSIONAL
  {
    id: "relatorio-psicossocial",
    label: "Relatório Psicossocial",
    discipline: "multiprofessional",
    description: "Abordagem integrada das dimensões psicológica e social."
  },
  {
    id: "relatorio-multiprofissional",
    label: "Relatório Multiprofissional",
    discipline: "multiprofessional",
    description: "Documento conjunto elaborado por diferentes especialidades."
  },
  {
    id: "laudo-multiprofissional",
    label: "Laudo Multiprofissional",
    discipline: "multiprofessional",
    description: "Resultante de perícia conjunta com conclusão técnica integrada."
  }
];

export function getDocumentTypeById(id: DocumentTypeId | string): DocumentTypeDefinition | undefined {
  return DOCUMENT_TYPES.find(dt => dt.id === id);
}

export function getDocumentTypesByDiscipline(discipline: Discipline): DocumentTypeDefinition[] {
  return DOCUMENT_TYPES.filter(dt => dt.discipline === discipline);
}
