import { z } from "zod";

export const TEMPLATE_IDS = ["veritas-standard", "veritas-multiprofessional"] as const;

export type TemplateId = (typeof TEMPLATE_IDS)[number];

export const templateIdSchema = z.enum(TEMPLATE_IDS);
