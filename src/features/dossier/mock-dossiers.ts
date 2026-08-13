import type { CaseDossierState } from "./case-dossier-types";

export const INITIAL_DOSSIERS: Record<string, CaseDossierState> = {
  "demo-case": {
    caseId: "demo-case",
    materialsCollectionComplete: false,
    triageReviews: [],
    triageComplete: false,
    items: [
      {
        id: "F01",
        title: "Laudo IML",
        materialKind: "pdf",
        traceability: "documento",
        origin: "Processo",
        date: "2024-05-12",
        theme: "Dano Físico",
        processReference: "Encontrado pág 45",
        location: "Pasta A",
        legibility: "high",
        limitations: [],
        duplicateStatus: "no"
      },
      {
        id: "F02",
        title: "Relato Mãe",
        materialKind: "audio",
        traceability: "relato",
        origin: "Entrevista",
        date: "2024-05-15",
        theme: "Histórico Familiar",
        processReference: "Novo",
        location: "Áudio A01",
        legibility: "medium",
        limitations: ["Possível viés emocional"],
        duplicateStatus: "no"
      },
      {
        id: "F03",
        title: "Visita Domiciliar",
        materialKind: "image",
        traceability: "observacao",
        origin: "In loco",
        date: "2024-05-18",
        theme: "Ambiente",
        processReference: "Novo",
        location: "Registro IMG04",
        legibility: "high",
        limitations: ["Visita previamente agendada"],
        duplicateStatus: "no"
      }
    ]
  }
};
