// Actualización de quebrantos impositivos: el undécimo párrafo del art. 25 de la Ley de Ganancias
// después del art. 190 de la Ley 27.802.
//
// FUENTES (todas leídas en el texto oficial, ninguna en una nota de prensa):
//   · Ley de Impuesto a las Ganancias, t.o. 2019 (InfoLEG id 332890), arts. 25 y 93.
//   · Ley 27.802, art. 190 (InfoLEG id 423680, Título XXIV).
//   · Ley 24.073, art. 39 (InfoLEG id 472).
//
// POR QUÉ ESTE ARCHIVO EXISTE (1/9/2026, s101). El art. 190 era el último artículo con números sin
// cosechar del Título XXIV. Leído solo, parece un cambio de índice: donde decía IPIM ahora dice IPC.
// El DIFF contra la versión anterior (`tools/ley-diff-articulo.ts 332890 --art "ARTÍCULO 25"
// --fecha 20260201`) muestra que el cambio de índice es lo de menos, y que hay tres cambios:
//
//   1. **IPIM → IPC.** El índice pasó de «Precios Internos al por Mayor» a «Precios al Consumidor
//      Nivel General». Es el único de los tres que las notas suelen mencionar.
//   2. **Apareció una fecha de corte que antes no existía.** El párrafo viejo decía «Los quebrantos
//      se actualizarán…», sin distinguir. El nuevo dice «Los quebrantos generados en los ejercicios
//      fiscales que se inicien a partir del 1° de enero de 2025, inclusive». El universo quedó
//      partido en dos: un quebranto de un ejercicio iniciado en 2024 NO se actualiza.
//   3. **EL QUE IMPORTA — se destrabó una actualización que valía cero.** La redacción nueva agrega
//      «sin que resulte de aplicación lo dispuesto en el primer párrafo del artículo 93 de esta
//      ley». Ese primer párrafo dice: «Las actualizaciones previstas en esta ley se practicarán
//      conforme lo establecido en el artículo 39 de la Ley N° 24.073». Y el art. 39 de la Ley
//      24.073 manda que las tablas de actualización «deberán, en todos los casos, tomar como límite
//      máximo las variaciones operadas hasta el mes de marzo de 1992, inclusive».
//
//      O sea: el texto viejo mandaba actualizar por un índice cuya tabla está congelada en marzo de
//      1992. Coeficiente 1. La actualización existía en la letra y no existía en la cuenta. El
//      segundo párrafo del art. 93 salva de ese congelamiento a una lista de artículos —62 a 66,
//      71, 78, 87, 88, 98 y 99— y **el art. 25 no está en esa lista**. Por eso los quebrantos
//      llegaban a los cinco años licuados hasta el hueso.
//
//      El art. 190 no cambió un índice: destrabó la actualización. Es una excepción quirúrgica,
//      escrita para un solo párrafo de un solo artículo.
//
// LO QUE NO SE CALCULA, A PROPÓSITO:
//   · La compensación en sí (qué quebranto absorbe qué ganancia, en qué orden de categorías). Es
//     una liquidación completa, no una cuenta.
//   · El ajuste por inflación impositivo del Título VI: es otro mecanismo, con otros artículos.
//   · Los quebrantos de fuente extranjera, que van por el art. 131 y tienen su propia regla.

/** Primer ejercicio fiscal alcanzado: el que se INICIA a partir de esta fecha (art. 25, 11º párr.). */
export const PRIMER_INICIO_ACTUALIZABLE = "2025-01";

/** Años que puede sobrevivir un quebranto antes de perderse (art. 25, noveno párrafo). */
export const ANIOS_DE_VIDA = 5;

/** Mes hasta el que llegan las tablas del art. 39 de la Ley 24.073: el congelamiento. */
export const CONGELAMIENTO_24073 = "marzo de 1992";

/** B.O. de la Ley 27.802, que trae el art. 190. */
export const BO_LEY_27802 = "6 de marzo de 2026";

