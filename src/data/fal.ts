// FONDO DE ASISTENCIA LABORAL (FAL) — Título II de la Ley 27.802 (arts. 58 a 77) y su
// reglamentación, el Decreto 408/2026 (B.O. 1/6/2026), leídos el 27/8/2026 en el texto oficial de
// InfoLEG (ids 423680 y 426272).
//
// POR QUÉ ESTE ARCHIVO EXISTE (27/8/2026, s96): el Título II es el ÚNICO tramo de toda la Ley de
// Modernización Laboral cuya entrada en vigencia se prorrogó. El art. 77 la fijaba el 1/6/2026 y
// facultaba al Poder Ejecutivo a correrla «por el plazo máximo de seis (6) meses»; el art. 27 del
// Decreto 408/2026 usó ese plazo entero y la llevó al **1° de noviembre de 2026**. Ese mismo
// decreto es, además, la reglamentación completa del régimen: no es un tema pendiente de
// reglamentar, es un tema reglamentado que todavía no arrancó.
//
// LAS TRES COSAS QUE ESTA PÁGINA PONE EN PESOS, y que casi ninguna nota junta:
//
//   1. **La contribución tiene DOS alícuotas y un techo distinto para cada una.** Art. 60: 1% para
//      las grandes empresas y 2,5% para las Micro, Pequeñas y Medianas, sobre la misma base que las
//      contribuciones patronales al SIPA. Y el Poder Ejecutivo puede subirlas —«atendiendo al
//      cumplimiento de las metas asociadas a las políticas de equilibrio fiscal, previa aprobación
//      de la Comisión Bicameral»— hasta 1,5% y 3% respectivamente. Los cuatro números están en el
//      artículo; los dos de arriba casi nunca se publican.
//
//   2. **No es un costo nuevo: es una detracción.** El art. 76 le da al empleador «una reducción en
//      las contribuciones patronales con destino a la seguridad social EQUIVALENTE» a lo que aporta
//      al FAL, y el art. 24 del decreto explica cómo: «los empleadores detraerán mensualmente la
//      alícuota de contribución al Fondo de Asistencia Laboral (…) de aquella que les corresponde».
//      O sea que el peso no se suma al costo laboral: se desvía de la seguridad social a una cuenta
//      del propio empleador, inembargable (art. 74) y con rendimientos exentos de Ganancias (art.
//      67). **La excepción está escrita y es una sola:** las relaciones alcanzadas por el RIFL,
//      «mientras éste resulte aplicable», no tienen esa reducción (arts. 76 y 24 del decreto).
//
//   3. **El fondo NO reemplaza la indemnización.** Es la oración que decide todo y está en el
//      último párrafo del art. 58: «El presente régimen no modifica, sustituye, ni altera el
//      régimen indemnizatorio». El art. 64 lo repite del lado del dinero: «La existencia,
//      inexistencia o insuficiencia de recursos en la cuenta no limita, reduce, altera ni
//      condiciona la responsabilidad del empleador por el pago íntegro de las obligaciones a su
//      cargo». Y el art. 68 cierra: las administradoras «en ningún caso se considerarán sujetos
//      obligados frente al trabajador». El trabajador le sigue cobrando al empleador.
//
// LOS DOS PLAZOS QUE DEJAN AFUERA (y que son la letra chica que más cuesta):
//   · **Carencia de 6 períodos** (art. 65): el fondo «no responderá» hasta haber recibido las
//     contribuciones de al menos seis períodos mensuales. El art. 15 del decreto precisa el
//     cómputo: desde el mes calendario en que ARCA registra la efectiva integración de la primera
//     contribución, y son seis períodos «completos y consecutivos».
//   · **Antigüedad de 12 meses del trabajador** (art. 58): sólo hay cobertura respecto de
//     trabajadores registrados con no menos de doce meses de antelación a la extinción. Y «en
//     ningún caso y bajo ninguna circunstancia» respecto de trabajadores no registrados.
//
// QUIÉNES QUEDAN AFUERA DEL RÉGIMEN: el último párrafo del art. 58 excluye a la Ley 22.250
// (construcción, que ya tiene su propio fondo de cese) y a la Ley 26.844 (casas particulares). El
// art. 2 del decreto agrega el Sector Público (art. 8 de la Ley 24.156).
//
// LO QUE NO SE PUBLICA ACÁ, A PROPÓSITO: el rendimiento del fondo. Depende del vehículo de
// inversión colectiva que elija cada empleador (fondo común o fideicomiso financiero, art. 5 del
// decreto) y no hay un número legal. La calculadora acumula sólo los aportes, y lo dice.
//
// FUENTES: texto oficial de la Ley 27.802 (InfoLEG id 423680, Título II, arts. 58 a 77) y del
// Decreto 408/2026 (InfoLEG id 426272, arts. 1 a 28). Nunca una nota de prensa.

