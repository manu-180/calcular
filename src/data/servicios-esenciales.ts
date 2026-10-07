// Servicios esenciales, actividades de importancia trascendental y guardias mínimas en una huelga.
// Art. 24 de la Ley 25.877, sustituido por el art. 101 de la Ley 27.802, más los apartados 24.1 a
// 24.6 incorporados por su art. 102. Leído el 28/8/2026 en el texto oficial de InfoLEG (id 93595,
// texto actualizado) y contrastado contra la captura del 1/2/2026 del mismo texto (Internet
// Archive), que es la versión que estuvo vigente hasta el 5/3/2026.
//
// POR QUÉ ESTE ARCHIVO EXISTE (28/8/2026, s97). El Título VII de la Ley 27.802 (arts. 101 y 102)
// figuraba «sin auditar» en docs/mapeo-ley-27802.md. Al abrirlo apareció el caso más limpio de la
// regla de s78 —un artículo sustituido es un hueco de SERP casi garantizado—, con un agravante:
// este artículo fue reescrito CUATRO veces en veintisiete meses, y tres de esas veces por decreto.
//
//   · Ley 25.877 (2004), texto original: enumeración breve y ningún porcentaje fijo.
//   · Decreto 70/2023 (art. 97, B.O. 21/12/2023): lo sustituye, aparecen el 75% y el 50% y la lista
//     larga. Su vigencia queda suspendida judicialmente y **restituida por el art. 1° del Decreto
//     628/2025 (B.O. 3/9/2025)**.
//   · Decreto 340/2025 (art. 3°, B.O. 21/5/2025): lo sustituye otra vez — y el Congreso lo
//     **rechaza**: Res. 39/2025 de Diputados y Res. 57/2025 del Senado (B.O. 25/8/2025), abrogado
//     conforme al art. 24 de la Ley 26.122.
//   · **Ley 27.802 (arts. 101 y 102, B.O. 6/3/2026): el texto vigente, y por primera vez en una
//     LEY del Congreso.** Rige desde la publicación (art. 217): no espera al 1/1/2027.
//
// EL HALLAZGO QUE ESTA PÁGINA PUBLICA Y CASI NADIE: el 75% y el 50% no cambiaron, pero **la lista
// de actividades sí**, y en las dos direcciones. Tres entraron como esenciales (recolección de
// residuos, transporte de caudales y seguridad privada), los servicios aduaneros y migratorios
// **bajaron** de esencial a trascendental —de 75% a 50%—, los servicios portuarios **subieron** de
// trascendental a esencial, y un inciso entero de la categoría trascendental desapareció: con él
// salieron de la enumeración la minería, los correos, la logística, los frigoríficos, la actividad
// agropecuaria, los materiales de la construcción, la reparación de aeronaves y buques y los
// servicios aeroportuarios. Una nota que copie la lista del DNU 70/2023 —que es la que circula
// desde diciembre de 2023— hoy dice lo contrario de la ley vigente en varias actividades.
//
// EL SEGUNDO HALLAZGO: los apartados 24.1 a 24.6 son NUEVOS. InfoLEG los marca «Apartado
// incorporado por art. 102», no «sustituido»: antes del 6/3/2026 el artículo no traía ningún
// procedimiento. Ahí están los plazos que hoy deciden si una medida es legítima — el preaviso de
// cinco días, el acuerdo de servicios mínimos al día siguiente y el aviso a los usuarios 48 horas
// antes— y encima de todo eso sigue la conciliación obligatoria de la Ley 14.786.
//
// LO QUE NO SE PUBLICA, A PROPÓSITO:
//   · **Si los quince días del art. 11 de la Ley 14.786 son hábiles o corridos.** La ley escribe
//     «quince días», a secas. Que el legislador sabía distinguir lo prueba el art. 6 de esa misma
//     ley, que dice «10 días hábiles». La página muestra las dos cuentas y dice cuál es la literal;
//     no elige por el usuario, porque el texto no elige.
//   · **Cuántos trabajadores concretos van a la guardia.** El apartado 24.2 manda acordarlo ante la
//     Autoridad de Aplicación «señalando concreta y detalladamente» personal, horarios, funciones y
//     equipos. El porcentaje del art. 24 es sobre «la prestación normal del servicio», no sobre la
//     dotación: la calculadora aplica el piso a la dotación afectada que declara el usuario y lo
//     dice con todas las letras.
//
// FUENTES: sólo texto oficial. Nunca una nota de prensa.

