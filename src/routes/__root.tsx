import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { PWAUpdater, useOnlineStatus } from "@/components/veritas/PWAHandlers";
import { PWABrowserNotice } from "@/components/veritas/PWABrowserNotice";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-veritas-graphite px-6 text-center text-white relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)`,
          backgroundSize: '32px 32px' 
        }} 
      />
      <div className="max-w-md relative z-10 animate-fade-in-up">
        <h1 className="text-7xl font-black text-veritas-electric mb-4">404</h1>
        <h2 className="text-xl font-bold text-veritas-silver mb-2">Página não encontrada</h2>
        <p className="text-sm text-veritas-silver/60 mb-8">
          A página que você tentou acessar não existe ou foi movida.
        </p>
        <Link
          to="/"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-veritas-electric px-8 text-sm font-bold text-veritas-ink transition-all hover:bg-veritas-electric-glow active:scale-[0.98]"
        >
          Ir para o início
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-veritas-graphite px-6 text-center text-white relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.5) 1px, transparent 0)`,
          backgroundSize: '32px 32px' 
        }} 
      />
      <div className="max-w-md relative z-10 animate-fade-in-up">
        <h1 className="text-xl font-bold text-veritas-silver mb-2">
          Não foi possível carregar esta página
        </h1>
        <p className="text-sm text-veritas-silver/60 mb-8">
          Ocorreu um erro inesperado. Você pode tentar novamente ou voltar ao início.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="h-12 w-full inline-flex items-center justify-center rounded-xl bg-veritas-electric px-6 text-sm font-bold text-veritas-ink transition-all hover:bg-veritas-electric-glow active:scale-[0.98]"
          >
            Tentar novamente
          </button>
          <Link
            to="/"
            className="h-12 w-full inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 text-sm font-bold text-veritas-silver transition-all hover:bg-white/10"
          >
            Ir para o início
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "Veritas Pericial" },
      { name: "description", content: "Sistema inteligente de apoio à prática pericial profissional." },
      
      { name: "application-name", content: "Veritas Pericial" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "Veritas" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "theme-color", content: "#0f172a" },
      
      { property: "og:title", content: "Veritas Pericial" },
      { property: "og:description", content: "A inteligência técnica a serviço da justiça e do profissional." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icons/apple-touch-icon.png" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useOnlineStatus();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-center" expand={false} richColors />
      <PWAUpdater />
      <PWABrowserNotice />
    </QueryClientProvider>
  );
}
