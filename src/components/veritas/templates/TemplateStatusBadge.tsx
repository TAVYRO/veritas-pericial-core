import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { TemplateStatus } from "@/features/documents/template-types";

interface TemplateStatusBadgeProps {
  status: TemplateStatus;
  className?: string;
}

export function TemplateStatusBadge({ status, className }: TemplateStatusBadgeProps) {
  const getStatusLabel = (status: TemplateStatus) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "draft":
        return "Rascunho";
      case "deprecated":
        return "Descontinuado";
      default:
        return status;
    }
  };

  const getStatusStyles = (status: TemplateStatus) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "draft":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "deprecated":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-white/10 text-white/60 border-white/20";
    }
  };

  return (
    <Badge 
      variant="outline" 
      className={cn("rounded-full border text-[10px] py-0 px-2 font-bold uppercase tracking-wider", getStatusStyles(status), className)}
    >
      {getStatusLabel(status)}
    </Badge>
  );
}
