// Verificación de bordes de la calculadora de indemnización (no se commitea al deploy,
// es una herramienta de desarrollo). Correr con: npx tsx scripts/check_indemnizacion.ts
import { antiguedadEntre, calcularIndemnizacion } from "../src/lib/indemnizacion";

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

// --- Antigüedad calendario ---
check("5 años exactos", JSON.stringify(antiguedadEntre("2021-06-11", "2026-06-11")) ===
  JSON.stringify({ anios: 5, meses: 0, dias: 0, totalMeses: 60 }));
check("cruce de mes con días negativos", JSON.stringify(antiguedadEntre("2026-01-31", "2026-03-01")) ===
  JSON.stringify({ anios: 0, meses: 1, dias: 1, totalMeses: 1 }));

const base = 1_500_000;

// --- Período de prueba: menos de 6 meses → sin 245 ni preaviso, sí liquidación final ---
const prueba = calcularIndemnizacion({
  ingresoISO: "2026-01-10", despidoISO: "2026-05-20",
  mejorRemuneracion: base, preavisoOtorgado: false,
})!;
check("prueba: marcado en período de prueba", prueba.enPeriodoPrueba);
check("prueba: sin indemnización por antigüedad", prueba.indemnizacionAntiguedad === 0);
check("prueba: sin preaviso ni integración", prueba.preaviso === null && prueba.integracion === null);
check("prueba: SAC y vacaciones > 0", prueba.sacProporcional.monto > 0 && prueba.vacaciones.monto > 0);

// --- 6 meses justos: fuera de prueba, fracción 6m > 3m → 1 año computable ---
const seisMeses = calcularIndemnizacion({
  ingresoISO: "2025-12-11", despidoISO: "2026-06-11",
  mejorRemuneracion: base, preavisoOtorgado: false,
})!;
check("6 meses justos: fuera de prueba", !seisMeses.enPeriodoPrueba);
check("6 meses justos: 1 año computable", seisMeses.aniosComputables === 1);
check("6 meses justos: 245 = 1 sueldo", aprox(seisMeses.indemnizacionAntiguedad, base));
check("6 meses justos: preaviso 1 mes", seisMeses.preaviso?.meses === 1);

// --- Fracción de 3 meses justos NO suma; 3 meses y 1 día SÍ ---
const tresJustos = calcularIndemnizacion({
  ingresoISO: "2020-01-15", despidoISO: "2026-04-15",
  mejorRemuneracion: base, preavisoOtorgado: false,
})!;
check("fracción 3m justos no suma año", tresJustos.aniosComputables === 6, tresJustos.antiguedad);
const tresYUno = calcularIndemnizacion({
  ingresoISO: "2020-01-15", despidoISO: "2026-04-16",
  mejorRemuneracion: base, preavisoOtorgado: false,
})!;
check("fracción 3m y 1 día suma año", tresYUno.aniosComputables === 7, tresYUno.antiguedad);

// --- Preaviso: 5 años justos → 1 mes; 5 años y 1 día → 2 meses ---
const cincoJustos = calcularIndemnizacion({
  ingresoISO: "2021-06-11", despidoISO: "2026-06-11",
  mejorRemuneracion: base, preavisoOtorgado: false,
})!;
check("preaviso 1 mes con 5 años justos", cincoJustos.preaviso?.meses === 1);
const cincoYUno = calcularIndemnizacion({
  ingresoISO: "2021-06-10", despidoISO: "2026-06-11",
  mejorRemuneracion: base, preavisoOtorgado: false,
})!;
check("preaviso 2 meses con 5 años y 1 día", cincoYUno.preaviso?.meses === 2, cincoYUno.antiguedad);

// --- Integración del mes (art. 233): despido el 11/6 → faltan 19 días de junio ---
check("integración: 19 días", cincoJustos.integracion?.dias === 19);
check("integración: monto = sueldo/30×19",
  aprox(cincoJustos.integracion!.monto, (base / 30) * 19));

