import type { DocumentPreviewData } from "./document-preview-types";

export const MOCK_DOCUMENT_PREVIEWS: Record<string, DocumentPreviewData> = {
  "demo-case": {
    sections: [
      {
        id: "s1",
        title: "1. Identificação",
        paragraphs: [
          {
            id: "p1",
            text: "O presente relatório técnico refere-se à avaliação psicológica e social da criança/adolescente, no âmbito da ação judicial em curso.",
            traceability: "documento",
          },
          {
            id: "p2",
            text: "A análise abrange as condições de desenvolvimento e o contexto familiar dos envolvidos.",
            traceability: "documento",
          },
        ],
      },
      {
        id: "s2",
        title: "2. Procedimentos",
        paragraphs: [
          {
            id: "p3",
            text: "Foram realizadas entrevistas individuais com a pessoa entrevistada A e a pessoa entrevistada B.",
            traceability: "documento",
          },
          {
            id: "p4",
            text: "Observação técnica do contexto de interação familiar e análise de documentos anexados aos autos.",
            traceability: "documento",
          },
          {
            id: "p5",
            text: "Realização de visita domiciliar para verificação de condições habitacionais.",
            editorialMarker: "pendente",
          },
        ],
      },
      {
        id: "s3",
        title: "3. Elementos Técnicos",
        paragraphs: [
          {
            id: "p6",
            text: "A pessoa entrevistada A relata que mantém a rotina de cuidados básicos da criança sem auxílio regular.",
            traceability: "relato",
          },
          {
            id: "p7",
            text: "Consta do material documental F01 registro de atendimento escolar prévio.",
            traceability: "documento",
          },
          {
            id: "p8",
            text: "Durante a entrevista observou-se que a criança demonstra vínculo afetivo preservado com ambos os responsáveis.",
            traceability: "observacao",
          },
          {
            id: "p9",
            text: "Informação sobre histórico de saúde ainda não confirmada por fonte independente.",
            traceability: "nao-confirmado",
            editorialMarker: "confirmar",
          },
        ],
      },
      {
        id: "s4",
        title: "4. Análise Técnica",
        paragraphs: [
          {
            id: "p10",
            text: "A convergência entre os elementos colhidos pode sugerir uma dinâmica de conflito centralizada na gestão do tempo de convivência.",
            traceability: "inferencia",
          },
          {
            id: "p11",
            text: "Como hipótese técnica a ser verificada, a resistência observada pode estar vinculada a experiências anteriores de ruptura.",
            traceability: "hipotese",
          },
        ],
      },
      {
        id: "s5",
        title: "5. Considerações",
        paragraphs: [
          {
            id: "p12",
            text: "As avaliações preliminares indicam a necessidade de manutenção do acompanhamento atual até a conclusão dos procedimentos pendentes.",
          },
        ],
      },
    ],
    assistedSuggestion: {
      text: "Com base na dinâmica interacional observada, recomenda-se o fortalecimento dos canais de comunicação direta entre os responsáveis para mitigar a triangulação do conflito.",
      note: "Conteúdo sugerido para avaliação e revisão profissional.",
    },
    footerNote: "Relatório elaborado com suporte da plataforma Veritas Pericial.",
  },
};

export function getMockPreview(caseId: string): DocumentPreviewData | undefined {
  // Only return for demo-case, no fallback.
  if (caseId === "demo-case") {
    return MOCK_DOCUMENT_PREVIEWS["demo-case"];
  }
  return undefined;
}
