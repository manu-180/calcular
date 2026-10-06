import type { Prefill } from "./tipos";
import { booleano, numero, objeto, type Crudo } from "./_campos";
import { parseMonto } from "@/lib/formato";
import { calcularIndemnizacion } from "@/lib/indemnizacion";

// Sólo lo que hace falta para rehacer la cuenta. El nombre de la persona, el de la empresa y lo que
// le ofrecen NO viajan: se escriben en la página del informe y mueren en el navegador.
export type Datos = {
  sueldo: number;
  ingreso: string;
  despido: string;
  preaviso: boolean;
  /** null = no se informó el tope del convenio (la calculadora calcula sin tope). */
  tope: number | null;
};

// Un tope que ningún sueldo mensual real supera; arriba de esto es basura o un ataque.
const TOPE_MONTO = 10_000_000_000;
const ISO = /^\d{4}-\d{2}-\d{2}$/;

function fecha(o: Crudo, clave: string): string | null {
  const v = Object.prototype.hasOwnProperty.call(o, clave) ? o[clave] : undefined;
  if (typeof v !== "string" || !ISO.test(v)) return null;
  const [y, m, d] = v.split("-").map(Number);
  if (y < 1940 || y > 2100) return null;
  // 2026-02-31 pasa la regex pero no es una fecha: Date.UTC lo corre al 3/3 y lo delata.
  const t = new Date(Date.UTC(y, m - 1, d));
  if (t.getUTCFullYear() !== y || t.getUTCMonth() !== m - 1 || t.getUTCDate() !== d) return null;
  return v;
}

function validar(raw: unknown): Datos | null {
  const o = objeto(raw);
  if (!o) return null;

  const sueldo = numero(o, "sueldo", 0, TOPE_MONTO);
  if (sueldo === null || sueldo <= 0) return null;

  const ingreso = fecha(o, "ingreso");
  const despido = fecha(o, "despido");
  if (!ingreso || !despido || despido <= ingreso) return null;

  const preaviso = Object.prototype.hasOwnProperty.call(o, "preaviso") ? booleano(o, "preaviso") : false;
  if (preaviso === null) return null;

  // `tope` ausente o null = no informado; presente con cualquier otra cosa que un monto > 0 = basura.
  let tope: number | null = null;
  if (Object.prototype.hasOwnProperty.call(o, "tope") && o.tope !== null) {
    tope = numero(o, "tope", 0, TOPE_MONTO);
    if (tope === null || tope <= 0) return null;
  }

  const d: Datos = { sueldo, ingreso, despido, preaviso, tope };
  return calcularIndemnizacion(entradaDelMotor(d)) ? d : null;
}

export const prefill: Prefill<Datos> = { validar };

/** La traducción exacta que hace CalculadoraIndemnizacion de su estado al motor. */
export function entradaDelMotor(d: Datos): Parameters<typeof calcularIndemnizacion>[0] {
  return {
    ingresoISO: d.ingreso,
    despidoISO: d.despido,
    mejorRemuneracion: d.sueldo,
    preavisoOtorgado: d.preaviso,
    topeCCT: d.tope ?? undefined,
  };
}

/** El tope tal como lo cuenta la calculadora: sólo si tildó que lo conoce y escribió un monto > 0. */
export function topeInformado(conoceTope: boolean, topeInput: string): number | null {
  const t = parseMonto(topeInput);
  return conoceTope && t > 0 ? t : null;
}

/** Lo que la calculadora web deja para el informe, armado con el mismo criterio con que ella calcula. */
export function datosDeLaCalculadora(estado: {
  sueldo: number;
  ingresoISO: string;
  despidoISO: string;
  preavisoOtorgado: boolean;
  conoceTope: boolean;
  topeInput: string;
}): Datos {
  return {
    sueldo: estado.sueldo,
    ingreso: estado.ingresoISO,
    despido: estado.despidoISO,
    preaviso: estado.preavisoOtorgado,
    tope: topeInformado(estado.conoceTope, estado.topeInput),
  };
}
