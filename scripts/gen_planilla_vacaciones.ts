/**
 * Genera private/planilla-vacaciones-2026.xlsx — la planilla paga de la calculadora de vacaciones
 * (/vacaciones), para el empleador que organiza y paga las vacaciones de su equipo.
 *
 * INVARIANTE: los días y el pago son las fórmulas del motor del sitio (src/lib/vacaciones.ts y el
 * proporcional de egreso de src/lib/indemnizacion.ts) y las fechas son el espejo de
 * src/components/vacaciones/cronograma.ts. scripts/check_planilla_vacaciones.ts evalúa el archivo
 * con HyperFormula y exige el mismo resultado que esos módulos, caso por caso.
 *
 * Fechas: van como número de serie de Excel con formato dd/mm/aaaa (no Date de exceljs, que el
 * evaluador del check leería en milisegundos). Dentro de los textos de la nota se arman con
 * DAY/MONTH/YEAR y CHOOSE, nunca con TEXT(): el código de formato de TEXT depende del idioma del
 * Excel de quien abre el archivo ("yyyy" no anda en un Excel en castellano).
 *
 * Uso: npx -y tsx scripts/gen_planilla_vacaciones.ts
 */

import ExcelJS from "exceljs";
import path from "node:path";
import { existsSync, mkdirSync } from "node:fs";
import { ANIO_VACACIONES, ESCALA_VACACIONES, VACACIONES_FUENTES } from "../src/data/vacaciones";
import { FERIADOS_FUENTES } from "../src/data/feriados";
import { feriadosLegales, inicioValidoDeLaSemana, ANTICIPACION_LEGAL, TRAMO_MINIMO } from "../src/components/vacaciones/cronograma";
import { COLUMNAS, FILAS_EJEMPLO, FILA_PRIMERA, HOJA as HOJA_EQUIPO, serieExcel } from "../src/lib/prefill/vacaciones";
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

export const ARCHIVO_VACACIONES = "planilla-vacaciones-2026.xlsx";

export const HOJAS = {
  instrucciones: "Instrucciones",
  equipo: HOJA_EQUIPO,
  liquidacion: "Liquidación",
  notificacion: "Notificación",
  temporada: "Temporada",
  egresos: "Egresos",
  feriados: "Feriados",
} as const;

export const N_EMPLEADOS = 40;
export const FILA_FIN = FILA_PRIMERA + N_EMPLEADOS - 1;
export const FILA_TOTAL = FILA_FIN + 1;

// Coordenadas que comparten el check, el prefill y la vista previa de la oferta.
export const PARAMETROS = { anio: "B3", anticipacion: "E3", hoy: "H3" } as const;
export const COL = {
  ...COLUMNAS,
  antiguedad: "H",
  dias: "I",
  regimen: "J",
  tramoCalc: "K",
  saldo: "L",
  fin: "M",
  vuelve: "N",
  avisar: "O",
  valorDia: "P",
  pagar: "Q",
  plus: "R",
  estado: "S",
  ok: "T",
  valido: "U",
  escala: "V",
  habiles: "W",
  proporcional: "X",
} as const;

export const LIQ = {
  numero: "B5",
  nombre: "B6",
  ingreso: "B7",
  sueldo: "B8",
  antiguedad: "B9",
  regimen: "B10",
  dias: "B12",
  tramo: "B13",
  inicio: "B14",
  fin: "B15",
  vuelve: "B16",
  avisar: "B17",
  valorDia: "B19",
  valorDiaNormal: "B20",
  pagar: "B21",
  plus: "B22",
  estado: "B23",
} as const;

export const NOTIF = {
  numero: "B3",
  empleador: "B4",
  lugar: "B5",
  fecha: "B6",
  control: "B7",
  copias: [11, 31] as const,
} as const;
/** Desplazamientos dentro de cada copia de la nota (fila base = NOTIF.copias[i]). */
export const NOTIF_COPIA = { encabezado: 0, lugarFecha: 2, destinatario: 4, cuerpo: 7, importe: 12, enfermedad: 14 } as const;

export const TEMP = {
  personas: "B4",
  dias: "B5",
  total: "B6",
  plus: "B7",
  alertas: "B8",
  primeraFilaMes: 11,
  meses: 7,
} as const;

export const EGR = { primeraFila: 6, filas: 10 } as const;

const VERDE = "FF1B5E20";
const TEAL = "FF00695C";
const NARANJA = "FFF57C00";
const PIZARRA = "FF455A64";
const FECHA = "dd/mm/yyyy";

const E = `'${HOJAS.equipo}'!`;
const ANIO = `$${PARAMETROS.anio[0]}$${PARAMETROS.anio.slice(1)}`;
const ANT = `$${PARAMETROS.anticipacion[0]}$${PARAMETROS.anticipacion.slice(1)}`;
const HOY = `$${PARAMETROS.hoy[0]}$${PARAMETROS.hoy.slice(1)}`;
const rango = (col: string) => `${E}$${col}$${FILA_PRIMERA}:$${col}$${FILA_FIN}`;

const FERIADOS = feriadosLegales([ANIO_VACACIONES, ANIO_VACACIONES + 1]);
const FER_F0 = 5;
const FER = `'${HOJAS.feriados}'!$A$${FER_F0}:$A$${FER_F0 + FERIADOS.length - 1}`;

const [D5, D10, D20, DMAS] = ESCALA_VACACIONES.map((t) => t.dias);
const escalaAl = (ingreso: string, anio: string) =>
  `IF(${ingreso}>=DATE(${anio}-5,12,31),${D5},IF(${ingreso}>=DATE(${anio}-10,12,31),${D10},IF(${ingreso}>=DATE(${anio}-20,12,31),${D20},${DMAS})))`;

const DIAS_SEMANA = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const lista = (xs: string[]) => xs.map((x) => `"${x}"`).join(",");
const fechaLarga = (x: string) =>
  `CHOOSE(WEEKDAY(${x},2),${lista(DIAS_SEMANA)})&" "&DAY(${x})&" de "&CHOOSE(MONTH(${x}),${lista(MESES)})&" de "&YEAR(${x})`;
const fechaCorta = (x: string) => `DAY(${x})&"/"&MONTH(${x})&"/"&YEAR(${x})`;

