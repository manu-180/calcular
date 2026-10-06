/**
 * Genera private/planilla-mi-sueldo-2026.xlsx — la planilla paga de la calculadora de sueldo neto
 * (/sueldo-neto): control de cada recibo contra los descuentos de ley, sueldo real contra el IPC
 * oficial, resumen imprimible para pedir aumento, aguinaldo proyectado y aviso de Ganancias.
 *
 * INVARIANTES:
 *   - Los aportes, el tope de la base imponible y las deducciones de Ganancias salen de src/data
 *     (los mismos que usa la calculadora) y quedan a la vista en «Mis datos». El tope rota cada mes
 *     y este script corre en el prebuild: cada deploy deja el entregable con el tope vigente.
 *   - La serie del IPC sale de src/data/ipc-serie.ts, la que regenera el workflow datos-vivos.
 *   - scripts/check_planilla_mi_sueldo.ts evalúa este archivo con HyperFormula contra brutoANeto,
 *     sueldoVsInflacion, calcularAguinaldo y estimarGananciasAnual.
 *
 * Fórmulas: sólo funciones de Excel 2007 que existen en Google Sheets y en HyperFormula. Nada de
 * TEXT/FIXED (dependen del idioma del Excel): los montos y porcentajes dentro de textos se arman a
 * mano (`miles`, `pctTexto`). Los meses son número absoluto (año × 12 + mes − 1), no fechas de Excel.
 *
 * Uso: npx -y tsx scripts/gen_planilla_mi_sueldo.ts
 */

import ExcelJS from "exceljs";
import path from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import { IPC_SERIE, IPC_DESCARGADO_EL } from "../src/data/ipc-serie";
import { INFLACION_FUENTES, IPC_DIA_PUBLICACION } from "../src/data/inflacion";
import { APORTES, SUELDO_FUENTES, TOPE_SIPA } from "../src/data/sueldo";
import { DEDUCCIONES, GANANCIAS_FUENTES, GANANCIAS_VIGENCIA } from "../src/data/ganancias";
import { AGUINALDO_FUENTES } from "../src/data/aguinaldo";
import { DECRETO_407 } from "../src/data/recibo-sueldo";
import { MESES_LARGOS, nombrePeriodo, sumarMeses, ULTIMO_PERIODO } from "../src/lib/inflacion";
import { ESTADOS_RECIBO, PLANILLA_MS } from "../src/lib/prefill/mi-sueldo";
import { CERCA_DEL_PISO, EJEMPLO_MS } from "../src/components/mi-sueldo/modelo";
import {
  ARS_FMT,
  ARS_FMT_DEC,
  BORDE,
  S,
  bandaSeccion,
  celdaEtiqueta,
  celdaInput,
  desplegable,
  hojaFuentes,
  nota,
  relleno,
  titulo,
} from "./gen_planilla_estilos";

const H = PLANILLA_MS.hojas;
const D = PLANILLA_MS.datos;
const R = PLANILLA_MS.recibo;
const F = PLANILLA_MS.resumen;
const O = PLANILLA_MS.opciones;
const N_MESES = PLANILLA_MS.meses;
const F0 = PLANILLA_MS.fila0;
const FN = F0 + N_MESES - 1;
const TOL = PLANILLA_MS.tolerancia;

const VERDE = "FF1B5E20";
const AZUL = "FF1565C0";
const PIZARRA = "FF37474F";
const PCT_FMT = "0.0%";

const q = (hoja: string) => `'${hoja}'`;
const QD = q(H.datos);
const QR = q(H.recibos);
const QI = q(H.inflacion);
const QA = q(H.aguinaldo);

// ─── IPC: de dic-2016 (base) a dic-2032. Lo publicado va fijo; los meses futuros son fórmulas que
// se completan si la persona carga el % del mes (columna F).
const PRIMER_PERIODO = IPC_SERIE[0][0];
if (PRIMER_PERIODO !== "2016-12") throw new Error(`La serie del IPC arranca en ${PRIMER_PERIODO}, se esperaba 2016-12`);
const M_BASE = 2016 * 12 + 11;
const IPC_F0 = 5;
const PERIODOS: string[] = [];
for (let p = PRIMER_PERIODO; p <= "2032-12"; p = sumarMeses(p, 1)) PERIODOS.push(p);
const IPC_FIN = IPC_F0 + PERIODOS.length - 1;

const R_MESES = `${H.ipc}!$J$5:$J$16`;
const R_MBASE = `${H.ipc}!$J$2`;
const R_ULT = `${H.ipc}!$J$3`;
const R_INDICES = `${H.ipc}!$D$${IPC_F0}:$D$${IPC_FIN}`;

/** «septiembre de 2026» de un mes absoluto. */
const T = (m: string) => `INDEX(${R_MESES},MOD(${m},12)+1)&" de "&INT((${m})/12)`;
const IDX = (m: string) => `INDEX(${R_INDICES},(${m})-${R_MBASE}+1)`;

/** Entero no negativo con punto de miles («1.234.567»). `ref` tiene que tener el número ya redondeado. */
function miles(ref: string): string {
  const g = (div: number) => `RIGHT("00"&INT(MOD(${ref},${div * 1000})/${div}),3)`;
  return (
    `IF(${ref}>=1000000000,INT(${ref}/1000000000)&"."&${g(1000000)}&"."&${g(1000)}&"."&${g(1)},` +
    `IF(${ref}>=1000000,INT(${ref}/1000000)&"."&${g(1000)}&"."&${g(1)},` +
    `IF(${ref}>=1000,INT(${ref}/1000)&"."&${g(1)},""&${ref})))`
  );
}

/** «12,3%» a partir de una celda con el porcentaje en milésimas enteras (ROUND(x*1000,0)). */
const pctTexto = (ref: string) => `IF(${ref}<0,"-","")&INT(ABS(${ref})/10)&","&MOD(ABS(${ref}),10)&"%"`;

// Celdas de «Mis datos» que leen las demás hojas.
const LEY = { jub: "B21", pami: "B22", os: "B23", tope: "B24", mni: "B25", especial: "B26", conyuge: "B27", hijo: "B28" };
const AUX_D = { mesIdx: "H4", inicio: "H5", sind: "H6", deducciones: "H7", piso: "H8" };
const abs = (ref: string) => ref.replace(/^([A-Z]+)(\d+)$/, "$$$1$$$2");
const DREF = (ref: string) => `${QD}!${abs(ref)}`;

function desbloquear(c: ExcelJS.Cell): void {
  c.protection = { locked: false };
}

function input(ws: ExcelJS.Worksheet, ref: string, valor: string | number | null, v?: ExcelJS.DataValidation, fmt?: string) {
  const c = celdaInput(ws, ref, valor ?? "");
  if (valor === null) c.value = null;
  if (v) c.dataValidation = v;
  if (fmt) {
    c.numFmt = fmt;
    c.alignment = { horizontal: "right" };
  }
  desbloquear(c);
  return c;
}

function salida(ws: ExcelJS.Worksheet, ref: string, formula: string, opts: { fmt?: string; total?: boolean; wrap?: boolean; centro?: boolean } = {}) {
  const c = ws.getCell(ref);
  c.value = { formula };
  c.fill = opts.total ? S.total : S.output;
  c.border = BORDE;
  if (opts.fmt) c.numFmt = opts.fmt;
  c.font = opts.total ? { bold: true } : {};
  c.alignment = opts.wrap
    ? { wrapText: true, vertical: "top", horizontal: "left", indent: 1 }
    : opts.centro
      ? { horizontal: "center", vertical: "middle" }
      : opts.fmt
        ? { horizontal: "right" }
        : { horizontal: "left", indent: 1 };
  return c;
}

function oculta(ws: ExcelJS.Worksheet, ref: string, valor: string | number) {
  const c = ws.getCell(ref);
  c.value = typeof valor === "string" ? { formula: valor } : valor;
  return c;
}

async function proteger(ws: ExcelJS.Worksheet) {
  // Sin contraseña a propósito: protege de pisar una fórmula sin querer. Revisar > Desproteger hoja.
  await ws.protect("", { selectLockedCells: true, selectUnlockedCells: true, formatColumns: true, formatRows: true });
}

