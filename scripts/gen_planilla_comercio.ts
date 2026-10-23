/**
 * Genera private/planilla-comercio-2026.xlsx — el producto pago de Empleados de Comercio
 * (CCT 130/75).
 *
 * POR QUÉ VIVE ACÁ Y NO EN planillas-ar/: hasta el 16/8/2026 este generador estaba en otro
 * proyecto del monorepo y el .xlsx se copiaba A MANO a calcular-ar/private/. El 30/7 la
 * circular ACUERDO 07/2026 cambió la escala, calcular.ar se actualizó y el archivo entregable
 * se quedó seis semanas viejo: la primera compradora del imperio (8/8) pagó por "datos
 * oficiales verificados" y recibió el básico de julio equivocado. Un paso manual en el camino
 * del dinero es un bug esperando a pasar.
 *
 * Ahora el generador vive en el mismo proyecto que lo entrega, escribe directo a private/ y
 * scripts/check_planilla_archivo.ts abre el resultado y lo compara contra los datos vivos.
 *
 * Uso: npx -y tsx scripts/gen_planilla_comercio.ts   (o gen_planilla_todas.ts para las dos)
 */

import ExcelJS from "exceljs";
import path from "node:path";
import fs from "node:fs";

// Fuente única de verdad: la escala oficial vive en calcular.ar. La importamos para (a) la
// guarda anti-drift de abajo y (b) single-sourcear las tasas de aportes/antigüedad, de modo
// que la planilla y el sitio NUNCA puedan decir números distintos.
import {
  CATEGORIAS_COMERCIO,
  MESES_COMERCIO,
  COMERCIO_ANTIGUEDAD_POR_ANIO,
  COMERCIO_APORTES_REMUNERATIVO,
  COMERCIO_APORTES_NO_REM,
  COMERCIO_FUENTES,
} from "../src/data/convenios/comercio";

// ─── Datos oficiales: DERIVADOS de calcular-ar, no copiados ─────────────────────────────
// Antes esta escala estaba duplicada a mano acá con una guarda anti-drift que avisaba cuando
// se desincronizaba. La guarda funcionaba, pero seguía obligando a cargar cada mes dos veces.
// Ahora la planilla se genera DESDE MESES_COMERCIO: es imposible que diga un número distinto
// que el sitio, y un mes nuevo aparece solo en la planilla al regenerarla.

const CATEGORIAS = CATEGORIAS_COMERCIO.map((c) => c.nombre);
const MESES = MESES_COMERCIO.map((m) => ({
  etiqueta: m.etiqueta,
  basicos: m.basicos,
  noRem: m.noRemunerativo,
  asignacion: m.asignacionExtraordinaria ?? 0,
}));

// Layout de la hoja "Escala 2026" (referenciado por las fórmulas de la Liquidación):
const ESC = "Escala 2026";
const ESC_FILA_HEADER = 2;
const ESC_FILA_CAT_INI = 3;
const ESC_FILA_CAT_FIN = ESC_FILA_CAT_INI + CATEGORIAS.length - 1; // 21 categorías
const ESC_FILA_NOREM = ESC_FILA_CAT_FIN + 1;
// Copia oculta de las categorías dentro de «Liquidación»: un desplegable que lee de otra hoja sale
// vacío o corrido en Google Sheets (pasó con UOCRA el 21/10/2026).
const COL_LISTA_CAT_LIQ = "G";
const FILA_LISTA_CAT_INI = 5;
const ESC_FILA_ASIG = ESC_FILA_NOREM + 1;
const ESC_COL_INI = "B";
// Última columna de meses (B = primer mes). Con 9 meses → "J".
const ESC_COL_FIN = String.fromCharCode("B".charCodeAt(0) + MESES.length - 1);
if (MESES.length > 25) throw new Error("Más de 25 meses: el layout de columnas no alcanza.");

// Coordenadas de la Liquidación que lee src/lib/prefill/comercio.ts para entregar la planilla con
// los datos de la calculadora. scripts/check_prefill_planillas.ts compara las dos copias.
export const HOJA_LIQUIDACION_COMERCIO = "Liquidación";
export const CELDAS_COMERCIO = {
  categoria: "B5",
  mes: "B6",
  antiguedad: "B7",
  jornada: "B8",
  presentismo: "B9",
  bruto: "B17",
  neto: "B19",
} as const;
// Las opciones del desplegable de jornada, por id de JORNADAS_COMERCIO.
export const JORNADAS_PLANILLA_COMERCIO = {
  "8": "Jornada completa (8hs)",
  "6": "Jornada de 6hs (¾)",
  "4": "Media jornada (4hs)",
} as const;

