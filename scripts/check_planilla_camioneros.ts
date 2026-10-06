// Verificación de la PLANILLA de Camioneros (CCT 40/89): abre el .xlsx que se entrega, evalúa sus
// fórmulas con HyperFormula y exige que dé lo mismo que el motor de la calculadora gratis
// (calcularCamioneros, calcularAguinaldo) en toda la matriz; que la escala y los viáticos del archivo
// sean los datos vivos; que el prefill escriba valores que los desplegables aceptan; que la vista previa
// que se vende sea el archivo; y que el archivo sobreviva el exceljs load→write de la entrega.
//
// Correr con: npx tsx scripts/check_planilla_camioneros.ts

import ExcelJS from "exceljs";
import JSZip from "jszip";
import path from "node:path";
import os from "node:os";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { abrirLibro, type LibroEvaluable } from "./evaluar_xlsx";
import {
  ARCHIVO_CAMIONEROS,
  CELDAS_CAMIONEROS,
  ENTRADAS_VIAJE,
  HOJAS_CAMIONEROS,
  HOJA_LIQUIDADOR_CAMIONEROS,
  LIQ,
  NOMINA,
  SAC,
  SEMESTRES_PLANILLA,
  VALORES_VIATICOS,
} from "./gen_planilla_camioneros";
import * as camioneros from "../src/lib/prefill/camioneros";
import { PREFILLS } from "../src/lib/prefill/index";
import { calcularCamioneros } from "../src/lib/convenios";
import { calcularAguinaldo } from "../src/lib/aguinaldo";
import {
  CAMIONEROS_APORTES_REMUNERATIVO,
  CATEGORIAS_CAMIONEROS,
  ESCALAS_POR_MES,
  MESES_CAMIONEROS,
} from "../src/data/convenios/camioneros";
import { APORTES_PERSONALES, SEMESTRES_2026 } from "../src/data/aguinaldo";
import { VIATICOS_CAMIONEROS, ZONAS_CAMIONEROS } from "../src/components/camioneros/viaticos";
import { PESTANAS_CAMIONEROS, hojaCamioneros } from "../src/components/camioneros/hoja";
import type { HojaPrevia } from "../src/components/HojaCalculo";
import type { Prefill } from "../src/lib/prefill/tipos";

const ARCHIVO = path.join(process.cwd(), "private", ARCHIVO_CAMIONEROS);
const TMP = mkdtempSync(path.join(os.tmpdir(), "camioneros-"));
const L = HOJAS_CAMIONEROS.liquidador;
const C = CELDAS_CAMIONEROS;
const V = ENTRADAS_VIAJE;

let fallas = 0;
let casos = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const igual = (a: number, b: number) => Math.abs(a - b) < 0.005;
const nombreCat = (id: string) => CATEGORIAS_CAMIONEROS.find((c) => c.id === id)!.nombre;
const etiquetaMes = (id: string) => MESES_CAMIONEROS.find((m) => m.id === id)!.etiqueta;

function letra(n: number): string {
  return (n > 26 ? letra(Math.floor((n - 1) / 26)) : "") + String.fromCharCode(65 + ((n - 1) % 26));
}

// ─── Desplegables (copia de check_prefill_planillas: ese archivo corre su main al importarse) ──

function opcionesDe(v: ExcelJS.DataValidation): string[] {
  const f = String(v.formulae?.[0] ?? "");
  if (!f.startsWith('"')) throw new Error(`lista de validación que no sé leer: ${f}`);
  return f.replace(/^"|"$/g, "").split(",");
}

