// Verificación de la página de período de prueba (LCT arts. 92 bis, 123, 153/155/156, 231, 232 y
// 233, con el texto vigente tras la Ley 27.802). Correr con:
//   npx tsx scripts/check_periodo_prueba.ts
//
// LOS ANCLAS (cada uno cubre una forma distinta de que esto se rompa en silencio):
//   1. **La INVERSIÓN, palabra por palabra.** El texto ANTERIOR (Ley 25.877, art. 3º) tenía en la
//      escala «QUINCE (15) días cuando el trabajador se encontrare en período de prueba»; el
//      VIGENTE no lo tiene y agrega la frase contraria: «no se requerirá la obligación de
//      preaviso». Si alguna vez las citas se cruzan o se resumen, la página pasa a publicar lo
//      mismo que las notas desactualizadas que vino a corregir.
//   2. **La fecha decide.** La reforma NO es retroactiva: un despido del 5/3/2026 cobra los 15
//      días y uno del 6/3/2026 no. El corte tiene que estar exactamente ahí.
//   3. **«No te corresponde nada» es falso.** El aguinaldo y las vacaciones proporcionales se
//      cobran igual (arts. 92 bis vi, 123 y 156, que dicen «por cualquier causa»). Si algún día el
//      cálculo los pierde, la página se vuelve la contraria de lo que quiere enseñar.
//   4. **Lo que NO corresponde tampoco puede aparecer:** indemnización por antigüedad, preaviso
//      (con el texto nuevo) e integración del mes de despido (art. 233, excluida desde 2004).
//   5. **Los divisores son los del repo** (30 para el día normal, 25 para vacaciones, 20 días
//      hábiles por día de descanso), no números escritos a mano en el componente.
//   6. **Fuera del período de prueba el cálculo se declara inaplicable**, con aviso bloqueante:
//      publicar una liquidación sin art. 245 para alguien con 8 meses sería un error caro.
//   7. **La duración es la de la Ley 27.742** (6 meses base, 8 y 12 sólo por convenio): la 27.802
//      no la tocó, y confundirlas es el error de mezclar las dos reformas.

