import { createFileRoute } from "@tanstack/react-router";
import { Lock, AlertTriangle, FileWarning, Search, UserX, Ghost, FileX, Signature, Ban } from "lucide-react";

export const Route = createFileRoute("/app/cases/$caseId/blocks")({
  component: BlocksPage,
});

const BLOCKS = [
  { id: 1, type: "CONFIRMAR", message: "Necessário confirmar relato da fonte F01.", icon: FileWarning },
  { id: 2, type: "PENDENTE", message: "Visita domiciliar ainda não realizada.", icon: Ghost },
  { id: 3, type: "lacuna crítica", message: "Divergência entre genitores sobre saúde da criança não explorada.", icon: AlertTriangle },
  { id: 4, type: "processo inconsistente", message: "Cronologia dos fatos apresenta saltos temporais injustificados.", icon: Ban },
  { id: 5, type: "fonte sem atribuição", message: "Relato mencionado na seção 3 sem identificação da fonte.", icon: Search },
  { id: 6, type: "quesito omitido", message: "O quesito nº 05 do Ministério Público não foi respondido.", icon: FileX },
  { id: 7, type: "conclusão sem base", message: "Afirmação de 'alienação' sem evidência técnica rastreável.", icon: FileWarning },
  { id: 8, type: "invasão de competência", message: "Sugestão direta de 'guarda' excede o escopo pericial.", icon: UserX },
  { id: 9, type: "assinatura não autorizada", message: "Dra. Mônica Hazama ainda não autorizou sua assinatura.", icon: Signature },
  { id: 10, type: "problema de documento", message: "Paginação inconsistente detectada no preview DOCX.", icon: FileX },
];

function BlocksPage() {
  return (
    <div className="p-6 space-y-6 pb-32">
      <header className="space-y-1">
        <h2 className="text-xl font-bold text-white tracking-tight">Bloqueios de Emissão</h2>
        <p className="text-xs text-white/40">Itens que impedem a finalização da versão oficial.</p>
      </header>

      <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center gap-4 mb-8">
        <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center animate-pulse">
          <Ban className="w-5 h-5 text-red-500" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-red-400">Não liberado para versão final.</h3>
          <p className="text-[10px] text-red-400/60 uppercase tracking-widest font-bold">Resolução obrigatória de todos os itens abaixo.</p>
        </div>
      </div>

      <div className="grid gap-3">
        {BLOCKS.map((block) => {
          const Icon = block.icon;
          return (
            <div key={block.id} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-start gap-4 hover:bg-white/[0.07] transition-all">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-white/40" />
              </div>
              <div className="space-y-1">
                <span className="px-1.5 py-0.5 bg-red-500/10 text-red-400 text-[8px] font-bold uppercase tracking-widest rounded">
                  [{block.type}]
                </span>
                <p className="text-sm text-white/80 leading-snug">{block.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}