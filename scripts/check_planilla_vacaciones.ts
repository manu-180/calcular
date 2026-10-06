// Verificación de la PLANILLA de vacaciones — abre el .xlsx que se entrega, EVALÚA sus fórmulas con
// HyperFormula y compara contra el motor de la calculadora gratis (calcularVacaciones), el
// proporcional de egreso del motor de despido (calcularIndemnizacion) y las fechas de
// src/components/vacaciones/cronograma.ts. También prueba el prefill (validar con entradas hostiles,
// aplicar → exceljs write → evaluar), la vista previa que se vende y el round-trip de exceljs.
//
// Correr con: npx tsx scripts/check_planilla_vacaciones.ts

import ExcelJS from "exceljs";
import JSZip from "jszip";
import { HyperFormula } from "hyperformula";
import path from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { calcularVacaciones } from "../src/lib/vacaciones";
import { calcularIndemnizacion } from "../src/lib/indemnizacion";
import { ANIO_VACACIONES } from "../src/data/vacaciones";
import {
  cronograma,
  feriadosLegales,
  fechaCorta,
  fechaLarga,
  inicioSugerido,
  inicioValido,
  sumar,
  textoEstado,
} from "../src/components/vacaciones/cronograma";
import { hojaVacaciones, textoAntiguedad, PESTANAS_VACACIONES, HOJA_PREVIA } from "../src/components/vacaciones/previa";
import * as pv from "../src/lib/prefill/vacaciones";
import { PREFILLS } from "../src/lib/prefill/index";
import {
  ARCHIVO_VACACIONES,
  COL,
  EGR,
  EJEMPLOS,
  FILA_FIN,
  HOJAS,
  LIQ,
  NOTIF,
  NOTIF_COPIA,
  N_EMPLEADOS,
  PARAMETROS,
  TEMP,
} from "./gen_planilla_vacaciones";

const ARCHIVO = path.join(process.cwd(), "private", ARCHIVO_VACACIONES);
let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const igual = (a: unknown, b: number) => typeof a === "number" && Math.abs(a - b) < 0.005;
const serie = pv.serieExcel;
const deSerie = (n: number) => new Date(Date.UTC(1899, 11, 30) + n * 86_400_000).toISOString().slice(0, 10);

// ─── Evaluador propio: exceljs devuelve Date en las celdas con formato de fecha y el evaluador común
// (evaluar_xlsx.ts) las pasaría a milisegundos; acá vuelven a ser el número de serie que lee Excel.

type Celda = string | number | boolean | null;
type Libro = {
  hojas: string[];
  wb: ExcelJS.Workbook;
  cargar(hoja: string, v: Record<string, Celda>): void;
  valor(hoja: string, ref: string): unknown;
  fecha(hoja: string, ref: string): string | null;
};

function coord(ref: string) {
  const m = ref.match(/^([A-Z]+)(\d+)$/)!;
  let col = 0;
  for (const ch of m[1]) col = col * 26 + ch.charCodeAt(0) - 64;
  return { row: Number(m[2]) - 1, col: col - 1 };
}

function valorDe(v: ExcelJS.CellValue): Celda {
  if (v === null || v === undefined) return null;
  if (v instanceof Date) return Math.round((v.getTime() - Date.UTC(1899, 11, 30)) / 86_400_000);
  if (typeof v === "number" || typeof v === "string" || typeof v === "boolean") return v;
  if (typeof v === "object") {
    if ("formula" in v && v.formula) return `=${v.formula}`;
    if ("sharedFormula" in v) throw new Error("fórmula compartida: el generador no debería producirlas");
    if ("richText" in v) return v.richText.map((t) => t.text).join("");
    if ("text" in v) return String(v.text);
  }
  return null;
}