function celdasRespetanValidacion(wb: ExcelJS.Workbook, hoja: string, refs: string[]): string[] {
  const ws = wb.getWorksheet(hoja)!;
  const malas: string[] = [];
  for (const ref of refs) {
    const c = ws.getCell(ref);
    const v = c.dataValidation;
    if (!v) malas.push(`${hoja}!${ref}: sin validación`);
    else if (v.type === "list") {
      if (!opcionesDe(v).includes(String(c.value))) malas.push(`${hoja}!${ref}: «${c.value}» no está en el desplegable`);
    } else if (v.type === "whole" || v.type === "decimal") {
      const [min, max] = (v.formulae ?? []).map(Number);
      const n = c.value as number;
      if (typeof n !== "number" || n < min || n > max || (v.type === "whole" && !Number.isInteger(n)))
        malas.push(`${hoja}!${ref}: ${c.value} fuera de [${min}, ${max}]`);
    }
  }
  return malas;
}

const primeraPalabra = (t: string) => t.trim().split(/\s+/)[0].replace(/[¿?]/g, "").toLowerCase();

function previaCoincide(libro: LibroEvaluable, previa: HojaPrevia): string[] {
  const malas: string[] = [];
  if (JSON.stringify(previa.pestanas) !== JSON.stringify(libro.hojas))
    malas.push(`pestañas ${previa.pestanas.join("|")} ≠ archivo ${libro.hojas.join("|")}`);
  for (const f of previa.filas) {
    if (f.fila === undefined) continue;
    const etiqueta = String(libro.crudo(previa.hoja, `A${f.fila}`) ?? "");
    if (primeraPalabra(etiqueta) !== primeraPalabra(f.etiqueta)) malas.push(`fila ${f.fila}: «${f.etiqueta}» vs archivo «${etiqueta}»`);
    if (typeof f.valor === "number") {
      const v = libro.valor(previa.hoja, `B${f.fila}`);
      if (typeof v !== "number" || !igual(v, f.valor)) malas.push(`fila ${f.fila} (${f.etiqueta}): previa ${f.valor} ≠ archivo ${JSON.stringify(v)}`);
    } else if (typeof f.valor === "string" && f.tono === "input") {
      const v = libro.crudo(previa.hoja, `B${f.fila}`);
      if (String(v) !== f.valor) malas.push(`fila ${f.fila} (${f.etiqueta}): previa «${f.valor}» ≠ archivo «${v}»`);
    }
  }
  return malas;
}

// ─── 1. Estructura, escala y constantes ──────────────────────────────────────

async function estructura(libro: LibroEvaluable) {
  check("pestañas del archivo == las que muestra la vista previa", JSON.stringify(libro.hojas) === JSON.stringify(PESTANAS_CAMIONEROS), libro.hojas);
  check(
    "celdas del prefill == las del generador",
    JSON.stringify(camioneros.CELDAS) === JSON.stringify(CELDAS_CAMIONEROS) && camioneros.HOJA === HOJA_LIQUIDADOR_CAMIONEROS,
  );
  check(
    "primera fila de la Nómina del prefill == la del generador",
    camioneros.HOJA_NOMINA === HOJAS_CAMIONEROS.nomina &&
      camioneros.NOMINA_PRIMERA.categoria === `${NOMINA.columnas.categoria}${NOMINA.primeraFila}` &&
      camioneros.NOMINA_PRIMERA.antiguedad === `${NOMINA.columnas.antiguedad}${NOMINA.primeraFila}`,
  );
  check("registrado en PREFILLS", PREFILLS["planilla-camioneros"] === (camioneros.prefill as unknown));
  const { jubilacion, pami, obraSocial } = APORTES_PERSONALES;
  check("aportes desglosados (11+3+3) == el 17% del motor", igual((jubilacion + pami + obraSocial) * 1e6, CAMIONEROS_APORTES_REMUNERATIVO * 1e6));

  let mal = 0;
  CATEGORIAS_CAMIONEROS.forEach((cat, i) => {
    if (libro.crudo(HOJAS_CAMIONEROS.escala, `A${3 + i}`) !== cat.nombre) mal++;
    MESES_CAMIONEROS.forEach((mes, j) => {
      if (i === 0 && libro.crudo(HOJAS_CAMIONEROS.escala, `${letra(2 + j)}2`) !== mes.etiqueta) mal++;
      if (libro.crudo(HOJAS_CAMIONEROS.escala, `${letra(2 + j)}${3 + i}`) !== ESCALAS_POR_MES[mes.id][cat.id]) mal++;
    });
  });
  check(`escala del archivo == src/data/convenios/camioneros.ts (${MESES_CAMIONEROS.length} meses × ${CATEGORIAS_CAMIONEROS.length} categorías)`, mal === 0, `${mal} diferencias`);

  const VV = VALORES_VIATICOS;
  check(
    "valores de viáticos del archivo == los transcriptos de la planilla firmada",
    libro.crudo(L, VV.porKm) === VIATICOS_CAMIONEROS.porKm &&
      libro.crudo(L, VV.comida) === VIATICOS_CAMIONEROS.comida &&
      libro.crudo(L, VV.viaticoEspecial) === VIATICOS_CAMIONEROS.viaticoEspecial &&
      libro.crudo(L, VV.pernoctada) === VIATICOS_CAMIONEROS.pernoctada,
  );
  check("los valores de viáticos son del último mes de la escala o lo avisan en la hoja", typeof libro.valor(L, "C32") === "string");
  const avisoOtroMes = (() => {
    libro.cargar(L, { [C.mes]: MESES_CAMIONEROS[0].etiqueta });
    const t = String(libro.valor(L, "C32"));
    libro.cargar(L, { [C.mes]: VIATICOS_CAMIONEROS.etiquetaMes });
    return t;
  })();
  check("liquidando otro mes, la hoja avisa que los viáticos son de agosto", avisoOtroMes.startsWith("Ojo:"), avisoOtroMes);
}

