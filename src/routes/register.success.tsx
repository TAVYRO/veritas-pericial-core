import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/register/success")({
  component: RegisterSuccess,
});

function RegisterSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen veritas-hero-gradient flex flex-col items-center justify-center p-6 text-center">
      {/* Veritas Logo / Symbol with Animation */}
      <div className="relative mb-8 flex flex-col items-center">
        <div className="absolute inset-0 animate-ping bg-veritas-electric-blue/10 rounded-full scale-150"></div>
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-veritas-graphite-dark border border-veritas-electric-blue/30 shadow-[0_0_50px_rgba(59,130,246,0.3)] animate-float">
          <div className="absolute inset-0 rounded-full border border-veritas-electric-blue/20 animate-spin-slow"></div>
          <ShieldCheck className="w-12 h-12 text-veritas-electric-blue" />
        </div>
        <div className="mt-4 flex items-center justify-center w-8 h-8 rounded-full bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]">
          <Check className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Main Message */}
      <div className="space-y-3 max-w-sm mb-10">
        <h1 className="text-4xl font-bold text-white tracking-tight">Tudo pronto!</h1>
        <p className="text-veritas-silver text-lg">Seu ambiente Veritas está preparado.</p>
      </div>

      {/* Demo Profile Card */}
      <Card className="w-full max-w-sm veritas-card border-veritas-electric-blue/20 mb-12 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 text-left">
            <Avatar className="w-16 h-16 border border-veritas-electric-blue/30 bg-veritas-graphite-dark">
              <AvatarFallback className="bg-transparent text-veritas-silver">
                <User className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white">Dra. Mônica Hazama</h4>
              <p className="text-sm text-veritas-silver">Psicóloga Perita</p>
              <p className="text-xs text-veritas-silver/60">CRP 00/00000</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Primary Action */}
      <div className="w-full max-w-sm space-y-4">
        <Button
          className="w-full h-14 text-lg font-bold veritas-button-glow veritas-button-scale"
          onClick={() => navigate({ to: "/app" })}
        >
          Acessar Veritas
        </Button>
      </div>
    </div>
  );
}
