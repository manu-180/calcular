"use client";

import { useSyncExternalStore } from "react";

const nada = () => () => {};
const esMac = () => /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent);

// El HTML estático no sabe en qué sistema se abre: arranca con "Ctrl K" y se corrige al
// hidratar, sin error de hidratación (useSyncExternalStore re-renderiza con el valor real).
export function useAtajo(): string {
  return useSyncExternalStore(nada, () => (esMac() ? "⌘ K" : "Ctrl K"), () => "Ctrl K");
}
