import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-bold text-veritas-silver">Criar Conta (Em breve)</h1>
      <Link to="/login" className="ml-4 text-veritas-electric">Voltar ao login</Link>
    </div>
  );
}
