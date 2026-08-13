# AUDITORIA EXECUTIVA DE FECHAMENTO V3
**REPOSITÓRIO:** TAVYRO/veritas-pericial-core
**BASELINE:** d52240c37f56f0c763437c5b8833e9a9ca5aadf2

---

## SEÇÃO 1 — ROTAS OPERACIONAIS DO CASO
| ROTA | ARQUIVO | STATUS | FONTE DE ESTADO | AÇÃO PRINCIPAL | GAP PRINCIPAL | NAVEGAÇÃO |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| /app/cases/$caseId/index | src/routes/app.cases.$caseId.index.tsx | OPERACIONAL | CaseWorkflowProvider | Dashboard do Caso | Mocks estáticos em seções | Dashboard |
| /app/cases/$caseId/materials | src/routes/app.cases.$caseId.materials.tsx | OPERACIONAL | CaseDossierProvider | Registro de Metadados | Sem upload real (esperado) | Menu |
| /app/cases/$caseId/sources | src/routes/app.cases.$caseId.sources.tsx | OPERACIONAL | CaseDossierProvider | Listagem de Fontes | Read-only | Menu |
| /app/cases/$caseId/triage | src/routes/app.cases.$caseId.triage.tsx | OPERACIONAL | CaseDossierProvider | Revisão de Fontes | Conclusão manual | Menu |
| /app/cases/$caseId/object | src/routes/app.cases.$caseId.object.tsx | OPERACIONAL | CaseDossierProvider | Objeto/Limites | Vínculo manual | Menu |
| /app/cases/$caseId/questions | src/routes/app.cases.$caseId.questions.tsx | OPERACIONAL | LOCAL (MOCK) | Visualizar Quesitos | 100% Mock / Não salva | Menu |
| /app/cases/$caseId/interview-plan | src/routes/app.cases.$caseId.interview-plan.tsx | OPERACIONAL | LOCAL (MOCK) | Roteiro de Entrevista | 100% Mock / Não salva | Menu |
| /app/cases/$caseId/interviews | src/routes/app.cases.$caseId.interviews.tsx | OPERACIONAL | LOCAL (MOCK) | Listar Entrevistas | Botão Nova Gravação manual | Menu |
| /app/cases/$caseId/notes | src/routes/app.cases.$caseId.notes.tsx | OPERACIONAL | LOCAL (MOCK) | Notas de Campo | Não persiste | Menu |
| /app/cases/$caseId/contradictions | src/routes/app.cases.$caseId.contradictions.tsx | OPERACIONAL | LOCAL (MOCK) | Ver Divergências | 100% Mock | Menu |
| /app/cases/$caseId/sufficiency | src/routes/app.cases.$caseId.sufficiency.tsx | OPERACIONAL | LOCAL (MOCK) | Gate de Suficiência | Checklist não vinculado ao estado | Menu |
| /app/cases/$caseId/critical-gaps | src/routes/app.cases.$caseId.critical-gaps.tsx | OPERACIONAL | LOCAL (MOCK) | Lacunas Críticas | 100% Mock | Menu |
| /app/cases/$caseId/process | src/routes/app.cases.$caseId.process.tsx | OPERACIONAL | LOCAL (MOCK) | Processamento IA | Animação sem efeito real | Menu |
| /app/cases/$caseId/analysis | src/routes/app.cases.$caseId.analysis.tsx | OPERACIONAL | LOCAL (MOCK) | Cadeia de Raciocínio | 100% Mock | Menu |
| /app/cases/$caseId/traceability | src/routes/app.cases.$caseId.traceability.tsx | OPERACIONAL | LOCAL (MOCK) | Rastreabilidade | 100% Mock | Menu |
| /app/cases/$caseId/draft | src/routes/app.cases.$caseId.draft.tsx | OPERACIONAL | CaseWorkflowProvider | Visualizar Laudo | Preview estático (A4) | Menu |
| /app/cases/$caseId/draft/edit | src/routes/app.cases.$caseId.draft.edit.tsx | OPERACIONAL | LOCAL (MOCK) | Editor de Seções | Não altera Viewer | Draft |
| /app/cases/$caseId/draft/questions | src/routes/app.cases.$caseId.draft.questions.tsx | OPERACIONAL | LOCAL (MOCK) | Responder Quesitos | Não salva respostas | Draft |
| /app/cases/$caseId/versions | src/routes/app.cases.$caseId.versions.tsx | OPERACIONAL | CaseWorkflowProvider | Histórico/Nova Versão | Cria versão mas não conteúdo | Menu |
| /app/cases/$caseId/audit | src/routes/app.cases.$caseId.audit.tsx | OPERACIONAL | CaseWorkflowProvider | Checklist Final | Aprovação persiste | Menu |
| /app/cases/$caseId/blocks | src/routes/app.cases.$caseId.blocks.tsx | OPERACIONAL | CaseWorkflowProvider | Ver Impedimentos | Read-only | Audit |
| /app/cases/$caseId/professional-review | src/routes/app.cases.$caseId.professional-review.tsx | OPERACIONAL | CaseWorkflowProvider | Revisão de Pares | Aprovação persiste | Menu |
| /app/cases/$caseId/review-document | src/routes/app.cases.$caseId.review-document.tsx | OPERACIONAL | CaseWorkflowProvider | Visualizar para Revisão | Read-only | Review |
| /app/cases/$caseId/approvals | src/routes/app.cases.$caseId.approvals.tsx | OPERACIONAL | CaseWorkflowProvider | Gestão de Assinaturas | Botões Autorizar funcionam | Menu |
| /app/cases/$caseId/signatures | src/routes/app.cases.$caseId.signatures.tsx | OPERACIONAL | CaseWorkflowProvider | Aplicação de Assinatura | Autorização != Assinatura | Menu |
| /app/cases/$caseId/final | src/routes/app.cases.$caseId.final.tsx | OPERACIONAL | CaseWorkflowProvider | Entrega Final | Bloqueado se !released | Menu |
| /app/cases/$caseId/final/inspection | src/routes/app.cases.$caseId.final.inspection.tsx | OPERACIONAL | LOCAL (MOCK) | Inspeção de Lacre | Checklist visual | Final |
| /app/cases/$caseId/history | src/routes/app.cases.$caseId.history.tsx | OPERACIONAL | LOCAL (MOCK) | Linha do Tempo | 100% Mock | Menu |

