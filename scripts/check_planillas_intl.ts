// Verifica las planillas de sueldo y liquidación de calcularya.com (private/intl/<m>/*.xlsx):
// - el archivo existe y es el que generaría hoy el generador (mismas hojas, mismos números y fórmulas,
//   o sea, datos vigentes y no un archivo viejo),
// - ninguna fórmula da error con los valores de ejemplo,
// - con las entradas de los .casos.ts de cada calculadora del país (y variantes con otros sueldos),
//   las fórmulas del archivo evaluadas con HyperFormula dan lo mismo que calcular() del motor con los
//   mismos datos vigentes, a un redondeo de distancia,
// - el catálogo de pagos solo vende la planilla de los países que pasan, con el archivo correcto.
//
// Uso: npx tsx scripts/check_planillas_intl.ts [mercado]

import ExcelJS from "exceljs";
import path from "node:path";
import { existsSync } from "node:fs";
import { DetailedCellError } from "hyperformula";
import { crearContexto, ErrorEntrada, type CasosCalculadora } from "../src/motor/calculo";
import { resolverValores } from "../src/motor/registro";
import type { Campo, DefinicionCalculadora, FechaISO, PaisDefinido, ValoresDe } from "../src/motor/tipos";
import { diasEntre, sumarDias } from "../src/motor/vigencia";
import { PRODUCTOS_INTL } from "../src/lib/pagos/catalogo-intl";
import { abrirLibro, type LibroEvaluable } from "./evaluar_xlsx";
import { archivosBajo, DIR_PAISES, importar } from "./paises_comun";
import { PLANILLAS_INTL, construirPlanilla, type PlanillaConstruida } from "./planillas-intl";
import { HOJA_INSTRUCCIONES, HOJA_TABLAS, type Bloque } from "./planillas-intl/marco";

const SLUG_PRODUCTO = "sueldo-y-liquidacion";
const FACTORES = [1, 0.35, 2.7, 9];
const CORRIMIENTOS = [0, 1, 13, -40, 171];

let fallas = 0;
const fallo = (msg: string) => {
  fallas++;
  console.error(`FAIL ${msg}`);
};

function crudoCelda(v: ExcelJS.CellValue): string | number | null {
  if (v === null || v === undefined) return null;
  if (typeof v === "number") return v;
  if (typeof v === "object" && "formula" in v && v.formula) return `=${v.formula}`;
  return null;
}

async function comparaConGenerado(p: PlanillaConstruida): Promise<boolean> {
  const enDisco = new ExcelJS.Workbook();
  await enDisco.xlsx.readFile(p.ruta);
  const fresco = new ExcelJS.Workbook();
  await fresco.xlsx.load(await p.libro.wb.xlsx.writeBuffer());
  const nombres = (wb: ExcelJS.Workbook) => wb.worksheets.map((w) => w.name).join(" | ");
  if (nombres(enDisco) !== nombres(fresco)) {
    fallo(`${p.planilla.mercado}: hojas del archivo (${nombres(enDisco)}) distintas de las que se generan hoy (${nombres(fresco)}). Corré scripts/gen_planilla_todas.ts.`);
    return false;
  }
  let distintas = 0;
  const celdasSerie = new Map([...p.libro.tablas.series].map(([id, s]) => [s.celda, id]));
  for (const ws of fresco.worksheets) {
    const otra = enDisco.getWorksheet(ws.name)!;
    const filas = Math.max(ws.rowCount, otra.rowCount);
    const cols = Math.max(ws.columnCount, otra.columnCount);
    for (let r = 1; r <= filas; r++) {
      for (let c = 1; c <= cols; c++) {
        const a = crudoCelda(ws.getCell(r, c).value);
        const b = crudoCelda(otra.getCell(r, c).value);
        const serie = ws.name === HOJA_TABLAS ? celdasSerie.get(ws.getCell(r, c).address) : undefined;
        if (serie !== undefined) {
          const s = p.libro.pais.series.find((x) => x.id === serie)!;
          const vigentes = s.puntos.filter(([f]) => f <= p.hoy && diasEntre(f, p.hoy) <= s.maxAntiguedadDias).map(([, v]) => v);
          if (typeof b !== "number" || !vigentes.includes(b)) {
            fallo(`${p.planilla.mercado}: ${serie} en el archivo vale ${JSON.stringify(b)}, que no es un valor vigente de la serie al ${p.hoy}. Corré scripts/gen_planilla_todas.ts.`);
            distintas++;
          }
          continue;
        }
        if (a !== b) {
          if (distintas < 3) fallo(`${p.planilla.mercado}: ${ws.name}!${ws.getCell(r, c).address} en el archivo es ${JSON.stringify(b)} y hoy se genera ${JSON.stringify(a)}`);
          distintas++;
        }
      }
    }
  }
  if (distintas) fallo(`${p.planilla.mercado}: ${distintas} celdas del archivo no son las de hoy (datos viejos). Corré scripts/gen_planilla_todas.ts.`);
  return distintas === 0;
}