/** Fecha desde la que rige el texto actual (art. 217 de la Ley 27.802: publicación en el B.O.). */
export const VIGENCIA = "6 de marzo de 2026";
export const VIGENCIA_ISO = "2026-03-06";

export type Categoria = "esencial" | "trascendental" | "seguridad" | "no-listada";

/** Los pisos de cobertura del art. 24. El de «no-listada» no existe en la ley: es cero. */
export const PISOS: Record<Categoria, number> = {
  esencial: 75,
  trascendental: 50,
  seguridad: 100,
  "no-listada": 0,
};

export const ETIQUETAS_CATEGORIA: Record<Categoria, string> = {
  esencial: "Servicio esencial en sentido estricto",
  trascendental: "Actividad de importancia trascendental",
  seguridad: "Fuerzas de seguridad",
  "no-listada": "No enumerada en el artículo 24",
};

export type Actividad = {
  id: string;
  /** Cómo la nombra el texto vigente (o, si salió, el texto anterior). */
  etiqueta: string;
  /** Categoría según el texto vigente desde el 6/3/2026. */
  categoria: Categoria;
  /** Categoría según el texto que rigió hasta el 5/3/2026 (DNU 70/2023, vigencia restituida). */
  categoriaAntes: Categoria;
  /** Inciso del texto vigente, o null si la actividad ya no está enumerada. */
  inciso: string | null;
  /** Qué cambió para esta actividad el 6/3/2026. Es el dato que no publica nadie. */
  cambio: string;
};

/**
 * Las actividades del art. 24 vigente, más las que el texto anterior enumeraba y el nuevo dejó
 * afuera. El orden sigue al de la ley: primero los ocho incisos de servicios esenciales, después
 * los nueve de importancia trascendental, después las fuerzas de seguridad y al final las que
 * salieron de la enumeración.
 */
