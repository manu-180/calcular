// HORAS EXTRAS (horas suplementarias) — LCT arts. 197, 197 bis, 198, 201 y 203, con el TEXTO
// VIGENTE tras la Ley 27.802 (B.O. 6/3/2026), más el tope del Decreto 484/2000.
//
// POR QUÉ ESTE ARCHIVO EXISTE (19/8/2026, s88): el recargo del 50%/100% del art. 201 es de 1974 y
// no lo tocó nadie — por eso toda la web publica el mismo número y da el tema por cubierto. Lo que
// cambió el 6/3/2026 es OTRA COSA, y es la que decide el caso de la mayoría: **quién puede pactar
// que esas horas se paguen con francos en vez de con plata.**
//
//   ANTES (art. 197 bis incorporado por el art. 79 del DNU 70/2023): el banco de horas era materia
//   EXCLUSIVAMENTE COLECTIVA. El texto empezaba «Las convenciones colectivas de trabajo (…) podrán
//   establecer regímenes que se adecuen a los cambios en las modalidades de producción». Sin CCT
//   que lo previera, no había banco de horas posible: las extras se pagaban.
//
//   AHORA (art. 42 de la Ley 27.802): «El empleador y el trabajador podrán acordar voluntariamente
//   un régimen de compensación de horas extraordinarias de trabajo». Pasó a poder pactarse UNO A
//   UNO. A cambio, el artículo le pone cinco requisitos de forma al acuerdo (por escrito, con la
//   naturaleza voluntaria consignada, con sus límites, con el modo de funcionamiento y con un
//   método fehaciente de control que registre las horas trabajadas y las disponibles para gozar), y
//   un piso que no se puede bajar: los descansos mínimos legales.
//
//   Y el art. 198 (sustituido por el art. 43 de la misma ley) escribió esos pisos con número por
//   primera vez en el articulado: DOCE (12) horas entre jornada y jornada y TREINTA Y CINCO (35)
//   horas de descanso semanal. Antes, el 12 estaba sólo en el art. 197 y el 35 se derivaba del
//   art. 204 (de las 13 del sábado a las 24 del domingo).
//
// LO QUE LA NORMA NO RESUELVE, Y ACÁ NO SE INVENTA: si la hora extra se compensa con franco, ¿el
// franco es de una hora o de una hora y media? El art. 197 bis no lo dice. Lo único que exige es
// que el régimen asegure «en todo momento la protección, beneficio e interés del trabajador». Por
// eso la calculadora devuelve las DOS lecturas (1:1 y con el recargo del art. 201) en vez de fingir
// que la discusión está cerrada.
//
// FUENTES: texto actualizado de la LCT en InfoLEG (id 25552), texto original del DNU 70/2023
// (id 395521) para la versión anterior del art. 197 bis, y Decreto 484/2000 (id 63347) para el
// tope. Los tres leídos el 19/8/2026. Nunca una nota de prensa.

/** Fecha desde la que rige el texto actual (B.O. de la Ley 27.802). */
export const VIGENCIA_REFORMA = "6 de marzo de 2026";
export const VIGENCIA_REFORMA_ISO = "2026-03-06";

/** Artículos de la Ley 27.802 que sustituyeron los arts. 197 bis y 198 de la LCT. */
export const ARTICULO_SUSTITUTIVO_197BIS = 42;
export const ARTICULO_SUSTITUTIVO_198 = 43;

/** Jornada máxima legal (art. 196 LCT, que remite a la Ley 11.544). */
export const JORNADA_LEGAL_SEMANAL = 48;
export const JORNADA_LEGAL_DIARIA = 8;

/** Semanas promedio por mes (52/12). Aritmética, no un número legal. */
export const SEMANAS_POR_MES = 52 / 12;

