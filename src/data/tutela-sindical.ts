// Tutela sindical: qué cobra un delegado gremial despedido sin la exclusión judicial previa.
// Ley 23.551 de asociaciones sindicales, arts. 40, 44 inc. c), 48, 50 y 52, con el texto que les
// dio el TÍTULO XV de la Ley 27.802 (arts. 138 a 148, B.O. 6/3/2026).
//
// POR QUÉ ESTE ARCHIVO EXISTE (22/8/2026, s91). El art. 52 de la Ley 23.551 estuvo escrito igual
// desde 1988: los «Antecedentes Normativos» del texto actualizado de InfoLEG sólo registran los
// arts. 20 bis y 20 ter (Dec. 70/2023), así que los arts. 44 inc. c), 50, 52, 54, 55 y 59 llegaron
// sin una sola modificación hasta el 6/3/2026. Treinta y ocho años de doctrina, jurisprudencia y
// notas escritas sobre un texto que hoy dice otra cosa. Es la regla de s78 en su versión más cara:
// la SERP entera cita el artículo viejo, y las diferencias no son de matiz — cambian quién cobra.
//
// LAS TRES DIFERENCIAS QUE CAMBIAN EL NÚMERO, y ninguna está publicada como cuenta:
//   1. LOS SUPLENTES QUEDARON AFUERA. El art. 52 nuevo dice, textual: «Esta tutela regirá
//      solamente para los delegados o representantes gremiales legalmente electos y que ocupen los
//      cargos de titulares (…) A aquellos que sean designados suplentes no les será aplicable la
//      tutela sindical prevista en la presente ley». El texto viejo no traía esa exclusión. Un
//      suplente despedido cobra la indemnización común y nada más.
//   2. LOS CONGRESALES TIENEN CUPO Y RELOJ. Hasta DOS congresales titulares en grandes empresas y
//      UNO en pymes (Ley 24.467), y sólo «durante el tiempo en que el trabajador asista al
//      congreso en cuestión», con aviso al empleador de las fechas de inicio y conclusión.
//   3. EL CANDIDATO NO ELECTO YA NO ACUMULA. El año extra de remuneraciones sigue estando, pero
//      ahora «no siendo las mismas acumulables a las dispuestas en el artículo 245 bis de la Ley
//      de Contrato de Trabajo». El art. 245 bis (texto de la Ley 27.742) agrava el despido
//      discriminatorio —y enumera expresamente la «opinión política o gremial»— con un 50% de la
//      indemnización del art. 245, que los jueces pueden llevar hasta el 100%. Y ese mismo art.
//      245 bis dice que «no será acumulable con ningún otro régimen especial que establezca
//      agravamientos indemnizatorios». Doble candado: se elige uno de los dos, no se suman.
//
// Y UNA MÁS, del art. 50: la protección de seis meses del postulante ahora CESA si el candidato
// «hubiere obtenido menos del cinco por ciento (5%) de los votos válidos emitidos». Antes sólo
// cesaba por falta de oficialización de la lista.
//
// LO QUE ESTA PÁGINA NO INVENTA: la ley dice «una suma equivalente al importe de las
// remuneraciones». No dice SAC. Si el aguinaldo se suma o no sobre esa indemnización agravada lo
// discuten los tribunales, no la norma: acá NO se suma, y se avisa. Un número inventado con
// apariencia de certeza vale menos que cero.
//
// REGLA DE ORO: estos datos se verifican SOLO contra fuentes oficiales, nunca blogs.

export const TUTELA_FUENTES = {
  consultadoEl: "22 de agosto de 2026",
  lista: [
    {
      nombre: "Ley 23.551 — texto ACTUALIZADO (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/20000-24999/20993/texact.htm",
      detalle:
        "arts. 40, 41, 44 inc. c), 48, 49, 50 y 52 con las sustituciones de la Ley 27.802. Es el texto vigente, distinto del que cita casi toda la web.",
    },
    {
      nombre: "Ley 23.551 — texto ORIGINAL de 1988 (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/20000-24999/20993/norma.htm",
      detalle:
        "el texto que estuvo vigente 38 años y que sigue circulando como si fuera el actual. Se usa acá sólo para mostrar qué cambió.",
    },
    {
      nombre: "Ley 27.802 — Título XV, arts. 138 a 148 (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=423680",
      detalle:
        "las once modificaciones a la ley sindical, publicadas en el B.O. del 6 de marzo de 2026 y vigentes desde ese mismo día.",
    },
    {
      nombre: "Ley de Contrato de Trabajo 20.744 — texto actualizado, art. 245 bis",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "agravamiento por despido discriminatorio (texto de la Ley 27.742): 50% del art. 245, hasta 100% por decisión judicial, no acumulable con otros regímenes especiales.",
    },
  ],
};

