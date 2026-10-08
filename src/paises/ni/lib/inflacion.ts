import { ErrorEntrada } from "@/motor/calculo";
import type { FechaISO, PuntoSerie, PuntoSerieTupla } from "@/motor/tipos";

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

export function nombreMes(fecha: FechaISO): string {
  return `${MESES[Number(fecha.slice(5, 7)) - 1]} de ${fecha.slice(0, 4)}`;
}

function primeroDeMes(fecha: FechaISO): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

function mesesAntes(fecha: FechaISO, meses: number): FechaISO {
  const total = Number(fecha.slice(0, 4)) * 12 + Number(fecha.slice(5, 7)) - 1 - meses;
  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, "0")}-01` as FechaISO;
}

export interface Actualizacion {
  mesOrigen: string;
  mesDestino: string;
  indiceOrigen: number;
  indiceDestino: number;
  factor: number;
  montoActualizado: number;
  variacionAcumulada: number;
  variacionMensual: number | null;
  variacionInteranual: number | null;
  observaciones: string[];
}

interface Textos {
  antesDelInicio: (primerMes: string) => string;
  destinoSinDato: (ultimoMes: string) => string;
  haciaAtras: string;
}

// El tope es el punto que el motor resolvió a la fecha de referencia (valores[...]): así un caso con
// fecha fija da siempre lo mismo aunque el cron sume meses nuevos a series.json.
export function actualizarPorIndice(
  puntos: readonly PuntoSerieTupla[],
  ultimo: PuntoSerie,
  monto: number,
  desde: FechaISO,
  hasta: FechaISO,
  redondear: (n: number) => number,
  textos: Textos,
  primerMes: FechaISO = puntos[0][0],
): Actualizacion {
  const disponibles = new Map(puntos.filter(([f]) => f <= ultimo.fecha));
  const observaciones: string[] = [];
  const origen = primeroDeMes(desde);
  if (origen < primerMes || !disponibles.has(origen)) throw new ErrorEntrada(textos.antesDelInicio(nombreMes(primerMes)), "desde");
  let destino = primeroDeMes(hasta);
  if (destino > ultimo.fecha) {
    destino = ultimo.fecha;
    observaciones.push(textos.destinoSinDato(nombreMes(ultimo.fecha)));
  }
  if (destino < primerMes || !disponibles.has(destino)) throw new ErrorEntrada(textos.antesDelInicio(nombreMes(primerMes)), "hasta");
  if (destino < origen) observaciones.push(textos.haciaAtras);
  const indiceOrigen = disponibles.get(origen)!;
  const indiceDestino = disponibles.get(destino)!;
  const factor = indiceDestino / indiceOrigen;
  const anterior = disponibles.get(mesesAntes(destino, 1));
  const haceUnAnio = disponibles.get(mesesAntes(destino, 12));
  return {
    mesOrigen: nombreMes(origen),
    mesDestino: nombreMes(destino),
    indiceOrigen,
    indiceDestino,
    factor,
    montoActualizado: redondear(monto * factor),
    variacionAcumulada: redondear((factor - 1) * 100),
    variacionMensual: anterior === undefined ? null : redondear((indiceDestino / anterior - 1) * 100),
    variacionInteranual: haceUnAnio === undefined ? null : redondear((indiceDestino / haceUnAnio - 1) * 100),
    observaciones,
  };
}