async function libroDe(buf: Buffer | ArrayBuffer): Promise<Libro> {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(buf as ArrayBuffer);
  const hojas: Record<string, Celda[][]> = {};
  wb.eachSheet((ws) => {
    const filas: Celda[][] = [];
    for (let r = 1; r <= ws.rowCount; r++) {
      const fila: Celda[] = [];
      for (let c = 1; c <= ws.columnCount; c++) {
        const cell = ws.getCell(r, c);
        fila.push(cell.isMerged && cell.master.address !== cell.address ? null : valorDe(cell.value));
      }
      filas.push(fila);
    }
    hojas[ws.name] = filas;
  });
  const hf = HyperFormula.buildFromSheets(hojas, { licenseKey: "gpl-v3" });
  const addr = (h: string, ref: string) => ({ sheet: hf.getSheetId(h)!, ...coord(ref) });
  return {
    hojas: Object.keys(hojas),
    wb,
    cargar(h, v) {
      hf.batch(() => {
        for (const [ref, x] of Object.entries(v)) hf.setCellContents(addr(h, ref), [[x]]);
      });
    },
    valor(h, ref) {
      return hf.getCellValue(addr(h, ref));
    },
    fecha(h, ref) {
      const v = hf.getCellValue(addr(h, ref));
      return typeof v === "number" ? deSerie(v) : null;
    },
  };
}

// ─── Casos ───────────────────────────────────────────────────────────────────

const A = ANIO_VACACIONES;
const HOY = `${A}-10-06`;
const INGRESOS = [
  `${A - 30}-05-20`, `${A - 20}-12-30`, `${A - 20}-12-31`, `${A - 12}-07-01`, `${A - 10}-12-30`, `${A - 10}-12-31`,
  `${A - 7}-02-28`, `${A - 5}-12-30`, `${A - 5}-12-31`, `${A - 3}-01-15`, `${A - 1}-12-31`, `${A}-01-01`,
  `${A}-01-02`, `${A}-03-15`, `${A}-06-30`, `${A}-07-01`, `${A}-07-02`, `${A}-08-03`, `${A}-10-01`, `${A}-11-20`,
  `${A}-12-15`, `${A}-12-31`,
];
const SUELDOS = [950000, 1234567.89, 3100000];
const TRAMOS = [null, 7, 10, 14, 3, 21];
const INICIOS = [
  `${A}-10-05`, `${A}-11-02`, `${A}-11-03`, `${A}-11-23`, `${A}-11-24`, `${A}-12-07`, `${A}-12-08`, `${A}-12-14`, `${A}-09-28`,
  `${A + 1}-01-04`, `${A + 1}-02-08`, `${A + 1}-02-09`, `${A + 1}-03-22`, `${A + 1}-04-19`, `${A + 1}-04-26`, `${A + 1}-05-03`,
];
const HOYS = [HOY, `${A}-10-20`, `${A}-11-25`];

type Caso = { ingreso: string; sueldo: number; tramo: number | null; inicio: string | null; notificado: boolean; hoy: string };
const casos: Caso[] = [];
let k = 0;
for (const ingreso of INGRESOS) {
  for (const inicio of [...INICIOS, null]) {
    for (const tramo of TRAMOS) {
      k++;
      casos.push({ ingreso, sueldo: SUELDOS[k % SUELDOS.length], tramo, inicio, notificado: k % 11 === 0, hoy: HOYS[k % HOYS.length] });
    }
  }
}

function esperado(c: Caso) {
  const r = calcularVacaciones({ sueldo: c.sueldo, ingresoISO: c.ingreso, diasATomar: c.tramo ?? undefined });
  if (!r) return null;
  const cr = c.inicio ? cronograma({ dias: r.dias, diasTramo: r.diasTomados, inicioISO: c.inicio, hoyISO: c.hoy, notificado: c.notificado }) : null;
  const estado = r.dias === 0 ? textoEstado({ tipo: "sin-dias" }) : cr ? textoEstado(cr.estado) : textoEstado({ tipo: "sin-inicio" });
  return { r, cr, estado };
}

