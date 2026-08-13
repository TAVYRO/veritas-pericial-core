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
  Info,
  Plus,
  ArrowLeft,
  AlertCircle
} from "lucide-react";
import { useState, type ComponentType } from "react";
import { Button } from "@/components/ui/button";
import { useCaseDossier } from "@/features/dossier/CaseDossierProvider";
import type { MaterialKind, NewCaseDossierItemInput, LegibilityLevel, DuplicateStatus } from "@/features/dossier/case-dossier-types";
import type { TraceabilityKind } from "@/features/documents/document-preview-types";
import { cn } from "@/lib/utils";

const VISUAL_CATALOG: { kind: MaterialKind; label: string; icon: ComponentType<{ className?: string }> }[] = [
  { kind: "pdf", label: "PDF", icon: FileText },
  { kind: "docx", label: "DOCX", icon: FileText },
  { kind: "image", label: "Imagem", icon: ImageIcon },
  { kind: "spreadsheet", label: "Planilha", icon: FileSpreadsheet },
  { kind: "zip", label: "ZIP", icon: FileArchive },
  { kind: "audio", label: "Áudio", icon: Mic },
  { kind: "video", label: "Vídeo", icon: Video },
  { kind: "transcript", label: "Transcrição", icon: Type },
  { kind: "note", label: "Nota", icon: StickyNote },
];

const TRACEABILITY_OPTIONS: { value: TraceabilityKind; label: string }[] = [
  { value: "documento", label: "DOCUMENTO" },
  { value: "relato", label: "RELATO" },
  { value: "observacao", label: "OBSERVAÇÃO" },
  { value: "inferencia", label: "INFERÊNCIA" },
  { value: "hipotese", label: "HIPÓTESE" },
  { value: "nao-confirmado", label: "NÃO CONFIRMADO" },
];

const LEGIBILITY_OPTIONS: { value: LegibilityLevel; label: string }[] = [
  { value: "high", label: "Alta" },
  { value: "medium", label: "Média" },
  { value: "low", label: "Baixa" },
  { value: "not-applicable", label: "Não se aplica" },
];

const DUPLICATE_OPTIONS: { value: DuplicateStatus; label: string }[] = [
  { value: "no", label: "Não" },
  { value: "possible", label: "Possível" },
  { value: "yes", label: "Sim" },
];

export const Route = createFileRoute("/app/cases/$caseId/materials")({
  component: CaseMaterialsPage,
});

function CaseMaterialsPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/materials" });
  const { getDossier, setMaterialsCollectionComplete, addDossierItem } = useCaseDossier();
  const dossier = getDossier(caseId);

  const INITIAL_FORM_DATA: NewCaseDossierItemInput = {
    title: "",
    materialKind: "pdf",
    traceability: "documento",
    origin: "",
    date: null,
    theme: "",
    processReference: "",
    location: "",
    legibility: "high",
    duplicateStatus: "no",
    limitations: [],
  };

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<NewCaseDossierItemInput>(INITIAL_FORM_DATA);
  const [limitationsText, setLimitationsText] = useState("");

  const resetForm = () => {
    setIsFormOpen(false);
    setIsReviewMode(false);
    setError(null);
    setLimitationsText("");
    setFormData(INITIAL_FORM_DATA);
  };

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

  const validateForm = () => {
    if (!formData.title.trim() || !formData.origin.trim() || !formData.theme.trim() || !formData.processReference.trim() || !formData.location.trim()) {
      setError("Preencha os campos obrigatórios para revisar o registro.");
      return false;
    }
    setError(null);
    return true;
  };

  const handleStartReview = () => {
    if (validateForm()) {
      const processedLimitations = limitationsText
        .split("\n")
        .map(l => l.trim())
        .filter(l => l !== "");
      setFormData(prev => ({ ...prev, limitations: processedLimitations }));
      setIsReviewMode(true);
    }
  };

  const handleRegister = () => {
    addDossierItem(caseId, formData);
    resetForm();
  };

  if (isFormOpen) {
    if (isReviewMode) {
      return (
        <div className="p-6 space-y-8 pb-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">Revisar novo item</h2>
            <p className="text-white/40 text-sm">O identificador Fxx será atribuído automaticamente ao registrar.</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest">Título</p>
                <p>{formData.title}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest">Tipo</p>
                  <p className="capitalize">{formData.materialKind}</p>
                </div>
                <div>
                  <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest">Rastreabilidade</p>
                  <p className="text-veritas-electric font-bold">{TRACEABILITY_OPTIONS.find(o => o.value === formData.traceability)?.label}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest">Origem</p>
                  <p>{formData.origin}</p>
                </div>
                <div>
                  <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest">Data</p>
                  <p>{formData.date ? formData.date.split("-").reverse().join("/") : "Não informada"}</p>
                </div>
              </div>
              <div>
                <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest">Tema</p>
                <p>{formData.theme}</p>
              </div>
              <div>
                <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest">Referência Processual</p>
                <p>{formData.processReference}</p>
              </div>
              <div>
                <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest">Localização</p>
                <p>{formData.location}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest">Legibilidade</p>
                  <p>{LEGIBILITY_OPTIONS.find(o => o.value === formData.legibility)?.label}</p>
                </div>
                <div>
                  <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest">Duplicidade</p>
                  <p>{DUPLICATE_OPTIONS.find(o => o.value === formData.duplicateStatus)?.label}</p>
                </div>
              </div>
              <div className="sm:col-span-2">
                <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest">Limitações</p>
                <p className="break-words">{formData.limitations.length > 0 ? formData.limitations.join(", ") : "Sem limitações registradas"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              type="button"
              onClick={handleRegister}
              className="w-full h-14 rounded-2xl font-semibold bg-veritas-electric hover:bg-veritas-electric/90 text-white shadow-xl shadow-veritas-electric/20"
            >
              Registrar no inventário
            </Button>
            <Button 
              type="button"
              variant="ghost"
              onClick={() => setIsReviewMode(false)}
              className="w-full h-12 text-white/40 font-medium"
            >
              Voltar e corrigir
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6 space-y-8 pb-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-center gap-4">
          <Button 
            type="button"
            variant="ghost" 
            size="icon" 
            onClick={resetForm}
            className="rounded-full bg-white/5"
            aria-label="Cancelar registro"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="space-y-0.5">
            <h2 className="text-xl font-semibold">Novo Registro</h2>
            <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Metadados do Inventário</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 px-1">Título do Item *</label>
              <input 
                type="text"
                placeholder="Ex: Certidão de nascimento"
                value={formData.title}
                onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none focus:border-veritas-electric/50 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 px-1">Tipo de Material</label>
                <select 
                  value={formData.materialKind}
                  onChange={e => setFormData(prev => ({ ...prev, materialKind: e.target.value as MaterialKind }))}
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none appearance-none"
                >
                  {VISUAL_CATALOG.map(o => <option key={o.kind} value={o.kind} className="bg-veritas-graphite">{o.label}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 px-1">Rastreabilidade</label>
                <select 
                  value={formData.traceability}
                  onChange={e => setFormData(prev => ({ ...prev, traceability: e.target.value as TraceabilityKind }))}
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none appearance-none"
                >
                  {TRACEABILITY_OPTIONS.map(o => <option key={o.value} value={o.value} className="bg-veritas-graphite">{o.label}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 px-1">Origem *</label>
                <input 
                  type="text"
                  placeholder="Ex: Processo"
                  value={formData.origin}
                  onChange={e => setFormData(prev => ({ ...prev, origin: e.target.value }))}
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none transition-colors focus:border-veritas-electric/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 px-1">Data</label>
                <input 
                  type="date"
                  value={formData.date || ""}
                  onChange={e => setFormData(prev => ({ ...prev, date: e.target.value || null }))}
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none transition-colors focus:border-veritas-electric/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 px-1">Tema *</label>
              <input 
                type="text"
                placeholder="Ex: Histórico Familiar"
                value={formData.theme}
                onChange={e => setFormData(prev => ({ ...prev, theme: e.target.value }))}
                className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 px-1">Referência Processual *</label>
              <input 
                type="text"
                placeholder="Ex: Pág 150"
                value={formData.processReference}
                onChange={e => setFormData(prev => ({ ...prev, processReference: e.target.value }))}
                className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 px-1">Localização Técnica *</label>
              <input 
                type="text"
                placeholder="Ex: Pasta B / Nuvem"
                value={formData.location}
                onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 px-1">Legibilidade</label>
                <select 
                  value={formData.legibility}
                  onChange={e => setFormData(prev => ({ ...prev, legibility: e.target.value as LegibilityLevel }))}
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none appearance-none"
                >
                  {LEGIBILITY_OPTIONS.map(o => <option key={o.value} value={o.value} className="bg-veritas-graphite">{o.label}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 px-1">Duplicidade</label>
                <select 
                  value={formData.duplicateStatus}
                  onChange={e => setFormData(prev => ({ ...prev, duplicateStatus: e.target.value as DuplicateStatus }))}
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:outline-none appearance-none"
                >
                  {DUPLICATE_OPTIONS.map(o => <option key={o.value} value={o.value} className="bg-veritas-graphite">{o.label}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-white/40 px-1">Limitações (uma por linha)</label>
              <textarea 
                placeholder="Descreva as limitações encontradas..."
                rows={3}
                value={limitationsText}
                onChange={e => setLimitationsText(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none resize-none"
              />
            </div>
          </div>

          <div className="bg-veritas-electric/5 border border-veritas-electric/20 p-4 rounded-xl flex items-start gap-3">
            <Info className="w-4 h-4 text-veritas-electric shrink-0 mt-0.5" />
            <p className="text-[9px] text-veritas-electric/60 leading-relaxed italic">
              Registro de metadados. Nenhum arquivo será enviado. O identificador Fxx será gerado automaticamente.
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-rose-500 text-[10px] font-bold uppercase tracking-wider px-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <div className="space-y-3 pt-4">
            <Button 
              type="button"
              onClick={handleStartReview}
              className="w-full h-14 rounded-2xl font-semibold bg-veritas-electric hover:bg-veritas-electric/90 text-white"
            >
              Revisar registro
            </Button>
            <Button 
              type="button"
              variant="ghost"
              onClick={resetForm}
              className="w-full h-12 text-white/40 font-medium"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 pb-40">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Materiais do Caso</h2>
          <p className="text-white/40 text-sm">Organize todos os documentos e evidências</p>
        </div>
        <Button 
          type="button"
          onClick={() => setIsFormOpen(true)}
          className="h-10 w-10 rounded-full bg-veritas-electric hover:bg-veritas-electric/90 text-white shadow-lg p-0 flex items-center justify-center shrink-0"
        >
          <Plus className="w-5 h-5" />
        </Button>
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

      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-4">
        <div className="flex items-center gap-3">
          <StickyNote className="w-5 h-5 text-veritas-electric" />
          <h3 className="text-sm font-semibold">Ações do Inventário</h3>
        </div>
        <Button 
          type="button"
          variant="outline"
          onClick={() => setIsFormOpen(true)}
          className="w-full h-12 rounded-xl border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/5"
        >
          Registrar item no inventário
        </Button>
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