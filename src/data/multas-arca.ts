// LAS MULTAS POR DEBERES FORMALES DE LA LEY 11.683 — y la reforma que las multiplicó.
//
// POR QUÉ ESTE ARCHIVO EXISTE (15/9/2026, s115, Turno de Madrugada). Es la regla de s80 aplicada a
// nuestro propio repo: el 4/9 `src/data/prescripcion-arca.ts` escribió, para justificar por qué
// miraba la prescripción, que «la Ley 27.799 es conocida como la que subió los montos del Régimen
// Penal Tributario». Esa línea era el índice de un filón sin cosechar: la MISMA ley, en sus arts.
// 15 a 29, reescribió la escala entera de sanciones por deberes formales de la Ley 11.683 —que
// estaba congelada desde 2003— y nadie lo contó.
//
// EL HALLAZGO, y es un número que cambia una decisión: la multa automática por no presentar una
// declaración jurada en término pasó de $200 a $220.000 (y de $400 a $440.000 para sociedades) el
// 2 de enero de 2026. Toda nota escrita antes de esa fecha —que es casi toda la web— publica los
// montos viejos, que eran simbólicos. Es el caso de manual de la regla de s83: no quedan
// incompletas, quedan diciendo que la sanción no importa.
//
// LO QUE NADIE PUBLICA, Y ES LO QUE DECIDE UN CASO:
//
//   1. **La actualización NO fue uniforme.** Publicar «se multiplicaron por mil» es cómodo y es
//      falso: el art. 38 se multiplicó por 1.100, el art. 39 por 1.000, el techo agravado del art.
//      39 por ~778, el piso de la clausura del art. 40 por 2.000 y la multa por empleo no
//      registrado por ~67. Por eso acá cada infracción lleva su monto anterior al lado: el
//      multiplicador se DERIVA, no se escribe.
//   2. **La multa del art. 38 se reduce a la MITAD de pleno derecho** —y no cuenta como
//      antecedente— si se paga y se presenta la DDJJ. Y hay DOS ventanas, no una: dentro de los
//      15 días de la notificación, o desde el vencimiento general hasta 15 días después de esa
//      notificación. La segunda casi nunca se cita.
//   3. **Reconocer la infracción baja el art. 39 al mínimo legal** (art. 50), por única vez. Entre
//      el mínimo y el techo agravado hay más de 200 veces de diferencia: es la decisión más cara
//      de la página.
//   4. **La clausura ya no alcanza a cualquier venta.** El acápite del art. 40 exige que el valor
//      de los bienes o servicios EXCEDA los $20.000 (antes, $10). Debajo de ese piso la conducta
//      puede ser infracción, pero no habilita la clausura del art. 40.
//
// LÍMITE HONESTO SOBRE EL ART. 49: su primer párrafo exime de «responsabilidad infraccional» a
// quien regulariza antes de la notificación de una orden de intervención, y —a diferencia de los
// párrafos siguientes, que enumeran los arts. 45, 46 y 48— NO nombra artículos. Acá se publica
// verbatim y con esa observación; no se afirma que cubra a las formales, porque el texto no lo
// dice y no hay norma verificada que lo resuelva.
//
// FUENTES leídas el 15/9/2026 en InfoLEG, TEXTO ACTUALIZADO (id 18771 = Decreto 821/98, texto
// ordenado de la Ley 11.683). Cada monto vigente y cada monto anterior salen de la nota de
// sustitución que el propio texto actualizado trae al pie de cada artículo.

export const VIGENCIA_MULTAS = {
  consultadoEl: "15 de septiembre de 2026",
  reforma: "Ley 27.799",
  reformaBO: "2 de enero de 2026",
  /** Los artículos de la 27.799 que reescribieron esta escala. */
  articulosReforma: "arts. 15 a 29",
  textoOrdenado: "Ley 11.683 (t.o. 1998 por Decreto 821/98)",
} as const;

export type Reduccion = {
  /** Fracción del monto que queda después de la reducción (0.5 = la mitad). */
  factor: number;
  /** Si es `true`, la reducción lleva la sanción al mínimo legal en vez de aplicar el factor. */
  alMinimo?: boolean;
  etiqueta: string;
  condicion: string;
  norma: string;
};

