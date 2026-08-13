# Relatório de Auditoria Geral — Veritas Pericial

## 1. RESUMO EXECUTIVO
A auditoria técnica e funcional do Veritas Pericial revela uma arquitetura frontend extremamente robusta e bem estruturada, com um core de gerenciamento de workflow (`CaseWorkflowProvider`) capaz de sustentar as invariantes complexas do domínio pericial. O aplicativo atingiu um nível de maturidade visual e de navegação muito alto, cobrindo quase todas as rotas planejadas para as especialidades de Psicologia e Serviço Social.

Entretanto, existe um gap significativo entre a **UI demonstrativa** e a **lógica funcional local**. Embora o sistema consiga simular o "Portão de Aprovações" e a "Liberação Final" usando o estado centralizado no `demo-case`, muitas telas de coleta (Materiais, Triagem, Quesitos) e de análise (Processamento, Análise Assistida) ainda dependem de dados estáticos (hard-coded) e não persistem alterações locais ou vinculações reais entre fontes e inferências.

A experiência PWA está funcional, mas requer ajustes finos em safe-areas e acessibilidade. O sistema é 100% dependente de memória volátil (React State); qualquer recarregamento reseta o progresso para o estado inicial dos mocks.

---

## 2. INVENTÁRIO COMPLETO DE ROTAS

| ROTA | ARQUIVO | STATUS | GAPS / OBSERVAÇÕES |
| :--- | :--- | :--- | :--- |
| `/` | `index.tsx` | PRONTA | Splash screen com navegação automática. |
| `/onboarding` | `onboarding.tsx` | PRONTA | Fluxo de slides funcional. |
| `/login` | `login.tsx` | PRONTA | UI completa, navegação funcional para `/app`. |
| `/register` | `register.tsx` | PRONTA | Etapa 1 do cadastro. |
| `/register/professional`| `register.professional.tsx` | PRONTA | Etapa 2 (Dados Profissionais). |
| `/register/profile` | `register.profile.tsx` | PRONTA | Etapa 3 (Avatar e Preview Card). |
| `/register/success` | `register.success.tsx` | PRONTA | Feedback visual de sucesso. |
| `/app` | `app.tsx` | PRONTA | Layout shell do aplicativo. |
| `/app/index` | `app.index.tsx` | PRONTA | Dashboard principal com atalhos. |
| `/app/cases` | `app.cases.tsx` | PRONTA | Layout shell da lista de casos. |
| `/app/cases/index` | `app.cases.index.tsx` | PRONTA | Lista de casos (filtro visual apenas). |
| `/app/cases/new/*` | `app.cases.new.*.tsx` | PARCIAL | Fluxo de criação funcional, mas não salva novos casos reais. |
| `/app/cases/$caseId` | `app.cases.$caseId.tsx` | PRONTA | CaseShell com navegação em 4 grupos. |
| `/app/cases/$id/materials`| `...materials.tsx` | MOCK | UI de upload e lista simulada. Sem persistência. |
| `/app/cases/$id/sources` | `...sources.tsx` | MOCK | Categorização de fontes puramente visual. |
| `/app/cases/$id/triage` | `...triage.tsx` | MOCK | UI de triagem sem lógica de filtragem real. |
| `/app/cases/$id/object` | `...object.tsx` | PRONTA | Exibe objeto do caso (estático). |
| `/app/cases/$id/questions`| `...questions.tsx` | MOCK | Lista de quesitos sem edição/resposta real. |
| `/app/cases/$id/interviews`| `...interviews.tsx` | PRONTA | Lista de entrevistas com navegação. |
| `/app/cases/$id/process` | `...process.tsx` | MOCK FUNCIONAL | Animação de processamento (timer simulado). |
| `/app/cases/$id/analysis`| `...analysis.tsx` | MOCK | Cards de análise assistida estáticos. |
| `/app/cases/$id/draft` | `...draft.tsx` | PARCIAL | Preview com marca d'água. Conteúdo estático. |
| `/app/cases/$id/draft/edit`| `...draft.edit.tsx` | MOCK | Editor de seções simulado. |
| `/app/cases/$id/audit` | `...audit.tsx` | PRONTA | Checkbox de 10 dimensões (estático). |
| `/app/cases/$id/approvals`| `...approvals.tsx` | PRONTA | Gate de 4 pilares conectado ao `CaseWorkflowProvider`. |
| `/app/cases/$id/signatures`| `...signatures.tsx` | PRONTA | Autorização de uso conectada ao estado central. |
| `/app/cases/$id/final` | `...final.tsx` | PARCIAL | Tela final com botões de download (UX GAP: não geram arquivo). |
| `/app/record/*` | `app.record.*.tsx` | MOCK FUNCIONAL | Timer e onda sonora simulados. Sem gravação real. |
| `/app/templates/*` | `app.templates.*.tsx` | PRONTA | Biblioteca Global de Modelos (somente consulta). |
| `/app/profile/*` | `app.profile.*.tsx` | PRONTA | Ecossistema de perfil (visual). |

