VERITAS PERICIAL
PLANO MESTRE DE FECHAMENTO — CORREÇÃO FINAL V4.2.1

REPOSITÓRIO:
TAVYRO/veritas-pericial-core

BRANCH:
main

BASELINE IMUTÁVEL:
6dd376a2835a0383dcf36ad5b1783b16e1a8de06

==================================================
MISSÃO
==================================================

Esta é a ÚLTIMA revisão arquitetural do Plano Mestre.

NÃO criar uma nova auditoria genérica.
NÃO recomeçar o trabalho do zero.

USAR a V4.2 existente como base e corrigir somente inconsistências residuais antes de iniciar a 6B.

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

Preservar na V4.2.1:
- Quesitos/Respostas como domínio funcional fechado (Micro-estágio 6A.1 concluído).
- Dossiê, Materiais, Triagem, Escopo Técnico (Fase 5 concluída).
- Versions, Proteção de Final.
- ASSINATURAS POR CASO + VERSÃO: FECHADO ESTRUTURAL.
- FINAL GATE ESTRUTURAL 4/4: FECHADO ESTRUTURAL.
- Bottom Navigation Mobile: Início | Casos | Gravar | Veritas | Perfil.

NÃO reabrir domínio fechado sem prova objetiva.

==================================================
2 — CORREÇÃO DE ORDEM: ENTREVISTAS E SUFICIÊNCIA
==================================================

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

ESTADO/DOMÍNIO CONCEITUAL:
`CaseInterview`:
- `id`: UUID ou determinístico.
- `personName`: string.
- `relation`: string.
- `professionalIds`: string[].
- `purpose`: string.
- `status`: 'planned' | 'scheduled' | 'completed' | 'not-applicable' | 'cancelled'.
- `questionIds`: string[] (Vínculo controlado com QE antes da 6C).

O QUE NÃO TOCAR: Backend, storage, gravação real, IA. Apenas frontend/domain state.

==================================================
4 — GATE DE SUFICIÊNCIA REAL [6C]
==================================================

O Gate (6C) avaliará dados REAIS:
- `materialsCollectionComplete`: true.
- `triageComplete`: true.
- `technicalScope.confirmed`: true.
- `questions`: Nenhum "Official" pendente. "Complementary" não bloqueia automaticamente.
- `interviews`: Nenhuma necessária pendente (Status 'cancelled' gera lacuna crítica).

==================================================
5 — LACUNAS CRÍTICAS [6D]
==================================================

Lacunas reais vinculadas a `questionId`, `interviewId` ou `sourceId`.
Diferenciar bloqueantes de confirmáveis posteriormente.
Não usar conteúdo fictício de família/criança.

==================================================
6 — DIAGNÓSTICO DE RISCO (P0/P1)
==================================================

P0 (Bloqueantes/Segurança): 0

P1 (Críticos Operacionais): 5
- P1-01: Suficiência fixa em 60% (Resolvido em 6C).
- P1-02: Auditoria aprovada por padrão (Resolvido em 7C).
- P1-03: Navegação forçada para demo-case (Resolvido em 9A).
- P1-04: Falta de domínio de entrevistas (Resolvido em 6B).
- P1-05: Rascunho assistido sem fonte documental (Resolvido em 7A).

==================================================
7 — ROADMAP MESTRE DE MICROETAPAS
==================================================

| ID | MICROETAPA | STATUS | FASE |
|---|---|---|---|
| 6A.1 | Saneamento de Quesitos | CONCLUÍDO | A |
| 6B | Domínio de Entrevistas | PRÓXIMA | A |
| 6C | Gate de Suficiência Real | PENDENTE | A |
| 6D | Lacunas Críticas Reais | PENDENTE | A |
| 7A | Fonte Única Documental | PENDENTE | B |
| 7B | Revisão Profissional Real | PENDENTE | B |
| 7C | Auditoria Forense Real | PENDENTE | B |
| 8A | Web/Desktop App Shell | PENDENTE | C |
| 9A | Multi-case em Memória | PENDENTE | D |
| 10A | Autenticação & Perfil Real | PENDENTE | E |
| 11A | Rede de Peritos (Vínculos) | PENDENTE | F |
| 12A | Equipe do Caso | PENDENTE | F |
| 12B | Chat do Caso | PENDENTE | G |
| 12C | Comentários no Documento | PENDENTE | G |
| 13A | Colaboração Realtime | PENDENTE | G |
| 14A | Arquivos & IA (Veritas AI) | PENDENTE | H |
| 15A | Produção & Hardening | PENDENTE | I |

==================================================
8 — PERCENTUAL DO CORE FRONTEND V1
==================================================

Metodologia: Microetapas Core concluídas (8) / Total Core planejado (20) = 40%.
Core V1 definido como Splash (1) até Final Released (20).

PERCENTUAL DO CORE: 40%

==================================================
9 — CHECKLIST CORE FRONTEND V1
==================================================
[X] Domínio de Quesitos
[ ] Domínio de Entrevistas
[ ] Suficiência Real
[ ] Critical Gaps Reais
[ ] Fonte única documental
[ ] Revisão profissional real
[ ] Auditoria real
[X] Assinaturas vinculadas à versão
[X] Final Released bloqueado pelos quatro gates estruturais

==================================================
10 — TESTES E INTEGRIDADE
==================================================
- TSC EXIT CODE: 0
- BUILD EXIT CODE: 0
- LINT EXIT CODE: 1 (Preservar escopo)

==================================================
11 — PRÓXIMA MICROETAPA DEFINIDA
==================================================

PRÓXIMA: 6B — Fundação do Domínio de Entrevistas.
RAZÃO: Dependência do Gate de Suficiência (6C) por dados reais de entrevistas.

PLANO MESTRE V4.2.1 SANEADO

P0:
0

P1:
5

Percentual Core:
40%

Assinaturas por caso + versão:
FECHADO ESTRUTURAL

Final Gate estrutural 4/4:
FECHADO ESTRUTURAL

Próxima microetapa:
6B — Fundação do Domínio de Entrevistas

STATUS:
PRONTO PARA CONGELAMENTO

PARE.

NÃO IMPLEMENTE 6B AINDA.


