import { createFileRoute, useParams } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Eye, FileWarning } from "lucide-react";
import { useCaseDossier } from "@/features/dossier/CaseDossierProvider";
import { LegibilityLevel, DuplicateStatus } from "@/features/dossier/case-dossier-types";
import { TraceabilityKind } from "@/features/documents/document-preview-types";

export const Route = createFileRoute("/app/cases/$caseId/sources")({
  component: CaseSourcesPage,
});

const TRACEABILITY_LABELS: Record<TraceabilityKind, string> = {
  documento: "DOCUMENTO",
  relato: "RELATO",
  observacao: "OBSERVAÇÃO",
  inferencia: "INFERÊNCIA",
  hipotese: "HIPÓTESE",
  "nao-confirmado": "NÃO CONFIRMADO",
};

const LEGIBILITY_LABELS: Record<LegibilityLevel, string> = {
  high: "Alta",
  medium: "Média",
  low: "Baixa",
  "not-applicable": "Não se aplica",
};

const DUPLICATE_LABELS: Record<DuplicateStatus, string> = {
  no: "Não",
  possible: "Possível",
  yes: "Sim",
};

function CaseSourcesPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/sources" });
  const { getDossier } = useCaseDossier();
  const dossier = getDossier(caseId);

  if (!dossier) {
    return (
      <div className="p-6 text-center space-y-4">
        <p className="text-white/40 italic">Dossiê indisponível para este caso.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 pb-24">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Fontes de Informação</h2>
        <p className="text-white/40 text-sm">Rastreabilidade completa do material</p>
      </div>

      <div className="space-y-4">
        {dossier.items.length === 0 ? (
          <p className="text-center text-white/20 py-8 italic text-sm">
            Nenhuma fonte registrada no inventário.
          </p>
        ) : (
          dossier.items.map((item) => (
            <div key={item.id} className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-veritas-electric/20 flex items-center justify-center border border-veritas-electric/30 text-veritas-electric text-[10px] font-bold">
                    {item.id}
                  </div>
                  <h3 className="font-medium">{item.title}</h3>
                </div>
                <Badge className="bg-white/10 text-white/60 hover:bg-white/10 text-[9px] border-none uppercase">
                  {TRACEABILITY_LABELS[item.traceability]}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-widest font-bold text-white/20">Origem</p>
                  <p className="text-xs">{item.origin}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-widest font-bold text-white/20">Data</p>
                  <p className="text-xs">
                    {item.date ? new Date(item.date).toLocaleDateString("pt-BR") : "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-widest font-bold text-white/20">Localização</p>
                  <p className="text-xs">{item.location}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-widest font-bold text-white/20">Duplicidade</p>
                  <p className="text-xs">{DUPLICATE_LABELS[item.duplicateStatus]}</p>
                </div>
                <div className="col-span-2 space-y-1">
                  <p className="text-[9px] uppercase tracking-widest font-bold text-white/20">Referência Processual</p>
                  <p className="text-xs text-veritas-electric">{item.processReference}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                <div className="flex items-center gap-1.5 text-[9px] text-white/30">
                  <Eye className="w-3 h-3" /> Legibilidade: <span className="text-white/60">{LEGIBILITY_LABELS[item.legibility]}</span>
                </div>
                <div className="flex items-start gap-1.5 text-[9px] text-white/30">
                  <FileWarning className="w-3 h-3 mt-0.5" /> 
                  <div className="flex-1">
                    Limitações: 
                    <span className="text-white/60 ml-1">
                      {item.limitations.length === 0 
                        ? "Sem limitações registradas" 
                        : item.limitations.join(", ")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 pt-4">
        {Object.values(TRACEABILITY_LABELS).map(label => (
          <Badge key={label} variant="outline" className="text-[8px] border-white/10 text-white/30">
            {label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
