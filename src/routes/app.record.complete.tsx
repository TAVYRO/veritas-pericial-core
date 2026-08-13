import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Clock, 
  Flag,
  FileText,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/veritas/BottomNavigation";

export const Route = createFileRoute("/app/record/complete")({
  component: RecordCompletePage,
});

function RecordCompletePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[100dvh] veritas-hero-gradient pb-[calc(6rem+env(safe-area-inset-bottom))] text-white relative">
      <main className="px-6 pt-[calc(env(safe-area-inset-top)+3rem)] pb-8 flex flex-col items-center text-center">
        {/* Success Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-veritas-electric/20 rounded-full blur-3xl animate-pulse" />
          <div className="w-24 h-24 rounded-full bg-veritas-electric/10 border border-veritas-electric/20 flex items-center justify-center relative z-10">
            <CheckCircle2 className="w-12 h-12 text-veritas-electric" />
          </div>
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-2">Entrevista finalizada</h1>
        <p className="text-veritas-silver/60 text-sm max-w-[280px]">
          A gravação foi salva com sucesso e enviada para processamento.
        </p>

        {/* Session Summary Card */}
        <Card className="w-full bg-veritas-graphite/40 border-white/5 mt-10 text-left overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-1">
              <p className="text-[10px] font-mono text-veritas-silver/40 uppercase tracking-tighter">Proc. 0003512-93.2025.8.16</p>
              <h3 className="text-xl font-bold text-veritas-silver">Marta Silva</h3>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-veritas-silver/40">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Duração</span>
                </div>
                <p className="text-lg font-mono font-bold">42:15</p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-veritas-silver/40">
                  <Flag className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Marcadores</span>
                </div>
                <p className="text-lg font-mono font-bold">14</p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-veritas-silver/40 uppercase tracking-wider">Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-xs font-bold text-amber-500">Aguardando transcrição</span>
                </div>
              </div>
              <Badge variant="outline" className="bg-veritas-electric/10 text-veritas-electric border-veritas-electric/20 text-[10px] font-bold uppercase tracking-wider">
                Veritas AI
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="w-full mt-10 space-y-4">
          <Button 
            className="w-full h-14 text-lg font-bold veritas-button-glow veritas-button-scale gap-2"
            onClick={() => navigate({ to: "/app/veritas" })} // Assuming transcription will be here or a dedicated view
          >
            Ver transcrição
            <ArrowRight className="w-5 h-5" />
          </Button>
          
          <Button 
            variant="ghost"
            className="w-full h-14 text-veritas-silver hover:bg-white/5 font-bold gap-2"
            onClick={() => navigate({ to: "/app/cases/demo-case" })}
          >
            <Briefcase className="w-5 h-5" />
            Voltar ao caso
          </Button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}