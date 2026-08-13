import { Link } from "@tanstack/react-router";
import { Building2, FileText, Scale, Users } from "lucide-react";
import type { CaseData } from "@/features/cases/case-types";

interface CaseHeaderProps {
  caseData: CaseData;
}

export function CaseHeader({ caseData }: CaseHeaderProps) {
  const courtDisplay = `${caseData.court} - ${caseData.district}/${caseData.state}`;
  const professionalsDisplay = caseData.professionals.map((p) => p.name).join(", ");

  return (
    <div className="bg-[#0A0D14] px-6 pt-[calc(1rem+env(safe-area-inset-top))] pb-4">
      <div className="flex items-center justify-between mb-4">
        <Link
          to="/app/cases"
          className="text-white/40 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold"
        >
          Sair do Caso
        </Link>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-widest font-bold text-veritas-electric">
            Em andamento
          </span>
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
    </div>
  );
}
