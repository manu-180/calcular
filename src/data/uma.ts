// UMA (Unidad de Medida Arancelaria) y honorarios de los PERITOS — Ley 27.423, reformada por los
// arts. 95, 96 y 97 de la Ley 27.802 (Título IV).
//
// Leído el 30/8/2026 en tres fuentes oficiales:
//   · InfoLEG, TEXTO ACTUALIZADO de la Ley 27.423 (id 305057) — arts. 16, 19, 32, 51, 60, 61 y 61 bis.
//   · InfoLEG, Ley 27.802 (id 423680) — Título IV, arts. 95 a 97.
//   · Corte Suprema de Justicia de la Nación, csjn.gov.ar/transparencia/uma — las resoluciones de la
//     Secretaría General de Administración que fijan el valor de la UMA, con el PDF de cada una.
//     La serie de acá abajo NO se transcribió a mano: la baja y la parsea scripts/gen_uma.ts.
//
// POR QUÉ ESTE ARCHIVO EXISTE (30/8/2026, s99): el Título IV era el último candidato con números de
// la Ley 27.802 que seguía sin abrir, y estaba trabado por una sola pregunta —¿se puede rotar el
// valor de la UMA por código, o ata al imperio a un dato manual?—. La respuesta es sí (ver las minas
// en gen_uma.ts), así que la página se abre.
//
// EL HALLAZGO, Y NO ES EL QUE CUENTAN LAS NOTAS DE LA REFORMA:
//
//   1. **La reforma bajó el piso de los honorarios periciales de 6 UMA a 2 UMA.** Los arts. 95 y 96
//      de la Ley 27.802 sustituyeron los arts. 60 y 61 de la Ley 27.423 y el texto nuevo es idéntico
//      al viejo, palabra por palabra, salvo UNA: donde decía «seis (6) UMA» ahora dice «dos (2) UMA».
//      Es el caso puro de la regla de ley-diff-articulo.ts al revés: no cambia la lista ni el verbo;
//      cambia sólo el número, y por eso un artículo «sustituido» pasa por una modificación menor.
//      Verificado con el texto de InfoLEG al 1/1/2026 (6 UMA) contra el vigente (2 UMA).
//      En pesos de hoy la caída del piso son cientos de miles: la calcula la página.
//
//   2. **El art. 61 bis (nuevo) desengancha el honorario del monto del juicio y del porcentaje de
//      incapacidad.** Literal: «no estarán vinculados a la cuantía del respectivo juicio, ni al
//      porcentaje de incapacidad que se dictamine en caso de producirse una pericia médica». Toda
//      la práctica de los juicios laborales y de ART venía anclando el honorario del perito médico a
//      un porcentaje de la condena; eso es exactamente lo que la norma vigente prohíbe. La página lo
//      publica textual porque es el punto donde más se copia el criterio viejo.
//
//   3. **Piso nuevo para el proceso que se cierra sin pericia: 1/4 de UMA.** Si el juicio termina por
//      transacción, avenimiento o conciliación y el perito no llegó a presentar la pericia, se le
//      regula un cuarto de UMA «en tanto el perito haya aceptado el cargo». Antes de la reforma no
//      había piso escrito para ese caso.
//
//   4. **El art. 51 convierte a la UMA en una cláusula de actualización legal**, y esto es lo que
//      casi nadie publica: la regulación debe expresar el monto en pesos Y la cantidad de UMA que
//      representa, «bajo pena de nulidad», y el pago sólo es cancelatorio si se abona el equivalente
//      a esas UMA «según su valor vigente al momento del pago». O sea que un honorario regulado hace
//      un año no se paga por su importe nominal: se paga por sus UMA, al valor de hoy.
//
// LO QUE ESTA PÁGINA NO PUBLICA, A PROPÓSITO:
//   · **Cuánto le van a regular a un perito en concreto.** Los arts. 60 y 61 fijan un MÍNIMO; el
//     monto sale de las pautas del art. 16 y de la apreciación judicial. Publicar un "honorario
//     estimado" sería inventar. Lo que se calcula es el piso legal, que sí es un número.
//   · **La serie completa de la UMA desde 2018.** La Corte publicó 22 de sus resoluciones como
//     imagen escaneada: esos PDF no tienen texto y no se pueden leer por código. Los valores que
//     faltan NO se estiman ni se interpolan. Por eso la conversión histórica sólo se ofrece dentro
//     del tramo continuo verificado (ver COBERTURA_CONTINUA_DESDE) y afuera se manda a la fuente.
//   · **Los honorarios de abogados y procuradores.** La reforma del Título IV toca a los peritos y
//     auxiliares de la Justicia, no a los letrados. Mezclarlos sería el error más caro de la página.

