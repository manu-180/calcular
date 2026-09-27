// Estilos y helpers compartidos por los generadores de planillas (.xlsx).
//
// Vive acá y no dentro de cada gen_planilla_*.ts porque los productos tienen que verse de la
// misma familia: el comprador de UOCRA y el de Comercio están comprando el mismo estándar.

import ExcelJS from "exceljs";

export const ARS_FMT = '"$"#,##0';
export const ARS_FMT_DEC = '"$"#,##0.00';

export function relleno(argb: string): ExcelJS.Fill {
  return { type: "pattern", pattern: "solid", fgColor: { argb } };
}

export const S = {
  header: relleno("FF1B5E20"),
  input: relleno("FFFFFDE7"),
  output: relleno("FFE8F5E9"),
  total: relleno("FFC8E6C9"),
  label: relleno("FFF5F5F5"),
  white: relleno("FFFFFFFF"),
  cebra: relleno("FFF3F8FF"),
};

export const BORDE: Partial<ExcelJS.Borders> = {
  top: { style: "thin", color: { argb: "FFB0BEC5" } },
  left: { style: "thin", color: { argb: "FFB0BEC5" } },
  bottom: { style: "thin", color: { argb: "FFB0BEC5" } },
  right: { style: "thin", color: { argb: "FFB0BEC5" } },
};

export function titulo(ws: ExcelJS.Worksheet, rango: string, texto: string, argb: string): void {
  ws.mergeCells(rango);
  const c = ws.getCell(rango.split(":")[0]);
  c.value = texto;
  c.font = { bold: true, size: 13, color: { argb: "FFFFFFFF" } };
  c.fill = relleno(argb);
  c.alignment = { horizontal: "center", vertical: "middle" };
  ws.getRow(Number(rango.match(/\d+/)![0])).height = 28;
}

export function bandaSeccion(ws: ExcelJS.Worksheet, rango: string, texto: string): void {
  ws.mergeCells(rango);
  const c = ws.getCell(rango.split(":")[0]);
  c.value = texto;
  c.font = { bold: true, size: 11, color: { argb: "FFFFFFFF" } };
  c.fill = S.header;
  c.alignment = { horizontal: "left", indent: 1 };
}

export function nota(ws: ExcelJS.Worksheet, rango: string, texto: string): void {
  ws.mergeCells(rango);
  const c = ws.getCell(rango.split(":")[0]);
  c.value = texto;
  c.font = { italic: true, size: 9, color: { argb: "FF777777" } };
  c.alignment = { wrapText: true, vertical: "top" };
}

/** Lista desplegable inline. Excel corta la fórmula de validación en 255 caracteres:
 *  si el listado creciera (12 meses, 40 categorías) hay que pasarlo a un rango con nombre,
 *  y este throw es el que avisa antes de entregar un archivo con dropdowns rotos. */
export function desplegable(opciones: string[], mensajeError: string): ExcelJS.DataValidation {
  // Una coma dentro de una opción la parte en dos en el desplegable de Excel y el valor elegido
  // deja de matchear contra la tabla: la planilla da cero sin avisar.
  const conComa = opciones.find((o) => o.includes(","));
  if (conComa) throw new Error(`Opción de desplegable con coma: «${conComa}». Usá una etiqueta sin comas.`);
  const lista = opciones.join(",");
  if (lista.length > 250) {
    throw new Error(
      `Lista de validación de ${lista.length} caracteres (máximo de Excel: 255). ` +
        "Pasala a un rango con nombre en la hoja Escala antes de seguir.",
    );
  }
  return {
    type: "list",
    allowBlank: false,
    showErrorMessage: true,
    error: mensajeError,
    formulae: [`"${lista}"`],
  };
}

export function celdaInput(ws: ExcelJS.Worksheet, ref: string, valor: string | number): ExcelJS.Cell {
  const c = ws.getCell(ref);
  c.value = valor;
  c.fill = S.input;
  c.border = BORDE;
  c.font = { bold: true };
  c.alignment = { horizontal: "left", indent: 1 };
  return c;
}

