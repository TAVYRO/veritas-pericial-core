import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, CheckCircle2, AlertCircle, Inspect, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCaseWorkflow } from "@/features/cases/CaseWorkflowProvider";
import { DocumentViewer } from "@/components/veritas/documents/DocumentViewer";
import { getMockPreview } from "@/features/documents/mock-document-preview";

export const Route = createFileRoute("/app/cases/$caseId/final/inspection")({
  component: InspectionPage,
});

const INSPECTION_ITEMS = [
  "Páginas",
  "Cortes",
  "Sobreposição",
  "Páginas vazias",
  "Tabelas",
  "Paginação",
  "Rodapé",
  "Assinaturas",
  "Equivalência DOCX/PDF",
];

function InspectionPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/final/inspection" });
  const { getCase, getWorkflow } = useCaseWorkflow();
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const caseData = getCase(caseId);
  const workflow = getWorkflow(caseId);
  const preview = getMockPreview(caseId);

  const toggle = (item: string) => {
    setChecked((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const checkedCount = INSPECTION_ITEMS.filter((item) => checked[item] === true).length;
  const allChecked = checkedCount === INSPECTION_ITEMS.length;

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
    <div className="p-6 space-y-8 pb-32 overflow-y-auto h-full bg-veritas-ink">
      <header className="flex items-center gap-3">
        <Link
          to="/app/cases/$caseId/final"
          params={{ caseId }}
          className="p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white/40" />
        </Link>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Inspeção Visual</h2>
          <p className="text-xs text-white/40">Checklist visual da pré-visualização documental.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* DOCUMENTVIEWER - Order 1 on mobile and desktop column 1 */}
        <div className="lg:col-span-2 order-1">
          {!preview ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center space-y-4">
              <p className="text-sm text-white/40">Pré-visualização documental indisponível.</p>
            </div>
          ) : (
            <DocumentViewer
              caseData={caseData}
              workflow={workflow}
              preview={preview}
              mode="inspection"
            />
          )}
        </div>

        {/* LATERAL PANEL - Order 2 on mobile and desktop column 2 */}
        <div className="space-y-6 order-2 lg:sticky lg:top-6">
          {/* AVISO DE EQUIVALÊNCIA - Mandatory order 2 on mobile / first in column on desktop */}
          <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl">
            <p className="text-[9px] text-amber-500/60 leading-relaxed italic">
              A equivalência real somente poderá ser verificada após a geração dos arquivos DOCX e
              PDF.
            </p>
          </div>

          {/* CHECKLIST CARD - Mandatory order 3 on mobile / second in column on desktop */}
          <div className="bg-veritas-graphite border border-white/5 p-6 rounded-2xl space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-white/40">
              Itens de Inspeção
            </h3>
            <div className="grid gap-2">
              {INSPECTION_ITEMS.map((item) => (
                <button
                  key={item}
                  onClick={() => toggle(item)}
                  className={cn(
                    "w-full bg-white/5 border p-4 rounded-xl flex items-center justify-between transition-all text-left",
                    checked[item]
                      ? "border-emerald-500/30 bg-emerald-500/[0.03]"
                      : "border-white/5",
                  )}
                >
                  <div className="flex flex-col gap-1">
                    <span
                      className={cn(
                        "text-xs font-bold transition-colors",
                        checked[item] ? "text-white" : "text-white/40",
                      )}
                    >
                      {item}
                    </span>
                    {item === "Equivalência DOCX/PDF" && (
                      <span className="text-[8px] text-white/20 uppercase font-black">
                        Item preparatório
                      </span>
                    )}
                  </div>
                  <div
                    className={cn(
                      "w-5 h-5 rounded-lg flex items-center justify-center border transition-all",
                      checked[item]
                        ? "bg-emerald-500 border-emerald-500 text-white"
                        : "border-white/10 text-transparent",
                    )}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                </button>
              ))}
            </div>

            <div
              className={cn(
                "p-6 rounded-2xl flex flex-col items-center gap-4 text-center transition-all",
                allChecked
                  ? "bg-emerald-500/10 border border-emerald-500/20"
                  : "bg-white/5 border border-white/5",
              )}
            >
              {allChecked ? (
                <>
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  <div>
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-white">
                      Checklist visual concluído para esta pré-visualização.
                    </h3>
                    <p className="text-[10px] text-white/40 mt-1 leading-relaxed">
                      Verificação da estrutura atual finalizada.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Inspect className="w-8 h-8 text-white/10" />
                  <p className="text-[10px] text-white/20 font-black uppercase tracking-widest">
                    Aguardando Inspeção ({checkedCount}/{INSPECTION_ITEMS.length})
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
