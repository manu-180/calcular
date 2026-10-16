import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const TRIMESTRES: Record<string, string> = { "03": "March", "06": "June", "09": "September", "12": "December" };

export function nombreTrimestre(fecha: string): string {
  return `${TRIMESTRES[fecha.slice(5, 7)] ?? fecha.slice(5, 7)} ${fecha.slice(0, 4)} quarter`;
}

// Stats NZ fecha cada trimestre por su último mes ("2026.06" es el trimestre de junio): una fecha
// cualquiera se lleva al primer día del último mes de su trimestre.
export function trimestreDe(fecha: string): FechaISO {
  const mes = Math.ceil(Number(fecha.slice(5, 7)) / 3) * 3;
  return `${fecha.slice(0, 4)}-${String(mes).padStart(2, "0")}-01` as FechaISO;
}

function trimestresAtras(fecha: string, n: number): FechaISO {
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

// El motor solo entrega el último punto de la serie; ese punto marca hasta dónde se puede leer la
// historia de series.json, así un caso con fecha fija no ve trimestres publicados después.
export function variacionEntreTrimestres(
  puntos: readonly PuntoSerieTupla[],
  ultimo: PuntoSerie,
  desde: string,
  hasta: string,
  campo: string,
): VariacionTrimestral {
  const disponibles = puntos.filter(([f]) => f <= ultimo.fecha);
  const indice = new Map<string, number>(disponibles);
  const primero = disponibles[0]?.[0];
  if (!primero) throw new ErrorEntrada({ codigo: "calculo-fallido" });
  const inicial = trimestreDe(desde);
  let final = trimestreDe(hasta);
  const observaciones: string[] = [];
  if (inicial < primero) throw new ErrorEntrada(`The index here starts in the ${nombreTrimestre(primero)}.`, campo);
  if (inicial > ultimo.fecha) {
    throw new ErrorEntrada(`The CPI for the ${nombreTrimestre(inicial)} isn't out yet. The latest is the ${nombreTrimestre(ultimo.fecha)}.`, campo);
  }
  if (final > ultimo.fecha) {
    observaciones.push(`The latest CPI is for the ${nombreTrimestre(ultimo.fecha)}, so the calculation stops there.`);
    final = ultimo.fecha;
  }
  if (inicial > final) throw new ErrorEntrada("The start date has to be before the end date.", campo);
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