import { APORTES } from "../src/data/sueldo";
import {
  ARTICULO_SUSTITUTIVO_231,
  CONCEPTOS,
  DIAS_TRABAJO_POR_DIA_DESCANSO,
  DIVISOR_DIA,
  DIVISOR_VACACIONES,
  PERIODO_PRUEBA,
  PERIODO_PRUEBA_FUENTES,
  PERIODO_PRUEBA_TEXTOS,
  PREAVISO_ANTERIOR_DIAS,
  VIGENCIA_REFORMA,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/periodo-prueba";
import { calcularPeriodoPrueba } from "../src/lib/periodo-prueba";

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

const SUELDO = 1_200_000;

// ── 1. La inversión: los 15 días estaban y ya no están ─────────────────────────────────────────
{
  const t = PERIODO_PRUEBA_TEXTOS;
  check(
    "el texto ANTERIOR tenía los 15 días para el período de prueba en la escala del empleador",
    t.art231Anterior.includes(
      "de QUINCE (15) días cuando el trabajador se encontrare en período de prueba",
    ),
    t.art231Anterior,
  );
  check(
    "el texto VIGENTE ya NO tiene esa frase",
    !/QUINCE \(15\) días cuando el trabajador se encontrare en período de prueba/.test(
      t.art231Vigente,
    ),
  );
  check(
    "el texto VIGENTE dice expresamente que no se requiere preaviso en período de prueba",
    t.art231Vigente.includes(
      "Para el supuesto en que el trabajador se encuentre en período de prueba no se requerirá la obligación de preaviso",
    ),
  );
  check(
    "el inciso a) —el preaviso que da el trabajador— sigue en 15 días en los DOS textos",
    t.art231Vigente.includes("a) por el trabajador, de QUINCE (15) días") &&
      t.art231Anterior.includes("a) por el trabajador, de QUINCE (15) días"),
  );
  check(
    "los plazos del empleador fuera del período de prueba no cambiaron (1 mes / 2 meses)",
    t.art231Vigente.includes("de un (1) mes") && t.art231Vigente.includes("dos (2) meses"),
  );
  check(
    `la nota de vigencia cita el art. ${ARTICULO_SUSTITUTIVO_231} de la Ley 27.802`,
    t.notaVigencia231.includes(`art. ${ARTICULO_SUSTITUTIVO_231} de la Ley Nº 27.802`) &&
      t.notaVigencia231.includes("Inciso b)"),
  );
  check("el preaviso anterior eran 15 días", PREAVISO_ANTERIOR_DIAS === 15);
  check(
    "la vigencia es el 6 de marzo de 2026, en texto y en ISO",
    VIGENCIA_REFORMA === "6 de marzo de 2026" && VIGENCIA_REFORMA_ISO === "2026-03-06",
  );
}

// ── 2. La fecha decide: el corte está exactamente en el 6/3/2026 ───────────────────────────────
{
  const antes = calcularPeriodoPrueba({
    sueldoMensual: SUELDO,
    ingresoISO: "2025-12-01",
    egresoISO: "2026-03-05",
  });
  const desde = calcularPeriodoPrueba({
    sueldoMensual: SUELDO,
    ingresoISO: "2025-12-01",
    egresoISO: "2026-03-06",
  });

  check("un despido del 5/3/2026 se rige por el texto ANTERIOR", !antes.rigeTextoNuevo);
  check("un despido del 6/3/2026 se rige por el texto NUEVO", desde.rigeTextoNuevo);
  check(
    "el del 5/3 cobra 15 días de preaviso",
    casi(antes.preavisoQueCorresponde, (PREAVISO_ANTERIOR_DIAS * SUELDO) / DIVISOR_DIA),
    antes.preavisoQueCorresponde,
  );
  check("el del 6/3 no cobra preaviso", desde.preavisoQueCorresponde === 0);
  check(
    "la diferencia entre los dos textos son exactamente 15 días de sueldo",
    casi(desde.diferencia, (PREAVISO_ANTERIOR_DIAS * SUELDO) / DIVISOR_DIA),
    desde.diferencia,
  );
  check(
    "el total con el texto nuevo es menor que con el anterior, y por esos 15 días",
    casi(desde.totalTextoAnterior - desde.totalACobrar, desde.diferencia),
  );
  check(
    "el despido nuevo levanta un aviso BLOQUEANTE avisando que el preaviso ya no corresponde",
    desde.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes("YA NO CORRESPONDE")),
  );
  check(
    "el despido viejo avisa que la reforma no es retroactiva y que sí lo cobra",
    antes.avisos.some((a) => a.tono === "ok" && a.texto.includes("no es retroactiva")),
  );
}