// ─── 2. Liquidador == motor en toda la matriz ────────────────────────────────

const ANIOS = [0, 1, 7, 25, 60];

function matriz(libro: LibroEvaluable) {
  let mal = 0;
  for (const mes of MESES_CAMIONEROS)
    for (const cat of CATEGORIAS_CAMIONEROS)
      for (const anios of ANIOS) {
        libro.cargar(L, { [C.categoria]: cat.nombre, [C.mes]: mes.etiqueta, [C.antiguedad]: anios });
        const r = calcularCamioneros({ mesId: mes.id, categoriaId: cat.id, aniosAntiguedad: anios })!;
        const bruto = libro.numero(L, C.bruto);
        const neto = libro.numero(L, C.neto);
        const total = libro.numero(L, C.aCobrar);
        const antig = libro.numero(L, LIQ.antiguedad);
        casos++;
        if (!igual(bruto, r.totalRemunerativo) || !igual(neto, r.neto) || !igual(total, r.neto) || !igual(antig, r.antiguedad)) {
          mal++;
          if (mal <= 3) console.error(`     ${cat.id} · ${mes.id} · ${anios} años: archivo ${bruto}/${neto} ≠ motor ${r.totalRemunerativo}/${r.neto}`);
        }
      }
  check(`Liquidador: bruto, antigüedad y neto == calcularCamioneros en ${MESES_CAMIONEROS.length * CATEGORIAS_CAMIONEROS.length * ANIOS.length} casos`, mal === 0);
}

// ─── 3. Viajes: kilómetros, comidas, pernoctadas y zona ──────────────────────

