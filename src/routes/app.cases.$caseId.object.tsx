import { createFileRoute } from "@tanstack/react-router";
import { Scale, Target, Ruler, Anchor } from "lucide-react";

export const Route = createFileRoute("/app/cases/$caseId/object")({
  component: CaseObjectPage,
});

function CaseObjectPage() {
  return (
    <div className="p-6 space-y-6 pb-24">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Objeto e Finalidade</h2>
        <p className="text-white/40 text-sm">Delimitação do escopo técnico</p>
      </div>

      <div className="space-y-4">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-veritas-electric/10 to-transparent border border-veritas-electric/20 space-y-3">
          <div className="flex items-center gap-2 text-veritas-electric">
            <Target className="w-4 h-4" />
            <h3 className="text-[10px] uppercase tracking-widest font-bold">Objeto da Perícia</h3>
          </div>
          <p className="text-sm leading-relaxed">
            Avaliação das dinâmicas familiares e condições de saúde mental das partes para subsidiar
            decisão sobre guarda.
          </p>
          <div className="flex items-center gap-1 text-[9px] text-veritas-electric/60">
            <Anchor className="w-3 h-3" /> Fonte vinculada:{" "}
            <span className="underline">F01 (Decisão Judicial)</span>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-white/40">
              <Scale className="w-4 h-4" />
              <h3 className="text-[10px] uppercase tracking-widest font-bold">Finalidade</h3>
            </div>
            <p className="text-sm">Auxiliar o juízo na definição do melhor interesse da criança.</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-white/40">
              <Ruler className="w-4 h-4" />
              <h3 className="text-[10px] uppercase tracking-widest font-bold">Limites</h3>
            </div>
            <p className="text-sm">
              Restrito à análise psicossocial, sem avaliação de capacidade civil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
