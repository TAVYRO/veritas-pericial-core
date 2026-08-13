import { createFileRoute, Link } from "@tanstack/react-router";
import { BottomNavigation } from "@/components/veritas/BottomNavigation";
import { z } from "zod";
import { ChevronRight, FileText, User, Scale, Activity, AlertCircle, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDocumentTypeById, documentTypeIdSchema } from "@/features/documents/document-types";
import { MOCK_TEMPLATES } from "@/features/documents/mock-templates";
import { useCaseWorkflow } from "@/features/cases/CaseWorkflowProvider";
import type { TemplateId } from "@/features/documents/template-ids";

export const Route = createFileRoute("/app/cases/new/review")({
  validateSearch: (search) => z.object({
    mode: z.enum(["automatic", "guided"]).optional(),
    caseNumber: z.string().optional(),
    professionals: z.array(z.string()).optional(),
    docType: documentTypeIdSchema.optional(),
    templateId: z.string().optional(),
  }).parse(search),
  component: ReviewPage,
});

function ReviewPage() {
  const { mode, caseNumber, professionals = [], docType, templateId } = Route.useSearch();
  const { setDocumentType, setTemplate } = useCaseWorkflow();

  const docTypeInfo = docType ? getDocumentTypeById(docType) : undefined;
  const templateInfo = templateId ? MOCK_TEMPLATES.find(t => t.id === templateId) : undefined;

  const isValid = !!(docType && docTypeInfo && templateInfo && templateInfo.supportedDocumentTypes.includes(docType));

  const handleCreateCase = () => {
    if (!isValid) return;

    // Apply configuration to demo-case for demonstration purposes
    if (docType && docTypeInfo) {
      setDocumentType("demo-case", docType, docTypeInfo.label);
      if (templateId) {
        setTemplate("demo-case", templateId as TemplateId);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] pb-24 text-white">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
      
      <header className="sticky top-0 z-50 px-6 pt-[calc(1.5rem+env(safe-area-inset-top))] pb-6 bg-[#0A0D14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <Link 
            to="/app/cases/new/template" 
            search={{ mode, caseNumber, professionals, docType }} 
            className="text-white/40 hover:text-white transition-colors"
          >
            Voltar
          </Link>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="w-8 h-1 rounded-full bg-veritas-electric" />
            ))}
          </div>
          <div className="w-12" />
        </div>
        <h1 className="text-xl font-semibold tracking-tight">Revisão Final</h1>
        <p className="text-white/40 text-xs mt-1">Confirme os dados antes de iniciar</p>
      </header>

      <main className="p-6 space-y-6 relative">
        {!isValid ? (
          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 space-y-4 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-red-500">Configuração documental inválida</h3>
              <p className="text-sm text-white/60">
                A combinação de modalidade e modelo selecionada não é compatível ou está incompleta.
              </p>
            </div>
            <Button variant="outline" className="border-red-500/20 text-red-500 hover:bg-red-500/10" asChild>
              <Link to="/app/cases/new/document-type" search={{ mode, caseNumber, professionals }}>
                Corrigir Seleção
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-4">
              <div className="flex items-start gap-3">
                <Scale className="w-5 h-5 text-veritas-electric shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-white/30">Processo</p>
                  <p className="text-sm font-medium">{caseNumber || "0000000-00.2024.8.26.0000"}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-veritas-violet shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-white/30">Modo de Operação</p>
                  <p className="text-sm font-medium capitalize">{mode === 'automatic' ? 'Totalmente Automatizado' : 'Modo Guiado'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-veritas-electric shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-white/30">Profissionais</p>
                  <p className="text-sm font-medium">{professionals.length} selecionado(s)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-veritas-violet shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-white/30">Modalidade Documental</p>
                  <p className="text-sm font-medium">{docTypeInfo?.label}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Layout className="w-5 h-5 text-veritas-electric shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-white/30">Modelo Selecionado</p>
                  <p className="text-sm font-medium">{templateInfo?.name}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <Button 
          className="w-full h-14 rounded-2xl bg-veritas-electric hover:bg-veritas-electric/90 text-white font-semibold text-lg shadow-xl shadow-veritas-electric/20 disabled:opacity-50"
          disabled={!isValid}
          onClick={handleCreateCase}
          asChild
        >
          <Link to="/app/cases/$caseId/materials" params={{ caseId: "demo-case" }}>
            Criar ambiente do caso
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>

        <p className="text-[10px] text-white/20 text-center px-4">
          Ao criar o ambiente, a Veritas iniciará o processamento preliminar dos dados fornecidos.
        </p>
      </main>

      <BottomNavigation />
    </div>
  );
}
