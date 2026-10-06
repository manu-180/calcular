import type ExcelJS from "exceljs";
import type { Prefill } from "./tipos";
import { numero, objeto } from "./_campos";

// Layout de la planilla de plazos fijos. Lo leen el generador (scripts/gen_planilla_plazo_fijo.ts),
// el check (scripts/check_planilla_plazo_fijo.ts), la vista previa de la oferta y este prefill.
// Vive acá y no en scripts/ porque el prefill corre en el servidor de Next.
export const PLANILLA_PF = {
  archivo: "planilla-plazo-fijo-2026.xlsx",
  hojas: {
    inicio: "Cómo usarla",
    registro: "Mis plazos fijos",
    calendario: "Calendario",
    renovacion: "Renovación",
    uva: "Tradicional vs UVA",
    escalera: "Escalera",
    resumen: "Resumen del año",
    ipc: "IPC",
    fuentes: "Fuentes",
  },
  registro: {
    inflacion: "B5",
    hoy: "B6",
    fila0: 15,
    filas: 24,
    col: {
      banco: "A",
      fecha: "B",
      capital: "C",
      tna: "D",
      dias: "E",
      vence: "F",
      interes: "G",
      cobras: "H",
      tea: "I",
      inflacion: "J",
      fuente: "K",
      real: "L",
      resultado: "M",
      estado: "N",
      garantia: "O",
    },
  },
  renovacion: { capital: "B5", tna: "B6", dias: "B7", renovaciones: "B8", inflacion: "B9", fila0: 31, periodos: 25 },
  uva: { capital: "B5", dias: "B6", renovaciones: "B7", tna: "B8", inflacion: "B9", adicional: "B10" },
  escalera: { capital: "B5", escalones: "B6", cada: "B7", fecha: "B8", tna: "B9", fila0: 15, max: 12 },
  resumen: { anio: "B5" },
  fuenteOficial: "IPC del INDEC",
  fuenteEstimada: "Estimada",
  diasMin: 30,
  diasMax: 1825,
} as const;

export type Datos = {
  capital: number;
  dias: number;
  tnaPct: number;
  renovaciones: number;
  inflacionMensualPct: number;
  uvaTnaAdicionalPct: number;
  /** "YYYY-MM-DD": el día en que la persona hizo la cuenta (fecha de constitución propuesta). */
  fecha: string;
};

const RE_FECHA = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const DIA_MS = 86_400_000;
const EPOCA_EXCEL = Date.UTC(1899, 11, 30);

/** Número de serie de Excel (y de HyperFormula) de una fecha ISO. */
export function serialDeISO(iso: string): number {
  const [a, m, d] = iso.split("-").map(Number);
  return Math.round((Date.UTC(a, m - 1, d) - EPOCA_EXCEL) / DIA_MS);
}

export function isoDeSerial(serial: number): string {
  return new Date(EPOCA_EXCEL + serial * DIA_MS).toISOString().slice(0, 10);
}

/** "2026-10-06" → "06/10/2026" */
export function fechaCorta(iso: string): string {
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}

