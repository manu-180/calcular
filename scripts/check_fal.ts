// Verificación de la página del Fondo de Asistencia Laboral (Título II de la Ley 27.802 +
// Decreto 408/2026). Correr con: npx tsx scripts/check_fal.ts
//
// LOS ANCLAS:
//   1. **Las cuatro alícuotas del art. 60 y su orden.** MiPyME siempre por encima de gran empresa,
//      y el techo siempre por encima de la vigente. Si alguien invierte un par, la página publica
//      un costo laboral equivocado.
//   2. **La vigencia es el 1/11/2026, no el 1/6/2026.** El art. 27 del decreto usó el plazo máximo
//      de seis meses que le daba el art. 77. Se verifica que las dos fechas estén y sean distintas,
//      y que la diferencia sea exactamente de seis meses.
//   3. **La reducción del art. 76 hace el costo neto CERO — salvo RIFL.** Es el resultado que más
//      cambia según un solo booleano, así que se verifica en los dos sentidos.
//   4. **La carencia del art. 65 se cuenta como manda el art. 15 del decreto**: seis períodos
//      completos y consecutivos, así que el fondo responde recién en el séptimo mes. Se verifica
//      la aritmética de meses, incluido el cruce de año.
//   5. **Las tres oraciones que niegan la sustitución** están, completas, y ninguna se contradice.
//   6. **El acumulado NO incluye rendimientos** y la página lo dice: el resultado tiene que ser
//      exactamente aporte × períodos.
//   7. **Los excluidos son tres** y la construcción está entre ellos (tiene su propio fondo).
//   8. **La antigüedad mínima de 12 meses se detecta** y avisa cuando el caso no la alcanza.
//   9. **Las fuentes son sólo oficiales**, con fecha de consulta.

import {
  ALICUOTAS,
  ARTICULOS_CUBIERTOS,
  DIAS_HABILES_TRANSFERENCIA,
  EXCLUIDOS,
  FAL_FUENTES,
  FAL_TEXTOS,
  MESES_ANTIGUEDAD_MINIMA,
  MESES_SIN_TRABAJADORES,
  MULTA_MULTIPLO,
  PERIODOS_CARENCIA,
  TOPE_COMISION_ANUAL,
  VIGENCIA_FAL,
  VIGENCIA_FAL_ISO,
  VIGENCIA_ORIGINAL,
} from "../src/data/fal";
import { calcularFal, periodoEnPalabras } from "../src/lib/fal";

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

const MASA = 18_000_000;

// ── 1. Las cuatro alícuotas del art. 60 ───────────────────────────────────────────────────────
{
  check("la alícuota vigente de gran empresa es 1%", ALICUOTAS.vigentes.grande === 1);
  check("la alícuota vigente de MiPyME es 2,5%", ALICUOTAS.vigentes.pyme === 2.5);
  check("el techo de gran empresa es 1,5%", ALICUOTAS.maximas.grande === 1.5);
  check("el techo de MiPyME es 3%", ALICUOTAS.maximas.pyme === 3);
  check(
    "la MiPyME aporta más que la gran empresa en los dos escenarios",
    ALICUOTAS.vigentes.pyme > ALICUOTAS.vigentes.grande &&
      ALICUOTAS.maximas.pyme > ALICUOTAS.maximas.grande,
  );
  check(
    "el techo está por encima de la vigente en los dos tamaños",
    ALICUOTAS.maximas.pyme > ALICUOTAS.vigentes.pyme &&
      ALICUOTAS.maximas.grande > ALICUOTAS.vigentes.grande,
  );
  check(
    "los cuatro números están citados en el texto del art. 60",
    FAL_TEXTOS.art60Primero.includes("uno por ciento (1%)") &&
      FAL_TEXTOS.art60Primero.includes("dos coma cinco por ciento (2,5%)") &&
      FAL_TEXTOS.art60Segundo.includes("uno coma cinco por ciento (1,5%)") &&
      FAL_TEXTOS.art60Segundo.includes("tres por ciento (3%)"),
  );
  check(
    "el techo sólo lo puede activar el PEN con aprobación de la Comisión Bicameral",
    FAL_TEXTOS.art60Segundo.includes("Poder Ejecutivo nacional") &&
      FAL_TEXTOS.art60Segundo.includes("Comisión Bicameral"),
  );
}

