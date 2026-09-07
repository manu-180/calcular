// PERÍODO DE PRUEBA — qué se cobra si te despiden dentro de los primeros meses.
// LCT art. 92 bis (texto de la Ley 27.742) + art. 231 inc. b) **sustituido por el art. 48 de la
// Ley 27.802** (B.O. 6/3/2026) + arts. 123, 150/151/153 y 156, y el art. 233 que excluye la
// integración del mes.
//
// POR QUÉ ESTE ARCHIVO EXISTE (19/8/2026, s88): es la regla de s78/s83 en su forma más cara —
// **la reforma no dejó un vacío: borró un derecho y toda la web sigue publicándolo.**
//
//   ANTES (art. 231 inc. b), texto del art. 3º de la Ley 25.877, vigente del 19/3/2004 al
//   5/3/2026): «b) por el empleador, de QUINCE (15) días **cuando el trabajador se encontrare en
//   período de prueba**; de UN (1) mes cuando el trabajador tuviese una antigüedad en el empleo
//   que no exceda de CINCO (5) años y de DOS (2) meses cuando fuere superior».
//
//   AHORA (art. 48 de la Ley 27.802): el inciso arranca directamente en el mes, **desapareció la
//   mención al período de prueba de la escala**, y se le agregó una oración final que la reemplaza
//   por su contraria: «**Para el supuesto en que el trabajador se encuentre en período de prueba no
//   se requerirá la obligación de preaviso.**»
//
// Traducido a plata: hasta el 5/3/2026, al despedido en período de prueba sin aviso le correspondía
// la indemnización sustitutiva del art. 232 equivalente a **quince días de sueldo**. Desde el
// 6/3/2026, cero. Es la respuesta más repetida de todo el tema —«en el período de prueba te tienen
// que preavisar 15 días»— y hace cinco meses que es falsa.
//
// LO QUE SIGUE SIENDO VERDAD, Y TAMBIÉN SE PUBLICA MAL (por defecto: «no te corresponde nada»):
// el art. 92 bis (vi) dice que el período de prueba **se computa como tiempo de servicio a todos
// los efectos laborales y de la seguridad social**. Por eso se cobra igual el SAC proporcional
// (art. 123), las vacaciones proporcionales no gozadas (arts. 153 y 156) y los días trabajados del
// mes. Lo que NO se cobra es la indemnización por antigüedad (art. 92 bis), el preaviso (art. 231
// nuevo) y la integración del mes de despido (art. 233, que la excluye expresamente desde 2004).
//
// FUENTES: texto actualizado de la LCT en InfoLEG (id 25552) y texto original de la Ley 25.877
// (id 93595) para la versión anterior del art. 231. Ambos leídos el 19/8/2026. Nunca una nota.

/** Fecha desde la que rige el texto actual del art. 231 (B.O. de la Ley 27.802). */
export const VIGENCIA_REFORMA = "6 de marzo de 2026";
export const VIGENCIA_REFORMA_ISO = "2026-03-06";

/** Artículo de la Ley 27.802 que sustituyó el inciso b) del art. 231 de la LCT. */
export const ARTICULO_SUSTITUTIVO_231 = 48;

/** Días de preaviso que le correspondían al trabajador en período de prueba ANTES de la reforma. */
export const PREAVISO_ANTERIOR_DIAS = 15;

/**
 * Duración del período de prueba (art. 92 bis, texto del art. 91 de la Ley 27.742, B.O. 8/7/2024).
 * La base son 6 meses; los convenios colectivos pueden ampliarla según el tamaño de la empresa.
 */
export const PERIODO_PRUEBA = {
  mesesBase: 6,
  ampliaciones: [
    {
      meses: 8,
      condicion: "en empresas de 6 y hasta 100 trabajadores",
      soloPorConvenio: true,
    },
    {
      meses: 12,
      condicion: "en empresas de hasta 5 trabajadores",
      soloPorConvenio: true,
    },
  ],
} as const;

/** Divisores usados para pasar del sueldo mensual al día. Aritmética, no números legales. */
export const DIVISOR_DIA = 30;

/** Art. 153: un día de descanso por cada 20 días de trabajo efectivo. */
export const DIAS_TRABAJO_POR_DIA_DESCANSO = 20;

/** Art. 155: la retribución de las vacaciones se calcula dividiendo el sueldo mensual por 25. */
export const DIVISOR_VACACIONES = 25;

