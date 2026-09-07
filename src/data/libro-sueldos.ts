// LIBRO DE SUELDOS Y PRESUNCIÓN DEL ART. 55 — arts. 52 a 55 y 61 de la Ley de Contrato de Trabajo
// 20.744, leídos el 25/8/2026 en el texto actualizado de InfoLEG (id 25552) y en la captura del
// MISMO texact del 15/12/2025 (anterior a la reforma) para los textos que ya no están.
//
// POR QUÉ ESTE ARCHIVO EXISTE (25/8/2026, s94): la Ley 27.802 no tocó un artículo del bloque de
// prueba del contrato de trabajo — lo reescribió entero, en cinco artículos, el mismo día:
//
//   · **Art. 52 (sustituido por su art. 20).** Se cayó el «libro especial, registrado y rubricado,
//     en las mismas condiciones que se exigen para los libros principales de comercio», con sus
//     ocho incisos y sus cuatro prohibiciones. En su lugar: la registración se hace ante ARCA y
//     «esta registración será suficiente a todos los efectos, sin que puedan exigirse requisitos
//     adicionales por parte de ninguna otra autoridad». Los libros preexistentes se conservan DIEZ
//     años y pueden digitalizarse, con «la misma validez legal que los originales en formato papel».
//   · **Art. 53 (sustituido por su art. 21).** Pasó de mandar a los jueces merituar «los libros que
//     carezcan de algunas de las formalidades prescriptas en el artículo 52 o que tengan algunos de
//     los defectos allí consignados» a merituar, más abierto, «la omisión de formalidades en la
//     registración en los términos del artículo 52».
//   · **Art. 54 (DEROGADO por su art. 207).** Era el que extendía esos requisitos de validez a
//     «los registros, planillas u otros elementos de contralor». Ya no existe.
//   · **Art. 55 (sustituido por su art. 22) — EL CAMBIO QUE MÁS PESA EN UN JUICIO.** El epígrafe
//     pasó de «Omisión de su exhibición» a «Omisión de registración», y con él el disparador de la
//     presunción más usada del derecho laboral argentino: antes se activaba por «la falta de
//     exhibición o requerimiento judicial o administrativo del libro, registro, planilla u otros
//     elementos de contralor previstos por los artículos 52 y 54»; hoy, por «la falta de
//     registración en los términos del artículo 52». Es decir: dejó de castigarse una CONDUCTA
//     PROCESAL (tener los libros y no traerlos al juicio) y pasó a castigarse un HECHO SUSTANTIVO
//     (no haber registrado). El empleador registrado en ARCA que se niega a exhibir documentación
//     ya no cae bajo la presunción por esa sola negativa.
//   · **Art. 61 (DEROGADO por su art. 207).** Era la regla de que las cláusulas insertas en
//     formularios del empleador se aprecian «en cada caso, en favor del trabajador».
//
// LA REMISIÓN QUE SE QUEDÓ SIN DESTINO: el art. 55 anterior remitía a «los artículos 52 y 54». La
// misma ley derogó el 54 y reescribió el 55 para que remitiera sólo al 52. Toda nota, modelo de
// demanda o resumen que siga citando «arts. 52 y 54 LCT» está citando la mitad de una remisión que
// ya no existe.
//
// FUENTES: texto actualizado de la LCT en InfoLEG (id 25552); captura del Internet Archive del
// 15/12/2025 del mismo texact para los textos anteriores y los derogados; texto oficial de la Ley
// 27.802 (id 423680). Nunca una nota de prensa.

/** Fecha desde la que rige el bloque nuevo (B.O. de la Ley 27.802). */
export const VIGENCIA_REFORMA = "6 de marzo de 2026";
export const VIGENCIA_REFORMA_ISO = "2026-03-06";

/** Años que el art. 52 nuevo obliga a conservar los libros preexistentes. */
export const ANIOS_CONSERVACION = 10;