function input(ws: ExcelJS.Worksheet, ref: string, valor: string | number | null, v?: ExcelJS.DataValidation, fmt?: string) {
  const c = celdaInput(ws, ref, valor ?? "");
  if (valor === null) c.value = null;
  if (v) c.dataValidation = v;
  if (fmt) {
    c.numFmt = fmt;
    c.alignment = { horizontal: "right" };
  }
  return c;
}

function calc(ws: ExcelJS.Worksheet, ref: string, formula: string, opts: { fmt?: string; total?: boolean; wrap?: boolean; izquierda?: boolean } = {}) {
  const c = ws.getCell(ref);
  c.value = { formula };
  c.fill = opts.total ? S.total : S.output;
  c.border = BORDE;
  if (opts.fmt) c.numFmt = opts.fmt;
  if (opts.total) c.font = { bold: true };
  c.alignment = opts.wrap
    ? { wrapText: true, vertical: "top", horizontal: "left", indent: 1 }
    : opts.fmt && !opts.izquierda
      ? { horizontal: "right" }
      : { horizontal: "left", indent: 1 };
  return c;
}

const VALIDACION_FECHA = (desde: string, hasta: string, error: string): ExcelJS.DataValidation => ({
  type: "decimal",
  operator: "between",
  allowBlank: true,
  showErrorMessage: true,
  formulae: [serieExcel(desde), serieExcel(hasta)],
  error,
});

// ─── Ejemplos del archivo genérico (el prefill los borra) ────────────────────

const lunesDe = (iso: string) => inicioValidoDeLaSemana(iso);
export const EJEMPLOS = [
  { nombre: "Ana (ejemplo)", ingreso: "2019-03-11", sueldo: 1450000, tramo: null, inicio: lunesDe(`${ANIO_VACACIONES}-12-14`) },
  { nombre: "Bruno (ejemplo)", ingreso: "2014-06-02", sueldo: 1900000, tramo: 14, inicio: lunesDe(`${ANIO_VACACIONES + 1}-01-04`) },
  { nombre: "Carla (ejemplo)", ingreso: `${ANIO_VACACIONES}-08-03`, sueldo: 1200000, tramo: null, inicio: lunesDe(`${ANIO_VACACIONES + 1}-02-08`) },
] as const;

// ─── Instrucciones ───────────────────────────────────────────────────────────

function buildInstrucciones(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS.instrucciones, { properties: { tabColor: { argb: NARANJA } } });
  ws.columns = [{ width: 4 }, { width: 108 }];
  titulo(ws, "A1:B1", `Vacaciones ${ANIO_VACACIONES} de tu equipo — cómo usar esta planilla`, NARANJA);

  const pasos: [string, string][] = [
    ["1", `En «Equipo» cargá a cada persona: nombre, fecha de ingreso y sueldo bruto mensual (hasta ${N_EMPLEADOS}). Te dice cuántos días le corresponden y cuánto le tenés que pagar. Las celdas amarillas son las tuyas; las verdes se calculan solas.`],
    ["2", "Elegí la fecha de inicio de cada uno. La columna «Estado» te avisa si no cae en lunes, si se pasa del 30 de abril, si el tramo es muy corto o si se te está por vencer el aviso. Probá fechas hasta que todas digan «En regla»."],
    ["3", "En «Notificación» elegí el número de empleado: la nota sale lista, con días, fechas y regreso, por duplicado. Imprimila, firmala y que la persona firme la copia que te quedás. Después marcá «Sí» en la columna «¿Notificado?»."],
    ["4", "«Liquidación» muestra el detalle del pago de una persona; «Temporada» te dice cuánto vas a pagar en vacaciones mes por mes, para que no te agarre la caja en enero."],
    ["5", "Si alguien se va, en «Egresos» ponés su número y la fecha de egreso: te calcula las vacaciones no gozadas para la liquidación final."],
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
  bandaSeccion(ws, `A${r}:B${r}`, "LO QUE DICE LA LEY (Ley de Contrato de Trabajo, con la reforma de la Ley 27.802)");
  r++;
  const claves = [
    `Días según la antigüedad al 31 de diciembre de ${ANIO_VACACIONES}: ${ESCALA_VACACIONES.map((t) => `${t.etiqueta.toLowerCase()}, ${t.dias} días corridos`).join("; ")} (art. 150). Son corridos: cuentan sábados, domingos y feriados.`,
    "Quien no trabajó al menos la mitad de los días hábiles del año tiene 1 día de descanso cada 20 días trabajados (arts. 151 y 153). La planilla lo detecta sola por la fecha de ingreso.",
    `Se otorgan entre el 1 de octubre y el 30 de abril. Fuera de ese período, sólo de común acuerdo (art. 154). La fecha de inicio se avisa por escrito con al menos ${ANTICIPACION_LEGAL} días de anticipación; si tu convenio fija otra anticipación, cambiala en la celda de arriba de «Equipo».`,
    "Empiezan un lunes, o el día hábil siguiente si ese lunes es feriado (art. 151). Para quien trabaja en días inhábiles la regla es otra: empiezan el día siguiente a su franco.",
    `Se pueden partir en tramos, si los dos están de acuerdo, siempre que ningún tramo tenga menos de ${TRAMO_MINIMO} días (art. 154). Cargá los días del tramo en la columna «Días de este tramo» y el saldo te queda a la vista.`,
    "Si no las tomás todos juntos, organizalas para que cada persona tenga vacaciones en verano al menos una vez cada tres años (art. 154).",
    "Cada día se paga el sueldo mensual dividido 25, y se paga al empezar las vacaciones (art. 155). Es bruto: lleva los mismos descuentos que el sueldo. Con sueldo variable (comisiones, destajo), cargá el promedio del año o, si la persona lo prefiere, el de los últimos seis meses. Si cobra por día o por hora, cada día de vacaciones vale lo que habría cobrado en la jornada anterior al inicio (art. 155 inc. b): para que la cuenta dé eso, cargá en «Sueldo» ese jornal multiplicado por 25.",
    "Si no avisaste a tiempo, la persona puede tomárselas avisándote de forma fehaciente, para que terminen antes del 31 de mayo (art. 157). No se pueden pagar en plata en lugar de tomarlas, salvo al terminar la relación (arts. 156 y 162).",
    "Si se enferma durante las vacaciones y te avisa a tiempo, vuelve en la fecha prevista y el saldo de días se reprograma (art. 154).",
  ];
  for (const t of claves) {
    const c = ws.getCell(r, 2);
    c.value = `•  ${t}`;
    c.alignment = { wrapText: true, vertical: "top", indent: 1 };
    ws.getRow(r).height = 34;
    r++;
  }
  r++;
  nota(
    ws,
    `A${r}:B${r}`,
    "Esta planilla da los mismos números que la calculadora gratuita de calcular.ar/vacaciones: misma ley, misma fórmula. Antes de publicar cada versión, una verificación automática recalcula el archivo y lo compara contra la calculadora. Es una referencia de cálculo con sus fuentes, no asesoramiento legal: tu convenio colectivo puede tener reglas propias.",
  );
  ws.getRow(r).height = 44;
  r++;
  nota(ws, `A${r}:B${r}`, "Las fechas se escriben como dd/mm/aaaa. Si tu Excel está configurado en inglés y lee las fechas al revés, escribilas como aaaa-mm-dd.");
}

