// Verificación de la prescripción de deudas con ARCA (Ley 11.683 y Ley 23.660, reforma 27.799).
// Correr con: npx tsx scripts/check_prescripcion_arca.ts
//
// LOS CUATRO CHECKS QUE IMPORTAN:
//
//   1. **El árbol de decisión completo.** Esta página contesta «¿prescribió?», que es una respuesta
//      binaria con consecuencias caras en las dos direcciones: decirle a alguien que su deuda
//      prescribió cuando no, o al revés. Se prueban las ocho combinaciones de inscripto × en término
//      × discrepancia, en las dos ramas.
//   2. **La reducción a 3 años se DESACTIVA con una sola condición.** Es el corazón del artículo
//      incorporado por la Ley 27.799: alcanza con que se cumpla una de las tres. Si alguien
//      "arregla" el OR a un AND, la página empieza a prometer tres años donde hay cinco.
//   3. **La fecha usa el art. 57 y no el período fiscal.** El plazo arranca el 1° de enero
//      SIGUIENTE al año del vencimiento: un off-by-one acá corre la respuesta un año entero.
//   4. **La rama de obra social NO devuelve fecha.** La Ley 23.660 fija el plazo pero no la regla
//      de inicio del cómputo. Que ese null se mantenga es una decisión de honestidad, no un TODO:
//      el día que alguien "complete" ese hueco estará publicando una certeza que la ley no da.

import {
  PLAZOS_IMPUESTOS,
  PLAZOS_OBRA_SOCIAL,
  PRESCRIPCION_FUENTES,
  PRESCRIPCION_TEXTOS,
  SUSPENSIONES_VIGENTES,
  UMBRAL_DISCREPANCIA,
  UMBRALES_RPT,
} from "../src/data/prescripcion-arca";
import { calcularPrescripcion, type EntradaPrescripcion } from "../src/lib/prescripcion-arca";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

const base: EntradaPrescripcion = {
  rama: "impuestos",
  inscripto: true,
  enTermino: true,
  anioVencimiento: 2021,
  declarado: 0,
  determinado: 0,
  apocrifos: false,
};

// ===========================================================================
// 1 · Los plazos que la página afirma
// ===========================================================================
check("el plazo general del inscripto son 5 años", PLAZOS_IMPUESTOS.inscripto === 5);
check("el plazo del cumplidor son 3 años (novedad de la Ley 27.799)", PLAZOS_IMPUESTOS.inscriptoCumplidor === 3);
check("el no inscripto prescribe a los 10 años", PLAZOS_IMPUESTOS.noInscripto === 10);
check("obra social: 10 años, 3 para el cumplidor", PLAZOS_OBRA_SOCIAL.general === 10 && PLAZOS_OBRA_SOCIAL.cumplidor === 3);
check("umbral RPT de tributos: $100.000.000 (art. 1°, texto Ley 27.799)", UMBRALES_RPT.tributos === 100_000_000);
check("umbral RPT de seguridad social: $7.000.000 POR MES (art. 5°)", UMBRALES_RPT.seguridadSocial === 7_000_000);
check("el umbral porcentual de la condición i) es 15%", UMBRAL_DISCREPANCIA === 0.15);

// ===========================================================================
// 2 · El árbol de decisión, entero
// ===========================================================================
{
  const r = calcularPrescripcion(base);
  check("inscripto + en término + sin impugnación → 3 años", r.plazo === 3, r);
  check("y se informa que antes eran 5", r.plazoAnterior === 5, r.plazoAnterior);
}
{
  const r = calcularPrescripcion({ ...base, enTermino: false });
  check("inscripto que NO presentó en término → 5 años", r.plazo === 5, r.plazo);
}
{
  const r = calcularPrescripcion({ ...base, inscripto: false });
  check("no inscripto → 10 años aunque haya presentado en término", r.plazo === 10, r.plazo);
}
{
  // Condición i) sola: 15% exacto alcanza (el texto dice «no inferior al quince por ciento»).
  const r = calcularPrescripcion({ ...base, declarado: 1_000_000, determinado: 1_150_000 });
  check("condición i) con 15% EXACTO ya es discrepancia significativa", r.hayDiscrepanciaSignificativa, r.condiciones);
  check("…y por eso el plazo vuelve a 5 años", r.plazo === 5, r.plazo);
}
{
  const r = calcularPrescripcion({ ...base, declarado: 1_000_000, determinado: 1_149_000 });
  check("14,9% NO alcanza: sigue en 3 años", !r.hayDiscrepanciaSignificativa && r.plazo === 3, r.plazo);
}
{
  // Condición ii) sola: diferencia enorme pero porcentaje chico (base declarada muy grande).
  const r = calcularPrescripcion({
    ...base,
    declarado: 10_000_000_000,
    determinado: 10_000_000_000 + UMBRALES_RPT.tributos + 1,
  });
  check(
    "condición ii) sola (supera el umbral penal aunque el % sea chico) → 5 años",
    r.hayDiscrepanciaSignificativa && r.plazo === 5 && r.porcentajeDiferencia < UMBRAL_DISCREPANCIA,
    { pct: r.porcentajeDiferencia, plazo: r.plazo },
  );
}
{
  const r = calcularPrescripcion({ ...base, apocrifos: true });
  check(
    "condición iii) sola (apócrifos, sin ningún monto cargado) → 5 años",
    r.hayDiscrepanciaSignificativa && r.plazo === 5,
    r.plazo,
  );
}
{
  // El OR es el corazón: ninguna condición cumplida ⇒ se conserva el beneficio.
  const r = calcularPrescripcion({ ...base, declarado: 1_000_000, determinado: 1_000_000 });
  check("sin ninguna condición cumplida el beneficio se conserva", r.plazo === 3, r.plazo);
  check(
    "se evalúan exactamente las tres condiciones, en orden i · ii · iii",
    r.condiciones.map((c) => c.id).join(",") === "i,ii,iii",
    r.condiciones.map((c) => c.id),
  );
}

