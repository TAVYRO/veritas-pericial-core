import { createFileRoute, useParams } from "@tanstack/react-router";
import {
	Activity,
	CheckCircle2,
	Lock,
	ShieldCheck,
	Signature,
} from "lucide-react";
import { useCaseWorkflow } from "@/features/cases/CaseWorkflowProvider";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/cases/$caseId/approvals")({
	component: ApprovalsPage,
});

function ApprovalsPage() {
	const { caseId } = useParams({ from: "/app/cases/$caseId/approvals" });
	const { getWorkflow, getApprovalsCount, isFullyApproved, releaseFinal } =
		useCaseWorkflow();

	const workflow = getWorkflow(caseId);
	const approvedCount = getApprovalsCount(caseId);
	const isComplete = isFullyApproved(caseId);

	if (!workflow) return null;

	const approvals = [
		{
			id: 1,
			name: "Revisão profissional aprovada",
			icon: CheckCircle2,
			status: workflow.professionalReviewApproved,
		},
		{
			id: 2,
			name: "Auditoria técnica aprovada",
			icon: Activity,
			status: workflow.auditApproved,
		},
		{
			id: 3,
			name: "Isolamento do caso confirmado",
			icon: ShieldCheck,
			status: workflow.caseIsolationConfirmed,
		},
		{
			id: 4,
			name: "Assinaturas autorizadas",
			icon: Signature,
			status: approvedCount === 4,
		},
	];

	return (
		<div className="p-6 space-y-6 pb-32">
			<header className="space-y-4">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-bold text-white tracking-tight">
						Portão de Aprovações
					</h2>
					<div className="bg-veritas-electric/10 border border-veritas-electric/20 px-4 py-1.5 rounded-full">
						<span className="text-sm font-black text-veritas-electric">
							{approvedCount}/4
						</span>
					</div>
				</div>
				<p className="text-xs text-white/40 leading-relaxed">
					Para liberar a emissão do documento final, todos os pilares de
					segurança e conformidade devem estar validados.
				</p>
			</header>

			<div className="grid gap-4">
				{approvals.map((approval) => {
					const Icon = approval.icon;
					return (
						<div
							key={approval.id}
							className={cn(
								"bg-white/5 border rounded-2xl p-5 flex items-center justify-between transition-all",
								approval.status
									? "border-emerald-500/30 bg-emerald-500/[0.03]"
									: "border-white/5",
							)}
						>
							<div className="flex items-center gap-4">
								<div
									className={cn(
										"w-10 h-10 rounded-xl flex items-center justify-center",
										approval.status
											? "bg-emerald-500/10 text-emerald-400"
											: "bg-white/5 text-white/20",
									)}
								>
									<Icon className="w-5 h-5" />
								</div>
								<div>
									<h3
										className={cn(
											"text-sm font-bold",
											approval.status ? "text-white" : "text-white/40",
										)}
									>
										{approval.name}
									</h3>
									<p className="text-[9px] uppercase tracking-widest font-bold opacity-40">
										Verificação Independente
									</p>
								</div>
							</div>

							{approval.status ? (
								<CheckCircle2 className="w-5 h-5 text-emerald-400" />
							) : (
								<div className="w-5 h-5 rounded-full border-2 border-dashed border-white/20" />
							)}
						</div>
					);
				})}
			</div>

			<div className="mt-8 space-y-4">
				<button
					onClick={() => releaseFinal(caseId)}
					disabled={!isComplete || workflow.finalReleased}
					className={cn(
						"w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-xs transition-all",
						workflow.finalReleased
							? "bg-emerald-500 text-white"
							: isComplete
								? "bg-veritas-electric text-white shadow-[0_0_20px_rgba(100,116,255,0.4)]"
								: "bg-white/5 text-white/20 cursor-not-allowed",
					)}
				>
					{workflow.finalReleased ? (
						<CheckCircle2 className="w-4 h-4" />
					) : isComplete ? (
						<CheckCircle2 className="w-4 h-4" />
					) : (
						<Lock className="w-4 h-4" />
					)}
					{workflow.finalReleased
						? "Documento Final Liberado"
						: "Liberar Versão Final"}
				</button>
				{!isComplete && (
					<p className="text-center text-[9px] text-red-400 font-bold uppercase tracking-widest animate-pulse">
						Somente 4/4 libera final.
					</p>
				)}
			</div>
		</div>
	);
}