// ─── Equipo ──────────────────────────────────────────────────────────────────

function buildEquipo(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS.equipo, { properties: { tabColor: { argb: VERDE } } });
  ws.columns = [
    { width: 5 }, { width: 26 }, { width: 13 }, { width: 15 }, { width: 11 }, { width: 13 }, { width: 11 },
    { width: 18 }, { width: 11 }, { width: 22 }, { width: 10 }, { width: 9 }, { width: 13 }, { width: 13 },
    { width: 14 }, { width: 14 }, { width: 16 }, { width: 14 }, { width: 50 },
    { width: 4 }, { width: 4 }, { width: 4 }, { width: 4 }, { width: 4 },
  ];
  titulo(ws, "A1:S1", `Vacaciones ${ANIO_VACACIONES} del equipo — días, fechas, aviso y pago`, VERDE);
  ws.mergeCells("A2:S2");
  const sub = ws.getCell("A2");
  sub.value = `LCT arts. 150 a 157 · art. 154 según Ley 27.802 · Verificado el ${VACACIONES_FUENTES.consultadoEl}`;
  sub.font = { italic: true, size: 10, color: { argb: "FF555555" } };
  sub.fill = S.label;
  sub.alignment = { horizontal: "center" };

  celdaEtiqueta(ws, "A3", "Año");
  input(ws, PARAMETROS.anio, ANIO_VACACIONES, {
    type: "whole", operator: "between", showErrorMessage: true, formulae: [ANIO_VACACIONES, ANIO_VACACIONES + 1],
    error: `El año de las vacaciones: ${ANIO_VACACIONES} o ${ANIO_VACACIONES + 1}.`,
  }, "0");
  ws.mergeCells("C3:D3");
  celdaEtiqueta(ws, "C3", "Días de aviso previo");
  input(ws, PARAMETROS.anticipacion, ANTICIPACION_LEGAL, {
    type: "whole", operator: "between", showErrorMessage: true, formulae: [1, 120],
    error: `La ley pide al menos ${ANTICIPACION_LEGAL} días; tu convenio puede fijar otro plazo.`,
  }, "0");
  ws.mergeCells("F3:G3");
  celdaEtiqueta(ws, "F3", "Fecha de hoy");
  calc(ws, PARAMETROS.hoy, "TODAY()", { fmt: FECHA });

  const headers = [
    "Nº", "Nombre y apellido", "Fecha de ingreso", "Sueldo bruto mensual", "Días de este tramo (vacío = todos)",
    "Fecha de inicio", "¿Notificado?", "Antigüedad al 31/12", "Días que le tocan", "Régimen", "Días del tramo",
    "Saldo", "Último día", "Vuelve a trabajar", "Notificar hasta el", "Valor del día (÷ 25)", "A pagar al inicio",
    "Plus vacacional", "Estado",
  ];
  headers.forEach((h, i) => {
    const c = ws.getCell(5, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 10 };
    c.fill = i < 7 ? relleno("FF33691E") : S.header;
    c.border = BORDE;
    c.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  });
  ws.getRow(5).height = 44;

  const C = COL;
  for (let r = FILA_PRIMERA; r <= FILA_FIN; r++) {
    const i = r - FILA_PRIMERA;
    const ej = EJEMPLOS[i];
    const n = ws.getCell(`A${r}`);
    n.value = i + 1;
    n.fill = S.label;
    n.border = BORDE;
    n.alignment = { horizontal: "center" };

    input(ws, `${C.nombre}${r}`, ej ? ej.nombre : null);
    input(ws, `${C.ingreso}${r}`, ej ? serieExcel(ej.ingreso) : null,
      VALIDACION_FECHA("1950-01-01", `${ANIO_VACACIONES + 1}-12-31`, "Escribí la fecha de ingreso como dd/mm/aaaa."), FECHA);
    input(ws, `${C.sueldo}${r}`, ej ? ej.sueldo : null, {
      type: "decimal", operator: "between", allowBlank: true, showErrorMessage: true, formulae: [1, 100000000],
      error: "El sueldo bruto mensual, en pesos.",
    }, ARS_FMT);
    input(ws, `${C.tramo}${r}`, ej?.tramo ?? null, {
      type: "whole", operator: "between", allowBlank: true, showErrorMessage: true, formulae: [1, 35],
      error: "Los días del tramo (de 1 a 35). Vacío = todos los que le tocan.",
    }, "0");
    input(ws, `${C.inicio}${r}`, ej ? serieExcel(ej.inicio) : null,
      VALIDACION_FECHA(`${ANIO_VACACIONES}-01-01`, `${ANIO_VACACIONES + 2}-12-31`, "Escribí la fecha de inicio como dd/mm/aaaa."), FECHA);
    input(ws, `${C.notificado}${r}`, "No", desplegable(["Sí", "No"], "Elegí Sí o No."));
    ws.getCell(`${C.notificado}${r}`).alignment = { horizontal: "center" };

    const c = (col: string) => `${col}${r}`;
    const val = c(C.valido);
    const mesesAnt = `((${ANIO}-YEAR(${c(C.ingreso)}))*12+12-MONTH(${c(C.ingreso)}))`;

    ws.getCell(val).value = { formula: `IF(OR(${c(C.ingreso)}="",${c(C.sueldo)}=""),0,IF(${c(C.ingreso)}>DATE(${ANIO},12,31),0,1))` };
    ws.getCell(c(C.escala)).value = { formula: `IF(${val}=1,${escalaAl(c(C.ingreso), ANIO)},"")` };
    ws.getCell(c(C.habiles)).value = { formula: `IF(${val}=1,IF(${c(C.ingreso)}>DATE(${ANIO},1,1),NETWORKDAYS(${c(C.ingreso)},DATE(${ANIO},12,31)),""),"")` };
    ws.getCell(c(C.proporcional)).value = {
      formula: `IF(${val}=1,IF(${c(C.habiles)}="",0,IF(${c(C.habiles)}<NETWORKDAYS(DATE(${ANIO},1,1),DATE(${ANIO},12,31))/2,1,0)),"")`,
    };

    calc(ws, c(C.antiguedad), `IF(${val}=1,INT(${mesesAnt}/12)&IF(INT(${mesesAnt}/12)=1," año"," años")&" y "&MOD(${mesesAnt},12)&IF(MOD(${mesesAnt},12)=1," mes"," meses"),"")`);
    calc(ws, c(C.dias), `IF(${val}=1,IF(${c(C.proporcional)}=1,INT(${c(C.habiles)}/20),${c(C.escala)}),"")`, { fmt: "0" });
    calc(ws, c(C.regimen), `IF(${val}=1,IF(${c(C.proporcional)}=1,"Proporcional (art. 153)","Escala (art. 150)"),"")`);
    calc(ws, c(C.tramoCalc), `IF(${val}=1,IF(${c(C.tramo)}="",${c(C.dias)},MIN(MAX(${c(C.tramo)},0),${c(C.dias)})),"")`, { fmt: "0" });
    calc(ws, c(C.saldo), `IF(${val}=1,${c(C.dias)}-${c(C.tramoCalc)},"")`, { fmt: "0" });
    calc(ws, c(C.fin), `IF(AND(${val}=1,${c(C.inicio)}<>""),IF(${c(C.tramoCalc)}>0,${c(C.inicio)}+${c(C.tramoCalc)}-1,""),"")`, { fmt: FECHA });
    calc(ws, c(C.vuelve), `IF(${c(C.fin)}="","",${c(C.fin)}+1)`, { fmt: FECHA });
    calc(ws, c(C.avisar), `IF(AND(${val}=1,${c(C.inicio)}<>""),${c(C.inicio)}-${ANT},"")`, { fmt: FECHA });
    calc(ws, c(C.valorDia), `IF(${val}=1,${c(C.sueldo)}/25,"")`, { fmt: ARS_FMT });
    calc(ws, c(C.pagar), `IF(${val}=1,${c(C.valorDia)}*${c(C.tramoCalc)},"")`, { fmt: ARS_FMT });
    calc(ws, c(C.plus), `IF(${val}=1,(${c(C.sueldo)}/25-${c(C.sueldo)}/30)*${c(C.tramoCalc)},"")`, { fmt: ARS_FMT });

    const F = c(C.inicio);
    const avisar = c(C.avisar);
    const estado =
      `IF(OR(${c(C.ingreso)}="",${c(C.sueldo)}=""),"",` +
      `IF(${c(C.ingreso)}>DATE(${ANIO},12,31),"Ingresa después del 31/12: no entra en este período",` +
      `IF(${c(C.dias)}=0,"Todavía no generó días de vacaciones (art. 153)",` +
      `IF(${F}="","Falta la fecha de inicio",` +
      `IF(${F}<>WORKDAY(${F}-WEEKDAY(${F},2),1,${FER}),"Tiene que empezar un lunes (o el hábil siguiente si es feriado)",` +
      `IF(AND(${c(C.tramoCalc)}<${c(C.dias)},OR(${c(C.tramoCalc)}<${TRAMO_MINIMO},${c(C.saldo)}<${TRAMO_MINIMO})),"Cada tramo tiene que ser de ${TRAMO_MINIMO} días o más",` +
      `IF(OR(${F}<DATE(${ANIO},10,1),${c(C.fin)}>DATE(${ANIO}+1,4,30)),"Fuera del 1/10 al 30/4: sólo con acuerdo por escrito",` +
      `IF(${c(C.notificado)}="Sí","Notificado",` +
      `IF(${HOY}>${avisar},"Aviso fuera de plazo: notificá hoy o acordá otra fecha",` +
      `IF(${avisar}-${HOY}<=7,"Notificá ya: el plazo vence el "&${fechaCorta(avisar)},` +
      `"En regla: notificar hasta el "&${fechaCorta(avisar)}))))))))))`;
    calc(ws, c(C.estado), estado);
    ws.getCell(c(C.ok)).value = { formula: `IF(OR(${c(C.estado)}="Notificado",LEFT(${c(C.estado)},8)="En regla"),1,0)` };

    if (i % 2 === 1) {
      for (const col of [C.antiguedad, C.dias, C.regimen, C.tramoCalc, C.saldo, C.fin, C.vuelve, C.avisar, C.valorDia, C.pagar, C.plus, C.estado]) {
        ws.getCell(c(col)).fill = relleno("FFF1F8F1");
      }
    }
  }

  const T = FILA_TOTAL;
  ws.mergeCells(`A${T}:J${T}`);
  const lt = ws.getCell(`A${T}`);
  lt.value = "TOTAL DE LA TEMPORADA";
  lt.font = { bold: true };
  lt.fill = S.total;
  lt.border = BORDE;
  lt.alignment = { horizontal: "right", indent: 1 };
  calc(ws, `${C.tramoCalc}${T}`, `SUM(${C.tramoCalc}${FILA_PRIMERA}:${C.tramoCalc}${FILA_FIN})`, { fmt: "0", total: true });
  calc(ws, `${C.pagar}${T}`, `SUM(${C.pagar}${FILA_PRIMERA}:${C.pagar}${FILA_FIN})`, { fmt: ARS_FMT, total: true });
  calc(ws, `${C.plus}${T}`, `SUM(${C.plus}${FILA_PRIMERA}:${C.plus}${FILA_FIN})`, { fmt: ARS_FMT, total: true });

  nota(ws, `A${T + 2}:S${T + 2}`, `* «Notificar hasta el»: último día para entregar el aviso por escrito con ${ANTICIPACION_LEGAL} días de anticipación (o los que pongas arriba si tu convenio fija otro plazo). «A pagar al inicio» es bruto: lleva los mismos descuentos que el sueldo.`);
  nota(ws, `A${T + 3}:S${T + 3}`, "* Los feriados para la regla del lunes están en la hoja «Feriados». Los días no laborables (Jueves Santo, días turísticos) no cuentan: los decide cada empleador.");

  for (const col of [C.ok, C.valido, C.escala, C.habiles, C.proporcional]) ws.getColumn(col).hidden = true;
  ws.views = [{ state: "frozen", xSplit: 2, ySplit: 5 }];
}

