"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

export function useMedia(query: string): boolean {
  const suscribir = useCallback(
    (avisar: () => void) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", avisar);
      return () => m.removeEventListener("change", avisar);
    },
    [query],
  );
  return useSyncExternalStore(
    suscribir,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function useMenosMovimiento(): boolean {
  return useMedia("(prefers-reduced-motion: reduce)");
}

export function useAncho(): boolean {
  return useMedia("(min-width: 768px)");
}

// Arranca en la hora en que se generaron los datos para que el servidor y el primer render del
// cliente escriban lo mismo; recién después de hidratar pasa al reloj real.
export function useAhora(generado: string, cadaMs = 30_000): number {
  const [ahora, setAhora] = useState(() => Date.parse(generado));
  useEffect(() => {
    setAhora(Date.now());
    const id = window.setInterval(() => setAhora(Date.now()), cadaMs);
    return () => window.clearInterval(id);
  }, [cadaMs, generado]);
  return ahora;
}

export function desplazarA(id: string, suave: boolean) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: suave ? "smooth" : "auto", block: "start" });
}
