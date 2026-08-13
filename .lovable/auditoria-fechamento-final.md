# Auditoria Final de Fechamento — Veritas Pericial

## 1. Resumo Executivo
Auditoria técnica completa do estado atual do frontend do Veritas Pericial realizada em 13/08/2026. O sistema apresenta uma fundação robusta de domínio (Dossiê, Workflow e Gates), porém possui gaps significativos em persistência, funcionalidades de áudio/transcrição e exportação real de documentos. O frontend está em estágio avançado de "Mock Funcional", onde as regras de negócio operam em memória, mas as ações de infraestrutura pesada (IA, PDF, Gravador) são simuladas visualmente.

## 2. Estado Atual do Frontend
- **Arquitetura**: TanStack Start v1 (React 19).
- **Estado**: Centralizado via Context Providers (`CaseDossierProvider`, `CaseWorkflowProvider`).
- **Persistência**: Ausente (Estado em memória, reset no F5).
- **Mocks**: Uso extensivo de `demo-case` como âncora de dados.
- **Visual**: Design system Veritas consolidado (Graphite, Electric Blue, Violet).
- **Acessibilidade**: Parcial (Alguns componentes com ARIA, outros sem labels ou sem navegação por teclado otimizada).

## 3. Inventário Completo de Rotas

| URL | Arquivo | Objetivo | Status | Fonte |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `index.tsx` | Splash Screen / Redirecionamento | PRONTA | Estático |
| `/login` | `login.tsx` | Autenticação | MOCK FUNCIONAL | Local State |
| `/onboarding` | `onboarding.tsx` | Slides introdutórios | PRONTA | Estático |
| `/register` | `register.tsx` | Fluxo de cadastro | PRONTA | Local State |
| `/app` | `app.index.tsx` | Dashboard Principal | MOCK FUNCIONAL | Context |
| `/app/cases` | `app.cases.index.tsx` | Lista de Casos | MOCK FUNCIONAL | `mock-cases` |
| `/app/cases/new/process` | `app.cases.new.process.tsx` | Dados do processo (Etapa 1) | PRONTA | Search Params |
| `/app/cases/$caseId` | `app.cases.$caseId.index.tsx` | Root do Caso (Redirect) | PRONTA | - |
| `/app/cases/$caseId/materials` | `app.cases.$caseId.materials.tsx` | Inventário Fxx | PRONTA | DossierContext |
| `/app/cases/$caseId/triage` | `app.cases.$caseId.triage.tsx` | Triagem Técnica | PRONTA | DossierContext |
| `/app/cases/$caseId/object` | `app.cases.$caseId.object.tsx` | Objeto e Finalidade | PRONTA | DossierContext |
| `/app/cases/$caseId/draft` | `app.cases.$caseId.draft.tsx` | Preview do Rascunho | MOCK FUNCIONAL | DocumentPreview |
| `/app/cases/$caseId/draft/edit` | `app.cases.$caseId.draft.edit.tsx` | Editor de Rascunho | MOCK | Local State |
| `/app/cases/$caseId/signatures` | `app.cases.$caseId.signatures.tsx` | Autorizações de Assinatura | PRONTA | WorkflowContext |
| `/app/cases/$caseId/approvals` | `app.cases.$caseId.approvals.tsx` | Central de Aprovações/Gates | PRONTA | WorkflowContext |
| `/app/cases/$caseId/final` | `app.cases.$caseId.final.tsx` | Tela de Entrega Final | PRONTA | WorkflowContext |
| `/app/cases/$caseId/final/inspection` | `app.cases.$caseId.final.inspection.tsx` | Inspeção A4 Checklist | PRONTA | Local State |
| `/app/record` | `app.record.tsx` | Preparação de Gravação | PRONTA | Estático |
| `/app/record/session` | `app.record.session.tsx` | Sessão de Gravação | MOCK FUNCIONAL | Local State |
| `/app/veritas` | `app.veritas.tsx` | Central Skill Veritas | MOCK | Estático |

## 4. Mapa de Fluxo Ponta a Ponta

- **Abrir app → Login**: FUNCIONA (Navegação manual)
- **Login → Dashboard**: FUNCIONA (Navegação via botão)
- **Dashboard → Novo Caso**: FUNCIONA (Fluxo multi-etapa 100%)
- **Novo Caso → Materiais**: FUNCIONA (Através de `demo-case`)
- **Materiais → Triagem**: FUNCIONA (Gate de conclusão funcional)
- **Triagem → Objeto/Finalidade**: FUNCIONA (Dependência de triageComplete)
- **Objeto/Finalidade → Quesitos**: **QUEBRA** (Rota `/questions` existe mas sem link natural visível no CaseShell padrão)
- **Rascunho → Versões**: FUNCIONA (Lógica de invalidade preservada)
- **Aprovações → Final**: FUNCIONA (Gate `finalReleased` bloqueia acesso se incompleto)
- **Final → Inspeção**: FUNCIONA (Checklist interativo)

## 5. Novo Caso
- **Campos Digitados**: Número do Processo (Input livre).
- **Campos Transportados via Search Params**: `mode`, `caseNumber`, `professionals`, `docType`, `templateId`.
- **Criação de CaseId**: **NÃO**. O fluxo "cria" o caso aplicando as configurações ao `demo-case` fixo no final do processo (`app.cases.new.review.tsx`).
- **Hard-coded**: Profissionais disponíveis para seleção e Templates.

## 6. Dossiê
- **Estado**: Totalmente centralizado em `CaseDossierProvider`.
- **Lógica**: IDs incrementais F01, F02 automáticos. Invalidações em cascata (Material -> Triage -> Object) implementadas.