export type Infraccion = {
  id: string;
  /** Cómo la busca una persona, no cómo la titula la ley. */
  etiqueta: string;
  articulo: string;
  /** Multa de monto fijo (art. 38 y su artículo agregado). */
  fijo?: { persona: number; sociedad: number };
  /** Multa graduable entre un mínimo y un máximo. */
  rango?: { minimo: number; maximo: number };
  /** Los mismos importes ANTES de la Ley 27.799 — el multiplicador se deriva de acá. */
  anterior: { persona?: number; sociedad?: number; minimo?: number; maximo?: number };
  sustituidoPor: string;
  sinRequerimientoPrevio: boolean;
  reducciones: Reduccion[];
  /** Qué hay que saber además del número. */
  nota: string;
};

export const INFRACCIONES: readonly Infraccion[] = [
  {
    id: "ddjj-omitida",
    etiqueta: "No presenté una declaración jurada en término",
    articulo: "Art. 38",
    fijo: { persona: 220_000, sociedad: 440_000 },
    anterior: { persona: 200, sociedad: 400 },
    sustituidoPor: "art. 15 de la Ley 27.799",
    sinRequerimientoPrevio: true,
    reducciones: [
      {
        factor: 0.5,
        etiqueta: "Pago la multa y presento la declaración jurada",
        condicion:
          "dentro de los 15 días de la notificación, o desde el vencimiento general de la obligación hasta 15 días después de esa notificación",
        norma: "Ley 11.683, art. 38, párrafo tercero",
      },
    ],
    nota: "Es automática: la ley dice «sin necesidad de requerimiento previo». ARCA puede iniciarla con una notificación emitida por su sistema de computación de datos, que sirve de cabeza del sumario si no se paga ni se presenta.",
  },
  {
    id: "ddjj-informativa",
    etiqueta: "No presenté una declaración jurada informativa (régimen de información)",
    articulo: "Art. sin número agregado a continuación del art. 38",
    fijo: { persona: 5_000_000, sociedad: 10_000_000 },
    anterior: { persona: 5_000, sociedad: 10_000 },
    sustituidoPor: "art. 16 de la Ley 27.799",
    sinRequerimientoPrevio: true,
    reducciones: [],
    nota: "Alcanza a los regímenes de información propia del contribuyente y de información de terceros creados por resolución general de ARCA. No tiene la reducción a la mitad del art. 38: es otra norma, aunque viva en el artículo de al lado.",
  },
  {
    id: "requerimiento-informativa",
    etiqueta: "No contesté un requerimiento de ARCA para presentar informativas",
    articulo: "Art. sin número agregado a continuación del art. 39",
    rango: { minimo: 500_000, maximo: 35_000_000 },
    anterior: { minimo: 500, maximo: 45_000 },
    sustituidoPor: "art. 21 de la Ley 27.799",
    sinRequerimientoPrevio: false,
    reducciones: [],
    nota: "Es acumulable con la multa del artículo agregado a continuación del art. 38: no presentar la informativa y además no contestar el requerimiento son dos sanciones, no una. Y si ya hubo resolución condenatoria, cada reiteración sobre el mismo deber formal es una multa independiente, aunque las anteriores no estén firmes.",
  },
  {
    id: "deber-formal",
    etiqueta: "Incumplí un deber formal (caso general)",
    articulo: "Art. 39, primer párrafo",
    rango: { minimo: 150_000, maximo: 2_500_000 },
    anterior: { minimo: 150, maximo: 2_500 },
    sustituidoPor: "art. 19 de la Ley 27.799",
    sinRequerimientoPrevio: false,
    reducciones: [
      {
        factor: 1,
        alMinimo: true,
        etiqueta: "Reconozco la materialidad de la infracción",
        condicion:
          "en la primera oportunidad de defensa del sumario (o en la audiencia del art. 41), por única vez",
        norma: "Ley 11.683, art. 50",
      },
    ],
    nota: "Es la multa «paraguas»: cubre las violaciones a la ley, a las leyes tributarias, a los decretos reglamentarios y a toda otra norma de cumplimiento obligatorio que exija deberes formales. Es acumulable con la del art. 38.",
  },
  {
    id: "deber-formal-agravado",
    etiqueta: "Domicilio fiscal, resistencia a la fiscalización u operaciones internacionales",
    articulo: "Art. 39, segundo párrafo (incs. 1 a 4)",
    rango: { minimo: 150_000, maximo: 35_000_000 },
    anterior: { minimo: 150, maximo: 45_000 },
    sustituidoPor: "arts. 19 y 20 de la Ley 27.799",
    sinRequerimientoPrevio: false,
    reducciones: [
      {
        factor: 1,
        alMinimo: true,
        etiqueta: "Reconozco la materialidad de la infracción",
        condicion:
          "en la primera oportunidad de defensa del sumario (o en la audiencia del art. 41), por única vez",
        norma: "Ley 11.683, art. 50",
      },
    ],
    nota: "El mínimo es el mismo del primer párrafo: lo que cambia es el techo, que sube a $35.000.000 para cuatro supuestos tasados: infracciones al domicilio fiscal, resistencia a la fiscalización, no dar datos para el control de operaciones internacionales y no conservar los comprobantes de los precios pactados en esas operaciones.",
  },
  {
    id: "empleo-no-registrado",
    etiqueta: "Tengo trabajadores sin registrar",
    articulo: "Art. 40, párrafo agregado por la Ley 27.430",
    rango: { minimo: 200_000, maximo: 7_500_000 },
    anterior: { minimo: 3_000, maximo: 100_000 },
    sustituidoPor: "art. 29 de la Ley 27.799",
    sinRequerimientoPrevio: false,
    reducciones: [],
    nota: "Es «sin perjuicio de las demás sanciones que pudieran corresponder»: convive con las multas laborales y de la seguridad social. Y si el establecimiento tiene al menos 10 empleados y la mitad o más del personal relevado está sin registrar, el inciso g) del mismo artículo habilita además la clausura.",
  },
] as const;