export const ACTIVIDADES: Actividad[] = [
  // ── Servicios esenciales en sentido estricto (75%) ──────────────────────────────────────────
  {
    id: "educacion",
    etiqueta:
      "Cuidado de menores y educación de nivel guardería, preescolar, primario y secundario, y educación especial",
    categoria: "esencial",
    categoriaAntes: "esencial",
    inciso: "a",
    cambio:
      "Sigue siendo esencial. Cambió de lugar: era el inciso f) y ahora encabeza la lista como inciso a).",
  },
  {
    id: "salud",
    etiqueta:
      "Servicios sanitarios y hospitalarios, transporte y distribución de medicamentos e insumos hospitalarios y servicios farmacéuticos",
    categoria: "esencial",
    categoriaAntes: "esencial",
    inciso: "b",
    cambio: "Sin cambios de fondo: era el inciso a) y quedó como inciso b), con el mismo texto.",
  },
  {
    id: "energia",
    etiqueta:
      "Producción, transporte, distribución y comercialización de agua potable, gas, petróleo y otros combustibles y energía eléctrica",
    categoria: "esencial",
    categoriaAntes: "esencial",
    inciso: "c",
    cambio:
      "Sigue siendo esencial, y ahora nombra expresamente al petróleo: el texto anterior decía «agua potable, gas y otros combustibles y energía eléctrica».",
  },
  {
    id: "telecomunicaciones",
    etiqueta: "Telecomunicaciones, incluyendo internet y comunicaciones satelitales",
    categoria: "esencial",
    categoriaAntes: "esencial",
    inciso: "d",
    cambio: "Sin cambios: mismo texto, mismo lugar relativo en la lista.",
  },
  {
    id: "residuos",
    etiqueta: "Recolección de residuos",
    categoria: "esencial",
    categoriaAntes: "no-listada",
    inciso: "e",
    cambio:
      "ENTRÓ. El texto anterior no la mencionaba en ninguna de las dos listas: no tenía piso legal de cobertura y hoy tiene el más alto.",
  },
  {
    id: "aeronautica-puertos",
    etiqueta:
      "Aeronáutica comercial y control de tráfico aéreo y portuario, incluyendo balizamiento, dragado, amarre, estiba, desestiba, remolque de buques y todos los servicios portuarios",
    categoria: "esencial",
    categoriaAntes: "esencial",
    inciso: "f",
    cambio:
      "Se amplió. El inciso anterior terminaba en «remolque de buques»; el vigente le suma la desestiba y «todos los servicios portuarios», que en el texto anterior estaban un escalón más abajo, entre las actividades de importancia trascendental. Para los servicios portuarios el piso pasó de 50% a 75%.",
  },
  {
    id: "caudales",
    etiqueta: "Transporte de caudales",
    categoria: "esencial",
    categoriaAntes: "no-listada",
    inciso: "g",
    cambio: "ENTRÓ. No figuraba en ninguna de las dos listas del texto anterior.",
  },
  {
    id: "seguridad-privada",
    etiqueta: "Servicios privados de seguridad y custodia",
    categoria: "esencial",
    categoriaAntes: "no-listada",
    inciso: "h",
    cambio: "ENTRÓ. No figuraba en ninguna de las dos listas del texto anterior.",
  },

  // ── Actividades de importancia trascendental (50%) ──────────────────────────────────────────
  {
    id: "transporte-maritimo",
    etiqueta:
      "Transporte marítimo y fluvial de personas, mercaderías o carga, servicios conexos y operaciones costa afuera",
    categoria: "trascendental",
    categoriaAntes: "trascendental",
    inciso: "a",
    cambio:
      "Sigue trascendental y ahora tiene inciso propio: el texto anterior lo metía en el mismo inciso que el transporte terrestre y subterráneo. Se le agregaron los servicios conexos y las operaciones costa afuera.",
  },
  {
    id: "aduana",
    etiqueta: "Servicios aduaneros y migratorios y demás vinculados al comercio exterior",
    categoria: "trascendental",
    categoriaAntes: "esencial",
    inciso: "b",
    cambio:
      "BAJÓ DE CATEGORÍA. Era servicio esencial (inciso e) del texto anterior) con un piso del 75%; hoy es de importancia trascendental y el piso es del 50%. Es el único movimiento hacia abajo de toda la reforma.",
  },
  {
    id: "produccion-medicamentos",
    etiqueta: "Producción de medicamentos y/o insumos hospitalarios",
    categoria: "trascendental",
    categoriaAntes: "trascendental",
    inciso: "c",
    cambio: "Sin cambios de fondo: era el inciso a) y quedó como inciso c).",
  },
  {
    id: "transporte-terrestre",
    etiqueta: "Transporte terrestre y subterráneo de personas y/o mercaderías por cualquier medio",
    categoria: "trascendental",
    categoriaAntes: "trascendental",
    inciso: "d",
    cambio:
      "Sigue trascendental (50%). Se separó del transporte marítimo y fluvial, que ahora tiene inciso propio.",
  },
  {
    id: "radio-tv",
    etiqueta: "Servicios de radio y televisión",
    categoria: "trascendental",
    categoriaAntes: "trascendental",
    inciso: "e",
    cambio:
      "Sin cambios en el texto. Corrió un lugar en la lista: era el inciso c) y quedó como e).",
  },
  {
    id: "industria-continua",
    etiqueta:
      "Actividades industriales continuas, incluyendo siderurgia, producción de aluminio, actividad química y actividad cementera",
    categoria: "trascendental",
    categoriaAntes: "trascendental",
    inciso: "f",
    cambio:
      "Sin cambios en el texto, con las mismas cuatro industrias nombradas (siderurgia, aluminio, química y cemento). Era el inciso d) y quedó como f).",
  },
  {
    id: "alimenticia",
    etiqueta: "Industria alimenticia en toda su cadena de valor",
    categoria: "trascendental",
    categoriaAntes: "trascendental",
    inciso: "g",
    cambio:
      "Sin cambios en su texto. Pero el inciso vecino que nombraba a la «distribución y comercialización de alimentos y bebidas» y a la «actividad agropecuaria y su cadena de valor» desapareció. Qué queda alcanzado por «toda su cadena de valor» es hoy una discusión abierta.",
  },
  {
    id: "bancos",
    etiqueta: "Servicios bancarios, financieros, hoteleros y gastronómicos y comercio electrónico",
    categoria: "trascendental",
    categoriaAntes: "trascendental",
    inciso: "h",
    cambio:
      "Sin cambios en el texto: bancos, finanzas, hotelería, gastronomía y comercio electrónico siguen con un piso del 50%. Era el inciso g) y quedó como h).",
  },
  {
    id: "exportacion",
    etiqueta:
      "Producción de bienes y/o servicios de toda actividad afectada a compromisos de exportación",
    categoria: "trascendental",
    categoriaAntes: "trascendental",
    inciso: "i",
    cambio:
      "Sin cambios en el texto. Era el inciso h) y quedó como i), cerrando la lista igual que antes.",
  },

  // ── Fuerzas de seguridad (100%) ────────────────────────────────────────────────────────────
  {
    id: "fuerzas-de-seguridad",
    etiqueta: "Fuerzas de seguridad",
    categoria: "seguridad",
    categoriaAntes: "no-listada",
    inciso: "párrafo propio",
    cambio:
      "REGLA NUEVA. El texto anterior no las mencionaba. El vigente les fija el piso más alto de la ley: «en ningún caso podrán brindar una cobertura menor al cien por ciento (100%) de la prestación normal de su servicio».",
  },

  // ── Las que salieron de la enumeración ─────────────────────────────────────────────────────
  {
    id: "mineria",
    etiqueta: "Actividad minera",
    categoria: "no-listada",
    categoriaAntes: "trascendental",
    inciso: null,
    cambio:
      "SALIÓ. Estaba nombrada en el inciso f) de las actividades de importancia trascendental del texto anterior, con un piso del 50%. Ese inciso entero desapareció del texto vigente.",
  },
  {
    id: "correos",
    etiqueta: "Correos",
    categoria: "no-listada",
    categoriaAntes: "trascendental",
    inciso: null,
    cambio: "SALIÓ. Venía del mismo inciso f) que la minería, que el texto vigente no reprodujo.",
  },
  {
    id: "logistica",
    etiqueta: "Servicios logísticos",
    categoria: "no-listada",
    categoriaAntes: "trascendental",
    inciso: null,
    cambio: "SALIÓ. Venía del inciso f) del texto anterior, que desapareció entero.",
  },
  {
    id: "frigorificos",
    etiqueta: "Actividad frigorífica",
    categoria: "no-listada",
    categoriaAntes: "trascendental",
    inciso: null,
    cambio:
      "SALIÓ como actividad propia. Puede discutirse si queda alcanzada por «la industria alimenticia en toda su cadena de valor», que sí sobrevivió: la ley ya no la nombra.",
  },
  {
    id: "agropecuaria",
    etiqueta: "Actividad agropecuaria y su cadena de valor",
    categoria: "no-listada",
    categoriaAntes: "trascendental",
    inciso: null,
    cambio:
      "SALIÓ. El texto anterior la nombraba expresamente en el inciso f). Igual que con los frigoríficos, queda la discusión sobre la cadena de valor de la industria alimenticia.",
  },
  {
    id: "alimentos-distribucion",
    etiqueta: "Distribución y comercialización de alimentos y bebidas",
    categoria: "no-listada",
    categoriaAntes: "trascendental",
    inciso: null,
    cambio:
      "SALIÓ como actividad nombrada. La producción sigue adentro por el inciso de la industria alimenticia; la distribución y la comercialización ya no tienen inciso propio.",
  },
  {
    id: "materiales-construccion",
    etiqueta: "Producción y distribución de materiales de la construcción",
    categoria: "no-listada",
    categoriaAntes: "trascendental",
    inciso: null,
    cambio: "SALIÓ. Estaba en el inciso f) del texto anterior.",
  },
  {
    id: "reparacion-aeronaves-buques",
    etiqueta: "Servicios de reparación de aeronaves y buques",
    categoria: "no-listada",
    categoriaAntes: "trascendental",
    inciso: null,
    cambio:
      "SALIÓ. Ojo con la confusión: los servicios PORTUARIOS subieron a esenciales, pero la reparación de aeronaves y buques y los servicios AEROPORTUARIOS quedaron fuera de las dos listas.",
  },
  {
    id: "aeroportuarios",
    etiqueta: "Servicios aeroportuarios",
    categoria: "no-listada",
    categoriaAntes: "trascendental",
    inciso: null,
    cambio:
      "SALIÓ, mientras los portuarios subían a esenciales. En el texto anterior iban juntos: «todos los servicios portuarios y aeroportuarios».",
  },
];

