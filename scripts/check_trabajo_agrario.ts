// Verificación de la página de despido del trabajador rural (Ley 26.727, Título XI de la Ley
// 27.802 + su art. 206). Correr con: npx tsx scripts/check_trabajo_agrario.ts
//
// LOS ANCLAS:
//   1. **El período de prueba rural son OCHO meses, no seis.** El número vive en un solo lugar y
//      tiene que estar dos meses por encima del art. 92 bis. Si alguien lo iguala al urbano, esto
//      falla: es el corazón de la página.
//   2. **Los tres textos del art. 16 no se pueden cruzar.** El original prohíbe la prueba, el
//      intermedio remite al 92 bis y el vigente fija los ocho meses. Cada uno tiene que contener
//      su oración y NO la de los otros dos.
//   3. **La oración del art. 17 es NUEVA.** Antes el artículo terminaba en «supletorias». Se
//      verifica que la oración agregada esté en el texto vigente y que sea la negación literal de
//      lo que decía el art. 18 derogado.
//   4. **Los arts. 18 y 21 están DEROGADOS, no sustituidos**: sus textos existen sólo como
//      antecedente y jamás como derecho vigente.
//   5. **El piso del art. 22 son DOS meses y NO se topea.** Con un tope de convenio agresivo, el
//      piso tiene que seguir calculándose sobre la remuneración real.
//   6. **El art. 245 no se reimplementa** (regla de s85): el tramo de antigüedad, cuando el piso
//      no manda, tiene que coincidir con `calcularIndemnizacion`.
//   7. **La franja de dos meses existe y se detecta.** Entre los 6 y los 8 meses: en la ciudad
//      indemniza, en el campo no. Es la consecuencia práctica de la reforma.
//   8. **En período de prueba no hay art. 245, ni preaviso, ni integración — pero sí liquidación
//      final.** El SAC y las vacaciones se devengan igual.
//   9. **El temporario cobra el 10% del art. 20 y nunca indemnización por antigüedad.**