---

## SEÇÃO 2 — FLUXO NOVO CASO
Arquivo: `src/routes/app.cases.new.review.tsx`

| CAMPO | DIGITADO? | TRANSPORTADO? | SALVO? | DESTINO REAL | HARD-CODED? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| caseNumber | SIM (Search) | SIM | NÃO | UI Review | SIM |
| court/tribunal | NÃO | NÃO | NÃO | N/A | SIM |
| district/comarca | NÃO | NÃO | NÃO | N/A | SIM |
| state | NÃO | NÃO | NÃO | N/A | SIM |
| vara | NÃO | NÃO | NÃO | N/A | SIM |
| magistrado | NÃO | NÃO | NÃO | N/A | SIM |
| classe | NÃO | NÃO | NÃO | N/A | SIM |
| assunto | NÃO | NÃO | NÃO | N/A | SIM |
| solicitante | NÃO | NÃO | NÃO | N/A | SIM |
| objeto inicial | NÃO | NÃO | NÃO | N/A | SIM |
| finalidade | NÃO | NÃO | NÃO | N/A | SIM |
| prazo | NÃO | NÃO | NÃO | N/A | SIM |
| data | NÃO | NÃO | NÃO | N/A | SIM |
| profissionais | SIM (Search) | SIM | NÃO | UI Review | SIM |
| modalidade | SIM (Search) | SIM | SIM* | CaseWorkflow | NÃO |
| documentType | SIM (Search) | SIM | SIM* | CaseWorkflow | NÃO |
| templateId | SIM (Search) | SIM | SIM* | CaseWorkflow | NÃO |

*(*) O salvamento ocorre via `setDocumentType("demo-case", ...)` e `setTemplate("demo-case", ...)` no `handleCreateCase` do arquivo `src/routes/app.cases.new.review.tsx` (Linhas 35-42).*

**UM NOVO CASE ID É CRIADO?**
**NÃO.**
Evidência: `src/routes/app.cases.new.review.tsx`:
```typescript
navigate({
  to: "/app/cases/$caseId/materials",
  params: { caseId: "demo-case" }
});
```

---

