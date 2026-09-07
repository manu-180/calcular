// Impuestos internos que la Ley 27.802 dejó sin efecto — art. 195 (Título XXV, Capítulo I).
// Leído el 30/8/2026 en dos textos oficiales de InfoLEG: la Ley 27.802 (id 423680) y el TEXTO
// ACTUALIZADO de la Ley de Impuestos Internos 24.674 (id 38621).
//
// POR QUÉ ESTE ARCHIVO EXISTE (30/8/2026, s98): los Títulos XXIV y XXV eran los dos últimos títulos
// impositivos de la Ley 27.802 que seguían «sin auditar» en docs/mapeo-ley-27802.md. El art. 195
// resultó ser el único artículo de toda la reforma que elimina un impuesto entero, y lo hace en una
// sola oración, sin tocar ni un artículo de la ley que lo crea.
//
// LAS TRES COSAS QUE NO ESTÁN EN NINGUNA NOTA, y que son toda la página:
//
//   1. **La fecha no es la de la ley.** La 27.802 se publicó el 6/3/2026 y rige desde ese día
//      (art. 217), pero el art. 195 no dice «desde la vigencia»: dice «a partir del primer día del
//      mes inmediato siguiente». O sea el 1 de abril de 2026. Entre el 6 y el 31 de marzo el
//      impuesto se siguió pagando.
//
//   2. **La alícuota que figura en la ley NO es lo que encarecía el precio.** El art. 4° de la Ley
//      24.674 manda liquidar sobre el precio neto de venta de la factura y agrega: «En ningún caso
//      se podrá descontar valor alguno en concepto del impuesto de esta ley». O sea que el impuesto
//      integra su propia base. Un 20% nominal es un 25% sobre el precio limpio (20/80); un 35% es
//      un 53,85%. Esa es la tasa efectiva, y es la que se siente en el mostrador.
//
//   3. **«Seguros» no es un impuesto: son tres alícuotas distintas** (art. 27), y la del medio es
//      laboral: 2,5% sobre la prima de los seguros de accidente de trabajo, o sea sobre la cuota de
//      ART que paga el empleador. El 1‰ general y el 23% del asegurador radicado en el exterior son
//      los otros dos. Ninguna nota separa los tres.
//
// Y UN CUARTO, EN EL CAPÍTULO DE LOS VEHÍCULOS: el Decreto 50/2025 (B.O. 31/1/2025) ya había dejado
// sin efecto el 20% y bajado el 35% al 18% y el 30% al 15% —transitoriamente, hasta el 30/6/2027—
// para los bienes de los incisos a), b), c), d) y e) del art. 38. El inciso f) —aeronaves, aviones,
// hidroaviones, planeadores y helicópteros de recreo o deporte— no está en esa lista: su 20% siguió
// vigente hasta que lo eliminó la ley. Es el único rubro del Capítulo IX que la 27.802 baja de
// verdad respecto de 2025; en los demás, lo que cambia es que el alivio deja de depender de un
// decreto que hay que renovar y pasa a estar en la ley.
//
// LO QUE ESTA PÁGINA NO PUBLICA, A PROPÓSITO:
//   · **Los montos exentos del Capítulo IX.** El art. 39 los escribió en 2019 ($1.300.000,
//     $390.000, $1.700.000) y manda actualizarlos TRIMESTRALMENTE por el IPIM. El valor vigente no
//     está en la ley y no se puede derivar de ella: publicar el número viejo como si fuera el de hoy
//     sería inventar un dato. Se explica la mecánica y se manda a la fuente.
//   · **Cuánto bajó el precio final de nada.** La ley elimina el impuesto; que el vendedor traslade
//     ese ahorro al precio es una decisión comercial, no un efecto legal. Lo que sí es aritmética
//     verificable es cuánto del importe era impuesto, y es lo que se calcula.
//   · **La historia de las suspensiones por decreto de cada rubro.** InfoLEG acumula décadas de
//     notas de decretos que dejaron el gravamen «transitoriamente sin efecto»; atribuir cada una a
//     su capítulo exige leer el decreto, no la nota. Se cita únicamente el Decreto 50/2025, que
//     figura al pie del art. 39 y dice a qué incisos alcanza.

/** Fecha desde la que los rubros del art. 195 dejaron de tributar. */
export const VIGENCIA_ELIMINACION = "1 de abril de 2026";

/** ISO de esa misma fecha. */
export const VIGENCIA_ELIMINACION_ISO = "2026-04-01";

/** Publicación de la Ley 27.802 en el Boletín Oficial. */
export const BO_LEY_27802 = "6 de marzo de 2026";

