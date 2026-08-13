import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/app/profile")({
  component: () => <Navigate to="/app/profile/" />,
});
