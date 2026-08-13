# Plano Mestre de Fechamento - Veritas Pericial (V4)

## Parte 1: Estado Real do Produto

| Domínio | Status | Fonte de Estado | Consumidores |
| :--- | :--- | :--- | :--- |
| A. Cadastro/Login | FECHADO | Local UI | App Core |
| B. Perfil | PARCIAL | Local UI | Perfil Shell |
| C. Dashboard | FECHADO | Local UI | Shell |
| D. Casos | FECHADO | CaseWorkflowProvider | Listagem/Shell |
| E. Novo Caso | PARCIAL | CaseWorkflowProvider | Rota /new/* |
| F. Equipe | FECHADO | CaseWorkflowProvider | Assinaturas/Revisão |
| G. Materiais | FECHADO | CaseDossierProvider | Listagem/Triage |
| H. Fontes | FECHADO | CaseDossierProvider | Triage/Escopo |
| I. Triagem | FECHADO | CaseDossierProvider | Status/Triage |
| J. Escopo Técnico | FECHADO | CaseDossierProvider | Status/Triage |
| K. Quesitos | FECHADO | CaseDossierProvider | Draft |
| L. Respostas | FECHADO | CaseDossierProvider | Draft |
| M. Plano Entrevista | MOCK | Local UI | Entrevistas |
| N. Entrevistas | MOCK | Local UI | Entrevistas |
| O. Gravação | MOCK | Local UI | Record session |
| P. Transcrição | MOCK | Local UI | Entrevistas |
| Q. Resumo | MOCK | Local UI | Entrevistas |
| R. Notas | MOCK | Local UI | - |
| S. Contradições | MOCK | Local UI | Análise |
| T. Suficiência | PARCIAL | CaseWorkflowProvider | Portão Suficiência |
| U. Lacunas Críticas | PARCIAL | Local UI | Portão Bloqueios |
| V. Processamento | MOCK | Local UI | - |
| W. Análise | MOCK | Local UI | Análise |
| X. Rastreabilidade | PARCIAL | Local UI | Documento |
| Y. Rascunho | PARCIAL | Local UI | DocumentViewer |
| Z. Editor | PARCIAL | Local UI | Editor |
| AA. Respostas/Doc | DESCONECTADO | Mock Content | DocumentViewer |
| AB. Versões | FECHADO | CaseWorkflowProvider | DocumentViewer |
| AC. Auditoria | FECHADO | CaseWorkflowProvider | Portão Aprovação |
| AD. Bloqueios | PARCIAL | Local UI | Portão Aprovação |
| AE. Revisão Prof. | FECHADO | CaseWorkflowProvider | Portão Aprovação |
| AF. Doc/Revisão | PARCIAL | DocumentViewer | Draft |
| AG. Aprovações | FECHADO | CaseWorkflowProvider | Portão Aprovação |
| AH. Assinaturas | FECHADO | CaseWorkflowProvider | Portão Aprovação |
| AI. Doc. Final | PARCIAL | Local UI | Inspeção |
| AJ. Inspeção final | PARCIAL | Local UI | Final |
| AK. Histórico | FECHADO | Local UI | Shell |
| AL. Busca | FECHADO | Local UI | Header |
| AM. Notificações | FECHADO | Local UI | Header |
| AN. Modelos | FECHADO | Local UI | Template Library |
| AO. PWA/Offline | FECHADO | PWAMode Hook | Shell |
| AP. Mobile | FECHADO | UI/Tailwind | Full App |
| AQ. Tablet | PARCIAL | UI/Tailwind | - |
| AR. Web/Desktop | DESCONECTADO | UI/Tailwind | - |

## Parte 2: Fluxo Ponta a Ponta Atual
Fluxo: Login → Dashboard → Lista Casos → Novo Caso (Wizard) → Materiais → Triagem → Escopo Técnico → Quesitos/Respostas → Suficiência → Análise/Rascunho → Revisão/Auditoria → Assinaturas → Final.

*   A ordem está correta funcionalmente.
*   Gate de Suficiência é o ponto crítico atual: está visualmente conectado ao provider, mas falta o gate real (blocking status).

## Parte 3: Domínios Considerados Fechados
*   DocumentViewer: FECHADO
*   Versions: FECHADO
*   Dossier: FECHADO
*   Materials: FECHADO
*   Triage: FECHADO
*   Technical Scope: FECHADO
*   Questions/Responses: FECHADO

## Parte 4: Suficiência
Faltam conectar os estados dos providers (`materialsCollectionComplete`, `triageComplete`, `technicalScope.confirmed`) ao gate visual de Suficiência.
Menor microetapa segura: Conectar `CaseDossierProvider` ao componente de `SufficiencyPage` para bloquear a liberação final se incompleto.

## Parte 5: Entrevistas
Entrevistas precisam ser fechadas APÓS a Suficiência, pois a coleta de dados (incluindo entrevistas) é pré-requisito para análise técnica completa.

## Parte 6: Documento / Editor
Não há fonte de verdade única. O `DocumentViewer` lê mocks enquanto o `draft.edit` manipula estados locais. Sequência segura: unificar o estado do editor com o Viewer no Provider central.

## Parte 7: Auditoria / Revisão / Final
A lógica é real (via WorkflowProvider). A UI é mockada mas vinculada ao workflow. Preservação de integridade ok.

## Parte 8: Novo Caso / Multi-case
`demo-case` é hardcoded.
Não há isolamento real. F5 reseta tudo no estado global.
Multi-case frontend deve ser feito antes do backend para garantir que a UI suporte N casos simultâneos em memória antes de persistir.

## Parte 32: Decisões Obrigatórias
1. Suficiência próxima etapa: SIM.
2. Entrevistas antes da Suficiência: NÃO (justificativa: entrevistas são fontes).
3. Editor antes do Multi-case: NÃO (Multi-case é infraestrutura de estado).
4. Multi-case antes backend: SIM.
5. Web/Desktop antes backend: NÃO (UI desktop exige refatoração de layout e sidebar).
6. Parceiros antes backend: NÃO.
7. Chat antes backend: NÃO.
8. Comentários dependem de Editor real: SIM.
9. Colaboração realtime no beta: NÃO (P0).
10. Bottom navigation novos ícones: NÃO (decisão de UX preservada).

## Parte 33: Prioridades
*   P0: 0
*   P1: 3 (Persistência, Unificação do Editor, Gate real de Suficiência)

## Parte 34: Próxima Microetapa
[6B] Conexão do Gate de Suficiência ao CaseDossierProvider.

---

PLANO MESTRE V4 CONCLUÍDO

Core frontend atual:
[85% — Estável, estruturado, mas dependente de mocks para conteúdo final]

P0:
[0]

P1:
[3]

Próxima microetapa:
[6B] Conexão do Gate de Suficiência ao CaseDossierProvider.

Multi-case entra na fase:
[FASE C]

Web/Desktop entra na fase:
[FASE B]

Parceiros entram na fase:
[FASE E]

Chat entra na fase:
[FASE F]

Backend entra na fase:
[FASE D]

Quantidade total de microetapas propostas:
[32]

PARE.

NÃO IMPLEMENTE NADA.
