# PLANO: COLABORAÇÃO MULTIUSUÁRIO V1

STATUS: PLANEJAMENTO CONGELADO
BASELINE DE CRIAÇÃO: fcc99b4afa977364064353eca56df35ff4493b68
IMPLEMENTAÇÃO: NÃO INICIADA
BACKEND: NÃO DEFINIDO
AUTH PROVIDER: NÃO DEFINIDO
REALTIME PROVIDER: NÃO DEFINIDO

## 1. PRINCÍPIO CENTRAL
*   **PartnerRelationship** NÃO concede acesso a caso.
*   Somente associação explícita via **CaseMember + caseId** pode futuramente conceder acesso autorizado ao caso.
*   **PARCEIRO ≠ ACESSO AO CASO**
*   **CASE MEMBER = ASSOCIAÇÃO EXPLÍCITA AO CASO**
*   **NÃO existe chat geral.** Chat pertence ao caseId.
*   **Comentários pertencem a caseId + versionId.**
*   **Assinatura: professionalId + caseId + versionId.**
*   **Colaboração NÃO cria quinto gate final.**
*   **CaseDocument: caseId + versionId.**
*   **Optimistic Concurrency.**

## 2. NAVEGAÇÃO CONGELADA
Bottom Navigation permanece:
*   Início
*   Casos
*   Gravar
*   Veritas
*   Perfil

**NÃO criar item global "Chat" (não criar sexto botão na Bottom Navigation).**

Relacionamentos profissionais:
*   Perfil → Meus Parceiros

Dentro de um caso (Case Shell):
*   Colaboração → Equipe da perícia
*   Colaboração → Sala da equipe
*   Colaboração → Comentários do documento

Filtros futuros em Casos (C7.3):
*   Meus casos
*   Em parceria
*   Compartilhados comigo

## 3. PROTOCOLO ANTI-PULO DE ETAPAS
1. Nenhuma microetapa pode começar sem baseline explícito.
2. Toda microetapa deve declarar arquivos autorizados.
3. Toda microetapa deve declarar arquivos proibidos.
4. Toda microetapa termina com PARE.
5. O campo PRÓXIMA é apenas informativo.
6. PRÓXIMA NÃO autoriza execução.
7. Somente validação externa do GitHub pode fechar uma microetapa.
8. Enquanto status não for CLOSED, a etapa seguinte permanece BLOCKED.
9. O HEAD validado vira baseline da próxima etapa.
10. Mudança fora de escopo: VIOLAÇÃO. Não avançar.
11. Não corrigir violação com refatoração ampla.
12. routeTree.gen.ts nunca deve ser editado manualmente.

O relatório do Lovable NÃO é prova suficiente de conclusão.
A prova obrigatória é:
baseline → HEAD → diff → arquivos → auditoria externa → CLOSED.

## 4. ESTADOS OFICIAIS DAS MICROETAPAS
*   **PLANNED**: ainda não iniciada.
*   **IN_PROGRESS**: execução autorizada em andamento.
*   **AUDIT_REQUIRED**: Lovable declarou conclusão, mas auditoria externa ainda pendente.
*   **CLOSED**: auditoria externa aprovada.
*   **BLOCKED**: dependência anterior não fechada ou violação detectada.

Congelar: SOMENTE CLOSED libera etapa dependente.

