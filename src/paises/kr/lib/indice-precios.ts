import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

export function nombreMes(fecha: string): string {
  return `${fecha.slice(0, 4)}년 ${Number(fecha.slice(5, 7))}월`;
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

// El motor entrega solo el último punto de la serie (requisito "serie"): ese punto fija hasta qué mes
// se puede usar la historia, que se lee del mismo series.json. Así un caso con fecha fija no ve meses
// publicados después.
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
  if (mesInicial < primero) throw new ErrorEntrada(`소비자물가지수는 ${nombreMes(primero)}부터 있어요.`, campos.desde);
  if (mesInicial > ultimo.fecha) throw new ErrorEntrada(`${nombreMes(mesInicial)} 지수는 아직 발표되지 않았어요. 가장 최근 지수는 ${nombreMes(ultimo.fecha)}까지예요.`, campos.desde);
  if (mesFinal > ultimo.fecha) {
    observaciones.push(`가장 최근에 발표된 지수가 ${nombreMes(ultimo.fecha)}까지라서 그 달까지 계산했어요.`);
    mesFinal = ultimo.fecha;
  }
  if (mesInicial > mesFinal) throw new ErrorEntrada("시작 달은 끝 달보다 앞이어야 해요.", campos.desde);
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
