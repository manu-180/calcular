// Verificación del PREFILL de las planillas pagas: la persona carga su caso en la calculadora,
// paga, y la planilla le llega con esos mismos datos en las celdas de entrada. Este check abre el
// .xlsx que se entrega (private/), le aplica los datos con `aplicar` (exceljs load → aplicar →
// write, igual que la descarga), EVALÚA el archivo resultante con HyperFormula y compara el bruto
// y el neto contra el motor de la calculadora para esos mismos datos.
//
// Por qué contra el archivo y no contra una réplica: un valor que no es exactamente una opción del
// desplegable (una tilde, un «¾», «Zona A» vs «zona a») hace que el MATCH falle y la planilla dé
// cero o #N/A. Sólo evaluando el archivo se ve eso.
//
// Correr con: npx tsx scripts/check_prefill_planillas.ts  (o vía scripts/check-all.ts)

import ExcelJS from "exceljs";
import path from "node:path";
import os from "node:os";
import { mkdtempSync, rmSync } from "node:fs";
import { abrirLibro } from "./evaluar_xlsx";
import type { Prefill } from "../src/lib/prefill/tipos";
import * as comercio from "../src/lib/prefill/comercio";
import * as uocra from "../src/lib/prefill/uocra";
import * as casas from "../src/lib/prefill/casas";
import { PREFILLS } from "../src/lib/prefill/index";
import { CELDAS_COMERCIO, HOJA_LIQUIDACION_COMERCIO, JORNADAS_PLANILLA_COMERCIO } from "./gen_planilla_comercio";
import { CELDAS_UOCRA, HOJA_LIQUIDADOR_UOCRA } from "./gen_planilla_uocra";
import { ARCHIVO_CASAS, CELDAS as CELDAS_CASAS, HOJAS as HOJAS_CASAS, MODALIDADES } from "./gen_planilla_casas";
import { calcularComercio, calcularUocra } from "../src/lib/convenios";
import { calcularCasasParticulares } from "../src/lib/casas-particulares";
import { calcularAportes } from "../src/lib/aportes-casas-particulares";
import { JORNADAS_COMERCIO, MESES_COMERCIO } from "../src/data/convenios/comercio";
import { MESES_UOCRA, UOCRA_HORAS_MES_PROMEDIO } from "../src/data/convenios/uocra";
import { ESCALAS_POR_MES } from "../src/data/casas-particulares";
import { hojaCasas, hojaComercio, hojaMonotributo, hojaUocra } from "../src/components/oferta/hojas";
import * as monotributo from "../src/lib/prefill/monotributo";
import { ACTIVIDADES as ACTIVIDADES_MONO, ARCHIVO_MONOTRIBUTO, CELDAS_MONO, HOJAS_MONO } from "./gen_planilla_monotributo";
import { categoriaPorParametros, cuotaMensual } from "../src/lib/monotributo";
import { CATEGORIAS as CATEGORIAS_MONO } from "../src/data/monotributo";
import type { HojaPrevia } from "../src/components/HojaCalculo";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const igual = (a: number, b: number) => Math.abs(a - b) < 0.005;
const PRIVADO = path.join(process.cwd(), "private");
const TMP = mkdtempSync(path.join(os.tmpdir(), "prefill-"));

// ─── Desplegables: el valor escrito tiene que ser exactamente una opción de la lista ─────────

function opcionesDe(wb: ExcelJS.Workbook, v: ExcelJS.DataValidation): string[] {
  const f = String(v.formulae?.[0] ?? "");
  if (f.startsWith('"')) return f.replace(/^"|"$/g, "").split(",");
  const m = f.match(/^'?(.+?)'?!\$?([A-Z]+)\$?(\d+):\$?([A-Z]+)\$?(\d+)$/);
  if (!m) throw new Error(`lista de validación que no sé leer: ${f}`);
  const ws = wb.getWorksheet(m[1])!;
  const fuera: string[] = [];
  for (let r = Number(m[3]); r <= Number(m[5]); r++) fuera.push(String(ws.getCell(`${m[2]}${r}`).value));
  return fuera;
}

