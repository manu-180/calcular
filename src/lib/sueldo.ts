import { APORTES, TOTAL_APORTES, topeSipa } from "@/data/sueldo";

export type DesgloseAportes = {
  baseImponible: number;
  jubilacion: number;
  pami: number;
  obraSocial: number;
  total: number;
  topeAplicado: boolean;
};

// Aportes personales sobre la remuneración bruta, con el tope SIPA: por encima de la
// base máxima imponible, los aportes se calculan solo sobre el tope (la base se trunca).
export function calcularAportes(brutoRemunerativo: number): DesgloseAportes {
  const baseImponible = Math.min(
    Math.max(0, brutoRemunerativo),
    topeSipa().baseMaxima,
  );
  const jubilacion = baseImponible * APORTES.jubilacion;
  const pami = baseImponible * APORTES.pami;
  const obraSocial = baseImponible * APORTES.obraSocial;
  return {
    baseImponible,
    jubilacion,
    pami,
    obraSocial,
    total: jubilacion + pami + obraSocial,
    topeAplicado: brutoRemunerativo > topeSipa().baseMaxima,
  };
}

export type DesgloseNeto = {
  bruto: number;
  aportes: DesgloseAportes;
  cuotaSindical: number;
  ganancias: number;
  neto: number;
};

// Neto = bruto − aportes (con tope) − cuota sindical − Ganancias (si se pasa la
// retención estimada de lib/ganancias). `sindicalPct` en fracción (0,02 = 2%).
export function brutoANeto(
  bruto: number,
  opts: { sindicalPct?: number; ganancias?: number } = {},
): DesgloseNeto {
  const aportes = calcularAportes(bruto);
  const cuotaSindical = Math.max(0, bruto) * (opts.sindicalPct ?? 0);
  const ganancias = opts.ganancias ?? 0;
  const neto = bruto - aportes.total - cuotaSindical - ganancias;
  return { bruto, aportes, cuotaSindical, ganancias, neto };
}

// Inverso (sin Ganancias): dado el neto que querés cobrar, qué bruto necesitás.
// Cerrado: por debajo del tope los aportes son proporcionales; por encima, fijos.
export function netoABruto(
  neto: number,
  opts: { sindicalPct?: number } = {},
): number {
  const s = opts.sindicalPct ?? 0;
  // Tramo 1 (bruto ≤ tope): neto = bruto·(1 − 0,17 − s)
  const factor = 1 - TOTAL_APORTES - s;
  const brutoSinTope = factor > 0 ? neto / factor : 0;
  if (brutoSinTope <= topeSipa().baseMaxima) return brutoSinTope;
  // Tramo 2 (bruto > tope): aportes fijos = tope·0,17; sindical sigue sobre el bruto.
  // neto = bruto·(1 − s) − tope·0,17  →  bruto = (neto + tope·0,17) / (1 − s)
  const aportesFijos = topeSipa().baseMaxima * TOTAL_APORTES;
  return (1 - s) > 0 ? (neto + aportesFijos) / (1 - s) : brutoSinTope;
}
