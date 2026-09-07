// Verificación de la lógica de vacaciones (licencia ordinaria, arts. 150-157 LCT).
// Correr con: npx tsx scripts/check_vacaciones.ts
//
// Chequea: (1) el conteo de días hábiles (lun-vie, ambos extremos inclusive) en rangos
// chicos verificables a mano, (2) la escala del art. 150 con sus BORDES exactos (la
// antigüedad se mide al 31/12: "hasta N años" ⟺ ingresó el 31/12 de (año−N) o después),
// (3) la antigüedad en años y meses para mostrar, (4) el cálculo en modo escala (días,
// valor del día a sueldo/25, retribución y plus vacacional), (5) el clamp de diasATomar,
// (6) el modo proporcional (art. 151/153: ingresó durante el año y trabajó menos de la
// mitad de los hábiles → 1 día cada 20 trabajados) y (7) los bordes (ingreso posterior
// al cierre → null, sueldo 0 → sin NaN).

import {
  ANIO_VACACIONES,
  DIVISOR_DIA_NORMAL,
  DIVISOR_VACACIONES,
} from "../src/data/vacaciones";
import {
  antiguedadAl31,
  calcularVacaciones,
  diasHabiles,
  diasPorAntiguedad,
} from "../src/lib/vacaciones";

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
// PREMISA: el año de referencia es 2026 (no bisiesto). Si cambia, varios
// valores esperados de abajo se mueven — este check lo deja explícito.
// ===========================================================================

check("ANIO_VACACIONES = 2026 (premisa de este check)", ANIO_VACACIONES === 2026);
check("DIVISOR_VACACIONES = 25 (art. 155 inc. a)", DIVISOR_VACACIONES === 25);
check("DIVISOR_DIA_NORMAL = 30", DIVISOR_DIA_NORMAL === 30);

// ===========================================================================
// DÍAS HÁBILES (rangos chicos verificables a mano contra el calendario 2026)
// 2026-01-01 = jueves · 2026-01-05 = lunes · 2026-01-09 = viernes
// ===========================================================================

check("diasHabiles mismo día jueves (01-01) = 1", diasHabiles("2026-01-01", "2026-01-01") === 1);
check("diasHabiles semana lun-vie (05→09) = 5", diasHabiles("2026-01-05", "2026-01-09") === 5);
check(
  "diasHabiles semana completa lun-dom (05→11) = 5 (no cuenta sáb/dom)",
  diasHabiles("2026-01-05", "2026-01-11") === 5,
);
check("diasHabiles fin de semana solo (10 sáb → 11 dom) = 0", diasHabiles("2026-01-10", "2026-01-11") === 0);

// ===========================================================================
// ESCALA DEL ART. 150 — bordes exactos (antigüedad al 31/12/2026)
//   ≤ 5 años → 14 días · >5 y ≤10 → 21 · >10 y ≤20 → 28 · >20 → 35
//   borde "hasta N años": ingresó el 31/12 de (2026−N) o después
// ===========================================================================

check("antigüedad <5 años (ingreso 2024-06-01) → 14 días", diasPorAntiguedad("2024-06-01") === 14);
check("borde 5 años exactos (ingreso 2021-12-31) → 14 días", diasPorAntiguedad("2021-12-31") === 14);
check("un día más de 5 años (ingreso 2021-12-30) → 21 días", diasPorAntiguedad("2021-12-30") === 21);
check("antigüedad ~7 años (ingreso 2020-01-01) → 21 días", diasPorAntiguedad("2020-01-01") === 21);
check("borde 10 años exactos (ingreso 2016-12-31) → 21 días", diasPorAntiguedad("2016-12-31") === 21);
check("un día más de 10 años (ingreso 2016-12-30) → 28 días", diasPorAntiguedad("2016-12-30") === 28);
check("antigüedad ~17 años (ingreso 2010-01-01) → 28 días", diasPorAntiguedad("2010-01-01") === 28);
check("borde 20 años exactos (ingreso 2006-12-31) → 28 días", diasPorAntiguedad("2006-12-31") === 28);
check("un día más de 20 años (ingreso 2006-12-30) → 35 días", diasPorAntiguedad("2006-12-30") === 35);
check("antigüedad >20 años (ingreso 2000-01-01) → 35 días", diasPorAntiguedad("2000-01-01") === 35);

// ===========================================================================
// ANTIGÜEDAD EN AÑOS Y MESES (para mostrar) — medida al 31/12/2026
// ===========================================================================

{
  const a = antiguedadAl31("2020-01-01");
  check("antigüedad 2020-01-01 → 6 años 11 meses", a.anios === 6 && a.meses === 11, a);
}
{
  const a = antiguedadAl31("2026-12-01");
  check("antigüedad 2026-12-01 → 0 años 0 meses", a.anios === 0 && a.meses === 0, a);
}
{
  const a = antiguedadAl31("2021-01-01");
  check("antigüedad 2021-01-01 → 5 años 11 meses", a.anios === 5 && a.meses === 11, a);
}

