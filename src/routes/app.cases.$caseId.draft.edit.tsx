import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  ChevronLeft,
  Save,
  MessageSquare,
  Eye,
  Edit3,
  Check,
  X,
  RefreshCw,
  Search,
  Plus,
  Trash2,
  FileText,
  AlertCircle,
} from "lucide-react";
import { useCaseWorkflow } from "@/features/cases/CaseWorkflowProvider";
import { useCaseDocument } from "@/features/documents/CaseDocumentProvider";
import { useState } from "react";

export const Route = createFileRoute("/app/cases/$caseId/draft/edit")({
  component: DraftEditPage,
});

function DraftEditPage() {
  const { caseId } = useParams({ from: "/app/cases/$caseId/draft/edit" });
  const { getCase, getWorkflow } = useCaseWorkflow();
  const {
    getDocument,
    ensureDocument,
    addSection,
    updateSection,
    removeSection,
    addParagraph,
    updateParagraph,
    removeParagraph,
  } = useCaseDocument();

  const caseData = getCase(caseId);
  const workflow = getWorkflow(caseId);

  // Local states for UI management
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newParagraphTexts, setNewParagraphTexts] = useState<
    Record<string, string>
  >({});

  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [sectionTitleDraft, setSectionTitleDraft] = useState("");

  const [editingParagraphId, setEditingParagraphId] = useState<string | null>(
    null,
  );
  const [paragraphTextDraft, setParagraphTextDraft] = useState("");

  const [confirmDelete, setConfirmDelete] = useState<{
    type: "section" | "paragraph";
    id: string;
  } | null>(null);

  if (!caseData || !workflow) {
    return (
      <div className="flex flex-col h-screen bg-veritas-ink items-center justify-center p-4">
        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl max-w-md w-full text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-veritas-electric mx-auto" />
          <h2 className="text-xl font-bold text-white">Caso não encontrado</h2>
          <p className="text-white/60 text-sm">
            Não foi possível carregar as informações do caso solicitado.
          </p>
          <Link
            to="/app/cases"
            className="inline-block px-6 py-2 bg-veritas-electric text-white rounded-lg font-bold"
          >
            Voltar para Casos
          </Link>
        </div>
      </div>
    );
  }

  const versionId = workflow.currentVersion.id;
  const document = getDocument(caseId, versionId);

  const handleStartDraft = () => {
    ensureDocument(caseId, versionId);
  };

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    addSection(caseId, versionId, { title: newSectionTitle, paragraphs: [] });
    setNewSectionTitle("");
  };

  const handleUpdateSection = (sectionId: string) => {
    if (!sectionTitleDraft.trim()) return;
    updateSection(caseId, versionId, sectionId, { title: sectionTitleDraft });
    setEditingSectionId(null);
  };

  const handleAddParagraph = (sectionId: string) => {
    const text = newParagraphTexts[sectionId]?.trim();
    if (!text) return;
    addParagraph(caseId, versionId, sectionId, { text });
    setNewParagraphTexts((prev) => ({ ...prev, [sectionId]: "" }));
  };

  const handleUpdateParagraph = (paragraphId: string) => {
    if (!paragraphTextDraft.trim()) return;
    updateParagraph(caseId, versionId, paragraphId, {
      text: paragraphTextDraft,
    });
    setEditingParagraphId(null);
  };

  const handleDelete = () => {
    if (!confirmDelete) return;
    if (confirmDelete.type === "section") {
      removeSection(caseId, versionId, confirmDelete.id);
    } else {
      removeParagraph(caseId, versionId, confirmDelete.id);
    }
    setConfirmDelete(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-veritas-ink text-white">
      <header className="sticky top-0 z-50 bg-veritas-graphite border-b border-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/app/cases/$caseId/draft"
            params={{ caseId }}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white/40" />
          </Link>
          <div>
            <h2 className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none mb-1">
              Editor de Relatório
            </h2>
            <p className="text-xs font-bold text-veritas-electric leading-none">
              Versão {workflow.currentVersion.label}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            to="/app/cases/$caseId/draft"
            params={{ caseId }}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
          >
            <Eye className="w-3.5 h-3.5" />
            Visualizar
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 space-y-8">
        {!document ? (
          <div className="py-20 text-center space-y-6 max-w-sm mx-auto">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
              <FileText className="w-10 h-10 text-white/20" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold">
                Nenhum rascunho foi iniciado nesta versão.
              </h3>
              <p className="text-sm text-white/40">
                Inicie um rascunho vazio para começar a estruturar o documento.
              </p>
            </div>
            <button
              onClick={handleStartDraft}
              className="w-full py-4 bg-veritas-electric hover:bg-veritas-electric/90 text-white rounded-xl font-bold transition-colors shadow-lg shadow-veritas-electric/20"
            >
              Iniciar rascunho
            </button>
          </div>
        ) : (
          <>
            {/* List of Sections */}
            <div className="space-y-8">
              {document.sections.length === 0 ? (
                <div className="py-12 border-2 border-dashed border-white/5 rounded-2xl text-center space-y-4">
                  <p className="text-white/40 text-sm italic">
                    Rascunho iniciado. Nenhuma seção criada.
                  </p>
                </div>
              ) : (
                document.sections.map((section) => (
                  <section
                    key={section.id}
                    className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-sm"
                  >
                    {/* Section Header */}
                    <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-b border-white/5">
                      {editingSectionId === section.id ? (
                        <div className="flex-1 flex gap-2">
                          <input
                            autoFocus
                            className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-1 text-sm focus:ring-1 focus:ring-veritas-electric outline-none"
                            value={sectionTitleDraft}
                            onChange={(e) =>
                              setSectionTitleDraft(e.target.value)
                            }
                            onKeyDown={(e) =>
                              e.key === "Enter" &&
                              handleUpdateSection(section.id)
                            }
                          />
                          <button
                            onClick={() => handleUpdateSection(section.id)}
                            className="p-1.5 bg-veritas-electric text-white rounded"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingSectionId(null)}
                            className="p-1.5 bg-white/10 text-white/60 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                              {section.id}
                            </span>
                            <h3 className="font-bold text-sm tracking-tight">
                              {section.title}
                            </h3>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingSectionId(section.id);
                                setSectionTitleDraft(section.title);
                              }}
                              className="p-1.5 hover:bg-white/10 rounded text-white/40 transition-colors"
                              aria-label="Editar título da seção"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                setConfirmDelete({
                                  type: "section",
                                  id: section.id,
                                })
                              }
                              className="p-1.5 hover:bg-red-500/20 rounded text-white/40 hover:text-red-400 transition-colors"
                              aria-label="Excluir seção"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Section Paragraphs */}
                    <div className="p-6 space-y-6">
                      {section.paragraphs.map((para) => (
                        <div
                          key={para.id}
                          className="group relative bg-white/[0.02] p-4 rounded-xl border border-transparent hover:border-white/5 transition-all"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                                {para.id}
                              </span>
                              {para.traceability && (
                                <span className="text-[8px] bg-veritas-electric/20 text-veritas-electric px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter">
                                  {para.traceability}
                                </span>
                              )}
                              {para.editorialMarker && (
                                <span className="text-[8px] bg-violet-500/20 text-violet-400 px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter">
                                  {para.editorialMarker}
                                </span>
                              )}
                            </div>
                            {editingParagraphId !== para.id && (
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => {
                                    setEditingParagraphId(para.id);
                                    setParagraphTextDraft(para.text);
                                  }}
                                  className="p-1 hover:bg-white/10 rounded text-white/40 transition-colors"
                                  aria-label="Editar parágrafo"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() =>
                                    setConfirmDelete({
                                      type: "paragraph",
                                      id: para.id,
                                    })
                                  }
                                  className="p-1 hover:bg-red-500/20 rounded text-white/40 hover:text-red-400 transition-colors"
                                  aria-label="Excluir parágrafo"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>

                          {editingParagraphId === para.id ? (
                            <div className="space-y-3">
                              <textarea
                                autoFocus
                                className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-sm leading-relaxed focus:ring-1 focus:ring-veritas-electric outline-none min-h-[100px] resize-none"
                                value={paragraphTextDraft}
                                onChange={(e) =>
                                  setParagraphTextDraft(e.target.value)
                                }
                              />
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => setEditingParagraphId(null)}
                                  className="px-3 py-1.5 text-xs text-white/60 hover:text-white transition-colors"
                                >
                                  Cancelar
                                </button>
                                <button
                                  onClick={() =>
                                    handleUpdateParagraph(para.id)
                                  }
                                  className="px-3 py-1.5 bg-veritas-electric text-white text-xs font-bold rounded-lg hover:bg-veritas-electric/90 transition-colors"
                                >
                                  Salvar alteração
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">
                              {para.text}
                            </p>
                          )}
                        </div>
                      ))}

                      {/* Add Paragraph Input */}
                      <div className="pt-4 border-t border-white/5">
                        <textarea
                          placeholder="Novo parágrafo..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:ring-1 focus:ring-veritas-electric outline-none min-h-[80px] resize-none transition-all placeholder:text-white/20"
                          value={newParagraphTexts[section.id] || ""}
                          onChange={(e) =>
                            setNewParagraphTexts((prev) => ({
                              ...prev,
                              [section.id]: e.target.value,
                            }))
                          }
                        />
                        <div className="mt-3 flex justify-end">
                          <button
                            onClick={() => handleAddParagraph(section.id)}
                            disabled={!newParagraphTexts[section.id]?.trim()}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-white/10 text-white text-xs font-bold rounded-lg transition-all"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Adicionar parágrafo
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                ))
              )}

              {/* Add New Section Area */}
              <div className="bg-veritas-electric/5 border border-veritas-electric/20 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-veritas-electric mb-2">
                  <Plus className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Nova Seção
                  </span>
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    placeholder="Título da seção (ex: Identificação, Análise...)"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-veritas-electric outline-none transition-all placeholder:text-white/20"
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddSection()}
                  />
                  <button
                    onClick={handleAddSection}
                    disabled={!newSectionTitle.trim()}
                    className="px-6 py-3 bg-veritas-electric hover:bg-veritas-electric/90 disabled:opacity-30 text-white font-bold rounded-xl transition-colors shadow-lg shadow-veritas-electric/10"
                  >
                    Adicionar seção
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-veritas-ink/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-veritas-graphite border border-white/10 p-8 rounded-2xl max-w-sm w-full space-y-6 shadow-2xl">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">
                Confirmar exclusão?
              </h3>
              <p className="text-sm text-white/60">
                {confirmDelete.type === "section"
                  ? "Esta ação removerá permanentemente esta seção e todos os seus parágrafos."
                  : "Esta ação removerá permanentemente este parágrafo."}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/20"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