import {
  AGRARIO_FUENTES,
  AGRARIO_TEXTOS,
  ARTICULOS_DEROGADOS,
  ARTICULOS_REFORMA,
  MESES_PERIODO_PRUEBA_AGRARIO,
  MESES_PERIODO_PRUEBA_LCT,
  MESES_PISO_ART22,
  PORCENTAJE_SUSTITUTIVA_VACACIONES,
  VIGENCIA_REFORMA,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/trabajo-agrario";
import { calcularIndemnizacion } from "../src/lib/indemnizacion";
import { calcularDespidoRural } from "../src/lib/trabajo-agrario";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const casi = (a: number, b: number, tol = 0.01) => Math.abs(a - b) <= tol;

const BASE = 1_100_000;

// ── 1. Los números del régimen ────────────────────────────────────────────────────────────────
{
  check(
    "el período de prueba rural es de 8 meses",
    MESES_PERIODO_PRUEBA_AGRARIO === 8,
    MESES_PERIODO_PRUEBA_AGRARIO,
  );
  check(
    "el período de prueba de la LCT que se contrasta es de 6 meses",
    MESES_PERIODO_PRUEBA_LCT === 6,
    MESES_PERIODO_PRUEBA_LCT,
  );
  check(
    "el rural supera al urbano por exactamente 2 meses",
    MESES_PERIODO_PRUEBA_AGRARIO - MESES_PERIODO_PRUEBA_LCT === 2,
  );
  check("el piso del art. 22 es de 2 meses de sueldo", MESES_PISO_ART22 === 2);
  check(
    "la indemnización sustitutiva de vacaciones del temporario es el 10%",
    PORCENTAJE_SUSTITUTIVA_VACACIONES === 0.1,
  );
  check("la reforma rige desde el 6/3/2026", VIGENCIA_REFORMA_ISO === "2026-03-06");
  check(
    "la fecha en prosa coincide con la ISO",
    VIGENCIA_REFORMA === "6 de marzo de 2026",
    VIGENCIA_REFORMA,
  );
}

// ── 2. Los tres textos del art. 16 no se cruzan ───────────────────────────────────────────────
{
  check(
    "el texto ORIGINAL prohíbe el período de prueba",
    AGRARIO_TEXTOS.art16Original.includes(AGRARIO_TEXTOS.oracionQueSeFueEn2024),
  );
  check(
    "el texto original NO menciona ni el 92 bis ni los ocho meses",
    !AGRARIO_TEXTOS.art16Original.includes("92 bis") &&
      !AGRARIO_TEXTOS.art16Original.includes("ocho (8) meses"),
  );
  check(
    "el texto INTERMEDIO (Ley 27.742) remite al art. 92 bis de la LCT",
    AGRARIO_TEXTOS.art16Intermedio.includes("artículo 92 bis"),
  );
  check(
    "el texto intermedio ya no prohíbe la prueba ni fija los ocho meses",
    !AGRARIO_TEXTOS.art16Intermedio.includes(AGRARIO_TEXTOS.oracionQueSeFueEn2024) &&
      !AGRARIO_TEXTOS.art16Intermedio.includes("ocho (8) meses"),
  );
  check(
    "el texto VIGENTE fija los ocho meses",
    AGRARIO_TEXTOS.art16Vigente.includes(AGRARIO_TEXTOS.oracionQueEntroEn2026),
  );
  check(
    "el texto vigente NO remite al 92 bis ni conserva la prohibición",
    !AGRARIO_TEXTOS.art16Vigente.includes("92 bis") &&
      !AGRARIO_TEXTOS.art16Vigente.includes(AGRARIO_TEXTOS.oracionQueSeFueEn2024),
  );
  check(
    "los tres textos son distintos entre sí",
    new Set([
      AGRARIO_TEXTOS.art16Original,
      AGRARIO_TEXTOS.art16Intermedio,
      AGRARIO_TEXTOS.art16Vigente,
    ]).size === 3,
  );
  check(
    "los tres remiten al Título XII de la LCT para la extinción",
    [
      AGRARIO_TEXTOS.art16Original,
      AGRARIO_TEXTOS.art16Intermedio,
      AGRARIO_TEXTOS.art16Vigente,
    ].every((t) => /[Tt]ítulo XII/.test(t)),
  );
}

// ── 3. La doble llave sobre el permanente discontinuo ─────────────────────────────────────────
{
  check(
    "el art. 17 vigente termina con la oración que agregó la reforma",
    AGRARIO_TEXTOS.art17Vigente.trim().endsWith(AGRARIO_TEXTOS.oracionAgregadaAlArt17),
  );
  check(
    "esa oración dice que los sucesivos contratos NO cambian la naturaleza temporaria",
    AGRARIO_TEXTOS.oracionAgregadaAlArt17.includes(
      "no modificará la naturaleza temporaria del vínculo",
    ),
  );
  check(
    "el art. 18 derogado decía exactamente lo contrario: era permanente discontinuo",
    AGRARIO_TEXTOS.art18Derogado.includes("será considerado a todos sus efectos como un trabajador permanente discontinuo"),
  );
  check(
    "el art. 18 derogado reconocía antigüedad desde la primera contratación",
    AGRARIO_TEXTOS.art18Derogado.includes("a partir de su primera contratación"),
  );
  check(
    "el art. 21 derogado computaba la antigüedad por períodos efectivamente trabajados",
    AGRARIO_TEXTOS.art21Derogado.includes(AGRARIO_TEXTOS.oracionDelComputo),
  );
  check(
    "los artículos derogados son el 13, el 18 y el 21",
    ARTICULOS_DEROGADOS.length === 3 &&
      ARTICULOS_DEROGADOS.includes(13) &&
      ARTICULOS_DEROGADOS.includes(18) &&
      ARTICULOS_DEROGADOS.includes(21),
    ARTICULOS_DEROGADOS,
  );
  check(
    "el artículo derogatorio de la Ley 27.802 es el 206",
    ARTICULOS_REFORMA.derogatorio === 206,
  );
  check(
    "el mapa de artículos de la reforma es el del Título XI (111 a 118)",
    [
      ARTICULOS_REFORMA.art12,
      ARTICULOS_REFORMA.art17,
      ARTICULOS_REFORMA.art16,
      ARTICULOS_REFORMA.art32,
      ARTICULOS_REFORMA.art34,
      ARTICULOS_REFORMA.art34bis,
      ARTICULOS_REFORMA.art89,
      ARTICULOS_REFORMA.art106,
    ].every((n) => n >= 111 && n <= 118),
  );
  check(
    "el art. 113 es el que sustituyó el art. 16 (los ocho meses)",
    ARTICULOS_REFORMA.art16 === 113,
  );
  check("el art. 112 es el que reescribió el art. 17", ARTICULOS_REFORMA.art17 === 112);
}

// ── 4. Los dos números intactos, palabra por palabra ──────────────────────────────────────────
{
  check(
    "el art. 22 dice «en ningún caso» y «dos (2) meses de sueldo»",
    AGRARIO_TEXTOS.art22.includes("en ningún caso") &&
      AGRARIO_TEXTOS.art22.includes("dos (2) meses de sueldo"),
  );
  check(
    "el art. 22 manda calcular sobre la mejor remuneración mensual, normal y habitual",
    AGRARIO_TEXTOS.art22.includes("mejor remuneración mensual, normal y habitual"),
  );
  check(
    "el art. 22 NO menciona tope de convenio",
    !/tope/i.test(AGRARIO_TEXTOS.art22),
    AGRARIO_TEXTOS.art22,
  );
  check(
    "el art. 20 fija el diez por ciento sobre el total de remuneraciones devengadas",
    AGRARIO_TEXTOS.art20.includes("diez por ciento (10%) del total de las remuneraciones devengadas"),
  );
}

// ── 5. Permanente: período de prueba de ocho meses ────────────────────────────────────────────
{
  // 7 meses: dentro del período de prueba rural, fuera del urbano.
  const siete = calcularDespidoRural({
    modalidad: "permanente",
    ingresoISO: "2026-01-15",
    egresoISO: "2026-08-18",
    mejorRemuneracion: BASE,
  });
  if (!siete || siete.modalidad !== "permanente") {
    check("el caso de 7 meses devuelve resultado de permanente", false, siete);
  } else {
    check("con 7 meses está en período de prueba rural", siete.enPeriodoPrueba === true);
    check("y la calculadora lo marca como la franja de dos meses", siete.enLaFranjaDeLosDosMeses === true);
    check("sin indemnización por antigüedad", siete.indemnizacionAntiguedad === 0);
    check("sin preaviso", siete.preaviso === null);
    check("sin integración del mes", siete.integracion === null);
    check("el total indemnizatorio es cero", siete.totalIndemnizatorio === 0);
    check(
      "pero la liquidación final NO es cero (SAC y vacaciones se devengan igual)",
      siete.liquidacionFinal.total > 0,
      siete.liquidacionFinal.total,
    );
    check(
      "el total general es exactamente la liquidación final",
      casi(siete.totalGeneral, siete.liquidacionFinal.total),
    );
    check(
      "el aviso de la franja explica que en la ciudad ya cobraría",
      siete.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes("empleo urbano")),
    );
  }

  // 9 meses: fuera del período de prueba rural.
  const nueve = calcularDespidoRural({
    modalidad: "permanente",
    ingresoISO: "2025-11-10",
    egresoISO: "2026-08-18",
    mejorRemuneracion: BASE,
  });
  if (!nueve || nueve.modalidad !== "permanente") {
    check("el caso de 9 meses devuelve resultado de permanente", false, nueve);
  } else {
    check("con 9 meses ya salió del período de prueba", nueve.enPeriodoPrueba === false);
    check("no está en la franja de dos meses", nueve.enLaFranjaDeLosDosMeses === false);
    check("hay preaviso", nueve.preaviso !== null);
    check(
      "la indemnización por antigüedad es el piso del art. 22 (2 sueldos)",
      casi(nueve.indemnizacionAntiguedad, MESES_PISO_ART22 * BASE),
      nueve.indemnizacionAntiguedad,
    );
    check("y el piso se marca como aplicado", nueve.pisoAplicado === true);
    check(
      "el art. 245 solo habría pagado un sueldo: el piso agrario duplica",
      casi(nueve.art245.monto, BASE) && casi(nueve.loQueAgregaElPiso, BASE),
      { art245: nueve.art245.monto, agrega: nueve.loQueAgregaElPiso },
    );
  }
}