async function main() {
  check("el archivo entregable existe", existsSync(ARCHIVO), ARCHIVO);
  if (!existsSync(ARCHIVO)) process.exit(1);
  const original = readFileSync(ARCHIVO);
  const L = await libroDe(original);
  check("pestañas == las de la vista previa", JSON.stringify(L.hojas) === JSON.stringify(PESTANAS_VACACIONES), L.hojas);
  check("todas las hojas del generador están", [...Object.values(HOJAS), "Fuentes"].every((h) => L.hojas.includes(h)));
  check("registrado en PREFILLS", PREFILLS["planilla-vacaciones"] === (pv.prefill as unknown));

  // 1. FERIADOS: la hoja == el calendario del sitio (inamovibles y trasladables).
  const fer = feriadosLegales([A, A + 1]);
  const ferMal = fer.filter((f, i) => L.fecha(HOJAS.feriados, `A${5 + i}`) !== f.fecha);
  check(`hoja Feriados == src/lib/feriados.ts (${fer.length} feriados)`, ferMal.length === 0, ferMal.slice(0, 3));

  // 2. EQUIPO: cada fila evaluada == motor + cronograma, en tandas de 40.
  const Eq = HOJAS.equipo;
  let mal = 0;
  const cuenta = { proporcional: 0, fraccionado: 0, estados: new Set<string>() };
  for (let i = 0; i < casos.length; i += N_EMPLEADOS) {
    const tanda = casos.slice(i, i + N_EMPLEADOS);
    const carga: Record<string, Celda> = { [PARAMETROS.hoy]: serie(tanda[0].hoy) };
    tanda.forEach((c, j) => {
      const r = pv.FILA_PRIMERA + j;
      carga[`${COL.nombre}${r}`] = null;
      carga[`${COL.ingreso}${r}`] = serie(c.ingreso);
      carga[`${COL.sueldo}${r}`] = c.sueldo;
      carga[`${COL.tramo}${r}`] = c.tramo;
      carga[`${COL.inicio}${r}`] = c.inicio ? serie(c.inicio) : null;
      carga[`${COL.notificado}${r}`] = c.notificado ? "Sí" : "No";
    });
    for (let j = tanda.length; j < N_EMPLEADOS; j++) {
      const r = pv.FILA_PRIMERA + j;
      for (const col of [COL.ingreso, COL.sueldo, COL.tramo, COL.inicio]) carga[`${col}${r}`] = null;
    }
    L.cargar(Eq, carga);
    tanda.forEach((c0, j) => {
      const c = { ...c0, hoy: tanda[0].hoy };
      const r = pv.FILA_PRIMERA + j;
      const e = esperado(c);
      const v = (col: string) => L.valor(Eq, `${col}${r}`);
      const difs: string[] = [];
      if (!e) {
        if (v(COL.valido) !== 0) difs.push("ingreso posterior al año debería quedar fuera");
      } else {
        const { r: m, cr, estado } = e;
        if (m.modo === "proporcional") cuenta.proporcional++;
        if (m.diasTomados < m.dias) cuenta.fraccionado++;
        cuenta.estados.add(estado.split(":")[0]);
        const pares: [string, unknown, number][] = [
          ["días", v(COL.dias), m.dias],
          ["días del tramo", v(COL.tramoCalc), m.diasTomados],
          ["saldo", v(COL.saldo), m.dias - m.diasTomados],
          ["valor del día", v(COL.valorDia), m.valorDiaVacaciones],
          ["a pagar", v(COL.pagar), m.retribucion],
          ["plus", v(COL.plus), m.plus],
        ];
        for (const [n, a, b] of pares) if (!igual(a, b)) difs.push(`${n}: archivo ${JSON.stringify(a)} ≠ motor ${b}`);
        if (v(COL.antiguedad) !== textoAntiguedad(c.ingreso)) difs.push(`antigüedad «${v(COL.antiguedad)}» ≠ «${textoAntiguedad(c.ingreso)}»`);
        if (v(COL.regimen) !== (m.modo === "proporcional" ? "Proporcional (art. 153)" : "Escala (art. 150)")) difs.push(`régimen ${v(COL.regimen)}`);
        if (cr && m.diasTomados > 0) {
          for (const [n, col, iso] of [["fin", COL.fin, cr.fin], ["vuelve", COL.vuelve, cr.vuelve], ["avisar", COL.avisar, cr.avisarAntesDe]] as const) {
            if (L.fecha(Eq, `${col}${r}`) !== iso) difs.push(`${n}: archivo ${L.fecha(Eq, `${col}${r}`)} ≠ ${iso}`);
          }
        }
        if (v(COL.estado) !== estado) difs.push(`estado «${v(COL.estado)}» ≠ «${estado}»`);
      }
      if (difs.length) {
        mal++;
        if (mal <= 6) console.error(`     ${JSON.stringify(c)} → ${difs.join(" · ")}`);
      }
    });
  }
  check(`Equipo == calcularVacaciones() + cronograma en ${casos.length} casos`, mal === 0);
  check(
    `la matriz cubre proporcionales (${cuenta.proporcional}), tramos (${cuenta.fraccionado}) y ${cuenta.estados.size} estados distintos`,
    cuenta.proporcional > 0 && cuenta.fraccionado > 0 && cuenta.estados.size >= 8,
    [...cuenta.estados],
  );

  // 3. LIQUIDACIÓN y TEMPORADA, con la última tanda cargada.
  const ultima = casos.slice(Math.floor((casos.length - 1) / N_EMPLEADOS) * N_EMPLEADOS);
  const hoyU = ultima[0].hoy;
  let malLiq = 0;
  for (const n of [1, 2, Math.min(ultima.length, 7)]) {
    L.cargar(HOJAS.liquidacion, { [LIQ.numero]: n });
    const r = pv.FILA_PRIMERA + n - 1;
    for (const [liq, col] of [[LIQ.dias, COL.dias], [LIQ.tramo, COL.tramoCalc], [LIQ.pagar, COL.pagar], [LIQ.plus, COL.plus], [LIQ.estado, COL.estado], [LIQ.antiguedad, COL.antiguedad], [LIQ.fin, COL.fin]] as const) {
      if (L.valor(HOJAS.liquidacion, liq) !== L.valor(Eq, `${col}${r}`)) malLiq++;
    }
  }
  check("Liquidación muestra la fila elegida de Equipo", malLiq === 0);

  const enTemporada = ultima.map((c) => ({ c, e: esperado({ ...c, hoy: hoyU }) })).filter((x) => x.e && x.e.r.dias >= 0);
  let malTemp = 0;
  for (let i = 0; i < TEMP.meses; i++) {
    const mes = 10 + i;
    const y = mes > 12 ? A + 1 : A;
    const mm = ((mes - 1) % 12) + 1;
    const pref = `${y}-${String(mm).padStart(2, "0")}`;
    const del = enTemporada.filter((x) => x.c.inicio?.startsWith(pref));
    const fila = TEMP.primeraFilaMes + i;
    const monto = del.reduce((s, x) => s + x.e!.r.retribucion, 0);
    if (L.valor(HOJAS.temporada, `B${fila}`) !== del.length || !igual(L.valor(HOJAS.temporada, `D${fila}`), monto)) {
      malTemp++;
      console.error(`     temporada ${pref}: archivo ${L.valor(HOJAS.temporada, `B${fila}`)} / ${L.valor(HOJAS.temporada, `D${fila}`)} ≠ ${del.length} / ${monto}`);
    }
  }
  const total = enTemporada.reduce((s, x) => s + x.e!.r.retribucion, 0);
  check("Temporada: personas y monto de cada mes == suma del motor", malTemp === 0);
  check("Temporada: total a pagar == suma del motor", igual(L.valor(HOJAS.temporada, TEMP.total), total), { archivo: L.valor(HOJAS.temporada, TEMP.total), total });
  const filasMes = Array.from({ length: TEMP.meses + 2 }, (_, i) => Number(L.valor(HOJAS.temporada, `D${TEMP.primeraFilaMes + i}`)));
  check("Temporada: los meses + fuera de temporada + sin fecha suman el total", igual(filasMes.reduce((a, b) => a + b, 0), total));

  // 4. NOTIFICACIÓN: el texto de la nota con las fechas del cronograma.
  const caso: Caso = { ingreso: `${A - 12}-03-01`, sueldo: 2000000, tramo: 14, inicio: `${A + 1}-01-04`, notificado: false, hoy: hoyU };
  const conInicio = 0;
  L.cargar(Eq, {
    [`${COL.ingreso}${pv.FILA_PRIMERA}`]: serie(caso.ingreso),
    [`${COL.sueldo}${pv.FILA_PRIMERA}`]: caso.sueldo,
    [`${COL.tramo}${pv.FILA_PRIMERA}`]: caso.tramo,
    [`${COL.inicio}${pv.FILA_PRIMERA}`]: serie(caso.inicio!),
    [`${COL.notificado}${pv.FILA_PRIMERA}`]: "No",
  });
  {
    const c = caso;
    const e = esperado(c)!;
    L.cargar(HOJAS.notificacion, { [NOTIF.numero]: conInicio + 1 });
    const texto =
      `Por medio de la presente le notificamos que, conforme al artículo 154 de la Ley de Contrato de Trabajo, usted gozará de ${e.r.diasTomados} días corridos de su licencia anual ordinaria correspondiente al año ${A}, desde el ${fechaLarga(e.cr!.inicio)} hasta el ${fechaLarga(e.cr!.fin)} inclusive, y deberá reintegrarse a sus tareas el ${fechaLarga(e.cr!.vuelve)}.` +
      ` Los ${e.r.dias - e.r.diasTomados} días restantes de este período los gozará en la fecha que acordemos.`;
    for (const base of NOTIF.copias) {
      const v = L.valor(HOJAS.notificacion, `A${base + NOTIF_COPIA.cuerpo}`);
      check(`nota (copia fila ${base}): texto con días y fechas del cronograma`, v === texto, { archivo: v, esperado: texto });
      check(`nota (copia fila ${base}): importe == motor`, igual(L.valor(HOJAS.notificacion, `D${base + NOTIF_COPIA.importe}`), e.r.retribucion));
    }
    check("nota: el control muestra el estado de esa persona", L.valor(HOJAS.notificacion, NOTIF.control) === e.estado);
  }

  // 5. EGRESOS == calcularIndemnizacion().vacaciones.
  L.cargar(Eq, { [`${COL.ingreso}${pv.FILA_PRIMERA}`]: serie(`${A - 6}-04-10`), [`${COL.sueldo}${pv.FILA_PRIMERA}`]: 1750000 });
  let malEgr = 0;
  const egresos: [string, string][] = [
    [`${A - 6}-04-10`, `${A}-11-30`],
    [`${A - 6}-04-10`, `${A}-01-15`],
    [`${A - 6}-04-10`, `${A + 1}-03-31`],
    [`${A - 6}-04-10`, `${A}-12-31`],
  ];
  egresos.forEach(([ingreso, egreso], i) => {
    const r = EGR.primeraFila + i;
    L.cargar(HOJAS.egresos, { [`A${r}`]: 1, [`E${r}`]: serie(egreso) });
    const v = calcularIndemnizacion({ ingresoISO: ingreso, despidoISO: egreso, mejorRemuneracion: 1750000, preavisoOtorgado: true })!.vacaciones;
    const pares: [unknown, number][] = [
      [L.valor(HOJAS.egresos, `G${r}`), v.dias],
      [L.valor(HOJAS.egresos, `H${r}`), v.monto],
      [L.valor(HOJAS.egresos, `I${r}`), v.sac],
      [L.valor(HOJAS.egresos, `J${r}`), v.monto + v.sac],
    ];
    if (pares.some(([a, b]) => !igual(a, b))) {
      malEgr++;
      console.error(`     egreso ${egreso}:`, pares);
    }
  });
  check(`Egresos == calcularIndemnizacion().vacaciones en ${egresos.length} casos`, malEgr === 0);

  // 6. El archivo genérico: los ejemplos dan estado y los inicios de ejemplo son válidos.
  check("los inicios de los ejemplos caen en lunes hábil", EJEMPLOS.every((e) => inicioValido(e.inicio)));
  const sug = inicioSugerido(HOY);
  check(`inicio sugerido desde hoy (${sug}) es válido y respeta los 30 días de aviso`, inicioValido(sug) && sug >= sumar(HOY, 30));

  // 7. PREFILL: validar (hostiles) y aplicar sobre el archivo real.
  const valido: pv.Datos = { ingresoISO: `${A - 4}-05-02`, sueldo: 1800000, diasTramo: 0, inicioISO: `${A}-12-14` };
  check("validar acepta un caso válido", JSON.stringify(pv.prefill.validar(valido)) === JSON.stringify(valido));
  const base = valido as unknown as Record<string, unknown>;
  const rotos: unknown[] = [null, undefined, "x", 42, [], [valido], {}, JSON.parse(`{"__proto__": ${JSON.stringify(valido)}}`), Object.create(valido)];
  for (const key of Object.keys(base)) {
    const v = base[key];
    rotos.push({ ...base, [key]: undefined }, { ...base, [key]: null }, { ...base, [key]: [v] }, { ...base, [key]: { v } });
    if (typeof v === "number") rotos.push({ ...base, [key]: String(v) }, { ...base, [key]: -1 }, { ...base, [key]: 1e9 }, { ...base, [key]: Number.NaN }, { ...base, [key]: Infinity });
    else rotos.push({ ...base, [key]: `${v} ` }, { ...base, [key]: "constructor" }, { ...base, [key]: "2026-02-30" }, { ...base, [key]: "2026-2-3" }, { ...base, [key]: `=HYPERLINK("http://x","${v}")` });
  }
  rotos.push({ ...base, diasTramo: 2.5 }, { ...base, diasTramo: 15 }, { ...base, ingresoISO: `${A + 1}-01-01` }, { ...base, ingresoISO: `${A}-12-20` }, { ...base, inicioISO: `${A + 2}-01-04` });
  const aceptados = rotos.filter((r) => {
    try {
      return pv.prefill.validar(r) !== null;
    } catch {
      return true;
    }
  });
  check(`validar rechaza ${rotos.length} entradas hostiles o imposibles`, aceptados.length === 0, aceptados.slice(0, 3));
  const extra = pv.prefill.validar({ ...base, nombre: "Juan Pérez", email: "x@y.z" });
  check("validar ignora campos extra (ningún dato personal pasa)", extra !== null && Object.keys(extra).sort().join() === Object.keys(base).sort().join());
  check("los datos entran holgados en la metadata de MP (2048)", JSON.stringify(valido).length < 300);

  const prefijados: pv.Datos[] = [
    valido,
    { ingresoISO: `${A - 12}-03-01`, sueldo: 2450000.5, diasTramo: 14, inicioISO: `${A + 1}-01-04` },
    { ingresoISO: `${A}-08-03`, sueldo: 1100000, diasTramo: 0, inicioISO: `${A + 1}-02-08` },
    { ingresoISO: `${A - 2}-10-10`, sueldo: 990000, diasTramo: 7, inicioISO: `${A}-11-23` },
  ];
  for (const d of prefijados) {
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.load(original as unknown as ArrayBuffer);
    pv.prefill.aplicar!(wb, pv.prefill.validar(d)!);
    const buf = Buffer.from(await wb.xlsx.writeBuffer());
    const P = await libroDe(buf);
    P.cargar(Eq, { [PARAMETROS.hoy]: serie(HOY) });
    const previa = hojaVacaciones(ARCHIVO_VACACIONES, d, HOY)!;
    const r0 = pv.FILA_PRIMERA;
    const malas: string[] = [];
    if (!igual(P.valor(Eq, `${COL.pagar}${r0}`), previa.resumen.pagar)) malas.push(`a pagar ${P.valor(Eq, `${COL.pagar}${r0}`)} ≠ ${previa.resumen.pagar}`);
    if (P.valor(Eq, `${COL.estado}${r0}`) !== previa.resumen.estadoTexto) malas.push(`estado ${P.valor(Eq, `${COL.estado}${r0}`)} ≠ ${previa.resumen.estadoTexto}`);
    for (const f of pv.FILAS_EJEMPLO) if (P.valor(Eq, `${COL.valido}${f}`) !== 0) malas.push(`el ejemplo de la fila ${f} sigue cargado`);
    if (P.valor(HOJAS.egresos, `J${EGR.primeraFila}`) !== "") malas.push("el egreso de ejemplo sigue cargado");
    if (P.valor(HOJAS.temporada, TEMP.personas) !== 1) malas.push(`temporada cuenta ${P.valor(HOJAS.temporada, TEMP.personas)} personas`);
    if (P.valor(Eq, `${COL.nombre}${r0}`) !== null && P.valor(Eq, `${COL.nombre}${r0}`) !== "") malas.push("quedó un nombre en la fila del comprador");
    for (const fl of previa.hoja.filas) {
      if (fl.fila === undefined || fl.tono === "seccion" || fl.fila === 5) continue;
      const etq = String(P.valor(HOJA_PREVIA, `A${fl.fila}`) ?? "");
      if (etq.split(" ")[0].toLowerCase() !== fl.etiqueta.split(" ")[0].toLowerCase()) malas.push(`fila ${fl.fila}: «${fl.etiqueta}» vs «${etq}»`);
      const v = P.valor(HOJA_PREVIA, `B${fl.fila}`);
      const ok =
        typeof fl.valor === "number"
          ? igual(v, fl.valor)
          : /^\d+\/\d+\/\d{4}$/.test(String(fl.valor))
            ? typeof v === "number" && fechaCorta(deSerie(v)) === fl.valor
            : String(v) === String(fl.valor);
      if (!ok) malas.push(`fila ${fl.fila} (${fl.etiqueta}): previa ${JSON.stringify(fl.valor)} ≠ archivo ${JSON.stringify(v)}`);
    }
    const ws = P.wb.getWorksheet(Eq)!;
    const ingresoCelda = ws.getCell(`${COL.ingreso}${r0}`);
    if (!ingresoCelda.dataValidation || ingresoCelda.numFmt !== "dd/mm/yyyy") malas.push("la celda de ingreso perdió validación o formato");
    check(`prefill ${JSON.stringify(d)}: archivo == motor == vista previa`, malas.length === 0, malas);
  }

  // 8. ROUND-TRIP de exceljs (lo que hace la descarga personalizada): nada se pierde.
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(original as unknown as ArrayBuffer);
  const reescrito = Buffer.from(await wb.xlsx.writeBuffer());
  const zipA = await JSZip.loadAsync(original);
  const zipB = await JSZip.loadAsync(reescrito);
  const hojasXml = Object.keys(zipA.files).filter((f) => /^xl\/worksheets\/sheet\d+\.xml$/.test(f));
  for (const h of hojasXml) {
    const a = await zipA.file(h)!.async("string");
    const b = (await zipB.file(h)?.async("string")) ?? "";
    const cuentaDe = (x: string, re: RegExp) => (x.match(re) ?? []).length;
    check(
      `round-trip ${h}: mismas fórmulas, validaciones, combinadas e impresión`,
      cuentaDe(a, /<f>/g) === cuentaDe(b, /<f>/g) &&
        cuentaDe(a, /<dataValidation /g) === cuentaDe(b, /<dataValidation /g) &&
        cuentaDe(a, /<mergeCell /g) === cuentaDe(b, /<mergeCell /g) &&
        (a.match(/printArea|fitToPage="1"/g) ?? []).length === (b.match(/printArea|fitToPage="1"/g) ?? []).length,
    );
  }
  const R1 = await libroDe(original);
  const R2 = await libroDe(reescrito);
  let malRt = 0;
  for (const h of [HOJAS.equipo, HOJAS.liquidacion, HOJAS.temporada, HOJAS.egresos]) {
    for (let r = 1; r <= FILA_FIN + 2; r++) {
      for (const col of "ABCDEFGHIJKLMNOPQRSTUVWX") {
        const a = R1.valor(h, `${col}${r}`);
        const b = R2.valor(h, `${col}${r}`);
        if (JSON.stringify(a) !== JSON.stringify(b)) malRt++;
      }
    }
  }
  check("round-trip: el archivo reescrito evalúa igual celda por celda", malRt === 0, malRt);

  console.log(`\n${fallas === 0 ? "✅" : "❌"} planilla de vacaciones: ${fallas} fallas`);
  process.exit(fallas === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