/** B.O. de la Ley 27.802: desde este día rige el art. 52 nuevo (art. 217 de la ley). */
export const REFORMA_PUBLICADA_ISO = "2026-03-06";
export const REFORMA_PUBLICADA = "6 de marzo de 2026";

/**
 * Art. 48, párrafo final (NO modificado por la reforma): los representantes sindicales en la
 * empresa no pueden ser despedidos «durante el tiempo que dure el ejercicio de su mandato y hasta
 * un año más». Ese año es el «año de estabilidad posterior» que el art. 52 manda pagar.
 */
export const MESES_ESTABILIDAD_POSTERIOR = 12;

/** Art. 50: la tutela del postulante dura seis meses desde la notificación fehaciente. */
export const MESES_TUTELA_POSTULANTE = 6;

/** Art. 50: por debajo de este porcentaje de votos válidos, la protección del postulante cesa. */
export const PISO_VOTOS_POSTULANTE = 0.05;

/** Art. 52: el año extra de remuneraciones del candidato no electo. */
export const MESES_EXTRA_CANDIDATO_NO_ELECTO = 12;

/** Art. 44 inc. c): crédito de horas mensuales retribuidas del delegado (techo legal nuevo). */
export const HORAS_MENSUALES_DELEGADO = 10;

/** Art. 52: cupo de congresales titulares con tutela, por tamaño de empresa (Ley 24.467). */
export const CONGRESALES_CON_TUTELA = { grande: 2, pyme: 1 } as const;

/** Art. 245 bis LCT: piso y techo del agravamiento por despido discriminatorio. */
export const ART245BIS_PISO = 0.5;
export const ART245BIS_TECHO = 1.0;

/** Art. 52: horas hábiles para avisar al Ministerio si se libera de prestar servicios. */
export const HORAS_AVISO_LIBERACION = 48;

/** Art. 52: plazo de caducidad para promover la acción declarativa del art. 78 LCT. */
export const DIAS_CADUCIDAD_ACCION = 10;

export type RolSindical = "titular" | "candidato-no-electo" | "congresal" | "suplente";

/**
 * LOS CUATRO CASOS, Y LOS DOS QUE LA LEY CUANTIFICA.
 *
 * El art. 52 fija un importe para exactamente DOS supuestos: el del «trabajador con cargo de
 * delegado de personal o titular en la organización sindical» y el del «candidato no electo».
 * Para el congresal describe el alcance de la tutela pero no lo incluye en la cláusula que fija
 * el pago; para el suplente dice directamente que la tutela no le es aplicable. Esta calculadora
 * hace la cuenta de los dos primeros y, en los otros dos, dice qué falta en vez de inventarlo.
 */
export const ROLES: Array<{
  id: RolSindical;
  etiqueta: string;
  descripcion: string;
  /** ¿El art. 52 le fija un importe? */
  cuantificado: boolean;
}> = [
  {
    id: "titular",
    etiqueta: "Delegado de personal o titular en la organización sindical",
    descripcion:
      "Electo en comicios del art. 41, en un cargo titular, con la designación comunicada al empleador (art. 49). El art. 52 le reconoce, además de las indemnizaciones por despido, «las remuneraciones que le hubieren correspondido durante el tiempo faltante del mandato y el año de estabilidad posterior».",
    cuantificado: true,
  },
  {
    id: "candidato-no-electo",
    etiqueta: "Candidato no electo (se postuló y perdió la elección)",
    descripcion:
      "Cobra las indemnizaciones, «las remuneraciones imputables al período de tutela aún no agotado» de los seis meses del art. 50 y «un (1) año más de remuneraciones» — que ya no se acumula con el art. 245 bis de la LCT.",
    cuantificado: true,
  },
  {
    id: "congresal",
    etiqueta: "Congresal titular (hasta 2 en grandes empresas, 1 en pymes)",
    descripcion:
      "El art. 52 le reconoce la tutela «exclusivamente durante el tiempo en que el trabajador asista al congreso en cuestión», avisando al empleador el inicio y la conclusión. Pero no lo incluye en la cláusula que fija el importe del despido indirecto: la ley no le pone número.",
    cuantificado: false,
  },
  {
    id: "suplente",
    etiqueta: "Delegado suplente",
    descripcion:
      "El art. 52 con el texto de la Ley 27.802 lo excluye expresamente: «A aquellos que sean designados suplentes no les será aplicable la tutela sindical prevista en la presente ley». Cobra la indemnización común y nada más.",
    cuantificado: false,
  },
];