## 5. PLANO GRANULAR COMPLETO
C1.0 — Plano Mestre de Colaboração
C1.0.1 — Completar e sanear Plano Mestre
C1.1 — Auditoria e vínculo com Plano Mestre Geral
C2.1 — Contrato ProfessionalProfile
C2.2 — Contrato PartnerRelationship
C2.3 — Contrato CaseMember + roles
C2.4 — Contrato de permissões
C2.5 — Contratos Chat / Comment / Activity sem implementação
C3.1 — GATE — requisitos de backend/auth/realtime
C3.2 — GATE — comparação de fornecedores
C3.3 — DECISÃO HUMANA — fornecedor aprovado
C4.1 — Infraestrutura de autenticação real
C4.2 — Sessão/current professional
C4.3 — ProfessionalProfile persistente
C5.1 — Persistência PartnerRelationship
C5.2 — Autorização de PartnerRelationship
C5.3 — UI Perfil → Meus Parceiros
C5.4 — Convite/aceite/remoção/bloqueio
C6.1 — Persistência CaseMember
C6.2 — Autorização server-side por CaseMember
C6.3 — Gestão de Equipe da perícia
C6.4 — Convite e aceite para caso
C6.5 — Revogação e mudança de papel
C7.1 — Persistência de Cases multiusuário
C7.2 — Isolamento de Cases
C7.3 — Filtros: Meus casos, Em parceria, Compartilhados comigo
C8.1 — Persistência Dossier
C8.2 — Autorização Dossier
C9.1 — Persistência CaseDocument por caseId + versionId
C9.2 — Autorização Document
C9.3 — Controle inicial de revisão para concorrência
C10.1 — Persistência Workflow
C10.2 — Aprovações por profissional
C10.3 — Assinaturas case+version+professional
C11.1 — Shell: Caso → Colaboração
C11.2 — Equipe da perícia
C12.1 — Persistência CaseChatMessage
C12.2 — Autorização de Chat
C12.3 — Realtime de Chat
C12.4 — UI Sala da equipe
C12.5 — Não lidas / badges / menções
C13.1 — Persistência DocumentComment
C13.2 — Autorização Comment
C13.3 — Comentários por versionId
C13.4 — UI de comentários documentais
C13.5 — Resolver/reabrir comentário
C14.1 — Presence de edição
C14.2 — Optimistic concurrency
C14.3 — Detecção de conflito
C14.4 — UX de resolução de conflito
C15.1 — CaseActivityEvent
C15.2 — Auditoria de ações críticas
C16.1 — Notificações
C17.1 — Encerramento de colaboração
C17.2 — Chat arquivado
C17.3 — Revogação de membro
C18.1 — TESTE COM DUAS CONTAS REAIS
C18.2 — TESTE DE ISOLAMENTO ENTRE CASOS
C18.3 — TESTE DE TENTATIVA POR URL DIRETA
C18.4 — TESTE DE CONFLITO SIMULTÂNEO
C18.5 — TESTE DE VERSÕES E COMENTÁRIOS
C18.6 — TESTE DE ASSINATURAS
C18.7 — AUDITORIA FINAL DE SEGURANÇA

## 6. GRAFO E REGRAS DE DEPENDÊNCIA
*   C2 depende de C1 CLOSED.
*   C3 depende de C2 CLOSED.
*   Nenhuma implementação de backend/auth/realtime pode começar antes de C3.3 CLOSED.
*   PartnerRelationship persistente depende de: auth real, ProfessionalProfile real.
*   CaseMember depende de: auth, professional real, case persistente, autorização server-side.
*   Chat depende de: auth real, ProfessionalProfile real, CaseMember real, autorização server-side, persistência do caso.
*   Comentários dependem de: auth real, CaseMember, CaseDocument persistente, caseId + versionId, autorização documental.
*   Realtime NÃO pode preceder a autorização básica.
*   Presence NÃO pode preceder controle de identidade/autorização.
*   Assinaturas persistentes dependem de: professionalId, caseId, versionId, Workflow persistente, autorização explícita.

## 7. GATE C3 — INFRAESTRUTURA

Congelar: antes de C3.3 CLOSED, é proibido instalar ou ativar: Supabase, Firebase, Lovable Cloud, outro backend, Auth Provider, Realtime Provider.

*   C3.1: define requisitos.
*   C3.2: compara fornecedores.
*   C3.3: exige DECISÃO HUMANA.

Lovable NÃO escolhe fornecedor sozinho.