export const QUEBRANTOS_TEXTOS = {
  /** Undécimo párrafo del art. 25, texto VIGENTE (art. 190 de la Ley 27.802). */
  parrafoVigente:
    "Los quebrantos generados en los ejercicios fiscales que se inicien a partir del 1° de enero de 2025, inclusive, se actualizarán teniendo en cuenta la variación del Índice de Precios al Consumidor Nivel General (IPC) que suministre el Instituto Nacional de Estadística y Censos, organismo desconcentrado actuante en el ámbito del Ministerio de Economía, operada entre el mes de cierre del ejercicio fiscal en que se originaron y el mes de cierre del ejercicio fiscal que se liquida, sin que resulte de aplicación lo dispuesto en el primer párrafo del artículo 93 de esta ley.",
  /** El mismo párrafo ANTES de la reforma, capturado el 1/2/2026 en el Internet Archive. */
  parrafoAnterior:
    "Los quebrantos se actualizarán teniendo en cuenta la variación del Índice de Precios Internos al por Mayor (IPIM), publicado por el INSTITUTO NACIONAL DE ESTADÍSTICA Y CENSOS, organismo desconcentrado actuante en el ámbito del MINISTERIO DE HACIENDA, operada entre el mes de cierre del ejercicio fiscal en que se originaron y el mes de cierre del ejercicio fiscal que se liquida.",
  /** Art. 93, primer párrafo: la remisión que dejaba la actualización en cero. */
  art93PrimerParrafo:
    "Las actualizaciones previstas en esta ley se practicarán conforme lo establecido en el artículo 39 de la Ley N° 24.073.",
  /** Art. 39 de la Ley 24.073: el congelamiento en marzo de 1992. */
  art39Ley24073:
    "A los fines de las actualizaciones de valores previstas en la ley 11.683, texto ordenado en 1978 y sus modificaciones, y en las normas de los tributos regidos por la misma, no alcanzados por las disposiciones de la ley 23.928, las tablas e índices que a esos fines elabora la DIRECCION GENERAL IMPOSITIVA para ser aplicadas a partir del 1° de abril de 1992 deberán, en todos los casos, tomar como límite máximo las variaciones operadas hasta el mes de marzo de 1992, inclusive.",
  /** Art. 25, noveno párrafo: el plazo de cinco años. */
  cincoAnios:
    "El quebranto impositivo sufrido en un período fiscal que no pueda absorberse con ganancias gravadas del mismo período podrá deducirse de las ganancias gravadas que se obtengan en los años inmediatos siguientes. Transcurridos CINCO (5) años —computados de acuerdo con lo dispuesto por el Código Civil y Comercial de la Nación— después de aquél en que se produjo la pérdida, no podrá hacerse deducción alguna del quebranto que aún reste, en ejercicios sucesivos.",
  /** Art. 25, décimo párrafo: los quebrantos específicos. */
  especificos:
    "Los quebrantos considerados de naturaleza específica sólo podrán computarse contra las utilidades netas de la misma fuente y que provengan de igual tipo de operaciones en el año fiscal en el que se experimentaron las pérdidas o en los CINCO (5) años inmediatos siguientes —computados de acuerdo a lo dispuesto por el Código Civil y Comercial de la Nación—.",
} as const;

/**
 * Los quebrantos que el art. 25 declara «de naturaleza específica»: no se compensan contra
 * cualquier ganancia, sólo contra las de su misma fuente y tipo de operación. La actualización es
 * la misma; lo que cambia es contra qué se puede usar el resultado.
 */
export const QUEBRANTOS_ESPECIFICOS: { titulo: string; detalle: string }[] = [
  {
    titulo: "Inversiones y operaciones del Capítulo II del Título IV",
    detalle:
      "Rentas financieras, incluidas las monedas digitales. El quebranto se compensa exclusivamente con ganancias futuras de su misma fuente Y clase, y «clase» es cada uno de los artículos de ese Capítulo II: no alcanza con que las dos sean financieras.",
  },
  {
    titulo:
      "Enajenación de acciones, cuotas y participaciones sociales, monedas digitales, títulos y bonos",
    detalle:
      "Para los sujetos del art. 53 incs. a) a e) y su último párrafo, cualquiera sea quien obtenga el resultado.",
  },
  {
    titulo: "Derivados que no sean operaciones de cobertura",
    detalle:
      "Cualquiera sea el sujeto. Es cobertura, y por lo tanto NO es específico, el derivado que «tiene por objeto reducir el efecto de las futuras fluctuaciones en precios o tasas de mercado» sobre los bienes, deudas y resultados de la actividad principal.",
  },
  {
    titulo: "Actividades en la plataforma continental y la zona económica exclusiva",
    detalle:
      "Exploración y explotación de recursos naturales vivos y no vivos: sólo se compensan con ganancias netas de fuente argentina.",
  },
  {
    titulo: "Quebrantos de fuente extranjera",
    detalle:
      "Sólo se compensan con ganancias de esa misma fuente, y se rigen por el art. 131 —que, para actualizarlos, remite igual al undécimo párrafo del art. 25—.",
  },
];

export const QUEBRANTOS_FUENTES = {
  consultadoEl: "2026-09-01",
  lista: [
    {
      nombre: "Ley de Impuesto a las Ganancias, t.o. 2019 — art. 25 (texto actualizado, InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/332890/texact.htm",
      detalle:
        "El artículo entero de compensación de quebrantos: los específicos, el plazo de cinco años y el undécimo párrafo de actualización, con la nota que lo atribuye al art. 190 de la Ley 27.802.",
    },
    {
      nombre: "Ley 27.802 — texto oficial, art. 190 (Título XXIV)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "El artículo que sustituyó el undécimo párrafo del art. 25: cambió el índice a IPC, puso la fecha de corte del 1/1/2025 y excluyó expresamente el primer párrafo del art. 93.",
    },
    {
      nombre: "Ley de Impuesto a las Ganancias, t.o. 2019 — art. 93",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/332890/texact.htm",
      detalle:
        "Su primer párrafo remite al art. 39 de la Ley 24.073 y es el que congelaba la actualización; el segundo salva de ese congelamiento a los arts. 62 a 66, 71, 78, 87, 88, 98 y 99 —el 25 no está en la lista—.",
    },
    {
      nombre: "Ley 24.073, art. 39 — el congelamiento de las tablas en marzo de 1992",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/472/norma.htm",
      detalle:
        "Manda que las tablas e índices de actualización tomen «en todos los casos» como límite máximo las variaciones operadas hasta marzo de 1992. Es la razón por la que la actualización del texto viejo daba coeficiente 1.",
    },
    {
      nombre: "INDEC — serie del IPC Nacional, nivel general (API oficial de series de tiempo)",
      url: "https://apis.datos.gob.ar/series/api/series/?ids=148.3_INIVELNAL_DICI_M_26&format=json&limit=1000",
      detalle:
        "La serie con la que esta calculadora arma el coeficiente. Vive en el repo en `src/data/ipc-serie.ts`, generada por script desde esta API y regenerada en cada redeploy mensual.",
    },
  ],
} as const;
