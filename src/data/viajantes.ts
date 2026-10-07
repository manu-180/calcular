// Viajantes de comercio: la indemnización por clientela del art. 14 de la Ley 14.546 — y el
// 1° de enero de 2027, día en que todo este régimen deja de existir.
//
// POR QUÉ ESTE ARCHIVO EXISTE (23/8/2026, s92). El Título XXVI de la Ley 27.802 (arts. 197 a 218)
// no sustituye artículos: DEROGA leyes enteras. Su art. 198 dice, completo: «Derógase la ley
// 14.546 y sus modificatorias, a partir del 1º de enero de 2027». Es la regla de s83 en su forma
// más limpia — no queda un texto nuevo que contradiga al viejo, queda un vacío con fecha.
//
// Y del otro lado, la regla de s91: los «Antecedentes Normativos» del texto actualizado de la
// Ley 14.546 sólo registran normas ajenas a su articulado (la Ley 18.596 sobre oportunidades de
// pago, derogada en 1974, y el Decreto 849/96 sobre viáticos, derogado en 1996). Los artículos
// que deciden la plata —el 5, el 6, el 9, el 13 y el 14— llegan SIN UNA SOLA MODIFICACIÓN desde
// el 29 de septiembre de 1958. Sesenta y ocho años de doctrina, modelos de demanda y notas
// escritas sobre un estatuto que el 1/1/2027 desaparece.
//
// LO QUE LA SERP TIENE MAL, verificado el 23/8/2026:
//   · Las notas que cubrieron la derogación la contaron como PROYECTO («la reforma propone»,
//     «tras la media sanción»). La ley está sancionada y publicada: B.O. del 6/3/2026.
//   · Circula una versión equivocada del importe: «el 25% de la remuneración total de los últimos
//     cinco años». El art. 14 no dice eso. Dice «el veinticinco por ciento de lo que le hubiere
//     correspondido en caso de despido intempestivo e injustificado»: es un porcentaje de una
//     INDEMNIZACIÓN, no de las remuneraciones.
//   · Casi nadie publica lo que hace única a esta indemnización: se cobra «cualquiera sea el
//     motivo determinante de la disolución del contrato». También si el viajante RENUNCIA.
//
// LO QUE ESTA PÁGINA NO INVENTA: el art. 14 dice «lo que le hubiere correspondido en caso de
// despido intempestivo e injustificado» sin enumerar los rubros. Hay dos lecturas razonables
// —sólo la indemnización por antigüedad del art. 245, o esa más el preaviso omitido que un
// despido «intempestivo» genera— y la ley no las dirime. Se muestran LAS DOS, con su artículo,
// en vez de elegir una y presentarla como si fuera la única.
//
// REGLA DE ORO: estos datos se verifican SOLO contra fuentes oficiales, nunca blogs.

export const VIAJANTES_FUENTES = {
  consultadoEl: "2026-08-23",
  consultadoEnTexto: "23 de agosto de 2026",
  lista: [
    {
      nombre: "Ley 14.546: Estatuto del viajante de comercio, texto ACTUALIZADO (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/95000-99999/96295/texact.htm",
      detalle:
        "el régimen completo, sancionado el 29 de septiembre de 1958. Sus «Antecedentes Normativos» no registran ninguna modificación a los arts. 5, 6, 9, 13 y 14: el texto de la indemnización por clientela es el original.",
    },
    {
      nombre: "Ley 27.802 de Modernización Laboral: Título XXVI, art. 198 (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=423680",
      detalle:
        "«Derógase la ley 14.546 y sus modificatorias, a partir del 1º de enero de 2027». Publicada en el B.O. del 6 de marzo de 2026; al 23/8/2026 ninguna norma posterior modificó ese artículo (la única prórroga de la ley, el art. 27 del Dec. 408/2026, alcanza al Título II).",
    },
    {
      nombre: "Ley de Contrato de Trabajo 20.744, texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "arts. 231 a 233 y 245 con el texto de la Ley 27.802: es la indemnización sobre la que se calcula el 25% de la clientela, y el régimen que queda cuando el estatuto se deroga.",
    },
  ],
};

/** Art. 198 de la Ley 27.802: el día en que la Ley 14.546 deja de estar vigente. */
export const DEROGACION_ISO = "2027-01-01";
export const DEROGACION_TEXTO = "1° de enero de 2027";

