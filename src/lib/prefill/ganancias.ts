import type { Prefill } from "./tipos";
import { booleano, numero, objeto } from "./_campos";
import { parseDecimal, parseMonto } from "@/lib/formato";

// Sólo lo que la calculadora de /ganancias ya tiene. Lo que la persona paga de alquiler, prepaga o
// colegio se carga en la página del informe y no sale del navegador.
export type Datos = {
  bruto: number;
  conyuge: boolean;
  hijos: number;
  /** Fracción, 0 a 1: el motor la recibe así. */
  sindical: number;
  /** Otras deducciones que ya declara, por MES (la calculadora las pide así y las anualiza × 12). */
  otras: number;
};

// Topes que ningún caso real supera; arriba de esto es basura o un ataque.
const TOPE_MONTO = 10_000_000_000;
export const MAX_HIJOS = 20;

function validar(raw: unknown): Datos | null {
  const o = objeto(raw);
  if (!o) return null;

  const bruto = numero(o, "bruto", 0, TOPE_MONTO);
  if (bruto === null || bruto <= 0) return null;

  const conyuge = Object.prototype.hasOwnProperty.call(o, "conyuge") ? booleano(o, "conyuge") : false;
  if (conyuge === null) return null;

  const hijos = Object.prototype.hasOwnProperty.call(o, "hijos") ? numero(o, "hijos", 0, MAX_HIJOS, { entero: true }) : 0;
  if (hijos === null) return null;

  const sindical = Object.prototype.hasOwnProperty.call(o, "sindical") ? numero(o, "sindical", 0, 1) : 0;
  if (sindical === null) return null;

  const otras = Object.prototype.hasOwnProperty.call(o, "otras") ? numero(o, "otras", 0, TOPE_MONTO) : 0;
  if (otras === null) return null;

  return { bruto, conyuge, hijos, sindical, otras };
}

export const prefill: Prefill<Datos> = { validar };

/** Los campos de la calculadora tal como la persona los escribió. */
export type CamposCalculadora = {
  brutoInput: string;
  conyuge: boolean;
  hijosInput: string;
  sindicalInput: string;
  otrasInput: string;
};

/** La traducción de los campos a números que usan la calculadora y el informe: una sola, para que
 *  los dos no puedan dar distinto con lo mismo escrito. */
export function datosDeLaCalculadora(c: CamposCalculadora): Datos {
  return {
    bruto: parseMonto(c.brutoInput),
    conyuge: c.conyuge,
    hijos: Math.max(0, Math.floor(parseMonto(c.hijosInput))),
    sindical: Math.min(Math.max(0, parseDecimal(c.sindicalInput)), 100) / 100,
    otras: Math.max(0, parseMonto(c.otrasInput)),
  };
}

/** Lo que recibe `calcularRetencionMensual`, igual en la calculadora y en el informe. */
export function entradaDelMotor(d: Datos, otrasDeduccionesExtraAnual = 0) {
  return {
    brutoMensual: d.bruto,
    conyuge: d.conyuge,
    hijos: d.hijos,
    sindicalPct: d.sindical,
    otrasDeduccionesAnual: d.otras * 12 + otrasDeduccionesExtraAnual,
  };
}
