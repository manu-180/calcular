import type { KpiClave, Preset, Rango } from "@/lib/panel/tipos";
import { diasEntre, esPreset, extremos, type Dia } from "@/lib/panel/fechas";
import { enHoraAR } from "@/lib/hora-argentina";

const NBSP = " ";

const entero = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 });
const unDecimal = new Intl.NumberFormat("es-AR", { maximumFractionDigits: 1 });
const moneda = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function numero(n: number): string {
  return entero.format(Math.round(n));
}

export function compacto(n: number): string {
  const abs = Math.abs(n);
  if (abs < 1000) return entero.format(Math.round(n));
  if (abs < 1_000_000) return `${unDecimal.format(n / 1000)}${NBSP}mil`;
  return `${unDecimal.format(n / 1_000_000)}${NBSP}M`;
}

export function pesos(n: number): string {
  return moneda.format(Math.round(n));
}

const dolarEntero = new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const dolarCentavos = new Intl.NumberFormat("es-AR", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function dolares(n: number): string {
  return Math.abs(n) >= 1000 ? dolarEntero.format(Math.round(n)) : dolarCentavos.format(n);
}

export function dolaresCompacto(n: number): string {
  if (Math.abs(n) < 1000) return dolarEntero.format(Math.round(n));
  return `US$${NBSP}${compacto(n)}`;
}

// La plata del KPI de ingresos: en dólares desde la migración de métricas del mundo, en pesos antes.
export function plata(n: number, monedaKpi: string): string {
  return monedaKpi === "USD" ? dolares(n) : pesos(n);
}

const monedas = new Map<string, Intl.NumberFormat>();

export function importe(n: number, moneda: string): string {
  if (moneda === "ARS") return pesos(n);
  if (moneda === "USD") return dolares(n);
  let f = monedas.get(moneda);
  if (!f) {
    try {
      f = new Intl.NumberFormat("es-AR", { style: "currency", currency: moneda, currencyDisplay: "code", maximumFractionDigits: 2 });
    } catch {
      f = entero;
    }
    monedas.set(moneda, f);
  }
  return f.format(n);
}

export function pesosCompacto(n: number): string {
  if (Math.abs(n) < 1000) return pesos(n);
  return `$${NBSP}${compacto(n)}`;
}

export function porcentaje(fraccion: number, decimales = 1): string {
  const f = new Intl.NumberFormat("es-AR", { maximumFractionDigits: decimales });
  return `${f.format(fraccion * 100)}${NBSP}%`;
}

export function deCada100(fraccion: number): string {
  if (fraccion > 0 && fraccion < 0.01) return "menos de 1 de cada 100";
  return `${entero.format(Math.round(fraccion * 100))} de cada 100`;
}

export function plural(n: number, uno: string, varios: string): string {
  return `${numero(n)} ${Math.round(n) === 1 ? uno : varios}`;
}

export function duracion(ms: number): string {
  const s = Math.max(0, Math.round(ms / 1000));
  if (s < 60) return `${s}${NBSP}s`;
  const min = Math.floor(s / 60);
  if (min < 60) {
    const resto = s % 60;
    return resto ? `${min}${NBSP}min ${resto}${NBSP}s` : `${min}${NBSP}min`;
  }
  const h = Math.floor(min / 60);
  const restoMin = min % 60;
  return restoMin ? `${h}${NBSP}h ${restoMin}${NBSP}min` : `${h}${NBSP}h`;
}

export function duracionCorta(ms: number): string {
  const s = Math.max(0, Math.round(ms / 1000));
  if (s < 60) return `${s}${NBSP}s`;
  const min = s / 60;
  if (min < 60) return `${unDecimal.format(min)}${NBSP}min`;
  return `${unDecimal.format(min / 60)}${NBSP}h`;
}

export function haceCuanto(iso: string, ahora: number): string {
  const seg = Math.max(0, Math.round((ahora - Date.parse(iso)) / 1000));
  if (seg < 45) return "recién";
  const min = Math.round(seg / 60);
  if (min < 60) return `hace ${min}${NBSP}min`;
  const h = Math.round(min / 60);
  if (h < 24) return `hace ${h}${NBSP}h`;
  const d = Math.round(h / 24);
  return d === 1 ? "ayer" : `hace ${d} días`;
}

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const DIAS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];

