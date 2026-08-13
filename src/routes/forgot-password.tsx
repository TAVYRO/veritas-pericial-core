import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ShieldCheck, Mail, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSuccess(true);
    }
  };

  return (
    <div className="min-h-screen veritas-hero-gradient flex flex-col p-6 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-veritas-electric/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 bg-veritas-violet/5 rounded-full blur-3xl" />
      
      {/* Back Button */}
      <div className="relative z-10 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate({ to: "/login" })}
          className="text-veritas-silver hover:text-veritas-electric hover:bg-white/5 transition-colors rounded-full"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </div>

      <main className="flex-1 flex flex-col max-w-md mx-auto w-full relative z-10">
        {!isSuccess ? (
          <div className="animate-fade-in-up space-y-8" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative group">
                <div className="absolute inset-0 bg-veritas-electric/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                <ShieldCheck className="h-8 w-8 text-veritas-electric relative z-10" />
              </div>
              
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight veritas-gradient-text">
                  Recuperar acesso
                </h1>
                <p className="text-veritas-silver-dim text-sm max-w-[280px]">
                  Informe seu e-mail cadastrado e enviaremos as instruções para redefinir sua senha.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-veritas-silver/70 ml-1 text-xs uppercase tracking-wider font-semibold">
                  E-mail profissional
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-veritas-silver-dim group-focus-within:text-veritas-electric transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemplo@veritas.com.br"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-white/10 text-veritas-silver placeholder:text-veritas-silver/30 pl-10 h-12 focus:border-veritas-electric/50 focus:ring-veritas-electric/20 transition-all rounded-xl"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-veritas-electric hover:bg-veritas-electric-glow text-veritas-ink font-bold text-base shadow-[0_0_20px_-5px_rgba(101,217,255,0.4)] hover:shadow-[0_0_25px_-2px_rgba(101,217,255,0.5)] transition-all active:scale-[0.98] rounded-xl"
              >
                Enviar instruções
              </Button>
            </form>
          </div>
        ) : (
          <div className="animate-fade-in-up space-y-8 text-center" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-veritas-electric/10 border border-veritas-electric/20 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-veritas-electric/10 rounded-full animate-pulse" />
                <CheckCircle2 className="h-10 w-10 text-veritas-electric relative z-10" />
              </div>
              
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-veritas-silver">
                  Verifique seu e-mail
                </h1>
                <p className="text-veritas-silver-dim text-sm max-w-[280px] mx-auto leading-relaxed">
                  Enviamos um link de recuperação para <span className="text-veritas-electric font-medium">{email}</span>. Verifique também sua caixa de spam.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                variant="outline"
                onClick={() => navigate({ to: "/login" })}
                className="w-full h-12 border-white/10 text-veritas-silver hover:bg-white/5 hover:border-veritas-electric/30 transition-all rounded-xl font-semibold"
              >
                Voltar ao login
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)`,
          backgroundSize: '32px 32px' 
        }} 
      />
    </div>
  );
}