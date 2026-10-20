// Verifica la hoja «Diferencias» de la planilla UOCRA evaluando el archivo REAL con HyperFormula
// y comparándolo con un cálculo independiente en TypeScript hecho desde los datos.
//
// Esta hoja la usa gente que reclama en un juicio lo que le deben: un rango corrido o un MATCH
// contra el bloque equivocado es plata mal pedida. Por eso se prueban casos que tocan todas las
// ramas: categorías distintas, sereno registrado (mensual), zona austral, período parcial, sin asistencia,
// antigüedad que cruza el año (12% → 8%) y la opción de cargar lo cobrado a mano.
//
// Correr con: npx tsx scripts/check_planilla_uocra_diferencias.ts  (o vía scripts/check-all.ts)

import path from "node:path";
import { abrirLibro } from "./evaluar_xlsx";
import { CELDAS_DIFERENCIAS, FILA_DIF_INI, HOJA_DIFERENCIAS_UOCRA, OTRO_COBRADO } from "./gen_planilla_uocra";
import {
  CATEGORIAS_UOCRA,
  MESES_UOCRA,
  UOCRA_ASISTENCIA_PERFECTA,
  ZONAS_UOCRA,
  type CategoriaUocraId,
  type MesUocra,
  type ZonaUocraId,
} from "../src/data/convenios/uocra";
import { MESES_UOCRA_HISTORICO } from "../src/data/convenios/uocra-historico";

const ARCHIVO = path.join(process.cwd(), "private", "planilla-uocra-2026.xlsx");
const MESES = [...MESES_UOCRA_HISTORICO, ...MESES_UOCRA];
const H = HOJA_DIFERENCIAS_UOCRA;

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

type Caso = {
  nombre: string;
  corresponde: CategoriaUocraId;
  registrada: CategoriaUocraId | "otro";
  zona: ZonaUocraId;
  desde: string;
  hasta: string;
  asistencia: boolean;
  horas: number;
  antiguedad: number;
  /** Sólo con registrada = "otro": lo cobrado por mes (remunerativo, no remunerativo). */
  cobrado?: { rem: number; snr: number };
};

function remDe(m: MesUocra, cat: CategoriaUocraId, zona: ZonaUocraId, horas: number, asist: boolean) {
  const base = cat === "sereno" ? m.serenoMensual[zona] : m.jornales[cat][zona] * horas;
  return base * (asist ? 1 + UOCRA_ASISTENCIA_PERFECTA : 1);
}

function esperado(c: Caso) {
  const i0 = MESES.findIndex((m) => m.etiqueta === c.desde);
  const i1 = MESES.findIndex((m) => m.etiqueta === c.hasta);
  let sueldo = 0, snr = 0, cese = 0, meses = 0;
  const sem = new Map<string, { n: number; maxC: number; maxP: number }>();
  MESES.forEach((m, i) => {
    if (i < i0 || i > i1) return;
    meses++;
    const remC = remDe(m, c.corresponde, c.zona, c.horas, c.asistencia);
    const snrC = m.snr[c.corresponde][c.zona];
    const remP = c.registrada === "otro" ? c.cobrado!.rem : remDe(m, c.registrada, c.zona, c.horas, c.asistencia);
    const snrP = c.registrada === "otro" ? c.cobrado!.snr : m.snr[c.registrada][c.zona];
    sueldo += remC - remP;
    snr += snrC - snrP;
    cese += (remC - remP) * (c.antiguedad + (i - i0) < 12 ? 0.12 : 0.08);
    const k = `${m.anio}-${m.mes <= 6 ? 1 : 2}`;
    const s = sem.get(k) ?? { n: 0, maxC: 0, maxP: 0 };
    s.n++;
    s.maxC = Math.max(s.maxC, remC);
    s.maxP = Math.max(s.maxP, remP);
    sem.set(k, s);
  });
  let sac = 0;
  for (const s of sem.values()) sac += ((s.maxC - s.maxP) / 2) * (s.n / 6);
  return { meses, sueldo, snr, sac, cese, total: sueldo + snr + sac + cese };
}