// ─── Liquidación (una persona) ───────────────────────────────────────────────

function buildLiquidacion(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS.liquidacion, { properties: { tabColor: { argb: TEAL } } });
  ws.columns = [{ width: 46 }, { width: 38 }];
  titulo(ws, "A1:B1", "Vacaciones de una persona — detalle del pago", TEAL);
  nota(ws, "A2:B2", "Elegí el número de empleado de la hoja «Equipo». Todo lo demás se completa solo.");

  const idx = `$${LIQ.numero[0]}$${LIQ.numero.slice(1)}`;
  const traer = (col: string) => `IFERROR(IF(INDEX(${rango(col)},${idx})="","",INDEX(${rango(col)},${idx})),"")`;

  bandaSeccion(ws, "A4:B4", "EMPLEADO");
  celdaEtiqueta(ws, "A5", "Empleado Nº (de la hoja Equipo)");
  input(ws, LIQ.numero, 1, {
    type: "whole", operator: "between", showErrorMessage: true, formulae: [1, N_EMPLEADOS],
    error: `Un número de empleado del 1 al ${N_EMPLEADOS}.`,
  }, "0");

  const fila = (ref: string, etiqueta: string, formula: string, opts: Parameters<typeof calc>[3] = {}) => {
    celdaEtiqueta(ws, `A${ref.slice(1)}`, etiqueta);
    calc(ws, ref, formula, opts);
  };
  fila(LIQ.nombre, "Nombre y apellido", `IFERROR(IF(INDEX(${rango(COL.nombre)},${idx})="","Escribilo en la hoja Equipo",INDEX(${rango(COL.nombre)},${idx})),"")`);
  fila(LIQ.ingreso, "Fecha de ingreso", traer(COL.ingreso), { fmt: FECHA });
  fila(LIQ.sueldo, "Sueldo bruto mensual", traer(COL.sueldo), { fmt: ARS_FMT });
  fila(LIQ.antiguedad, "Antigüedad al 31 de diciembre", traer(COL.antiguedad), { fmt: "@", izquierda: true });
  fila(LIQ.regimen, "Régimen", traer(COL.regimen));

  bandaSeccion(ws, "A11:B11", "DÍAS Y FECHAS");
  fila(LIQ.dias, "Días de vacaciones que le corresponden", traer(COL.dias), { fmt: "0" });
  fila(LIQ.tramo, "Días de este tramo", traer(COL.tramoCalc), { fmt: "0" });
  fila(LIQ.inicio, "Primer día de vacaciones", traer(COL.inicio), { fmt: FECHA });
  fila(LIQ.fin, "Último día de vacaciones", traer(COL.fin), { fmt: FECHA });
  fila(LIQ.vuelve, "Vuelve a trabajar el", traer(COL.vuelve), { fmt: FECHA });
  fila(LIQ.avisar, "Notificar por escrito hasta el", traer(COL.avisar), { fmt: FECHA });

  bandaSeccion(ws, "A18:B18", "PAGO (art. 155 LCT)");
  fila(LIQ.valorDia, "Valor del día de vacaciones (sueldo ÷ 25)", traer(COL.valorDia), { fmt: '"$"#,##0.00' });
  fila(LIQ.valorDiaNormal, "Valor del día trabajado (sueldo ÷ 30)", `IF(${LIQ.sueldo}="","",${LIQ.sueldo}/30)`, { fmt: '"$"#,##0.00' });
  celdaEtiqueta(ws, "A21", "A PAGAR AL INICIO DE LAS VACACIONES");
  ws.getCell("A21").font = { bold: true };
  ws.getCell("A21").fill = S.total;
  calc(ws, LIQ.pagar, traer(COL.pagar), { fmt: '"$"#,##0.00', total: true });
  fila(LIQ.plus, "Plus vacacional incluido", traer(COL.plus), { fmt: '"$"#,##0.00' });
  fila(LIQ.estado, "Estado", traer(COL.estado), { wrap: true });
  ws.getRow(23).height = 30;

  nota(ws, "A25:B25", "* El plus vacacional no es un adicional aparte: sale de pagar cada día de vacaciones a sueldo ÷ 25 en lugar de ÷ 30. El importe es bruto: lleva los mismos aportes que el sueldo (jubilación, PAMI, obra social y, si corresponde, sindicato y Ganancias).");
  ws.getRow(25).height = 40;
}

