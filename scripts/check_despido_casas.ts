// Verificación de la página de despido del personal de casas particulares (Ley 26.844, arts. 7,
// 26/28, 29/30, 42 a 45 y 46 a 49 · Ley 27.802 Título X y art. 1º).
// Correr con: npx tsx scripts/check_despido_casas.ts
//
// LOS ANCLAS (cada uno cubre una forma distinta de que esto se rompa en silencio):
//   1. **La INVERSIÓN del art. 7 tiene que seguir siendo verdad palabra por palabra**: el texto
//      vigente dice «seis (6) meses» y NO menciona ni los 30 ni los 15 días; el anterior sí. Si
//      las citas se cruzan o se resumen, la página pasa a publicar lo mismo que las notas viejas.
//   2. **La palabra «alguna»**: el texto nuevo dice «sin generarse derecho a indemnización alguna»
//      y el viejo, sólo «indemnización». Es un detalle chico y es exactamente el tipo de cosa que
//      un refactor de estilo borra.
//   3. **El giro de la supletoriedad de la LCT** (art. 2° inc. b): «salvo remisión expresa» en el
//      vigente contra «en todo lo que resulte compatible» en el anterior — y el inc. c) de los
//      agrarios conservando la fórmula vieja, que es la prueba de que fue deliberado.
//   4. **La reforma NO es retroactiva**: la liquidación se decide por fecha de egreso, y un egreso
//      del 5/3/2026 tiene que liquidar distinto que uno del 6/3/2026.
//   5. **La aritmética del art. 48**: un mes por año o fracción MAYOR de tres meses, con piso de
//      un mes, y sin ningún tope (a diferencia del art. 245 de la LCT).
//   6. **El preaviso son DÍAS, no meses** (10 / 30 según se llegue al año). El error clásico es
//      liquidarlo con la escala de la LCT.
//   7. **Lo que se cobra igual dentro del período de prueba**: días trabajados y SAC proporcional
//      del art. 28 («por cualquier causa»). Si alguna vez el total en prueba da cero, la página
//      está afirmando lo que el art. 28 desmiente.
//   8. **El aviso de las vacaciones no gozadas** tiene que seguir marcando el punto como abierto:
//      es la única forma honesta de publicarlo.

import {
  CAMBIOS_TITULO_X,
  DESPIDO_CASAS_FUENTES,
  DESPIDO_CASAS_TEXTOS,
  DIAS_TRABAJO_POR_DIA_DESCANSO,
  FRACCION_MESES_ART48,
  PISO_MESES_ART48,
  PREAVISO,
  PRUEBA_DIAS_ANTERIOR_CON_RETIRO,
  PRUEBA_DIAS_ANTERIOR_SIN_RETIRO,
  PRUEBA_MESES_VIGENTE,
  PRUEBA_TOPE_MESES_ANTERIOR_CON_RETIRO,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/despido-casas-particulares";
import { calcularDespidoCasas } from "../src/lib/despido-casas-particulares";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}
const casi = (a: number, b: number, tol = 0.02) => Math.abs(a - b) <= tol;

const T = DESPIDO_CASAS_TEXTOS;

// ── 1 y 2. La inversión del art. 7, palabra por palabra ────────────────────────────────────────
{
  check("el art. 7 VIGENTE fija seis (6) meses", T.art7Vigente.includes("primeros seis (6) meses de vigencia"));
  check(
    "el art. 7 VIGENTE ya no menciona los 30 ni los 15 días",
    !/treinta \(30\) días|quince \(15\) días/.test(T.art7Vigente),
    T.art7Vigente,
  );
  check(
    "el art. 7 VIGENTE ya no distingue con retiro / sin retiro",
    !/con retiro|sin retiro/.test(T.art7Vigente),
  );
  check(
    "el art. 7 ANTERIOR sí tenía los 30 días (sin retiro) y los 15 con tope de 3 meses (con retiro)",
    T.art7Anterior.includes("treinta (30) días") &&
      T.art7Anterior.includes("quince (15) días") &&
      T.art7Anterior.includes("tres (3) meses"),
  );
  check("el art. 7 ANTERIOR no dice seis meses", !/seis \(6\) meses/.test(T.art7Anterior));
  check(
    "la palabra «alguna» está en el texto nuevo y no en el viejo",
    T.art7Vigente.includes("indemnización alguna con motivo de la extinción") &&
      T.art7Anterior.includes("indemnización con motivo de la extinción") &&
      !T.art7Anterior.includes("indemnización alguna"),
  );
  check(
    "la nota de vigencia identifica al art. 107 de la Ley 27.802 y su B.O.",
    T.notaVigencia7.includes("art. 107 de la Ley N° 27.802") && T.notaVigencia7.includes("06/03/2026"),
  );
  check("las constantes coinciden con las citas", PRUEBA_MESES_VIGENTE === 6 && PRUEBA_DIAS_ANTERIOR_SIN_RETIRO === 30 && PRUEBA_DIAS_ANTERIOR_CON_RETIRO === 15 && PRUEBA_TOPE_MESES_ANTERIOR_CON_RETIRO === 3);
}

