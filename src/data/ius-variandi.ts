// IUS VARIANDI — arts. 65, 66 y 68 de la Ley de Contrato de Trabajo 20.744 (t.o. Dec. 390/1976),
// leídos el 26/8/2026 en el texto actualizado de InfoLEG (id 25552).
//
// POR QUÉ ESTE ARCHIVO EXISTE (26/8/2026, s95): la Ley 27.802 sustituyó DOS artículos consecutivos
// el 6/3/2026 —el 66 por su art. 23 y el 68 por su art. 24— y entre los dos se llevaron puestos
// los tres estándares abiertos con los que se controlaba el poder de dirección, más la única vía
// que el trabajador tenía para pelear el cambio SIN irse. Es la regla de s78 en dos artículos que
// se leen juntos y que casi nadie mira juntos.
//
// LO QUE SALIÓ DEL ART. 66 (tres cosas, y las tres pesan):
//   1. **«no importen un ejercicio irrazonable de esa facultad»** — el estándar de razonabilidad
//      del ius variandi, la frase que citaba prácticamente toda la doctrina. Ya no está en el
//      artículo.
//   2. **«ni moral»** — el texto viejo vedaba el cambio que causara perjuicio «material ni moral».
//      Hoy sólo veda el material. El daño moral dejó de ser, por sí solo, un límite enunciado.
//   3. **La acción de restablecimiento.** El texto viejo daba a elegir: «optar por considerarse
//      despedido sin causa O accionar persiguiendo el restablecimiento de las condiciones
//      alteradas», por vía sumarísima y «no pudiéndose innovar en las condiciones y modalidades de
//      trabajo (…) hasta que recaiga sentencia definitiva». Esa opción —que era la reforma que la
//      Ley 26.088 había introducido en 2006— desapareció entera. Hoy queda un solo camino:
//      considerarse despedido. **La Ley 27.802 no reformó el art. 66: revirtió la reforma de 2006.**
//
// LO QUE ENTRÓ AL ART. 66: **«previa intimación y si ésta fuere desoída»**. Antes el texto no
// exigía intimación previa. Hoy sí, y por escrito: sin intimación desoída, la ley no habilita a
// considerarse despedido. Es un requisito nuevo y es el que más rápido puede hacer perder un
// reclamo bien fundado.
//
// LO QUE SALIÓ DEL ART. 68: la oración final entera. El texto viejo terminaba diciendo que
// «siempre se cuidará de satisfacer las exigencias de la organización del trabajo en la empresa y
// el respeto debido a la dignidad del trabajador y sus derechos patrimoniales, EXCLUYENDO TODA
// FORMA DE ABUSO DEL DERECHO». Esa cláusula era el límite general de TODAS las facultades del
// empleador —dirección, organización, disciplinaria, ius variandi y suspensiones— y hoy no está.
// El artículo quedó reducido a que las facultades se ejerzan «en los límites y con arreglo a las
// condiciones fijadas por la ley, los estatutos profesionales y las convenciones colectivas».
// (También cayeron los «consejos de empresa» y los «reglamentos internos que éstos dictaren», que
// eran letra muerta: esa parte no cambia nada en la práctica y no hay que venderla como si sí.)
//
// LO QUE NO CAMBIÓ, Y HAY QUE DECIRLO PARA NO EXAGERAR: el **art. 65 está intacto**. Sigue
// diciendo que las facultades de dirección «deberán ejercitarse con carácter funcional, atendiendo
// a los fines de la empresa, a las exigencias de la producción, sin perjuicio de la preservación y
// mejora de los derechos personales y patrimoniales del trabajador». No figura en la lista de
// artículos que la Ley 27.802 tocó. Si algún estándar de razonabilidad sobrevive, va a tener que
// salir de ahí — pero eso hoy es una lectura, no un texto, y la reforma es de marzo de 2026: no
// hay jurisprudencia. Esta página publica la diferencia entre las dos cosas en vez de taparla.
//
// FUENTES: texto actualizado de la LCT en InfoLEG (id 25552) para los arts. 65, 66, 67, 68, 69 y
// 246; captura del Internet Archive del 15/12/2025 del MISMO texact para recuperar los textos
// anteriores de los arts. 66 y 68; texto oficial de la Ley 27.802 (id 423680) para sus arts. 23 y
// 24. Nunca una nota de prensa.

/** Fecha desde la que rigen los textos nuevos (B.O. de la Ley 27.802). */
export const VIGENCIA_REFORMA = "6 de marzo de 2026";

/** ISO de esa misma fecha. */
export const VIGENCIA_REFORMA_ISO = "2026-03-06";

/** Artículo de la Ley 27.802 que sustituyó el art. 66 de la LCT. */
export const ARTICULO_SUSTITUYENTE_66 = 23;

