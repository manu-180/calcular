// Venta de inmuebles por personas humanas: el impuesto cedular del 15% y su exención desde 2026.
// Leído el 30/8/2026 en cuatro textos oficiales de InfoLEG: la Ley de Impuesto a las Ganancias
// t.o. 2019 (id 332890), la Ley 27.430 (id 305262), la Ley 23.905 (id 305) y la Ley 27.802
// (id 423680).
//
// POR QUÉ ESTE ARCHIVO EXISTE (30/8/2026, s98): auditando el Título XXIV de la Ley 27.802 apareció
// el art. 192, que sustituye el inciso n) del art. 26 de la LIG. La mitad de ese inciso —la
// exención de las ganancias del alquiler de casa habitación— ya estaba cosechada en
// /deduccion-alquiler. La OTRA mitad no la tenía nadie:
//
//   «Asimismo, también se encuentra exento el resultado derivado de la enajenación de inmuebles y
//    de la transferencia de derechos sobre inmuebles, alcanzados por las disposiciones del artículo
//    99 de esta ley, que se enajenen o transfieran a partir del 1° de enero de 2026, en los
//    términos que al respecto establezca la reglamentación.»
//
// El art. 99 es el impuesto cedular del QUINCE POR CIENTO sobre la ganancia de la venta de un
// inmueble. O sea que ese impuesto dejó de aplicarse a las operaciones desde el 1/1/2026.
//
// EL HALLAZGO QUE NECESITA TRES LEYES Y NINGUNA NOTA CUENTA ENTERO: hoy, la venta de un inmueble
// por una persona humana no tributa NADA, y para verlo hay que juntar tres normas de tres años
// distintos.
//
//   1. **Ley 27.430, art. 86 inc. a) (2017):** el cedular sólo alcanza al que «hubiera adquirido el
//      bien a partir del 1° de enero de 2018». Los inmuebles comprados antes quedaron fuera — «en
//      tales supuestos, las operaciones no estarán alcanzadas por el Título VII de la ley 23.905»,
//      que era el ITI. O sea que el cedular y el ITI se repartían el universo por fecha de compra.
//   2. **Ley 27.743, art. 67 (B.O. 8/7/2024):** derogó el Título VII entero de la Ley 23.905, los
//      arts. 7° a 18. El ITI dejó de existir. Los inmuebles comprados antes de 2018 se quedaron sin
//      ninguno de los dos impuestos.
//   3. **Ley 27.802, art. 192 (B.O. 6/3/2026):** exime del cedular a las operaciones desde el
//      1/1/2026. Los comprados desde 2018 también se quedaron sin impuesto.
//
// Las dos mitades del universo, por dos leyes distintas y con dos años de diferencia. Medio
// internet sigue explicando «el ITI del 1,5%» —una ley derogada hace dos años— y la otra mitad
// sigue explicando el cedular del 15% como si se cobrara.
//
// LO QUE ESTA PÁGINA NO PUBLICA, A PROPÓSITO:
//   · **La alícuota del ITI.** El Título VII de la Ley 23.905 está derogado y su texto ya no figura
//      en InfoLEG: los dieciocho artículos son notas de derogación. Publicar un número que no se
//      puede leer en la fuente vigente sería copiarlo de una nota, que es justo lo que esta página
//      señala como error.
//   · **La venta que hace una empresa o un desarrollador.** El art. 99 habla de «personas humanas y
//      sucesiones indivisas»; el resultado de un inmueble que integra el activo de una empresa va
//      por el régimen general de tercera categoría y no por este capítulo. La exención del inc. n)
//      está escrita sobre las operaciones «alcanzadas por las disposiciones del artículo 99», así
//      que no las alcanza.
//   · **Los impuestos que no son nacionales.** Sellos, ingresos brutos y tasas municipales son de
//      cada jurisdicción: nada de esto los toca.

/** Alícuota del impuesto cedular sobre la venta de inmuebles (LIG art. 99). */
export const ALICUOTA_CEDULAR = 0.15;

/**
 * Primer mes de adquisición alcanzado por el cedular. Art. 86 inc. a) de la Ley 27.430: tributa
 * «en tanto el enajenante o cedente hubiera adquirido el bien a partir del 1° de enero de 2018».
 */
export const PRIMER_MES_ADQUISICION_CEDULAR = "2018-01";

/**
 * Primer mes de enajenación exento. Art. 26 inc. n) de la LIG, según el art. 192 de la Ley 27.802:
 * «que se enajenen o transfieran a partir del 1° de enero de 2026».
 */
export const PRIMER_MES_EXENCION = "2026-01";

/** Fecha en que quedó derogado el ITI (art. 67 de la Ley 27.743, vigente desde su publicación). */
export const DEROGACION_ITI = "8 de julio de 2024";

/** ISO de esa misma fecha, para comparar contra el mes de la operación. */
export const DEROGACION_ITI_MES = "2024-07";

/** B.O. de la Ley 27.802, que trae el art. 192. */
export const BO_LEY_27802 = "6 de marzo de 2026";

/**
 * Los tres regímenes posibles, más el caso sin impuesto por la derogación del ITI.
 * `exento` y `sinImpuesto` llegan al mismo lugar por caminos distintos, y la diferencia importa:
 * uno es una exención vigente, el otro es un impuesto que ya no existe.
 */
export type Regimen = "exento" | "cedular" | "sinImpuesto" | "iti";

export const ETIQUETAS_REGIMEN: Record<Regimen, string> = {
  exento: "Exento del impuesto cedular",
  cedular: "Alcanzado por el impuesto cedular del 15%",
  sinImpuesto: "Sin impuesto nacional a la transferencia",
  iti: "Alcanzado por el ITI, hoy derogado",
};