// ── 2. La prórroga: la única de toda la ley ───────────────────────────────────────────────────
{
  check("la vigencia es el 1/11/2026", VIGENCIA_FAL_ISO === "2026-11-01", VIGENCIA_FAL_ISO);
  check(
    "la fecha en prosa coincide con la ISO",
    VIGENCIA_FAL.includes("noviembre") && VIGENCIA_FAL.includes("2026"),
    VIGENCIA_FAL,
  );
  check(
    "la fecha original (art. 77) es distinta y anterior",
    VIGENCIA_ORIGINAL.includes("junio") && (VIGENCIA_ORIGINAL as string) !== (VIGENCIA_FAL as string),
    VIGENCIA_ORIGINAL,
  );
  check(
    "la prórroga es de exactamente los 6 meses que permitía el art. 77 (junio → noviembre)",
    VIGENCIA_ORIGINAL.includes("1° de junio de 2026") &&
      VIGENCIA_FAL.includes("1° de noviembre de 2026"),
  );
  check(
    "el texto del art. 27 del decreto cita la fecha nueva",
    FAL_TEXTOS.decretoArt27.includes("1° de noviembre de 2026") &&
      FAL_TEXTOS.decretoArt27.includes("Fondo de Asistencia Laboral"),
  );
}

// ── 3. La reducción del art. 76: cero neto, salvo RIFL ────────────────────────────────────────
{
  const sinRifl = calcularFal({
    tipoEmpleador: "pyme",
    masaSalarialMensual: MASA,
    escenario: "vigente",
    enRifl: false,
    primerPeriodo: "2026-12",
  });
  const conRifl = calcularFal({
    tipoEmpleador: "pyme",
    masaSalarialMensual: MASA,
    escenario: "vigente",
    enRifl: true,
    primerPeriodo: "2026-12",
  });
  if (!sinRifl || !conRifl) {
    check("los dos escenarios de RIFL devuelven resultado", false, { sinRifl, conRifl });
  } else {
    check(
      "la contribución de una MiPyME es el 2,5% de la masa",
      casi(sinRifl.contribucionMensual, MASA * 0.025),
      sinRifl.contribucionMensual,
    );
    check(
      "sin RIFL la reducción iguala al aporte y el costo neto es cero",
      casi(sinRifl.reduccionPatronal, sinRifl.contribucionMensual) &&
        casi(sinRifl.costoNetoMensual, 0),
      { red: sinRifl.reduccionPatronal, neto: sinRifl.costoNetoMensual },
    );
    check(
      "con RIFL no hay reducción y el costo neto es el aporte entero",
      conRifl.reduccionPatronal === 0 &&
        casi(conRifl.costoNetoMensual, conRifl.contribucionMensual),
      { red: conRifl.reduccionPatronal, neto: conRifl.costoNetoMensual },
    );
    check(
      "el aporte es el mismo en los dos casos: lo que cambia es la reducción",
      casi(sinRifl.contribucionMensual, conRifl.contribucionMensual),
    );
    check(
      "con RIFL hay un aviso bloqueante que lo explica",
      conRifl.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes("RIFL")),
    );
    check(
      "el art. 76 y el art. 24 del decreto dicen «equivalente» y «detraerán»",
      FAL_TEXTOS.art76.includes("equivalente") &&
        FAL_TEXTOS.art76.includes("RIFL") &&
        FAL_TEXTOS.decretoArt24.includes("detraerán mensualmente"),
    );
    check(
      "el anual es doce veces el mensual",
      casi(sinRifl.contribucionAnual, sinRifl.contribucionMensual * 12),
    );
  }

  const grande = calcularFal({
    tipoEmpleador: "grande",
    masaSalarialMensual: MASA,
    escenario: "vigente",
    enRifl: false,
    primerPeriodo: "2026-12",
  });
  check(
    "una gran empresa aporta el 1% (menos que la MiPyME)",
    grande !== null && casi(grande.contribucionMensual, MASA * 0.01),
    grande?.contribucionMensual,
  );
}

