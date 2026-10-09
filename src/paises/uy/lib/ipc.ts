import type { FechaISO, PuntoSerie } from "@/motor/tipos";
import series from "../series.json";

export const ID_IPC = "uy.ipc";

const PUNTOS = (series.series.find((s) => s.id === ID_IPC)?.puntos ?? []) as unknown as readonly (readonly [string, number])[];

export function mesDe(fecha: FechaISO): FechaISO {
  return `${fecha.slice(0, 7)}-01` as FechaISO;
}

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "setiembre", "octubre", "noviembre", "diciembre"];

export function nombreMes(mes: FechaISO): string {
  return `${MESES[Number(mes.slice(5, 7)) - 1]} de ${mes.slice(0, 4)}`;
}

export function mesesAtras(mes: FechaISO, meses: number): FechaISO {
  const total = Number(mes.slice(0, 4)) * 12 + Number(mes.slice(5, 7)) - 1 - meses;
  return `${Math.floor(total / 12)}-${String((total % 12) + 1).padStart(2, "0")}-01` as FechaISO;
}

// El historial sale del mismo series.json que actualiza el cron; el último punto (el que pasa por el
// control de antigüedad del motor) llega en valores y corta el historial, así un caso con fecha fija
// no ve meses publicados después.
export function historialIpc(ultimo: PuntoSerie): ReadonlyMap<FechaISO, number> {
  const mapa = new Map<FechaISO, number>();
  for (const [fecha, valor] of PUNTOS) if (fecha <= ultimo.fecha) mapa.set(fecha as FechaISO, valor);
  mapa.set(mesDe(ultimo.fecha), ultimo.valor);
  return mapa;
}

export function primerMes(): FechaISO {
  return PUNTOS[0][0] as FechaISO;
}

export function variacion(final: number | undefined, inicial: number | undefined): number | null {
  if (final === undefined || inicial === undefined || inicial === 0) return null;
  return (final / inicial - 1) * 100;
}
