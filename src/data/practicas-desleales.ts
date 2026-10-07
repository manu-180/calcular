// Prácticas desleales SINDICALES y las multas del régimen de la Ley 25.212.
// Ley 23.551, arts. 20 bis, 20 ter, 53, 53 bis, 54 y 55, con el texto que les dio el Título XV de
// la Ley 27.802 (arts. 138, 139, 145, 146 y 147; B.O. 6/3/2026), y Anexo II de la Ley 25.212
// (Régimen General de Sanciones por Infracciones Laborales), art. 5º con el texto de la Ley 26.941.
//
// POR QUÉ ESTE ARCHIVO EXISTE (22/8/2026, s91). Hasta el 6 de marzo de 2026 la Ley 23.551 sólo
// tipificaba prácticas desleales DEL EMPLEADOR: el art. 53 y sus once incisos, intacto desde 1988.
// La reforma no lo tocó — le agregó un artículo entero al lado. El art. 53 bis crea OCHO conductas
// desleales de las asociaciones sindicales que antes no existían como infracción, y el art. 54
// pasó de «La asociación sindical de trabajadores o el damnificado» a «Todo damnificado»: el
// empleador quedó legitimado para querellar. Es la regla de s90 en estado puro — un texto que
// CREA un régimen, no uno que corrige artículos sueltos: no hay página vieja con la que competir.
//
// Y HAY UN NÚMERO QUE NADIE PUBLICA. El art. 55 viejo remitía a «los artículos 4 y siguiente de la
// ley N° 18.694»; el nuevo remite al «Anexo II de la ley 25.212 y sus modificatorias». Ese anexo
// gradúa las multas como PORCENTAJE DEL SMVM vigente al momento de la constatación, así que el
// importe se DERIVA de un dato que ya vive en este repo (SMVM_SERIE de desempleo.ts) y no envejece.
// Las notas publicadas explican la conducta; ninguna dice cuántos pesos son.
//
// LO QUE ESTA PÁGINA NO INVENTA, y es la parte más importante:
//   - El art. 55 manda aplicar el régimen del Anexo II «salvo las modificaciones que aquí se
//     establecen», pero NO dice en qué escalón (leve / grave / muy grave) cae cada práctica
//     desleal. La única clasificación que da la ley es la del art. 20 ter: las conductas de
//     bloqueo, toma y daños «serán consideradas infracciones muy graves». Para el resto de los
//     incisos del art. 53 bis la calificación la hace el juez. Acá se dice, no se completa.
//   - El tope del 20% de las cuotas sindicales existe en el texto; qué pasa cuando choca con el
//     mínimo de la escala del Anexo II, la ley no lo resuelve. La calculadora muestra los dos
//     números en vez de elegir uno por su cuenta.
//
// REGLA DE ORO: estos datos se verifican SOLO contra fuentes oficiales, nunca blogs.

export const PD_FUENTES = {
  consultadoEl: "22 de agosto de 2026",
  lista: [
    {
      nombre: "Ley 23.551, texto ACTUALIZADO (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/20000-24999/20993/texact.htm",
      detalle:
        "arts. 20 bis, 20 ter, 53, 53 bis, 54 y 55 con el texto vigente. El art. 53 bis se lee acá completo, con su nota de incorporación por el art. 145 de la Ley 27.802.",
    },
    {
      nombre: "Ley 23.551, texto ORIGINAL de 1988 (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/20000-24999/20993/norma.htm",
      detalle:
        "para comprobar que los arts. 54 y 55 decían otra cosa y que el 53 bis no existía. Se usa sólo para comparar.",
    },
    {
      nombre: "Ley 27.802: Título XV, arts. 138 a 148 (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=423680",
      detalle:
        "las once modificaciones a la ley sindical. El art. 145 incorpora el 53 bis; el 146 sustituye el 54; el 147, el 55.",
    },
    {
      nombre: "Ley 25.212: Anexo II, art. 5º (texto actualizado, InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/60000-64999/61876/texact.htm",
      detalle:
        "Régimen General de Sanciones por Infracciones Laborales. El art. 5º, con el texto de la Ley 26.941 (B.O. 2/6/2014), gradúa las multas como porcentaje del SMVM.",
    },
  ],
};

export const REFORMA_PUBLICADA = "6 de marzo de 2026";
export const REFORMA_PUBLICADA_ISO = "2026-03-06";

/** Art. 55: en prácticas desleales múltiples o reincidencia, hasta el quíntuplo del máximo. */
export const MULTIPLICADOR_REINCIDENCIA = 5;

/** Art. 55: tope del juez, como fracción de las cuotas sindicales del mes de la infracción. */
export const TOPE_CUOTAS = 0.2;

/** Art. 55: recargo automático por cada tramo de días de mora en reparar. */
export const RECARGO_MORA = 0.1;
export const DIAS_TRAMO_MORA = 5;

