import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { HelpCircle, Sparkles, MessageSquare, Info } from "lucide-react";

export const Route = createFileRoute("/app/cases/$caseId/questions")({
  component: CaseQuestionsPage,
});

function CaseQuestionsPage() {
  const [tab, setTab] = useState("official");

  const OFFICIAL = ["Como é a rotina da criança?", "Qual o vínculo com os genitores?"];
  const SUGGESTED = [
    "Observar reações durante o relato do histórico",
    "Verificar consistência do discurso",
  ];
  const INTERVIEW = [
    "Como você descreveria sua relação com seu filho?",
    "O que mudou após a separação?",
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b border-white/5 bg-[#0A0D14]/50">
        {[
          { id: "official", label: "Oficiais", icon: HelpCircle },
          { id: "suggested", label: "Sugestões", icon: Sparkles },
          { id: "interview", label: "Entrevista", icon: MessageSquare },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex-1 py-4 flex flex-col items-center gap-1 transition-all",
              tab === t.id ? "text-veritas-electric" : "text-white/20",
            )}
          >
            <t.icon className="w-4 h-4" />
            <span className="text-[9px] uppercase tracking-widest font-bold">{t.label}</span>
            {tab === t.id && (
              <div className="absolute bottom-0 w-8 h-0.5 bg-veritas-electric rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-4 pb-24 overflow-y-auto">
        {tab === "suggested" && (
          <div className="p-4 rounded-xl bg-veritas-violet/10 border border-veritas-violet/20 flex gap-3">
            <Info className="w-4 h-4 text-veritas-violet shrink-0 mt-0.5" />
            <p className="text-[11px] text-veritas-violet/80 leading-relaxed italic">
              Sugestões técnicas para validação profissional; não constam como quesitos oficiais nos
              autos.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {(tab === "official" ? OFFICIAL : tab === "suggested" ? SUGGESTED : INTERVIEW).map(
            (q, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm leading-relaxed"
              >
                <span className="text-veritas-electric font-bold mr-2">{i + 1}.</span>
                {q}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
