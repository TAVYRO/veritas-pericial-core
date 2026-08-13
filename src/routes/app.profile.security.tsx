import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Key, Smartphone, Fingerprint, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/profile/security")({
  component: ProfileSecurityPage,
});

function ProfileSecurityPage() {
  const navigate = useNavigate();
  const scrolled = useScroll(10);

  const securityItems = [
    { label: "Alterar senha", icon: Key, description: "Atualize sua credencial de acesso." },
    { label: "Autenticação em 2 fatores (2FA)", icon: Smartphone, description: "Camada extra de proteção via app ou SMS.", status: "ATIVAR" },
    { label: "Biometria", icon: Fingerprint, description: "Acesso rápido via digital ou face.", status: "ATIVAR" },
    { label: "Sessões ativas", icon: LogOut, description: "Gerencie aparelhos conectados." },
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
        <h2 className="text-xl font-bold tracking-tight">Segurança</h2>
      </header>

      <main className="p-6 space-y-4">
        {securityItems.map((item) => (
          <div key={item.label} className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-2 relative group hover:bg-white/[0.08] transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-veritas-electric/10 text-veritas-electric">
                  <item.icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white">{item.label}</h4>
              </div>
              {item.status && <span className="text-[9px] font-bold uppercase tracking-widest text-veritas-electric/60 bg-veritas-electric/5 px-2 py-0.5 rounded-full">{item.status}</span>}
            </div>
            <p className="text-xs text-veritas-silver/40 leading-relaxed pl-[44px]">{item.description}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