/** Los plazos del procedimiento, todos con su norma. */
export const PLAZOS = {
  /** Art. 11 de la Ley 14.786: la gestión conciliatoria no puede durar más que esto. */
  conciliacionDias: 15,
  /** Art. 11, segunda oración: prórroga a criterio del conciliador. */
  prorrogaDias: 5,
  /** Apartado 24.1: preaviso a la otra parte y a la Autoridad de Aplicación. */
  preavisoDias: 5,
  /** Apartado 24.2: el acuerdo de servicios mínimos, al día inmediato siguiente al preaviso. */
  acuerdoDiasDespuesDelPreaviso: 1,
  /** Apartado 24.4: aviso a los usuarios por medios de difusión masiva. */
  avisoUsuariosHoras: 48,
} as const;

/** Citas textuales del texto oficial. Nunca parafraseadas. */
export const TEXTOS = {
  pisos:
    "En lo que respecta a la prestación de servicios mínimos, en el caso de los servicios esenciales, en ningún caso se podrá negociar o imponer a las partes una cobertura menor al setenta y cinco por ciento (75%) de la prestación normal del servicio de que se tratare. En el caso de las actividades o servicios de importancia trascendental, en ningún caso se podrá negociar o imponer a las partes una cobertura menor al cincuenta por ciento (50%).",
  fuerzasDeSeguridad:
    "Las fuerzas de seguridad en ningún caso podrán brindar una cobertura menor al cien por ciento (100%) de la prestación normal de su servicio.",
  comisionDeGarantias:
    "La Autoridad de Aplicación a propuesta de una comisión independiente y autónoma, denominada Comisión de Garantías, integrada según se establezca en la reglamentación por cinco (5) miembros de reconocida solvencia técnica, profesional y académica en materia de relaciones del trabajo, del derecho laboral o del derecho constitucional y destacada trayectoria, podrá, mediante resolución fundada, calificar como servicio esencial o servicio de importancia trascendental una actividad no incluida en las enumeraciones precedentes",
  preaviso:
    "Cumplida la obligación impuesta a las partes del conflicto por el artículo 2º de la ley 14.786 y vencido el plazo de quince (15) días previsto en el artículo 11 de la misma ley, la parte que se propusiere ejercer medidas de acción directa que involucren a los servicios referidos en este artículo, deberá preavisarlo a la otra parte y a la Autoridad de Aplicación en forma fehaciente y con cinco (5) días de anticipación a la fecha en que se realizará la medida.",
  acuerdoDeMinimos:
    "Dentro del día inmediato siguiente a aquél en que se efectuó el preaviso establecido en el artículo anterior, las partes acordarán ante la Autoridad de Aplicación sobre los servicios mínimos que se mantendrán con arreglo a lo dispuesto en este artículo, párrafo segundo, las modalidades de su ejecución, señalando concreta y detalladamente la forma en que se ejecutarán las prestaciones, incluyendo la designación del personal involucrado, pautas horarias, asignación de funciones y equipos.",
  siNoAcuerdan:
    "Si las partes no cumplieran con las obligaciones previstas en los apartados que anteceden dentro de los plazos establecidos para ello, o si los servicios mínimos acordados por las mismas fueren insuficientes, la Autoridad de Aplicación, en consulta con la Comisión de Garantías, fijará los servicios mínimos para asegurar la prestación del servicio, cantidad de trabajadores que se asignará a su ejecución, pautas horarias, asignación de funciones y equipos, procurando resguardar tanto el derecho de huelga como los derechos de los usuarios afectados.",
  avisoUsuarios:
    "Las partes (…) garantizarán la ejecución de los servicios mínimos y deberán poner en conocimiento de los usuarios, por medios de difusión masiva, las modalidades que revestirá la prestación durante el conflicto, dentro del plazo de cuarenta y ocho (48) horas antes del inicio de las medidas de acción directa, detallando el tiempo de iniciación y la duración de las medidas, la forma de distribución de los servicios mínimos garantizados y la reactivación de las prestaciones.",
  paroNacional:
    "Si la medida de acción directa consistiere en paro nacional de actividades o cualquier otra ejercida por centrales sindicales u organizaciones empresariales con representatividad sectorial múltiple, se aplicarán las disposiciones establecidas en el presente artículo.",
  sanciones:
    "La inobservancia por alguna de las partes de los procedimientos conciliatorios establecidos en la legislación vigente, o el incumplimiento de las resoluciones dictadas por la Autoridad de Aplicación o de los pronunciamientos emitidos por la Comisión de Garantías en ejercicio de sus facultades, dará lugar a la aplicación de las sanciones establecidas por las leyes 14.786, 23.551 y 25.212, sus modificatorias y sus normas reglamentarias y complementarias, según corresponda. La falta de cumplimiento del deber de trabajar por las personas obligadas a la ejecución de los servicios mínimos, dará lugar a las responsabilidades previstas en las disposiciones legales, estatutarias o convencionales que les resultaren aplicables.",
  conciliacionArt11:
    "Desde que la autoridad competente tome conocimiento del diferendo hasta que ponga fin a la gestión conciliatoria no podrá mediar un plazo mayor de quince días. Este término podrá prorrogarse por cinco días más cuando, en atención a la actitud de las partes, el conciliador prevea la posibilidad de lograr un acuerdo. Vencidos los plazos referidos sin que hubiera sido aceptada una fórmula de conciliación ni suscrito un compromiso arbitral podrán las partes recurrir a las medidas de acción directa que estimaren convenientes.",
  art8Ley14786:
    "Antes de que se someta un diferendo a la instancia de conciliación y mientras no se cumplen los términos que fija el artículo 11, las partes no podrán adoptar medidas de acción directa.",
} as const;

