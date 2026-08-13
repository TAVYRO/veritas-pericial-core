import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  User,
  Settings,
  ShieldCheck,
  Download,
  Info,
  LogOut,
  ChevronRight,
  MapPin,
  Camera,
  Signature,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/veritas/BottomNavigation";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";

export const Route = createFileRoute("/app/profile/")({
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const scrolled = useScroll(10);

  const menuItems = [
    {
      label: "Editar perfil",
      icon: User,
      route: "/app/profile/edit",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Segurança",
      icon: ShieldCheck,
      route: "/app/profile/security",
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      label: "Preferências",
      icon: Settings,
      route: "/app/profile/preferences",
      color: "text-veritas-electric",
      bg: "bg-veritas-electric/10",
    },
    {
      label: "Instalar Veritas / PWA",
      icon: Download,
      action: () => alert("Informações da PWA"),
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
    {
      label: "Sobre",
      icon: Info,
      action: () => alert("Veritas Pericial v1.0.0"),
      color: "text-veritas-silver",
      bg: "bg-veritas-silver/10",
    },
  ];

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
        <h2 className="text-xl font-bold tracking-tight">Meu Perfil</h2>
      </header>

      <div className="px-6 mb-8 mt-4 flex flex-col items-center">
        <div className="relative mb-4">
          <Avatar className="w-24 h-24 border-4 border-veritas-electric/20 shadow-2xl">
            <AvatarImage src="" />
            <AvatarFallback className="bg-veritas-graphite text-3xl text-veritas-silver">
              MH
            </AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            className="absolute bottom-0 right-0 rounded-full w-8 h-8 bg-veritas-electric hover:bg-veritas-electric-glow p-0 shadow-lg"
          >
            <Camera className="w-4 h-4" />
          </Button>
        </div>
        <h3 className="text-xl font-bold">Dra. Mônica Hazama</h3>
        <p className="text-veritas-silver/60 text-sm mb-2">Psicóloga Perita</p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <Badge
            variant="outline"
            className="bg-white/5 border-white/10 text-[10px] text-veritas-silver/60"
          >
            CRP 00/00000
          </Badge>
          <Badge
            variant="outline"
            className="bg-white/5 border-white/10 text-[10px] text-veritas-silver/60 flex items-center gap-1"
          >
            <MapPin className="w-3 h-3" /> Curitiba - PR
          </Badge>
        </div>
      </div>

      <div className="px-6 mb-8">
        <Card className="bg-veritas-graphite/40 border-veritas-electric/20 veritas-card shadow-lg">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-veritas-electric/10 text-veritas-electric">
              <Signature className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-sm">Assinatura Digital</p>
              <p className="text-[10px] text-green-400 mb-1">CADASTRADA E PROTEGIDA</p>
              <p className="text-[9px] text-veritas-silver/40 leading-tight">
                O cadastro não autoriza o uso da assinatura. A autorização ocorre por caso e versão.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="px-6 space-y-3">
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="w-full h-auto py-4 px-4 justify-between bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-2xl transition-all group"
            onClick={() => (item.route ? navigate({ to: item.route as any }) : item.action?.())}
          >
            <div className="flex items-center gap-4">
              <div className={cn("p-2 rounded-xl", item.bg, item.color)}>
                <item.icon className="w-5 h-5" />
              </div>
              <span className="font-bold text-veritas-silver group-hover:text-white transition-colors">
                {item.label}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-veritas-silver/20" />
          </Button>
        ))}

        <Button
          variant="ghost"
          className="w-full h-auto py-4 px-4 justify-between bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 rounded-2xl transition-all group mt-4"
          onClick={() => navigate({ to: "/login" })}
        >
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-xl bg-red-500/10 text-red-400">
              <LogOut className="w-5 h-5" />
            </div>
            <span className="font-bold text-red-400">Sair</span>
          </div>
        </Button>
      </div>

      <BottomNavigation />
    </div>
  );
}
