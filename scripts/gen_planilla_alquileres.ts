/**
 * Genera private/planilla-alquileres-2026.xlsx — la planilla paga de la calculadora de ajuste de
 * alquiler (/inflacion/alquiler).
 *
 * INVARIANTE: la serie del IPC NO se escribe a mano. Sale de src/data/ipc-serie.ts, la misma que
 * usa la calculadora gratis y que el workflow datos-vivos regenera cada mes. Como esto corre en el
 * prebuild, cada deploy con un IPC nuevo deja el entregable al día sin que nadie se acuerde.
 * scripts/check_planilla_alquileres.ts evalúa el archivo con HyperFormula y lo compara contra
 * ajustesAlquiler(): si la planilla y la calculadora no dan lo mismo, el árbol se pone rojo.
 *
 * Fórmulas: sólo funciones de Excel 2007 que también existen en Google Sheets y en HyperFormula
 * (nada de TEXT/FIXED: los dos dependen del idioma del Excel de quien abre el archivo; los montos
 * dentro de los textos se arman con separadores a mano, ver `miles`). Las fechas son mes + año
 * en celdas separadas y no fechas de Excel, para no depender de si el Excel lee dd/mm o mm/dd.
 *
 * Uso: npx -y tsx scripts/gen_planilla_alquileres.ts
 */

import ExcelJS from "exceljs";
import path from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import { IPC_SERIE, IPC_DESCARGADO_EL } from "../src/data/ipc-serie";
import { INFLACION_FUENTES, IPC_DIA_PUBLICACION } from "../src/data/inflacion";
import { MESES_LARGOS, nombrePeriodo, sumarMeses, ULTIMO_PERIODO } from "../src/lib/inflacion";
import { PLANILLA_ALQ, hojaContrato } from "../src/lib/prefill/alquileres";
import {
  ARS_FMT,
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

const H = PLANILLA_ALQ.hojas;
const C = PLANILLA_ALQ.celdas;
const O = PLANILLA_ALQ.opciones;
const N_CONTRATOS = PLANILLA_ALQ.contratos;
const KMAX = PLANILLA_ALQ.kmax;
const F0 = PLANILLA_ALQ.filaCronograma0;
const F_FIN = F0 + KMAX;

const VERDE = "FF1B5E20";
const AZUL = "FF1565C0";
const NARANJA = "FFF57C00";
const PCT_FMT = "0.00%";

// ─── Serie del IPC: de dic-2016 (base) a dic-2030. Lo publicado va como número fijo; los meses
// futuros son fórmulas que se completan si la persona carga el % del mes (columna F).
const PRIMER_PERIODO = IPC_SERIE[0][0];
if (PRIMER_PERIODO !== "2016-12") throw new Error(`La serie del IPC arranca en ${PRIMER_PERIODO}, se esperaba 2016-12`);
const ULTIMO_FILA_PERIODO = "2030-12";
const M_BASE = 2016 * 12 + 11;
const IPC_F0 = 5;
const PERIODOS: string[] = [];
for (let p = PRIMER_PERIODO; p <= ULTIMO_FILA_PERIODO; p = sumarMeses(p, 1)) PERIODOS.push(p);
const IPC_FIN = IPC_F0 + PERIODOS.length - 1;

// Referencias absolutas a la hoja IPC que usan todas las fórmulas.
const R_MESES = `${H.ipc}!$J$5:$J$16`;
const R_MBASE = `${H.ipc}!$J$2`;
const R_MULT = `${H.ipc}!$J$3`;
const R_INDICES = `${H.ipc}!$D$${IPC_F0}:$D$${IPC_FIN}`;

/** Texto «septiembre de 2026» de un número de mes absoluto (año × 12 + mes − 1). */
const T = (m: string) => `INDEX(${R_MESES},MOD(${m},12)+1)&" de "&INT((${m})/12)`;
/** Índice del IPC de un mes absoluto. */
const IDX = (m: string) => `INDEX(${R_INDICES},(${m})-${R_MBASE}+1)`;

/** Entero no negativo con punto de miles («1.234.567»), sin depender del idioma del Excel.
 *  `ref` tiene que ser una celda que ya tenga el número redondeado. */
function miles(ref: string): string {
  const g = (div: number) => `RIGHT("00"&INT(MOD(${ref},${div * 1000})/${div}),3)`;
  return (
    `IF(${ref}>=1000000000,INT(${ref}/1000000000)&"."&${g(1000000)}&"."&${g(1000)}&"."&${g(1)},` +
    `IF(${ref}>=1000000,INT(${ref}/1000000)&"."&${g(1000)}&"."&${g(1)},` +
    `IF(${ref}>=1000,INT(${ref}/1000)&"."&${g(1)},""&${ref})))`
  );
}

const hojaQ = (nombre: string) => (/[^A-Za-z0-9_]/.test(nombre) ? `'${nombre}'` : nombre);

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

function salida(ws: ExcelJS.Worksheet, ref: string, formula: string, opts: { fmt?: string; total?: boolean; wrap?: boolean } = {}) {
  const c = ws.getCell(ref);
  c.value = { formula };
  c.fill = opts.total ? S.total : S.output;
  c.border = BORDE;
  if (opts.fmt) c.numFmt = opts.fmt;
  c.font = opts.total ? { bold: true } : {};
  c.alignment = opts.wrap
    ? { wrapText: true, vertical: "top", horizontal: "left", indent: 1 }
    : opts.fmt
      ? { horizontal: "right" }
      : { horizontal: "left", indent: 1 };
  return c;
}

function oculta(ws: ExcelJS.Worksheet, ref: string, formula: string | number | string[]) {
  const c = ws.getCell(ref);
  c.value = typeof formula === "string" ? { formula } : (formula as number);
  return c;
}

async function proteger(ws: ExcelJS.Worksheet) {
  // Sin contraseña a propósito: protege de pisar una fórmula sin querer, no de quien sabe lo
  // que hace. Revisar > Desproteger hoja la libera.
  await ws.protect("", {
    selectLockedCells: true,
    selectUnlockedCells: true,
    formatColumns: true,
    formatRows: true,
  });
}

// ─── Hoja IPC ────────────────────────────────────────────────────────────────

function buildIpc(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(H.ipc, { properties: { tabColor: { argb: AZUL } } });
  ws.columns = [{ width: 24 }, { width: 6 }, { width: 6 }, { width: 18 }, { width: 16 }, { width: 22 }, { width: 18 }, { width: 2 }, { width: 2 }, { width: 14 }];

  titulo(ws, "A1:G1", "IPC Nacional del INDEC — nivel general (base diciembre 2016 = 100)", AZUL);
  ws.mergeCells("A2:G2");
  const sub = ws.getCell("A2");
  sub.value = `Serie oficial descargada el ${IPC_DESCARGADO_EL} de la API de series de tiempo del Estado (datos.gob.ar). Último dato: ${nombrePeriodo(ULTIMO_PERIODO)}. Si ya salió un mes que acá no está, cargá su % en la columna amarilla.`;
  sub.font = { italic: true, size: 9, color: { argb: "FF555555" } };
  sub.alignment = { wrapText: true, vertical: "top" };
  ws.getRow(2).height = 30;

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
      dc.fill = fill;
      ec.value = i === 0 ? null : { formula: `D${r}/D${r - 1}-1` };
      ec.fill = fill;
      fc.fill = S.label;
      gc.value = "INDEC";
      gc.fill = fill;
    } else {
      dc.value = { formula: `IF(OR(F${r}="",D${r - 1}=""),"",D${r - 1}*(1+F${r}/100))` };
      dc.fill = fill;
      ec.value = { formula: `IF(D${r}="","",D${r}/D${r - 1}-1)` };
      ec.fill = fill;
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
      gc.fill = fill;
    }
    dc.numFmt = "#,##0.0000";
    ec.numFmt = "0.0%";
    for (const c of [dc, ec, fc, gc]) c.border = BORDE;
  });

  // Auxiliares (columna J, oculta): mes base, último mes con índice, nombres de los meses.
  ws.getCell("J2").value = M_BASE;
  ws.getCell("J3").value = { formula: `J2+COUNT(D${IPC_F0}:D${IPC_FIN})-1` };
  ws.getCell("J4").value = { formula: T("J3") };
  MESES_LARGOS.forEach((m, i) => (ws.getCell(`J${5 + i}`).value = m));
  ws.getColumn("J").hidden = true;

  ws.views = [{ state: "frozen", ySplit: 4 }];
  return ws;
}

