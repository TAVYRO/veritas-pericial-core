import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  FileText,
  MessageSquare,
  Target,
  AlertTriangle,
  ChevronLeft,
  Search,
  BookOpen,
} from "lucide-react";

export const Route = createFileRoute("/app/cases/$caseId/interviews/$interviewId/summary")({
  component: SummaryPage,
});

function SummaryPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/interviews/$interviewId/summary" });

  return (
    <div className="flex flex-col h-full bg-[#0A0D14] pb-24">
      <div className="p-4 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#0A0D14]/80 backdrop-blur-xl z-10">
        <div className="flex items-center gap-3">
          <Link
            to="/app/cases/$caseId/interviews"
            params={{ caseId }}
            className="p-2 bg-white/5 rounded-lg text-white/60 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">Síntese Profissional</h2>
            <p className="text-[10px] text-white/40 uppercase tracking-widest">
              Maria Silva • 10/08/2026
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Relatos */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-veritas-electric">
            <MessageSquare className="w-4 h-4" />
            <h3 className="text-[10px] font-bold uppercase tracking-widest">Principais Relatos</h3>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-3">
            <p className="text-xs text-white/70 leading-relaxed border-l-2 border-veritas-electric/30 pl-3">
              "Ele tem ficado um pouco agitado quando volta das visitas."
            </p>
            <p className="text-xs text-white/70 leading-relaxed border-l-2 border-veritas-electric/30 pl-3">
              "Ele estuda no período da manhã. A tarde ele fica com a avó materna."
            </p>
          </div>
        </section>

        {/* Observações */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-veritas-violet">
            <Search className="w-4 h-4" />
            <h3 className="text-[10px] font-bold uppercase tracking-widest">
              Observações Técnicas
            </h3>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-3">
            <p className="text-xs text-white/70 leading-relaxed italic">
              Entrevistada demonstrou leve hesitação ao mencionar o horário de retorno das visitas
              (00:03:15).
            </p>
            <p className="text-xs text-white/70 leading-relaxed italic">
              Manutenção de contato visual adequado e discurso coerente durante a maior parte da
              sessão.
            </p>
          </div>
        </section>

        {/* Temas */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <BookOpen className="w-4 h-4" />
            <h3 className="text-[10px] font-bold uppercase tracking-widest">Temas Identificados</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Rede de Apoio", "Rotina Escolar", "Impacto das Visitas", "Vínculo Materno"].map(
              (tema) => (
                <span
                  key={tema}
                  className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-medium"
                >
                  {tema}
                </span>
              ),
            )}
          </div>
        </section>

        {/* Quesitos Relacionados */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-amber-400">
            <Target className="w-4 h-4" />
            <h3 className="text-[10px] font-bold uppercase tracking-widest">
              Quesitos Relacionados
            </h3>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 w-4 h-4 rounded bg-amber-500/20 flex items-center justify-center text-[10px] font-bold text-amber-400">
                1
              </div>
              <p className="text-xs text-white/60">
                Qual a rotina atual da criança e quem são seus cuidadores principais?
              </p>
            </div>
          </div>
        </section>

        {/* Limites */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-rose-400">
            <AlertTriangle className="w-4 h-4" />
            <h3 className="text-[10px] font-bold uppercase tracking-widest">
              Limites da Informação
            </h3>
          </div>
          <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-4">
            <p className="text-xs text-white/60 leading-relaxed">
              O horário exato de retorno das visitas não foi precisado devido a ruído no áudio e
              imprecisão da entrevistada. Necessário confrontar com relato do genitor.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
