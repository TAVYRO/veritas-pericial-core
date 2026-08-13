import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/templates")({
  component: TemplatesLayout,
});

function TemplatesLayout() {
  return <Outlet />;
}