// ── 3. Lo que SÍ se cobra: aguinaldo y vacaciones proporcionales ───────────────────────────────
{
  // Ingreso 1/4/2026, egreso 14/8/2026 → 4 meses completos, dentro del período de prueba.
  const r = calcularPeriodoPrueba({
    sueldoMensual: SUELDO,
    ingresoISO: "2026-04-01",
    egresoISO: "2026-08-14",
  });

  check("4 meses completos trabajados", r.mesesTrabajados === 4, r.mesesTrabajados);
  check("está dentro del período de prueba de 6 meses", r.dentroDePrueba);

  check(
    "el valor del día normal es sueldo ÷ 30",
    casi(r.valorDia, SUELDO / DIVISOR_DIA),
    r.valorDia,
  );
  check(
    "el valor del día de vacaciones es sueldo ÷ 25 (art. 155)",
    casi(r.valorDiaVacaciones, SUELDO / DIVISOR_VACACIONES),
  );
  check(
    "el día de vacaciones vale MÁS que el día normal (por eso el divisor importa)",
    r.valorDiaVacaciones > r.valorDia,
  );

  // Días del mes: del 1/8 al 14/8 = 14 días.
  check("días del último mes = 14", r.diasDelMes === 14, r.diasDelMes);
  check(
    "el sueldo del mes es esos días por el valor día",
    casi(r.sueldoDelMes, 14 * (SUELDO / DIVISOR_DIA)),
  );

  // SAC: semestre 1/7 a 31/12 = 184 días; trabajados del 1/7 al 14/8 = 45 días.
  check("el semestre del egreso tiene 184 días", r.sac.diasSemestre === 184, r.sac.diasSemestre);
  check(
    "se computan 45 días de ese semestre",
    r.sac.diasTrabajadosSemestre === 45,
    r.sac.diasTrabajadosSemestre,
  );
  check(
    "el SAC proporcional es sueldo ÷ 2 × 45 ÷ 184",
    casi(r.sac.importe, ((SUELDO / 2) * 45) / 184),
    r.sac.importe,
  );
  check("el SAC proporcional NO es cero", r.sac.importe > 0);

  // Vacaciones: art. 153, un día cada 20 hábiles.
  check(
    "los días de vacaciones son los hábiles trabajados ÷ 20, redondeados para abajo",
    r.vacaciones.dias === Math.floor(r.vacaciones.diasHabilesTrabajados / DIAS_TRABAJO_POR_DIA_DESCANSO),
    r.vacaciones,
  );
  check("con más de 4 meses hay al menos 4 días de vacaciones", r.vacaciones.dias >= 4);
  check(
    "las vacaciones se pagan al valor del art. 155",
    casi(r.vacaciones.importe, r.vacaciones.dias * (SUELDO / DIVISOR_VACACIONES)),
  );
  check(
    "hay SAC sobre las vacaciones proporcionales (la doceava parte)",
    casi(r.vacaciones.sacSobreVacaciones, r.vacaciones.importe / 12) &&
      r.vacaciones.sacSobreVacaciones > 0,
  );

  check(
    "el subtotal sin preaviso es la suma de los cuatro conceptos",
    casi(
      r.totalSinPreaviso,
      r.sueldoDelMes + r.sac.importe + r.vacaciones.importe + r.vacaciones.sacSobreVacaciones,
    ),
  );
  check(
    "los aportes se calculan sobre sueldo + SAC (las vacaciones no gozadas son indemnizatorias)",
    casi(
      r.aportes.total,
      (r.sueldoDelMes + r.sac.importe) *
        (APORTES.jubilacion + APORTES.obraSocial + APORTES.pami),
    ),
  );
  check(
    "la página desmiente explícitamente el «no te corresponde nada»",
    r.avisos.some((a) => a.texto.includes("tiempo de servicio a todos los efectos")),
  );
}

// ── 4. Lo que NO corresponde ───────────────────────────────────────────────────────────────────
{
  const r = calcularPeriodoPrueba({
    sueldoMensual: SUELDO,
    ingresoISO: "2026-04-01",
    egresoISO: "2026-08-14",
  });
  check("no se paga preaviso con el texto vigente", r.preavisoQueCorresponde === 0);
  check(
    "la página avisa que la integración del mes NO corresponde",
    r.avisos.some((a) => a.texto.includes("integración del mes de despido no corresponde")),
  );
  check(
    "y lo funda en el art. 233, no en una opinión",
    PERIODO_PRUEBA_TEXTOS.art233Integracion.includes(
      "no procederá cuando la extinción se produzca durante el período de prueba",
    ),
  );
  check(
    "el art. 92 bis sigue diciendo que no hay indemnización por la extinción",
    PERIODO_PRUEBA_TEXTOS.art92bisDuracion.includes(
      "sin derecho a indemnización con motivo a la extinción",
    ),
  );

  const sinCobrar = CONCEPTOS.filter((c) => !c.corresponde).map((c) => c.concepto);
  check(
    "la tabla marca como NO corresponde el preaviso, la antigüedad y la integración del mes",
    sinCobrar.length === 3 &&
      sinCobrar.some((c) => c.includes("Preaviso")) &&
      sinCobrar.some((c) => c.includes("antigüedad")) &&
      sinCobrar.some((c) => c.includes("Integración")),
    sinCobrar,
  );
  check(
    "y como SÍ corresponde el SAC y las vacaciones proporcionales",
    CONCEPTOS.filter((c) => c.corresponde).length === 4,
    CONCEPTOS.filter((c) => c.corresponde).map((c) => c.concepto),
  );
}