const nombreCat = (id: CategoriaUocraId) => CATEGORIAS_UOCRA.find((x) => x.id === id)!.nombre;
const nombreZona = (id: ZonaUocraId) => ZONAS_UOCRA.find((x) => x.id === id)!.nombre;

const ultimo = MESES.at(-1)!.etiqueta;
const CASOS: Caso[] = [
  { nombre: "oficial registrado como ayudante, zona A, todo el período", corresponde: "oficial", registrada: "ayudante", zona: "a", desde: "Junio 2024", hasta: ultimo, asistencia: true, horas: 190.67, antiguedad: 12 },
  { nombre: "oficial especializado como medio oficial, zona C Austral, recién ingresado", corresponde: "oficial-especializado", registrada: "medio-oficial", zona: "c-austral", desde: "Octubre 2024", hasta: "Septiembre 2025", asistencia: false, horas: 176, antiguedad: 3 },
  { nombre: "medio oficial registrado como sereno, zona B", corresponde: "medio-oficial", registrada: "sereno", zona: "b", desde: "Enero 2025", hasta: "Diciembre 2025", asistencia: true, horas: 190.67, antiguedad: 0 },
  { nombre: "oficial con lo cobrado cargado a mano, zona C", corresponde: "oficial", registrada: "otro", zona: "c", desde: "Mayo 2025", hasta: "Marzo 2026", asistencia: true, horas: 190.67, antiguedad: 24, cobrado: { rem: 600_000, snr: 0 } },
];

async function main() {
  const libro = await abrirLibro(ARCHIVO);
  check("la planilla trae la hoja «Diferencias»", libro.hojas.includes(H), libro.hojas);

  const filasMes = MESES.map((m, j) => String(libro.crudo(H, `A${FILA_DIF_INI + j}`)));
  check("la hoja tiene una fila por cada mes de la escala, en orden", filasMes.join("|") === MESES.map((m) => m.etiqueta).join("|"));

  for (const c of CASOS) {
    const valores: Record<string, string | number> = {
      [CELDAS_DIFERENCIAS.corresponde]: nombreCat(c.corresponde),
      [CELDAS_DIFERENCIAS.registrada]: c.registrada === "otro" ? OTRO_COBRADO : nombreCat(c.registrada),
      [CELDAS_DIFERENCIAS.zona]: nombreZona(c.zona),
      [CELDAS_DIFERENCIAS.desde]: c.desde,
      [CELDAS_DIFERENCIAS.hasta]: c.hasta,
      [CELDAS_DIFERENCIAS.asistencia]: c.asistencia ? "Sí" : "No",
      [CELDAS_DIFERENCIAS.horas]: c.horas,
      [CELDAS_DIFERENCIAS.antiguedad]: c.antiguedad,
    };
    if (c.cobrado)
      MESES.forEach((_, j) => {
        valores[`F${FILA_DIF_INI + j}`] = c.cobrado!.rem;
        valores[`G${FILA_DIF_INI + j}`] = c.cobrado!.snr;
      });
    libro.cargar(H, valores);
    const e = esperado(c);
    const real = {
      meses: libro.numero(H, CELDAS_DIFERENCIAS.meses),
      sueldo: libro.numero(H, CELDAS_DIFERENCIAS.sueldo),
      snr: libro.numero(H, CELDAS_DIFERENCIAS.snr),
      sac: libro.numero(H, CELDAS_DIFERENCIAS.sac),
      cese: libro.numero(H, CELDAS_DIFERENCIAS.fondoCese),
      total: libro.numero(H, CELDAS_DIFERENCIAS.total),
    };
    const malos = (Object.keys(e) as (keyof typeof e)[]).filter((k) => Math.abs(e[k] - real[k]) > 0.5);
    check(`${c.nombre}: el archivo da lo mismo que el cálculo independiente`, malos.length === 0, { esperado: e, archivo: real });
    check(`${c.nombre}: el total es positivo`, real.total > 0, real.total);
  }

  if (fallas > 0) {
    console.error(`\n${fallas} falla(s) en la hoja de diferencias`);
    process.exit(1);
  }
  console.log("\nHoja de diferencias UOCRA OK");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