/** Cómo se llama la base sobre la que cada rubro liquidaba. */
export type BaseRubro = "precioNeto" | "importeFacturado" | "prima";

export const ETIQUETAS_BASE: Record<BaseRubro, string> = {
  precioNeto: "precio neto de venta de la factura",
  importeFacturado: "importe facturado al usuario",
  prima: "prima del seguro",
};

export type Rubro = {
  id: string;
  etiqueta: string;
  /** Alícuota nominal, en tanto por uno. */
  alicuota: number;
  /** Cómo se escribe la alícuota en el texto (1‰ no es lo mismo que 0,1%). */
  alicuotaTexto: string;
  /** Artículo de la Ley 24.674 que la fija. */
  articulo: string;
  base: BaseRubro;
  /** Si el gravamen se aplicaba en cada etapa de comercialización (sólo Capítulo VIII). */
  todasLasEtapas: boolean;
  /** Si el art. 39 le pone un monto exento actualizable trimestralmente. */
  tieneMontoExento: boolean;
  /** Si en 2026, antes de la ley, la alícuota ya estaba suspendida o reducida por el Dec. 50/2025. */
  yaSuspendidoPorDecreto: boolean;
  detalle: string;
};

/**
 * Los rubros del art. 195, con la alícuota que cada uno tenía en el texto de la Ley 24.674.
 * El orden sigue al del propio art. 195: seguros, telefonía, suntuarios, Capítulo IX.
 */
