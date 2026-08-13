---
title: "Microetapa 4B - Central de Versões Documentais"
---

Implement the Version Central for forensic cases, ensuring immutable history and safe transitions.

### Technical Implementation

- **Data Structure**:
  - Update `CaseWorkflowState` in `case-types.ts` to include `versions: DocumentVersionRef[]`.
  - Update `mock-cases.ts` to initialize `versions` with the base V01 version.
- **Provider API**:
  - Implement `createNextVersion(caseId)` in `CaseWorkflowProvider.tsx`.
  - Remove `setCurrentVersion` from the public `CaseWorkflowContextType`.
  - Atomic update: Invalidate approvals, archive/finalize old version, set new version as current.
- **UI & Navigation**:
  - Create `src/routes/app.cases.$caseId.versions.tsx` with version listing and two-step confirmation.
  - Update `case-navigation-config.ts` to add "Versões" under the "Documento" group.
- **Rules & Constraints**:
  - No persistence (LocalStorage/Database).
  - No file snapshots or text comparisons.
  - Mobile-first layout with accessible confirmation flows.

### Validation Plan

- [ ] `tsc --noEmit` check.
- [ ] `build` check.
- [ ] Manual test: Create V02 from V01 and verify V01 status and gate resets.
- [ ] Manual test: Verify V02 is automatically picked up by DocumentViewer (in Draft/Review).
