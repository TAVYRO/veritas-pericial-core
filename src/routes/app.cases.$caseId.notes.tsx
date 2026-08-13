import { createFileRoute } from "@tanstack/react-router";
import { StickyNote, Search, AlertCircle, Lightbulb, Clock, Plus } from "lucide-react";

export const Route = createFileRoute("/app/cases/$caseId/notes")({
  component: NotesPage,
});

const NOTES = [
  {
    type: "Observação",
    text: "Pedro demonstra forte vínculo afetivo com a avó materna, utilizando-a como figura de segurança durante a menção a conflitos.",
    date: "10/08/2026",
    color: "text-veritas-electric",
    bg: "bg-veritas-electric/10",
  },
  {
    type: "Ponto para análise",
    text: "Verificar se a agitação relatada pela genitora após as visitas possui correlação com a quebra de rotina alimentar ou de sono.",
    date: "11/08/2026",
    color: "text-veritas-violet",
    bg: "bg-veritas-violet/10",
  },
  {
    type: "Pendência",
    text: "Solicitar declaração escolar para confirmar o período de permanência da criança na instituição.",
    date: "12/08/2026",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    type: "Hipótese para revisão",
    text: "Possível alienação parental em estágio inicial? Observar se há repetição de falas adultas pela criança na próxima entrevista.",
    date: "12/08/2026",
    color: "text-rose-400",
    bg: "bg-rose-400/10",
  },
];

const ICONS: Record<string, any> = {
  Observação: Search,
  "Ponto para análise": Lightbulb,
  Pendência: Clock,
  "Hipótese para revisão": AlertCircle,
};

function NotesPage() {
  return (
    <div className="p-6 space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-white">Notas de Campo</h2>
        <button className="p-2 bg-veritas-electric text-white rounded-full shadow-lg shadow-veritas-electric/20">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="grid gap-4">
        {NOTES.map((note, idx) => {
          const Icon = ICONS[note.type];
          return (
            <div
              key={idx}
              className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <div className={`flex items-center gap-2 ${note.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {note.type}
                  </span>
                </div>
                <span className="text-[10px] text-white/30">{note.date}</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed italic">"{note.text}"</p>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest font-bold">
                  Editar
                </button>
                <button className="text-[10px] text-rose-500/60 hover:text-rose-500 uppercase tracking-widest font-bold">
                  Excluir
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