/** Art. 55: reducción si la práctica se repara dentro del plazo que fije la decisión judicial. */
export const REDUCCION_POR_REPARAR = 0.5;

export type EscalonInfraccion = {
  id: "leve" | "grave" | "muy-grave";
  etiqueta: string;
  /** Fracción del SMVM mensual: mínimo y máximo de la multa. */
  min: number;
  max: number;
  /** ¿La multa se multiplica por cada trabajador afectado? */
  porTrabajador: boolean;
  base: string;
};

/**
 * Anexo II de la Ley 25.212, art. 5º (texto de la Ley 26.941). Las infracciones leves admiten
 * apercibimiento para la primera; de ahí en más, multa. Los porcentajes son del «valor mensual del
 * Salario Mínimo, Vital y Móvil vigente al momento de la constatación de la infracción».
 */
export const ESCALONES: EscalonInfraccion[] = [
  {
    id: "leve",
    etiqueta: "Infracción leve",
    min: 0.25,
    max: 1.5,
    porTrabajador: false,
    base: "Del 25% al 150% del SMVM mensual. Para la primera infracción leve, la autoridad puede limitarse al apercibimiento.",
  },
  {
    id: "grave",
    etiqueta: "Infracción grave",
    min: 0.3,
    max: 2,
    porTrabajador: true,
    base: "Del 30% al 200% del SMVM mensual, por cada trabajador afectado.",
  },
  {
    id: "muy-grave",
    etiqueta: "Infracción muy grave",
    min: 0.5,
    max: 20,
    porTrabajador: true,
    base: "Del 50% al 2.000% del SMVM mensual, por cada trabajador afectado. Es el escalón en el que el art. 20 ter ubica al bloqueo, la toma y los daños.",
  },
];

/** Las OCHO conductas del art. 53 bis: el artículo entero es nuevo. */
export const PRACTICAS_SINDICALES = [
  {
    inciso: "a",
    texto: "Incurrir en alguna de las acciones previstas en el artículo 20 ter de la presente ley.",
    nota: "Es el reenvío que decide el escalón: el art. 20 ter dice que esas conductas «serán consideradas infracciones muy graves».",
    muyGravePorLey: true,
  },
  {
    inciso: "b",
    texto:
      "Intervenir o interferir intencionalmente afectando el desenvolvimiento de la actividad de la empresa mediante la convocatoria a asambleas violando los términos del artículo 20 bis de la presente ley, u otras medidas de acción directa.",
    nota: "El art. 20 bis exige autorización previa del empleador para el horario y la duración de la asamblea, y también para el lugar si se hace dentro del establecimiento.",
    muyGravePorLey: false,
  },
  {
    inciso: "c",
    texto:
      "Promover la afiliación compulsiva e involuntaria de trabajadores, en forma directa o indirecta.",
    nota: null,
    muyGravePorLey: false,
  },
  {
    inciso: "d",
    texto:
      "Incurrir en conductas y/o mecanismos extorsivos a los fines de lograr la afiliación compulsiva y/o involuntaria de trabajadores.",
    nota: null,
    muyGravePorLey: false,
  },
  {
    inciso: "e",
    texto: "Incurrir en conductas y/o mecanismos extorsivos en contra de los empleadores.",
    nota: null,
    muyGravePorLey: false,
  },
  {
    inciso: "f",
    texto: "Adoptar represalias contra los trabajadores que no se adhieran a una medida de fuerza.",
    nota: "El espejo del art. 53 inc. e), que sanciona al empleador por represalias contra quien sí participa.",
    muyGravePorLey: false,
  },
  {
    inciso: "g",
    texto:
      "Rehusarse a negociar colectivamente con los representantes de la parte empleadora legitimados para hacerlo o provocar dilaciones que tiendan a obstruir el proceso de negociación.",
    nota: "El espejo exacto del art. 53 inc. f), que dice lo mismo del empleador desde 1988.",
    muyGravePorLey: false,
  },
  {
    inciso: "h",
    texto: "No acatar la conciliación obligatoria dispuesta por la autoridad con facultades suficientes.",
    nota: null,
    muyGravePorLey: false,
  },
];

/** Las tres conductas del art. 20 ter, que la ley califica ella misma como muy graves. */
export const CONDUCTAS_MUY_GRAVES = [
  {
    inciso: "a",
    texto:
      "Afectar la libertad de trabajo de quienes no adhieran a una medida de fuerza mediante actos y/o hechos y/o intimidaciones o amenazas.",
  },
  {
    inciso: "b",
    texto:
      "Provocar, y/o instar y/u organizar el bloqueo o tomar un establecimiento; impedir u obstruir total o parcialmente el ingreso o egreso de personas y/o cosas al establecimiento.",
  },
  {
    inciso: "c",
    texto:
      "Ocasionar daños en personas o en cosas de propiedad de la empresa o de terceros, se encuentren o no en el establecimiento del empleador (instalaciones, mercaderías, insumos y materias primas, herramientas, etc.) o retenerlas indebidamente.",
  },
];

