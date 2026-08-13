import { createFileRoute } from "@tanstack/react-router";
import { Search, ExternalLink, Filter, Info } from "lucide-react";

export const Route = createFileRoute("/app/cases/$caseId/traceability")({
  component: TraceabilityPage,
});

const TRACE_DATA = [
  {
    assertion: "A criança apresenta resistência ao contato com o genitor.",
    source: "F01, F03",
    class: "Comportamento",
    area: "Psicologia",
    divergences: "F02 afirma que a criança é 'influenciada'.",
    scope: "Interacional",
    limit: "Observação limitada a ambiente controlado.",
  },
  {
    assertion: "O genitor mantém as obrigações alimentares em dia.",
    source: "F04 (Documental)",
    class: "Factual",
    area: "Serviço Social",
    divergences: "Nenhuma",
    scope: "Financeiro",
    limit: "Baseado em comprovantes bancários.",
  },
  {
    assertion: "Conflito de lealdade identificado na fala da genitora.",
    source: "F01 (Transcrição)",
    class: "Técnica",
    area: "Psicologia",
    divergences: "Inconsistência com relato da Avó (F05).",
    scope: "Dinâmica Familiar",
    limit: "Necessária avaliação da rede de apoio.",
  },
];

function TraceabilityPage() {
  return (
    <div className="p-6 space-y-6 pb-32">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Rastreabilidade</h2>
          <p className="text-xs text-white/40">Origem e sustentação de cada afirmação técnica.</p>
        </div>
        <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/60">
          <Filter className="w-4 h-4" />
        </button>
      </header>

      <div className="grid gap-4">
        {TRACE_DATA.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-4 hover:bg-white/[0.07] transition-all"
          >
            <div className="flex justify-between items-start gap-4">
              <p className="text-sm font-medium text-white leading-relaxed">{item.assertion}</p>
              <span className="px-2 py-1 bg-veritas-electric/10 text-veritas-electric text-[9px] font-bold uppercase tracking-widest rounded">
                {item.area}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
              <div className="space-y-1">
                <p className="text-[9px] text-white/40 uppercase tracking-widest">Fontes</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-veritas-violet font-bold">{item.source}</span>
                  <button className="p-1 hover:text-veritas-electric transition-colors">
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] text-white/40 uppercase tracking-widest">Classe</p>
                <p className="text-xs text-white/80">{item.class}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] text-white/40 uppercase tracking-widest">Divergências</p>
                <p className="text-xs text-red-400/80">{item.divergences}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] text-white/40 uppercase tracking-widest">Alcance/Limite</p>
                <div className="flex items-center gap-1.5 text-xs text-white/60">
                  <Info className="w-3 h-3" />
                  {item.limit}
                </div>
              </div>
            </div>

            <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
              <Search className="w-3 h-3" />
              Ver Origem
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