/** Qué artículo de la Ley 27.802 tocó cada uno de los cinco. */
export const CAMBIOS_DEL_BLOQUE: {
  articulo: number;
  epigrafeAnterior: string;
  epigrafeVigente: string | null;
  accion: "sustituido" | "derogado";
  porArticulo: number;
  queCambio: string;
}[] = [
  {
    articulo: 52,
    epigrafeAnterior: "Libro especial. Formalidades. Prohibiciones",
    epigrafeVigente: "Registro del trabajador",
    accion: "sustituido",
    porArticulo: 20,
    queCambio:
      "Cayó el libro rubricado con sus ocho incisos y sus cuatro prohibiciones. La registración pasa a hacerse ante ARCA y ninguna otra autoridad puede exigir requisitos adicionales. Los libros viejos se guardan 10 años y valen digitalizados.",
  },
  {
    articulo: 53,
    epigrafeAnterior: "Omisión de formalidades",
    epigrafeVigente: "Omisión de formalidades",
    accion: "sustituido",
    porArticulo: 21,
    queCambio:
      "Mismo epígrafe, distinto objeto: antes los jueces merituaban los LIBROS defectuosos; ahora, la omisión de formalidades «en la registración».",
  },
  {
    articulo: 54,
    epigrafeAnterior: "Aplicación de los registros, planillas u otros elementos de contralor",
    epigrafeVigente: null,
    accion: "derogado",
    porArticulo: 207,
    queCambio:
      "Era el puente que extendía los requisitos de validez a registros, planillas y elementos de contralor de leyes, estatutos y convenios. Desapareció, y con él la mitad de la remisión del art. 55 anterior.",
  },
  {
    articulo: 55,
    epigrafeAnterior: "Omisión de su exhibición",
    epigrafeVigente: "Omisión de registración",
    accion: "sustituido",
    porArticulo: 22,
    queCambio:
      "El disparador de la presunción cambió de raíz: de no exhibir los libros ante el requerimiento judicial o administrativo, a no haber registrado al trabajador en los términos del art. 52.",
  },
  {
    articulo: 61,
    epigrafeAnterior: "Formularios",
    epigrafeVigente: null,
    accion: "derogado",
    porArticulo: 207,
    queCambio:
      "Era la regla de interpretación de la letra chica: las cláusulas y los rubros de los formularios del empleador se apreciaban «en favor del trabajador». Ya no está escrita.",
  },
];

/** Los ocho incisos del libro especial que el art. 52 anterior enumeraba, y que ya no están. */
export const INCISOS_LIBRO_ANTERIOR: string[] = [
  "Individualización íntegra y actualizada del empleador",
  "Nombre del trabajador",
  "Estado civil",
  "Fecha de ingreso y egreso",
  "Remuneraciones asignadas y percibidas",
  "Individualización de personas que generen derecho a la percepción de asignaciones familiares",
  "Demás datos que permitan una exacta evaluación de las obligaciones a su cargo",
  "Los que establezca la reglamentación",
];

/** Las cuatro prohibiciones del art. 52 anterior. */
export const PROHIBICIONES_LIBRO_ANTERIOR: string[] = [
  "Alterar los registros correspondientes a cada persona empleada",
  "Dejar blancos o espacios",
  "Hacer interlineaciones, raspaduras o enmiendas, las que deberán ser salvadas en el cuadro o espacio respectivo, con firma del trabajador a que se refiere el asiento y control de la autoridad administrativa",
  "Tachar anotaciones, suprimir fojas o alterar su foliatura o registro",
];