/** Artículo de la Ley 27.802 que sustituyó el art. 68 de la LCT. */
export const ARTICULO_SUSTITUYENTE_68 = 24;

/** La ley de 2006 que había creado la acción de restablecimiento, hoy revertida. */
export const LEY_QUE_CREO_EL_RESTABLECIMIENTO = "26.088";
export const ANIO_LEY_26088 = 2006;

export const IUS_VARIANDI_TEXTOS = {
  art65:
    "Facultad de dirección. Las facultades de dirección que asisten al empleador deberán ejercitarse con carácter funcional, atendiendo a los fines de la empresa, a las exigencias de la producción, sin perjuicio de la preservación y mejora de los derechos personales y patrimoniales del trabajador.",
  art66Vigente:
    "Facultad de modificar las formas y modalidades del trabajo. El empleador está facultado para introducir todos aquellos cambios relativos a la forma y modalidades de la prestación del trabajo, en tanto esos cambios no alteren modalidades esenciales del contrato, ni causen perjuicio material al trabajador. Cuando el empleador disponga medidas vedadas por este artículo, al trabajador, previa intimación y si ésta fuere desoída, le asistirá la posibilidad de considerarse despedido sin causa.",
  art66Anterior:
    "Facultad de modificar las formas y modalidades del trabajo. El empleador está facultado para introducir todos aquellos cambios relativos a la forma y modalidades de la prestación del trabajo, en tanto esos cambios no importen un ejercicio irrazonable de esa facultad, ni alteren modalidades esenciales del contrato, ni causen perjuicio material ni moral al trabajador. Cuando el empleador disponga medidas vedadas por este artículo, al trabajador le asistirá la posibilidad de optar por considerarse despedido sin causa o accionar persiguiendo el restablecimiento de las condiciones alteradas. En este último supuesto la acción se substanciará por el procedimiento sumarísimo, no pudiéndose innovar en las condiciones y modalidades de trabajo, salvo que éstas sean generales para el establecimiento o sección, hasta que recaiga sentencia definitiva.",
  art66Nota:
    "(Artículo sustituido por art. 23 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  art68Vigente:
    "Modalidades de su ejercicio. El empleador, en todos los casos, deberá ejercitar las facultades que le están conferidas en los artículos anteriores, así como la de disponer suspensiones por razones económicas, en los límites y con arreglo a las condiciones fijadas por la ley, los estatutos profesionales y las convenciones colectivas de trabajo.",
  art68Anterior:
    "Modalidades de su ejercicio. El empleador, en todos los casos, deberá ejercitar las facultades que le están conferidas en los artículos anteriores, así como la de disponer suspensiones por razones económicas, en los límites y con arreglo a las condiciones fijadas por la ley, los estatutos profesionales, las convenciones colectivas de trabajo, los consejos de empresa y, si los hubiere, los reglamentos internos que éstos dictaren. Siempre se cuidará de satisfacer las exigencias de la organización del trabajo en la empresa y el respeto debido a la dignidad del trabajador y sus derechos patrimoniales, excluyendo toda forma de abuso del derecho.",
  art68Nota:
    "(Artículo sustituido por art. 24 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  art69:
    "Modificación del contrato de trabajo - Su exclusión como sanción disciplinaria. No podrán aplicarse sanciones disciplinarias que constituyan una modificación del contrato de trabajo.",
  art246:
    "Despido indirecto. Cuando el trabajador hiciese denuncia del contrato de trabajo fundado en justa causa, tendrá derecho a las indemnizaciones previstas en los artículos 232, 233 y 245.",
  /** El requisito nuevo: sin esto, la ley no habilita a considerarse despedido. */
  requisitoNuevo: "previa intimación y si ésta fuere desoída",
  /** La opción que desapareció del art. 66. */
  opcionQueDesaparecio:
    "accionar persiguiendo el restablecimiento de las condiciones alteradas. En este último supuesto la acción se substanciará por el procedimiento sumarísimo, no pudiéndose innovar en las condiciones y modalidades de trabajo, salvo que éstas sean generales para el establecimiento o sección, hasta que recaiga sentencia definitiva",
  /** El estándar de razonabilidad que salió del art. 66. */
  estandarQueSalio: "no importen un ejercicio irrazonable de esa facultad",
  /** La cláusula final del art. 68 que era el límite general de todas las facultades. */
  clausulaDeDignidadQueSalio:
    "Siempre se cuidará de satisfacer las exigencias de la organización del trabajo en la empresa y el respeto debido a la dignidad del trabajador y sus derechos patrimoniales, excluyendo toda forma de abuso del derecho.",
} as const;