function viajes(libro: LibroEvaluable) {
  const casosViaje = [
    { cat: "chofer-primera", anios: 10, zona: 0, km3: 4200, km4: 5000, com: 22, esp: 4, per: 12, oR: 0, oN: 0 },
    { cat: "chofer-segunda", anios: 3, zona: 1, km3: 1800.5, km4: 2100, com: 10, esp: 0, per: 5, oR: 35_000, oN: 58_100.83 },
    { cat: "peon", anios: 0, zona: 2, km3: 0, km4: 700, com: 3, esp: 3, per: 1, oR: 0, oN: 0 },
  ];
  const mesId = VIATICOS_CAMIONEROS.mesId;
  for (const k of casosViaje) {
    const zona = ZONAS_CAMIONEROS[k.zona];
    libro.cargar(L, {
      [C.categoria]: nombreCat(k.cat),
      [C.mes]: etiquetaMes(mesId),
      [C.antiguedad]: k.anios,
      [C.zona]: zona.nombre,
      [V.kmHorasExtra]: k.km3,
      [V.kmViatico]: k.km4,
      [V.comidas]: k.com,
      [V.viaticosEspeciales]: k.esp,
      [V.pernoctadas]: k.per,
      [V.otrosRemunerativos]: k.oR,
      [V.otrosNoRemunerativos]: k.oN,
    });
    // Lo que dicen la planilla firmada (4.2.3 remunerativo, 6.1.5 sobre lo remunerativo, coeficientes
    // por zona) y el ítem 4.2.11 (viáticos sin aportes), con el básico del motor.
    const basico = calcularCamioneros({ mesId, categoriaId: k.cat, aniosAntiguedad: 0 })!.basico;
    const he = k.km3 * VIATICOS_CAMIONEROS.porKm * zona.coeficiente;
    const antig = (basico + he + k.oR) * 0.01 * k.anios;
    const rem = basico + he + k.oR + antig;
    const neto = rem * (1 - CAMIONEROS_APORTES_REMUNERATIVO);
    const noRem =
      (k.km4 * VIATICOS_CAMIONEROS.porKm + k.com * VIATICOS_CAMIONEROS.comida + k.esp * VIATICOS_CAMIONEROS.viaticoEspecial + k.per * VIATICOS_CAMIONEROS.pernoctada) *
        zona.coeficiente +
      k.oN;
    const archivo = [libro.numero(L, C.bruto), libro.numero(L, C.neto), libro.numero(L, LIQ.noRemunerativo), libro.numero(L, C.aCobrar)];
    casos++;
    check(
      `viaje ${k.cat} · ${zona.nombre}: remunerativo ${Math.round(archivo[0])}, no remunerativo ${Math.round(archivo[2])}, a cobrar ${Math.round(archivo[3])}`,
      igual(archivo[0], rem) && igual(archivo[1], neto) && igual(archivo[2], noRem) && igual(archivo[3], neto + noRem),
      { archivo, esperado: [rem, neto, noRem, neto + noRem] },
    );

    const rec = HOJAS_CAMIONEROS.recibo;
    const netoRecibo = libro.numero(rec, "E23");
    check(`viaje ${k.cat}: el neto del recibo == el total a cobrar del Liquidador`, igual(netoRecibo, archivo[3]), { netoRecibo });
    check(`viaje ${k.cat}: haberes del recibo == remunerativo`, igual(libro.numero(rec, "C22"), archivo[0]));
  }
  libro.cargar(L, {
    [C.zona]: ZONAS_CAMIONEROS[0].nombre,
    [V.kmHorasExtra]: 0, [V.kmViatico]: 0, [V.comidas]: 0, [V.viaticosEspeciales]: 0, [V.pernoctadas]: 0,
    [V.otrosRemunerativos]: 0, [V.otrosNoRemunerativos]: 0,
  });
}

// ─── 4. Nómina: cada fila == motor, totales == suma ──────────────────────────

function nomina(libro: LibroEvaluable) {
  const N = HOJAS_CAMIONEROS.nomina;
  const K = NOMINA.columnas;
  for (const mes of [MESES_CAMIONEROS[0], MESES_CAMIONEROS.at(-1)!]) {
    libro.cargar(L, { [C.mes]: mes.etiqueta });
    const valores: Record<string, string | number | null> = {};
    CATEGORIAS_CAMIONEROS.forEach((cat, i) => {
      const r = NOMINA.primeraFila + i;
      valores[`${K.categoria}${r}`] = cat.nombre;
      valores[`${K.antiguedad}${r}`] = i * 3;
      valores[`${K.zona}${r}`] = ZONAS_CAMIONEROS[i % 3].nombre;
    });
    libro.cargar(N, valores);
    let mal = 0;
    let suma = 0;
    CATEGORIAS_CAMIONEROS.forEach((cat, i) => {
      const r = NOMINA.primeraFila + i;
      const m = calcularCamioneros({ mesId: mes.id, categoriaId: cat.id, aniosAntiguedad: i * 3 })!;
      suma += m.neto;
      casos++;
      if (!igual(libro.numero(N, `${K.totalRem}${r}`), m.totalRemunerativo) || !igual(libro.numero(N, `${K.aCobrar}${r}`), m.neto)) mal++;
    });
    check(`Nómina ${mes.etiqueta}: las ${CATEGORIAS_CAMIONEROS.length} filas == calcularCamioneros`, mal === 0);
    const filaTot = NOMINA.primeraFila + NOMINA.filas;
    check(`Nómina ${mes.etiqueta}: el total a cobrar == la suma de las filas (las vacías no suman)`, igual(libro.numero(N, `${K.aCobrar}${filaTot}`), suma));
    check(`Nómina: una fila sin categoría queda vacía`, libro.valor(N, `${K.aCobrar}${NOMINA.primeraFila + NOMINA.filas - 1}`) === "");
  }
}

