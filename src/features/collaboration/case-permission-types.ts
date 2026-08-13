import type { CaseMemberRole } from "./case-member-types";

/**
 * Permissões aplicáveis dentro de um caso específico.
 * Apenas o contrato das permissões; a atribuição a papéis será definida em etapa futura.
 */
export type CasePermission =
  | "view-case"
  | "edit-case-metadata"
  | "edit-dossier"
  | "edit-document"
  | "comment-document"
  | "use-team-room"
  | "invite-member"
  | "remove-member"
  | "change-member-role"
  | "review-document"
  | "approve-review"
  | "authorize-signature"
  | "sign-document"
  | "release-final";

/**
 * Formato da futura política de permissões por papel.
 * Apenas o tipo de estrutura; NÃO é uma matriz concreta.
 * CaseMemberRole sozinho não concede acesso — a autorização real será definida posteriormente.
 */
export type CaseRolePermissionPolicy =
  Readonly<Record<CaseMemberRole, readonly CasePermission[]>>;
