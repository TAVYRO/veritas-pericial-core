import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Veritas Pericial" },
      { name: "description", content: "Inteligência aplicada à prática pericial." },
      { property: "og:title", content: "Veritas Pericial" },
      { property: "og:description", content: "Inteligência aplicada à prática pericial." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SplashPage,
});

function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate({ to: "/onboarding" });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="veritas-hero-gradient relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6">
      {/* Subtle ambient grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative glow orbs */}
      <div className="pointer-events-none absolute left-1/4 top-1/5 h-40 w-40 rounded-full bg-veritas-electric/10 blur-[80px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-32 w-32 rounded-full bg-veritas-violet/10 blur-[70px]" />

      {/* Logo mark with animated rings */}
      <div className="animate-fade-in-up relative mb-8 flex items-center justify-center">
        <div className="absolute h-40 w-40 rounded-full border border-veritas-electric/20 animate-orbit-ring" />
        <div className="absolute h-32 w-32 rounded-full border border-veritas-violet/15 animate-orbit-ring-reverse" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-veritas-electric/30 bg-veritas-graphite/60 shadow-[0_0_40px_-10px_rgba(60,130,246,0.3)] backdrop-blur-sm">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            className="h-12 w-12 animate-pulse-glow"
            aria-label="Símbolo Veritas"
          >
            <path
              d="M12 36L24 8L36 36H12Z"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-veritas-electric"
            />
            <path
              d="M18 28H30"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="text-veritas-violet"
            />
            <circle
              cx="24"
              cy="38"
              r="3"
              fill="currentColor"
              className="text-veritas-electric-glow"
            />
          </svg>
        </div>
      </div>

      {/* Brand wordmark */}
      <div className="animate-fade-in-up z-10 text-center" style={{ animationDelay: "0.2s" }}>
        <h1 className="veritas-gradient-text text-5xl font-bold tracking-[0.12em] sm:text-6xl">
          VERITAS
        </h1>
        <p className="mt-2 text-lg font-light tracking-[0.35em] text-veritas-silver-dim">
          Pericial
        </p>
      </div>

      {/* Tagline */}
      <p
        className="animate-fade-in-up mt-8 max-w-xs text-center text-sm font-medium leading-relaxed tracking-wide text-veritas-silver-dim/80"
        style={{ animationDelay: "0.45s" }}
      >
        Inteligência aplicada à prática pericial.
      </p>

      {/* Tech loading bar */}
      <div
        className="animate-fade-in-up absolute bottom-16 left-1/2 w-48 -translate-x-1/2"
        style={{ animationDelay: "0.7s" }}
      >
        <div className="h-px w-full overflow-hidden rounded-full bg-veritas-electric/20">
          <div className="animate-tech-loader h-full rounded-full bg-gradient-to-r from-transparent via-veritas-electric to-veritas-violet" />
        </div>
        <p className="mt-3 text-center text-[10px] uppercase tracking-[0.25em] text-veritas-silver-dim/60">
          Inicializando
        </p>
      </div>
    </div>
  );
}
