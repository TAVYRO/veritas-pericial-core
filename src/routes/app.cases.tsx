import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { 
  Search, 
  Plus, 
  Filter,
  MoreVertical,
  Calendar,
  Clock,
  Home,
  Briefcase,
  Zap,
  User,
  Mic,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export const Route = createFileRoute("/app/cases")({
  component: CasesPage,
});

const filters = [
  "Todos",
  "Ativos",
  "Coleta",
  "Análise",
  "Revisão",
  "Finalizados"
];

const mockCases = [
  {
    id: "0003512-93.2025.8.16.0098",
    type: "Reconhecimento e Extinção de União Estável",
    specialty: "Avaliação Psicossocial",
    status: "Análise",
    court: "Vara de Família de Curitiba",
    deadline: "18/08/2026",
    lastActivity: "Entrevista adicionada hoje",
    statusColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
  {
    id: "0012478-22.2026.8.16.0001",
    type: "Guarda e Visitação",
    specialty: "Avaliação Psicológica",
    status: "Coleta",
    court: "2ª Vara de Família de Londrina",
    deadline: "22/08/2026",
    lastActivity: "Documento anexado há 2 dias",
    statusColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  },
  {
    id: "0009842-15.2025.8.16.0000",
    type: "Interdição e Curatela",
    specialty: "Perícia Médica",
    status: "Finalizados",
    court: "Vara Cível de Maringá",
    deadline: "10/05/2026",
    lastActivity: "Laudo protocolado",
    statusColor: "bg-green-500/20 text-green-400 border-green-500/30",
  },
  {
    id: "0004421-10.2026.8.16.0014",
    type: "Alienação Parental",
    specialty: "Estudo Social",
    status: "Revisão",
    court: "1ª Vara de Família de Cascavel",
    deadline: "05/09/2026",
    lastActivity: "Análise Veritas concluída",
    statusColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  },
  {
    id: "0007733-44.2025.8.16.0030",
    type: "Indenização por Danos Morais",
    specialty: "Perícia Grafotécnica",
    status: "Análise",
    court: "Vara Cível de Foz do Iguaçu",
    deadline: "12/09/2026",
    lastActivity: "Aguardando manifestação das partes",
    statusColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },
];

function CasesPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredCases = activeFilter === "Todos" 
    ? mockCases 
    : mockCases.filter(c => c.status === activeFilter || (activeFilter === "Ativos" && c.status !== "Finalizados"));

  return (
    <div className="min-h-screen veritas-hero-gradient pb-24 text-white">
      {/* Header */}
      <header className="px-6 pt-6 flex flex-col gap-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-veritas-silver -ml-2 hover:bg-white/5"
              onClick={() => navigate({ to: "/app" })}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Meus Casos</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-veritas-silver hover:bg-white/5">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-veritas-silver hover:bg-white/5">
              <Filter className="w-5 h-5" />
            </Button>
            <Button 
              size="icon" 
              className="bg-veritas-electric hover:bg-veritas-electric/90 text-white rounded-full w-8 h-8"
              onClick={() => navigate({ to: "/app/cases/new/process" })}
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-veritas-silver/40 group-focus-within:text-veritas-electric transition-colors" />
          <Input 
            placeholder="Buscar por processo, pessoa ou assunto" 
            className="pl-11 bg-veritas-graphite/40 border-white/5 focus-visible:ring-veritas-electric/20 h-12"
          />
        </div>

        {/* Horizontal Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                activeFilter === filter 
                  ? "bg-veritas-electric border-veritas-electric text-white" 
                  : "bg-veritas-graphite/40 border-white/5 text-veritas-silver/60 hover:border-white/20"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      {/* Cases List */}
      <main className="px-6 space-y-4">
        {filteredCases.map((c) => (
          <Card 
            key={c.id} 
            className="bg-veritas-graphite/40 border-white/5 hover:border-white/10 transition-all shadow-md overflow-hidden group active:scale-[0.98]"
            onClick={() => navigate({ to: "/app/cases/demo-case" })}
          >
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="space-y-1">
                  <p className="text-[11px] font-mono text-veritas-silver/40 uppercase tracking-tighter">{c.id}</p>
                  <h4 className="font-bold text-veritas-silver group-hover:text-white transition-colors text-sm leading-tight">
                    {c.type}
                  </h4>
                  <p className="text-xs text-veritas-electric/80 font-medium">{c.specialty}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-veritas-silver/30 -mr-2">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-y-3 mb-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-veritas-silver/30 uppercase font-bold tracking-wider">Status</p>
                  <Badge variant="outline" className={`rounded-full border text-[10px] py-0 px-2 font-bold ${c.statusColor}`}>
                    {c.status}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-veritas-silver/30 uppercase font-bold tracking-wider">Prazo</p>
                  <div className="flex items-center gap-1.5 text-xs text-veritas-silver/60">
                    <Calendar className="w-3 h-3" />
                    <span>{c.deadline}</span>
                  </div>
                </div>
                <div className="col-span-2 space-y-1">
                  <p className="text-[10px] text-veritas-silver/30 uppercase font-bold tracking-wider">Comarca</p>
                  <p className="text-xs text-veritas-silver/60">{c.court}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] text-veritas-silver/40">
                  <Clock className="w-3 h-3" />
                  <span>Última atualização: {c.lastActivity}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>

      {/* Floating Action Button */}
      <Button 
        className="fixed right-6 bottom-28 w-14 h-14 rounded-full bg-veritas-electric veritas-button-glow shadow-2xl shadow-veritas-electric/40 z-40 p-0"
        onClick={() => navigate({ to: "/app/cases/new/process" })}
      >
        <Plus className="w-8 h-8 text-white" />
      </Button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-veritas-graphite-dark/95 backdrop-blur-xl border-t border-white/5 px-6 flex items-center justify-between z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <Button 
          variant="ghost" 
          className="flex flex-col gap-1 items-center text-veritas-silver/40 h-auto py-2"
          onClick={() => navigate({ to: "/app" })}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold">Início</span>
        </Button>
        <Button 
          variant="ghost" 
          className="flex flex-col gap-1 items-center text-veritas-electric h-auto py-2"
          onClick={() => navigate({ to: "/app/cases" })}
        >
          <Briefcase className="w-6 h-6" />
          <span className="text-[10px] font-bold">Casos</span>
        </Button>
        
        {/* Special Center Button */}
        <div className="relative -mt-12 group">
          <div className="absolute inset-0 bg-veritas-electric/20 rounded-full blur-xl group-hover:bg-veritas-electric/30 transition-colors"></div>
          <Button 
            className="w-16 h-16 rounded-full bg-veritas-electric veritas-button-glow relative z-10 p-0 shadow-2xl shadow-veritas-electric/40"
            onClick={() => navigate({ to: "/app/record" })}
          >
            <Mic className="w-8 h-8 text-white" />
          </Button>
        </div>

        <Button 
          variant="ghost" 
          className="flex flex-col gap-1 items-center text-veritas-silver/40 h-auto py-2"
          onClick={() => navigate({ to: "/app/veritas" })}
        >
          <Zap className="w-6 h-6" />
          <span className="text-[10px] font-bold">Veritas</span>
        </Button>
        <Button 
          variant="ghost" 
          className="flex flex-col gap-1 items-center text-veritas-silver/40 h-auto py-2"
          onClick={() => navigate({ to: "/app/profile" })}
        >
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold">Perfil</span>
        </Button>
      </nav>
    </div>
  );
}