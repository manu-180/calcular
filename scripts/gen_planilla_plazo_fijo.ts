/**
 * Genera private/planilla-plazo-fijo-2026.xlsx — la planilla paga de la calculadora de plazo fijo
 * (/plazo-fijo).
 *
 * INVARIANTES:
 * - La serie del IPC, la TNA de referencia y la última inflación NO se escriben a mano: salen de
 *   src/data/ipc-serie.ts y src/data/plazofijo.ts, que rota el workflow datos-vivos. Como esto corre
 *   en el prebuild, cada deploy deja el entregable al día.
 * - Las cuentas son las de src/lib/plazofijo.ts (interés simple, año de 365 días, inflación estimada
 *   compuesta por días/30). scripts/check_planilla_plazo_fijo.ts evalúa el archivo con HyperFormula
 *   y lo compara contra calcularPlazoFijo(): si no dan lo mismo, el árbol se pone rojo.
 * - «IPC del INDEC» sólo cuando el INDEC ya publicó todos los meses del plazo (interpolación
 *   geométrica diaria, ver docs/research/2026-10-06-plazo-fijo-producto.md); si falta uno, la
 *   estimada, idéntica a la calculadora.
 *
 * Fórmulas: sólo funciones que existen en Excel 2007, Google Sheets y HyperFormula, sin TEXT ni
 * FIXED (dependen del idioma del Excel). Las fechas se escriben como número de serie con formato
 * dd/mm/aaaa: exceljs con Date las corre por zona horaria.
 *
 * Uso: npx -y tsx scripts/gen_planilla_plazo_fijo.ts
 */

import ExcelJS from "exceljs";
import path from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import { IPC_SERIE, IPC_DESCARGADO_EL } from "../src/data/ipc-serie";
import { INFLACION_FUENTES } from "../src/data/inflacion";
import { GARANTIA_DEPOSITOS, INFLACION_DEFAULT, PLAZOFIJO_FUENTES, TNA_FALLBACK, UVA } from "../src/data/plazofijo";
import { MESES_LARGOS, nombrePeriodo, sumarMeses, ULTIMO_PERIODO } from "../src/lib/inflacion";
import { hoyAR } from "../src/lib/hoy";
import { ESCALERA_DEFAULT, PLANILLA_PF, fechaCorta, serialDeISO } from "../src/lib/prefill/plazo-fijo";
import { ARS_FMT, BORDE, S, bandaSeccion, celdaEtiqueta, celdaInput, hojaFuentes, nota, relleno, titulo } from "./gen_planilla_estilos";

const H = PLANILLA_PF.hojas;
const R = PLANILLA_PF.registro;
const C = R.col;
const F0 = R.fila0;
const FN = R.fila0 + R.filas - 1;

const VERDE = "FF1B5E20";
const AZUL = "FF1565C0";
const NARANJA = "FFF57C00";
const GRIS = "FF37474F";
const PCT = "0.00%";
const FECHA = "dd/mm/yyyy";

const hojaQ = (nombre: string) => (/[^A-Za-z0-9_]/.test(nombre) ? `'${nombre}'` : nombre);
const REG = hojaQ(H.registro);

// ─── IPC ────────────────────────────────────────────────────────────────────
const PRIMER_PERIODO = IPC_SERIE[0][0];
if (PRIMER_PERIODO !== "2016-12") throw new Error(`La serie del IPC arranca en ${PRIMER_PERIODO}, se esperaba 2016-12`);
const M_BASE = 2016 * 12 + 11;
const IPC_F0 = 5;
const PERIODOS: string[] = [];
for (let p = PRIMER_PERIODO; p <= "2030-12"; p = sumarMeses(p, 1)) PERIODOS.push(p);
const IPC_FIN = IPC_F0 + PERIODOS.length - 1;
const R_MESES = `${H.ipc}!$J$5:$J$16`;
const R_MBASE = `${H.ipc}!$J$2`;
const R_MULT = `${H.ipc}!$J$3`;
const R_INDICES = `${H.ipc}!$D$${IPC_F0}:$D$${IPC_FIN}`;
/** «agosto de 2026» de un mes absoluto (año × 12 + mes − 1). */
const T = (m: string) => `INDEX(${R_MESES},MOD(${m},12)+1)&" de "&INT((${m})/12)`;
const IDX = (m: string) => `INDEX(${R_INDICES},(${m})-${R_MBASE}+1)`;
/** Nivel del IPC el día `d` (interpolación geométrica dentro del mes `m` de `d`). */
const NIVEL = (d: string, m: string) => `${IDX(`${m}-1`)}*(${IDX(m)}/${IDX(`${m}-1`)})^(DAY(${d})/DAY(EOMONTH(${d},0)))`;

const desbloquear = (c: ExcelJS.Cell) => (c.protection = { locked: false });

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

function salida(ws: ExcelJS.Worksheet, ref: string, formula: string, opts: { fmt?: string; total?: boolean; wrap?: boolean; fill?: ExcelJS.Fill } = {}) {
  const c = ws.getCell(ref);
  c.value = { formula };
  c.fill = opts.fill ?? (opts.total ? S.total : S.output);
  c.border = BORDE;
  if (opts.fmt) c.numFmt = opts.fmt;
  c.font = opts.total ? { bold: true } : {};
  c.alignment = opts.wrap
    ? { wrapText: true, vertical: "top", horizontal: "left", indent: 1 }
    : opts.fmt
      ? { horizontal: "right", vertical: "middle" }
      : { horizontal: "left", indent: 1, vertical: "middle" };
  return c;
}