/** Último día con el estatuto vigente. */
export const ULTIMO_DIA_VIGENTE_ISO = "2026-12-31";
export const ULTIMO_DIA_VIGENTE_TEXTO = "31 de diciembre de 2026";

/** B.O. de la Ley 27.802 (art. 217: rige desde su publicación salvo disposición en contrario). */
export const REFORMA_PUBLICADA = "6 de marzo de 2026";

/** Art. 14: el 25% de lo que le hubiere correspondido por despido intempestivo e injustificado. */
export const PORCENTAJE_CLIENTELA = 0.25;

/** Art. 14: «una vez transcurrido un año de vigencia» del contrato. */
export const MESES_MINIMOS_CLIENTELA = 12;

/** Art. 5 inc. b): plazos para rechazar por escrito una nota de venta (si no, queda aceptada). */
export const DIAS_ACEPTACION_NOTA = { mismaZona: 15, otrasZonas: 30 };

/** Art. 13: descanso al finalizar cada gira, por semana de viaje realizada. */
export const DIAS_DESCANSO_POR_SEMANA_GIRA = 1.5;

/** Art. 4: plazo de prescripción que fija el estatuto (ver la nota de la página: la LCT dice otro). */
export const ANIOS_PRESCRIPCION_ESTATUTO = 5;

export type MotivoDisolucion =
  | "despido-sin-causa"
  | "renuncia"
  | "mutuo-acuerdo"
  | "despido-con-causa"
  | "jubilacion";

/**
 * Los motivos de disolución del contrato. El art. 14 es explícito: la indemnización por clientela
 * se paga «cualquiera sea el motivo determinante de la disolución del contrato». Lo que cambia
 * según el motivo es el RESTO de la liquidación, no la clientela.
 */
export const MOTIVOS: Array<{
  id: MotivoDisolucion;
  etiqueta: string;
  /** ¿Corresponden las indemnizaciones por despido (arts. 232, 233 y 245)? */
  conIndemnizacionDespido: boolean;
  nota: string;
}> = [
  {
    id: "despido-sin-causa",
    etiqueta: "Despido sin causa",
    conIndemnizacionDespido: true,
    nota: "Cobra la indemnización completa de la LCT (arts. 232, 233 y 245) y, encima, la clientela del art. 14.",
  },
  {
    id: "renuncia",
    etiqueta: "Renuncia del viajante",
    conIndemnizacionDespido: false,
    nota: "Es el caso que casi no se publica: el art. 14 paga la clientela «cualquiera sea el motivo determinante de la disolución», así que también se cobra habiendo renunciado. Las indemnizaciones por despido, no.",
  },
  {
    id: "mutuo-acuerdo",
    etiqueta: "Mutuo acuerdo (art. 241 LCT)",
    conIndemnizacionDespido: false,
    nota: "La extinción por acuerdo no genera indemnización por despido, pero sí la clientela: el art. 14 no distingue por motivo.",
  },
  {
    id: "despido-con-causa",
    etiqueta: "Despido con justa causa",
    conIndemnizacionDespido: false,
    nota: "El despido con causa acreditada no paga las indemnizaciones de los arts. 232, 233 y 245. La clientela del art. 14 no está condicionada al motivo, y se calcula igual sobre el despido hipotético.",
  },
  {
    id: "jubilacion",
    etiqueta: "Jubilación del viajante",
    conIndemnizacionDespido: false,
    nota: "El contrato se disuelve y corre el art. 14 igual que en los demás casos.",
  },
];

/**
 * Lo que un viajante de comercio pierde el 1° de enero de 2027. Cada fila es un artículo del
 * estatuto que hoy está vigente, con su texto verificado, y qué fuente queda en su lugar.
 * Ninguna fila afirma que la LCT trae un equivalente: cuando el estatuto se va, la fuente pasa a
 * ser lo que digan el convenio colectivo aplicable y el contrato individual.
 */
