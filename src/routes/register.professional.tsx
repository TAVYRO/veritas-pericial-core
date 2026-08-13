import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Briefcase, Award, FileText, Hash, MapPin, Globe } from "lucide-react";

export const Route = createFileRoute("/register/professional")({
  component: ProfessionalRegisterPage,
});

function ProfessionalRegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profession: "",
    specialty: "",
    council: "",
    registrationNumber: "",
    state: "",
    region: "",
  });

  const professions = [
    "Psicólogo(a)",
    "Assistente Social",
    "Médico(a)",
    "Perito(a)",
    "Outro",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/register/profile" });
  };

  return (
    <div className="min-h-screen veritas-hero-gradient flex flex-col p-6 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-5%] left-[-10%] w-72 h-72 bg-veritas-electric/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[10%] right-[-10%] w-64 h-64 bg-veritas-violet/5 rounded-full blur-3xl" />

      {/* Header */}
      <header className="relative z-10 mb-8 animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate({ to: "/register" })}
            className="text-veritas-silver hover:text-veritas-electric hover:bg-white/5 transition-colors rounded-full"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="text-right">
            <span className="text-veritas-electric text-xs font-bold uppercase tracking-widest">Etapa 2 de 3</span>
            <h1 className="text-xl font-bold text-veritas-silver">Dados profissionais</h1>
          </div>
        </div>
        <div className="space-y-2">
          <Progress value={66} className="h-1.5 bg-white/10" />
          <div className="flex justify-between text-[10px] text-veritas-silver-dim uppercase tracking-tighter font-medium">
            <span className="text-veritas-electric/60">Pessoal</span>
            <span className="text-veritas-electric">Profissional</span>
            <span>Segurança</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-md mx-auto w-full relative z-10 overflow-y-auto pb-12 custom-scrollbar">
        <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          
          {/* Profession Select */}
          <div className="space-y-1.5">
            <Label htmlFor="profession" className="text-veritas-silver/70 ml-1 text-[10px] uppercase tracking-wider font-bold">
              Profissão
            </Label>
            <Select 
              onValueChange={(value) => setFormData({ ...formData, profession: value })}
              required
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-veritas-silver h-11 focus:border-veritas-electric/50 focus:ring-veritas-electric/20 transition-all rounded-xl pl-10 relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-veritas-silver-dim" />
                <SelectValue placeholder="Selecione sua profissão" />
              </SelectTrigger>
              <SelectContent className="bg-veritas-graphite border-white/10 text-veritas-silver rounded-xl">
                {professions.map((prof) => (
                  <SelectItem key={prof} value={prof} className="focus:bg-veritas-electric/10 focus:text-veritas-electric cursor-pointer">
                    {prof}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Specialty */}
          <div className="space-y-1.5">
            <Label htmlFor="specialty" className="text-veritas-silver/70 ml-1 text-[10px] uppercase tracking-wider font-bold">
              Especialidade
            </Label>
            <div className="relative group">
              <Award className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-veritas-silver-dim group-focus-within:text-veritas-electric transition-colors" />
              <Input
                id="specialty"
                placeholder="Ex: Terapia Cognitivo-Comportamental"
                required
                className="bg-white/5 border-white/10 text-veritas-silver placeholder:text-veritas-silver/30 pl-10 h-11 focus:border-veritas-electric/50 focus:ring-veritas-electric/20 transition-all rounded-xl"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Council */}
            <div className="space-y-1.5">
              <Label htmlFor="council" className="text-veritas-silver/70 ml-1 text-[10px] uppercase tracking-wider font-bold">
                Conselho
              </Label>
              <div className="relative group">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-veritas-silver-dim group-focus-within:text-veritas-electric transition-colors" />
                <Input
                  id="council"
                  placeholder="Ex: CRP"
                  required
                  className="bg-white/5 border-white/10 text-veritas-silver placeholder:text-veritas-silver/30 pl-10 h-11 focus:border-veritas-electric/50 focus:ring-veritas-electric/20 transition-all rounded-xl"
                  value={formData.council}
                  onChange={(e) => setFormData({ ...formData, council: e.target.value })}
                />
              </div>
            </div>

            {/* Registration Number */}
            <div className="space-y-1.5">
              <Label htmlFor="registration" className="text-veritas-silver/70 ml-1 text-[10px] uppercase tracking-wider font-bold">
                Nº Registro
              </Label>
              <div className="relative group">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-veritas-silver-dim group-focus-within:text-veritas-electric transition-colors" />
                <Input
                  id="registration"
                  placeholder="00000-0"
                  required
                  className="bg-white/5 border-white/10 text-veritas-silver placeholder:text-veritas-silver/30 pl-10 h-11 focus:border-veritas-electric/50 focus:ring-veritas-electric/20 transition-all rounded-xl"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* State/UF */}
            <div className="col-span-1 space-y-1.5">
              <Label htmlFor="state" className="text-veritas-silver/70 ml-1 text-[10px] uppercase tracking-wider font-bold">
                Estado/UF
              </Label>
              <div className="relative group">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-veritas-silver-dim group-focus-within:text-veritas-electric transition-colors" />
                <Input
                  id="state"
                  placeholder="UF"
                  maxLength={2}
                  required
                  className="bg-white/5 border-white/10 text-veritas-silver placeholder:text-veritas-silver/30 pl-10 h-11 focus:border-veritas-electric/50 focus:ring-veritas-electric/20 transition-all rounded-xl text-center uppercase"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                />
              </div>
            </div>

            {/* Comarca/Region */}
            <div className="col-span-2 space-y-1.5">
              <Label htmlFor="region" className="text-veritas-silver/70 ml-1 text-[10px] uppercase tracking-wider font-bold">
                Comarca/Região
              </Label>
              <div className="relative group">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-veritas-silver-dim group-focus-within:text-veritas-electric transition-colors" />
                <Input
                  id="region"
                  placeholder="Ex: São Paulo - Capital"
                  required
                  className="bg-white/5 border-white/10 text-veritas-silver placeholder:text-veritas-silver/30 pl-10 h-11 focus:border-veritas-electric/50 focus:ring-veritas-electric/20 transition-all rounded-xl"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              type="button"
              variant="outline"
              onClick={() => navigate({ to: "/register" })}
              className="flex-1 h-12 border-white/10 text-veritas-silver hover:bg-white/5 hover:border-veritas-electric/30 transition-all rounded-xl font-semibold"
            >
              Voltar
            </Button>
            <Button 
              type="submit" 
              className="flex-[2] h-12 bg-veritas-electric hover:bg-veritas-electric-glow text-veritas-ink font-bold text-base shadow-[0_0_20px_-5px_rgba(101,217,255,0.4)] hover:shadow-[0_0_25px_-2px_rgba(101,217,255,0.5)] transition-all active:scale-[0.98] rounded-xl"
            >
              Continuar
            </Button>
          </div>
        </form>
      </main>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)`,
          backgroundSize: '32px 32px' 
        }} 
      />
    </div>
  );
}