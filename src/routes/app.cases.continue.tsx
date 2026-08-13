import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { 
  History, 
  ArrowLeft, 
  ChevronRight, 
  Clock, 
  AlertCircle,
  Play,
  Briefcase,
  FileText,
  Users,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/cases/continue")({
  component: ContinueCasePage,
});

function ContinueCasePage() {
  const navigate = useNavigate();
  const scrolled = useScroll(10);

  const ongoingCases = [
    {
      id: "demo-case-1",
      process: "0003512-93.2025.8.16.0098",
      title: "Guarda e União Estável",
      modality: "Laudo Pericial",
      professionals: ["Mônica Hazama", "Assistente Social"],
      mode: "Modo Guiado",
      step: "Coleta e Suficiência",
      pendencies: 2,
      nextAction: "Verificar lacunas críticas",
      progress: 65
    },
    {
      id: "demo-case-2",
      process: "0012478-22.2026.8.16.0001",
      title: "Avaliação Psicossocial",
      modality: "Relatório Técnico",
      professionals: ["Equipe Multidisciplinar"],
      mode: "Automático",
      step: "Redação de Quesitos",
      pendencies: 0,
      nextAction: "Aprovar respostas sugeridas",
      progress: 40
    }
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
          onClick={() => navigate({ to: "/app/veritas" })}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h2 className="text-xl font-bold tracking-tight text-white">Continuar Caso</h2>
      </header>

      <main className="p-6 space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <History className="w-5 h-5 text-veritas-electric" />
          <h3 className="text-lg font-bold">Trabalhos em andamento</h3>
        </div>

        <div className="space-y-6">
          {ongoingCases.map((c) => (
            <Card key={c.id} className="bg-veritas-graphite/40 border-white/5 overflow-hidden veritas-card group cursor-pointer">
              <CardContent className="p-0">
                <div className="p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-veritas-silver/40 uppercase tracking-tighter">{c.process}</span>
                      <h4 className="text-lg font-bold text-white group-hover:text-veritas-electric transition-colors">{c.title}</h4>
                    </div>
                    <Badge variant="outline" className="bg-veritas-electric/10 text-veritas-electric border-veritas-electric/20 text-[10px]">
                      {c.progress}%
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-widest text-veritas-silver/40 font-bold">Modalidade</span>
                      <div className="flex items-center gap-2 text-xs text-veritas-silver/80">
                        <FileText className="w-3.5 h-3.5 opacity-50" />
                        {c.modality}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-widest text-veritas-silver/40 font-bold">Modo</span>
                      <div className="flex items-center gap-2 text-xs text-veritas-silver/80">
                        <Zap className="w-3.5 h-3.5 opacity-50" />
                        {c.mode}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-widest text-veritas-silver/40 font-bold">Equipe</span>
                      <div className="flex items-center gap-2 text-xs text-veritas-silver/80">
                        <Users className="w-3.5 h-3.5 opacity-50" />
                        {c.professionals[0]}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-widest text-veritas-silver/40 font-bold">Etapa Atual</span>
                      <div className="flex items-center gap-2 text-xs text-veritas-electric font-bold">
                        <Briefcase className="w-3.5 h-3.5" />
                        {c.step}
                      </div>
                    </div>
                  </div>

                  {c.pendencies > 0 && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-center gap-3">
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="text-xs text-amber-500/80 font-medium">{c.pendencies} pendências críticas aguardando ação</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] uppercase tracking-widest text-veritas-silver/40 font-bold">Próxima Ação</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-medium text-veritas-silver/80">{c.nextAction}</p>
                      <Button 
                        size="sm" 
                        className="h-10 px-4 rounded-xl bg-veritas-electric hover:bg-veritas-electric-glow font-bold gap-2"
                        onClick={() => navigate({ to: "/app/cases/$caseId/materials", params: { caseId: c.id } } as any)}
                      >
                        <Play className="w-4 h-4 fill-current" />
                        Retomar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
