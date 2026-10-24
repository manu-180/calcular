import { duracion, jornadas } from "../calculo";

// Formatos del índice, iguales en servidor, navegador y tarjeta OG. La unidad sale de Intl (style unit):
// «479 horas», «479 hours», «479 Stunden», «479時間», con el plural correcto de cada idioma.

export interface HorasFormateadas {
  texto: string;
  numero: string;
  unidad: string;
}

const cache = new Map<string, Intl.NumberFormat>();
function nf(locale: string, opciones: Intl.NumberFormatOptions): Intl.NumberFormat {
  const clave = `${locale}|${JSON.stringify(opciones)}`;
  let f = cache.get(clave);
  if (!f) cache.set(clave, (f = new Intl.NumberFormat(locale, opciones)));
  return f;
}

export function formatoHoras(locale: string, horas: number): HorasFormateadas {
  const d = duracion(horas);
  const f = nf(locale, { style: "unit", unit: d.unidad === "min" ? "minute" : "hour", unitDisplay: "long", maximumFractionDigits: d.unidad === "h" ? d.decimales : 0, minimumFractionDigits: d.unidad === "h" ? d.decimales : 0 });
  const partes = f.formatToParts(d.valor);
  const numero = partes.filter((p) => p.type === "integer" || p.type === "group" || p.type === "decimal" || p.type === "fraction").map((p) => p.value).join("");
  const unidad = partes.filter((p) => p.type === "unit").map((p) => p.value).join("");
  return { texto: f.format(d.valor), numero, unidad };
}

export function formatoPrecio(locale: string, monto: number, moneda: string): string {
  const entero = Number.isInteger(monto);
  try {
    return nf(locale, { style: "currency", currency: moneda, currencyDisplay: "narrowSymbol", maximumFractionDigits: entero ? 0 : 2, minimumFractionDigits: entero ? 0 : 2 }).format(monto);
  } catch {
    return `${moneda} ${nf(locale, { maximumFractionDigits: 2 }).format(monto)}`;
  }
}

// Moneda con su código cuando el símbolo es ambiguo entre países ($ de México y de Chile).
export function formatoPrecioConCodigo(locale: string, monto: number, moneda: string): string {
  const s = formatoPrecio(locale, monto, moneda);
  return /^[A-Z]{3}/.test(s) || s.includes(moneda) ? s : `${s} ${moneda}`;
}

export function formatoNumero(locale: string, n: number, decimales = 0): string {
  return nf(locale, { maximumFractionDigits: decimales, minimumFractionDigits: decimales }).format(n);
}

export function textoJornadas(plantillas: { uno: string; otras: string }, locale: string, horas: number): string {
  const j = jornadas(horas);
  const decimales = j < 10 ? 1 : 0;
  const redondeado = Math.round(j * 10 ** decimales) / 10 ** decimales;
  const regla = new Intl.PluralRules(locale).select(redondeado);
  return (regla === "one" ? plantillas.uno : plantillas.otras).replace("{n}", formatoNumero(locale, redondeado, redondeado % 1 ? 1 : 0));
}