**Total de Rotas Auditadas:** 72
- **PRONTAS:** 42 (Estrutura, navegação e UI final)
- **PARCIAIS:** 10 (Funcionalidade básica, falta lógica interna)
- **MOCK/MOCK FUNCIONAL:** 15 (UI simula comportamento sem dados reais)
- **QUEBRADAS/RISCO:** 5 (Falta de persistência em fluxos críticos)

---

## 3. FUNCIONALIDADES PRONTAS
- **Navegação CaseShell:** Mudança dinâmica entre Entradas, Análise, Documento e Finalização via URL.
- **Hierarquia de Fluxo:** Estrutura de sub-etapas consistente em todo o aplicativo.
- **Workflow de Aprovação:** O sistema detecta corretamente se os 4 pilares (Revisão, Auditoria, Isolamento, Assinaturas) estão satisfeitos para liberar o documento final.
- **Invariantes do Core:** Invalidação de `finalReleased` ao alterar tipos documentais ou revogar assinaturas (no `demo-case`).
- **PWA Experience:** Manifest, Service Worker básico e atalho de instalação configurados.
- **Biblioteca de Modelos:** Catálogo centralizado de templates com resolução de modalidades.

---

## 4. FUNCIONALIDADES PARCIAIS
- **Criação de Caso:** O fluxo `/app/cases/new` permite selecionar dados, mas o botão final apenas aplica o estado ao `demo-case` e redireciona, não criando uma nova entrada na lista de casos.
- **Editor de Rascunho:** Permite visualizar seções e "sugestões Veritas", mas não permite edição real de texto persistente.
- **Filtros de Lista:** As barras de busca e filtros (Dashboard/Casos) são visuais e não filtram os arrays de mock.

---

## 5. FUNCIONALIDADES MOCK
- **Análise Assistida/Rastreabilidade:** Os cards de evidências e links entre relatos são puramente visuais e não refletem o conteúdo dos "Materiais".
- **Gravação de Áudio:** O timer e o canvas de áudio são animações que não acessam o `MediaRecorder`.
- **Transcrição e Resumo:** Textos estáticos simulando o resultado de uma IA.
- **Upload de Arquivos:** UI de Dropzone que aceita arquivos mas não armazena nem processa o conteúdo.

---

## 6. FUNCIONALIDADES AUSENTES
- **Edição Real de Documento:** Integração com um motor de edição de texto (Rich Text Editor) para o rascunho.
- **Persistência Local (IndexedDB/LocalStorage):** O app não salva nada entre sessões.
- **Gestão de Versões:** Listagem e troca real de versões (V01, V02) com preservação de histórico.
- **Comparação de Arquivos:** Diferenciação visual entre o que foi auditado e o que está no rascunho.

---

## 7. BOTÕES/AÇÕES SEM FUNCIONAMENTO REAL
- **Download (DOCX/PDF):** Em `/app/cases/$caseId/final`, os botões de baixar não executam ação. (CRITICAL UX GAP)
- **Aceitar/Ignorar Sugestão:** No rascunho, os botões existem mas não alteram o texto.
- **Adicionar Documento:** Nas telas de materiais, o botão abre o seletor mas não "salva" o arquivo na lista.
- **Notificações:** Botão de "Marcar como lida" é visual.
- **Busca Global:** Não realiza busca real no dataset.

---

