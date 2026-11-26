// Planilla UOCRA: el CCT 577/10 (redes: canalización, líneas e instalación, empalme).
//
// El 25/11/2026 un comprador devolvió la planilla porque su convenio es el 577/10 y el archivo
// solo traía el 76/75. Este check prueba tres cosas:
//   1. Los datos de src/data/convenios/uocra-577.ts reproducen los Anexos II firmados: valores
//      testigo copiados del PDF y la aritmética propia de cada tabla (un dígito mal leído de un
//      scan rompe alguna de las dos).
//   2. El .xlsx que se vende trae esos mismos valores en «Escalas 577-10».
//   3. El «Liquidador 577-10», evaluado con HyperFormula sobre el archivo real, da los números
//      calculados a mano (antigüedad del art. 13, asistencia del art. 11, SNR y aportes).
//
// Correr con: TSX_DISABLE_CACHE=1 npx tsx scripts/check_planilla_uocra_577.ts

import path from "node:path";
import { existsSync } from "node:fs";
import {
  CATEGORIAS_UOCRA_577,
  MESES_UOCRA_577,
  RAMAS_UOCRA_577,
  UOCRA_577_ANTIGUEDAD_POR_ANIO,
  UOCRA_577_FUENTES,
  type CategoriaUocra577Id,
  type RamaUocra577Id,
} from "../src/data/convenios/uocra-577";
import { MESES_UOCRA, ZONAS_UOCRA, type ZonaUocraId } from "../src/data/convenios/uocra";
import { abrirLibro } from "./evaluar_xlsx";
import { HOJA_ESCALAS_577, HOJA_LIQUIDADOR_577, CELDAS_577 } from "./gen_planilla_uocra";

const ARCHIVO = path.join(process.cwd(), "private", "planilla-uocra-2026.xlsx");

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) console.log(`OK   ${nombre}`);
  else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const mesPorId = (id: string) => MESES_UOCRA_577.find((m) => m.id === id)!;
const jornal = (mesId: string, rama: RamaUocra577Id, cat: CategoriaUocra577Id, zona: ZonaUocraId) =>
  mesPorId(mesId)?.jornales[rama][cat][zona];

