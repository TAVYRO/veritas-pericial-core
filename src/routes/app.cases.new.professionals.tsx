import { createFileRoute, Link } from "@tanstack/react-router";
import { BottomNavigation } from "@/components/veritas/BottomNavigation";
import { z } from "zod";
import { ChevronRight, User, Check, Building2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const PROFESSIONALS = [
  { id: "p1", name: "Dra. Mônica Hazama", role: "Psicóloga", reg: "CRP 06/12345", initials: "MH" },
  { id: "p2", name: "Dr. Roberto Silva", role: "Assistente Social", reg: "CRESS 12345", initials: "RS" },
  { id: "p3", name: "Dra. Ana Paula", role: "Psicóloga", reg: "CRP 06/54321", initials: "AP" },
];

export const Route = createFileRoute("/app/cases/new/professionals")({
  validateSearch: (search) => z.object({
    mode: z.enum(["automatic", "guided"]).optional(),
    caseNumber: z.string().optional(),
  }).parse(search),
  component: ProfessionalsPage,
});

function ProfessionalsPage() {
  const { mode, caseNumber } = Route.useSearch();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleProfessional = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] pb-24 text-white">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
      
      <header className="sticky top-0 z-50 px-6 pt-[calc(1.5rem+env(safe-area-inset-top))] pb-6 bg-[#0A0D14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <Link to="/app/cases/new/process" search={{ mode }} className="text-white/40 hover:text-white transition-colors">
            Voltar
          </Link>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`w-8 h-1 rounded-full ${s === 2 ? "bg-veritas-electric" : s < 2 ? "bg-veritas-electric/40" : "bg-white/10"}`} />
            ))}
          </div>
          <div className="w-12" />
        </div>
        <h1 className="text-xl font-semibold tracking-tight">Equipe Profissional</h1>
        <p className="text-white/40 text-xs mt-1">Selecione os profissionais responsáveis</p>
      </header>

      <main className="p-6 space-y-6 relative">
        <div className="space-y-3">
          {PROFESSIONALS.map((prof) => (
            <button
              key={prof.id}
              onClick={() => toggleProfessional(prof.id)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left",
                selected.includes(prof.id) 
                  ? "bg-veritas-electric/10 border-veritas-electric/40 shadow-[0_0_20px_rgba(30,174,255,0.1)]" 
                  : "bg-white/5 border-white/5 hover:border-white/10"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border",
                selected.includes(prof.id) ? "bg-veritas-electric text-white border-transparent" : "bg-white/10 text-white/40 border-white/10"
              )}>
                {selected.includes(prof.id) ? <Check className="w-6 h-6" /> : prof.initials}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium truncate">{prof.name}</h3>
                <p className="text-[11px] text-white/40">{prof.role} • {prof.reg}</p>
              </div>
            </button>
          ))}
        </div>

        <Button 
          className="w-full h-14 rounded-2xl bg-veritas-electric hover:bg-veritas-electric/90 text-white font-semibold text-lg disabled:opacity-50"
          disabled={selected.length === 0}
          asChild
        >
          <Link 
            to="/app/cases/new/document-type" 
            search={{ mode, caseNumber, professionals: selected }}
          >
            Continuar
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
      </main>

      <BottomNavigation />
    </div>
  );
}