// ── 3. El giro de la supletoriedad de la LCT ───────────────────────────────────────────────────
{
  check(
    "el art. 2° inc. b) VIGENTE condiciona la LCT a remisión expresa",
    T.lctArt2IncBVigente.includes("con la sola excepción de aquellas normas") &&
      T.lctArt2IncBVigente.includes("expresamente declare aplicables"),
  );
  check(
    "el inc. b) VIGENTE ya no dice «en todo lo que resulte compatible»",
    !T.lctArt2IncBVigente.includes("en todo lo que resulte compatible"),
    T.lctArt2IncBVigente,
  );
  check(
    "el inc. b) ANTERIOR sí lo decía",
    T.lctArt2IncBAnterior.includes("serán de aplicación en todo lo que resulte compatible"),
  );
  check(
    "el inc. c) (agrarios) CONSERVA la aplicación supletoria: la prueba de que fue deliberado",
    T.lctArt2IncCVigente.includes("de aplicación supletoria en todo lo que resulte compatible"),
  );
}

// ── 4. La reforma no es retroactiva: decide la fecha de egreso ──────────────────────────────────
{
  check("la fecha de vigencia es el 6/3/2026", VIGENCIA_REFORMA_ISO === "2026-03-06");

  const base = { sueldoMensual: 500_000, ingresoISO: "2025-12-01", modalidad: "sin-retiro" as const };
  const antes = calcularDespidoCasas({ ...base, egresoISO: "2026-03-05" });
  const despues = calcularDespidoCasas({ ...base, egresoISO: "2026-03-06" });

  check("un egreso del 5/3/2026 se liquida con el texto anterior", !antes.rigeTextoNuevo);
  check("uno del 6/3/2026, con el vigente", despues.rigeTextoNuevo);
  check(
    "con 3 meses de antigüedad: fuera de prueba con el texto viejo (30 días), dentro con el nuevo (6 meses)",
    !antes.dentroDePrueba && despues.dentroDePrueba,
    { antes: antes.dentroDePrueba, despues: despues.dentroDePrueba },
  );
  check(
    "y por eso la liquidación del 5/3 es mayor que la del 6/3",
    antes.totalACobrar > despues.totalACobrar,
    { antes: antes.totalACobrar, despues: despues.totalACobrar },
  );
  check(
    "la diferencia entre los dos textos se publica, no se esconde",
    despues.diferencia > 0 && casi(despues.diferencia, Math.abs(despues.totalACobrar - despues.totalOtroTexto)),
  );
}

