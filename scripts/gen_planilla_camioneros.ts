/**
 * Genera private/planilla-camioneros-2026.xlsx — el producto pago de Camioneros (CCT 40/89).
 *
 * INVARIANTE: los básicos NO se escriben a mano acá. Salen de src/data/convenios/camioneros.ts (las
 * planillas firmadas de FADEEAC), la misma fuente que la calculadora gratis de /convenios/camioneros, y
 * las tasas salen de las constantes vivas. scripts/check_planilla_camioneros.ts evalúa este archivo con
 * HyperFormula y exige que dé lo mismo que calcularCamioneros() y calcularAguinaldo().
 *
 * Uso: npx -y tsx scripts/gen_planilla_camioneros.ts
 */

import ExcelJS from "exceljs";
import path from "node:path";
import { mkdirSync, existsSync } from "node:fs";
import {
  CAMIONEROS_ANTIGUEDAD_POR_ANIO,
  CAMIONEROS_APORTES_REMUNERATIVO,
  CAMIONEROS_FUENTES,
  CAMIONEROS_HOMOLOGACION,
  CATEGORIAS_CAMIONEROS,
  ESCALAS_POR_MES,
  MESES_CAMIONEROS,
} from "../src/data/convenios/camioneros";
import { AGUINALDO_FUENTES, APORTES_PERSONALES, SEMESTRES_2026 } from "../src/data/aguinaldo";
import { diasInclusivos } from "../src/lib/aguinaldo";
import { VIATICOS_CAMIONEROS, ZONAS_CAMIONEROS } from "../src/components/camioneros/viaticos";
import {
  ARS_FMT,
  ARS_FMT_DEC,
  BORDE,
  S,
  bandaSeccion,
  celdaEtiqueta,
  celdaInput,
  celdaResultado,
  desplegable,
  hojaFuentes,
  nota,
  relleno,
  titulo,
} from "./gen_planilla_estilos";

export const ARCHIVO_CAMIONEROS = "planilla-camioneros-2026.xlsx";
export const HOJAS_CAMIONEROS = {
  instrucciones: "Instrucciones",
  liquidador: "Liquidador",
  nomina: "Nómina",
  recibo: "Recibo",
  sac: "SAC (Aguinaldo)",
  escala: "Escala 2026",
  fuentes: "Fuentes",
} as const;

// Coordenadas que leen src/lib/prefill/camioneros.ts (copia) y el check.
export const HOJA_LIQUIDADOR_CAMIONEROS = HOJAS_CAMIONEROS.liquidador;
export const CELDAS_CAMIONEROS = {
  categoria: "B5",
  mes: "B6",
  antiguedad: "B7",
  zona: "B8",
  bruto: "B23",
  neto: "B27",
  aCobrar: "B29",
} as const;
export const ENTRADAS_VIAJE = {
  kmHorasExtra: "B11",
  kmViatico: "B12",
  comidas: "B13",
  viaticosEspeciales: "B14",
  pernoctadas: "B15",
  otrosRemunerativos: "B16",
  otrosNoRemunerativos: "B17",
} as const;
export const LIQ = {
  basico: "B19",
  horasExtraKm: "B20",
  otrosRem: "B21",
  antiguedad: "B22",
  jubilacion: "B24",
  pami: "B25",
  obraSocial: "B26",
  noRemunerativo: "B28",
} as const;
export const VALORES_VIATICOS = {
  porKm: "B32",
  comida: "B33",
  viaticoEspecial: "B34",
  pernoctada: "B35",
} as const;
export const NOMINA = {
  primeraFila: 6,
  filas: 30,
  columnas: {
    nombre: "A", categoria: "B", antiguedad: "C", zona: "D", kmHorasExtra: "E", kmViatico: "F",
    comidas: "G", viaticosEspeciales: "H", pernoctadas: "I", otrosRem: "J", otrosNoRem: "K",
    basico: "L", horasExtraKm: "M", antiguedadMonto: "N", totalRem: "O", aportes: "P", neto: "Q",
    noRem: "R", aCobrar: "S", coef: "T",
  },
} as const;
export const SAC = {
  semestre: "B4",
  primerMes: 5,
  diasTrabajados: "B11",
  mejor: "B14",
  diasSemestre: "B15",
  bruto: "B17",
  neto: "B21",
} as const;

const ESC = HOJAS_CAMIONEROS.escala;
const LQ = `'${HOJAS_CAMIONEROS.liquidador}'!`;
const FILA_ESC_HEADER = 2;
const FILA_ESC_INI = 3;
const FILA_ESC_FIN = FILA_ESC_INI + CATEGORIAS_CAMIONEROS.length - 1;
const COL_MES_FIN = 1 + MESES_CAMIONEROS.length;

