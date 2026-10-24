import { valorPara } from "../../i18n/bengali";
import { GRAMATICA } from "../../i18n/gramatica";
import { ocupacionEnFrase } from "../../i18n/sueldos";
import { RUTA_MUNDO_AR, SLUG_MUNDO } from "../../mundo/rutas";
import { IDIOMAS, type Idioma } from "../../tipos";
import { CLAVE_APORTES } from "../rutas";

export function rellenar(plantilla: string, valores: Readonly<Record<string, string | number>>): string {
  const valor = valorPara(plantilla);
  return plantilla.replace(/\{(\w+)\}/g, (todo, clave: string) => (clave in valores ? valor(valores[clave]) : todo));
}

export function idiomaDeLocale(locale: string): Idioma {
  const i = locale.split("-")[0].toLowerCase();
  return (IDIOMAS as readonly string[]).includes(i) ? (i as Idioma) : "en";
}

export function lugares(idioma: Idioma, pais: string) {
  return { pais, enPais: GRAMATICA[idioma].en(pais) };
}

export const enFrase = ocupacionEnFrase;

const monedas = new Map<string, Intl.NumberFormat>();

export function dinero(n: number, moneda: string, locale: string): string {
  const clave = `${locale}:${moneda}`;
  let f = monedas.get(clave);
  if (!f) {
    try {
      f = new Intl.NumberFormat(locale, { style: "currency", currency: moneda, maximumFractionDigits: 0, minimumFractionDigits: 0 });
    } catch {
      f = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    }
    monedas.set(clave, f);
  }
  return f.format(n);
}

export function porcentaje(p: number, locale: string): string {
  return new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: 0 }).format(p / 100);
}

// AAAA-MM a «oct. 2026» en el idioma de la página.
export function mesLegible(mes: string, locale: string): string {
  const [a, m] = mes.split("-").map(Number);
  if (!a || !m) return mes;
  return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(a, m - 1, 15)));
}

// La edición sale de la URL de la página del mundo (la `base` de MundoCliente): /mx/sueldo-en-el-mundo
// es "mx", /sueldo-en-el-mundo en calcular.ar es "ar" y /salary-around-the-world (la home global) es
// "global". Solo sirve para pedir el trato de los textos.
export function edicionDeBase(base: string): string {
  let ruta = base;
  try {
    ruta = new URL(base, "https://x.invalid").pathname;
  } catch {}
  if (ruta === RUTA_MUNDO_AR || ruta.startsWith(`${RUTA_MUNDO_AR}/`)) return "ar";
  const primero = ruta.split("/").filter(Boolean)[0] ?? "";
  if ((Object.values(SLUG_MUNDO) as string[]).includes(primero)) return "global";
  return /^[a-z]{2,6}(-[a-z]{2})?$/.test(primero) ? primero : "global";
}

// Lo que el navegador recuerda: país y mes de cada aporte, nunca el monto. Solo evita la doble carga;
// borrarlo no rompe nada (el servidor tiene su propio límite).
interface Recuerdo {
  m: string;
  mes: string;
}

export function mesActual(): string {
  return new Date().toISOString().slice(0, 7);
}

function leer(): Recuerdo[] {
  try {
    const x = JSON.parse(localStorage.getItem(CLAVE_APORTES) ?? "[]") as unknown;
    return Array.isArray(x) ? x.filter((r): r is Recuerdo => typeof r?.m === "string" && typeof r?.mes === "string") : [];
  } catch {
    return [];
  }
}

export function yaAporto(mercado: string): boolean {
  const mes = mesActual();
  return leer().some((r) => r.m === mercado && r.mes === mes);
}

export function recordarAporte(mercado: string): void {
  try {
    const mes = mesActual();
    // Solo los del mes: lo viejo no sirve para nada y no se guarda.
    const lista = [...leer().filter((r) => r.mes === mes && r.m !== mercado), { m: mercado, mes }];
    localStorage.setItem(CLAVE_APORTES, JSON.stringify(lista.slice(-50)));
  } catch {}
}

export function nuevoId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const b = new Uint8Array(16);
  crypto.getRandomValues(b);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}
