import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { 
  FileText, 
  Plus, 
  Upload, 
  Users, 
  Scale, 
  ArrowLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/review")({
  component: ReviewPage,
});

function ReviewPage() {
  const navigate = useNavigate();
  const scrolled = useScroll(10);

  const sections = [
    { 
      title: "Documento", 
      description: "O arquivo principal a ser revisado", 
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    { 
      title: "Fontes de apoio", 
      description: "Documentos, leis ou referências", 
      icon: Upload,
      color: "text-purple-400",
      bg: "bg-purple-400/10"
    },
    { 
      title: "Profissionais", 
      description: "Equipe técnica envolvida", 
      icon: Users,
      color: "text-veritas-electric",
      bg: "bg-veritas-electric/10"
    },
    { 
      title: "Processo", 
      description: "Dados judiciais e contexto", 
      icon: Scale,
      color: "text-veritas-silver",
      bg: "bg-veritas-silver/10"
    },
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
          onClick={() => navigate({ to: "/app/veritas" })}
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h2 className="text-xl font-bold tracking-tight">Revisar Documento</h2>
      </header>

      <main className="p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-bold">Entrada de dados</h3>
          <p className="text-sm text-veritas-silver/60">
            Adicione o documento e as informações de contexto para análise técnica.
          </p>
        </div>

        <div className="grid gap-4">
          {sections.map((section) => (
            <Card key={section.title} className="bg-veritas-graphite/40 border-white/5 hover:border-white/10 transition-all group cursor-pointer">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn("p-3 rounded-2xl", section.bg, section.color)}>
                    <section.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-veritas-silver group-hover:text-white transition-colors">{section.title}</h4>
                    <p className="text-xs text-veritas-silver/40">{section.description}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-veritas-silver/20 group-hover:text-veritas-electric transition-colors">
                  <Plus className="w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="pt-8">
          <Button 
            className="w-full h-14 text-lg font-bold veritas-button-glow veritas-button-scale shadow-2xl shadow-veritas-electric/20"
            onClick={() => navigate({ to: "/app/review/$reviewId/check", params: { reviewId: "demo-review" } })}
          >
            Iniciar Verificação
          </Button>
          <p className="text-[10px] text-center text-veritas-silver/40 mt-4 px-6 italic">
            Interface para revisão visual e técnica baseada em padrões periciais.
          </p>
        </div>
      </main>
    </div>
  );
}