// ── 6. El piso del art. 22 no se topea ────────────────────────────────────────────────────────
{
  const conTope = calcularDespidoRural({
    modalidad: "permanente",
    ingresoISO: "2025-01-10",
    egresoISO: "2026-08-18",
    mejorRemuneracion: BASE,
    topeCCT: 300_000,
  });
  if (!conTope || conTope.modalidad !== "permanente") {
    check("el caso con tope devuelve resultado de permanente", false, conTope);
  } else {
    check("el tope de convenio se aplicó al art. 245", conTope.art245.topeAplicado === true);
    check(
      "pero el piso del art. 22 sigue calculado sobre la remuneración REAL",
      casi(conTope.pisoArt22, MESES_PISO_ART22 * BASE),
      conTope.pisoArt22,
    );
    check(
      "y por eso el piso manda sobre el art. 245 topeado",
      conTope.pisoAplicado === true &&
        casi(conTope.indemnizacionAntiguedad, MESES_PISO_ART22 * BASE),
      { art245: conTope.art245.monto, piso: conTope.pisoArt22 },
    );
    check(
      "hay un aviso que explica que el tope no alcanza al art. 22",
      conTope.avisos.some((a) => a.texto.includes("no toca el piso")),
    );
  }
}

// ── 7. El art. 245 no se reimplementa (regla de s85) ──────────────────────────────────────────
{
  // Antigüedad larga: el art. 245 supera al piso, así que el número tiene que ser el del motor común.
  const largo = calcularDespidoRural({
    modalidad: "permanente",
    ingresoISO: "2019-03-01",
    egresoISO: "2026-08-18",
    mejorRemuneracion: BASE,
  });
  const referencia = calcularIndemnizacion({
    ingresoISO: "2019-03-01",
    despidoISO: "2026-08-18",
    mejorRemuneracion: BASE,
    preavisoOtorgado: false,
  });
  if (!largo || largo.modalidad !== "permanente" || !referencia) {
    check("los dos motores devuelven resultado", false, { largo, referencia });
  } else {
    check(
      "con antigüedad larga manda el art. 245, no el piso",
      largo.pisoAplicado === false && largo.indemnizacionAntiguedad > MESES_PISO_ART22 * BASE,
    );
    check(
      "y el importe coincide exactamente con el de /indemnizacion",
      casi(largo.indemnizacionAntiguedad, referencia.indemnizacionAntiguedad),
      { rural: largo.indemnizacionAntiguedad, lct: referencia.indemnizacionAntiguedad },
    );
    check(
      "el preaviso también coincide con el del motor común",
      largo.preaviso !== null &&
        referencia.preaviso !== null &&
        casi(largo.preaviso.monto, referencia.preaviso.monto),
    );
    check(
      "y la liquidación final también",
      casi(largo.liquidacionFinal.sac.monto, referencia.sacProporcional.monto) &&
        casi(largo.liquidacionFinal.vacaciones.monto, referencia.vacaciones.monto),
    );
  }
}