function letraCol(n: number): string {
  let s = "";
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

const L_MES_FIN = letraCol(COL_MES_FIN);
const RANGO_ESCALA = `'${ESC}'!$B$${FILA_ESC_INI}:$${L_MES_FIN}$${FILA_ESC_FIN}`;
const RANGO_CATS = `'${ESC}'!$A$${FILA_ESC_INI}:$A$${FILA_ESC_FIN}`;
const RANGO_MESES = `'${ESC}'!$B$${FILA_ESC_HEADER}:$${L_MES_FIN}$${FILA_ESC_HEADER}`;

const TASA_ANTIG = CAMIONEROS_ANTIGUEDAD_POR_ANIO;
const { jubilacion: T_JUB, pami: T_PAMI, obraSocial: T_OS } = APORTES_PERSONALES;
const ZONA_COLORADO = ZONAS_CAMIONEROS[1];
const ZONA_SANTA_CRUZ = ZONAS_CAMIONEROS[2];
const coefZona = (ref: string) =>
  `IF(${ref}="${ZONA_SANTA_CRUZ.nombre}",${ZONA_SANTA_CRUZ.coeficiente},IF(${ref}="${ZONA_COLORADO.nombre}",${ZONA_COLORADO.coeficiente},1))`;

const ULTIMO_MES = MESES_CAMIONEROS.at(-1)!;
const ESCALA_HASTA_AGOSTO = ULTIMO_MES.id === "agosto-2026";
const TEXTO_PROXIMA = ESCALA_HASTA_AGOSTO
  ? "La escala de septiembre de 2026 a febrero de 2027 ya está acordada (FADEEAC publicó la homologación, Disposición 1277/26), pero las planillas firmadas de cada mes todavía no salieron. Apenas FADEEAC las publique, las cargamos y la versión nueva te llega al mismo enlace de descarga: no vence."
  : `La escala llega hasta ${ULTIMO_MES.etiqueta.toLowerCase()}, la última planilla firmada publicada por FADEEAC. Cuando salga la siguiente, la cargamos y la versión nueva te llega al mismo enlace de descarga: no vence.`;

const fechaDMA = (iso: string) => iso.split("-").reverse().join("/");

function numeroInput(ws: ExcelJS.Worksheet, ref: string, valor: number, formato: string, validacion: ExcelJS.DataValidation): void {
  const c = celdaInput(ws, ref, valor);
  c.numFmt = formato;
  c.alignment = { horizontal: "right" };
  c.dataValidation = validacion;
}

const rangoNum = (min: number, max: number, entero: boolean, error: string): ExcelJS.DataValidation => ({
  type: entero ? "whole" : "decimal",
  operator: "between",
  allowBlank: true,
  showErrorMessage: true,
  formulae: [min, max],
  error,
});

function referencia(ws: ExcelJS.Worksheet, ref: string, texto: string): void {
  const c = ws.getCell(ref);
  c.value = texto;
  c.font = { size: 9, color: { argb: "FF78909C" } };
  c.alignment = { vertical: "middle", wrapText: true };
}

// ─── Instrucciones ───────────────────────────────────────────────────────────

function buildInstrucciones(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS_CAMIONEROS.instrucciones, { properties: { tabColor: { argb: "FFEF6C00" } } });
  ws.columns = [{ width: 4 }, { width: 108 }];
  titulo(ws, "A1:B1", "Planilla de sueldos Camioneros 2026 — cómo usarla", "FFEF6C00");

  const pasos: [string, string][] = [
    ["1", "En «Liquidador» elegí categoría, mes, años de antigüedad y zona. Si el chofer viajó, cargá los kilómetros, las comidas, los viáticos especiales y las pernoctadas del mes."],
    ["2", "Solo se completan las celdas amarillas. Las verdes se calculan solas: básico, horas extra por km, antigüedad, aportes, neto y lo que cobra en total."],
    ["3", "«Nómina» liquida a toda la flota en una sola hoja: un trabajador por fila, con el mismo mes del Liquidador. Abajo tenés los totales del mes."],
    ["4", "«Recibo» toma lo del Liquidador y queda listo para imprimir en A4. Los datos de la empresa y del trabajador se escriben acá y no salen de tu computadora."],
    ["5", "«SAC (Aguinaldo)» calcula el medio aguinaldo con el mejor mes del semestre, proporcional si trabajó menos tiempo."],
    ["6", "«Escala 2026» tiene los básicos firmados mes por mes y «Fuentes» el PDF oficial de cada uno. Si alguien te discute un número, ahí está el documento."],
  ];
  pasos.forEach(([n, t], i) => {
    const r = 3 + i;
    const nc = ws.getCell(r, 1);
    nc.value = n;
    nc.font = { bold: true, color: { argb: "FFFFFFFF" } };
    nc.fill = relleno("FFEF6C00");
    nc.alignment = { horizontal: "center", vertical: "middle" };
    const tc = ws.getCell(r, 2);
    tc.value = t;
    tc.alignment = { wrapText: true, vertical: "middle", indent: 1 };
    ws.getRow(r).height = 34;
  });

  let r = 3 + pasos.length + 1;
  bandaSeccion(ws, `A${r}:B${r}`, "LO QUE TENÉS QUE SABER DEL CCT 40/89");
  r++;
  const claves = [
    `Escala nacional única: el básico es el mismo en todo el país. Los básicos de esta planilla son los de las planillas firmadas que publica FADEEAC, de ${MESES_CAMIONEROS[0].etiqueta.toLowerCase()} a ${ULTIMO_MES.etiqueta.toLowerCase()} (${CAMIONEROS_HOMOLOGACION} y revisión de julio).`,
    `Antigüedad (ítem 6.1.5): ${TASA_ANTIG * 100}% por año sobre los conceptos remunerativos. Sin kilómetros ni adicionales, es el ${TASA_ANTIG * 100}% del básico por año.`,
    `Kilómetros: el ítem 4.2.3 (horas extraordinarias por kilometraje) es remunerativo y lleva aportes; el ítem 4.2.4 (viático por km) no. Los dos valen lo mismo por km. El viático 4.2.4 no puede ser menor a ${VIATICOS_CAMIONEROS.kmMinimoPorDia} km por día de viaje, y el 4.2.3 se paga al 100% más los sábados después de las 13, domingos y feriados: esos km cargalos dobles.`,
    "Comida (4.1.12), viático especial (4.1.13), pernoctada (4.1.14) y viático por km (4.2.4) no son remunerativos (ítem 4.2.11 del convenio y art. 106 de la LCT): no llevan aportes ni entran en el aguinaldo.",
    `Zona: quien reside al sur del Río Colorado cobra los viáticos y el 4.2.3 con coeficiente ${ZONA_COLORADO.coeficiente.toLocaleString("es-AR")}, y al sur del Río Santa Cruz con ${ZONA_SANTA_CRUZ.coeficiente.toLocaleString("es-AR")}. El básico no cambia.`,
    `Los valores de viáticos son los de la planilla de ${VIATICOS_CAMIONEROS.etiquetaMes.toLowerCase()}. Si liquidás otro mes, reemplazalos en el Liquidador por los de esa planilla (son celdas amarillas).`,
    `Aportes del trabajador: ${T_JUB * 100}% jubilación, ${T_PAMI * 100}% PAMI (Ley 19.032) y ${T_OS * 100}% obra social, sobre lo remunerativo.`,
    TEXTO_PROXIMA,
  ];
  for (const t of claves) {
    const c = ws.getCell(r, 2);
    c.value = `•  ${t}`;
    c.alignment = { wrapText: true, vertical: "top", indent: 1 };
    ws.getRow(r).height = t.length > 190 ? 46 : 32;
    r++;
  }
  r++;
  nota(
    ws,
    `A${r}:B${r}`,
    "Es una referencia de cálculo con las fuentes a la vista, no un recibo oficial. No incluye contribuciones patronales, ART, cuota sindical ni aportes solidarios del convenio, Ganancias ni embargos. Los adicionales por rama (combustibles, sustancias peligrosas, larga distancia y otros) se cargan en «Otros adicionales».",
  );
  ws.getRow(r).height = 40;
  r += 2;
  nota(
    ws,
    `A${r}:B${r}`,
    "Con kilómetros y viáticos en cero, esta planilla da exactamente los mismos números que la calculadora gratis de calcular.ar/convenios/camioneros: misma escala, misma cuenta. Si alguna vez difieren, escribinos y lo corregimos.",
  );
  ws.getRow(r).height = 30;
}