/**
 * Citas textuales, guardadas enteras a propósito: son el ancla contra la que
 * `check_periodo_prueba.ts` verifica que la página no derive hacia un resumen, y son la prueba
 * palabra por palabra de que el preaviso de 15 días desapareció.
 */
export const PERIODO_PRUEBA_TEXTOS = {
  art231Vigente:
    "El preaviso, cuando las partes no lo fijen en un término mayor, deberá darse con la anticipación siguiente: a) por el trabajador, de QUINCE (15) días; b) por el empleador, de un (1) mes cuando el trabajador tuviese una antigüedad en el empleo que no exceda de cinco (5) años y de dos (2) meses cuando fuere superior. Para el supuesto en que el trabajador se encuentre en período de prueba no se requerirá la obligación de preaviso.",
  art231Anterior:
    "El preaviso, cuando las partes no lo fijen en un término mayor, deberá darse con la anticipación siguiente: a) por el trabajador, de QUINCE (15) días; b) por el empleador, de QUINCE (15) días cuando el trabajador se encontrare en período de prueba; de UN (1) mes cuando el trabajador tuviese una antigüedad en el empleo que no exceda de CINCO (5) años y de DOS (2) meses cuando fuere superior.",
  notaVigencia231:
    "(Inciso b) sustituido por art. 48 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  art232:
    "Indemnización substitutiva. La parte que omita el preaviso o lo otorgue de modo insuficiente deberá abonar a la otra una indemnización substitutiva equivalente a la remuneración que correspondería al trabajador durante los plazos señalados en el artículo 231.",
  art233Integracion:
    "La integración del mes de despido no procederá cuando la extinción se produzca durante el período de prueba establecido en el artículo 92 bis.",
  art92bisDuracion:
    "El contrato de trabajo por tiempo indeterminado se entenderá celebrado a prueba durante los primeros seis (6) meses de vigencia. Las convenciones colectivas de trabajo podrán ampliar dicho período de prueba: a) hasta ocho (8) meses, en las empresas de seis (6) y hasta cien (100) trabajadores; y b) hasta un (1) año en las empresas de hasta cinco (5) trabajadores. Cualquiera de las partes podrá extinguir la relación durante ese lapso sin expresión de causa, sin derecho a indemnización con motivo a la extinción.",
  art92bisComputo:
    "El período de prueba se computará como tiempo de servicio a todos los efectos laborales y de la seguridad social. El empleador deberá registrar al trabajador desde la fecha de inicio de la relación; caso contrario, se considerará que ha renunciado al período de prueba.",
  art92bisUnaVez:
    "Un empleador no puede contratar a un mismo trabajador, más de una vez, utilizando el período de prueba. De hacerlo, se considerará de pleno derecho, que el empleador ha renunciado al período de prueba.",
  art92bisAbuso:
    "El uso abusivo del período de prueba con el objeto de evitar la efectivización de trabajadores será pasible de las sanciones previstas en los regímenes sobre infracciones a las leyes de trabajo. En especial, se considerará abusiva la conducta del empleador que contratare sucesivamente a distintos trabajadores para un mismo puesto de trabajo de naturaleza permanente.",
  art123:
    "Extinción del contrato de trabajo - Pago proporcional. Cuando se opere la extinción del contrato de trabajo por cualquier causa, el trabajador o los derecho-habientes que determina esta ley, tendrá derecho a percibir la parte del sueldo anual complementario que se establecerá como la doceava parte de las remuneraciones devengadas en la fracción del semestre trabajado, hasta el momento de dejar el servicio.",
  art156:
    "Indemnización. Cuando por cualquier causa se produjera la extinción del contrato de trabajo, el trabajador tendrá derecho a percibir una indemnización equivalente al salario correspondiente al período de descanso proporcional a la fracción del año trabajada.",
  art153:
    "Falta de tiempo mínimo. Licencia proporcional. Cuando el trabajador no llegase a totalizar el tiempo mínimo de trabajo previsto en el artículo 151 de esta ley, gozará de un período de descanso anual, en proporción de un (1) día de descanso por cada veinte (20) días de trabajo efectivo, computable de acuerdo al artículo anterior.",
} as const;

