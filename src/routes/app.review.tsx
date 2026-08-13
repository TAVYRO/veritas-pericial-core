import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/app/review")({
  component: () => <Navigate to="/app/review/" />,
});
