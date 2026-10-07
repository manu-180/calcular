// Periodistas: las indemnizaciones del art. 43 de la Ley 12.908 (Estatuto del Periodista
// Profesional) — y el 1° de enero de 2027, día en que el estatuto entero deja de existir.
//
// POR QUÉ ESTE ARCHIVO EXISTE (23/8/2026, s92). El art. 197 de la Ley 27.802 —Título XXVI,
// Derogaciones— dice, completo: «Derógase la ley 12.908 y sus modificatorias, a partir del 1º de
// enero de 2027». Es la misma jugada que con los viajantes de comercio (art. 198): no queda un
// texto nuevo que contradiga al viejo, queda un vacío con fecha. Desde ese día un periodista
// despedido cobra lo que cobra cualquier trabajador de la LCT.
//
// Y la regla de s91 aplicada al estatuto: sus «Antecedentes Normativos» registran que el art. 43
// fue sustituido en 1960 (Ley 15.532) y por última vez por el art. 1° de la Ley 16.792, publicada
// el 21 de diciembre de 1965. SESENTA AÑOS con el mismo texto — y los tres importes que fija son
// muy superiores a los de la LCT, así que la diferencia que se pierde es enorme y está sin
// publicar como cuenta.
//
// LOS TRES IMPORTES DEL ART. 43, y por qué no se parecen a la LCT:
//   inc. b) INDEMNIZACIÓN SUSTITUTIVA DEL PREAVISO: «dos o cuatro meses de retribución» según la
//           antigüedad sea menor o mayor de tres años. En la LCT es un mes (hasta 5 años de
//           antigüedad) o dos: acá es el DOBLE del preaviso del propio estatuto, que es de uno o
//           dos meses (inc. a). No es un error de lectura: el inciso a) fija el plazo del aviso y
//           el b) fija lo que se paga por no darlo, y son cifras distintas.
//   inc. c) ANTIGÜEDAD: un mes de sueldo por año o fracción mayor de tres meses, «en ningún caso
//           inferior a dos meses». Se parece al art. 245 de la LCT, con dos diferencias: el piso
//           es de DOS meses (no uno) y el estatuto NO tiene tope de convenio.
//   inc. d) INDEMNIZACIÓN ESPECIAL: «seis meses de sueldo», «haya o no mediado preaviso». No
//           existe nada equivalente en la LCT. Es el rubro que más pesa y el primero que
//           desaparece.
//   inc. e) LA BASE: «el promedio que resulte de lo percibido por el dependiente en los últimos
//           seis meses», con extras, comisiones, viáticos (salvo la parte gastada y acreditada
//           con comprobantes), gratificaciones y pagos en especie. No es la «mejor remuneración
//           mensual, normal y habitual» del art. 245: es un promedio.
//
// LO QUE ESTA PÁGINA NO INVENTA: el art. 43 dice «menor o mayor tres años» y no resuelve el día
// exacto del tercer aniversario. La calculadora aplica el tramo alto cuando la antigüedad SUPERA
// los tres años y lo avisa cuando cae justo en el aniversario, en vez de tapar el hueco. Tampoco
// se le suma SAC a estas indemnizaciones: la norma no lo dice.
//
// REGLA DE ORO: estos datos se verifican SOLO contra fuentes oficiales, nunca blogs.

export const PERIODISTAS_FUENTES = {
  consultadoEl: "2026-08-23",
  consultadoEnTexto: "23 de agosto de 2026",
  lista: [
    {
      nombre: "Ley 12.908: Estatuto del Periodista Profesional, texto ACTUALIZADO (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/40000-44999/43608/texact.htm",
      detalle:
        "el estatuto completo. Sus «Antecedentes Normativos» fechan la última redacción del art. 43 en el art. 1° de la Ley 16.792 (B.O. 21/12/1965): sesenta años con el mismo texto.",
    },
    {
      nombre: "Ley 27.802 de Modernización Laboral: Título XXVI, art. 197 (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=423680",
      detalle:
        "«Derógase la ley 12.908 y sus modificatorias, a partir del 1º de enero de 2027». Publicada en el B.O. del 6 de marzo de 2026; al 23/8/2026 ninguna norma posterior modificó ese artículo.",
    },
    {
      nombre: "Ley de Contrato de Trabajo 20.744, texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "arts. 92 bis, 150, 231 a 233 y 245 con el texto de la Ley 27.802: el régimen que queda cuando el estatuto se deroga.",
    },
  ],
};

/** Art. 197 de la Ley 27.802: el día en que la Ley 12.908 deja de estar vigente. */
export const DEROGACION_ISO = "2027-01-01";
export const DEROGACION_TEXTO = "1° de enero de 2027";
export const ULTIMO_DIA_VIGENTE_ISO = "2026-12-31";
export const ULTIMO_DIA_VIGENTE_TEXTO = "31 de diciembre de 2026";

/** B.O. de la Ley 27.802. */
export const REFORMA_PUBLICADA = "6 de marzo de 2026";
/** B.O. de la Ley 16.792, que le dio al art. 43 su texto actual. */
export const ART43_VIGENTE_DESDE = "21 de diciembre de 1965";