/** Fecha en que arranca el régimen, tras la prórroga del art. 27 del Decreto 408/2026. */
export const VIGENCIA_FAL = "1° de noviembre de 2026";

/** ISO de esa misma fecha. */
export const VIGENCIA_FAL_ISO = "2026-11-01";

/** La fecha que fijaba el art. 77 antes de la prórroga. */
export const VIGENCIA_ORIGINAL = "1° de junio de 2026";

/** Alícuotas del art. 60, en % de la base de contribuciones patronales al SIPA. */
export const ALICUOTAS = {
  /** Vigentes por el primer párrafo del art. 60. */
  vigentes: { grande: 1, pyme: 2.5 },
  /** Techos que el Poder Ejecutivo puede fijar (segundo párrafo del art. 60). */
  maximas: { grande: 1.5, pyme: 3 },
} as const;

/** Períodos mensuales de carencia antes de que el fondo responda (art. 65). */
export const PERIODOS_CARENCIA = 6;

/** Antigüedad mínima del trabajador para que haya cobertura (art. 58). */
export const MESES_ANTIGUEDAD_MINIMA = 12;

/** Tope de comisión de la entidad habilitada (art. 71 · art. 20 del decreto: global y anual). */
export const TOPE_COMISION_ANUAL = 1;

/** Plazo máximo para que la administradora transfiera al trabajador (art. 69). */
export const DIAS_HABILES_TRANSFERENCIA = 5;

/** Meses sin trabajadores registrados tras los cuales la cuenta se extingue (art. 72). */
export const MESES_SIN_TRABAJADORES = 6;

/** Múltiplo máximo de la multa del art. 75, sobre lo ingresado al fondo. */
export const MULTA_MULTIPLO = 2;