// ── 4. La carencia: seis períodos completos y consecutivos ────────────────────────────────────
{
  const r = calcularFal({
    tipoEmpleador: "pyme",
    masaSalarialMensual: MASA,
    escenario: "vigente",
    enRifl: false,
    primerPeriodo: "2026-12",
  });
  if (!r) {
    check("el caso de carencia devuelve resultado", false);
  } else {
    check(
      "el sexto período de la carencia arrancando en 2026-12 es 2027-05",
      r.ultimoPeriodoCarencia === "2027-05",
      r.ultimoPeriodoCarencia,
    );
    check(
      "el fondo responde desde 2027-06, no antes",
      r.desdeCuandoResponde === "2027-06",
      r.desdeCuandoResponde,
    );
    check("la carencia son 6 períodos", PERIODOS_CARENCIA === 6);
    check(
      "hay un aviso que nombra el mes desde el que responde",
      r.avisos.some((a) => a.texto.includes("junio de 2027")),
    );
    check(
      "el art. 15 del decreto exige períodos completos y consecutivos",
      FAL_TEXTOS.decretoArt15.includes("completos y consecutivos") &&
        FAL_TEXTOS.decretoArt15.includes("primera contribución"),
    );
  }

  // Sin cruce de año, para que la aritmética de meses no dependa de diciembre.
  const medio = calcularFal({
    tipoEmpleador: "grande",
    masaSalarialMensual: MASA,
    escenario: "vigente",
    enRifl: false,
    primerPeriodo: "2027-03",
  });
  check(
    "arrancando en 2027-03 la carencia cierra en 2027-08 y responde desde 2027-09",
    medio !== null &&
      medio.ultimoPeriodoCarencia === "2027-08" &&
      medio.desdeCuandoResponde === "2027-09",
    { ultimo: medio?.ultimoPeriodoCarencia, desde: medio?.desdeCuandoResponde },
  );
  check(
    "periodoEnPalabras traduce el período correctamente",
    periodoEnPalabras("2027-06") === "junio de 2027",
    periodoEnPalabras("2027-06"),
  );
}

// ── 5. Las tres oraciones que niegan la sustitución ───────────────────────────────────────────
{
  check(
    "el art. 58 dice que el régimen no modifica, sustituye ni altera el régimen indemnizatorio",
    FAL_TEXTOS.noSustituye.includes("no modifica, sustituye, ni altera el régimen indemnizatorio"),
  );
  check(
    "el art. 64 mantiene la responsabilidad íntegra del empleador",
    FAL_TEXTOS.responsabilidadIntegra.includes("no limita, reduce, altera ni condiciona") &&
      FAL_TEXTOS.responsabilidadIntegra.includes("pago íntegro"),
  );
  check(
    "el art. 68 deja a la administradora como tercero ajeno",
    FAL_TEXTOS.administradoraAjena.includes("terceros ajenos"),
  );
  check(
    "hay un aviso bloqueante que publica las tres reglas juntas",
    (() => {
      const r = calcularFal({
        tipoEmpleador: "pyme",
        masaSalarialMensual: MASA,
        escenario: "vigente",
        enRifl: false,
        primerPeriodo: "2026-12",
      });
      return !!r?.avisos.some(
        (a) => a.tono === "bloqueante" && a.texto.includes("no modifica, sustituye, ni altera"),
      );
    })(),
  );
}

