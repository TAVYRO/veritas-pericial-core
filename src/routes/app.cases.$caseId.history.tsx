import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { 
  ArrowLeft, 
  History, 
  CheckCircle2, 
  Zap, 
  Mic, 
  FilePlus, 
  AlertCircle,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/cases/$caseId/history")({
  component: CaseHistoryPage,
});

function CaseHistoryPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/history" });
  const navigate = useNavigate();
  const scrolled = useScroll(10);

  const historyItems = [
    {
      title: "Auditoria Finalizada",
      description: "10/10 dimensões aprovadas.",
      time: "Hoje, 14:30",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "Rascunho Gerado",
      description: "Sugestão Veritas integrada.",
      time: "Hoje, 10:15",
      icon: Zap,
      color: "text-veritas-electric",
      bg: "bg-veritas-electric/10"
    },
    {
      title: "Entrevista Realizada",
      description: "Pessoa: Maria Silva (Mãe)",
      time: "Ontem, 16:45",
      icon: Mic,
      color: "text-veritas-violet",
      bg: "bg-veritas-violet/10"
    },
    {
      title: "Documento Adicionado",
      description: "Certidão de Nascimento",
      time: "Ontem, 09:20",
      icon: FilePlus,
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    {
      title: "Caso Iniciado",
      description: "Abertura do processo 0003512-93",
      time: "10 Ago, 11:00",
      icon: FileText,
      color: "text-veritas-silver/40",
      bg: "bg-white/5"
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
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h2 className="text-xl font-bold tracking-tight">Histórico do Caso</h2>
      </header>

      <main className="p-6">
        <div className="relative space-y-8 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/5">
          {historyItems.map((item, idx) => (
            <div key={idx} className="flex gap-4 relative group">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border border-white/5 z-10 transition-transform group-hover:scale-110",
                item.bg, item.color
              )}>
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 space-y-1 pt-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-bold text-white group-hover:text-veritas-electric transition-colors">{item.title}</h4>
                  <span className="text-[10px] text-veritas-silver/30 font-medium">{item.time}</span>
                </div>
                <p className="text-xs text-veritas-silver/40">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
