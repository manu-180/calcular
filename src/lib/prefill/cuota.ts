import type { Prefill } from "./tipos";
import type { TramoCrianzaId } from "@/data/canasta-crianza";
import { booleano, numero, objeto } from "./_campos";
import { parseMonto } from "@/lib/formato";

export type TramoHijo = TramoCrianzaId | "mayor-12";

// Sólo lo que hace falta para rehacer la cuenta. Nombres y cualquier otro dato personal NO viajan:
// se escriben en la página del informe y mueren en el navegador.
export type Datos = {
  hijos: TramoHijo[];
  ingreso: number;
  /** null = no se informó el ingreso del otro progenitor (la calculadora no prorratea). */
  otro: number | null;
  compartido: boolean;
};

export const MAX_HIJOS_INFORME = 10;
// Un tope que ningún ingreso mensual real supera; arriba de esto es basura o un ataque.
const TOPE_INGRESO = 10_000_000_000;

const TRAMOS: readonly TramoHijo[] = ["menor-1", "1-a-3", "4-a-5", "6-a-12", "mayor-12"];

function validar(raw: unknown): Datos | null {
  const o = objeto(raw);
  if (!o) return null;

  const hijosRaw = Object.prototype.hasOwnProperty.call(o, "hijos") ? o.hijos : undefined;
  if (!Array.isArray(hijosRaw) || hijosRaw.length === 0 || hijosRaw.length > MAX_HIJOS_INFORME) return null;
  const hijos: TramoHijo[] = [];
  for (const h of hijosRaw) {
    if (typeof h !== "string" || !TRAMOS.includes(h as TramoHijo)) return null;
    hijos.push(h as TramoHijo);
  }

  const ingreso = numero(o, "ingreso", 0, TOPE_INGRESO);
  if (ingreso === null || ingreso <= 0) return null;

  // `otro` ausente o null = no informado; presente con cualquier otra cosa que un monto = basura.
  let otro: number | null = null;
  if (Object.prototype.hasOwnProperty.call(o, "otro") && o.otro !== null) {
    otro = numero(o, "otro", 0, TOPE_INGRESO);
    if (otro === null) return null;
  }

  const compartido = Object.prototype.hasOwnProperty.call(o, "compartido") ? booleano(o, "compartido") : false;
  if (compartido === null) return null;

  return { hijos, ingreso, otro, compartido };
}

export const prefill: Prefill<Datos> = { validar };

/** El ingreso del otro progenitor tal como lo cuentan la calculadora y el informe: tildó que lo sabe
 *  pero dejó el campo vacío = no informado (null), nunca $0. Un 0 escrito sí es «no tiene ingresos». */
export function ingresoOtroInformado(informaOtro: boolean, otroInput: string): number | null {
  return informaOtro && otroInput.trim() !== "" ? parseMonto(otroInput) : null;
}

/** Lo que la calculadora web deja para el informe, armado con el mismo criterio con que ella calcula. */
export function datosDeLaCalculadora(estado: {
  hijos: TramoHijo[];
  ingreso: number;
  informaOtro: boolean;
  otroInput: string;
  cuidadoCompartido: boolean;
}): Datos {
  return {
    hijos: [...estado.hijos],
    ingreso: estado.ingreso,
    otro: ingresoOtroInformado(estado.informaOtro, estado.otroInput),
    compartido: estado.cuidadoCompartido,
  };
}
