import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Shield, Mic, Share2, Zap, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Bem-vindo — Veritas Pericial" },
      { name: "description", content: "Conheça o Veritas Pericial." },
      { property: "og:title", content: "Bem-vindo — Veritas Pericial" },
      { property: "og:description", content: "Conheça o Veritas Pericial." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OnboardingPage,
});

interface Slide {
  title: string;
  description: string;
  icon: React.ReactNode;
  items?: string[];
}

const slides: Slide[] = [
  {
    title: "Sua perícia organizada em um só lugar",
    description: "Gerencie processos, documentos e avaliações com foco na eficiência profissional.",
    icon: <Shield className="w-16 h-16 text-veritas-electric" />,
  },
  {
    title: "Registre entrevistas e informações",
    description: "Capture relatos e dados diretamente no aplicativo com segurança e organização.",
    icon: <Mic className="w-16 h-16 text-veritas-violet" />,
  },
  {
    title: "Toda informação mantém sua origem",
    description: "Documentos, relatos, observações e fontes categorizados para total rastreabilidade.",
    items: ["Documento", "Relato", "Observação", "Fonte"],
    icon: <Share2 className="w-16 h-16 text-blue-400" />,
  },
  {
    title: "Veritas auxilia. O profissional decide.",
    description: "A Veritas organiza, estrutura e verifica. A avaliação e decisão permanecem sob responsabilidade profissional.",
    icon: <Zap className="w-16 h-16 text-amber-400" />,
  },
  {
    title: "Nada é finalizado sem sua revisão",
    description: "Fluxo de trabalho transparente com auditoria e aprovação em cada etapa.",
    items: ["Rascunho", "Auditoria", "Revisão", "Aprovação", "Final"],
    icon: <CheckCircle2 className="w-16 h-16 text-green-400" />,
  },
];

function OnboardingPage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const next = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate({ to: "/login" });
    }
  };

  const prev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const skip = () => {
    navigate({ to: "/login" });
  };

  const slide = slides[currentSlide];
  if (!slide) return null;

  return (
    <div className="min-h-screen veritas-hero-gradient flex flex-col p-6 text-white relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-20%] w-96 h-96 bg-veritas-electric/10 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-[-10%] left-[-20%] w-96 h-96 bg-veritas-violet/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Skip Button */}
      <header className="flex justify-end pt-2">
        <Button 
          variant="ghost" 
          className="text-veritas-silver/60 hover:text-veritas-electric transition-colors"
          onClick={skip}
        >
          Pular
        </Button>
      </header>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center relative z-10 py-12">
        <div key={currentSlide} className="animate-fade-in-up space-y-8 max-w-sm">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full" />
              <div className="relative p-6 rounded-3xl bg-veritas-graphite/40 border border-white/5 shadow-2xl backdrop-blur-sm">
                {slide.icon}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-black tracking-tight leading-tight px-4">
              {slide.title}
            </h1>
            <p className="text-veritas-silver/60 text-base px-6">
              {slide.description}
            </p>
          </div>

          {slide.items && (
            <div className="flex flex-wrap justify-center gap-2 pt-2 px-4">
              {slide.items.map((item, i) => (
                <div 
                  key={i} 
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-veritas-silver/80"
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="pt-8 pb-4 space-y-8 relative z-10">
        {/* Indicators */}
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <div 
              key={i}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                i === currentSlide ? "w-8 bg-veritas-electric" : "w-2 bg-white/10"
              )}
            />
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            className={cn(
              "flex-1 h-14 rounded-2xl text-veritas-silver hover:bg-white/5 gap-2",
              currentSlide === 0 && "invisible"
            )}
            onClick={prev}
          >
            <ChevronLeft className="w-5 h-5" />
            Voltar
          </Button>

          <Button
            className="flex-[2] h-14 rounded-2xl bg-veritas-electric hover:bg-veritas-electric-glow text-veritas-ink font-bold text-lg gap-2 veritas-button-glow transition-all active:scale-[0.98]"
            onClick={next}
          >
            {currentSlide === slides.length - 1 ? "Começar" : "Próximo"}
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </footer>

      {/* Grid Pattern */}
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
