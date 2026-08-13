import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Zap, 
  FileText,
  ArrowLeft,
  ChevronRight,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/review_/$reviewId/result")({
  component: ReviewResultPage,
});

function ReviewResultPage() {
  const { reviewId } = useParams({ from: "/app/review_/$reviewId/result" });
  const navigate = useNavigate();
  const scrolled = useScroll(10);

  const results = [
    { 
      type: "bloqueio", 
      title: "Bloqueios", 
      count: 1, 
      color: "text-red-400", 
      bg: "bg-red-400/10",
      items: ["Contradição grave identificada entre o item 4.2 e a conclusão."] 
    },
    { 
      type: "correcao", 
      title: "Correções necessárias", 
      count: 2, 
      color: "text-amber-400", 
      bg: "bg-amber-400/10",
      items: ["Ajustar formato da data no cabeçalho", "Corrigir número do processo"] 
    },
    { 
      type: "alerta", 
      title: "Alertas", 
      count: 3, 
      color: "text-veritas-violet", 
      bg: "bg-veritas-violet/10",
      items: ["Linguagem excessivamente técnica no quesito 3", "Ausência de fonte bibliográfica para o termo 'alienação'", "Verificar competência territorial"] 
    },
    { 
      type: "adequado", 
      title: "Pontos adequados", 
      count: 8, 
      color: "text-emerald-400", 
      bg: "bg-emerald-400/10",
      items: ["Identificação completa", "Objetivos claros", "Fontes catalogadas"] 
    },
  ];

  return (
    <div className="min-h-[100dvh] veritas-hero-gradient pb-[calc(6rem+env(safe-area-inset-bottom))] text-white relative">
      <header className={cn(
        "sticky top-0 z-50 px-6 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-6 flex items-center gap-4 transition-all duration-300",
        scrolled ? "bg-veritas-graphite/90 backdrop-blur-xl border-b border-white/5 shadow-lg" : "bg-transparent"
      )}>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-veritas-silver hover:bg-white/5"
          onClick={() => navigate({ to: "/app/review/$reviewId/check", params: { reviewId } } as any)}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h2 className="text-xl font-bold tracking-tight">Resultado da Análise</h2>
      </header>

      <main className="p-6 space-y-6">
        <div className="flex flex-col items-center text-center space-y-2 mb-4">
          <div className="w-20 h-20 rounded-full bg-veritas-electric/10 flex items-center justify-center border border-veritas-electric/20 mb-2">
            <Zap className="w-10 h-10 text-veritas-electric animate-pulse-glow" />
          </div>
          <h3 className="text-2xl font-black">Revisão Concluída</h3>
          <p className="text-sm text-veritas-silver/60 max-w-[280px]">
            A Veritas identificou pontos de melhoria e inconsistências críticas.
          </p>
        </div>

        <div className="space-y-4">
          {results.map((result) => (
            <Card key={result.type} className="bg-veritas-graphite/40 border-white/5 overflow-hidden">
              <CardContent className="p-0">
                <div className={cn("p-4 flex items-center justify-between", result.bg)}>
                  <div className="flex items-center gap-3">
                    <span className={cn("font-bold text-sm", result.color)}>{result.title}</span>
                    <Badge variant="outline" className={cn("text-[10px] border-white/10", result.color)}>
                      {result.count}
                    </Badge>
                  </div>
                  {result.type === "bloqueio" ? <XCircle className="w-4 h-4 text-red-400" /> : 
                   result.type === "adequado" ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : 
                   <AlertTriangle className="w-4 h-4 text-amber-400" />}
                </div>
                <div className="p-4 space-y-3">
                  {result.items.map((item, i) => (
                    <div key={i} className="flex gap-3 text-xs text-veritas-silver/60">
                      <div className="mt-1 w-1 h-1 rounded-full bg-white/20 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="pt-6 space-y-4">
          <Card className="bg-veritas-electric/10 border-veritas-electric/20 p-5 veritas-card shadow-lg group cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-veritas-electric" />
                <span className="font-bold text-sm text-veritas-electric">Nova versão sugerida</span>
              </div>
              <ChevronRight className="w-4 h-4 text-veritas-electric group-hover:translate-x-1 transition-transform" />
            </div>
            <p className="text-xs text-veritas-silver/60 leading-relaxed">
              A Veritas pode gerar um rascunho corrigindo automaticamente os alertas e sugerindo textos para os bloqueios identificados.
            </p>
          </Card>

          <Button 
            className="w-full h-14 text-lg font-bold veritas-button-glow veritas-button-scale shadow-2xl shadow-veritas-electric/20"
            onClick={() => navigate({ to: "/app/veritas" })}
          >
            Finalizar e Salvar
          </Button>
        </div>
      </main>
    </div>
  );
}

import { Sparkles } from "lucide-react";