// ─── Escala 2026 ─────────────────────────────────────────────────────────────

function buildEscala(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(ESC, { properties: { tabColor: { argb: "FF1565C0" } } });
  ws.columns = [{ width: 32 }, ...MESES_CAMIONEROS.map(() => ({ width: 16 }))];
  titulo(ws, `A1:${L_MES_FIN}1`, "Básicos mensuales oficiales — CCT 40/89 (planillas firmadas FADEEAC)", "FF1565C0");

  ["Categoría", ...MESES_CAMIONEROS.map((m) => m.etiqueta)].forEach((h, i) => {
    const c = ws.getCell(FILA_ESC_HEADER, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno("FF1976D2");
    c.border = BORDE;
    c.alignment = { horizontal: "center" };
  });
  CATEGORIAS_CAMIONEROS.forEach((cat, i) => {
    const r = FILA_ESC_INI + i;
    const fill = i % 2 === 0 ? S.white : S.cebra;
    const cc = ws.getCell(r, 1);
    cc.value = cat.nombre;
    cc.fill = fill;
    cc.border = BORDE;
    MESES_CAMIONEROS.forEach((mes, j) => {
      const c = ws.getCell(r, 2 + j);
      c.value = ESCALAS_POR_MES[mes.id][cat.id];
      c.numFmt = ARS_FMT_DEC;
      c.fill = fill;
      c.border = BORDE;
    });
  });

  let r = FILA_ESC_FIN + 2;
  for (const mes of MESES_CAMIONEROS) {
    nota(ws, `A${r}:${L_MES_FIN}${r}`, `${mes.etiqueta}: ${mes.cambios}`);
    ws.getRow(r).height = 28;
    r++;
  }
  r++;
  nota(ws, `A${r}:${L_MES_FIN}${r}`, TEXTO_PROXIMA);
  ws.getRow(r).height = 30;
  r++;
  nota(ws, `A${r}:${L_MES_FIN}${r}`, "El Liquidador y la Nómina buscan el básico por el nombre de la categoría y del mes: no los edites.");
  ws.views = [{ state: "frozen", xSplit: 1, ySplit: FILA_ESC_HEADER }];
}

// ─── Liquidador ──────────────────────────────────────────────────────────────

function buildLiquidador(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS_CAMIONEROS.liquidador, { properties: { tabColor: { argb: "FF1B5E20" } } });
  ws.columns = [{ width: 46 }, { width: 22 }, { width: 46 }, { width: 14 }];
  titulo(ws, "A1:C1", "Liquidación de sueldo — Camioneros (CCT 40/89)", "FF1B5E20");

  ws.mergeCells("A2:C2");
  const sub = ws.getCell("A2");
  sub.value = `Básicos de las planillas firmadas FADEEAC · verificados el ${fechaDMA(CAMIONEROS_FUENTES.verificacion.consultadoEl)} · calcular.ar`;
  sub.font = { italic: true, size: 10, color: { argb: "FF555555" } };
  sub.fill = S.label;
  sub.alignment = { horizontal: "center" };

  const C = CELDAS_CAMIONEROS;
  const V = ENTRADAS_VIAJE;
  const VV = VALORES_VIATICOS;

  bandaSeccion(ws, "A4:B4", "DATOS DEL TRABAJADOR");
  celdaEtiqueta(ws, "A5", "Categoría");
  celdaInput(ws, C.categoria, CATEGORIAS_CAMIONEROS[0].nombre).dataValidation = desplegable(
    CATEGORIAS_CAMIONEROS.map((c) => c.nombre),
    "Elegí una categoría de la lista.",
  );
  celdaEtiqueta(ws, "A6", "Mes a liquidar");
  celdaInput(ws, C.mes, ULTIMO_MES.etiqueta).dataValidation = desplegable(
    MESES_CAMIONEROS.map((m) => m.etiqueta),
    "Elegí un mes de la lista.",
  );
  celdaEtiqueta(ws, "A7", "Años de antigüedad");
  numeroInput(ws, C.antiguedad, 0, "0", rangoNum(0, 60, true, "Años enteros, de 0 a 60."));
  referencia(ws, "C7", "Ítem 6.1.5: 1% por año sobre lo remunerativo");
  celdaEtiqueta(ws, "A8", "Zona de residencia");
  celdaInput(ws, C.zona, ZONAS_CAMIONEROS[0].nombre).dataValidation = desplegable(
    ZONAS_CAMIONEROS.map((z) => z.nombre),
    "Elegí una zona de la lista.",
  );
  referencia(ws, "C8", "Coeficiente 1,20 / 1,40 sobre viáticos y 4.2.3");

  ws.getRow(9).height = 6;
  bandaSeccion(ws, "A10:B10", "VIAJES Y ADICIONALES DEL MES (en cero si no viajó)");
  const entradas: [string, string, string, ExcelJS.DataValidation, string][] = [
    [V.kmHorasExtra, "Km recorridos — horas extra por km", "Ítem 4.2.3 · remunerativo", rangoNum(0, 100000, false, "Kilómetros del mes, de 0 a 100.000."), "#,##0"],
    [V.kmViatico, "Km recorridos — viático por km", `Ítem 4.2.4 · no remunerativo · mínimo ${VIATICOS_CAMIONEROS.kmMinimoPorDia} km por día de viaje`, rangoNum(0, 100000, false, "Kilómetros del mes, de 0 a 100.000."), "#,##0"],
    [V.comidas, "Comidas", "Ítem 4.1.12 · no remunerativo", rangoNum(0, 100, true, "Cantidad de comidas del mes, de 0 a 100."), "0"],
    [V.viaticosEspeciales, "Viáticos especiales", "Ítem 4.1.13 · no remunerativo", rangoNum(0, 100, true, "Cantidad del mes, de 0 a 100."), "0"],
    [V.pernoctadas, "Pernoctadas", "Ítem 4.1.14 · no remunerativo", rangoNum(0, 31, true, "Noches del mes, de 0 a 31."), "0"],
    [V.otrosRemunerativos, "Otros adicionales remunerativos ($)", "Adicionales por rama, horas extra, etc.", rangoNum(0, 1e9, false, "Importe en pesos, 0 o más."), ARS_FMT_DEC],
    [V.otrosNoRemunerativos, "Otros no remunerativos ($)", "Permanencia (4.2.5), cruce de frontera (4.2.17), etc.", rangoNum(0, 1e9, false, "Importe en pesos, 0 o más."), ARS_FMT_DEC],
  ];
  for (const [ref, etiqueta, ayuda, validacion, formato] of entradas) {
    const fila = ref.slice(1);
    celdaEtiqueta(ws, `A${fila}`, etiqueta);
    numeroInput(ws, ref, 0, formato, validacion);
    referencia(ws, `C${fila}`, ayuda);
  }

  // D: auxiliares ocultos.
  ws.getCell("D5").value = { formula: `MATCH(${C.mes},${RANGO_MESES},0)` };
  ws.getCell("D6").value = { formula: `INDEX(${RANGO_ESCALA},MATCH(${C.categoria},${RANGO_CATS},0),D5)` };
  ws.getCell("D7").value = { formula: coefZona(C.zona) };
  ws.getColumn("D").hidden = true;

  bandaSeccion(ws, "A18:B18", "LIQUIDACIÓN DEL MES");
  const L = LIQ;
  celdaResultado(ws, 19, "Sueldo básico", "D6", { formato: ARS_FMT_DEC });
  celdaResultado(ws, 20, "Horas extra por km (4.2.3)", `${V.kmHorasExtra}*${VV.porKm}*D7`, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 21, "Otros adicionales remunerativos", V.otrosRemunerativos, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 22, "Antigüedad", `(${L.basico}+${L.horasExtraKm}+${L.otrosRem})*${TASA_ANTIG}*${C.antiguedad}`, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 23, "TOTAL REMUNERATIVO (bruto)", `${L.basico}+${L.horasExtraKm}+${L.otrosRem}+${L.antiguedad}`, { total: true, formato: ARS_FMT_DEC });
  celdaResultado(ws, 24, `Jubilación (${T_JUB * 100}%)`, `-${C.bruto}*${T_JUB}`, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 25, `PAMI — Ley 19.032 (${T_PAMI * 100}%)`, `-${C.bruto}*${T_PAMI}`, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 26, `Obra social (${T_OS * 100}%)`, `-${C.bruto}*${T_OS}`, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 27, "NETO DE HABERES", `${C.bruto}+${L.jubilacion}+${L.pami}+${L.obraSocial}`, { total: true, formato: ARS_FMT_DEC });
  celdaResultado(
    ws,
    28,
    "Viáticos no remunerativos",
    `(${V.kmViatico}*${VV.porKm}+${V.comidas}*${VV.comida}+${V.viaticosEspeciales}*${VV.viaticoEspecial}+${V.pernoctadas}*${VV.pernoctada})*D7+${V.otrosNoRemunerativos}`,
    { formato: ARS_FMT_DEC },
  );
  celdaResultado(ws, 29, "TOTAL A COBRAR", `${C.neto}+${L.noRemunerativo}`, { total: true, formato: ARS_FMT_DEC });
  referencia(ws, "C23", "Base de aportes y del aguinaldo");
  referencia(ws, "C28", "No llevan aportes (ítem 4.2.11 y art. 106 LCT)");

  ws.getRow(30).height = 6;
  bandaSeccion(ws, "A31:B31", `VALORES DE VIÁTICOS (planilla ${VIATICOS_CAMIONEROS.etiquetaMes.toLowerCase()})`);
  const valores: [string, string, number, string][] = [
    [VV.porKm, "Valor por km (4.2.3 y 4.2.4)", VIATICOS_CAMIONEROS.porKm, '"$"#,##0.00000'],
    [VV.comida, "Comida (4.1.12)", VIATICOS_CAMIONEROS.comida, ARS_FMT_DEC],
    [VV.viaticoEspecial, "Viático especial (4.1.13)", VIATICOS_CAMIONEROS.viaticoEspecial, ARS_FMT_DEC],
    [VV.pernoctada, "Pernoctada (4.1.14)", VIATICOS_CAMIONEROS.pernoctada, ARS_FMT_DEC],
  ];
  for (const [ref, etiqueta, valor, formato] of valores) {
    celdaEtiqueta(ws, `A${ref.slice(1)}`, etiqueta);
    numeroInput(ws, ref, valor, formato, rangoNum(0, 1e7, false, "Importe en pesos, 0 o más."));
  }
  const aviso = ws.getCell("C32");
  aviso.value = {
    formula: `IF(${C.mes}="${VIATICOS_CAMIONEROS.etiquetaMes}","Valores de la planilla firmada de ${VIATICOS_CAMIONEROS.etiquetaMes.toLowerCase()}","Ojo: son los valores de ${VIATICOS_CAMIONEROS.etiquetaMes.toLowerCase()}. Reemplazalos por los de la planilla de "&${C.mes})`,
  };
  aviso.font = { size: 9, bold: true, color: { argb: "FFB45309" } };
  aviso.alignment = { wrapText: true, vertical: "middle" };
  ws.mergeCells("C32:C35");

  nota(ws, "A37:C37", "* El sueldo del convenio es un piso: si pagan más, cargá la diferencia en «Otros adicionales remunerativos».");
  nota(ws, "A38:C38", "* El neto no descuenta cuota sindical, aportes solidarios, Ganancias ni embargos. No incluye contribuciones patronales ni ART.");
  nota(ws, "A39:C39", "* Las celdas amarillas se completan; las verdes las calcula la planilla. La columna D está oculta a propósito: no la borres.");
  ws.views = [{ state: "frozen", ySplit: 3 }];
}