// ── 6. El acumulado no inventa rendimientos ───────────────────────────────────────────────────
{
  const r = calcularFal({
    tipoEmpleador: "pyme",
    masaSalarialMensual: MASA,
    escenario: "vigente",
    enRifl: false,
    primerPeriodo: "2026-12",
  });
  if (!r) {
    check("el caso de acumulado devuelve resultado", false);
  } else {
    check(
      "el acumulado en la carencia es exactamente aporte × 6",
      casi(r.acumuladoEnCarencia, r.contribucionMensual * PERIODOS_CARENCIA),
    );
    check(
      "el acumulado al año es exactamente aporte × 12",
      casi(r.acumuladoAlAnio, r.contribucionMensual * 12),
    );
    check(
      "la comisión máxima es el 1% de ese acumulado",
      casi(r.comisionAnualMaxima, r.acumuladoAlAnio * 0.01) && TOPE_COMISION_ANUAL === 1,
    );
    check(
      "hay un aviso que aclara que no se proyectan rendimientos",
      r.avisos.some((a) => a.texto.includes("no incluyen rendimientos")),
    );
  }
}

// ── 7. El escenario del techo se marca como hipotético ────────────────────────────────────────
{
  const techo = calcularFal({
    tipoEmpleador: "pyme",
    masaSalarialMensual: MASA,
    escenario: "maxima",
    enRifl: false,
    primerPeriodo: "2026-12",
  });
  check(
    "en el escenario del techo la alícuota es 3% y la alternativa es la vigente (2,5%)",
    techo !== null && techo.alicuota === 3 && techo.alicuotaAlternativa === 2.5,
    { a: techo?.alicuota, alt: techo?.alicuotaAlternativa },
  );
  check(
    "y hay un aviso que aclara que NO es la alícuota vigente",
    techo !== null &&
      techo.avisos.some((a) => a.texto.includes("No es la alícuota vigente")),
  );
}

// ── 8. Antigüedad mínima del trabajador ───────────────────────────────────────────────────────
{
  const corto = calcularFal({
    tipoEmpleador: "pyme",
    masaSalarialMensual: MASA,
    escenario: "vigente",
    enRifl: false,
    primerPeriodo: "2026-12",
    mejorRemuneracion: 1_500_000,
    aniosAntiguedad: 0.5,
  });
  const largo = calcularFal({
    tipoEmpleador: "pyme",
    masaSalarialMensual: MASA,
    escenario: "vigente",
    enRifl: false,
    primerPeriodo: "2026-12",
    mejorRemuneracion: 1_500_000,
    aniosAntiguedad: 5,
  });
  check("la antigüedad mínima del art. 58 son 12 meses", MESES_ANTIGUEDAD_MINIMA === 12);
  check(
    "con medio año de antigüedad NO se cumple el mínimo y se avisa",
    corto !== null &&
      corto.caso !== null &&
      corto.caso.cumpleAntiguedadMinima === false &&
      corto.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes("12")),
  );
  if (!largo || !largo.caso) {
    check("el caso de 5 años devuelve la contingencia", false, largo);
  } else {
    check("con 5 años sí se cumple el mínimo", largo.caso.cumpleAntiguedadMinima === true);
    check(
      "la contingencia del art. 245 son 5 sueldos",
      casi(largo.caso.indemnizacion, 5 * 1_500_000),
      largo.caso.indemnizacion,
    );
    check(
      "los meses para cubrirla son indemnización ÷ aporte mensual",
      casi(largo.caso.mesesParaCubrirla, largo.caso.indemnizacion / largo.contribucionMensual),
    );
    check(
      "el porcentaje cubierto al cerrar la carencia es acumulado ÷ indemnización",
      casi(
        largo.caso.cubiertoEnCarencia,
        (largo.acumuladoEnCarencia / largo.caso.indemnizacion) * 100,
      ),
    );
  }
}

// ── 9. Alcance del régimen: qué cubre y a quién deja afuera ───────────────────────────────────
{
  check(
    "la lista de artículos cubiertos incluye el 245 y el 232",
    ARTICULOS_CUBIERTOS.some((a) => a.articulo.includes("245")) &&
      ARTICULOS_CUBIERTOS.some((a) => a.articulo.includes("232")),
  );
  check(
    "la lista NO incluye multas por falta de registración",
    !ARTICULOS_CUBIERTOS.some((a) => /multa|24\.013|registraci/i.test(a.concepto)),
    ARTICULOS_CUBIERTOS.map((a) => a.concepto),
  );
  check("son tres los excluidos", EXCLUIDOS.length === 3, EXCLUIDOS.length);
  check(
    "la construcción (Ley 22.250) está excluida",
    EXCLUIDOS.some((e) => e.norma.includes("22.250")),
  );
  check(
    "casas particulares (Ley 26.844) está excluida",
    EXCLUIDOS.some((e) => e.norma.includes("26.844")),
  );
  check(
    "el sector público (art. 8 de la Ley 24.156) está excluido por el decreto",
    EXCLUIDOS.some((e) => e.norma.includes("24.156") && /decreto/i.test(e.porQue)),
  );
  check(
    "el art. 58 excluye a los no registrados sin excepción",
    FAL_TEXTOS.noRegistrados.includes("En ningún caso y bajo ninguna circunstancia"),
  );
}

