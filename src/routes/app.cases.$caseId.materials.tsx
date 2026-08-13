import { createFileRoute } from "@tanstack/react-router";
import {
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  FileArchive,
  Mic,
  Video,
  Type,
  StickyNote,
  Plus,
  Check,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const MATERIAL_TYPES = [
  { label: "PDF", icon: FileText, count: 4 },
  { label: "DOCX", icon: FileText, count: 2 },
  { label: "Imagens", icon: ImageIcon, count: 8 },
  { label: "Planilhas", icon: FileSpreadsheet, count: 1 },
  { label: "ZIP", icon: FileArchive, count: 1 },
  { label: "Áudio", icon: Mic, count: 3 },
  { label: "Vídeo", icon: Video, count: 0 },
  { label: "Transcrição", icon: Type, count: 3 },
  { label: "Notas", icon: StickyNote, count: 12 },
];

export const Route = createFileRoute("/app/cases/$caseId/materials")({
  component: CaseMaterialsPage,
});

function CaseMaterialsPage() {
  return (
    <div className="p-6 space-y-8 pb-32">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold">Materiais do Caso</h2>
        <p className="text-white/40 text-sm">Organize todos os documentos e evidências</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {MATERIAL_TYPES.map((type) => (
          <button
            key={type.label}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-veritas-electric/10 group-hover:border-veritas-electric/20 transition-all">
              <type.icon className="w-5 h-5 text-white/40 group-hover:text-veritas-electric" />
            </div>
            <div>
              <p className="text-sm font-medium">{type.label}</p>
              <p className="text-[10px] text-white/20 font-bold uppercase tracking-wider">
                {type.count} arquivos
              </p>
            </div>
          </button>
        ))}

        <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-dashed border-white/10 hover:border-veritas-electric/40 hover:bg-veritas-electric/5 transition-all text-veritas-electric/60 hover:text-veritas-electric group">
          <Plus className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Adicionar mais</span>
        </button>
      </div>

      <div className="fixed bottom-28 left-6 right-6">
        <Button className="w-full h-14 rounded-2xl bg-veritas-electric hover:bg-veritas-electric/90 text-white font-semibold shadow-xl shadow-veritas-electric/20">
          Terminei os materiais
          <Check className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