function celdasRespetanValidacion(wb: ExcelJS.Workbook, hoja: string, refs: string[]): string[] {
  const ws = wb.getWorksheet(hoja)!;
  const malas: string[] = [];
  for (const ref of refs) {
    const c = ws.getCell(ref);
    const v = c.dataValidation;
    if (!v) {
      malas.push(`${ref}: sin validación`);
      continue;
    }
    if (v.type === "list") {
      if (!opcionesDe(wb, v).includes(String(c.value))) malas.push(`${ref}: «${c.value}» no está en el desplegable`);
    } else if (v.type === "whole" || v.type === "decimal") {
      const [min, max] = (v.formulae ?? []).map(Number);
      const n = c.value as number;
      if (typeof n !== "number" || n < min || n > max || (v.type === "whole" && !Number.isInteger(n)))
        malas.push(`${ref}: ${c.value} fuera de [${min}, ${max}]`);
    }
  }
  return malas;
}

// ─── Motor común: aplicar sobre el archivo real y evaluarlo ─────────────────────────────────

async function aplicarYEvaluar<D>(
  archivo: string,
  p: Prefill<D>,
  crudo: unknown,
  hoja: string,
  refsEntrada: string[],
) {
  const datos = p.validar(JSON.parse(JSON.stringify(crudo)));
  if (!datos) throw new Error(`validar rechazó un caso válido: ${JSON.stringify(crudo)}`);
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(path.join(PRIVADO, archivo));
  p.aplicar!(wb, datos);
  const malas = celdasRespetanValidacion(wb, hoja, refsEntrada);
  // gen_planilla_comercio.ts escribe sus resultados como `{ formula: "=..." }` y el archivo queda
  // con `<f>=…</f>`: HyperFormula no parsea el `==` que arma evaluar_xlsx. Se normaliza sólo en
  // esta copia de prueba; lo que se entrega no se toca.
  wb.eachSheet((ws) =>
    ws.eachRow((fila) =>
      fila.eachCell((c) => {
        const v = c.value as { formula?: string } | null;
        if (v && typeof v === "object" && typeof v.formula === "string" && v.formula.startsWith("="))
          c.value = { formula: v.formula.slice(1) } as ExcelJS.CellFormulaValue;
      }),
    ),
  );
  const salida = path.join(TMP, `${Math.random().toString(36).slice(2)}.xlsx`);
  await wb.xlsx.writeFile(salida);
  return { libro: await abrirLibro(salida), malas, datos };
}

// ─── La vista previa que se vende (calculadora y landing) == el archivo que se entrega ────────
// Mismo número de fila, una etiqueta que arranca igual (en la previa a veces va abreviada) y,
// para cada importe, el mismo valor que da el archivo evaluado en esa fila.

type Libro = Awaited<ReturnType<typeof abrirLibro>>;
const primeraPalabra = (t: string) => t.trim().split(/\s+/)[0].replace(/[¿?]/g, "").toLowerCase();

function previaCoincide(libro: Libro, previa: HojaPrevia): string[] {
  const malas: string[] = [];
  if (JSON.stringify(previa.pestanas) !== JSON.stringify(libro.hojas))
    malas.push(`pestañas ${previa.pestanas.join("|")} ≠ archivo ${libro.hojas.join("|")}`);
  for (const f of previa.filas) {
    if (f.fila === undefined) continue;
    const etiqueta = String(libro.crudo(previa.hoja, `A${f.fila}`) ?? "");
    if (primeraPalabra(etiqueta) !== primeraPalabra(f.etiqueta))
      malas.push(`fila ${f.fila}: «${f.etiqueta}» vs archivo «${etiqueta}»`);
    if (typeof f.valor === "number") {
      const v = libro.valor(previa.hoja, `B${f.fila}`);
      if (typeof v !== "number" || !igual(v, f.valor)) malas.push(`fila ${f.fila} (${f.etiqueta}): previa ${f.valor} ≠ archivo ${JSON.stringify(v)}`);
    }
  }
  return malas;
}

// ─── Casos hostiles: validar nunca devuelve algo que no sea exactamente el tipo Datos ───────