export const FAL_TEXTOS = {
  /** La oración que desmiente el titular más repetido. */
  noSustituye: "El presente régimen no modifica, sustituye, ni altera el régimen indemnizatorio.",
  /** El art. 64, del lado del dinero. */
  responsabilidadIntegra:
    "La existencia, inexistencia o insuficiencia de recursos en la cuenta no limita, reduce, altera ni condiciona la responsabilidad del empleador por el pago íntegro de las obligaciones a su cargo derivadas de la extinción del vínculo laboral.",
  /** El art. 68: la administradora no le debe nada al trabajador. */
  administradoraAjena:
    "Las entidades administradoras en ningún caso se considerarán sujetos obligados frente al trabajador, manteniéndose como terceros ajenos a la relación jurídica entre el empleador y el trabajador.",
  /** El art. 58 sobre los no registrados. */
  noRegistrados:
    "Los referidos fondos sólo podrán prestar cobertura respecto de trabajadores registrados con una antelación no menor a doce (12) meses de la fecha de la extinción de la relación laboral. En ningún caso y bajo ninguna circunstancia prestarán cobertura respecto de trabajadores no registrados.",
  /** El art. 60, primer párrafo: las dos alícuotas. */
  art60Primero:
    "Las cuentas de los Fondos de Asistencia Laboral se conformarán con una contribución mensual obligatoria del uno por ciento (1%) para las grandes empresas y dos coma cinco por ciento (2,5%) para las Micro, Pequeñas y Medianas Empresas, de acuerdo a lo previsto en la ley 24.467 y sus modificatorias, de las remuneraciones que se toman como base para el cálculo de las contribuciones patronales con destino al Sistema Integrado Previsional Argentino (SIPA) de cada trabajador.",
  /** El art. 60, segundo párrafo: los techos y quién los puede activar. */
  art60Segundo:
    "Los porcentajes de las cuentas de los Fondos de Asistencia podrán incrementarse hasta el uno coma cinco por ciento (1,5%) para las grandes empresas y hasta el tres por ciento (3%) para las Micro, Pequeñas y Medianas Empresas de las remuneraciones que se toman como base para el cálculo de las contribuciones patronales con destino al Sistema Integrado Previsional Argentino (SIPA) de cada trabajador, cuando así lo disponga el Poder Ejecutivo nacional atendiendo al cumplimiento de las metas asociadas a las políticas de equilibrio fiscal, previa aprobación de la Comisión Bicameral de Control de Fondos de la Seguridad Social del Honorable Congreso de la Nación.",
  /** El art. 76: la reducción equivalente de contribuciones patronales. */
  art76:
    "Los empleadores, por las relaciones laborales incluidas en el presente régimen, excepto que se trate de aquellas previstas en el Régimen de Incentivo a la Formalización Laboral (RIFL) y mientras persista sus efectos, tendrán una reducción en las contribuciones patronales con destino a la seguridad social equivalente a la que le resulte de aplicación de conformidad con lo dispuesto en el artículo 60.",
  /** El art. 24 del decreto: cómo se instrumenta esa reducción. */
  decretoArt24:
    "Para su implementación, los empleadores detraerán mensualmente la alícuota de contribución al Fondo de Asistencia Laboral, a la que se encuentren sujetos de acuerdo con las disposiciones del artículo 60 de dicha ley, de aquella que les corresponde.",
  /** El art. 65: la carencia. */
  art65:
    "A efectos de su capitalización y con el fin de garantizar la estabilidad financiera, el Fondo de Asistencia Laboral no responderá por las extinciones laborales previstas en el artículo 58 de la presente ley, hasta luego de haber recibido las contribuciones correspondientes a al menos seis (6) períodos mensuales, en los términos que determine la reglamentación.",
  /** El art. 15 del decreto: desde cuándo se cuenta esa carencia. */
  decretoArt15:
    "El período de carencia mínimo de SEIS (6) períodos mensuales se computará desde el mes calendario en que se registre en la AGENCIA DE RECAUDACIÓN Y CONTROL ADUANERO (ARCA) la efectiva integración de la primera contribución del empleador al Fondo de Asistencia Laboral, y abarcará SEIS (6) períodos de devengamiento y pago completos y consecutivos.",
  /** El art. 62: la cuenta es del empleador, no del trabajador. */
  art62:
    "Cada empleador tendrá una cuenta individual, de carácter común y no individualizable por trabajador, cuya administración estará a cargo de una entidad habilitada a través de uno de sus fondos que tenga autorizado a tal fin por la Comisión Nacional de Valores.",
  /** El art. 20 del decreto: el 1% de comisión es global y anual. */
  decretoArt20:
    "El tope de comisión del UNO POR CIENTO (1 %) es de carácter global e integral, y comprende la totalidad de las contraprestaciones que perciban las Entidades Habilitadas y cualquier otro interviniente, calculado en forma anual sobre el total de los activos administrados.",
  /** El art. 11 del decreto: nada del exterior. */
  decretoArt11:
    "Sólo se admitirá la inversión en instrumentos financieros o valores negociables emitidos y negociados en la REPÚBLICA ARGENTINA, no admitiéndose la inversión en instrumentos financieros o valores negociables cuyo activo subyacente se encuentre emitido o negociado en el exterior.",
  /** El art. 27 del decreto: la única prórroga de toda la ley. */
  decretoArt27:
    "Prorrógase, al 1° de noviembre de 2026, la fecha de entrada en vigencia del régimen establecido en el Título II - Fondo de Asistencia Laboral de la Ley de Modernización Laboral N° 27.802.",
  /** El art. 74: inembargabilidad. */
  art74:
    "Los Fondos, las cuentas individuales y todos los valores incorporados a ellos, serán inembargables y estarán afectados exclusivamente a la finalidad prevista en esta ley.",
  /** El art. 64, sobre la opción del empleador. */
  opcionDelEmpleador:
    "Ante cada situación prevista en el artículo 58 de la presente ley, que además cumpla con los requisitos previstos en el presente artículo, el empleador podrá optar por aplicar los recursos de la cuenta, o una parte de ellos, para el pago total o parcial de dicha obligación, o por no usarlos para ese caso y mantener los recursos en la cuenta.",
} as const;

