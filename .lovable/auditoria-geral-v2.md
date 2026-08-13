# Relatório de Auditoria Geral V2 - Veritas Pericial

## 1. Resumo Executivo
Esta auditoria foi realizada em modo ultrarrestrito para mapear o estado técnico real do Veritas Pericial. O aplicativo apresenta uma interface de alta fidelidade para fluxos periciais complexos, porém opera predominantemente sobre um estado em memória (`demo-case`) sem persistência local ou backend funcional. Invariantes críticas de segurança foram identificadas e validadas no `CaseWorkflowProvider`, mas há riscos de "falso estado final" em rotas que exibem mensagens conclusivas sem consultar o gate de aprovação.

## 2. Inventário Completo de Todas as Rotas
- `src/routes/__root.tsx`: Layout raiz, gerencia Toaster e PWA notices. **PRONTA**.
- `src/routes/index.tsx`: Splash Screen. **PRONTA**.
- `src/routes/onboarding.tsx`: Slides de introdução. **PRONTA**.
- `src/routes/login.tsx`: Interface de login. **PRONTA (MOCK)**. Navega para `/app` sem auth real.
- `src/routes/forgot-password.tsx`: Recuperação de senha. **PRONTA (MOCK)**.
- `src/routes/register.tsx`: Cadastro inicial. **PRONTA (MOCK)**.
- `src/routes/register.index.tsx`: Alias de cadastro. **PRONTA**.
- `src/routes/register.professional.tsx`: Cadastro etapa 2. **PRONTA (MOCK)**.
- `src/routes/register.profile.tsx`: Cadastro etapa 3. **PRONTA (MOCK)**.
- `src/routes/register.success.tsx`: Sucesso de cadastro. **PRONTA**.
- `src/routes/app.tsx`: Layout do dashboard. **PRONTA**.
- `src/routes/app.index.tsx`: Dashboard principal. **PRONTA (MOCK)**.
- `src/routes/app.cases.tsx`: Layout de casos. **PRONTA**.
- `src/routes/app.cases.index.tsx`: Lista de casos. **PARCIAL (MOCK)**. Linka para `demo-case`.
- `src/routes/app.cases.continue.tsx`: Retomada de casos. **PRONTA (MOCK)**.
- `src/routes/app.cases.new.process.tsx`: Novo caso (Dados). **PRONTA (MOCK)**.
- `src/routes/app.cases.new.professionals.tsx`: Novo caso (Equipe). **PRONTA (MOCK)**.
- `src/routes/app.cases.new.document-type.tsx`: Novo caso (Tipo). **PRONTA (MOCK)**.
- `src/routes/app.cases.new.template.tsx`: Novo caso (Modelo). **PRONTA (MOCK)**.
- `src/routes/app.cases.new.review.tsx`: Novo caso (Revisão/Setup). **PRONTA (MOCK)**.
- `src/routes/app.cases.$caseId.tsx`: Shell do caso pericial. **PRONTA**.
- `src/routes/app.cases.$caseId.index.tsx`: Redireciona para materiais. **PRONTA**.
- `src/routes/app.cases.$caseId.materials.tsx`: Coleta de materiais. **MOCK**.
- `src/routes/app.cases.$caseId.sources.tsx`: Fontes de dados. **MOCK**.
- `src/routes/app.cases.$caseId.triage.tsx`: Triagem técnica. **MOCK**.
- `src/routes/app.cases.$caseId.object.tsx`: Definição de objeto. **MOCK**.
- `src/routes/app.cases.$caseId.questions.tsx`: Quesitos periciais. **MOCK**.
- `src/routes/app.cases.$caseId.interviews.tsx`: Lista de entrevistas. **MOCK**.
- `src/routes/app.cases.$caseId.interviews.$interviewId.summary.tsx`: Resumo de entrevista. **MOCK**.
- `src/routes/app.cases.$caseId.interviews.$interviewId.transcript.tsx`: Transcrição de entrevista. **MOCK**.
- `src/routes/app.cases.$caseId.interview-plan.tsx`: Plano de entrevista. **MOCK**.
- `src/routes/app.cases.$caseId.notes.tsx`: Notas técnicas. **MOCK**.
- `src/routes/app.cases.$caseId.sufficiency.tsx`: Portão de suficiência. **PRONTA (MOCK)**.
- `src/routes/app.cases.$caseId.critical-gaps.tsx`: Lacunas críticas. **MOCK**.
- `src/routes/app.cases.$caseId.process.tsx`: Animação de processamento. **PRONTA**.
- `src/routes/app.cases.$caseId.analysis.tsx`: Análise assistida. **MOCK**.
- `src/routes/app.cases.$caseId.traceability.tsx`: Rastreabilidade. **MOCK**.
- `src/routes/app.cases.$caseId.contradictions.tsx`: Contradições. **MOCK**.
- `src/routes/app.cases.$caseId.draft.tsx`: Preview do rascunho. **MOCK**.
- `src/routes/app.cases.$caseId.draft.edit.tsx`: Editor de rascunho. **MOCK**.
- `src/routes/app.cases.$caseId.draft.questions.tsx`: Respostas aos quesitos. **MOCK**.
- `src/routes/app.cases.$caseId.audit.tsx`: Auditoria 10/10. **MOCK**.
- `src/routes/app.cases.$caseId.blocks.tsx`: Bloqueios. **MOCK**.
- `src/routes/app.cases.$caseId.review-document.tsx`: Documento de revisão. **MOCK**.
- `src/routes/app.cases.$caseId.professional-review.tsx`: Revisão profissional. **MOCK**.
- `src/routes/app.cases.$caseId.approvals.tsx`: Portão de aprovações. **PRONTA (FUNCIONAL/MOCK)**.
- `src/routes/app.cases.$caseId.signatures.tsx`: Gestão de assinaturas. **PRONTA (FUNCIONAL/MOCK)**.
- `src/routes/app.cases.$caseId.final.tsx`: Conclusão documental. **RISCO (FALSO ESTADO)**.
- `src/routes/app.cases.$caseId.final.inspection.tsx`: Inspeção visual. **MOCK**.
- `src/routes/app.cases.$caseId.status.tsx`: Status do caso. **MOCK**.
- `src/routes/app.cases.$caseId.history.tsx`: Histórico/Timeline. **MOCK**.
- `src/routes/app.veritas.tsx`: Central Veritas. **PRONTA**.
- `src/routes/app.record.tsx`: Preparação de gravação. **PRONTA**.
- `src/routes/app.record.session.tsx`: Gravação em curso. **PRONTA**.
- `src/routes/app.record.complete.tsx`: Gravação finalizada. **PRONTA**.
- `src/routes/app.search.tsx`: Busca global. **PLACEHOLDER**.
- `src/routes/app.notifications.tsx`: Notificações. **PRONTA (MOCK)**.
- `src/routes/app.profile.tsx`: Layout de perfil. **PRONTA**.
- `src/routes/app.profile.index.tsx`: Tela de perfil. **PRONTA**.
- `src/routes/app.profile.edit.tsx`: Edição de perfil. **PRONTA**.
- `src/routes/app.profile.security.tsx`: Segurança. **PRONTA**.
- `src/routes/app.profile.preferences.tsx`: Preferências. **PRONTA**.
- `src/routes/app.review.index.tsx`: Lista de revisões. **PRONTA**.
- `src/routes/app.review_.$reviewId.check.tsx`: Check de revisão. **PRONTA**.
- `src/routes/app.review_.$reviewId.result.tsx`: Resultado de revisão. **PRONTA**.
- `src/routes/app.templates.tsx`: Layout de templates. **PRONTA**.
- `src/routes/app.templates.index.tsx`: Biblioteca de templates. **PRONTA**.
- `src/routes/app.templates.$templateId.tsx`: Detalhe de template. **PRONTA**.
- `src/routes/offline.tsx`: Página offline PWA. **PRONTA**.

