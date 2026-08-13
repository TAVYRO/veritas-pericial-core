import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true,
  );

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("Conexão restabelecida", {
        icon: <Wifi className="h-4 w-4 text-green-500" />,
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error("Você está offline", {
        description: "Alguns recursos podem ficar indisponíveis.",
        icon: <WifiOff className="h-4 w-4 text-red-500" />,
        duration: Infinity,
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
}

export function PWAUpdater() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [updateServiceWorker, setUpdateServiceWorker] = useState<
    ((reloadPage?: boolean) => Promise<void>) | null
  >(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      import("virtual:pwa-register").then(({ registerSW }) => {
        const updateSW = registerSW({
          onNeedRefresh() {
            setNeedRefresh(true);
            setUpdateServiceWorker(() => updateSW);
          },
          onOfflineReady() {
            toast.info("Veritas pronto para uso offline");
          },
        });
      });
    }
  }, []);

  if (!needRefresh) return null;

  return (
    <div className="fixed bottom-24 left-6 right-6 z-[100] animate-fade-in-up">
      <div className="bg-veritas-graphite/95 backdrop-blur-xl border border-veritas-electric/30 p-4 rounded-2xl shadow-2xl flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-veritas-electric/20 text-veritas-electric">
            <RefreshCw className="h-5 w-5 animate-spin-slow" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Nova versão disponível</h4>
            <p className="text-xs text-veritas-silver/60">
              Atualize para acessar as melhorias mais recentes.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 bg-veritas-electric text-veritas-ink font-bold hover:bg-veritas-electric-glow"
            onClick={() => updateServiceWorker?.(true)}
          >
            Atualizar agora
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="flex-1 text-veritas-silver hover:bg-white/5"
            onClick={() => setNeedRefresh(false)}
          >
            Depois
          </Button>
        </div>
      </div>
    </div>
  );
}