/** La historia del artículo, que es parte del contenido: cuatro textos en veintisiete meses. */
export const HISTORIA: { fecha: string; norma: string; que: string }[] = [
  {
    fecha: "18/3/2004",
    norma: "Ley 25.877, texto original",
    que: "El art. 24 nace sin porcentajes fijos: los servicios mínimos los define la Comisión de Garantías y la enumeración de servicios esenciales es breve.",
  },
  {
    fecha: "21/12/2023",
    norma: "Decreto 70/2023, art. 97",
    que: "Sustituye el art. 24 y aparecen el 75%, el 50% y la lista larga. Su vigencia queda suspendida judicialmente.",
  },
  {
    fecha: "21/5/2025",
    norma: "Decreto 340/2025, art. 3°",
    que: "Vuelve a sustituirlo. El Congreso lo rechaza: Resolución 39/2025 de Diputados y Resolución 57/2025 del Senado (B.O. 25/8/2025). Queda abrogado por el art. 24 de la Ley 26.122.",
  },
  {
    fecha: "3/9/2025",
    norma: "Decreto 628/2025, art. 1°",
    que: "Restituye la vigencia del texto del Decreto 70/2023. Ese es el que rigió hasta el 5/3/2026, y es el que sigue circulando en la mayoría de las notas.",
  },
  {
    fecha: "6/3/2026",
    norma: "Ley 27.802, arts. 101 y 102",
    que: "El texto vigente, y por primera vez sancionado por el Congreso: sustituye el artículo entero e incorpora los apartados 24.1 a 24.6, que no existían. Rige desde la publicación (art. 217).",
  },
];

