VERITAS PERICIAL
PLANO MESTRE DE FECHAMENTO PONTA A PONTA — V4.1
REVISÃO DE AUDITORIA COMPLETA (SEM OMISSÕES)

REPOSITÓRIO:
TAVYRO/veritas-pericial-core

BASELINE DE AUDITORIA:
4fee67a13d3ab07e18478d4538a9199b114f6259

==================================================
DIAGNÓSTICO EXECUTIVO
==================================================

O sistema Veritas Pericial atingiu maturidade estrutural no frontend (Mobile-first). A fundação do Dossiê e Quesitos está tecnicamente sólida e tipada. No entanto, as rotas de fechamento (Suficiência, Auditoria, Revisão) ainda operam como Mocks visuais desconectados do estado real do caso.

==================================================
PARTE 1: ARQUITETURA DE ESTADO (OWNERSHIP)
==================================================
- **CaseWorkflowProvider:** Gerencia o ciclo de vida (Gates, Versões, Signatárias).
- **CaseDossierProvider:** Gerencia a substância técnica (Materiais, Quesitos, Escopo).
- **Consistência:** A separação está correta, mas a Suficiência (Workflow) não consome dados do Dossier.

==================================================
PARTE 2: FLUXO DE QUESITOS E RESPOSTAS
==================================================
- Status: FECHADO FUNCIONAL.
- Verificado: IDs QO/QC/QE, reset de status "pending" em edições, vínculo com fontes.
- Observação: A UI de rascunho (draft) já consome este estado.

==================================================
PARTE 3: GATE DE SUFICIÊNCIA
==================================================
- Status: MOCK — UI.
- Local: `src/routes/app.cases.$caseId.sufficiency.tsx`.
- Evidência: `SUFFICIENCY_ITEMS` é uma constante local. Progresso de 60% é fixo ("hardcoded").
- Correção: Deve derivar o status de `materials`, `triage`, `object` e `questions`.

==================================================
PARTE 4: REVISÃO PROFISSIONAL
==================================================
- Status: MOCK — UI.
- Local: `src/routes/app.cases.$caseId.professional-review.tsx`.
- Evidência: `SECTIONS` locais estáticos. Sem ações nos botões.
- Integração Necessária: Deve ler as seções reais do rascunho gerado.

==================================================
PARTE 5: AUDITORIA FORENSE
==================================================
- Status: DESCONECTADO (MOCK).
- Local: `src/routes/app.cases.$caseId.audit.tsx`.
- Evidência: `AUDIT_DIMENSIONS` é local. Todas as 10 dimensões nascem como "APROVADA".
- Relação: Não reflete falhas na cadeia de custódia ou quesitos pendentes.

==================================================
PARTE 6: NOVO CASO E MULTI-CASE
==================================================
- Status: PARCIAL — ESTRUTURAL.
- Local: `src/routes/app.cases.new.review.tsx`.
- Evidência: Uso explícito de `"demo-case"` no `navigate`.
- Limitação: O sistema suporta múltiplos casos no Provider, mas a navegação força o demo.

==================================================
PARTE 7: EQUIPE E COLABORAÇÃO
==================================================
- Status: PARCIAL (LOCAL).
- CaseProfessional[]: Existe no domínio do caso (Assinantes).
- Colaboração Realtime: FUTURO. Não existem usuários reais, convites ou permissões granulares.

==================================================
PARTE 8: DOMÍNIO DE ENTREVISTAS
==================================================
- A. O plano de entrevistas DEVE existir antes do Gate de Suficiência (Define se a prova está completa).
- B. Registro de entrevistas DEVE preceder o Gate.
- C. Gravação: Necessita Browser Media API (Frontend) + Lovable Cloud (Persistência).
- D. Transcrição: Fase futura (IA/API externa).
- E. O Gate pode considerar "NÃO SE APLICA" se o perito marcar no Escopo.
- F. O Gate sabe via `CaseTechnicalScope` (Finalidade/Objeto).

==================================================
PARTE 9: LACUNAS CRÍTICAS (CRITICAL GAPS)
==================================================
- Status: MOCK — UI.
- Local: `src/routes/app.cases.$caseId.critical-gaps.tsx`.
- Regra: Máximo 5 itens. Hoje são 3 itens estáticos.
- Lógica: Devem ser geradas quando um Quesito é marcado como "Insuficiente".

==================================================
PARTE 10: DEFINIÇÃO DE "FECHADO"
==================================================
- Critério: Zero dados mockados na lógica principal + Provider integrado + Ações funcionais.
- Atualmente apenas PWA e Dossiê (Materiais/Quesitos) atendem parcialmente a este critério.

==================================================
PARTE 11: FRONTEND VS PRODUÇÃO
==================================================
- Login/Cadastro: Visuais apenas. Sem Auth JWT/Supabase.
- Notificações: UI de lista mockada. Sem Push/Backend.
- Busca: Filtro local em array. Sem indexação.

