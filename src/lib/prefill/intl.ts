import { ErrorEntrada, crearContexto } from "@/motor/calculo";
import { opcionesDinamicas, resolverValores } from "@/motor/registro";
import type { Campo, CodigoMercado, DefinicionCalculadora, FechaISO, PaisDefinido, ValorEntrada } from "@/motor/tipos";
import { esFechaISO } from "@/motor/vigencia";
import { registro } from "@/paises";
import { objeto, type Crudo } from "./_campos";

// Prefill de calcularya.com: lo que la persona cargó en una calculadora viaja con la compra y el
// producto (planilla o informe) sale con sus números. Sirve para cualquier calculadora del registro:
// los campos y sus límites salen de la definición, no de una lista a mano.
//
// `validarDatosIntl` corre en el servidor sobre JSON que manda el navegador (input hostil): sólo lee
// propiedades propias, descarta lo que no es exactamente un valor válido del campo y, al final,
// corre calcular() con los valores oficiales del día para no aceptar una entrada que la calculadora
// rechazaría.

export type EntradaIntl = Readonly<Record<string, ValorEntrada>>;
export type DatosIntl = { calc: string; entrada: EntradaIntl };

// Por debajo del CHECK de ca_checkouts.datos (2048 bytes de jsonb::text, que agrega espacios): si el
// código aceptara lo mismo que la base, un payload al límite perdería la fila entera del checkout.
export const DATOS_INTL_MAX = 1500;
// Ningún monto real de la región llega a esto (ni en bolívares ni en guaraníes).
const TOPE_NUMERO = 1e13;
const RE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function propio(o: Crudo, clave: string): unknown {
  return Object.prototype.hasOwnProperty.call(o, clave) ? o[clave] : undefined;
}

function fechaValida(v: unknown): v is FechaISO {
  if (!esFechaISO(v)) return false;
  const [y, m, d] = v.split("-").map(Number);
  if (y < 1900 || y > 2100) return false;
  const t = new Date(Date.UTC(y, m - 1, d));
  return t.getUTCFullYear() === y && t.getUTCMonth() === m - 1 && t.getUTCDate() === d;
}

function valorDeCampo(c: Campo, v: unknown, pais: PaisDefinido, dinamicas: Readonly<Record<string, readonly { valor: string }[]>>): ValorEntrada | undefined {
  if (v === null || v === undefined) return c.requerido === false && c.tipo !== "si-no" ? null : undefined;
  switch (c.tipo) {
    case "si-no":
      return typeof v === "boolean" ? v : undefined;
    case "fecha":
      if (!fechaValida(v)) return undefined;
      if ((c.min && v < c.min) || (c.max && v > c.max)) return undefined;
      return v;
    case "opcion":
      return typeof v === "string" && c.opciones.some((o) => o.valor === v) ? v : undefined;
    case "region":
      return typeof v === "string" && (pais.mercado.regiones ?? []).some((r) => r.id === v) ? v : undefined;
    case "opcion-dato":
      return typeof v === "string" && (dinamicas[c.id] ?? []).some((o) => o.valor === v) ? v : undefined;
    default: {
      if (typeof v !== "number" || !Number.isFinite(v) || Math.abs(v) > TOPE_NUMERO) return undefined;
      if (c.tipo === "entero" && !Number.isInteger(v)) return undefined;
      if ((c.min !== undefined && v < c.min) || (c.max !== undefined && v > c.max)) return undefined;
      return v;
    }
  }
}

export function calculadoraIntl(mercado: string, slug: string) {
  if (!RE_SLUG.test(slug)) return null;
  const pais = registro.pais(mercado as CodigoMercado);
  const entrada = pais?.calculadoras.find((c) => c.definicion.slug === slug);
  return pais && entrada ? { pais, entrada } : null;
}

// La entrada ya validada contra los campos, o null. `fecha` es la de los valores oficiales con que
// se prueba el cálculo.
export function validarEntradaIntl(pais: PaisDefinido, def: DefinicionCalculadora, raw: unknown, fecha: FechaISO): EntradaIntl | null {
  const o = objeto(raw);
  if (!o) return null;
  const r = resolverValores(pais, def, fecha);
  if (!r.ok) return null;
  const dinamicas = opcionesDinamicas(pais, def, r.valores);
  const entrada: Record<string, ValorEntrada> = {};
  for (const c of def.campos) {
    const v = valorDeCampo(c, propio(o, c.id), pais, dinamicas);
    if (v === undefined) return null;
    entrada[c.id] = v;
  }
  try {
    def.calcular(entrada as never, r.valores as never, crearContexto(pais.mercado, fecha, def));
  } catch (e) {
    if (e instanceof ErrorEntrada) return null;
    console.error(`[prefill/intl] ${def.id}: calcular() tiró con una entrada que pasó la validación`, e instanceof Error ? e.message : e);
    return null;
  }
  return entrada;
}

export function validarDatosIntl(mercado: string, permitidas: readonly string[], raw: unknown, fecha: FechaISO): DatosIntl | null {
  const o = objeto(raw);
  if (!o) return null;
  const calc = propio(o, "calc");
  if (typeof calc !== "string" || !permitidas.includes(calc)) return null;
  const c = calculadoraIntl(mercado, calc);
  if (!c) return null;
  const entrada = validarEntradaIntl(c.pais, c.entrada.definicion, propio(o, "entrada"), fecha);
  return entrada ? { calc, entrada } : null;
}

export function parsearDatosIntl(texto: unknown): unknown {
  if (typeof texto !== "string" || texto === "" || texto.length > DATOS_INTL_MAX) return undefined;
  try {
    return JSON.parse(texto);
  } catch {
    return undefined;
  }
}

// El JSON canónico (sólo lo validado, en el orden de los campos) o null si no entra.
export function serializarDatosIntl(d: DatosIntl): string | null {
  const s = JSON.stringify({ calc: d.calc, entrada: d.entrada });
  return s.length <= DATOS_INTL_MAX ? s : null;
}
