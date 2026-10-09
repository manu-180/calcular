// Verificación de la PLANILLA de plazos fijos: abre el .xlsx que se entrega, evalúa sus fórmulas con
// HyperFormula y compara contra calcularPlazoFijo(), el motor de la calculadora gratis de
// /plazo-fijo. Lo que se compra y lo que se ve gratis tienen que dar el mismo número.
//
// Además: la tasa real con el IPC oficial contra una réplica directa (la calculadora no la modela),
// calendario, renovación, UVA (y la inflación de empate enchufada de vuelta en el motor), escalera,
// resumen del año, garantía, celdas protegidas, cero errores de fórmula, el prefill (validar con
// input hostil + aplicar), la vista previa de la oferta contra el archivo y el round-trip de exceljs.
//
// Correr con: npx tsx scripts/check_planilla_plazo_fijo.ts  (o vía scripts/check-all.ts)

import ExcelJS from "exceljs";
import path from "node:path";
import os from "node:os";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { DetailedCellError } from "hyperformula";
import { IPC_SERIE } from "../src/data/ipc-serie";
import { GARANTIA_DEPOSITOS, INFLACION_DEFAULT, TNA_FALLBACK, UVA } from "../src/data/plazofijo";
import { calcularPlazoFijo, interesPlazoFijo } from "../src/lib/plazofijo";
import { indiceDe, nombrePeriodo, ULTIMO_PERIODO } from "../src/lib/inflacion";
import { AVISO_CON_DATOS, PLANILLA_PF, isoDeSerial, prefill, renovacionesSimulador, serialDeISO, type Datos } from "../src/lib/prefill/plazo-fijo";
import { PESTANAS_PF, inflacionDeEmpate, previaPlazoFijo } from "../src/components/plazo-fijo/hojas";
import { abrirLibro as abrirLibroCrudo, type LibroEvaluable } from "./evaluar_xlsx";
import { EJEMPLOS_REGISTRO } from "./gen_planilla_plazo_fijo";

const ARCHIVO = path.join(process.cwd(), "private", PLANILLA_PF.archivo);
const H = PLANILLA_PF.hojas;
const R = PLANILLA_PF.registro;
const C = R.col;
const F0 = R.fila0;

