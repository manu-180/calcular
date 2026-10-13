// Verificación de la lógica del sueldo neto y del impuesto a las Ganancias 4ta cat.
// Correr con: npx tsx scripts/check_sueldo.ts
//
// Chequea: (1) aportes 11/3/3 y el truncado por tope SIPA, (2) bruto↔neto y el
// roundtrip del inverso, (3) la CONTINUIDAD INTERNA de la escala art. 94 (valida que
// la tabla oficial fue transcripta sin errores: cada "fijo" = fijo previo + tramo×alícuota),
// y (4) el piso a partir del cual un empleado tributa Ganancias.

import { APORTES, TOTAL_APORTES, topeSipa } from "../src/data/sueldo";
import { ESCALA_GANANCIAS, DEDUCCIONES } from "../src/data/ganancias";
import { calcularAportes, brutoANeto, netoABruto } from "../src/lib/sueldo";
import { impuestoSegunEscala, estimarGananciasAnual } from "../src/lib/ganancias";

let fallas = 0;

function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

function aprox(a: number, b: number, tol = 0.5) {
  return Math.abs(a - b) < tol;
}

// ===========================================================================
// APORTES
// ===========================================================================

check("aportes suman 17%", aprox(TOTAL_APORTES, 0.17, 1e-9));

{
  const a = calcularAportes(1_000_000);
  check("aportes 1M: jubilación 110.000", aprox(a.jubilacion, 110_000));
  check("aportes 1M: PAMI 30.000", aprox(a.pami, 30_000));
  check("aportes 1M: obra social 30.000", aprox(a.obraSocial, 30_000));
  check("aportes 1M: total 170.000", aprox(a.total, 170_000));
  check("aportes 1M: sin tope", a.topeAplicado === false);
}

{
  // Por encima del tope SIPA los aportes se calculan solo sobre el tope.
  const a = calcularAportes(8_000_000);
  check(
    "aportes 8M: base truncada al tope SIPA",
    aprox(a.baseImponible, topeSipa().baseMaxima),
  );
  check(
    "aportes 8M: total = tope × 0,17",
    aprox(a.total, topeSipa().baseMaxima * 0.17),
  );
  check("aportes 8M: tope aplicado", a.topeAplicado === true);
}

{
  // Borde exacto: en el tope NO se considera "aplicado" (no es estrictamente mayor).
  const a = calcularAportes(topeSipa().baseMaxima);
  check("aportes en el tope exacto: topeAplicado false", a.topeAplicado === false);
}

// ===========================================================================
// BRUTO ↔ NETO
// ===========================================================================

{
  const d = brutoANeto(1_000_000);
  check("bruto 1M → neto 830.000 (sin ganancias ni sindical)", aprox(d.neto, 830_000));
}

{
  const d = brutoANeto(1_000_000, { sindicalPct: 0.02 });
  check("bruto 1M con sindical 2% → neto 810.000", aprox(d.neto, 810_000));
}

{
  // Roundtrip del inverso, por debajo del tope.
  const bruto = netoABruto(830_000);
  check("netoABruto(830.000) → 1.000.000", aprox(bruto, 1_000_000, 1));
}

{
  // Roundtrip del inverso, por encima del tope (aportes fijos).
  const original = 8_000_000;
  const neto = brutoANeto(original).neto;
  const recuperado = netoABruto(neto);
  check("roundtrip bruto>tope: 8M → neto → 8M", aprox(recuperado, original, 1));
}

// ===========================================================================
// ESCALA ART. 94 — continuidad interna (valida transcripción de la tabla oficial)
// ===========================================================================

for (let i = 1; i < ESCALA_GANANCIAS.length; i++) {
  const prev = ESCALA_GANANCIAS[i - 1];
  const cur = ESCALA_GANANCIAS[i];
  // El "fijo" de un tramo debe igualar: fijo previo + (piso actual − piso previo) × alícuota previa.
  const esperado = prev.fijo + (cur.desde - prev.excedenteSobre) * prev.alicuota;
  check(
    `escala art.94: continuidad en $${cur.desde.toLocaleString("es-AR")}`,
    aprox(cur.fijo, esperado, 1),
    { fijo: cur.fijo, esperado },
  );
  // El piso de excedente de cada tramo coincide con su inicio.
  check(`escala art.94: excedenteSobre = desde en tramo ${i}`, cur.excedenteSobre === cur.desde);
}

{
  // Casos puntuales de la escala.
  check("escala: gni 0 → impuesto 0", impuestoSegunEscala(0) === 0);
  check("escala: gni negativa → 0", impuestoSegunEscala(-500) === 0);
  check(
    "escala: gni 1.000.000 → 50.000 (primer tramo 5%)",
    aprox(impuestoSegunEscala(1_000_000), 50_000),
  );
  // Último tramo (35%): se toma de la escala vigente para no re-anclar el check en cada
  // rotación semestral de ARCA. Se evalúa un ingreso holgadamente por encima del piso.
  const ultimo = ESCALA_GANANCIAS[ESCALA_GANANCIAS.length - 1];
  const gniTop = ultimo.desde + 10_000_000;
  const esperadoTop = ultimo.fijo + (gniTop - ultimo.excedenteSobre) * ultimo.alicuota;
  check(
    `escala: gni ${(gniTop / 1_000_000).toFixed(1)}M → tramo del 35%`,
    aprox(impuestoSegunEscala(gniTop), esperadoTop, 1),
  );
}

// ===========================================================================
// PISO DE GANANCIAS (estimación anual)
// ===========================================================================

{
  // Un soltero sin hijos con sueldo bajo NO tributa.
  const e = estimarGananciasAnual({ brutoMensual: 1_500_000 });
  check("ganancias: soltero $1,5M no paga", e.pagaGanancias === false);
}
{
  // Un soltero con sueldo alto SÍ tributa.
  const e = estimarGananciasAnual({ brutoMensual: 5_000_000 });
  check("ganancias: soltero $5M paga", e.pagaGanancias === true && e.retencionMensual > 0);
}
{
  // Las cargas de familia bajan el impuesto (cónyuge + 2 hijos vs soltero, mismo sueldo).
  const soltero = estimarGananciasAnual({ brutoMensual: 5_000_000 });
  const conFamilia = estimarGananciasAnual({ brutoMensual: 5_000_000, conyuge: true, hijos: 2 });
  check(
    "ganancias: cargas de familia reducen el impuesto",
    conFamilia.impuestoAnual < soltero.impuestoAnual,
  );
}
{
  // El piso del soltero cae entre $2,5M y $3,1M de bruto mensual (consistente con ARCA).
  const noPaga = estimarGananciasAnual({ brutoMensual: 2_500_000 }).pagaGanancias;
  const siPaga = estimarGananciasAnual({ brutoMensual: 3_100_000 }).pagaGanancias;
  check("ganancias: piso del soltero entre $2,5M y $3,1M", noPaga === false && siPaga === true, {
    deduccionesSoltero: DEDUCCIONES.mni + DEDUCCIONES.deduccionEspecialDependencia,
  });
}

// ===========================================================================

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log("Todos los checks de sueldo neto / ganancias OK");
}