export const RUBROS: Rubro[] = [
  {
    id: "art",
    etiqueta: "Seguro de accidentes de trabajo (ART)",
    alicuota: 0.025,
    alicuotaTexto: "2,5%",
    articulo: "art. 27, primer párrafo (excepción)",
    base: "prima",
    todasLasEtapas: false,
    tieneMontoExento: false,
    yaSuspendidoPorDecreto: false,
    detalle:
      "El art. 27 fija el 1‰ general «excepto en el caso de seguros de accidente de trabajo que pagarán el dos con cinco por ciento (2,5%)». Es veinticinco veces la alícuota general y recae sobre la prima de ART que paga el empleador: el único de los cinco rubros del art. 195 que es un costo laboral.",
  },
  {
    id: "seguros",
    etiqueta: "Seguro contratado en el país (alícuota general)",
    alicuota: 0.001,
    alicuotaTexto: "1‰ (uno por mil)",
    articulo: "art. 27, primer párrafo",
    base: "prima",
    todasLasEtapas: false,
    tieneMontoExento: false,
    yaSuspendidoPorDecreto: false,
    detalle:
      "«Las entidades de seguros legalmente establecidas o constituidas en el país pagarán un impuesto del uno por mil (1‰) sobre las primas de seguros que contraten». Ojo: varios seguros ya estaban exentos por el artículo sin número agregado a continuación del art. 29 — los agrícolas, los de vida individuales o colectivos, los de accidentes personales y los colectivos que cubren gastos de internación, cirugía o maternidad.",
  },
  {
    id: "seguros_exterior",
    etiqueta: "Seguro con asegurador radicado fuera del país",
    alicuota: 0.23,
    alicuotaTexto: "23%",
    articulo: "art. 27, segundo párrafo",
    base: "prima",
    todasLasEtapas: false,
    tieneMontoExento: false,
    yaSuspendidoPorDecreto: false,
    detalle:
      "Los seguros sobre personas —excepto vida y accidentes personales— y sobre bienes situados o destinados a la Argentina, hechos por aseguradores radicados fuera del país, pagaban el 23% sobre las primas de riesgo generales. La misma tasa regía cuando el seguro se contrataba directamente en el extranjero, y ahí el responsable del impuesto era el asegurado, no la compañía (art. 28).",
  },
  {
    id: "celular",
    etiqueta: "Telefonía celular y satelital",
    alicuota: 0.05,
    alicuotaTexto: "5%",
    articulo: "art. 30",
    base: "importeFacturado",
    todasLasEtapas: false,
    tieneMontoExento: false,
    yaSuspendidoPorDecreto: false,
    detalle:
      "«Establécese un impuesto del cinco por ciento (5%) sobre el importe facturado por la provisión de servicio de telefonía celular y satelital al usuario». El art. 31 aclara que también alcanzaba «la venta de tarjetas prepagas y/o recargables», o sea que la recarga de un prepago pagaba lo mismo que el abono.",
  },
  {
    id: "suntuarios",
    etiqueta: "Objetos suntuarios (joyas, pieles, alfombras anudadas)",
    alicuota: 0.2,
    alicuotaTexto: "20%",
    articulo: "art. 35",
    base: "precioNeto",
    todasLasEtapas: true,
    tieneMontoExento: false,
    yaSuspendidoPorDecreto: false,
    detalle:
      "El único rubro que se gravaba «en cada una de las etapas de su comercialización». El art. 2° dice que los impuestos de la ley inciden en una sola etapa «excepto en el caso de los bienes comprendidos en el Capítulo VIII», que es justamente éste. El art. 37 mitiga el arrastre: fabricantes, talleristas y revendedores podían computar como pago a cuenta el impuesto pagado por los productos gravados que usaran.",
  },
  {
    id: "autos_35",
    etiqueta: "Automóvil o motor — tramo superior del art. 39 (35% de la ley)",
    alicuota: 0.35,
    alicuotaTexto: "35%",
    articulo: "art. 39, tercer párrafo",
    base: "precioNeto",
    todasLasEtapas: false,
    tieneMontoExento: true,
    yaSuspendidoPorDecreto: true,
    detalle:
      "La alícuota que el art. 39 fija para los bienes de los incisos a), b) y d) del art. 38 por encima del segundo escalón de precio. El Decreto 50/2025 la redujo al 18% hasta el 30/6/2027, así que en 2026 ya no se pagaba este 35%.",
  },
  {
    id: "autos_18",
    etiqueta: "Automóvil o motor — el 18% que dejó el Decreto 50/2025",
    alicuota: 0.18,
    alicuotaTexto: "18%",
    articulo: "art. 39 + Decreto 50/2025, art. 2°",
    base: "precioNeto",
    todasLasEtapas: false,
    tieneMontoExento: true,
    yaSuspendidoPorDecreto: false,
    detalle:
      "Es la alícuota que estaba realmente vigente antes de la eliminación: el Decreto 50/2025 «redúcese a dieciocho por ciento (18%) la alícuota del treinta y cinco por ciento (35%)» para los incisos a), b) y d), con efectos hasta el 30 de junio de 2027. Comparar contra ésta —y no contra el 35% de la ley— es lo que da el ahorro real de 2026.",
  },
  {
    id: "autos_20",
    etiqueta: "Automóvil o motor — tramo intermedio del art. 39 (20% de la ley)",
    alicuota: 0.2,
    alicuotaTexto: "20%",
    articulo: "art. 39, segundo párrafo",
    base: "precioNeto",
    todasLasEtapas: false,
    tieneMontoExento: true,
    yaSuspendidoPorDecreto: true,
    detalle:
      "El escalón intermedio para los incisos a), b) y d). El art. 1° del Decreto 50/2025 lo dejó «transitoriamente sin efecto» para los incisos a) a e), así que en 2026 ya no se estaba pagando.",
  },
  {
    id: "motos_30",
    etiqueta: "Motocicleta o velocípedo con motor — 30% de la ley",
    alicuota: 0.3,
    alicuotaTexto: "30%",
    articulo: "art. 39, cuarto párrafo",
    base: "precioNeto",
    todasLasEtapas: false,
    tieneMontoExento: true,
    yaSuspendidoPorDecreto: true,
    detalle:
      "La alícuota del inciso c) del art. 38 por encima del segundo escalón de precio. El Decreto 50/2025 la redujo al 15% hasta el 30/6/2027.",
  },
  {
    id: "motos_15",
    etiqueta: "Motocicleta o velocípedo — el 15% que dejó el Decreto 50/2025",
    alicuota: 0.15,
    alicuotaTexto: "15%",
    articulo: "art. 39 + Decreto 50/2025, art. 3°",
    base: "precioNeto",
    todasLasEtapas: false,
    tieneMontoExento: true,
    yaSuspendidoPorDecreto: false,
    detalle:
      "La alícuota efectivamente vigente para las motos de gama alta antes de la eliminación: el decreto redujo el 30% al 15% con efectos hasta el 30 de junio de 2027.",
  },
  {
    id: "embarcaciones",
    etiqueta: "Embarcación de recreo o deportes, motor fuera de borda",
    alicuota: 0.2,
    alicuotaTexto: "20%",
    articulo: "art. 39, quinto párrafo (inc. e)",
    base: "precioNeto",
    todasLasEtapas: false,
    tieneMontoExento: true,
    yaSuspendidoPorDecreto: true,
    detalle:
      "El inciso e) del art. 38 tributaba el 20%, con un monto exento propio y más alto que el de los autos. El Decreto 50/2025 lo dejó transitoriamente sin efecto junto con los incisos a) a d).",
  },
  {
    id: "aeronaves",
    etiqueta: "Aeronave, avión, hidroavión, planeador o helicóptero de recreo",
    alicuota: 0.2,
    alicuotaTexto: "20%",
    articulo: "art. 39, quinto párrafo (inc. f)",
    base: "precioNeto",
    todasLasEtapas: false,
    tieneMontoExento: false,
    yaSuspendidoPorDecreto: false,
    detalle:
      "El único inciso del Capítulo IX que la ley dejó sin monto exento: el art. 39 dice «sin aplicarse monto exento para el inciso f)». Y el único que el Decreto 50/2025 no incluyó en su lista de incisos a), b), c), d) y e): su 20% siguió vigente hasta el 1/4/2026. Es el rubro del Capítulo IX donde la Ley 27.802 baja algo que realmente se estaba pagando.",
  },
];

