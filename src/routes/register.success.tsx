import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, LayoutDashboard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/register/success")({
  component: RegisterSuccess,
});

function RegisterSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen veritas-hero-gradient flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-ping bg-veritas-electric-blue/20 rounded-full"></div>
        <div className="relative bg-veritas-electric-blue rounded-full p-6 shadow-[0_0_40px_rgba(59,130,246,0.5)]">
          <CheckCircle2 className="w-16 h-16 text-white" />
        </div>
      </div>

      <div className="space-y-4 max-w-sm">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Cadastro concluído!
        </h1>
        <p className="text-veritas-silver text-lg leading-relaxed">
          Seja bem-vindo ao Veritas Pericial. Seu ambiente profissional já está pronto para uso.
        </p>
      </div>

      <div className="w-full max-w-sm mt-12 space-y-4">
        <Button
          className="w-full h-14 text-lg font-bold veritas-button-glow veritas-button-scale flex items-center justify-center gap-2"
          onClick={() => navigate({ to: "/app" })}
        >
          Acessar Dashboard
          <LayoutDashboard className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          className="w-full h-12 text-veritas-silver hover:text-white hover:bg-white/5 flex items-center justify-center gap-2"
          onClick={() => navigate({ to: "/app" })}
        >
          Explorar ferramentas
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