// ─── 5. SAC == calcularAguinaldo ─────────────────────────────────────────────

function sac(libro: LibroEvaluable) {
  const H = HOJAS_CAMIONEROS.sac;
  const hasta = (iso: string, dias: number) => {
    const t = Date.parse(`${iso}T00:00:00Z`) - (dias - 1) * 86_400_000;
    return new Date(t).toISOString().slice(0, 10);
  };
  for (const sem of SEMESTRES_2026) {
    const plan = SEMESTRES_PLANILLA.find((s) => s.id === sem.id)!;
    for (const dias of [null, 90, 1]) {
      const sueldos = [1_010_000, 1_250_500.55, 980_000, 1_300_000.1, 1_299_999, 1_100_000];
      const valores: Record<string, number | string | null> = { [SAC.semestre]: plan.etiqueta, [SAC.diasTrabajados]: dias };
      sueldos.forEach((s, i) => (valores[`B${SAC.primerMes + i}`] = s));
      libro.cargar(H, valores);
      const r = calcularAguinaldo({
        mejorSueldo: Math.max(...sueldos),
        semestre: sem,
        ingresoISO: dias === null ? undefined : hasta(sem.finISO, dias),
      });
      casos++;
      check(
        `SAC ${sem.etiqueta}${dias === null ? " completo" : ` · ${dias} días`}: bruto ${Math.round(libro.numero(H, SAC.bruto))} y neto == calcularAguinaldo`,
        igual(libro.numero(H, SAC.bruto), r.bruto) && igual(libro.numero(H, SAC.neto), r.netoEstimado) && libro.numero(H, SAC.diasSemestre) === r.diasTotales,
        { archivo: [libro.numero(H, SAC.bruto), libro.numero(H, SAC.neto)], motor: [r.bruto, r.netoEstimado] },
      );
    }
  }
  libro.cargar(H, Object.fromEntries(Array.from({ length: 6 }, (_, i) => [`B${SAC.primerMes + i}`, `='${L}'!${C.bruto}`])));
  libro.cargar(L, { [C.categoria]: nombreCat("encargado"), [C.mes]: etiquetaMes(MESES_CAMIONEROS.at(-1)!.id), [C.antiguedad]: 4 });
  libro.cargar(H, { [SAC.diasTrabajados]: null });
  check("SAC: por defecto toma el bruto del Liquidador", igual(libro.numero(H, SAC.mejor), libro.numero(L, C.bruto)));
}

// ─── 6. Prefill aplicado sobre el archivo real ───────────────────────────────

async function aplicarYEvaluar(crudo: unknown) {
  const p = camioneros.prefill;
  const datos = p.validar(JSON.parse(JSON.stringify(crudo)));
  if (!datos) throw new Error(`validar rechazó un caso válido: ${JSON.stringify(crudo)}`);
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(ARCHIVO);
  p.aplicar!(wb, datos);
  const malas = [
    ...celdasRespetanValidacion(wb, camioneros.HOJA, [C.categoria, C.mes, C.antiguedad]),
    ...celdasRespetanValidacion(wb, camioneros.HOJA_NOMINA, [camioneros.NOMINA_PRIMERA.categoria, camioneros.NOMINA_PRIMERA.antiguedad]),
  ];
  const salida = path.join(TMP, `${Math.random().toString(36).slice(2)}.xlsx`);
  await wb.xlsx.writeFile(salida);
  return { libro: await abrirLibro(salida), malas, datos };
}