### C3.1 — REQUISITOS OBRIGATÓRIOS

Esta subseção formaliza DOCUMENTALMENTE os requisitos obrigatórios que qualquer futuro fornecedor de infraestrutura deverá cumprir. Esta etapa NÃO escolhe fornecedor, NÃO instala fornecedor, NÃO ativa backend, NÃO ativa autenticação e NÃO ativa realtime. É apenas um GATE DE REQUISITOS.

#### 1. Autenticação real

O fornecedor futuro deve suportar:

*   contas reais separadas;
*   sessão segura por usuário;
*   login;
*   logout;
*   recuperação de sessão;
*   encerramento/revogação de sessão;
*   isolamento entre usuários;
*   vínculo verificável entre usuário autenticado e `ProfessionalProfile`.

#### 2. Autorização server-side

Autorização real NÃO pode depender somente da interface. O fornecedor/arquitetura deve permitir:

*   validação server-side;
*   proteção de leitura;
*   proteção de escrita;
*   proteção contra URL direta;
*   proteção contra manipulação do cliente;
*   isolamento por `caseId`;
*   isolamento por `professionalId`;
*   isolamento por `versionId` quando aplicável.

UI oculta NÃO é segurança.

#### 3. PartnerRelationship

`PartnerRelationship` NÃO concede acesso a casos. Um parceiro sem `CaseMember` não pode ler nem escrever dados de um `caseId`.

#### 4. CaseMember

Acesso ao caso deve depender de membership explícita e autorização server-side. A identidade lógica de membership é `caseId + professionalId`. Membership do Caso A não concede acesso ao Caso B.

#### 5. Papéis e permissões

`CaseMemberRole` sozinho NÃO concede poderes implícitos. A infraestrutura deve suportar política verificável de permissões. Não definir a matriz concreta agora. Preservar `responsible`, `coexpert`, `reviewer`, `signer` sem permissões automáticas.

#### 6. Assinaturas

Autorização de assinatura deve permanecer isolada por `professionalId + caseId + versionId`. Role `signer` NÃO autoriza assinatura automaticamente. Autorização de uma versão não vale para outra versão.

#### 7. Isolamento de CaseDocument

`CaseDocument` deve ser protegido pela identidade `caseId + versionId`. Documento V01 e V02 não podem ser confundidos. Documento do Caso A não pode aparecer no Caso B.

#### 8. Dossier e Workflow

O fornecedor futuro deve permitir autorização consistente para `CaseData`, `CaseDossier`, `CaseDocument` e `CaseWorkflow`, sem duplicar conteúdo textual do `CaseDocument` dentro de `Workflow`.

#### 9. Chat

Chat deve ser sempre case-scoped. Obrigatório: `caseId` em cada mensagem. Proibido: chat global entre parceiros. `PartnerRelationship` sozinho não habilita conversa. Membro removido deve perder acesso ativo conforme política futura.

#### 10. Document comments

Comentários devem ser isolados por `caseId + versionId`. Comentário de V01 não pode aparecer como comentário nativo de V02. `sectionId`/`paragraphId` podem existir como referências.

#### 11. Realtime

Realtime, se escolhido futuramente, deve respeitar a mesma autorização do dado persistido. Realtime NÃO pode permitir que usuário receba dados que não poderia consultar normalmente. Subscriptions/channels devem respeitar `professionalId`, `caseId` e `versionId` quando aplicável.

#### 12. Presence

Presence é apenas indicação visual. Presence NÃO é lock, permissão, autorização ou membership. Presence não substitui optimistic concurrency.

#### 13. Concorrência

Suporte a Optimistic Concurrency é obrigatório. Cenário obrigatório futuro:

*   A e B abrem revisão N.
*   A salva → revisão N+1.
*   B tenta salvar baseado em N.

