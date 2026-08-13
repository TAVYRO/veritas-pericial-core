import React, { createContext, useContext, useState, useCallback } from "react";
import type { 
  CaseDocumentVersion, 
  CaseDocumentSection, 
  CaseDocumentParagraph, 
  NewCaseDocumentSectionInput, 
  NewCaseDocumentParagraphInput 
} from "./case-document-types";

interface CaseDocumentContextType {
  getDocument: (caseId: string, versionId: string) => CaseDocumentVersion | undefined;
  ensureDocument: (caseId: string, versionId: string) => void;
  removeDocument: (caseId: string, versionId: string) => void;
  setFooterNote: (caseId: string, versionId: string, footerNote: string | undefined) => void;
  addSection: (caseId: string, versionId: string, input: NewCaseDocumentSectionInput) => void;
  updateSection: (caseId: string, versionId: string, sectionId: string, patch: Partial<Pick<CaseDocumentSection, "title">>) => void;
  removeSection: (caseId: string, versionId: string, sectionId: string) => void;
  addParagraph: (caseId: string, versionId: string, sectionId: string, input: NewCaseDocumentParagraphInput) => void;
  updateParagraph: (
    caseId: string, 
    versionId: string, 
    paragraphId: string, 
    patch: Partial<Pick<CaseDocumentParagraph, "text" | "traceability" | "editorialMarker">>
  ) => void;
  removeParagraph: (caseId: string, versionId: string, paragraphId: string) => void;
}

const CaseDocumentContext = createContext<CaseDocumentContextType | undefined>(undefined);

const makeDocumentKey = (caseId: string, versionId: string) => `${caseId}::${versionId}`;

const generateNextId = (existingIds: string[], prefix: string, regex: RegExp): string => {
  let maxSuffix = 0;
  existingIds.forEach(id => {
    const match = id.match(regex);
    if (match) {
      const num = parseInt(match[1] ?? "0", 10);
      if (!isNaN(num) && num > maxSuffix) maxSuffix = num;
    }
  });
  return `${prefix}${String(maxSuffix + 1).padStart(2, "0")}`;
};