// ─── Notificación (por duplicado) ────────────────────────────────────────────

function buildNotificacion(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS.notificacion, { properties: { tabColor: { argb: PIZARRA } } });
  ws.columns = [{ width: 26 }, { width: 22 }, { width: 22 }, { width: 22 }];
  titulo(ws, "A1:D1", "Notificación de vacaciones — lista para imprimir y firmar", PIZARRA);

  const idx = `$${NOTIF.numero[0]}$${NOTIF.numero.slice(1)}`;
  const t = (col: string) => `IFERROR(INDEX(${rango(col)},${idx}),"")`;

  celdaEtiqueta(ws, "A3", "Empleado Nº (de la hoja Equipo)");
  input(ws, NOTIF.numero, 1, {
    type: "whole", operator: "between", showErrorMessage: true, formulae: [1, N_EMPLEADOS],
    error: `Un número de empleado del 1 al ${N_EMPLEADOS}.`,
  }, "0");
  ws.getCell(NOTIF.numero).alignment = { horizontal: "left", indent: 1 };
  celdaEtiqueta(ws, "A4", "Empleador o razón social");
  ws.mergeCells("B4:D4");
  input(ws, NOTIF.empleador, "");
  celdaEtiqueta(ws, "A5", "Lugar");
  ws.mergeCells("B5:D5");
  input(ws, NOTIF.lugar, "");
  celdaEtiqueta(ws, "A6", "Fecha de la nota");
  const fechaNota = ws.getCell(NOTIF.fecha);
  fechaNota.value = { formula: "TODAY()" };
  fechaNota.fill = S.input;
  fechaNota.border = BORDE;
  fechaNota.font = { bold: true };
  fechaNota.numFmt = FECHA;
  fechaNota.alignment = { horizontal: "left", indent: 1 };
  fechaNota.dataValidation = VALIDACION_FECHA(`${ANIO_VACACIONES}-01-01`, `${ANIO_VACACIONES + 2}-12-31`, "Escribí la fecha como dd/mm/aaaa.");
  celdaEtiqueta(ws, "A7", "Antes de imprimir, revisá");
  ws.mergeCells("B7:D7");
  calc(ws, NOTIF.control, `IF(${t(COL.estado)}="","Elegí un número de empleado cargado en la hoja Equipo.",${t(COL.estado)})`);
  nota(ws, "A8:D8", "Se imprimen las dos copias en una hoja A4: una para la persona y otra, firmada por ella, para el legajo. Las celdas amarillas son las únicas que completás acá.");
  ws.getRow(8).height = 26;

  const nombre = `IF(${t(COL.nombre)}="","______________________________",${t(COL.nombre)})`;
  const F = t(COL.inicio);
  const M = t(COL.fin);
  const N = t(COL.vuelve);
  const K = t(COL.tramoCalc);
  const L = t(COL.saldo);
  const listo = `AND(${F}<>"",${M}<>"")`;
  const cuerpo =
    `IF(${listo},"Por medio de la presente le notificamos que, conforme al artículo 154 de la Ley de Contrato de Trabajo, usted gozará de "&${K}&" días corridos de su licencia anual ordinaria correspondiente al año "&${E}${ANIO}&", desde el "&${fechaLarga(F)}&" hasta el "&${fechaLarga(M)}&" inclusive, y deberá reintegrarse a sus tareas el "&${fechaLarga(N)}&"."&IF(${L}>0," Los "&${L}&" días restantes de este período los gozará en la fecha que acordemos.",""),` +
    `"Para armar la nota, completá la fecha de inicio de esta persona en la hoja Equipo.")`;

  const copia = (base: number, rotulo: string) => {
    const R = (d: number) => base + d;
    ws.mergeCells(`A${R(0)}:D${R(0)}`);
    const enc = ws.getCell(`A${R(0)}`);
    enc.value = rotulo;
    enc.font = { bold: true, size: 9, color: { argb: "FF607D8B" } };
    enc.alignment = { horizontal: "left" };
    enc.border = { bottom: { style: "thin", color: { argb: "FFB0BEC5" } } };

    ws.mergeCells(`A${R(2)}:D${R(2)}`);
    const lf = ws.getCell(`A${R(2)}`);
    lf.value = { formula: `IF($B$5="","",$B$5&", ")&IF($B$6="","",${fechaLarga("$B$6")})` };
    lf.alignment = { horizontal: "right" };

    ws.mergeCells(`A${R(4)}:D${R(4)}`);
    ws.getCell(`A${R(4)}`).value = { formula: `"Señor/a "&${nombre}` };
    ws.getCell(`A${R(4)}`).font = { bold: true };
    ws.mergeCells(`A${R(5)}:D${R(5)}`);
    ws.getCell(`A${R(5)}`).value = "Presente";

    ws.mergeCells(`A${R(7)}:D${R(10)}`);
    const cu = ws.getCell(`A${R(7)}`);
    cu.value = { formula: cuerpo };
    cu.alignment = { wrapText: true, vertical: "top" };

    ws.mergeCells(`A${R(12)}:C${R(12)}`);
    ws.getCell(`A${R(12)}`).value = "Importe bruto de sus vacaciones, que se abona al inicio de la licencia (art. 155):";
    const imp = ws.getCell(`D${R(12)}`);
    imp.value = { formula: `IF(${listo},${t(COL.pagar)},"")` };
    imp.numFmt = '"$"#,##0.00';
    imp.font = { bold: true };
    imp.alignment = { horizontal: "right" };

    ws.mergeCells(`A${R(14)}:D${R(15)}`);
    const enf = ws.getCell(`A${R(14)}`);
    enf.value = "Si durante las vacaciones se enfermara, avísenos en el momento: se reincorporará en la fecha prevista y los días que no haya podido gozar se reprogramarán (art. 154). Saludamos a usted atentamente.";
    enf.alignment = { wrapText: true, vertical: "top" };
    enf.font = { size: 10 };

    ws.mergeCells(`A${R(18)}:B${R(18)}`);
    ws.mergeCells(`C${R(18)}:D${R(18)}`);
    const fe = ws.getCell(`A${R(18)}`);
    fe.value = { formula: `"Firma y aclaración"&IF($B$4="",""," · "&$B$4)` };
    const ft = ws.getCell(`C${R(18)}`);
    ft.value = "Recibí la notificación. Firma, aclaración y fecha";
    for (const c of [fe, ft]) {
      c.border = { top: { style: "thin", color: { argb: PIZARRA } } };
      c.alignment = { horizontal: "center", wrapText: true };
      c.font = { size: 9 };
    }
    ws.getRow(R(18)).height = 26;
    for (const d of [7, 8, 9, 10]) ws.getRow(R(d)).height = 20;
  };
  copia(NOTIF.copias[0], "NOTIFICACIÓN DE VACACIONES · ORIGINAL (para la persona)");
  copia(NOTIF.copias[1], "NOTIFICACIÓN DE VACACIONES · DUPLICADO (firmado, para el legajo)");

  ws.pageSetup = {
    paperSize: 9,
    orientation: "portrait",
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 1,
    printArea: `A${NOTIF.copias[0]}:D${NOTIF.copias[1] + 18}`,
    margins: { left: 0.6, right: 0.6, top: 0.6, bottom: 0.6, header: 0.3, footer: 0.3 },
  };
}