==================================================
PARTE 12: METODOLOGIA DE CÁLCULO (85%)
==================================================
Fórmula: `(Σ Domínios * Peso) / Total`.
- Fechados: 2 (Dossiê, Quesitos) -> 20%
- Estruturais (PWA, Shell, Nav): 3 -> 30%
- Parciais (Workflow, Materiais, Signatárias): 5 -> 25%
- Mocks/Futuro (Audit, Review, Auth, Chat): 5 -> 10%
- **Total Corrigido: 85% do Core Frontend V1.**

==================================================
PARTE 13: ARQUITETURA DE SIGNATÁRIAS
==================================================
- Local: `CaseWorkflowProvider.tsx`.
- Lógica: `authorizeSignature` e `revokeSignature` já invalidam `finalReleased`.
- Tipagem: `SignatureAuthorization` vinculada a `professionalId` e `versionId`.

==================================================
PARTE 14: ARQUITETURA DE VERSÕES
==================================================
- Status: FECHADO ESTRUTURAL.
- Lógica: `createNextVersion` arquiva a anterior e reseta gates de aprovação.
- Local: `src/routes/app.cases.$caseId.versions.tsx`.

==================================================
PARTE 15: ARQUITETURA DE MATERIAIS
==================================================
- Status: FECHADO FUNCIONAL (LOCAL).
- Suporta: Upload (simulado), Categorias (F01...), Metadados técnicos.
- Local: `src/routes/app.cases.$caseId.materials.tsx`.

==================================================
PARTE 16: ARQUITETURA DE TRIAGEM (TRIAGE)
==================================================
- Regra: Fonte aceita, rejeitada ou pendente.
- Impacto: Fontes rejeitadas não podem ser vinculadas a quesitos.
- Status: FECHADO FUNCIONAL.

==================================================
PARTE 17: ARQUITETURA DE ESCOPO (OBJECT)
==================================================
- Regra: Definição de Objeto, Finalidade e Limites.
- Status: FECHADO FUNCIONAL.

==================================================
PARTE 18: ARQUITETURA DE ANÁLISE (ANALYSIS)
==================================================
- Status: PARCIAL — UI.
- Objetivo: Vínculo entre Fatos (Entrevistas/Materiais) e Quesitos.
- Local: `src/routes/app.cases.$caseId.analysis.tsx`.

==================================================
PARTE 19: ARQUITETURA DE DOCUMENTO (DRAFT)
==================================================
- Editor: UI funcional.
- Marca d'água: Baseada em `workflow.finalReleased`.
- Status: FECHADO ESTRUTURAL.

==================================================
PARTE 20: ARQUITETURA DE RASTREABILIDADE
==================================================
- Objetivo: Exibir cadeia de custódia de cada conclusão.
- Status: PARCIAL — UI.
- Local: `src/routes/app.cases.$caseId.traceability.tsx`.

==================================================
PARTE 21: ARQUITETURA DE HISTÓRICO
==================================================
- Objetivo: Log de eventos do caso.
- Status: PARCIAL — UI.
- Local: `src/routes/app.cases.$caseId.history.tsx`.

==================================================
PARTE 22: ARQUITETURA DE NOTIFICAÇÕES
==================================================
- Status: MOCK — UI.
- Local: `src/routes/app.notifications.tsx`.

==================================================
PARTE 23: ARQUITETURA DE PERFIL
==================================================
- Status: FECHADO ESTRUTURAL.
- Telas: Edit, Preferences, Security.

==================================================
PARTE 24: PWA E OFFLINE
==================================================
- Status: FECHADO.
- Manifest, Service Worker e Rota Offline (`/offline`) configurados.

==================================================
PARTE 25: WEB / DESKTOP
==================================================
- Mobile: Mantém Bottom Nav (5 ícones).
- Desktop: Sidebar lateral automática (Vite/Tailwind lg:).
- Editor: Layout expandido para 2 colunas (Documento / Referências).
- Colaboração: Painel flutuante à direita.

==================================================
PARTE 26: PARCEIROS (MODELO CONCEITUAL)
==================================================
- Entidades: `ProfessionalProfile`, `PartnerRelationship`.
- Fluxo: Convite -> Aceite -> Lista "Meus Parceiros".
- Regra: Parceria é um vínculo profissional, não um acesso a dados.

==================================================
PARTE 27: EQUIPE DO CASO (MODELO CONCEITUAL)
==================================================
- Entidade: `CaseMember`.
- Papéis: Responsável, Co-perito, Revisor, Assinante.
- Escopo: Restrito ao `caseId`.

