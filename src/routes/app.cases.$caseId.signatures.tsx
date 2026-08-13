import { createFileRoute } from "@tanstack/react-router";
import { Signature, UserCheck, ShieldAlert, CheckCircle2, Info } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/cases/$caseId/signatures")({
  component: SignaturesPage,
});

const PROFESSIONALS = [
  { id: 1, name: "Dra. Mônica Hazama", role: "Psicóloga Perita", reg: "CRP 06/123456", authorized: false },
  { id: 2, name: "Dr. Roberto Silva", role: "Assistente Social", reg: "CRESS 12.345", authorized: false },
];

function SignaturesPage() {
  const [authStatus, setAuthStatus] = useState<Record<number, boolean>>({});

  const toggleAuth = (id: number) => {
    setAuthStatus(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-6 space-y-6 pb-32">
      <header className="space-y-1">
        <h2 className="text-xl font-bold text-white tracking-tight">Assinaturas e Autorizações</h2>
        <p className="text-xs text-white/40">Gestão das credenciais profissionais no documento final.</p>
      </header>

      <div className="grid gap-6">
        {PROFESSIONALS.map((pro) => (
          <div key={pro.id} className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-veritas-graphite border border-white/10 flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-white/40" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{pro.name}</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{pro.role} • {pro.reg}</p>
                </div>
              </div>
              {authStatus[pro.id] && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            </div>

            <div className="space-y-4 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between">
                <p className="text-xs text-white/80 font-medium">Autorizar assinatura para este caso e esta versão.</p>
                <button 
                  onClick={() => toggleAuth(pro.id)}
                  className={cn(
                    "w-12 h-6 rounded-full relative transition-all duration-300",
                    authStatus[pro.id] ? "bg-veritas-electric" : "bg-white/10"
                  )}
                >
                  <div className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300",
                    authStatus[pro.id] ? "right-1" : "left-1"
                  )} />
                </button>
              </div>

              {authStatus[pro.id] && (
                <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex flex-col items-center justify-center gap-3 animate-fade-in-up">
                  <div className="font-cursive text-2xl text-white/60 select-none opacity-40 italic">
                    {pro.name.split(' ').pop()}
                  </div>
                  <span className="text-[8px] text-emerald-400 font-bold uppercase tracking-widest">Assinatura Habilitada</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-2xl flex items-start gap-4">
        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
        <div className="space-y-1">
          <p className="text-[10px] text-amber-500/80 font-bold uppercase tracking-widest">Aviso Legal</p>
          <p className="text-xs text-amber-500/60 leading-relaxed">
            Assinatura digitalizada não constitui certificado digital ICP-Brasil. Para validade jurídica plena em processos eletrônicos, o arquivo exportado deverá ser assinado individualmente pelo profissional via portal do Tribunal ou assinador certificado.
          </p>
        </div>
      </div>
    </div>
  );
}