// ── 5. Fuera del período de prueba: el cálculo se declara inaplicable ──────────────────────────
{
  const fuera = calcularPeriodoPrueba({
    sueldoMensual: SUELDO,
    ingresoISO: "2025-10-01",
    egresoISO: "2026-08-14",
  });
  check("con 10 meses ya no hay período de prueba", !fuera.dentroDePrueba);
  check(
    "y la página lo dice con un aviso BLOQUEANTE que manda a la calculadora de indemnización",
    fuera.avisos.some(
      (a) => a.tono === "bloqueante" && a.texto.includes("indemnización por antigüedad"),
    ),
    fuera.avisos,
  );

  // Con la ampliación por convenio a 12 meses, el mismo caso SÍ está en período de prueba.
  const ampliado = calcularPeriodoPrueba({
    sueldoMensual: SUELDO,
    ingresoISO: "2025-10-01",
    egresoISO: "2026-08-14",
    topeMeses: 12,
  });
  check("con el tope convencional de 12 meses, el mismo caso sí está en prueba", ampliado.dentroDePrueba);

  const invalido = calcularPeriodoPrueba({
    sueldoMensual: SUELDO,
    ingresoISO: "2026-08-14",
    egresoISO: "2026-04-01",
  });
  check(
    "una salida anterior al ingreso no devuelve números, pide los datos",
    invalido.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes("Cargá")),
  );
}

// ── 6. La duración es la de la Ley 27.742, no la de la 27.802 ──────────────────────────────────
{
  check("el período de prueba base son 6 meses", PERIODO_PRUEBA.mesesBase === 6);
  check(
    "las ampliaciones son 8 y 12 meses, y sólo por convenio",
    PERIODO_PRUEBA.ampliaciones.length === 2 &&
      PERIODO_PRUEBA.ampliaciones.every((a) => a.soloPorConvenio) &&
      PERIODO_PRUEBA.ampliaciones.map((a) => a.meses).join(",") === "8,12",
  );
  check(
    "la cita del art. 92 bis trae los tres plazos",
    PERIODO_PRUEBA_TEXTOS.art92bisDuracion.includes("primeros seis (6) meses") &&
      PERIODO_PRUEBA_TEXTOS.art92bisDuracion.includes("hasta ocho (8) meses") &&
      PERIODO_PRUEBA_TEXTOS.art92bisDuracion.includes("hasta un (1) año"),
  );
  check(
    "la fuente aclara que el 92 bis viene de la Ley 27.742, no de la 27.802",
    PERIODO_PRUEBA_FUENTES.lista.some(
      (f) => f.nombre.includes("27.742") && f.detalle.includes("no lo modificó"),
    ),
  );
}

// ── 7. Fuentes: texto actualizado, texto anterior y fecha ──────────────────────────────────────
{
  check(
    "está citado el texto ACTUALIZADO de la LCT (id 25552, texact)",
    PERIODO_PRUEBA_FUENTES.lista.some(
      (f) => f.url.includes("25552") && f.url.endsWith("texact.htm"),
    ),
  );
  check(
    "está citada la Ley 25.877 (id 93595) como fuente del texto anterior",
    PERIODO_PRUEBA_FUENTES.lista.some(
      (f) => f.url.includes("93595") && f.nombre.includes("25.877"),
    ),
  );
  check(
    "está citada la Ley 27.802",
    PERIODO_PRUEBA_FUENTES.lista.some(
      (f) => f.nombre.includes("27.802") || f.detalle.includes("27.802"),
    ),
  );
  check(
    "la fecha de consulta es una fecha ISO",
    /^\d{4}-\d{2}-\d{2}$/.test(PERIODO_PRUEBA_FUENTES.consultadoEl),
  );
}

if (fallas > 0) {
  console.error(`\n${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log(
  "\nTodos los checks de período de prueba OK (LCT arts. 92 bis, 123, 153/156, 231-233 · Ley 27.802 art. 48).",
);