/**
 * Divisor mensual que usan muchísimas liquidaciones y convenios para la jornada de 48 horas
 * (8 horas × 25 días). NO es un número legal: no está en ninguna norma. Se muestra al lado del
 * promedio real (48 × 52/12 = 208) porque la diferencia entre uno y otro es plata, y el recibo o
 * el convenio son los que mandan.
 */
export const DIVISOR_USUAL_48 = 200;

/** Recargos del art. 201 de la LCT sobre el salario habitual. */
export const RECARGOS = {
  /** Días comunes (lunes a sábado hasta las 13). */
  comun: 0.5,
  /** Sábado después de las 13, domingo y feriados. */
  agravado: 1,
} as const;

/** Topes del Decreto 484/2000, art. 1º: sin necesidad de autorización administrativa previa. */
export const TOPES_DECRETO_484 = {
  mensual: 30,
  anual: 200,
  norma: "Decreto 484/2000",
  boletin: "B.O. 20/6/2000",
} as const;

/** Descansos mínimos, ahora escritos con número en el art. 198 (texto de la Ley 27.802). */
export const DESCANSOS_MINIMOS = {
  /** Entre el cese de una jornada y el comienzo de la otra (arts. 197 y 198). */
  entreJornadas: 12,
  /** Descanso semanal (art. 198; antes se derivaba del art. 204). */
  semanal: 35,
} as const;

/**
 * Citas textuales, guardadas enteras a propósito: son el ancla contra la que
 * `check_horas_extras.ts` verifica que la página no derive hacia un resumen que diga otra cosa que
 * la norma, y son la prueba de la inversión (vigente vs. anterior, palabra por palabra).
 */
