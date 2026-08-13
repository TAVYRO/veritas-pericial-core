import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BottomNavigation } from "@/components/veritas/BottomNavigation";
import { z } from "zod";
import { ChevronRight, FileText, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { DOCUMENT_TYPES, getDocumentTypesByDiscipline, documentTypeIdSchema } from "@/features/documents/document-types";
import type { DocumentTypeId } from "@/features/documents/document-type-ids";
import { PROFESSIONALS } from "@/features/cases/mock-professionals";

export const Route = createFileRoute("/app/cases/new/document-type")({
  validateSearch: (search) => z.object({
    mode: z.enum(["automatic", "guided"]).optional().catch(undefined),
    caseNumber: z.string().optional().catch(undefined),
    professionals: z.array(z.string()).optional().catch(undefined),
    docType: documentTypeIdSchema.optional().catch(undefined),
  }).parse(search),
  component: DocumentTypePage,
});

function DocumentTypePage() {
  const { mode, caseNumber, professionals: selectedProfIds = [], docType } = Route.useSearch();
  const navigate = useNavigate();
  
  const selectedProfs = selectedProfIds.map(id => PROFESSIONALS.find(p => p.id === id)).filter(Boolean);
  const disciplines = new Set(selectedProfs.map(p => p?.discipline));
  
  const hasPsychology = disciplines.has("psychology");
  const hasSocialWork = disciplines.has("social-work");

  let availableOptions: typeof DOCUMENT_TYPES = [];
  if (hasPsychology && hasSocialWork) {
    availableOptions = [
      ...getDocumentTypesByDiscipline("multiprofessional"),
      ...getDocumentTypesByDiscipline("psychology"),
      ...getDocumentTypesByDiscipline("social-work")
    ];
  } else if (hasPsychology) {
    availableOptions = getDocumentTypesByDiscipline("psychology");
  } else if (hasSocialWork) {
    availableOptions = getDocumentTypesByDiscipline("social-work");
  }

  const [selectedId, setSelectedId] = useState<DocumentTypeId | "">(() => {
    if (docType && availableOptions.some(opt => opt.id === docType)) {
      return docType;
    }
    return "";
  });

  useEffect(() => {
    if (docType) {
      if (availableOptions.some(opt => opt.id === docType)) {
        setSelectedId(docType);
      } else {
        setSelectedId("");
      }
    }
  }, [docType, availableOptions]);

  const handleContinue = () => {
    if (!selectedId) return;
    navigate({
      to: "/app/cases/new/template",
      search: { mode, caseNumber, professionals: selectedProfIds, docType: selectedId }
    });
  };


  return (
    <div className="min-h-screen bg-[#0A0D14] pb-24 text-white">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
      
      <header className="sticky top-0 z-50 px-6 pt-[calc(1.5rem+env(safe-area-inset-top))] pb-6 bg-[#0A0D14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <Link to="/app/cases/new/professionals" search={{ mode, caseNumber }} className="text-white/40 hover:text-white transition-colors">
            Voltar
          </Link>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className={`w-8 h-1 rounded-full ${s === 3 ? "bg-veritas-electric" : s < 3 ? "bg-veritas-electric/40" : "bg-white/10"}`} />
            ))}
          </div>
          <div className="w-12" />
        </div>
        <h1 className="text-xl font-semibold tracking-tight">Modalidade Documental</h1>
        <p className="text-white/40 text-xs mt-1">Defina o tipo de documento final</p>
      </header>

      <main className="p-6 space-y-6 relative">
        <div className="space-y-3">
          {availableOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedId(opt.id)}
              className={cn(
                "w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 text-left",
                selectedId === opt.id 
                  ? "bg-veritas-violet/10 border-veritas-violet/40 shadow-[0_0_20px_rgba(139,92,246,0.1)]" 
                  : "bg-white/5 border-white/5 hover:border-white/10"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center border transition-colors",
                selectedId === opt.id ? "bg-veritas-violet border-transparent" : "bg-white/5 border-white/10"
              )}>
                <FileText className={cn("w-5 h-5", selectedId === opt.id ? "text-white" : "text-white/20")} />
              </div>
              <div className="flex-1">
                <span className="block text-sm font-medium">{opt.label}</span>
                <span className="block text-[10px] text-white/40 mt-0.5 uppercase tracking-wider font-bold">
                  {opt.discipline === 'psychology' ? 'Psicologia' : opt.discipline === 'social-work' ? 'Serviço Social' : 'Multiprofissional'}
                </span>
              </div>
              {selectedId === opt.id && <Check className="w-5 h-5 text-veritas-violet" />}
            </button>
          ))}
        </div>

        <div className="flex gap-2 p-4 rounded-xl bg-white/5 border border-white/5">
          <Info className="w-4 h-4 text-veritas-violet shrink-0 mt-0.5" />
          <p className="text-[11px] leading-relaxed text-white/40">
            Modalidade provisória — sujeita à confirmação profissional.
          </p>
        </div>

        <Button 
          className="w-full h-14 rounded-2xl bg-veritas-electric hover:bg-veritas-electric/90 text-white font-semibold text-lg disabled:opacity-50"
          disabled={!selectedId}
          onClick={handleContinue}
        >
          Continuar
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>

      </main>

      <BottomNavigation />
    </div>
  );
}
