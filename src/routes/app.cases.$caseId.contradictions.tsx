import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert, ArrowLeftRight, MessageSquare, AlertTriangle, Link2 } from "lucide-react";

export const Route = createFileRoute("/app/cases/$caseId/contradictions")({
  component: ContradictionsPage,
});

const CONTRADICTIONS = [
  {
    theme: "Horário de Retorno das Visitas",
    items: [
      {
        source: "Entrevista F01 (Maria Silva)",
        text: "Relata que a criança retorna geralmente às 20:00, mas o horário varia muito.",
        type: "Relato A",
      },
      {
        source: "Entrevista F02 (João Santos)",
        text: "Afirma categoricamente que entrega a criança sempre às 18:00, conforme decisão judicial.",
        type: "Relato B",
      },
    ],
    convergence: "Ambas as partes concordam que a entrega ocorre no domingo.",
    divergence: "Divergência de 2 horas no horário habitual de entrega.",
    limit:
      "Impossível determinar o horário real sem registros externos (ex: mensagens ou portaria).",
  },
  {
    theme: "Rede de Apoio Materna",
    items: [
      {
        source: "Entrevista F01 (Maria Silva)",
        text: "Informa que a avó materna cuida da criança diariamente à tarde.",
        type: "Relato A",
      },
      {
        source: "Estudo Social (F03)",
        text: "Vizinhos relatam que a criança é vista frequentemente em uma creche particular no período da tarde.",
        type: "Fonte Externa",
      },
    ],
    convergence: "A criança não fica sozinha no período vespertino.",
    divergence: "Diferença entre o cuidador relatado (Avó) e o observado/ouvido (Creche).",
    limit: "Necessário verificar documentos de matrícula ou recibos da instituição citada.",
  },
];

function ContradictionsPage() {
  return (
    <div className="p-6 space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          Contradições e Convergências
        </h2>
        <div className="px-2 py-1 bg-white/5 rounded text-[9px] font-bold text-white/40 uppercase tracking-widest border border-white/10">
          Análise Assistida
        </div>
      </div>

      <div className="space-y-6">
        {CONTRADICTIONS.map((c, idx) => (
          <div key={idx} className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
            <div className="p-4 bg-white/[0.02] border-b border-white/5 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-veritas-violet" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">{c.theme}</h3>
            </div>

            <div className="p-4 space-y-4">
              {/* Relatos/Fontes */}
              <div className="grid gap-3">
                {c.items.map((item, i) => (
                  <div key={i} className="bg-white/5 rounded-xl p-3 border-l-2 border-white/10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-bold text-veritas-electric uppercase tracking-widest">
                        {item.type}
                      </span>
                      <div className="flex items-center gap-1 text-[9px] text-white/30 italic">
                        <Link2 className="w-3 h-3" />
                        {item.source}
                      </div>
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              {/* Análise Situacional */}
              <div className="grid gap-3 pt-2">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
                  <div className="flex-1">
                    <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mb-0.5">
                      Convergência
                    </p>
                    <p className="text-[11px] text-white/50 leading-snug">{c.convergence}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5" />
                  <div className="flex-1">
                    <p className="text-[9px] font-bold text-rose-400 uppercase tracking-widest mb-0.5">
                      Divergência
                    </p>
                    <p className="text-[11px] text-white/50 leading-snug">{c.divergence}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5" />
                  <div className="flex-1">
                    <p className="text-[9px] font-bold text-amber-400 uppercase tracking-widest mb-0.5">
                      Limite de Análise
                    </p>
                    <p className="text-[11px] text-white/50 leading-snug">{c.limit}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-veritas-violet/5 border border-veritas-violet/10 rounded-xl">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-veritas-violet shrink-0" />
          <p className="text-[10px] text-veritas-violet/80 leading-relaxed font-medium">
            A Veritas organiza os relatos e identifica as tensões discursivas. A decisão sobre a
            veracidade ou a interpretação final dos fatos é de exclusiva responsabilidade da
            profissional.
          </p>
        </div>
      </div>
    </div>
  );
}