function sinErrores(p: PlanillaConstruida, libro: LibroEvaluable): boolean {
  let ok = true;
  for (const hoja of libro.hojas) {
    if (hoja === HOJA_INSTRUCCIONES) continue;
    const id = libro.hf.getSheetId(hoja)!;
    const valores = libro.hf.getSheetValues(id);
    valores.forEach((fila, r) =>
      fila.forEach((v, c) => {
        if (v instanceof DetailedCellError) {
          ok = false;
          fallo(`${p.planilla.mercado}: ${hoja} fila ${r + 1} col ${c + 1} da ${v.value} (${v.message})`);
        }
      }),
    );
  }
  return ok;
}

async function casosDe(carpeta: string, def: DefinicionCalculadora): Promise<CasosCalculadora | null> {
  for (const archivo of archivosBajo(path.join(DIR_PAISES, carpeta, "calculadoras"), /\.casos\.ts$/)) {
    const m = await importar<CasosCalculadora>(archivo);
    if (m?.calculadora?.id === def.id) return m;
  }
  return null;
}

// Además de los casos tal cual: otros sueldos (para pasar por topes, pisos y tramos) y las mismas
// fechas corridas unos días (para pasar por fin de mes, febrero y cambio de semestre).
function variantes(campos: readonly Campo[], entrada: Record<string, unknown>): Record<string, unknown>[] {
  const monedas = campos.filter((c) => c.tipo === "moneda").map((c) => c.id);
  const fechas = campos.filter((c) => c.tipo === "fecha").map((c) => c.id);
  const salida: Record<string, unknown>[] = [];
  for (const f of FACTORES) {
    for (const d of fechas.length ? CORRIMIENTOS : [0]) {
      const e = { ...entrada };
      for (const id of monedas) if (typeof e[id] === "number") e[id] = Math.round((e[id] as number) * f * 100) / 100;
      for (const id of fechas) if (typeof e[id] === "string") e[id] = sumarDias(e[id] as FechaISO, d);
      salida.push(e);
    }
  }
  return salida;
}

async function verificarBloque(p: PlanillaConstruida, pais: PaisDefinido, libro: LibroEvaluable, b: Bloque): Promise<boolean> {
  const m = p.planilla.mercado;
  const entrada = pais.calculadoras.find((c) => c.definicion.slug === b.calculadora);
  if (!entrada) {
    fallo(`${m}/${b.calculadora}: la hoja ${b.hoja} usa una calculadora que no existe`);
    return false;
  }
  const def = entrada.definicion;
  let ok = true;
  for (const c of def.campos) {
    if (!(c.id in b.entradas)) {
      ok = false;
      fallo(`${m}/${b.calculadora}: el campo ${c.id} de la calculadora no tiene celda en la hoja ${b.hoja}`);
    }
  }
  for (const r of def.resultado) {
    if (r.formato !== "texto" && r.formato !== "fecha" && !(r.clave in b.resultados)) {
      ok = false;
      fallo(`${m}/${b.calculadora}: el resultado ${r.clave} no está en la hoja ${b.hoja}`);
    }
  }
  const res = resolverValores(pais, def, p.hoy);
  if (!res.ok) {
    fallo(`${m}/${b.calculadora}: no resuelve sus datos al ${p.hoy}: ${res.motivos.join("; ")}`);
    return false;
  }
  const casos = await casosDe(m, def);
  if (!casos || casos.casos.length === 0) {
    fallo(`${m}/${b.calculadora}: no encontré sus .casos.ts`);
    return false;
  }
  const valores: Record<string, unknown> = { ...res.valores };
  for (const [id, req] of Object.entries(def.requiere)) {
    const s = p.libro.tablas.series.get(id);
    if (req === "serie" && s) valores[id] = { fecha: p.hoy, valor: libro.numero(HOJA_TABLAS, s.celda) };
  }
  const ctx = crearContexto(pais.mercado, p.hoy, def);
  const unidad = 10 ** -(def.redondeo ?? pais.mercado.redondeo).decimales;
  let comparados = 0;
  let probados = 0;
  for (const caso of casos.casos) {
    if (caso.esperaError) continue;
    for (const e of variantes(def.campos, caso.entrada as Record<string, unknown>)) {
      let esperado: Record<string, unknown>;
      try {
        esperado = def.calcular(e as never, valores as ValoresDe<typeof def.requiere>, ctx) as Record<string, unknown>;
      } catch (err) {
        if (err instanceof ErrorEntrada) continue;
        throw err;
      }
      const cargas: Record<string, string | number | boolean | null> = {};
      for (const [id, celda] of Object.entries(b.entradas)) cargas[celda.ref] = celda.convertir(e[id]);
      if (b.hoy) cargas[b.hoy.ref] = b.hoy.convertir(p.hoy);
      libro.cargar(b.hoja, cargas);
      probados++;
      for (const [clave, ref] of Object.entries(b.resultados)) {
        const esp = esperado[clave];
        if (typeof esp !== "number") continue;
        let obtenido: number;
        try {
          obtenido = libro.numero(b.hoja, ref);
        } catch (err) {
          ok = false;
          fallo(`${m}/${b.calculadora} «${caso.nombre}» ${JSON.stringify(e)}: ${clave} ${(err as Error).message}`);
          continue;
        }
        comparados++;
        if (Math.abs(obtenido - esp) > unidad + 1e-9) {
          ok = false;
          fallo(`${m}/${b.calculadora} «${caso.nombre}» ${JSON.stringify(e)}: ${clave} planilla ${obtenido} motor ${esp}`);
        }
      }
    }
  }
  if (probados === 0) {
    ok = false;
    fallo(`${m}/${b.calculadora}: ningún caso se pudo probar`);
  }
  console.log(`${ok ? "OK  " : "MAL "} ${m}/${b.calculadora} (${b.hoja}): ${probados} entradas, ${comparados} valores comparados`);
  return ok;
}

