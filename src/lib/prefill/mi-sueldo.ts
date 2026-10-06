import type ExcelJS from "exceljs";
import type { Prefill } from "./tipos";
import { booleano, numero, objeto } from "./_campos";
import { MESES_LARGOS, mesesEntre, sumarMeses } from "@/lib/inflacion";

// Layout de la Planilla Mi Sueldo. Lo leen el generador (scripts/gen_planilla_mi_sueldo.ts), el
// check (scripts/check_planilla_mi_sueldo.ts), la vista previa (components/mi-sueldo/modelo.ts) y
// este prefill. Vive acá porque el prefill corre en el servidor de Next y no puede importar scripts/.
export const PLANILLA_MS = {
  archivo: "planilla-mi-sueldo-2026.xlsx",
  meses: 24,
  fila0: 5,
  hojas: {
    inicio: "Cómo usarla",
    datos: "Mis datos",
    recibos: "Mis recibos",
    inflacion: "Sueldo vs inflación",
    resumen: "Para pedir aumento",
    aguinaldo: "Aguinaldo",
    ipc: "IPC",
    fuentes: "Fuentes",
  },
  datos: {
    nombre: "B5",
    puesto: "B6",
    mes: "B7",
    anio: "B8",
    sindical: "B9",
    osNoRem: "B10",
    sindNoRem: "B11",
    comparar: "B12",
    conyuge: "B15",
    hijos: "B16",
    otras: "B17",
  },
  /** Columnas de «Mis recibos» que completa la persona, en el orden del recibo. */
  recibo: {
    remunerativo: "B",
    noRemunerativo: "C",
    jubilacion: "D",
    pami: "E",
    obraSocial: "F",
    sindical: "G",
    ganancias: "H",
    otros: "I",
    neto: "J",
  },
  /** Filas de «Para pedir aumento» (el valor va en la columna B). */
  resumen: {
    nombre: 5,
    puesto: 6,
    ultimoRecibo: 7,
    sueldoHoy: 9,
    netoLey: 10,
    desde: 12,
    sueldoBase: 13,
    inflacion: 14,
    poder: 15,
    necesitas: 16,
    equivalente: 17,
    frase: 18,
    hace12: 20,
    subio12: 21,
    inflacion12: 22,
    real12: 23,
    aguinaldoSemestre: 25,
    aguinaldoBruto: 26,
    aguinaldoNeto: 27,
    pisoGanancias: 29,
    ganancias: 30,
  },
  opciones: {
    si: "Sí",
    no: "No",
    compararBruto: "El bruto total",
    compararNeto: "Lo que cobré en mano",
  },
  /** Diferencia (en pesos) a partir de la cual una línea del recibo se marca para revisar. */
  tolerancia: 1,
  hijosMax: 15,
} as const;

export const ESTADOS_RECIBO = {
  cuadra: "Cuadra",
  faltan: "Cargá los descuentos",
  jubilacion: "Revisar jubilación",
  pami: "Revisar Ley 19.032",
  obraSocial: "Revisar obra social",
  sindical: "Revisar cuota sindical",
  neto: "El neto no da con los descuentos",
} as const;

/** Fila de «Mis recibos» de un mes, dado el primer mes de la planilla. */
export const filaDeMes = (primero: string, periodo: string) => PLANILLA_MS.fila0 + mesesEntre(primero, periodo);

export type Datos = {
  /** Sueldo bruto mensual que la persona puso en la calculadora (o el que resultó del inverso). */
  bruto: number;
  /** Cuota sindical en puntos porcentuales: 2 = 2 %. */
  sindicalPct: number;
  /** "YYYY-MM": el mes en que hizo la cuenta. Es la fila del recibo actual. */
  periodo: string;
  /** "YYYY-MM": desde cuándo cobra ese bruto. null = no lo dijo. */
  ultimoAumento: string | null;
  conyuge: boolean;
  hijos: number;
  otrasDeducciones: number;
};

const RE_PERIODO = /^(\d{4})-(0[1-9]|1[0-2])$/;

function periodo(o: Record<string, unknown>, clave: string, desde: string, hasta: string): string | null {
  const v = Object.prototype.hasOwnProperty.call(o, clave) ? o[clave] : undefined;
  if (typeof v !== "string" || v.length !== 7 || !RE_PERIODO.test(v)) return null;
  return v >= desde && v <= hasta ? v : null;
}