Resultado exigido: B NÃO pode sobrescrever A silenciosamente. Deve existir mecanismo de revisão/versionamento ou equivalente tecnicamente seguro.

#### 14. Revogação

Revogação de `CaseMember` deve interromper acesso ativo. A solução futura deve permitir:

*   revogar leitura;
*   revogar escrita;
*   invalidar autorização;
*   impedir novas consultas indevidas.

Retenção histórica é decisão separada.

#### 15. Auditoria

A solução futura deve suportar trilha auditável para ações críticas: parceria, convite para caso, membership, mudança de role, remoção, chat, comentários, alterações documentais, conflitos, versões, revisões, assinaturas e liberação final.

#### 16. Segurança de dados

Requisitos: transporte seguro, armazenamento seguro, controle de acesso, isolamento entre contas, isolamento entre casos, isolamento entre versões, princípio do menor privilégio, capacidade de revogação e nenhum segredo sensível exposto ao frontend.

#### 17. Dados sensíveis

O projeto manipula dados potencialmente sensíveis de contexto pericial. A futura solução deve permitir arquitetura compatível com confidencialidade, controle de acesso, rastreabilidade e minimização de exposição. NÃO fazer parecer jurídico. NÃO afirmar certificações não verificadas.

#### 18. Backup / recuperação

Backup, recuperação, integridade, prevenção de perda silenciosa e estratégia de restauração são critérios de avaliação futura. Nesta etapa NÃO escolher solução.

#### 19. Escalabilidade

A solução futura deve suportar evolução de 1 profissional → múltiplos profissionais → múltiplos casos simultâneos sem quebrar isolamento ou autorização.

#### 20. Observabilidade

Capacidade de identificar erros relevantes de auth, authorization, persistence, realtime e conflict, sem expor dados sensíveis em logs de forma indevida.

#### 21. Portabilidade / lock-in

Critério de comparação para C3.2: facilidade de exportar dados, dependência de APIs proprietárias, migração futura, custos de saída e portabilidade do modelo de dados. Não julgar fornecedor ainda.

#### 22. Custo

Critério para C3.2: custo inicial, custo por usuário, custo por armazenamento, custo por tráfego/realtime e previsibilidade de crescimento. Não inserir preços agora.

#### 23. Experiência de desenvolvimento

Critério futuro: integração com stack atual, TypeScript, ambiente local, migrations, testes, documentação, debugging, deploy e CI/CD.

#### 24. Fornecedores ainda não escolhidos

BACKEND: NÃO DEFINIDO
AUTH PROVIDER: NÃO DEFINIDO
REALTIME PROVIDER: NÃO DEFINIDO

C3.1 NÃO pode concluir: Supabase escolhido, Firebase escolhido, Lovable Cloud escolhido ou qualquer outro fornecedor escolhido.

#### 25. C3.2

C3.2, somente depois de C3.1 CLOSED, comparará fornecedores contra estes requisitos. C3.2 NÃO pode ser executada agora.

#### 26. C3.3

C3.3 é DECISÃO HUMANA. Somente após C3.1 CLOSED + C3.2 CLOSED o usuário poderá escolher qual infraestrutura será adotada. Lovable não pode decidir sozinho.

#### 27. Zero implementação

NÃO: instalar dependência, criar client, criar env, criar database, criar migration, criar schema, criar tabela, criar auth, criar login, criar signup, criar Provider, criar Context, criar API, criar endpoint, criar realtime, criar websocket, criar UI.

#### 28. Preservar histórico

Preservar TODAS as linhas CLOSED anteriores. NÃO apagar histórico. NÃO alterar contratos C2. NÃO reabrir fases antigas.


## 8. REQUISITOS DE AUTH
*   Usuário autenticado real.
*   professionalId ligado ao usuário autenticado.
*   Sessão persistente segura.
*   Logout.
*   Recuperação de sessão.
*   Revogação de sessão/acesso.
*   Controle server-side.
*   Isolamento por usuário.
*   Proteção contra URL direta.
Marcar implementação: DECISÃO PENDENTE — C3/C4.