## SEÇÃO 3 — DEMO-CASE
| ARQUIVO | TRECHO/FUNÇÃO | FINALIDADE | RISCO |
| :--- | :--- | :--- | :--- |
| src/routes/app.cases.index.tsx | params: { caseId: "demo-case" } | Botão Ver Caso | Redirecionamento estático |
| src/routes/app.record.complete.tsx | params: { caseId: "demo-case" } | Finalizar gravação | Hardcoded CaseId |
| src/routes/app.cases.continue.tsx | id: "demo-case-1" | Cards de casos recentes | Dados fictícios |
| src/routes/app.cases.new.review.tsx | setDocumentType("demo-case", ...) | Configurar laudo | Sobrescreve sempre o mesmo caso |
| src/features/cases/mock-cases.ts | "demo-case": { ... } | Dados centrais | Colisão de dados |
| src/features/dossier/mock-dossiers.ts | "demo-case": { ... } | Dados do dossiê | Estado central fixo |

**Multi-case é necessário ANTES de Quesitos?**
**NÃO.**
Justificativa: Quesitos e Suficiência dependem de estrutura de dados (`officialQuestions`, `checklists`), não de múltiplos IDs simultâneos. O `demo-case` é suficiente para validar a lógica de domínio antes de escalar para persistência múltipla.

---

## SEÇÃO 4 — DOMÍNIOS JÁ FECHADOS
| DOMÍNIO | STATUS | RESÍDUO / EVIDÊNCIA |
| :--- | :--- | :--- |
| DocumentViewer | FECHADO | `src/components/veritas/DocumentViewer.tsx` (Usa `MOCK_DOCUMENT_PREVIEWS`) |
| Versions | FECHADO | `CaseWorkflowProvider.tsx`: `createNextVersion` funcional |
| Gates version-aware | FECHADO | `updateWorkflow` invalida `finalReleased` em mudanças críticas |
| Dossier | FECHADO | `CaseDossierProvider.tsx` gerencia `items` e `materialsCollectionComplete` |
| Materials | FECHADO | `src/routes/app.cases.$caseId.materials.tsx` grava no provider |
| Triage | FECHADO | `src/routes/app.cases.$caseId.triage.tsx` funcional com logic gate |
| Technical Scope | FECHADO | `src/routes/app.cases.$caseId.object.tsx` funcional e ordenado |

---

## SEÇÃO 5 — QUESITOS
Arquivos lidos: `questions.tsx`, `draft.questions.tsx`, `interview-plan.tsx`.

**Arrays locais encontrados:**
- `OFFICIAL`, `SUGGESTED`, `INTERVIEW` em `app.cases.$caseId.questions.tsx` (Mock visual).
- `OFFICIAL_QUESTIONS` em `app.cases.$caseId.draft.questions.tsx` (Mock com respostas).
- `ROTEIRO` em `app.cases.$caseId.interview-plan.tsx` (Mock de entrevista).

**Existe no domínio central?**
**NÃO.**
Estruturas `officialQuestions`, `complementaryQuestions`, etc., não estão presentes em `case-types.ts` ou `case-dossier-types.ts`.

---

## SEÇÃO 6 — SUFICIÊNCIA
Arquivo: `sufficiency.tsx`, `critical-gaps.tsx`, `CaseWorkflowProvider.tsx`.

| PERGUNTA | RESPOSTA | EVIDÊNCIA |
| :--- | :--- | :--- |
| A. Gate usa checklist real? | NÃO | `SUFFICIENCY_ITEMS` é constante local |
| B. Existe OK/FALTA/N/A? | SIM | `STATUS_ICONS` define os três estados |
| C. Gaps críticos vêm do estado? | NÃO | `GAPS` é constante local em `critical-gaps.tsx` |
| D. Existe limite máximo 5? | NÃO | Não encontrado no código |
| E. Quesito pendente bloqueia? | NÃO | Sem vínculo com lógica de gate real |
| F. techScope.confirmed bloqueia? | NÃO | Suficiência visual não lê `dossier.technicalScope.confirmed` |
| G. triageComplete bloqueia? | NÃO | Suficiência visual não lê `dossier.triageComplete` |
| H. pode haver bypass? | SIM | UI é puramente informativa; não há `useEffect` de trava |

---

## SEÇÃO 7 — ANÁLISE E DOCUMENTO
- **Editor altera o mesmo conteúdo do Viewer?** **NÃO.** O Editor (`draft/edit`) é visual e usa `textarea` com `defaultValue`, enquanto o Viewer usa `MOCK_DOCUMENT_PREVIEWS`.
- **Análise produz estado central?** **NÃO.** `app.cases.$caseId.analysis.tsx` usa `ChainCard` com props estáticas locais.
- **Rastreabilidade é só visual ou estado?** **VISUAL.** `TRACE_DATA` é constante local em `app.cases.$caseId.traceability.tsx`.