/** Artículos de la LCT cuyo pago puede cubrirse con el fondo (art. 58). */
export const ARTICULOS_CUBIERTOS: { articulo: string; concepto: string }[] = [
  { articulo: "art. 95", concepto: "Despido antes del vencimiento del plazo (contrato a plazo fijo)" },
  { articulo: "art. 212, párrafos 2°, 3° y 4°", concepto: "Incapacidad: reubicación, imposibilidad e incapacidad absoluta" },
  { articulo: "art. 232", concepto: "Indemnización sustitutiva del preaviso" },
  { articulo: "art. 233", concepto: "Integración del mes de despido" },
  { articulo: "art. 241", concepto: "Extinción por voluntad concurrente de las partes" },
  { articulo: "art. 245", concepto: "Indemnización por antigüedad o despido sin causa" },
  { articulo: "art. 246", concepto: "Despido indirecto" },
  { articulo: "art. 247", concepto: "Fuerza mayor o falta o disminución de trabajo (la mitad del art. 245)" },
  { articulo: "art. 248", concepto: "Muerte del trabajador" },
  { articulo: "art. 250", concepto: "Vencimiento del plazo con preaviso y contrato cumplido" },
  { articulo: "art. 254", concepto: "Incapacidad o inhabilidad del trabajador" },
];

/** Regímenes que el propio art. 58 y el art. 2 del decreto dejan fuera. */
export const EXCLUIDOS: { norma: string; quienes: string; porQue: string }[] = [
  {
    norma: "Ley 22.250",
    quienes: "Industria de la construcción",
    porQue:
      "Ya tiene su propio fondo de cese laboral desde 1980: el régimen de la construcción reemplazó la indemnización por un fondo, que es justamente lo que el FAL NO hace.",
  },
  {
    norma: "Ley 26.844",
    quienes: "Personal de casas particulares",
    porQue:
      "El último párrafo del art. 58 lo excluye expresamente. Su despido se sigue liquidando por los arts. 42 a 48 de su propio régimen.",
  },
  {
    norma: "Ley 24.156, art. 8°",
    quienes: "Sector Público nacional, provincial y municipal",
    porQue:
      "No sale de la ley sino del art. 2 del Decreto 408/2026, que acota el régimen a los empleadores del sector privado.",
  },
];

export type FuenteFal = { nombre: string; url: string; detalle: string };

export const FAL_FUENTES: { consultadoEl: string; lista: FuenteFal[] } = {
  consultadoEl: "2026-08-27",
  lista: [
    {
      nombre: "Ley 27.802 — texto oficial, Título II (arts. 58 a 77)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "De acá salen las dos alícuotas y sus techos (art. 60), la carencia de seis períodos (art. 65), la antigüedad de doce meses y la oración «no modifica, sustituye, ni altera el régimen indemnizatorio» (art. 58), la responsabilidad íntegra del empleador (art. 64), el tope de comisión del 1% (art. 71) y la reducción equivalente de contribuciones patronales (art. 76).",
    },
    {
      nombre: "Decreto 408/2026 — reglamentación del Título II (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/425000-429999/426272/norma.htm",
      detalle:
        "La reglamentación completa, B.O. 1/6/2026. Su art. 27 es el que prorroga la entrada en vigencia al 1° de noviembre de 2026 —la única prórroga de toda la Ley de Modernización Laboral—; su art. 15 fija desde cuándo se cuenta la carencia; su art. 24, cómo se detrae la contribución patronal; su art. 20, que el 1% de comisión es global y anual; y su art. 11, que el fondo no puede invertir en activos del exterior.",
    },
    {
      nombre: "Ley 27.802 — B.O. 6/3/2026",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339542/20260306",
      detalle:
        "La publicación de la ley. El art. 217 fija que «salvo disposición en contrario» todo entra en vigencia con la publicación: el Título II es esa disposición en contrario, porque su art. 77 tenía fecha propia y una facultad de prórroga de hasta seis meses que el Poder Ejecutivo usó entera.",
    },
  ],
};
