import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BottomNavigation } from "@/components/veritas/BottomNavigation";
import { z } from "zod";
import { ChevronRight, FileText, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { MOCK_TEMPLATES, getTemplatesForDocumentType } from "@/features/documents/mock-templates";
import { getDocumentTypeById, documentTypeIdSchema } from "@/features/documents/document-types";
import type { TemplateId } from "@/features/documents/template-ids";

export const Route = createFileRoute("/app/cases/new/template")({
  validateSearch: (search) =>
    z
      .object({
        mode: z.enum(["automatic", "guided"]).optional().catch(undefined),
        caseNumber: z.string().optional().catch(undefined),
        professionals: z.array(z.string()).optional().catch(undefined),
        docType: documentTypeIdSchema.optional().catch(undefined),
      })
      .parse(search),
  component: SelectTemplatePage,
});

function SelectTemplatePage() {
  const { mode, caseNumber, professionals = [], docType } = Route.useSearch();
  const [selectedId, setSelectedId] = useState<TemplateId | "">("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selectedId) return;
    navigate({
      to: "/app/cases/new/review",
      search: { mode, caseNumber, professionals, docType, templateId: selectedId },
    });
  };

  const docTypeInfo = docType ? getDocumentTypeById(docType) : undefined;
  const compatibleTemplates = docType ? getTemplatesForDocumentType(docType) : [];

  return (
    <div className="min-h-screen bg-[#0A0D14] pb-24 text-white">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />

      <header className="sticky top-0 z-50 px-6 pt-[calc(1.5rem+env(safe-area-inset-top))] pb-6 bg-[#0A0D14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/app/cases/new/document-type"
            search={{ mode, caseNumber, professionals, docType }}
            className="text-white/40 hover:text-white transition-colors"
          >
            Voltar
          </Link>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`w-8 h-1 rounded-full ${s === 4 ? "bg-veritas-electric" : s < 4 ? "bg-veritas-electric/40" : "bg-white/10"}`}
              />
            ))}
          </div>
          <div className="w-12" />
        </div>
        <h1 className="text-xl font-semibold tracking-tight">Escolher Modelo</h1>
        <p className="text-white/40 text-xs mt-1">
          Selecione a estrutura documental compatível com a modalidade escolhida.
        </p>
      </header>

      <main className="p-6 space-y-6 relative">
        {docTypeInfo && (
          <div className="p-4 rounded-2xl bg-veritas-electric/5 border border-veritas-electric/10">
            <p className="text-[10px] uppercase tracking-widest font-bold text-veritas-electric/60 mb-1">
              Modalidade Selecionada
            </p>
            <p className="text-sm font-medium text-white">{docTypeInfo.label}</p>
          </div>
        )}

        <div className="space-y-4">
          {compatibleTemplates.length > 0 ? (
            compatibleTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedId(template.id)}
                className={cn(
                  "w-full flex flex-col gap-3 p-5 rounded-2xl border transition-all duration-300 text-left",
                  selectedId === template.id
                    ? "bg-veritas-electric/10 border-veritas-electric/40 shadow-[0_0_20px_rgba(30,174,255,0.1)]"
                    : "bg-white/5 border-white/5 hover:border-white/10",
                )}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center border transition-colors",
                      selectedId === template.id
                        ? "bg-veritas-electric border-transparent"
                        : "bg-white/5 border-white/10",
                    )}
                  >
                    <FileText
                      className={cn(
                        "w-5 h-5",
                        selectedId === template.id ? "text-white" : "text-white/20",
                      )}
                    />
                  </div>
                  {selectedId === template.id && (
                    <div className="bg-veritas-electric/20 p-1 rounded-full">
                      <Check className="w-4 h-4 text-veritas-electric" />
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold">{template.name}</h3>
                  <p className="text-xs text-white/40 mt-1 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-2">
                  <span className="text-[9px] uppercase tracking-wider font-bold bg-white/5 px-2 py-1 rounded text-white/40 border border-white/5">
                    Estrutura Veritas
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-bold bg-veritas-violet/10 px-2 py-1 rounded text-veritas-violet/80 border border-veritas-violet/20">
                    {template.scope === "multiprofessional" ? "Multiprofissional" : "Geral"}
                  </span>
                </div>
              </button>
            ))
          ) : (
            <div className="p-8 text-center space-y-4 rounded-2xl border border-white/5 bg-white/5">
              <Info className="w-8 h-8 text-white/20 mx-auto" />
              <p className="text-sm text-white/40">
                Nenhum modelo compatível encontrado para esta modalidade.
              </p>
            </div>
          )}
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