export const TEXTOS = {
  art53bis:
    "Serán consideradas prácticas desleales y contrarias a la ética de las relaciones profesionales del trabajo por parte de las asociaciones sindicales, o en su caso, de quienes las representen: a) Incurrir en alguna de las acciones previstas en el artículo 20 ter de la presente ley; b) Intervenir o interferir intencionalmente afectando el desenvolvimiento de la actividad de la empresa mediante la convocatoria a asambleas violando los términos del artículo 20 bis de la presente ley, u otras medidas de acción directa; c) Promover la afiliación compulsiva e involuntaria de trabajadores, en forma directa o indirecta; d) Incurrir en conductas y/o mecanismos extorsivos a los fines de lograr la afiliación compulsiva y/o involuntaria de trabajadores; e) Incurrir en conductas y/o mecanismos extorsivos en contra de los empleadores; f) Adoptar represalias contra los trabajadores que no se adhieran a una medida de fuerza; g) Rehusarse a negociar colectivamente con los representantes de la parte empleadora legitimados para hacerlo o provocar dilaciones que tiendan a obstruir el proceso de negociación; h) No acatar la conciliación obligatoria dispuesta por la autoridad con facultades suficientes.",

  art20ter:
    "Serán consideradas infracciones muy graves: a. Afectar la libertad de trabajo de quienes no adhieran a una medida de fuerza mediante actos y/o hechos y/o intimidaciones o amenazas; b. Provocar, y/o instar y/u organizar el bloqueo o tomar un establecimiento; impedir u obstruir total o parcialmente el ingreso o egreso de personas y/o cosas al establecimiento; c. Ocasionar daños en personas o en cosas de propiedad de la empresa o de terceros, se encuentren o no en el establecimiento del empleador (instalaciones, mercaderías, insumos y materias primas, herramientas, etc.) o retenerlas indebidamente. Verificadas dichas acciones como medidas de acción directa sindical, la entidad responsable será pasible de la aplicación de las sanciones que establezca la reglamentación, una vez cumplimentado el procedimiento que disponga al efecto la Autoridad de Aplicación, sin perjuicio de las responsabilidades civiles y/o penales que pudieran corresponder.",

  art20bis:
    "Derecho de realizar Asambleas, Congresos. La asociación sindical, legalmente reconocida, podrá convocar a asambleas de personal y congresos de delegados, siempre que ello no afecte el normal desarrollo de las actividades de la empresa ni cause perjuicio a terceros. En caso de celebrarse una asamblea dentro o fuera del establecimiento del empleador, deberá contarse con su autorización previa, tanto del horario y el tiempo de su duración. Además, en caso de que se realice dentro del establecimiento deberá requerirse también autorización respecto del lugar. Para ejercer dicha facultad deberá estar al día en el cumplimiento de pago de haberes. El trabajador no devengará salarios durante el tiempo de la misma.",

  art54Nuevo:
    "Todo damnificado por una acción y/u omisión que la presente ley define como práctica desleal podrá promover una querella ante el juez o tribunal competente.",

  art54Viejo:
    "La asociación sindical de trabajadores o el damnificado, conjunta o indistintamente, podrán promover querella por práctica desleal ante el juez o tribunal competente.",

  art55Nuevo:
    "Las prácticas desleales se sancionarán con multas que serán fijadas de acuerdo con el Régimen General de Sanciones por Infracciones Laborales previsto en el Anexo II de la ley 25.212 y sus modificatorias de infracciones a las leyes de trabajo, salvo las modificaciones que aquí se establecen. En el supuesto de prácticas desleales múltiples, o de reincidencia, la multa podrá elevarse hasta el quíntuplo del máximo previsto en la ley 25.212 y sus modificatorias. La multa será fijada por el juez hasta un máximo del equivalente al veinte por ciento (20%) de los ingresos provenientes de las cuotas sindicales que deban pagar los afiliados en el mes en que se cometió la infracción. Los importes de las multas serán actualizados a la fecha del efectivo pago, de acuerdo a las pautas de ajuste que correspondan a los créditos laborales. Cuando la práctica desleal pudiera ser reparada mediante el cese de la medida que la hubiere producido o la realización de los actos que resulten idóneos, conforme a la decisión calificadora, y el infractor mantuviera las medidas o dejare de cumplir los actos tendientes a la cesación de sus efectos, el importe originario se incrementará automáticamente en un diez por ciento (10%) por cada cinco (5) días de mora, mientras se mantenga el incumplimiento. Sin perjuicio de ello, el juez, a petición de parte, podrá también aplicar lo dispuesto por el artículo 804 del Código Civil y Comercial de la Nación, quedando los importes que así se establezcan en favor del damnificado. El importe de las multas será percibido por la autoridad administrativa del trabajo, e ingresado en una cuenta especial, y será destinado al mejoramiento de los servicios de inspección del trabajo, a cuyo fin la autoridad administrativa tomará intervención en el expediente judicial, previa citación del juez. Cuando la práctica desleal fuese reparada mediante el cese de los actos motivantes, dentro del plazo que al efecto establezca la decisión judicial, el importe de la sanción podrá reducirse hasta el cincuenta por ciento (50%). En aquellos casos en los que la asociación sindical o el empleado incurra reiteradamente en las conductas estipuladas en el artículo 53 bis del presente cuerpo normativo, la Justicia Nacional del Trabajo podrá revocarle la personería y/o la inscripción gremial.",

  art5Anexo2:
    "De las sanciones 1. Las infracciones leves se sancionarán de acuerdo a la siguiente graduación: a) Apercibimiento, para la primera infracción leve, de acuerdo a los antecedentes y circunstancia de cada caso, evaluadas por la autoridad administrativa de aplicación. b) Multa del veinticinco por ciento (25%) al ciento cincuenta por ciento (150%) del valor mensual del Salario Mínimo, Vital y Móvil vigente al momento de la constatación de la infracción. 2. Las infracciones graves se sancionarán con multa del treinta por ciento (30%) al doscientos por ciento (200%) del valor mensual del Salario Mínimo, Vital y Móvil vigente al momento de la constatación de la infracción, por cada trabajador afectado. 3. Las infracciones muy graves serán sancionadas con multa del cincuenta por ciento (50%) al dos mil por ciento (2.000%) del valor mensual del Salario Mínimo, Vital y Móvil vigente al momento de la constatación de la infracción, por cada trabajador afectado.",
};

