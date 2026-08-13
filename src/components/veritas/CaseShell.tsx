import { Outlet, useParams } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCaseWorkflow } from "@/features/cases/CaseWorkflowProvider";
import { BottomNavigation } from "./BottomNavigation";
import { CaseHeader } from "./navigation/CaseHeader";
import { CaseNavigation } from "./navigation/CaseNavigation";

export function CaseShell() {
	const { caseId } = useParams({ from: "/app/cases/$caseId" });
	const { getCase } = useCaseWorkflow();
	const caseData = getCase(caseId);

	if (!caseData) {
		return (
			<div className="min-h-screen bg-[#0A0D14] text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
				<Scale className="w-12 h-12 text-veritas-electric/40" />
				<h1 className="text-xl font-bold">Caso não encontrado</h1>
				<p className="text-white/40 text-sm">
					O processo {caseId} não existe ou você não tem permissão para
					acessá-lo.
				</p>
				<Link
					to="/app/cases"
					className="text-veritas-electric text-sm font-bold uppercase tracking-widest"
				>
					Voltar para Meus Casos
				</Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-[#0A0D14] text-white flex flex-col">
			{/* Combined Sticky Navigation Wrapper */}
			<div className="sticky top-0 z-50 bg-[#0A0D14]/80 backdrop-blur-xl border-b border-white/5">
				<CaseHeader caseData={caseData} />
				<CaseNavigation caseId={caseId} />
			</div>

			{/* Main Content */}
			<main className="flex-1 overflow-y-auto">
				<Outlet />
			</main>

			<BottomNavigation />
		</div>
	);
}