## 9. AUTORIZAÇÃO NÃO É UI
**UI NÃO É BARREIRA DE SEGURANÇA.**
*   Ocultar botão não protege dados.
*   Ocultar rota não protege dados.
*   Não mostrar menu não protege dados.
*   Autorização deve existir na camada server-side/backend adequada ao fornecedor escolhido.

## 10. MATRIZ DE PAPÉIS
*   Papéis: `responsible`, `coexpert`, `reviewer`, `signer`.
*   Nome do papel NÃO concede permissões implícitas. Toda permissão deve vir da matriz oficial.
*   Reviewer não ganha edição automaticamente.
*   Signer não ganha administração automaticamente.
*   Coexpert não significa "assistente".
*   Responsible não deve ser usado como desculpa para burlar restrições técnicas de versão ou assinatura.

## 11. PERMISSÕES A DECIDIR
*   Visualizar caso
*   Editar metadados
*   Editar dossiê
*   Editar documento
*   Comentar documento
*   Usar Sala da equipe
*   Convidar membro
*   Remover membro
*   Alterar papel
*   Revisar
*   Aprovar
*   Autorizar assinatura
*   Assinar
*   Liberar versão final
**Enquanto não definidas: DECISÃO PENDENTE.**

## 12. EVENTOS DE AUDITORIA (CONCEITUAIS FUTUROS)
*   partner-requested
*   partner-accepted
*   partner-rejected
*   partner-removed
*   partner-blocked
*   case-invite-sent
*   case-invite-accepted
*   case-member-joined
*   case-member-role-changed
*   case-member-removed
*   chat-message-created
*   document-comment-created
*   document-comment-resolved
*   document-comment-reopened
*   document-section-updated
*   document-conflict-detected
*   version-created
*   review-approved
*   audit-approved
*   signature-authorized
*   signature-applied
*   final-released
**NÃO implementar.**

## 13. NOTIFICAÇÕES
*   Convite de parceria
*   Convite para caso
*   Nova mensagem
*   Menção
*   Novo comentário
*   Comentário resolvido
*   Comentário reaberto
*   Alteração de papel
*   Remoção da equipe

## 14. CONCORRÊNCIA
*   Manter Optimistic Concurrency.
*   Salvamento baseado em revisão antiga NÃO pode sobrescrever silenciosamente.
*   Conflito deve interromper escrita.
*   Usuário deve revisar estado novo.
*   Presence é somente indicação visual.
*   Presence NÃO é trava.
*   Presence NÃO é autorização.

## 15. POLÍTICA DE CHAT
*   PartnerRelationship: zero chat.
*   CaseMember ativo e autorizado: pode acessar Sala da equipe conforme permissão.
*   Chat: sempre caseId.
*   Caso encerrado: proposta inicial de somente leitura.
*   Membro removido: perde acesso ativo imediatamente.
*   Retenção histórica após revogação: DECISÃO PENDENTE. Não excluir histórico silenciosamente.

## 16. COMENTÁRIOS ENTRE VERSÕES
*   DocumentComment pertence à versão (V01 ≠ V02).
*   Ao criar nova versão: comentários anteriores não migram automaticamente.
*   Tratamento futuro pode ser: histórico da versão anterior, referência explícita, ou ação manual de reabrir/copiar.
*   DECISÃO específica deverá ser fechada antes da implementação.

