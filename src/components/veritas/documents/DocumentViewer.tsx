import type { CaseData, CaseWorkflowState } from "@/features/cases/case-types";
import type {
  DocumentPreviewData,
  DocumentViewerMode,
} from "@/features/documents/document-preview-types";
import { getDocumentTypeById } from "@/features/documents/document-types";
import { getTemplateById } from "@/features/documents/mock-templates";
import { TraceabilityMarker } from "./TraceabilityMarker";
import { cn } from "@/lib/utils";
import { Sparkles, AlertTriangle } from "lucide-react";

interface DocumentViewerProps {
  caseData: CaseData;
  workflow: CaseWorkflowState;
  preview: DocumentPreviewData;
  mode: DocumentViewerMode;
}

export function DocumentViewer({ caseData, workflow, preview, mode }: DocumentViewerProps) {
  const docType = getDocumentTypeById(caseData.documentType);
  const template = workflow.templateId ? getTemplateById(workflow.templateId) : null;

  const isDraft = mode === "draft";
  const isReview = mode === "review";
  const isInspection = mode === "inspection";

  return (
    <article className="w-full max-w-3xl mx-auto space-y-8 pb-12">
      {/* Notice Header */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center space-y-2">
        <p className="text-[10px] text-white/40 leading-relaxed">
          Pré-visualização documental. A paginação definitiva será verificada na etapa de geração
          dos arquivos finais.
        </p>

        {isDraft && (
          <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
            Rascunho — não finalizado
          </p>
        )}

        {isReview && (
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-veritas-violet uppercase tracking-widest">
              Documento/Word para revisão
            </p>
            <p className="text-[9px] text-white/40">Versão de revisão — sem assinatura</p>
            <p className="text-[9px] text-white/30 italic">
              Esta é uma pré-visualização da etapa de revisão. Nenhum arquivo Word foi gerado nesta
              fase. Esta visualização corresponde à etapa de revisão profissional e não à versão
              final liberada.
            </p>
          </div>
        )}

        {isInspection && (
          <p className="text-[10px] font-bold text-veritas-electric uppercase tracking-widest">
            Pré-visualização para inspeção
          </p>
        )}
      </div>

      <div className="bg-white shadow-2xl rounded-sm p-6 sm:p-12 text-black font-serif relative overflow-hidden min-h-[800px]">
        {/* Watermarks */}
        {isDraft && (
          <div className="absolute inset-0 flex items-center justify-center rotate-[-30deg] pointer-events-none select-none opacity-[0.03]">
            <h1 className="text-8xl font-black uppercase tracking-[0.5em]">RASCUNHO</h1>
          </div>
        )}
        {isReview && (
          <div className="absolute inset-0 flex items-center justify-center rotate-[-30deg] pointer-events-none select-none opacity-[0.03]">
            <h1 className="text-8xl font-black uppercase tracking-[0.5em]">REVISÃO</h1>
          </div>
        )}
        {isInspection && (
          <div className="absolute inset-0 flex items-center justify-center rotate-[-30deg] pointer-events-none select-none opacity-[0.03]">
            <h1 className="text-8xl font-black uppercase tracking-[0.5em]">INSPEÇÃO</h1>
          </div>
        )}

        <header className="space-y-8 mb-12">
          {/* Official Header Simulation */}
          <div className="text-center space-y-1">
            <p className="font-bold uppercase text-xs sm:text-sm">
              Tribunal de Justiça do Estado de {caseData.state}
            </p>
            <p className="uppercase text-[10px] sm:text-xs">
              {caseData.court} - {caseData.district}
            </p>
            <p className="text-[10px] italic">Processo nº {caseData.caseNumber}</p>
          </div>

          <div className="text-center pt-4">
            <h1 className="text-base sm:text-lg font-bold uppercase underline decoration-1 underline-offset-4">
              {docType?.label || "Tipo documental não identificado"}
            </h1>
            <p className="text-[10px] text-black/40 mt-1 uppercase tracking-widest font-sans">
              {template ? template.name : "Modelo documental não definido"}
            </p>
          </div>

          {/* Professionals List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-black/5 py-4">
            {caseData.professionals.map((p) => (
              <div key={p.id} className="text-[10px] sm:text-xs">
                <p className="font-bold">{p.name}</p>
                <p className="text-black/60">
                  {p.profession} • {p.registration}
                </p>
              </div>
            ))}
            <div className="text-[10px] sm:text-xs sm:text-right">
              <p className="font-bold uppercase tracking-widest text-black/40">Versão</p>
              <p className="font-black text-veritas-violet">{workflow.currentVersion.label}</p>
            </div>
          </div>
        </header>

        {/* Content Sections */}
        <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-justify">
          {preview.sections.map((section) => (
            <section key={section.id} className="space-y-4">
              <h2 className="font-bold uppercase border-b border-black/10 pb-1">{section.title}</h2>
              <div className="space-y-4">
                {section.paragraphs.map((p) => (
                  <div key={p.id} className="relative">
                    <p>
                      {p.traceability && !isInspection && (
                        <TraceabilityMarker kind={p.traceability} />
                      )}
                      {p.text}
                      {p.editorialMarker && !isInspection && (
                        <span
                          className={cn(
                            "ml-2 inline-flex items-center px-1 rounded-[4px] text-[9px] font-bold uppercase",
                            p.editorialMarker === "confirmar"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-amber-100 text-amber-700",
                          )}
                        >
                          [{p.editorialMarker.toUpperCase()}]
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* AI Suggestion - Only in Draft */}
        {preview.assistedSuggestion && isDraft && (
          <div className="mt-12 bg-veritas-electric/[0.03] border border-veritas-electric/10 rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-2 text-veritas-electric">
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Sugestão Assistida Veritas
              </span>
            </div>
            <p className="text-xs italic text-black/70 leading-relaxed">
              "{preview.assistedSuggestion.text}"
            </p>
            <p className="text-[9px] text-veritas-electric/60 font-medium">
              {preview.assistedSuggestion.note}
            </p>
          </div>
        )}

        {preview.footerNote && (
          <footer className="mt-16 pt-8 border-t border-black/5 text-center">
            <p className="text-[9px] text-black/30 italic">{preview.footerNote}</p>
          </footer>
        )}
      </div>
    </article>
  );
}