/** Primer mes de la planilla: un año antes del mes de la cuenta (para tener la comparación
 *  interanual), o antes si el último aumento es más viejo. */
export function primerMesPara(d: Pick<Datos, "periodo" | "ultimoAumento">): string {
  const base = sumarMeses(d.periodo, -12);
  return d.ultimoAumento && d.ultimoAumento < base ? d.ultimoAumento : base;
}

function validar(raw: unknown): Datos | null {
  const o = objeto(raw);
  if (!o) return null;
  const bruto = numero(o, "bruto", 1, 1e9);
  const sindicalPct = numero(o, "sindicalPct", 0, 10);
  const p = periodo(o, "periodo", "2026-01", "2030-12");
  const conyuge = booleano(o, "conyuge");
  const hijos = numero(o, "hijos", 0, PLANILLA_MS.hijosMax, { entero: true });
  const otras = numero(o, "otrasDeducciones", 0, 1e10);
  if (bruto === null || sindicalPct === null || p === null || conyuge === null || hijos === null || otras === null)
    return null;
  let ultimoAumento: string | null = null;
  if (Object.prototype.hasOwnProperty.call(o, "ultimoAumento") && o.ultimoAumento != null) {
    // La planilla tiene 24 meses: el aumento tiene que entrar con el mes de la cuenta adentro.
    ultimoAumento = periodo(o, "ultimoAumento", sumarMeses(p, -(PLANILLA_MS.meses - 1)), p);
    if (ultimoAumento === null) return null;
  }
  const r2 = (n: number) => Math.round(n * 100) / 100;
  return {
    bruto: r2(bruto),
    sindicalPct: r2(sindicalPct),
    periodo: p,
    ultimoAumento,
    conyuge,
    hijos,
    otrasDeducciones: r2(otras),
  };
}

// Pisa el aviso de ejemplo de «Mis recibos» (gen_planilla_mi_sueldo.ts).
export const AVISO_CON_DATOS =
  "Tu sueldo de la calculadora ya está cargado. Completá los descuentos de cada recibo (columnas D a J) y la planilla te dice si cuadra.";

function aplicar(wb: ExcelJS.Workbook, d: Datos): void {
  const ws = wb.getWorksheet(PLANILLA_MS.hojas.recibos);
  const datos = wb.getWorksheet(PLANILLA_MS.hojas.datos);
  if (!ws || !datos) throw new Error("la planilla no tiene las hojas esperadas");
  const R = PLANILLA_MS.recibo;
  // El ejemplo se borra entero: si quedara un recibo inventado, el resumen para pedir aumento
  // mezclaría ese sueldo con el de la persona.
  for (let i = 0; i < PLANILLA_MS.meses; i++) {
    const f = PLANILLA_MS.fila0 + i;
    for (const col of Object.values(R)) ws.getCell(`${col}${f}`).value = null;
  }
  ws.getCell("A2").value = AVISO_CON_DATOS;

  const primero = primerMesPara(d);
  const [anio, mes] = primero.split("-").map(Number);
  const C = PLANILLA_MS.datos;
  datos.getCell(C.nombre).value = null;
  datos.getCell(C.puesto).value = null;
  datos.getCell(C.mes).value = MESES_LARGOS[mes - 1];
  datos.getCell(C.anio).value = anio;
  datos.getCell(C.sindical).value = d.sindicalPct;
  datos.getCell(C.osNoRem).value = PLANILLA_MS.opciones.no;
  datos.getCell(C.sindNoRem).value = PLANILLA_MS.opciones.no;
  datos.getCell(C.comparar).value = PLANILLA_MS.opciones.compararBruto;
  datos.getCell(C.conyuge).value = d.conyuge ? PLANILLA_MS.opciones.si : PLANILLA_MS.opciones.no;
  datos.getCell(C.hijos).value = d.hijos;
  datos.getCell(C.otras).value = d.otrasDeducciones;

  // La persona dijo que cobra este bruto desde su último aumento: esos meses van con el mismo
  // sueldo. Sin el dato, sólo el mes de la cuenta.
  const desde = d.ultimoAumento ?? d.periodo;
  for (let p = desde; p <= d.periodo; p = sumarMeses(p, 1)) {
    ws.getCell(`${R.remunerativo}${filaDeMes(primero, p)}`).value = d.bruto;
  }
}

export const prefill: Prefill<Datos> = { validar, aplicar };
