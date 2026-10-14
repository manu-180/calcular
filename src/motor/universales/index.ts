import { UNIVERSALES_COTIDIANAS } from "./cotidianas";
import { UNIVERSALES_FINANZAS } from "./finanzas";
import type { Universal } from "./tipos";

export const UNIVERSALES: readonly Universal<never>[] = [...UNIVERSALES_FINANZAS, ...UNIVERSALES_COTIDIANAS];

export function universal(id: string): Universal<never> | undefined {
  return UNIVERSALES.find((u) => u.id === id);
}
