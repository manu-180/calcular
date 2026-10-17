import type { Crudos } from "@/motor/formulario";
import type { Campo, ValorEntrada } from "@/motor/tipos";
import type { DatosIntl, EntradaIntl } from "./intl";

// Lado navegador del prefill de calcularya.com. La oferta deja acá el cálculo de la persona antes
// de mandarla a comprar; la página de compra lo muestra y, si la persona no lo destilda, lo manda
// con el checkout. localStorage y no estado de React: la compra pasa en otra página. También lo lee
// la página del informe cuando el servidor no tiene los datos (la compra recién hecha en este mismo
// navegador, o una base sin la columna ca_checkouts.datos).

const CLAVE = (producto: string) => `cy:compra:${producto}`;
const VIGENCIA_MS = 30 * 24 * 3600 * 1000;

export function recordarDatosIntl(producto: string, datos: DatosIntl): void {
  try {
    localStorage.setItem(CLAVE(producto), JSON.stringify({ t: Date.now(), datos }));
  } catch (e) {
    console.warn("[prefill/intl] no pude guardar los datos de la compra", e instanceof Error ? e.message : e);
  }
}

export function leerDatosIntl(producto: string): DatosIntl | null {
  try {
    const crudo = localStorage.getItem(CLAVE(producto));
    if (!crudo) return null;
    const { t, datos } = JSON.parse(crudo) as { t?: unknown; datos?: DatosIntl };
    if (typeof t !== "number" || Date.now() - t > VIGENCIA_MS) return null;
    if (!datos || typeof datos.calc !== "string" || typeof datos.entrada !== "object" || datos.entrada === null) return null;
    return datos;
  } catch {
    return null;
  }
}

export function olvidarDatosIntl(producto: string): void {
  try {
    localStorage.removeItem(CLAVE(producto));
  } catch {}
}

// Sin separador de miles a propósito: con él, "1.500" en un locale de coma decimal es ambiguo y la
// calculadora lo rechaza («¿quisiste decir…?»). Lo vigila scripts/check_ofertas_intl.ts.
export function crudoDeNumero(n: number, locale: string): string {
  return new Intl.NumberFormat(locale, { useGrouping: false, maximumFractionDigits: 12 }).format(n);
}

export function crudosDeEntrada(campos: readonly Campo[], entrada: EntradaIntl, locale: string, base: Crudos): Crudos {
  const salida: Record<string, string | boolean> = { ...base };
  for (const c of campos) {
    if (!Object.prototype.hasOwnProperty.call(entrada, c.id)) continue;
    const v: ValorEntrada = entrada[c.id];
    if (c.tipo === "si-no") salida[c.id] = v === true;
    else if (v === null) salida[c.id] = "";
    else if (typeof v === "number") salida[c.id] = crudoDeNumero(v, locale);
    else if (typeof v === "string") salida[c.id] = v;
  }
  return salida;
}
