// Verificación de bordes de la calculadora de plazo fijo (herramienta de desarrollo).
// Correr con: npx tsx scripts/check_plazofijo.ts
import { calcularPlazoFijo, interesPlazoFijo, tea, tem } from "../src/lib/plazofijo";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
function aprox(a: number, b: number, tol = 0.01) {
  return Math.abs(a - b) < tol;
}

// --- Fórmula base: ejemplo de la página (1M, TNA 19,41%, 30 días) ---
const interesBase = interesPlazoFijo(1_000_000, 19.41, 30);
check("interés 1M/19,41%/30d ≈ $15.953,42", aprox(interesBase, 15_953.42), interesBase);
check("TEM 19,41% ≈ 1,5953%", aprox(tem(19.41), 1.5953, 0.0001), tem(19.41));
check("TEA 19,41%/30d ≈ 21,24%", aprox(tea(19.41, 30), 21.24, 0.05), tea(19.41, 30));

// --- Resultado completo sin renovaciones ---
const r1 = calcularPlazoFijo({
  capital: 1_000_000,
  dias: 30,
  tnaPct: 19.41,
  inflacionMensualPct: 2.6,
})!;
check("total = capital + interés", aprox(r1.total, 1_015_953.42));
check("sin renovaciones: totalFinal == total", aprox(r1.totalFinal, r1.total));
check("sin renovaciones: 1 solo período", r1.periodos.length === 1);
check("inflación 30d con mensual 2,6% = 2,6%", aprox(r1.inflacionPeriodoPct, 2.6, 0.0001));
check("TEM 1,6% < inflación 2,6% → pierde", !r1.leGanaALaInflacion);
check(
  "poder de compra = total / 1,026",
  aprox(r1.poderCompraFinal, 1_015_953.42 / 1.026, 0.01),
  r1.poderCompraFinal
);
check("pérdida real ≈ −0,98%", aprox(r1.resultadoRealPct, -0.9792, 0.001), r1.resultadoRealPct);
check("30 días < mínimo UVA → sin comparación UVA", r1.uva === null);

// --- Renovaciones compuestas: 11 renovaciones = 12 períodos de 30 días ---
const r2 = calcularPlazoFijo({
  capital: 1_000_000,
  dias: 30,
  tnaPct: 19.41,
  renovaciones: 11,
  inflacionMensualPct: 2.6,
})!;
const factor = 1 + (0.1941 * 30) / 365;
check("12 períodos generados", r2.periodos.length === 12);
check("360 días totales", r2.diasTotales === 360);
check(
  "interés compuesto: totalFinal = 1M × factor^12",
  aprox(r2.totalFinal, 1_000_000 * Math.pow(factor, 12), 0.01),
  r2.totalFinal
);
check("rendimiento compuesto > 12 × tasa simple", r2.rendimientoTotalPct > 12 * 1.5953);
check(
  "el acumulado de la tabla coincide con totalFinal",
  aprox(r2.periodos[11].capital, r2.totalFinal, 0.001)
);
check(
  "interés de cada período crece (compuesto)",
  r2.periodos[11].interesDelPeriodo > r2.periodos[0].interesDelPeriodo
);
check("360 días ≥ 90 → hay comparación UVA", r2.uva !== null);

// --- UVA: 90 días justos (borde del mínimo) ---
const r3 = calcularPlazoFijo({
  capital: 1_000_000,
  dias: 90,
  tnaPct: 19.41,
  inflacionMensualPct: 2.6,
  uvaTnaAdicionalPct: 4.5,
})!;
const factorInflacion3 = Math.pow(1.026, 3);
const capitalAjustado3 = 1_000_000 * factorInflacion3;
const uvaEsperado3 = capitalAjustado3 * (1 + (0.045 * 90) / 365);
check("90 días justos → UVA presente", r3.uva !== null);
check("UVA = capital ajustado + tasa adicional", aprox(r3.uva!.total, uvaEsperado3, 0.01), r3.uva);
check(
  "con inflación 2,6% > TEM, UVA rinde más que el tradicional",
  r3.uva!.total > r3.totalFinal
);

// --- 89 días: un día por debajo del mínimo UVA ---
const r4 = calcularPlazoFijo({
  capital: 1_000_000,
  dias: 89,
  tnaPct: 19.41,
  inflacionMensualPct: 2.6,
})!;
check("89 días → sin UVA", r4.uva === null);

// --- Si la tasa supera a la inflación, le gana ---
const r5 = calcularPlazoFijo({
  capital: 500_000,
  dias: 30,
  tnaPct: 40,
  inflacionMensualPct: 2.6,
})!;
check("TNA 40% (TEM 3,29%) vs 2,6% → gana", r5.leGanaALaInflacion, r5);
check("ganancia real positiva", r5.resultadoRealPct > 0);

// --- Inflación 0: el resultado real es la tasa nominal ---
const r6 = calcularPlazoFijo({
  capital: 1_000_000,
  dias: 30,
  tnaPct: 19.41,
  inflacionMensualPct: 0,
})!;
check("inflación 0 → real == nominal", aprox(r6.resultadoRealPct, r6.rendimientoTotalPct, 1e-9));
check("inflación 0 → gana", r6.leGanaALaInflacion);

// --- TNA 0: interés 0 pero el cálculo no rompe ---
const r7 = calcularPlazoFijo({
  capital: 1_000_000,
  dias: 30,
  tnaPct: 0,
  inflacionMensualPct: 2.6,
})!;
check("TNA 0 → interés 0", r7.interes === 0 && aprox(r7.total, 1_000_000));

// --- Entradas inválidas → null ---
check("capital 0 → null", calcularPlazoFijo({ capital: 0, dias: 30, tnaPct: 19, inflacionMensualPct: 2 }) === null);
check("capital negativo → null", calcularPlazoFijo({ capital: -5, dias: 30, tnaPct: 19, inflacionMensualPct: 2 }) === null);
check("días 0 → null", calcularPlazoFijo({ capital: 1000, dias: 0, tnaPct: 19, inflacionMensualPct: 2 }) === null);
check("TNA negativa → null", calcularPlazoFijo({ capital: 1000, dias: 30, tnaPct: -1, inflacionMensualPct: 2 }) === null);
check("renovaciones negativas se tratan como 0", calcularPlazoFijo({ capital: 1000, dias: 30, tnaPct: 19, renovaciones: -3, inflacionMensualPct: 2 })!.periodos.length === 1);

console.log(fallas === 0 ? "\nTodo OK ✔" : `\n${fallas} FALLAS ✘`);
process.exit(fallas === 0 ? 0 : 1);
