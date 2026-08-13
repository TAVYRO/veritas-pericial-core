import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { 
  Bell, 
  Search, 
  Plus, 
  Mic, 
  FilePlus, 
  Zap, 
  Clock, 
  ChevronRight,
  MoreVertical,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/veritas/BottomNavigation";
import { cn } from "@/lib/utils";
import { usePWAMode } from "@/hooks/use-pwa-mode";
import { useScroll } from "@/hooks/use-scroll";
import { useEffect } from "react";

export const Route = createFileRoute("/app/")({
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();
  const { displayMode, requestFullscreen } = usePWAMode();
  const scrolled = useScroll(10);

  useEffect(() => {
    // If we're in a PWA but not fullscreen, try to request it on mount
    if (displayMode !== 'browser') {
      requestFullscreen();
    }
  }, [displayMode, requestFullscreen]);

  const stats = [
    { label: "Casos ativos", value: 12, color: "text-blue-400" },
    { label: "Entrevistas", value: 8, color: "text-purple-400" },
    { label: "Pendências", value: 3, color: "text-red-400" },
    { label: "Laudos", value: 5, color: "text-green-400" },
  ];

  const recentCases = [
    {
      id: "0003512-93.2025.8.16.0098",
      title: "Guarda e União Estável",
      status: "Em análise",
      deadline: "18 ago",
      statusColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    },
    {
      id: "0012478-22.2026.8.16.0001",
      title: "Avaliação Psicossocial",
      status: "Coleta",
      deadline: "22 ago",
      statusColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    },
    {
      id: "0009842-15.2025.8.16.0000",
      title: "Interdição e Curatela",
      status: "Concluído",
      deadline: "Finalizado",
      statusColor: "bg-green-500/20 text-green-400 border-green-500/30",
    },
  ];

  const recentActivities = [
    {
      action: "Entrevista gravada",
      target: "Caso 0003512-93",
      time: "Há 2 horas",
      icon: <Mic className="w-4 h-4" />,
    },
    {
      action: "Documento adicionado",
      target: "Laudo Preliminar",
      time: "Há 5 horas",
      icon: <FilePlus className="w-4 h-4" />,
    },
    {
      action: "Processamento Veritas concluído",
      target: "Análise assistida pronta para revisão profissional",
      time: "Ontem",
      icon: <Zap className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-[100dvh] veritas-hero-gradient pb-[calc(6rem+env(safe-area-inset-bottom))] text-white relative">
      {/* Top Bar - Sticky */}
      <header className={cn(
        "sticky top-0 z-50 px-6 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-6 flex items-center justify-between transition-all duration-300",
        scrolled ? "bg-veritas-graphite/90 backdrop-blur-xl border-b border-white/5 shadow-lg" : "bg-transparent"
      )}>
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12 border-2 border-veritas-electric/20">
            <AvatarImage src="" />
            <AvatarFallback className="bg-veritas-graphite text-veritas-silver">MH</AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold tracking-tight">Olá, Mônica</h2>
            <p className="text-xs text-veritas-silver-dim">Veja o andamento das suas perícias</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative text-veritas-silver hover:bg-white/5"
          onClick={() => navigate({ to: "/app/notifications" })}
        >
          <Bell className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-veritas-violet rounded-full"></span>
        </Button>
      </header>

      {/* Search Bar */}
      <div className="px-6 mb-8 mt-2">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-veritas-silver/40 group-focus-within:text-veritas-electric transition-colors" />
          <Input 
            placeholder="Buscar processo, pessoa ou documento..." 
            className="pl-11 bg-veritas-graphite/40 border-white/5 focus-visible:ring-veritas-electric/20"
            onClick={() => navigate({ to: "/app/search" })}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-6 grid grid-cols-2 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-veritas-graphite/40 border-white/5 veritas-card shadow-lg">
            <CardContent className="p-4">
              <p className="text-2xl font-black mb-1 leading-none">{stat.value}</p>
              <p className="text-xs text-veritas-silver/60 font-medium uppercase tracking-wider">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Action */}
      <div className="px-6 mb-8">
        <Button 
          className="w-full h-14 text-lg font-bold veritas-button-glow veritas-button-scale gap-2 shadow-2xl shadow-veritas-electric/20"
          onClick={() => navigate({ to: "/app/veritas" })}
        >
          <Plus className="w-6 h-6" />
          Novo Caso
        </Button>
      </div>

      {/* Quick Actions - Responsive 3 columns */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-3 gap-3">
          <Button 
            variant="outline" 
            className="h-auto py-3 px-2 flex flex-col items-center gap-2 border-white/10 bg-white/5 text-veritas-silver hover:bg-veritas-electric/10 hover:border-veritas-electric/30 transition-all rounded-2xl"
            onClick={() => navigate({ to: "/app/record" })}
          >
            <div className="p-2 rounded-xl bg-veritas-violet/20 text-veritas-violet">
              <Mic className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-center leading-tight">Gravar entrevista</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-3 px-2 flex flex-col items-center gap-2 border-white/10 bg-white/5 text-veritas-silver hover:bg-veritas-electric/10 hover:border-veritas-electric/30 transition-all rounded-2xl"
          >
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
              <FilePlus className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-center leading-tight">Adicionar documento</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto py-3 px-2 flex flex-col items-center gap-2 border-white/10 bg-white/5 text-veritas-silver hover:bg-veritas-electric/10 hover:border-veritas-electric/30 transition-all rounded-2xl"
            onClick={() => navigate({ to: "/app/veritas" })}
          >
            <div className="p-2 rounded-xl bg-veritas-electric/20 text-veritas-electric">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-center leading-tight">Processar com Veritas</span>
          </Button>
        </div>
      </div>

      {/* Recent Cases */}
      <section className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Casos recentes</h3>
          <Link to="/app/cases" className="text-xs font-semibold text-veritas-electric hover:underline">Ver todos</Link>
        </div>
        <div className="space-y-4">
          {recentCases.map((c) => (
            <Card key={c.id} className="bg-veritas-graphite/40 border-white/5 hover:border-white/10 transition-colors shadow-md overflow-hidden group">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-veritas-silver/40 uppercase tracking-tighter">{c.id}</p>
                    <h4 className="font-bold text-veritas-silver group-hover:text-white transition-colors">{c.title}</h4>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-veritas-silver/30">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={`rounded-full border text-[10px] py-0 px-2 font-bold ${c.statusColor}`}>
                    {c.status}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-xs text-veritas-silver/40">
                    <Calendar className="w-3 h-3" />
                    <span>Prazo: {c.deadline}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="px-6 mb-8">
        <h3 className="text-lg font-bold mb-4">Atividade recente</h3>
        <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/5">
          {recentActivities.map((activity, idx) => (
            <div key={idx} className="flex gap-4 relative">
              <div className="w-10 h-10 rounded-full bg-veritas-graphite flex items-center justify-center border border-white/5 z-10 text-veritas-silver/60">
                {activity.icon}
              </div>
              <div className="flex-1 space-y-0.5 pt-1">
                <div className="flex justify-between">
                  <p className="text-sm font-bold text-veritas-silver">{activity.action}</p>
                  <span className="text-[10px] text-veritas-silver/30 font-medium">{activity.time}</span>
                </div>
                <p className="text-xs text-veritas-silver/40">{activity.target}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-veritas-silver/20 self-center" />
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
