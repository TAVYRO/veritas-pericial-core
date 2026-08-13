import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Eye, EyeOff, Check, User, Mail, Phone, Lock, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/register/")({
  component: RegisterIndexPage,
});

function RegisterIndexPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const passwordRequirements = [
    { label: "Mínimo 8 caracteres", met: formData.password.length >= 8 },
    { label: "Uma letra maiúscula", met: /[A-Z]/.test(formData.password) },
    { label: "Um número", met: /[0-9]/.test(formData.password) },
    { label: "Um caractere especial", met: /[^A-Za-z0-9]/.test(formData.password) },
  ];

  const calculatePasswordStrength = () => {
    const metCount = passwordRequirements.filter((req) => req.met).length;
    if (formData.password.length === 0) return 0;
    return (metCount / passwordRequirements.length) * 100;
  };

  const strength = calculatePasswordStrength();
  const strengthColor =
    strength <= 25
      ? "bg-red-500"
      : strength <= 50
        ? "bg-orange-500"
        : strength <= 75
          ? "bg-yellow-500"
          : "bg-veritas-electric";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/register/professional" });
  };

  return (
    <div className="min-h-screen veritas-hero-gradient flex flex-col p-6 overflow-hidden relative">
      <div className="absolute top-[-5%] right-[-10%] w-72 h-72 bg-veritas-electric/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[10%] left-[-10%] w-64 h-64 bg-veritas-violet/5 rounded-full blur-3xl" />

      <header className="relative z-10 mb-8 animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate({ to: "/login" })}
            className="text-veritas-silver hover:text-veritas-electric hover:bg-white/5 transition-colors rounded-full"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="text-right">
            <span className="text-veritas-electric text-xs font-bold uppercase tracking-widest">
              Etapa 1 de 3
            </span>
            <h1 className="text-xl font-bold text-veritas-silver">Criar sua conta</h1>
          </div>
        </div>
        <div className="space-y-2">
          <Progress value={33} className="h-1.5 bg-white/10" />
          <div className="flex justify-between text-[10px] text-veritas-silver-dim uppercase tracking-tighter font-medium">
            <span className="text-veritas-electric">Pessoal</span>
            <span>Profissional</span>
            <span>Segurança</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-md mx-auto w-full relative z-10 overflow-y-auto pb-12 custom-scrollbar">
        <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up">
          <div className="space-y-1.5">
            <Label
              htmlFor="fullName"
              className="text-veritas-silver/70 ml-1 text-[10px] uppercase tracking-wider font-bold"
            >
              Nome completo
            </Label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-veritas-silver-dim group-focus-within:text-veritas-electric transition-colors" />
              <Input
                id="fullName"
                placeholder="Seu nome completo"
                required
                className="bg-white/5 border-white/10 text-veritas-silver placeholder:text-veritas-silver/30 pl-10 h-11 focus:border-veritas-electric/50 focus:ring-veritas-electric/20 transition-all rounded-xl"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-veritas-silver/70 ml-1 text-[10px] uppercase tracking-wider font-bold"
            >
              E-mail profissional
            </Label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-veritas-silver-dim group-focus-within:text-veritas-electric transition-colors" />
              <Input
                id="email"
                type="email"
                placeholder="exemplo@pericia.com.br"
                required
                className="bg-white/5 border-white/10 text-veritas-silver placeholder:text-veritas-silver/30 pl-10 h-11 focus:border-veritas-electric/50 focus:ring-veritas-electric/20 transition-all rounded-xl"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="phone"
              className="text-veritas-silver/70 ml-1 text-[10px] uppercase tracking-wider font-bold"
            >
              Telefone
            </Label>
            <div className="relative group">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-veritas-silver-dim group-focus-within:text-veritas-electric transition-colors" />
              <Input
                id="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                required
                className="bg-white/5 border-white/10 text-veritas-silver placeholder:text-veritas-silver/30 pl-10 h-11 focus:border-veritas-electric/50 focus:ring-veritas-electric/20 transition-all rounded-xl"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="password"
              className="text-veritas-silver/70 ml-1 text-[10px] uppercase tracking-wider font-bold"
            >
              Senha
            </Label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-veritas-silver-dim group-focus-within:text-veritas-electric transition-colors" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className="bg-white/5 border-white/10 text-veritas-silver placeholder:text-veritas-silver/30 pl-10 pr-10 h-11 focus:border-veritas-electric/50 focus:ring-veritas-electric/20 transition-all rounded-xl"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-veritas-silver-dim hover:text-veritas-electric transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {formData.password.length > 0 && (
              <div className="space-y-2 px-1 py-1">
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full transition-all duration-500", strengthColor)}
                    style={{ width: `${strength}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-y-1 gap-x-2">
                  {passwordRequirements.map((req, i) => (
                    <div key={i} className="flex items-center space-x-1">
                      {req.met ? (
                        <Check className="h-3 w-3 text-veritas-electric" />
                      ) : (
                        <div className="h-1 w-1 rounded-full bg-veritas-silver/30 ml-1" />
                      )}
                      <span
                        className={cn(
                          "text-[9px] transition-colors",
                          req.met ? "text-veritas-silver" : "text-veritas-silver/40",
                        )}
                      >
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="confirmPassword"
              className="text-veritas-silver/70 ml-1 text-[10px] uppercase tracking-wider font-bold"
            >
              Confirmar senha
            </Label>
            <div className="relative group">
              <ShieldAlert className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-veritas-silver-dim group-focus-within:text-veritas-electric transition-colors" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className="bg-white/5 border-white/10 text-veritas-silver placeholder:text-veritas-silver/30 pl-10 pr-10 h-11 focus:border-veritas-electric/50 focus:ring-veritas-electric/20 transition-all rounded-xl"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-veritas-silver-dim hover:text-veritas-electric transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-veritas-electric hover:bg-veritas-electric-glow text-veritas-ink font-bold text-base shadow-[0_0_20px_-5px_rgba(101,217,255,0.4)] transition-all active:scale-[0.98] rounded-xl mt-4"
          >
            Continuar
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-veritas-silver-dim text-sm">
            Já possui uma conta?{" "}
            <Link
              to="/login"
              className="text-veritas-electric font-semibold hover:text-veritas-electric-glow transition-colors"
            >
              Entrar
            </Link>
          </p>
        </div>
      </main>

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}
