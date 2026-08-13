import { createFileRoute } from "@tanstack/react-router";
import { 
  Flag, 
  AlertTriangle, 
  Lock, 
  Unlock, 
  ChevronRight,
  HelpCircle
} from "lucide-react";

export const Route = createFileRoute("/app/cases/$caseId/critical-gaps")({
  component: CriticalGapsPage,
});

const GAPS = [
  {
    type: "BLOQUEIA ELABORAÇÃO",
    question: "Qual o horário exato em que a criança foi entregue à genitora no domingo, dia 09/08/2026?",
    reason: "A divergência de 2 horas impede a análise do impacto temporal da visita na agitação relatada.",
    status: "blocked"
  },
  {
    type: "BLOQUEIA ELABORAÇÃO",
    question: "O Pedro frequenta creche ou permanece exclusivamente com a avó materna?",
    reason: "Contradição entre relato da genitora e evidências do Estudo Social compromete a análise da rede de apoio.",
    status: "blocked"
  },
  {
    type: "PODE SER CONFIRMADO POSTERIORMENTE",
    question: "Qual o regime de férias escolares pactuado verbalmente entre as partes?",
    reason: "Informação relevante para o plano de convivência, mas não impede a conclusão diagnóstica da rotina atual.",
    status: "pending"
  }
];

function CriticalGapsPage() {
  return (
    <div className="p-6 space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-white">Lacunas Críticas</h2>
        <div className="flex items-center gap-2">
          <Flag className="w-4 h-4 text-veritas-violet" />
          <span className="text-sm font-bold text-white/60">3 identificadas</span>
        </div>
      </div>

      <div className="space-y-4">
        {GAPS.map((gap, idx) => (
          <div key={idx} className={`bg-white/5 border rounded-2xl p-4 space-y-3 ${
            gap.status === 'blocked' ? 'border-rose-500/20' : 'border-white/5'
          }`}>
            <div className="flex items-center justify-between">
              <div className={`flex items-center gap-2 ${
                gap.status === 'blocked' ? 'text-rose-400' : 'text-amber-400'
              }`}>
                {gap.status === 'blocked' ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                <span className="text-[9px] font-bold uppercase tracking-widest">{gap.type}</span>
              </div>
              <HelpCircle className="w-4 h-4 text-white/20" />
            </div>
            
            <p className="text-sm text-white/90 font-medium leading-relaxed">
              {gap.question}
            </p>
            
            <div className="bg-black/20 rounded-xl p-3">
              <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Impacto na Análise</p>
              <p className="text-xs text-white/60 leading-relaxed italic">
                {gap.reason}
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <button className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white/60 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-colors">
                Resolver via Quesito
              </button>
              <button className="flex-1 py-2 bg-veritas-violet/10 hover:bg-veritas-violet/20 text-veritas-violet rounded-lg text-[9px] font-bold uppercase tracking-widest transition-colors">
                Nova Entrevista
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-rose-500/5 border border-rose-500/10 rounded-xl flex gap-3">
        <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
        <p className="text-[10px] text-rose-500/80 leading-relaxed">
          Existem 2 lacunas que <strong>bloqueiam</strong> a progressão para a etapa de Auditoria e Fechamento. A Veritas recomenda a resolução destas questões antes da redação final.
        </p>
      </div>
    </div>
  );
}
