// Verificación de la página de horas extras (LCT arts. 197, 197 bis, 198, 201 y 203 con el texto
// vigente tras la Ley 27.802, más el Decreto 484/2000). Correr con:
//   npx tsx scripts/check_horas_extras.ts
//
// LOS ANCLAS (cada uno cubre una forma distinta de que esto se rompa en silencio):
//   1. **La INVERSIÓN tiene que seguir siendo verdad, palabra por palabra.** Todo el valor de la
//      página es que el texto ANTERIOR abría con «Las convenciones colectivas de trabajo» —el banco
//      de horas era materia exclusivamente colectiva— y el VIGENTE abre con «El empleador y el
//      trabajador podrán acordar voluntariamente». Si las citas se cruzan o se resumen, la página
//      pasa a decir lo mismo que las notas viejas que vino a corregir.
//   2. **El recargo del art. 201 NO cambió**: 50% en días comunes, 100% en sábado después de las
//      13, domingo y feriados. Es lo único de este tema que toda la web tiene bien; si acá se
//      rompe, se rompe la credibilidad de todo lo demás.
//   3. **Los cinco requisitos de forma del acuerdo salen del propio artículo**, no de una opinión:
//      cada uno tiene que poder rastrearse a una frase del texto vigente.
//   4. **Los descansos mínimos son 12 y 35 horas** y están en la cita del art. 198, no escritos a
//      mano en el componente.
//   5. **El tope del Decreto 484/2000 sigue siendo 30 mensuales / 200 anuales** y pasarse levanta
//      un aviso BLOQUEANTE, no un número silencioso. Son dos topes independientes.
//   6. **Las dos lecturas del banco de horas siguen estando las dos.** La norma no fija la
//      equivalencia del franco: si alguna vez queda una sola, la página está inventando derecho.
//   7. **El divisor del valor hora no es un número legal** y la página tiene que seguir mostrando
//      los dos (208 promedio y 200 usual) cuando la jornada es de 48.
//   8. **Los porcentajes de aportes salen de data/sueldo.ts**, no escritos a mano acá.

import { APORTES } from "../src/data/sueldo";
import {
  ARTICULO_SUSTITUTIVO_197BIS,
  ARTICULO_SUSTITUTIVO_198,
  CAMBIOS,
  DESCANSOS_MINIMOS,
  DIVISOR_USUAL_48,
  HORAS_EXTRAS_FUENTES,
  HORAS_EXTRAS_TEXTOS,
  JORNADA_LEGAL_SEMANAL,
  RECARGOS,
  REQUISITOS_ACUERDO,
  SEMANAS_POR_MES,
  TOPES_DECRETO_484,
  VIGENCIA_REFORMA,
  VIGENCIA_REFORMA_ISO,
} from "../src/data/horas-extras";
import { calcularHorasExtras } from "../src/lib/horas-extras";

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

// ── 1. La inversión: quién puede pactar el banco de horas ──────────────────────────────────────
{
  const t = HORAS_EXTRAS_TEXTOS;
  check(
    "el texto ANTERIOR arranca con las convenciones colectivas (materia exclusivamente colectiva)",
    t.art197bisAnterior.startsWith("Las convenciones colectivas de trabajo"),
    t.art197bisAnterior.slice(0, 60),
  );
  check(
    "el texto VIGENTE arranca con el acuerdo entre empleador y trabajador",
    t.art197bisVigente.startsWith(
      "El empleador y el trabajador podrán acordar voluntariamente",
    ),
    t.art197bisVigente.slice(0, 70),
  );
  check(
    "el texto VIGENTE NO limita el banco de horas a las convenciones colectivas",
    !t.art197bisVigente.startsWith("Las convenciones colectivas"),
  );
  check(
    "el texto ANTERIOR no menciona el acuerdo individual empleador-trabajador",
    !/El empleador y el trabajador/.test(t.art197bisAnterior),
  );
  check(
    "el vigente conserva la cláusula de protección del trabajador (el límite que sí queda)",
    t.art197bisVigente.includes(
      "asegurando en todo momento la protección, beneficio e interés del trabajador",
    ),
  );
  check(
    "las notas de vigencia citan los arts. 42 y 43 de la Ley 27.802",
    t.notaVigencia197bis.includes(`art. ${ARTICULO_SUSTITUTIVO_197BIS} de la Ley Nº 27.802`) &&
      t.notaVigencia198.includes(`art. ${ARTICULO_SUSTITUTIVO_198} de la Ley Nº 27.802`),
  );
  check(
    "la vigencia es el 6 de marzo de 2026, en texto y en ISO",
    VIGENCIA_REFORMA === "6 de marzo de 2026" && VIGENCIA_REFORMA_ISO === "2026-03-06",
  );
}