export const VENTA_INMUEBLES_TEXTOS = {
  /** La mitad del inc. n) que exime la venta, según el art. 192 de la Ley 27.802. */
  exencion:
    "Asimismo, también se encuentra exento el resultado derivado de la enajenación de inmuebles y de la transferencia de derechos sobre inmuebles, alcanzados por las disposiciones del artículo 99 de esta ley, que se enajenen o transfieran a partir del 1° de enero de 2026, en los términos que al respecto establezca la reglamentación.",
  /** El art. 99: quién tributa, a qué alícuota y cómo se arma la ganancia. */
  art99:
    "Enajenación y transferencia de derechos sobre inmuebles. La ganancia de las personas humanas y de las sucesiones indivisas derivada de la enajenación de o de la transferencia de derechos sobre, inmuebles situados en la REPÚBLICA ARGENTINA, tributará a la alícuota del QUINCE POR CIENTO (15 %).",
  /** El art. 99 inc. a): el costo se actualiza, y de ahí sale la ganancia. */
  art99IncA:
    "Deduciendo del precio de enajenación o transferencia el costo de adquisición, actualizado mediante la aplicación del índice mencionado en el segundo párrafo del artículo 93, desde la fecha de adquisición hasta la fecha de enajenación o transferencia.",
  /** El art. 99, último párrafo: qué gastos se computan. */
  art99Gastos:
    "Podrán computarse los gastos (comisiones, honorarios, impuestos, tasas, etcétera) directa o indirectamente relacionados con las operaciones a que se refiere el presente artículo.",
  /** El párrafo que manda actualizar por IPC del INDEC las adquisiciones desde 2018. */
  actualizacionIpc:
    "Las actualizaciones previstas en los artículos 62 a 66, 71, 78, 87 y 88, y en los artículos 98 y 99, respecto de las adquisiciones o inversiones efectuadas en los ejercicios fiscales que se inicien a partir del 1° de enero de 2018, se realizarán sobre la base de las variaciones porcentuales del índice de precios al consumidor nivel general (IPC) que suministre el INSTITUTO NACIONAL DE ESTADÍSTICA Y CENSOS.",
  /** El art. 86 inc. a) de la Ley 27.430: la línea de 2018 que parte el universo en dos. */
  art86Ley27430:
    "Las operaciones detalladas en el apartado 5 del artículo 2° de la Ley de Impuesto a las Ganancias, texto ordenado en 1997 y sus modificaciones, tributarán en tanto el enajenante o cedente hubiera adquirido el bien a partir del 1° de enero de 2018 —en los términos que al respecto establezca la reglamentación— o, en caso de bienes recibidos por herencia, legado o donación, cuando el causante o donante lo hubiese adquirido con posterioridad a esta última fecha. En tales supuestos, las operaciones no estarán alcanzadas por el Título VII de la ley 23.905.",
  /** La nota de InfoLEG que registra la derogación del ITI. */
  derogacionIti:
    "Título VII (artículos 7° a 18) derogado por artículo 67 de la Ley N° 27.743 B.O. 08/07/2024. Vigencia: a partir de la publicación en el Boletín Oficial de la referida ley.",
  /** El art. 100: en este capítulo no se deducen las deducciones generales. */
  art100:
    "Adicionalmente a lo dispuesto en el primer párrafo del presente artículo, sólo podrán computarse contra las ganancias mencionadas en este capítulo, los costos de adquisición y gastos directa o indirectamente relacionados con ellas, no pudiendo deducirse los conceptos previstos en los artículos 29, 30 y 85 de la ley y todos aquellos que no correspondan a una determinada categoría de ganancias.",
} as const;

export type FuenteVentaInmuebles = { nombre: string; url: string; detalle: string };

export const VENTA_INMUEBLES_FUENTES: {
  consultadoEl: string;
  lista: FuenteVentaInmuebles[];
} = {
  consultadoEl: "2026-08-30",
  lista: [
    {
      nombre: "Ley de Impuesto a las Ganancias, t.o. 2019 — TEXTO ACTUALIZADO (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/332890/texact.htm",
      detalle:
        "El art. 99 con la alícuota del 15%, la regla del costo actualizado de su inciso a) y los gastos computables; el art. 26 inc. n) con la exención desde el 1/1/2026 y la nota que la atribuye al art. 192 de la Ley 27.802; el art. 100, que impide deducir contra esta ganancia los conceptos de los arts. 29, 30 y 85; y el párrafo que manda actualizar por IPC del INDEC las adquisiciones desde 2018.",
    },
    {
      nombre: "Ley 27.430, art. 86 inc. a) — texto oficial (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/305000-309999/305262/norma.htm",
      detalle:
        "La regla de transición que decide todo: el cedular alcanza sólo a quien adquirió el inmueble a partir del 1/1/2018, y para esos casos deja expresamente afuera al Título VII de la Ley 23.905 (el ITI). Es el artículo que parte el universo en dos mitades por fecha de compra.",
    },
    {
      nombre: "Ley 23.905, Título VII (ITI) — TEXTO ACTUALIZADO (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/305/texact.htm",
      detalle:
        "Los dieciocho artículos del Impuesto a la Transferencia de Inmuebles figuran hoy como derogados por el art. 67 de la Ley 27.743 (B.O. 8/7/2024), con vigencia desde su publicación. Es la prueba de que el ITI ya no existe, y por eso esta página no publica su alícuota.",
    },
    {
      nombre: "Ley 27.802 — texto oficial, art. 192 (Título XXIV)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "El artículo que sustituyó el inc. n) del art. 26 de la LIG e incorporó las dos exenciones: la del alquiler de casa habitación y la de la enajenación de inmuebles alcanzada por el art. 99, para operaciones desde el 1/1/2026.",
    },
  ],
};