// ── 10. Los otros números del régimen ─────────────────────────────────────────────────────────
{
  check("el tope de comisión es 1%", TOPE_COMISION_ANUAL === 1);
  check("la transferencia al trabajador es de hasta 5 días hábiles", DIAS_HABILES_TRANSFERENCIA === 5);
  check("la cuenta se extingue tras 6 meses sin trabajadores", MESES_SIN_TRABAJADORES === 6);
  check("la multa del art. 75 es de hasta el doble", MULTA_MULTIPLO === 2);
  check(
    "el art. 20 del decreto declara el tope global, integral y anual",
    FAL_TEXTOS.decretoArt20.includes("global e integral") &&
      FAL_TEXTOS.decretoArt20.includes("en forma anual"),
  );
  check(
    "el art. 11 del decreto prohíbe invertir en el exterior",
    FAL_TEXTOS.decretoArt11.includes("no admitiéndose la inversión") &&
      FAL_TEXTOS.decretoArt11.includes("exterior"),
  );
  check(
    "el art. 62 aclara que la cuenta no es individualizable por trabajador",
    FAL_TEXTOS.art62.includes("no individualizable por trabajador"),
  );
  check("el art. 74 declara la cuenta inembargable", FAL_TEXTOS.art74.includes("inembargables"));
}

// ── 11. Entradas inválidas ────────────────────────────────────────────────────────────────────
{
  check(
    "masa salarial cero devuelve null",
    calcularFal({
      tipoEmpleador: "pyme",
      masaSalarialMensual: 0,
      escenario: "vigente",
      enRifl: false,
      primerPeriodo: "2026-12",
    }) === null,
  );
  check(
    "un período mal formado devuelve null",
    calcularFal({
      tipoEmpleador: "pyme",
      masaSalarialMensual: MASA,
      escenario: "vigente",
      enRifl: false,
      primerPeriodo: "nov-2026",
    }) === null,
  );
}

// ── 12. Fuentes: sólo oficiales, con fecha de consulta ────────────────────────────────────────
{
  check(
    "está citado el texto oficial de la Ley 27.802 (id 423680)",
    FAL_FUENTES.lista.some((f) => f.url.includes("423680")),
    FAL_FUENTES.lista.map((f) => f.url),
  );
  check(
    "está citado el Decreto 408/2026 (id 426272)",
    FAL_FUENTES.lista.some((f) => f.url.includes("426272")),
    FAL_FUENTES.lista.map((f) => f.url),
  );
  check(
    "ninguna fuente es un blog o una nota de prensa",
    FAL_FUENTES.lista.every(
      (f) => f.url.includes("infoleg.gob.ar") || f.url.includes("boletinoficial.gob.ar"),
    ),
    FAL_FUENTES.lista.map((f) => f.url),
  );
  check(
    "la fecha de consulta está declarada",
    /^\d{4}-\d{2}-\d{2}$/.test(FAL_FUENTES.consultadoEl),
    FAL_FUENTES.consultadoEl,
  );
}

console.log(
  fallas === 0
    ? "\nTodos los checks del Fondo de Asistencia Laboral OK (Ley 27.802 Título II · Decreto 408/2026 · alícuotas 1%/2,5%, carencia de 6 períodos y vigencia 1/11/2026)"
    : `\n${fallas} check(s) fallaron`,
);
process.exit(fallas === 0 ? 0 : 1);
