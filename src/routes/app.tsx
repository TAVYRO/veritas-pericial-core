import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CaseWorkflowProvider } from "@/features/cases/CaseWorkflowProvider";

export const Route = createFileRoute("/app")({
	component: AppLayout,
});

function AppLayout() {
	return (
		<CaseWorkflowProvider>
			<Outlet />
		</CaseWorkflowProvider>
	);
}
