import { createFileRoute } from "@tanstack/react-router";
import { Cpu, CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/app/cases/$caseId/process")({
  component: ProcessPage,
});

const STEPS = [
  "Inventariando fontes",
  "Conferindo processo",
  "Organizando pessoas",
  "Identificando quesitos",
  "Relacionando evidências",
  "Verificando suficiência",
  "Estruturando conteúdo",
  "Preparando rascunho",
  "Executando conferência preliminar",
];

function ProcessPage() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (currentStepIndex < STEPS.length) {
      const timer = setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [currentStepIndex]);

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="relative mb-8">
        <div className="w-20 h-20 bg-veritas-electric/10 rounded-full flex items-center justify-center animate-pulse-glow">
          <Cpu className="w-10 h-10 text-veritas-electric" />
        </div>
        {currentStepIndex < STEPS.length && (
          <div className="absolute inset-0 border-2 border-veritas-electric rounded-full animate-orbit-ring" />
        )}
      </div>

      <div className="space-y-4 max-w-sm w-full">
        <h2 className="text-xl font-bold text-white tracking-tight">Processando informações</h2>
        
        <div className="space-y-2">
          {STEPS.map((step, index) => (
            <div
              key={step}
              className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                index === currentStepIndex 
                  ? "text-white font-semibold" 
                  : index < currentStepIndex 
                  ? "text-emerald-500" 
                  : "text-white/20"
              }`}
            >
              {index < currentStepIndex ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : index === currentStepIndex ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-current/20" />
              )}
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}