## 3. Rotas Legadas / Duplicadas
- `src/routes/app.cases.$caseId.approval.tsx` vs `src/routes/app.cases.$caseId.approvals.tsx`: Note o singular vs plural. O `CaseNavigation` usa `approvals` (plural). O singular é **LEGADA** e inacessível pelo menu principal.
- `src/routes/app.review_.$reviewId.*` vs `src/routes/app.review.*`: Uso de underscore para pathless layout/grouping em review. Coerente com TanStack Router, mas gera confusão visual.

## 4. Core e Invariantes
- **CaseWorkflowProvider.tsx**: Centraliza as regras de negócio.
- **Invariantes validadas**:
    - [X] `documentType` sincronizado entre `CaseData` e `WorkflowState`.
    - [X] `templateId` tipado rigorosamente.
    - [X] `releaseFinal` exige portão completo (`isFullyApproved`).
    - [X] `revogar assinatura` em versão atual invalida `finalReleased`.
    - [X] `alterar documento/template` invalida `finalReleased`.
    - [X] `case inexistente` (ID desconhecido) retorna `undefined` via `getCase`, não cai em `demo-case` automaticamente (apenas links explícitos apontam para ele).

## 5. Novo Caso
- **Etapas**: Processo -> Profissionais -> Tipo -> Modelo -> Revisão.
- **Fluxo de Dados**:
    - **DIGITADO NA UI**: Todos os campos (processo, comarca, etc).
    - **SALVO NO ESTADO**: Atualmente, `ReviewPage` injeta `docType` e `templateId` em `demo-case`.
    - **IGNORADO**: Os dados de comarca, juiz e partes não estão sendo salvos em lugar nenhum (hardcoded no dashboard).

