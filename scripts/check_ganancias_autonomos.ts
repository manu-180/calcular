// Verificación de Ganancias para autónomos (art. 30 inc. c) apdo. 1 LIG + Dec. 862/2019 art. 99).
// Correr con: npx tsx scripts/check_ganancias_autonomos.ts
//
// LOS ANCLAS:
//   1. «Incrementar en 2,5 veces» el no imponible = 3,5 × MNI; «tres veces» = 4 × MNI. Los montos
//      transcriptos del PDF de ARCA tienen que cumplir esa relación, o alguien rotó uno y no el otro.
//   2. Nuevo profesional = hasta 36 meses de matrícula o inscripción, inclusive; desde el 37, común.
//   3. Sin aportes no hay especial (condición indispensable del texto).
//   4. El umbral es exacto y la diferencia «nuevo vs común» nunca es negativa ni supera el 35%.

import { DEDUCCIONES } from "../src/data/ganancias";
import { AUTONOMOS_TEXTOS, MESES_NUEVO_PROFESIONAL } from "../src/data/ganancias-autonomos";
import { calcularGananciasAutonomos, especialPara, tipoDe, umbralAutonomos } from "../src/lib/ganancias-autonomos";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const casi = (a: number, b: number, tol = 0.1) => Math.abs(a - b) <= tol;

// 1 · Los montos de ARCA respetan el texto
check("especial apdo. 1 = 3,5 × MNI", casi(DEDUCCIONES.deduccionEspecialAutonomos, DEDUCCIONES.mni * 3.5), DEDUCCIONES.deduccionEspecialAutonomos);
check("especial nuevos = 4 × MNI", casi(DEDUCCIONES.deduccionEspecialNuevosProfesionales, DEDUCCIONES.mni * 4), DEDUCCIONES.deduccionEspecialNuevosProfesionales);
check("especial apdo. 2 = 4,8 × MNI (misma rotación)", casi(DEDUCCIONES.deduccionEspecialDependencia, DEDUCCIONES.mni * 4.8));

// 2 · Quién es nuevo
check("36 meses (hasta tres años, inclusive): nuevo", tipoDe({ gananciaNetaAnual: 1, aporteMensual: 1, mesesDeAntiguedad: MESES_NUEVO_PROFESIONAL }) === "nuevo");
check("37 meses: común", tipoDe({ gananciaNetaAnual: 1, aporteMensual: 1, mesesDeAntiguedad: MESES_NUEVO_PROFESIONAL + 1 }) === "comun");
check("sin dato de antigüedad: común (nunca regala la mayor)", tipoDe({ gananciaNetaAnual: 1, aporteMensual: 1 }) === "comun");
check("reglamento: hasta tres años", AUTONOMOS_TEXTOS.reglamento99.includes("hasta TRES (3) años de antigüedad en la matrícula"));

// 3 · Sin aportes no hay especial
check("sin aportes: tipo sin-aportes aunque sea nuevo", tipoDe({ gananciaNetaAnual: 1, aporteMensual: 0, mesesDeAntiguedad: 1 }) === "sin-aportes");
check("sin aportes: especial cero", especialPara("sin-aportes") === 0);
check("el texto lo pone como condición indispensable", AUTONOMOS_TEXTOS.condicionAportes.startsWith("Es condición indispensable"));

// 4 · Casos
const base = { gananciaNetaAnual: 60_000_000, aporteMensual: 200_000 };
const comun = calcularGananciasAutonomos({ ...base, mesesDeAntiguedad: 60 });
const nuevo = calcularGananciasAutonomos({ ...base, mesesDeAntiguedad: 12 });
check("nuevo paga menos que común", nuevo.impuestoAnual < comun.impuestoAnual);
check("ahorro por nuevo = diferencia", casi(nuevo.ahorroPorNuevo, comun.impuestoAnual - nuevo.impuestoAnual, 0.02));
const dif = DEDUCCIONES.deduccionEspecialNuevosProfesionales - DEDUCCIONES.deduccionEspecialAutonomos;
check("el ahorro no supera el 35% de la diferencia de deducciones", nuevo.ahorroPorNuevo <= dif * 0.35 + 0.01, nuevo.ahorroPorNuevo);
check("común: ahorro por nuevo cero", comun.ahorroPorNuevo === 0);
check("dejar de aportar cuesta más que los aportes que ahorra en impuesto", comun.impuestoSinAportes > comun.impuestoAnual);
check("aportes anuales = 12 × mensual", casi(comun.aportesAnual, 2_400_000));
const conHijo = calcularGananciasAutonomos({ ...base, mesesDeAntiguedad: 60, hijos: 1 });
check("un hijo resta su deducción", casi(conHijo.deduccionesTotales, comun.deduccionesTotales + DEDUCCIONES.hijo));

for (const e of [
  { aporteMensual: 200_000, mesesDeAntiguedad: 60 },
  { aporteMensual: 200_000, mesesDeAntiguedad: 6, conyuge: true },
]) {
  const u = umbralAutonomos(e);
  check(`umbral ${Math.round(u)}: en el umbral no paga`, !calcularGananciasAutonomos({ ...e, gananciaNetaAnual: u }).impuestoAnual);
  check(`umbral ${Math.round(u)}: mil arriba paga`, calcularGananciasAutonomos({ ...e, gananciaNetaAnual: u + 1000 }).impuestoAnual > 0);
}
check("ganancia cero no paga", calcularGananciasAutonomos({ gananciaNetaAnual: 0, aporteMensual: 100_000 }).impuestoAnual === 0);

if (fallas > 0) {
  console.error(`\n${fallas} falla(s).`);
  process.exit(1);
}
console.log("\nGanancias para autónomos: todo verde (art. 30 inc. c apdo. 1 · Dec. 862/2019 art. 99).");