function hostiles<D extends object>(nombre: string, p: Prefill<D>, valido: D) {
  const base = valido as Record<string, unknown>;
  const rotos: unknown[] = [
    null,
    undefined,
    "texto",
    42,
    [],
    [valido],
    {},
    JSON.parse(`{"__proto__": ${JSON.stringify(valido)}}`),
    Object.create(valido),
  ];
  for (const k of Object.keys(base)) {
    const v = base[k];
    rotos.push({ ...base, [k]: undefined });
    rotos.push({ ...base, [k]: null });
    rotos.push({ ...base, [k]: [v] });
    rotos.push({ ...base, [k]: { v } });
    if (typeof v === "number") {
      rotos.push({ ...base, [k]: String(v) }, { ...base, [k]: -1 }, { ...base, [k]: 1e9 }, { ...base, [k]: Number.NaN });
      rotos.push({ ...base, [k]: Number.POSITIVE_INFINITY });
    } else if (typeof v === "boolean") {
      rotos.push({ ...base, [k]: String(v) }, { ...base, [k]: v ? 1 : 0 });
    } else if (typeof v === "string") {
      const otraCaja = v === v.toUpperCase() ? v.toLowerCase() : v.toUpperCase();
      if (otraCaja !== v) rotos.push({ ...base, [k]: otraCaja });
      rotos.push(
        { ...base, [k]: `${v} ` },
        { ...base, [k]: "constructor" },
        { ...base, [k]: "__proto__" },
        { ...base, [k]: "toString" },
        { ...base, [k]: `=HYPERLINK("http://x",${JSON.stringify(v)})` },
      );
    }
  }
  const aceptados = rotos.filter((r) => {
    try {
      return p.validar(r) !== null;
    } catch {
      return true; // tirar también es fallar: la descarga no puede romperse por un JSON raro
    }
  });
  check(`${nombre}: validar rechaza ${rotos.length} entradas hostiles`, aceptados.length === 0, aceptados.slice(0, 3));

  const conExtras = p.validar({ ...base, email: "x@y.z", sueldo: 999, "<script>": 1 });
  check(
    `${nombre}: validar ignora campos extra y devuelve sólo los propios`,
    conExtras !== null && JSON.stringify(Object.keys(conExtras).sort()) === JSON.stringify(Object.keys(base).sort()),
    conExtras,
  );
  check(`${nombre}: validar es idempotente`, JSON.stringify(p.validar(p.validar(valido))) === JSON.stringify(p.validar(valido)));
}

// ─── Comercio ────────────────────────────────────────────────────────────────

async function checkComercio() {
  const archivo = "planilla-comercio-2026.xlsx";
  check("comercio: celdas del prefill == las del generador", JSON.stringify(comercio.CELDAS) === JSON.stringify(CELDAS_COMERCIO) && comercio.HOJA === HOJA_LIQUIDACION_COMERCIO);
  check("comercio: jornadas del prefill == las del generador", JSON.stringify(comercio.JORNADA_EN_PLANILLA) === JSON.stringify(JORNADAS_PLANILLA_COMERCIO));
  check("comercio: registrado en PREFILLS", PREFILLS["planilla-comercio"] === (comercio.prefill as unknown));

  const ultimo = MESES_COMERCIO.at(-1)!.id;
  const casos: comercio.Datos[] = [
    { mesId: ultimo, categoriaId: "vendedor-b", anios: 0, jornadaId: "8", presentismo: true },
    { mesId: ultimo, categoriaId: "cajeros-c", anios: 12, jornadaId: "6", presentismo: false },
    { mesId: "julio-2026", categoriaId: "administrativo-f", anios: 50, jornadaId: "4", presentismo: true },
    { mesId: "agosto-2026", categoriaId: "maestranza-a", anios: 3, jornadaId: "8", presentismo: false },
    { mesId: MESES_COMERCIO[0].id, categoriaId: "auxiliar-especializado-b", anios: 25, jornadaId: "6", presentismo: true },
  ];
  const C = comercio.CELDAS;
  for (const d of casos) {
    const { libro, malas } = await aplicarYEvaluar(archivo, comercio.prefill, d, comercio.HOJA, [C.categoria, C.mes, C.antiguedad, C.jornada, C.presentismo]);
    const r = calcularComercio({
      mesId: d.mesId,
      categoriaId: d.categoriaId,
      aniosAntiguedad: d.anios,
      jornadaFactor: JORNADAS_COMERCIO.find((j) => j.id === d.jornadaId)!.factor,
      conPresentismo: d.presentismo,
    })!;
    const bruto = libro.numero(comercio.HOJA, C.bruto);
    const neto = libro.numero(comercio.HOJA, C.neto);
    const etiqueta = `${d.categoriaId} · ${d.mesId} · ${d.anios} años · ${d.jornadaId}hs · presentismo ${d.presentismo ? "sí" : "no"}`;
    check(`comercio ${etiqueta}: desplegables respetados`, malas.length === 0, malas);
    const previa = previaCoincide(libro, hojaComercio(archivo, d)!.hoja);
    check(`comercio ${etiqueta}: la vista previa == el archivo`, previa.length === 0, previa);
    check(`comercio ${etiqueta}: bruto ${Math.round(bruto)} y neto ${Math.round(neto)} == calculadora`, igual(bruto, r.bruto) && igual(neto, r.neto), { bruto, neto, web: [r.bruto, r.neto] });
  }
  hostiles("comercio", comercio.prefill, casos[1]);
  check("comercio: antigüedad no entera rechazada", comercio.prefill.validar({ ...casos[1], anios: 2.5 }) === null);
  check("comercio: antigüedad mayor al tope de la celda rechazada", comercio.prefill.validar({ ...casos[1], anios: 51 }) === null);
}

