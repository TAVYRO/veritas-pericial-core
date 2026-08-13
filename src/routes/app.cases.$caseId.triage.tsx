import { createFileRoute } from "@tanstack/react-router";
import { Users, Shield, Link as LinkIcon, AlertTriangle, FileText } from "lucide-react";

export const Route = createFileRoute("/app/cases/$caseId/triage")({
  component: CaseTriagePage,
});

function CaseTriagePage() {
  const SECTIONS = [
    { title: "Identificação Processual", icon: FileText, content: "Número 0000-00, TJSP, Comarca SP" },
    { title: "Partes", icon: Users, content: "Requerente: João Silva, Requerido: Maria Silva" },
    { title: "Crianças/Adolescentes", icon: Shield, content: "L.M.S (6 anos), P.H.S (4 anos)" },
    { title: "Vínculos", icon: LinkIcon, content: "Paterno e Materno estabelecidos" },
    { title: "Divergências", icon: AlertTriangle, content: "Relatos conflitantes sobre visitação" },
  ];

  return (
    <div className="p-6 space-y-6 pb-24">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Triagem do Caso</h2>
        <p className="text-white/40 text-sm">Mapeamento inicial de elementos críticos</p>
      </div>

      <div className="space-y-4">
        {SECTIONS.map((section) => (
          <div key={section.title} className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-veritas-electric">
              <section.icon className="w-4 h-4" />
              <h3 className="text-[10px] uppercase tracking-widest font-bold">{section.title}</h3>
            </div>
            <p className="text-sm text-white/80">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