// ─── Nómina ──────────────────────────────────────────────────────────────────

function buildNomina(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS_CAMIONEROS.nomina, {
    properties: { tabColor: { argb: "FF2E7D32" } },
    pageSetup: { paperSize: 9, orientation: "landscape", fitToPage: true, fitToWidth: 1, fitToHeight: 0 },
  });
  const K = NOMINA.columnas;
  const encabezados: [string, string, number][] = [
    [K.nombre, "Trabajador", 24],
    [K.categoria, "Categoría", 26],
    [K.antiguedad, "Años", 7],
    [K.zona, "Zona", 20],
    [K.kmHorasExtra, "Km 4.2.3", 10],
    [K.kmViatico, "Km 4.2.4", 10],
    [K.comidas, "Comidas", 9],
    [K.viaticosEspeciales, "Viát. esp.", 9],
    [K.pernoctadas, "Pernoct.", 9],
    [K.otrosRem, "Otros rem. $", 13],
    [K.otrosNoRem, "Otros no rem. $", 13],
    [K.basico, "Básico", 14],
    [K.horasExtraKm, "Horas extra km", 14],
    [K.antiguedadMonto, "Antigüedad", 13],
    [K.totalRem, "Total remunerativo", 16],
    [K.aportes, "Aportes 17%", 14],
    [K.neto, "Neto de haberes", 15],
    [K.noRem, "No remunerativo", 15],
    [K.aCobrar, "A cobrar", 15],
    [K.coef, "coef", 6],
  ];
  ws.columns = encabezados.map(([, , w]) => ({ width: w }));
  titulo(ws, `A1:${K.aCobrar}1`, "Nómina del mes — toda la flota en una hoja", "FF2E7D32");

  celdaEtiqueta(ws, "A2", "Mes liquidado");
  const mes = ws.getCell("B2");
  mes.value = { formula: `${LQ}${CELDAS_CAMIONEROS.mes}` };
  mes.fill = S.output;
  mes.border = BORDE;
  mes.font = { bold: true };
  nota(ws, `C2:${K.aCobrar}2`, "El mes y los valores de viáticos salen del Liquidador. Un trabajador por fila; las filas sin categoría no suman.");
  nota(ws, `A3:${K.aCobrar}3`, "Amarillo: lo cargás vos. Verde: lo calcula la planilla. Con km y viáticos en cero, cada fila da lo mismo que la calculadora gratis.");

  const H = NOMINA.primeraFila - 1;
  encabezados.forEach(([col, texto]) => {
    const c = ws.getCell(`${col}${H}`);
    c.value = texto;
    c.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 10 };
    c.fill = relleno(col <= K.otrosNoRem ? "FF8D6E00" : "FF1B5E20");
    c.border = BORDE;
    c.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  });
  ws.getRow(H).height = 30;

  const ini = NOMINA.primeraFila;
  const fin = ini + NOMINA.filas - 1;
  const vCat = desplegable(CATEGORIAS_CAMIONEROS.map((c) => c.nombre), "Elegí una categoría de la lista.");
  const vZona = desplegable(ZONAS_CAMIONEROS.map((z) => z.nombre), "Elegí una zona de la lista.");
  const VV = VALORES_VIATICOS;
  const val = (ref: string) => `${LQ}$${ref[0]}$${ref.slice(1)}`;
  for (let r = ini; r <= fin; r++) {
    const vacio = (f: string) => `IF(${K.categoria}${r}="","",${f})`;
    const input = (col: string, valor: string | number | null, formato?: string, v?: ExcelJS.DataValidation) => {
      const c = ws.getCell(`${col}${r}`);
      c.value = valor;
      c.fill = S.input;
      c.border = BORDE;
      if (formato) c.numFmt = formato;
      if (v) c.dataValidation = v;
    };
    input(K.nombre, r === ini ? "Trabajador 1" : null);
    input(K.categoria, r === ini ? CATEGORIAS_CAMIONEROS[0].nombre : null, undefined, vCat);
    input(K.antiguedad, r === ini ? 0 : null, "0", rangoNum(0, 60, true, "Años enteros, de 0 a 60."));
    input(K.zona, r === ini ? ZONAS_CAMIONEROS[0].nombre : null, undefined, vZona);
    for (const col of [K.kmHorasExtra, K.kmViatico]) input(col, null, "#,##0", rangoNum(0, 100000, false, "Kilómetros del mes, de 0 a 100.000."));
    for (const col of [K.comidas, K.viaticosEspeciales, K.pernoctadas]) input(col, null, "0", rangoNum(0, 100, true, "Cantidad del mes, de 0 a 100."));
    for (const col of [K.otrosRem, K.otrosNoRem]) input(col, null, ARS_FMT, rangoNum(0, 1e9, false, "Importe en pesos, 0 o más."));

    const formulas: [string, string][] = [
      [K.coef, coefZona(`${K.zona}${r}`)],
      [K.basico, vacio(`INDEX(${RANGO_ESCALA},MATCH(${K.categoria}${r},${RANGO_CATS},0),${LQ}$D$5)`)],
      [K.horasExtraKm, vacio(`${K.kmHorasExtra}${r}*${val(VV.porKm)}*${K.coef}${r}`)],
      [K.antiguedadMonto, vacio(`(${K.basico}${r}+${K.horasExtraKm}${r}+${K.otrosRem}${r})*${TASA_ANTIG}*${K.antiguedad}${r}`)],
      [K.totalRem, vacio(`${K.basico}${r}+${K.horasExtraKm}${r}+${K.otrosRem}${r}+${K.antiguedadMonto}${r}`)],
      [K.aportes, vacio(`${K.totalRem}${r}*(${T_JUB}+${T_PAMI}+${T_OS})`)],
      [K.neto, vacio(`${K.totalRem}${r}-${K.aportes}${r}`)],
      [
        K.noRem,
        vacio(
          `(${K.kmViatico}${r}*${val(VV.porKm)}+${K.comidas}${r}*${val(VV.comida)}+${K.viaticosEspeciales}${r}*${val(VV.viaticoEspecial)}+${K.pernoctadas}${r}*${val(VV.pernoctada)})*${K.coef}${r}+${K.otrosNoRem}${r}`,
        ),
      ],
      [K.aCobrar, vacio(`${K.neto}${r}+${K.noRem}${r}`)],
    ];
    for (const [col, f] of formulas) {
      const c = ws.getCell(`${col}${r}`);
      c.value = { formula: f };
      c.fill = col === K.aCobrar ? S.total : S.output;
      c.border = BORDE;
      c.numFmt = col === K.coef ? "0.00" : ARS_FMT;
    }
  }
  const tot = fin + 1;
  const etq = ws.getCell(`A${tot}`);
  etq.value = "TOTALES DEL MES";
  etq.font = { bold: true };
  etq.fill = S.total;
  etq.border = BORDE;
  for (const col of [K.basico, K.horasExtraKm, K.antiguedadMonto, K.totalRem, K.aportes, K.neto, K.noRem, K.aCobrar]) {
    const c = ws.getCell(`${col}${tot}`);
    c.value = { formula: `SUM(${col}${ini}:${col}${fin})` };
    c.font = { bold: true };
    c.fill = S.total;
    c.border = BORDE;
    c.numFmt = ARS_FMT;
  }
  ws.getColumn(K.coef).hidden = true;
  ws.views = [{ state: "frozen", xSplit: 2, ySplit: H }];
}

