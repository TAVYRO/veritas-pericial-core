import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Camera, Image as ImageIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export const Route = createFileRoute("/register/profile")({
  component: RegisterProfile,
});

function RegisterProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    registration: "",
  });

  return (
    <div className="min-h-screen veritas-hero-gradient pb-10">
      <div className="max-w-md mx-auto px-6 pt-8">
        {/* Header */}
        <header className="mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="mb-6 text-veritas-silver hover:text-white hover:bg-white/10"
            onClick={() => navigate({ to: "/register/professional" })}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Seu perfil profissional
            </h1>
            <div className="flex items-center justify-between text-sm text-veritas-silver">
              <span>Etapa 3 de 3</span>
              <span className="text-veritas-electric-blue font-medium flex items-center gap-1">
                <Check className="w-4 h-4" /> Progresso completo
              </span>
            </div>
            <Progress value={100} className="h-2 bg-white/10" />
          </div>
        </header>

        <main className="space-y-8">
          {/* Photo Section */}
          <section className="flex flex-col items-center gap-4">
            <div className="relative group">
              <Avatar className="w-28 h-28 border-2 border-veritas-electric-blue/30 bg-veritas-graphite-dark shadow-2xl shadow-veritas-electric-blue/10">
                <AvatarFallback className="bg-transparent text-veritas-silver/30">
                  <Camera className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full w-9 h-9 bg-veritas-electric-blue hover:bg-veritas-electric-blue/90 border-2 border-veritas-graphite-dark shadow-lg scale-hover"
              >
                <Camera className="w-4 h-4 text-white" />
              </Button>
            </div>
            <span className="text-xs text-veritas-silver/60 uppercase tracking-widest font-semibold">
              Foto de perfil
            </span>
          </section>

          {/* Form Fields */}
          <section className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="professional-name" className="text-veritas-silver font-medium">
                Nome que aparecerá profissionalmente
              </Label>
              <Input
                id="professional-name"
                placeholder="Ex: Dra. Mônica Hazama"
                className="veritas-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="professional-title" className="text-veritas-silver font-medium">
                Cargo ou especialidade
              </Label>
              <Input
                id="professional-title"
                placeholder="Ex: Psicóloga"
                className="veritas-input"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="professional-id" className="text-veritas-silver font-medium">
                Identificação profissional
              </Label>
              <Input
                id="professional-id"
                placeholder="Ex: CRP 00/00000"
                className="veritas-input"
                value={formData.registration}
                onChange={(e) => setFormData({ ...formData, registration: e.target.value })}
              />
            </div>
          </section>

          {/* Optional Logo Area */}
          <section className="p-4 rounded-xl border border-dashed border-veritas-silver/20 bg-white/5 flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center text-veritas-silver/40">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-veritas-silver">Adicionar logotipo profissional</p>
              <p className="text-xs text-veritas-silver/40">(Opcional)</p>
            </div>
            <Button variant="outline" size="sm" className="h-8 border-veritas-silver/20 text-veritas-silver hover:bg-white/5">
              Escolher arquivo
            </Button>
          </section>

          {/* Preview Card */}
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-veritas-silver/60 uppercase tracking-wider ml-1">
              Como seu perfil aparecerá
            </h3>
            
            <Card className="veritas-card overflow-hidden border-veritas-electric-blue/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-veritas-electric-blue/10 border border-veritas-electric-blue/20 flex items-center justify-center text-veritas-electric-blue">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white">
                      {formData.name || "Dra. Mônica Hazama"}
                    </h4>
                    <p className="text-sm text-veritas-silver">
                      {formData.title || "Psicóloga"} • {formData.registration || "CRP 00/00000"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Navigation Buttons */}
          <footer className="flex flex-col gap-3 pt-4">
            <Button
              className="w-full h-14 text-lg font-bold veritas-button-glow veritas-button-scale"
              onClick={() => navigate({ to: "/register/success" })}
            >
              Finalizar cadastro
            </Button>
            <Button
              variant="ghost"
              className="w-full h-12 text-veritas-silver hover:text-white hover:bg-white/5"
              onClick={() => navigate({ to: "/register/professional" })}
            >
              Voltar
            </Button>
          </footer>
        </main>
      </div>
    </div>
  );
}
