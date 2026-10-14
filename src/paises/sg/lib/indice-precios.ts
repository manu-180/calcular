import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const MESES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function nombreMes(fecha: string): string {
  return `${MESES[Number(fecha.slice(5, 7)) - 1]} ${fecha.slice(0, 4)}`;
}

function primeroDelMes(fecha: string): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

function mesesAtras(fecha: FechaISO, meses: number): FechaISO {
  const total = Number(fecha.slice(0, 4)) * 12 + Number(fecha.slice(5, 7)) - 1 - meses;
  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, "0")}-01` as FechaISO;
}

export interface VariacionIndice {
  mesInicial: FechaISO;
  mesFinal: FechaISO;
  indiceInicial: number;
  indiceFinal: number;
  factor: number;
  acumulada: number;
  interanual: number | null;
  observaciones: string[];
}

// El motor solo entrega el último punto de la serie (requisito "serie"): ese punto fija hasta qué mes
// se puede usar la historia, que se lee del mismo series.json. Así un caso con fecha fija no ve meses
// publicados después de esa fecha.
export function variacionEntreMeses(
  puntos: readonly PuntoSerieTupla[],
  ultimo: PuntoSerie,
  desde: FechaISO,
  hasta: FechaISO,
  campos: { desde: string; hasta: string },
): VariacionIndice {
  const disponibles = puntos.filter(([f]) => f <= ultimo.fecha);
  const indice = new Map<string, number>(disponibles);
  const primero = disponibles[0]?.[0];
  if (!primero) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const observaciones: string[] = [];
  const mesInicial = primeroDelMes(desde);
  let mesFinal = primeroDelMes(hasta);
  if (mesInicial < primero) throw new ErrorEntrada(`The index starts in ${nombreMes(primero)}.`, campos.desde);
  if (mesInicial > ultimo.fecha) {
    throw new ErrorEntrada(`The CPI for ${nombreMes(mesInicial)} is not out yet. The latest is ${nombreMes(ultimo.fecha)}.`, campos.desde);
  }
  if (mesFinal > ultimo.fecha) {
    observaciones.push(`The latest CPI published is for ${nombreMes(ultimo.fecha)}, so the calculation stops at that month.`);
    mesFinal = ultimo.fecha;
  }
  if (mesInicial > mesFinal) throw new ErrorEntrada("The start month has to be before the end month.", campos.desde);
  const indiceInicial = indice.get(mesInicial);
  const indiceFinal = indice.get(mesFinal);
  if (indiceInicial === undefined || indiceFinal === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const haceUnAnio = indice.get(mesesAtras(mesFinal, 12));
  const factor = indiceFinal / indiceInicial;
  return {
    mesInicial,
    mesFinal,
    indiceInicial,
    indiceFinal,
    factor,
    acumulada: (factor - 1) * 100,
    interanual: haceUnAnio === undefined ? null : (indiceFinal / haceUnAnio - 1) * 100,
    observaciones,
  };
}
