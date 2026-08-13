VERITAS PERICIAL
PLANO MESTRE DE FECHAMENTO — CORREÇÃO FINAL V4.2

REPOSITÓRIO:
TAVYRO/veritas-pericial-core

BRANCH:
main

BASELINE IMUTÁVEL:
4b80a462c7d5ac9f38faea30b834e570cd24c13d

==================================================
MISSÃO
==================================================

Esta é a ÚLTIMA revisão arquitetural do Plano Mestre.

NÃO criar uma nova auditoria genérica.
NÃO recomeçar o trabalho do zero.

USAR a V4.1 existente como base e corrigir somente:
1. Contradições de ordem;
2. Roadmap inconsistente;
3. Prioridades P0/P1 sem prova;
4. Percentual sem metodologia defensável;
5. Escolha prematura de fornecedor de backend;
6. Arquitetura incompleta de backend/permissões;
7. Ausência de critérios detalhados nas microetapas;
8. Relação Entrevistas -> Suficiência;
9. Inconsistências entre números de etapas e fases futuras.

O resultado deve ser um documento EXECUTÁVEL e CONGELÁVEL como:
CHECKLIST OFICIAL DE FECHAMENTO DO VERITAS.

==================================================
REGRA ABSOLUTA DE ESCOPO
==================================================

SOMENTE LEITURA DO CÓDIGO.
ÚNICO arquivo autorizado para alteração: `.lovable/plano-mestre-fechamento-v4.md`.

NÃO alterar src/, public/, package.json ou qualquer outro arquivo do projeto.
NÃO implementar funcionalidade, refatorar código ou executar lint --fix.

==================================================
1 — PRESERVAR O QUE JÁ FOI VALIDADO
==================================================

Preservar na V4.2:
- Quesitos/Respostas como domínio funcional fechado (Micro-estágio 6A.1 concluído);
- Dossiê, Materiais, Triagem, Escopo Técnico (Fase 5 concluída);
- Versions, Proteção de Final, Assinaturas por profissional;
- Ausência de P0 comprovado (P0 = 0);
- Bottom Navigation Mobile: Início | Casos | Gravar | Veritas | Perfil.

NÃO reabrir domínio fechado sem prova objetiva.

==================================================
2 — CORREÇÃO DE ORDEM: ENTREVISTAS E SUFICIÊNCIA
==================================================

A V4.1 continha uma contradição lógica. O Gate de Suficiência avalia se a coleta foi suficiente, logo as Entrevistas (fontes orais) devem estar planejadas/registradas ANTES.

CADEIA ARQUITETURAL REAL:
Escopo Técnico 
→ Quesitos 
→ Plano/Registro de Entrevistas (Nova 6B) 
→ Gate de Suficiência (Nova 6C) 
→ Lacunas Críticas (Nova 6D) 
→ Análise 
→ Documento.

==================================================
3 — NOVA PRÓXIMA MICROETAPA: [6B]
==================================================

ID: 6B
NOME: Fundação do Domínio de Entrevistas

OBJETIVO: Criar o estado de domínio para planejamento e registro de entrevistas no Case Dossier.

POR QUE VEM NESTE MOMENTO: O Gate de Suficiência precisa saber quais entrevistas eram necessárias e se foram realizadas para validar a completude da coleta.

DEPENDÊNCIAS: 6A.1 (Quesitos).

ARQUIVOS PROVÁVEIS:
- `src/features/dossier/case-dossier-types.ts` (Novos tipos)
- `src/features/dossier/CaseDossierProvider.tsx` (Novas ações)
- `src/routes/app.cases.$caseId.interviews.tsx` (Consumir estado)

O QUE NÃO TOCAR: Gravação real, upload de áudio, transcrição IA, backend. Apenas frontend/domain state.

