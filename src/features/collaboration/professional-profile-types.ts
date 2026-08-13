/**
 * Representa a disciplina profissional individual.
 */
export type ProfessionalDiscipline = "psychology" | "social-work";

/**
 * ProfessionalProfile representa a identidade profissional global.
 * Este contrato é independente do contexto de um caso específico.
 */
export interface ProfessionalProfile {
  /** Identidade canônica no domínio da aplicação (não vinculada a auth provider nesta fase). */
  id: string;
  /** Nome profissional exibível. */
  displayName: string;
  /** Disciplina profissional restrita. */
  discipline: ProfessionalDiscipline;
  /** Registro profissional (ex: CRP/CRESS). */
  registration: string;
  /** Referência opcional para avatar. */
  avatarUrl?: string;
}
