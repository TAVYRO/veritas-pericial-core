import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  component: AppPage,
});

function AppPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-bold text-veritas-silver">Dashboard Veritas (Em breve)</h1>
      <Link to="/login" className="ml-4 text-veritas-electric">Sair</Link>
    </div>
  );
}
