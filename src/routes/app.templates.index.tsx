import { createFileRoute, Link } from "@tanstack/react-router";
import { BottomNavigation } from "@/components/veritas/BottomNavigation";
import { ChevronLeft } from "lucide-react";
import { getActiveTemplates } from "@/features/documents/mock-templates";
import { TemplateCard } from "@/components/veritas/templates/TemplateCard";

export const Route = createFileRoute("/app/templates/")({
  component: TemplatesListPage,
});

function TemplatesListPage() {
  const templates = getActiveTemplates();
  
  const generalTemplates = templates.filter((t) => t.scope === "general");
  const multiprofessionalTemplates = templates.filter((t) => t.scope === "multiprofessional");

  return (
    <div className="min-h-screen bg-[#0A0D14] pb-24 text-white">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
      
      <header className="sticky top-0 z-50 px-6 pt-[calc(1.5rem+env(safe-area-inset-top))] pb-6 bg-[#0A0D14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4 mb-4">
          <Link 
            to="/app" 
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Biblioteca de Modelos</h1>
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Estruturas documentais disponíveis</p>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-8 relative">
        {generalTemplates.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold text-veritas-electric uppercase tracking-widest px-1">Geral</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generalTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </section>
        )}

        {multiprofessionalTemplates.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-bold text-veritas-violet uppercase tracking-widest px-1">Multiprofissional</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {multiprofessionalTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </section>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
