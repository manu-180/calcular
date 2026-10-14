import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const CIERRE = ["March", "June", "September", "December"];

// series.json guarda cada trimestre en su primer día (2026-04-01); el ABS lo nombra por el mes en
// que termina (June quarter 2026).
export function nombreTrimestre(fecha: string): string {
  return `${CIERRE[Math.floor((Number(fecha.slice(5, 7)) - 1) / 3)]} quarter ${fecha.slice(0, 4)}`;
}

function inicioTrimestre(fecha: string): FechaISO {
  const mes = Math.floor((Number(fecha.slice(5, 7)) - 1) / 3) * 3 + 1;
  return `${fecha.slice(0, 4)}-${String(mes).padStart(2, "0")}-01` as FechaISO;
}

function trimestresAtras(fecha: FechaISO, n: number): FechaISO {
  const total = Number(fecha.slice(0, 4)) * 12 + Number(fecha.slice(5, 7)) - 1 - n * 3;
  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, "0")}-01` as FechaISO;
}

export interface VariacionTrimestral {
  inicial: FechaISO;
  final: FechaISO;
  indiceInicial: number;
  indiceFinal: number;
  factor: number;
  acumulada: number;
  anual: number | null;
  observaciones: string[];
}

// El motor entrega solo el último punto de la serie a la fecha de referencia; ese punto limita la
// historia que se lee del series.json importado, así un caso con fecha fija no ve datos posteriores.
export function variacionEntreTrimestres(
  puntos: readonly PuntoSerieTupla[],
  ultimo: PuntoSerie,
  desde: FechaISO,
  hasta: FechaISO,
  campos: { desde: string; hasta: string },
): VariacionTrimestral {
  const disponibles = puntos.filter(([f]) => f <= ultimo.fecha);
  const indice = new Map<string, number>(disponibles);
  const primero = disponibles[0]?.[0];
  if (!primero) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const observaciones: string[] = [];
  const inicial = inicioTrimestre(desde);
  let final = inicioTrimestre(hasta);
  if (inicial < primero) throw new ErrorEntrada(`The CPI available here starts in the ${nombreTrimestre(primero)}.`, campos.desde);
  if (inicial > ultimo.fecha) {
    throw new ErrorEntrada(`The CPI for the ${nombreTrimestre(inicial)} is not out yet. The latest is the ${nombreTrimestre(ultimo.fecha)}.`, campos.desde);
  }
  if (final > ultimo.fecha) {
    observaciones.push(`The latest CPI published is for the ${nombreTrimestre(ultimo.fecha)}, so the calculation stops there.`);
    final = ultimo.fecha;
  }
  if (inicial > final) throw new ErrorEntrada("The start date has to be before the end date.", campos.desde);
  const indiceInicial = indice.get(inicial);
  const indiceFinal = indice.get(final);
  if (indiceInicial === undefined || indiceFinal === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const haceUnAnio = indice.get(trimestresAtras(final, 4));
  const factor = indiceFinal / indiceInicial;
  return {
    inicial,
    final,
    indiceInicial,
    indiceFinal,
    factor,
    acumulada: (factor - 1) * 100,
    anual: haceUnAnio === undefined ? null : (indiceFinal / haceUnAnio - 1) * 100,
    observaciones,
  };
}