/** Hoy en Buenos Aires con el reloj de quien la llama (no la fecha congelada del build). */
export function hoyISO(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function fechaValida(v: unknown): string | null {
  if (typeof v !== "string" || v.length !== 10) return null;
  const m = RE_FECHA.exec(v);
  if (!m) return null;
  const anio = Number(m[1]);
  if (anio < 2017 || anio > 2040) return null;
  // 2026-02-31 pasa la regex: si la fecha no existe, Date la corre de mes.
  if (isoDeSerial(serialDeISO(v)) !== v) return null;
  return v;
}

const redondear = (n: number, dec: number) => Math.round(n * 10 ** dec) / 10 ** dec;

function validar(raw: unknown): Datos | null {
  const o = objeto(raw);
  if (!o) return null;
  const capital = numero(o, "capital", 0.01, 1e12);
  const dias = numero(o, "dias", PLANILLA_PF.diasMin, PLANILLA_PF.diasMax, { entero: true });
  const tnaPct = numero(o, "tnaPct", 0, 1000);
  const renovaciones = numero(o, "renovaciones", 0, PLANILLA_PF.renovacion.periodos - 1, { entero: true });
  const inflacionMensualPct = numero(o, "inflacionMensualPct", -20, 100);
  const uvaTnaAdicionalPct = numero(o, "uvaTnaAdicionalPct", 0, 100);
  const fecha = fechaValida(Object.prototype.hasOwnProperty.call(o, "fecha") ? o.fecha : undefined);
  if (capital === null || dias === null || tnaPct === null || renovaciones === null) return null;
  if (inflacionMensualPct === null || uvaTnaAdicionalPct === null || fecha === null) return null;
  return {
    capital: redondear(capital, 2),
    dias,
    tnaPct: redondear(tnaPct, 4),
    renovaciones,
    inflacionMensualPct: redondear(inflacionMensualPct, 4),
    uvaTnaAdicionalPct: redondear(uvaTnaAdicionalPct, 4),
    fecha,
  };
}

/** Renovaciones del simulador: las de la persona, o las que cubren un año si no renovaba. */
export function renovacionesSimulador(d: Pick<Datos, "dias" | "renovaciones">): number {
  if (d.renovaciones > 0) return d.renovaciones;
  return Math.max(0, Math.min(PLANILLA_PF.renovacion.periodos - 1, Math.round(365 / d.dias) - 1));
}

// La escalera arranca en 4 partes que vencen cada 30 días: es la más chica que ya da un vencimiento
// por mes, y la persona la cambia en dos celdas.
export const ESCALERA_DEFAULT = { escalones: 4, cada: 30 } as const;

export const AVISO_CON_DATOS =
  "La primera fila viene con el plazo fijo que simulaste en calcular.ar: completá el banco y, si lo armaste otro día, corregí la fecha. Sumá los demás abajo; las columnas verdes se calculan solas.";

function aplicar(wb: ExcelJS.Workbook, d: Datos): void {
  const H = PLANILLA_PF.hojas;
  const R = PLANILLA_PF.registro;
  const reg = wb.getWorksheet(H.registro);
  if (!reg) return;
  reg.getCell("A2").value = AVISO_CON_DATOS;
  reg.getCell(R.inflacion).value = d.inflacionMensualPct;
  // Las filas de ejemplo se borran: si quedaran, el calendario y el resumen sumarían plata inventada.
  for (let i = 0; i < R.filas; i++) {
    const f = R.fila0 + i;
    for (const c of [R.col.banco, R.col.fecha, R.col.capital, R.col.tna, R.col.dias]) reg.getCell(`${c}${f}`).value = null;
  }
  const f0 = R.fila0;
  reg.getCell(`${R.col.fecha}${f0}`).value = serialDeISO(d.fecha);
  reg.getCell(`${R.col.capital}${f0}`).value = d.capital;
  reg.getCell(`${R.col.tna}${f0}`).value = d.tnaPct;
  reg.getCell(`${R.col.dias}${f0}`).value = d.dias;

  const renov = renovacionesSimulador(d);
  const ren = wb.getWorksheet(H.renovacion);
  if (ren) {
    const c = PLANILLA_PF.renovacion;
    ren.getCell(c.capital).value = d.capital;
    ren.getCell(c.tna).value = d.tnaPct;
    ren.getCell(c.dias).value = d.dias;
    ren.getCell(c.renovaciones).value = renov;
    ren.getCell(c.inflacion).value = d.inflacionMensualPct;
  }
  const uva = wb.getWorksheet(H.uva);
  if (uva) {
    const c = PLANILLA_PF.uva;
    uva.getCell(c.capital).value = d.capital;
    uva.getCell(c.dias).value = d.dias;
    uva.getCell(c.renovaciones).value = renov;
    uva.getCell(c.tna).value = d.tnaPct;
    uva.getCell(c.inflacion).value = d.inflacionMensualPct;
    uva.getCell(c.adicional).value = d.uvaTnaAdicionalPct;
  }
  const esc = wb.getWorksheet(H.escalera);
  if (esc) {
    const c = PLANILLA_PF.escalera;
    esc.getCell(c.capital).value = d.capital;
    esc.getCell(c.fecha).value = serialDeISO(d.fecha);
    esc.getCell(c.tna).value = d.tnaPct;
  }
}

export const prefill: Prefill<Datos> = { validar, aplicar };
