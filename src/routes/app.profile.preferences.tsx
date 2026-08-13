import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Moon, Bell, Download, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/profile/preferences")({
  component: ProfilePreferencesPage,
});

function ProfilePreferencesPage() {
  const navigate = useNavigate();
  const scrolled = useScroll(10);

  const preferences = [
    { label: "Tema escuro", icon: Moon, description: "Ativar interface Graphite Dark.", type: "switch", value: true },
    { label: "Notificações push", icon: Bell, description: "Alertas de prazos e transcrições.", type: "switch", value: true },
    { label: "Instalação PWA", icon: Download, description: "Gerenciar atalho no dispositivo.", type: "action" },
    { label: "Idioma", icon: Globe, description: "Português (BR)", type: "action" },
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
          onClick={() => navigate({ to: "/app/profile" })}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h2 className="text-xl font-bold tracking-tight">Preferências</h2>
      </header>

      <main className="p-6 space-y-4">
        {preferences.map((pref) => (
          <div key={pref.label} className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-white/[0.08] transition-all">
            <div className="flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-white/5 text-veritas-silver/60 group-hover:text-white transition-colors">
                <pref.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">{pref.label}</h4>
                <p className="text-[10px] text-veritas-silver/40">{pref.description}</p>
              </div>
            </div>
            {pref.type === "switch" ? (
              <Switch checked={pref.value as boolean} />
            ) : (
              <Button variant="ghost" size="sm" className="text-veritas-electric text-[10px] font-bold uppercase tracking-widest">
                Gerenciar
              </Button>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
