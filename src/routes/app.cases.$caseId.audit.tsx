import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, XCircle, MinusCircle, ShieldCheck, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/cases/$caseId/audit")({
  component: AuditPage,
});

const AUDIT_DIMENSIONS = [
  { id: 1, name: "Identificação", status: "APROVADA" },
  { id: 2, name: "Integridade das fontes", status: "APROVADA" },
  { id: 3, name: "Atribuição e rastreabilidade", status: "APROVADA" },
  { id: 4, name: "Procedimentos", status: "APROVADA" },
  { id: 5, name: "Competências", status: "APROVADA" },
  { id: 6, name: "Objeto e quesitos", status: "APROVADA" },
  { id: 7, name: "Análise e conclusão", status: "APROVADA" },
  { id: 8, name: "Proteção e isolamento", status: "APROVADA" },
  { id: 9, name: "Texto e normas", status: "APROVADA" },
  { id: 10, name: "Documento", status: "APROVADA" },
];

function AuditPage() {
  const allApproved = AUDIT_DIMENSIONS.every(
    (d) => d.status === "APROVADA" || d.status === "NÃO SE APLICA",
  );

  return (
    <div className="p-6 space-y-6 pb-32">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Auditoria Técnica</h2>
          <p className="text-xs text-white/40">
            Verificação de conformidade e integridade pericial.
          </p>
        </div>
        {allApproved && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full animate-pulse-glow">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
              Auditoria 10/10
            </span>
          </div>
        )}
      </header>

      <div className="grid gap-3">
        {AUDIT_DIMENSIONS.map((dim) => (
          <div
            key={dim.id}
            className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/[0.07] transition-all"
          >
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-white/20 group-hover:text-veritas-electric transition-colors">
                {dim.id.toString().padStart(2, "0")}
              </span>
              <span className="text-sm font-medium text-white/80">{dim.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={dim.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    APROVADA: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    REPROVADA: "bg-red-500/10 text-red-400 border-red-500/20",
    "NÃO SE APLICA": "bg-white/5 text-white/40 border-white/10",
  };

  const Icon =
    status === "APROVADA" ? CheckCircle2 : status === "REPROVADA" ? XCircle : MinusCircle;

  return (
    <div
      className={cn(
        "px-2 py-1 border rounded-md text-[8px] font-bold uppercase tracking-widest flex items-center gap-1.5",
        styles[status],
      )}
    >
      <Icon className="w-3 h-3" />
      {status}
    </div>
  );
}
