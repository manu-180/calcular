// Verificación de la escala de Ganancias de sociedades (art. 73 LIG, Ley 27.630).
// Correr con: npx tsx scripts/check_ganancias_sociedades.ts
//
// LOS ANCLAS:
//   1. La escala de cada año se DERIVA del IPC de octubre sobre la de la ley, sin encadenar redondeos,
//      y reproduce al centavo los PDF de ARCA de 2023 a 2026 (límites y fijos). Si alguien encadena
//      año a año o cambia el mes del índice, este check lo caza.
//   2. 2022 se publica con el número de ARCA: la derivación con la serie vigente no lo reproduce, y
//      si algún día lo hace, el check avisa para sacar la excepción.
//   3. La escala es continua: el impuesto en cada límite es el mismo calculado desde los dos tramos.
//   4. El año que manda es el de INICIO del ejercicio.
//   5. Dividendos: 7% sobre lo distribuido, nunca sobre la ganancia antes de impuesto.

import { IPC_SERIE } from "../src/data/ipc-serie";
import {
  ANIOS_SOLO_ARCA,
  ESCALAS_ARCA,
  ULTIMO_ANIO_ESCALA,
  escalaDe,
  escalaDerivadaDe,
  escalasDisponibles,
} from "../src/data/ganancias-sociedades";
import { calcularGananciasSociedades, impuestoPorEscala } from "../src/lib/ganancias-sociedades";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const casi = (a: number, b: number, tol = 0.005) => Math.abs(a - b) <= tol;

// 1 · Derivación = ARCA al centavo (2023-2026)
for (const [anioTxt, [l1, l2, f2, f3]] of Object.entries(ESCALAS_ARCA)) {
  const anio = Number(anioTxt);
  if (ANIOS_SOLO_ARCA.includes(anio)) continue;
  const d = escalaDerivadaDe(anio);
  check(`escala ${anio}: la serie IPC permite derivarla`, d !== undefined);
  if (!d) continue;
  const [t1, t2, t3] = d.tramos;
  check(`escala ${anio}: límite 1 = ARCA ($${l1})`, casi(t1.hasta ?? 0, l1), t1.hasta);
  check(`escala ${anio}: límite 2 = ARCA ($${l2})`, casi(t2.hasta ?? 0, l2), t2.hasta);
  check(`escala ${anio}: fijo del 2º tramo = ARCA ($${f2})`, casi(t2.fijo, f2), t2.fijo);
  check(`escala ${anio}: fijo del 3º tramo = ARCA ($${f3})`, casi(t3.fijo, f3), t3.fijo);
  check(`escala ${anio}: 25/30/35%`, [t1, t2, t3].map((t) => t.alicuota).join() === "0.25,0.3,0.35");
}

// 2 · La excepción de 2022 sigue siendo necesaria y usa el número de ARCA
for (const anio of ANIOS_SOLO_ARCA) {
  const d = escalaDerivadaDe(anio);
  check(
    `escala ${anio}: la derivación todavía NO coincide con ARCA (si coincide, sacar la excepción)`,
    d !== undefined && !casi(d.tramos[0].hasta ?? 0, ESCALAS_ARCA[anio][0]),
    d?.tramos[0].hasta,
  );
  check(`escala ${anio}: se publica la de ARCA`, escalaDe(anio)?.origen === "arca" && escalaDe(anio)?.tramos[0].hasta === ESCALAS_ARCA[anio][0]);
}

// 3 · Ley, rango y año nuevo automático
const e2021 = escalaDe(2021);
check("2021 es la escala de la Ley 27.630", e2021?.origen === "ley" && e2021.tramos[0].hasta === 5_000_000 && e2021.tramos[2].fijo === 14_750_000);
check("antes de 2021 no hay escala", escalaDe(2020) === undefined);
check("la serie tiene octubre de 2025 (sin él no hay escala 2026)", IPC_SERIE.some(([p]) => p === "2025-10"));
check(
  "la última escala es la que permite el último octubre de la serie",
  ULTIMO_ANIO_ESCALA - 1 === Math.max(...IPC_SERIE.filter(([p]) => p.endsWith("-10")).map(([p]) => Number(p.slice(0, 4)))),
  ULTIMO_ANIO_ESCALA,
);
check("escalasDisponibles es continua desde 2021", escalasDisponibles().every((e, i) => e.anio === 2021 + i));