// ── 2. El recargo del art. 201, que no cambió ──────────────────────────────────────────────────
{
  check("recargo de días comunes = 50%", RECARGOS.comun === 0.5);
  check("recargo agravado = 100%", RECARGOS.agravado === 1);
  check(
    "la cita del art. 201 trae los dos porcentajes",
    HORAS_EXTRAS_TEXTOS.art201.includes("cincuenta por ciento (50%)") &&
      HORAS_EXTRAS_TEXTOS.art201.includes("ciento por ciento (100%)"),
  );
  check(
    "la cita del art. 201 marca el corte del sábado a las 13",
    HORAS_EXTRAS_TEXTOS.art201.includes("sábado después de las trece (13) horas"),
  );
  check(
    "la cita del art. 201 conserva el «medie o no autorización» (se cobran igual sin permiso)",
    HORAS_EXTRAS_TEXTOS.art201.includes(
      "medie o no autorización del organismo administrativo competente",
    ),
  );
  check(
    "la tabla de cambios dice que el recargo NO empeoró",
    CAMBIOS.some((c) => c.tema.includes("recargo") && c.peor === false),
  );
}

// ── 3. Los cinco requisitos del acuerdo salen del artículo ─────────────────────────────────────
{
  check("son exactamente cinco requisitos", REQUISITOS_ACUERDO.length === 5, REQUISITOS_ACUERDO.length);
  const v = HORAS_EXTRAS_TEXTOS.art197bisVigente;
  check("el artículo exige forma escrita", v.includes("deberá formalizarse por escrito"));
  check(
    "el artículo exige consignar la naturaleza voluntaria",
    v.includes("consignando la naturaleza voluntaria de la prestación de horas extras"),
  );
  check("el artículo exige fijar los límites", v.includes("y sus límites"));
  check(
    "el artículo exige especificar el modo de funcionamiento",
    v.includes("especificando el modo de funcionamiento del sistema"),
  );
  check(
    "el artículo exige un método fehaciente de control para AMBAS partes",
    v.includes("método fehaciente de control que permita a ambas partes registrar las horas"),
  );
}

// ── 4. Los descansos mínimos, con número y en la cita del art. 198 ─────────────────────────────
{
  check("descanso entre jornadas = 12 horas", DESCANSOS_MINIMOS.entreJornadas === 12);
  check("descanso semanal = 35 horas", DESCANSOS_MINIMOS.semanal === 35);
  check(
    "el art. 198 vigente escribe los dos pisos con número",
    HORAS_EXTRAS_TEXTOS.art198Vigente.includes("entre jornada y jornada de doce (12) horas") &&
      HORAS_EXTRAS_TEXTOS.art198Vigente.includes(
        "descanso semanal de treinta y cinco (35) horas",
      ),
  );
  check(
    "el art. 197 mantiene la pausa de 12 horas",
    HORAS_EXTRAS_TEXTOS.art197Pausa.includes("no inferior a doce (12) horas"),
  );
  check(
    "el art. 198 vigente habilita el banco de horas sin superar el máximo semanal",
    HORAS_EXTRAS_TEXTOS.art198Vigente.includes("se podrá utilizar el banco de horas") &&
      HORAS_EXTRAS_TEXTOS.art198Vigente.includes("no se supere el máximo legal de la jornada semanal"),
  );
}