/**
 * Clausura del art. 40 — no es una multa: es el cierre del local, y tiene un piso de valor.
 * El acápite exige que el valor de los bienes o servicios EXCEDA este monto.
 */
export const CLAUSURA = {
  articulo: "Art. 40",
  diasMinimo: 2,
  diasMaximo: 6,
  pisoValorOperacion: 20_000,
  pisoAnterior: 10,
  sustituidoPor: "art. 28 de la Ley 27.799",
  /** Art. 40, último párrafo: otra infracción del artículo dentro de 2 años duplica mínimo y máximo. */
  aniosReincidencia: 2,
  conductas: [
    "No emitir facturas o comprobantes equivalentes por una o más operaciones (inc. a).",
    "No llevar registraciones de compras, ventas o prestaciones, o llevarlas incompletas o defectuosas (inc. b).",
    "Encargar o transportar comercialmente mercadería sin el respaldo documental exigido (inc. c).",
    "No estar inscripto como contribuyente o responsable estando obligado (inc. d).",
    "No poseer ni conservar las facturas que acrediten la adquisición o tenencia de los bienes o servicios de la actividad (inc. e).",
    "No tener, no mantener operativos o no usar los instrumentos de medición y control de la producción exigidos (inc. f).",
    "En un establecimiento de al menos 10 empleados, tener el 50% o más del personal relevado sin registrar (inc. g).",
  ],
} as const;

/** Umbral de ingresos brutos anuales que dispara la multa agravada de 2 a 10 veces el máximo. */
export const UMBRAL_GRANDES_CONTRIBUYENTES = {
  ingresosBrutosAnuales: 10_000_000_000,
  anterior: 10_000_000,
  vecesMinimo: 2,
  vecesMaximo: 10,
  sustituidoPor: "art. 22 de la Ley 27.799",
} as const;