---

## SEÇÃO 8 — AUDITORIA E REVISÃO
- **Audit:** **PARCIAL.** O botão de aprovação persiste no `CaseWorkflowProvider`, mas o checklist é estático.
- **Blocks:** **REAL.** Lê dinamicamente os impedimentos do `workflow` (Ex: `!sufficiencyApproved`).
- **Professional Review:** **PARCIAL.** Persiste a aprovação no provider, mas o conteúdo revisado é mock.
- **Review Document:** **MOCK.** Renderiza o viewer read-only.

---

## SEÇÃO 9 — ROTAS LEGADAS/MORTAS
| ARQUIVO | STATUS | RISCO DE REMOÇÃO |
| :--- | :--- | :--- |
| `app.cases.$caseId.approval.tsx` | LEGADO | **ALTO.** Redundante com `approvals.tsx` (plural). |
| `app.cases.$caseId.approvals.tsx` | OPERACIONAL | **BAIXO.** Usado para gerenciar autorizações de assinatura. |
| `app.review_.index.tsx` | LEGADO? | **MÉDIO.** Rota de nível superior sem vínculo claro com `cases`. |

---

## SEÇÃO 10 — AÇÕES FAKE
| ROTA | BOTÃO | O QUE APARENTA FAZER | O QUE REALMENTE FAZ | PRIORIDADE |
| :--- | :--- | :--- | :--- | :--- |
| /app/cases/new/review | Criar ambiente | Gerar novo Caso | Sobrescreve `demo-case` | P2 |
| /app/cases/$caseId/process | IA | Processar dados | Apenas animação CSS | P3 |
| /app/cases/$caseId/draft/edit | Salvar | Persistir texto | Log no console | P1 |
| /app/cases/$caseId/draft/questions | Editar | Salvar resposta | Nada (sem estado) | P1 |

---

## SEÇÃO 11 — P0 REAIS
**P0 = 0.**
Não foram detectadas exposições críticas ou corrupção de versão no baseline atual.

---

## SEÇÃO 12 — P1
| ID | PROBLEMA | ARQUIVOS | DEPENDÊNCIA | MICROETAPA |
| :--- | :--- | :--- | :--- | :--- |
| P1-01 | Quesitos sem persistência | `questions.tsx`, `case-types.ts` | Domínio | 6A |
| P1-02 | Editor desconectado do Viewer | `draft.edit.tsx`, `DocumentViewer.tsx` | Quesitos | 6B |
| P1-03 | Suficiência sem vínculo real | `sufficiency.tsx` | Dossier/Quesitos | 6C |

---

## SEÇÃO 13 — ORDEM SEGURA
**ETAPA 01: DOMÍNIO DE QUESITOS E RESPOSTAS**
- **OBJETIVO:** Centralizar quesitos oficiais e sugestões no `CaseWorkflowProvider`.
- **ARQUIVOS:** `case-types.ts`, `CaseWorkflowProvider.tsx`, `questions.tsx`.
- **POR QUE AGORA:** É a base para a Suficiência e para o conteúdo do Laudo.

**ETAPA 02: PERSISTÊNCIA DO EDITOR (DRAFT)**
- **OBJETIVO:** Fazer o Editor (`draft/edit`) salvar seções que o `DocumentViewer` consome.
- **ARQUIVOS:** `DocumentViewer.tsx`, `draft.edit.tsx`.
- **POR QUE AGORA:** Resolve o gap de "ação fake" no editor.

---

## PERGUNTA OBRIGATÓRIA SOBRE MULTI-CASE
**É necessário implementar Multi-case AGORA, antes de Quesitos e Suficiência?**
**NÃO.**
**Justificativa:** O risco de regressão ao mexer em toda a árvore de roteamento e providers para IDs dinâmicos é alto. É tecnicamente mais seguro fechar o domínio funcional (Quesitos, Análise, Suficiência) no `demo-case` e depois migrar a estrutura para multi-tenancy.

---

## PRÓXIMA MICROETAPA
**[6A] Implementação do Domínio de Quesitos e Respostas.**

---

## TSC / BUILD / LINT
- **TSC:** EXIT CODE 0
- **BUILD:** EXIT CODE 0
- **LINT:** EXIT CODE 1 (Erros de `unused-vars` e `no-explicit-any` em mocks).

AUDITORIA EXECUTIVA V3 CONCLUÍDA
