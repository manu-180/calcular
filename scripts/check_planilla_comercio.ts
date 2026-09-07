// Verificación de la PLANILLA de Empleados de Comercio (el producto pago) contra el motor
// verificado de la web (calcularComercio). Antes de cobrar un peso, la planilla y calcular.ar
// tienen que dar EXACTAMENTE el mismo bruto y el mismo neto: si difieren, el cliente ve un
// número en la web y otro en lo que compró → muere la confianza, que es todo nuestro moat.
//
// Qué verifica: replica acá, peso por peso, la lógica de las fórmulas Excel de
// planillas-ar/scripts/generar-planilla-comercio.ts (filas B12..B18 + helpers E5..E7) y la
// compara contra calcularComercio() en TODA la matriz (21 categorías × 4 meses × 7 antigüedades
// × 3 jornadas × con/sin presentismo). La matriz crece sola al agregar meses.
//
// ⚠️ ESPEJO: si cambiás las fórmulas del generador, actualizá planillaLiquida() acá (y al revés).
// La escala (los $ por categoría) NO se verifica acá porque el generador ya la importa de esta
// misma fuente y tiene una guarda anti-drift que se niega a generar si no coincide.
//
// Correr con: npx tsx scripts/check_planilla_comercio.ts  (o vía scripts/check-all.ts)

import {
  CATEGORIAS_COMERCIO,
  COMERCIO_ANTIGUEDAD_POR_ANIO,
  COMERCIO_APORTES_NO_REM,
  COMERCIO_APORTES_REMUNERATIVO,
  JORNADAS_COMERCIO,
  MESES_COMERCIO,
} from "../src/data/convenios/comercio";
import { calcularComercio } from "../src/lib/convenios";

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

// Réplica exacta de las fórmulas de la planilla (.xlsx). basicoCompleto y noRemCompleto son
// los valores de jornada completa (la planilla los multiplica por el factor de jornada).
function planillaLiquida(params: {
  basicoCompleto: number;
  noRemCompleto: number;
  asignacionCompleta: number;
  anios: number;
  factor: number;
  presi: boolean;
}): { bruto: number; neto: number } {
  const { basicoCompleto, noRemCompleto, asignacionCompleta, anios, factor, presi } = params;
  const basico = basicoCompleto * factor; // B12
  const snr = noRemCompleto * factor; // B13 = D7
  const antig = (basico + snr) * anios * COMERCIO_ANTIGUEDAD_POR_ANIO; // B14
  const present = presi ? (basico + snr + antig) / 12 : 0; // B15
  // Asignación extraordinaria (acuerdo 07/2026): entra plana, después de la antigüedad y
  // del presentismo, porque la circular la excluye expresamente de las dos bases.
  const asignacion = asignacionCompleta * factor; // B16 = D8
  const bruto = basico + snr + antig + present + asignacion; // B17
  // Porción NO remunerativa (aporta 3%, no 17%) — helpers E5/E6/E7.
  const antigNoRem = snr * anios * COMERCIO_ANTIGUEDAD_POR_ANIO; // E5
  const presentNoRem = presi ? (snr + antigNoRem) / 12 : 0; // E6
  const totalNoRem = snr + antigNoRem + presentNoRem + asignacion; // E7
  const aportes =
    (bruto - totalNoRem) * COMERCIO_APORTES_REMUNERATIVO + totalNoRem * COMERCIO_APORTES_NO_REM; // -B18
  return { bruto, neto: bruto - aportes }; // B17, B19
}

// ===========================================================================
// MATRIZ COMPLETA: planilla == calcular.ar en bruto y neto
// ===========================================================================

const ANTIGUEDADES = [0, 1, 3, 5, 10, 25, 40];
let casos = 0;
let maxDiffBruto = 0;
let maxDiffNeto = 0;
let primerFallo: unknown = null;

for (const mes of MESES_COMERCIO) {
  for (const cat of CATEGORIAS_COMERCIO) {
    const basicoCompleto = mes.basicos[cat.id];
    for (const anios of ANTIGUEDADES) {
      for (const jornada of JORNADAS_COMERCIO) {
        for (const presi of [false, true]) {
          casos++;
          const web = calcularComercio({
            mesId: mes.id,
            categoriaId: cat.id,
            aniosAntiguedad: anios,
            jornadaFactor: jornada.factor,
            conPresentismo: presi,
          });
          const pla = planillaLiquida({
            basicoCompleto,
            noRemCompleto: mes.noRemunerativo,
            asignacionCompleta: mes.asignacionExtraordinaria ?? 0,
            anios,
            factor: jornada.factor,
            presi,
          });
          if (!web) {
            if (!primerFallo) primerFallo = { motivo: "web null", mes: mes.id, cat: cat.id };
            fallas++;
            continue;
          }
          const dB = Math.abs(web.bruto - pla.bruto);
          const dN = Math.abs(web.neto - pla.neto);
          maxDiffBruto = Math.max(maxDiffBruto, dB);
          maxDiffNeto = Math.max(maxDiffNeto, dN);
          if (dB >= 0.5 || dN >= 0.5) {
            if (!primerFallo)
              primerFallo = {
                mes: mes.id,
                cat: cat.id,
                anios,
                jornada: jornada.id,
                presi,
                webBruto: web.bruto,
                plaBruto: pla.bruto,
                webNeto: web.neto,
                plaNeto: pla.neto,
              };
            fallas++;
          }
        }
      }
    }
  }
}

check(
  `planilla == calcular.ar en los ${casos} casos (bruto y neto, ±$0,50)`,
  primerFallo === null,
  primerFallo,
);
check(
  `diferencia máxima de bruto < $0,01 (fue $${maxDiffBruto.toExponential(2)})`,
  maxDiffBruto < 0.01,
);
check(
  `diferencia máxima de neto < $0,01 (fue $${maxDiffNeto.toExponential(2)})`,
  maxDiffNeto < 0.01,
);

// ===========================================================================
// Regresión del bug corregido el 15/6: el neto del NO remunerativo aporta 3%, no 17%.
// Caso testigo: Vendedor B, junio, 10 años, jornada completa, con presentismo.
// ===========================================================================
{
  const web = calcularComercio({
    mesId: "junio-2026",
    categoriaId: "vendedor-b",
    aniosAntiguedad: 10,
    jornadaFactor: 1,
    conPresentismo: true,
  })!;
  const pla = planillaLiquida({
    basicoCompleto: 1_153_746,
    noRemCompleto: 120_000,
    asignacionCompleta: 0,
    anios: 10,
    factor: 1,
    presi: true,
  });
  // La fórmula VIEJA (todo al 17%) daba un neto más bajo: verificamos que YA NO es así y que
  // coincide con la web. La diferencia del bug era 0,14 × (antig+present no rem).
  const antigNoRem = 120_000 * 10 * 0.01; // 12.000
  const presentNoRem = (120_000 + antigNoRem) / 12; // 11.000
  const diferenciaDelBug = (antigNoRem + presentNoRem) * (0.17 - 0.03); // 3.220
  const netoViejoBuggy = pla.neto - diferenciaDelBug;
  check(
    "regresión: el neto ya NO usa la fórmula vieja (todo 17%)",
    !aprox(web.neto, netoViejoBuggy, 1),
  );
  check(
    "regresión: Vendedor B jun 10a c/presentismo → planilla == web al peso",
    aprox(pla.neto, web.neto, 0.5) && aprox(pla.bruto, web.bruto, 0.5),
  );
}

console.log(fallas === 0 ? "\nTODO OK" : `\n${fallas} FALLAS`);
process.exit(fallas === 0 ? 0 : 1);