/** Art. 43 inc. b): la antigüedad que parte la escala en dos. */
export const ANIOS_CORTE_ESCALA = 3;

/** Art. 43 inc. a): meses de preaviso según la antigüedad sea menor o mayor de tres años. */
export const MESES_PREAVISO = { hastaCorte: 1, superaCorte: 2 };

/** Art. 43 inc. b): meses de indemnización sustitutiva si no se preavisó. */
export const MESES_SUSTITUTIVA = { hastaCorte: 2, superaCorte: 4 };

/** Art. 43 inc. c): un mes por año o fracción mayor de tres meses, con piso de dos meses. */
export const MESES_FRACCION_ANIO = 3;
export const MESES_PISO_ANTIGUEDAD = 2;

/** Art. 43 inc. d): la indemnización especial, «haya o no mediado preaviso». */
export const MESES_ESPECIAL = 6;

/** Art. 43 inc. e): meses que promedia la base de cálculo. */
export const MESES_PROMEDIO_BASE = 6;

/** Art. 25: el período de prueba del estatuto. */
export const DIAS_PERIODO_PRUEBA = 30;

/** Art. 34: jornada semanal máxima y tope mensual de horas extras (con recargo del 100%). */
export const HORAS_SEMANALES = 36;
export const HORAS_EXTRAS_MAXIMAS_MENSUALES = 20;
export const RECARGO_HORA_EXTRA = 1;

/** Art. 35: vacaciones en días HÁBILES según antigüedad (la LCT las cuenta en días corridos). */
export const ESCALA_VACACIONES_HABILES = [
  { etiqueta: "Hasta 10 años de antigüedad", dias: 15 },
  { etiqueta: "Más de 10 y hasta 20 años", dias: 20 },
  { etiqueta: "Más de 20 años", dias: 30 },
];

/** Art. 41: tope de la suspensión sin retribución. */
export const DIAS_MAXIMO_SUSPENSION = 30;

/**
 * Lo que un periodista pierde el 1° de enero de 2027, artículo por artículo, contra lo que dice
 * el régimen general que queda en su lugar. Cada fila se verificó en los dos textos actualizados.
 */
export const QUE_SE_PIERDE: Array<{
  articulo: string;
  titulo: string;
  estatuto: string;
  lct: string;
}> = [
  {
    articulo: "Art. 43 inc. d)",
    titulo: "Indemnización especial de seis meses",
    estatuto:
      "«Una indemnización especial equivalente a seis meses de sueldo», que se paga en todo despido injustificado, haya o no mediado preaviso, además de los otros rubros.",
    lct: "No existe. La LCT no tiene un rubro equivalente al inc. d).",
  },
  {
    articulo: "Art. 43 inc. b)",
    titulo: "Indemnización sustitutiva del preaviso",
    estatuto:
      "Dos meses de retribución hasta los tres años de antigüedad y cuatro meses si la supera. Es el doble del plazo de preaviso que fija el propio inciso a).",
    lct: "Un mes hasta los cinco años de antigüedad y dos meses si la supera (art. 231 inc. b, texto de la Ley 27.802).",
  },
  {
    articulo: "Art. 43 inc. c)",
    titulo: "Indemnización por antigüedad",
    estatuto:
      "Un mes de sueldo por año o fracción mayor de tres meses, «en ningún caso inferior a dos meses de sueldo», y sin tope de convenio.",
    lct: "Un mes por año o fracción mayor de tres meses (art. 245), con piso de un mes y con el tope del convenio, que sólo puede bajar la base hasta el 67% de la remuneración real.",
  },
  {
    articulo: "Art. 43 inc. e)",
    titulo: "La base de cálculo",
    estatuto:
      "El promedio de lo percibido en los últimos seis meses, computando extras, comisiones, viáticos no acreditados con comprobantes, gratificaciones y pagos en especie.",
    lct: "La mejor remuneración mensual, normal y habitual devengada durante el último año (art. 245).",
  },
  {
    articulo: "Art. 25",
    titulo: "Período de prueba",
    estatuto:
      "Treinta días como máximo, y computables «para todos sus efectos» una vez probada la idoneidad.",
    lct: "Seis meses (art. 92 bis), durante los cuales la extinción no genera indemnización.",
  },
  {
    articulo: "Art. 34",
    titulo: "Jornada",
    estatuto:
      "Treinta y seis horas semanales. El exceso se compensa con descanso o se paga con recargo del cien por ciento, y no puede superar las veinte horas extras mensuales.",
    lct: "Cuarenta y ocho horas semanales (Ley 11.544), con recargo del 50% en días comunes y del 100% en sábados después de las 13, domingos y feriados (art. 201 LCT).",
  },
  {
    articulo: "Art. 35",
    titulo: "Vacaciones",
    estatuto:
      "Quince días HÁBILES hasta diez años de antigüedad, veinte hasta veinte años y treinta si la supera; más tres, cinco o siete días adicionales para tareas habitualmente nocturnas.",
    lct: "Catorce días CORRIDOS hasta cinco años, veintiuno hasta diez, veintiocho hasta veinte y treinta y cinco si la supera (art. 150).",
  },
  {
    articulo: "Art. 41",
    titulo: "Suspensiones",
    estatuto: "Ningún empleado puede ser suspendido sin retribución por más de treinta días.",
    lct: "Las suspensiones por causas económicas o disciplinarias no pueden exceder de treinta días en un año (art. 220), y noventa días en el año en conjunto (art. 222).",
  },
];