ESTADO/DOMÍNIO CONCEITUAL:
`CaseInterview`:
- `id`: UUID ou determinístico.
- `personName`: string.
- `relation`: string (ex: Genitor, Testemunha).
- `professionalIds`: string[] (vínculo com signatários).
- `purpose`: string.
- `status`: 'planned' | 'scheduled' | 'completed' | 'not-applicable' | 'cancelled'.
- `scheduledAt`: string | null.
- `completedAt`: string | null.
- `notes`: string.
- `sourceIds`: string[] (vínculo com itens do dossiê, ex: áudios Fxx).

CRITÉRIO DE ACEITE: `CaseDossierProvider` permite adicionar/remover/atualizar entrevistas e a tela de entrevistas lista os dados reais do estado.

==================================================
4 — RELAÇÃO ENTREVISTAS → QUESITOS
==================================================

- Quesitos do tipo `kind: "interview"` (QE) podem ser criados antes do agendamento da pessoa.
- Uma entrevista "concluída" não exige obrigatoriamente todas as QE respondidas se o perito justificar.
- QE pendentes BLOQUEIAM a Suficiência se forem marcadas como essenciais no plano.

==================================================
5 — GATE DE SUFICIÊNCIA REAL [6C]
==================================================

O Gate (6C) deixará de ser um mock fixo de 60%.
Candidatos a validação real:
- `materialsCollectionComplete`: true.
- `triageComplete`: true.
- `technicalScope.confirmed`: true.
- `questions`: Nenhum "Official" ou "Complementary" com status "pending".
- `interviews`: Nenhuma entrevista com status "planned" ou "scheduled" (deve ser 'completed', 'not-applicable' ou 'cancelled').

O Gate de Suficiência controla a progressão para a FASE DE ANÁLISE.

==================================================
6 — LACUNAS CRÍTICAS [6D]
==================================================

Lacunas serão geradas quando:
- Um Quesito for marcado como "insufficient".
- Uma entrevista necessária for cancelada.
- Uma fonte material for rejeitada na triagem mas exigida no escopo.

Regra: Máximo de 5 lacunas críticas apresentadas por vez.

==================================================
7 — MULTI-CASE E ISOLAMENTO [FASE D]
==================================================

Multi-case frontend deve ocorrer ANTES do backend para remover a dependência do "demo-case".
Etapas:
1. Criar `newCaseId` real.
2. Navegar para o ID gerado.
3. Garantir que `CaseDossierProvider` e `CaseWorkflowProvider` isolam dados por chave.
4. Listar casos existentes na Dashboard.

==================================================
8 — MODELO CONCEITUAL DE BACKEND (PROVIDER A DEFINIR)
==================================================

Removida escolha prematura de Supabase/Lovable Cloud. O projeto usará "BACKEND PROVIDER — A DEFINIR".

Entidades Mínimas:
- `User` / `ProfessionalProfile`.
- `Case` (Dono: Criador, Isolamento: UUID).
- `CaseMember` (Papéis: Owner, Expert, Reviewer, Signer).
- `CaseDossierItem` (F01...).
- `CaseQuestion` / `CaseInterview`.
- `Document` / `DocumentVersion`.
- `SignatureAuthorization`.
- `PartnerRelationship` (Vínculo entre perfis, NÃO concede acesso a casos).
- `CaseInvitation` (Convite explícito para um `caseId`).

==================================================
9 — CAMINHO CRÍTICO CORRIGIDO (ROADMAP)
==================================================

FASES:
FASE A: Domínio Pericial (Dossiê, Quesitos, Entrevistas, Suficiência, Lacunas).
FASE B: Produção Documental (Draft, Review, Audit, Signatures, Final).
FASE C: UX Web/Desktop (Responsividade, Sidebar, Layouts expandidos).
FASE D: Multi-case Frontend (Isolamento de memória).
FASE E: Persistência & Auth (Backend Provider, Sessions, RLS).
FASE F: Colaboração & Rede (Parceiros, Convites, Equipe, Chat do Caso).
FASE G: Integrações & IA (Arquivos reais, Transcrição, Veritas AI).

==================================================
10 — TABELA MESTRE DE MICROETAPAS (FUTURO)
==================================================

