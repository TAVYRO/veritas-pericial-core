import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Bem-vindo — Veritas Pericial" },
      { name: "description", content: "Comece a usar o Veritas Pericial." },
      { property: "og:title", content: "Bem-vindo — Veritas Pericial" },
      { property: "og:description", content: "Comece a usar o Veritas Pericial." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  return (
    <div className="veritas-hero-gradient flex min-h-screen w-full flex-col items-center justify-center px-6 text-center">
      <div className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-veritas-electric/30 bg-veritas-graphite/60 shadow-[0_0_40px_-10px_rgba(60,130,246,0.3)]">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          className="h-10 w-10 text-veritas-electric"
          aria-label="Símbolo Veritas"
        >
          <path
            d="M12 36L24 8L36 36H12Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 28H30"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="24" cy="38" r="3" fill="currentColor" />
        </svg>
      </div>

      <h1 className="veritas-gradient-text text-3xl font-semibold tracking-wide">
        Bem-vindo ao Veritas
      </h1>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-veritas-silver-dim/80">
        Sua nova ferramenta de trabalho pericial. Tecnologia, precisão e elegância em um só lugar.
      </p>

      <Link
        to="/login"
        className="mt-10 inline-flex items-center justify-center rounded-full bg-veritas-electric px-8 py-3 text-sm font-semibold tracking-wide text-veritas-ink shadow-[0_0_24px_-6px_rgba(60,130,246,0.5)] transition-all hover:bg-veritas-electric-glow hover:shadow-[0_0_32px_-4px_rgba(60,130,246,0.7)] active:scale-95"
      >
        Acessar sistema
      </Link>
    </div>
  );
}
