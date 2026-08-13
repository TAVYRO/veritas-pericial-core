import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CaseWorkflowProvider } from "@/features/cases/CaseWorkflowProvider";
import { CaseDossierProvider } from "@/features/dossier/CaseDossierProvider";
import { CaseDocumentProvider } from "@/features/documents/CaseDocumentProvider";

export const Route = createFileRoute("/app")({
	component: AppLayout,
});

function AppLayout() {
	return (
		<CaseWorkflowProvider>
			<CaseDossierProvider>
				<CaseDocumentProvider>
					<Outlet />
				</CaseDocumentProvider>
			</CaseDossierProvider>
		</CaseWorkflowProvider>
	);
}
