import { z } from "zod";

export const TEMPLATE_IDS = ["veritas-standard", "veritas-multiprofessional"] as const;

export type TemplateId = (typeof TEMPLATE_IDS)[number];

export const templateIdSchema = z.enum(TEMPLATE_IDS);

export function isTemplateId(id: string | null | undefined): id is TemplateId {
  if (!id) return false;
  return (TEMPLATE_IDS as readonly string[]).includes(id);
}