// ─── Estilos ─────────────────────────────────────────────────────────────────

const S = {
  header: { type: "pattern", pattern: "solid", fgColor: { argb: "FF1B5E20" } } as ExcelJS.Fill,
  input:  { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFDE7" } } as ExcelJS.Fill,
  output: { type: "pattern", pattern: "solid", fgColor: { argb: "FFE8F5E9" } } as ExcelJS.Fill,
  total:  { type: "pattern", pattern: "solid", fgColor: { argb: "FFC8E6C9" } } as ExcelJS.Fill,
  label:  { type: "pattern", pattern: "solid", fgColor: { argb: "FFF5F5F5" } } as ExcelJS.Fill,
  aux:    { type: "pattern", pattern: "solid", fgColor: { argb: "FFFAFAFA" } } as ExcelJS.Fill,
  white:  { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFFFF" } } as ExcelJS.Fill,
};
const BORDER_THIN: Partial<ExcelJS.Borders> = {
  top:    { style: "thin", color: { argb: "FFB0BEC5" } },
  left:   { style: "thin", color: { argb: "FFB0BEC5" } },
  bottom: { style: "thin", color: { argb: "FFB0BEC5" } },
  right:  { style: "thin", color: { argb: "FFB0BEC5" } },
};
const CURRENCY: Partial<ExcelJS.Style> = {
  numFmt: "#,##0",
  alignment: { horizontal: "right" },
};
const ARS_FMT = '"$"#,##0';

function setRow(ws: ExcelJS.Worksheet, row: number, values: (string | number | null)[], styles: Partial<ExcelJS.Style>[] = []) {
  values.forEach((v, i) => {
    const cell = ws.getCell(row, i + 1);
    if (v !== null) cell.value = v;
    if (styles[i]) Object.assign(cell, styles[i]);
  });
}

// ─── Hoja 1: LIQUIDACIÓN ─────────────────────────────────────────────────────

function buildLiquidacion(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet("Liquidación", { properties: { tabColor: { argb: "FF1B5E20" } } });

  ws.columns = [
    { width: 32 },  // A: etiqueta
    { width: 30 },  // B: valor / input
    { width: 4 },   // C: separador
    { width: 20 },  // D: auxiliar oculto
    { width: 20 },  // E: auxiliar oculto
  ];

  // ── Título ──
  ws.mergeCells("A1:B1");
  const t = ws.getCell("A1");
  t.value = "Liquidación de sueldos — Empleados de Comercio";
  t.font = { bold: true, size: 14, color: { argb: "FFFFFFFF" } };
  t.fill = S.header;
  t.alignment = { horizontal: "center", vertical: "middle" };
  ws.getRow(1).height = 30;

  ws.mergeCells("A2:B2");
  const sub = ws.getCell("A2");
  sub.value = `CCT 130/75 · Escala oficial de FAECYS · Verificada el ${COMERCIO_FUENTES.consultadoEl}`;
  sub.font = { italic: true, size: 10, color: { argb: "FF555555" } };
  sub.fill = S.label;
  sub.alignment = { horizontal: "center" };

  // ── Sección: INPUTS ──
  ws.mergeCells("A4:B4");
  const ih = ws.getCell("A4");
  ih.value = "DATOS DEL EMPLEADO";
  ih.font = { bold: true, size: 11, color: { argb: "FFFFFFFF" } };
  ih.fill = S.header;
  ih.alignment = { horizontal: "left", indent: 1 };

  const inputRows: Array<[string, string, string | ExcelJS.DataValidation]> = [
    ["Categoría del convenio", "B5", {
      type: "list", allowBlank: false, showErrorMessage: true,
      error: "Seleccioná una categoría de la lista.",
      formulae: [`'Liquidación'!$${COL_LISTA_CAT_LIQ}$${FILA_LISTA_CAT_INI}:$${COL_LISTA_CAT_LIQ}$${FILA_LISTA_CAT_INI + CATEGORIAS.length - 1}`],
    }],
    ["Mes a liquidar", "B6", {
      type: "list", allowBlank: false, showErrorMessage: true,
      error: "Seleccioná un mes de la lista.",
      formulae: [`"${MESES.map((m) => m.etiqueta).join(",")}"`],
    }],
    ["Años de antigüedad", "B7", ""],
    ["Jornada laboral", "B8", {
      type: "list", allowBlank: false, showErrorMessage: true,
      error: "Seleccioná una jornada de la lista.",
      formulae: ['"Jornada completa (8hs),Jornada de 6hs (¾),Media jornada (4hs)"'],
    }],
    ["¿Cobró presentismo?", "B9", {
      type: "list", allowBlank: false, showErrorMessage: true,
      error: "Seleccioná Sí o No.",
      formulae: ['"Sí,No"'],
    }],
  ];

  const rowNums = [5, 6, 7, 8, 9];
  rowNums.forEach((r, i) => {
    const [label, ref, validation] = inputRows[i];
    const labelCell = ws.getCell(`A${r}`);
    labelCell.value = label;
    labelCell.fill = S.label;
    labelCell.border = BORDER_THIN;
    labelCell.alignment = { horizontal: "left", indent: 1 };

    const inputCell = ws.getCell(ref as string);
    inputCell.fill = S.input;
    inputCell.border = BORDER_THIN;
    inputCell.alignment = { horizontal: "left", indent: 1 };
    inputCell.font = { bold: true };

    if (typeof validation === "object" && (validation as ExcelJS.DataValidation).type) {
      inputCell.dataValidation = validation as ExcelJS.DataValidation;
    }
  });

  // Valores por defecto
  ws.getCell("B5").value = "Vendedor B";
  ws.getCell("B6").value = MESES.at(-1)!.etiqueta;
  ws.getCell("B7").value = 0;
  ws.getCell("B7").numFmt = "0";
  ws.getCell("B7").dataValidation = {
    type: "whole", operator: "between", showErrorMessage: true,
    formulae: [0, 50],
    error: "Ingresá un número entero entre 0 y 50.",
  };
  ws.getCell("B8").value = "Jornada completa (8hs)";
  ws.getCell("B9").value = "Sí";

  // ── Auxiliares ocultos (D5:D7) ──
  // D5: factor de jornada
  ws.getCell("D5").value = { formula: 'IF(B8="Jornada completa (8hs)",1,IF(B8="Jornada de 6hs (¾)",0.75,0.5))' };
  // D6: número de columna del mes dentro de la fila de encabezados de la hoja de escala.
  ws.getCell("D6").value = {
    formula: `MATCH(B6,'${ESC}'!$${ESC_COL_INI}$${ESC_FILA_HEADER}:$${ESC_COL_FIN}$${ESC_FILA_HEADER},0)`,
  };
  // D7: sumas no remunerativas del mes, ajustadas por jornada (fila propia de la escala).
  ws.getCell("D7").value = {
    formula: `INDEX('${ESC}'!$${ESC_COL_INI}$${ESC_FILA_NOREM}:$${ESC_COL_FIN}$${ESC_FILA_NOREM},1,D6)*D5`,
  };
  // D8: asignación extraordinaria por única vez del mes (acuerdo 07/2026), por jornada.
  ws.getCell("D8").value = {
    formula: `INDEX('${ESC}'!$${ESC_COL_INI}$${ESC_FILA_ASIG}:$${ESC_COL_FIN}$${ESC_FILA_ASIG},1,D6)*D5`,
  };
  // E5/E6/E7: porción NO remunerativa de antigüedad y presentismo. Lo calculado sobre la SNR
  // sigue siendo no remunerativo (instrucción FAECYS) → aporta 3%, no 17%. Esto hace que el
  // neto de la planilla coincida exacto con la calculadora de calcular.ar.
  ws.getCell("E5").value = { formula: `B13*B7*${COMERCIO_ANTIGUEDAD_POR_ANIO}` };
  ws.getCell("E6").value = { formula: 'IF(B9="Sí",(B13+E5)/12,0)' };
  // La asignación extraordinaria también es no remunerativa (aporta 3%), pero entra acá
  // "plana": no la multiplican ni la antigüedad ni el presentismo.
  ws.getCell("E7").value = { formula: "B13+E5+E6+B16" };
  // Ocultar columna D
  ws.getColumn("D").hidden = true;
  ws.getColumn("E").hidden = true;
  CATEGORIAS.forEach((cat, i) => {
    ws.getCell(`${COL_LISTA_CAT_LIQ}${FILA_LISTA_CAT_INI + i}`).value = cat;
  });
  ws.getColumn(COL_LISTA_CAT_LIQ).hidden = true;

  // ── Separador ──
  ws.getRow(10).height = 6;

  // ── Sección: RESULTADO ──
  ws.mergeCells("A11:B11");
  const rh = ws.getCell("A11");
  rh.value = "LIQUIDACIÓN DEL MES";
  rh.font = { bold: true, size: 11, color: { argb: "FFFFFFFF" } };
  rh.fill = S.header;
  rh.alignment = { horizontal: "left", indent: 1 };

  const resultRows: Array<[number, string, string]> = [
    [12, "Básico convencional",         `=INDEX('${ESC}'!$${ESC_COL_INI}$${ESC_FILA_CAT_INI}:$${ESC_COL_FIN}$${ESC_FILA_CAT_FIN},MATCH(B5,'${ESC}'!$A$${ESC_FILA_CAT_INI}:$A$${ESC_FILA_CAT_FIN},0),D6)*D5`],
    [13, "Sumas no remunerativas",       "=D7"],
    [14, "Adicional por antigüedad",     `=(B12+B13)*B7*${COMERCIO_ANTIGUEDAD_POR_ANIO}`],
    [15, "Presentismo (8,33%)",          '=IF(B9="Sí",(B12+B13+B14)/12,0)'],
    // Asignación extraordinaria por única vez (acuerdo 07/2026, julio y agosto de 2026):
    // va suelta, la circular la excluye de la antigüedad y del presentismo.
    [16, "Asignación extraordinaria",     "=D8"],
    [17, "TOTAL BRUTO",                  "=B12+B13+B14+B15+B16"],
    // Aportes: 17% sobre lo remunerativo (= bruto − no rem) + 3% sobre lo NO remunerativo (E7).
    [18, "Aportes del trabajador",        `=-((B17-E7)*${COMERCIO_APORTES_REMUNERATIVO}+E7*${COMERCIO_APORTES_NO_REM})`],
    [19, "NETO ESTIMADO",                "=B17+B18"],
  ];

  resultRows.forEach(([r, label, formula]) => {
    const isTotal = r === 17 || r === 19;

    const labelCell = ws.getCell(`A${r}`);
    labelCell.value = label;
    labelCell.fill = isTotal ? S.total : S.output;
    labelCell.border = BORDER_THIN;
    labelCell.alignment = { horizontal: "left", indent: 1 };
    labelCell.font = isTotal ? { bold: true } : {};

    const valCell = ws.getCell(`B${r}`);
    // OOXML guarda la fórmula sin el «=»: con él, Excel ofrece «reparar» el archivo.
    valCell.value = { formula: formula.replace(/^=/, "") };
    valCell.fill = isTotal ? S.total : S.output;
    valCell.border = BORDER_THIN;
    valCell.numFmt = ARS_FMT;
    valCell.alignment = { horizontal: "right" };
    valCell.font = isTotal ? { bold: true } : {};
  });

  // ── Nota aclaratoria ──
  ws.getRow(20).height = 6;
  ws.mergeCells("A21:B21");
  ws.getCell("A21").value =
    "* Aportes = 17% jubilación+PAMI+obra social sobre lo remunerativo + 3% obra social sobre sumas no remunerativas (art. 40 CCT y acuerdo 26/3/2026).";
  ws.getCell("A21").font = { italic: true, size: 9, color: { argb: "FF777777" } };

  ws.mergeCells("A22:B22");
  ws.getCell("A22").value =
    "* El neto es estimado: no incluye cuota sindical (FAECYS ~1%), Ganancias (si aplica) ni descuentos por deuda.";
  ws.getCell("A22").font = { italic: true, size: 9, color: { argb: "FF777777" } };

  ws.mergeCells("A23:B23");
  ws.getCell("A23").value =
    "* Fuente: circular FAECYS 7/4/2026 + acuerdo paritario 26/3/2026. Verificado el 12/06/2026 contra los PDFs oficiales.";
  ws.getCell("A23").font = { italic: true, size: 9, color: { argb: "FF777777" } };

  // Freeze header + inputs
  ws.views = [{ state: "frozen", ySplit: 4 }];
}

// ─── Hoja 2: ESCALA 2026 ─────────────────────────────────────────────────────
// Una columna por mes cargado en calcular.ar. Debajo de las 21 categorías van dos filas
// más: las sumas no remunerativas y la asignación extraordinaria del mes. La Liquidación
// las lee con INDEX/MATCH sobre esta misma grilla, así que agregar un mes es agregar una
// columna: ninguna fórmula queda apuntando a un rango viejo.

function buildEscala(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(ESC, { properties: { tabColor: { argb: "FF1565C0" } } });

  ws.columns = [{ width: 28 }, ...MESES.map(() => ({ width: 16 }))];
  const ultimaCol = String.fromCharCode("A".charCodeAt(0) + MESES.length);

  // Título
  ws.mergeCells(`A1:${ultimaCol}1`);
  const t = ws.getCell("A1");
  t.value = "Escala de básicos — CCT 130/75 Empleados de Comercio 2026";
  t.font = { bold: true, size: 13, color: { argb: "FFFFFFFF" } };
  t.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1565C0" } };
  t.alignment = { horizontal: "center", vertical: "middle" };
  ws.getRow(1).height = 26;

  // Encabezados: la fila que MATCH usa para ubicar el mes. Los textos tienen que ser
  // idénticos a los del desplegable de la Liquidación (los dos salen de MESES).
  const headers = ["Categoría", ...MESES.map((m) => m.etiqueta)];
  headers.forEach((h, i) => {
    const cell = ws.getCell(ESC_FILA_HEADER, i + 1);
    cell.value = h;
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1976D2" } };
    cell.border = BORDER_THIN;
    cell.alignment = { horizontal: "center" };
  });
  ws.getRow(ESC_FILA_HEADER).height = 20;

  // Básicos por categoría
  CATEGORIAS.forEach((cat, i) => {
    const r = ESC_FILA_CAT_INI + i;
    const catId = CATEGORIAS_COMERCIO[i].id;
    const rowFill: ExcelJS.Fill =
      i % 2 === 0 ? S.white : { type: "pattern", pattern: "solid", fgColor: { argb: "FFF3F8FF" } };

    const catCell = ws.getCell(r, 1);
    catCell.value = cat;
    catCell.fill = rowFill;
    catCell.border = BORDER_THIN;

    MESES.forEach((mes, j) => {
      const cell = ws.getCell(r, j + 2);
      cell.value = mes.basicos[catId];
      cell.numFmt = ARS_FMT;
      cell.fill = rowFill;
      cell.border = BORDER_THIN;
      cell.alignment = { horizontal: "right" };
    });
  });

  // Filas de sumas del mes (iguales para todas las categorías).
  const filasExtra: Array<[number, string, (m: (typeof MESES)[number]) => number]> = [
    [ESC_FILA_NOREM, "Sumas no remunerativas", (m) => m.noRem],
    [ESC_FILA_ASIG, "Asignación extraordinaria", (m) => m.asignacion],
  ];
  filasExtra.forEach(([r, label, valor]) => {
    const lc = ws.getCell(r, 1);
    lc.value = label;
    lc.font = { bold: true };
    lc.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE8F5E9" } };
    lc.border = BORDER_THIN;

    MESES.forEach((mes, j) => {
      const cell = ws.getCell(r, j + 2);
      cell.value = valor(mes);
      cell.numFmt = ARS_FMT;
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE8F5E9" } };
      cell.border = BORDER_THIN;
      cell.alignment = { horizontal: "right" };
      cell.font = { bold: true };
    });
  });

  // Notas
  const noteRow = ESC_FILA_ASIG + 2;
  ws.mergeCells(`A${noteRow}:${ultimaCol}${noteRow}`);
  ws.getCell(`A${noteRow}`).value =
    `Fuente: ${COMERCIO_FUENTES.escalas.nombre} + ${COMERCIO_FUENTES.acuerdo.nombre}. ` +
    `Verificado el ${COMERCIO_FUENTES.consultadoEl}. La asignación extraordinaria es por única vez ` +
    "(julio y agosto de 2026) y no suma antigüedad, presentismo ni aguinaldo.";
  ws.getCell(`A${noteRow}`).font = { italic: true, size: 9, color: { argb: "FF555555" } };
  ws.mergeCells(`A${noteRow + 1}:${ultimaCol}${noteRow + 1}`);
  ws.getCell(`A${noteRow + 1}`).value =
    "Datos verificados contra los PDFs oficiales de FAECYS. calcular.ar · Operado por Hornero.";
  ws.getCell(`A${noteRow + 1}`).font = { italic: true, size: 9, color: { argb: "FF888888" } };

  ws.views = [{ state: "frozen", ySplit: ESC_FILA_HEADER }];
}

// ─── Hoja 3: SAC (AGUINALDO) ─────────────────────────────────────────────────

function buildSac(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet("SAC (Aguinaldo)", { properties: { tabColor: { argb: "FF6A1B9A" } } });
  ws.columns = [{ width: 34 }, { width: 22 }];

  ws.mergeCells("A1:B1");
  const t = ws.getCell("A1");
  t.value = "Calculadora de SAC (Aguinaldo) — Ley 23.041";
  t.font = { bold: true, size: 13, color: { argb: "FFFFFFFF" } };
  t.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF6A1B9A" } };
  t.alignment = { horizontal: "center", vertical: "middle" };
  ws.getRow(1).height = 26;

  ws.mergeCells("A3:B3");
  const h2 = ws.getCell("A3");
  h2.value = "DATOS DEL SEMESTRE";
  h2.font = { bold: true, color: { argb: "FFFFFFFF" } };
  h2.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF7B1FA2" } };

  const inputsSac: [number, string, number | string][] = [
    [4, "Mejor sueldo bruto del semestre ($)", 1_273_746],
    [5, "Días trabajados en el semestre", 180],
    [6, "Días del semestre (180 o 184)", 180],
  ];
  inputsSac.forEach(([r, label, defaultVal]) => {
    const lc = ws.getCell(`A${r}`);
    lc.value = label;
    lc.fill = S.label;
    lc.border = BORDER_THIN;

    const ic = ws.getCell(`B${r}`);
    ic.value = defaultVal;
    ic.fill = S.input;
    ic.border = BORDER_THIN;
    ic.numFmt = typeof defaultVal === "number" ? (defaultVal > 1000 ? ARS_FMT : "0") : "@";
    ic.font = { bold: true };
    ic.alignment = { horizontal: "right" };
  });

  ws.getRow(7).height = 6;

  ws.mergeCells("A8:B8");
  const rh = ws.getCell("A8");
  rh.value = "RESULTADO";
  rh.font = { bold: true, color: { argb: "FFFFFFFF" } };
  rh.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF7B1FA2" } };

  const resultsSac: [number, string, string][] = [
    [9,  "SAC bruto (proporcional)",         "=B4/2*B5/B6"],
    [10, "Aportes sobre el SAC (~17%)",       "=-B9*0.17"],
    [11, "SAC NETO estimado",                 "=B9+B10"],
  ];
  resultsSac.forEach(([r, label, formula]) => {
    const isTotal = r === 11;
    const lc = ws.getCell(`A${r}`);
    lc.value = label;
    lc.fill = isTotal ? S.total : S.output;
    lc.border = BORDER_THIN;
    lc.font = isTotal ? { bold: true } : {};

    const vc = ws.getCell(`B${r}`);
    vc.value = { formula: formula.replace(/^=/, "") };
    vc.fill = isTotal ? S.total : S.output;
    vc.border = BORDER_THIN;
    vc.numFmt = ARS_FMT;
    vc.alignment = { horizontal: "right" };
    vc.font = isTotal ? { bold: true } : {};
  });

  ws.mergeCells("A13:B13");
  ws.getCell("A13").value = "* SAC = mejor sueldo del semestre ÷ 2 × (días trabajados ÷ días del semestre). Fuente: Ley 23.041.";
  ws.getCell("A13").font = { italic: true, size: 9, color: { argb: "FF777777" } };
  ws.mergeCells("A14:B14");
  ws.getCell("A14").value = "* Los aportes sobre el SAC son idénticos a los del sueldo mensual (11%+3%+3%). El SAC está exento de Ganancias.";
  ws.getCell("A14").font = { italic: true, size: 9, color: { argb: "FF777777" } };
}

// ─── Hoja 4: CHANGELOG ───────────────────────────────────────────────────────

function buildChangelog(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet("Changelog", { properties: { tabColor: { argb: "FF37474F" } } });
  ws.columns = [{ width: 14 }, { width: 50 }, { width: 60 }];

  ws.mergeCells("A1:C1");
  const t = ws.getCell("A1");
  t.value = "Historial de actualizaciones";
  t.font = { bold: true, size: 13, color: { argb: "FFFFFFFF" } };
  t.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF37474F" } };
  t.alignment = { horizontal: "center", vertical: "middle" };
  ws.getRow(1).height = 24;

  ["Fecha", "Cambio", "Fuente"].forEach((h, i) => {
    const cell = ws.getCell(2, i + 1);
    cell.value = h;
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF546E7A" } };
    cell.border = BORDER_THIN;
  });

  const entradas: [string, string, string][] = [
    [
      "12/06/2026",
      "Publicación inicial: escala abr-jul 2026 completa (21 categorías), $120.000 SNR, antigüedad, presentismo y jornada parcial.",
      "Circular FAECYS 7/4/2026 + acuerdo paritario 26/3/2026 (PDF oficiales leídos completos).",
    ],
    [
      "15/06/2026",
      "Corrección del neto estimado: la antigüedad y el presentismo calculados sobre las sumas no remunerativas ahora aportan 3% (no 17%), igual que la calculadora de calcular.ar. El bruto no cambia; el neto queda idéntico al del sitio.",
      "CCT 130/75 art. 40 + circular FAECYS (lo calculado sobre lo no remunerativo sigue siendo no remunerativo).",
    ],
    [
      "30/07/2026",
      "Acuerdo paritario del 22/7/2026: escalas de julio a diciembre de 2026 (+1,9% julio, +3,8% agosto, +5,7% septiembre a noviembre, no acumulativos sobre el total de junio). Nueva fila «Asignación extraordinaria» con el bono de $50.000 en dos cuotas de $25.000 (julio y agosto), que no suma antigüedad ni presentismo. Los $120.000 no remunerativos NO se incorporaron al básico en julio: se incorporan de a $20.000 por mes entre diciembre de 2026 y mayo de 2027.",
      "Circular FAECYS «ACUERDO 07/2026» del 28/7/2026 (PDF oficial, 56 páginas, leído completo).",
    ],
    [
      "(próxima actualización)",
      "Se actualizará cuando FAECYS publique la paritaria del último trimestre de 2026.",
      "faecys.org.ar",
    ],
  ];

  entradas.forEach(([fecha, cambio, fuente], i) => {
    const r = i + 3;
    const fill: ExcelJS.Fill = i % 2 === 0 ? S.white : { type: "pattern", pattern: "solid", fgColor: { argb: "FFF5F5F5" } };
    [fecha, cambio, fuente].forEach((v, j) => {
      const cell = ws.getCell(r, j + 1);
      cell.value = v;
      cell.fill = fill;
      cell.border = BORDER_THIN;
      cell.alignment = { wrapText: true, vertical: "top" };
    });
    ws.getRow(r).height = 40;
  });

  ws.views = [{ state: "frozen", ySplit: 2 }];
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export async function generarPlanillaComercio(): Promise<string> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "CalculAR (calcular.ar)";
  wb.created = new Date("2026-06-12");
  wb.modified = new Date("2026-07-30");
  wb.title = "Planilla de sueldos Empleados de Comercio 2026 — CCT 130/75";
  wb.subject = "Liquidación de sueldos según la circular oficial de FAECYS";
  wb.keywords = "comercio, sueldo, cct 130/75, faecys, planilla, liquidación";

  buildLiquidacion(wb);
  buildEscala(wb);
  buildSac(wb);
  buildChangelog(wb);

  const outDir = path.join(process.cwd(), "private");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "planilla-comercio-2026.xlsx");

  await wb.xlsx.writeFile(outPath);
  return outPath;
}

// Solo corre como script; importado por gen_planilla_todas.ts no hace nada.
if (process.argv[1] && /gen_planilla_comercio\.ts$/.test(process.argv[1])) {
  generarPlanillaComercio()
    .then((salida) => {
      console.log(`Planilla Comercio generada: ${salida}`);
      console.log(`   Hojas: Liquidación | ${ESC} | SAC (Aguinaldo) | Changelog`);
      console.log(`   ${MESES.length} meses: ${MESES.map((m) => m.etiqueta).join(" · ")}`);
      console.log(`   Fuente: ${COMERCIO_FUENTES.escalas.nombre}`);
    })
    .catch((e) => { console.error(e); process.exit(1); });
}
