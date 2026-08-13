import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/review/")({
  loader: () => {
    throw redirect({ to: "/app/review" as any });
  }
});