export const MULTAS_TEXTOS = {
  art38Primero:
    "Cuando existiere la obligación de presentar declaraciones juradas, la omisión de hacerlo dentro de los plazos generales que establezca la ADMINISTRACION FEDERAL DE INGRESOS PUBLICOS, será sancionada, sin necesidad de requerimiento previo, con una multa de pesos doscientos veinte mil ($220.000), la que se elevará a pesos cuatrocientos cuarenta mil ($440.000) si se tratare de sociedades, asociaciones o entidades de cualquier clase constituidas en el país o de establecimientos organizados en forma de empresas estables.",
  art38Reduccion:
    "Si dentro del plazo de QUINCE (15) días a partir de la notificación el infractor pagare voluntariamente la multa y presentare la declaración jurada omitida, los importes señalados en el párrafo primero de este artículo, se reducirán de pleno derecho a la mitad y la infracción no se considerará como un antecedente en su contra. El mismo efecto se producirá si ambos requisitos se cumplimentaren desde el vencimiento general de la obligación hasta los QUINCE (15) días posteriores a la notificación mencionada.",
  art39Primero:
    "Serán sancionadas con multas de pesos ciento cincuenta mil ($150.000) a pesos dos millones quinientos mil ($2.500.000) las violaciones a las disposiciones de esta ley, de las respectivas leyes tributarias, de los decretos reglamentarios y de toda otra norma de cumplimiento obligatorio, que establezcan o requieran el cumplimiento de deberes formales tendientes a determinar la obligación tributaria, a verificar y fiscalizar el cumplimiento que de ella hagan los responsables.",
  art39Acumulable:
    "Las multas previstas en este artículo, en su caso, son acumulables con las establecidas en el artículo 38 de la presente ley.",
  art40Acapite:
    "Serán sancionados con clausura de dos (2) a seis (6) días del establecimiento, local, oficina, recinto comercial, industrial, agropecuario o de prestación de servicios, o puesto móvil de venta, siempre que el valor de los bienes o servicios de que se trate exceda de pesos veinte mil ($20.000), quienes:",
  art40NoRegistrado:
    "Sin perjuicio de las demás sanciones que pudieran corresponder, se aplicará una multa de pesos doscientos mil ($200.000) a pesos siete millones quinientos mil ($7.500.000) a quienes ocuparen trabajadores en relación de dependencia y no los registraren y declararen con las formalidades exigidas por las leyes respectivas.",
  art40Reincidencia:
    "El mínimo y el máximo de las sanciones de multa y clausura se duplicarán cuando se cometa otra infracción de las previstas en este artículo dentro de los DOS (2) años desde que se detectó la anterior.",
  art49Primero:
    "Si un contribuyente o responsable que no fuere reincidente en infracciones materiales regularizara su situación antes de que se le notifique una orden de intervención mediante la presentación de la declaración jurada original omitida o de su rectificativa, quedará exento de responsabilidad infraccional.",
  art50:
    "Si en la primera oportunidad de defensa en la sustanciación de un sumario por infracción al artículo 39 o en la audiencia que marca el artículo 41, el titular o representante legal reconociere la materialidad de la infracción cometida, las sanciones se reducirán, por única vez, al mínimo legal.",
  reincidencia:
    "Se entenderá que existe reincidencia, cuando el infractor condenado por sentencia o resolución firme por la comisión de alguna de las infracciones previstas en esta ley, cometiera con posterioridad a dicha sentencia o resolución, una nueva infracción de la misma naturaleza. La condena no se tendrá en cuenta a los fines de la reincidencia cuando hubieran transcurrido cinco (5) años desde que ella se impuso.",
  errorExcusable:
    "Se considerará que existe error excusable cuando la norma aplicable al caso —por su complejidad, oscuridad o novedad— admitiera diversas interpretaciones que impidieran al contribuyente o responsable, aun actuando con la debida diligencia, comprender su verdadero significado.",
} as const;

const TEXACT =
  "https://servicios.infoleg.gob.ar/infolegInternet/anexos/15000-19999/18771/texact.htm";

export const MULTAS_FUENTES = {
  consultadoEl: VIGENCIA_MULTAS.consultadoEl,
  principal: {
    nombre: "Ley 11.683 (t.o. 1998), texto actualizado en InfoLEG",
    url: TEXACT,
  },
  lista: [
    {
      nombre: "Ley 11.683, arts. 38 y 38 s/n, texto actualizado",
      url: TEXACT,
      detalle:
        "La multa automática por no presentar la declaración jurada ($220.000 / $440.000), su reducción de pleno derecho a la mitad con las dos ventanas de 15 días, y las multas de las declaraciones juradas informativas.",
    },
    {
      nombre: "Ley 11.683, arts. 39 y 39 s/n, texto actualizado",
      url: TEXACT,
      detalle:
        "La multa por deberes formales ($150.000 a $2.500.000), el techo agravado de $35.000.000 para los cuatro supuestos tasados, la acumulabilidad con el art. 38 y la multa por no contestar requerimientos.",
    },
    {
      nombre: "Ley 11.683, art. 40, texto actualizado",
      url: TEXACT,
      detalle:
        "La clausura de 2 a 6 días con su piso de valor de operación de $20.000, las siete conductas que la habilitan, la multa por empleo no registrado y la duplicación por otra infracción dentro de 2 años.",
    },
    {
      nombre: "Ley 11.683, arts. 49 y 50, texto actualizado",
      url: TEXACT,
      detalle:
        "La exención por regularizar antes de la orden de intervención y la reducción al mínimo legal por reconocer la materialidad de la infracción, más las definiciones de reincidencia y error excusable.",
    },
    {
      nombre: "Ley 27.799 (B.O. 2/1/2026): la reforma que fijó estos montos",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/15000-19999/18771/texact.htm",
      detalle:
        "Sus arts. 15 a 29 sustituyeron cada importe de la escala. Cada monto anterior que publica esta página sale de la nota de sustitución del propio texto actualizado de la Ley 11.683.",
    },
  ],
} as const;