## 17. PROIBIÇÕES GLOBAIS
*   NÃO criar auth fake.
*   NÃO criar chat fake.
*   NÃO criar parceiros fictícios para simular backend.
*   NÃO liberar caso por PartnerRelationship.
*   NÃO confiar apenas em UI.
*   NÃO misturar CaseMember com PartnerRelationship.
*   NÃO misturar chat com DocumentComment.
*   NÃO misturar versões documentais.
*   NÃO autorizar assinatura automaticamente por role.
*   NÃO criar quinto gate final.
*   NÃO implementar edição Google Docs caractere-a-caractere como requisito inicial.
*   NÃO escolher backend antes de C3.3 CLOSED.
*   NÃO introduzir persistência isoladamente em apenas uma parte sem plano de migração.
*   NÃO fazer refatoração ampla para corrigir uma microetapa.

## 18. VÍNCULO COM PLANO MESTRE GERAL
*   Plano Mestre Geral: `.lovable/plano-mestre-fechamento-v4.md`
*   Função: referência macro do projeto.
*   Plano Colaboração V1: referência detalhada e executável para colaboração multiusuário.
*   Macro fases relacionadas: 10A, 11A, 12A, 12B, 12C, 13A.

## 19. CHECKLIST FINAL DE SEGURANÇA
*   [ ] parceiro sem caso não acessa caso
*   [ ] membro do Caso A não acessa Caso B
*   [ ] usuário removido perde escrita
*   [ ] URL direta não contorna autorização
*   [ ] reviewer não recebe edição indevida
*   [ ] signer não recebe administração indevida
*   [ ] chat isolado por caseId
*   [ ] comment isolado por caseId+versionId
*   [ ] documento isolado por caseId+versionId
*   [ ] assinatura isolada por professionalId+caseId+versionId
*   [ ] comentário V01 não aparece como V02
*   [ ] conflito não sobrescreve silenciosamente
*   [ ] encerramento respeita política de mensagens
*   [ ] ações críticas ficam auditáveis
*   [ ] duas contas reais passam ponta a ponta
*   [ ] revogação funciona imediatamente
*   [ ] nenhum dado cruza processos.

## 20. TESTES FINAIS PLANEJADOS — C18

C18.1 — TESTE COM DUAS CONTAS REAIS

Objetivo:
provar que dois profissionais autenticados, em contas e sessões distintas, conseguem colaborar no MESMO caso autorizado, sem compartilhamento artificial de sessão e sem mocks.

Critérios mínimos futuros:
- Conta A e Conta B distintas;
- ProfessionalProfile distintos;
- ambos autenticados realmente;
- ambos membros autorizados do mesmo caseId;
- alterações autorizadas aparecem corretamente;
- dados não dependem do mesmo navegador;
- testar em sessões/dispositivos distintos quando possível.

==================================================

C18.2 — TESTE DE ISOLAMENTO ENTRE CASOS

Objetivo:
provar que participação no Caso A não concede qualquer acesso automático ao Caso B.

Testar futuramente:
- parceiro sem CaseMember;
- membro somente do Caso A;
- membro do Caso B;
- profissional não relacionado;
- dados de dossier;
- documento;
- workflow;
- chat;
- comentários;
- assinaturas.

Resultado obrigatório futuro:
ZERO vazamento entre caseIds.

==================================================

C18.3 — TESTE DE TENTATIVA POR URL DIRETA

Objetivo:
provar que segurança não depende da interface.

Usuário sem autorização deverá tentar acessar diretamente rotas de outro caseId.

Testar futuramente:
- página do caso;
- dossier;
- documento;
- review;
- final;
- colaboração;
- chat;
- comentários;
- versões.

Resultado obrigatório:
servidor/backend deve negar acesso.
Não basta esconder botão ou menu.

==================================================

C18.4 — TESTE DE CONFLITO SIMULTÂNEO

Objetivo:
provar que edição concorrente não sobrescreve silenciosamente.

Cenário mínimo:
A abre revisão N.
B abre revisão N.
A salva e gera revisão N+1.
B tenta salvar baseado em N.

Resultado obrigatório:
escrita de B NÃO sobrescreve A silenciosamente.
Conflito deve ser detectado.
B deve revisar o estado atualizado antes de nova gravação.

==================================================

