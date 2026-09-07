// Verificación de las licencias por maternidad y paternidad (src/data/licencias.ts + src/lib/licencias.ts).
// Correr con: npx tsx scripts/check_licencias.ts
//
// LO QUE IMPORTA ACÁ NO SON MONTOS SINO FECHAS, y las fechas se corren un día con una facilidad
// brutal. Los checks fuertes son tres:
//   1. Los dos tramos SIEMPRE suman 90 días, en cualquier reparto (invariante del art. 177).
//   2. El tramo previo termina el día anterior al parto y el posterior arranca el día del parto:
//      el día del parto no se cuenta dos veces ni se pierde.
//   3. Toda la aritmética es en UTC — el mismo cálculo tiene que dar igual sin importar la zona
//      horaria del proceso. Se verifica con casos que cruzan cambios de mes, de año y un 29/2.

import {
  ANTIGUEDAD_MINIMA_MESES,
  ESTABILIDAD,
  EXCEDENCIA,
  LACTANCIA,
  LICENCIAS_FUENTES,
  MATERNIDAD,
  PATERNIDAD,
} from "../src/data/licencias";
import {
  aISO,
  acotarDiasAntes,
  calcularMaternidad,
  calcularPaternidad,
  diasEntre,
  fechaLarga,
  mesesDeAntiguedad,
  parseFechaISO,
  sumarDias,
  sumarMeses,
} from "../src/lib/licencias";

let fallas = 0;
function check(nombre: string, cond: boolean, detalle?: unknown) {
  if (cond) {
    console.log(`OK   ${nombre}`);
  } else {
    fallas++;
    console.error(`FAIL ${nombre}`, detalle ?? "");
  }
}

// ===========================================================================
// 1 · Los plazos son los del texto vigente de la LCT
// ===========================================================================
check("maternidad: 45 + 45 = 90 (art. 177)", MATERNIDAD.diasAntes + MATERNIDAD.diasDespues === MATERNIDAD.diasTotal);
check("el piso del tramo previo es 10 días, no 15", MATERNIDAD.diasAntesMinimo === 10);
check("licencia por nacimiento: 2 días corridos (art. 158 inc. a)", PATERNIDAD.dias === 2 && PATERNIDAD.corridos);
check("el art. 160 garantiza un día hábil", PATERNIDAD.garantizaDiaHabil);
check("excedencia de 3 a 6 meses (art. 183 inc. c)", EXCEDENCIA.mesesMinimo === 3 && EXCEDENCIA.mesesMaximo === 6);
check("estabilidad: 7,5 meses antes y después (art. 178)", ESTABILIDAD.mesesPresuncion === 7.5);
check("indemnización especial: un año de remuneraciones (art. 182)", ESTABILIDAD.remuneracionesIndemnizacionEspecial === 13);
check("antigüedad mínima de 3 meses (art. 11 Ley 24.714)", ANTIGUEDAD_MINIMA_MESES === 3);
check("lactancia: 2 descansos de 30 minutos por un año (art. 179)", LACTANCIA.descansosPorDia === 2 && LACTANCIA.minutosCadaUno === 30 && LACTANCIA.mesesDesdeElNacimiento === 12);

// ===========================================================================
// 2 · Parseo de fechas: lo que no es una fecha no se convierte en una
// ===========================================================================
check("una fecha válida se parsea", aISO(parseFechaISO("2026-08-09")!) === "2026-08-09");
check("el 29 de febrero de un bisiesto es válido", parseFechaISO("2028-02-29") !== null);
check("el 29 de febrero de un NO bisiesto se rechaza", parseFechaISO("2026-02-29") === null);
check("el 31 de abril se rechaza", parseFechaISO("2026-04-31") === null);
check("el mes 13 se rechaza", parseFechaISO("2026-13-01") === null);
check("un formato distinto se rechaza", parseFechaISO("09/08/2026") === null);
check("una cadena vacía se rechaza", parseFechaISO("") === null);

