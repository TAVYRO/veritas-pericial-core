import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useCaseWorkflow } from "@/features/cases/CaseWorkflowProvider";
import { DocumentViewer } from "@/components/veritas/documents/DocumentViewer";
import { getMockPreview } from "@/features/documents/mock-document-preview";

export const Route = createFileRoute("/app/cases/$caseId/draft")({
  component: DraftPage,
});

function DraftPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/draft" });
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
    <div className="flex flex-col h-full bg-veritas-ink">
      {/* Permanent Status Bar */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Rascunho — Não Finalizado</span>
        </div>
        <div className="flex gap-4">
           <Link to="/app/cases/$caseId/draft/edit" params={{ caseId }} className="text-[10px] font-bold text-veritas-electric uppercase tracking-widest hover:underline">
             Abrir Editor
           </Link>
           <Link to="/app/cases/$caseId/draft/questions" params={{ caseId }} className="text-[10px] font-bold text-veritas-violet uppercase tracking-widest hover:underline">
             Responder Quesitos
           </Link>
        </div>
      </div>

      <div className="p-6 space-y-8 pb-32 overflow-y-auto">
        {!preview ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center space-y-4 max-w-2xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6 text-white/20" />
            </div>
            <p className="text-sm text-white/40">Pré-visualização documental indisponível para este caso.</p>
          </div>
        ) : (
          <DocumentViewer 
            caseData={caseData} 
            workflow={workflow} 
            preview={preview} 
            mode="draft" 
          />
        )}
      </div>
    </div>
  );
}
