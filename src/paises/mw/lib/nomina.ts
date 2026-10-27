import { aplicarEscalaMarginal } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// La calculadora PAYE de la MRA aplica las bandas sobre el bruto mensual, sin restar el aporte a la
// pensión: seguimos ese criterio.
export function paye(bandas: readonly FilaEscala[], bruto: number): number {
  return aplicarEscalaMarginal(bandas, Math.max(0, bruto));
}

export function impuestoPorBanda(bandas: readonly FilaEscala[], base: number): number[] {
  return bandas.map((f) => {
    if (base <= f.desde) return 0;
    const tope = f.hasta === null ? base : Math.min(base, f.hasta);
    return ((tope - f.desde) * f.tasa) / 100;
  });
}

export function tasaMarginal(bandas: readonly FilaEscala[], base: number): number {
  let tasa = 0;
  for (const f of bandas) if (base > f.desde) tasa = f.tasa;
  return tasa;
}