// ─── UOCRA ───────────────────────────────────────────────────────────────────

async function checkUocra() {
  const archivo = "planilla-uocra-2026.xlsx";
  check("uocra: celdas del prefill == las del generador", JSON.stringify(uocra.CELDAS) === JSON.stringify(CELDAS_UOCRA) && uocra.HOJA === HOJA_LIQUIDADOR_UOCRA);
  check("uocra: registrado en PREFILLS", PREFILLS["planilla-uocra"] === (uocra.prefill as unknown));

  const ultimo = MESES_UOCRA.at(-1)!.id;
  const casos: uocra.Datos[] = [
    { mesId: ultimo, categoriaId: "oficial", zonaId: "a", horas: UOCRA_HORAS_MES_PROMEDIO, asistencia: true, aporteSolidario: true },
    { mesId: ultimo, categoriaId: "ayudante", zonaId: "c-austral", horas: 120.5, asistencia: false, aporteSolidario: false },
    { mesId: "agosto-2026", categoriaId: "oficial-especializado", zonaId: "b", horas: 200, asistencia: true, aporteSolidario: false },
    { mesId: MESES_UOCRA[0].id, categoriaId: "medio-oficial", zonaId: "c", horas: 1, asistencia: true, aporteSolidario: true },
    { mesId: ultimo, categoriaId: "sereno", zonaId: "b", horas: UOCRA_HORAS_MES_PROMEDIO, asistencia: true, aporteSolidario: true },
  ];
  const C = uocra.CELDAS;
  for (const d of casos) {
    const { libro, malas } = await aplicarYEvaluar(archivo, uocra.prefill, d, uocra.HOJA, [C.categoria, C.zona, C.mes, C.horas, C.asistencia, C.solidario]);
    const r = calcularUocra({
      mesId: d.mesId,
      categoriaId: d.categoriaId,
      zonaId: d.zonaId,
      horasMes: d.horas,
      conAsistencia: d.asistencia,
      conAporteSindical: d.aporteSolidario,
    })!;
    const bruto = libro.numero(uocra.HOJA, C.bruto);
    const neto = libro.numero(uocra.HOJA, C.neto);
    const etiqueta = `${d.categoriaId} · zona ${d.zonaId} · ${d.mesId} · ${d.horas.toFixed(2)} h`;
    check(`uocra ${etiqueta}: desplegables respetados`, malas.length === 0, malas);
    const previa = previaCoincide(libro, hojaUocra(archivo, d)!.hoja);
    check(`uocra ${etiqueta}: la vista previa == el archivo`, previa.length === 0, previa);
    check(`uocra ${etiqueta}: bruto ${Math.round(bruto)} y neto ${Math.round(neto)} == calculadora`, igual(bruto, r.bruto) && igual(neto, r.neto), { bruto, neto, web: [r.bruto, r.neto] });
  }
  hostiles("uocra", uocra.prefill, casos[1]);
  check("uocra: menos de una hora rechazada (la celda exige 1 a 300)", uocra.prefill.validar({ ...casos[1], horas: 0.5 }) === null);
}

// ─── Casas Particulares ──────────────────────────────────────────────────────

