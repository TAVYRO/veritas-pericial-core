import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  ChevronLeft
} from "lucide-react";

export const Route = createFileRoute("/app/cases/$caseId/interviews/$interviewId/transcript")({
  component: TranscriptPage,
});

const TRANSCRIPT_DATA = [
  { time: "00:00:10", speaker: "Perita", text: "Bom dia, Maria. Sou a Mônica, perita designada para este caso. Gostaria de conversar com você sobre a rotina do Pedro." },
  { time: "00:00:25", speaker: "Maria", text: "Bom dia, doutora. Ele está bem, mas tem ficado um pouco agitado quando volta das visitas." },
  { time: "00:01:12", speaker: "Perita", text: "Entendo. E como é a rotina escolar dele nos dias de semana?" },
  { time: "00:01:28", speaker: "Maria", text: "Ele estuda no período da manhã. A tarde ele fica com a avó materna enquanto eu trabalho no escritório." },
  { time: "00:02:14", speaker: "Perita", text: "A avó materna reside com vocês ou ela vai até a sua residência?" },
  { time: "00:02:23", speaker: "Maria", text: "Ela mora aqui perto, mas fica lá em casa com ele. O Pedro gosta muito dela." },
  { time: "00:03:05", speaker: "Perita", text: "E nos finais de semana de visita ao genitor, qual é o horário que ele costuma retornar?" },
  { time: "00:03:15", speaker: "Maria", text: "Geralmente no domingo às [trecho inaudível] horas, depende do trânsito na rodovia." },
];

function TranscriptPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/interviews/$interviewId/transcript" });

  return (
    <div className="flex flex-col h-full bg-[#0A0D14]">
      <div className="p-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link 
            to="/app/cases/$caseId/interviews" 
            params={{ caseId }}
            className="p-2 bg-white/5 rounded-lg text-white/60 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight">Transcrição</h2>
            <p className="text-[10px] text-white/40 uppercase tracking-widest">Maria Silva • 10/08/2026</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="px-2 py-1 bg-veritas-violet/10 text-veritas-violet rounded text-[9px] font-bold uppercase tracking-widest border border-veritas-violet/20">
            IA Processado
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
        {TRANSCRIPT_DATA.map((entry, index) => (
          <div key={index} className="flex gap-4 group">
            <div className="w-16 pt-1 flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono text-white/30 group-hover:text-veritas-electric transition-colors">
                {entry.time}
              </span>
              <button className="opacity-0 group-hover:opacity-100 p-1 text-white/20 hover:text-white transition-all">
                <AlertCircle className="w-3 h-3" />
              </button>
            </div>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${
                  entry.speaker === "Perita" ? "text-veritas-electric" : "text-veritas-violet"
                }`}>
                  {entry.speaker}
                </span>
                {entry.text.includes("[trecho inaudível]") && (
                  <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-500 rounded text-[8px] font-bold uppercase border border-amber-500/20">
                    Inaudível
                  </span>
                )}
              </div>
              <p className="text-sm text-white/80 leading-relaxed bg-white/0 hover:bg-white/[0.02] p-2 -ml-2 rounded-lg transition-colors cursor-text">
                {entry.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-24 left-6 right-6 p-4 bg-veritas-graphite/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50">
        <div className="flex flex-col gap-3">
          <div className="relative h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-veritas-electric shadow-[0_0_10px_rgba(60,130,246,0.5)]" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="text-white/40 hover:text-white transition-colors">
                <SkipBack className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition-transform">
                <Pause className="w-5 h-5 fill-current" />
              </button>
              <button className="text-white/40 hover:text-white transition-colors">
                <SkipForward className="w-5 h-5" />
              </button>
              <span className="text-[10px] font-mono text-white/60 ml-2">02:14 / 45:00</span>
            </div>
            
            <div className="flex gap-3">
              <button className="p-2 bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
                <Clock className="w-4 h-4" />
              </button>
              <button className="p-2 bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
