import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

export function nombreMes(fecha: string): string {
  return `${MESES[Number(fecha.slice(5, 7)) - 1]} de ${fecha.slice(0, 4)}`;
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
  mensual: number | null;
  interanual: number | null;
  observaciones: string[];
}

// El motor solo entrega el último punto de una serie (requisito "serie"): ese punto fija hasta qué
// mes se puede usar la historia, que se lee del mismo series.json importado por la calculadora.
// Así un caso con fecha fija no ve meses publicados después de esa fecha.
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
  if (mesInicial < primero) throw new ErrorEntrada(`El índice disponible empieza en ${nombreMes(primero)}.`, campos.desde);
  if (mesInicial > ultimo.fecha) {
    throw new ErrorEntrada(`Todavía no se ha publicado el índice de ${nombreMes(mesInicial)}. El último es el de ${nombreMes(ultimo.fecha)}.`, campos.desde);
  }
  if (mesFinal > ultimo.fecha) {
    observaciones.push(`El último índice publicado es el de ${nombreMes(ultimo.fecha)}, así que el cálculo llega hasta ese mes.`);
    mesFinal = ultimo.fecha;
  }
  if (mesInicial > mesFinal) throw new ErrorEntrada("La fecha inicial tiene que ser anterior a la fecha final.", campos.desde);
  const indiceInicial = indice.get(mesInicial);
  const indiceFinal = indice.get(mesFinal);
  if (indiceInicial === undefined || indiceFinal === undefined) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const anterior = indice.get(mesesAtras(mesFinal, 1));
  const haceUnAnio = indice.get(mesesAtras(mesFinal, 12));
  const factor = indiceFinal / indiceInicial;
  return {
    mesInicial,
    mesFinal,
    indiceInicial,
    indiceFinal,
    factor,
    acumulada: (factor - 1) * 100,
    mensual: anterior === undefined ? null : (indiceFinal / anterior - 1) * 100,
    interanual: haceUnAnio === undefined ? null : (indiceFinal / haceUnAnio - 1) * 100,
    observaciones,
  };
}
