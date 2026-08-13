import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  ArrowLeft,
  ShieldCheck,
  FileSearch,
  Users,
  Calendar,
  Layers,
  Link as LinkIcon,
  HelpCircle,
  Zap,
  Gavel,
  Scale,
  Trash2,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const Route = createFileRoute("/app/review/$reviewId/check")({
  component: ReviewCheckPage,
});

function ReviewCheckPage() {
  const { reviewId } = useParams({ from: "/app/review/$reviewId/check" });
  const navigate = useNavigate();
  const scrolled = useScroll(10);
  
  const items = [
    { label: "Tipo do documento", icon: FileSearch, status: "ok" },
    { label: "Pessoas identificadas", icon: Users, status: "ok" },
    { label: "Datas e prazos", icon: Calendar, status: "warning" },
    { label: "Número do processo", icon: Scale, status: "ok" },
    { label: "Vínculos familiares", icon: LinkIcon, status: "ok" },
    { label: "Procedimentos realizados", icon: Layers, status: "ok" },
    { label: "Fontes e referências", icon: Database, status: "ok" },
    { label: "Objeto da perícia", icon: Search, status: "ok" },
    { label: "Resposta aos quesitos", icon: HelpCircle, status: "warning" },
    { label: "Extrapolações técnicas", icon: Zap, status: "ok" },
    { label: "Competência técnica", icon: ShieldCheck, status: "ok" },
    { label: "Contradições internas", icon: AlertCircle, status: "error" },
    { label: "Resíduos de outro processo", icon: Trash2, status: "ok" },
    { label: "Dados excessivos", icon: Gavel, status: "ok" },
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
          onClick={() => navigate({ to: "/app/review" })}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold tracking-tight">Verificação Visual</h2>
          <p className="text-[10px] text-veritas-silver/40 uppercase tracking-widest font-mono">ID: {reviewId}</p>
        </div>
      </header>

      <main className="p-6 space-y-6">
        <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Status da Verificação</span>
            <p className="text-sm font-bold text-veritas-silver">Analisando 14 dimensões técnicas...</p>
          </div>
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Pendente</Badge>
        </div>

        <div className="grid gap-3">
          {items.map((item) => (
            <div 
              key={item.label} 
              className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/[0.08] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-xl bg-white/5 text-white/40 group-hover:text-white transition-colors",
                  item.status === "ok" && "text-emerald-400 bg-emerald-400/5",
                  item.status === "warning" && "text-amber-400 bg-amber-400/5",
                  item.status === "error" && "text-red-400 bg-red-400/5"
                )}>
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-veritas-silver group-hover:text-white transition-colors">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.status === "ok" && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                {item.status === "warning" && <AlertCircle className="w-4 h-4 text-amber-500" />}
                {item.status === "error" && <AlertCircle className="w-4 h-4 text-red-500" />}
                <Search className="w-3.5 h-3.5 text-white/10 group-hover:text-white/40 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8">
          <Button 
            className="w-full h-14 text-lg font-bold veritas-button-glow veritas-button-scale shadow-2xl shadow-veritas-electric/20"
            onClick={() => navigate({ to: "/app/review/$reviewId/result", params: { reviewId } })}
          >
            Ver Resultado
          </Button>
        </div>
      </main>
    </div>
  );
}