// ── 5. El tope del Decreto 484/2000: 30 / 200, y los dos son independientes ────────────────────
{
  check("tope mensual = 30", TOPES_DECRETO_484.mensual === 30);
  check("tope anual = 200", TOPES_DECRETO_484.anual === 200);
  check(
    "la cita del decreto trae los dos topes y el «sin autorización administrativa previa»",
    HORAS_EXTRAS_TEXTOS.decreto484.includes("TREINTA (30) horas mensuales") &&
      HORAS_EXTRAS_TEXTOS.decreto484.includes("DOSCIENTAS (200) horas anuales") &&
      HORAS_EXTRAS_TEXTOS.decreto484.includes("sin necesidad de autorización administrativa previa"),
  );

  const dentro = calcularHorasExtras({
    sueldoMensual: 1_200_000,
    jornadaSemanal: 48,
    horasComunes: 10,
    horasAgravadas: 4,
  });
  check("14 horas en el mes no superan el tope mensual", !dentro.topes.superaMensual);
  check(
    "quedan 16 horas de margen mensual",
    casi(dentro.topes.margenMensual, 16),
    dentro.topes.margenMensual,
  );

  const pasado = calcularHorasExtras({
    sueldoMensual: 1_200_000,
    jornadaSemanal: 48,
    horasComunes: 28,
    horasAgravadas: 6,
  });
  check("34 horas superan el tope mensual", pasado.topes.superaMensual);
  check(
    "pasarse del tope mensual levanta un aviso BLOQUEANTE que nombra el decreto",
    pasado.avisos.some(
      (a) => a.tono === "bloqueante" && a.texto.includes(TOPES_DECRETO_484.norma),
    ),
    pasado.avisos,
  );
  check(
    "el aviso aclara que las horas por encima del tope igual se pagan",
    pasado.avisos.some((a) => a.texto.includes("igual se pagan")),
  );

  // Los dos topes son independientes: dentro del mensual, fuera del anual.
  const anual = calcularHorasExtras({
    sueldoMensual: 1_200_000,
    jornadaSemanal: 48,
    horasComunes: 10,
    horasAgravadas: 0,
    horasAcumuladasAnio: 195,
  });
  check("10 horas del mes están dentro del tope mensual", !anual.topes.superaMensual);
  check("pero con 195 acumuladas se pasa el tope anual", anual.topes.superaAnual);
  check(
    "y eso levanta su propio aviso bloqueante",
    anual.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes("tope anual")),
  );
}

// ── 6. El cálculo del importe ──────────────────────────────────────────────────────────────────
{
  const sueldo = 1_040_000; // elegido para que el valor hora dé redondo con el divisor 208
  const r = calcularHorasExtras({
    sueldoMensual: sueldo,
    jornadaSemanal: 48,
    horasComunes: 10,
    horasAgravadas: 4,
  });

  const horasMes = 48 * SEMANAS_POR_MES; // 208
  check("horas mensuales = jornada × 52/12 = 208", casi(r.horasMensuales, 208, 0.001), r.horasMensuales);
  check("valor hora = sueldo / 208", casi(r.valorHora, sueldo / horasMes), r.valorHora);
  check(
    "las 10 horas comunes valen hora × 1,5",
    casi(r.importeComunes, 10 * (sueldo / horasMes) * 1.5),
    r.importeComunes,
  );
  check(
    "las 4 horas agravadas valen hora × 2",
    casi(r.importeAgravadas, 4 * (sueldo / horasMes) * 2),
    r.importeAgravadas,
  );
  check(
    "el total es la suma de los dos tramos",
    casi(r.totalBruto, r.importeComunes + r.importeAgravadas),
  );
  check(
    "sin recargo, las mismas 14 horas valen 14 × la hora normal",
    casi(r.totalSinRecargo, 14 * (sueldo / horasMes)),
  );
  check(
    "el aporte del recargo es la diferencia entre ambos",
    casi(r.aporteDelRecargo, r.totalBruto - r.totalSinRecargo),
  );

  // Aportes: 17%, y de data/sueldo.ts
  check(
    "los aportes son el 17% del bruto de las extras",
    casi(r.aportes.total, r.totalBruto * (APORTES.jubilacion + APORTES.obraSocial + APORTES.pami)),
    r.aportes.total,
  );
  check("el neto es el bruto menos los aportes", casi(r.neto, r.totalBruto - r.aportes.total));
  check(
    "el arrastre al aguinaldo es la mitad del bruto (art. 122: 50% de la mejor remuneración)",
    casi(r.impactoAguinaldo, r.totalBruto / 2),
  );
}