// ─── Hoja Contrato N ─────────────────────────────────────────────────────────

function buildContrato(wb: ExcelJS.Workbook, n: number) {
  const ws = wb.addWorksheet(hojaContrato(n), { properties: { tabColor: { argb: VERDE } } });
  ws.columns = [{ width: 30 }, { width: 24 }, { width: 22 }, { width: 22 }, { width: 13 }, { width: 14 }, { width: 18 }, { width: 46 }];

  titulo(ws, "A1:H1", `Contrato ${n}`, VERDE);
  ws.mergeCells("A2:H2");
  const sub = ws.getCell("A2");
  sub.value =
    n === 1
      ? "Este contrato viene cargado con un ejemplo: reemplazá las celdas amarillas con los datos del tuyo. Las verdes se calculan solas."
      : "Completá las celdas amarillas con los datos del contrato. Las verdes se calculan solas.";
  sub.font = { italic: true, size: 10, color: { argb: "FF555555" } };
  sub.fill = S.label;
  sub.alignment = { horizontal: "center" };

  bandaSeccion(ws, "A4:B4", "DATOS DEL CONTRATO");
  const ej = n === 1;
  const inicioEj = sumarMeses(ULTIMO_PERIODO, -11);
  const [anioEj, mesEj] = inicioEj.split("-").map(Number);

  const filas: [string, string, string | number | null, ExcelJS.DataValidation | undefined, string | undefined][] = [
    [C.propiedad, "Propiedad (dirección)", ej ? "Av. Corrientes 1234, 3° B (ejemplo)" : null, undefined, undefined],
    [C.inquilino, "Inquilino/a", ej ? "Laura Gómez (ejemplo)" : null, undefined, undefined],
    [C.propietario, "Tu nombre (para el recibo y el aviso)", null, undefined, undefined],
    [C.mes, "Mes de inicio del contrato", ej ? MESES_LARGOS[mesEj - 1] : null, desplegable(MESES_LARGOS, "Elegí un mes de la lista."), undefined],
    [C.anio, "Año de inicio", ej ? anioEj : null, {
      type: "whole", operator: "between", allowBlank: true, showErrorMessage: true, formulae: [2017, 2040],
      error: "Escribí el año con cuatro cifras, entre 2017 y 2040.",
    }, "0"],
    [C.duracion, "Duración (meses)", 24, {
      type: "whole", operator: "between", allowBlank: false, showErrorMessage: true, formulae: [1, PLANILLA_ALQ.duracionMax],
      error: `La duración va en meses, entre 1 y ${PLANILLA_ALQ.duracionMax}. Un contrato de dos años son 24.`,
    }, "0"],
    [C.alquiler, "Alquiler inicial (el del primer mes)", ej ? 500000 : null, {
      type: "decimal", operator: "between", allowBlank: true, showErrorMessage: true, formulae: [1, 10000000000],
      error: "Escribí el alquiler del primer mes, sin puntos ni signo $. Por ejemplo: 500000.",
    }, ARS_FMT],
    [C.indice, "Índice de ajuste", O.indiceIpc, desplegable([O.indiceIpc, O.indiceOtro], "Elegí una opción de la lista."), undefined],
    [C.cada, "Se ajusta cada (meses)", 3, {
      type: "whole", operator: "between", allowBlank: false, showErrorMessage: true, formulae: [1, 12],
      error: "Escribí cada cuántos meses se ajusta: 3, 4, 6 o 12 son los más comunes.",
    }, "0"],
    [C.convencion, "Meses del IPC que toma", O.convCompletos, desplegable([O.convCompletos, O.convPublicados], "Elegí una opción de la lista."), undefined],
  ];
  for (const [ref, etiqueta, valor, v, fmt] of filas) {
    celdaEtiqueta(ws, `A${ref.slice(1)}`, etiqueta);
    input(ws, ref, valor, v, fmt);
  }

  // Ayudas al costado de los datos.
  const ayuda = (fila: number, texto: string) => {
    ws.mergeCells(`C${fila}:H${fila}`);
    const c = ws.getCell(`C${fila}`);
    c.value = texto;
    c.font = { size: 9, color: { argb: "FF777777" } };
    c.alignment = { vertical: "middle", indent: 1, wrapText: true };
  };
  ayuda(8, "El primer mes en que se cobró el valor inicial.");
  ayuda(12, "Si tu contrato ajusta por ICL, Casa Propia u otro índice, elegí «Otro» y cargá el % de cada ajuste en el cronograma (columna F).");
  ayuda(13, "Trimestral = 3, cuatrimestral = 4, semestral = 6, anual = 12.");
  ayuda(14, "«Completos»: un ajuste de julio usa el IPC de abril a junio (como la calculadora de calcular.ar). «Últimos publicados»: usa el de marzo a mayo, porque el de junio sale a mitad de julio. Fijate qué dice tu contrato.");
  ws.getRow(14).height = 42;
  ws.getRow(12).height = 30;

  // ── Auxiliares (columnas J a N, ocultas) ──
  const N = (r: number) => `$N$${r}`;
  oculta(ws, "N6", `IFERROR(MATCH(${C.mes},${R_MESES},0),0)`);
  oculta(ws, "N5", `IF(AND(N6>0,ISNUMBER(${C.anio}),ISNUMBER(${C.alquiler}),${C.alquiler}>0,ISNUMBER(${C.cada}),${C.cada}>=1,ISNUMBER(${C.duracion}),${C.duracion}>=1),1,0)`);
  oculta(ws, "N7", `IF(N5=1,${C.anio}*12+N6-1,0)`);
  oculta(ws, "N8", `IF(N5=1,INT(${C.cada}),1)`);
  oculta(ws, "N9", `IF(${C.convencion}="${O.convPublicados}",1,0)`);
  oculta(ws, "N10", `IF(${C.indice}="${O.indiceOtro}",0,1)`);
  oculta(ws, "N11", `IF(N5=1,MIN(INT((${C.duracion}-1)/N8),${KMAX}),0)`);
  oculta(ws, "N12", `${R_MULT}`);
  oculta(ws, "N13", `${R_MBASE}`);
  oculta(ws, "N14", `IF(N5=0,0,IF(N10=0,1,IF(AND(N7-1-N9>=N13,N7-1-N9<=N12),1,0)))`);
  oculta(ws, "N15", `COUNT(G${F0 + 1}:G${F_FIN})`);
  oculta(ws, "N16", `IF(N5=1,INDEX(G${F0}:G${F_FIN},N15+1),"")`);
  oculta(ws, "N17", `N15+1`);
  oculta(ws, "N18", `IF(AND(N5=1,N17<=N11),1,0)`);
  oculta(ws, "N19", `N7+N17*N8-1-N9`);
  oculta(ws, "N20", `N19-N12`);
  oculta(ws, "N21", `${IDX("N12")}/${IDX("N12-1")}-1`);
  // Estimación del próximo ajuste: misma regla que la calculadora (última inflación mensual
  // proyectada sobre los meses que faltan, sólo si faltan entre 1 y 12).
  oculta(ws, "N22", `IF(AND(N18=1,N10=1,N14=1,N20>0,N20<=12),N16*${IDX("N12")}*(1+N21)^N20/${IDX("N19-N8")},"")`);
  oculta(ws, "N23", `IF(ISNUMBER(N22),ROUND(N22,0),"")`);
  oculta(ws, "N24", `IF(ISNUMBER(N23),${miles("N23")},"")`);
  for (const col of ["I", "J", "K", "L", "M", "N"]) ws.getColumn(col).hidden = true;

  // ── Cómo viene ──
  ws.getRow(15).height = 6;
  bandaSeccion(ws, "A16:B16", "CÓMO VIENE EL CONTRATO");
  const res: [number, string, string, { fmt?: string; total?: boolean }][] = [
    [17, "Alquiler que se cobra hoy", `N16`, { fmt: ARS_FMT, total: true }],
    [18, "Rige desde", `IF(N5=1,INDEX(B${F0}:B${F_FIN},N15+1),"")`, {}],
    [19, "Ajustes aplicados", `IF(N5=1,N15,"")`, { fmt: "0" }],
    [20, "Aumento desde el inicio", `IF(N5=1,N16/${C.alquiler}-1,"")`, { fmt: "0.0%" }],
    [21, "Próximo ajuste", `IF(N18=1,INDEX(B${F0}:B${F_FIN},N17+1),IF(N5=1,"No quedan ajustes antes de que termine",""))`, {}],
    [22, "Próximo alquiler estimado", `N22`, { fmt: ARS_FMT }],
    [23, "Último mes del contrato", `IF(N5=1,${T(`N7+${C.duracion}-1`)},"")`, {}],
  ];
  for (const [fila, etiqueta, f, o] of res) {
    celdaEtiqueta(ws, `A${fila}`, etiqueta);
    salida(ws, `B${fila}`, f, o);
  }

  celdaEtiqueta(ws, "A24", "Qué hacer ahora");
  ws.mergeCells("B24:H24");
  salida(
    ws,
    "B24",
    `IF(N5=0,"Completá las celdas amarillas de arriba y acá aparece el cronograma de aumentos.",` +
      `IF(N14=0,"Todavía no está publicado el IPC de "&${T("N7-1-N9")}&", que es la base de este contrato. Mientras tanto se cobra el valor inicial.",` +
      `IF(N18=0,"No quedan ajustes: el contrato termina en "&${T(`N7+${C.duracion}-1`)}&".",` +
      `IF(N10=1,"El próximo ajuste rige desde "&B21&". Se calcula cuando el INDEC publique el IPC de "&${T("N19")}&" (sale ${IPC_DIA_PUBLICACION} del mes siguiente)"&IF(ISNUMBER(N22),". Si la inflación siguiera como el último mes, el alquiler quedaría en unos $ "&N24&".","."),` +
      `"El próximo ajuste rige desde "&B21&": cuando lo tengas, cargá el % del índice pactado en la columna F del cronograma."))))`,
    { wrap: true },
  );
  ws.getRow(24).height = 46;

  // ── Cronograma ──
  bandaSeccion(ws, `A26:H26`, "CRONOGRAMA DE AJUSTES");
  ["Ajuste", "Rige desde", "Mes del IPC base", "Mes del IPC final", "Variación", "% a mano (otro índice)", "Alquiler", "Estado"].forEach((h, i) => {
    const c = ws.getCell(27, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno("FF2E7D32");
    c.border = BORDE;
    c.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  });
  ws.getRow(27).height = 30;

  for (let k = 0; k <= KMAX; k++) {
    const r = F0 + k;
    const vis = `AND(${N(5)}=1,${k}<=${N(11)})`;
    const fill = k % 2 === 0 ? S.white : S.cebra;
    // Auxiliares de la fila: mes en que rige, último y primer mes del IPC que usa.
    ws.getCell(`J${r}`).value = { formula: `IF(${N(5)}=1,${N(7)}+${k}*${N(8)},"")` };
    ws.getCell(`K${r}`).value = { formula: `IF(${N(5)}=1,J${r}-1-${N(9)},"")` };
    ws.getCell(`L${r}`).value = { formula: `IF(${N(5)}=1,K${r}-${N(8)},"")` };

    const set = (col: string, v: ExcelJS.CellValue, fmt?: string) => {
      const c = ws.getCell(`${col}${r}`);
      c.value = v;
      c.fill = fill;
      c.border = BORDE;
      if (fmt) {
        c.numFmt = fmt;
        c.alignment = { horizontal: "right" };
      }
      return c;
    };

    if (k === 0) {
      set("A", { formula: `IF(${N(5)}=1,"Valor inicial","")` });
      set("B", { formula: `IF(${N(5)}=1,${T(`J${r}`)},"")` });
      set("C", null);
      set("D", null);
      set("E", null);
      set("F", null).fill = S.label;
      set("G", { formula: `IF(${N(5)}=1,${C.alquiler},"")` }, ARS_FMT);
      set("H", { formula: `IF(${N(5)}=1,"Valor inicial del contrato","")` });
      continue;
    }
    set("A", { formula: `IF(${vis},"${k}° ajuste","")` });
    set("B", { formula: `IF(${vis},${T(`J${r}`)},"")` });
    set("C", { formula: `IF(AND(${vis},${N(10)}=1),${T(`L${r}`)},"")` });
    set("D", { formula: `IF(AND(${vis},${N(10)}=1),${T(`K${r}`)},"")` });
    set(
      "E",
      {
        formula:
          `IF(NOT(${vis}),"",IF(${N(10)}=1,IF(AND(${N(14)}=1,K${r}<=${N(12)}),${IDX(`K${r}`)}/${IDX(`L${r}`)}-1,""),` +
          `IF(ISNUMBER(F${r}),F${r}/100,"")))`,
      },
      PCT_FMT,
    );
    const f = set("F", null, "0.00");
    f.fill = S.input;
    f.dataValidation = {
      type: "decimal",
      operator: "between",
      allowBlank: true,
      showErrorMessage: true,
      formulae: [-90, 500],
      error: "Cargá el % del ajuste como número: por ejemplo 9,32 para 9,32%.",
    };
    desbloquear(f);
    set("G", { formula: `IF(AND(${vis},ISNUMBER(G${r - 1}),ISNUMBER(E${r})),G${r - 1}*(1+E${r}),"")` }, ARS_FMT);
    set(
      "H",
      {
        formula:
          `IF(NOT(${vis}),"",IF(ISNUMBER(G${r}),"Aplicado",IF(ISNUMBER(G${r - 1}),` +
          `IF(${N(10)}=1,"Falta el IPC de "&${T(`${N(12)}+1`)},"Cargá el % de este ajuste en la columna F"),"")))`,
      },
    );
  }

  nota(
    ws,
    `A${F_FIN + 2}:H${F_FIN + 2}`,
    "Cada ajuste multiplica el alquiler vigente por la variación del índice del período: IPC del último mes ÷ IPC del mes anterior al primero. Los porcentajes se componen, no se suman. La letra de tu contrato manda: si dice otra cosa, ajustá el índice o la convención de arriba.",
  );
  ws.getRow(F_FIN + 2).height = 40;

  ws.views = [{ state: "frozen", ySplit: 3 }];
  return ws;
}

// ─── Hoja Mis contratos (tablero) ────────────────────────────────────────────

function buildTablero(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(H.tablero, { properties: { tabColor: { argb: VERDE } } });
  ws.columns = [{ width: 13 }, { width: 30 }, { width: 22 }, { width: 17 }, { width: 20 }, { width: 22 }, { width: 17 }, { width: 62 }];

  titulo(ws, "A1:H1", "Mis contratos de alquiler", VERDE);
  ws.mergeCells("A2:H2");
  const sub = ws.getCell("A2");
  sub.value = { formula: `"IPC oficial del INDEC cargado hasta "&${H.ipc}!$J$4&". Cuando salga el siguiente, bajá la versión nueva desde el mismo enlace o cargalo en la hoja IPC."` };
  sub.font = { italic: true, size: 10, color: { argb: "FF555555" } };
  sub.fill = S.label;
  sub.alignment = { horizontal: "center" };

  ["Contrato", "Propiedad", "Inquilino/a", "Alquiler hoy", "Rige desde", "Próximo ajuste", "Próximo estimado", "Qué hacer"].forEach((h, i) => {
    const c = ws.getCell(4, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno("FF2E7D32");
    c.border = BORDE;
    c.alignment = { horizontal: "center", vertical: "middle" };
  });
  ws.getRow(4).height = 22;

  for (let n = 1; n <= N_CONTRATOS; n++) {
    const r = 4 + n;
    const h = hojaQ(hojaContrato(n));
    const fill = n % 2 === 1 ? S.white : S.cebra;
    const cel = (col: string, v: ExcelJS.CellValue, fmt?: string, wrap = false) => {
      const c = ws.getCell(`${col}${r}`);
      c.value = v;
      c.fill = fill;
      c.border = BORDE;
      if (fmt) c.numFmt = fmt;
      c.alignment = { vertical: "middle", wrapText: wrap, horizontal: fmt ? "right" : "left", indent: fmt ? 0 : 1 };
    };
    cel("A", hojaContrato(n));
    cel("B", { formula: `IF(${h}!$B$5="","",${h}!$B$5&"")` }, undefined, true);
    cel("C", { formula: `IF(${h}!$B$6="","",${h}!$B$6&"")` });
    cel("D", { formula: `${h}!$B$17` }, ARS_FMT);
    cel("E", { formula: `${h}!$B$18&""` });
    cel("F", { formula: `${h}!$B$21&""` }, undefined, true);
    cel("G", { formula: `${h}!$B$22` }, ARS_FMT);
    cel("H", { formula: `IF(${h}!$N$5=1,${h}!$B$24,"Sin cargar todavía: completá la hoja «${hojaContrato(n)}».")` }, undefined, true);
    ws.getRow(r).height = 48;
  }

  const r0 = 5 + N_CONTRATOS + 1;
  nota(ws, `A${r0}:H${r0}`, "Esta hoja no se completa: junta lo que cargaste en cada «Contrato». Para el recibo del mes andá a la hoja «Recibo»; para avisarle el aumento a tu inquilino, a «Aviso de aumento».");
  ws.getRow(r0).height = 28;
  ws.views = [{ state: "frozen", ySplit: 4 }];
  return ws;
}

// ─── Selector de contrato (Recibo y Aviso) ──────────────────────────────────

const LISTA_CONTRATOS = Array.from({ length: N_CONTRATOS }, (_, i) => hojaContrato(i + 1));

/** Valor de una celda del contrato elegido (el número de contrato está en $N$5). */
const pick = (ref: string) => `CHOOSE($N$5,${LISTA_CONTRATOS.map((h) => `${hojaQ(h)}!${ref}`).join(",")})`;
const pickIndex = (col: string, fila: string) =>
  `CHOOSE($N$5,${LISTA_CONTRATOS.map((h) => `INDEX(${hojaQ(h)}!$${col}$${F0}:$${col}$${F_FIN},${fila})`).join(",")})`;

function selectorContrato(ws: ExcelJS.Worksheet, fila: number) {
  celdaEtiqueta(ws, `A${fila}`, "Contrato");
  input(ws, `B${fila}`, LISTA_CONTRATOS[0], desplegable(LISTA_CONTRATOS, "Elegí un contrato de la lista."));
  LISTA_CONTRATOS.forEach((h, i) => (ws.getCell(`J${5 + i}`).value = h));
  ws.getCell("N5").value = { formula: `IFERROR(MATCH(B${fila},$J$5:$J$${4 + N_CONTRATOS},0),0)` };
  ws.getCell("N6").value = { formula: `IF($N$5=0,0,${pick("$N$5")})` };
}

// ─── Hoja Recibo ─────────────────────────────────────────────────────────────

export const CELDAS_RECIBO = {
  contrato: "B4",
  mes: "B5",
  anio: "B6",
  numero: "B7",
  fecha: "B8",
  expensas: "B9",
  otros: "B10",
  otrosDetalle: "B11",
  forma: "B12",
  estado: "A13",
  alquiler: "N14",
  total: "N15",
  frase: "A18",
} as const;

function buildRecibo(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(H.recibo, { properties: { tabColor: { argb: NARANJA } } });
  ws.columns = [{ width: 26 }, { width: 26 }, { width: 14 }, { width: 14 }, { width: 14 }, { width: 14 }];

  titulo(ws, "A1:F1", "Recibo de alquiler", NARANJA);
  bandaSeccion(ws, "A3:B3", "DATOS DEL RECIBO");
  selectorContrato(ws, 4);
  const mesDefecto = sumarMeses(ULTIMO_PERIODO, 1);
  const [anioDef, mesDef] = mesDefecto.split("-").map(Number);
  const entradas: [string, string, string | number | null, ExcelJS.DataValidation | undefined, string | undefined][] = [
    ["B5", "Mes que se paga", MESES_LARGOS[mesDef - 1], desplegable(MESES_LARGOS, "Elegí un mes de la lista."), undefined],
    ["B6", "Año", anioDef, { type: "whole", operator: "between", allowBlank: false, showErrorMessage: true, formulae: [2017, 2040], error: "Escribí el año con cuatro cifras." }, "0"],
    ["B7", "Recibo N°", 1, undefined, "0"],
    ["B8", "Fecha de pago", null, undefined, undefined],
    ["B9", "Expensas (si las cobrás junto)", 0, { type: "decimal", operator: "greaterThanOrEqual", allowBlank: true, showErrorMessage: true, formulae: [0], error: "Escribí un importe sin signo $." }, ARS_FMT],
    ["B10", "Otros conceptos (importe)", 0, { type: "decimal", operator: "greaterThanOrEqual", allowBlank: true, showErrorMessage: true, formulae: [0], error: "Escribí un importe sin signo $." }, ARS_FMT],
    ["B11", "Detalle de otros conceptos", null, undefined, undefined],
    ["B12", "Forma de pago", "Transferencia", desplegable(["Transferencia", "Efectivo", "Depósito", "Otra"], "Elegí una opción de la lista."), undefined],
  ];
  for (const [ref, etiqueta, valor, v, fmt] of entradas) {
    celdaEtiqueta(ws, `A${ref.slice(1)}`, etiqueta);
    input(ws, ref, valor, v, fmt);
  }
  ws.getCell("C8").value = "Ej.: 10/10/2026";
  ws.getCell("C8").font = { size: 9, color: { argb: "FF777777" } };

  // Auxiliares (ocultas).
  oculta(ws, "N7", pick("$N$7"));
  oculta(ws, "N8", pick("$N$8"));
  oculta(ws, "N9", pick("$B$10"));
  oculta(ws, "N10", pick("$N$15"));
  oculta(ws, "N11", `IFERROR(B6*12+MATCH(B5,${R_MESES},0)-1,0)`);
  oculta(ws, "N12", `IF(N6=1,INT((N11-N7)/N8),0)`);
  oculta(ws, "N13", `IF(AND(N6=1,N11>=N7,N11<=N7+N9-1),1,0)`);
  oculta(ws, "N14", `IF(AND(N13=1,N12<=N10),${pickIndex("G", "N12+1")},"")`);
  oculta(ws, "N15", `IF(ISNUMBER(N14),N14+IF(ISNUMBER(B9),B9,0)+IF(ISNUMBER(B10),B10,0),"")`);
  oculta(ws, "N16", `IF(ISNUMBER(N15),ROUND(N15,0),"")`);
  oculta(ws, "N17", `IF(ISNUMBER(N16),${miles("N16")},"")`);
  oculta(ws, "N18", T("N11"));
  oculta(ws, "N19", `IF(N6=1,${pick("$B$6")}&"","")`);
  oculta(ws, "N20", `IF(N6=1,${pick("$B$5")}&"","")`);
  oculta(ws, "N21", `IF(N6=1,${pick("$B$7")}&"","")`);
  ws.getColumn("J").hidden = true;
  ws.getColumn("N").hidden = true;

  ws.mergeCells("A13:F13");
  salida(
    ws,
    "A13",
    `IF(N6<>1,"Ese contrato está vacío: completá primero su hoja.",` +
      `IF(N13<>1,"Ese mes está fuera del contrato: va de "&${T("N7")}&" a "&${T("N7+N9-1")}&".",` +
      `IF(N12>N10,"Todavía no se puede calcular el alquiler de "&N18&": falta el índice del ajuste que rige ese mes.",` +
      `"Listo para imprimir: abajo hay dos copias, una para tu inquilino y otra para vos.")))`,
    { wrap: true },
  );
  ws.getRow(13).height = 30;

  const copia = (s: number, rotulo: string) => {
    titulo(ws, `A${s}:F${s}`, rotulo, "FF37474F");
    ws.mergeCells(`A${s + 1}:C${s + 1}`);
    ws.getCell(`A${s + 1}`).value = { formula: `"Recibo N° "&$B$7` };
    ws.getCell(`A${s + 1}`).font = { bold: true };
    ws.mergeCells(`D${s + 1}:F${s + 1}`);
    ws.getCell(`D${s + 1}`).value = { formula: `"Fecha: "&IF($B$8="","____ / ____ / ______",$B$8&"")` };
    ws.getCell(`D${s + 1}`).alignment = { horizontal: "right" };

    ws.mergeCells(`A${s + 3}:F${s + 5}`);
    const fr = ws.getCell(`A${s + 3}`);
    fr.value = {
      formula:
        `"Recibí de "&IF($N$19="","______________________",$N$19)&" la suma de $ "&IF(ISNUMBER($N$16),$N$17,"__________")` +
        `&" por el alquiler de "&$N$18&" del inmueble de "&IF($N$20="","______________________",$N$20)&", según el detalle de abajo."`,
    };
    fr.alignment = { wrapText: true, vertical: "top" };

    const linea = (r: number, concepto: ExcelJS.CellValue, importe: ExcelJS.CellValue, total = false) => {
      ws.mergeCells(`A${r}:D${r}`);
      ws.mergeCells(`E${r}:F${r}`);
      const a = ws.getCell(`A${r}`);
      a.value = concepto;
      a.border = BORDE;
      a.fill = total ? S.total : S.white;
      a.alignment = { indent: 1 };
      const e = ws.getCell(`E${r}`);
      e.value = importe;
      e.numFmt = ARS_FMT;
      e.border = BORDE;
      e.fill = total ? S.total : S.white;
      e.alignment = { horizontal: "right" };
      if (total) a.font = e.font = { bold: true };
    };
    linea(s + 7, "Concepto", "Importe");
    ws.getCell(`A${s + 7}`).font = { bold: true };
    ws.getCell(`E${s + 7}`).font = { bold: true };
    linea(s + 8, { formula: `"Alquiler de "&$N$18` }, { formula: `$N$14` });
    linea(s + 9, "Expensas", { formula: `IF(ISNUMBER($B$9),$B$9,0)` });
    linea(s + 10, { formula: `IF($B$11="","Otros conceptos",$B$11&"")` }, { formula: `IF(ISNUMBER($B$10),$B$10,0)` });
    linea(s + 11, "TOTAL", { formula: `$N$15` }, true);
    ws.mergeCells(`A${s + 12}:F${s + 12}`);
    ws.getCell(`A${s + 12}`).value = { formula: `"Forma de pago: "&$B$12` };

    ws.mergeCells(`D${s + 14}:F${s + 14}`);
    ws.getCell(`D${s + 14}`).value = "______________________________";
    ws.getCell(`D${s + 14}`).alignment = { horizontal: "center" };
    ws.mergeCells(`D${s + 15}:F${s + 15}`);
    ws.getCell(`D${s + 15}`).value = { formula: `"Firma y aclaración"&IF($N$21="","",": "&$N$21)` };
    ws.getCell(`D${s + 15}`).alignment = { horizontal: "center" };
    ws.getCell(`D${s + 15}`).font = { size: 9 };
  };
  copia(15, "RECIBO DE ALQUILER · ORIGINAL (para el inquilino)");
  copia(33, "RECIBO DE ALQUILER · DUPLICADO (para vos)");

  ws.pageSetup = {
    paperSize: 9,
    orientation: "portrait",
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 1,
    printArea: "A15:F48",
    margins: { left: 0.5, right: 0.5, top: 0.6, bottom: 0.6, header: 0.3, footer: 0.3 },
  };
  return ws;
}

// ─── Hoja Aviso de aumento ───────────────────────────────────────────────────

export const CELDAS_AVISO = {
  contrato: "B4",
  rige: "B7",
  anterior: "B8",
  nuevo: "B9",
  variacion: "B10",
  mensaje: "A17",
  whatsapp: "A33",
} as const;

function buildAviso(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(H.aviso, { properties: { tabColor: { argb: NARANJA } } });
  ws.columns = [{ width: 30 }, { width: 30 }, { width: 12 }, { width: 12 }, { width: 12 }, { width: 12 }, { width: 12 }, { width: 12 }];

  titulo(ws, "A1:H1", "Aviso de aumento para tu inquilino", NARANJA);
  ws.mergeCells("A2:H2");
  ws.getCell("A2").value = "Elegí el contrato: el aviso se arma con el último ajuste aplicado, la cuenta y la fuente oficial.";
  ws.getCell("A2").font = { italic: true, size: 10, color: { argb: "FF555555" } };
  ws.getCell("A2").fill = S.label;
  ws.getCell("A2").alignment = { horizontal: "center" };
  selectorContrato(ws, 4);

  // Auxiliares (ocultas). $N$4 = el contrato tiene al menos un ajuste aplicado.
  oculta(ws, "N7", `IF(N6=1,${pick("$N$15")},0)`);
  oculta(ws, "N4", `IF(AND(N6=1,N7>=1),1,0)`);
  const si = (f: string) => `IF($N$4=1,${f},"")`;
  oculta(ws, "N8", si(pick("$N$10")));
  oculta(ws, "N9", si(pick("$N$8")));
  oculta(ws, "N11", si(pickIndex("B", "N7+1")));
  oculta(ws, "N12", si(pickIndex("G", "N7")));
  oculta(ws, "N13", si(pickIndex("G", "N7+1")));
  oculta(ws, "N14", si(pickIndex("E", "N7+1")));
  oculta(ws, "N15", si(pickIndex("K", "N7+1")));
  oculta(ws, "N16", si(pickIndex("L", "N7+1")));
  oculta(ws, "N17", `IF(AND($N$4=1,N8=1),${IDX("N15")},"")`);
  oculta(ws, "N18", `IF(AND($N$4=1,N8=1),${IDX("N16")},"")`);
  oculta(ws, "N19", `IF(N6=1,${pick("$B$6")}&"","")`);
  oculta(ws, "N20", `IF(N6=1,${pick("$B$5")}&"","")`);
  oculta(ws, "N21", `IF(N6=1,${pick("$B$7")}&"","")`);
  oculta(ws, "N22", si("ROUND(N12,0)"));
  oculta(ws, "N23", si("ROUND(N13,0)"));
  oculta(ws, "N24", si(miles("N22")));
  oculta(ws, "N25", si(miles("N23")));
  // Porcentaje con dos decimales y coma: «12,56».
  oculta(ws, "N26", si("ROUND(ABS(N14)*10000,0)"));
  oculta(ws, "N27", si(`IF(N14<0,"-","")&INT(N26/100)&","&RIGHT("0"&MOD(N26,100),2)`));
  // Factor del IPC con cuatro decimales e índices con dos.
  oculta(ws, "N28", `IF(ISNUMBER(N17),ROUND(N17/N18*10000,0),"")`);
  oculta(ws, "N29", `IF(ISNUMBER(N28),INT(N28/10000)&","&RIGHT("000"&MOD(N28,10000),4),"")`);
  oculta(ws, "N30", `IF(ISNUMBER(N17),ROUND(N17*100,0),"")`);
  oculta(ws, "N31", `IF(ISNUMBER(N30),INT(N30/100),"")`);
  oculta(ws, "N32", `IF(ISNUMBER(N31),${miles("N31")}&","&RIGHT("0"&MOD(N30,100),2),"")`);
  oculta(ws, "N33", `IF(ISNUMBER(N18),ROUND(N18*100,0),"")`);
  oculta(ws, "N34", `IF(ISNUMBER(N33),INT(N33/100),"")`);
  oculta(ws, "N35", `IF(ISNUMBER(N34),${miles("N34")}&","&RIGHT("0"&MOD(N33,100),2),"")`);
  oculta(ws, "N36", `IF(ISNUMBER(N16),${T("N16")},"")`);
  oculta(ws, "N37", `IF(ISNUMBER(N15),${T("N15")},"")`);
  ws.getColumn("J").hidden = true;
  ws.getColumn("N").hidden = true;

  bandaSeccion(ws, "A6:B6", "EL ÚLTIMO AJUSTE");
  const filas: [number, string, string, { fmt?: string; total?: boolean }][] = [
    [7, "Rige desde", `N11`, {}],
    [8, "Alquiler anterior", `N12`, { fmt: ARS_FMT }],
    [9, "Alquiler nuevo", `N13`, { fmt: ARS_FMT, total: true }],
    [10, "Variación", `N14`, { fmt: PCT_FMT }],
    [11, "Índice", si(`IF(N8=1,"IPC del INDEC","El que pactaron en el contrato")`), {}],
    [12, "Período del IPC", `IF(ISNUMBER(N17),"de "&N36&" a "&N37,"")`, {}],
    [13, "IPC al final del período", `N17`, { fmt: "#,##0.0000" }],
    [14, "IPC al inicio del período", `N18`, { fmt: "#,##0.0000" }],
  ];
  for (const [fila, etiqueta, f, o] of filas) {
    celdaEtiqueta(ws, `A${fila}`, etiqueta);
    salida(ws, `B${fila}`, f, o);
  }

  bandaSeccion(ws, "A16:H16", "MENSAJE PARA TU INQUILINO · copialo y pegalo en un mail, o imprimilo");
  ws.mergeCells("A17:H30");
  const BR = "CHAR(10)";
  const msj = ws.getCell("A17");
  msj.value = {
    formula:
      `IF($N$4<>1,IF($N$6<>1,"Elegí un contrato que ya tenga sus datos cargados.","Este contrato todavía no tuvo ajustes: el mensaje aparece cuando se aplica el primero."),` +
      `IF($N$19="","Hola:","Hola, "&$N$19&":")&${BR}&${BR}&` +
      `"Te escribo por el alquiler"&IF($N$20="",""," de "&$N$20)&". Como dice nuestro contrato, el precio se actualiza cada "&$N$9&IF($N$9=1," mes"," meses")&" según "&IF($N$8=1,"el IPC que publica el INDEC.","el índice que pactamos.")&${BR}&${BR}&` +
      `"Desde "&$N$11&", el alquiler pasa de $ "&$N$24&" a $ "&$N$25&" por mes: "&IF($N$14<0,"una baja","un aumento")&" de "&$N$27&"%."&${BR}&${BR}&` +
      `IF($N$8=1,"La cuenta: el IPC de "&$N$37&" es "&$N$32&" y el de "&$N$36&" es "&$N$35&". Dividiendo uno por el otro da "&$N$29&", o sea "&$N$27&"% de variación. Son los índices oficiales del INDEC (indec.gob.ar)."&${BR}&${BR},"")&` +
      `"Cualquier duda, escribime."&${BR}&"Saludos"&IF($N$21="",".",","&${BR}&$N$21))`,
  };
  msj.alignment = { wrapText: true, vertical: "top" };
  msj.fill = S.output;
  msj.border = BORDE;

  bandaSeccion(ws, "A32:H32", "VERSIÓN CORTA PARA WHATSAPP");
  ws.mergeCells("A33:H36");
  const wa = ws.getCell("A33");
  wa.value = {
    formula:
      `IF($N$4<>1,"",` +
      `"Hola"&IF($N$19="","",", "&$N$19)&". Desde "&$N$11&" el alquiler pasa a $ "&$N$25&" por mes ("&IF($N$14<0,"","+")&$N$27&"%"` +
      `&IF($N$8=1,", ajuste por IPC del INDEC de "&$N$36&" a "&$N$37,"")&"). Cualquier duda, avisame.")`,
  };
  wa.alignment = { wrapText: true, vertical: "top" };
  wa.fill = S.output;
  wa.border = BORDE;

  nota(ws, "A38:H38", "Mandá el aviso antes de que empiece el mes del aumento y guardá una copia. Si tu inquilino quiere revisar la cuenta, los índices están en la hoja «IPC» y en indec.gob.ar.");
  ws.getRow(38).height = 28;

  ws.pageSetup = { paperSize: 9, orientation: "portrait", fitToPage: true, fitToWidth: 1, fitToHeight: 1, printArea: "A16:H30" };
  return ws;
}

// ─── Hoja Cómo usarla ────────────────────────────────────────────────────────

function buildInicio(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(H.inicio, { properties: { tabColor: { argb: NARANJA } } });
  ws.columns = [{ width: 4 }, { width: 108 }];
  titulo(ws, "A1:B1", "Cómo usar la planilla de alquileres", NARANJA);

  const pasos: [string, string][] = [
    ["1", "Abrí la hoja «Contrato 1» y reemplazá el ejemplo con los datos de tu contrato: dirección, inquilino, mes y año de inicio, alquiler inicial, índice y cada cuántos meses se ajusta. Sólo se tocan las celdas amarillas."],
    ["2", `Si alquilás más de una propiedad, usá «Contrato 2», «Contrato 3»… hasta ${N_CONTRATOS}. La hoja «Mis contratos» las junta todas: cuánto cobrás hoy, cuándo toca el próximo aumento y qué hacer.`],
    ["3", "Cuando se aplica un aumento, abrí «Aviso de aumento», elegí el contrato y copiá el mensaje: trae el monto nuevo, la cuenta y la fuente oficial."],
    ["4", "Cada mes, en «Recibo» elegís el contrato y el mes: el importe sale solo. Imprimís la hoja y tenés dos copias, una para tu inquilino y otra para vos."],
    ["5", "La hoja «IPC» tiene la serie oficial del INDEC y la hoja «Fuentes», de dónde sale cada dato."],
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
  const leyenda: [ExcelJS.Fill, string][] = [
    [S.input, "Amarillo: lo completás vos."],
    [S.output, "Verde: lo calcula la planilla. Están protegidas para que no se pisen sin querer (Revisar > Desproteger hoja, si alguna vez lo necesitás)."],
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
    "Desde el DNU 70/2023 el índice y la periodicidad del ajuste se pactan libremente (art. 1199 del Código Civil y Comercial). Lo más común en los contratos nuevos es el IPC del INDEC cada 3 o 4 meses.",
    "El ajuste multiplica el alquiler por la variación del IPC del período. Los porcentajes mensuales se componen, no se suman: tres meses de 2% dan 6,12%, no 6%.",
    `El INDEC publica el IPC de cada mes ${IPC_DIA_PUBLICACION} del mes siguiente. Por eso hay dos formas de tomar los meses: los completos antes del ajuste (la de esta planilla y la de calcular.ar, por defecto) o los últimos publicados, que corren un mes atrás. Elegí la que diga tu contrato en «Meses del IPC que toma».`,
    "Si tu contrato ajusta por ICL (BCRA), Casa Propia u otro índice, elegí «Otro índice» y cargá el % de cada ajuste en el cronograma. El resto (recibo, aviso, tablero) funciona igual.",
    "Los contratos firmados entre julio de 2020 y diciembre de 2023, con la ley 27.551, en general siguen con su esquema original (ajuste anual por ICL) hasta que terminan.",
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
    "El enlace de descarga que te llegó por mail no vence y siempre baja la última versión, con el IPC al día. Para pasar tus contratos: copiá las celdas amarillas de cada «Contrato» y pegalas en el mismo lugar de la versión nueva.",
    "¿Preferís no cambiar de archivo? Cuando salga un IPC nuevo, cargá el % del mes en la columna amarilla de la hoja «IPC» y todo se recalcula.",
  ];
  for (const t of dia) {
    const c = ws.getCell(r, 2);
    c.value = `•  ${t}`;
    c.alignment = { wrapText: true, vertical: "top", indent: 1 };
    ws.getRow(r).height = 34;
    r++;
  }

  r++;
  nota(ws, `A${r}:B${r}`, "Esta planilla da los mismos números que la calculadora gratuita de calcular.ar/inflacion/alquiler: es la misma serie oficial y la misma cuenta. Si alguna vez no coinciden, escribinos y lo corregimos. No es asesoramiento legal: la letra de tu contrato manda.");
  ws.getRow(r).height = 30;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export const ARCHIVO_ALQUILERES = PLANILLA_ALQ.archivo;

export async function generarPlanillaAlquileres(): Promise<string> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "CalculAR (calcular.ar)";
  wb.title = "Planilla de alquileres 2026";
  wb.subject = "Contratos de alquiler con ajuste por IPC del INDEC: cronograma, recibo y aviso de aumento";
  wb.keywords = "alquiler, ajuste, ipc, indec, recibo, contrato, planilla, propietario";

  buildInicio(wb);
  const hojas = [buildTablero(wb)];
  for (let n = 1; n <= N_CONTRATOS; n++) hojas.push(buildContrato(wb, n));
  hojas.push(buildRecibo(wb), buildAviso(wb), buildIpc(wb));
  hojaFuentes(
    wb,
    [INFLACION_FUENTES.ipc, INFLACION_FUENTES.indec, INFLACION_FUENTES.dnu, INFLACION_FUENTES.ccyc1199],
    INFLACION_FUENTES.consultadoEl,
    [],
    `Planilla de calcular.ar. Serie del IPC descargada el ${IPC_DESCARGADO_EL}. Cada vez que el INDEC publica un IPC nuevo regeneramos el archivo: el mismo enlace de descarga te baja la versión al día, sin costo.`,
  );
  for (const ws of hojas) await proteger(ws);
  // Abre en el tablero, que es lo que se mira todos los meses.
  wb.views = [{ x: 0, y: 0, width: 20000, height: 12000, firstSheet: 0, activeTab: 1, visibility: "visible" }];

  const dir = path.join(process.cwd(), "private");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const salidaArchivo = path.join(dir, PLANILLA_ALQ.archivo);
  await wb.xlsx.writeFile(salidaArchivo);
  return salidaArchivo;
}

if (process.argv[1] && /gen_planilla_alquileres\.ts$/.test(process.argv[1])) {
  generarPlanillaAlquileres()
    .then((ruta) => {
      console.log(`Planilla de alquileres generada: ${ruta}`);
      console.log(`   IPC hasta ${nombrePeriodo(ULTIMO_PERIODO)} · ${N_CONTRATOS} contratos · ${KMAX} ajustes por contrato`);
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}