C18.5 — TESTE DE VERSÕES E COMENTÁRIOS

Objetivo:
provar isolamento por:
caseId + versionId.

Testar:
- comentário criado em V01;
- criação de V02;
- comentário de V01 não aparece silenciosamente como pertencente à V02;
- referências de sectionId/paragraphId;
- histórico da versão;
- documento correto por versão.

Resultado obrigatório:
V01 ≠ V02.

==================================================

C18.6 — TESTE DE ASSINATURAS

Objetivo:
provar isolamento e autorização de assinatura por:
professionalId + caseId + versionId.

Testar futuramente:
- PartnerRelationship não autoriza assinatura;
- CaseMember não autoriza automaticamente;
- role signer não autoriza automaticamente;
- autorização de V01 não vale para V02;
- autorização do Caso A não vale para Caso B;
- profissional A não usa autorização do profissional B.

Resultado obrigatório:
nenhuma assinatura migra entre profissional, caso ou versão.

==================================================

C18.7 — AUDITORIA FINAL DE SEGURANÇA

Objetivo:
executar o checklist final integral antes de considerar colaboração concluída.

Deve verificar, no mínimo:
- autenticação real;
- autorização server-side;
- PartnerRelationship ≠ CaseMember;
- isolamento de caseId;
- isolamento de versionId;
- revogação;
- URL direta;
- roles;
- chat;
- comentários;
- concorrência;
- workflow;
- assinaturas;
- auditoria;
- notificações críticas;
- duas contas reais.

Resultado futuro:
PASS / FAIL por item.
Qualquer FAIL crítico: COLABORAÇÃO NÃO PODE SER CONSIDERADA CONCLUÍDA.

## 21. REGISTRO DE BASELINES

Linhas CLOSED do REGISTRO DE BASELINES são histórico imutável e não podem ser removidas por microetapas posteriores. Correções devem preservar registros anteriores.

**Regra de concorrência de baseline:** se um commit externo ocorrer entre o baseline declarado e a execução de uma microetapa, a etapa não pode ser fechada pelo diff bruto original. A alteração externa deve ser identificada, isolada e registrada antes do fechamento.


