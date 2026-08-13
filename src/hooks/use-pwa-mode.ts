import { useState, useEffect } from "react";

export type DisplayMode = "fullscreen" | "standalone" | "browser";

export function usePWAMode() {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("browser");

  useEffect(() => {
    const checkMode = () => {
      if (window.matchMedia("(display-mode: fullscreen)").matches) {
        setDisplayMode("fullscreen");
      } else if (
        window.matchMedia("(display-mode: standalone)").matches ||
        (navigator as any).standalone === true
      ) {
        setDisplayMode("standalone");
      } else {
        setDisplayMode("browser");
      }
    };

    checkMode();

    // Listen for changes (some browsers support this)
    const mediaFullscreen = window.matchMedia("(display-mode: fullscreen)");
    const mediaStandalone = window.matchMedia("(display-mode: standalone)");

    mediaFullscreen.addEventListener("change", checkMode);
    mediaStandalone.addEventListener("change", checkMode);

    return () => {
      mediaFullscreen.removeEventListener("change", checkMode);
      mediaStandalone.removeEventListener("change", checkMode);
    };
  }, []);

  const requestFullscreen = async () => {
    // Only attempt if not already in fullscreen and on client
    if (typeof document !== "undefined" && !document.fullscreenElement) {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen({
            navigationUI: "hide",
          });
        }
      } catch (err) {
        console.warn("Fullscreen request failed:", err);
      }
    }
  };

  return { displayMode, isInstalled: displayMode !== "browser", requestFullscreen };
}