// ── 5. La aritmética del art. 48 ───────────────────────────────────────────────────────────────
{
  check("la fracción indemnizable es «mayor de tres meses»", FRACCION_MESES_ART48 === 3);
  check("el piso es un mes de sueldo", PISO_MESES_ART48 === 1);
  check(
    "el art. 48 citado dice fracción mayor de tres meses, piso de un mes y no menciona ningún tope",
    T.art48.includes("fracción mayor de tres (3) meses") &&
      T.art48.includes("podrá ser menor a un (1) mes de sueldo") &&
      !/tope|máximo/i.test(T.art48),
  );

  const sueldo = 500_000;
  const modalidad = "con-retiro" as const;

  // 2 años y 3 meses: la fracción NO supera los 3 meses → 2 meses de indemnización.
  const dosAniosTres = calcularDespidoCasas({ sueldoMensual: sueldo, ingresoISO: "2024-05-10", egresoISO: "2026-08-14", modalidad });
  check("2 años y 3 meses → 2 meses (la fracción no supera los 3)", dosAniosTres.antiguedad.meses === 2, dosAniosTres.mesesTrabajados);

  // 2 años y 4 meses: la fracción SÍ supera los 3 meses → 3 meses.
  const dosAniosCuatro = calcularDespidoCasas({ sueldoMensual: sueldo, ingresoISO: "2024-04-10", egresoISO: "2026-08-14", modalidad });
  check("2 años y 4 meses → 3 meses (la fracción supera los 3)", dosAniosCuatro.antiguedad.meses === 3, dosAniosCuatro.mesesTrabajados);
  check("y el importe es sueldo × meses", casi(dosAniosCuatro.antiguedad.importe, sueldo * 3));

  // 7 meses: fuera de prueba con el texto nuevo, y el piso de un mes manda.
  const sieteMeses = calcularDespidoCasas({ sueldoMensual: sueldo, ingresoISO: "2026-01-10", egresoISO: "2026-08-14", modalidad });
  check("7 meses de antigüedad ya está fuera de los 6 meses de prueba", !sieteMeses.dentroDePrueba);
  check("y la fracción de 7 meses da un mes de indemnización, sin necesidad del piso", sieteMeses.antiguedad.meses === 1 && !sieteMeses.antiguedad.aplicaPiso);

  // El piso sólo puede aparecer con el texto ANTERIOR: con 6 meses de prueba, nadie sale del
  // período de prueba con una fracción de 3 meses o menos. Con los 30 días viejos, sí.
  const dosMesesViejo = calcularDespidoCasas({ sueldoMensual: sueldo, ingresoISO: "2026-01-05", egresoISO: "2026-03-05", modalidad: "sin-retiro" });
  check("con el texto anterior, 2 meses ya estaban fuera de prueba", !dosMesesViejo.dentroDePrueba);
  check("y ahí sí manda el piso de un mes del art. 48", dosMesesViejo.antiguedad.meses === 1 && dosMesesViejo.antiguedad.aplicaPiso, dosMesesViejo.mesesTrabajados);
}

// ── 6. El preaviso son días, no meses ──────────────────────────────────────────────────────────
{
  check("los plazos son 10 y 30 días", PREAVISO.diasHastaUnAnio === 10 && PREAVISO.diasDesdeUnAnio === 30);
  check("y el de la empleada, 10", PREAVISO.diasDeLaEmpleada === 10);
  check(
    "el art. 42 citado dice diez días si la antigüedad es inferior a un año y treinta si es superior",
    T.art42.includes("de diez (10) días cuando la antigüedad en el servicio fuere inferior a un (1) año") &&
      T.art42.includes("treinta (30) días cuando fuere superior"),
  );

  const sueldo = 600_000;
  const menos = calcularDespidoCasas({ sueldoMensual: sueldo, ingresoISO: "2025-11-10", egresoISO: "2026-08-14", modalidad: "con-retiro" });
  check("menos de un año → 10 días de preaviso", menos.preaviso.dias === 10, menos.mesesTrabajados);
  check("y su importe es 10 × (sueldo ÷ 30)", casi(menos.preaviso.importe, (sueldo / 30) * 10));

  const mas = calcularDespidoCasas({ sueldoMensual: sueldo, ingresoISO: "2023-01-10", egresoISO: "2026-08-14", modalidad: "con-retiro" });
  check("más de un año → 30 días de preaviso", mas.preaviso.dias === 30);
  check("el preaviso nunca se liquida como uno o dos MESES (eso es la LCT)", mas.preaviso.importe < sueldo * 1.01);

  check(
    "las 10 horas semanales para buscar trabajo del art. 45 siguen citadas",
    T.art45.includes("diez (10) horas semanales remuneradas para buscar nueva ocupación"),
  );
  check(
    "la integración del mes sale del art. 44",
    T.art44.includes("hasta la finalización del mes en que se produjo el despido"),
  );
  const mitadDeMes = calcularDespidoCasas({ sueldoMensual: 600_000, ingresoISO: "2023-01-10", egresoISO: "2026-08-14", modalidad: "con-retiro" });
  check("un despido el 14 de agosto integra los 17 días que faltan del mes", mitadDeMes.integracionMes.dias === 17, mitadDeMes.integracionMes.dias);
  const finDeMes = calcularDespidoCasas({ sueldoMensual: 600_000, ingresoISO: "2023-01-10", egresoISO: "2026-08-31", modalidad: "con-retiro" });
  check("y uno del último día del mes no integra nada", finDeMes.integracionMes.dias === 0);
}