// ===========================================================================
// CÁLCULO — MODO ESCALA (año completo: ingresó antes del 01-01)
// sueldo 1.000.000 · ingreso 2020-01-01 → 21 días
//   valorDiaVacaciones = 1.000.000/25 = 40.000
//   valorDiaNormal     = 1.000.000/30 = 33.333,33
//   retribución        = 40.000 × 21 = 840.000
//   plus               = (40.000 − 33.333,33) × 21 = 140.000
// ===========================================================================

{
  const r = calcularVacaciones({ sueldo: 1_000_000, ingresoISO: "2020-01-01" });
  check("escala: no es null", r !== null);
  if (r) {
    check("escala: modo = escala", r.modo === "escala");
    check("escala: dias = 21", r.dias === 21);
    check("escala: diasTomados = 21 (default = dias)", r.diasTomados === 21);
    check("escala: valorDiaVacaciones = 40.000", aprox(r.valorDiaVacaciones, 40_000));
    check("escala: valorDiaNormal ≈ 33.333,33", aprox(r.valorDiaNormal, 33_333.33));
    check("escala: retribución = 840.000", aprox(r.retribucion, 840_000));
    check("escala: plus vacacional = 140.000", aprox(r.plus, 140_000));
    check("escala: diasHabilesTrabajados indefinido (año completo)", r.diasHabilesTrabajados === undefined);
  }
}

// ===========================================================================
// CLAMP de diasATomar (entre 0 y los días que corresponden)
// ===========================================================================

{
  const r = calcularVacaciones({ sueldo: 1_000_000, ingresoISO: "2020-01-01", diasATomar: 100 });
  check("clamp: diasATomar 100 → 21 (tope = dias)", r?.diasTomados === 21);
  check("clamp: retribución con 21 días = 840.000", aprox(r?.retribucion ?? -1, 840_000));
}
{
  const r = calcularVacaciones({ sueldo: 1_000_000, ingresoISO: "2020-01-01", diasATomar: -5 });
  check("clamp: diasATomar -5 → 0", r?.diasTomados === 0);
  check("clamp: retribución con 0 días = 0", aprox(r?.retribucion ?? -1, 0));
}
{
  const r = calcularVacaciones({ sueldo: 1_000_000, ingresoISO: "2020-01-01", diasATomar: 7 });
  check("clamp: diasATomar 7 → 7", r?.diasTomados === 7);
  check("clamp: retribución 7 días = 280.000", aprox(r?.retribucion ?? -1, 280_000));
}

// ===========================================================================
// MODO PROPORCIONAL (art. 151/153): ingresó durante el año y trabajó menos de
// la mitad de los hábiles → 1 día de descanso cada 20 días trabajados.
// Ingreso 2026-11-01 (sólo nov+dic) → muy por debajo de la mitad del año.
// ===========================================================================

{
  const r = calcularVacaciones({ sueldo: 1_000_000, ingresoISO: "2026-11-01" });
  check("proporcional: no es null", r !== null);
  if (r) {
    check("proporcional: modo = proporcional", r.modo === "proporcional");
    check("proporcional: diasHabilesTrabajados definido", typeof r.diasHabilesTrabajados === "number");
    check(
      "proporcional: días = floor(hábilesTrabajados / 20)",
      r.dias === Math.floor((r.diasHabilesTrabajados ?? 0) / 20),
      { dias: r.dias, hab: r.diasHabilesTrabajados },
    );
    check(
      "proporcional: retribución = valorDiaVacaciones × diasTomados",
      aprox(r.retribucion, r.valorDiaVacaciones * r.diasTomados),
    );
  }
}

// Ingreso a principios de año (2026-02-01): trabajó MÁS de la mitad → vuelve a escala.
{
  const r = calcularVacaciones({ sueldo: 1_000_000, ingresoISO: "2026-02-01" });
  check("ingreso 02-01 (trabajó >½ año): modo = escala", r?.modo === "escala");
  check("ingreso 02-01: dias = 14 (antigüedad <5 años)", r?.dias === 14);
}

// ===========================================================================
// BORDES
// ===========================================================================

check("ingreso posterior al 31/12 → null", calcularVacaciones({ sueldo: 1_000_000, ingresoISO: "2027-01-01" }) === null);

{
  const r = calcularVacaciones({ sueldo: 0, ingresoISO: "2020-01-01" });
  check("sueldo 0: valorDiaVacaciones 0 (sin NaN)", r?.valorDiaVacaciones === 0);
  check("sueldo 0: retribución 0 (sin NaN)", r?.retribucion === 0);
  check("sueldo 0: plus 0 (sin NaN)", r?.plus === 0);
}

// ===========================================================================

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log("Todos los checks de vacaciones OK");
}