// ─── Recibo ──────────────────────────────────────────────────────────────────

function buildRecibo(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS_CAMIONEROS.recibo, {
    properties: { tabColor: { argb: "FF455A64" } },
    pageSetup: { paperSize: 9, orientation: "portrait", fitToPage: true, fitToWidth: 1, fitToHeight: 1 },
  });
  ws.columns = [{ width: 40 }, { width: 12 }, { width: 18 }, { width: 18 }, { width: 18 }];
  titulo(ws, "A1:E1", "Recibo de haberes — CCT 40/89 Camioneros", "FF455A64");
  nota(ws, "A2:E2", "Se completa solo con el Liquidador. Los datos de la empresa y del trabajador se escriben una vez acá: no salen de tu computadora.");

  const C = CELDAS_CAMIONEROS;
  const V = ENTRADAS_VIAJE;
  const L = LIQ;
  const cabecera: [string, string | null][] = [
    ["Empleador (razón social)", null],
    ["CUIT del empleador", null],
    ["Trabajador (apellido y nombre)", null],
    ["CUIL del trabajador", null],
    ["Fecha de ingreso", null],
    ["Período", `${LQ}${C.mes}`],
    ["Categoría", `${LQ}${C.categoria}`],
    ["Años de antigüedad", `${LQ}${C.antiguedad}`],
  ];
  cabecera.forEach(([etq, f], i) => {
    const r = 4 + i;
    celdaEtiqueta(ws, `A${r}`, etq);
    ws.mergeCells(`B${r}:E${r}`);
    if (f) {
      const c = ws.getCell(`B${r}`);
      c.value = { formula: f };
      c.fill = S.output;
      c.border = BORDE;
      c.alignment = { horizontal: "left", indent: 1 };
    } else {
      celdaInput(ws, `B${r}`, "");
    }
  });

  const H = 13;
  ["Concepto", "Cantidad", "Haberes rem.", "No remunerativo", "Descuentos"].forEach((h, i) => {
    const c = ws.getCell(H, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno("FF455A64");
    c.border = BORDE;
    c.alignment = { horizontal: i === 0 ? "left" : "center" };
  });
  const filas: [string, string | null, "C" | "D" | "E", string][] = [
    ["Sueldo básico", null, "C", `${LQ}${L.basico}`],
    ["Horas extra por km (4.2.3)", `${LQ}${V.kmHorasExtra}`, "C", `${LQ}${L.horasExtraKm}`],
    ["Otros adicionales remunerativos", null, "C", `${LQ}${L.otrosRem}`],
    ["Antigüedad (6.1.5)", `${LQ}${C.antiguedad}`, "C", `${LQ}${L.antiguedad}`],
    ["Viáticos, comidas y pernoctadas (no rem.)", null, "D", `${LQ}${L.noRemunerativo}`],
    [`Jubilación ${T_JUB * 100}%`, null, "E", `-${LQ}${L.jubilacion}`],
    [`PAMI Ley 19.032 ${T_PAMI * 100}%`, null, "E", `-${LQ}${L.pami}`],
    [`Obra social ${T_OS * 100}%`, null, "E", `-${LQ}${L.obraSocial}`],
  ];
  filas.forEach(([etq, cant, col, f], i) => {
    const r = H + 1 + i;
    const a = ws.getCell(`A${r}`);
    a.value = etq;
    a.border = BORDE;
    const b = ws.getCell(`B${r}`);
    if (cant) {
      b.value = { formula: cant };
      b.numFmt = "#,##0";
    }
    b.border = BORDE;
    b.alignment = { horizontal: "center" };
    for (const k of ["C", "D", "E"]) {
      const c = ws.getCell(`${k}${r}`);
      c.border = BORDE;
      c.numFmt = ARS_FMT_DEC;
      if (k === col) c.value = { formula: f };
    }
  });
  const rt = H + filas.length + 1;
  const ini = H + 1;
  const fin = rt - 1;
  const at = ws.getCell(`A${rt}`);
  at.value = "Totales";
  at.font = { bold: true };
  at.fill = S.total;
  at.border = BORDE;
  ws.getCell(`B${rt}`).fill = S.total;
  ws.getCell(`B${rt}`).border = BORDE;
  for (const k of ["C", "D", "E"]) {
    const c = ws.getCell(`${k}${rt}`);
    c.value = { formula: `SUM(${k}${ini}:${k}${fin})` };
    c.numFmt = ARS_FMT_DEC;
    c.font = { bold: true };
    c.fill = S.total;
    c.border = BORDE;
  }
  const rn = rt + 1;
  ws.mergeCells(`A${rn}:D${rn}`);
  const neto = ws.getCell(`A${rn}`);
  neto.value = "NETO A COBRAR";
  neto.font = { bold: true, size: 12 };
  neto.fill = S.total;
  neto.border = BORDE;
  neto.alignment = { horizontal: "right", indent: 1 };
  const vn = ws.getCell(`E${rn}`);
  vn.value = { formula: `C${rt}+D${rt}-E${rt}` };
  vn.numFmt = ARS_FMT_DEC;
  vn.font = { bold: true, size: 12 };
  vn.fill = S.total;
  vn.border = BORDE;
  ws.getRow(rn).height = 22;

  celdaEtiqueta(ws, `A${rn + 2}`, "Lugar y fecha de pago");
  ws.mergeCells(`B${rn + 2}:E${rn + 2}`);
  celdaInput(ws, `B${rn + 2}`, "");
  nota(ws, `A${rn + 3}:E${rn + 3}`, "Los aportes del trabajador se depositaron en el período anterior. Recibí el importe neto de este recibo y un duplicado firmado.");
  const rf = rn + 7;
  ws.getCell(`A${rf}`).value = "Firma del trabajador";
  ws.mergeCells(`C${rf}:E${rf}`);
  ws.getCell(`C${rf}`).value = "Firma y sello del empleador";
  for (const ref of [`A${rf}`, `C${rf}`]) {
    ws.getCell(ref).border = { top: { style: "thin", color: { argb: "FF455A64" } } };
    ws.getCell(ref).alignment = { horizontal: "center" };
  }
  ws.pageSetup.printArea = `A1:E${rf}`;
}

