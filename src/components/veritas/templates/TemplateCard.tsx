import { Link } from "@tanstack/react-router";
import { FileText, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DocumentTemplate } from "@/features/documents/template-types";
import { TemplateStatusBadge } from "./TemplateStatusBadge";

interface TemplateCardProps {
  template: DocumentTemplate;
  className?: string;
}

export function TemplateCard({ template, className }: TemplateCardProps) {
  return (
    <Link
      to="/app/templates/$templateId"
      params={{ templateId: template.id }}
      className={cn(
        "w-full flex flex-col gap-3 p-5 rounded-2xl border bg-white/5 border-white/5 hover:border-veritas-electric/30 hover:bg-veritas-electric/5 transition-all duration-300 text-left group",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-veritas-electric/20 group-hover:border-veritas-electric/30 transition-colors">
          <FileText className="w-5 h-5 text-white/20 group-hover:text-veritas-electric transition-colors" />
        </div>
        <TemplateStatusBadge status={template.status} />
      </div>
      
      <div>
        <h3 className="text-sm font-bold text-veritas-silver group-hover:text-white transition-colors">{template.name}</h3>
        <p className="text-xs text-veritas-silver/40 mt-1 leading-relaxed line-clamp-2">
          {template.description}
        </p>
      </div>

      <div className="pt-2 flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <span className="text-[9px] uppercase tracking-wider font-bold bg-white/5 px-2 py-1 rounded text-white/40 border border-white/5">
            {template.scope === 'multiprofessional' ? 'Multiprofissional' : 'Geral'}
          </span>
          <span className="text-[9px] uppercase tracking-wider font-bold bg-veritas-violet/10 px-2 py-1 rounded text-veritas-violet/80 border border-veritas-violet/20">
            {template.supportedDocumentTypes.length} modalidades
          </span>
        </div>
        <ChevronRight className="w-4 h-4 text-veritas-silver/20 group-hover:text-veritas-electric transition-colors" />
      </div>
    </Link>
  );
}