// ── 7. Lo que se cobra igual dentro del período de prueba ───────────────────────────────────────
{
  const enPrueba = calcularDespidoCasas({ sueldoMensual: 400_000, ingresoISO: "2026-06-01", egresoISO: "2026-08-14", modalidad: "sin-retiro" });
  check("un contrato de 2 meses cae dentro de los 6 meses de prueba", enPrueba.dentroDePrueba);
  check("no corresponde indemnización por antigüedad", enPrueba.antiguedad.importe === 0 && !enPrueba.antiguedad.corresponde);
  check("ni preaviso", enPrueba.preaviso.importe === 0);
  check("pero SÍ los días trabajados del mes", enPrueba.sueldoDelMes > 0);
  check("y SÍ el SAC proporcional (art. 28, «por cualquier causa»)", enPrueba.sac.importe > 0);
  check("el total en período de prueba nunca es cero", enPrueba.totalACobrar > 0);
  check(
    "el art. 28 citado dice «por cualquier causa»",
    T.art28.includes("Cuando se opere la extinción del contrato de trabajo por cualquier causa"),
  );
  check(
    "el SAC del art. 26 es el 50% de la mayor remuneración del semestre",
    T.art26.includes("cincuenta por ciento (50%) de la mayor remuneración mensual devengada"),
  );
  check(
    "las vacaciones proporcionales salen del art. 30: un día cada 20 de trabajo efectivo",
    T.art30.includes("un día de descanso por cada veinte (20) días de trabajo efectivo") &&
      DIAS_TRABAJO_POR_DIA_DESCANSO === 20,
  );
}

// ── 8. El punto abierto se publica como abierto, y las fuentes ──────────────────────────────────
{
  const res = calcularDespidoCasas({ sueldoMensual: 400_000, ingresoISO: "2024-01-10", egresoISO: "2026-08-14", modalidad: "con-retiro" });
  check(
    "la página avisa que las vacaciones no gozadas quedaron sin norma expresa",
    res.avisos.some((a) => /no gozadas/.test(a.texto) && /supletoriamente|remisión expresa/.test(a.texto)),
  );
  check(
    "y avisa que la base del art. 48 es la MEJOR remuneración, no la última",
    res.avisos.some((a) => a.tono === "bloqueante" && /mejor remuneración/.test(a.texto)),
  );

  check("están los cuatro artículos del Título X", CAMBIOS_TITULO_X.length === 4);
  check(
    "y son los arts. 7, 14, 20 y 70",
    CAMBIOS_TITULO_X.map((c) => c.articulo).join(" ") === "art. 7 art. 14 art. 20 art. 70",
    CAMBIOS_TITULO_X.map((c) => c.articulo),
  );

  const urls = DESPIDO_CASAS_FUENTES.lista.map((f) => f.url);
  check("está citado el texto ACTUALIZADO de la Ley 26.844", urls.some((u) => u.includes("210489") && u.endsWith("texact.htm")));
  check("y su texto ORIGINAL (la prueba del art. 7 anterior)", urls.some((u) => u.includes("210489") && u.endsWith("norma.htm")));
  check("está citada la Ley 27.802 (id 423680)", urls.some((u) => u.includes("423680")));
  check("está citada la LCT para el art. 2°", urls.some((u) => u.includes("25552")));
  check("todas las fuentes son de InfoLEG", urls.every((u) => u.startsWith("https://servicios.infoleg.gob.ar/")));
  check("la fecha de consulta es una fecha ISO", /^\d{4}-\d{2}-\d{2}$/.test(DESPIDO_CASAS_FUENTES.consultadoEl));
}

if (fallas > 0) {
  console.error(`\n${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log(
  "\nTodos los checks del despido en casas particulares OK (Ley 26.844 arts. 7, 26/28, 30, 42-45 y 48 · Ley 27.802 arts. 1º y 107).",
);