async function checkCasas() {
  check(
    "casas: celdas del prefill == las del generador",
    casas.HOJA === HOJAS_CASAS.liquidador &&
      (Object.keys(casas.CELDAS) as (keyof typeof casas.CELDAS)[]).every((k) => casas.CELDAS[k] === CELDAS_CASAS[k]),
  );
  check("casas: modalidades del prefill == las del generador", JSON.stringify(casas.MODALIDAD_EN_PLANILLA) === JSON.stringify(MODALIDADES));
  check("casas: registrado en PREFILLS", PREFILLS["planilla-casas-particulares"] === (casas.prefill as unknown));

  const ultimo = ESCALAS_POR_MES.at(-1)!.id;
  const casos: casas.Datos[] = [
    { mesId: "2026-10", categoriaId: "tareas-generales", modalidad: "con-retiro", horasSemanales: 24, zonaDesfavorable: false, extrasComunes: 0, extrasFinDeSemana: 0 },
    { mesId: "2026-10", categoriaId: "asistencia-personas", modalidad: "sin-retiro", horasSemanales: 48, zonaDesfavorable: true, extrasComunes: 4, extrasFinDeSemana: 2 },
    { mesId: ultimo, categoriaId: "caseros", modalidad: "sin-retiro", horasSemanales: 48, zonaDesfavorable: false, extrasComunes: 0, extrasFinDeSemana: 0 },
    { mesId: ESCALAS_POR_MES[0].id, categoriaId: "supervisor", modalidad: "con-retiro", horasSemanales: 10, zonaDesfavorable: false, extrasComunes: 1.5, extrasFinDeSemana: 0 },
    { mesId: "2026-09", categoriaId: "tareas-especificas", modalidad: "con-retiro", horasSemanales: 14, zonaDesfavorable: true, extrasComunes: 0, extrasFinDeSemana: 3 },
  ];
  const C = casas.CELDAS;
  for (const d of casos) {
    const { libro, malas } = await aplicarYEvaluar(ARCHIVO_CASAS, casas.prefill, d, casas.HOJA, [C.mes, C.categoria, C.modalidad, C.horasSemanales, C.zona, C.extrasComunes, C.extrasFinde]);
    const r = calcularCasasParticulares({
      mesId: d.mesId,
      categoriaId: d.categoriaId,
      modalidad: d.modalidad,
      horasSemanales: d.horasSemanales,
      zonaDesfavorable: d.zonaDesfavorable,
      horasExtrasComunes: d.extrasComunes,
      horasExtrasFinDeSemana: d.extrasFinDeSemana,
    })!;
    const a = calcularAportes({ horasSemanales: d.horasSemanales, condicion: "activo-mayor-18", cantidadTrabajadores: 1 });
    const total = libro.numero(casas.HOJA, C.total);
    const arca = libro.numero(casas.HOJA, C.arcaTotal);
    const costo = libro.numero(casas.HOJA, C.costoTotal);
    const etiqueta = `${d.categoriaId} · ${d.modalidad} · ${d.horasSemanales} h · ${d.mesId}${d.zonaDesfavorable ? " · zona" : ""}`;
    check(`casas ${etiqueta}: desplegables respetados`, malas.length === 0, malas);
    const previa = previaCoincide(libro, hojaCasas(ARCHIVO_CASAS, d)!.hoja);
    check(`casas ${etiqueta}: la vista previa == el archivo`, previa.length === 0, previa);
    check(
      `casas ${etiqueta}: sueldo ${Math.round(total)}, ARCA ${Math.round(arca)} y costo ${Math.round(costo)} == calculadoras`,
      igual(total, r.total) && igual(arca, a.totalPorTrabajador) && igual(costo, Math.round((r.total + a.totalPorTrabajador) * 100) / 100),
      { total, arca, costo, web: [r.total, a.totalPorTrabajador] },
    );
  }
  hostiles("casas", casas.prefill, casos[1]);
  check("casas: caseros con retiro rechazado (no existe en la escala)", casas.prefill.validar({ ...casos[2], modalidad: "con-retiro" }) === null);
  check("casas: más de 48 horas semanales rechazado", casas.prefill.validar({ ...casos[0], horasSemanales: 49 }) === null);
}

// ─── Monotributo ─────────────────────────────────────────────────────────────