/** Lo que cambió en el capítulo de prácticas desleales, con su consecuencia. */
export const CAMBIOS = [
  {
    articulo: "Art. 53 bis: nuevo",
    antes: "No existía: la ley sólo tipificaba prácticas desleales del empleador (art. 53).",
    ahora: "Ocho conductas desleales de las asociaciones sindicales, incorporadas por el art. 145 de la Ley 27.802.",
    plata: "Aparece una responsabilidad que antes no tenía sujeto: el sindicato pasa a ser sancionable con multa.",
  },
  {
    articulo: "Art. 54: quién puede querellar",
    antes: "«La asociación sindical de trabajadores o el damnificado, conjunta o indistintamente».",
    ahora: "«Todo damnificado por una acción y/u omisión que la presente ley define como práctica desleal».",
    plata: "El empleador damnificado queda legitimado por sí solo para promover la querella.",
  },
  {
    articulo: "Art. 55: con qué escala se multa",
    antes: "Remitía a «los artículos 4 y siguiente de la ley N° 18.694».",
    ahora: "Remite al «Anexo II de la ley 25.212 y sus modificatorias», que gradúa las multas como porcentaje del SMVM vigente.",
    plata: "La multa deja de estar anclada a una ley de 1972 y pasa a moverse con el salario mínimo.",
  },
  {
    articulo: "Art. 55: el tope del 20%",
    antes: "El tope del 20% de las cuotas se aplicaba sólo «cuando la práctica desleal fuera cometida por entidades representativas de empleadores».",
    ahora: "«La multa será fijada por el juez hasta un máximo del equivalente al veinte por ciento (20%) de los ingresos provenientes de las cuotas sindicales que deban pagar los afiliados en el mes en que se cometió la infracción».",
    plata: "El tope se calcula sobre la recaudación de cuotas del mes, no sobre el patrimonio ni sobre el daño.",
  },
  {
    articulo: "Art. 55: la sanción que no es plata",
    antes: "El artículo no preveía ninguna consecuencia sobre la personería gremial: la sanción se agotaba en la multa.",
    ahora: "Ante conductas reiteradas del art. 53 bis, «la Justicia Nacional del Trabajo podrá revocarle la personería y/o la inscripción gremial».",
    plata: "Es la consecuencia más grave de todo el capítulo, y no tiene importe: se pierde la representación.",
  },
  {
    articulo: "Art. 20 bis: las asambleas",
    antes: "El artículo había sido incorporado por el Decreto 70/2023.",
    ahora: "Exige autorización previa del empleador para el horario y la duración (y también para el lugar, si es dentro del establecimiento), y aclara que «el trabajador no devengará salarios durante el tiempo de la misma».",
    plata: "La hora de asamblea no se paga, y convocarla fuera de esos términos es la práctica desleal del art. 53 bis inc. b).",
  },
];