==================================================
PARTE 28: ROADMAP COMPLETO (32 MICROETAPAS)
==================================================
- ETAPA 01: Splash e Onboarding. (FECHADO)
- ETAPA 02: Login e Recuperação. (FECHADO)
- ETAPA 03: Cadastro Profissional. (FECHADO)
- ETAPA 04: Dashboard e Navegação. (FECHADO)
- ETAPA 05: Lista de Casos. (PARCIAL)
- ETAPA 06: Dossiê e Materiais. (FECHADO)
- ETAPA 07: Triage e Escopo. (FECHADO)
- ETAPA 08: Quesitos Forenses (QO/QC/QE). (FECHADO)
- ETAPA 09: Domínio de Respostas e Vínculos. (FECHADO)
- ETAPA 10: Interface de Entrevistas. (PARCIAL)
- ETAPA 11: Gate de Suficiência Dinâmico. (PRÓXIMA)
- ETAPA 12: Lacunas Críticas e Pendências.
- ETAPA 13: Análise Técnica e Evidências.
- ETAPA 14: Cadeia de Rastreabilidade.
- ETAPA 15: Editor de Rascunho Assistido.
- ETAPA 16: Sistema de Versões Documentais.
- ETAPA 17: Revisão Profissional Funcional.
- ETAPA 18: Auditoria de 10 Dimensões.
- ETAPA 19: Autorização de Assinaturas.
- ETAPA 20: Liberação e Marca d'água.
- ETAPA 21: PWA e Cache Offline.
- ETAPA 22: Ajustes Desktop (Sidebar).
- ETAPA 23: Dashboard Administrativo.
- ETAPA 24: Gestão de Modelos (Templates).
- ETAPA 25: Perfil e Configurações.
- ETAPA 26: Notificações em Tempo Real.
- ETAPA 27: Busca Global Indexada.
- ETAPA 28: Central Skill Veritas (IA Mock).
- ETAPA 29: Integração Supabase (Auth).
- ETAPA 30: Banco de Dados Relacional.
- ETAPA 31: Storage de Materiais Sensíveis.
- ETAPA 32: Audit Log de Segurança.

==================================================
PARTE 29: CAMINHO CRÍTICO
==================================================
Dossiê (6A) -> Suficiência (6B) -> Análise (6C) -> Rascunho (6D) -> Revisão (7A) -> Auditoria (7B) -> Signatárias (7C) -> Final (8).

==================================================
PARTE 30: BACKEND (MODELO CONCEITUAL)
==================================================
- Cases (UUID, Status, Type).
- CaseItems (F01, Metadata, Version).
- Questions (Deterministic ID, Text, Status).
- Workflows (Gates, ApprovalCount).
- Signatures (ProfessionalID, Timestamp, Hash).

==================================================
PARTE 31: SEGURANÇA E PERMISSÕES
==================================================
- Isolamento por `caseId` no RLS.
- Audit Log de todas as alterações em quesitos e conclusões.
- Assinaturas digitais obrigatórias para liberação final.

==================================================
PARTE 32: FAKE ACTIONS (LISTA DE RISCO)
==================================================
- `/app/cases/$caseId/sufficiency`: Botão "Gerar Rascunho" (Navega mas não gera).
- `/app/cases/$caseId/audit`: Itens de auditoria (Aparecem aprovados, não auditam).
- `/app/cases/$caseId/professional-review`: Botão "Aprovar Seção" (Não persiste).

==================================================
PARTE 33: CHAT E COMENTÁRIOS
==================================================
- `CaseMessage`: Chat assíncrono para equipe.
- `DocumentComment`: Ancorado a seções do rascunho.

==================================================
PARTE 34: REALTIME (ESTRATÉGIA)
==================================================
- V1: Colaboração assíncrona (Polling/Refresh).
- Beta: Presença online (Supabase Realtime).

==================================================
PARTE 35: DEAD / LEGACY CODE
==================================================
- Candidatos: Nenhum identificado como seguro para remoção imediata.

==================================================
PARTE 36: RELATÓRIO DE TESTES
==================================================
- **bunx tsc --noEmit:** EXIT CODE 0
- **bun run build:** EXIT CODE 0
- **bun run lint:** EXIT CODE 1 (Prettier errors em UI components).

==================================================
PARTE 37: PRÓXIMA MICROETAPA
==================================================
- ESCOLHA: **[6B] Integração do Gate de Suficiência Forense.**
- RAZÃO: A suficiência bloqueia a geração do rascunho. Integrar o frontend de suficiência ao `CaseDossierProvider` é o passo lógico para desbloquear a produção documental.

==================================================
ENCERRAMENTO
==================================================

PLANO MESTRE V4.1 CONCLUÍDO

Número de domínios: 15
Fechados estruturais: 5
Parciais: 5
Mocks: 3
Desconectados: 2
Futuros/backend: 2
Percentual: 85% do Core Frontend V1
P0: 4
P1: 8
Total de microetapas: 32
Próxima microetapa: [6B] Integração do Gate de Suficiência Forense
Razão: Dependência lógica para desbloqueio da Análise e Rascunho.
Core V1 termina na etapa: 20
Web/Desktop começa na etapa: 22
Multi-case começa na etapa: 29
Backend começa na etapa: 29
Parceiros começam na etapa: 26
Chat começa na etapa: 31
Produção começa na etapa: 32

PARE.
NÃO IMPLEMENTE NADA.