export const CaseDocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Record<string, CaseDocumentVersion>>({});

  const getDocument = useCallback((caseId: string, versionId: string) => {
    const key = makeDocumentKey(caseId, versionId);
    return documents[key];
  }, [documents]);

  const ensureDocument = useCallback((caseId: string, versionId: string) => {
    const cId = caseId.trim();
    const vId = versionId.trim();
    if (!cId || !vId) return;

    const key = makeDocumentKey(cId, vId);
    setDocuments(prev => {
      if (prev[key]) return prev;
      const newDoc: CaseDocumentVersion = {
        caseId: cId,
        versionId: vId,
        sections: []
      };
      return {
        ...prev,
        [key]: newDoc
      };
    });
  }, []);

  const removeDocument = useCallback((caseId: string, versionId: string) => {
    const key = makeDocumentKey(caseId, versionId);
    setDocuments(prev => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const setFooterNote = useCallback((caseId: string, versionId: string, footerNote: string | undefined) => {
    const key = makeDocumentKey(caseId, versionId);
    const normalizedNote = typeof footerNote === "string" ? footerNote.trim() : undefined;
    const finalNote = normalizedNote === "" ? undefined : normalizedNote;

    setDocuments(prev => {
      const doc = prev[key];
      if (!doc) return prev;
      if (doc.footerNote === finalNote) return prev;
      return {
        ...prev,
        [key]: { ...doc, footerNote: finalNote }
      };
    });
  }, []);

  const addSection = useCallback((caseId: string, versionId: string, input: NewCaseDocumentSectionInput) => {
    const key = makeDocumentKey(caseId, versionId);
    const title = input.title.trim();
    if (!title) return;

    setDocuments(prev => {
      const doc = prev[key];
      if (!doc) return prev;

      const sectionId = generateNextId(
        doc.sections.map(s => s.id),
        "SEC",
        /^SEC(\d+)$/
      );

      const currentParagraphsIds = doc.sections.flatMap(s => s.paragraphs.map(p => p.id));
      const normalizedParagraphs: CaseDocumentParagraph[] = [];

      input.paragraphs.forEach(p => {
        const text = p.text.trim();
        if (!text) return;

        const pId = generateNextId(currentParagraphsIds, "PAR", /^PAR(\d+)$/);
        currentParagraphsIds.push(pId);
        normalizedParagraphs.push({
          id: pId,
          text,
          traceability: p.traceability,
          editorialMarker: p.editorialMarker
        });
      });

      const newSection: CaseDocumentSection = {
        id: sectionId,
        title,
        paragraphs: normalizedParagraphs
      };

      return {
        ...prev,
        [key]: {
          ...doc,
          sections: [...doc.sections, newSection]
        }
      };
    });
  }, []);

  const updateSection = useCallback((caseId: string, versionId: string, sectionId: string, patch: Partial<Pick<CaseDocumentSection, "title">>) => {
    const key = makeDocumentKey(caseId, versionId);
    const title = patch.title?.trim();
    if (title === "") return;

    setDocuments(prev => {
      const doc = prev[key];
      if (!doc) return prev;

      const sectionIndex = doc.sections.findIndex(s => s.id === sectionId);
      if (sectionIndex === -1) return prev;

      const section = doc.sections[sectionIndex]!;
      const newTitle = title !== undefined ? title : section.title;
      if (section.title === newTitle) return prev;

      const updatedSections = [...doc.sections];
      updatedSections[sectionIndex] = {
        id: section.id,
        title: newTitle,
        paragraphs: section.paragraphs
      };

      return {
        ...prev,
        [key]: { ...doc, sections: updatedSections }
      };
    });
  }, []);

  const removeSection = useCallback((caseId: string, versionId: string, sectionId: string) => {
    const key = makeDocumentKey(caseId, versionId);
    setDocuments(prev => {
      const doc = prev[key];
      if (!doc) return prev;
      if (!doc.sections.some(s => s.id === sectionId)) return prev;

      return {
        ...prev,
        [key]: {
          ...doc,
          sections: doc.sections.filter(s => s.id !== sectionId)
        }
      };
    });
  }, []);

  const addParagraph = useCallback((caseId: string, versionId: string, sectionId: string, input: NewCaseDocumentParagraphInput) => {
    const key = makeDocumentKey(caseId, versionId);
    const text = input.text.trim();
    if (!text) return;

    setDocuments(prev => {
      const doc = prev[key];
      if (!doc) return prev;

      const sectionIndex = doc.sections.findIndex(s => s.id === sectionId);
      if (sectionIndex === -1) return prev;

      const section = doc.sections[sectionIndex]!;
      const allParagraphIds = doc.sections.flatMap(s => s.paragraphs.map(p => p.id));
      const pId = generateNextId(allParagraphIds, "PAR", /^PAR(\d+)$/);

      const newParagraph: CaseDocumentParagraph = {
        id: pId,
        text,
        traceability: input.traceability,
        editorialMarker: input.editorialMarker
      };

      const updatedSections = [...doc.sections];
      updatedSections[sectionIndex] = {
        id: section.id,
        title: section.title,
        paragraphs: [...section.paragraphs, newParagraph]
      };

      return {
        ...prev,
        [key]: { ...doc, sections: updatedSections }
      };
    });
  }, []);

  const updateParagraph = useCallback((
    caseId: string, 
    versionId: string, 
    paragraphId: string, 
    patch: Partial<Pick<CaseDocumentParagraph, "text" | "traceability" | "editorialMarker">>
  ) => {
    const key = makeDocumentKey(caseId, versionId);
    const text = patch.text?.trim();
    if (text === "") return;

    setDocuments(prev => {
      const doc = prev[key];
      if (!doc) return prev;

      let targetSectionIndex = -1;
      let targetParagraphIndex = -1;

      for (let i = 0; i < doc.sections.length; i++) {
        const pIndex = doc.sections[i]!.paragraphs.findIndex(p => p.id === paragraphId);
        if (pIndex !== -1) {
          targetSectionIndex = i;
          targetParagraphIndex = pIndex;
          break;
        }
      }

      if (targetSectionIndex === -1) return prev;

      const section = doc.sections[targetSectionIndex];
      const currentParagraph = section.paragraphs[targetParagraphIndex];
      
      const newText = text !== undefined ? text : currentParagraph.text;
      const newTraceability = patch.hasOwnProperty("traceability") ? patch.traceability : currentParagraph.traceability;
      const newEditorialMarker = patch.hasOwnProperty("editorialMarker") ? patch.editorialMarker : currentParagraph.editorialMarker;

      const hasChanges = 
        currentParagraph.text !== newText ||
        currentParagraph.traceability !== newTraceability ||
        currentParagraph.editorialMarker !== newEditorialMarker;

      if (!hasChanges) return prev;

      const updatedSections = [...doc.sections];
      const updatedParagraphs = [...section.paragraphs];
      updatedParagraphs[targetParagraphIndex] = {
        id: currentParagraph.id,
        text: newText,
        traceability: newTraceability,
        editorialMarker: newEditorialMarker
      };
      updatedSections[targetSectionIndex] = {
        id: section.id,
        title: section.title,
        paragraphs: updatedParagraphs
      };

      return {
        ...prev,
        [key]: { ...doc, sections: updatedSections }
      };
    });
  }, []);

  const removeParagraph = useCallback((caseId: string, versionId: string, paragraphId: string) => {
    const key = makeDocumentKey(caseId, versionId);
    setDocuments(prev => {
      const doc = prev[key];
      if (!doc) return prev;

      let found = false;
      const updatedSections = doc.sections.map(s => {
        const nextParagraphs = s.paragraphs.filter(p => p.id !== paragraphId);
        if (nextParagraphs.length !== s.paragraphs.length) {
          found = true;
          return {
            id: s.id,
            title: s.title,
            paragraphs: nextParagraphs
          };
        }
        return s;
      });

      if (!found) return prev;

      return {
        ...prev,
        [key]: { ...doc, sections: updatedSections }
      };
    });
  }, []);

  const value: CaseDocumentContextType = {
    getDocument,
    ensureDocument,
    removeDocument,
    setFooterNote,
    addSection,
    updateSection,
    removeSection,
    addParagraph,
    updateParagraph,
    removeParagraph
  };

  return (
    <CaseDocumentContext.Provider value={value}>
      {children}
    </CaseDocumentContext.Provider>
  );
};

export const useCaseDocument = () => {
  const context = useContext(CaseDocumentContext);
  if (context === undefined) {
    throw new Error("useCaseDocument must be used within a CaseDocumentProvider");
  }
  return context;
};
