// RENUNCIA Y EXTINCIÓN POR MUTUO ACUERDO — arts. 240 y 241 de la Ley de Contrato de Trabajo
// 20.744, con el TEXTO SUSTITUIDO por los arts. 49 y 50 de la Ley 27.802 (B.O. 6/3/2026), más la
// liquidación final que sale de los arts. 74, 123, 150/153/155/156.
//
// POR QUÉ ESTE ARCHIVO EXISTE (24/8/2026, s93). «Renunciar» es de las cosas más buscadas del
// derecho laboral argentino y la respuesta publicada es siempre la misma: telegrama de renuncia,
// gratuito, en el correo, en persona. Ese es el texto que rigió hasta el 5 de marzo de 2026. La
// Ley 27.802 reescribió los dos artículos que gobiernan la salida voluntaria y **ninguna de las
// dos reformas se publica**:
//
//   · **Art. 240 (art. 49 de la reforma).** Tres cambios, no uno:
//       1. El telegrama pasó a poder ser **«en formato físico o digital»**. Antes decía
//          «despacho telegráfico **colacionado**».
//       2. Se cayó la exigencia de **presencia personal**. El texto anterior pedía que el despacho
//          fuera «cursado **personalmente** por el trabajador» y que las oficinas de correo lo
//          expidieran «requiriéndose la **presencia personal del remitente** y la justificación de
//          su identidad». El texto vigente pide sólo «la **validación de su identidad**», sin decir
//          cómo — y remite, para la vía administrativa, «a la forma que determine la
//          reglamentación».
//       3. **Desapareció un párrafo entero**: el que obligaba a la autoridad administrativa a dar
//          «inmediata comunicación» de la renuncia al empleador, «siendo ello suficiente a los
//          fines del artículo 235» (la prueba por escrito de la notificación).
//
//   · **Art. 241 (art. 50 de la reforma).** El artículo conserva sus tres párrafos históricos —
//     mutuo acuerdo por escritura pública o ante autoridad, nulidad sin presencia personal del
//     trabajador, y el abandono recíproco por «comportamiento concluyente»— y le agregaron uno
//     **nuevo, con número**: «En un contrato de trabajo de prestaciones continuas y permanentes, se
//     considera configurado este supuesto luego de transcurridos **dos (2) meses calendarios** sin
//     que alguna de las partes manifieste su voluntad de continuidad de éste.»
//     Antes, el abandono recíproco había que probarlo. Ahora tiene plazo objetivo.
//
// EL DATO QUE CAMBIA LA DECISIÓN, y que junta las dos mitades: extinguirse por el art. 241 **no
// paga indemnización**, pero desde esta misma reforma **sí da derecho a la prestación por
// desempleo**: el art. 99 de la Ley 27.802 incorporó el inc. i) al art. 114 de la Ley 24.013 y
// convirtió la extinción por mutuo acuerdo del art. 241 en situación legal de desempleo. Eso ya
// está cosechado en `/desempleo`, y es lo que vuelve al art. 241 una opción real frente a la
// renuncia lisa y llana, que no da nada.
//
// LO QUE SÍ SE COBRA AL RENUNCIAR (contra el prejuicio de «si renunciás no te dan nada»): los
// arts. 123 y 156 dicen «por cualquier causa». Entonces van los días trabajados del mes (art. 74),
// el SAC proporcional (art. 123) y las vacaciones proporcionales no gozadas (art. 156, al valor
// del art. 155 inc. a). Lo que NO va: indemnización por antigüedad ni preaviso del empleador.
//
// FUENTE: texto actualizado de la LCT en InfoLEG (id 25552) leído el 24/8/2026; el texto anterior,
// de la misma página capturada el 15/12/2025
// (`npx -y tsx tools/infoleg.ts 25552 --fecha 20251215 --art "Art. 240"`).

/** Fecha desde la que rige la reforma (B.O. de la Ley 27.802). */
export const VIGENCIA_REFORMA = "6 de marzo de 2026";
export const VIGENCIA_REFORMA_ISO = "2026-03-06";