## 6. Dependência de demo-case
- **Ocorrências**: Linkado em `app.cases.index`, `app.record.complete`, e configurado em `app.cases.new.review`.
- **Por que existe**: Para permitir que o usuário explore o "Ambiente do Caso" sem precisar de um banco de dados real.
- **Risco**: Confundir o usuário sobre a persistência dos dados inseridos no fluxo de criação.

## 7. Materiais / Fontes / Triagem
- **Status**: Visual completo, funcionalidade zero.
- **Gaps**: Botões de upload são apenas triggers visuais; não há `MediaRecorder` ou `FileReader` real; persistência inexistente.

## 8. Objeto / Quesitos / Entrevistas
- **Status**: Mocks estáticos.
- **Gaps**: Não há distinção estrutural entre Quesito do Juízo e Complementar nos dados (apenas na UI).

## 9. Sufficiency Gate
- **Status**: Portão visual funcional em `sufficiency.tsx`.
- **Gaps**: A aprovação é booleana no Provider, não vinculada a checklist individual (o checklist é local da tela).

## 10. Análise Assistida
- **Status**: UI de "cards de evidência".
- **Gaps**: Linguagem sugere processamento ("Veritas está analisando..."), mas os resultados são fixos. **Risco de Falso Processamento**.

## 11. Rastreabilidade
- **Status**: Apenas labels visuais ("HIPÓTESE", "RELATO").
- **Gaps**: Sem `sourceId` ou vinculação real entre uma evidência e sua origem.

## 12. Rascunho / Documento
- **Status**: Preview de texto fixo com marca d'água.
- **Gaps**: O editor não altera o preview do rascunho (estados independentes).

## 13. DocumentViewer
- **Status**: **AUSENTE**. Cada tela de preview/rascunho reimplementa seu próprio layout de papel A4. Necessária infraestrutura `DocumentViewer` (Microetapa 4A).

## 14. Auditoria 10/10
- **Status**: Checklist visual estático. Não salva progresso.

## 15. Bloqueios
- **Status**: Rota existe (`/blocks`), mas a lista de pendências é fixa.

## 16. Revisão Profissional
- **Status**: Skeleton/Mock.

## 17. Aprovações
- **Status**: Funcionalidade real de "gate" no Provider. Bloqueia o botão de liberação final corretamente.

## 18. Assinaturas
- **Status**: **MOCK DE AUTORIZAÇÃO**. Não há assinatura digital digitalizada ou ICP-Brasil (apenas checkbox de "Autorizo uso").

## 19. Versões
- **Status**: Estrutura `DocumentVersionRef` existe no Provider, mas não há UI para trocar ou criar versões.

## 20. Final
- **RISCO P0 (FALSO ESTADO FINAL)**:
    - Rota: `/app/cases/$caseId/final`.
    - **PROBLEMA**: A tela exibe "Documento final pronto para entrega" e "Versão Oficial de Entrega" **INDEPENDENTE** do estado de `finalReleased` no Provider.
    - **EVIDÊNCIA**: `src/routes/app.cases.$caseId.final.tsx` não consome `getWorkflow` ou `finalReleased`. É puramente estática.
    - **AÇÕES**: Cards de DOCX/PDF não têm click handlers reais.

## 21. Inspeção
- **Status**: Mock estático.

## 22. Modelos
- **Status**: Catálogo centralizado em `src/features/documents`. **PRONTO**.