/**
 * Los cuatro motivos por los que un cambio podía estar vedado. Dos siguen en el texto del art. 66
 * y dos ya no. Es la tabla que decide todo lo demás.
 */
export type MotivoVeda = {
  id: "esenciales" | "material" | "moral" | "irrazonable";
  etiqueta: string;
  ayuda: string;
  /** true si el texto VIGENTE del art. 66 lo sigue enunciando. */
  vedaHoy: boolean;
};

export const MOTIVOS_VEDA: MotivoVeda[] = [
  {
    id: "esenciales",
    etiqueta: "Altera modalidades esenciales del contrato",
    ayuda:
      "Lo que define el contrato: la tarea, la categoría, la jornada, el lugar de prestación, el salario. No cualquier cambio de detalle.",
    vedaHoy: true,
  },
  {
    id: "material",
    etiqueta: "Causa perjuicio material",
    ayuda:
      "Un daño económico verificable: menos ingresos, más costo de traslado, gastos que antes no tenías.",
    vedaHoy: true,
  },
  {
    id: "moral",
    etiqueta: "Causa perjuicio moral",
    ayuda:
      "El texto anterior vedaba el cambio que causara perjuicio «material ni moral». El vigente sólo nombra el material.",
    vedaHoy: false,
  },
  {
    id: "irrazonable",
    etiqueta: "Es un ejercicio irrazonable de la facultad",
    ayuda:
      "El estándar clásico del ius variandi: el cambio sin razón funcional, dispuesto por capricho o como represalia. El texto vigente ya no lo enuncia.",
    vedaHoy: false,
  },
];

/** Qué puede hacer el trabajador frente a un cambio vedado, antes y después de la reforma. */
export type Camino = {
  id: "despido-indirecto" | "restablecimiento";
  titulo: string;
  detalle: string;
  /** true si el texto VIGENTE del art. 66 lo sigue ofreciendo. */
  disponibleHoy: boolean;
};

export const CAMINOS: Camino[] = [
  {
    id: "despido-indirecto",
    titulo: "Considerarse despedido sin causa",
    detalle:
      "Romper el contrato y cobrar las indemnizaciones del despido: art. 246, que remite a los arts. 232 (preaviso), 233 (integración) y 245 (antigüedad). El texto vigente exige, antes, intimar al empleador y que la intimación sea desoída.",
    disponibleHoy: true,
  },
  {
    id: "restablecimiento",
    titulo: "Accionar por el restablecimiento de las condiciones",
    detalle:
      "Seguir trabajando y pedirle al juez que las condiciones vuelvan atrás, por vía sumarísima y sin que el empleador pudiera innovar hasta la sentencia definitiva. Lo había creado la Ley 26.088 en 2006 y la Ley 27.802 lo eliminó del artículo el 6 de marzo de 2026.",
    disponibleHoy: false,
  },
];

export type FuenteIusVariandi = { nombre: string; url: string; detalle: string };

export const IUS_VARIANDI_FUENTES: { consultadoEl: string; lista: FuenteIusVariandi[] } = {
  consultadoEl: "2026-08-26",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744, texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Arts. 66 y 68 con su texto vigente y sus notas de sustitución por los arts. 23 y 24 de la Ley 27.802, más los arts. 65, 67, 69 y 246, que la reforma no tocó (ninguno de ellos lleva nota).",
    },
    {
      nombre:
        "Los arts. 66 y 68 antes de la sustitución: captura del texto oficial (Internet Archive)",
      url: "https://web.archive.org/web/20251215041122/https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "La misma página de InfoLEG capturada el 15 de diciembre de 2025, antes de la reforma. De ahí salen los textos anteriores que se citan acá, incluida la acción de restablecimiento por vía sumarísima y la cláusula de dignidad y abuso del derecho del art. 68.",
    },
    {
      nombre: "Ley 27.802, texto oficial (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "Sus arts. 23 y 24 son los que sustituyen los arts. 66 y 68 de la LCT. Las notas fijan la vigencia «a partir de su publicación en el Boletín Oficial».",
    },
    {
      nombre: "Ley 27.802 (B.O. 6/3/2026)",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339542/20260306",
      detalle:
        "La publicación de la que arranca la vigencia. Un cambio de condiciones dispuesto antes de esa fecha se rige por los textos anteriores, con la acción de restablecimiento todavía disponible.",
    },
    {
      nombre: "Ley 26.088 (B.O. 24/4/2006): InfoLEG, id 115745",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=115745",
      detalle:
        "La reforma de 2006 que había puesto en el art. 66 la opción de accionar por el restablecimiento y la prohibición de innovar. Es la que la Ley 27.802 revirtió: por eso la nota del texto anterior la citaba como su fuente.",
    },
  ],
};
