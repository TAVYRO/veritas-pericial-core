import { createFileRoute, useParams } from "@tanstack/react-router";
import { 
  FileText, 
  Image as ImageIcon, 
  FileSpreadsheet, 
  FileArchive, 
  Mic, 
  Video, 
  Type, 
  StickyNote, 
  Check,
  Info
} from "lucide-react";
import type { ComponentType } from "react";
import { Button } from "@/components/ui/button";
import { useCaseDossier } from "@/features/dossier/CaseDossierProvider";
import type { MaterialKind } from "@/features/dossier/case-dossier-types";
import { cn } from "@/lib/utils";

const VISUAL_CATALOG: { kind: MaterialKind; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { kind: "pdf", label: "PDF", icon: FileText },
  { kind: "docx", label: "DOCX", icon: FileText },
  { kind: "image", label: "Imagens", icon: ImageIcon },
  { kind: "spreadsheet", label: "Planilhas", icon: FileSpreadsheet },
  { kind: "zip", label: "ZIP", icon: FileArchive },
  { kind: "audio", label: "Áudio", icon: Mic },
  { kind: "video", label: "Vídeo", icon: Video },
  { kind: "transcript", label: "Transcrição", icon: Type },
  { kind: "note", label: "Notas", icon: StickyNote },
];

export const Route = createFileRoute("/app/cases/$caseId/materials")({
  component: CaseMaterialsPage,
});

function CaseMaterialsPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/materials" });
  const { getDossier, setMaterialsCollectionComplete } = useCaseDossier();
  const dossier = getDossier(caseId);

  if (!dossier) {
    return (
      <div className="p-6 text-center space-y-4">
        <p className="text-white/40 italic">Dossiê indisponível para este caso.</p>
      </div>
    );
  }

  const handleComplete = () => {
    setMaterialsCollectionComplete(caseId, true);
  };

  const handleReopen = () => {
    setMaterialsCollectionComplete(caseId, false);
  };

  return (
    <div className="p-6 space-y-8 pb-40">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Materiais do Caso</h2>
        <p className="text-white/40 text-sm">Organize todos os documentos e evidências</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {VISUAL_CATALOG.map((type) => {
          const count = dossier.items.filter(item => item.materialKind === type.kind).length;
          return (
            <div
              key={type.kind}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 transition-all text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                <type.icon className="w-5 h-5 text-white/40" />
              </div>
              <div>
                <p className="text-sm font-medium">{type.label}</p>
                <p className="text-[10px] text-white/20 font-bold uppercase tracking-wider">{count} arquivos</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-veritas-electric/5 border border-veritas-electric/20 p-4 rounded-2xl flex items-start gap-4">
        <Info className="w-5 h-5 text-veritas-electric shrink-0" />
        <p className="text-[10px] text-veritas-electric/60 leading-relaxed italic">
          Inventário local demonstrativo. Nenhum arquivo é enviado ou armazenado nesta etapa.
        </p>
      </div>

      <div className="pt-8 space-y-4">
        {!dossier.materialsCollectionComplete ? (
          <Button 
            type="button"
            onClick={handleComplete}
            className="w-full h-14 rounded-2xl font-semibold bg-veritas-electric hover:bg-veritas-electric/90 text-white shadow-xl shadow-veritas-electric/20 transition-all"
          >
            Concluir conferência dos materiais
            <Check className="ml-2 w-5 h-5" />
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="w-full h-14 rounded-2xl font-semibold bg-emerald-500 text-white shadow-xl shadow-emerald-500/20 flex items-center justify-center">
              Conferência dos materiais concluída
              <Check className="ml-2 w-5 h-5" />
            </div>
            
            <Button 
              type="button"
              variant="ghost"
              onClick={handleReopen}
              className="w-full text-[10px] font-bold text-white/20 uppercase tracking-widest hover:text-white/40 transition-colors"
            >
              Reabrir conferência
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