// exceljs devuelve como Date toda celda numérica con formato de fecha, y evaluar_xlsx la pasaría a
// milisegundos: se evalúa una copia con esas celdas vueltas a número de serie (lo que guarda Excel).
async function abrirLibro(ruta: string): Promise<LibroEvaluable> {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(ruta);
  wb.eachSheet((ws) =>
    ws.eachRow({ includeEmpty: true }, (row) =>
      row.eachCell({ includeEmpty: true }, (c) => {
        if (c.value instanceof Date) {
          c.value = Math.round((c.value.getTime() - Date.UTC(1899, 11, 30)) / 86_400_000);
          c.numFmt = "0";
        }
      }),
    ),
  );
  const dir = mkdtempSync(path.join(os.tmpdir(), "pf-eval-"));
  const copia = path.join(dir, "libro.xlsx");
  await wb.xlsx.writeFile(copia);
  try {
    return await abrirLibroCrudo(copia);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const cerca = (a: unknown, b: number, rel = 1e-9, abs = 0.005) => typeof a === "number" && Math.abs(a - b) <= Math.max(abs, Math.abs(b) * rel);
const vacio = (v: unknown) => v === "" || v === null;

function erroresDeFormula(libro: LibroEvaluable): string[] {
  const errores: string[] = [];
  libro.hojas.forEach((hoja) => {
    const id = libro.hf.getSheetId(hoja)!;
    libro.hf.getSheetValues(id).forEach((fila, r) =>
      fila.forEach((v, c) => {
        if (v instanceof DetailedCellError) errores.push(`${hoja}!R${r + 1}C${c + 1}: ${v.value} ${v.message}`);
      }),
    );
  });
  return errores;
}

// ─── Réplica de la inflación oficial (la calculadora sólo modela la estimada) ───
const mesAbs = (iso: string) => Number(iso.slice(0, 4)) * 12 + Number(iso.slice(5, 7)) - 1;
const periodoDeAbs = (m: number) => `${Math.floor(m / 12)}-${String((m % 12) + 1).padStart(2, "0")}`;
const ULT_ABS = mesAbs(`${ULTIMO_PERIODO}-01`);
const BASE_ABS = 2016 * 12 + 11;
function nivel(iso: string): number {
  const m = mesAbs(iso);
  const a = indiceDe(periodoDeAbs(m - 1))!;
  const b = indiceDe(periodoDeAbs(m))!;
  const [y, mm, d] = iso.split("-").map(Number);
  const n = new Date(Date.UTC(y, mm, 0)).getUTCDate();
  return a * Math.pow(b / a, d / n);
}

type Fila = { banco: string | null; fecha: string; capital: number; tna: number; dias: number };
type Esperada = { vence: number; interes: number; cobras: number; tea: number; inflacion: number; oficial: boolean; real: number };

function esperada(f: Fila, inflMensual: number): Esperada {
  const vence = serialDeISO(f.fecha) + f.dias;
  const venceIso = isoDeSerial(vence);
  const oficial = mesAbs(f.fecha) - 1 >= BASE_ABS && mesAbs(venceIso) <= ULT_ABS;
  const motor = calcularPlazoFijo({ capital: f.capital, dias: f.dias, tnaPct: f.tna, inflacionMensualPct: inflMensual })!;
  const inflacion = oficial ? nivel(venceIso) / nivel(f.fecha) - 1 : motor.inflacionPeriodoPct / 100;
  const real = oficial ? motor.total / (1 + inflacion) / f.capital - 1 : motor.resultadoRealPct / 100;
  return { vence, interes: motor.interes, cobras: motor.total, tea: motor.teaPct / 100, inflacion, oficial, real };
}

function cargarFila(libro: LibroEvaluable, r: number, f: Fila | null) {
  libro.cargar(H.registro, {
    [`${C.banco}${r}`]: f?.banco ?? null,
    [`${C.fecha}${r}`]: f ? serialDeISO(f.fecha) : null,
    [`${C.capital}${r}`]: f?.capital ?? null,
    [`${C.tna}${r}`]: f?.tna ?? null,
    [`${C.dias}${r}`]: f?.dias ?? null,
  });
}

function compararFila(libro: LibroEvaluable, r: number, f: Fila, infl: number): string[] {
  const e = esperada(f, infl);
  const mal: string[] = [];
  const v = (col: string) => libro.valor(H.registro, `${col}${r}`);
  const ver = (campo: string, col: string, esp: number) => {
    if (!cerca(v(col), esp)) mal.push(`${campo}: ${JSON.stringify(v(col))} ≠ ${esp}`);
  };
  ver("vence", C.vence, e.vence);
  ver("interés", C.interes, e.interes);
  ver("cobrás", C.cobras, e.cobras);
  ver("TEA", C.tea, e.tea);
  ver("inflación", C.inflacion, e.inflacion);
  ver("real", C.real, e.real);
  const fuente = e.oficial ? PLANILLA_PF.fuenteOficial : PLANILLA_PF.fuenteEstimada;
  if (v(C.fuente) !== fuente) mal.push(`fuente ${JSON.stringify(v(C.fuente))} ≠ ${fuente}`);
  const res = String(v(C.resultado));
  const gana = e.real >= 0;
  const okRes = e.oficial ? res === (gana ? "Le ganó a la inflación" : "Perdió contra la inflación") : res.startsWith(gana ? "Le gana" : "Pierde");
  if (!okRes) mal.push(`resultado «${res}» (real ${e.real})`);
  return mal;
}

// ─── Round-trip exceljs: load → write no cambia fórmulas, validaciones ni resultados ───
async function roundTrip(): Promise<string[]> {
  const original = readFileSync(ARCHIVO);
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(original as unknown as ArrayBuffer);
  const wb2 = new ExcelJS.Workbook();
  await wb2.xlsx.load((await wb.xlsx.writeBuffer()) as ArrayBuffer);
  const mal: string[] = [];
  const foto = (w: ExcelJS.Workbook) => {
    const m = new Map<string, string>();
    w.eachSheet((ws) =>
      ws.eachRow({ includeEmpty: true }, (row) =>
        row.eachCell({ includeEmpty: true }, (c) =>
          m.set(`${ws.name}!${c.address}`, JSON.stringify({ v: c.value, s: c.style, p: c.protection ?? null, d: c.dataValidation ?? null })),
        ),
      ),
    );
    return m;
  };
  const a = foto(wb);
  const b = foto(wb2);
  if (a.size !== b.size) mal.push(`celdas: ${a.size} → ${b.size}`);
  for (const [k, x] of a) if (b.get(k) !== x) {
    mal.push(`${k}: ${x.slice(0, 120)} → ${(b.get(k) ?? "").slice(0, 120)}`);
    if (mal.length > 3) break;
  }
  const merges = (w: ExcelJS.Workbook) => {
    const s: string[] = [];
    w.eachSheet((ws) => s.push(`${ws.name}:${JSON.stringify((ws.model as { merges?: string[] }).merges?.slice().sort())}`));
    return s.join("|");
  };
  if (merges(wb) !== merges(wb2)) mal.push("celdas combinadas distintas");
  const prot = (w: ExcelJS.Workbook) => {
    const s: string[] = [];
    w.eachSheet((ws) => s.push(`${ws.name}:${JSON.stringify((ws as unknown as { sheetProtection?: unknown }).sheetProtection ?? null)}`));
    return s.join("|");
  };
  if (prot(wb) !== prot(wb2)) mal.push("protección de hojas distinta");
  return mal;
}

async function main() {
  check("el archivo entregable existe", existsSync(ARCHIVO), ARCHIVO);
  if (!existsSync(ARCHIVO)) process.exit(1);
  const libro = await abrirLibro(ARCHIVO);
  check("tiene las hojas prometidas, en orden (y las mismas que muestra la vista previa)", JSON.stringify(libro.hojas) === JSON.stringify(PESTANAS_PF), libro.hojas);

  // 1. IPC del archivo == el del sitio.
  const malIpc = IPC_SERIE.filter(([, x], i) => libro.crudo(H.ipc, `D${5 + i}`) !== x);
  check(`serie del IPC del archivo == src/data/ipc-serie.ts (${IPC_SERIE.length} meses)`, malIpc.length === 0, malIpc.slice(0, 3));
  check("último IPC del archivo == ULTIMO_PERIODO", libro.valor(H.ipc, "J4") === nombrePeriodo(ULTIMO_PERIODO), libro.valor(H.ipc, "J4"));
  check("la inflación estimada por defecto es el último dato oficial", libro.crudo(H.registro, R.inflacion) === INFLACION_DEFAULT.mensualPct);
  check("la TNA de referencia de los simuladores es la del BCRA del repo", libro.crudo(H.renovacion, PLANILLA_PF.renovacion.tna) === TNA_FALLBACK.valor);
  check("sin errores de fórmula en el archivo tal como se entrega", erroresDeFormula(libro).length === 0, erroresDeFormula(libro).slice(0, 5));

  const hoy = libro.numero(H.registro, R.hoy);
  const hoyJs = serialDeISO(new Date().toISOString().slice(0, 10));
  check("«Hoy» es la fecha del día", Math.abs(hoy - hoyJs) <= 1, [hoy, hoyJs]);
  const infl = INFLACION_DEFAULT.mensualPct;

  // 2. Los ejemplos del archivo: uno con IPC oficial y otro estimado, y los dos == motor/réplica.
  EJEMPLOS_REGISTRO.forEach((ej, i) => {
    // La fecha del ejemplo 2 es «hoy» al generar el archivo: el .xlsx versionado puede tener días y la réplica se arma con la fecha que el archivo trae.
    const fechaDelArchivo = isoDeSerial(libro.numero(H.registro, `${C.fecha}${F0 + i}`));
    const mal = compararFila(libro, F0 + i, { ...ej, fecha: fechaDelArchivo }, infl);
    check(`ejemplo ${i + 1} de «${H.registro}» == calculadora/réplica`, mal.length === 0, mal);
  });
  check("el ejemplo 1 usa el IPC del INDEC y el 2 la estimada", libro.valor(H.registro, `${C.fuente}${F0}`) === PLANILLA_PF.fuenteOficial && libro.valor(H.registro, `${C.fuente}${F0 + 1}`) === PLANILLA_PF.fuenteEstimada);

  // 3. MATRIZ del registro: fechas viejas (IPC oficial) y nuevas (estimada), montos, tasas, plazos.
  const fechas = ["2017-01-01", "2018-02-28", "2020-03-31", "2023-12-15", "2024-02-29", "2025-06-02", `${ULTIMO_PERIODO}-01`, isoDeSerial(hoy), isoDeSerial(hoy + 40)];
  const casos: Fila[] = [];
  for (const fecha of fechas)
    for (const dias of [30, 31, 45, 90, 180, 365])
      for (const [capital, tna] of [[1, 0], [1_234_567.89, TNA_FALLBACK.valor], [50_000_000, 120]] as const) casos.push({ banco: "X", fecha, capital, tna, dias });
  const malMatriz: string[] = [];
  let oficiales = 0;
  casos.forEach((f, i) => {
    const r = F0 + (i % R.filas);
    cargarFila(libro, r, f);
    if (esperada(f, infl).oficial) oficiales++;
    const mal = compararFila(libro, r, f, infl);
    if (mal.length) malMatriz.push(`${JSON.stringify(f)} → ${mal.slice(0, 2).join(" | ")}`);
  });
  check(`registro == calculadora (estimada) y réplica del IPC (oficial) en ${casos.length} casos (${oficiales} con IPC oficial)`, malMatriz.length === 0, malMatriz.slice(0, 4));
  check("la matriz cubre los dos regímenes", oficiales > 20 && casos.length - oficiales > 20, oficiales);

  // La interpolación diaria, a mano: un plazo de mes calendario completo da la variación del IPC de ese mes.
  const mesCompleto: Fila = { banco: "X", fecha: "2025-03-31", capital: 100, tna: 0, dias: 30 };
  cargarFila(libro, F0, mesCompleto);
  const abrilIpc = indiceDe("2025-04")! / indiceDe("2025-03")! - 1;
  check("31/3 → 30/4 toma exactamente el IPC de abril", cerca(libro.valor(H.registro, `${C.inflacion}${F0}`), abrilIpc, 1e-12, 1e-12), [libro.valor(H.registro, `${C.inflacion}${F0}`), abrilIpc]);

  // 4. Estados, vacíos y datos incompletos.
  for (let r = F0; r < F0 + R.filas; r++) cargarFila(libro, r, null);
  check("con el registro vacío, el resumen no tiene próximo vencimiento", vacio(libro.valor(H.registro, "B11")) && String(libro.valor(H.registro, "C11")).startsWith("No hay plazos fijos"));
  check("con el registro vacío, el calendario lo dice", String(libro.valor(H.calendario, "A2")).startsWith("No hay plazos fijos vigentes"));
  libro.cargar(H.registro, { [`${C.capital}${F0}`]: 100000, [`${C.dias}${F0}`]: 20 });
  check("una fila incompleta (o de menos de 30 días) pide los datos y no calcula", String(libro.valor(H.registro, `${C.resultado}${F0}`)).startsWith("Faltan datos") && vacio(libro.valor(H.registro, `${C.cobras}${F0}`)));
  cargarFila(libro, F0, null);
  check("una fila vacía no muestra nada", vacio(libro.valor(H.registro, `${C.resultado}${F0}`)) && vacio(libro.valor(H.registro, `${C.estado}${F0}`)));
  const iso = (n: number) => isoDeSerial(hoy + n);
  const estados: [Fila, string][] = [
    [{ banco: "A", fecha: iso(-40), capital: 1000, tna: 30, dias: 30 }, "Vencido"],
    [{ banco: "A", fecha: iso(-30), capital: 1000, tna: 30, dias: 30 }, "Vence hoy"],
    [{ banco: "A", fecha: iso(-29), capital: 1000, tna: 30, dias: 30 }, "Faltan 1 día"],
    [{ banco: "A", fecha: iso(0), capital: 1000, tna: 30, dias: 45 }, "Faltan 45 días"],
  ];
  estados.forEach(([f, e], i) => cargarFila(libro, F0 + i, f));
  const malEst = estados.map(([, e], i) => [libro.valor(H.registro, `${C.estado}${F0 + i}`), e]).filter(([a, b]) => a !== b);
  check("estado: vencido, vence hoy, faltan N días", malEst.length === 0, malEst);

  // 5. Resumen, calendario y garantía con una cartera conocida.
  for (let r = F0; r < F0 + R.filas; r++) cargarFila(libro, r, null);
  const cartera: Fila[] = [
    { banco: "Banco Sur", fecha: iso(-5), capital: 30_000_000, tna: 25, dias: 60 },
    { banco: "Banco Sur", fecha: iso(-2), capital: 21_000_000, tna: 24, dias: 30 },
    { banco: "Banco Norte", fecha: iso(-10), capital: 2_000_000, tna: 22, dias: 30 },
    { banco: "Banco Norte", fecha: iso(-10), capital: 3_000_000, tna: 22, dias: 30 },
    { banco: "Banco Oeste", fecha: iso(-100), capital: 1_000_000, tna: 30, dias: 30 },
    { banco: "", fecha: iso(-1), capital: 500_000, tna: 20, dias: 90 },
  ];
  cartera.forEach((f, i) => cargarFila(libro, F0 + i, f));
  const exp = cartera.map((f) => ({ f, e: esperada(f, infl) }));
  const vig = exp.filter((x) => x.e.vence >= hoy);
  const suma = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
  check("resumen: capital vigente", cerca(libro.valor(H.registro, "B9"), suma(vig.map((x) => x.f.capital))));
  check("resumen: intereses por cobrar", cerca(libro.valor(H.registro, "B10"), suma(vig.map((x) => x.e.interes))));
  const orden = [...vig].sort((a, b) => a.e.vence - b.e.vence || cartera.indexOf(a.f) - cartera.indexOf(b.f));
  check("resumen: próximo vencimiento y su banco", libro.valor(H.registro, "B11") === orden[0].e.vence && libro.valor(H.registro, "C11") === orden[0].f.banco, [libro.valor(H.registro, "B11"), libro.valor(H.registro, "C11"), orden[0]]);
  check("resumen: lo que se acredita en 30 días", cerca(libro.valor(H.registro, "B12"), suma(vig.filter((x) => x.e.vence <= hoy + 30).map((x) => x.e.cobras))));
  const malCal = orden
    .map((x, k) => {
      const r = 5 + k;
      const ok = libro.valor(H.calendario, `A${r}`) === x.e.vence && libro.valor(H.calendario, `B${r}`) === (x.f.banco ?? "") && cerca(libro.valor(H.calendario, `E${r}`), x.e.cobras) && libro.valor(H.calendario, `F${r}`) === x.e.vence - hoy;
      return ok ? null : `${k}: ${JSON.stringify([libro.valor(H.calendario, `A${r}`), libro.valor(H.calendario, `B${r}`), libro.valor(H.calendario, `E${r}`)])} ≠ ${x.e.vence} ${x.f.banco}`;
    })
    .filter(Boolean);
  check(`calendario: los ${orden.length} vigentes en orden de vencimiento, sin el vencido`, malCal.length === 0 && vacio(libro.valor(H.calendario, `A${5 + orden.length}`)), malCal);
  const mesHoy = mesAbs(isoDeSerial(hoy));
  const malMes: string[] = [];
  for (let i = 0; i < 12; i++) {
    const enMes = vig.filter((x) => mesAbs(isoDeSerial(x.e.vence)) === mesHoy + i);
    const r = 32 + i;
    if (libro.valor(H.calendario, `A${r}`) !== nombrePeriodo(periodoDeAbs(mesHoy + i))) malMes.push(`mes ${i}: ${libro.valor(H.calendario, `A${r}`)}`);
    if (libro.valor(H.calendario, `B${r}`) !== enMes.length || !cerca(libro.valor(H.calendario, `C${r}`), suma(enMes.map((x) => x.e.cobras)))) malMes.push(`mes ${i}: ${libro.valor(H.calendario, `B${r}`)} / ${libro.valor(H.calendario, `C${r}`)}`);
  }
  check("calendario: cantidad y monto por mes de los próximos 12", malMes.length === 0, malMes);
  const gar = (i: number) => libro.valor(H.registro, `${C.garantia}${F0 + i}`);
  const surVig = suma(vig.filter((x) => x.f.banco === "Banco Sur").map((x) => x.e.cobras));
  check("garantía: el banco que pasa el tope sumando sus plazos fijos lo dice", surVig > GARANTIA_DEPOSITOS.monto && gar(0) === "Supera el tope en este banco" && gar(1) === "Supera el tope en este banco", [surVig, gar(0)]);
  check("garantía: el que no lo pasa, también", gar(2) === "Dentro del tope" && gar(3) === "Dentro del tope");
  check("garantía: un vencido no opina y una fila sin banco lo pide", vacio(gar(4)) && String(gar(5)).startsWith("Cargá el banco"), [gar(4), gar(5)]);

  // Resumen del año: año de vencimiento.
  const anio = Number(isoDeSerial(hoy).slice(0, 4));
  libro.cargar(H.resumen, { B5: anio });
  const delAnio = exp.filter((x) => Number(isoDeSerial(x.e.vence).slice(0, 4)) === anio);
  const RS = { cantidad: "B8", capital: "B9", intereses: "B10", cobrados: "B11", real: "B12" };
  const okRes =
    libro.valor(H.resumen, RS.cantidad) === delAnio.length &&
    cerca(libro.valor(H.resumen, RS.capital), suma(delAnio.map((x) => x.f.capital))) &&
    cerca(libro.valor(H.resumen, RS.intereses), suma(delAnio.map((x) => x.e.interes))) &&
    cerca(libro.valor(H.resumen, RS.cobrados), suma(delAnio.filter((x) => x.e.vence <= hoy).map((x) => x.e.interes))) &&
    cerca(libro.valor(H.resumen, RS.real), suma(delAnio.map((x) => x.e.cobras / (1 + x.e.inflacion) - x.f.capital)), 1e-9, 0.01);
  check(`resumen del año ${anio}: cantidad, capital, intereses, cobrados y ganancia real`, okRes, [RS, delAnio.length]);
  libro.cargar(H.resumen, { B5: 2025 });
  check("resumen: inflación de 2025 == IPC dic-25 / dic-24", cerca(libro.valor(H.resumen, "B15"), indiceDe("2025-12")! / indiceDe("2024-12")! - 1, 1e-12), libro.valor(H.resumen, "B15"));
  libro.cargar(H.resumen, { B5: Number(ULTIMO_PERIODO.slice(0, 4)) });
  check("resumen: inflación del año en curso, hasta el último IPC", cerca(libro.valor(H.resumen, "B15"), indiceDe(ULTIMO_PERIODO)! / indiceDe(`${Number(ULTIMO_PERIODO.slice(0, 4)) - 1}-12`)! - 1, 1e-12) && libro.valor(H.resumen, "B16") === nombrePeriodo(ULTIMO_PERIODO));
  libro.cargar(H.resumen, { B5: 2039 });
  check("resumen: un año sin IPC lo dice", vacio(libro.valor(H.resumen, "B15")) && String(libro.valor(H.resumen, "B16")).startsWith("Todavía no hay IPC"));

  // 6. Renovación y UVA == calcularPlazoFijo(), en matriz.
  const malRen: string[] = [];
  const malUva: string[] = [];
  let nUva = 0;
  const KR = PLANILLA_PF.renovacion;
  const KU = PLANILLA_PF.uva;
  for (const capital of [1, 987_654.32, 25_000_000])
    for (const dias of [30, 35, 60, 90, 365])
      for (const renov of [0, 1, 2, 11, 24])
        for (const [tna, inf, adic] of [[TNA_FALLBACK.valor, 1.7, 4.5], [0, 0, 0], [80, 6.5, 1]] as const) {
          const m = calcularPlazoFijo({ capital, dias, tnaPct: tna, renovaciones: renov, inflacionMensualPct: inf, uvaTnaAdicionalPct: adic })!;
          libro.cargar(H.renovacion, { [KR.capital]: capital, [KR.tna]: tna, [KR.dias]: dias, [KR.renovaciones]: renov, [KR.inflacion]: inf });
          const rv = (ref: string) => libro.valor(H.renovacion, ref);
          const pares: [string, number][] = [
            ["B12", m.interes], ["B13", m.total], ["B14", m.tasaEfectivaPeriodoPct / 100], ["B15", m.temPct / 100], ["B16", m.teaPct / 100],
            ["B19", m.diasTotales], ["B20", m.totalFinal], ["B21", m.interesTotal], ["B22", m.rendimientoTotalPct / 100],
            ["B23", m.inflacionPeriodoPct / 100], ["B24", m.poderCompraFinal], ["B25", m.resultadoRealPct / 100],
          ];
          for (const [ref, x] of pares) if (!cerca(rv(ref), x)) malRen.push(`${capital}/${dias}/${renov}/${tna}: ${ref} ${JSON.stringify(rv(ref))} ≠ ${x}`);
          m.periodos.forEach((p, i) => {
            const r = KR.fila0 + i;
            if (!cerca(rv(`C${r}`), p.interesDelPeriodo) || !cerca(rv(`D${r}`), p.capital) || rv(`B${r}`) !== p.diasAcumulados) malRen.push(`período ${p.n}: ${rv(`D${r}`)} ≠ ${p.capital}`);
          });
          if (!vacio(rv(`D${KR.fila0 + m.periodos.length}`)) && m.periodos.length < KR.periodos) malRen.push("fila de más en la tabla");

          libro.cargar(H.uva, { [KU.capital]: capital, [KU.dias]: dias, [KU.renovaciones]: renov, [KU.tna]: tna, [KU.inflacion]: inf, [KU.adicional]: adic });
          const uv = (ref: string) => libro.valor(H.uva, ref);
          if (!cerca(uv("B13"), m.diasTotales) || !cerca(uv("B15"), m.totalFinal) || !cerca(uv("B14"), m.inflacionPeriodoPct / 100)) malUva.push(`${capital}/${dias}/${renov}: base`);
          if (m.uva) {
            nUva++;
            if (!cerca(uv("B16"), m.uva.total) || !cerca(uv("B17"), m.uva.total - m.totalFinal)) malUva.push(`${capital}/${dias}/${renov}: UVA ${uv("B16")} ≠ ${m.uva.total}`);
            const emp = inflacionDeEmpate(m, capital)!;
            if (!cerca(uv("B18"), emp / 100, 1e-9, 1e-12)) malUva.push(`empate ${uv("B18")} ≠ ${emp / 100}`);
            const enEmpate = calcularPlazoFijo({ capital, dias, tnaPct: tna, renovaciones: renov, inflacionMensualPct: emp, uvaTnaAdicionalPct: adic })!;
            if (!cerca(enEmpate.uva!.total, enEmpate.totalFinal, 1e-9)) malUva.push(`con la inflación de empate el motor no empata: ${enEmpate.uva!.total} vs ${enEmpate.totalFinal}`);
          } else if (!vacio(uv("B16")) || !String(uv("B19")).includes(`${UVA.plazoMinimoDias} días como mínimo`)) malUva.push(`${dias}×${renov + 1} días: debía avisar el mínimo del UVA`);
        }
  check("renovación (resumen y tabla período por período) == calcularPlazoFijo() en 225 casos", malRen.length === 0, malRen.slice(0, 4));
  check(`tradicional vs UVA == calcularPlazoFijo() (${nUva} con UVA), y la inflación de empate empata en el motor`, malUva.length === 0 && nUva > 50, malUva.slice(0, 4));

  // 7. Escalera == interesPlazoFijo().
  const KE = PLANILLA_PF.escalera;
  const malEsc: string[] = [];
  for (const [capital, n, cada, tna] of [[1_000_000, 4, 30, 22.27], [7_777_777, 12, 30, 30], [500_000, 3, 90, 0], [1_000_000, 1, 45, 25]] as const) {
    libro.cargar(H.escalera, { [KE.capital]: capital, [KE.escalones]: n, [KE.cada]: cada, [KE.fecha]: hoy, [KE.tna]: tna, D16: n >= 2 ? 40 : null });
    let tot = 0;
    for (let k = 1; k <= KE.max; k++) {
      const r = KE.fila0 + k - 1;
      const g = libro.valor(H.escalera, `G${r}`);
      if (k > n) {
        if (!vacio(g)) malEsc.push(`escalón ${k} de más`);
        continue;
      }
      const t = k === 2 ? 40 : tna;
      const esp = interesPlazoFijo(capital / n, t, k * cada);
      tot += esp;
      if (!cerca(g, esp) || libro.valor(H.escalera, `F${r}`) !== hoy + k * cada || libro.valor(H.escalera, `I${r}`) !== n * cada) malEsc.push(`${capital}/${n}/${cada} escalón ${k}: ${g} ≠ ${esp}`);
    }
    if (!cerca(libro.valor(H.escalera, "B12"), tot)) malEsc.push(`total ${libro.valor(H.escalera, "B12")} ≠ ${tot}`);
  }
  check("escalera: capital, vencimientos, TNA por escalón e interés == interesPlazoFijo()", malEsc.length === 0, malEsc.slice(0, 4));
  check("sin errores de fórmula después de toda la matriz", erroresDeFormula(libro).length === 0, erroresDeFormula(libro).slice(0, 5));

  // 8. IPC cargado a mano: una fila estimada pasa al IPC oficial.
  const filaNuevo = 5 + IPC_SERIE.length;
  for (let r = F0; r < F0 + R.filas; r++) cargarFila(libro, r, null);
  const prox: Fila = { banco: "X", fecha: `${ULTIMO_PERIODO}-10`, capital: 1_000_000, tna: 30, dias: 30 };
  cargarFila(libro, F0, prox);
  const antes = libro.valor(H.registro, `${C.fuente}${F0}`);
  libro.cargar(H.ipc, { [`F${filaNuevo}`]: 2 });
  check("cargar el IPC del mes que faltaba pasa la fila de «Estimada» a «IPC del INDEC»", antes === PLANILLA_PF.fuenteEstimada && libro.valor(H.registro, `${C.fuente}${F0}`) === PLANILLA_PF.fuenteOficial, [antes, libro.valor(H.registro, `${C.fuente}${F0}`)]);
  libro.cargar(H.ipc, { [`F${filaNuevo}`]: null });

  // 9. Protección.
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(ARCHIVO);
  const protegida = (ws: ExcelJS.Worksheet) => Boolean((ws as unknown as { sheetProtection?: { sheet?: boolean } }).sheetProtection?.sheet);
  check("las hojas de cálculo están protegidas", [H.registro, H.calendario, H.renovacion, H.uva, H.escalera, H.resumen, H.ipc].every((h) => protegida(wb.getWorksheet(h)!)));
  const reg = wb.getWorksheet(H.registro)!;
  const libres = [R.inflacion, `${C.banco}${F0}`, `${C.fecha}${F0 + 23}`, `${C.capital}${F0}`, `${C.tna}${F0}`, `${C.dias}${F0}`].every((ref) => reg.getCell(ref).protection?.locked === false);
  check("las celdas amarillas del registro no están bloqueadas", libres);
  check("las fórmulas del registro sí", [`${C.vence}${F0}`, `${C.real}${F0}`, "B9", `P${F0}`].every((ref) => reg.getCell(ref).protection?.locked !== false));
  check("las fechas se ven como fecha", reg.getCell(`${C.fecha}${F0}`).numFmt === "dd/mm/yyyy" && reg.getCell(`${C.vence}${F0}`).numFmt === "dd/mm/yyyy");
  const sinIgual: string[] = [];
  wb.eachSheet((ws) => ws.eachRow((row) => row.eachCell((c) => {
    const f = (c.value as { formula?: string } | null)?.formula;
    if (f && f.startsWith("=")) sinIgual.push(`${ws.name}!${c.address}`);
  })));
  check("ninguna fórmula empieza con «=» (Excel ofrecería reparar el archivo)", sinIgual.length === 0, sinIgual.slice(0, 3));

  // 10. Prefill: validar con input hostil.
  const base = { capital: 1_000_000, dias: 30, tnaPct: 22.27, renovaciones: 0, inflacionMensualPct: 1.7, uvaTnaAdicionalPct: 4.5, fecha: "2026-10-06" };
  const hostiles: [string, unknown][] = [
    ["null", null], ["string", "1000000"], ["array", [1, 2]], ["sin campos", {}],
    ["capital 0", { ...base, capital: 0 }], ["capital negativo", { ...base, capital: -5 }], ["capital NaN", { ...base, capital: NaN }],
    ["capital Infinity", { ...base, capital: Infinity }], ["capital string", { ...base, capital: "1000000" }], ["capital gigante", { ...base, capital: 1e15 }],
    ["días 29", { ...base, dias: 29 }], ["días decimal", { ...base, dias: 30.5 }], ["días enormes", { ...base, dias: 5000 }],
    ["TNA negativa", { ...base, tnaPct: -1 }], ["TNA absurda", { ...base, tnaPct: 5000 }],
    ["renovaciones 25", { ...base, renovaciones: 25 }], ["renovaciones decimal", { ...base, renovaciones: 1.5 }],
    ["inflación 500", { ...base, inflacionMensualPct: 500 }], ["UVA negativo", { ...base, uvaTnaAdicionalPct: -1 }],
    ["fecha fórmula", { ...base, fecha: '=HYPERLINK("x")' }], ["fecha 31/2", { ...base, fecha: "2026-02-31" }], ["fecha 2016", { ...base, fecha: "2016-12-31" }],
    ["fecha con hora", { ...base, fecha: "2026-10-06T00:00" }], ["fecha número", { ...base, fecha: 46000 }], ["sin fecha", { ...base, fecha: undefined }],
    ["fecha heredada", Object.assign(Object.create({ fecha: "2026-10-06" }), { ...base, fecha: undefined })],
  ];
  const pasaron = hostiles.filter(([, raw]) => prefill.validar(raw) !== null).map(([n]) => n);
  check(`validar rechaza ${hostiles.length} entradas hostiles`, pasaron.length === 0, pasaron);
  const ok = prefill.validar({ ...base, capital: 1234567.555, tnaPct: 22.123456, extra: "<script>", nombre: "Juan" });
  check("validar acepta lo que manda la calculadora, redondea y descarta campos de más", JSON.stringify(ok) === JSON.stringify({ ...base, capital: 1234567.56, tnaPct: 22.1235 }), ok);
  check("validar acepta el 29/2 de un bisiesto", prefill.validar({ ...base, fecha: "2028-02-29" }) !== null);
  check("los datos entran holgados en la metadata del pago", JSON.stringify(ok).length < 400, JSON.stringify(ok).length);
  check("renovaciones del simulador: 30 días sin renovar → un año (11)", renovacionesSimulador({ dias: 30, renovaciones: 0 }) === 11 && renovacionesSimulador({ dias: 365, renovaciones: 0 }) === 0 && renovacionesSimulador({ dias: 90, renovaciones: 2 }) === 2);

  // 11. Prefill aplicado sobre el archivo real + la vista previa de la oferta contra ese archivo.
  const casosPrefill: Datos[] = [
    { ...base, fecha: isoDeSerial(hoy) },
    { capital: 15_500_000, dias: 90, tnaPct: 31.5, renovaciones: 3, inflacionMensualPct: 2.4, uvaTnaAdicionalPct: 1, fecha: isoDeSerial(hoy) },
    { capital: 250_000, dias: 45, tnaPct: 0, renovaciones: 0, inflacionMensualPct: 0, uvaTnaAdicionalPct: 0, fecha: isoDeSerial(hoy - 3) },
  ];
  const tmp = mkdtempSync(path.join(os.tmpdir(), "pf-"));
  for (const [i, d] of casosPrefill.entries()) {
    const wbP = new ExcelJS.Workbook();
    await wbP.xlsx.readFile(ARCHIVO);
    prefill.aplicar!(wbP, d);
    const rutaP = path.join(tmp, `prefill-${i}.xlsx`);
    await wbP.xlsx.writeFile(rutaP);
    const lp = await abrirLibro(rutaP);
    const previa = previaPlazoFijo(PLANILLA_PF.archivo, d)!;
    const malP = previa.esperado.filter((e) => !cerca(lp.valor(e.hoja, e.ref), e.valor, 1e-9, 1e-9)).map((e) => `${e.hoja}!${e.ref}: ${JSON.stringify(lp.valor(e.hoja, e.ref))} ≠ ${e.valor}`);
    check(`prefill ${i + 1}: el archivo da lo mismo que la vista previa de la oferta (${previa.esperado.length} celdas)`, malP.length === 0, malP);
    const malFilas = [...previa.renovacion.filas, ...previa.uva.filas].filter((f) => f.fila && f.tono !== "seccion" && f.tono !== "input" && typeof f.valor === "number").filter((f) => {
      const hoja = previa.renovacion.filas.includes(f) ? H.renovacion : H.uva;
      return !cerca(lp.valor(hoja, `B${f.fila}`), f.valor as number, 1e-9);
    });
    check(`prefill ${i + 1}: cada monto de la vista previa está en su fila real del archivo`, malFilas.length === 0, malFilas);
    check(`prefill ${i + 1}: la fila del registro es la de la calculadora y se borraron los ejemplos`,
      lp.crudo(H.registro, `${C.fecha}${F0}`) === serialDeISO(d.fecha) && lp.crudo(H.registro, `${C.capital}${F0}`) === d.capital &&
        vacio(lp.crudo(H.registro, `${C.banco}${F0}`)) && vacio(lp.crudo(H.registro, `${C.capital}${F0 + 1}`)) && lp.crudo(H.registro, "A2") === AVISO_CON_DATOS);
    check(`prefill ${i + 1}: la fila sale estimada, con la inflación de la persona`, lp.valor(H.registro, `${C.fuente}${F0}`) === PLANILLA_PF.fuenteEstimada && lp.crudo(H.registro, R.inflacion) === d.inflacionMensualPct);
    check(`prefill ${i + 1}: la escalera arranca con su capital, su fecha y su TNA`, lp.crudo(H.escalera, PLANILLA_PF.escalera.capital) === d.capital && lp.crudo(H.escalera, PLANILLA_PF.escalera.fecha) === serialDeISO(d.fecha) && cerca(lp.valor(H.escalera, "G15"), interesPlazoFijo(d.capital / 4, d.tnaPct, 30)));
    check(`prefill ${i + 1}: sin errores de fórmula`, erroresDeFormula(lp).length === 0, erroresDeFormula(lp).slice(0, 3));
    lp.hf.destroy();
  }
  rmSync(tmp, { recursive: true, force: true });

  // 12. Round-trip de exceljs (lo que hace el prefill en el servidor no rompe el archivo).
  const malRt = await roundTrip();
  check("round-trip exceljs load→write: mismas fórmulas, valores, estilos, validaciones, combinadas y protección", malRt.length === 0, malRt);

  console.log(`\n${fallas === 0 ? "✅" : "❌"} planilla de plazos fijos: ${fallas} fallas`);
  process.exit(fallas === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
