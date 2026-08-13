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

## 2. NAVEGAÇÃO CONGELADA
Bottom Navigation permanece:
*   Início
*   Casos
*   Gravar
*   Veritas
*   Perfil

**NÃO criar item global "Chat".**

Relacionamentos profissionais:
*   Perfil → Meus Parceiros

Dentro de um caso (Case Shell):
*   Colaboração → Equipe da perícia
*   Colaboração → Sala da equipe
*   Colaboração → Comentários do documento

Filtros futuros em Casos:
*   Meus casos
*   Em parceria
*   Compartilhados comigo

## 3. CHAT
*   **NÃO existe chat geral entre parceiros.**
*   Sala da equipe existe somente dentro de um `caseId` com colaboração autorizada.
*   PartnerRelationship sozinho: **ZERO CHAT**.
*   CaseMember autorizado: pode futuramente acessar Sala da equipe conforme permissão.
*   Chat deve possuir identidade obrigatória de `caseId`. Nenhuma mensagem pode existir sem associação a um caso.

## 4. CHAT ENCERRADO
*   Caso encerrado: considerar histórico somente leitura para membros ainda autorizados.
*   Membro removido/revogado: acesso ativo deve cessar imediatamente.
*   Tratamento jurídico/retenção após revogação: **DECISÃO PENDENTE**.

## 5. COMENTÁRIOS DOCUMENTAIS
*   **CHAT ≠ COMENTÁRIO DOCUMENTAL**
*   `DocumentComment` deve ser vinculado a: `caseId` + `versionId`.
*   Opcionalmente: `sectionId` + `paragraphId`.
*   Comentário de V01 NÃO pode aparecer silenciosamente como comentário de V02.

## 6. MODELOS CONCEITUAIS (FUTUROS)
*   ProfessionalProfile
*   PartnerRelationship
*   CaseMember
*   CaseMemberRole
*   CaseChatMessage
*   DocumentComment
*   CaseActivityEvent
*   Notification
*   SectionRevision (Controle de concorrência)

## 7. PARTNER RELATIONSHIP
*   Estados: `pending`, `accepted`, `rejected`, `removed`, `blocked`.
*   Invariantes: Uma parceria aceita permite localizar/convidar o colega. NÃO permite abrir caso, listar casos, chat de caso ou acessar documentos.

## 8. CASE MEMBER
*   Identidade mínima: `caseId` + `professionalId` + `role`.
*   Papéis iniciais: `responsible`, `coexpert`, `reviewer`, `signer`.
*   **NÃO escrever: coexpert = assistente.** Papéis terão permissões explícitas.

## 9. MATRIZ DE PERMISSÕES (FUTURA)
Ações a serem mapeadas:
*   Visualizar caso
*   Editar metadados
*   Editar dossiê
*   Editar documento
*   Comentar documento
*   Usar Sala da equipe
*   Convidar/Remover membro
*   Alterar papel
*   Revisar / Aprovar
*   Autorizar assinatura / Assinar
*   Liberar versão final
*   **Todas as permissões não fechadas: DECISÃO PENDENTE.**

## 10. ASSINATURAS
*   PartnerRelationship: NÃO autoriza assinatura.
*   CaseMember / role signer: NÃO autoriza assinatura automaticamente.
*   Autorização vinculada a: `professionalId` + `caseId` + `versionId`.

## 11. FINAL RELEASE
*   Colaboração NÃO cria quinto gate final.
*   Preservar arquitetura existente (Professional Review, Audit, Case Isolation, Signatures).

## 12. DOCUMENTO
*   Identidade: `caseId` + `versionId`.
*   CaseDocument continua sendo fonte documental única. NÃO criar documento paralelo.

## 13. CONTROLE DE CONCORRÊNCIA
*   **OPTIMISTIC CONCURRENCY CONTROL** por versão/revisão de seção.
*   Conflitos detectados no salvamento (B tenta salvar V12 após A já ter gerado V13).
*   Presence ("X está editando") NÃO substitui o controle de concorrência.

## 14. INFRAESTRUTURA (DECISÃO PENDENTE)
*   **BACKEND PROVIDER: DECISÃO PENDENTE — C3**
*   **AUTH PROVIDER: DECISÃO PENDENTE — C3**
*   Nenhum código dependente de Supabase, Firebase ou Lovable Cloud antes do Gate C3.

## 15. AUTORIZAÇÃO E ISOLAMENTO
*   **UI NÃO É BARREIRA DE SEGURANÇA.** Autorização server-side obrigatória.
*   Isolamento estrito: URL direta não contorna acesso. Nenhum dado migra entre processos/casos.

## 16. AUDITORIA E NOTIFICAÇÕES
*   Planejar `CaseActivityEvent` para todas as ações críticas.
*   Notificações para convites, mensagens, menções e alterações de status.

## 17. PROTOCOLO ANTI-PULO DE ETAPAS
1. Nenhuma microetapa pode começar sem baseline explícito.
2. Declarar arquivos autorizados e proibidos.
3. Terminar com PARE.
4. "PRÓXIMA" é apenas informativa; NÃO autoriza execução.
5. Somente validação externa fecha etapa (CLOSED).
6. Mudança fora de escopo = VIOLAÇÃO.

## 18. PLANO DE MICROETAPAS (RESUMO)
*   C1.0: Plano Mestre [esta etapa]
*   C1.1: Vínculo com Plano Mestre Geral
*   C2.x: Contratos (Professional, Partner, Member, Permissões)
*   C3.x: GATES de Decisão (Backend/Auth)
*   C4.x - C17.x: Implementação progressiva (Auth -> Persistência -> Colaboração -> Chat -> Concorrência -> Auditoria)
*   C18.x: Testes de Segurança e Isolamento

## 19. REGISTRO DE BASELINES
| ETAPA | STATUS | BASELINE INICIAL | HEAD VALIDADO | OBSERVAÇÕES |
| :--- | :--- | :--- | :--- | :--- |
| C0 | CLOSED | fcc99b4afa977364064353eca56df35ff4493b68 | fcc99b4afa977364064353eca56df35ff4493b68 | Auditoria read-only |
| C1.0 | IN_PROGRESS | fcc99b4afa977364064353eca56df35ff4493b68 | PENDENTE | Criação do Plano Mestre |
| C1.1+ | PLANNED | - | - | - |
