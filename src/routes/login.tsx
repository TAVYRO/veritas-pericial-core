import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePWAMode } from "@/hooks/use-pwa-mode";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Veritas Pericial" },
      { name: "description", content: "Acesse seu ambiente profissional no Veritas Pericial." },
      { property: "og:title", content: "Login — Veritas Pericial" },
      {
        property: "og:description",
        content: "Acesse seu ambiente profissional no Veritas Pericial.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { displayMode, requestFullscreen } = usePWAMode();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (displayMode !== "browser") {
      await requestFullscreen();
    }
    navigate({ to: "/app" });
  };

  return (
    <div className="veritas-hero-gradient flex min-h-screen w-full flex-col px-6 py-12">
      {/* Background patterns */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Logo and Header */}
      <div className="animate-fade-in-up flex flex-col items-center text-center">
        <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-veritas-electric/20 bg-veritas-graphite/60 shadow-[0_0_30px_-10px_rgba(60,130,246,0.3)]">
          <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8 text-veritas-electric">
            <path
              d="M12 36L24 8L36 36H12Z"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M18 28H30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="24" cy="38" r="3" fill="currentColor" />
          </svg>
        </div>
        <h1 className="veritas-gradient-text text-3xl font-bold tracking-tight">
          Bem-vindo de volta
        </h1>
        <p className="mt-2 text-veritas-silver-dim/70">Acesse seu ambiente profissional.</p>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="animate-fade-in-up mt-12 space-y-6"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" placeholder="nome@exemplo.com" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-veritas-silver-dim/60 transition-colors hover:text-veritas-electric"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" className="text-xs cursor-pointer">
              Lembrar de mim
            </Label>
          </div>
          <Link
            to="/forgot-password"
            className="text-xs font-medium text-veritas-electric hover:text-veritas-electric-glow transition-colors"
          >
            Esqueci minha senha
          </Link>
        </div>

        <Button type="submit" variant="veritas" size="xl" className="w-full">
          Entrar
        </Button>
      </form>

      {/* Divider */}
      <div
        className="animate-fade-in-up mt-8 flex items-center gap-4"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="h-px flex-1 bg-veritas-electric/10" />
        <span className="text-[10px] uppercase tracking-widest text-veritas-silver-dim/40">ou</span>
        <div className="h-px flex-1 bg-veritas-electric/10" />
      </div>

      {/* Social Login */}
      <div className="animate-fade-in-up mt-8" style={{ animationDelay: "0.25s" }}>
        <Button variant="veritas-outline" size="xl" className="w-full gap-3 font-medium">
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continuar com Google
        </Button>
      </div>

      {/* Footer */}
      <div
        className="animate-fade-in-up mt-auto pt-10 text-center"
        style={{ animationDelay: "0.3s" }}
      >
        <p className="text-sm text-veritas-silver-dim/60">
          Ainda não possui uma conta?{" "}
          <Link
            to="/register"
            className="font-semibold text-veritas-electric hover:text-veritas-electric-glow transition-colors"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
