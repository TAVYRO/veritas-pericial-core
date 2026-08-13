import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { WifiOff, RefreshCw, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/offline")({
  component: OfflinePage,
});

function OfflinePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen veritas-hero-gradient flex flex-col items-center justify-center p-6 text-center text-white">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 space-y-8 max-w-sm animate-fade-in-up">
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-veritas-electric/20 rounded-full blur-2xl animate-pulse-glow" />
          <div className="relative w-20 h-20 rounded-3xl bg-veritas-graphite border border-white/10 flex items-center justify-center shadow-2xl">
            <WifiOff className="w-10 h-10 text-veritas-electric" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-black tracking-tight">Você está offline</h1>
          <p className="text-veritas-silver/60 text-sm leading-relaxed">
            O Veritas continua disponível, mas alguns recursos exigem conexão com a internet.
          </p>
        </div>

        <div className="space-y-3 pt-4">
          <Button
            className="w-full h-12 bg-veritas-electric hover:bg-veritas-electric-glow text-veritas-ink font-bold gap-2 rounded-xl transition-all active:scale-[0.98]"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-4 h-4" />
            Tentar novamente
          </Button>

          <Button
            variant="ghost"
            className="w-full h-12 text-veritas-silver hover:bg-white/5 gap-2 rounded-xl"
            onClick={() => navigate({ to: "/" })}
          >
            <Home className="w-4 h-4" />
            Ir para o início
          </Button>
        </div>
      </div>
    </div>
  );
}