// ===========================================================================
// 3 · Aritmética de meses y antigüedad
// ===========================================================================
check("sumar meses: 31/1 + 1 mes cae en el último día de febrero", aISO(sumarMeses(parseFechaISO("2026-01-31")!, 1)) === "2026-02-28");
check("sumar meses hacia atrás cruza el año", aISO(sumarMeses(parseFechaISO("2026-02-15")!, -7)) === "2025-07-15");
check("antigüedad: mismo día del mes cuenta el mes completo", mesesDeAntiguedad(parseFechaISO("2026-05-10")!, parseFechaISO("2026-08-10")!) === 3);
check("antigüedad: un día antes no cuenta el mes", mesesDeAntiguedad(parseFechaISO("2026-05-10")!, parseFechaISO("2026-08-09")!) === 2);
check("antigüedad cruzando el año", mesesDeAntiguedad(parseFechaISO("2025-11-01")!, parseFechaISO("2026-08-01")!) === 9);

// ===========================================================================
// 4 · El invariante de los 90 días — el check que importa
// ===========================================================================
{
  let todosSuman90 = true;
  let elParteAguas = true;
  let detalle = "";
  for (let dias = MATERNIDAD.diasAntesMinimo; dias <= MATERNIDAD.diasAntes; dias++) {
    const r = calcularMaternidad({ fechaParto: "2026-11-20", diasAntes: dias, brutoMensual: 0 })!;
    if (r.diasAntes + r.diasDespues !== MATERNIDAD.diasTotal) {
      todosSuman90 = false;
      detalle = `${dias} → ${r.diasAntes}+${r.diasDespues}`;
    }
    // El período completo, contando ambos extremos, son exactamente 90 días.
    if (diasEntre(r.inicio, r.fin) + 1 !== MATERNIDAD.diasTotal) {
      todosSuman90 = false;
      detalle = `${dias} → ${aISO(r.inicio)}..${aISO(r.fin)}`;
    }
    // El tramo previo termina el día anterior al parto: el día del parto abre el tramo posterior.
    if (diasEntre(r.inicio, r.parto) !== r.diasAntes) {
      elParteAguas = false;
      detalle = `${dias} → inicio ${aISO(r.inicio)} vs parto ${aISO(r.parto)}`;
    }
  }
  check(`los ${MATERNIDAD.diasTotal} días se conservan en los 36 repartos posibles`, todosSuman90, detalle);
  check("el día del parto abre el tramo posterior y no se cuenta dos veces", elParteAguas, detalle);
}

check("por debajo del mínimo se acota a 10", acotarDiasAntes(3) === MATERNIDAD.diasAntesMinimo);
check("por encima del máximo se acota a 45", acotarDiasAntes(60) === MATERNIDAD.diasAntes);
check("un valor no numérico cae en el régimen general", acotarDiasAntes(NaN) === MATERNIDAD.diasAntes);

// ===========================================================================
// 5 · Casos completos calculados a mano
// ===========================================================================
{
  // Régimen general con un parto que cruza el fin de año.
  const r = calcularMaternidad({ fechaParto: "2026-12-25", diasAntes: 45, brutoMensual: 1_200_000 })!;
  check("caso general · inicio = parto - 45", aISO(r.inicio) === "2026-11-10", aISO(r.inicio));
  // El día 45 del tramo posterior es el parto + 44: 6 días de diciembre, 31 de enero y 7 de febrero.
  check("caso general · fin = parto + 44", aISO(r.fin) === "2027-02-07", aISO(r.fin));
  check("caso general · reintegro al día siguiente", aISO(r.reintegro) === "2027-02-08", aISO(r.reintegro));
  check("caso general · la asignación mensual es el bruto", r.asignacionMensual === 1_200_000);
  check("caso general · el total son 3 meses de bruto", r.asignacionTotal === 3_600_000, r.asignacionTotal);
  check("caso general · estabilidad desde 7 meses y 15 días antes", aISO(r.estabilidadDesde) === "2026-05-10", aISO(r.estabilidadDesde));
  check("caso general · estabilidad hasta 7 meses y 15 días después", aISO(r.estabilidadHasta) === "2027-08-09", aISO(r.estabilidadHasta));

  // Reparto extremo: 10 antes, 80 después.
  const extremo = calcularMaternidad({ fechaParto: "2026-12-25", diasAntes: 10, brutoMensual: 0 })!;
  check("reparto extremo · 10 días antes", extremo.diasAntes === 10);
  check("reparto extremo · 80 días después", extremo.diasDespues === 80);
  check("reparto extremo · inicio 10 días antes del parto", aISO(extremo.inicio) === "2026-12-15", aISO(extremo.inicio));
  check(
    "reparto extremo · avisa que el mínimo es 10 y no 15",
    extremo.avisos.some((a) => a.tono === "ok" && /10/.test(a.texto)),
  );

  // Un parto que cae justo después de un 29 de febrero.
  const bisiesto = calcularMaternidad({ fechaParto: "2028-03-01", diasAntes: 45, brutoMensual: 0 })!;
  check("bisiesto · el tramo previo cruza el 29 de febrero", aISO(bisiesto.inicio) === "2028-01-16", aISO(bisiesto.inicio));
  check("bisiesto · el período completo sigue siendo de 90 días", diasEntre(bisiesto.inicio, bisiesto.fin) + 1 === 90);
}