function hostiles<D extends object>(p: Prefill<D>, valido: D) {
  const base = valido as Record<string, unknown>;
  const rotos: unknown[] = [null, undefined, "texto", 42, [], [valido], {}, JSON.parse(`{"__proto__": ${JSON.stringify(valido)}}`), Object.create(valido)];
  for (const k of Object.keys(base)) {
    const v = base[k];
    rotos.push({ ...base, [k]: undefined }, { ...base, [k]: null }, { ...base, [k]: [v] }, { ...base, [k]: { v } });
    if (typeof v === "number")
      rotos.push({ ...base, [k]: String(v) }, { ...base, [k]: -1 }, { ...base, [k]: 1e9 }, { ...base, [k]: Number.NaN }, { ...base, [k]: Number.POSITIVE_INFINITY }, { ...base, [k]: 2.5 });
    else if (typeof v === "string")
      rotos.push(
        { ...base, [k]: v.toUpperCase() },
        { ...base, [k]: `${v} ` },
        { ...base, [k]: "constructor" },
        { ...base, [k]: "__proto__" },
        { ...base, [k]: `=HYPERLINK("http://x",${JSON.stringify(v)})` },
      );
  }
  const aceptados = rotos.filter((r) => {
    try {
      return p.validar(r) !== null;
    } catch {
      return true;
    }
  });
  check(`prefill: validar rechaza ${rotos.length} entradas hostiles`, aceptados.length === 0, aceptados.slice(0, 3));
  const conExtras = p.validar({ ...base, nombre: "Juan Pérez", cuil: "20-1", email: "x@y.z" });
  check(
    "prefill: validar ignora campos extra (nada personal viaja con el pago)",
    conExtras !== null && JSON.stringify(Object.keys(conExtras).sort()) === JSON.stringify(Object.keys(base).sort()),
    conExtras,
  );
  check("prefill: validar es idempotente", JSON.stringify(p.validar(p.validar(valido))) === JSON.stringify(p.validar(valido)));
  check("prefill: 61 años rechazado (la celda acepta 0 a 60)", p.validar({ ...base, anios: 61 }) === null);
  check("prefill: el JSON canónico entra holgado en la metadata de MP (2048)", JSON.stringify(p.validar(valido)).length < 200);
}

async function prefill() {
  const ultimo = MESES_CAMIONEROS.at(-1)!.id;
  const casosPrefill: camioneros.Datos[] = [
    { mesId: ultimo, categoriaId: "chofer-primera", anios: 0 },
    { mesId: ultimo, categoriaId: "ayudante-mayor", anios: 12 },
    { mesId: MESES_CAMIONEROS[0].id, categoriaId: "taller-medio-oficial", anios: 60 },
    { mesId: "julio-2026", categoriaId: "peon", anios: 1 },
    { mesId: "mayo-2026", categoriaId: "encargado", anios: 33 },
  ];
  for (const d of casosPrefill) {
    const { libro, malas } = await aplicarYEvaluar(d);
    const r = calcularCamioneros({ mesId: d.mesId, categoriaId: d.categoriaId, aniosAntiguedad: d.anios })!;
    const etq = `${d.categoriaId} · ${d.mesId} · ${d.anios} años`;
    casos++;
    check(`prefill ${etq}: desplegables y validaciones respetados`, malas.length === 0, malas);
    const previa = previaCoincide(libro, hojaCamioneros(ARCHIVO_CAMIONEROS, d)!.hoja);
    check(`prefill ${etq}: la vista previa == el archivo`, previa.length === 0, previa);
    const bruto = libro.numero(L, C.bruto);
    const neto = libro.numero(L, C.neto);
    check(`prefill ${etq}: bruto ${Math.round(bruto)} y neto ${Math.round(neto)} == calculadora`, igual(bruto, r.totalRemunerativo) && igual(neto, r.neto));
    const N = HOJAS_CAMIONEROS.nomina;
    const fila = NOMINA.primeraFila;
    check(`prefill ${etq}: la primera fila de la Nómina es la misma persona`, igual(libro.numero(N, `${NOMINA.columnas.aCobrar}${fila}`), r.neto));
  }
  hostiles(camioneros.prefill, casosPrefill[1]);
}

