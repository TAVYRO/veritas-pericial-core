import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { User, Calendar, Clock, ChevronRight, Play } from "lucide-react";

export const Route = createFileRoute("/app/cases/$caseId/interviews/")({
  component: InterviewsList,
});

const INTERVIEWS = [
  {
    id: "1",
    person: "Maria Silva",
    relationship: "Genitora",
    professional: "Dra. Mônica Hazama",
    date: "10/08/2026",
    duration: "45min",
    status: "Revisada",
  },
  {
    id: "2",
    person: "João Santos",
    relationship: "Genitor",
    professional: "Dra. Mônica Hazama",
    date: "11/08/2026",
    duration: "52min",
    status: "Transcrita",
  },
  {
    id: "3",
    person: "Pedro Silva Santos",
    relationship: "Criança",
    professional: "Dra. Mônica Hazama",
    date: "12/08/2026",
    duration: "30min",
    status: "Realizada",
  },
  {
    id: "4",
    person: "Ana Oliveira",
    relationship: "Avó Materna",
    professional: "Dr. Roberto Silva",
    date: "15/08/2026",
    duration: "-",
    status: "Não iniciada",
  },
];

const STATUS_COLORS: Record<string, string> = {
  "Não iniciada": "bg-white/5 text-white/40",
  "Realizada": "bg-veritas-electric/10 text-veritas-electric",
  "Transcrita": "bg-veritas-violet/10 text-veritas-violet",
  "Revisada": "bg-emerald-500/10 text-emerald-400",
};

function InterviewsList() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/interviews/" });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight text-white">Entrevistas</h2>
        <Link
          to="/app/record"
          className="px-4 py-2 bg-veritas-electric text-white text-xs font-bold rounded-lg hover:bg-veritas-electric/90 transition-colors flex items-center gap-2"
        >
          <Play className="w-3 h-3 fill-current" />
          Nova Gravação
        </Link>
      </div>

      <div className="grid gap-4">
        {INTERVIEWS.map((interview) => (
          <div
            key={interview.id}
            className="group relative bg-white/5 border border-white/5 rounded-2xl p-4 hover:bg-white/[0.07] transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-veritas-graphite border border-white/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-white/40" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">{interview.person}</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{interview.relationship}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-widest ${STATUS_COLORS[interview.status]}`}>
                {interview.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-y-3 mb-6">
              <div className="space-y-1">
                <p className="text-[9px] text-white/40 uppercase tracking-widest">Profissional</p>
                <p className="text-xs text-white/80">{interview.professional}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] text-white/40 uppercase tracking-widest">Data</p>
                <div className="flex items-center gap-1.5 text-xs text-white/80">
                  <Calendar className="w-3 h-3 text-veritas-electric" />
                  {interview.date}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] text-white/40 uppercase tracking-widest">Duração</p>
                <div className="flex items-center gap-1.5 text-xs text-white/80">
                  <Clock className="w-3 h-3 text-veritas-violet" />
                  {interview.duration}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                to="/app/cases/$caseId/interviews/$interviewId/transcript"
                params={{ caseId, interviewId: interview.id }}
                disabled={interview.status === "Não iniciada" || interview.status === "Realizada"}
                className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-widest text-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Transcrição
              </Link>
              <Link
                to="/app/cases/$caseId/interviews/$interviewId/summary"
                params={{ caseId, interviewId: interview.id }}
                disabled={interview.status === "Não iniciada" || interview.status === "Realizada"}
                className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-widest text-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Síntese
              </Link>
              <button className="p-2 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white rounded-lg transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