// ─── SAC ─────────────────────────────────────────────────────────────────────

export const SEMESTRES_PLANILLA = SEMESTRES_2026.map((s) => ({
  id: s.id,
  etiqueta: s.etiqueta,
  dias: diasInclusivos(s.inicioISO, s.finISO),
  fechaPago: s.fechaPago,
  meses: s.id === "primero" ? ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"] : ["Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
}));

function buildSac(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS_CAMIONEROS.sac, { properties: { tabColor: { argb: "FF6A1B9A" } } });
  ws.columns = [{ width: 50 }, { width: 22 }, { width: 44 }];
  titulo(ws, "A1:C1", "Aguinaldo (SAC) — Ley 23.041 y arts. 121 a 123 LCT", "FF6A1B9A");

  const [p, s] = SEMESTRES_PLANILLA;
  bandaSeccion(ws, "A3:B3", "DATOS DEL SEMESTRE");
  celdaEtiqueta(ws, "A4", "Semestre");
  celdaInput(ws, SAC.semestre, s.etiqueta).dataValidation = desplegable([p.etiqueta, s.etiqueta], "Elegí el semestre.");
  for (let i = 0; i < 6; i++) {
    const r = SAC.primerMes + i;
    const etq = ws.getCell(`A${r}`);
    etq.value = { formula: `IF(${SAC.semestre}="${p.etiqueta}","${p.meses[i]}","${s.meses[i]}")&" — total remunerativo"` };
    etq.fill = S.label;
    etq.border = BORDE;
    etq.alignment = { horizontal: "left", indent: 1 };
    const c = ws.getCell(`B${r}`);
    c.value = { formula: `${LQ}${CELDAS_CAMIONEROS.bruto}` };
    c.fill = S.input;
    c.border = BORDE;
    c.font = { bold: true };
    c.numFmt = ARS_FMT_DEC;
    c.dataValidation = rangoNum(0, 1e10, false, "Importe en pesos, 0 o más.");
  }
  referencia(ws, "C5", "Vienen con el bruto del Liquidador: escribí encima lo que pagaste cada mes");
  ws.mergeCells("C5:C7");
  celdaEtiqueta(ws, "A11", "Días trabajados en el semestre");
  const dias = celdaInput(ws, SAC.diasTrabajados, "");
  dias.numFmt = "0";
  dias.alignment = { horizontal: "right" };
  dias.dataValidation = rangoNum(0, 184, true, "Días, de 0 a 184.");
  referencia(ws, "C11", "Dejala vacía si trabajó el semestre completo");

  bandaSeccion(ws, "A13:B13", "AGUINALDO");
  celdaResultado(ws, 14, "Mejor remuneración del semestre", `MAX(B${SAC.primerMes}:B${SAC.primerMes + 5})`, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 15, "Días del semestre", `IF(${SAC.semestre}="${p.etiqueta}",${p.dias},${s.dias})`, { formato: "0" });
  celdaResultado(ws, 16, "Días computados", `IF(ISBLANK(${SAC.diasTrabajados}),B15,MIN(${SAC.diasTrabajados},B15))`, { formato: "0" });
  celdaResultado(ws, 17, "SAC bruto", "B14/2*B16/B15", { total: true, formato: ARS_FMT_DEC });
  celdaResultado(ws, 18, `Jubilación (${T_JUB * 100}%)`, `-B17*${T_JUB}`, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 19, `PAMI (${T_PAMI * 100}%)`, `-B17*${T_PAMI}`, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 20, `Obra social (${T_OS * 100}%)`, `-B17*${T_OS}`, { formato: ARS_FMT_DEC });
  celdaResultado(ws, 21, "SAC NETO ESTIMADO", "SUM(B17:B20)", { total: true, formato: ARS_FMT_DEC });

  nota(ws, "A23:C23", "* El aguinaldo es el 50% de la MEJOR remuneración mensual del semestre, no el promedio. Si trabajó una parte, es proporcional a los días.");
  nota(ws, "A24:C24", `* Vencimientos: ${p.fechaPago} y ${s.fechaPago} (art. 122 LCT). Los viáticos no remunerativos (4.1.12, 4.1.13, 4.1.14, 4.2.4) no entran en la base.`);
  ws.getRow(23).height = 28;
  ws.getRow(24).height = 28;
}