// El texto se arma a mano con partes numéricas en vez de pedirle el mes a Intl: si el ICU
// de uno dice «sept.» y el del otro «sep», la hidratación se queja. La hora argentina sí
// sale del tzdata (hora-argentina.ts), no de restar 3 h.
function enArgentina(iso: string): Date {
  return enHoraAR(Date.parse(iso));
}

export function diaCorto(iso: string): string {
  const d = enArgentina(iso);
  return `${d.getUTCDate()} ${MESES[d.getUTCMonth()]}`;
}

export function diaConSemana(iso: string): string {
  const d = enArgentina(iso);
  return `${DIAS[d.getUTCDay()]} ${d.getUTCDate()} ${MESES[d.getUTCMonth()]}`;
}

export function hora(iso: string): string {
  return `${enArgentina(iso).getUTCHours()}${NBSP}h`;
}

export function franjaHoraria(iso: string): string {
  const h = enArgentina(iso).getUTCHours();
  return `de ${h} a ${h + 1}${NBSP}h`;
}

export function fechaYHora(iso: string, ahora: number): string {
  const d = enArgentina(iso);
  const hoy = enArgentina(new Date(ahora).toISOString());
  const hhmm = `${d.getUTCHours()}:${String(d.getUTCMinutes()).padStart(2, "0")}`;
  const mismoDia = (a: Date, b: Date) =>
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate();
  if (mismoDia(d, hoy)) return `hoy, ${hhmm}`;
  const ayer = new Date(hoy.getTime() - 24 * 3600 * 1000);
  if (mismoDia(d, ayer)) return `ayer, ${hhmm}`;
  return `${d.getUTCDate()} ${MESES[d.getUTCMonth()]}, ${hhmm}`;
}

export function etiquetaPunto(iso: string, granularidad: "hora" | "dia"): string {
  return granularidad === "hora" ? franjaHoraria(iso) : diaConSemana(iso);
}

export function etiquetaEje(iso: string, granularidad: "hora" | "dia"): string {
  return granularidad === "hora" ? hora(iso) : diaCorto(iso);
}

const NOMBRE_PRESET: Record<Preset, string> = {
  hoy: "Hoy",
  "7d": "7 días",
  "30d": "30 días",
  "90d": "90 días",
};

const PERIODO_PRESET: Record<Preset, string> = {
  hoy: "hoy",
  "7d": "en los últimos 7 días",
  "30d": "en los últimos 30 días",
  "90d": "en los últimos 90 días",
};

const MESES_LARGOS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

function partesDia(d: Dia) {
  const [a, m, dd] = d.split("-").map(Number);
  return { anio: a, mes: m - 1, dia: dd };
}

function largo(d: Dia, conAnio: boolean): string {
  const p = partesDia(d);
  return `${p.dia} de ${MESES_LARGOS[p.mes]}${conAnio ? ` de ${p.anio}` : ""}`;
}

export function nombreRango(r: Rango): string {
  if (esPreset(r)) return NOMBRE_PRESET[r];
  const { inicio, fin } = extremos(r, "");
  const a = partesDia(inicio);
  if (inicio === fin) return `${a.dia} ${MESES[a.mes]}`;
  const b = partesDia(fin);
  if (a.anio === b.anio && a.mes === b.mes) return `${a.dia} al ${b.dia} ${MESES[b.mes]}`;
  return `${a.dia} ${MESES[a.mes]} al ${b.dia} ${MESES[b.mes]}`;
}

export function periodo(r: Rango): string {
  if (esPreset(r)) return PERIODO_PRESET[r];
  const { inicio, fin } = extremos(r, "");
  if (inicio === fin) return `el ${largo(inicio, false)}`;
  const a = partesDia(inicio);
  const b = partesDia(fin);
  if (a.anio !== b.anio) return `del ${largo(inicio, true)} al ${largo(fin, true)}`;
  if (a.mes === b.mes) return `del ${a.dia} al ${largo(fin, false)}`;
  return `del ${largo(inicio, false)} al ${largo(fin, false)}`;
}

