import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function nombreMes(fecha: string): string {
  return `${MESES[Number(fecha.slice(5, 7)) - 1] ?? fecha.slice(5, 7)} ${fecha.slice(0, 4)}`;
}

function mesDe(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

function mesesAtras(fecha: string, n: number): FechaISO {
  const total = Number(fecha.slice(0, 4)) * 12 + Number(fecha.slice(5, 7)) - 1 - n;
  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, "0")}-01` as FechaISO;
}

export interface Variacion {
  inicial: FechaISO;
  final: FechaISO;
  indiceInicial: number;
  indiceFinal: number;
  factor: number;
  acumulada: number;
  anual: number | null;
  observaciones: string[];
}

// El motor entrega solo el último punto de la serie; ese punto marca hasta dónde se lee la historia
// de series.json, así un caso con fecha fija no ve meses publicados después.
export function variacionEntreMeses(puntos: readonly PuntoSerieTupla[], ultimo: PuntoSerie, desde: string, hasta: string, campo: string): Variacion {
  const disponibles = puntos.filter(([f]) => f <= ultimo.fecha);
  const indice = new Map<string, number>(disponibles);
  const primero = disponibles[0]?.[0];
  if (!primero) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const inicial = mesDe(desde);
  let final = mesDe(hasta);
  const observaciones: string[] = [];
  if (inicial < primero) throw new ErrorEntrada(`The index here starts in ${nombreMes(primero)}.`, campo);
  if (inicial > ultimo.fecha) throw new ErrorEntrada(`The CPI for ${nombreMes(inicial)} isn't out yet. The latest is ${nombreMes(ultimo.fecha)}.`, campo);
  if (final > ultimo.fecha) {
    observaciones.push(`The latest Composite CPI is for ${nombreMes(ultimo.fecha)}, so the calculation stops there.`);
    final = ultimo.fecha;
  }
  if (inicial > final) throw new ErrorEntrada("The start date has to be before the end date.", campo);
  const indiceInicial = indice.get(inicial);
  const indiceFinal = indice.get(final);
  if (indiceInicial === undefined || indiceFinal === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const haceUnAnio = indice.get(mesesAtras(final, 12));
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
