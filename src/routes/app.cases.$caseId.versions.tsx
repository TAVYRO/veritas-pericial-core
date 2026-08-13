import { createFileRoute } from "@tanstack/react-router";
import { useCaseWorkflow } from "@/features/cases/CaseWorkflowProvider";
import { 
  History, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/cases/$caseId/versions")({
  component: VersionsCentral,
});

function VersionsCentral() {
  const { caseId } = Route.useParams();
  const { getCase, getWorkflow, createNextVersion } = useCaseWorkflow();
  const caseData = getCase(caseId);
  const workflow = getWorkflow(caseId);
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!caseData || !workflow) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <AlertCircle className="w-12 h-12 text-slate-500 mb-4" />
        <h3 className="text-lg font-medium text-slate-200">Histórico de versões indisponível</h3>
        <p className="text-sm text-slate-400 mt-1">Não foi possível carregar os dados deste caso.</p>
      </div>
    );
  }

  // Descending order
  const sortedVersions = [...workflow.versions].sort((a, b) => b.number - a.number);

  const handleCreateVersion = () => {
    const success = createNextVersion(caseId);
    if (success) {
      setShowConfirm(false);
      setError(null);
    } else {
      setError("Não foi possível criar uma nova versão com segurança.");
    }
  };

  const getStatusLabel = (status: string, isCurrent: boolean, finalReleased: boolean) => {
    if (isCurrent && finalReleased) return "Final";
    switch (status) {
      case "draft": return "Rascunho";
      case "review": return "Em revisão";
      case "approved": return "Aprovada";
      case "final": return "Final";
      case "archived": return "Arquivada";
      default: return status;
    }
  };

  const getStatusColor = (status: string, isCurrent: boolean, finalReleased: boolean) => {
    if (isCurrent && finalReleased) return "bg-green-500/10 text-green-400 border-green-500/20";
    switch (status) {
      case "draft": return "bg-slate-500/10 text-slate-400 border-slate-500/20";
      case "review": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "final": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "archived": return "bg-slate-700/10 text-slate-500 border-slate-700/20";
      default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-24">
      <header>
        <div className="flex items-center gap-2 mb-1">
          <History className="w-5 h-5 text-veritas-blue" />
          <h1 className="text-2xl font-semibold text-slate-100">Central de Versões</h1>
        </div>
        <p className="text-slate-400 text-sm">
          Histórico documental do caso. Versões anteriores são preservadas e não são sobrescritas.
        </p>
      </header>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-200">{error}</p>
        </div>
      )}

      {!showConfirm ? (
        <Button 
          onClick={() => setShowConfirm(true)}
          className="w-full sm:w-auto bg-veritas-blue hover:bg-veritas-blue/90 text-white"
        >
          Criar nova versão
        </Button>
      ) : (
        <Card className="p-4 border-amber-500/30 bg-amber-500/5 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-amber-200">Confirmar criação de nova versão</h4>
              <p className="text-xs text-amber-200/70 leading-relaxed">
                Uma nova versão preservará a versão atual e iniciará uma nova etapa documental. 
                A Revisão Profissional e a Auditoria Técnica precisarão ser realizadas novamente para a nova versão.
              </p>
              <p className="text-xs text-amber-200/70 leading-relaxed">
                Autorizações de assinatura da versão anterior não serão reutilizadas na nova versão.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowConfirm(false)}
              className="flex-1 sm:flex-none border-slate-700 text-slate-300"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateVersion}
              className="flex-1 sm:flex-none bg-amber-600 hover:bg-amber-700 text-white"
            >
              Confirmar criação
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {sortedVersions.map((version) => {
          const isCurrent = version.id === workflow.currentVersion.id;
          const authCount = workflow.signatureAuthorizations.filter(
            a => a.versionId === version.id && a.authorized
          ).length;

          return (
            <Card 
              key={version.id} 
              className={cn(
                "p-4 border-slate-800 bg-slate-900/50 transition-all",
                isCurrent && "border-veritas-blue/30 ring-1 ring-veritas-blue/20"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                    isCurrent ? "bg-veritas-blue/20 text-veritas-blue" : "bg-slate-800 text-slate-500"
                  )}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-slate-200">{version.label}</h3>
                      <Badge 
                        variant="outline" 
                        className={cn("text-[10px] py-0 px-1.5 h-4", getStatusColor(version.status, isCurrent, workflow.finalReleased))}
                      >
                        {getStatusLabel(version.status, isCurrent, workflow.finalReleased)}
                      </Badge>
                      {isCurrent && (
                        <Badge className="bg-veritas-blue/20 text-veritas-blue border-veritas-blue/30 text-[10px] py-0 px-1.5 h-4">
                          Versão atual
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Versão #{version.number}
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Autorizações de assinatura: {authCount}
                      </span>
                    </div>
                  </div>
                </div>
                {isCurrent && (
                  <ArrowRight className="w-4 h-4 text-veritas-blue mt-1" />
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="bg-slate-900/40 border border-slate-800/60 rounded-lg p-4 mt-8">
        <div className="flex gap-3">
          <AlertCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed">
            Nesta fase, a Central gerencia referências de versão em memória. 
            O conteúdo histórico completo será associado às versões quando a persistência documental for implementada.
          </p>
        </div>
      </div>
    </div>
  );
}