export const HORAS_EXTRAS_TEXTOS = {
  art201:
    "Horas Suplementarias. El empleador deberá abonar al trabajador que prestare servicios en horas suplementarias, medie o no autorización del organismo administrativo competente, un recargo del cincuenta por ciento (50%) calculado sobre el salario habitual, si se tratare del días comunes, y del ciento por ciento (100%) en días sábado después de las trece (13) horas, domingo y feriados.",
  art203:
    "Obligación de prestar servicios en horas suplementarias. El trabajador no estará obligado a prestar servicios en horas suplementarias, salvo casos de peligro o accidente ocurrido o inminente de fuerza mayor, o por exigencias excepcionales de la economía nacional o de la empresa, juzgado su comportamiento en base al criterio de colaboración en el logro de los fines de la misma.",
  art197Pausa:
    "Entre el cese de una jornada y el comienzo de la otra deberá mediar una pausa no inferior a doce (12) horas.",
  art197bisVigente:
    "El empleador y el trabajador podrán acordar voluntariamente un régimen de compensación de horas extraordinarias de trabajo, el cual deberá formalizarse por escrito, consignando la naturaleza voluntaria de la prestación de horas extras y sus límites, especificando el modo de funcionamiento del sistema y estableciendo un método fehaciente de control que permita a ambas partes registrar las horas efectivamente trabajadas y las horas disponibles para su goce por parte del trabajador. A tal efecto, se podrá disponer de un régimen de horas extras, banco de horas, francos compensatorios, entre otros institutos relativos a la jornada laboral. Dicho régimen, que podrá igualmente ser pactado por el empleador con la representación sindical en la empresa, deberá respetar los descansos mínimos legales, asegurando en todo momento la protección, beneficio e interés del trabajador.",
  art197bisAnterior:
    "Las convenciones colectivas de trabajo, respetando los mínimos indisponibles de 12 horas de descanso entre jornada y jornada por razones de salud y seguridad en el trabajo, así como los límites legales conforme la naturaleza de cada actividad, podrán establecer regímenes que se adecuen a los cambios en las modalidades de producción, las condiciones propias de cada actividad, contemplando especialmente el beneficio e interés de los trabajadores. A tal efecto, se podrá disponer colectivamente del régimen de horas extras, banco de horas, francos compensatorios, entre otros institutos relativos a la jornada laboral.",
  art198Vigente:
    "Jornada reducida. La reducción de la jornada máxima legal solamente procederá cuando lo establezcan las disposiciones vigentes en la materia, o se encuentre estipulado en los contratos individuales, Convenios Colectivos de Trabajo u otros acuerdos colectivos celebrados con la representación sindical en la empresa. Estos últimos podrán establecer métodos de cálculo de la jornada máxima en base a promedio, de acuerdo con las características de la actividad, siempre y cuando se respeten los descansos mínimos entre jornada y jornada de doce (12) horas y de descanso semanal de treinta y cinco (35) horas. Asimismo, se podrá utilizar el banco de horas de modo de compensar la mayor jornada de algún día con la menor de otro, siempre y cuando no se supere el máximo legal de la jornada semanal, o la que estipule el régimen laboral específico aplicable, ya sea, ley especial y/o Convenio Colectivo de Trabajo.",
  notaVigencia197bis:
    "(Artículo sustituido por art. 42 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  notaVigencia198:
    "(Artículo sustituido por art. 43 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  decreto484:
    "A partir de la vigencia del presente Decreto, el número máximo de horas suplementarias previsto en el artículo 13 del Decreto Nº 16.115/33, modificado por el Decreto Nº 2882/79, queda establecido en TREINTA (30) horas mensuales y DOSCIENTAS (200) horas anuales, sin necesidad de autorización administrativa previa y sin perjuicio de la aplicación de las previsiones legales relativas a jornada y descanso.",
  ley11544Art3IncBVigente:
    "b) Cuando los trabajos se efectúen por equipos, la duración del trabajo podrá ser prolongada más allá de las ocho (8) horas por día y de cuarenta y ocho (48) semanales;",
  ley11544Art3IncBAnterior:
    "b) Cuando los trabajos se efectúen por equipos, la duración del trabajo podrá ser prolongada más allá de las ocho horas por día y de cuarenta y ocho semanales, a condición de que el término medio de las horas de trabajo sobre un período de tres semanas a lo menos, no exceda de ocho horas por día o de cuarenta y ocho horas semanales;",
  notaVigencia11544Art3:
    "(Artículo sustituido por art. 100 de la Ley N° 27.802 B.O. 06/03/2026. Vigencia: a partir de su publicación en el Boletín Oficial)",
  art204:
    "Prohibición de trabajar. Queda prohibida la ocupación del trabajador desde las trece (13) horas del día sábado hasta las veinticuatro (24) horas del día siguiente, salvo en los casos de excepción previstos en el artículo precedente y los que las leyes o reglamentaciones prevean, en cuyo caso el trabajador gozará de un descanso compensatorio de la misma duración, en la forma y oportunidad que fijen esas disposiciones atendiendo a la estacionalidad de la producción u otras características especiales.",
} as const;

/** Los cinco requisitos de forma que el art. 197 bis le exige al acuerdo de compensación. */
export const REQUISITOS_ACUERDO: { titulo: string; detalle: string }[] = [
  {
    titulo: "Por escrito",
    detalle:
      "El artículo dice que el régimen «deberá formalizarse por escrito». Un acuerdo de palabra, un mensaje suelto o una práctica de la empresa no alcanzan.",
  },
  {
    titulo: "Con la naturaleza voluntaria consignada",
    detalle:
      "El texto tiene que dejar dicho que la prestación de horas extras es voluntaria. Es el art. 203 escrito de nuevo dentro del acuerdo: si el papel no lo dice, le falta un requisito del propio artículo que lo habilita.",
  },
  {
    titulo: "Con sus límites",
    detalle:
      "Cuántas horas entran en el régimen. Los topes del Decreto 484/2000 —30 mensuales y 200 anuales— siguen corriendo por arriba de lo que pacten las partes.",
  },
  {
    titulo: "Con el modo de funcionamiento del sistema",
    detalle:
      "Cómo se acumulan las horas y cómo se gozan: en qué plazo, quién elige el día, qué pasa con las horas que quedan sin gozar cuando termina la relación.",
  },
  {
    titulo: "Con un método fehaciente de control",
    detalle:
      "Tiene que permitir a AMBAS partes registrar las horas efectivamente trabajadas y las horas disponibles para su goce. Sin ese registro compartido, el saldo lo lleva sólo el empleador — y es el dato con el que se discute todo lo demás.",
  },
];

