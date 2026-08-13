import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Search, Info, MapPin, Eye, FileWarning, Layers } from "lucide-react";

const SOURCES = [
  {
    id: "F01",
    name: "Laudo IML",
    type: "DOCUMENTO",
    origin: "Processo",
    date: "12/05/2024",
    theme: "Dano Físico",
    process: "Encontrado pág 45",
    location: "Pasta A",
    legibility: "Alta",
    limits: "Nenhuma",
    double: "Não",
  },
  {
    id: "F02",
    name: "Relato Mãe",
    type: "RELATO",
    origin: "Entrevista",
    date: "15/05/2024",
    theme: "Histórico Familiar",
    process: "Novo",
    location: "Áudio A01",
    legibility: "Média",
    limits: "Viés Emocional",
    double: "Não",
  },
  {
    id: "F03",
    name: "Visita Domiciliar",
    type: "OBSERVAÇÃO",
    origin: "In loco",
    date: "18/05/2024",
    theme: "Ambiente",
    process: "Novo",
    location: "Foto IMG04",
    legibility: "Alta",
    limits: "Visita agendada",
    double: "Não",
  },
];

export const Route = createFileRoute("/app/cases/$caseId/sources")({
  component: CaseSourcesPage,
});

function CaseSourcesPage() {
  return (
    <div className="p-6 space-y-6 pb-24">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Fontes de Informação</h2>
        <p className="text-white/40 text-sm">Rastreabilidade completa do material</p>
      </div>

      <div className="space-y-4">
        {SOURCES.map((source) => (
          <div
            key={source.id}
            className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-veritas-electric/20 flex items-center justify-center border border-veritas-electric/30 text-veritas-electric text-[10px] font-bold">
                  {source.id}
                </div>
                <h3 className="font-medium">{source.name}</h3>
              </div>
              <Badge className="bg-white/10 text-white/60 hover:bg-white/10 text-[9px] border-none">
                {source.type}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-widest font-bold text-white/20">
                  Origem
                </p>
                <p className="text-xs">{source.origin}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-widest font-bold text-white/20">Data</p>
                <p className="text-xs">{source.date}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-widest font-bold text-white/20">
                  Processo
                </p>
                <p className="text-xs text-veritas-electric">{source.process}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-widest font-bold text-white/20">
                  Localização
                </p>
                <p className="text-xs">{source.location}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex gap-4">
              <div className="flex items-center gap-1.5 text-[9px] text-white/30">
                <Eye className="w-3 h-3" /> Legibilidade:{" "}
                <span className="text-white/60">{source.legibility}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] text-white/30">
                <FileWarning className="w-3 h-3" /> Limites:{" "}
                <span className="text-white/60">{source.limits}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 pt-4">
        {["DOCUMENTO", "RELATO", "OBSERVAÇÃO", "INFERÊNCIA", "HIPÓTESE", "NÃO CONFIRMADO"].map(
          (tag) => (
            <Badge key={tag} variant="outline" className="text-[8px] border-white/10 text-white/30">
              {tag}
            </Badge>
          ),
        )}
      </div>
    </div>
  );
}