// ─── Temporada (costo mes por mes) ───────────────────────────────────────────

function buildTemporada(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS.temporada, { properties: { tabColor: { argb: "FF1565C0" } } });
  ws.columns = [{ width: 40 }, { width: 18 }, { width: 18 }, { width: 22 }];
  titulo(ws, "A1:D1", "La temporada en números — cuánto pagás y cuándo", "FF1565C0");

  bandaSeccion(ws, "A3:D3", "RESUMEN DEL EQUIPO");
  const fila = (ref: string, etiqueta: string, formula: string, opts: Parameters<typeof calc>[3] = {}) => {
    const lc = celdaEtiqueta(ws, `A${ref.slice(1)}`, etiqueta);
    if (opts.total) {
      lc.font = { bold: true };
      lc.fill = S.total;
    }
    calc(ws, ref, formula, opts);
  };
  fila(TEMP.personas, "Personas con vacaciones cargadas", `SUM(${rango(COL.valido)})`, { fmt: "0" });
  fila(TEMP.dias, "Días de vacaciones de este tramo", `SUM(${rango(COL.tramoCalc)})`, { fmt: "0" });
  fila(TEMP.total, "TOTAL A PAGAR EN VACACIONES", `SUM(${rango(COL.pagar)})`, { fmt: ARS_FMT, total: true });
  fila(TEMP.plus, "Plus vacacional incluido", `SUM(${rango(COL.plus)})`, { fmt: ARS_FMT });
  fila(TEMP.alertas, "Personas con algo para revisar en «Estado»", `${TEMP.personas}-SUM(${rango(COL.ok)})`, { fmt: "0" });

  const H0 = TEMP.primeraFilaMes - 1;
  ["Mes en que empiezan", "Personas", "Días", "A pagar ese mes"].forEach((h, i) => {
    const c = ws.getCell(H0, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno("FF1976D2");
    c.border = BORDE;
    c.alignment = { horizontal: i === 0 ? "left" : "center", indent: i === 0 ? 1 : 0 };
  });
  const NOMBRES = ["Octubre", "Noviembre", "Diciembre", "Enero", "Febrero", "Marzo", "Abril"];
  const V = rango(COL.valido);
  const Fi = rango(COL.inicio);
  for (let i = 0; i < TEMP.meses; i++) {
    const r = TEMP.primeraFilaMes + i;
    const mes = 10 + i;
    const desde = `DATE(${E}${ANIO},${mes},1)`;
    const hasta = `DATE(${E}${ANIO},${mes + 1},1)`;
    const crit = `${V},1,${Fi},">="&${desde},${Fi},"<"&${hasta}`;
    calc(ws, `A${r}`, `"${NOMBRES[i]} "&YEAR(${desde})`);
    ws.getCell(`A${r}`).fill = i % 2 === 0 ? S.white : S.cebra;
    calc(ws, `B${r}`, `COUNTIFS(${crit})`, { fmt: "0" });
    calc(ws, `C${r}`, `SUMIFS(${rango(COL.tramoCalc)},${crit})`, { fmt: "0" });
    calc(ws, `D${r}`, `SUMIFS(${rango(COL.pagar)},${crit})`, { fmt: ARS_FMT });
  }
  const rOtras = TEMP.primeraFilaMes + TEMP.meses;
  const mIni = TEMP.primeraFilaMes;
  const mFin = rOtras - 1;
  const conFecha = `${V},1,${Fi},">0"`;
  celdaEtiqueta(ws, `A${rOtras}`, "Fuera de temporada (con acuerdo)");
  calc(ws, `B${rOtras}`, `COUNTIFS(${conFecha})-SUM(B${mIni}:B${mFin})`, { fmt: "0" });
  calc(ws, `C${rOtras}`, `SUMIFS(${rango(COL.tramoCalc)},${conFecha})-SUM(C${mIni}:C${mFin})`, { fmt: "0" });
  calc(ws, `D${rOtras}`, `SUMIFS(${rango(COL.pagar)},${conFecha})-SUM(D${mIni}:D${mFin})`, { fmt: ARS_FMT });
  celdaEtiqueta(ws, `A${rOtras + 1}`, "Todavía sin fecha de inicio");
  calc(ws, `B${rOtras + 1}`, `${TEMP.personas}-COUNTIFS(${conFecha})`, { fmt: "0" });
  calc(ws, `C${rOtras + 1}`, `${TEMP.dias}-SUMIFS(${rango(COL.tramoCalc)},${conFecha})`, { fmt: "0" });
  calc(ws, `D${rOtras + 1}`, `${TEMP.total}-SUMIFS(${rango(COL.pagar)},${conFecha})`, { fmt: ARS_FMT });

  nota(ws, `A${rOtras + 3}:D${rOtras + 3}`, "* Cada licencia se cuenta en el mes en que empieza, que es cuando se paga (art. 155). Los importes son brutos, antes de descuentos y sin las contribuciones patronales.");
  ws.getRow(rOtras + 3).height = 30;
}

