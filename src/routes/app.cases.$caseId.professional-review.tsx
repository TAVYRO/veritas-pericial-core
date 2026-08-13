import { createFileRoute } from "@tanstack/react-router";
import {
  CheckCircle2,
  Circle,
  Edit3,
  MessageSquare,
  Search,
  ChevronRight,
  FileText,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/app/cases/$caseId/professional-review")({
  component: ProfessionalReviewPage,
});

const SECTIONS = [
  { id: 1, name: "Cabeçalho e Identificação", status: "Aprovada" },
  { id: 2, name: "Metodologia Aplicada", status: "Aprovada" },
  { id: 3, name: "Histórico e Antecedentes", status: "Aprovada" },
  { id: 4, name: "Dinâmica Familiar Observada", status: "Aprovada" },
  { id: 5, name: "Entrevista: Maria Silva", status: "Aprovada" },
  { id: 6, name: "Entrevista: João Santos", status: "Aprovada" },
  { id: 7, name: "Interação Genitor-Filho", status: "Aprovada" },
  { id: 8, name: "Análise Técnica Psicológica", status: "Aprovada" },
  { id: 9, name: "Análise do Serviço Social", status: "Pendência" },
  { id: 10, name: "Conclusão e Parecer", status: "Revisar" },
  { id: 11, name: "Respostas aos Quesitos Juízo", status: "Revisar" },
  { id: 12, name: "Respostas aos Quesitos Partes", status: "Revisar" },
];

function ProfessionalReviewPage() {
  const reviewedCount = SECTIONS.filter((s) => s.status === "Aprovada").length;
  const totalCount = SECTIONS.length;
  const percentage = (reviewedCount / totalCount) * 100;

  return (
    <div className="p-6 space-y-6 pb-32">
      <header className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Revisão Profissional</h2>
          <p className="text-xs text-white/40">Validação seção por seção do conteúdo técnico.</p>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
              Progresso da Revisão
            </span>
            <span className="text-[10px] font-bold text-veritas-electric uppercase tracking-widest">
              {reviewedCount} de {totalCount} seções
            </span>
          </div>
          <Progress value={percentage} className="h-1.5 bg-white/5" />
        </div>
      </header>

      <div className="grid gap-4">
        {SECTIONS.map((section) => (
          <div
            key={section.id}
            className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-4 hover:bg-white/[0.07] transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-2 h-2 rounded-full",
                    section.status === "Aprovada"
                      ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                      : section.status === "Pendência"
                        ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
                        : "bg-white/20",
                  )}
                />
                <h3 className="text-sm font-bold text-white/90">{section.name}</h3>
              </div>
              <span
                className={cn(
                  "text-[9px] font-bold uppercase tracking-widest",
                  section.status === "Aprovada"
                    ? "text-emerald-400"
                    : section.status === "Pendência"
                      ? "text-amber-400"
                      : "text-white/40",
                )}
              >
                {section.status}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-2">
              <ControlButton icon={Edit3} label="Editar" />
              <ControlButton icon={Search} label="Revisar" />
              <ControlButton icon={CheckCircle2} label="Aprovar" highlight />
              <ControlButton icon={MessageSquare} label="Pendência" />
              <ControlButton icon={FileText} label="Fontes" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ControlButton({
  icon: Icon,
  label,
  highlight,
}: {
  icon: any;
  label: string;
  highlight?: boolean;
}) {
  return (
    <button
      className={cn(
        "flex flex-col items-center justify-center gap-1.5 py-2.5 rounded-xl border border-white/5 transition-all",
        highlight
          ? "bg-veritas-electric/10 border-veritas-electric/20 text-veritas-electric"
          : "bg-white/5 text-white/40 hover:text-white/60 hover:border-white/10",
      )}
    >
      <Icon className="w-3.5 h-3.5" />
      <span className="text-[7px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}

import { cn } from "@/lib/utils";
