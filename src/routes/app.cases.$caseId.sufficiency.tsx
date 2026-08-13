import { createFileRoute } from "@tanstack/react-router";
import { 
  CheckCircle2, 
  Circle, 
  MinusCircle, 
  ShieldCheck,
  AlertCircle,
  ChevronRight
} from "lucide-react";

export const Route = createFileRoute("/app/cases/$caseId/sufficiency")({
  component: SufficiencyPage,
});

const SUFFICIENCY_ITEMS = [
  { category: "Identificação", items: [
    { label: "Dados do Processo", status: "OK" },
    { label: "Objeto da Perícia", status: "OK" },
    { label: "Profissionais Nomeados", status: "OK" },
    { label: "Modalidade Documental", status: "OK" }
  ]},
  { category: "Produção de Provas", items: [
    { label: "Partes e Vínculos", status: "OK" },
    { label: "Fontes Materiais", status: "OK" },
    { label: "Procedimentos Realizados", status: "FALTA" },
    { label: "Quesitos Respondidos", status: "FALTA" }
  ]},
  { category: "Análise Técnica", items: [
    { label: "Elementos Sociais", status: "FALTA" },
    { label: "Elementos Psicológicos", status: "OK" },
    { label: "Conclusão Técnica", status: "NÃO SE APLICA" },
    { label: "Limites da Análise", status: "FALTA" }
  ]},
  { category: "Formalização", items: [
    { label: "Signatárias", status: "NÃO SE APLICA" }
  ]}
];

const STATUS_ICONS = {
  "OK": <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
  "FALTA": <AlertCircle className="w-4 h-4 text-rose-500" />,
  "NÃO SE APLICA": <MinusCircle className="w-4 h-4 text-white/20" />
};

function SufficiencyPage() {
  return (
    <div className="p-6 space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-white">Gate de Suficiência</h2>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Progresso:</span>
          <span className="text-sm font-bold text-veritas-electric">60%</span>
        </div>
      </div>

      <div className="space-y-8">
        {SUFFICIENCY_ITEMS.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest pl-1">{section.category}</h3>
            <div className="grid gap-2">
              {section.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-white/5 border border-white/5 rounded-xl p-3 hover:bg-white/[0.07] transition-colors">
                  <span className="text-xs text-white/80">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <span className={`text-[8px] font-bold uppercase tracking-widest ${
                      item.status === "OK" ? "text-emerald-500" : 
                      item.status === "FALTA" ? "text-rose-500" : "text-white/20"
                    }`}>
                      {item.status}
                    </span>
                    {STATUS_ICONS[item.status as keyof typeof STATUS_ICONS]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-veritas-electric/5 border border-veritas-electric/10 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-veritas-electric/10 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-veritas-electric/20 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-veritas-electric" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-veritas-electric uppercase tracking-widest">Próxima Etapa</p>
            <p className="text-xs text-white/90">Gerar Rascunho Assistido</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
}
