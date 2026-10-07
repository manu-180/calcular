import { esFechaISO } from "./vigencia";
import type { FechaISO, Moneda, ReglaRedondeo, Unidad } from "./tipos";
import { MONEDAS, UNIDADES_REFERENCIA } from "./tipos";

export function decimalesDeMoneda(moneda: Moneda, locale = "es"): number {
  return new Intl.NumberFormat(locale, { style: "currency", currency: moneda }).resolvedOptions().maximumFractionDigits ?? 2;
}

// Redondeo decimal sin el error binario de Math.round(x * 100) / 100 (1.005 da 1.00 con el truco
// clásico). Se corre la coma en la representación decimal con notación exponencial.
function correr(n: number, decimales: number): number {
  const [mantisa, exponente = "0"] = String(n).split("e");
  return Number(`${mantisa}e${Number(exponente) + decimales}`);
}

export function redondear(n: number, regla: ReglaRedondeo): number {
  if (!Number.isFinite(n)) return n;
  const signo = n < 0 ? -1 : 1;
  const abs = Math.abs(n);
  const escalado = correr(abs, regla.decimales);
  let entero: number;
  if (regla.modo === "truncar") {
    entero = Math.floor(escalado + 1e-9);
  } else if (regla.modo === "mitad-par") {
    const piso = Math.floor(escalado);
    const resto = escalado - piso;
    if (Math.abs(resto - 0.5) < 1e-9) entero = piso % 2 === 0 ? piso : piso + 1;
    else entero = Math.round(escalado);
  } else {
    entero = Math.round(escalado);
  }
  const resultado = signo * correr(entero, -regla.decimales);
  return Object.is(resultado, -0) ? 0 : resultado;
}

// simbolo pisa el que elige Intl para ese locale (es-PA muestra "USD 1,250.50" y en Panamá se
// escribe "B/. 1,250.50"); el resto del formato sigue siendo el del locale.
export function formatearMoneda(n: number, locale: string, moneda: Moneda, decimales?: number, simbolo?: string): string {
  const d = decimales ?? decimalesDeMoneda(moneda, locale);
  const f = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: moneda,
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
  if (!simbolo) return f.format(n);
  return f
    .formatToParts(n)
    .map((p) => (p.type === "currency" ? simbolo : p.value))
    .join("");
}

export function formatearNumero(n: number, locale: string, decimales?: number): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimales ?? 0,
    maximumFractionDigits: decimales ?? 2,
  }).format(n);
}

export function formatearPorcentaje(porcentaje: number, locale: string, decimales = 2): string {
  return new Intl.NumberFormat(locale, {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: decimales,
  }).format(porcentaje / 100);
}

export function formatearFecha(fecha: FechaISO, locale: string, estilo: "larga" | "corta" = "larga"): string {
  return new Date(`${fecha}T12:00:00Z`).toLocaleDateString(locale, {
    timeZone: "UTC",
    ...(estilo === "larga" ? { day: "numeric", month: "long", year: "numeric" } : { day: "2-digit", month: "2-digit", year: "numeric" }),
  });
}

const NOMBRES_UNIDAD: Record<string, [string, string]> = {
  dias: ["día", "días"],
  horas: ["hora", "horas"],
  meses: ["mes", "meses"],
  anios: ["año", "años"],
};

function decimalesPropios(n: number): number {
  const [, dec = ""] = String(n).split(".");
  return dec.length;
}

// Un dato se muestra con los decimales que trae la norma: el salario mínimo en COP o UYU es entero y
// con ",00" se lee como un error; la UF (CLP) y la UI (UYU) tienen más decimales que su moneda.
export function formatearValorUnidad(n: number, unidad: Unidad, locale: string, simbolos?: Readonly<Partial<Record<Moneda, string>>>): string {
  if ((MONEDAS as readonly string[]).includes(unidad)) {
    const moneda = unidad as Moneda;
    const d = Number.isInteger(n) ? 0 : Math.min(4, Math.max(decimalesDeMoneda(moneda, locale), decimalesPropios(n)));
    return formatearMoneda(n, locale, moneda, d, simbolos?.[moneda]);
  }
  if (unidad === "%") return formatearPorcentaje(n, locale, 4);
  const nombres = NOMBRES_UNIDAD[unidad];
  if (nombres) return `${formatearNumero(n, locale)} ${n === 1 ? nombres[0] : nombres[1]}`;
  if ((UNIDADES_REFERENCIA as readonly string[]).includes(unidad)) return `${formatearNumero(n, locale, undefined)} ${unidad}`;
  return formatearNumero(n, locale, n % 1 === 0 ? 0 : undefined);
}

export interface Separadores {
  decimal: string;
  grupo: string;
}

export function separadoresDe(locale: string): Separadores {
  const partes = new Intl.NumberFormat(locale).formatToParts(1234567.5);
  const decimal = partes.find((p) => p.type === "decimal")?.value ?? ".";
  const grupo = partes.find((p) => p.type === "group")?.value ?? ",";
  return { decimal, grupo };
}

