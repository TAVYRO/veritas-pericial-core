import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User as UserIcon,
  Users,
  FileText,
  Briefcase,
  Info,
  ChevronRight,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BottomNavigation } from "@/components/veritas/BottomNavigation";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/record")({
  component: RecordPreparationPage,
});

function RecordPreparationPage() {
  const navigate = useNavigate();
  const scrolled = useScroll(10);

  // Fictitious data for selects
  const processes = [
    { id: "0003512-93", title: "0003512-93.2025 - Guarda e União Estável" },
    { id: "0012478-22", title: "0012478-22.2026 - Avaliação Psicossocial" },
    { id: "0009842-15", title: "0009842-15.2025 - Interdição e Curatela" },
  ];

  const people = [
    { name: "Marta Silva", role: "Requerente" },
    { name: "João Pereira", role: "Requerido" },
    { name: "Ana Oliveira", role: "Testemunha" },
  ];

  const interviewObjectives = [
    "Dinâmica familiar e vínculos afetivos",
    "Capacidade civil e autonomia do idoso",
    "Verificação de situação de vulnerabilidade",
    "Identificação de alienação parental",
  ];

  return (
    <div className="min-h-[100dvh] veritas-hero-gradient pb-[calc(6rem+env(safe-area-inset-bottom))] text-white relative">
      {/* Header - Sticky */}
      <header
        className={cn(
          "sticky top-0 z-50 flex flex-col transition-all duration-300",
          scrolled
            ? "bg-veritas-graphite/90 backdrop-blur-xl border-b border-white/5 shadow-lg"
            : "bg-transparent",
        )}
      >
        <div className="px-6 pt-[calc(env(safe-area-inset-top)+1.5rem)] flex items-center justify-between pb-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-veritas-silver -ml-2 hover:bg-white/5"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Nova Entrevista</h1>
          </div>
        </div>
      </header>

      <main className="px-6 py-4 space-y-8">
        {/* Basic Info Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <Label className="text-veritas-silver/60 text-xs font-bold uppercase tracking-wider">
              Processo Vinculado
            </Label>
            <Select>
              <SelectTrigger className="bg-veritas-graphite/40 border-white/5 h-12 focus:ring-veritas-electric/20">
                <SelectValue placeholder="Selecione o processo" />
              </SelectTrigger>
              <SelectContent className="bg-veritas-graphite border-white/10 text-white">
                {processes.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-veritas-silver/60 text-xs font-bold uppercase tracking-wider">
                Pessoa
              </Label>
              <Select>
                <SelectTrigger className="bg-veritas-graphite/40 border-white/5 h-12 focus:ring-veritas-electric/20">
                  <SelectValue placeholder="Entrevistado" />
                </SelectTrigger>
                <SelectContent className="bg-veritas-graphite border-white/10 text-white">
                  {people.map((p) => (
                    <SelectItem key={p.name} value={p.name}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-veritas-silver/60 text-xs font-bold uppercase tracking-wider">
                Vínculo
              </Label>
              <Input
                placeholder="Ex: Requerente"
                className="bg-veritas-graphite/40 border-white/5 h-12 focus-visible:ring-veritas-electric/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-veritas-silver/60 text-xs font-bold uppercase tracking-wider">
              Profissional Responsável
            </Label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-veritas-silver/40" />
              <Input
                defaultValue="Dra. Mônica Hazama"
                readOnly
                className="pl-11 bg-veritas-graphite/40 border-white/5 h-12 text-veritas-silver/60"
              />
            </div>
          </div>
        </section>

        {/* Logistic Info */}
        <section className="space-y-6">
          <h3 className="text-sm font-bold text-veritas-electric flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Detalhes Logísticos
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-veritas-silver/60 text-xs font-bold uppercase tracking-wider">
                Modalidade
              </Label>
              <Select defaultValue="presencial">
                <SelectTrigger className="bg-veritas-graphite/40 border-white/5 h-12 focus:ring-veritas-electric/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-veritas-graphite border-white/10 text-white">
                  <SelectItem value="presencial">Presencial</SelectItem>
                  <SelectItem value="online">Videoconferência</SelectItem>
                  <SelectItem value="domiciliar">Visita Domiciliar</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-veritas-silver/60 text-xs font-bold uppercase tracking-wider">
                Data
              </Label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-veritas-silver/40" />
                <Input
                  type="date"
                  className="pl-11 bg-veritas-graphite/40 border-white/5 h-12 focus-visible:ring-veritas-electric/20 invert-calendar-icon"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-veritas-silver/60 text-xs font-bold uppercase tracking-wider">
              Local / Plataforma
            </Label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-veritas-silver/40" />
              <Input
                placeholder="Ex: Fórum Central - Sala 204"
                className="pl-11 bg-veritas-graphite/40 border-white/5 h-12 focus-visible:ring-veritas-electric/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-veritas-silver/60 text-xs font-bold uppercase tracking-wider">
              Observação Inicial
            </Label>
            <Textarea
              placeholder="Notas prévias sobre a situação ou contexto..."
              className="bg-veritas-graphite/40 border-white/5 min-h-[100px] focus-visible:ring-veritas-electric/20"
            />
          </div>
        </section>

        {/* Objectives Card */}
        <section>
          <Card className="bg-veritas-violet/5 border-veritas-violet/20 overflow-hidden">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-veritas-violet/20 text-veritas-violet">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-veritas-silver text-sm">
                    Objetivos desta entrevista
                  </h4>
                  <p className="text-[10px] text-veritas-silver/40 tracking-wider uppercase font-medium">
                    Vinculados ao Estudo Social
                  </p>
                </div>
              </div>
              <ul className="space-y-2">
                {interviewObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-veritas-silver/70">
                    <div className="w-1.5 h-1.5 rounded-full bg-veritas-violet mt-1.5 shrink-0" />
                    {obj}
                  </li>
                ))}
              </ul>
              <Button
                variant="ghost"
                className="w-full text-xs text-veritas-violet hover:bg-veritas-violet/10 gap-2 font-bold uppercase tracking-wider"
              >
                Editar objetivos <ChevronRight className="w-3 h-3" />
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Start Button */}
        <div className="pt-4">
          <Button
            className="w-full h-16 text-lg font-bold veritas-button-glow veritas-button-scale gap-3 shadow-2xl shadow-veritas-electric/20"
            onClick={() => navigate({ to: "/app/record/session" })}
          >
            <Play className="w-6 h-6 fill-current" />
            Iniciar entrevista
          </Button>
          <p className="text-center text-[10px] text-veritas-silver/30 mt-4 uppercase tracking-[0.2em] font-bold">
            Gravação criptografada ponta-a-ponta
          </p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