/** Artículos de la Ley 27.802 que sustituyeron los arts. 240 y 241 de la LCT. */
export const ARTICULO_SUSTITUTIVO_240 = 49;
export const ARTICULO_SUSTITUTIVO_241 = 50;

/** El plazo nuevo del art. 241 para el abandono recíproco, en meses calendarios. */
export const MESES_ABANDONO_RECIPROCO = 2;

/** Divisores de la liquidación: el día común y el día de vacaciones (art. 155 inc. a). */
export const DIVISOR_DIA = 30;
export const DIVISOR_VACACIONES = 25;

/** Art. 153: un día de descanso cada veinte de trabajo efectivo, cuando no se llega al art. 151. */
export const DIAS_TRABAJO_POR_DIA_DESCANSO = 20;

/** Días de preaviso que debe el trabajador que renuncia (art. 231, primer párrafo). */
export const PREAVISO_DEL_TRABAJADOR_DIAS = 15;

/**
 * Citas textuales: el texto VIGENTE y el que rigió hasta el 5/3/2026, palabra por palabra. Son el
 * ancla contra la que `check_renuncia.ts` verifica que la página no derive hacia un resumen que
 * diga otra cosa que la norma — y son la prueba del cambio, que es todo el valor de la página.
 */
export const RENUNCIA_TEXTOS = {
  art240Vigente:
    "Forma. La extinción del contrato de trabajo por renuncia del trabajador medie o no preaviso, deberá formalizarse, como requisito para su validez, mediante despacho telegráfico en formato físico o digital cursado por el trabajador a su empleador, o ante la autoridad administrativa del trabajo en la forma que determine la reglamentación. Los despachos telegráficos serán expedidos en forma gratuita y requiriendo la validación de su identidad.",
  art240Anterior:
    "Forma. La extinción del contrato de trabajo por renuncia del trabajador, medie o no preaviso, como requisito para su validez, deberá formalizarse mediante despacho telegráfico colacionado cursado personalmente por el trabajador a su empleador o ante la autoridad administrativa del trabajo. Los despachos telegráficos serán expedidos por las oficinas de correo en forma gratuita, requiriéndose la presencia personal del remitente y la justificación de su identidad. Cuando la renuncia se formalizara ante la autoridad administrativa ésta dará inmediata comunicación de la misma al empleador, siendo ello suficiente a los fines del artículo 235 de esta ley.",
  art240Nota:
    "(Artículo sustituido por art. 49 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  art241Vigente:
    "Formas y modalidades. Las partes, por mutuo acuerdo, podrán extinguir el contrato de trabajo. El acto deberá formalizarse mediante escritura pública o ante la autoridad judicial o administrativa del trabajo. Será nulo y sin valor el acto que se celebre sin la presencia personal del trabajador y los requisitos consignados precedentemente. Se considerará igualmente que la relación laboral ha quedado extinguida por voluntad concurrente de las partes, si ello resultase del comportamiento concluyente y recíproco de las mismas, que traduzca inequívocamente el abandono de la relación. En un contrato de trabajo de prestaciones continuas y permanentes, se considera configurado este supuesto luego de transcurridos dos (2) meses calendarios sin que alguna de las partes manifieste su voluntad de continuidad de éste.",
  art241ParrafoNuevo:
    "En un contrato de trabajo de prestaciones continuas y permanentes, se considera configurado este supuesto luego de transcurridos dos (2) meses calendarios sin que alguna de las partes manifieste su voluntad de continuidad de éste.",
  art241Nota:
    "(Artículo sustituido por art. 50 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  art123:
    "Extinción del contrato de trabajo - Pago proporcional. Cuando se opere la extinción del contrato de trabajo por cualquier causa, el trabajador o los derecho-habientes que determina esta ley, tendrá derecho a percibir la parte del sueldo anual complementario que se establecerá como la doceava parte de las remuneraciones devengadas en la fracción del semestre trabajado, hasta el momento de dejar el servicio.",
  art156:
    "Indemnización. Cuando por cualquier causa se produjera la extinción del contrato de trabajo, el trabajador tendrá derecho a percibir una indemnización equivalente al salario correspondiente al período de descanso proporcional a la fracción del año trabajada.",
  art155incA:
    "Tratándose de trabajos remunerados con sueldo mensual, dividiendo por veinticinco (25) el importe del sueldo que perciba en el momento de su otorgamiento.",
  art235:
    "Prueba. La notificación del preaviso deberá probarse por escrito.",
} as const;

