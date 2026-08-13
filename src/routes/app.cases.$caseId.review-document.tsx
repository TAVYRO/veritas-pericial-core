import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, ChevronRight, FileText, Edit3 } from "lucide-react";
import { useCaseWorkflow } from "@/features/cases/CaseWorkflowProvider";
import { DocumentViewer } from "@/components/veritas/documents/DocumentViewer";
import { useCaseDocument } from "@/features/documents/CaseDocumentProvider";
import type { DocumentPreviewData } from "@/features/documents/document-preview-types";

export const Route = createFileRoute("/app/cases/$caseId/review-document")({
  component: ReviewDocumentPage,
});

function ReviewDocumentPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/review-document" });
  const { getCase, getWorkflow } = useCaseWorkflow();
  const { getDocument } = useCaseDocument();

  const caseData = getCase(caseId);
  const workflow = getWorkflow(caseId);

  if (!caseData || !workflow) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
          <AlertCircle className="w-8 h-8 text-white/20" />
        </div>
        <h2 className="text-xl font-bold text-white">Caso não encontrado</h2>
        <Link 
          to="/app/cases"
          className="flex items-center gap-2 text-veritas-electric text-sm font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para Meus Casos
        </Link>
      </div>
    );
  }

  const versionId = workflow.currentVersion.id;
  const document = getDocument(caseId, versionId);

  // Local adapter for DocumentViewer
  const preview: DocumentPreviewData | undefined = document
    ? {
        sections: document.sections,
        ...(document.footerNote ? { footerNote: document.footerNote } : {}),
      }
    : undefined;

  const hasContent = preview && preview.sections.length > 0;

  return (
    <div className="p-6 space-y-6 pb-32 overflow-y-auto h-full bg-veritas-ink">
      <header className="space-y-1">
        <h2 className="text-xl font-bold text-white tracking-tight">Revisão do Documento</h2>
        <p className="text-xs text-white/40">Visualização de revisão profissional estruturada.</p>
      </header>

      {!hasContent ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center space-y-6 max-w-2xl mx-auto w-full min-w-0">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto border border-white/10">
            <FileText className="w-8 h-8 text-white/20" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <h3 className="text-white font-bold">Nenhum documento disponível para revisão nesta versão.</h3>
            <p className="text-sm text-white/40">Crie e estruture o rascunho antes de iniciar a revisão documental.</p>
          </div>
          <Link 
            to="/app/cases/$caseId/draft/edit"
            params={{ caseId }}
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl transition-colors text-sm font-bold border border-white/10"
          >
            <Edit3 className="w-4 h-4" aria-hidden="true" />
            Voltar ao Editor
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          <DocumentViewer 
            caseData={caseData} 
            workflow={workflow} 
            preview={preview!} 
            mode="review" 
          />
          
          <div className="max-w-3xl mx-auto">
            <Link 
              to="/app/cases/$caseId/professional-review" 
              params={{ caseId }}
              className="w-full bg-veritas-electric text-veritas-graphite py-4 rounded-xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs hover:bg-veritas-electric/90 transition-all shadow-lg shadow-veritas-electric/20"
            >
              Continuar para Revisão Profissional
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