// ── 8. El motor común NO cambió: /indemnizacion sigue con los 6 meses del art. 92 bis ─────────
{
  const urbanoSiete = calcularIndemnizacion({
    ingresoISO: "2026-01-15",
    despidoISO: "2026-08-18",
    mejorRemuneracion: BASE,
    preavisoOtorgado: false,
  });
  check(
    "un urbano con 7 meses SÍ cobra indemnización (el período de prueba de la LCT son 6)",
    urbanoSiete !== null &&
      urbanoSiete.enPeriodoPrueba === false &&
      urbanoSiete.indemnizacionAntiguedad > 0,
    urbanoSiete?.indemnizacionAntiguedad,
  );
}

// ── 9. Temporario: el 10% del art. 20 y nada de antigüedad ────────────────────────────────────
{
  const temp = calcularDespidoRural({
    modalidad: "temporario",
    ingresoISO: "2026-02-01",
    egresoISO: "2026-05-31",
    mejorRemuneracion: 900_000,
    remuneracionesDevengadas: 3_600_000,
  });
  if (!temp || temp.modalidad !== "temporario") {
    check("el caso temporario devuelve resultado de temporario", false, temp);
  } else {
    check(
      "la sustitutiva de vacaciones es el 10% de lo devengado",
      casi(temp.sustitutivaVacaciones, 360_000),
      temp.sustitutivaVacaciones,
    );
    check("el SAC proporcional es mayor que cero", temp.sac.monto > 0);
    check(
      "el total es SAC + el 10%, sin indemnización por antigüedad",
      casi(temp.totalGeneral, temp.sac.monto + temp.sustitutivaVacaciones),
    );
    check(
      "sin temporadas previas declaradas, no se muestra lo que reconocía el art. 18",
      temp.loQueReconociaElArt18 === null,
    );
    check(
      "hay un aviso que dice que el temporario no tiene indemnización por antigüedad",
      temp.avisos.some((a) => a.texto.includes("no hay indemnización por antigüedad")),
    );
  }

  // Con temporadas previas: aparece lo que el art. 18 derogado reconocía.
  const conTemporadas = calcularDespidoRural({
    modalidad: "temporario",
    ingresoISO: "2026-02-01",
    egresoISO: "2026-05-31",
    mejorRemuneracion: 900_000,
    remuneracionesDevengadas: 3_600_000,
    mesesEfectivos: 30,
  });
  if (!conTemporadas || conTemporadas.modalidad !== "temporario") {
    check("el caso con temporadas previas devuelve resultado", false, conTemporadas);
  } else {
    const perdido = conTemporadas.loQueReconociaElArt18;
    check("se calcula lo que reconocía el art. 18 derogado", perdido !== null);
    if (perdido) {
      check(
        "30 meses efectivos son 2 años y 6 meses → 3 años computables (fracción > 3 meses)",
        perdido.antiguedad.anios === 2 &&
          perdido.antiguedad.meses === 6 &&
          perdido.art245.aniosComputables === 3,
        perdido.antiguedad,
      );
      check(
        "el importe es el art. 245 sobre esos períodos, por encima del piso de 2 meses",
        casi(perdido.monto, 3 * 900_000) && perdido.monto > perdido.pisoArt22,
        { monto: perdido.monto, piso: perdido.pisoArt22 },
      );
    }
    check(
      "el total a cobrar HOY no incluye ese importe: es sólo la referencia de lo que se perdió",
      casi(conTemporadas.totalGeneral, conTemporadas.sac.monto + conTemporadas.sustitutivaVacaciones),
    );
    check(
      "y hay un aviso bloqueante que explica la derogación",
      conTemporadas.avisos.some(
        (a) => a.tono === "bloqueante" && a.texto.includes("permanente discontinuo"),
      ),
    );
  }
}