// ===========================================================================
// 3 · La fecha: art. 57, y el off-by-one que la arruinaría
// ===========================================================================
{
  const r = calcularPrescripcion({ ...base, anioVencimiento: 2021 });
  check("el cómputo arranca el 1° de enero SIGUIENTE al vencimiento", r.inicioComputo === "2022-01-01", r.inicioComputo);
  check("con 3 años, prescribe el 1/1/2025", r.fechaPrescripcion === "2025-01-01", r.fechaPrescripcion);
  check("y a la fecha de hoy ya está cumplido", r.yaPrescribio === true, r);
}
{
  const r = calcularPrescripcion({ ...base, anioVencimiento: 2030 });
  check("un vencimiento futuro todavía no prescribió", r.yaPrescribio === false, r);
}
{
  const r = calcularPrescripcion({ ...base, inscripto: false, anioVencimiento: 2021 });
  check("no inscripto: 10 años desde 2022 → 1/1/2032", r.fechaPrescripcion === "2032-01-01", r.fechaPrescripcion);
}

// ===========================================================================
// 4 · Obra social: plazo sí, fecha NO (decisión de honestidad)
// ===========================================================================
{
  const r = calcularPrescripcion({ ...base, rama: "obra-social" });
  check("obra social cumplidor → 3 años", r.plazo === 3, r.plazo);
  check("obra social: NO se devuelve fecha (la ley no fija el inicio del cómputo)", r.fechaPrescripcion === null && r.inicioComputo === null && r.yaPrescribio === null, r);
  check("obra social usa el umbral del art. 5° del RPT, no el del art. 1°", r.umbralPenal === UMBRALES_RPT.seguridadSocial, r.umbralPenal);
}
{
  const r = calcularPrescripcion({ ...base, rama: "obra-social", enTermino: false });
  check("obra social sin presentación en término → 10 años", r.plazo === 10, r.plazo);
}

// ===========================================================================
// 5 · Los textos verbatim y las fuentes
// ===========================================================================
check(
  "el art. 56 inc. a) citado trae los dos plazos y la condición",
  PRESCRIPCION_TEXTOS.art56a.includes("cinco (5) años") &&
    PRESCRIPCION_TEXTOS.art56a.includes("se reducirá a tres (3) años") &&
    PRESCRIPCION_TEXTOS.art56a.includes("discrepancia significativa"),
);
check(
  "el art. 57 citado fija el 1° de enero siguiente al vencimiento",
  PRESCRIPCION_TEXTOS.art57.includes("1º de enero siguiente al año en que se produzca el vencimiento"),
);
check(
  "las tres condiciones están textuales y son distintas entre sí",
  PRESCRIPCION_TEXTOS.discrepanciaI.includes("quince por ciento (15%)") &&
    PRESCRIPCION_TEXTOS.discrepanciaII.includes("artículo 1° del Régimen Penal Tributario") &&
    PRESCRIPCION_TEXTOS.discrepanciaIII.includes("apócrifos"),
);
check(
  "el artículo DEROGADO sigue guardado con su texto y su nota (es la prueba de qué cambió)",
  PRESCRIPCION_TEXTOS.suspension120Derogada.includes("ciento veinte (120) días") &&
    PRESCRIPCION_TEXTOS.notaDerogacion.includes("derogado por art. 32 de la Ley Nº 27.799"),
);
check(
  "los dos umbrales del RPT están citados con su unidad de medida",
  PRESCRIPCION_TEXTOS.rptArt1.includes("por cada tributo y por cada ejercicio anual") &&
    PRESCRIPCION_TEXTOS.rptArt5.includes("por cada mes"),
);
check(
  "el art. 24 de la Ley 23.660 citado trae los diez años y la reducción a tres",
  PRESCRIPCION_TEXTOS.art24ObraSocial.includes("diez (10) años") &&
    PRESCRIPCION_TEXTOS.art24ObraSocial.includes("tres (3) años"),
);
check(
  "las suspensiones vigentes citan artículo y son al menos cinco",
  SUSPENSIONES_VIGENTES.length >= 5 && SUSPENSIONES_VIGENTES.every((s) => /Art\. \d+/.test(s.norma)),
);
check(
  "hay al menos 4 fuentes oficiales de InfoLEG con fecha de consulta",
  PRESCRIPCION_FUENTES.lista.length >= 4 &&
    PRESCRIPCION_FUENTES.lista.every((f) => f.url.startsWith("https://servicios.infoleg.gob.ar/")) &&
    /^\d{4}-\d{2}-\d{2}$/.test(PRESCRIPCION_FUENTES.consultadoEl),
);

console.log(fallas === 0 ? "\n✅ prescripción ARCA OK" : `\n❌ ${fallas} falla(s)`);
process.exit(fallas === 0 ? 0 : 1);