// ─── Main ────────────────────────────────────────────────────────────────────

export async function generarPlanillaCamioneros(): Promise<string> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "CalculAR (calcular.ar)";
  wb.title = "Planilla de sueldos Camioneros 2026 — CCT 40/89";
  wb.subject = "Liquidación de sueldos del transporte de cargas con las planillas firmadas de FADEEAC";
  wb.keywords = "camioneros, cct 40/89, fadeeac, sueldo, viáticos, kilómetros, planilla, liquidación";

  // Las fórmulas cruzan hojas: el orden de creación es el de las pestañas, no el de dependencias.
  buildInstrucciones(wb);
  buildLiquidador(wb);
  buildNomina(wb);
  buildRecibo(wb);
  buildSac(wb);
  buildEscala(wb);
  hojaFuentes(
    wb,
    [
      ...MESES_CAMIONEROS.map((m) => ({ nombre: `FADEEAC — planilla salarial firmada de ${m.etiqueta.toLowerCase()} (CCT 40/89)`, url: m.planillaOficial })),
      { nombre: `Viáticos y adicionales (hoja 2 de la planilla de ${VIATICOS_CAMIONEROS.etiquetaMes.toLowerCase()}) — verificado el ${fechaDMA(VIATICOS_CAMIONEROS.consultadoEl)}`, url: VIATICOS_CAMIONEROS.planilla },
      CAMIONEROS_FUENTES.acuerdo,
      CAMIONEROS_FUENTES.homologacion,
      CAMIONEROS_FUENTES.revision,
      AGUINALDO_FUENTES.ley23041,
      AGUINALDO_FUENTES.lct,
    ],
    fechaDMA(CAMIONEROS_FUENTES.verificacion.consultadoEl),
    [CAMIONEROS_HOMOLOGACION],
    "Planilla de calcular.ar. Las actualizaciones del año están incluidas en el precio: cuando FADEEAC publica la planilla firmada de un mes nuevo, la cargamos y el mismo enlace de descarga te baja la versión al día.",
  );

  const dir = path.join(process.cwd(), "private");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const salida = path.join(dir, ARCHIVO_CAMIONEROS);
  await wb.xlsx.writeFile(salida);
  return salida;
}

if (process.argv[1] && /gen_planilla_camioneros\.ts$/.test(process.argv[1])) {
  generarPlanillaCamioneros()
    .then((salida) => {
      console.log(`Planilla Camioneros generada: ${salida}`);
      console.log(`   Hojas: ${Object.values(HOJAS_CAMIONEROS).join(" | ")}`);
      console.log(`   ${MESES_CAMIONEROS.length} meses × ${CATEGORIAS_CAMIONEROS.length} categorías · nómina de ${NOMINA.filas} filas`);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