// ── 7. El divisor del valor hora: los dos, y sólo para la jornada de 48 ────────────────────────
{
  const sueldo = 1_200_000;
  const legal = calcularHorasExtras({
    sueldoMensual: sueldo,
    jornadaSemanal: JORNADA_LEGAL_SEMANAL,
    horasComunes: 10,
    horasAgravadas: 0,
  });
  check(
    "con jornada de 48 se ofrece también el valor hora con el divisor 200",
    legal.valorHoraDivisor200 !== null &&
      casi(legal.valorHoraDivisor200, sueldo / DIVISOR_USUAL_48),
    legal.valorHoraDivisor200,
  );
  check(
    "el divisor 200 da una hora MÁS CARA que el promedio de 208",
    legal.diferenciaPorDivisor > 0,
    legal.diferenciaPorDivisor,
  );
  check(
    "y por lo tanto un total mayor",
    (legal.totalBrutoDivisor200 ?? 0) > legal.totalBruto,
  );
  check(
    "la página avisa que el divisor no está en ninguna ley",
    legal.avisos.some((a) => a.texto.includes("no está en ninguna ley")),
  );

  const reducida = calcularHorasExtras({
    sueldoMensual: sueldo,
    jornadaSemanal: 36,
    horasComunes: 10,
    horasAgravadas: 0,
  });
  check(
    "con una jornada distinta de 48 NO se inventa un divisor 200",
    reducida.valorHoraDivisor200 === null && reducida.totalBrutoDivisor200 === null,
  );
  check(
    "y el valor hora sale de su propia jornada",
    casi(reducida.valorHora, sueldo / (36 * SEMANAS_POR_MES)),
  );
}

// ── 8. Las dos lecturas del banco de horas, que la norma no resuelve ───────────────────────────
{
  const r = calcularHorasExtras({
    sueldoMensual: 1_200_000,
    jornadaSemanal: 48,
    horasComunes: 10,
    horasAgravadas: 4,
  });
  check("lectura 1:1 = las horas trabajadas", casi(r.banco.horasSimple, 14));
  check(
    "lectura con recargo = 10 × 1,5 + 4 × 2 = 23 horas de franco",
    casi(r.banco.horasConRecargo, 23),
    r.banco.horasConRecargo,
  );
  check("la diferencia entre lecturas son 9 horas", casi(r.banco.diferencia, 9));
  check(
    "esa diferencia está valuada en pesos",
    casi(r.banco.diferenciaEnPesos, 9 * r.valorHora),
  );
  check(
    "la página dice explícitamente que la ley no fija la equivalencia",
    r.avisos.some((a) => a.texto.includes("no lo dice la ley")),
  );
  check(
    "y que el acuerdo individual sólo es posible desde el 6/3/2026",
    r.avisos.some((a) => a.texto.includes("6 de marzo de 2026")),
  );
}

// ── 9. La voluntariedad (art. 203) siempre está a la vista ─────────────────────────────────────
{
  const r = calcularHorasExtras({
    sueldoMensual: 900_000,
    jornadaSemanal: 48,
    horasComunes: 0,
    horasAgravadas: 0,
  });
  check(
    "sin horas cargadas, la página igual avisa que no estás obligado (art. 203)",
    r.avisos.some((a) => a.texto.includes("No estás obligado")),
  );
  check(
    "y pide los datos en vez de mostrar ceros como si fueran un resultado",
    r.avisos.some((a) => a.tono === "bloqueante" && a.texto.includes("Cargá")),
  );
  check(
    "la cita del art. 203 conserva la excepción de peligro / fuerza mayor",
    HORAS_EXTRAS_TEXTOS.art203.includes("salvo casos de peligro o accidente ocurrido o inminente"),
  );
}

