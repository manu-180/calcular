import { aplicarEscalaMarginal, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// PAYE sale de los emolumentos brutos: desde 2018 el aporte a NAPSA ya no se resta antes de aplicar
// las bandas (folleto PAYE de la ZRA, 2026).
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

export function napsa(bruto: number, tasa: number, techo: number): number {
  return porcentaje(Math.min(Math.max(0, bruto), techo), tasa);
}

export function kwacha(n: number): string {
  return `K${n.toLocaleString("en-ZM", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