/**
 * Textos VERBATIM. Se guardan enteros a propósito: el valor de la página es que se pueda leer el
 * artículo vigente al lado del que cita todo el mundo, sin intermediarios.
 */
export const TEXTOS = {
  art52Nuevo:
    "Los trabajadores amparados por las garantías previstas en los artículos 40, 48 y 50 de la presente ley, no podrán ser suspendidos, despedidos ni con relación a ellos podrán modificarse las condiciones de trabajo, en los términos y con los alcances que definen las citadas normas, si no mediare resolución judicial previa que los excluya de la garantía, conforme al procedimiento establecido en el artículo 47. El juez o tribunal interviniente, a pedido el empleador, dentro del plazo de cinco (5) días podrá disponer la suspensión de la prestación laboral con el carácter de medida cautelar, cuando la permanencia del cuestionado en su puesto o en mantenimiento de las condiciones de trabajo pudiere ocasionar peligro potencial para la seguridad de las personas o bienes de la empresa o el funcionamiento normal de esta. Esta tutela regirá solamente para los delegados o representantes gremiales legalmente electos y que ocupen los cargos de titulares y para hasta dos (2) congresales titulares en grandes empresas y un (1) congresal titular en las pymes en los términos de la ley 24.467 y sus modificatorias. En este último caso la tutela solo podrá ser invocada exclusivamente durante el tiempo en que el trabajador asista al congreso en cuestión, debiendo notificar al empleador la fecha de inicio y conclusión del mismo. A aquellos que sean designados suplentes no les será aplicable la tutela sindical prevista en la presente ley. La violación por parte del empleador de las garantías establecidas en los artículos citados en el párrafo anterior, dará derecho al afectado a demandar judicialmente, por vía sumarísima, la reinstalación en su puesto, con más los salarios caídos durante la tramitación judicial, o el restablecimiento de las condiciones de trabajo. Si se decidiere la reinstalación del trabajador, el juez podrá aplicar al empleador que no cumpliere con la decisión firme, las disposiciones del artículo 804 del Código Civil y Comercial de la Nación, durante el período de vigencia de su tutela sindical. El trabajador con cargo de delegado de personal o titular en la organización sindical con personería gremial representativa en el ámbito personal y territorial, salvo que se trate de un candidato no electo, podrá optar por considerar extinguido el vínculo laboral en virtud de la decisión del empleador, colocándose en situación de despido indirecto, en cuyo caso tendrá derecho a percibir, además de indemnizaciones por despido, una suma equivalente al importe de las remuneraciones que le hubieren correspondido durante el tiempo faltante del mandato y el año de estabilidad posterior. Si el trabajador fuese un candidato no electo tendrá derecho a percibir, además de las indemnizaciones y de las remuneraciones imputables al período de tutela aún no agotado, el importe de un (1) año más de remuneraciones, no siendo las mismas acumulables a las dispuestas en el artículo 245 bis de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificatorias. La promoción de las acciones por reinstalación o por restablecimiento de las condiciones de trabajo a las que refieren los párrafos anteriores interrumpe la prescripción de las acciones por cobro de indemnización y salarios caídos allí previstas. El curso de la prescripción comenzará una vez que recayere pronunciamiento firme en cualquiera de los supuestos. En cualquier caso, el empleador podrá liberar de prestar servicios al trabajador amparado por las garantías previstas en los artículos 40, 48 o 50 de la ley, en cuyo caso deberá comunicarlo, dentro de las cuarenta y ocho (48) horas hábiles, al Ministerio de Capital Humano y mantener el cumplimiento de la totalidad de los deberes que la ley o convenciones colectivas ponen a su cargo como consecuencia de la relación laboral. En este supuesto, dentro del plazo de caducidad de diez (10) días de ocurridos los hechos en que funda su decisión, deberá promover ante el juez competente acción declarativa para que se compruebe la concurrencia de los motivos fundados que autoriza el artículo 78 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificatorias o, en su caso, requerir la exclusión de la garantía con el alcance que justifique la causa que invoque.",

  art52Viejo:
    "Los trabajadores amparados por las garantías previstas en los artículos 40, 48 y 50 de la presente ley, no podrán ser suspendidos, despedidos ni con relación a ellos podrán modificarse las condiciones de trabajo, si no mediare resolución judicial previa que los excluya de la garantía, conforme al procedimiento establecido en el artículo 47. El juez o tribunal interviniente, a pedido el empleador, dentro del plazo de cinco (5) días podrá disponer la suspensión de la prestación laboral con el carácter de medida cautelar, cuando la permanencia del cuestionado en su puesto o en mantenimiento de las condiciones de trabajo pudiere ocasionar peligro para la seguridad de las personas o bienes de la empresa. La violación por parte del empleador de las garantías establecidas en los artículos citados en el párrafo anterior, dará derecho al afectado a demandar judicialmente, por vía sumarísima, la reinstalación de su puesto, con más los salarios caídos durante la tramitación judicial, o el restablecimiento de las condiciones de trabajo. Si se decidiere la reinstalación, el juez podrá aplicar al empleador que no cumpliere con la decisión firme, las disposiciones del artículo 666 bis del Código Civil, durante el período de vigencia de su estabilidad. El trabajador, salvo que se trate de un candidato no electo, podrá optar por considerar extinguido el vínculo laboral en virtud de la decisión del empleador, colocándose en situación de despido indirecto, en cuyo caso tendrá derecho a percibir, además de indemnizaciones por despido, una suma equivalente al importe de las remuneraciones que le hubieren correspondido durante el tiempo faltante del mandato y el año de estabilidad posterior. Si el trabajador fuese un candidato no electo tendrá derecho a percibir, además de las indemnizaciones y de las remuneraciones imputables al período de estabilidad aún no agotado, el importe de un año más de remuneraciones. La promoción de las acciones por reinstalación o por restablecimiento de las condiciones de trabajo a las que refieren los párrafos anteriores interrumpe la prescripción de las acciones por cobro de indemnización y salarios caídos allí previstas. El curso de la prescripción comenzará una vez que recayere pronunciamiento firme en cualquiera de los supuestos.",

  art50Nuevo:
    "A partir de la notificación fehaciente al empleador de su postulación para un cargo de representación sindical, cualquiera sea dicha representación y por el término de seis (6) meses, el trabajador no podrá ser despedido ni suspendido sin justa causa, ni modificadas sus condiciones de trabajo, salvo que mediare una reorganización total del establecimiento o sector. Esta protección cesará para aquellos trabajadores cuya postulación no hubiere sido oficializada según el procedimiento electoral aplicable desde el momento de determinarse definitivamente dicha falta de oficialización y/o que el candidato hubiere obtenido menos del cinco por ciento (5%) de los votos válidos emitidos. La asociación sindical deberá comunicar al empleador el nombre de los postulantes; lo propio podrán hacer los candidatos.",

  art50Viejo:
    "A partir de su postulación para un cargo de representación sindical, cualquiera sea dicha representación, el trabajador no podrá ser despedido, suspendido sin justa causa, ni modificadas sus condiciones de trabajo, por el término de seis (6) meses. Esta protección cesará para aquellos trabajadores para cuya postulación no hubiere sido oficializada según el procedimiento electoral aplicable y desde el momento de determinarse definitivamente dicha falta de oficialización. La asociación sindical deberá comunicar al empleador el nombre de los postulantes; lo propio podrán hacer los candidatos.",

  art48:
    "Los representantes sindicales en la empresa elegidos de conformidad con lo establecido en el artículo 41 de la presente ley continuarán prestando servicios y no podrán ser suspendidos, modificadas sus condiciones de trabajo, ni despedidos durante el tiempo que dure el ejercicio de su mandato y hasta un año más, salvo que mediare justa causa.",

  art44cNuevo:
    "Conceder a cada uno de los delegados del personal, para el ejercicio de sus funciones un crédito de hasta diez (10) horas mensuales retribuidas, salvo que el convenio colectivo aplicable disponga una cantidad mayor. El ejercicio de este derecho no podrá generar la interrupción de actividades en el área de trabajo.",

  art44cViejo:
    "conceder a cada uno de los delegados del personal, para el ejercicio de sus funciones, un crédito de horas mensuales retribuidas de conformidad con lo que se disponga en la convención colectiva aplicable.",

  art245bis:
    "Agravamiento indemnizatorio por despido motivado por un acto discriminatorio. Será considerado despido por un acto de discriminación aquel originado por motivos de raza o etnia, religión, nacionalidad, ideología, opinión política o gremial, sexo o género, orientación sexual, posición económica, caracteres físicos o discapacidad. En este supuesto la prueba estará a cargo de quien invoque la causal, y en caso de sentencia judicial que corrobore el origen discriminatorio del despido, corresponderá el pago de una indemnización agravada especial que ascenderá a un monto equivalente al cincuenta por ciento (50%) de la establecida por el artículo 245 de la ley 20.744 (t.o. 1976) y sus modificatorias o de la indemnización por antigüedad del régimen especial aplicable al caso. Según la gravedad de los hechos, los jueces podrán incrementar esta indemnización hasta el cien por ciento (100%), conforme los parámetros referidos anteriormente. La indemnización prevista en el presente artículo no será acumulable con ningún otro régimen especial que establezca agravamientos indemnizatorios. El despido dispuesto, en todos los casos, producirá la extinción definitiva del vínculo laboral a todos los efectos.",
};

