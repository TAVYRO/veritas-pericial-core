import { Link, Outlet, useLocation, useParams } from "@tanstack/react-router";
import { BottomNavigation } from "./BottomNavigation";
import { 
  FileText, 
  Search, 
  HelpCircle, 
  Users, 
  CheckCircle2, 
  PenTool, 
  ShieldCheck, 
  FileSearch, 
  Check, 
  Flag,
  Scale,
  Building2,
  ChevronRight,
  Cpu,
  LineChart,
  Share2,
  PenLine,
  Activity,
  Lock,
  FileCheck,
  UserCheck,
  ClipboardCheck,
  Signature,
  Download,
  Inspect
} from "lucide-react";
import { cn } from "@/lib/utils";

const FLOW_STEPS = [
  { label: "Materiais", path: "materials", icon: FileText },
  { label: "Fontes", path: "sources", icon: Search },
  { label: "Triagem", path: "triage", icon: FileSearch },
  { label: "Objeto", path: "object", icon: Scale },
  { label: "Quesitos", path: "questions", icon: HelpCircle },
  { label: "Entrevistas", path: "interviews", icon: Users },
  { label: "Suficiência", path: "sufficiency", icon: CheckCircle2 },
  { label: "Processamento", path: "process", icon: Cpu },
  { label: "Análise", path: "analysis", icon: LineChart },
  { label: "Rastreabilidade", path: "traceability", icon: Share2 },
  { label: "Rascunho", path: "draft", icon: PenLine },
  { label: "Contradições", path: "contradictions", icon: ShieldCheck },
  { label: "Notas", path: "notes", icon: PenTool },
  { label: "Lacunas", path: "critical-gaps", icon: Flag },
];

export function CaseShell() {
  const { caseId } = useParams({ from: "/app/cases/$caseId" });
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();

  // Mock case data
  const caseData = {
    number: "0000000-00.2024.8.26.0000",
    court: "1ª Vara Cível - São Paulo/SP",
    modality: "Relatório Psicossocial",
    professionals: "Dra. Mônica Hazama, Dr. Roberto Silva",
    stage: FLOW_STEPS.find(s => s.path === currentPath)?.label || "Materiais"
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white flex flex-col">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 bg-[#0A0D14]/80 backdrop-blur-xl border-b border-white/5 px-6 pt-[calc(1rem+env(safe-area-inset-top))] pb-4">
        <div className="flex items-center justify-between mb-4">
          <Link to="/app/cases" className="text-white/40 hover:text-white transition-colors">
            Sair do Caso
          </Link>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-widest font-bold text-veritas-electric">Em andamento</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-veritas-electric" />
            <h1 className="text-sm font-semibold tracking-tight truncate">{caseData.number}</h1>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <div className="flex items-center gap-1.5 text-[10px] text-white/40">
              <Building2 className="w-3 h-3" />
              {caseData.court}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-white/40">
              <FileText className="w-3 h-3" />
              {caseData.modality}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-white/40">
              <Users className="w-3 h-3" />
              {caseData.professionals}
            </div>
          </div>
        </div>
      </header>

      {/* Horizontal Flow Scroller */}
      <div className="sticky top-[108px] z-40 bg-[#0A0D14]/80 backdrop-blur-xl border-b border-white/5 overflow-x-auto no-scrollbar">
        <div className="flex px-6 py-3 gap-8 min-w-max">
          {FLOW_STEPS.map((step) => {
            const isActive = currentPath === step.path;
            const Icon = step.icon;
            
            // Type-safe link destination
            const to = `/app/cases/$caseId/${step.path}` as any;
            const params = { caseId } as any;

            return (
              <Link
                key={step.path}
                to={to}
                params={params}
                className={cn(
                  "flex flex-col items-center gap-1.5 transition-all duration-300 relative",
                  isActive ? "text-veritas-electric" : "text-white/20 hover:text-white/40"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive && "animate-pulse-glow")} />
                <span className="text-[9px] uppercase tracking-widest font-bold">{step.label}</span>
                {isActive && (
                  <div className="absolute -bottom-[13px] w-full h-0.5 bg-veritas-electric rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <BottomNavigation />
    </div>
  );
}