export const QUE_SE_PIERDE: Array<{
  articulo: string;
  titulo: string;
  hoy: string;
  desde2027: string;
}> = [
  {
    articulo: "Art. 14",
    titulo: "Indemnización por clientela",
    hoy: "El 25% de lo que le hubiere correspondido por un despido intempestivo e injustificado, con más de un año de contrato y cualquiera sea el motivo de la disolución.",
    desde2027:
      "No queda. Es una indemnización propia del estatuto: la LCT no tiene un rubro equivalente.",
  },
  {
    articulo: "Art. 6",
    titulo: "Comisión indirecta",
    hoy: "Las ventas hechas a clientes de su zona o de su nómina sin su intervención se le pagan igual, y «la tasa o por ciento de la comisión indirecta será igual a la directa».",
    desde2027:
      "Pasa a depender de lo que diga el convenio colectivo aplicable o el contrato: la ley general no regula la comisión indirecta.",
  },
  {
    articulo: "Art. 5 inc. b)",
    titulo: "Aceptación tácita de la nota de venta",
    hoy: "La nota de venta que no se rechaza por escrito dentro de los 15 días (misma zona) o 30 (las demás) queda aceptada, y el rechazo debe fundarse e informarse.",
    desde2027: "No queda el plazo automático: la comisión vuelve a discutirse caso por caso.",
  },
  {
    articulo: "Art. 5 inc. c) y último párrafo",
    titulo: "Comisiones que sobreviven al cese",
    hoy: "La comisión se paga aunque el pedido aceptado se cumpla después de que el viajante dejó el puesto, y se liquida en el acto del despido o dentro del tercer día de la aceptación.",
    desde2027: "Sin norma legal propia que lo imponga.",
  },
  {
    articulo: "Art. 9",
    titulo: "Conformidad expresa para cambiar la zona",
    hoy: "El empleador necesita la conformidad expresa del viajante para cambiarlo de zona, y debe garantizarle el mismo volumen de remuneraciones. También si le reduce la zona o la nómina de clientes.",
    desde2027:
      "Queda el régimen general de modificación de las condiciones de trabajo de la LCT, sin la garantía específica del volumen remuneratorio.",
  },
  {
    articulo: "Arts. 10 y 11",
    titulo: "Libro especial y carga de la prueba invertida",
    hoy: "El empleador lleva un libro rubricado con la zona, las comisiones y cada nota de venta; si se discute el monto o el cobro de las remuneraciones, «la prueba contraria a la reclamación corresponderá a la parte patronal».",
    desde2027:
      "Desaparece el libro específico del viajante y la regla probatoria propia del estatuto.",
  },
  {
    articulo: "Art. 12",
    titulo: "No responde por la insolvencia del cliente",
    hoy: "Salvo dolo o culpa grave, el viajante no responde si el cliente no paga.",
    desde2027: "Sin norma legal propia que lo diga.",
  },
  {
    articulo: "Art. 13",
    titulo: "Descanso después de la gira",
    hoy: "Un día y medio de descanso por cada semana de viaje, al finalizar cada gira.",
    desde2027: "Queda el régimen general de descansos de la LCT.",
  },
];

/**
 * Las otras leyes que el mismo Título XXVI deroga en la misma fecha. El nombre de cada una es el
 * TÍTULO OFICIAL de la norma en InfoLEG, abierto uno por uno el 23/8/2026 — no una descripción
 * deducida del número. (La primera versión de esta lista tenía tres nombres inventados de memoria:
 * la 23.947 no es un régimen naval sino el Estatuto del Peluquero, la 23.472 no es del vidrio sino
 * el Fondo de Garantía de Créditos Laborales y la 12.867 es el Estatuto de Choferes. De ahí sale la
 * regla del turno: el número de una ley no se traduce de memoria, se abre.)
 */
export const OTRAS_DEROGACIONES = [
  {
    articulo: "Art. 197",
    ley: "Ley 12.908",
    que: "Estatuto del Periodista Profesional",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=43608",
  },
  {
    articulo: "Art. 199",
    ley: "Ley 27.555",
    que: "Régimen Legal del Contrato de Teletrabajo",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=341093",
  },
  {
    articulo: "Art. 200",
    ley: "Ley 23.947",
    que: "Estatuto del Peluquero",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=347",
  },
  {
    articulo: "Art. 201",
    ley: "Ley 23.472",
    que: "Fondo de Garantía de Créditos Laborales",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=21976",
  },
  {
    articulo: "Art. 205",
    ley: "Ley 12.867",
    que: "Estatuto de Choferes (choferes particulares)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=43592",
  },
];

/**
 * Textos VERBATIM. Se guardan enteros a propósito: el valor de la página es poder leer el
 * artículo vigente sin intermediarios, y contrastarlo con lo que se publica sobre él.
 */
