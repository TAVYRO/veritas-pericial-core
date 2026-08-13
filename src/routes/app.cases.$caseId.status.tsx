import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { 
  ArrowLeft, 
  Scale, 
  Briefcase, 
  Zap, 
  FileText, 
  Users, 
  ClipboardCheck, 
  HelpCircle, 
  AlertTriangle,
  PlayCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/cases/$caseId/status")({
  component: CaseStatusPage,
});

function CaseStatusPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/status" });
  const navigate = useNavigate();
  const scrolled = useScroll(10);

  const statusInfo = {
    process: "0003512-93.2025.8.16.0098",
    step: "Processamento Técnico",
    mode: "Modo Automático",
    materials: "12 arquivos indexados",
    people: "4 pessoas identificadas",
    procedures: "8 atos técnicos",
    questions: "15 quesitos ativos",
    gaps: "2 lacunas de suficiência",
    nextAction: "Revisar análise assistida"
  };

  const sections = [
    { label: "Processo", value: statusInfo.process, icon: Scale },
    { label: "Etapa", value: statusInfo.step, icon: Briefcase, highlight: true },
    { label: "Modo", value: statusInfo.mode, icon: Zap },
    { label: "Materiais", value: statusInfo.materials, icon: FileText },
    { label: "Pessoas", value: statusInfo.people, icon: Users },
    { label: "Procedimentos", value: statusInfo.procedures, icon: ClipboardCheck },
    { label: "Quesitos", value: statusInfo.questions, icon: HelpCircle },
    { label: "Lacunas", value: statusInfo.gaps, icon: AlertTriangle, warning: true },
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
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h2 className="text-xl font-bold tracking-tight">Status do Caso</h2>
      </header>

      <main className="p-6 space-y-6">
        <div className="grid gap-3">
          {sections.map((section) => (
            <div 
              key={section.label} 
              className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-xl bg-white/5",
                  section.highlight ? "text-veritas-electric" : 
                  section.warning ? "text-amber-500" : "text-veritas-silver/40"
                )}>
                  <section.icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{section.label}</span>
                  <p className={cn(
                    "text-sm font-bold",
                    section.highlight ? "text-veritas-electric" : 
                    section.warning ? "text-amber-500" : "text-veritas-silver"
                  )}>
                    {section.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Card className="bg-veritas-electric/10 border-veritas-electric/20 p-5 veritas-card shadow-lg mt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-veritas-electric" />
              <span className="font-bold text-sm text-veritas-electric uppercase tracking-widest">Próxima Ação</span>
            </div>
            <p className="text-lg font-black text-white leading-tight">
              {statusInfo.nextAction}
            </p>
            <Button 
              className="w-full h-12 text-sm font-bold veritas-button-glow bg-veritas-electric hover:bg-veritas-electric-glow"
              onClick={() => navigate({ to: "/app/cases/$caseId/materials", params: { caseId } } as any)}
            >
              Ir para etapa
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}
