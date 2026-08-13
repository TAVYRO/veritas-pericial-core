import { Link, Outlet, useLocation, useParams } from "@tanstack/react-router";
import { useCaseWorkflow } from "@/features/cases/CaseWorkflowProvider";
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
  Scale,
  Building2,
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
  Flag
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
  { label: "Auditoria", path: "audit", icon: Activity },
  { label: "Bloqueios", path: "blocks", icon: Lock },
  { label: "Revisão", path: "review-document", icon: FileCheck },
  { label: "Profissional", path: "professional-review", icon: UserCheck },
  { label: "Aprovações", path: "approvals", icon: ClipboardCheck },
  { label: "Assinaturas", path: "signatures", icon: Signature },
  { label: "Final", path: "final", icon: Download },
];

export function CaseShell() {
  const { caseId } = useParams({ from: "/app/cases/$caseId" });
  const location = useLocation();
  const currentPath = location.pathname.split("/").pop();
  const { getCase } = useCaseWorkflow();

  const caseData = getCase(caseId);

  if (!caseData) {
    return (
      <div className="min-h-screen bg-[#0A0D14] text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
        <Scale className="w-12 h-12 text-veritas-electric/40" />
        <h1 className="text-xl font-bold">Caso não encontrado</h1>
        <p className="text-white/40 text-sm">O processo {caseId} não existe ou você não tem permissão para acessá-lo.</p>
        <Link to="/app/cases" className="text-veritas-electric text-sm font-bold uppercase tracking-widest">
          Voltar para Meus Casos
        </Link>
      </div>
    );
  }

  const courtDisplay = `${caseData.court} - ${caseData.district}/${caseData.state}`;
  const professionalsDisplay = caseData.professionals.map(p => p.name).join(", ");

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
            <h1 className="text-sm font-semibold tracking-tight truncate">{caseData.caseNumber}</h1>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <div className="flex items-center gap-1.5 text-[10px] text-white/40">
              <Building2 className="w-3 h-3" />
              {courtDisplay}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-white/40">
              <FileText className="w-3 h-3" />
              {caseData.modality}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-white/40">
              <Users className="w-3 h-3" />
              {professionalsDisplay}
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