/** Una vigencia de la UMA, tal como la fijó una resolución de la SGA de la CSJN. */
export type FilaUma = {
  /** ISO del primer día desde el que rige ese valor. */
  desde: string;
  /** Pesos, sin decimales — el art. 19 manda «eliminando las fracciones decimales». */
  valor: number;
  /** Resolución de la Secretaría General de Administración que lo fijó. */
  resolucion: string;
  /** ISO de la fecha de esa resolución (siempre posterior a la vigencia: la Corte la publica después). */
  resolucionFecha: string;
  /** id del PDF en https://www.csjn.gov.ar/documentos/descargar?ID=… */
  docId: number;
};

/**
 * Serie oficial de la UMA, la más nueva primero. Generada por `scripts/gen_uma.ts` desde los PDF de
 * la CSJN. No editar a mano: correr el script.
 */
export const SERIE_UMA: FilaUma[] = [
  { desde: "2026-07-01", valor: 104220, resolucion: "1930/2026", resolucionFecha: "2026-08-20", docId: 160993 },
  { desde: "2026-06-01", valor: 102076, resolucion: "1785/2026", resolucionFecha: "2026-08-03", docId: 160573 },
  { desde: "2026-05-01", valor: 100173, resolucion: "1718/2026", resolucionFecha: "2026-07-13", docId: 160400 },
  { desde: "2026-04-01", valor: 98112, resolucion: "1352/2026", resolucionFecha: "2026-06-09", docId: 159663 },
  { desde: "2026-03-01", valor: 95626, resolucion: "1076/2026", resolucionFecha: "2026-05-21", docId: 159173 },
  { desde: "2026-02-01", valor: 92482, resolucion: "538/2026", resolucionFecha: "2026-03-31", docId: 157935 },
  { desde: "2026-01-01", valor: 89875, resolucion: "235/2026", resolucionFecha: "2026-03-05", docId: 153527 },
  { desde: "2025-12-01", valor: 87342, resolucion: "36/2026", resolucionFecha: "2026-02-11", docId: 153113 },
  { desde: "2025-11-01", valor: 84963, resolucion: "3160/2025", resolucionFecha: "2025-12-16", docId: 152542 },
  { desde: "2025-10-01", valor: 80664, resolucion: "2996/2025", resolucionFecha: "2025-11-28", docId: 152221 },
  { desde: "2025-09-01", valor: 78850, resolucion: "2533/2025", resolucionFecha: "2025-10-30", docId: 151546 },
  { desde: "2025-08-01", valor: 77229, resolucion: "2226/2025", resolucionFecha: "2025-09-25", docId: 150893 },
  { desde: "2025-07-01", valor: 75789, resolucion: "1860/2025", resolucionFecha: "2025-08-22", docId: 150205 },
  { desde: "2025-06-01", valor: 74376, resolucion: "1687/2025", resolucionFecha: "2025-08-05", docId: 149873 },
  { desde: "2025-05-01", valor: 73204, resolucion: "1432/2025", resolucionFecha: "2025-07-03", docId: 149277 },
  { desde: "2025-04-01", valor: 72265, resolucion: "1236/2025", resolucionFecha: "2025-06-12", docId: 148921 },
  { desde: "2024-05-01", valor: 54716, resolucion: "1772/2024", resolucionFecha: "2024-07-29", docId: 143519 },
  { desde: "2023-12-01", valor: 34382, resolucion: "12/2024", resolucionFecha: "2024-02-01", docId: 142347 },
  { desde: "2023-10-01", valor: 27784, resolucion: "3369/2023", resolucionFecha: "2023-12-04", docId: 142350 },
  { desde: "2023-07-01", valor: 20595, resolucion: "29/2023", resolucionFecha: "2023-09-22", docId: 139735 },
  { desde: "2023-06-01", valor: 19338, resolucion: "19/2023", resolucionFecha: "2023-06-14", docId: 138359 },
  { desde: "2022-12-01", valor: 12479, resolucion: "3/2023", resolucionFecha: "2023-02-24", docId: 136735 },
  { desde: "2022-09-01", valor: 10400, resolucion: "25/2022", resolucionFecha: "2022-09-08", docId: 135128 },
  { desde: "2021-11-01", valor: 6468, resolucion: "28/2021", resolucionFecha: "2021-12-09", docId: 130933 },
  { desde: "2019-12-01", valor: 3192, resolucion: "2/2020", resolucionFecha: "2020-03-03", docId: 121632 },
  { desde: "2019-09-01", valor: 2638, resolucion: "28/2019", resolucionFecha: "2019-10-29", docId: 119483 },
  { desde: "2019-03-01", valor: 2075, resolucion: "8/2019", resolucionFecha: "2019-04-15", docId: 115634 },
  { desde: "2018-10-01", valor: 1887, resolucion: "3/2019", resolucionFecha: "2019-02-19", docId: 114685 },
  { desde: "2018-01-01", valor: 1417, resolucion: "27/2018", resolucionFecha: "2018-09-04", docId: 111869 },
];

