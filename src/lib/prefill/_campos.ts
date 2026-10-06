import type ExcelJS from "exceljs";

// Lectores para `validar`: el JSON llega del navegador y es input hostil. Sólo se leen
// propiedades propias (nada heredado del prototipo) y cada lector devuelve null ante cualquier
// cosa que no sea exactamente lo esperado; los campos extra se ignoran porque nunca se leen.

export type Crudo = Record<string, unknown>;

export function objeto(raw: unknown): Crudo | null {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return null;
  return raw as Crudo;
}

function propio(o: Crudo, clave: string): unknown {
  return Object.prototype.hasOwnProperty.call(o, clave) ? o[clave] : undefined;
}

export function opcion<T extends string>(o: Crudo, clave: string, validas: readonly T[]): T | null {
  const v = propio(o, clave);
  return typeof v === "string" && (validas as readonly string[]).includes(v) ? (v as T) : null;
}

export function numero(
  o: Crudo,
  clave: string,
  min: number,
  max: number,
  { entero = false }: { entero?: boolean } = {},
): number | null {
  const v = propio(o, clave);
  if (typeof v !== "number" || !Number.isFinite(v)) return null;
  if (entero && !Number.isInteger(v)) return null;
  return v >= min && v <= max ? v : null;
}

export function booleano(o: Crudo, clave: string): boolean | null {
  const v = propio(o, clave);
  return typeof v === "boolean" ? v : null;
}

/** Escribe sólo el valor: formato, relleno y validación de la celda quedan como los dejó el generador. */
export function escribir(wb: ExcelJS.Workbook, hoja: string, valores: Record<string, string | number>): void {
  const ws = wb.getWorksheet(hoja);
  if (!ws) throw new Error(`la planilla no tiene la hoja «${hoja}»`);
  for (const [ref, v] of Object.entries(valores)) ws.getCell(ref).value = v;
}
