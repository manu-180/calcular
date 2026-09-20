// Día del Empleado de Comercio — Ley 26.541 y el traslado que acuerdan las partes cada año.
//
// LO QUE CASI NADIE PUBLICA: el día NO es un feriado nacional, pero el art. 2 de la Ley 26.541
// lo asimila "a los feriados nacionales a todos los efectos legales". Esa asimilación es la que
// manda: por eso se paga con el art. 166 de la LCT (doble si se trabaja) y por eso arrastra la
// condición del art. 168, que es el detalle que decide quién lo cobra y que casi ninguna nota
// menciona.
//
// LO QUE NO SE DERIVA: la fecha efectiva. La ley fija el 26 de septiembre, pero cuando cae fin
// de semana las partes firmantes del CCT 130/75 (FAECYS + CAC + CAME + UDECA) lo trasladan por
// acuerdo, en uso de su autonomía colectiva. NO hay regla de traslado como la del art. 6 de la
// Ley 27.399: cada año sale una circular. Si un año no está en TRASLADOS_POR_ANIO es que la
// circular no salió todavía — la página lo dice en vez de suponer una fecha.

export const LEY_DIA_COMERCIO = {
  nombre: "Ley 26.541 — Día del Empleado de Comercio",
  url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/160000-164999/161502/norma.htm",
  sancion: "11 de noviembre de 2009",
  /** Fecha que fija el art. 1, todos los años. */
  mes: 9,
  dia: 26,
  art1: "Establécese como descanso para los empleados de comercio, el día 26 de septiembre de cada año, en que se conmemora el «Día del Empleado de Comercio».",
  art2: "En dicho día los empleados de comercio no prestarán labores, asimilándose el mismo a los feriados nacionales a todos los efectos legales.",
  consultadoEl: "2026-09-20",
};

export type TrasladoDiaComercio = {
  /** Fecha efectiva ISO en la que se conmemora ese año. */
  fecha: string;
  /** Por qué se movió: la fecha de la ley cayó en un día que las partes decidieron correr. */
  motivo: string;
  circular: { nombre: string; url: string; firmadaEl: string };
  /** Cláusulas propias del acuerdo que no salen de la ley. */
  aclaraciones: string[];
};

export const TRASLADOS_POR_ANIO: Record<number, TrasladoDiaComercio> = {
  2026: {
    fecha: "2026-09-28",
    motivo: "el 26 de septiembre de 2026 cae sábado",
    circular: {
      nombre:
        "Circular FAECYS del 7/9/2026 — traslado del Día del Empleado de Comercio (FAECYS, CAC, CAME y UDECA)",
      url: "https://www.faecys.org.ar/faecys/wp-content/uploads/2026/08/CIRCULAR-TRASLADO-DIA-DEL-GREMIO-SEPTIEMBRE-2026.pdf",
      firmadaEl: "2026-09-07",
    },
    aclaraciones: [
      "El traslado lo acuerdan las partes del CCT 130/75 en uso de su autonomía colectiva, no una norma del Poder Ejecutivo.",
      "El lunes en que se conmemora NO se puede otorgar como franco compensatorio del descanso semanal: es un día aparte del franco que ya corresponde.",
      "Se traslada con todos los alcances de la Ley 26.541, así que el lunes es el día asimilado a feriado nacional.",
    ],
  },
};

/** Las reglas de pago salen de la LCT porque el art. 2 de la Ley 26.541 asimila el día a feriado. */
export const LCT_FERIADOS = {
  url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
  consultadoEl: "2026-09-20",
  art166:
    "En los días feriados nacionales rigen las normas legales sobre el descanso dominical. En dichos días los trabajadores que no gozaren de la remuneración respectiva percibirán el salario correspondiente a los mismos, aún cuando coincidan en domingo. En caso que presten servicios en tales días, cobrarán la remuneración normal de los días laborables más una cantidad igual.",
  art168:
    "Los trabajadores tendrán derecho a percibir la remuneración indicada en el artículo 166, párrafo primero, siempre que hubiesen trabajado a las órdenes de un mismo empleador cuarenta y ocho (48) horas o seis (6) jornadas dentro del término de diez (10) días hábiles anteriores al feriado. Igual derecho tendrán los que hubiesen trabajado la víspera hábil del día feriado y continuaran trabajando en cualquiera de los cinco (5) días hábiles subsiguientes.",
  art169:
    "Para liquidar las remuneraciones se tomará como base de su cálculo lo dispuesto en el artículo 155. Si se tratase de personal a destajo, se tomará como salario base el promedio de lo percibido en los seis (6) días de trabajo efectivo inmediatamente anteriores al feriado, o el que corresponde al menor número de días trabajados. En el caso de trabajadores remunerados por otra forma variable, la determinación se efectuará tomando como base el promedio percibido en los treinta (30) días inmediatamente anteriores al feriado.",
};

/** El día efectivo de un año, o `null` si todavía no hay circular de traslado y la fecha legal cae fin de semana. */
export function diaEfectivo(anio: number): { fecha: string; trasladado: boolean } | null {
  const traslado = TRASLADOS_POR_ANIO[anio];
  if (traslado) return { fecha: traslado.fecha, trasladado: true };

  const legal = new Date(Date.UTC(anio, LEY_DIA_COMERCIO.mes - 1, LEY_DIA_COMERCIO.dia));
  const finDeSemana = legal.getUTCDay() === 0 || legal.getUTCDay() === 6;
  // Cae en semana: rige la fecha de la ley, no hace falta acuerdo. Cae fin de semana y no hay
  // circular: NO inventamos el lunes siguiente — el traslado no es automático.
  return finDeSemana ? null : { fecha: legal.toISOString().slice(0, 10), trasladado: false };
}