export const TEXTOS = {
  art14:
    "En el caso de disolución del contrato individual de trabajo, una vez transcurrido un año de vigencia del mismo, todo viajante tendrá derecho a una indemnización por clientela, cuyo monto estará representado por el veinticinco por ciento de lo que le hubiere correspondido en caso de despido intempestivo e injustificado. Esta indemnización que percibirá el viajante o sus causahabientes, cualquiera sea el motivo determinante de la disolución del contrato, no excluye las que les correspondieran de acuerdo a los artículos 154 a 160 del Código de Comercio para los casos allí previstos.",

  art198Ley27802: "Derógase la ley 14.546 y sus modificatorias, a partir del 1º de enero de 2027.",

  art217Ley27802:
    "Salvo disposición en contrario los artículos de la presente ley entrarán en vigencia a partir de su publicación en el Boletín Oficial.",

  art2:
    "Dentro de la especificación genérica de viajante a que se refiere el artículo 1°, se encuentran comprendidos los distintos nombres con que se acostumbra a llamarlos, como ser: viajantes, viajantes de plaza, placistas, corredores, viajantes o corredores de industria, corredores de plaza o interior, agentes, representantes, corredores domiciliarios o cualquier otra denominación que se les diera o pretendiera imponérseles para su calificación. Se entenderá que existe relación de dependencia con su o sus empleadores, cuando se acredite alguno o algunos de los siguientes requisitos: a) Que venda a nombre o por cuenta de su o sus representados o empleadores; b) Que venda a los precios y condiciones de venta fijados por las casas que representa; c) Que perciba como retribución: sueldo, viático, comisión o cualquier otro tipo de remuneración; d) Que desempeñe habitual y personalmente su actividad de viajante; e) Que realice su prestación de servicios dentro de zona o radio determinado o de posible determinación; f) Que el riesgo de las operaciones esté a cargo del empleador.",

  art4:
    "La presente ley es de orden público y será nula toda convención o acto jurídico por el cual el viajante renuncie a los beneficios consagrados en la misma o tiendan a su reducción. Las acciones emergentes de esta ley prescribirán a los cinco años, salvo las derivadas de la aplicación de otras leyes a las cuales se remite la presente, en cuyo caso el término será el que aquéllas determinen.",

  art6:
    "Si la operación no fuese concertada por intermedio del viajante, éste tendrá derecho a la comisión siempre que se trate de una operación con un cliente de la zona atribuida al viajante y durante el tiempo de su desempeño, o con un cliente de la nómina a su cargo, y en ambos casos, haya o no concertado operaciones anteriores con ese cliente por intermedio del mismo viajante. La tasa o por ciento de la comisión indirecta será igual a la directa.",

  art9:
    "Los comerciantes o industriales deberán requerir la conformidad expresa del viajante en el caso de que desearen cambiarlo o trasladarlo de zona. En estos casos deberá asegurársele al viajante el mismo volumen de remuneraciones y el pago de los gastos de traslado. La garantía del volumen remuneratorio deberá asegurarse igualmente en los casos de reducción de zona, lista o nómina de clientes.",

  art11:
    "Incumbirá al comerciante o industrial la prueba en contrario si el viajante o sus derechohabientes prestan declaración jurada sobre los hechos que debieron consignarse en el libro a que se refiere el artículo anterior. En los casos en que se controvierta el monto o cobro de remuneraciones del viajante, la prueba contraria a la reclamación corresponderá a la parte patronal. En todo caso, los comerciantes o industriales deberán conservar las notas de venta remitidas o elevadas por los viajantes no siéndoles admitida su destrucción hasta transcurridos los plazos establecidos en el artículo 4°.",

  art13:
    "Todo viajante que actúe fuera de la plaza de su principal, al finalizar cada gira gozará de un período de descanso en una proporción de un día y medio por cada semana de viaje realizado, sin perjuicio de las licencias y vacaciones establecidas en el artículo 156 del Código de Comercio.",
};

/** Los seis requisitos del art. 2: alcanza con acreditar «alguno o algunos» de ellos. */
export const REQUISITOS_DEPENDENCIA = [
  "Vende a nombre o por cuenta de su o sus representados o empleadores.",
  "Vende a los precios y condiciones de venta que fijan las casas que representa.",
  "Percibe como retribución sueldo, viático, comisión o cualquier otro tipo de remuneración.",
  "Desempeña habitual y personalmente su actividad de viajante.",
  "Presta servicios dentro de una zona o radio determinado o de posible determinación.",
  "El riesgo de las operaciones está a cargo del empleador.",
];