const ESPACIOS = /[\s   ]/g;

function gruposValidos(entero: string, separador: string): boolean {
  const partes = entero.split(separador);
  if (partes.length === 1) return true;
  if (!/^\d{1,3}$/.test(partes[0])) return false;
  return partes.slice(1).every((p) => /^\d{3}$/.test(p));
}

// Reglas de parseo (D3 del ADR: un parseo equivocado multiplica por mil):
// 1. Se ignoran espacios (incluido el espacio fino que usa es-CR como separador de miles),
//    símbolos de moneda y letras.
// 2. Si aparecen punto y coma, el último que aparece es el decimal.
// 3. Si aparece uno solo de los dos y es el decimal del locale, es decimal (una sola vez).
// 4. Si es el separador de miles del locale: repetido o seguido de exactamente 3 dígitos, es miles;
//    una sola vez con 1 o 2 dígitos detrás, se toma como decimal (quien escribe "1474,77" en es-PE).
// 5. Con milesAmbiguos (campos de moneda y enteros): el decimal del locale como único separador,
//    una sola vez y con exactamente 3 dígitos detrás ("5.000" en es-MX) da null. Quien lo escribe
//    casi siempre quiso decir miles, y leerlo como 5 divide el resultado por mil sin avisar.
// Cualquier otra forma devuelve null: se le pide a la persona que lo escriba de nuevo.
export function parsearNumero(texto: string, locale: string, opciones: { milesAmbiguos?: boolean } = {}): number | null {
  const sinEspacios = texto.replace(ESPACIOS, "");
  const negativo = /^[^\d]*-/.test(sinEspacios);
  const limpio = sinEspacios.replace(/[^\d.,]/g, "");
  if (!/\d/.test(limpio)) return null;
  if (/[.,]{2,}/.test(limpio)) return null;
  if (/[.,]$/.test(limpio) || (/^[.,]/.test(limpio) && !/^[.,]\d+$/.test(limpio))) return null;
  const decLocale = separadoresDe(locale).decimal;
  const hayPunto = limpio.includes(".");
  const hayComa = limpio.includes(",");
  let entero = limpio;
  let fraccion = "";
  if (hayPunto && hayComa) {
    const dec = limpio.lastIndexOf(".") > limpio.lastIndexOf(",") ? "." : ",";
    const grupo = dec === "." ? "," : ".";
    const pos = limpio.lastIndexOf(dec);
    entero = limpio.slice(0, pos);
    fraccion = limpio.slice(pos + 1);
    if (entero.includes(dec) || fraccion.includes(grupo) || !gruposValidos(entero, grupo)) return null;
    entero = entero.split(grupo).join("");
  } else if (hayPunto || hayComa) {
    const sep = hayPunto ? "." : ",";
    const veces = limpio.split(sep).length - 1;
    if (sep === decLocale) {
      if (veces > 1) return null;
      [entero, fraccion] = limpio.split(sep);
      if (opciones.milesAmbiguos && /[1-9]/.test(entero) && fraccion.length === 3) return null;
    } else {
      const [cabeza, ...resto] = limpio.split(sep);
      if (veces === 1 && resto[0].length !== 3) {
        if (resto[0].length > 2) return null;
        entero = cabeza;
        fraccion = resto[0];
      } else {
        if (!gruposValidos(limpio, sep)) return null;
        entero = limpio.split(sep).join("");
      }
    }
  }
  const n = Number(`${entero || "0"}${fraccion ? `.${fraccion}` : ""}`);
  if (!Number.isFinite(n)) return null;
  return negativo ? -n : n;
}

// El número que la persona probablemente quiso escribir cuando parsearNumero lo rechazó por
// milesAmbiguos ("5.000" da "5000"); null si el texto no es ese caso.
export function sugerenciaMiles(texto: string, locale: string): { sugerido: string; separador: string } | null {
  const sinEspacios = texto.replace(ESPACIOS, "");
  const limpio = sinEspacios.replace(/[^\d.,]/g, "");
  const dec = separadoresDe(locale).decimal;
  const otro = dec === "." ? "," : ".";
  if (limpio.includes(otro)) return null;
  const partes = limpio.split(dec);
  if (partes.length !== 2 || !/^\d*[1-9]\d*$/.test(partes[0]) || !/^\d{3}$/.test(partes[1])) return null;
  const negativo = /^[^\d]*-/.test(sinEspacios);
  return { sugerido: `${negativo ? "-" : ""}${String(Number(partes.join("")))}`, separador: dec };
}

export function parsearEntero(texto: string, locale: string): number | null {
  const n = parsearNumero(texto, locale);
  return n !== null && Number.isInteger(n) ? n : null;
}

export function parsearFecha(texto: string): FechaISO | null {
  const t = texto.trim();
  return esFechaISO(t) ? t : null;
}