async function main(): Promise<void> {
  const filtro = process.argv[2];
  const pasan = new Map<string, PlanillaConstruida>();
  const conPlanilla = new Set<string>();
  for (const planilla of PLANILLAS_INTL) {
    const m = planilla.mercado;
    if (filtro && m !== filtro) continue;
    conPlanilla.add(m);
    const p = construirPlanilla(planilla);
    if (!p) {
      console.log(`--   ${m}: sin hojas publicables hoy`);
      continue;
    }
    if (!existsSync(p.ruta)) {
      fallo(`${m}: falta ${path.relative(process.cwd(), p.ruta)}. Corré scripts/gen_planilla_todas.ts.`);
      continue;
    }
    let ok = await comparaConGenerado(p);
    const libro = await abrirLibro(p.ruta);
    // exceljs lee una celda con formato de fecha como Date y evaluar_xlsx la pasa a milisegundos:
    // se recargan los valores de ejemplo tal como los escribió el generador (número de serie).
    for (const b of p.libro.bloques) {
      const ws = p.libro.wb.getWorksheet(b.hoja)!;
      const valores: Record<string, string | number | null> = {};
      for (const e of Object.values(b.entradas)) {
        const v = ws.getCell(e.ref).value;
        valores[e.ref] = typeof v === "number" || typeof v === "string" ? v : null;
      }
      libro.cargar(b.hoja, valores);
    }
    ok = sinErrores(p, libro) && ok;
    for (const b of p.libro.bloques) ok = (await verificarBloque(p, p.libro.pais, libro, b)) && ok;
    if (ok) pasan.set(m, p);
  }

  for (const prod of PRODUCTOS_INTL.filter((x) => x.slug === SLUG_PRODUCTO)) {
    if (filtro && prod.mercado !== filtro) continue;
    const p = pasan.get(prod.mercado);
    if (!p) fallo(`catálogo: ${prod.id} está a la venta pero su planilla no pasa este check (o no existe)`);
    else if (prod.archivo !== p.archivo) fallo(`catálogo: ${prod.id} apunta a ${prod.archivo} y la planilla de hoy es ${p.archivo}`);
  }
  for (const m of pasan.keys()) {
    if (!PRODUCTOS_INTL.some((x) => x.mercado === m && x.slug === SLUG_PRODUCTO)) console.log(`AVISO ${m}: la planilla pasa pero no está en PRODUCTOS_INTL`);
  }
  for (const m of conPlanilla) if (!pasan.has(m)) console.log(`AVISO ${m}: la planilla no pasa, no se puede vender`);

  console.log(fallas ? `\n${fallas} FALLAS` : `\nTODO OK: ${pasan.size} planillas verificadas (${[...pasan.keys()].join(", ")})`);
  process.exit(fallas ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