export const LIBRO_TEXTOS = {
  art52Vigente:
    "Registro del trabajador. Los empleadores deberán registrar a los trabajadores ante la Agencia de Recaudación y Control Aduanero (ARCA), organismo descentralizado actuante en la órbita del Ministerio de Economía, de acuerdo a la normativa que dicho organismo dicte. Esta registración será suficiente a todos los efectos, sin que puedan exigirse requisitos adicionales por parte de ninguna otra autoridad. El empleador deberá conservar los libros preexistentes durante un plazo de diez (10) años. A tal efecto, dichos libros podrán ser digitalizados y las copias digitales tendrán la misma validez legal que los originales en formato papel.",
  /** El libro especial que ya no existe, recuperado de la captura del 15/12/2025. */
  art52Anterior:
    "Libro especial. Formalidades. Prohibiciones. Los empleadores deberán llevar un libro especial, registrado y rubricado, en las mismas condiciones que se exigen para los libros principales de comercio, en el que se consignará: a) Individualización íntegra y actualizada del empleador. b) Nombre del trabajador. c) Estado civil. d) Fecha de ingreso y egreso. e) Remuneraciones asignadas y percibidas. f) Individualización de personas que generen derecho a la percepción de asignaciones familiares. g) Demás datos que permitan una exacta evaluación de las obligaciones a su cargo. h) Los que establezca la reglamentación. Se prohibe: 1. Alterar los registros correspondientes a cada persona empleada. 2. Dejar blancos o espacios. 3. Hacer interlineaciones, raspaduras o enmiendas, las que deberán ser salvadas en el cuadro o espacio respectivo, con firma del trabajador a que se refiere el asiento y control de la autoridad administrativa. 4. Tachar anotaciones, suprimir fojas o alterar su foliatura o registro. Tratándose de registro de hojas móviles, su habilitación se hará por la autoridad administrativa, debiendo estar precedido cada conjunto de hojas, por una constancia extendida por dicha autoridad, de la que resulte su número y fecha de habilitación.",
  art52Nota:
    "(Artículo sustituido por art. 20 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  art53Vigente:
    "Omisión de formalidades. Los jueces merituarán la omisión de formalidades en la registración en los términos del artículo 52 de la presente ley, en función de las particulares circunstancias de cada caso.",
  art53Anterior:
    "Omisión de formalidades. Los jueces merituarán en función de las particulares circunstancias de cada caso los libros que carezcan de algunas de las formalidades prescriptas en el artículo 52 o que tengan algunos de los defectos allí consignados.",
  art54Derogado:
    "Aplicación de los registros, planillas u otros elementos de contralor. Idéntico requisito de validez deberán reunir los registros, planillas u otros elementos de contralor exigidos por las leyes y sus normas reglamentarias, por los estatutos profesionales o convenciones colectivas de trabajo, que serán apreciadas judicialmente según lo prescrito en el artículo anterior.",
  art54Nota:
    "(Artículo derogado por art. 207 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  /** El artículo que decide los juicios. Texto vigente. */
  art55Vigente:
    "Omisión de registración. La falta de registración en los términos del artículo 52 de la presente ley, constituirá una presunción a favor de las manifestaciones del trabajador o de sus causahabientes respecto de las circunstancias que debieron constar en el pertinente registro.",
  art55Nota:
    "(Artículo sustituido por art. 22 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  /** El texto anterior, recuperado de la captura del texact del 15/12/2025. */
  art55Anterior:
    "Omisión de su exhibición. La falta de exhibición o requerimiento judicial o administrativo del libro, registro, planilla u otros elementos de contralor previstos por los artículos 52 y 54 será tenida como presunción a favor de las afirmaciones del trabajador o de sus causa-habientes, sobre las circunstancias que debían constar en tales asientos.",
  art61Derogado:
    "Formularios. Las cláusulas o rubros insertos en formularios dispuestos o utilizados por el empleador, que no correspondan al impreso, la incorporación a los mismos de declaraciones o cantidades, cancelatorias o liberatorias por más de un concepto u obligación, o diferentes períodos acumulados, se apreciarán por los jueces, en cada caso, en favor del trabajador.",
  art61Nota:
    "(Artículo derogado por art. 207 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  /** Lo que dispara la presunción hoy. */
  disparadorVigente: "La falta de registración en los términos del artículo 52",
  /** Lo que la disparaba antes. */
  disparadorAnterior:
    "La falta de exhibición o requerimiento judicial o administrativo del libro, registro, planilla u otros elementos de contralor previstos por los artículos 52 y 54",
} as const;

export type FuenteLibro = { nombre: string; url: string; detalle: string };

export const LIBRO_FUENTES: { consultadoEl: string; lista: FuenteLibro[] } = {
  consultadoEl: "2026-08-25",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744 — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Arts. 52, 53 y 55 con su texto vigente y la nota de sustitución por los arts. 20, 21 y 22 de la Ley 27.802; arts. 54 y 61 reducidos a la nota de derogación por su art. 207.",
    },
    {
      nombre: "Los textos anteriores — captura del texto oficial (Internet Archive)",
      url: "https://web.archive.org/web/20251215041122/https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "La misma página de InfoLEG capturada el 15 de diciembre de 2025, antes de la reforma. De ahí salen el libro especial del art. 52 con sus ocho incisos y sus cuatro prohibiciones, el art. 53 anterior, el art. 54 completo, el art. 55 con el epígrafe «Omisión de su exhibición» y el art. 61 de formularios.",
    },
    {
      nombre: "Ley 27.802 — texto oficial (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "Arts. 20, 21 y 22 (las sustituciones de los arts. 52, 53 y 55 de la LCT) y art. 207 (las derogaciones, entre ellas los arts. 54 y 61).",
    },
    {
      nombre: "Ley 27.802 — B.O. 6/3/2026",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339542/20260306",
      detalle:
        "La publicación de la que arranca la vigencia. Los cinco artículos rigen «a partir de su publicación en el Boletín Oficial»: no esperan a 2027.",
    },
    {
      nombre: "Ley 27.321 (B.O. 15/12/2016) — la reforma anterior del art. 54",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=269015",
      detalle:
        "El art. 54 derogado llevaba el texto que le dio esta ley en 2016: es el único de los cinco que figuraba en los «Antecedentes Normativos» de la LCT antes de la reforma de 2026.",
    },
  ],
};
