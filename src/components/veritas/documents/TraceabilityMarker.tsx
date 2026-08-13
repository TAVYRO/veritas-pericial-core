import type { TraceabilityKind } from "@/features/documents/document-preview-types";
import { cn } from "@/lib/utils";

interface TraceabilityMarkerProps {
  kind: TraceabilityKind;
  className?: string;
}

const CONFIG: Record<TraceabilityKind, { label: string; color: string; border: string; text: string }> = {
  documento: {
    label: "DOCUMENTO",
    color: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-500"
  },
  relato: {
    label: "RELATO",
    color: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-500"
  },
  observacao: {
    label: "OBSERVAÇÃO",
    color: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-500"
  },
  inferencia: {
    label: "INFERÊNCIA",
    color: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-500"
  },
  hipotese: {
    label: "HIPÓTESE",
    color: "bg-veritas-violet/10",
    border: "border-veritas-violet/20",
    text: "text-veritas-violet"
  },
  "nao-confirmado": {
    label: "NÃO CONFIRMADO",
    color: "bg-rose-500/10",
    border: "border-rose-500/20",
    text: "text-rose-500"
  }
};

export function TraceabilityMarker({ kind, className }: TraceabilityMarkerProps) {
  const config = CONFIG[kind];
  
  return (
    <span className={cn(
      "inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border shrink-0 mr-1.5",
      config.color,
      config.border,
      config.text,
      className
    )}>
      {config.label}
    </span>
  );
}