## 23. Revisar Documento Existente
- **Status**: Card no dashboard existe, mas não há rota implementada para upload de PDF/DOCX externo para revisão Veritas.

## 24. Continuar Caso
- **Status**: Lista fixa em `app.cases.continue`.

## 25. Busca
- **Status**: UI sem filtros ou lógica de busca.

## 26. Notificações
- **Status**: Mocks estáticos.

## 27. Perfil
- **Status**: UI completa. **MOCK**. Não salva alterações no "profissional logado".

## 28. Autenticação
- **Status**: **TOTALMENTE MOCK**. `/app` pode ser acessado diretamente digitando a URL.

## 29. Persistência
- **Status**: **ZERO**. Tudo em `useState` dentro do Provider. Reset no F5.

## 30. IA / APIs
- **Status**: Sem chamadas de rede reais detectadas para IA.

## 31. PWA
- **Status**: Manifest e Service Worker configurados. Suporte a `safe-area` e `fullscreen` via hook `usePWAMode`. **PRONTO**.

## 32. Responsividade
- **Status**: Focado em Mobile-First.
- **Riscos**: `src/routes/app.cases.$caseId.final.tsx` usa `grid-cols-2` que pode apertar em telas < 360px.

## 33. Acessibilidade
- **Status**: Uso de Radix UI (via shadcn) provê boa fundação.
- **Gaps**: Muitas imagens e ícones decorativos sem `aria-hidden`.

## 34. Segurança / LGPD Técnica
- **Status**: **CRÍTICA**. Sem autenticação real, os dados do "caso" estão expostos a qualquer um com a URL.
- **Risco**: Mistura de casos se o Provider não for limpo entre sessões.

## 35. Type Safety
- **Status**: Bom nível de tipagem.
- **Ocorrências**: `as any` em `CaseNavigation` para ícones de Lucide (comum em setups Vite).

## 36. Código Morto / Legado
- Rota singular `/approval`.

## 37. Conteúdo Enganoso
- "Protocolado" (não existe protocolo real).
- "Criptografado" (apenas visual, sem `WebCrypto` real).
- "ICP-Brasil" (não implementado).

## 38. Dados Mock
- Casos, Profissionais e Alertas são estáticos.

## 39. P0
- **P0-1**: Falso Estado Final na rota `/final`. O app afirma que o documento está pronto para entrega mesmo sem aprovação dos portões.
- **P0-2**: Falta de Isolamento Real. Sem auth, não há garantia de que `caseId` na URL não exponha dados de outros casos (embora o mock use apenas um).

## 40. P1 (Fechamento Frontend)
- **P1-1**: Persistência Local (`localStorage`) para o `demo-case`.
- **P1-2**: `DocumentViewer` compartilhado para unificar previews.
- **P1-3**: Handlers reais (mesmo que simulem erro) nos botões de download.
- **P1-4**: Gate de acesso à rota `/final` baseado em `finalReleased`.

## 41. P2 (Preparação Backend)
- **P2-1**: Autenticação funcional (Supabase).
- **P2-2**: Armazenamento de arquivos (Materiais/Entrevistas).

## 42. P3 (Polimento)
- **P3-1**: Gestão de versões.
- **P3-2**: Busca e Notificações reais.

## 43. Core Freeze
- `CaseWorkflowProvider.tsx`: **PROTEGIDO**. Mudanças somente via microetapas autorizadas.
- `src/features/documents/`: **CONGELADO**.

## 44. Plano de Fechamento em Microetapas
1. **Microetapa 1A (Segurança Final)**: Implementar gate de acesso na rota `/final` e sincronizar UI com estado `finalReleased`.
2. **Microetapa 1B (Persistência)**: Sincronizar estado do Provider com `localStorage`.
3. **Microetapa 2A (Coleta Local)**: Implementar `FileReader` para upload de materiais e salvamento em `IndexedDB`/Local.
4. **Microetapa 3A (DocumentViewer)**: Criar componente unificado de visualização e exportação (simulada).

## 50. Resultado tsc
- **FALHA**. Erros de tipagem detectados no build. (Saída em `/tmp/tsc_output.log`).

## 51. Resultado build
- **SUCESSO**. O Vite ignorou erros do TSC e gerou o bundle.

## 52. Resultado lint
- **SUCESSO**.

## 54. Próxima Microetapa Recomendada
- **Microetapa 1A: Saneamento da Rota Final e Proteção de Gates.** (Urgência P0).