export type Fuente = { nombre: string; url: string; detalle: string };

export const FUENTES: { consultadoEl: string; lista: Fuente[] } = {
  consultadoEl: "2026-08-28",
  lista: [
    {
      nombre: "Ley 25.877, texto actualizado, art. 24 (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/90000-94999/93595/texact.htm",
      detalle:
        "El texto vigente del artículo, con los apartados 24.1 a 24.6 y las notas que identifican a cada norma modificatoria. De acá salen las dos listas de actividades, los pisos del 75% y el 50%, el 100% de las fuerzas de seguridad y todos los plazos del procedimiento.",
    },
    {
      nombre: "Ley 25.877: el mismo texto oficial, capturado el 1/2/2026 (Internet Archive)",
      url: "https://web.archive.org/web/20260201/https://servicios.infoleg.gob.ar/infolegInternet/anexos/90000-94999/93595/texact.htm",
      detalle:
        "La versión que estuvo vigente hasta el 5/3/2026 (la del Decreto 70/2023, restituida por el Decreto 628/2025). Es el control que permite decir con precisión qué actividad entró, cuál bajó de categoría y cuáles salieron de la enumeración.",
    },
    {
      nombre: "Ley 27.802, texto oficial, Título VII (arts. 101 y 102)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "La norma que sustituyó el art. 24 e incorporó sus apartados. El art. 217 fija la vigencia desde la publicación en el Boletín Oficial: este Título no tiene fecha diferida ni prórroga.",
    },
    {
      nombre: "Ley 14.786: conciliación obligatoria (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/115000-119999/115423/norma.htm",
      detalle:
        "Los arts. 2° y 11 a los que remite el apartado 24.1: la instancia obligatoria de conciliación y su plazo de quince días, prorrogable por cinco. El art. 8 prohíbe las medidas de acción directa mientras ese plazo corre, y el art. 6 (que sí dice «10 días hábiles») es la prueba de que el legislador distinguía.",
    },
  ],
};