// ===========================================================================
// 6 · Antigüedad insuficiente: bloquea el pago, no la licencia
// ===========================================================================
{
  const corta = calcularMaternidad({
    fechaParto: "2026-10-01",
    diasAntes: 45,
    brutoMensual: 900_000,
    fechaIngreso: "2026-09-01",
  })!;
  check("antigüedad de 1 mes se detecta", corta.antiguedadMeses === 1);
  check(
    "antigüedad insuficiente es bloqueante",
    corta.avisos.some((a) => a.tono === "bloqueante"),
  );
  check(
    "el aviso distingue la licencia del pago de ANSES",
    corta.avisos.some((a) => a.tono === "bloqueante" && /24\.714/.test(a.texto)),
  );

  const suficiente = calcularMaternidad({
    fechaParto: "2026-10-01",
    diasAntes: 45,
    brutoMensual: 900_000,
    fechaIngreso: "2026-01-01",
  })!;
  check(
    "con antigüedad suficiente no hay bloqueo",
    !suficiente.avisos.some((a) => a.tono === "bloqueante"),
  );
  check("la fecha del cálculo no cambia el resultado de las fechas", aISO(suficiente.inicio) === aISO(corta.inicio));
}

check("una fecha de parto inválida devuelve null", calcularMaternidad({ fechaParto: "2026-02-30", diasAntes: 45, brutoMensual: 0 }) === null);
check("un bruto negativo no genera una asignación negativa", calcularMaternidad({ fechaParto: "2026-10-01", diasAntes: 45, brutoMensual: -100 })!.asignacionTotal === 0);

// ===========================================================================
// 7 · Licencia por nacimiento y la regla del día hábil
// ===========================================================================
{
  // 2026-08-08 es sábado: los dos días corridos caen sábado y domingo.
  const finde = calcularPaternidad("2026-08-08")!;
  check("nacimiento en sábado · el segundo día es domingo", aISO(finde.fin) === "2026-08-09");
  check("nacimiento en sábado · se detecta el domingo (art. 160)", finde.caeEnDomingo);

  const semana = calcularPaternidad("2026-08-11")!;
  check("nacimiento en martes · termina el miércoles", aISO(semana.fin) === "2026-08-12");
  check("nacimiento en martes · no hay domingo en el medio", !semana.caeEnDomingo);
  check("una fecha inválida devuelve null", calcularPaternidad("no-es-fecha") === null);
}

// ===========================================================================
// 8 · Formato de fechas: legible y sin dependencia del locale del proceso
// ===========================================================================
check(
  "fechaLarga escribe el día de la semana en español",
  fechaLarga(parseFechaISO("2026-08-09")!) === "domingo 9 de agosto de 2026",
  fechaLarga(parseFechaISO("2026-08-09")!),
);
check(
  "sumar días no se corre por horario de verano",
  aISO(sumarDias(parseFechaISO("2026-03-01")!, -1)) === "2026-02-28",
);

// ===========================================================================
// 9 · Higiene de fuentes
// ===========================================================================
check(
  "todas las fuentes tienen URL oficial",
  LICENCIAS_FUENTES.lista.every((f) =>
    /^https:\/\/(www\.)?(boletinoficial|servicios\.infoleg|infoleg|argentina|anses)\.gob\.ar\//.test(f.url),
  ),
  LICENCIAS_FUENTES.lista.map((f) => f.url),
);
check("están citadas la LCT y la Ley 24.714", ["20.744", "24.714"].every((n) => LICENCIAS_FUENTES.lista.some((f) => f.nombre.includes(n))));
check("la fecha de consulta es una fecha ISO", /^\d{4}-\d{2}-\d{2}$/.test(LICENCIAS_FUENTES.consultadoEl));

console.log("");
if (fallas > 0) {
  console.error(`\n${fallas} CHECK(S) FALLARON`);
  process.exit(1);
} else {
  console.log("Todos los checks de licencias por maternidad y paternidad OK.");
}
