import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bell, ArrowLeft, Clock, Zap, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/notifications")({
  component: NotificationsPage,
});

function NotificationsPage() {
  const navigate = useNavigate();

  const notifications = [
    { title: "Prazo próximo", body: "Caso 0003512-93: Laudo para amanhã.", icon: Clock, color: "text-amber-400" },
    { title: "Transcrição pronta", body: "Entrevista de Maria Silva processada.", icon: FileText, color: "text-blue-400" },
    { title: "Auditoria completa", body: "Caso 0012478-22 revisado.", icon: CheckCircle2, color: "text-emerald-400" },
    { title: "Processamento Veritas", body: "Análise assistida gerada.", icon: Zap, color: "text-veritas-electric" },
  ];

  return (
    <div className="min-h-[100dvh] veritas-hero-gradient pb-[calc(6rem+env(safe-area-inset-bottom))] text-white relative">
      <header className="sticky top-0 z-50 px-6 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-6 flex items-center gap-4 bg-veritas-graphite/90 backdrop-blur-xl border-b border-white/5">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-veritas-silver hover:bg-white/5"
          onClick={() => navigate({ to: "/app" })}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h2 className="text-xl font-bold tracking-tight">Notificações</h2>
      </header>

      <main className="p-6 space-y-4">
        {notifications.map((n, i) => (
          <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div className={cn("p-2 rounded-xl bg-white/5 self-start", n.color)}>
              <n.icon className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold">{n.title}</h4>
              <p className="text-xs text-veritas-silver/60">{n.body}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