// ─── 7. Round-trip de exceljs (lo que hace la entrega personalizada) ─────────

async function roundtrip() {
  const original = readFileSync(ARCHIVO);
  const crudoXml = await JSZip.loadAsync(original);
  const hojasXml = Object.keys(crudoXml.files).filter((k) => /^xl\/worksheets\/sheet\d+\.xml$/.test(k));
  let conIgual = 0;
  for (const h of hojasXml) if (/<f>=/.test(await crudoXml.files[h].async("string"))) conIgual++;
  check("ninguna fórmula se guardó con «=» (Excel ofrecería reparar el archivo)", conIgual === 0);

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(original as unknown as ArrayBuffer);
  const reescrito = Buffer.from(await wb.xlsx.writeBuffer());
  const zipB = await JSZip.loadAsync(reescrito);
  const formulas = (xml: string) => [...xml.matchAll(/<c r="([A-Z]+\d+)"[^>]*>[\s\S]*?<f[^>]*>([\s\S]*?)<\/f>/g)].map((m) => `${m[1]}=${m[2]}`).join("\n");
  const validaciones = (xml: string) => (xml.match(/<dataValidation [\s\S]*?<\/dataValidation>/g) ?? []).length;
  const otros = (xml: string) =>
    [/<pageSetup [^>]*\/>/, /<pane [^>]*\/>/, /<mergeCell [^>]*\/>/g, /<col [^>]*\/>/g].map((re) => (xml.match(re) ?? []).length).join(",");
  for (const h of hojasXml) {
    const a = await crudoXml.files[h].async("string");
    const b = (await zipB.files[h]?.async("string")) ?? "";
    check(
      `round-trip ${h}: mismas fórmulas, desplegables, impresión y combinadas`,
      formulas(a) === formulas(b) && validaciones(a) <= validaciones(b) && validaciones(b) > 0 === validaciones(a) > 0 && otros(a).split(",")[0] === otros(b).split(",")[0],
      { formulas: formulas(a) === formulas(b), validaciones: [validaciones(a), validaciones(b)], otros: [otros(a), otros(b)] },
    );
  }
  const ruta = path.join(TMP, "roundtrip.xlsx");
  writeFileSync(ruta, reescrito);
  const [x, y] = [await abrirLibro(ARCHIVO), await abrirLibro(ruta)];
  let distintas = 0;
  for (const hoja of x.hojas)
    for (let r = 1; r <= 40; r++)
      for (let c = 1; c <= 20; c++) {
        const ref = `${letra(c)}${r}`;
        if (JSON.stringify(x.valor(hoja, ref)) !== JSON.stringify(y.valor(hoja, ref))) distintas++;
      }
  check("round-trip: las fórmulas dan lo mismo evaluadas", distintas === 0, `${distintas} celdas distintas`);
}

async function main() {
  check("el archivo entregable existe", existsSync(ARCHIVO), ARCHIVO);
  if (!existsSync(ARCHIVO)) process.exit(1);
  try {
    const libro = await abrirLibro(ARCHIVO);
    await estructura(libro);
    matriz(libro);
    viajes(libro);
    nomina(libro);
    sac(libro);
    await prefill();
    await roundtrip();
  } finally {
    rmSync(TMP, { recursive: true, force: true });
  }
  console.log(`\n${fallas === 0 ? "✅" : "❌"} planilla Camioneros: ${casos} casos evaluados, ${fallas} fallas`);
  process.exit(fallas === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