function diasDelRango(r: Rango): number {
  if (esPreset(r)) return { hoy: 1, "7d": 7, "30d": 30, "90d": 90 }[r];
  const { inicio, fin } = extremos(r, "");
  return diasEntre(inicio, fin) + 1;
}

export function contra(r: Rango): string {
  if (r === "hoy") return "ayer a esta hora";
  const n = diasDelRango(r);
  return n === 1 ? "el día anterior" : `los ${n} días anteriores`;
}

export function antes(r: Rango): string {
  if (r === "hoy") return "ayer a esta hora";
  const n = diasDelRango(r);
  return n === 1 ? "el día anterior" : `en los ${n} días anteriores`;
}

export type Variacion =
  | { tipo: "sube" | "baja"; pct: number }
  | { tipo: "igual" }
  | { tipo: "nuevo" }
  | { tipo: "vacio" };

export function variacion(valor: number, anterior: number): Variacion {
  if (anterior <= 0) return valor > 0 ? { tipo: "nuevo" } : { tipo: "vacio" };
  const pct = (valor - anterior) / anterior;
  if (Math.abs(pct) < 0.005) return { tipo: "igual" };
  return { tipo: pct > 0 ? "sube" : "baja", pct: Math.abs(pct) };
}

export function textoVariacion(v: Variacion): string {
  switch (v.tipo) {
    case "sube":
      return `${porcentaje(v.pct, v.pct < 0.1 ? 1 : 0)} más`;
    case "baja":
      return `${porcentaje(v.pct, v.pct < 0.1 ? 1 : 0)} menos`;
    case "igual":
      return "igual";
    case "nuevo":
      return "nuevo";
    case "vacio":
      return "sin cambios";
  }
}

export function valorKpi(clave: KpiClave, n: number, monedaKpi = "ARS"): string {
  if (clave === "tiempo") return duracion(n);
  if (clave === "ingresos") return plata(n, monedaKpi);
  return numero(n);
}

export function ejeKpi(clave: KpiClave, n: number, monedaKpi = "ARS"): string {
  if (clave === "tiempo") return duracionCorta(n);
  if (clave === "ingresos") return monedaKpi === "USD" ? dolaresCompacto(n) : pesosCompacto(n);
  return compacto(n);
}

const DISPOSITIVOS: Record<string, string> = {
  movil: "Celular",
  escritorio: "Computadora",
  tablet: "Tablet",
};

export function nombreDispositivo(clave: string): string {
  return DISPOSITIVOS[clave] ?? "Otro";
}

let regiones: Intl.DisplayNames | null = null;

export function nombrePais(codigo: string): string {
  if (!codigo || codigo.length !== 2) return "Sin dato";
  try {
    regiones ??= new Intl.DisplayNames(["es"], { type: "region" });
    return regiones.of(codigo.toUpperCase()) ?? codigo;
  } catch {
    return codigo.toUpperCase();
  }
}

const PERFILES: Record<string, string> = {
  empleado: "Empleados",
  empleador: "Empleadores",
  contador: "Contadores",
  monotributista: "Monotributistas",
  estudio: "Estudios contables o jurídicos",
  otro: "Otros",
};

export function nombrePerfil(clave: string): string {
  return PERFILES[clave] ?? "Sin contar";
}

// Las rutas del panel las escribe cualquiera que le pegue a /api/e: un "//otro-sitio" no puede
// terminar siendo un link en el panel del dueño.
export function hrefInterno(path: string | null | undefined): string | null {
  if (!path || !path.startsWith("/") || path.startsWith("//") || path.startsWith("/\\")) return null;
  try {
    const u = new URL(path, "https://calcular.ar");
    return u.origin === "https://calcular.ar" ? `${u.pathname}${u.search}` : null;
  } catch {
    return null;
  }
}
