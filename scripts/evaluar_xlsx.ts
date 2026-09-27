// Abre un .xlsx entregable y EVALÚA sus fórmulas con HyperFormula, para que los checks de las
// planillas prueben el archivo que se vende y no una réplica en TypeScript de sus fórmulas.
//
// POR QUÉ (27/9/2026): check_planilla_comercio.ts verificaba una réplica de las fórmulas y dio
// verde con un entregable de seis semanas de atraso (incidente del 8/8/2026). Replicar la fórmula
// deja afuera justo los bugs que importan: una referencia corrida, un MATCH contra el rango
// equivocado, una coma en un desplegable. Evaluar el archivo real los atrapa todos.
//
// No es un check (no empieza con check_): lo importan los check_planilla_*.ts.

import ExcelJS from "exceljs";
import { HyperFormula } from "hyperformula";

type Celda = string | number | boolean | null;

function valorDe(v: ExcelJS.CellValue): Celda {
  if (v === null || v === undefined) return null;
  if (typeof v === "number" || typeof v === "string" || typeof v === "boolean") return v;
  if (v instanceof Date) return v.getTime();
  if (typeof v === "object") {
    if ("formula" in v && v.formula) return `=${v.formula}`;
    if ("sharedFormula" in v) throw new Error("fórmula compartida: el generador no debería producirlas");
    if ("richText" in v) return v.richText.map((t) => t.text).join("");
    if ("text" in v) return String(v.text);
    if ("error" in v) return null;
  }
  return null;
}

function aCoordenadas(ref: string): { row: number; col: number } {
  const m = ref.match(/^\$?([A-Z]+)\$?(\d+)$/);
  if (!m) throw new Error(`referencia inválida: ${ref}`);
  let col = 0;
  for (const ch of m[1]) col = col * 26 + (ch.charCodeAt(0) - 64);
  return { row: Number(m[2]) - 1, col: col - 1 };
}

export type LibroEvaluable = {
  hf: HyperFormula;
  hojas: string[];
  /** Carga varios inputs de una sola vez (un único recálculo). */
  cargar(hoja: string, valores: Record<string, Celda>): void;
  valor(hoja: string, ref: string): unknown;
  numero(hoja: string, ref: string): number;
  /** El contenido tal como vino en el archivo (fórmula con `=` o valor). */
  crudo(hoja: string, ref: string): Celda;
  /** Validación de datos de la celda, leída del archivo (HyperFormula no las modela). */
  validacion(hoja: string, ref: string): ExcelJS.DataValidation | undefined;
};

export async function abrirLibro(ruta: string): Promise<LibroEvaluable> {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(ruta);

  const hojas: Record<string, Celda[][]> = {};
  wb.eachSheet((ws) => {
    const filas: Celda[][] = [];
    for (let r = 1; r <= ws.rowCount; r++) {
      const fila: Celda[] = [];
      for (let c = 1; c <= ws.columnCount; c++) {
        const cell = ws.getCell(r, c);
        // Las celdas esclavas de un merge repiten el valor del master: se dejan vacías.
        fila.push(cell.isMerged && cell.master.address !== cell.address ? null : valorDe(cell.value));
      }
      filas.push(fila);
    }
    hojas[ws.name] = filas;
  });

  const hf = HyperFormula.buildFromSheets(hojas, { licenseKey: "gpl-v3" });
  const id = (hoja: string) => {
    const n = hf.getSheetId(hoja);
    if (n === undefined) throw new Error(`no existe la hoja «${hoja}»`);
    return n;
  };
  const addr = (hoja: string, ref: string) => ({ sheet: id(hoja), ...aCoordenadas(ref) });

  return {
    hf,
    hojas: Object.keys(hojas),
    cargar(hoja, valores) {
      hf.batch(() => {
        for (const [ref, v] of Object.entries(valores)) hf.setCellContents(addr(hoja, ref), [[v]]);
      });
    },
    valor(hoja, ref) {
      return hf.getCellValue(addr(hoja, ref));
    },
    numero(hoja, ref) {
      const v = hf.getCellValue(addr(hoja, ref));
      if (v === null) return 0;
      if (typeof v !== "number") throw new Error(`${hoja}!${ref} no es un número: ${JSON.stringify(v)}`);
      return v;
    },
    crudo(hoja, ref) {
      const { row, col } = aCoordenadas(ref);
      return hojas[hoja]?.[row]?.[col] ?? null;
    },
    validacion(hoja, ref) {
      return wb.getWorksheet(hoja)?.getCell(ref).dataValidation;
    },
  };
}
