---
title: "Microetapa 4B - Central de Versões Documentais"
---

Implement the Version Central for forensic cases, ensuring immutable reference history and safe transitions in memory.

### Technical Implementation

- **Data Structure**:
  - `CaseWorkflowState` in `case-types.ts` includes `versions: DocumentVersionRef[]`.
  - `versions` contains append-only historical version references in memory.
  - `currentVersion` represents the active working version reference.
- **Provider API**:
  - `createNextVersion(caseId: string): void` - Pure action to transition to the next version.
  - `canCreateNextVersion(caseId: string): boolean` - Synchronous integrity check.
  - Removal of `setCurrentVersion` from public API to prevent arbitrary version injection.
- **Version Lifecycle Rules**:
  - **Status Mapping**: When creating a new version:
    - If `finalReleased === true`, previous version → `status: "final"`.
    - If `finalReleased === false`, previous version → `status: "archived"`.
    - New version always starts as → `status: "draft"`.
  - **Approval Invalidation**:
    - **Reset**: `professionalReviewApproved`, `auditApproved`, `finalReleased`.
    - **Preserve**: `sufficiencyApproved`, `caseIsolationConfirmed`.
  - **Signatures**: `SignatureAuthorization` is linked to `professionalId` + `versionId`. Past authorizations are preserved for history but do not count for the current version's gates.
- **UI & Navigation**:
  - Rota `/app/cases/$caseId/versions` provides a secure, two-step confirmation flow for creating new versions.
  - Integration with `DocumentViewer` is automatic via `workflow.currentVersion`.
- **Invariants & Limitations**:
  - **In-Memory Only**: All data is managed in memory. F5 (reload) will lose versions created during the session.
  - **No snapshots**: There is NO persistent textual snapshot of each version's content yet.
  - **No artifacts**: NO DOCX/PDF is generated for historical versions.
  - **Read-only History**: Historical versions cannot be edited, deleted, or restored to current in this phase.
  - **Router Integrity**: `src/routeTree.gen.ts` is managed by the TanStack Router generator and must not be edited manually.

### Validation Plan

- [x] `tsc --noEmit` check.
- [x] `build` check.
- [x] Integrity test: `canCreateNextVersion` prevents creation if `currentVersion` is not in history.
- [x] Transition test: Verify status mapping (final/archived) and gate resets upon creation.
