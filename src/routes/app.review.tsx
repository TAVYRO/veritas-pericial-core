import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/review")({
  loader: ({ location }) => {
    if (location.pathname === "/app/review/") {
      throw redirect({ to: "/app/review" as any });
    }
  },
  component: () => {
    const { ReviewPage } = require("./app.review_.index");
    return <ReviewPage />;
  }
});