// --- Con preaviso otorgado: sin preaviso ni integración ---
const conPreaviso = calcularIndemnizacion({
  ingresoISO: "2021-06-11", despidoISO: "2026-06-30",
  mejorRemuneracion: base, preavisoOtorgado: true,
})!;
check("con preaviso: sin sustitutiva ni integración",
  conPreaviso.preaviso === null && conPreaviso.integracion === null);

// --- Despido el último día del mes sin preaviso: hay preaviso pero no integración ---
const finDeMes = calcularIndemnizacion({
  ingresoISO: "2021-06-11", despidoISO: "2026-06-30",
  mejorRemuneracion: base, preavisoOtorgado: false,
})!;
check("fin de mes: sin integración", finDeMes.integracion === null && finDeMes.preaviso !== null);

// --- SAC proporcional: 1/1 al 11/6 = 162 días de 181 del semestre ---
check("SAC prop: 162/181 días", cincoJustos.sacProporcional.dias === 162 &&
  cincoJustos.sacProporcional.totalDiasSemestre === 181, cincoJustos.sacProporcional);
check("SAC prop: monto", aprox(cincoJustos.sacProporcional.monto, (base / 2) * (162 / 181)));

// --- Vacaciones proporcionales: 5 años de antigüedad → escala de 14 días (al 31/12/2026 son 5) ---
// Ingreso 11/6/2021: al 31/12/2026 tiene 5 años y 6 meses → "más de 5" → 21 días de escala.
check("vacaciones: 21 × 162/365 días", aprox(cincoJustos.vacaciones.dias, 21 * (162 / 365), 0.001),
  cincoJustos.vacaciones);
check("vacaciones: monto a sueldo/25",
  aprox(cincoJustos.vacaciones.monto, 21 * (162 / 365) * (base / 25)));

// --- Tope de convenio con piso del 67% (art. 245, Ley 27.802) ---
const conTope = calcularIndemnizacion({
  ingresoISO: "2016-06-01", despidoISO: "2026-06-11",
  mejorRemuneracion: 2_000_000, preavisoOtorgado: true, topeCCT: 1_000_000,
})!;
check("tope: base aplicada = 67% (piso gana al tope)", aprox(conTope.baseAplicada, 1_340_000));
const conTopeAlto = calcularIndemnizacion({
  ingresoISO: "2016-06-01", despidoISO: "2026-06-11",
  mejorRemuneracion: 2_000_000, preavisoOtorgado: true, topeCCT: 1_800_000,
})!;
check("tope mayor al piso: se usa el tope", aprox(conTopeAlto.baseAplicada, 1_800_000));
check("tope mayor a la base: no aplica", calcularIndemnizacion({
  ingresoISO: "2016-06-01", despidoISO: "2026-06-11",
  mejorRemuneracion: 2_000_000, preavisoOtorgado: true, topeCCT: 3_000_000,
})!.topeAplicado === false);

// --- Totales consistentes ---
const t = cincoJustos;
check("total general = indemnizatorio + liquidación final",
  aprox(t.totalGeneral, t.totalIndemnizatorio + t.totalLiquidacionFinal));
check("total indemnizatorio incluye SACs de preaviso e integración",
  aprox(t.totalIndemnizatorio,
    t.indemnizacionAntiguedad + t.preaviso!.monto + t.preaviso!.sac +
    t.integracion!.monto + t.integracion!.sac));

// --- Inválidos ---
check("despido anterior al ingreso → null", calcularIndemnizacion({
  ingresoISO: "2026-06-11", despidoISO: "2026-06-10",
  mejorRemuneracion: base, preavisoOtorgado: false,
}) === null);
check("sueldo 0 → null", calcularIndemnizacion({
  ingresoISO: "2020-01-01", despidoISO: "2026-06-11",
  mejorRemuneracion: 0, preavisoOtorgado: false,
}) === null);

console.log(fallas === 0 ? "\nTODO OK" : `\n${fallas} FALLAS`);
process.exit(fallas === 0 ? 0 : 1);
