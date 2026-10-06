import type ExcelJS from "exceljs";
import type { Prefill } from "./tipos";
import { escribir, numero, objeto, type Crudo } from "./_campos";
import { ANIO_VACACIONES } from "@/data/vacaciones";
import { calcularVacaciones } from "@/lib/vacaciones";

export type Datos = {
  ingresoISO: string;
  sueldo: number;
  /** Días del tramo que se toma ahora; 0 = todos los que le corresponden. */
  diasTramo: number;
  inicioISO: string;
};

// Espejo de EQUIPO en scripts/gen_planilla_vacaciones.ts: el caso de la persona va a la fila del
// empleado 1 y se borran los dos ejemplos que trae el archivo genérico, para que la temporada no
// sume gente que no existe. El nombre no viaja (dato personal): se escribe en la planilla.
export const HOJA = "Equipo";
export const FILA_PRIMERA = 6;
export const FILAS_EJEMPLO = [7, 8] as const;
export const COLUMNAS = { nombre: "B", ingreso: "C", sueldo: "D", tramo: "E", inicio: "F", notificado: "G" } as const;
/** El archivo genérico trae un egreso de ejemplo (del empleado 3): con el caso propio no tiene sentido. */
export const EGRESO_EJEMPLO = { hoja: "Egresos", celdas: ["A6", "E6"] } as const;
export const SUELDO_MAX = 100_000_000;

const ISO = /^\d{4}-\d{2}-\d{2}$/;

function fecha(o: Crudo, clave: string, min: string, max: string): string | null {
  if (!Object.prototype.hasOwnProperty.call(o, clave)) return null;
  const v = o[clave];
  if (typeof v !== "string" || !ISO.test(v)) return null;
  const t = Date.parse(`${v}T00:00:00Z`);
  if (!Number.isFinite(t) || new Date(t).toISOString().slice(0, 10) !== v) return null;
  return v >= min && v <= max ? v : null;
}

/** Fecha ISO → número de serie de Excel (días desde el 30/12/1899). Se escribe así y no como Date:
 *  es la misma celda que deja una persona al tipear la fecha y la evalúan igual Excel, Sheets y el check. */
export function serieExcel(iso: string): number {
  return Math.round((Date.parse(`${iso}T00:00:00Z`) - Date.UTC(1899, 11, 30)) / 86_400_000);
}

export const prefill: Prefill<Datos> = {
  validar(raw) {
    const o = objeto(raw);
    if (!o) return null;
    const ingresoISO = fecha(o, "ingresoISO", "1950-01-01", `${ANIO_VACACIONES}-12-31`);
    const inicioISO = fecha(o, "inicioISO", `${ANIO_VACACIONES}-01-01`, `${ANIO_VACACIONES + 1}-12-31`);
    const sueldo = numero(o, "sueldo", 1, SUELDO_MAX);
    const diasTramo = numero(o, "diasTramo", 0, 35, { entero: true });
    if (ingresoISO === null || inicioISO === null || sueldo === null || diasTramo === null) return null;
    const r = calcularVacaciones({ sueldo, ingresoISO });
    if (!r || r.dias === 0 || diasTramo > r.dias) return null;
    return { ingresoISO, sueldo, diasTramo, inicioISO };
  },
  aplicar(wb: ExcelJS.Workbook, d: Datos) {
    const C = COLUMNAS;
    const f = FILA_PRIMERA;
    escribir(wb, HOJA, {
      [`${C.ingreso}${f}`]: serieExcel(d.ingresoISO),
      [`${C.sueldo}${f}`]: d.sueldo,
      [`${C.inicio}${f}`]: serieExcel(d.inicioISO),
      [`${C.notificado}${f}`]: "No",
    });
    const ws = wb.getWorksheet(HOJA)!;
    ws.getCell(`${C.nombre}${f}`).value = null;
    ws.getCell(`${C.tramo}${f}`).value = d.diasTramo > 0 ? d.diasTramo : null;
    for (const fila of FILAS_EJEMPLO) {
      for (const col of [C.nombre, C.ingreso, C.sueldo, C.tramo, C.inicio]) ws.getCell(`${col}${fila}`).value = null;
      ws.getCell(`${C.notificado}${fila}`).value = "No";
    }
    const egr = wb.getWorksheet(EGRESO_EJEMPLO.hoja);
    if (egr) for (const ref of EGRESO_EJEMPLO.celdas) egr.getCell(ref).value = null;
  },
};
