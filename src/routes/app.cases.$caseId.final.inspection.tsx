import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, CheckCircle2, Circle, AlertCircle, Info, Inspect } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/cases/$caseId/final/inspection")({
  component: InspectionPage,
});

const INSPECTION_ITEMS = [
  "Páginas",
  "Cortes",
  "Sobreposição",
  "Páginas vazias",
  "Tabelas",
  "Paginação",
  "Rodapé",
  "Assinaturas",
  "Equivalência DOCX/PDF",
];

function InspectionPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/final/inspection" });
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (item: string) => {
    setChecked(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const allChecked = INSPECTION_ITEMS.every(item => checked[item]);

  return (
    <div className="p-6 space-y-6 pb-32">
      <header className="flex items-center gap-3">
        <Link to="/app/cases/$caseId/final" params={{ caseId }} className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <ChevronLeft className="w-5 h-5 text-white/40" />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Inspeção Visual</h2>
          <p className="text-xs text-white/40">Checklist de integridade do documento gerado.</p>
        </div>
      </header>

      <div className="grid gap-3">
        {INSPECTION_ITEMS.map((item) => (
          <button 
            key={item}
            onClick={() => toggle(item)}
            className={cn(
              "w-full bg-white/5 border p-5 rounded-2xl flex items-center justify-between transition-all text-left",
              checked[item] ? "border-emerald-500/30 bg-emerald-500/[0.03]" : "border-white/5"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-6 h-6 rounded-lg flex items-center justify-center border transition-all",
                checked[item] ? "bg-emerald-500 border-emerald-500 text-white" : "border-white/10 text-transparent"
              )}>
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className={cn(
                "text-sm font-medium transition-colors",
                checked[item] ? "text-white" : "text-white/40"
              )}>{item}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8">
        <div className={cn(
          "p-6 rounded-2xl flex flex-col items-center gap-4 text-center transition-all",
          allChecked ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-white/5 border border-white/5"
        )}>
          {allChecked ? (
            <>
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Inspeção Concluída</h3>
                <p className="text-xs text-white/40 mt-1">O documento está visualmente íntegro para envio.</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <Inspect className="w-6 h-6 text-white/20" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white/20 uppercase tracking-widest">Aguardando Inspeção</h3>
                <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold mt-1">Verifique todos os {INSPECTION_ITEMS.length} itens</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}