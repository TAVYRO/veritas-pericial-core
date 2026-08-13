import { z } from "zod";

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

export type DocumentTypeId = (typeof DOCUMENT_TYPE_IDS)[number];

export const documentTypeIdSchema = z.enum(DOCUMENT_TYPE_IDS);