/** Los tres cambios concretos del art. 240, para mostrarlos uno al lado del otro. */
export const CAMBIOS_ART_240: { titulo: string; antes: string; ahora: string }[] = [
  {
    titulo: "El formato del telegrama",
    antes: "«despacho telegráfico colacionado»",
    ahora:
      "«despacho telegráfico en formato físico o digital». La renuncia puede cursarse por vía digital, sin pasar por una oficina.",
  },
  {
    titulo: "La presencia personal",
    antes:
      "«cursado personalmente por el trabajador» y expedido «requiriéndose la presencia personal del remitente y la justificación de su identidad»",
    ahora:
      "«cursado por el trabajador» y expedido «requiriendo la validación de su identidad». Desapareció la exigencia de estar ahí en persona; el texto no dice cómo se valida la identidad.",
  },
  {
    titulo: "El aviso al empleador por la vía administrativa",
    antes:
      "«Cuando la renuncia se formalizara ante la autoridad administrativa ésta dará inmediata comunicación de la misma al empleador, siendo ello suficiente a los fines del artículo 235 de esta ley.»",
    ahora:
      "El párrafo ya no existe. La vía administrativa queda remitida a «la forma que determine la reglamentación», y con el párrafo se fue también la regla que daba por cumplida la prueba escrita del artículo 235.",
  },
];

export type FuenteRenuncia = { nombre: string; url: string; detalle: string };

/**
 * De dónde sale el texto ANTERIOR. Aparte y con nombre propio: el texact.htm de hoy muestra el
 * texto nuevo, no el viejo, así que la comparación no se puede anclar en la fuente viva. Es la
 * MISMA página oficial de InfoLEG capturada antes de que la reforma entrara en vigencia.
 */
export const FUENTE_TEXTO_ANTERIOR = {
  capturaDel: "2025-12-15",
  urlArchivada:
    "https://web.archive.org/web/20251215041122/https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
  urlOriginal:
    "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
  detalle:
    "Captura del texto actualizado oficial de la LCT del 15/12/2025, anterior al 6/3/2026. Se baja con «npx -y tsx tools/infoleg.ts 25552 --fecha 20251215 --art \"Art. 240\"». Ni el art. 240 ni el art. 241 figuran en los «Antecedentes Normativos» de la LCT: llegaron sin una sola modificación desde el texto ordenado del Decreto 390/1976 hasta esta reforma.",
} as const;

export const RENUNCIA_FUENTES: { consultadoEl: string; lista: FuenteRenuncia[] } = {
  consultadoEl: "2026-08-24",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744 — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Art. 240 (forma de la renuncia) y art. 241 (mutuo acuerdo), los dos con su nota de sustitución por la Ley 27.802; art. 123 (SAC proporcional «por cualquier causa»), art. 156 (indemnización por vacaciones no gozadas), art. 155 inc. a) (el día de vacaciones es el sueldo dividido 25), art. 150/151/153 (días por antigüedad y licencia proporcional), art. 231 (preaviso) y art. 235 (prueba por escrito).",
    },
    {
      nombre: "Ley 27.802 — texto oficial (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "Art. 49 (sustitución del art. 240 de la LCT), art. 50 (sustitución del art. 241) y art. 99, que incorporó el inc. i) al art. 114 de la Ley 24.013: la extinción por mutuo acuerdo del art. 241 pasó a ser situación legal de desempleo.",
    },
    {
      nombre: "Ley 27.802 — B.O. 6/3/2026",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339542/20260306",
      detalle:
        "La publicación de la que arranca la vigencia. Las notas de los dos artículos dicen «a partir de su publicación en el Boletín Oficial».",
    },
  ],
};
