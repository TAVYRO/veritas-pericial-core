import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CaseWorkflowProvider } from "@/features/cases/CaseWorkflowProvider";
import { CaseDossierProvider } from "@/features/dossier/CaseDossierProvider";

export const Route = createFileRoute("/app")({
	component: AppLayout,
});

function AppLayout() {
	return (
		<CaseWorkflowProvider>
			<CaseDossierProvider>
				<Outlet />
			</CaseDossierProvider>
		</CaseWorkflowProvider>
	);
}