/**
 * Lo que cambió, artículo por artículo. Cada fila es una diferencia verificada entre el texto
 * original de 1988 y el vigente desde el 6/3/2026, con su consecuencia en plata.
 */
export const CAMBIOS = [
  {
    articulo: "Art. 52 — a quién ampara la tutela",
    antes:
      "No traía una lista cerrada: la garantía se leía junto con los arts. 40, 48 y 50, sin excluir a nadie por ser suplente.",
    ahora:
      "«Esta tutela regirá solamente para los delegados o representantes gremiales legalmente electos y que ocupen los cargos de titulares», más hasta 2 congresales titulares en grandes empresas y 1 en pymes. «A aquellos que sean designados suplentes no les será aplicable la tutela sindical».",
    plata: "Un suplente despedido pasa a cobrar la indemnización común, sin el agravamiento.",
  },
  {
    articulo: "Art. 52 — el congresal",
    antes: "La ley no mencionaba a los congresales ni ponía cupo.",
    ahora:
      "Cupo de 2 (grandes empresas) o 1 (pymes, Ley 24.467), y la tutela «solo podrá ser invocada exclusivamente durante el tiempo en que el trabajador asista al congreso», avisando al empleador el inicio y la conclusión.",
    plata:
      "Fuera de esos días, el congresal está en la misma situación que cualquier otro trabajador.",
  },
  {
    articulo: "Art. 52 — el candidato no electo",
    antes:
      "«Además de las indemnizaciones y de las remuneraciones imputables al período de estabilidad aún no agotado, el importe de un año más de remuneraciones», sin regla de acumulación.",
    ahora:
      "Lo mismo, pero «no siendo las mismas acumulables a las dispuestas en el artículo 245 bis de la Ley de Contrato de Trabajo».",
    plata:
      "Si además hubo despido discriminatorio por motivo gremial, no se suman los dos agravamientos: se elige el que convenga.",
  },
  {
    articulo: "Art. 52 — la salida del empleador",
    antes:
      "La cautelar procedía si la permanencia «pudiere ocasionar peligro para la seguridad de las personas o bienes de la empresa».",
    ahora:
      "Se amplía a «peligro potencial» y agrega «o el funcionamiento normal de esta». Y aparece la opción de liberar de prestar servicios avisando al Ministerio de Capital Humano en 48 horas hábiles, con 10 días de caducidad para promover la acción declarativa del art. 78 LCT.",
    plata:
      "El empleador tiene una salida procesal más ancha, con plazos cortos que corren contra él si no los usa.",
  },
  {
    articulo: "Art. 50 — la protección del postulante",
    antes:
      "Corría «a partir de su postulación» y sólo cesaba si la lista no se oficializaba. No preveía la reorganización del establecimiento.",
    ahora:
      "Corre desde la «notificación fehaciente al empleador», cede ante «una reorganización total del establecimiento o sector» y cesa además si «el candidato hubiere obtenido menos del cinco por ciento (5%) de los votos válidos emitidos».",
    plata:
      "Un candidato que sacó menos del 5% pierde la protección y, con ella, el agravamiento del art. 52.",
  },
  {
    articulo: "Art. 44 inc. c) — las horas del delegado",
    antes:
      "«Un crédito de horas mensuales retribuidas de conformidad con lo que se disponga en la convención colectiva aplicable», sin techo legal.",
    ahora:
      "«Un crédito de hasta diez (10) horas mensuales retribuidas, salvo que el convenio colectivo aplicable disponga una cantidad mayor», y no puede interrumpir actividades.",
    plata:
      "El convenio sigue pudiendo dar más horas; lo que cambia es el piso de discusión cuando el convenio calla.",
  },
];