async function main() {
  // ── 1a. Valores testigo, copiados a mano de cada Anexo II ──────────────────
  const testigos: Array<[string, RamaUocra577Id, CategoriaUocra577Id, ZonaUocraId, number]> = [
    ["abril-2026", "canalizacion", "oficial-especializado", "a", 6591],
    ["abril-2026", "empalme", "ayudante", "c-austral", 9229],
    ["mayo-2026", "canalizacion", "medio-oficial", "b", 5462],
    ["mayo-2026", "lineas", "oficial", "c", 9423],
    ["junio-2026", "empalme", "oficial-especializado", "c", 11878],
    ["julio-2026", "lineas", "medio-oficial", "b", 6126],
    ["julio-2026", "canalizacion", "ayudante", "c-austral", 9865],
    ["agosto-2026", "empalme", "oficial", "a", 7004],
    ["agosto-2026", "lineas", "ayudante", "c", 10218],
    ["septiembre-2026", "canalizacion", "oficial", "a", 6775],
    ["septiembre-2026", "lineas", "oficial-especializado", "c", 13106],
    ["septiembre-2026", "empalme", "ayudante", "c-austral", 11610],
    ["octubre-2026", "empalme", "oficial", "b", 8057],
    ["noviembre-2026", "empalme", "oficial-especializado", "b", 10051],
    ["noviembre-2026", "canalizacion", "ayudante", "a", 5679],
  ];
  for (const [m, r, c, z, v] of testigos) {
    check(`testigo ${m} ${r} ${c} zona ${z} = ${v}`, jornal(m, r, c, z) === v, jornal(m, r, c, z));
  }

  check(
    "el 577/10 cubre abril a noviembre 2026, los mismos meses que la calculadora del 76/75",
    MESES_UOCRA_577.map((m) => m.id).join() === MESES_UOCRA.map((m) => m.id).join(),
    MESES_UOCRA_577.map((m) => m.id),
  );

  // ── 1b. Aritmética de cada tabla ────────────────────────────────────────────
  const raros: unknown[] = [];
  for (const m of MESES_UOCRA_577) {
    for (const rama of RAMAS_UOCRA_577) {
      for (const cat of CATEGORIAS_UOCRA_577) {
        const f = m.jornales[rama.id][cat.id];
        const ratioB = f.b / f.a;
        if (Math.abs(f["c-austral"] - 2 * f.a) > 2) raros.push({ m: m.id, rama: rama.id, cat: cat.id, regla: "C Austral = 2 × básico", f });
        if (ratioB < 1.105 || ratioB > 1.115) raros.push({ m: m.id, rama: rama.id, cat: cat.id, regla: "zona B ≈ +11 %", ratioB });
        if (!(f.c > f.b)) raros.push({ m: m.id, rama: rama.id, cat: cat.id, regla: "zona C > zona B", f });
      }
    }
  }
  check("cada fila cumple la aritmética de su tabla (C Austral, zona B, zona C)", raros.length === 0, raros.slice(0, 5));

  // Los acuerdos fijan un % uniforme sobre los básicos: el cociente con el mes anterior tiene que
  // dar el mismo en las 12 filas (rama × categoría), con el redondeo a peso de la tabla.
  const pctAcordado: Record<string, number> = {
    "mayo-2026": 1.018,
    "julio-2026": 1.02,
    "septiembre-2026": 1.019,
    "octubre-2026": 1.018,
    "noviembre-2026": 1.017,
  };
  for (const [id, factor] of Object.entries(pctAcordado)) {
    const i = MESES_UOCRA_577.findIndex((m) => m.id === id);
    const ant = MESES_UOCRA_577[i - 1];
    const act = MESES_UOCRA_577[i];
    const desvios: unknown[] = [];
    for (const rama of RAMAS_UOCRA_577) {
      for (const cat of CATEGORIAS_UOCRA_577) {
        for (const z of ZONAS_UOCRA) {
          const esperado = ant.jornales[rama.id][cat.id][z.id] * factor;
          const real = act.jornales[rama.id][cat.id][z.id];
          if (Math.abs(real - esperado) > 3) desvios.push({ rama: rama.id, cat: cat.id, zona: z.id, real, esperado: Math.round(esperado) });
        }
      }
    }
    check(`${id}: las 48 celdas son el mes anterior × ${factor} (±$3)`, desvios.length === 0, desvios.slice(0, 5));
  }

  check(
    "SNR de julio 2026 = la del Anexo II (Oficial especializado zona A $72.900, Ayudante C Austral $115.800)",
    mesPorId("julio-2026").snr["oficial-especializado"].a === 72_900 && mesPorId("julio-2026").snr.ayudante["c-austral"] === 115_800,
  );
  check(
    "agosto a noviembre 2026 sin SNR (se absorbió al jornal)",
    MESES_UOCRA_577.filter((m) => m.mes >= 8).every((m) => CATEGORIAS_UOCRA_577.every((c) => ZONAS_UOCRA.every((z) => m.snr[c.id][z.id] === 0))),
  );

  // ── 2. El archivo que se vende ──────────────────────────────────────────────
  if (!existsSync(ARCHIVO)) {
    check("existe el entregable private/planilla-uocra-2026.xlsx", false);
    return terminar();
  }
  const libro = await abrirLibro(ARCHIVO);
  check(`el .xlsx tiene la hoja «${HOJA_ESCALAS_577}»`, libro.hojas.includes(HOJA_ESCALAS_577), libro.hojas);
  check(`el .xlsx tiene la hoja «${HOJA_LIQUIDADOR_577}»`, libro.hojas.includes(HOJA_LIQUIDADOR_577), libro.hojas);
  if (!libro.hojas.includes(HOJA_ESCALAS_577) || !libro.hojas.includes(HOJA_LIQUIDADOR_577)) return terminar();

  const filaHeader = 2;
  const colMes = new Map<string, number>();
  for (let c = 1; c <= 60; c++) {
    const v = libro.crudo(HOJA_ESCALAS_577, `${letra(c)}${filaHeader}`);
    if (typeof v === "string") colMes.set(v, c);
  }
  const filaClave = new Map<string, number>();
  for (let r = filaHeader + 1; r <= 120; r++) {
    const v = libro.crudo(HOJA_ESCALAS_577, `A${r}`);
    if (typeof v === "string" && v.includes("|")) filaClave.set(v, r);
  }
  let comparados = 0;
  const drift: unknown[] = [];
  for (const m of MESES_UOCRA_577) {
    const c = colMes.get(m.etiqueta);
    if (!c) {
      drift.push({ falta: m.etiqueta });
      continue;
    }
    for (const rama of RAMAS_UOCRA_577) {
      for (const cat of CATEGORIAS_UOCRA_577) {
        for (const z of ZONAS_UOCRA) {
          const r = filaClave.get(`J|${rama.nombre}|${cat.nombre}|${z.nombre}`);
          const v = r ? libro.crudo(HOJA_ESCALAS_577, `${letra(c)}${r}`) : null;
          comparados++;
          if (v !== m.jornales[rama.id][cat.id][z.id]) drift.push({ m: m.id, rama: rama.id, cat: cat.id, z: z.id, enArchivo: v });
        }
      }
    }
    for (const cat of CATEGORIAS_UOCRA_577) {
      for (const z of ZONAS_UOCRA) {
        const r = filaClave.get(`S|${cat.nombre}|${z.nombre}`);
        const v = r ? libro.crudo(HOJA_ESCALAS_577, `${letra(c)}${r}`) : null;
        comparados++;
        if (v !== m.snr[cat.id][z.id]) drift.push({ m: m.id, snr: cat.id, z: z.id, enArchivo: v });
      }
    }
  }
  check(`los ${comparados} valores de «${HOJA_ESCALAS_577}» coinciden con los datos del 577/10`, comparados === 8 * (48 + 16) && drift.length === 0, drift.slice(0, 5));

  // ── 3. El Liquidador, evaluado ──────────────────────────────────────────────
  const L = HOJA_LIQUIDADOR_577;
  const casos = [
    {
      nombre: "Empalme · Oficial · Zona B · septiembre 2026 · 200 h · 3 años · con asistencia · sin solidario",
      inputs: { rama: "Empalme", categoria: "Oficial", zona: "Zona B", mes: "Septiembre 2026", horas: 200, antiguedad: 3, asistencia: "Sí", solidario: "No" },
      // 7915 × 200 = 1.583.000; antigüedad 7137 × 200 × 0,5 % × 3 = 21.411; asistencia 316.600.
      bruto: 1_921_011,
      neto: 1_921_011 - 1_921_011 * 0.17,
    },
    {
      nombre: "Canalización · Ayudante · Zona C Austral · julio 2026 · 100 h · sin antigüedad · sin asistencia · con solidario",
      inputs: { rama: "Canalización", categoria: "Ayudante", zona: "Zona C Austral", mes: "Julio 2026", horas: 100, antiguedad: 0, asistencia: "No", solidario: "Sí" },
      // 9865 × 100 = 986.500 + SNR 115.800; aportes 986.500 × 19 % + 115.800 × 3 %.
      bruto: 1_102_300,
      neto: 1_102_300 - (986_500 * 0.19 + 115_800 * 0.03),
    },
  ];
  for (const caso of casos) {
    libro.cargar(L, {
      [CELDAS_577.rama]: caso.inputs.rama,
      [CELDAS_577.categoria]: caso.inputs.categoria,
      [CELDAS_577.zona]: caso.inputs.zona,
      [CELDAS_577.mes]: caso.inputs.mes,
      [CELDAS_577.horas]: caso.inputs.horas,
      [CELDAS_577.antiguedad]: caso.inputs.antiguedad,
      [CELDAS_577.asistencia]: caso.inputs.asistencia,
      [CELDAS_577.solidario]: caso.inputs.solidario,
    });
    let bruto = NaN;
    let neto = NaN;
    try {
      bruto = libro.numero(L, CELDAS_577.bruto);
      neto = libro.numero(L, CELDAS_577.neto);
    } catch (e) {
      check(`${caso.nombre}: el Liquidador evalúa`, false, String(e));
      continue;
    }
    check(`${caso.nombre}: bruto ${caso.bruto}`, Math.abs(bruto - caso.bruto) < 0.5, { bruto });
    check(`${caso.nombre}: neto ${caso.neto.toFixed(2)}`, Math.abs(neto - caso.neto) < 0.5, { neto });
  }

  check("la tasa de antigüedad del art. 13 es 0,5 % por año", UOCRA_577_ANTIGUEDAD_POR_ANIO === 0.005);

  const valFuentes: string[] = [];
  for (let r = 1; r <= 80; r++) {
    const v = libro.valor("Fuentes", `B${r}`);
    if (typeof v === "string") valFuentes.push(v);
  }
  const urls577 = [UOCRA_577_FUENTES.cct.url, UOCRA_577_FUENTES.abrilMayo.url, UOCRA_577_FUENTES.junioAgosto.url, UOCRA_577_FUENTES.septiembreNoviembre.url];
  check("la hoja Fuentes cita el texto del CCT 577/10 y los tres Anexos II", urls577.every((u) => valFuentes.includes(u)), {
    faltan: urls577.filter((u) => !valFuentes.includes(u)),
  });

  return terminar();
}

function letra(n: number): string {
  let s = "";
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

function terminar() {
  console.log(fallas === 0 ? "\nTODO OK" : `\n${fallas} FALLAS`);
  process.exit(fallas === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error("FAIL", e);
  process.exit(1);
});