// ─── Egresos (vacaciones no gozadas) ─────────────────────────────────────────

function buildEgresos(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS.egresos, { properties: { tabColor: { argb: "FF6A1B9A" } } });
  ws.columns = [{ width: 8 }, { width: 24 }, { width: 13 }, { width: 15 }, { width: 13 }, { width: 13 }, { width: 14 }, { width: 18 }, { width: 15 }, { width: 18 }];
  titulo(ws, "A1:J1", "Si alguien se va — vacaciones no gozadas (art. 156 LCT)", "FF6A1B9A");
  nota(ws, "A2:J2", "Corresponde por cualquier causa de egreso (renuncia, despido, acuerdo). Se paga en la liquidación final: días de la escala × días trabajados en el año ÷ 365, a sueldo ÷ 25, más el aguinaldo sobre ese importe.");
  ws.getRow(2).height = 30;
  nota(ws, "A3:J3", "Si ya se tomó a cuenta vacaciones de este mismo año, o le quedó sin gozar un período anterior, ajustalo con quien liquida: esta hoja calcula el proporcional del año del egreso.");
  ws.getRow(3).height = 26;

  const headers = ["Nº", "Nombre", "Ingreso", "Mejor sueldo mensual", "Fecha de egreso", "Días del año trabajados", "Días proporcionales", "Vacaciones no gozadas", "Aguinaldo sobre vacaciones", "TOTAL"];
  headers.forEach((h, i) => {
    const c = ws.getCell(5, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" }, size: 10 };
    c.fill = i === 0 || i === 4 ? relleno("FF33691E") : relleno("FF7B1FA2");
    c.border = BORDE;
    c.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  });
  ws.getRow(5).height = 32;

  for (let k = 0; k < EGR.filas; k++) {
    const r = EGR.primeraFila + k;
    const ej = k === 0;
    input(ws, `A${r}`, ej ? 3 : null, {
      type: "whole", operator: "between", allowBlank: true, showErrorMessage: true, formulae: [1, N_EMPLEADOS],
      error: `Un número de empleado del 1 al ${N_EMPLEADOS}.`,
    }, "0");
    ws.getCell(`A${r}`).alignment = { horizontal: "center" };
    const traer = (col: string) => `IF(A${r}="","",IFERROR(IF(INDEX(${rango(col)},A${r})="","",INDEX(${rango(col)},A${r})),""))`;
    calc(ws, `B${r}`, traer(COL.nombre));
    calc(ws, `C${r}`, traer(COL.ingreso), { fmt: FECHA });
    calc(ws, `D${r}`, traer(COL.sueldo), { fmt: ARS_FMT });
    input(ws, `E${r}`, ej ? serieExcel(`${ANIO_VACACIONES}-12-15`) : null,
      VALIDACION_FECHA(`${ANIO_VACACIONES}-01-01`, `${ANIO_VACACIONES + 2}-12-31`, "Escribí la fecha de egreso como dd/mm/aaaa."), FECHA);
    const listo = `OR(A${r}="",E${r}="",C${r}="",D${r}="")`;
    calc(ws, `F${r}`, `IF(${listo},"",E${r}-MAX(C${r},DATE(YEAR(E${r}),1,1))+1)`, { fmt: "0" });
    calc(ws, `G${r}`, `IF(F${r}="","",${escalaAl(`C${r}`, `YEAR(E${r})`)}*F${r}/365)`, { fmt: "0.00" });
    calc(ws, `H${r}`, `IF(F${r}="","",G${r}*D${r}/25)`, { fmt: '"$"#,##0.00' });
    calc(ws, `I${r}`, `IF(F${r}="","",H${r}/12)`, { fmt: '"$"#,##0.00' });
    calc(ws, `J${r}`, `IF(F${r}="","",H${r}+I${r})`, { fmt: '"$"#,##0.00', total: true });
  }
  ws.views = [{ state: "frozen", ySplit: 5 }];
}