// 4 · Continuidad de cada escala en sus límites
for (const esc of escalasDisponibles()) {
  const [t1, t2, t3] = esc.tramos;
  const enL1 = t1.fijo + ((t1.hasta ?? 0) - t1.desde) * t1.alicuota;
  const enL2 = t2.fijo + ((t2.hasta ?? 0) - t2.desde) * t2.alicuota;
  check(`escala ${esc.anio}: continua en el límite 1`, casi(enL1, t2.fijo, 0.01), [enL1, t2.fijo]);
  check(`escala ${esc.anio}: continua en el límite 2`, casi(enL2, t3.fijo, 0.01), [enL2, t3.fijo]);
  check(`escala ${esc.anio}: los tramos se tocan`, t2.desde === t1.hasta && t3.desde === t2.hasta);
}

// 5 · Casos
const e26 = escalaDe(2026)!;
check("ganancia 0 → impuesto 0", impuestoPorEscala(0, e26).impuesto === 0);
check("2026, $100M → 25%", casi(impuestoPorEscala(100_000_000, e26).impuesto, 25_000_000));
check(
  "2026, $500M → fijo 2º tramo + 30% del excedente",
  casi(impuestoPorEscala(500_000_000, e26).impuesto, 33_378_546.43 + (500_000_000 - 133_514_185.74) * 0.3, 0.01),
);
check(
  "2026, $2.000M → fijo 3º tramo + 35% del excedente",
  casi(impuestoPorEscala(2_000_000_000, e26).impuesto, 393_866_847.93 + (2_000_000_000 - 1_335_141_857.38) * 0.35, 0.01),
);

const mismoMonto = (anio: number) =>
  calcularGananciasSociedades({ gananciaNetaImponible: 500_000_000, anioInicioEjercicio: anio, porcentajeDistribuido: 0 })!.impuesto;
check("el mismo resultado paga menos con la escala de un año posterior (manda el inicio)", mismoMonto(2026) < mismoMonto(2025));
check("un ejercicio que inicia en un año sin IPC de octubre no tiene escala", calcularGananciasSociedades({ gananciaNetaImponible: 1, anioInicioEjercicio: ULTIMO_ANIO_ESCALA + 1, porcentajeDistribuido: 0 }) === null);

const r = calcularGananciasSociedades({ gananciaNetaImponible: 500_000_000, anioInicioEjercicio: 2026, porcentajeDistribuido: 1 })!;
check("dividendos = ganancia menos impuesto si se distribuye todo", casi(r.dividendos, 500_000_000 - r.impuesto, 0.01));
check("retención = 7% de lo distribuido", casi(r.retencionDividendos, r.dividendos * 0.07, 0.01));
check("carga total = impuesto + retención", casi(r.cargaTotal, r.impuesto + r.retencionDividendos, 0.01));
check("la alícuota efectiva nunca supera la marginal", r.alicuotaEfectiva <= r.alicuotaMarginal);
const sinDistribuir = calcularGananciasSociedades({ gananciaNetaImponible: 500_000_000, anioInicioEjercicio: 2026, porcentajeDistribuido: 0 })!;
check("sin distribuir no hay retención", sinDistribuir.retencionDividendos === 0);

if (fallas > 0) {
  console.error(`\n${fallas} check(s) de Ganancias de sociedades FALLARON`);
  process.exit(1);
}
console.log("\nTodos los checks de Ganancias de sociedades OK (art. 73 LIG, escala derivada del IPC = ARCA 2023-2026)");