function encabezados(ws: ExcelJS.Worksheet, fila: number, titulos: string[], argb = "FF2E7D32", alto = 32) {
  titulos.forEach((h, i) => {
    const c = ws.getCell(fila, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno(argb);
    c.border = BORDE;
    c.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  });
  ws.getRow(fila).height = alto;
}

function subtitulo(ws: ExcelJS.Worksheet, rango: string, valor: ExcelJS.CellValue) {
  ws.mergeCells(rango);
  const c = ws.getCell(rango.split(":")[0]);
  c.value = valor;
  c.font = { italic: true, size: 10, color: { argb: "FF555555" } };
  c.fill = S.label;
  c.alignment = { horizontal: "left", vertical: "middle", wrapText: true, indent: 1 };
  ws.getRow(Number(rango.match(/\d+/)![0])).height = 30;
}

function ayuda(ws: ExcelJS.Worksheet, rango: string, texto: string) {
  ws.mergeCells(rango);
  const c = ws.getCell(rango.split(":")[0]);
  c.value = texto;
  c.font = { size: 9, color: { argb: "FF777777" } };
  c.alignment = { vertical: "middle", indent: 1, wrapText: true };
}

const v = {
  monto: (): ExcelJS.DataValidation => ({
    type: "decimal", operator: "between", allowBlank: true, showErrorMessage: true, formulae: [0.01, 1e12],
    error: "Escribí el capital sin puntos ni signo $. Por ejemplo: 1000000.",
  }),
  tna: (): ExcelJS.DataValidation => ({
    type: "decimal", operator: "between", allowBlank: true, showErrorMessage: true, formulae: [0, 1000],
    error: "Escribí la TNA como número: 22,5 para 22,5% anual.",
  }),
  dias: (): ExcelJS.DataValidation => ({
    type: "whole", operator: "between", allowBlank: true, showErrorMessage: true, formulae: [PLANILLA_PF.diasMin, PLANILLA_PF.diasMax],
    error: `Los días van enteros, desde ${PLANILLA_PF.diasMin} (el mínimo de un plazo fijo tradicional).`,
  }),
  fecha: (): ExcelJS.DataValidation => ({
    type: "decimal", operator: "between", allowBlank: true, showErrorMessage: true,
    formulae: [serialDeISO("2017-01-01"), serialDeISO("2040-12-31")],
    error: "Escribí la fecha como dd/mm/aaaa, por ejemplo 15/10/2026.",
  }),
  pct: (min: number, max: number, error: string): ExcelJS.DataValidation => ({
    type: "decimal", operator: "between", allowBlank: false, showErrorMessage: true, formulae: [min, max], error,
  }),
  entero: (min: number, max: number, error: string): ExcelJS.DataValidation => ({
    type: "whole", operator: "between", allowBlank: false, showErrorMessage: true, formulae: [min, max], error,
  }),
};

async function proteger(ws: ExcelJS.Worksheet) {
  // Sin contraseña a propósito: protege de pisar una fórmula sin querer (Revisar > Desproteger hoja).
  await ws.protect("", { selectLockedCells: true, selectUnlockedCells: true, formatColumns: true, formatRows: true });
}

// ─── Hoja IPC ────────────────────────────────────────────────────────────────

function buildIpc(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(H.ipc, { properties: { tabColor: { argb: AZUL } } });
  ws.columns = [{ width: 24 }, { width: 6 }, { width: 6 }, { width: 18 }, { width: 16 }, { width: 22 }, { width: 18 }, { width: 2 }, { width: 2 }, { width: 14 }];
  titulo(ws, "A1:G1", "IPC Nacional del INDEC — nivel general (base diciembre 2016 = 100)", AZUL);
  ws.mergeCells("A2:G2");
  const sub = ws.getCell("A2");
  sub.value = `Serie oficial descargada el ${fechaCorta(IPC_DESCARGADO_EL)} de la API de series de tiempo del Estado (datos.gob.ar). Último dato: ${nombrePeriodo(ULTIMO_PERIODO)}. Si ya salió un mes que acá no está, cargá su % en la columna amarilla.`;
  sub.font = { italic: true, size: 9, color: { argb: "FF555555" } };
  sub.alignment = { wrapText: true, vertical: "top" };
  ws.getRow(2).height = 30;
  encabezados(ws, 4, ["Período", "", "", "Índice", "Variación del mes", "¿Salió y no está? Cargá el % del mes", "Origen"], "FF1976D2");
  ws.mergeCells("A4:C4");

  const publicados = new Map(IPC_SERIE.map(([p, x]) => [p, x]));
  PERIODOS.forEach((p, i) => {
    const r = IPC_F0 + i;
    const fill = i % 2 === 0 ? S.white : S.cebra;
    ws.mergeCells(`A${r}:C${r}`);
    const pc = ws.getCell(`A${r}`);
    pc.value = nombrePeriodo(p);
    pc.fill = fill;
    pc.border = BORDE;
    const [dc, ec, fc, gc] = ["D", "E", "F", "G"].map((col) => ws.getCell(`${col}${r}`));
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
      fc.dataValidation = v.pct(-50, 100, "Cargá el % del mes como número: por ejemplo 2,1 para 2,1%.");
      fc.dataValidation.allowBlank = true;
      fc.numFmt = "0.0";
      desbloquear(fc);
      gc.value = { formula: `IF(F${r}="","","Cargado por vos")` };
    }
    for (const c of [dc, ec, gc]) c.fill = fill;
    dc.numFmt = "#,##0.0000";
    ec.numFmt = "0.0%";
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

// ─── Hoja Mis plazos fijos ──────────────────────────────────────────────────

const rango = (col: string) => `${REG}!$${col}$${F0}:$${col}$${FN}`;
const rangoLocal = (col: string) => `$${col}$${F0}:$${col}$${FN}`;

// Columnas auxiliares (ocultas) de cada fila del registro.
const AUX = {
  valido: "P",
  m0: "Q",
  m1: "R",
  oficial: "S",
  nivel0: "T",
  nivel1: "U",
  clave: "V",
  real: "W",
  vigenteCobro: "X",
  anio: "Y",
  cobrado: "Z",
  vigenteCapital: "AA",
  vigenteInteres: "AB",
} as const;

export const EJEMPLOS_REGISTRO = (() => {
  const mesAnt = sumarMeses(ULTIMO_PERIODO, -1);
  return [
    { banco: "Banco A (ejemplo)", fecha: `${mesAnt}-05`, capital: 1_000_000, tna: TNA_FALLBACK.valor, dias: 30 },
    { banco: "Banco B (ejemplo)", fecha: hoyAR(), capital: 2_500_000, tna: TNA_FALLBACK.valor, dias: 60 },
  ];
})();

function buildRegistro(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(H.registro, { properties: { tabColor: { argb: VERDE } } });
  ws.columns = [
    { width: 24 }, { width: 13 }, { width: 15 }, { width: 9 }, { width: 8 }, { width: 13 }, { width: 14 }, { width: 16 },
    { width: 10 }, { width: 11 }, { width: 14 }, { width: 11 }, { width: 34 }, { width: 16 }, { width: 30 },
  ];
  titulo(ws, "A1:O1", "Mis plazos fijos", VERDE);
  subtitulo(
    ws,
    "A2:O2",
    "Las dos primeras filas son un ejemplo: reemplazalas con tus plazos fijos. Completás las celdas amarillas (banco, fecha, capital, TNA y días); las verdes se calculan solas.",
  );

  bandaSeccion(ws, "A4:B4", "SUPUESTO PARA LO QUE TODAVÍA NO PUBLICÓ EL INDEC");
  celdaEtiqueta(ws, "A5", "Inflación mensual estimada (%)");
  input(ws, R.inflacion, INFLACION_DEFAULT.mensualPct, v.pct(-20, 100, "Escribí la inflación mensual como número: 1,7 para 1,7%."), "0.00");
  ayuda(ws, "C5:O5", `Último dato oficial: ${INFLACION_DEFAULT.mensualPct.toLocaleString("es-AR")}% en ${INFLACION_DEFAULT.periodo} (INDEC). Se usa sólo para los plazos fijos que vencen después del último IPC publicado: cuando salga el dato, la fila pasa sola al IPC del INDEC.`);
  celdaEtiqueta(ws, "A6", "Hoy");
  salida(ws, R.hoy, "TODAY()", { fmt: FECHA });
  ws.getRow(5).height = 30;

  bandaSeccion(ws, "A8:B8", "RESUMEN");
  const res: [number, string, string, string][] = [
    [9, "Capital en plazos fijos vigentes", `SUM(${rangoLocal(AUX.vigenteCapital)})`, ARS_FMT],
    [10, "Intereses por cobrar de los vigentes", `SUM(${rangoLocal(AUX.vigenteInteres)})`, ARS_FMT],
    [11, "Próximo vencimiento", `IFERROR(INT(SMALL(${rangoLocal(AUX.clave)},1)),"")`, FECHA],
    [12, "Se acredita en los próximos 30 días", `SUMIFS(${rangoLocal(AUX.vigenteCobro)},${rangoLocal(C.vence)},"<="&(${R.hoy}+30))`, ARS_FMT],
  ];
  for (const [f, et, fo, fmt] of res) {
    celdaEtiqueta(ws, `A${f}`, et);
    salida(ws, `B${f}`, fo, { fmt, total: f === 9 });
  }
  ws.mergeCells("C11:F11");
  salida(ws, "C11", `IF(ISNUMBER(B11),INDEX($A$1:$A$${FN},ROUND(MOD(SMALL(${rangoLocal(AUX.clave)},1),1)*100000,0))&"","No hay plazos fijos vigentes cargados")`);

  bandaSeccion(ws, "A13:O13", "TUS PLAZOS FIJOS");
  encabezados(ws, 14, [
    "Banco", "Constituido el", "Capital", "TNA (%)", "Días", "Vence el", "Interés", "Cobrás al vencimiento",
    "TEA", "Inflación del período", "Inflación según", "Tasa real", "¿Le ganó a la inflación?", "Estado", "Garantía de los depósitos",
  ], "FF2E7D32", 44);

  const GAR = GARANTIA_DEPOSITOS.monto;
  for (let r = F0; r <= FN; r++) {
    const i = r - F0;
    const fill = i % 2 === 0 ? S.white : S.cebra;
    const ej = EJEMPLOS_REGISTRO[i];
    input(ws, `${C.banco}${r}`, ej?.banco ?? null);
    input(ws, `${C.fecha}${r}`, ej ? serialDeISO(ej.fecha) : null, v.fecha(), FECHA);
    input(ws, `${C.capital}${r}`, ej?.capital ?? null, v.monto(), ARS_FMT);
    input(ws, `${C.tna}${r}`, ej?.tna ?? null, v.tna(), "0.00");
    input(ws, `${C.dias}${r}`, ej?.dias ?? null, v.dias(), "0");

    const c = (col: string) => `${col}${r}`;
    const P = c(AUX.valido);
    const hoy = `$B$6`;
    const aux: [string, string][] = [
      [AUX.valido, `IF(AND(ISNUMBER(${c(C.fecha)}),ISNUMBER(${c(C.capital)}),${c(C.capital)}>0,ISNUMBER(${c(C.tna)}),${c(C.tna)}>=0,ISNUMBER(${c(C.dias)}),${c(C.dias)}>=${PLANILLA_PF.diasMin}),1,0)`],
      [AUX.m0, `IF(${P}=1,YEAR(${c(C.fecha)})*12+MONTH(${c(C.fecha)})-1,"")`],
      [AUX.m1, `IF(${P}=1,YEAR(${c(C.vence)})*12+MONTH(${c(C.vence)})-1,"")`],
      [AUX.oficial, `IF(${P}=1,IF(AND(${c(AUX.m0)}-1>=${R_MBASE},${c(AUX.m1)}<=${R_MULT}),1,0),0)`],
      [AUX.nivel0, `IF(${c(AUX.oficial)}=1,${NIVEL(c(C.fecha), c(AUX.m0))},"")`],
      [AUX.nivel1, `IF(${c(AUX.oficial)}=1,${NIVEL(c(C.vence), c(AUX.m1))},"")`],
      [AUX.clave, `IF(AND(${P}=1,${c(C.vence)}>=${hoy}),${c(C.vence)}+ROW()/100000,"")`],
      [AUX.real, `IF(${P}=1,${c(C.cobras)}/(1+${c(C.inflacion)})-${c(C.capital)},"")`],
      [AUX.vigenteCobro, `IF(AND(${P}=1,${c(C.vence)}>=${hoy}),${c(C.cobras)},"")`],
      [AUX.anio, `IF(${P}=1,YEAR(${c(C.vence)}),"")`],
      [AUX.cobrado, `IF(AND(${P}=1,${c(C.vence)}<=${hoy}),${c(C.interes)},"")`],
      [AUX.vigenteCapital, `IF(AND(${P}=1,${c(C.vence)}>=${hoy}),${c(C.capital)},"")`],
      [AUX.vigenteInteres, `IF(AND(${P}=1,${c(C.vence)}>=${hoy}),${c(C.interes)},"")`],
    ];
    for (const [col, f] of aux) ws.getCell(c(col)).value = { formula: f };

    const out: [string, string, string | undefined][] = [
      [C.vence, `IF(${P}=1,${c(C.fecha)}+${c(C.dias)},"")`, FECHA],
      [C.interes, `IF(${P}=1,${c(C.capital)}*${c(C.tna)}/100*${c(C.dias)}/365,"")`, ARS_FMT],
      [C.cobras, `IF(${P}=1,${c(C.capital)}+${c(C.interes)},"")`, ARS_FMT],
      [C.tea, `IF(${P}=1,(1+${c(C.tna)}/100*${c(C.dias)}/365)^(365/${c(C.dias)})-1,"")`, PCT],
      [C.inflacion, `IF(${P}=1,IF(${c(AUX.oficial)}=1,${c(AUX.nivel1)}/${c(AUX.nivel0)}-1,(1+${R.inflacion}/100)^(${c(C.dias)}/30)-1),"")`, PCT],
      [C.fuente, `IF(${P}=1,IF(${c(AUX.oficial)}=1,"${PLANILLA_PF.fuenteOficial}","${PLANILLA_PF.fuenteEstimada}"),"")`, undefined],
      [C.real, `IF(${P}=1,${c(C.cobras)}/(1+${c(C.inflacion)})/${c(C.capital)}-1,"")`, PCT],
      [
        C.resultado,
        `IF(${P}=0,IF(OR(${c(C.banco)}<>"",ISNUMBER(${c(C.fecha)}),ISNUMBER(${c(C.capital)}),ISNUMBER(${c(C.tna)}),ISNUMBER(${c(C.dias)})),"Faltan datos: fecha, capital, TNA y días (mínimo ${PLANILLA_PF.diasMin})",""),` +
          `IF(${c(AUX.oficial)}=1,IF(${c(C.real)}>=0,"Le ganó a la inflación","Perdió contra la inflación"),` +
          `IF(${c(C.real)}>=0,"Le gana, si la inflación es la estimada","Pierde, si la inflación es la estimada")))`,
        undefined,
      ],
      [C.estado, `IF(${P}=0,"",IF(${c(C.vence)}<${hoy},"Vencido",IF(${c(C.vence)}=${hoy},"Vence hoy","Faltan "&(${c(C.vence)}-${hoy})&IF(${c(C.vence)}-${hoy}=1," día"," días"))))`, undefined],
      [
        C.garantia,
        `IF(OR(${P}=0,${c(C.vence)}<${hoy}),"",IF(${c(C.banco)}="","Cargá el banco para controlarla",` +
          `IF(SUMIFS(${rangoLocal(AUX.vigenteCobro)},${rangoLocal(C.banco)},${c(C.banco)})>${GAR},"Supera el tope en este banco","Dentro del tope")))`,
        undefined,
      ],
    ];
    for (const [col, f, fmt] of out) {
      const cell = salida(ws, c(col), f, { fmt, fill });
      if (col === C.resultado || col === C.garantia) cell.alignment = { wrapText: true, vertical: "middle", horizontal: "left", indent: 1 };
    }
    ws.getRow(r).height = 30;
  }
  for (const col of Object.values(AUX)) ws.getColumn(col).hidden = true;

  const n1 = FN + 2;
  nota(
    ws,
    `A${n1}:O${n1}`,
    `Interés = capital × TNA × días ÷ 365, la convención de los bancos argentinos. Tasa real = lo que cobrás descontada la inflación del período: si es positiva, tu plata compra más que el día que la pusiste. «IPC del INDEC»: el INDEC ya publicó todos los meses del plazo fijo (el índice se reparte día por día dentro de cada mes). «Estimada»: falta algún mes y se usa la inflación de la celda B5, igual que la calculadora de calcular.ar.`,
  );
  ws.getRow(n1).height = 42;
  nota(
    ws,
    `A${n1 + 1}:O${n1 + 1}`,
    `Garantía de los depósitos: hasta $ ${GAR.toLocaleString("es-AR")} por persona, sumando capital e intereses de sus depósitos, desde el ${GARANTIA_DEPOSITOS.vigenciaDesde} (Com. «A» 8407 del BCRA). No cubre los plazos fijos pactados a una tasa mayor a la de referencia del BCRA. Si el vencimiento cae en un día no hábil, el banco lo paga el día hábil siguiente.`,
  );
  ws.getRow(n1 + 1).height = 30;
  ws.views = [{ state: "frozen", ySplit: 14, xSplit: 1 }];
  return ws;
}

// ─── Hoja Calendario ─────────────────────────────────────────────────────────

const CAL_F0 = 5;
const CAL_MES0 = 32;

function buildCalendario(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(H.calendario, { properties: { tabColor: { argb: VERDE } } });
  ws.columns = [{ width: 18 }, { width: 26 }, { width: 16 }, { width: 15 }, { width: 18 }, { width: 13 }, { width: 12 }, { width: 2 }, { width: 2 }, { width: 8 }];
  titulo(ws, "A1:G1", "Calendario de vencimientos", VERDE);
  subtitulo(
    ws,
    "A2:G2",
    { formula: `IF(COUNT(${rango(AUX.clave)})=0,"No hay plazos fijos vigentes: cargalos en la hoja «${H.registro}» y acá aparecen ordenados por fecha.","Tus plazos fijos vigentes, del que vence primero al último. Esta hoja no se completa: sale sola de «${H.registro}».")` },
  );
  encabezados(ws, 4, ["Vence el", "Banco", "Capital", "Interés", "Se acredita", "Faltan (días)", "Tasa real"]);
  for (let k = 1; k <= R.filas; k++) {
    const r = CAL_F0 + k - 1;
    const fill = k % 2 === 1 ? S.white : S.cebra;
    ws.getCell(`J${r}`).value = { formula: `IFERROR(ROUND(MOD(SMALL(${rango(AUX.clave)},${k}),1)*100000,0),"")` };
    const pick = (col: string) => `IF($J${r}="","",INDEX(${REG}!$${col}$1:$${col}$${FN},$J${r}))`;
    salida(ws, `A${r}`, `IFERROR(INT(SMALL(${rango(AUX.clave)},${k})),"")`, { fmt: FECHA, fill });
    salida(ws, `B${r}`, `IF($J${r}="","",INDEX(${REG}!$A$1:$A$${FN},$J${r})&"")`, { fill });
    salida(ws, `C${r}`, pick(C.capital), { fmt: ARS_FMT, fill });
    salida(ws, `D${r}`, pick(C.interes), { fmt: ARS_FMT, fill });
    salida(ws, `E${r}`, pick(C.cobras), { fmt: ARS_FMT, fill, total: true });
    salida(ws, `F${r}`, `IF(A${r}="","",A${r}-${REG}!$B$6)`, { fmt: "0", fill });
    salida(ws, `G${r}`, pick(C.real), { fmt: PCT, fill });
  }
  ws.getColumn("J").hidden = true;

  bandaSeccion(ws, `A${CAL_MES0 - 2}:G${CAL_MES0 - 2}`, "MES POR MES · LOS PRÓXIMOS 12 MESES");
  encabezados(ws, CAL_MES0 - 1, ["Mes", "Plazos fijos que vencen", "Se acredita"]);
  for (let i = 0; i < 12; i++) {
    const r = CAL_MES0 + i;
    const fill = i % 2 === 0 ? S.white : S.cebra;
    const m = `(YEAR(${REG}!$B$6)*12+MONTH(${REG}!$B$6)-1+${i})`;
    salida(ws, `A${r}`, T(m), { fill });
    salida(ws, `B${r}`, `COUNTIFS(${rango(AUX.m1)},${m},${rango(AUX.clave)},">0")`, { fmt: "0", fill });
    salida(ws, `C${r}`, `SUMIFS(${rango(AUX.vigenteCobro)},${rango(AUX.m1)},${m})`, { fmt: ARS_FMT, fill });
  }
  ws.views = [{ state: "frozen", ySplit: 4 }];
  return ws;
}

// ─── Hoja Renovación ─────────────────────────────────────────────────────────

export const FILAS_RENOVACION = {
  interes: 12, total: 13, tasaPeriodo: 14, tem: 15, tea: 16,
  diasTotales: 19, totalFinal: 20, interesTotal: 21, rendimiento: 22, inflacion: 23, poderCompra: 24, real: 25, lectura: 26,
} as const;

function buildRenovacion(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(H.renovacion, { properties: { tabColor: { argb: NARANJA } } });
  ws.columns = [{ width: 40 }, { width: 22 }, { width: 22 }, { width: 22 }, { width: 22 }];
  const K = PLANILLA_PF.renovacion;
  titulo(ws, "A1:E1", "Simulador de renovación: capital + intereses", NARANJA);
  subtitulo(ws, "A2:E2", "Qué pasa si al vencer volvés a poner todo (capital + intereses) con la misma TNA. Viene armado para cubrir un año.");

  bandaSeccion(ws, "A4:B4", "DATOS");
  const ent: [string, string, number, ExcelJS.DataValidation, string][] = [
    [K.capital, "Capital", 1_000_000, v.monto(), ARS_FMT],
    [K.tna, "TNA (%)", TNA_FALLBACK.valor, v.tna(), "0.00"],
    [K.dias, "Días de cada plazo", 30, v.dias(), "0"],
    [K.renovaciones, "Renovaciones (veces)", 11, v.entero(0, K.periodos - 1, `Entre 0 y ${K.periodos - 1} renovaciones.`), "0"],
    [K.inflacion, "Inflación mensual estimada (%)", INFLACION_DEFAULT.mensualPct, v.pct(-20, 100, "Escribí la inflación mensual como número: 1,7 para 1,7%."), "0.00"],
  ];
  for (const [ref, et, val, val2, fmt] of ent) {
    celdaEtiqueta(ws, `A${ref.slice(1)}`, et);
    input(ws, ref, val, val2, fmt);
  }
  ayuda(ws, "C6:E6", `TNA promedio de los bancos al ${fechaCorta(TNA_FALLBACK.fechaISO)} (BCRA): ${TNA_FALLBACK.valor.toLocaleString("es-AR")}%. Poné la de tu banco.`);
  ayuda(ws, "C8:E8", "30 días renovado 11 veces = 12 plazos, casi un año.");

  ws.getCell("N5").value = {
    formula: `IF(AND(ISNUMBER(B5),B5>0,ISNUMBER(B6),B6>=0,ISNUMBER(B7),B7>=${PLANILLA_PF.diasMin},ISNUMBER(B8),B8>=0,B8<=${K.periodos - 1},ISNUMBER(B9)),1,0)`,
  };
  ws.getCell("N6").value = { formula: `IF(N5=1,INT(B8),0)` };
  ws.getColumn("N").hidden = true;
  const si = (f: string) => `IF($N$5=1,${f},"")`;
  const L = FILAS_RENOVACION;

  bandaSeccion(ws, "A11:B11", "EL PRIMER PLAZO");
  const primero: [number, string, string, string, boolean?][] = [
    [L.interes, "Interés del primer plazo", si("B5*B6/100*B7/365"), ARS_FMT],
    [L.total, "Total al vencimiento", si(`B5+B${L.interes}`), ARS_FMT, true],
    [L.tasaPeriodo, "Tasa del período", si("B6/100*B7/365"), PCT],
    [L.tem, "Tasa efectiva mensual (TEM)", si("B6/100*30/365"), PCT],
    [L.tea, "Tasa efectiva anual (TEA)", si(`(1+B${L.tasaPeriodo})^(365/B7)-1`), PCT],
  ];
  bandaSeccion(ws, "A18:B18", "RENOVANDO CAPITAL + INTERESES");
  const F1 = K.fila0;
  const FF = K.fila0 + K.periodos - 1;
  const renov: [number, string, string, string, boolean?][] = [
    [L.diasTotales, "Días en total", si("B7*($N$6+1)"), "0"],
    [L.totalFinal, "Terminás con", si(`INDEX(D${F1}:D${FF},$N$6+1)`), ARS_FMT, true],
    [L.interesTotal, "Interés total", si(`B${L.totalFinal}-B5`), ARS_FMT],
    [L.rendimiento, "Rendimiento total", si(`B${L.totalFinal}/B5-1`), PCT],
    [L.inflacion, "Inflación estimada del período", si(`(1+B9/100)^(B${L.diasTotales}/30)-1`), PCT],
    [L.poderCompra, "En plata de hoy", si(`B${L.totalFinal}/(1+B${L.inflacion})`), ARS_FMT],
    [L.real, "Resultado real", si(`B${L.poderCompra}/B5-1`), PCT, true],
  ];
  for (const [f, et, fo, fmt, tot] of [...primero, ...renov]) {
    celdaEtiqueta(ws, `A${f}`, et);
    salida(ws, `B${f}`, fo, { fmt, total: tot });
  }
  celdaEtiqueta(ws, `A${L.lectura}`, "Qué dice la cuenta");
  ws.mergeCells(`B${L.lectura}:E${L.lectura}`);
  salida(
    ws,
    `B${L.lectura}`,
    `IF($N$5=0,"Completá las celdas amarillas de arriba.",IF(B${L.real}>=0,"Con la inflación que estimaste, renovando le ganás a la inflación: al final tu plata compra más que hoy.","Con la inflación que estimaste, la inflación le gana: al final tu plata compra menos que hoy."))`,
    { wrap: true },
  );
  ws.getRow(L.lectura).height = 32;

  bandaSeccion(ws, `A${F1 - 2}:E${F1 - 2}`, "RENOVACIÓN POR RENOVACIÓN");
  encabezados(ws, F1 - 1, ["Plazo", "Vence el día", "Interés del período", "Acumulado", "En plata de hoy"]);
  for (let k = 1; k <= K.periodos; k++) {
    const r = F1 + k - 1;
    const fill = k % 2 === 1 ? S.white : S.cebra;
    const vis = `AND($N$5=1,${k}<=$N$6+1)`;
    const prev = k === 1 ? "$B$5" : `D${r - 1}`;
    salida(ws, `A${r}`, `IF(${vis},"#${k}","")`, { fill });
    salida(ws, `B${r}`, `IF(${vis},${k}*$B$7,"")`, { fmt: "0", fill });
    salida(ws, `C${r}`, `IF(${vis},${prev}*$B$6/100*$B$7/365,"")`, { fmt: ARS_FMT, fill });
    salida(ws, `D${r}`, `IF(${vis},${prev}+C${r},"")`, { fmt: ARS_FMT, fill });
    salida(ws, `E${r}`, `IF(${vis},D${r}/(1+$B$9/100)^(B${r}/30),"")`, { fmt: ARS_FMT, fill });
  }
  nota(ws, `A${FF + 2}:E${FF + 2}`, "Supone que la TNA se mantiene en cada renovación, algo que nadie puede asegurar: cambiala y mirá cómo cambia el resultado. Es la misma cuenta que la calculadora de calcular.ar/plazo-fijo.");
  ws.getRow(FF + 2).height = 30;
  return ws;
}

// ─── Hoja Tradicional vs UVA ─────────────────────────────────────────────────

export const FILAS_UVA = { plazo: 13, inflacion: 14, tradicional: 15, uva: 16, diferencia: 17, empate: 18, lectura: 19 } as const;

function buildUva(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(H.uva, { properties: { tabColor: { argb: NARANJA } } });
  ws.columns = [{ width: 40 }, { width: 22 }, { width: 22 }, { width: 22 }, { width: 22 }];
  const K = PLANILLA_PF.uva;
  titulo(ws, "A1:E1", "Plazo fijo tradicional vs UVA, al mismo plazo", NARANJA);
  subtitulo(ws, "A2:E2", "El UVA ajusta el capital por inflación y suma una tasa chica; el tradicional paga una TNA fija. Esta hoja te muestra con cuánto terminás en cada uno y qué inflación los empata. No elige por vos.");

  bandaSeccion(ws, "A4:B4", "DATOS");
  const ent: [string, string, number, ExcelJS.DataValidation, string][] = [
    [K.capital, "Capital", 1_000_000, v.monto(), ARS_FMT],
    [K.dias, "Días de cada plazo tradicional", 30, v.dias(), "0"],
    [K.renovaciones, "Renovaciones del tradicional (veces)", 11, v.entero(0, PLANILLA_PF.renovacion.periodos - 1, "Entre 0 y 24 renovaciones."), "0"],
    [K.tna, "TNA del tradicional (%)", TNA_FALLBACK.valor, v.tna(), "0.00"],
    [K.inflacion, "Inflación mensual estimada (%)", INFLACION_DEFAULT.mensualPct, v.pct(-20, 100, "Escribí la inflación mensual como número: 1,7 para 1,7%."), "0.00"],
    [K.adicional, "Tasa adicional del UVA (TNA %)", UVA.tnaAdicionalDefaultPct, v.pct(0, 100, "Escribí la tasa adicional como número: 1 para 1%."), "0.00"],
  ];
  for (const [ref, et, val, val2, fmt] of ent) {
    celdaEtiqueta(ws, `A${ref.slice(1)}`, et);
    input(ws, ref, val, val2, fmt);
  }
  ayuda(ws, "C7:E7", "El UVA se compara contra el tradicional renovado hasta el mismo plazo total.");
  ayuda(ws, "C10:E10", "La fija cada banco: fijate la del tuyo el día que lo armes.");

  ws.getCell("N5").value = {
    formula: `IF(AND(ISNUMBER(B5),B5>0,ISNUMBER(B6),B6>=${PLANILLA_PF.diasMin},ISNUMBER(B7),B7>=0,B7<=${PLANILLA_PF.renovacion.periodos - 1},ISNUMBER(B8),B8>=0,ISNUMBER(B9),ISNUMBER(B10),B10>=0),1,0)`,
  };
  ws.getCell("N6").value = { formula: `IF(N5=1,INT(B7),0)` };
  ws.getColumn("N").hidden = true;
  const L = FILAS_UVA;
  const si = (f: string) => `IF($N$5=1,${f},"")`;
  const conUva = (f: string) => `IF(AND($N$5=1,B${L.plazo}>=${UVA.plazoMinimoDias}),${f},"")`;

  bandaSeccion(ws, "A12:B12", "AL MISMO PLAZO");
  const filas: [number, string, string, string, boolean?][] = [
    [L.plazo, "Plazo que se compara (días)", si("B6*($N$6+1)"), "0"],
    [L.inflacion, "Inflación estimada del período", si(`(1+B9/100)^(B${L.plazo}/30)-1`), PCT],
    [L.tradicional, "Tradicional renovado: terminás con", si(`B5*(1+B8/100*B6/365)^($N$6+1)`), ARS_FMT, true],
    [L.uva, "UVA: terminás con", conUva(`B5*(1+B${L.inflacion})*(1+B10/100*B${L.plazo}/365)`), ARS_FMT, true],
    [L.diferencia, "Diferencia (UVA − tradicional)", conUva(`B${L.uva}-B${L.tradicional}`), ARS_FMT],
    [L.empate, "Inflación mensual que los empata", conUva(`(B${L.tradicional}/B5/(1+B10/100*B${L.plazo}/365))^(30/B${L.plazo})-1`), PCT],
  ];
  for (const [f, et, fo, fmt, tot] of filas) {
    celdaEtiqueta(ws, `A${f}`, et);
    salida(ws, `B${f}`, fo, { fmt, total: tot });
  }
  celdaEtiqueta(ws, `A${L.lectura}`, "Cómo se lee");
  ws.mergeCells(`B${L.lectura}:E${L.lectura}`);
  salida(
    ws,
    `B${L.lectura}`,
    `IF($N$5=0,"Completá las celdas amarillas de arriba.",IF(B${L.plazo}<${UVA.plazoMinimoDias},"El plazo fijo UVA exige ${UVA.plazoMinimoDias} días como mínimo (Com. «A» 8246 del BCRA): subí los días o las renovaciones para compararlo.",` +
      `"Si la inflación mensual promedio de esos "&B${L.plazo}&" días es mayor a la de empate, el UVA termina con más; si es menor, termina con más el tradicional. La inflación futura nadie la sabe: probá con distintas."))`,
    { wrap: true },
  );
  ws.getRow(L.lectura).height = 46;
  nota(
    ws,
    "A21:E21",
    `Regla del BCRA (Com. «A» 8246, vigente desde el 2/6/2025): el plazo fijo UVA de personas humanas es de ${UVA.plazoMinimoDias} días como mínimo y se puede precancelar desde el día ${UVA.precancelableDesdeDia}, a una tasa fija y sin el ajuste por inflación. Acá el UVA se calcula con la inflación que estimaste; en la realidad ajusta por UVA (CER), que sigue al IPC con unas semanas de atraso.`,
  );
  ws.getRow(21).height = 44;
  return ws;
}

// ─── Hoja Escalera ───────────────────────────────────────────────────────────

export const FILAS_ESCALERA = { parte: 11, interes: 12, lectura: 13 } as const;

function buildEscalera(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(H.escalera, { properties: { tabColor: { argb: NARANJA } } });
  ws.columns = [{ width: 34 }, { width: 18 }, { width: 14 }, { width: 18 }, { width: 14 }, { width: 14 }, { width: 16 }, { width: 18 }, { width: 20 }];
  const K = PLANILLA_PF.escalera;
  titulo(ws, "A1:I1", "Escalera de plazos fijos", NARANJA);
  subtitulo(ws, "A2:I2", "Partís el capital en varios plazos fijos que vencen uno detrás de otro: así tenés plata disponible seguido sin cortar ninguno antes de tiempo.");

  bandaSeccion(ws, "A4:B4", "DATOS");
  const ent: [string, string, number, ExcelJS.DataValidation, string][] = [
    [K.capital, "Capital total", 1_000_000, v.monto(), ARS_FMT],
    [K.escalones, "Cantidad de escalones", ESCALERA_DEFAULT.escalones, v.entero(1, K.max, `Entre 1 y ${K.max} escalones.`), "0"],
    [K.cada, "Vence uno cada (días)", ESCALERA_DEFAULT.cada, v.entero(PLANILLA_PF.diasMin, 365, `Entre ${PLANILLA_PF.diasMin} y 365 días.`), "0"],
    [K.fecha, "Fecha en que los armás", serialDeISO(hoyAR()), v.fecha(), FECHA],
    [K.tna, "TNA (%)", TNA_FALLBACK.valor, v.tna(), "0.00"],
  ];
  for (const [ref, et, val, val2, fmt] of ent) {
    celdaEtiqueta(ws, `A${ref.slice(1)}`, et);
    input(ws, ref, val, val2, fmt);
  }
  ayuda(ws, "C9:I9", "Si tu banco paga otra TNA a plazos más largos, cargala escalón por escalón en la columna amarilla de abajo.");
  ws.getCell("N5").value = {
    formula: `IF(AND(ISNUMBER(B5),B5>0,ISNUMBER(B6),B6>=1,B6<=${K.max},ISNUMBER(B7),B7>=${PLANILLA_PF.diasMin},ISNUMBER(B8),ISNUMBER(B9),B9>=0),1,0)`,
  };
  ws.getCell("N6").value = { formula: `IF(N5=1,INT(B6),0)` };
  ws.getColumn("N").hidden = true;

  const L = FILAS_ESCALERA;
  const E0 = K.fila0;
  const EN = K.fila0 + K.max - 1;
  celdaEtiqueta(ws, `A${L.parte}`, "Cada escalón");
  salida(ws, `B${L.parte}`, `IF($N$5=1,B5/$N$6,"")`, { fmt: ARS_FMT });
  celdaEtiqueta(ws, `A${L.interes}`, "Interés de la primera vuelta");
  salida(ws, `B${L.interes}`, `IF($N$5=1,SUM(G${E0}:G${EN}),"")`, { fmt: ARS_FMT, total: true });
  celdaEtiqueta(ws, `A${L.lectura}`, "Cómo sigue");
  ws.mergeCells(`B${L.lectura}:I${L.lectura}`);
  salida(
    ws,
    `B${L.lectura}`,
    `IF($N$5=0,"Completá las celdas amarillas de arriba.",IF($N$6=1,"Con un solo escalón es un plazo fijo común: subí la cantidad para escalonarlo.","Vas a tener un vencimiento cada "&B7&" días. Si cada parte que vence la volvés a poner a "&($N$6*B7)&" días, la escalera se mantiene sola."))`,
    { wrap: true },
  );
  ws.getRow(L.lectura).height = 32;

  encabezados(ws, E0 - 1, ["Escalón", "Capital", "Plazo (días)", "TNA de este plazo (opcional)", "TNA que se usa", "Vence el", "Interés", "Cobrás", "Al vencer, renovalo a (días)"], "FF2E7D32", 44);
  for (let k = 1; k <= K.max; k++) {
    const r = E0 + k - 1;
    const fill = k % 2 === 1 ? S.white : S.cebra;
    const vis = `AND($N$5=1,${k}<=$N$6)`;
    salida(ws, `A${r}`, `IF(${vis},"Escalón ${k}","")`, { fill });
    salida(ws, `B${r}`, `IF(${vis},$B$5/$N$6,"")`, { fmt: ARS_FMT, fill });
    salida(ws, `C${r}`, `IF(${vis},${k}*$B$7,"")`, { fmt: "0", fill });
    input(ws, `D${r}`, null, v.tna(), "0.00");
    salida(ws, `E${r}`, `IF(${vis},IF(ISNUMBER(D${r}),D${r},$B$9),"")`, { fmt: "0.00", fill });
    salida(ws, `F${r}`, `IF(${vis},$B$8+C${r},"")`, { fmt: FECHA, fill });
    salida(ws, `G${r}`, `IF(${vis},B${r}*E${r}/100*C${r}/365,"")`, { fmt: ARS_FMT, fill });
    salida(ws, `H${r}`, `IF(${vis},B${r}+G${r},"")`, { fmt: ARS_FMT, fill });
    salida(ws, `I${r}`, `IF(${vis},$N$6*$B$7,"")`, { fmt: "0", fill });
  }
  nota(ws, `A${EN + 2}:I${EN + 2}`, "Cuando armes cada plazo fijo de la escalera, cargalo también en «Mis plazos fijos»: así entra al calendario y al resumen del año.");
  return ws;
}

// ─── Hoja Resumen del año ────────────────────────────────────────────────────

export const FILAS_RESUMEN = { cantidad: 8, capital: 9, intereses: 10, cobrados: 11, real: 12, inflacionAnio: 15, hasta: 16 } as const;

function buildResumen(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(H.resumen, { properties: { tabColor: { argb: GRIS } } });
  ws.columns = [{ width: 50 }, { width: 22 }, { width: 60 }];
  titulo(ws, "A1:C1", "Resumen del año", GRIS);
  subtitulo(ws, "A2:C2", "Junta los plazos fijos de «Mis plazos fijos» que vencen en el año que elijas.");
  celdaEtiqueta(ws, "A5", "Año");
  input(ws, PLANILLA_PF.resumen.anio, Number(hoyAR().slice(0, 4)), v.entero(2017, 2040, "Escribí el año con cuatro cifras."), "0");

  const L = FILAS_RESUMEN;
  const anio = "$B$5";
  bandaSeccion(ws, "A7:B7", "TUS PLAZOS FIJOS QUE VENCEN EN EL AÑO");
  const filas: [number, string, string, string, boolean?][] = [
    [L.cantidad, "Cantidad", `COUNTIFS(${rango(AUX.anio)},${anio})`, "0"],
    [L.capital, "Capital que pusiste", `SUMIFS(${rango(C.capital)},${rango(AUX.anio)},${anio})`, ARS_FMT],
    [L.intereses, "Intereses (cobrados y por cobrar)", `SUMIFS(${rango(C.interes)},${rango(AUX.anio)},${anio})`, ARS_FMT, true],
    [L.cobrados, "Intereses ya cobrados al día de hoy", `SUMIFS(${rango(AUX.cobrado)},${rango(AUX.anio)},${anio})`, ARS_FMT],
    [L.real, "Ganancia real, en pesos del día en que los armaste", `SUMIFS(${rango(AUX.real)},${rango(AUX.anio)},${anio})`, ARS_FMT, true],
  ];
  for (const [f, et, fo, fmt, tot] of filas) {
    celdaEtiqueta(ws, `A${f}`, et);
    salida(ws, `B${f}`, fo, { fmt, total: tot });
  }
  const ay = ws.getCell(`C${L.real}`);
  ay.value = "Lo que cobrás descontada la inflación de cada plazo. Si da negativo, la inflación se comió más que los intereses.";
  ay.font = { size: 9, color: { argb: "FF777777" } };
  ay.alignment = { vertical: "middle", indent: 1, wrapText: true };
  ws.getRow(L.real).height = 30;

  bandaSeccion(ws, "A14:B14", "LA INFLACIÓN DEL AÑO (IPC DEL INDEC)");
  const mFin = `MIN(${anio}*12+11,${R_MULT})`;
  const ok = `AND(${anio}*12-1>=${R_MBASE},${mFin}>=${anio}*12)`;
  celdaEtiqueta(ws, `A${L.inflacionAnio}`, "Inflación acumulada del año");
  salida(ws, `B${L.inflacionAnio}`, `IF(${ok},${IDX(mFin)}/${IDX(`${anio}*12-1`)}-1,"")`, { fmt: PCT });
  celdaEtiqueta(ws, `A${L.hasta}`, "Con datos hasta");
  salida(ws, `B${L.hasta}`, `IF(${ok},${T(mFin)},"Todavía no hay IPC publicado de ese año")`);
  ws.getRow(L.hasta).height = 30;
  ws.getCell(`B${L.hasta}`).alignment = { wrapText: true, vertical: "middle", horizontal: "left", indent: 1 };

  bandaSeccion(ws, "A18:C18", "IMPUESTOS · LO QUE DICE LA LEY (DATO, NO CONSEJO)");
  nota(ws, "A19:C19", "Ganancias: los intereses de plazos fijos de personas humanas están exentos (Ley de Impuesto a las Ganancias, t.o. 2019, art. 26 inc. h; texto según la Ley 27.802, B.O. 6/3/2026).");
  nota(ws, "A20:C20", "Bienes Personales: los depósitos a plazo fijo están exentos (Ley 23.966, art. 21 inc. h). Si tenés dudas sobre tu situación, consultalo con tu contador.");
  ws.getRow(19).height = 30;
  ws.getRow(20).height = 30;
  return ws;
}

// ─── Hoja Cómo usarla ────────────────────────────────────────────────────────

function buildInicio(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(H.inicio, { properties: { tabColor: { argb: NARANJA } } });
  ws.columns = [{ width: 4 }, { width: 110 }];
  titulo(ws, "A1:B1", "Cómo usar la planilla de plazos fijos", NARANJA);
  const pasos: [string, string][] = [
    ["1", `En «${H.registro}» reemplazá las filas de ejemplo con tus plazos fijos: banco, fecha en que lo armaste, capital, TNA y días. Entran ${R.filas}, de todos los bancos que uses.`],
    ["2", "Cada fila te dice cuándo vence, cuánto cobrás, la TEA y si le ganó a la inflación. Cuando el INDEC ya publicó los meses del plazo, usa el IPC oficial; si no, la inflación que estimás en la celda B5."],
    ["3", `«${H.calendario}» ordena los vigentes por fecha y te dice cuánto se acredita cada mes de los próximos doce.`],
    ["4", `«${H.renovacion}», «${H.uva}» y «${H.escalera}» son simuladores: probá renovar todo un año, comparar con un UVA al mismo plazo o partir el capital en escalones.`],
    ["5", `«${H.resumen}» junta lo del año: intereses, ganancia real y la inflación oficial. «${H.ipc}» y «${H.fuentes}» muestran de dónde sale cada dato.`],
  ];
  pasos.forEach(([n, t], i) => {
    const r = 3 + i;
    const nc = ws.getCell(r, 1);
    nc.value = n;
    nc.font = { bold: true, color: { argb: "FFFFFFFF" } };
    nc.fill = relleno(NARANJA);
    nc.alignment = { horizontal: "center", vertical: "middle" };
    const tc = ws.getCell(r, 2);
    tc.value = t;
    tc.alignment = { wrapText: true, vertical: "middle", indent: 1 };
    ws.getRow(r).height = 36;
  });

  let r = 3 + pasos.length + 1;
  bandaSeccion(ws, `A${r}:B${r}`, "COLORES");
  r++;
  for (const [fill, t] of [
    [S.input, "Amarillo: lo completás vos."],
    [S.output, "Verde: lo calcula la planilla. Están protegidas para que no se pisen sin querer (Revisar > Desproteger hoja, si alguna vez lo necesitás)."],
  ] as const) {
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
    "El interés de un plazo fijo tradicional es simple, sobre un año de 365 días: capital × TNA × días ÷ 365. La TEA es lo que rendiría en un año renovando capital + intereses en cada vencimiento.",
    "La tasa real es la que importa para tu bolsillo: lo que cobrás descontada la inflación del período. Una TNA alta puede tener tasa real negativa si la inflación fue mayor.",
    `TNA de referencia: el promedio que pagan los bancos por depósitos a 30 días, publicado por el BCRA (${TNA_FALLBACK.valor.toLocaleString("es-AR")}% al ${fechaCorta(TNA_FALLBACK.fechaISO)}). Tu banco puede pagar más o menos: cargá siempre la tuya.`,
    `Plazo fijo UVA (Com. «A» 8246 del BCRA): mínimo ${UVA.plazoMinimoDias} días, precancelable desde el día ${UVA.precancelableDesdeDia} sin el ajuste por inflación.`,
    `Garantía de los depósitos: hasta $ ${GARANTIA_DEPOSITOS.monto.toLocaleString("es-AR")} por persona desde el ${GARANTIA_DEPOSITOS.vigenciaDesde} (Com. «A» 8407 del BCRA). La columna «Garantía» de «${H.registro}» te avisa si en un banco te pasás del tope.`,
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
  for (const t of [
    "El enlace de descarga que te llegó por mail no vence y siempre baja la última versión, con el IPC y la TNA de referencia al día. Para pasar tus plazos fijos: copiá las celdas amarillas de «Mis plazos fijos» y pegalas en el mismo lugar del archivo nuevo.",
    "¿Preferís no cambiar de archivo? Cuando salga un IPC nuevo, cargá el % del mes en la columna amarilla de la hoja «IPC»: las filas que estaban estimadas pasan solas al dato oficial.",
  ]) {
    const c = ws.getCell(r, 2);
    c.value = `•  ${t}`;
    c.alignment = { wrapText: true, vertical: "top", indent: 1 };
    ws.getRow(r).height = 34;
    r++;
  }
  r++;
  nota(ws, `A${r}:B${r}`, "Es una herramienta de cálculo y control: no es asesoramiento financiero ni recomienda bancos ni productos. Da los mismos números que la calculadora gratuita de calcular.ar/plazo-fijo; si alguna vez no coinciden, escribinos y lo corregimos.");
  ws.getRow(r).height = 30;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export async function generarPlanillaPlazoFijo(): Promise<string> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "CalculAR (calcular.ar)";
  wb.title = "Planilla de plazos fijos 2026";
  wb.subject = "Registro de plazos fijos con tasa real contra el IPC del INDEC, calendario, renovación, UVA y escalera";
  wb.keywords = "plazo fijo, tna, tea, inflación, ipc, uva, vencimientos, planilla";

  buildInicio(wb);
  const hojas = [buildRegistro(wb), buildCalendario(wb), buildRenovacion(wb), buildUva(wb), buildEscalera(wb), buildResumen(wb), buildIpc(wb)];
  hojaFuentes(
    wb,
    [PLAZOFIJO_FUENTES.bcraTasa, PLAZOFIJO_FUENTES.comunicacionUva, PLAZOFIJO_FUENTES.garantia, INFLACION_FUENTES.ipc, PLAZOFIJO_FUENTES.ganancias],
    PLAZOFIJO_FUENTES.consultadoEl,
    [],
    `Planilla de calcular.ar. Serie del IPC descargada el ${fechaCorta(IPC_DESCARGADO_EL)}; TNA de referencia del BCRA al ${fechaCorta(TNA_FALLBACK.fechaISO)}. Cada vez que el INDEC publica un IPC nuevo regeneramos el archivo: el mismo enlace de descarga te baja la versión al día, sin costo.`,
  );
  for (const ws of hojas) await proteger(ws);
  wb.views = [{ x: 0, y: 0, width: 20000, height: 12000, firstSheet: 0, activeTab: 1, visibility: "visible" }];

  const dir = path.join(process.cwd(), "private");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const salidaArchivo = path.join(dir, PLANILLA_PF.archivo);
  await wb.xlsx.writeFile(salidaArchivo);
  return salidaArchivo;
}

if (process.argv[1] && /gen_planilla_plazo_fijo\.ts$/.test(process.argv[1])) {
  generarPlanillaPlazoFijo()
    .then((ruta) => {
      console.log(`Planilla de plazos fijos generada: ${ruta}`);
      console.log(`   IPC hasta ${nombrePeriodo(ULTIMO_PERIODO)} · TNA ref ${TNA_FALLBACK.valor}% (${TNA_FALLBACK.fechaISO}) · ${R.filas} plazos fijos`);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