/** Los cambios del 6/3/2026 sobre la jornada, uno por uno. Es el corazón de la página. */
export const CAMBIOS: {
  tema: string;
  antes: string;
  ahora: string;
  /** true cuando el cambio deja al trabajador en peor posición que antes. */
  peor: boolean;
}[] = [
  {
    tema: "El tope del promedio en el trabajo por equipos",
    antes:
      "El inciso b) del art. 3° de la Ley 11.544 permitía prolongar la jornada más allá de las 8 horas diarias y 48 semanales cuando se trabaja por equipos, pero «a condición de que el término medio de las horas de trabajo sobre un período de tres semanas a lo menos, no exceda de ocho horas por día o de cuarenta y ocho horas semanales». El promedio era el techo.",
    ahora:
      "El art. 100 de la Ley 27.802 sustituyó ese artículo y borró la condición: el inciso b) termina en «más allá de las ocho (8) horas por día y de cuarenta y ocho (48) semanales». Sin la regla del promedio de tres semanas, lo que queda como límite son los descansos mínimos de 12 y 35 horas del art. 198 de la LCT.",
    peor: true,
  },
  {
    tema: "Quién puede pactar el banco de horas",
    antes:
      "Sólo las convenciones colectivas de trabajo. El art. 197 bis empezaba, literalmente, «Las convenciones colectivas de trabajo (…) podrán establecer regímenes»: era materia exclusivamente colectiva. Sin convenio que lo previera, las horas extras se pagaban.",
    ahora:
      "El empleador y el trabajador, uno a uno: «El empleador y el trabajador podrán acordar voluntariamente un régimen de compensación de horas extraordinarias de trabajo». El acuerdo con la representación sindical quedó como alternativa, no como requisito.",
    peor: true,
  },
  {
    tema: "Qué tiene que decir ese acuerdo",
    antes:
      "El texto anterior no le exigía forma al acuerdo individual, porque no había acuerdo individual posible.",
    ahora:
      "Cinco requisitos, todos en el mismo artículo: por escrito, consignando la naturaleza voluntaria de las horas extras, con sus límites, con el modo de funcionamiento del sistema y con un método fehaciente de control que permita a ambas partes registrar las horas trabajadas y las disponibles para gozar.",
    peor: false,
  },
  {
    tema: "Los descansos mínimos",
    antes:
      "El propio 197 bis nombraba «los mínimos indisponibles de 12 horas de descanso entre jornada y jornada». El descanso semanal no tenía número: se derivaba del art. 204 (de las 13 del sábado a las 24 del domingo).",
    ahora:
      "El art. 197 bis manda respetar «los descansos mínimos legales» y el art. 198 los escribe con número: doce (12) horas entre jornada y jornada y treinta y cinco (35) horas de descanso semanal.",
    peor: false,
  },
  {
    tema: "Jornada máxima calculada por promedio",
    antes:
      "Sólo los Convenios Colectivos de Trabajo podían establecer métodos de cálculo de la jornada máxima en base a promedio (texto que le dio la Ley 24.013 en 1991).",
    ahora:
      "También los «otros acuerdos colectivos celebrados con la representación sindical en la empresa», y se sumó expresamente el banco de horas para compensar la mayor jornada de un día con la menor de otro, sin superar el máximo semanal.",
    peor: true,
  },
  {
    tema: "El recargo del 50% y del 100%",
    antes:
      "Art. 201: 50% en días comunes y 100% los sábados después de las 13, domingos y feriados.",
    ahora:
      "Igual. La Ley 27.802 no tocó el art. 201: el recargo es el mismo desde 1974. Lo que cambió es que ahora puede compensarse con francos en vez de pagarse.",
    peor: false,
  },
  {
    tema: "El tope de horas extras",
    antes:
      "30 horas mensuales y 200 anuales, sin autorización administrativa previa (Decreto 484/2000, art. 1º).",
    ahora:
      "Igual. La reforma no derogó ni modificó el Decreto 484/2000: los topes siguen vigentes y también le corren al banco de horas, porque la hora extra existe antes de que se decida cómo se compensa.",
    peor: false,
  },
  {
    tema: "La obligación de hacerlas",
    antes: "Art. 203: el trabajador no está obligado, salvo peligro, accidente o fuerza mayor.",
    ahora:
      "Igual, y el 197 bis lo refuerza: el acuerdo tiene que consignar «la naturaleza voluntaria de la prestación de horas extras». Un régimen que las imponga contradice el propio artículo que lo habilita.",
    peor: false,
  },
];

