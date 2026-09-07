// Verificación de la lógica del aguinaldo (SAC).
// Correr con: npx tsx scripts/check_aguinaldo.ts
//
// Chequea: (1) los aportes personales suman 17% (11/3/3), (2) el cálculo del
// semestre completo (bruto = mejorSueldo/2, neto = bruto × 0,83), (3) el conteo
// inclusivo de días de cada semestre 2026 (181 y 184) y de rangos parciales,
// (4) la proporcionalidad por ingreso/egreso a mitad de semestre, y (5) los bordes
// (egreso fuera del semestre → 0 días, fechas que no extienden más allá del semestre).

import { APORTES_PERSONALES, SEMESTRES_2026 } from "../src/data/aguinaldo";
import { calcularAguinaldo, diasInclusivos } from "../src/lib/aguinaldo";

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

const PRIMER_SEMESTRE = SEMESTRES_2026[0]; // 2026-01-01 → 2026-06-30
const SEGUNDO_SEMESTRE = SEMESTRES_2026[1]; // 2026-07-01 → 2026-12-31

// ===========================================================================
// APORTES
// ===========================================================================

{
  const total =
    APORTES_PERSONALES.jubilacion + APORTES_PERSONALES.pami + APORTES_PERSONALES.obraSocial;
  check("aportes personales suman 17%", aprox(total, 0.17, 1e-9));
  check("jubilación 11%", aprox(APORTES_PERSONALES.jubilacion, 0.11, 1e-9));
  check("PAMI 3%", aprox(APORTES_PERSONALES.pami, 0.03, 1e-9));
  check("obra social 3%", aprox(APORTES_PERSONALES.obraSocial, 0.03, 1e-9));
}

// ===========================================================================
// DÍAS INCLUSIVOS
// ===========================================================================

check("diasInclusivos mismo día = 1", diasInclusivos("2026-01-01", "2026-01-01") === 1);
check(
  "diasInclusivos 1er semestre 2026 = 181 (año no bisiesto)",
  diasInclusivos(PRIMER_SEMESTRE.inicioISO, PRIMER_SEMESTRE.finISO) === 181,
);
check(
  "diasInclusivos 2do semestre 2026 = 184",
  diasInclusivos(SEGUNDO_SEMESTRE.inicioISO, SEGUNDO_SEMESTRE.finISO) === 184,
);
check(
  "diasInclusivos 01-04 a 30-06 = 91 (abril+mayo+junio)",
  diasInclusivos("2026-04-01", "2026-06-30") === 91,
);

// ===========================================================================
// SEMESTRE COMPLETO
// ===========================================================================

{
  const r = calcularAguinaldo({ mejorSueldo: 1_000_000, semestre: PRIMER_SEMESTRE });
  check("completo: brutoSemestreCompleto = mejorSueldo/2 = 500.000", aprox(r.brutoSemestreCompleto, 500_000));
  check("completo: bruto = 500.000 (sin proporcional)", aprox(r.bruto, 500_000));
  check("completo: no es proporcional", r.esProporcional === false);
  check("completo: diasTrabajados = diasTotales = 181", r.diasTrabajados === 181 && r.diasTotales === 181);
  check("completo: aportes total = 500.000 × 0,17 = 85.000", aprox(r.aportes.total, 85_000));
  check("completo: jubilación 55.000", aprox(r.aportes.jubilacion, 55_000));
  check("completo: PAMI 15.000", aprox(r.aportes.pami, 15_000));
  check("completo: obra social 15.000", aprox(r.aportes.obraSocial, 15_000));
  check("completo: neto = bruto × 0,83 = 415.000", aprox(r.netoEstimado, 415_000));
}

// ===========================================================================
// PROPORCIONAL (ingreso/egreso a mitad de semestre)
// ===========================================================================

{
  // Ingresó el 01-04: trabaja abril+mayo+junio = 91 de 181 días del 1er semestre.
  const r = calcularAguinaldo({
    mejorSueldo: 1_000_000,
    semestre: PRIMER_SEMESTRE,
    ingresoISO: "2026-04-01",
  });
  check("proporcional ingreso 01-04: diasTrabajados = 91", r.diasTrabajados === 91);
  check("proporcional ingreso 01-04: es proporcional", r.esProporcional === true);
  check(
    "proporcional ingreso 01-04: bruto = 500.000 × 91/181",
    aprox(r.bruto, (500_000 * 91) / 181, 1),
  );
  check(
    "proporcional ingreso 01-04: neto = bruto × 0,83",
    aprox(r.netoEstimado, r.bruto * 0.83, 1),
  );
}

{
  // Un ingreso ANTERIOR al semestre no extiende el cómputo: cuenta el semestre completo.
  const r = calcularAguinaldo({
    mejorSueldo: 1_000_000,
    semestre: PRIMER_SEMESTRE,
    ingresoISO: "2025-12-01",
  });
  check("ingreso previo al semestre: cuenta semestre completo (181 días)", r.diasTrabajados === 181);
  check("ingreso previo al semestre: no es proporcional", r.esProporcional === false);
}

{
  // Un egreso POSTERIOR al fin del semestre no extiende: cuenta el semestre completo.
  const r = calcularAguinaldo({
    mejorSueldo: 1_000_000,
    semestre: PRIMER_SEMESTRE,
    egresoISO: "2026-12-31",
  });
  check("egreso posterior al semestre: cuenta semestre completo (181 días)", r.diasTrabajados === 181);
}

// ===========================================================================
// BORDES
// ===========================================================================

{
  // Egreso ANTES del inicio del semestre (segundo) → 0 días trabajados, bruto 0.
  const r = calcularAguinaldo({
    mejorSueldo: 1_000_000,
    semestre: SEGUNDO_SEMESTRE,
    egresoISO: "2026-06-30",
  });
  check("egreso previo al inicio del semestre: 0 días", r.diasTrabajados === 0);
  check("egreso previo al inicio del semestre: bruto 0", aprox(r.bruto, 0));
  check("egreso previo al inicio del semestre: neto 0", aprox(r.netoEstimado, 0));
}

{
  // mejorSueldo 0 → todo en cero, sin NaN.
  const r = calcularAguinaldo({ mejorSueldo: 0, semestre: PRIMER_SEMESTRE });
  check("mejorSueldo 0: bruto 0", aprox(r.bruto, 0));
  check("mejorSueldo 0: neto 0 (no NaN)", r.netoEstimado === 0);
}

// ===========================================================================

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log("Todos los checks de aguinaldo OK");
}