/**
 * Textos VERBATIM del estatuto y de la norma que lo deroga.
 */
export const TEXTOS = {
  art43:
    "En casos de despidos por causas distintas a las expresamente enunciadas en el artículo 39, el empleador estará obligado a: a) Preavisar el despido a su dependiente, con uno o dos meses de anticipación a la fecha en que éste se efectuara, según sea la antigüedad del agente menor o mayor tres años, respectivamente, a la fecha en que se haya de producir la cesación. El plazo del preaviso comenzará a computarse a partir del primer día hábil del mes siguiente al de su notificación, debiendo practicarse ésta por escrito. Durante la vigencia del preaviso subsisten las obligaciones emergentes del contrato de trabajo, debiendo el empleador otorgar a su empleado una licencia diaria de dos horas corridas, a elección de éste, sin que ello determine disminución de su salario; b) En caso de despido sin preaviso, el empleador abonará a su dependiente una indemnización sustitutiva equivalente a dos o cuatro meses de retribución, según sea la antigüedad del agente, menor o mayor de tres años a la fecha de la cesación en el servicio; c) En todos los casos de despido injustificado, el empleador abonará a su dependiente, una indemnización calculada sobre la base de un mes de sueldo por cada año o fracción mayor de tres meses de antigüedad en el servicio. En ningún caso esta indemnización será inferior a dos meses de sueldo; d) Sin perjuicio del pago de las indemnizaciones establecidas en los incisos b) y c) que anteceden, el empleador abonará además a su dependiente, en los casos de despido injustificado, haya o no mediado preaviso, una indemnización especial equivalente a seis meses de sueldo; e) A los fines de la determinación, del sueldo a considerarse, para el pago de las indemnizaciones previstas en los incisos b) c) y d) de este artículo, se tomará como base el promedio que resulte de lo percibido por el dependiente en los últimos seis meses, o durante todo el tiempo de prestación de servicios, si éste fuera inferior, computándose a tal efecto las retribuciones extras, comisiones, viáticos, excepto en cuanto a éstos, la parte efectivamente gastada y acreditada con comprobantes, gratificaciones y todo otro pago en especies, provisión de alimentos o uso de habitación que integre, con permanencia y habitualidad el salario sobre la base de una estimación o valoración en dinero, conforme a la época de su pago.",

  art197Ley27802: "Derógase la ley 12.908 y sus modificatorias, a partir del 1º de enero de 2027.",

  art2:
    "Se consideran periodistas profesionales, a los fines de la presente ley, las personas que realicen en forma regular, mediante retribución pecuniaria, las tareas que les son propias en publicaciones diarias, o periódicas y agencias noticiosas. Tales el director, codirector, subdirector, jefe de redacción, secretario general, secretario de redacción, prosecretario de redacción, jefe de noticias, editorialista, corresponsal, redactor, cronista, reportero, dibujante, traductor, corrector de pruebas, reportero gráfico, archivero y colaborador permanente. Se incluyen las empresas radiotelefónicas, cinematográficas o de televisión que propalen, exhiban o televisen informativos o noticias de carácter periodístico, y únicamente con respecto al personal ocupado en estas tareas.",

  art25:
    "Todo personal periodístico podrá ser sometido, si así lo desea el empleador para su ingreso a un período de prueba que no deberá ser mayor de treinta días. Probada su idoneidad, comenzará a ganar el sueldo mínimo o básico, según el caso, y se le considerará definitivamente incorporado al personal permanente, debiendo computarse el período de prueba para todos sus efectos.",

  art34:
    "El horario que se establezca para el personal periodístico no será mayor de treinta y seis horas semanales. Cuando por causa de fuerza mayor o la existencia de situaciones propias de la profesión, se prolongue la jornada determinada precedentemente, se compensará el exceso con las equivalentes horas de descanso en la jornada inmediata o dentro de la semana, o se pagarán las horas extras con recargo del cien por ciento. Las horas extras no podrán exceder, en ningún caso de veinte mensuales.",

  art35:
    "Los periodistas gozarán de un período mínimo continuado de descanso anual, conservando la retribución que les corresponde durante el servicio activo en los siguientes términos: a) Quince días hábiles cuando la antigüedad en el servicio, no exceda de diez años; b) Veinte días hábiles, cuando la antigüedad sea mayor de diez años y no exceda de veinte; c) Treinta días hábiles, cuando la antigüedad en el servicio sea mayor de veinte años. Disfrutarán de un descanso mayor de tres, cinco y siete días, cuando realizaren tareas habitualmente nocturnas.",
};