export type FuenteHorasExtras = { nombre: string; url: string; detalle: string };

export const HORAS_EXTRAS_FUENTES: {
  consultadoEl: string;
  lista: FuenteHorasExtras[];
} = {
  consultadoEl: "2026-08-20",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744 — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Art. 197 bis (texto del art. 42 de la Ley 27.802: el acuerdo individual de compensación y sus cinco requisitos de forma) y art. 198 (art. 43 de la misma ley: el promedio, el banco de horas y los pisos de 12 y 35 horas). También arts. 196 (jornada), 197 (pausa de 12 horas), 201 (recargos del 50% y 100%), 203 (voluntariedad) y 204 (descanso semanal).",
    },
    {
      nombre: "Decreto de Necesidad y Urgencia 70/2023 — texto original (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/395000-399999/395521/norma.htm",
      detalle:
        "Su art. 79 incorporó el art. 197 bis que rigió hasta el 5/3/2026 y que empezaba «Las convenciones colectivas de trabajo (…) podrán establecer regímenes». Es la prueba de que el banco de horas era materia exclusivamente colectiva antes de la reforma.",
    },
    {
      nombre: "Decreto 484/2000 — máximo de horas suplementarias (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/60000-64999/63347/norma.htm",
      detalle:
        "Art. 1º: 30 horas mensuales y 200 anuales, sin autorización administrativa previa. Verificado el 19/8/2026 contra la lista de normas que lo modifican en InfoLEG: sólo figuran dos resoluciones complementarias del año 2000 y una de 2020 sobre una empresa puntual. Sigue vigente.",
    },
    {
      nombre: "Ley 11.544 — Jornada de Trabajo: texto actualizado y texto original (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/60000-64999/63368/texact.htm",
      detalle:
        "Su art. 3° fue sustituido por el art. 100 de la Ley 27.802 (Título VI). En el inciso b), el del trabajo por equipos, desapareció la condición «a condición de que el término medio de las horas de trabajo sobre un período de tres semanas a lo menos, no exceda de ocho horas por día o de cuarenta y ocho horas semanales», que sigue palabra por palabra en el texto original (norma.htm del mismo id).",
    },
    {
      nombre: "Ley 27.802 — B.O. 6/3/2026",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339542/20260306",
      detalle:
        "La reforma que sustituyó ~54 artículos de la LCT en su Título I. Sus arts. 42 y 43 reescribieron el 197 bis y el 198; su art. 100, en el Título VI, el art. 3° de la Ley 11.544. Vigencia: desde la publicación, sin efecto retroactivo.",
    },
    {
      nombre: "Ley 24.241 art. 11, Ley 23.660 y Ley 19.032 — aportes del trabajador",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/639/texact.htm",
      detalle:
        "11% de jubilación (SIPA), 3% de obra social y 3% de PAMI. Las horas extras son remuneración: el 17% se descuenta también sobre ellas — y por eso entran en la base del aguinaldo.",
    },
  ],
};