function subtitulo(ws: ExcelJS.Worksheet, rango: string, texto: string | { formula: string }, alto = 30) {
  ws.mergeCells(rango);
  const c = ws.getCell(rango.split(":")[0]);
  c.value = texto;
  c.font = { italic: true, size: 10, color: { argb: "FF555555" } };
  c.alignment = { wrapText: true, vertical: "middle", indent: 1 };
  ws.getRow(Number(rango.match(/\d+/)![0])).height = alto;
}

function ayuda(ws: ExcelJS.Worksheet, ref: string, texto: string) {
  const c = ws.getCell(ref);
  c.value = texto;
  c.font = { size: 9, color: { argb: "FF777777" } };
  c.alignment = { vertical: "middle", wrapText: true, indent: 1 };
}

const SI_NO = () => desplegable([O.si, O.no], "Elegí Sí o No.");
const montoValido = (error: string): ExcelJS.DataValidation => ({
  type: "decimal",
  operator: "between",
  allowBlank: true,
  showErrorMessage: true,
  formulae: [0, 10000000000],
  error,
});

// ─── Ejemplo del archivo genérico ───────────────────────────────────────────
// Trece meses con dos aumentos y un recibo con la obra social mal descontada, para que el control
// y el resumen se vean funcionando. El prefill lo borra entero.
export const EJEMPLO = (() => {
  const { inicio, sindicalPct, brutos, mesConError } = EJEMPLO_MS;
  const r2 = (n: number) => Math.round(n * 100) / 100;
  const meses = brutos.map((bruto, i) => {
    const base = Math.min(bruto, TOPE_SIPA.baseMaxima);
    const jub = r2(base * APORTES.jubilacion);
    const pami = r2(base * APORTES.pami);
    // Ese mes trae la obra social calculada sobre el sueldo anterior: el control lo marca.
    const os = i === mesConError ? r2((brutos.slice(0, i).reverse().find((x) => x < bruto) ?? bruto) * APORTES.obraSocial) : r2(base * APORTES.obraSocial);
    const sind = r2(bruto * (sindicalPct / 100));
    return { periodo: sumarMeses(inicio, i), bruto, jub, pami, os, sind, neto: r2(bruto - jub - pami - os - sind) };
  });
  return { inicio, sindicalPct, meses, mesConError };
})();

// ─── Hoja IPC ────────────────────────────────────────────────────────────────