/** Los montos exentos que el art. 39 escribió en 2019. No son los de hoy: se actualizan. */
export const MONTOS_EXENTOS_2019 = {
  autosYMotores: 1_300_000,
  motociclos: 390_000,
  embarcaciones: 1_700_000,
} as const;

/** Meses entre actualizaciones de esos montos, según el art. 39 (trimestral). */
export const MESES_ACTUALIZACION_MONTOS = 3;

export const IMPUESTOS_INTERNOS_TEXTOS = {
  /** El art. 195 de la Ley 27.802, completo. */
  art195:
    "Déjase sin efecto, a partir del primer día del mes inmediato siguiente al de la entrada en vigencia de esta ley, el impuesto previsto en la Ley de Impuestos Internos, texto sustituido por la ley 24.674 y sus modificaciones, para los rubros de: los seguros, los servicios de telefonía celular y satelital, los objetos suntuarios y los vehículos automóviles y motores, embarcaciones de recreo o deportes y aeronaves.",
  /** La oración del art. 4° que mete al impuesto dentro de su propia base. */
  art4:
    "En ningún caso se podrá descontar valor alguno en concepto del impuesto de esta ley o de otros tributos que incidan sobre la operación, excepto el caso contemplado en el inciso c) del segundo párrafo, así como tampoco por flete o acarreo cuando la venta haya sido convenida sobre la base de la entrega de la mercadería en el lugar de destino.",
  /** El art. 2°: una sola etapa, salvo el Capítulo VIII. */
  art2:
    "Los impuestos de esta ley se aplicarán de manera que incidan en una sola de las etapas de su circulación, excepto en el caso de los bienes comprendidos en el Capítulo VIII, sobre el expendio de los bienes gravados.",
  /** El art. 35: el 20% en cada etapa. */
  art35:
    "Por el expendio de objetos suntuarios se abonará en concepto de impuestos internos la alícuota del VEINTE POR CIENTO (20%) en cada una de las etapas de su comercialización.",
  /** El art. 37: el pago a cuenta que evita el arrastre completo. */
  art37:
    "Los fabricantes, talleristas y revendedores de los objetos gravados a que se refieren el artículo precedente que utilicen en sus actividades gravadas productos gravados por ese artículo podrán computar como pago a cuenta del impuesto que deben ingresar, el importe correspondiente al impuesto abonado o que se deba abonar por dichos productos con motivo de su expendio, en la forma que establezca la reglamentación.",
  /** El art. 27, primer párrafo: las dos alícuotas del seguro contratado en el país. */
  art27:
    "Las entidades de seguros legalmente establecidas o constituidas en el país pagarán un impuesto del uno por mil (1‰) sobre las primas de seguros que contraten, excepto en el caso de seguros de accidente de trabajo que pagarán el dos con cinco por ciento (2,5%).",
  /** El artículo sin número a continuación del 29: qué seguros ya estaban exentos. */
  segurosExentos:
    "Los seguros agrícolas, los seguros sobre la vida (individuales o colectivos), los de accidentes personales y los colectivos que cubren gastos de internación, cirugía o maternidad, están exentos del impuesto establecido en el artículo 27.",
  /** El art. 30: el 5% del celular. */
  art30:
    "Establécese un impuesto del cinco por ciento (5%) sobre el importe facturado por la provisión de servicio de telefonía celular y satelital al usuario.",
  /** El art. 31: las tarjetas prepagas y recargables. */
  art31:
    "Se encuentran también alcanzadas por el gravamen la venta de tarjetas prepagas y/o recargables para la prestación de servicio de telefonía celular y satelital.",
  /** El Decreto 50/2025, art. 1°: a qué incisos alcanzó y a cuál no. */
  decreto50:
    "Déjase transitoriamente sin efecto el gravamen previsto en el Capítulo IX del Título II de la Ley de Impuestos Internos, texto sustituido por la Ley N° 24.674 y sus modificaciones, que resulte por la aplicación de la tasa del VEINTE POR CIENTO (20 %) establecida en el artículo 39 de esa ley para las operaciones que involucren los bienes comprendidos en los incisos a), b), c), d) y e) de su artículo 38.",
  /** El art. 39: cómo se actualizan los montos exentos. */
  actualizacionMontos:
    "La Administración Federal de Ingresos Públicos, actualizará trimestralmente, a partir del mes de abril del año 2020, los importes consignados en los párrafos que anteceden, considerando la variación del Indice de Precios Internos al por Mayor (IPIM), respectivo a cada rubro en particular, que suministre el Instituto Nacional de Estadística y Censos (INDEC).",
  /** El art. 217 de la Ley 27.802: por qué la ley rige desde su publicación. */
  art217:
    "Salvo disposición en contrario los artículos de la presente ley entrarán en vigencia a partir de su publicación en el Boletín Oficial.",
  /** Los bienes del art. 36 alcanzados como objetos suntuarios. */
  art36:
    "Son objeto del gravamen: a) Las piedras preciosas o semipreciosas naturales o reconstituidas; lapidadas, piedras duras talladas y perlas naturales o de cultivo, se encuentren sueltas, armadas o engarzadas. b) Los objetos para cuya confección se utilicen en cualquier forma o proporción, platino, paladio, oro, plata, cristal, jade, marfil, ámbar, carey, coral, espuma de mar o cristal de roca. c) Las monedas de oro o plata con aditamentos extraños a su cuño. d) Las prendas de vestir con individualidad propia confeccionadas con pieles de peletería. e) Alfombras y tapices de punto anudado o enrollado, incluso confeccionados.",
  /** Las exenciones del art. 36, entre ellas la alianza matrimonial. */
  art36Exenciones:
    "En las condiciones que reglamente el PODER EJECUTIVO NACIONAL quedan exentos de este impuesto, cualquiera fuere el material empleado en su elaboración, los objetos que por razones de orden técnico-constructivo integran instrumental científico; los ritualmente indispensables para el oficio religioso público; los anillos de alianza matrimonial; las medallas que acrediten el ejercicio de la función pública u otros que otorguen los poderes públicos, los distintivos, emblemas y atributos usados por las fuerzas armadas y policiales; las condecoraciones oficiales; las prendas de vestir con adornos de piel y las ropas de trabajo.",
} as const;

