import { createFileRoute } from "@tanstack/react-router";
import { User, Target, ClipboardList, CheckCircle2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PLANS = [
  {
    person: "Maria Silva",
    relation: "Mãe",
    professional: "Dra. Mônica",
    target: "Avaliar vínculo",
    status: "Agendado",
    time: "25/06 - 14h",
  },
  {
    person: "João Silva",
    relation: "Pai",
    professional: "Dr. Roberto",
    target: "Condições habitacionais",
    status: "Em análise",
    time: "26/06 - 09h",
  },
  {
    person: "L.M.S",
    relation: "Criança",
    professional: "Conjunta",
    target: "Lúdico / Vínculos",
    status: "Pendente",
    time: "A definir",
  },
];

export const Route = createFileRoute("/app/cases/$caseId/interview-plan")({
  component: CaseInterviewPlanPage,
});

function CaseInterviewPlanPage() {
  return (
    <div className="p-6 space-y-6 pb-24">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Plano de Entrevista</h2>
        <p className="text-white/40 text-sm">Cronograma e objetivos das oitivas</p>
      </div>

      <div className="space-y-4">
        {PLANS.map((plan) => (
          <div
            key={plan.person}
            className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                  <User className="w-5 h-5 text-white/40" />
                </div>
                <div>
                  <h3 className="font-medium">{plan.person}</h3>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">
                    {plan.relation}
                  </p>
                </div>
              </div>
              <Badge
                className={
                  plan.status === "Agendado"
                    ? "bg-veritas-electric/20 text-veritas-electric"
                    : "bg-white/10 text-white/40"
                }
              >
                {plan.status}
              </Badge>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-white/60">
                <ClipboardList className="w-4 h-4 text-white/20" />
                <span>
                  Profissional: <span className="text-white">{plan.professional}</span>
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-white/60">
                <Target className="w-4 h-4 text-white/20" />
                <span>
                  Objetivo: <span className="text-white">{plan.target}</span>
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-white/60">
                <Clock className="w-4 h-4 text-white/20" />
                <span>
                  Previsão: <span className="text-white">{plan.time}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