// ─── Feriados ────────────────────────────────────────────────────────────────

function buildFeriados(wb: ExcelJS.Workbook) {
  const ws = wb.addWorksheet(HOJAS.feriados, { properties: { tabColor: { argb: PIZARRA } } });
  ws.columns = [{ width: 16 }, { width: 60 }];
  titulo(ws, "A1:B1", `Feriados nacionales ${ANIO_VACACIONES} y ${ANIO_VACACIONES + 1} (Ley 27.399)`, PIZARRA);
  nota(ws, "A2:B2", "Los usa la regla del art. 151: si el lunes de inicio es feriado, las vacaciones empiezan el hábil siguiente. Están los inamovibles y los trasladables ya trasladados. Si tu provincia tiene un feriado propio, agregalo al final de la lista.");
  ws.getRow(2).height = 40;
  ["Fecha", "Feriado"].forEach((h, i) => {
    const c = ws.getCell(4, i + 1);
    c.value = h;
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.fill = relleno("FF546E7A");
    c.border = BORDE;
  });
  FERIADOS.forEach((f, i) => {
    const r = FER_F0 + i;
    const a = ws.getCell(`A${r}`);
    a.value = serieExcel(f.fecha);
    a.numFmt = FECHA;
    const b = ws.getCell(`B${r}`);
    b.value = f.nombre;
    for (const c of [a, b]) {
      c.border = BORDE;
      c.fill = i % 2 === 0 ? S.white : S.label;
    }
  });
}

// ─── Main ────────────────────────────────────────────────────────────────────

export async function generarPlanillaVacaciones(): Promise<string> {
  const wb = new ExcelJS.Workbook();
  wb.creator = "CalculAR (calcular.ar)";
  wb.title = `Planilla de vacaciones ${ANIO_VACACIONES}`;
  wb.subject = "Días, fechas, aviso, pago y notificación de vacaciones del equipo (LCT arts. 150 a 157)";
  wb.keywords = "vacaciones, LCT, art. 154, plus vacacional, notificación de vacaciones, planilla";

  buildInstrucciones(wb);
  buildEquipo(wb);
  buildLiquidacion(wb);
  buildNotificacion(wb);
  buildTemporada(wb);
  buildEgresos(wb);
  buildFeriados(wb);
  hojaFuentes(
    wb,
    [
      { nombre: VACACIONES_FUENTES.lct.nombre, url: VACACIONES_FUENTES.lct.url },
      { nombre: VACACIONES_FUENTES.ley27802.nombre, url: VACACIONES_FUENTES.ley27802.url },
      ...FERIADOS_FUENTES.lista.map((f) => ({ nombre: f.nombre, url: f.url })),
    ],
    "6 de octubre de 2026",
    [],
    "Planilla de calcular.ar. Las actualizaciones del año están incluidas en el precio: si cambia una norma de vacaciones o el calendario de feriados, regeneramos la planilla y el mismo enlace de descarga te baja la versión al día. Referencia de cálculo con fuentes; no reemplaza el asesoramiento de un profesional.",
  );

  const dir = path.join(process.cwd(), "private");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const salida = path.join(dir, ARCHIVO_VACACIONES);
  await wb.xlsx.writeFile(salida);
  return salida;
}

if (FILAS_EJEMPLO.length !== EJEMPLOS.length - 1) throw new Error("FILAS_EJEMPLO del prefill no coincide con los ejemplos del generador");

if (process.argv[1] && /gen_planilla_vacaciones\.ts$/.test(process.argv[1])) {
  generarPlanillaVacaciones()
    .then((s) => console.log(`Planilla de vacaciones generada: ${s}`))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