async function checkMonotributo() {
  const M = monotributo.CELDAS;
  check(
    "monotributo: celdas del prefill == las del generador",
    monotributo.HOJA === HOJAS_MONO.control &&
      (Object.keys(M) as (keyof typeof M)[]).every((k) => M[k] === CELDAS_MONO[k]),
  );
  check(
    "monotributo: actividades del prefill == las del generador",
    monotributo.ACTIVIDAD_EN_PLANILLA.servicios === ACTIVIDADES_MONO.servicios && monotributo.ACTIVIDAD_EN_PLANILLA.venta === ACTIVIDADES_MONO.venta,
  );
  check("monotributo: registrado en PREFILLS", PREFILLS["planilla-monotributo"] === (monotributo.prefill as unknown));

  const cat = (c: string) => CATEGORIAS_MONO.find((x) => x.cat === c)!;
  const casos: monotributo.Datos[] = [
    { actividad: "servicios", categoriaActual: "C", dependencia: false, facturacion: 26_000_000 },
    { actividad: "venta", categoriaActual: "A", dependencia: true, facturacion: 5_000_000 },
    { actividad: "servicios", categoriaActual: "H", dependencia: false, facturacion: 30_000_000.55 },
    { actividad: "venta", categoriaActual: "K", dependencia: false, facturacion: cat("K").ingresosBrutosMax },
    { actividad: "servicios", categoriaActual: "B", dependencia: true, facturacion: cat("B").ingresosBrutosMax },
    { actividad: "servicios", categoriaActual: "D", dependencia: false, facturacion: 7 },
  ];
  const refs = [M.actividad, M.categoriaActual, M.dependencia, ...Array.from({ length: 12 }, (_, i) => `B${M.primeraFilaMes + i}`)];
  for (const d of casos) {
    const { libro, malas } = await aplicarYEvaluar(ARCHIVO_MONOTRIBUTO, monotributo.prefill, d, monotributo.HOJA, refs);
    const r = categoriaPorParametros({ ingresos: d.facturacion });
    if (r.tipo !== "ok") throw new Error(`caso fuera del régimen: ${d.facturacion}`);
    const cuota = cuotaMensual(r.categoria, d.actividad, d.dependencia).total;
    const etiqueta = `${d.actividad} · hoy ${d.categoriaActual} · ${d.facturacion}${d.dependencia ? " · dependencia" : ""}`;
    check(`monotributo ${etiqueta}: desplegables respetados`, malas.length === 0, malas);
    const total = libro.numero(monotributo.HOJA, M.facturacion12);
    const categoria = libro.valor(monotributo.HOJA, M.categoria);
    const margen = libro.numero(monotributo.HOJA, M.margen);
    const cuotaArchivo = libro.numero(monotributo.HOJA, M.cuota);
    check(
      `monotributo ${etiqueta}: suma ${total}, categoría ${String(categoria)}, margen y cuota == calculadora`,
      igual(total, d.facturacion) &&
        categoria === r.categoria.cat &&
        igual(margen, r.categoria.ingresosBrutosMax - d.facturacion) &&
        igual(cuotaArchivo, cuota),
      { total, categoria, margen, cuotaArchivo, web: [r.categoria.cat, r.categoria.ingresosBrutosMax - d.facturacion, cuota] },
    );
    const previa = previaCoincide(libro, hojaMonotributo(ARCHIVO_MONOTRIBUTO, d)!.hoja);
    check(`monotributo ${etiqueta}: la vista previa == el archivo`, previa.length === 0, previa);
  }
  hostiles("monotributo", monotributo.prefill, casos[0]);
  check("monotributo: facturación por encima del tope de K rechazada", monotributo.prefill.validar({ ...casos[0], facturacion: cat("K").ingresosBrutosMax + 1 }) === null);
  check(
    "monotributo: el reparto en 12 meses suma exacto",
    [7, 26_000_000, 30_000_000.55, cat("K").ingresosBrutosMax].every((t) => igual(monotributo.repartirEnMeses(t).reduce((a, b) => a + b, 0), t)),
  );
}

async function main() {
  try {
    await checkComercio();
    await checkUocra();
    await checkCasas();
    await checkMonotributo();
  } finally {
    rmSync(TMP, { recursive: true, force: true });
  }
  console.log(`\n${fallas === 0 ? "✅" : "❌"} prefill de planillas: ${fallas} fallas`);
  process.exit(fallas === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
