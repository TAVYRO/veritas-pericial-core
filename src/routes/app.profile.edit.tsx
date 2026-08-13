import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Save, User, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/profile/edit")({
  component: ProfileEditPage,
});

function ProfileEditPage() {
  const navigate = useNavigate();
  const scrolled = useScroll(10);

  return (
    <div className="min-h-[100dvh] veritas-hero-gradient pb-[calc(6rem+env(safe-area-inset-bottom))] text-white relative">
      <header
        className={cn(
          "sticky top-0 z-50 px-6 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-6 flex items-center justify-between transition-all duration-300",
          scrolled
            ? "bg-veritas-graphite/90 backdrop-blur-xl border-b border-white/5 shadow-lg"
            : "bg-transparent",
        )}
      >
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-veritas-silver hover:bg-white/5"
            onClick={() => navigate({ to: "/app/profile" })}
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h2 className="text-xl font-bold tracking-tight">Editar Perfil</h2>
        </div>
        <Button
          size="sm"
          className="bg-veritas-electric hover:bg-veritas-electric-glow gap-2 font-bold rounded-xl"
        >
          <Save className="w-4 h-4" /> Salvar
        </Button>
      </header>

      <main className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white/40 uppercase tracking-widest text-[10px] font-bold">
              Nome Profissional
            </Label>
            <Input defaultValue="Dra. Mônica Hazama" className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label className="text-white/40 uppercase tracking-widest text-[10px] font-bold">
              Especialidade
            </Label>
            <Input defaultValue="Psicóloga Perita" className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label className="text-white/40 uppercase tracking-widest text-[10px] font-bold">
              Registro Profissional
            </Label>
            <Input defaultValue="CRP 00/00000" className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label className="text-white/40 uppercase tracking-widest text-[10px] font-bold">
              Região de Atuação
            </Label>
            <Input defaultValue="Curitiba - PR" className="bg-white/5 border-white/10" />
          </div>
          <div className="space-y-2">
            <Label className="text-white/40 uppercase tracking-widest text-[10px] font-bold">
              E-mail
            </Label>
            <Input
              defaultValue="monica.hazama@veritas.app"
              className="bg-white/5 border-white/10"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
