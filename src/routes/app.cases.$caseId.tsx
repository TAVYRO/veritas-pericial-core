import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/cases/$caseId")({
  component: CaseDetailsPage,
});

function CaseDetailsPage() {
  const { caseId } = Route.useParams();
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">Detalhes do Caso</h1>
      <p className="mt-4 text-veritas-silver">Visualizando processo: {caseId}</p>
      <div className="mt-8 p-4 bg-veritas-graphite/40 border border-white/5 rounded-xl">
        <p>Esta é uma rota dinâmica preparada para o ID do caso.</p>
      </div>
    </div>
  );
}