| ETAPA | STATUS | BASELINE INICIAL | HEAD VALIDADO | ARQUIVOS | OBSERVAÇÕES |
| :--- | :--- | :--- | :--- | :--- | :--- |
| C0 | CLOSED | fcc99b4afa977364064353eca56df35ff4493b68 | fcc99b4afa977364064353eca56df35ff4493b68 | ZERO | Auditoria read-only |
| C1.0 | CLOSED | fcc99b4afa977364064353eca56df35ff4493b68 | 1aac88ea884a051ab3a04709f856c83b37eac548 | .lovable/plano-colaboracao-v1.md | Plano inicial criado; complementado pelas sanitizações posteriores. |
| C1.0.1 | CLOSED | 1aac88ea884a051ab3a04709f856c83b37eac548 | e67ff43c26aa8f66a968f4e9c81cd8a14bdbfbae | .lovable/plano-colaboracao-v1.md | Auditoria externa aprovada; estrutura granular e protocolo anti-pulo validados. |
| C1.0.2 | CLOSED | e67ff43c26aa8f66a968f4e9c81cd8a14bdbfbae | 6e317973e4eab291542faad6b70e1ebb0aa164bf | .lovable/plano-colaboracao-v1.md | Auditoria externa aprovada; objetivos C18.1-C18.7 validados. Saneamento estrutural posterior em C1.0.3. |
| C1.0.3 | CLOSED | 6e317973e4eab291542faad6b70e1ebb0aa164bf | 1872a4f754c140c253dc98551a613dec4d43f370 | .lovable/plano-colaboracao-v1.md | Auditoria externa aprovada; numeração 1-20, ordem estrutural e testes C18 validados. |
| C1.1 | CLOSED | 1872a4f754c140c253dc98551a613dec4d43f370 | 2558baa695ceb5ef7e509c06dbe6c59f2ee5203b | .lovable/plano-colaboracao-v1.md<br>.lovable/plano-mestre-fechamento-v4.md | Auditoria externa aprovada; vínculo macro↔granular validado. |
| C2.1 | CLOSED | 2558baa695ceb5ef7e509c06dbe6c59f2ee5203b | 4617e5513063a3c38b90eab9af9d67863bc4f2f8 | src/features/collaboration/professional-profile-types.ts<br>.lovable/plano-colaboracao-v1.md | Auditoria externa aprovada; contrato ProfessionalProfile mínimo validado. |
| C2.2 | CLOSED | 4617e5513063a3c38b90eab9af9d67863bc4f2f8 | 7c39c12897f001ed25cc482f67e0493d1a3f2ce8 | src/features/collaboration/partner-relationship-types.ts<br>.lovable/plano-colaboracao-v1.md | Auditoria externa aprovada; PartnerRelationship mínimo validado sem acesso a casos. |
| C2.3 | CLOSED | 7c39c12897f001ed25cc482f67e0493d1a3f2ce8 | bd694fecd510d5cf512b0f695abbb6fe92d4e58c | src/features/collaboration/case-member-types.ts<br>.lovable/plano-colaboracao-v1.md | Auditoria externa técnica aprovada; CaseMember + roles mínimos validados. |
| C2.3.1 | CLOSED | bd694fecd510d5cf512b0f695abbb6fe92d4e58c | 91ddefdf58ad81d143f1d1ae2adab3bddbf10287 | .lovable/plano-colaboracao-v1.md | Auditoria externa aprovada; trilha histórica restaurada e regra anti-perda validada. |
| C2.4 | CLOSED | 91ddefdf58ad81d143f1d1ae2adab3bddbf10287 | d5acc5c2d0864c1652817b845a5a5d75c4a746f4 | src/features/collaboration/case-permission-types.ts<br>.lovable/plano-colaboracao-v1.md | Auditoria externa aprovada; vocabulário de 14 permissões e formato de política validados; nenhuma matriz concreta criada. |
| C2.5 | CLOSED | d5acc5c2d0864c1652817b845a5a5d75c4a746f4 | a20041c01b1a9e1b286796b184fe763407636e74 | src/features/collaboration/case-chat-types.ts<br>src/features/collaboration/document-comment-types.ts<br>src/features/collaboration/case-activity-types.ts<br>.lovable/plano-colaboracao-v1.md | Auditoria externa aprovada. Implementação técnica validada isoladamente no intervalo 54aed1ab58aa86efa69e7c5210db609a6bbc0d01 → a20041c01b1a9e1b286796b184fe763407636e74 com somente os quatro arquivos autorizados. Commit externo intermediário 54aed1ab58aa86efa69e7c5210db609a6bbc0d01 registrado separadamente. |
| C2.5.1 | CLOSED | a20041c01b1a9e1b286796b184fe763407636e74 | 2c4837e6d6034f2e8f2b4d5314c083ff5431892b | .lovable/plano-colaboracao-v1.md | Auditoria externa aprovada; reconciliação de baseline e regra de commit externo validadas. |
| C3.1 | AUDIT_REQUIRED | 2c4837e6d6034f2e8f2b4d5314c083ff5431892b | PENDENTE | .lovable/plano-colaboracao-v1.md | Gate documental de requisitos de backend/auth/realtime; pendente de auditoria externa. |
| C3.2 | BLOCKED | PENDENTE | PENDENTE | - | Comparação de fornecedores depende de C3.1 CLOSED. Não executar C3.2. |
| C3.3 | BLOCKED | PENDENTE | PENDENTE | - | Decisão humana sobre fornecedor depende de C3.1 e C3.2 CLOSED. Lovable NÃO escolhe fornecedor sozinho. |

