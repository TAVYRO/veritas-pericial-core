import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, ChevronRight } from "lucide-react";
import { useCaseWorkflow } from "@/features/cases/CaseWorkflowProvider";
import { DocumentViewer } from "@/components/veritas/documents/DocumentViewer";
import { getMockPreview } from "@/features/documents/mock-document-preview";

export const Route = createFileRoute("/app/cases/$caseId/review-document")({
  component: ReviewDocumentPage,
});

function ReviewDocumentPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/review-document" });
  const { getCase, getWorkflow } = useCaseWorkflow();

  const caseData = getCase(caseId);
  const workflow = getWorkflow(caseId);
  const preview = getMockPreview(caseId);

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

  return (
    <div className="p-6 space-y-6 pb-32 overflow-y-auto h-full bg-veritas-ink">
      <header className="space-y-1">
        <h2 className="text-xl font-bold text-white tracking-tight">Preview do Documento</h2>
        <p className="text-xs text-white/40">Visualização de revisão profissional estruturada.</p>
      </header>

      {!preview ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6 text-white/20" />
          </div>
          <p className="text-sm text-white/40">Pré-visualização documental indisponível para este caso.</p>
        </div>
      ) : (
        <div className="space-y-8">
          <DocumentViewer 
            caseData={caseData} 
            workflow={workflow} 
            preview={preview} 
            mode="review" 
          />
          
          <div className="max-w-3xl mx-auto">
            <Link 
              to="/app/cases/$caseId/professional-review" 
              params={{ caseId }}
              className="w-full bg-veritas-electric text-veritas-graphite py-4 rounded-xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs hover:bg-veritas-electric/90 transition-all shadow-lg shadow-veritas-electric/20"
            >
              Continuar para Revisão Profissional
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
