import { porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// Hvert þrep er námundað fyrir sig: þannig fær Skatturinn 186.445 kr. í dæminu í orðsendingu 1/2026
// (156.859 + 29.586), en heildin námunduð í einu lagi gæfi 186.444.
export function skatturAfStofni(stofn: number, escala: readonly FilaEscala[], redondear: (x: number) => number): number {
  let summa = 0;
  let nedri = 0;
  for (const fila of escala) {
    const efri = fila.hasta ?? Infinity;
    const hluti = Math.min(stofn, efri) - nedri;
    if (hluti > 0) summa += redondear(porcentaje(hluti, fila.tasa));
    nedri = efri;
  }
  return summa;
}

export interface ForsendurLauna {
  escala: readonly FilaEscala[];
  afslattur: number;
  lifeyrir: number;
}

export interface ValLauna {
  sereign?: number;
  nyting?: number;
  felagsgjald?: number;
}

export interface Sundurlidun {
  lifeyrir: number;
  sereign: number;
  stofn: number;
  skattur: number;
  afslattur: number;
  stadgreidsla: number;
  felagsgjald: number;
  utborgad: number;
}

export function reiknaLaun(laun: number, f: ForsendurLauna, val: ValLauna, redondear: (x: number) => number): Sundurlidun {
  const lifeyrir = redondear(porcentaje(laun, f.lifeyrir));
  const sereign = redondear(porcentaje(laun, val.sereign ?? 0));
  const stofn = laun - lifeyrir - sereign;
  const skattur = skatturAfStofni(stofn, f.escala, redondear);
  const afslattur = redondear(porcentaje(f.afslattur, val.nyting ?? 100));
  const stadgreidsla = Math.max(0, skattur - afslattur);
  const felagsgjald = redondear(porcentaje(laun, val.felagsgjald ?? 0));
  return { lifeyrir, sereign, stofn, skattur, afslattur, stadgreidsla, felagsgjald, utborgad: laun - lifeyrir - sereign - stadgreidsla - felagsgjald };
}