/**
 * Desde acá la serie es MES A MES sin huecos, y cada valor salió del PDF de su resolución. Antes de
 * esta fecha la Corte publicó varias resoluciones escaneadas (PDF sin texto) y hay meses cuyo valor
 * no podemos afirmar. La conversión histórica de la calculadora se limita a este tramo a propósito.
 */
export const COBERTURA_CONTINUA_DESDE = "2025-04-01";

/** Fecha en que se consultó la serie contra el sitio de la Corte. */
export const CONSULTADO_EL = "2026-08-30";

/** El valor vigente hoy: siempre el primero de la serie. */
export const UMA_VIGENTE = SERIE_UMA[0];

/** Publicación de la Ley 27.802 en el Boletín Oficial; sus arts. 95-97 rigen desde ese día. */
export const VIGENCIA_REFORMA_ISO = "2026-03-06";
export const VIGENCIA_REFORMA = "6 de marzo de 2026";

/** Piso que fijaban los arts. 60 y 61 en su redacción anterior a la Ley 27.802. */
export const PISO_ANTERIOR_UMA = 6;

export type ClaveSupuesto = "noPecuniario" | "pecuniario" | "sinPericia";

export type Supuesto = {
  clave: ClaveSupuesto;
  etiqueta: string;
  /** Cantidad de UMA del piso vigente. */
  uma: number;
  /** Cantidad de UMA que fijaba la redacción anterior (null = el supuesto no existía). */
  umaAnterior: number | null;
  articulo: string;
  /** Texto textual del artículo vigente, para que el piso se pueda verificar sin salir de la página. */
  texto: string;
  /** Qué hay que haber hecho para tener derecho al piso. */
  requisito: string;
};

/**
 * Los tres supuestos con piso escrito. El orden es el de la ley: art. 60 (sin contenido
 * patrimonial), art. 61 (con contenido patrimonial) y art. 61 bis (proceso cerrado sin pericia).
 */
