import type { Prefill } from "./tipos";
import { numero, objeto, opcion } from "./_campos";
import { existePeriodo, ULTIMO_PERIODO, type Periodo } from "@/lib/inflacion";

export const CASOS = ["sueldo", "honorarios", "precio", "deuda-presto", "deuda-debo"] as const;
export type Caso = (typeof CASOS)[number];

// Sólo lo que hace falta para rehacer la cuenta y elegir la carta. Nombres, destinatario y el
// concepto NO viajan: se escriben en la página del informe y mueren en el navegador.
export type Datos = {
  monto: number;
  desde: Periodo;
  /** null = «hasta el último IPC publicado»: el informe se actualiza solo con cada dato nuevo. */
  hasta: Periodo | null;
  /** Sueldo que se cobra hoy (modo «tu sueldo vs. la inflación»); null si no se informó. */
  actual: number | null;
  caso: Caso;
};

const TOPE_MONTO = 100_000_000_000;
const PERIODO = /^\d{4}-(0[1-9]|1[0-2])$/;

function periodo(o: Record<string, unknown>, clave: string): Periodo | null {
  const v = Object.prototype.hasOwnProperty.call(o, clave) ? o[clave] : undefined;
  return typeof v === "string" && PERIODO.test(v) && existePeriodo(v) ? v : null;
}

/** El mes de llegada que usa la cuenta: el guardado, o el último publicado si se guardó «último». */
export function hastaEfectivo(d: Pick<Datos, "hasta">): Periodo {
  return d.hasta ?? ULTIMO_PERIODO;
}

function validar(raw: unknown): Datos | null {
  const o = objeto(raw);
  if (!o) return null;

  const monto = numero(o, "monto", 0, TOPE_MONTO);
  if (monto === null || monto <= 0) return null;

  const desde = periodo(o, "desde");
  if (!desde) return null;

  let hasta: Periodo | null = null;
  if (Object.prototype.hasOwnProperty.call(o, "hasta") && o.hasta !== null) {
    hasta = periodo(o, "hasta");
    if (!hasta) return null;
  }
  // Hacia atrás (deflactar) es una pregunta válida en la calculadora, pero no justifica que nada
  // suba: el informe no tiene nada que decir ahí.
  if (desde >= hastaEfectivo({ hasta })) return null;

  let actual: number | null = null;
  if (Object.prototype.hasOwnProperty.call(o, "actual") && o.actual !== null) {
    actual = numero(o, "actual", 0, TOPE_MONTO);
    if (actual === null || actual <= 0) return null;
  }

  let caso: Caso;
  if (Object.prototype.hasOwnProperty.call(o, "caso")) {
    const c = opcion(o, "caso", CASOS);
    if (!c) return null;
    caso = c;
  } else {
    caso = actual !== null ? "sueldo" : "precio";
  }

  return { monto, desde, hasta, actual, caso };
}

export const prefill: Prefill<Datos> = { validar };

export type EstadoCalculadora =
  | { modo: "monto"; monto: number; desde: Periodo; hasta: Periodo; caso: Caso }
  | { modo: "sueldo"; sueldoAntes: number; periodoSueldo: Periodo; sueldoHoy: number; caso: Caso };

/** Lo que la calculadora web deja para el informe, con el mismo criterio con que ella calcula.
 *  En el modo sueldo la calculadora siempre compara contra el último IPC publicado. Elegir el
 *  último mes en el modo monto se guarda como «último» a propósito: el enlace del informe no
 *  vence y, abierto el mes que viene, ya trae el IPC nuevo. */
export function datosDeLaCalculadora(e: EstadoCalculadora): Datos {
  if (e.modo === "sueldo") {
    return { monto: e.sueldoAntes, desde: e.periodoSueldo, hasta: null, actual: e.sueldoHoy, caso: e.caso };
  }
  return { monto: e.monto, desde: e.desde, hasta: e.hasta === ULTIMO_PERIODO ? null : e.hasta, actual: null, caso: e.caso };
}