function buildIpc(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(H.ipc, { properties: { tabColor: { argb: AZUL } } });
  ws.columns = [{ width: 24 }, { width: 6 }, { width: 6 }, { width: 18 }, { width: 16 }, { width: 22 }, { width: 18 }, { width: 2 }, { width: 2 }, { width: 14 }];
  titulo(ws, "A1:G1", "IPC Nacional del INDEC — nivel general (base diciembre 2016 = 100)", AZUL);
  subtitulo(
    ws,
    "A2:G2",
    `Serie oficial descargada el ${IPC_DESCARGADO_EL} de la API de series de tiempo del Estado (datos.gob.ar). Último dato: ${nombrePeriodo(ULTIMO_PERIODO)}. Si ya salió un mes que acá no está, cargá su % en la columna amarilla.`,
  );
  ["Período", "", "", "Índice", "Variación del mes", "¿Salió y no está? Cargá el % del mes", "Origen"].forEach((h, i) => {
    const c = ws.getCell(4, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno("FF1976D2");
    c.border = BORDE;
    c.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  });
  ws.mergeCells("A4:C4");
  ws.getRow(4).height = 32;

  const publicados = new Map(IPC_SERIE.map(([p, v]) => [p, v]));
  PERIODOS.forEach((p, i) => {
    const r = IPC_F0 + i;
    const fill = i % 2 === 0 ? S.white : S.cebra;
    ws.mergeCells(`A${r}:C${r}`);
    const pc = ws.getCell(`A${r}`);
    pc.value = nombrePeriodo(p);
    pc.fill = fill;
    pc.border = BORDE;
    const dc = ws.getCell(`D${r}`);
    const ec = ws.getCell(`E${r}`);
    const fc = ws.getCell(`F${r}`);
    const gc = ws.getCell(`G${r}`);
    const valor = publicados.get(p);
    if (valor !== undefined) {
      dc.value = valor;
      ec.value = i === 0 ? null : { formula: `D${r}/D${r - 1}-1` };
      fc.fill = S.label;
      gc.value = "INDEC";
    } else {
      dc.value = { formula: `IF(OR(F${r}="",D${r - 1}=""),"",D${r - 1}*(1+F${r}/100))` };
      ec.value = { formula: `IF(D${r}="","",D${r}/D${r - 1}-1)` };
      fc.fill = S.input;
      fc.dataValidation = {
        type: "decimal",
        operator: "between",
        allowBlank: true,
        showErrorMessage: true,
        formulae: [-50, 100],
        error: "Cargá el % del mes como número: por ejemplo 2,1 para 2,1%.",
      };
      fc.numFmt = "0.0";
      desbloquear(fc);
      gc.value = { formula: `IF(F${r}="","","Cargado por vos")` };
    }
    for (const c of [dc, ec, gc]) c.fill = fill;
    dc.numFmt = "#,##0.0000";
    ec.numFmt = PCT_FMT;
    for (const c of [dc, ec, fc, gc]) c.border = BORDE;
  });

  ws.getCell("J2").value = M_BASE;
  ws.getCell("J3").value = { formula: `J2+COUNT(D${IPC_F0}:D${IPC_FIN})-1` };
  ws.getCell("J4").value = { formula: T("J3") };
  MESES_LARGOS.forEach((m, i) => (ws.getCell(`J${5 + i}`).value = m));
  ws.getColumn("J").hidden = true;
  ws.views = [{ state: "frozen", ySplit: 4 }];
  return ws;
}

// ─── Mis datos ───────────────────────────────────────────────────────────────

function buildDatos(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(H.datos, { properties: { tabColor: { argb: VERDE } } });
  ws.columns = [{ width: 46 }, { width: 26 }, { width: 64 }, { width: 2 }, { width: 2 }, { width: 2 }, { width: 2 }, { width: 16 }];
  titulo(ws, "A1:C1", "Mis datos", VERDE);
  subtitulo(ws, "A2:C2", "Se completan una vez. Tu nombre y tu puesto sólo aparecen en el resumen para pedir aumento: no salen de este archivo.");

  bandaSeccion(ws, "A4:C4", "TUS DATOS");
  const anio0 = Number(EJEMPLO.inicio.slice(0, 4));
  const mes0 = Number(EJEMPLO.inicio.slice(5, 7));
  const filas: [string, string, string | number | null, ExcelJS.DataValidation | undefined, string | undefined, string][] = [
    [D.nombre, "Tu nombre", null, undefined, undefined, "Opcional. Sale en el encabezado del resumen imprimible."],
    [D.puesto, "Puesto o categoría", null, undefined, undefined, "Opcional. Por ejemplo: Vendedor B, Administrativa, Analista Sr."],
    [D.mes, "Mes del primer recibo que cargás", MESES_LARGOS[mes0 - 1], desplegable(MESES_LARGOS, "Elegí un mes de la lista."), undefined, `«Mis recibos» arranca en este mes y sigue ${N_MESES} meses. Conviene empezar un año antes de hoy: así ves la comparación interanual.`],
    [D.anio, "Año del primer recibo", anio0, {
      type: "whole", operator: "between", allowBlank: true, showErrorMessage: true, formulae: [2017, 2035],
      error: "Escribí el año con cuatro cifras, entre 2017 y 2035.",
    }, "0", ""],
    [D.sindical, "Cuota sindical (%)", EJEMPLO.sindicalPct, {
      type: "decimal", operator: "between", allowBlank: true, showErrorMessage: true, formulae: [0, 10],
      error: "Escribí el porcentaje como número: 2 para 2%. Si no estás afiliado, 0.",
    }, "0.00", "Sólo si estás afiliado. Es el % que figura en tu recibo (suele ir de 1% a 3%). Si no, dejá 0."],
    [D.osNoRem, "¿Te descuentan obra social sobre lo no remunerativo?", O.no, SI_NO(), undefined, "Depende de tu convenio. En Comercio, por ejemplo, las sumas no remunerativas aportan a la obra social. Si tu recibo lo descuenta, poné Sí."],
    [D.sindNoRem, "¿Y la cuota sindical sobre lo no remunerativo?", O.no, SI_NO(), undefined, "También depende del convenio. Si no sabés, dejá No y mirá si el control te marca la cuota sindical."],
    [D.comparar, "Qué sueldo comparo con la inflación", O.compararBruto, desplegable([O.compararBruto, O.compararNeto], "Elegí una opción de la lista."), undefined, "Los aumentos se negocian sobre el bruto. Si preferís ver lo que te entra en el bolsillo, elegí «Lo que cobré en mano» (usa la columna J)."],
  ];
  for (const [ref, etiqueta, valor, v, fmt, a] of filas) {
    celdaEtiqueta(ws, `A${ref.slice(1)}`, etiqueta);
    input(ws, ref, valor, v, fmt);
    if (a) ayuda(ws, `C${ref.slice(1)}`, a);
  }
  for (const r of [7, 9, 10, 11, 12]) ws.getRow(r).height = 32;

  bandaSeccion(ws, "A14:C14", "PARA EL AVISO DE GANANCIAS");
  const gan: [string, string, string | number, ExcelJS.DataValidation, string | undefined, string][] = [
    [D.conyuge, "Cónyuge a cargo", O.no, SI_NO(), undefined, "Sin ingresos propios por encima del mínimo no imponible."],
    [D.hijos, "Hijos a cargo", 0, {
      type: "whole", operator: "between", allowBlank: true, showErrorMessage: true, formulae: [0, PLANILLA_MS.hijosMax],
      error: "Escribí la cantidad de hijos a cargo, como número entero.",
    }, "0", "Menores de 18 años."],
    [D.otras, "Otras deducciones del año", 0, montoValido("Escribí el total anual, sin puntos ni signo $."), ARS_FMT, "Prepaga, alquiler, servicio doméstico, etc., sumado en el año. Si no sabés, dejá 0."],
  ];
  for (const [ref, etiqueta, valor, v, fmt, a] of gan) {
    celdaEtiqueta(ws, `A${ref.slice(1)}`, etiqueta);
    input(ws, ref, valor, v, fmt);
    ayuda(ws, `C${ref.slice(1)}`, a);
  }

  bandaSeccion(ws, "A20:C20", "VALORES DE LEY QUE USA LA PLANILLA");
  const ley: [string, string, number, string, string][] = [
    [LEY.jub, "Jubilación (SIPA)", APORTES.jubilacion, PCT_FMT, "Ley 24.241, art. 11."],
    [LEY.pami, "Ley 19.032 (PAMI)", APORTES.pami, PCT_FMT, "INSSJP."],
    [LEY.os, "Obra social", APORTES.obraSocial, PCT_FMT, "Ley 23.660."],
    [LEY.tope, "Tope de la base para aportes (por mes)", TOPE_SIPA.baseMaxima, ARS_FMT_DEC, `${TOPE_SIPA.fuente}. Vigente en ${TOPE_SIPA.vigencia}: cambia todos los meses. Por encima, los aportes dejan de crecer.`],
    [LEY.mni, "Ganancias: mínimo no imponible (anual)", DEDUCCIONES.mni, ARS_FMT_DEC, `ARCA, art. 30 LIG, ${GANANCIAS_VIGENCIA}.`],
    [LEY.especial, "Ganancias: deducción especial (anual)", DEDUCCIONES.deduccionEspecialDependencia, ARS_FMT_DEC, "Relación de dependencia."],
    [LEY.conyuge, "Ganancias: cónyuge (anual)", DEDUCCIONES.conyuge, ARS_FMT_DEC, ""],
    [LEY.hijo, "Ganancias: por hijo (anual)", DEDUCCIONES.hijo, ARS_FMT_DEC, ""],
  ];
  for (const [ref, etiqueta, valor, fmt, a] of ley) {
    celdaEtiqueta(ws, `A${ref.slice(1)}`, etiqueta);
    const c = ws.getCell(ref);
    c.value = valor;
    c.numFmt = fmt;
    c.fill = S.output;
    c.border = BORDE;
    c.alignment = { horizontal: "right" };
    if (a) ayuda(ws, `C${ref.slice(1)}`, a);
  }
  ws.getRow(24).height = 32;
  nota(ws, "A30:C30", "Si cambia uno de estos valores, el enlace de descarga que te llegó por mail te baja la versión al día. Un recibo viejo con un sueldo por encima del tope se compara con el tope de hoy: si la planilla lo marca, fijate el tope de ese mes.");
  ws.getRow(30).height = 30;

  const s = `(${LEY.jub}+${LEY.pami}+${LEY.os}+${AUX_D.sind})`;
  oculta(ws, AUX_D.mesIdx, `IFERROR(MATCH(${D.mes},${R_MESES},0),0)`);
  oculta(ws, AUX_D.inicio, `IF(AND(${AUX_D.mesIdx}>0,ISNUMBER(${D.anio})),${D.anio}*12+${AUX_D.mesIdx}-1,"")`);
  oculta(ws, AUX_D.sind, `IF(ISNUMBER(${D.sindical}),${D.sindical}/100,0)`);
  oculta(
    ws,
    AUX_D.deducciones,
    `${LEY.mni}+${LEY.especial}+IF(${D.conyuge}="${O.si}",${LEY.conyuge},0)+IF(ISNUMBER(${D.hijos}),${D.hijos},0)*${LEY.hijo}+IF(ISNUMBER(${D.otras}),${D.otras},0)`,
  );
  // Misma cuenta que estimarGananciasAnual despejada: 13 sueldos (12 + aguinaldo) menos aportes con
  // tope, cuota sindical y deducciones. Arriba del tope los aportes son fijos.
  oculta(
    ws,
    AUX_D.piso,
    `IF(${AUX_D.deducciones}/(13*(1-${s}))<=${LEY.tope},${AUX_D.deducciones}/(13*(1-${s})),(${AUX_D.deducciones}/13+(${LEY.jub}+${LEY.pami}+${LEY.os})*${LEY.tope})/(1-${AUX_D.sind}))`,
  );
  ws.getColumn("H").hidden = true;
  return ws;
}

// ─── Mis recibos ─────────────────────────────────────────────────────────────

// Auxiliares (ocultas): S mes absoluto · T semestre · U mejor remunerativo del semestre hasta esa
// fila · V fila con sueldo (0/1) · W no remunerativo como número · X..AA diferencia recibo − ley ·
// AB cantidad de descuentos de ley cargados · AC diferencia del neto · AD posición si hay sueldo.
export const COL_RECIBOS = {
  jubLey: "M",
  pamiLey: "N",
  osLey: "O",
  sindLey: "P",
  netoLey: "Q",
  estado: "K",
  diferencia: "L",
  mesAbs: "S",
  semestre: "T",
  mejorSemestre: "U",
  conSueldo: "V",
  noRemNum: "W",
  posicion: "AD",
} as const;

function buildRecibos(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(H.recibos, { properties: { tabColor: { argb: VERDE } } });
  ws.columns = [
    { width: 21 }, { width: 15 }, { width: 15 }, { width: 13 }, { width: 13 }, { width: 13 }, { width: 13 }, { width: 13 }, { width: 13 }, { width: 15 },
    { width: 30 }, { width: 14 },
    { width: 13 }, { width: 13 }, { width: 13 }, { width: 13 }, { width: 15 },
  ];
  titulo(ws, "A1:Q1", "Mis recibos — control mes a mes", VERDE);
  subtitulo(
    ws,
    "A2:Q2",
    "Viene con un ejemplo de 13 meses: reemplazalo con tus recibos (o borrá las celdas amarillas). Cargá cada importe tal cual figura en el recibo; las columnas verdes te dicen si cuadra con la ley.",
  );

  const grupo = (rango: string, texto: string, argb: string) => {
    ws.mergeCells(rango);
    const c = ws.getCell(rango.split(":")[0]);
    c.value = texto;
    c.font = { bold: true, size: 10, color: { argb: "FFFFFFFF" } };
    c.fill = relleno(argb);
    c.alignment = { horizontal: "center", vertical: "middle" };
  };
  grupo("B3:J3", "LO QUE DICE TU RECIBO (lo completás vos)", "FFF9A825");
  grupo("K3:L3", "CONTROL", PIZARRA);
  grupo("M3:Q3", "LO QUE MARCA LA LEY", VERDE);
  ws.getRow(3).height = 20;

  const encabezados = [
    "Mes",
    "Bruto remunerativo",
    "No remunerativo",
    "Jubilación",
    "Ley 19.032",
    "Obra social",
    "Cuota sindical",
    "Ganancias",
    "Otros descuentos",
    "Neto que cobraste",
    "¿Cuadra?",
    "Diferencia en aportes",
    "Jubilación 11%",
    "Ley 19.032 3%",
    "Obra social 3%",
    "Cuota sindical",
    "Neto de ley",
  ];
  encabezados.forEach((h, i) => {
    const c = ws.getCell(4, i + 1);
    c.value = h;
    c.font = { bold: true, size: 10, color: { argb: i >= 1 && i <= 9 ? "FF3E2723" : "FFFFFFFF" } };
    c.fill = i >= 1 && i <= 9 ? relleno("FFFFF59D") : i >= 10 && i <= 11 ? relleno("FF546E7A") : i === 0 ? S.header : relleno("FF2E7D32");
    c.border = BORDE;
    c.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  });
  ws.getRow(4).height = 34;

  const ini = DREF(AUX_D.inicio);
  const tope = DREF(LEY.tope);
  const jub = DREF(LEY.jub);
  const pami = DREF(LEY.pami);
  const os = DREF(LEY.os);
  const sind = DREF(AUX_D.sind);
  const osNR = DREF(D.osNoRem);
  const sindNR = DREF(D.sindNoRem);

  const ejemplo = new Map(EJEMPLO.meses.map((m, i) => [i, m]));
  for (let i = 0; i < N_MESES; i++) {
    const r = F0 + i;
    const fill = i % 2 === 0 ? S.white : S.cebra;
    const e = ejemplo.get(i);
    oculta(ws, `S${r}`, `IF(ISNUMBER(${ini}),${ini}+${i},"")`);
    const a = salida(ws, `A${r}`, `IF(S${r}="","",${T(`S${r}`)})`);
    a.fill = fill;

    const valores: Record<string, number | null> = {
      [R.remunerativo]: e?.bruto ?? null,
      [R.noRemunerativo]: null,
      [R.jubilacion]: e?.jub ?? null,
      [R.pami]: e?.pami ?? null,
      [R.obraSocial]: e?.os ?? null,
      [R.sindical]: e?.sind ?? null,
      [R.ganancias]: null,
      [R.otros]: null,
      [R.neto]: e?.neto ?? null,
    };
    for (const [col, v] of Object.entries(valores)) {
      const c = input(ws, `${col}${r}`, v, montoValido("Cargá el importe tal cual figura en el recibo, sin puntos ni signo $."), ARS_FMT_DEC);
      c.font = {};
    }

    oculta(ws, `V${r}`, `IF(AND(S${r}<>"",ISNUMBER(B${r})),IF(B${r}>0,1,0),0)`);
    oculta(ws, `W${r}`, `IF(ISNUMBER(C${r}),C${r},0)`);
    oculta(ws, `T${r}`, `IF(S${r}="","",INT(S${r}/12)*2+IF(MOD(S${r},12)>=6,1,0))`);
    oculta(
      ws,
      `U${r}`,
      i === 0 ? `IF(V${r}=1,B${r},0)` : `MAX(IF(V${r}=1,B${r},0),IF(T${r}=T${r - 1},U${r - 1},0))`,
    );
    oculta(ws, `AD${r}`, `IF(V${r}=1,${i + 1},"")`);

    salida(ws, `M${r}`, `IF(V${r}=1,MIN(B${r},${tope})*${jub},"")`, { fmt: ARS_FMT_DEC });
    salida(ws, `N${r}`, `IF(V${r}=1,MIN(B${r},${tope})*${pami},"")`, { fmt: ARS_FMT_DEC });
    salida(ws, `O${r}`, `IF(V${r}=1,MIN(B${r},${tope})*${os}+IF(${osNR}="${O.si}",W${r}*${os},0),"")`, { fmt: ARS_FMT_DEC });
    salida(ws, `P${r}`, `IF(V${r}=1,(B${r}+IF(${sindNR}="${O.si}",W${r},0))*${sind},"")`, { fmt: ARS_FMT_DEC });
    salida(ws, `Q${r}`, `IF(V${r}=1,B${r}+W${r}-M${r}-N${r}-O${r}-P${r},"")`, { fmt: ARS_FMT_DEC, total: true });

    oculta(ws, `X${r}`, `IF(AND(V${r}=1,ISNUMBER(D${r})),D${r}-M${r},0)`);
    oculta(ws, `Y${r}`, `IF(AND(V${r}=1,ISNUMBER(E${r})),E${r}-N${r},0)`);
    oculta(ws, `Z${r}`, `IF(AND(V${r}=1,ISNUMBER(F${r})),F${r}-O${r},0)`);
    oculta(ws, `AA${r}`, `IF(AND(V${r}=1,ISNUMBER(G${r})),G${r}-P${r},0)`);
    oculta(ws, `AB${r}`, `COUNT(D${r}:G${r})`);
    oculta(ws, `AC${r}`, `IF(AND(V${r}=1,ISNUMBER(J${r})),B${r}+W${r}-SUM(D${r}:I${r})-J${r},0)`);

    const E = ESTADOS_RECIBO;
    salida(
      ws,
      `K${r}`,
      `IF(V${r}=0,"",IF(AND(AB${r}=0,NOT(ISNUMBER(J${r}))),"${E.faltan}",` +
        `IF(ABS(X${r})>${TOL},"${E.jubilacion}",IF(ABS(Y${r})>${TOL},"${E.pami}",IF(ABS(Z${r})>${TOL},"${E.obraSocial}",` +
        `IF(ABS(AA${r})>${TOL},"${E.sindical}",IF(ABS(AC${r})>${TOL},"${E.neto}","${E.cuadra}")))))))`,
      { centro: true },
    );
    salida(ws, `L${r}`, `IF(OR(V${r}=0,AB${r}=0),"",X${r}+Y${r}+Z${r}+AA${r})`, { fmt: ARS_FMT_DEC });
  }

  const rojo = { type: "pattern" as const, pattern: "solid" as const, bgColor: { argb: "FFFFCDD2" } };
  const verde = { type: "pattern" as const, pattern: "solid" as const, bgColor: { argb: "FFC8E6C9" } };
  const ambar = { type: "pattern" as const, pattern: "solid" as const, bgColor: { argb: "FFFFE0B2" } };
  ws.addConditionalFormatting({
    ref: `K${F0}:K${FN}`,
    rules: [
      { type: "containsText", operator: "containsText", text: "Revisar", style: { fill: rojo, font: { bold: true, color: { argb: "FFB71C1C" } } }, priority: 1 },
      { type: "containsText", operator: "containsText", text: "neto", style: { fill: ambar, font: { color: { argb: "FFE65100" } } }, priority: 2 },
      { type: "containsText", operator: "containsText", text: ESTADOS_RECIBO.cuadra, style: { fill: verde, font: { bold: true, color: { argb: "FF1B5E20" } } }, priority: 3 },
    ],
  });

  const n = FN + 2;
  nota(
    ws,
    `A${n}:Q${n}`,
    `«Diferencia en aportes» = lo que te descontaron menos lo que marca la ley (positivo: te descontaron de más). Una diferencia de hasta $${TOL} es redondeo. Si aparece «Revisar», no siempre es un error: mirá primero si el concepto es remunerativo, si tu convenio descuenta algo sobre lo no remunerativo (en «Mis datos») o si el tope de ese mes era otro. Si sigue sin cuadrar, consultalo con tu empleador o RR. HH. con el recibo en la mano.`,
  );
  ws.getRow(n).height = 44;
  for (const col of ["S", "T", "U", "V", "W", "X", "Y", "Z", "AA", "AB", "AC", "AD"]) ws.getColumn(col).hidden = true;
  ws.views = [{ state: "frozen", xSplit: 1, ySplit: 4 }];
  return ws;
}

// ─── Sueldo vs inflación ─────────────────────────────────────────────────────

// Celdas auxiliares (columna N, oculta) que lee el resumen.
export const AUX_I = {
  posUlt: "N5",
  posAumento: "N6",
  posPrimero: "N7",
  posBase: "N8",
  sueldoHoy: "N9",
  sueldoBase: "N10",
  mesBase: "N11",
  mesHoy: "N12",
  ultIpc: "N13",
  factor: "N14",
  poder: "N15",
  necesitas: "N16",
  equivalente: "N17",
  pos12: "N18",
  sueldo12: "N19",
  mes12: "N20",
  factor12: "N21",
  subio12: "N22",
  real12: "N23",
  posPrimeroReal: "N24",
  primeroReal: "N25",
  equivRedondo: "N26",
  inflMil: "N27",
  necesitasMil: "N28",
  poderMil: "N29",
  posRecibo: "N30",
  brutoRecibo: "N31",
  semestreUlt: "N32",
  filaAguinaldo: "N33",
  faltaGanancias: "N34",
} as const;

function buildInflacion(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(H.inflacion, { properties: { tabColor: { argb: AZUL } } });
  ws.columns = [{ width: 21 }, { width: 17 }, { width: 15 }, { width: 15 }, { width: 22 }, { width: 22 }];
  titulo(ws, "A1:F1", "Tu sueldo frente a la inflación", AZUL);
  subtitulo(
    ws,
    "A2:F2",
    { formula: `"Cada sueldo llevado a pesos de "&${T(R_ULT)}&", el último IPC publicado por el INDEC. Si la columna E baja, tu sueldo compra menos que antes."` },
  );
  const enc = ["Mes", "Tu sueldo", "Cambio del sueldo", "Inflación del mes", "", "Poder de compra vs. el primer mes"];
  enc.forEach((h, i) => {
    const c = ws.getCell(4, i + 1);
    c.value = i === 4 ? { formula: `"En pesos de "&${T(R_ULT)}` } : h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno("FF1976D2");
    c.border = BORDE;
    c.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  });
  ws.getRow(4).height = 34;

  const comparar = DREF(D.comparar);
  for (let i = 0; i < N_MESES; i++) {
    const r = F0 + i;
    const S_ = `${QR}!S${r}`;
    salida(ws, `A${r}`, `${QR}!A${r}`);
    salida(
      ws,
      `B${r}`,
      `IF(${QR}!V${r}=1,IF(${comparar}="${O.compararNeto}",IF(ISNUMBER(${QR}!J${r}),${QR}!J${r},""),${QR}!B${r}+${QR}!W${r}),"")`,
      { fmt: ARS_FMT },
    );
    salida(ws, `C${r}`, i === 0 ? `""` : `IF(AND(ISNUMBER(B${r}),ISNUMBER(B${r - 1})),B${r}/B${r - 1}-1,"")`, { fmt: PCT_FMT });
    oculta(ws, `H${r}`, `IF(${S_}="","",IF(OR(${S_}>${R_ULT},${S_}<${R_MBASE}),"",${IDX(S_)}))`);
    salida(ws, `D${r}`, `IF(AND(ISNUMBER(H${r}),${S_}>${R_MBASE}),H${r}/${IDX(`${S_}-1`)}-1,"")`, { fmt: PCT_FMT });
    salida(ws, `E${r}`, `IF(AND(ISNUMBER(B${r}),ISNUMBER(H${r})),B${r}*${IDX(R_ULT)}/H${r},"")`, { fmt: ARS_FMT });
    salida(ws, `F${r}`, `IF(AND(ISNUMBER(E${r}),ISNUMBER(${AUX_I.primeroReal})),E${r}/${AUX_I.primeroReal}-1,"")`, { fmt: PCT_FMT });
    oculta(ws, `I${r}`, `IF(ISNUMBER(B${r}),${i + 1},"")`);
    oculta(ws, `J${r}`, i === 0 ? `""` : `IF(AND(ISNUMBER(B${r}),ISNUMBER(B${r - 1})),IF(B${r}>B${r - 1}+0.5,${i + 1},""),"")`);
    oculta(ws, `K${r}`, `IF(ISNUMBER(E${r}),${i + 1},"")`);
  }

  const A = AUX_I;
  const B_ = `B${F0}:B${FN}`;
  const SR = `${QR}!$S$${F0}:$S$${FN}`;
  oculta(ws, A.posUlt, `MAX(I${F0}:I${FN})`);
  oculta(ws, A.posAumento, `MAX(J${F0}:J${FN})`);
  oculta(ws, A.posPrimero, `IF(COUNT(I${F0}:I${FN})=0,0,MIN(I${F0}:I${FN}))`);
  oculta(ws, A.posBase, `IF(${A.posAumento}>0,${A.posAumento},${A.posPrimero})`);
  oculta(ws, A.sueldoHoy, `IF(${A.posUlt}>0,INDEX(${B_},${A.posUlt}),"")`);
  oculta(ws, A.sueldoBase, `IF(${A.posBase}>0,INDEX(${B_},${A.posBase}),"")`);
  oculta(ws, A.mesBase, `IF(${A.posBase}>0,INDEX(${SR},${A.posBase}),"")`);
  oculta(ws, A.mesHoy, `IF(${A.posUlt}>0,INDEX(${SR},${A.posUlt}),"")`);
  oculta(ws, A.ultIpc, R_ULT);
  // Misma cuenta que sueldoVsInflacion: del mes base al último IPC publicado.
  oculta(ws, A.factor, `IF(ISNUMBER(${A.mesBase}),IF(AND(${A.mesBase}<=${A.ultIpc},${A.mesBase}>=${R_MBASE}),${IDX(A.ultIpc)}/${IDX(A.mesBase)},""),"")`);
  oculta(ws, A.poder, `IF(ISNUMBER(${A.factor}),${A.sueldoHoy}/(${A.sueldoBase}*${A.factor})-1,"")`);
  oculta(ws, A.necesitas, `IF(ISNUMBER(${A.factor}),MAX(0,${A.sueldoBase}*${A.factor}/${A.sueldoHoy}-1),"")`);
  oculta(ws, A.equivalente, `IF(ISNUMBER(${A.factor}),${A.sueldoBase}*${A.factor},"")`);
  oculta(ws, A.pos12, `IF(${A.posUlt}>12,${A.posUlt}-12,0)`);
  oculta(ws, A.sueldo12, `IF(${A.pos12}>0,IF(ISNUMBER(INDEX(${B_},${A.pos12})),INDEX(${B_},${A.pos12}),""),"")`);
  oculta(ws, A.mes12, `IF(ISNUMBER(${A.sueldo12}),INDEX(${SR},${A.pos12}),"")`);
  oculta(ws, A.factor12, `IF(ISNUMBER(${A.mes12}),IF(AND(${A.mes12}<=${A.ultIpc},${A.mes12}>=${R_MBASE}),${IDX(A.ultIpc)}/${IDX(A.mes12)},""),"")`);
  oculta(ws, A.subio12, `IF(ISNUMBER(${A.sueldo12}),${A.sueldoHoy}/${A.sueldo12}-1,"")`);
  oculta(ws, A.real12, `IF(ISNUMBER(${A.factor12}),${A.sueldoHoy}/(${A.sueldo12}*${A.factor12})-1,"")`);
  oculta(ws, A.posPrimeroReal, `IF(COUNT(K${F0}:K${FN})=0,0,MIN(K${F0}:K${FN}))`);
  oculta(ws, A.primeroReal, `IF(${A.posPrimeroReal}>0,INDEX(E${F0}:E${FN},${A.posPrimeroReal}),"")`);
  oculta(ws, A.equivRedondo, `IF(ISNUMBER(${A.equivalente}),ROUND(${A.equivalente},0),"")`);
  oculta(ws, A.inflMil, `IF(ISNUMBER(${A.factor}),ROUND((${A.factor}-1)*1000,0),"")`);
  oculta(ws, A.necesitasMil, `IF(ISNUMBER(${A.necesitas}),ROUND(${A.necesitas}*1000,0),"")`);
  oculta(ws, A.poderMil, `IF(ISNUMBER(${A.poder}),ROUND(${A.poder}*1000,0),"")`);
  oculta(ws, A.posRecibo, `MAX(${QR}!AD${F0}:AD${FN})`);
  oculta(ws, A.brutoRecibo, `IF(${A.posRecibo}>0,INDEX(${QR}!B${F0}:B${FN},${A.posRecibo})+INDEX(${QR}!W${F0}:W${FN},${A.posRecibo}),"")`);
  oculta(ws, A.semestreUlt, `IF(${A.posRecibo}>0,INDEX(${QR}!T${F0}:T${FN},${A.posRecibo}),"")`);
  oculta(ws, A.filaAguinaldo, `IF(AND(ISNUMBER(${A.semestreUlt}),ISNUMBER(${QA}!$I$5)),${A.semestreUlt}-${QA}!$I$5+1,0)`);
  oculta(ws, A.faltaGanancias, `IF(ISNUMBER(${A.brutoRecibo}),ROUND(MAX(0,${DREF(AUX_D.piso)}-${A.brutoRecibo}),0),"")`);
  for (const col of ["H", "I", "J", "K", "L", "M", "N"]) ws.getColumn(col).hidden = true;
  ws.views = [{ state: "frozen", xSplit: 1, ySplit: 4 }];
  return ws;
}

// ─── Aguinaldo ───────────────────────────────────────────────────────────────

export const FILAS_AGUINALDO = 5;

function buildAguinaldo(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(H.aguinaldo, { properties: { tabColor: { argb: VERDE } } });
  ws.columns = [{ width: 22 }, { width: 14 }, { width: 22 }, { width: 18 }, { width: 16 }, { width: 18 }, { width: 24 }];
  titulo(ws, "A1:G1", "Aguinaldo de cada semestre", VERDE);
  subtitulo(
    ws,
    "A2:G2",
    "El aguinaldo es la mitad del mejor sueldo remunerativo del semestre (Ley 23.041). Se arma con los recibos que cargaste: si el semestre no terminó, es una proyección con lo cobrado hasta ahora.",
  );
  ["Semestre", "Meses cargados", "Mejor sueldo remunerativo", "Aguinaldo bruto", "Aportes (17%)", "En mano, estimado", "Se paga hasta"].forEach((h, i) => {
    const c = ws.getCell(4, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = S.header;
    c.border = BORDE;
    c.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  });
  ws.getRow(4).height = 32;
  const TR = `${QR}!$T$${F0}:$T$${FN}`;
  const aportes = `(${DREF(LEY.jub)}+${DREF(LEY.pami)}+${DREF(LEY.os)})`;
  for (let k = 0; k < FILAS_AGUINALDO; k++) {
    const r = 5 + k;
    oculta(ws, `I${r}`, k === 0 ? `IF(ISNUMBER(${QR}!T${F0}),${QR}!T${F0},"")` : `IF(ISNUMBER(I5),I5+${k},"")`);
    salida(ws, `A${r}`, `IF(I${r}="","",IF(MOD(I${r},2)=0,"1er","2do")&" semestre "&INT(I${r}/2))`);
    salida(ws, `B${r}`, `IF(I${r}="","",SUMIF(${TR},I${r},${QR}!$V$${F0}:$V$${FN}))`, { fmt: "0" });
    salida(ws, `C${r}`, `IF(I${r}="","",IF(B${r}=0,"",INDEX(${QR}!$U$${F0}:$U$${FN},MATCH(I${r},${TR},1))))`, { fmt: ARS_FMT_DEC });
    salida(ws, `D${r}`, `IF(ISNUMBER(C${r}),C${r}/2,"")`, { fmt: ARS_FMT_DEC });
    salida(ws, `E${r}`, `IF(ISNUMBER(D${r}),D${r}*${aportes},"")`, { fmt: ARS_FMT_DEC });
    salida(ws, `F${r}`, `IF(ISNUMBER(D${r}),D${r}-E${r},"")`, { fmt: ARS_FMT_DEC, total: true });
    salida(ws, `G${r}`, `IF(I${r}="","",IF(MOD(I${r},2)=0,"30 de junio de ","18 de diciembre de ")&INT(I${r}/2))`);
  }
  nota(
    ws,
    "A11:G11",
    "Supone que trabajaste el semestre completo. Si entraste o te fuiste a mitad de semestre, el aguinaldo es proporcional a los días trabajados: calculalo en calcular.ar/aguinaldo. Las fechas de pago son las del art. 122 de la Ley de Contrato de Trabajo.",
  );
  ws.getRow(11).height = 32;
  ws.getColumn("I").hidden = true;
  return ws;
}

// ─── Para pedir aumento (resumen imprimible) ─────────────────────────────────

function buildResumen(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(H.resumen, {
    properties: { tabColor: { argb: "FFF57C00" } },
    pageSetup: { paperSize: 9, orientation: "portrait", fitToPage: true, fitToWidth: 1, fitToHeight: 1, horizontalCentered: true, margins: { left: 0.5, right: 0.5, top: 0.6, bottom: 0.6, header: 0.3, footer: 0.3 } },
  });
  ws.columns = [{ width: 40 }, { width: 24 }, { width: 48 }];
  titulo(ws, "A1:C1", "Mi sueldo frente a la inflación", VERDE);
  subtitulo(ws, "A2:C2", { formula: `"Referencia de cálculo con el IPC oficial del INDEC hasta "&${T(R_ULT)}&" y los descuentos de ley vigentes. Imprimilo o guardalo como PDF desde Archivo > Imprimir."` });

  const A = AUX_I;
  const I_ = (ref: string) => `${QI}!${abs(ref)}`;
  const etiqueta = (fila: number, texto: string) => celdaEtiqueta(ws, `A${fila}`, texto);
  const notaC = (fila: number, formula: string) => {
    const c = ws.getCell(`C${fila}`);
    c.value = { formula };
    c.font = { size: 9, color: { argb: "FF666666" } };
    c.alignment = { vertical: "middle", wrapText: true, indent: 1 };
  };

  bandaSeccion(ws, "A4:C4", "QUIÉN");
  etiqueta(F.nombre, "Nombre");
  salida(ws, `B${F.nombre}`, `IF(${DREF(D.nombre)}="","",${DREF(D.nombre)})`);
  etiqueta(F.puesto, "Puesto");
  salida(ws, `B${F.puesto}`, `IF(${DREF(D.puesto)}="","",${DREF(D.puesto)})`);
  etiqueta(F.ultimoRecibo, "Último recibo cargado");
  salida(ws, `B${F.ultimoRecibo}`, `IF(${I_(A.posRecibo)}>0,INDEX(${QR}!$A$${F0}:$A$${FN},${I_(A.posRecibo)}),"Todavía no cargaste ningún recibo")`);

  bandaSeccion(ws, "A8:C8", "TU SUELDO HOY");
  etiqueta(F.sueldoHoy, "Sueldo bruto del último recibo");
  salida(ws, `B${F.sueldoHoy}`, `${I_(A.brutoRecibo)}`, { fmt: ARS_FMT });
  notaC(F.sueldoHoy, `IF(${I_(A.posRecibo)}>0,"remunerativo + no remunerativo","")`);
  etiqueta(F.netoLey, "En mano, con los descuentos de ley");
  salida(ws, `B${F.netoLey}`, `IF(${I_(A.posRecibo)}>0,INDEX(${QR}!$Q$${F0}:$Q$${FN},${I_(A.posRecibo)}),"")`, { fmt: ARS_FMT });
  notaC(F.netoLey, `IF(${I_(A.posRecibo)}>0,"jubilación, Ley 19.032, obra social y cuota sindical; sin Ganancias ni otros descuentos","")`);

  bandaSeccion(ws, "A11:C11", "DESDE TU ÚLTIMO AUMENTO");
  etiqueta(F.desde, "Lo medimos desde");
  salida(ws, `B${F.desde}`, `IF(ISNUMBER(${I_(A.mesBase)}),${T(I_(A.mesBase))},"")`);
  notaC(F.desde, `IF(${I_(A.posAumento)}>0,"el último mes en que subió tu sueldo",IF(${I_(A.posBase)}>0,"tu primer recibo cargado: antes no hay un aumento",""))`);
  etiqueta(F.sueldoBase, "Tu sueldo desde ese mes");
  salida(ws, `B${F.sueldoBase}`, `${I_(A.sueldoBase)}`, { fmt: ARS_FMT });
  notaC(F.sueldoBase, `IF(${DREF(D.comparar)}="${O.compararNeto}","lo que cobraste en mano","el bruto total")`);
  etiqueta(F.inflacion, "Inflación desde entonces");
  salida(ws, `B${F.inflacion}`, `IF(ISNUMBER(${I_(A.factor)}),${I_(A.factor)}-1,"")`, { fmt: PCT_FMT });
  notaC(
    F.inflacion,
    `IF(ISNUMBER(${I_(A.factor)}),"IPC del INDEC de "&${T(I_(A.mesBase))}&" a "&${T(I_(A.ultIpc))},IF(ISNUMBER(${I_(A.mesBase)}),"Todavía no hay IPC publicado de ese mes: el INDEC lo publica ${IPC_DIA_PUBLICACION} del mes siguiente.",""))`,
  );
  etiqueta(F.poder, "Tu poder de compra");
  salida(ws, `B${F.poder}`, `${I_(A.poder)}`, { fmt: `+0.0%;-0.0%;0.0%` });
  notaC(F.poder, `IF(ISNUMBER(${I_(A.poder)}),IF(${I_(A.poder)}<0,"tu sueldo compra menos que en ese mes","tu sueldo le ganó a la inflación"),"")`);
  etiqueta(F.necesitas, "Aumento que necesitás para recuperarlo");
  salida(ws, `B${F.necesitas}`, `${I_(A.necesitas)}`, { fmt: PCT_FMT, total: true });
  etiqueta(F.equivalente, "Sueldo que te devuelve ese poder de compra");
  salida(ws, `B${F.equivalente}`, `${I_(A.equivalente)}`, { fmt: ARS_FMT, total: true });

  etiqueta(F.frase, "Para decirlo en la reunión");
  ws.mergeCells(`B${F.frase}:C${F.frase}`);
  salida(
    ws,
    `B${F.frase}`,
    `IF(NOT(ISNUMBER(${I_(A.factor)})),"",IF(${I_(A.posAumento)}>0,"Desde mi último aumento, en ","Desde ")&${T(I_(A.mesBase))}&", la inflación fue de "&${pctTexto(I_(A.inflMil))}&" (IPC del INDEC hasta "&${T(I_(A.ultIpc))}&"). "&` +
      `IF(${I_(A.necesitas)}>0,"Para tener el mismo poder de compra, mi sueldo tendría que ser de $"&${miles(I_(A.equivRedondo))}&": un aumento de "&${pctTexto(I_(A.necesitasMil))}&".","Mi sueldo acompañó esa suba: hoy compra "&${pctTexto(I_(A.poderMil))}&" más que entonces."))`,
    { wrap: true },
  );
  ws.getRow(F.frase).height = 62;

  bandaSeccion(ws, "A19:C19", "LOS ÚLTIMOS 12 MESES");
  etiqueta(F.hace12, "Tu sueldo hace 12 meses");
  salida(ws, `B${F.hace12}`, `${I_(A.sueldo12)}`, { fmt: ARS_FMT });
  notaC(F.hace12, `IF(ISNUMBER(${I_(A.mes12)}),${T(I_(A.mes12))},"Cargá el recibo de hace un año para ver esta comparación")`);
  etiqueta(F.subio12, "Cuánto subió tu sueldo");
  salida(ws, `B${F.subio12}`, `${I_(A.subio12)}`, { fmt: PCT_FMT });
  etiqueta(F.inflacion12, "Inflación del período");
  salida(ws, `B${F.inflacion12}`, `IF(ISNUMBER(${I_(A.factor12)}),${I_(A.factor12)}-1,"")`, { fmt: PCT_FMT });
  etiqueta(F.real12, "Tu sueldo real (descontada la inflación)");
  salida(ws, `B${F.real12}`, `${I_(A.real12)}`, { fmt: `+0.0%;-0.0%;0.0%`, total: true });

  bandaSeccion(ws, "A24:C24", "AGUINALDO");
  const fa = I_(A.filaAguinaldo);
  const ag = (col: string) => `IF(AND(${fa}>=1,${fa}<=${FILAS_AGUINALDO}),INDEX(${QA}!$${col}$5:$${col}$${4 + FILAS_AGUINALDO},${fa}),"")`;
  etiqueta(F.aguinaldoSemestre, "Semestre");
  salida(ws, `B${F.aguinaldoSemestre}`, ag("A"));
  notaC(F.aguinaldoSemestre, `IF(${fa}>=1,"se paga hasta el "&${ag("G")},"")`);
  etiqueta(F.aguinaldoBruto, "Aguinaldo bruto");
  salida(ws, `B${F.aguinaldoBruto}`, ag("D"), { fmt: ARS_FMT });
  etiqueta(F.aguinaldoNeto, "En mano, estimado");
  salida(ws, `B${F.aguinaldoNeto}`, ag("F"), { fmt: ARS_FMT });

  bandaSeccion(ws, "A28:C28", "GANANCIAS");
  etiqueta(F.pisoGanancias, "Piso aproximado (sueldo bruto por mes)");
  salida(ws, `B${F.pisoGanancias}`, DREF(AUX_D.piso), { fmt: ARS_FMT });
  notaC(F.pisoGanancias, `"con tus cargas de familia de «Mis datos» y las deducciones del ${GANANCIAS_VIGENCIA}"`);
  etiqueta(F.ganancias, "Dónde estás");
  ws.mergeCells(`B${F.ganancias}:C${F.ganancias}`);
  const br = I_(A.brutoRecibo);
  const piso = DREF(AUX_D.piso);
  salida(
    ws,
    `B${F.ganancias}`,
    `IF(NOT(ISNUMBER(${br})),"",IF(${br}>=${piso},"Con este sueldo podrías estar alcanzado por Ganancias. Revisá la línea de Ganancias de tu recibo y, si tenés dudas, consultalo con tu empleador.",` +
      `IF(${br}>=${piso}*${CERCA_DEL_PISO},"Estás cerca del piso: te faltan $"&${miles(I_(A.faltaGanancias))}&" de bruto por mes. Un aumento grande puede hacer que empiecen a retenerte.",` +
      `"Estás lejos del piso: te faltan $"&${miles(I_(A.faltaGanancias))}&" de bruto por mes.")))`,
    { wrap: true },
  );
  ws.getRow(F.ganancias).height = 34;

  nota(
    ws,
    "A32:C32",
    "Hecho con la Planilla Mi Sueldo de calcular.ar. Inflación: IPC nivel general del INDEC. Aportes: Ley 24.241, Ley 19.032 y Ley 23.660. Es una referencia de cálculo con datos oficiales, no una liquidación ni asesoramiento legal. Ganancias es un aviso estimado: la retención real depende de tus deducciones y la calcula tu empleador.",
  );
  ws.getRow(32).height = 44;
  ws.pageSetup.printArea = "A1:C32";
  return ws;
}

// ─── Cómo usarla ─────────────────────────────────────────────────────────────

function buildInicio(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(H.inicio, { properties: { tabColor: { argb: PIZARRA } } });
  ws.columns = [{ width: 6 }, { width: 104 }];
  titulo(ws, "A1:B1", "Planilla Mi Sueldo 2026 — cómo usarla", VERDE);
  const pasos = [
    "En «Mis datos», elegí el mes de tu primer recibo y tu cuota sindical si estás afiliado. Tu nombre y tu puesto son opcionales: sólo salen en el resumen.",
    "En «Mis recibos», cargá cada recibo en su mes: bruto remunerativo, lo no remunerativo y cada descuento tal cual figura. Al lado aparece si cuadra con la ley.",
    "Si dice «Revisar», mirá la columna verde de ese concepto: es lo que marca la ley para tu sueldo. La diferencia te dice de cuánto es.",
    "En «Sueldo vs inflación» ves cada sueldo en pesos de hoy: si la columna baja, tu sueldo compra menos.",
    "«Para pedir aumento» resume todo en una hoja: cuánto perdiste desde tu último aumento y qué aumento lo recupera, con la fuente. Imprimila o guardala en PDF.",
    "«Aguinaldo» proyecta el de cada semestre con tus recibos, y el resumen te avisa si te acercás al piso de Ganancias.",
  ];
  pasos.forEach((t, i) => {
    const r = 3 + i;
    const nc = ws.getCell(r, 1);
    nc.value = i + 1;
    nc.font = { bold: true, color: { argb: "FFFFFFFF" } };
    nc.fill = S.header;
    nc.alignment = { horizontal: "center", vertical: "middle" };
    const tc = ws.getCell(r, 2);
    tc.value = t;
    tc.alignment = { wrapText: true, vertical: "middle", indent: 1 };
    ws.getRow(r).height = 34;
  });

  let r = 3 + pasos.length + 1;
  bandaSeccion(ws, `A${r}:B${r}`, "COLORES");
  r++;
  const leyenda: [ExcelJS.Fill, string][] = [
    [S.input, "Amarillo: lo completás vos."],
    [S.output, "Verde: lo calcula la planilla. Está protegido para que no se pise sin querer (Revisar > Desproteger hoja, si alguna vez lo necesitás)."],
  ];
  for (const [fill, t] of leyenda) {
    ws.getCell(r, 1).fill = fill;
    ws.getCell(r, 1).border = BORDE;
    ws.getCell(r, 2).value = t;
    ws.getCell(r, 2).alignment = { wrapText: true, indent: 1 };
    ws.getRow(r).height = 22;
    r++;
  }

  r++;
  bandaSeccion(ws, `A${r}:B${r}`, "LO QUE CONVIENE SABER");
  r++;
  const claves = [
    `Los descuentos de ley son tres y suman 17%: jubilación 11%, Ley 19.032 (PAMI) 3% y obra social 3%. Se calculan sobre lo remunerativo, hasta un tope que cambia todos los meses (${TOPE_SIPA.vigencia}: $${Math.round(TOPE_SIPA.baseMaxima).toLocaleString("es-AR")}).`,
    "Lo no remunerativo no paga jubilación ni Ley 19.032. Algunos convenios sí le descuentan obra social o cuota sindical: lo indicás en «Mis datos».",
    "La cuota sindical se descuenta sólo si estás afiliado. Desde la Ley 27.802 (marzo de 2026), las contribuciones solidarias que fijan los convenios para afiliados y no afiliados tienen un tope de 2% de la remuneración; la cuota de afiliación queda afuera de ese tope.",
    "Desde junio de 2026 (Decreto 407/2026) el recibo también muestra lo que paga tu empleador por vos. Esta planilla controla tus descuentos, no las contribuciones del empleador.",
    "La inflación se compone, no se suma: tres meses de 2% dan 6,12%. Por eso la planilla compara índices del INDEC y no suma porcentajes.",
    "Los créditos laborales prescriben a los dos años (art. 256 de la Ley de Contrato de Trabajo). Si encontrás una diferencia, no la dejes pasar: consultala con el recibo en la mano.",
  ];
  for (const t of claves) {
    const c = ws.getCell(r, 2);
    c.value = `•  ${t}`;
    c.alignment = { wrapText: true, vertical: "top", indent: 1 };
    ws.getRow(r).height = 34;
    r++;
  }

  r++;
  bandaSeccion(ws, `A${r}:B${r}`, "CÓMO SE MANTIENE AL DÍA");
  r++;
  const dia = [
    `El INDEC publica el IPC de cada mes ${IPC_DIA_PUBLICACION} del mes siguiente. Cada vez que sale, regeneramos la planilla y el mismo enlace de descarga te baja la versión al día, sin costo. Para pasar tus recibos: copiá las celdas amarillas de «Mis recibos» y «Mis datos» y pegalas en el mismo lugar.`,
    "¿Preferís no cambiar de archivo? Cargá el % del mes nuevo en la columna amarilla de la hoja «IPC» y todo se recalcula.",
  ];
  for (const t of dia) {
    const c = ws.getCell(r, 2);
    c.value = `•  ${t}`;
    c.alignment = { wrapText: true, vertical: "top", indent: 1 };
    ws.getRow(r).height = 34;
    r++;
  }
  r++;
  nota(ws, `A${r}:B${r}`, "Da los mismos números que la calculadora gratuita de calcular.ar/sueldo-neto: son los mismos aportes, el mismo tope y la misma serie del IPC. Si alguna vez no coinciden, escribinos y lo corregimos. Es una referencia de cálculo, no asesoramiento legal ni contable.");
  ws.getRow(r).height = 30;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export const ARCHIVO_MI_SUELDO = PLANILLA_MS.archivo;

export async function generarPlanillaMiSueldo(): Promise<string> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "CalculAR (calcular.ar)";
  wb.title = "Planilla Mi Sueldo 2026";
  wb.subject = "Control del recibo de sueldo, sueldo real contra el IPC del INDEC y resumen para pedir aumento";
  wb.keywords = "recibo de sueldo, aportes, inflación, ipc, indec, aumento, aguinaldo, ganancias, planilla";

  buildInicio(wb);
  const hojas = [buildDatos(wb), buildRecibos(wb), buildInflacion(wb), buildResumen(wb), buildAguinaldo(wb), buildIpc(wb)];
  hojaFuentes(
    wb,
    [
      SUELDO_FUENTES.jubilacion,
      SUELDO_FUENTES.pami,
      SUELDO_FUENTES.obraSocial,
      SUELDO_FUENTES.topeSIPA,
      INFLACION_FUENTES.ipc,
      INFLACION_FUENTES.indec,
      AGUINALDO_FUENTES.ley23041,
      AGUINALDO_FUENTES.lct,
      GANANCIAS_FUENTES.deducciones,
      { nombre: DECRETO_407.nombre, url: DECRETO_407.bo },
    ],
    SUELDO_FUENTES.consultadoEl,
    [],
    `Planilla de calcular.ar. Serie del IPC descargada el ${IPC_DESCARGADO_EL}; tope de aportes de ${TOPE_SIPA.vigencia}; deducciones de Ganancias del ${GANANCIAS_VIGENCIA} (ARCA, consultadas el ${GANANCIAS_FUENTES.consultadoEl}). Cuando cambia uno de estos datos regeneramos el archivo: el mismo enlace de descarga te baja la versión al día, sin costo.`,
  );
  for (const ws of hojas) await proteger(ws);
  // Abre en «Mis recibos», que es lo que se completa todos los meses.
  wb.views = [{ x: 0, y: 0, width: 20000, height: 12000, firstSheet: 0, activeTab: 2, visibility: "visible" }];

  const dir = path.join(process.cwd(), "private");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const salidaArchivo = path.join(dir, PLANILLA_MS.archivo);
  await wb.xlsx.writeFile(salidaArchivo);
  return salidaArchivo;
}

if (process.argv[1] && /gen_planilla_mi_sueldo\.ts$/.test(process.argv[1])) {
  generarPlanillaMiSueldo()
    .then((ruta) => {
      console.log(`Planilla Mi Sueldo generada: ${ruta}`);
      console.log(`   IPC hasta ${nombrePeriodo(ULTIMO_PERIODO)} · tope ${TOPE_SIPA.vigencia} · ${N_MESES} meses de recibos`);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