export const SUPUESTOS: Supuesto[] = [
  {
    clave: "noPecuniario",
    etiqueta: "Proceso NO susceptible de apreciación pecuniaria",
    uma: 2,
    umaAnterior: 6,
    articulo: "art. 60, Ley 27.423 (sustituido por art. 95 de la Ley 27.802)",
    texto:
      "En los procesos no susceptibles de apreciación pecuniaria, los honorarios de los peritos y de los peritos liquidadores de averías serán fijados conforme a las pautas valorativas del artículo 16 y en un mínimo de dos (2) UMA, siendo suficiente para la fijación de los honorarios mínimos, la aceptación del cargo conferido.",
    requisito:
      "Alcanza con haber aceptado el cargo: el propio artículo dice que la aceptación es suficiente para que se fije el mínimo.",
  },
  {
    clave: "pecuniario",
    etiqueta: "Proceso susceptible de apreciación pecuniaria (primera instancia, hasta la sentencia)",
    uma: 2,
    umaAnterior: 6,
    articulo: "art. 61, Ley 27.423 (sustituido por art. 96 de la Ley 27.802)",
    texto:
      "En los procesos susceptibles de apreciación pecuniaria, por las actuaciones de primera instancia hasta la sentencia, los honorarios del perito y del perito liquidador de averías serán fijados conforme lo establece el artículo 32. Para tales casos los honorarios mínimos a regular alcanzan a dos (2) UMA.",
    requisito:
      "El piso es de dos UMA por las actuaciones de primera instancia hasta la sentencia. El art. 61 bis agrega, además, un mínimo de dos UMA por cada pericia.",
  },
  {
    clave: "sinPericia",
    etiqueta: "El proceso terminó por transacción, avenimiento o conciliación y la pericia no se presentó",
    uma: 0.25,
    umaAnterior: null,
    articulo: "art. 61 bis, Ley 27.423 (incorporado por art. 97 de la Ley 27.802)",
    texto:
      "En caso de finalizar el proceso por transacción, avenimiento y conciliación, sin que el perito haya presentado la pericia encargada, se le regulará un cuarto (1/4) de UMA en tanto el perito haya aceptado el cargo.",
    requisito:
      "Hace falta haber aceptado el cargo. Es un supuesto nuevo: antes de la reforma no había piso escrito para el proceso que se cierra sin pericia.",
  },
];

/** El corazón del art. 61 bis, textual: es la frase que la práctica anterior contradice. */
export const TEXTO_61_BIS_DESVINCULACION =
  "Los honorarios de los peritos que intervengan en las controversias judiciales, no estarán vinculados a la cuantía del respectivo juicio, ni al porcentaje de incapacidad que se dictamine en caso de producirse una pericia médica. Su regulación responderá exclusivamente a la apreciación judicial de la labor técnica realizada en el pleito y su relevancia; calidad y extensión en lo concreto y deberá fijarse en un monto que asegure una adecuada retribución al perito. Por cada pericia, se fijará un monto mínimo de dos (2) UMA.";

/** El art. 51, textual: la regla que convierte a la UMA en cláusula de actualización. */
export const TEXTO_51 =
  "La regulación de honorarios deberá contener, bajo pena de nulidad, el monto expresado en moneda de curso legal y la cantidad de UMA que éste representa a la fecha de la resolución. El pago será definitivo y cancelatorio únicamente si se abona la cantidad de moneda de curso legal que resulte equivalente a la cantidad de UMA contenidas en la resolución regulatoria, según su valor vigente al momento del pago.";

/** El art. 19, textual: qué es la UMA y quién la publica. */
export const TEXTO_19 =
  "Institúyese la Unidad de Medida Arancelaria (UMA) para los honorarios profesionales de los abogados, procuradores y auxiliares de la Justicia, la que equivaldrá al tres por ciento (3 %) de la remuneración básica asignada al cargo de juez federal de primera instancia. La Corte Suprema de Justicia de la Nación suministrará y publicará mensualmente, por el medio a determinar por dicho Alto Tribunal, el valor resultante, eliminando las fracciones decimales, e informará a las diferentes cámaras el valor de la UMA.";

export const FUENTES = [
  {
    titulo: "Ley 27.423 — texto actualizado (arts. 19, 51, 60, 61 y 61 bis)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=305057",
  },
  {
    titulo: "Ley 27.802 — Título IV, arts. 95 a 97",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=423680",
  },
  {
    titulo: "CSJN — valores de la UMA (todas las resoluciones, con su PDF)",
    url: "https://www.csjn.gov.ar/transparencia/uma",
  },
  {
    titulo: `CSJN — Resolución SGA ${UMA_VIGENTE.resolucion}, la que fija la UMA vigente`,
    url: `https://www.csjn.gov.ar/documentos/descargar?ID=${UMA_VIGENTE.docId}`,
  },
];
