import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-bold text-veritas-silver">Recuperar Senha (Em breve)</h1>
      <Link to="/login" className="ml-4 text-veritas-electric">Voltar ao login</Link>
    </div>
  );
}