/** Qué se cobra y qué no al terminar el contrato dentro del período de prueba. */
export const CONCEPTOS: {
  concepto: string;
  corresponde: boolean;
  articulo: string;
  detalle: string;
}[] = [
  {
    concepto: "Días trabajados del mes",
    corresponde: true,
    articulo: "art. 74 LCT",
    detalle:
      "Lo devengado hasta el último día trabajado. No es una indemnización: es salario, y se paga siempre.",
  },
  {
    concepto: "SAC proporcional (aguinaldo)",
    corresponde: true,
    articulo: "art. 123 LCT",
    detalle:
      "«Cuando se opere la extinción del contrato de trabajo por cualquier causa»: la doceava parte de lo devengado en la fracción del semestre trabajado. El período de prueba no es una excepción.",
  },
  {
    concepto: "Vacaciones proporcionales no gozadas",
    corresponde: true,
    articulo: "arts. 153 y 156 LCT",
    detalle:
      "También «por cualquier causa». Con menos de medio año trabajado se aplica la licencia proporcional del art. 153: un día por cada veinte de trabajo efectivo, pagado al valor del art. 155 (sueldo ÷ 25).",
  },
  {
    concepto: "SAC sobre las vacaciones proporcionales",
    corresponde: true,
    articulo: "art. 123 LCT",
    detalle:
      "La indemnización del art. 156 es remuneratoria a estos fines, así que arrastra su doceava parte de SAC. Es el renglón que más veces falta en las liquidaciones.",
  },
  {
    concepto: "Preaviso (o su indemnización sustitutiva)",
    corresponde: false,
    articulo: "art. 231 inc. b), texto de la Ley 27.802",
    detalle:
      "ESTO CAMBIÓ. Hasta el 5/3/2026 eran quince días de sueldo. El texto vigente dice: «Para el supuesto en que el trabajador se encuentre en período de prueba no se requerirá la obligación de preaviso».",
  },
  {
    concepto: "Indemnización por antigüedad",
    corresponde: false,
    articulo: "art. 92 bis LCT",
    detalle:
      "«Cualquiera de las partes podrá extinguir la relación durante ese lapso sin expresión de causa, sin derecho a indemnización con motivo a la extinción». Nunca correspondió y sigue sin corresponder.",
  },
  {
    concepto: "Integración del mes de despido",
    corresponde: false,
    articulo: "art. 233 LCT",
    detalle:
      "El propio artículo la excluye: «no procederá cuando la extinción se produzca durante el período de prueba establecido en el artículo 92 bis». Rige así desde 2004, no es novedad de la reforma.",
  },
];

export type FuentePeriodoPrueba = { nombre: string; url: string; detalle: string };

export const PERIODO_PRUEBA_FUENTES: {
  consultadoEl: string;
  lista: FuentePeriodoPrueba[];
} = {
  consultadoEl: "2026-08-19",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744 — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Art. 231 inc. b) con el texto del art. 48 de la Ley 27.802 —el que eliminó el preaviso en período de prueba— y su nota de vigencia. También arts. 92 bis (duración y cómputo como tiempo de servicio), 123 (SAC proporcional), 150/151/153 (vacaciones y licencia proporcional), 155, 156 (indemnización por vacaciones no gozadas), 232 (indemnización sustitutiva) y 233 (integración del mes excluida).",
    },
    {
      nombre: "Ley 25.877 (B.O. 19/3/2004) — el texto anterior del art. 231",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/90000-94999/93595/norma.htm",
      detalle:
        "Su artículo 3º es el texto que rigió hasta el 5/3/2026 y que casi toda la web sigue publicando: «por el empleador, de QUINCE (15) días cuando el trabajador se encontrare en período de prueba». Es la prueba palabra por palabra de qué se borró.",
    },
    {
      nombre: "Ley 27.742 (B.O. 8/7/2024) — el art. 92 bis vigente",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Su art. 91 sustituyó el art. 92 bis: llevó el período de prueba a seis meses, con ampliación por convenio a ocho meses (empresas de 6 a 100 trabajadores) y a un año (hasta 5 trabajadores). La Ley 27.802 no lo modificó: lo que cambió en 2026 fue el preaviso, no la duración.",
    },
    {
      nombre: "Ley 27.802 — B.O. 6/3/2026",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339542/20260306",
      detalle:
        "La reforma que sustituyó ~54 artículos de la LCT. Su art. 48 reescribió el inciso b) del art. 231. Vigencia: desde la publicación, sin efecto retroactivo — los despidos anteriores al 6/3/2026 se rigen por el texto viejo.",
    },
  ],
};
