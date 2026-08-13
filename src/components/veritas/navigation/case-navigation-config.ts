import { 
  FileText, Search, FileSearch, Scale, HelpCircle, Users, PenTool,
  CheckCircle2, Flag, Cpu, LineChart, Share2, ShieldCheck,
  PenLine, Activity, Lock, FileCheck, UserCheck, ClipboardCheck, Signature, Download
} from "lucide-react";

export type NavStep = {
  id: string;
  label: string;
  path: string;
  icon: any;
  matchPrefix?: string;
};

export type NavGroup = {
  id: string;
  label: string;
  defaultPath: string;
  steps: NavStep[];
};

export const CASE_NAVIGATION_GROUPS: NavGroup[] = [
  {
    id: "entrada",
    label: "Entrada",
    defaultPath: "materials",
    steps: [
      { id: "materials", label: "Materiais", path: "materials", icon: FileText },
      { id: "sources", label: "Fontes", path: "sources", icon: Search },
      { id: "triage", label: "Triagem", path: "triage", icon: FileSearch },
      { id: "object", label: "Objeto", path: "object", icon: Scale },
      { id: "questions", label: "Quesitos", path: "questions", icon: HelpCircle },
      { id: "interviews", label: "Entrevistas", path: "interviews", icon: Users, matchPrefix: "interviews" },
      { id: "notes", label: "Notas", path: "notes", icon: PenTool },
    ],
  },
  {
    id: "analise",
    label: "Análise",
    defaultPath: "sufficiency",
    steps: [
      { id: "sufficiency", label: "Suficiência", path: "sufficiency", icon: CheckCircle2 },
      { id: "critical-gaps", label: "Lacunas", path: "critical-gaps", icon: Flag },
      { id: "process", label: "Processamento", path: "process", icon: Cpu },
      { id: "analysis", label: "Análise Assistida", path: "analysis", icon: LineChart },
      { id: "traceability", label: "Rastreabilidade", path: "traceability", icon: Share2 },
      { id: "contradictions", label: "Contradições", path: "contradictions", icon: ShieldCheck },
    ],
  },
  {
    id: "documento",
    label: "Documento",
    defaultPath: "draft",
    steps: [
      { id: "draft", label: "Rascunho", path: "draft", icon: PenLine },
      { id: "edit", label: "Editor", path: "draft/edit", icon: PenLine },
      { id: "draft-questions", label: "Respostas", path: "draft/questions", icon: HelpCircle },
    ],
  },
  {
    id: "finalizacao",
    label: "Finalização",
    defaultPath: "audit",
    steps: [
      { id: "audit", label: "Auditoria", path: "audit", icon: Activity },
      { id: "blocks", label: "Bloqueios", path: "blocks", icon: Lock },
      { id: "review-document", label: "Documento de Revisão", path: "review-document", icon: FileCheck },
      { id: "professional-review", label: "Revisão Profissional", path: "professional-review", icon: UserCheck },
      { id: "approvals", label: "Aprovações", path: "approvals", icon: ClipboardCheck },
      { id: "signatures", label: "Assinaturas", path: "signatures", icon: Signature },
      { id: "final-inspection", label: "Inspeção", path: "final/inspection", icon: CheckCircle2 },
      { id: "final", label: "Final", path: "final", icon: Download },
    ],
  },
];