| ID | MICROETAPA | STATUS | DEPENDE DE | FASE |
|---|---|---|---|---|
| 6A.1 | Saneamento de Quesitos | CONCLUÍDO | - | A |
| 6B | Domínio de Entrevistas | PRÓXIMA | 6A.1 | A |
| 6C | Gate de Suficiência Real | PENDENTE | 6B | A |
| 6D | Lacunas Críticas Reais | PENDENTE | 6C | A |
| 7A | Fonte Única Documental | PENDENTE | 6D | B |
| 7B | Revisão Profissional Real | PENDENTE | 7A | B |
| 7C | Auditoria Forense Real | PENDENTE | 7B | B |
| 8A | Web/Desktop App Shell | PENDENTE | 4C | C |
| 9A | Multi-case em Memória | PENDENTE | 6D | D |
| 10A | Autenticação & Perfil Real | PENDENTE | 9A | E |

==================================================
11 — DIAGNÓSTICO DE RISCO (P0/P1)
==================================================

P0 (Bloqueantes/Segurança): 0
(Não foram encontradas evidências de mistura de casos ou bypass de segurança real no código atual, dado que tudo opera em memória isolada por Provider).

P1 (Críticos Operacionais): 6
- P1-01: Suficiência fixa em 60% (Resolvido em 6C).
- P1-02: Auditoria aprovada por padrão (Resolvido em 7C).
- P1-03: Navegação forçada para demo-case (Resolvido em 9A).
- P1-04: Falta de domínio de entrevistas (Resolvido em 6B).
- P1-05: Rascunho assistido sem fonte documental (Resolvido em 7A).
- P1-06: Assinaturas sem validação de versão (Mock atual).

==================================================
12 — PERCENTUAL DO CORE FRONTEND V1
==================================================

Metodologia: Microetapas Core concluídas (8) / Total Core planejado (20) = 40%.
(Considerando o marco "Core Frontend V1" até a etapa 20 - Final Released).

PERCENTUAL: 40%

==================================================
13 — CHECKLIST CORE FRONTEND V1
==================================================
[X] Domínio de Quesitos
[ ] Domínio de Entrevistas
[ ] Suficiência Real
[ ] Critical Gaps Reais
[ ] Fonte única documental
[ ] Revisão profissional real
[ ] Auditoria real
[ ] Assinaturas vinculadas a Versão
[ ] Final Released bloqueado por Gates

==================================================
14 — TESTES E INTEGRIDADE
==================================================
- TSC EXIT CODE: 0
- BUILD EXIT CODE: 0
- LINT EXIT CODE: 1 (Mantido para preservar escopo).

==================================================
15 — PRÓXIMA MICROETAPA DEFINIDA
==================================================

PRÓXIMA: 6B — Fundação do Domínio de Entrevistas.
RAZÃO: O Gate de Suficiência (6C) depende de dados reais de entrevistas para validar a completude da coleta de provas. Sem 6B, 6C permanece mock.

PLANO MESTRE V4.2 CONCLUÍDO

Baseline:
4b80a462c7d5ac9f38faea30b834e570cd24c13d

P0:
0

P1:
6

Percentual do Core:
40%

Total de microetapas futuras:
24

Próxima microetapa:
6B — Fundação do Domínio de Entrevistas

Razão:
Dependência do Gate de Suficiência (6C) por dados reais de entrevistas.

Core Frontend V1 encerra em:
20

Web/Desktop começa em:
8A

Multi-case começa em:
9A

Backend começa em:
10A

Rede de Peritos começa em:
11A

Equipe colaborativa começa em:
12A

Chat começa em:
12B

Comentários começam em:
12C

Realtime começa em:
13A

Produção começa em:
15A

BOTTOM NAV MOBILE:
Início | Casos | Gravar | Veritas | Perfil

STATUS DO PLANO:
PRONTO PARA EXECUÇÃO

PARE.

NÃO IMPLEMENTE NADA.

