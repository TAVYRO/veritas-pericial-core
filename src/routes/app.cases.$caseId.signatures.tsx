import { createFileRoute, useParams } from "@tanstack/react-router";
import { CheckCircle2, ShieldAlert, UserCheck } from "lucide-react";
import { useCaseWorkflow } from "@/features/cases/CaseWorkflowProvider";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/cases/$caseId/signatures")({
	component: SignaturesPage,
});

function SignaturesPage() {
	const { caseId } = useParams({ from: "/app/cases/$caseId/signatures" });
	const {
		getCase,
		getWorkflow,
		authorizeSignature,
		revokeSignature,
		isSignatureApproved,
	} = useCaseWorkflow();

	const caseData = getCase(caseId);
	const workflow = getWorkflow(caseId);

	if (!caseData || !workflow) return null;

	const toggleAuth = (proId: string) => {
		const isAuth = isSignatureApproved(
			caseId,
			proId,
			workflow.currentVersion.id,
		);
		if (isAuth) {
			revokeSignature(caseId, proId, workflow.currentVersion.id);
		} else {
			authorizeSignature(caseId, proId, workflow.currentVersion.id);
		}
	};

	return (
		<div className="p-6 space-y-6 pb-32">
			<header className="space-y-2">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-bold text-white tracking-tight">
						Assinaturas e Autorizações
					</h2>
					<div className="bg-veritas-electric/10 border border-veritas-electric/20 px-3 py-1 rounded-full">
						<span className="text-[10px] font-black text-veritas-electric uppercase tracking-widest">
							Versão atual: {workflow.currentVersion.label}
						</span>
					</div>
				</div>
				<p className="text-xs text-white/60 leading-relaxed">
					Gerencie as autorizações de uso de assinatura vinculadas à versão documental atual.
				</p>
				<p className="text-[10px] text-white/40 font-medium italic">
					Nenhuma assinatura é aplicada ao documento nesta etapa.
				</p>
			</header>

			<div className="grid gap-6">
				{caseData.professionals.map((pro) => {
					const isAuthorized = isSignatureApproved(
						caseId,
						pro.id,
						workflow.currentVersion.id,
					);
					return (
						<div
							key={pro.id}
							className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-6"
						>
							<div className="flex items-start justify-between">
								<div className="flex items-center gap-4">
									<div className="w-12 h-12 rounded-full bg-veritas-graphite border border-white/10 flex items-center justify-center">
										<UserCheck className="w-6 h-6 text-white/40" />
									</div>
									<div>
										<div className="flex items-center gap-2">
											<h3 className="text-sm font-bold text-white">{pro.name}</h3>
											{pro.isRequiredSigner && (
												<span className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded text-[8px] font-bold text-amber-500 uppercase tracking-tighter">
													Assinante obrigatório
												</span>
											)}
										</div>
										<p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">
											{pro.profession} • {pro.registration}
										</p>
									</div>
								</div>
								{isAuthorized && (
									<CheckCircle2 className="w-5 h-5 text-emerald-400" />
								)}
							</div>

							<div className="space-y-4 pt-6 border-t border-white/5">
								<div className="flex items-center justify-between">
									<p className="text-xs text-white/80 font-medium pr-4">
										Autorizar o uso da assinatura para este caso e para a versão {workflow.currentVersion.label}.
									</p>
									<button
										type="button"
										role="switch"
										aria-checked={isAuthorized}
										aria-label={
											isAuthorized 
												? `Revogar autorização de assinatura de ${pro.name} para ${workflow.currentVersion.label}` 
												: `Autorizar assinatura de ${pro.name} para ${workflow.currentVersion.label}`
										}
										onClick={() => toggleAuth(pro.id)}
										className={cn(
											"w-12 h-6 rounded-full relative transition-all duration-300 shrink-0",
											isAuthorized ? "bg-veritas-electric" : "bg-white/10",
										)}
									>
										<div
											className={cn(
												"absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300",
												isAuthorized ? "right-1" : "left-1",
											)}
										/>
									</button>
								</div>

								{isAuthorized && (
									<div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl flex items-center justify-center gap-3 animate-fade-in-up">
										<CheckCircle2 className="w-4 h-4 text-emerald-400" />
										<span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
											Autorização registrada para {workflow.currentVersion.label}
										</span>
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>

			<div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-2xl flex items-start gap-4">
				<ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
				<div className="space-y-1">
					<p className="text-[10px] text-amber-500/80 font-bold uppercase tracking-widest">
						Aviso técnico
					</p>
					<p className="text-xs text-amber-500/60 leading-relaxed">
						Esta etapa registra somente a autorização de uso da assinatura para o caso e a versão indicados. Nenhuma assinatura é aplicada ao arquivo nesta fase. Uma imagem de assinatura não equivale automaticamente a uma assinatura eletrônica qualificada ICP-Brasil.
					</p>
				</div>
			</div>
		</div>
	);
}