export type FuenteImpuestosInternos = { nombre: string; url: string; detalle: string };

export const IMPUESTOS_INTERNOS_FUENTES: {
  consultadoEl: string;
  lista: FuenteImpuestosInternos[];
} = {
  consultadoEl: "2026-08-30",
  lista: [
    {
      nombre: "Ley 27.802 — texto oficial, art. 195 (Título XXV, Capítulo I)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "La oración que deja sin efecto el impuesto para los cinco rubros, y el art. 217 que fija la vigencia de la ley en su publicación. De la combinación de los dos sale la fecha real de la eliminación: el primer día del mes siguiente, o sea el 1 de abril de 2026.",
    },
    {
      nombre: "Ley 24.674 de Impuestos Internos — TEXTO ACTUALIZADO (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/35000-39999/38621/texact.htm",
      detalle:
        "De acá salen todas las alícuotas: el 1‰ y el 2,5% de ART del art. 27, el 23% del asegurador del exterior, el 5% del art. 30 y las tarjetas prepagas del 31, el 20% en cada etapa del art. 35 con la lista de bienes del 36, y la escala del art. 39 para vehículos, embarcaciones y aeronaves. También el art. 2° (una sola etapa, salvo el Capítulo VIII) y el art. 4° (el impuesto no se descuenta de su propia base). Al pie del art. 1° está la nota de InfoLEG que registra el art. 195 de la Ley 27.802.",
    },
    {
      nombre: "Decreto 50/2025 (B.O. 31/1/2025) — nota de InfoLEG al pie del art. 39",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/35000-39999/38621/texact.htm",
      detalle:
        "El decreto que ya había dejado sin efecto el 20% y bajado el 35% al 18% y el 30% al 15% —hasta el 30 de junio de 2027— para los bienes de los incisos a), b), c), d) y e) del art. 38. El inciso f), aeronaves, no está en esa enumeración.",
    },
    {
      nombre: "Ley 27.802 — B.O. 6/3/2026",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339542/20260306",
      detalle:
        "La publicación de la que arranca la vigencia de la ley y, por el art. 195, la cuenta del mes siguiente.",
    },
  ],
};