// ── 10. Fuentes: texto actualizado, texto anterior y decreto, con fecha ────────────────────────
{
  check(
    "está citado el texto ACTUALIZADO de la LCT (id 25552, texact)",
    HORAS_EXTRAS_FUENTES.lista.some(
      (f) => f.url.includes("25552") && f.url.endsWith("texact.htm"),
    ),
  );
  check(
    "está citado el DNU 70/2023 como fuente del texto anterior (la prueba de la inversión)",
    HORAS_EXTRAS_FUENTES.lista.some(
      (f) => f.url.includes("395521") && f.detalle.includes("197 bis"),
    ),
  );
  check(
    "está citado el Decreto 484/2000 (id 63347) como fuente del tope",
    HORAS_EXTRAS_FUENTES.lista.some((f) => f.url.includes("63347")),
  );
  check(
    "está citada la Ley 27.802",
    HORAS_EXTRAS_FUENTES.lista.some(
      (f) => f.nombre.includes("27.802") || f.detalle.includes("27.802"),
    ),
  );
  check(
    "la fecha de consulta es una fecha ISO",
    /^\d{4}-\d{2}-\d{2}$/.test(HORAS_EXTRAS_FUENTES.consultadoEl),
  );
  check("hay al menos 7 cambios mapeados en la tabla", CAMBIOS.length >= 7, CAMBIOS.length);
  check(
    "la tabla marca como PEOR el cambio de quién puede pactar el banco de horas",
    CAMBIOS.some((c) => c.tema.includes("Quién puede pactar") && c.peor === true),
  );
}

// ── El trabajo por equipos: la condición del promedio que la reforma borró (s89) ───────────────
// ANCLA: el cambio del art. 3° inc. b) de la Ley 11.544 (art. 100 de la 27.802) vive FUERA del
// título de la LCT y por eso casi nadie lo publica. Todo su valor está en una oración que
// desapareció: si las dos citas se cruzan o se "resumen", la página deja de mostrar la diferencia.
{
  const T = HORAS_EXTRAS_TEXTOS;
  const condicion = "a condición de que el término medio de las horas de trabajo sobre un período de tres semanas";
  check("el inc. b) ANTERIOR tenía la condición del promedio de tres semanas", T.ley11544Art3IncBAnterior.includes(condicion));
  check("el inc. b) VIGENTE ya no la tiene", !T.ley11544Art3IncBVigente.includes("término medio"), T.ley11544Art3IncBVigente);
  check(
    "los dos textos siguen habilitando prolongar más allá de 8 diarias y 48 semanales",
    /ocho \(?8?\)? ?horas por día/.test(T.ley11544Art3IncBVigente) &&
      /ocho horas por día/.test(T.ley11544Art3IncBAnterior),
  );
  check(
    "la nota de vigencia identifica al art. 100 de la Ley 27.802 y su B.O.",
    T.notaVigencia11544Art3.includes("art. 100 de la Ley N° 27.802") &&
      T.notaVigencia11544Art3.includes("06/03/2026"),
  );
  check(
    "el cambio figura en la tabla de CAMBIOS y está marcado como peor para el trabajador",
    CAMBIOS.some((c) => /equipos/i.test(c.tema) && c.peor),
  );
  check(
    "está citada la Ley 11.544 como fuente",
    HORAS_EXTRAS_FUENTES.lista.some((f) => f.nombre.includes("11.544") && f.url.includes("63368")),
  );
}

if (fallas > 0) {
  console.error(`\n${fallas} check(s) fallaron.`);
  process.exit(1);
}
console.log(
  "\nTodos los checks de horas extras OK (LCT arts. 197 bis, 198, 201 y 203 · Decreto 484/2000).",
);