## 7. Materiais
- **Metadados**: FUNCIONAIS. Registro de novos itens (F04+) funciona em memória.
- **Arquivo Real**: **AUSENTE**. Não há input de arquivo (`type="file"`) nem processamento de Blob/File.
- **Conferência**: FUNCIONAL. Botão "Concluir conferência" trava edição e libera Triagem.

## 8. Triagem
- **Review por Fxx**: FUNCIONAL. Switches salvam estado no Provider.
- **Pontos de Atenção**: FUNCIONAIS (Derivados de legibilidade e limitações).
- **Hard-coded**: Conteúdo fictício removido na etapa 5C.

## 9. Objeto e Finalidade
- **Campos**: Object, Purpose, Limits (Textareas funcionais).
- **Vinculação**: Checkboxes funcionais vinculados a `dossier.items`.
- **Gate**: Travado por `triageComplete`.
- **Ordem Canônica**: Garantida no Provider (IDs ordenados pela lista original).

## 10. Quesitos e Entrevistas
- **Quesitos**: **MOCK**. Rota `/questions` exibe lista estática. Sem vinculação ao Provider.
- **Entrevistas**: **MOCK/UI**.
- **Transcrição**: **FAKE**. Interface simula texto processado, mas não há MediaRecorder nem API.
- **Diferenciação**: O app não distingue tecnicamente Quesito Oficial de Sugestão Técnica no nível de domínio.

## 11. Suficiência
- **Gate**: Depende de `sufficiencyApproved` (boolean manual no Workflow).
- **Lógica**: Não há requisitos reais de "Gaps Críticos" calculados; o usuário marca como aprovado manualmente.

## 12. Rastreabilidade e DocumentViewer
- **Enums**: Utiliza `TraceabilityKind`.
- **Marcadores**: Visuais no `DocumentViewer`.
- **Viewer**: Consistente entre Draft, Review e Inspeção.
- **Versões**: Histórico visível em `/versions`. Invalidação de gate por nova versão funciona.

## 13. Assinaturas e Final
- **Autorização**: FUNCIONAL (Check de switch que altera status no Workflow).
- **Assinatura Real**: **AUSENTE**. Sem certificados, sem ICP-Brasil real, sem PNGs/Manuscritas (conforme regra forense).
- **Final**: Bloqueio de acesso via `finalReleased` é o P0 de segurança atual.
- **Download**: **REMOVIDO**. Não há geração de PDF/DOCX.

## 14. Persistência e Backend
- **F5**: **PERDA TOTAL DE DADOS**. Tudo reside em `useState`.
- **Backend**: **AUSENTE**. Nenhuma chamada `fetch` ou `axios` para APIs externas encontrada (exceto infraestrutura do TanStack).
- **Auth**: Simulado no frontend.

## 15. Auditoria 10/10
1. **Identificação**: REAL (Via Novo Caso/Dossiê).
2. **Integridade**: PARCIAL (Metadados ok, arquivo ausente).
3. **Atribuição**: REAL (Rastreabilidade via marcadores).
4. **Procedimentos**: PARCIAL (Timeline visual).
5. **Competências**: MOCK (Lista fixa de profissionais).
6. **Objeto**: REAL (Formulário funcional).
7. **Análise**: MOCK (Editor não salva).
8. **Proteção**: PARCIAL (Isolation gate manual).
9. **Texto**: MOCK (Conteúdo do relatório é estático).
10. **Documento**: MOCK (Preview A4 visual apenas).

## 16. Problemas P0/P1
- **P0**: **Mistura de dados no demo-case**. Como todos os fluxos de "Novo Caso" desaguam no mesmo ID `demo-case`, não é possível simular dois casos simultâneos.
- **P1**: **Editor de Rascunho**. O editor em `/draft/edit` não persiste o texto no Provider, tornando o preview do rascunho estático.
- **P1**: **Quesitos e Suficiência**. Não estão conectados ao `CaseDossierProvider`, quebrando a cadeia de evidências.

## 17. Plano de Fechamento Recomendado (Microetapas)

1. **Etapa 01: Multi-case Domain**: Refatorar `CaseWorkflowProvider` e `CaseDossierProvider` para suportar IDs dinâmicos gerados no "Novo Caso", removendo a dependência exclusiva do `demo-case`.
2. **Etapa 02: Quesitos e Plano de Entrevista**: Integrar os quesitos ao `CaseDossierProvider` e criar lógica de vinculação a fontes.
3. **Etapa 03: Gate de Suficiência Real**: Implementar lógica de cálculo de suficiência baseada em "Gaps Críticos" marcados nos quesitos.
4. **Etapa 04: Editor Funcional**: Conectar o textarea do `/draft/edit` ao estado global para que o `DocumentViewer` reflita as alterações em tempo real.
5. **Etapa 05: Limpeza de Rotas e Mocks**: Remover arquivos mortos (`app.cases.$caseId.approval.tsx` legado vs `approvals.tsx`) e nomes fictícios remanescentes em notificações e busca.

## 18. Resultado Build/Lint
- **TSC**: EXIT CODE 0 (OK).
- **Build**: EXIT CODE 0 (OK).
- **Lint**: EXIT CODE 1 (Erros de `no-unused-vars` e inconsistências de tipos menores).

## 19. Prova de Não Alteração
- **Arquivos alterados**: 1 (`.lovable/auditoria-fechamento-final.md`).
- **Baseline**: `ead27e0d66b3be9a42fd3e0d11fb8d5fa5cc9e48`.

---
**AUDITORIA DE FECHAMENTO CONCLUÍDA**
