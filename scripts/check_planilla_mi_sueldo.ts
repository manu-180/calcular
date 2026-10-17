// Verificación de la PLANILLA MI SUELDO: abre el .xlsx que se entrega, evalúa sus fórmulas con
// HyperFormula y compara contra los motores del sitio — brutoANeto (la calculadora de
// /sueldo-neto), sueldoVsInflacion, calcularAguinaldo y estimarGananciasAnual. Si la planilla y la
// calculadora no dan lo mismo, el control del recibo marcaría «Revisar» a alguien que cobra bien.
//
// Además: IPC del archivo == src/data/ipc-serie.ts, el ejemplo marca el recibo mal descontado,
// cada estado del control, celdas protegidas, fórmulas sin «=», cero errores, round-trip de
// exceljs y el prefill (validar con input hostil + aplicar → la vista previa da lo mismo que el archivo).
//
// Correr con: npx tsx scripts/check_planilla_mi_sueldo.ts

import ExcelJS from "exceljs";
import path from "node:path";
import os from "node:os";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { DetailedCellError } from "hyperformula";
import { IPC_SERIE } from "../src/data/ipc-serie";
import { topeSipa } from "../src/data/sueldo";
import { brutoANeto } from "../src/lib/sueldo";
import { MESES_LARGOS, nombrePeriodo, sueldoVsInflacion, sumarMeses, ULTIMO_PERIODO, type Periodo } from "../src/lib/inflacion";
import { calcularAguinaldo } from "../src/lib/aguinaldo";
import { estimarGananciasAnual } from "../src/lib/ganancias";
import { AVISO_CON_DATOS, ESTADOS_RECIBO, PLANILLA_MS, prefill, primerMesPara, type Datos } from "../src/lib/prefill/mi-sueldo";
import { datosEjemplo, hojaMiSueldo, PESTANAS_MI_SUELDO, pisoGanancias, semestreDe } from "../src/components/mi-sueldo/modelo";
import { abrirLibro, type LibroEvaluable } from "./evaluar_xlsx";
import { EJEMPLO, FILAS_AGUINALDO } from "./gen_planilla_mi_sueldo";

const ARCHIVO = path.join(process.cwd(), "private", PLANILLA_MS.archivo);
const H = PLANILLA_MS.hojas;
const D = PLANILLA_MS.datos;
const RC = PLANILLA_MS.recibo;
const F = PLANILLA_MS.resumen;
const O = PLANILLA_MS.opciones;
const F0 = PLANILLA_MS.fila0;
const N = PLANILLA_MS.meses;

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const igual = (a: unknown, b: number, tol = 0.005) => typeof a === "number" && Math.abs(a - b) < tol;
const vacio = (v: unknown) => v === "" || v === null;

function erroresDeFormula(libro: LibroEvaluable): string[] {
  const errores: string[] = [];
  for (const hoja of libro.hojas) {
    const id = libro.hf.getSheetId(hoja)!;
    const valores = libro.hf.getSheetValues(id);
    valores.forEach((fila, r) =>
      fila.forEach((v, c) => {
        if (v instanceof DetailedCellError) errores.push(`${hoja}!R${r + 1}C${c + 1}: ${v.value} ${v.message}`);
      }),
    );
  }
  return errores;
}

const vacios = () => {
  const o: Record<string, null> = {};
  for (let i = 0; i < N; i++) for (const col of Object.values(RC)) o[`${col}${F0 + i}`] = null;
  return o;
};

function arrancarEn(libro: LibroEvaluable, p: Periodo, extra: Record<string, string | number | null> = {}) {
  const [anio, mes] = p.split("-").map(Number);
  libro.cargar(H.datos, {
    [D.mes]: MESES_LARGOS[mes - 1],
    [D.anio]: anio,
    [D.sindical]: 0,
    [D.osNoRem]: O.no,
    [D.sindNoRem]: O.no,
    [D.comparar]: O.compararBruto,
    [D.conyuge]: O.no,
    [D.hijos]: 0,
    [D.otras]: 0,
    ...extra,
  });
  libro.cargar(H.recibos, vacios());
}

