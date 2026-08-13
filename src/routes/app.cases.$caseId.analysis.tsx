import { createFileRoute } from "@tanstack/react-router";
import {
  Database,
  ArrowDown,
  Share2,
  AlertCircle,
  Info,
  CheckCircle2,
  FlaskConical,
  Users,
  Zap,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/app/cases/$caseId/analysis")({
  component: AnalysisPage,
});

function AnalysisPage() {
  return (
    <div className="p-6 space-y-8 pb-32">
      <header className="space-y-1">
        <h2 className="text-xl font-bold text-white tracking-tight">Análise Assistida</h2>
        <p className="text-xs text-white/40">
          Visualização técnica das cadeias de raciocínio pericial.
        </p>
      </header>

      <Tabs defaultValue="integração" className="w-full">
        <TabsList className="w-full bg-white/5 border border-white/10 p-1 mb-6">
          <TabsTrigger
            value="psicologia"
            className="flex-1 text-[10px] uppercase tracking-widest font-bold"
          >
            Psicologia
          </TabsTrigger>
          <TabsTrigger
            value="social"
            className="flex-1 text-[10px] uppercase tracking-widest font-bold"
          >
            Serviço Social
          </TabsTrigger>
          <TabsTrigger
            value="integração"
            className="flex-1 text-[10px] uppercase tracking-widest font-bold"
          >
            Integração
          </TabsTrigger>
        </TabsList>

        <TabsContent value="integração" className="space-y-6 animate-fade-in-up">
          <ChainCard
            title="Divergência de Alienação Parental"
            data="Maria afirma que João não vê o filho; F01 (Relato Maria)"
            attribution="Atribuído como comportamento de exclusão"
            interpretation="Interpretação técnica: Há indícios de barreiras de contato, porém sem evidência de dano psicológico grave no momento."
            relation="Quesito 04: Existe alienação?"
            divergences="João (F02) afirma que é impedido de ver o filho."
            limits="Não foi possível observar interação pai/filho presencialmente."
            conclusion="Conclusão sugerida: Observada dinâmica de alta conflitualidade com prejuízo à convivência."
          />
        </TabsContent>

        <TabsContent value="psicologia" className="space-y-6">
          <div className="p-12 text-center text-white/20">
            <FlaskConical className="w-12 h-12 mx-auto mb-4 opacity-10" />
            <p className="text-sm font-medium">
              Análise psicológica específica em processamento...
            </p>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <div className="p-12 text-center text-white/20">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-10" />
            <p className="text-sm font-medium">
              Análise do Serviço Social específico em processamento...
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ChainCard({
  title,
  data,
  attribution,
  interpretation,
  relation,
  divergences,
  limits,
  conclusion,
}: any) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Zap className="w-4 h-4 text-veritas-electric" />
        <h3 className="text-sm font-bold text-white">{title}</h3>
      </div>

      <div className="space-y-4 relative">
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-veritas-electric/20 flex items-center justify-center">
              <Database className="w-3 h-3 text-veritas-electric" />
            </div>
            <div className="w-px h-full bg-white/10" />
          </div>
          <div className="pb-4">
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Dado + Fonte</p>
            <p className="text-xs text-white/80">{data}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-veritas-violet/20 flex items-center justify-center">
              <Share2 className="w-3 h-3 text-veritas-violet" />
            </div>
            <div className="w-px h-full bg-white/10" />
          </div>
          <div className="pb-4">
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Atribuição</p>
            <p className="text-xs text-white/80">{attribution}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center">
              <Info className="w-3 h-3 text-amber-500" />
            </div>
            <div className="w-px h-full bg-white/10" />
          </div>
          <div className="pb-4">
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">
              Interpretação técnica para revisão
            </p>
            <p className="text-xs text-white/80 font-medium italic">{interpretation}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
              <AlertCircle className="w-3 h-3 text-blue-500" />
            </div>
            <div className="w-px h-full bg-white/10" />
          </div>
          <div className="pb-4">
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">
              Relação com objeto/quesito
            </p>
            <p className="text-xs text-white/80">{relation}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertCircle className="w-3 h-3 text-red-500" />
            </div>
            <div className="w-px h-full bg-white/10" />
          </div>
          <div className="pb-4">
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Divergências</p>
            <p className="text-xs text-white/80 text-red-400">{divergences}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              <Info className="w-3 h-3 text-white/40" />
            </div>
            <div className="w-px h-full bg-white/10" />
          </div>
          <div className="pb-4">
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Limites</p>
            <p className="text-xs text-white/60">{limits}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            </div>
          </div>
          <div>
            <p className="text-[10px] text-emerald-500 uppercase tracking-widest mb-1">
              Conclusão possível para revisão profissional
            </p>
            <p className="text-xs text-emerald-400 font-bold">✨ {conclusion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