## 8. GAPS DE ESTADO E INTEGRAÇÃO
- **Isolamento de Casos:** O app é fortemente acoplado ao `demo-case`. Navegar para `/app/cases/qualquer-id` funciona porque o Provider retorna o mock se não achar o ID, mas isso causará colisões em produção.
- **Sincronia UI/Workflow:** Algumas telas de coleta (ex: Quesitos) não informam o `CaseWorkflowProvider` sobre seu status de completude.

---

## 12. GAPS DE SEGURANÇA
- **Acesso Direto por URL:** Não há verificação de permissão para acessar IDs de casos via URL.
- **XSS:** Uso extensivo de interpolação direta de strings de mocks (embora controlado nesta fase).
- **Dados Sensíveis:** Mocks contêm nomes e CPFs fictícios que devem ser higienizados ou ofuscados em logs.

---

## 18. LISTA COMPLETA P0 / P1 / P2 / P3

| ID | ÁREA | PROBLEMA | STATUS | GRAVIDADE |
| :--- | :--- | :--- | :--- | :--- |
| **P0-1** | Core | Falta de persistência local (reseta no F5) | PENDENTE | P0 (Integridade) |
| **P0-2** | UX | Botão "Baixar" simula sucesso sem arquivo | PENDENTE | P0 (Falsa Expectativa) |
| **P1-1** | Documento | Falta DocumentViewer compartilhado | AUSENTE | P1 (Frontend Final) |
| **P1-2** | Versões | Troca de versão (V01/V02) não funcional | AUSENTE | P1 (Workflow) |
| **P2-1** | Materiais | Upload real (frontend buffer) ausente | AUSENTE | P2 (Pré-Produção) |
| **P3-1** | UI | Ajuste de Safe Areas em dispositivos Android | PARCIAL | P3 (Polimento) |

---

## 19. CORE FREEZE RECOMENDADO
Arquivos que **não devem ser alterados** sem revisão profunda da arquitetura:
- `src/features/cases/CaseWorkflowProvider.tsx` (Gestão de Invariantes)
- `src/features/cases/case-types.ts` (Contrato de Dados)
- `src/features/documents/template-ids.ts` (IDs canônicos)
- `src/components/veritas/CaseShell.tsx` (Estrutura de navegação)

---

## 20. PLANO DE FECHAMENTO EM MICROETAPAS

### ETAPA 1: Persistência e Saneamento do demo-case
- **Objetivo:** Garantir que o app não resete ao atualizar e que novos casos possam ser criados em memória.
- **Escopo:** `CaseWorkflowProvider`, `localStorage` hook, `MOCK_CASES` inicialização dinâmica.
- **Proibido:** Alterar UI, adicionar IA, alterar assinaturas.

### ETAPA 2: Infraestrutura Documental (DocumentViewer)
- **Objetivo:** Criar um componente único para visualizar o rascunho, o documento de revisão e a inspeção final.
- **Escopo:** `src/components/veritas/DocumentViewer.tsx`, integração com as rotas de `draft`, `review-document` e `inspection`.

### ETAPA 3: Fluxo de Versões (V01 → V0n)
- **Objetivo:** Implementar a lógica de criar nova versão, listar versões e associar assinaturas à versão específica.
- **Escopo:** `CaseWorkflowState` (histórico de versões), UI de seletor de versão no Header.

### ETAPA 4: Funcionalidade de Coleta (Materiais/Quesitos)
- **Objetivo:** Permitir que o usuário realmente adicione e responda itens (em memória).
- **Escopo:** CRUD local de materiais, fontes e quesitos oficiais/complementares.

---

## 26. RESULTADO: VALIDATION
- **bunx tsc --noEmit:** ✅ PASSED (com warnings de unused imports)
- **bun run build:** ✅ PASSED
- **bun run lint:** ❌ FAILED (Erros de estilo e unused variables - normal para fase de rascunho)

---

## 30. PRÓXIMA MICROETAPA RECOMENDADA
**ETAPA 1: Persistência Local e Saneamento do demo-case.**
Sem persistência, o teste de fluxos longos (como Auditoria -> Assinatura -> Finalização) torna-se impossível de validar de forma produtiva pelo usuário.

---
**PARE: A auditoria está concluída. Aguardando revisão para prosseguir.**