async function main() {
  check("el archivo existe", existsSync(ARCHIVO), ARCHIVO);
  if (!existsSync(ARCHIVO)) return;
  const libro = await abrirLibro(ARCHIVO);

  // 1. Estructura.
  check("pestañas en el orden de la vista previa", JSON.stringify(libro.hojas) === JSON.stringify(PESTANAS_MI_SUELDO), libro.hojas);
  check("sin errores de fórmula en el archivo tal como se entrega", erroresDeFormula(libro).length === 0, erroresDeFormula(libro).slice(0, 5));

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(ARCHIVO);
  const conIgual: string[] = [];
  wb.eachSheet((ws) =>
    ws.eachRow((row) =>
      row.eachCell((c) => {
        const v = c.value as { formula?: string } | null;
        if (v && typeof v === "object" && typeof v.formula === "string" && v.formula.startsWith("=")) conIgual.push(`${ws.name}!${c.address}`);
      }),
    ),
  );
  check("ninguna fórmula empieza con «=» (Excel ofrecería reparar el archivo)", conIgual.length === 0, conIgual.slice(0, 5));

  // 2. IPC.
  const ipcMal = IPC_SERIE.filter(([, v], i) => !igual(libro.valor(H.ipc, `D${5 + i}`), v, 1e-9));
  check(`la serie del IPC del archivo es src/data/ipc-serie.ts (${IPC_SERIE.length} meses)`, ipcMal.length === 0, ipcMal.slice(0, 3));
  check("el último IPC del archivo es el de la calculadora", libro.valor(H.ipc, "J4") === nombrePeriodo(ULTIMO_PERIODO), libro.valor(H.ipc, "J4"));

  // 3. El ejemplo: el recibo con la obra social mal descontada se marca, los demás cuadran.
  const estadosEj = EJEMPLO.meses.map((_, i) => libro.valor(H.recibos, `K${F0 + i}`));
  check(
    "el ejemplo marca el recibo con la obra social mal descontada y los demás cuadran",
    estadosEj.every((e, i) => e === (i === EJEMPLO.mesConError ? ESTADOS_RECIBO.obraSocial : ESTADOS_RECIBO.cuadra)),
    estadosEj,
  );
  check("el ejemplo arranca en el mes que dice", libro.valor(H.recibos, `A${F0}`) === nombrePeriodo(EJEMPLO.inicio), libro.valor(H.recibos, `A${F0}`));
  check("el ejemplo tiene un aumento medible en el resumen", typeof libro.valor(H.resumen, `B${F.inflacion}`) === "number");

  const previaLanding = hojaMiSueldo(PLANILLA_MS.archivo, datosEjemplo()).hoja.filas.filter((f) => typeof f.valor === "number");
  const malLanding = previaLanding.filter((f) => !igual(libro.valor(H.resumen, `B${f.fila}`), f.valor as number, 0.01));
  check("la vista previa de la landing es el resumen del archivo genérico", malLanding.length === 0, malLanding.map((f) => `${f.etiqueta}: ${libro.valor(H.resumen, `B${f.fila}`)} ≠ ${f.valor}`));

  // 4. Descuentos de ley contra brutoANeto (el motor de /sueldo-neto), con y sin tope.
  const inicio = sumarMeses(ULTIMO_PERIODO, -13);
  const brutos = [250_000, 999_999.99, 1_200_000, 2_750_000, topeSipa().baseMaxima - 1, topeSipa().baseMaxima, topeSipa().baseMaxima + 1, 9_000_000];
  const sindicales = [0, 2, 2.5, 3];
  const malAportes: string[] = [];
  for (const s of sindicales) {
    arrancarEn(libro, inicio, { [D.sindical]: s });
    const carga: Record<string, number> = {};
    brutos.forEach((b, i) => (carga[`B${F0 + i}`] = b));
    libro.cargar(H.recibos, carga);
    brutos.forEach((b, i) => {
      const r = F0 + i;
      const m = brutoANeto(b, { sindicalPct: s / 100 });
      const pares: [string, number][] = [
        ["M", m.aportes.jubilacion],
        ["N", m.aportes.pami],
        ["O", m.aportes.obraSocial],
        ["P", m.cuotaSindical],
        ["Q", m.neto],
      ];
      for (const [col, esperado] of pares) {
        const v = libro.valor(H.recibos, `${col}${r}`);
        if (!igual(v, esperado)) malAportes.push(`bruto ${b} sind ${s}% ${col}: ${v} ≠ ${esperado}`);
      }
    });
  }
  check(`descuentos de ley = brutoANeto en ${brutos.length * sindicales.length} casos (con y sin tope)`, malAportes.length === 0, malAportes.slice(0, 5));

  // 5. Lo no remunerativo, con cada combinación de lo que descuenta el convenio.
  const malNr: string[] = [];
  for (const osNr of [O.no, O.si]) {
    for (const sindNr of [O.no, O.si]) {
      arrancarEn(libro, inicio, { [D.sindical]: 2, [D.osNoRem]: osNr, [D.sindNoRem]: sindNr });
      const b = 1_100_000;
      const nr = 120_000;
      libro.cargar(H.recibos, { [`B${F0}`]: b, [`C${F0}`]: nr });
      const m = brutoANeto(b, { sindicalPct: 0.02 });
      const osE = m.aportes.obraSocial + (osNr === O.si ? nr * 0.03 : 0);
      const sindE = (b + (sindNr === O.si ? nr : 0)) * 0.02;
      const netoE = b + nr - m.aportes.jubilacion - m.aportes.pami - osE - sindE;
      const pares: [string, number][] = [["O", osE], ["P", sindE], ["Q", netoE]];
      for (const [col, e] of pares) {
        const v = libro.valor(H.recibos, `${col}${F0}`);
        if (!igual(v, e)) malNr.push(`os ${osNr} sind ${sindNr} ${col}: ${v} ≠ ${e}`);
      }
    }
  }
  check("lo no remunerativo aporta sólo lo que el convenio indica en «Mis datos»", malNr.length === 0, malNr);

  // 6. Cada estado del control del recibo.
  arrancarEn(libro, inicio, { [D.sindical]: 2 });
  const b = 1_500_000;
  const m = brutoANeto(b, { sindicalPct: 0.02 });
  const r2 = (n: number) => Math.round(n * 100) / 100;
  const exacto = { D: r2(m.aportes.jubilacion), E: r2(m.aportes.pami), F: r2(m.aportes.obraSocial), G: r2(m.cuotaSindical), H: 0, I: 0 };
  const netoOk = r2(b - exacto.D - exacto.E - exacto.F - exacto.G);
  const casos: [string, Record<string, number | null>, string][] = [
    ["recibo correcto", { ...exacto, J: netoOk }, ESTADOS_RECIBO.cuadra],
    ["sólo el bruto", { D: null, E: null, F: null, G: null, H: null, I: null, J: null }, ESTADOS_RECIBO.faltan],
    ["jubilación de más", { ...exacto, D: exacto.D + 150, J: netoOk - 150 }, ESTADOS_RECIBO.jubilacion],
    ["Ley 19.032 de menos", { ...exacto, E: exacto.E - 40, J: netoOk + 40 }, ESTADOS_RECIBO.pami],
    ["obra social mal", { ...exacto, F: exacto.F + 2, J: netoOk - 2 }, ESTADOS_RECIBO.obraSocial],
    ["cuota sindical mal", { ...exacto, G: 0, J: netoOk + exacto.G }, ESTADOS_RECIBO.sindical],
    ["neto que no da", { ...exacto, J: netoOk - 5_000 }, ESTADOS_RECIBO.neto],
    ["redondeo de 50 centavos", { ...exacto, D: exacto.D + 0.5, J: netoOk - 0.5 }, ESTADOS_RECIBO.cuadra],
    ["Ganancias y otros descuentos no se controlan", { ...exacto, H: 80_000, I: 12_000, J: netoOk - 92_000 }, ESTADOS_RECIBO.cuadra],
  ];
  for (const [nombre, valores, esperado] of casos) {
    const carga: Record<string, number | null> = { [`B${F0}`]: b };
    for (const [col, v] of Object.entries(valores)) carga[`${col}${F0}`] = v;
    libro.cargar(H.recibos, carga);
    const k = libro.valor(H.recibos, `K${F0}`);
    check(`control: ${nombre} → «${esperado}»`, k === esperado, k);
  }
  libro.cargar(H.recibos, { [`B${F0}`]: b, [`D${F0}`]: exacto.D + 150, [`E${F0}`]: exacto.E, [`F${F0}`]: exacto.F, [`G${F0}`]: exacto.G });
  check("la diferencia en aportes es lo descontado menos la ley", igual(libro.valor(H.recibos, `L${F0}`), 150, 0.02), libro.valor(H.recibos, `L${F0}`));

  // 7. Sueldo vs inflación y resumen, contra sueldoVsInflacion.
  type Escenario = { nombre: string; inicio: Periodo; sueldos: (number | null)[]; netos?: (number | null)[]; comparar?: string };
  const p0 = sumarMeses(ULTIMO_PERIODO, -14);
  const escenarios: Escenario[] = [
    { nombre: "dos aumentos", inicio: p0, sueldos: [1e6, 1e6, 1.08e6, 1.08e6, 1.08e6, 1.08e6, 1.08e6, 1.15e6, 1.15e6, 1.15e6, 1.15e6, 1.15e6, 1.15e6, 1.15e6, 1.15e6] },
    { nombre: "sin aumentos", inicio: p0, sueldos: Array(15).fill(900_000) },
    { nombre: "baja y vuelve", inicio: p0, sueldos: [1e6, 1e6, 950_000, 950_000, 1e6, 1e6, 1e6, 1e6, 1e6, 1e6, 1e6, 1e6, 1e6, 1e6, 1e6] },
    { nombre: "con meses salteados", inicio: p0, sueldos: [800_000, null, null, 850_000, null, 900_000, null, null, null, null, null, null, null, null, 900_000] },
    { nombre: "aumento posterior al último IPC", inicio: sumarMeses(ULTIMO_PERIODO, -12), sueldos: [...Array(13).fill(1e6), 1.2e6, 1.2e6] },
    { nombre: "sólo un año (sin interanual)", inicio: sumarMeses(ULTIMO_PERIODO, -6), sueldos: [1e6, 1e6, 1.1e6, 1.1e6, 1.1e6, 1.1e6, 1.1e6] },
    {
      nombre: "comparando lo cobrado en mano",
      inicio: p0,
      sueldos: Array(15).fill(1.3e6),
      netos: [1e6, 1e6, 1e6, 1.05e6, 1.05e6, 1.05e6, 1.05e6, 1.05e6, 1.1e6, 1.1e6, 1.1e6, 1.1e6, 1.1e6, 1.1e6, 1.1e6],
      comparar: O.compararNeto,
    },
  ];
  for (const e of escenarios) {
    arrancarEn(libro, e.inicio, e.comparar ? { [D.comparar]: e.comparar } : {});
    const carga: Record<string, number | null> = {};
    e.sueldos.forEach((s, i) => {
      carga[`B${F0 + i}`] = s;
      if (e.netos) carga[`J${F0 + i}`] = e.netos[i];
    });
    libro.cargar(H.recibos, carga);
    const ref = e.netos ?? e.sueldos;
    const pos = ref.map((s, i) => (s === null ? -1 : i)).filter((i) => i >= 0);
    const ult = pos.at(-1)!;
    let base = pos[0];
    let huboAumento = false;
    for (let i = 1; i < ref.length; i++) {
      const a = ref[i];
      const prev = ref[i - 1];
      if (a !== null && prev !== null && a > prev + 0.5) {
        base = i;
        huboAumento = true;
      }
    }
    const pBase = sumarMeses(e.inicio, base);
    const v = sueldoVsInflacion(ref[base]!, pBase, ref[ult]!);
    const mal: string[] = [];
    const dif = (campo: string, archivo: unknown, esperado: unknown) => mal.push(`${campo}: archivo ${JSON.stringify(archivo)} ≠ ${JSON.stringify(esperado)}`);
    const val = (fila: number) => libro.valor(H.resumen, `B${fila}`);
    if (val(F.desde) !== nombrePeriodo(pBase)) dif("desde", val(F.desde), nombrePeriodo(pBase));
    if (!igual(val(F.sueldoBase), ref[base]!)) dif("sueldo base", val(F.sueldoBase), ref[base]);
    if (v) {
      if (!igual(val(F.inflacion), v.inflacionPct / 100, 1e-9)) dif("inflación", val(F.inflacion), v.inflacionPct / 100);
      if (!igual(val(F.poder), v.diferenciaRealPct / 100, 1e-9)) dif("poder de compra", val(F.poder), v.diferenciaRealPct / 100);
      if (!igual(val(F.equivalente), v.sueldoEquivalente)) dif("equivalente", val(F.equivalente), v.sueldoEquivalente);
      const nec = Math.max(0, v.sueldoEquivalente / ref[ult]! - 1);
      if (!igual(val(F.necesitas), nec, 1e-9)) dif("necesitás", val(F.necesitas), nec);
      const frase = String(val(F.frase));
      if (!frase.startsWith(huboAumento ? "Desde mi último aumento" : "Desde ")) dif("frase", frase, "Desde…");
      if (!frase.includes(nombrePeriodo(ULTIMO_PERIODO))) dif("frase sin el último IPC", frase, nombrePeriodo(ULTIMO_PERIODO));
      if (nec > 0) {
        const monto = Math.round(v.sueldoEquivalente).toLocaleString("es-AR");
        const pctNec = (Math.round(nec * 1000) / 10).toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
        if (!frase.includes(`$${monto}`) || !frase.includes(`${pctNec}%`)) dif("frase con monto y %", frase, `$${monto} · ${pctNec}%`);
      }
    } else {
      for (const fila of [F.inflacion, F.poder, F.necesitas, F.equivalente, F.frase]) if (!vacio(val(fila))) dif(`fila ${fila} sin IPC`, val(fila), "");
      if (!String(libro.valor(H.resumen, `C${F.inflacion}`)).startsWith("Todavía no hay IPC")) dif("aviso sin IPC", libro.valor(H.resumen, `C${F.inflacion}`), "Todavía no hay IPC…");
    }
    // Interanual: el recibo de 12 meses antes del último.
    const i12 = ult - 12;
    const s12 = i12 >= 0 ? ref[i12] : null;
    if (s12 !== null && s12 !== undefined) {
      const v12 = sueldoVsInflacion(s12, sumarMeses(e.inicio, i12), ref[ult]!);
      if (!igual(val(F.hace12), s12)) dif("hace 12", val(F.hace12), s12);
      if (!igual(val(F.subio12), ref[ult]! / s12 - 1, 1e-9)) dif("subió 12", val(F.subio12), ref[ult]! / s12 - 1);
      if (v12 && !igual(val(F.real12), v12.diferenciaRealPct / 100, 1e-9)) dif("real 12", val(F.real12), v12.diferenciaRealPct / 100);
      if (v12 && !igual(val(F.inflacion12), v12.inflacionPct / 100, 1e-9)) dif("inflación 12", val(F.inflacion12), v12.inflacionPct / 100);
    } else {
      for (const fila of [F.hace12, F.subio12, F.inflacion12, F.real12]) if (!vacio(val(fila))) dif(`fila ${fila} sin interanual`, val(fila), "");
    }
    // Columna «en pesos de hoy» de cada mes con IPC.
    ref.forEach((s, i) => {
      const p = sumarMeses(e.inicio, i);
      const vi = s === null ? null : sueldoVsInflacion(s, p, s);
      const celda = libro.valor(H.inflacion, `E${F0 + i}`);
      if (vi && !igual(celda, vi.sueldoEquivalente)) dif(`en pesos de hoy ${p}`, celda, vi.sueldoEquivalente);
      if (!vi && !vacio(celda)) dif(`en pesos de hoy ${p} sin IPC`, celda, "");
    });
    check(`sueldo vs inflación = sueldoVsInflacion: ${e.nombre}`, mal.length === 0, mal);
  }
  check("sin errores de fórmula después de los escenarios", erroresDeFormula(libro).length === 0, erroresDeFormula(libro).slice(0, 5));

  // 8. Aguinaldo contra calcularAguinaldo, semestre por semestre.
  const pA = "2026-01";
  arrancarEn(libro, pA);
  const sueldosA = [1e6, 1.02e6, 1.05e6, 1.01e6, 1.1e6, 1.1e6, 1.2e6, 1.15e6, 1.3e6, 1.3e6];
  libro.cargar(H.recibos, Object.fromEntries(sueldosA.map((s, i) => [`B${F0 + i}`, s])));
  const malA: string[] = [];
  for (const [k, desde, hasta] of [[0, 0, 6], [1, 6, 10]] as const) {
    const sem = semestreDe(sumarMeses(pA, desde));
    const mejor = Math.max(...sueldosA.slice(desde, hasta));
    const sac = calcularAguinaldo({ mejorSueldo: mejor, semestre: sem });
    const r = 5 + k;
    if (libro.valor(H.aguinaldo, `A${r}`) !== sem.etiqueta) malA.push(`semestre ${libro.valor(H.aguinaldo, `A${r}`)} ≠ ${sem.etiqueta}`);
    if (!igual(libro.valor(H.aguinaldo, `D${r}`), sac.bruto)) malA.push(`${sem.etiqueta} bruto ${libro.valor(H.aguinaldo, `D${r}`)} ≠ ${sac.bruto}`);
    if (!igual(libro.valor(H.aguinaldo, `F${r}`), sac.netoEstimado)) malA.push(`${sem.etiqueta} neto ${libro.valor(H.aguinaldo, `F${r}`)} ≠ ${sac.netoEstimado}`);
    if (libro.valor(H.aguinaldo, `G${r}`) !== sem.fechaPago) malA.push(`vence ${libro.valor(H.aguinaldo, `G${r}`)} ≠ ${sem.fechaPago}`);
    if (libro.valor(H.aguinaldo, `B${r}`) !== hasta - desde) malA.push(`meses ${libro.valor(H.aguinaldo, `B${r}`)} ≠ ${hasta - desde}`);
  }
  const ultSem = semestreDe(sumarMeses(pA, sueldosA.length - 1));
  const sacUlt = calcularAguinaldo({ mejorSueldo: 1.3e6, semestre: ultSem });
  if (libro.valor(H.resumen, `B${F.aguinaldoSemestre}`) !== ultSem.etiqueta) malA.push(`resumen semestre ${libro.valor(H.resumen, `B${F.aguinaldoSemestre}`)}`);
  if (!igual(libro.valor(H.resumen, `B${F.aguinaldoNeto}`), sacUlt.netoEstimado)) malA.push(`resumen neto ${libro.valor(H.resumen, `B${F.aguinaldoNeto}`)}`);
  for (let k = 2; k < FILAS_AGUINALDO; k++) if (!vacio(libro.valor(H.aguinaldo, `D${5 + k}`))) malA.push(`semestre sin recibos con aguinaldo (fila ${5 + k})`);
  check("aguinaldo = calcularAguinaldo en cada semestre y en el resumen", malA.length === 0, malA);

  // 9. Piso de Ganancias contra estimarGananciasAnual.
  const malG: string[] = [];
  const cargas = [
    { sindicalPct: 0, conyuge: false, hijos: 0, otrasDeducciones: 0 },
    { sindicalPct: 2, conyuge: true, hijos: 2, otrasDeducciones: 1_800_000 },
    { sindicalPct: 3, conyuge: true, hijos: PLANILLA_MS.hijosMax, otrasDeducciones: 12_000_000 },
  ];
  for (const c of cargas) {
    arrancarEn(libro, inicio, { [D.sindical]: c.sindicalPct, [D.conyuge]: c.conyuge ? O.si : O.no, [D.hijos]: c.hijos, [D.otras]: c.otrasDeducciones });
    const piso = pisoGanancias(c);
    const enArchivo = libro.valor(H.datos, "H8");
    if (!igual(enArchivo, piso, 0.01)) malG.push(`archivo ${enArchivo} ≠ modelo ${piso}`);
    const est = (bruto: number) =>
      estimarGananciasAnual({ brutoMensual: bruto, conyuge: c.conyuge, hijos: c.hijos, sindicalPct: c.sindicalPct / 100, otrasDeduccionesAnual: c.otrasDeducciones });
    if (est(piso * (1 - 1e-6)).pagaGanancias) malG.push(`paga por debajo del piso ${piso}`);
    if (!est(piso * (1 + 1e-6)).pagaGanancias) malG.push(`no paga por encima del piso ${piso}`);
  }
  check("el piso de Ganancias es donde estimarGananciasAnual empieza a cobrar (con y sin tope)", malG.length === 0, malG);
  check("hay un caso de piso por encima del tope de aportes", pisoGanancias(cargas[2]) > topeSipa().baseMaxima, pisoGanancias(cargas[2]));

  // 10. Protección.
  const wsD = wb.getWorksheet(H.datos)!;
  const wsR = wb.getWorksheet(H.recibos)!;
  const libres =
    Object.values(D).every((ref) => wsD.getCell(ref).protection?.locked === false) &&
    Object.values(RC).every((col) => wsR.getCell(`${col}${F0}`).protection?.locked === false && wsR.getCell(`${col}${F0 + N - 1}`).protection?.locked === false);
  check("las celdas amarillas se pueden editar con la hoja protegida", libres);
  check("las fórmulas del control y del resumen están bloqueadas", ["K5", "M5", "Q5"].every((ref) => wsR.getCell(ref).protection?.locked !== false) && wb.getWorksheet(H.resumen)!.getCell(`B${F.necesitas}`).protection?.locked !== false);

  // 11. Prefill: validar con input hostil.
  const v = prefill.validar;
  const okBase = { bruto: 1_234_567.891, sindicalPct: 2, periodo: "2026-10", ultimoAumento: "2026-03", conyuge: false, hijos: 1, otrasDeducciones: 0, nombre: "Juan", extra: 1 };
  const hostiles: unknown[] = [
    null, 1, "x", [], [okBase],
    { ...okBase, bruto: -1 }, { ...okBase, bruto: 0 }, { ...okBase, bruto: "1000" }, { ...okBase, bruto: Infinity }, { ...okBase, bruto: 2e9 },
    { ...okBase, sindicalPct: 11 }, { ...okBase, sindicalPct: -1 },
    { ...okBase, periodo: "2026-13" }, { ...okBase, periodo: "2025-12" }, { ...okBase, periodo: "2026-1" }, { ...okBase, periodo: 202610 },
    { ...okBase, ultimoAumento: "2026-11" }, { ...okBase, ultimoAumento: "2024-10" }, { ...okBase, ultimoAumento: "marzo" },
    { ...okBase, conyuge: "no" }, { ...okBase, hijos: 1.5 }, { ...okBase, hijos: 16 }, { ...okBase, otrasDeducciones: -5 },
    Object.assign(Object.create({ bruto: 1e6 }), { sindicalPct: 0, periodo: "2026-10", conyuge: false, hijos: 0, otrasDeducciones: 0 }),
  ];
  const pasaron = hostiles.filter((h) => v(h) !== null);
  check(`validar rechaza ${hostiles.length} entradas hostiles`, pasaron.length === 0, pasaron);
  const ok = v(okBase);
  check(
    "validar acepta lo que manda la calculadora, redondea y descarta campos de más (el nombre no viaja)",
    JSON.stringify(ok) === JSON.stringify({ bruto: 1234567.89, sindicalPct: 2, periodo: "2026-10", ultimoAumento: "2026-03", conyuge: false, hijos: 1, otrasDeducciones: 0 }),
    ok,
  );
  check("validar acepta sin último aumento", v({ ...okBase, ultimoAumento: null })?.ultimoAumento === null && v({ ...okBase, ultimoAumento: undefined }) !== null);
  check("validar acepta un aumento de hace 23 meses (entra en la planilla)", v({ ...okBase, ultimoAumento: sumarMeses("2026-10", -23) }) !== null);

  // 12. Prefill: aplicar sobre el archivo real y abrirlo como lo abriría el comprador; la vista
  // previa de la oferta tiene que dar lo mismo que la hoja «Para pedir aumento».
  const tmp = mkdtempSync(path.join(os.tmpdir(), "mi-sueldo-"));
  try {
    const casosP: Datos[] = [
      { bruto: 1_450_000, sindicalPct: 2, periodo: sumarMeses(ULTIMO_PERIODO, 2), ultimoAumento: sumarMeses(ULTIMO_PERIODO, -5), conyuge: false, hijos: 0, otrasDeducciones: 0 },
      { bruto: 3_100_000, sindicalPct: 0, periodo: sumarMeses(ULTIMO_PERIODO, 1), ultimoAumento: sumarMeses(ULTIMO_PERIODO, -18), conyuge: true, hijos: 2, otrasDeducciones: 900_000 },
      { bruto: 6_000_000, sindicalPct: 1.5, periodo: sumarMeses(ULTIMO_PERIODO, 2), ultimoAumento: null, conyuge: false, hijos: 0, otrasDeducciones: 0 },
      { bruto: 980_000, sindicalPct: 3, periodo: sumarMeses(ULTIMO_PERIODO, 2), ultimoAumento: sumarMeses(ULTIMO_PERIODO, 1), conyuge: false, hijos: 0, otrasDeducciones: 0 },
    ];
    for (const [n, d] of casosP.entries()) {
      const wbP = new ExcelJS.Workbook();
      await wbP.xlsx.readFile(ARCHIVO);
      prefill.aplicar!(wbP, d);
      const ruta = path.join(tmp, `prefill-${n}.xlsx`);
      await wbP.xlsx.writeFile(ruta);
      const lp = await abrirLibro(ruta);
      const { hoja, resumen } = hojaMiSueldo(PLANILLA_MS.archivo, d);
      const mal: string[] = [];
      for (const f of hoja.filas) {
        if (f.tono === "seccion" || f.fila === undefined) continue;
        const enArchivo = lp.valor(H.resumen, `B${f.fila}`);
        if (typeof f.valor === "number") {
          if (!igual(enArchivo, f.valor, 0.01)) mal.push(`fila ${f.fila} «${f.etiqueta}»: archivo ${JSON.stringify(enArchivo)} ≠ previa ${f.valor}`);
        } else if (f.valor === "—") {
          if (!vacio(enArchivo)) mal.push(`fila ${f.fila}: archivo ${JSON.stringify(enArchivo)} ≠ vacío`);
        } else if (typeof enArchivo === "number") {
          const txt = `${(enArchivo * 100).toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
          if (!String(f.valor).replace("+", "").endsWith(txt.replace("+", ""))) mal.push(`fila ${f.fila}: archivo ${txt} ≠ previa ${f.valor}`);
        } else if (enArchivo !== f.valor && !(f.etiqueta.startsWith("Aguinaldo") && enArchivo === resumen.aguinaldo.semestre)) {
          mal.push(`fila ${f.fila}: archivo ${JSON.stringify(enArchivo)} ≠ previa ${JSON.stringify(f.valor)}`);
        }
      }
      if (lp.valor(H.resumen, `B${F.aguinaldoSemestre}`) !== resumen.aguinaldo.semestre) mal.push(`semestre ${lp.valor(H.resumen, `B${F.aguinaldoSemestre}`)}`);
      if (lp.valor(H.resumen, `B${F.ultimoRecibo}`) !== nombrePeriodo(d.periodo)) mal.push(`último recibo ${lp.valor(H.resumen, `B${F.ultimoRecibo}`)}`);
      const primero = primerMesPara(d);
      if (lp.valor(H.recibos, `A${F0}`) !== nombrePeriodo(primero)) mal.push(`primer mes ${lp.valor(H.recibos, `A${F0}`)} ≠ ${nombrePeriodo(primero)}`);
      const cargados = Array.from({ length: N }, (_, i) => lp.valor(H.recibos, `B${F0 + i}`)).filter((x) => typeof x === "number").length;
      const esperados = d.ultimoAumento ? Math.round((Number(d.periodo.slice(0, 4)) * 12 + Number(d.periodo.slice(5))) - (Number(d.ultimoAumento.slice(0, 4)) * 12 + Number(d.ultimoAumento.slice(5)))) + 1 : 1;
      if (cargados !== esperados) mal.push(`meses con sueldo ${cargados} ≠ ${esperados}`);
      const restos = Array.from({ length: N }, (_, i) => ["C", "D", "J"].map((c) => lp.crudo(H.recibos, `${c}${F0 + i}`))).flat().filter((x) => x !== null);
      if (restos.length) mal.push(`quedaron datos del ejemplo: ${restos.slice(0, 3)}`);
      if (lp.crudo(H.recibos, "A2") !== AVISO_CON_DATOS) mal.push("no cambió el aviso de ejemplo");
      if (erroresDeFormula(lp).length) mal.push(...erroresDeFormula(lp).slice(0, 3));
      check(`prefill ${n + 1}: el archivo da lo mismo que la vista previa (${d.ultimoAumento ? `aumento ${d.ultimoAumento}` : "sin aumento"})`, mal.length === 0, mal);
    }

    // 13. Round-trip de exceljs (lo que hace la descarga personalizada) sin perder fórmulas.
    const wbR = new ExcelJS.Workbook();
    await wbR.xlsx.readFile(ARCHIVO);
    const rutaR = path.join(tmp, "roundtrip.xlsx");
    await wbR.xlsx.writeFile(rutaR);
    const lr = await abrirLibro(rutaR);
    const original = await abrirLibro(ARCHIVO);
    const filasR = Object.values(F).map((f) => `B${f}`);
    const difR = filasR.filter((ref) => JSON.stringify(lr.valor(H.resumen, ref)) !== JSON.stringify(original.valor(H.resumen, ref)));
    check("el archivo pasa por exceljs load→write y el resumen da lo mismo", difR.length === 0, difR);
    const wbX = new ExcelJS.Workbook();
    await wbX.xlsx.readFile(rutaR);
    const cf = (wbX.getWorksheet(H.recibos) as unknown as { conditionalFormattings?: unknown[] }).conditionalFormattings ?? [];
    check("los colores del control sobreviven al round-trip", cf.length > 0, cf.length);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }

  console.log(fallas === 0 ? "\nPlanilla Mi Sueldo: todo verde." : `\nPlanilla Mi Sueldo: ${fallas} fallas.`);
  if (fallas) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
