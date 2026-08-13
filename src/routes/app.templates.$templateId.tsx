import { createFileRoute, Link } from "@tanstack/react-router";
import { BottomNavigation } from "@/components/veritas/BottomNavigation";
import { ChevronLeft, FileText, Info, ShieldCheck, Layers } from "lucide-react";
import { isTemplateId } from "@/features/documents/template-ids";
import { getTemplateById } from "@/features/documents/mock-templates";
import { getDocumentTypeById } from "@/features/documents/document-types";
import { TemplateStatusBadge } from "@/components/veritas/templates/TemplateStatusBadge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/app/templates/$templateId")({
  component: TemplateDetailPage,
});

function TemplateDetailPage() {
  const { templateId } = Route.useParams();

  if (!isTemplateId(templateId)) {
    return <NotFoundState />;
  }

  const template = getTemplateById(templateId);

  if (!template) {
    return <NotFoundState />;
  }

  return (
    <div className="min-h-screen bg-[#0A0D14] pb-24 text-white">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />

      <header className="sticky top-0 z-50 px-6 pt-[calc(1.5rem+env(safe-area-inset-top))] pb-6 bg-[#0A0D14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4 mb-4">
          <Link
            to="/app/templates"
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-bold tracking-tight line-clamp-1">{template.name}</h1>
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
              Detalhes do Modelo
            </p>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-6 relative">
        {/* Info Card */}
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
          <div className="flex items-start justify-between">
            <div className="w-14 h-14 rounded-2xl bg-veritas-electric/10 border border-veritas-electric/20 flex items-center justify-center">
              <FileText className="w-7 h-7 text-veritas-electric" />
            </div>
            <TemplateStatusBadge status={template.status} />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">{template.name}</h2>
            <p className="text-sm text-veritas-silver/60 leading-relaxed">{template.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">
                Escopo
              </p>
              <p className="text-xs font-bold capitalize">
                {template.scope === "multiprofessional" ? "Multiprofissional" : "Geral"}
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
              <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1">
                Origem
              </p>
              <p className="text-xs font-bold">
                {template.id === "veritas-multiprofessional"
                  ? "Estrutura multiprofissional Veritas"
                  : "Estrutura documental Veritas"}
              </p>
            </div>
          </div>
        </div>

        {/* Modalidades Compatíveis */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Layers className="w-4 h-4 text-veritas-violet" />
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">
              Modalidades Compatíveis
            </h3>
          </div>
          <div className="space-y-2">
            {template.supportedDocumentTypes.map((docTypeId) => {
              const docType = getDocumentTypeById(docTypeId);
              return (
                <div
                  key={docTypeId}
                  className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between"
                >
                  <span className="text-sm font-medium">{docType?.label || docTypeId}</span>
                  <ShieldCheck className="w-4 h-4 text-veritas-violet/40" />
                </div>
              );
            })}
          </div>
        </section>

        {/* Informação Adicional */}
        <div className="p-4 rounded-2xl bg-veritas-electric/5 border border-veritas-electric/10 flex gap-3">
          <Info className="w-5 h-5 text-veritas-electric shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-white mb-1">Modelo de Referência</p>
            <p className="text-[11px] text-white/40 leading-relaxed">
              Este é um modelo de referência documental do Veritas, validado para conformidade com
              normas profissionais vigentes.
            </p>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}

function NotFoundState() {
  return (
    <div className="min-h-screen bg-[#0A0D14] flex flex-col text-white p-6">
      <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-center">
        <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <FileText className="w-10 h-10 text-red-500/40" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Modelo não encontrado</h2>
          <p className="text-sm text-white/40 px-8">
            A estrutura documental solicitada não existe ou foi removida da biblioteca.
          </p>
        </div>
        <Button variant="outline" className="border-white/10 bg-white/5" asChild>
          <Link to="/app/templates">Voltar para Biblioteca</Link>
        </Button>
      </div>
      <BottomNavigation />
    </div>
  );
}