export function celdaEtiqueta(ws: ExcelJS.Worksheet, ref: string, texto: string): ExcelJS.Cell {
  const c = ws.getCell(ref);
  c.value = texto;
  c.fill = S.label;
  c.border = BORDE;
  c.alignment = { horizontal: "left", indent: 1 };
  return c;
}

export function celdaResultado(
  ws: ExcelJS.Worksheet,
  fila: number,
  etiqueta: string,
  formula: string,
  opts: { total?: boolean; formato?: string } = {},
): void {
  const fill = opts.total ? S.total : S.output;
  const lc = ws.getCell(`A${fila}`);
  lc.value = etiqueta;
  lc.fill = fill;
  lc.border = BORDE;
  lc.alignment = { horizontal: "left", indent: 1 };
  if (opts.total) lc.font = { bold: true };

  const vc = ws.getCell(`B${fila}`);
  vc.value = { formula };
  vc.fill = fill;
  vc.border = BORDE;
  vc.numFmt = opts.formato ?? ARS_FMT;
  vc.alignment = { horizontal: "right" };
  if (opts.total) vc.font = { bold: true };
}

/** Hoja de fuentes oficiales: nombre, URL y fecha de verificación a la vista.
 *  Es lo que separa el producto de una planilla gratis de internet — y lo que la landing
 *  promete. Si la hoja no existiera, la promesa sería mentira. */
export function hojaFuentes(
  wb: ExcelJS.Workbook,
  fuentes: { nombre: string; url: string }[],
  consultadoEl: string,
  homologaciones: string[] = [],
  pie = "Planilla de calcular.ar. Las actualizaciones del año están incluidas en el precio: cuando se firma una paritaria nueva, la versión actualizada te llega por email al mismo enlace de descarga.",
): void {
  const ws = wb.addWorksheet("Fuentes", { properties: { tabColor: { argb: "FF37474F" } } });
  ws.columns = [{ width: 62 }, { width: 76 }];

  titulo(ws, "A1:B1", "Fuentes oficiales", "FF37474F");

  ws.getCell("A2").value = `Todos los datos de esta planilla se verificaron el ${consultadoEl} contra los documentos oficiales de abajo. Ningún blog, ningún resumen de terceros.`;
  ws.mergeCells("A2:B2");
  ws.getCell("A2").font = { italic: true, size: 10, color: { argb: "FF555555" } };
  ws.getCell("A2").alignment = { wrapText: true, vertical: "top" };
  ws.getRow(2).height = 30;

  ["Documento", "Link"].forEach((h, i) => {
    const c = ws.getCell(4, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno("FF546E7A");
    c.border = BORDE;
  });

  fuentes.forEach((f, i) => {
    const r = 5 + i;
    const fill = i % 2 === 0 ? S.white : S.label;
    const nc = ws.getCell(r, 1);
    nc.value = f.nombre;
    nc.fill = fill;
    nc.border = BORDE;
    nc.alignment = { wrapText: true, vertical: "top" };

    const uc = ws.getCell(r, 2);
    uc.value = { text: f.url, hyperlink: f.url };
    uc.font = { color: { argb: "FF1565C0" }, underline: true };
    uc.fill = fill;
    uc.border = BORDE;
    uc.alignment = { wrapText: true, vertical: "top" };
    ws.getRow(r).height = 32;
  });

  let r = 5 + fuentes.length + 1;
  if (homologaciones.length) {
    ws.getCell(r, 1).value = "Homologaciones";
    ws.getCell(r, 1).font = { bold: true };
    r++;
    for (const h of homologaciones) {
      nota(ws, `A${r}:B${r}`, h);
      r++;
    }
    r++;
  }
  nota(ws, `A${r}:B${r}`, pie);
}