// ── 10. Entradas inválidas ────────────────────────────────────────────────────────────────────
{
  check(
    "egreso anterior al ingreso devuelve null",
    calcularDespidoRural({
      modalidad: "permanente",
      ingresoISO: "2026-08-18",
      egresoISO: "2026-01-15",
      mejorRemuneracion: BASE,
    }) === null,
  );
  check(
    "remuneración cero devuelve null",
    calcularDespidoRural({
      modalidad: "permanente",
      ingresoISO: "2026-01-15",
      egresoISO: "2026-08-18",
      mejorRemuneracion: 0,
    }) === null,
  );
}

// ── 11. Fuentes: sólo oficiales, con fecha de consulta ────────────────────────────────────────
{
  check(
    "está citado el texto actualizado de la Ley 26.727 en InfoLEG (id 192152)",
    AGRARIO_FUENTES.lista.some((f) => f.url.includes("192152/texact.htm")),
    AGRARIO_FUENTES.lista.map((f) => f.url),
  );
  check(
    "están citadas las capturas de las que salen los artículos derogados",
    AGRARIO_FUENTES.lista.filter(
      (f) => f.url.includes("web.archive.org") && f.url.includes("192152/texact.htm"),
    ).length >= 2,
    AGRARIO_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citado el texto oficial de la Ley 27.802 (id 423680)",
    AGRARIO_FUENTES.lista.some((f) => f.url.includes("423680")),
  );
  check(
    "está citado el texto actualizado de la LCT (id 25552)",
    AGRARIO_FUENTES.lista.some((f) => f.url.includes("25552/texact.htm")),
  );
  check(
    "ninguna fuente es un blog o una nota de prensa",
    AGRARIO_FUENTES.lista.every(
      (f) =>
        f.url.includes("infoleg.gob.ar") ||
        f.url.includes("boletinoficial.gob.ar") ||
        f.url.includes("web.archive.org"),
    ),
    AGRARIO_FUENTES.lista.map((f) => f.url),
  );
  check(
    "la fecha de consulta está declarada",
    /^\d{4}-\d{2}-\d{2}$/.test(AGRARIO_FUENTES.consultadoEl),
    AGRARIO_FUENTES.consultadoEl,
  );
}

console.log(
  fallas === 0
    ? "\nTodos los checks de trabajo agrario OK (Ley 26.727 arts. 16, 17, 20 y 22 · Título XI y art. 206 de la Ley 27.802 · período de prueba de 8 meses y piso de 2 sueldos)"
    : `\n${fallas} check(s) fallaron`,
);
process.exit(fallas === 0 ? 0 : 1);
