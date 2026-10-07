// DESPIDO ANTES DEL VENCIMIENTO DEL PLAZO — art. 95 de la Ley de Contrato de Trabajo 20.744
// (t.o. Dec. 390/1976), leído el 26/8/2026 en el texto actualizado de InfoLEG (id 25552).
//
// POR QUÉ ESTE ARCHIVO EXISTE (26/8/2026, s95): el art. 28 de la Ley 27.802 SUSTITUYÓ el art. 95
// de la LCT el 6/3/2026, sin fecha diferida. Y no le cambió un adjetivo: le cambió el sistema
// entero de reparación. Es la regla de s78 en su forma más cara —el artículo sustituido cuyo
// texto viejo sigue publicado en toda la web— aplicada al contrato a plazo fijo.
//
//   · **Lo que decía antes.** El despido anticipado daba derecho a las indemnizaciones por
//     extinción "además de (…) la de daños y perjuicios provenientes del DERECHO COMÚN, la que se
//     fijará en función directa de los que justifique haber sufrido quien los alegue o los que, a
//     falta de demostración, fije el juez o tribunal prudencialmente, por la sola ruptura
//     anticipada del contrato". O sea: un rubro extra, sin fórmula legal, que decidía un juez.
//   · **Lo que dice hoy.** Las mismas indemnizaciones por extinción, pero "considerando, a ese
//     solo efecto, la ANTIGÜEDAD QUE HABRÍA ACUMULADO hasta la fecha de finalización del plazo
//     originariamente pactado". El rubro de daños y perjuicios DESAPARECIÓ del artículo. En su
//     lugar quedó una antigüedad ficta, que es exactamente lo contrario de un rubro extra: es una
//     forma de calcular el art. 245 que tiene techo, porque el art. 93 no deja pactar más de
//     cinco (5) años. El art. 245 nunca puede pasar de cinco sueldos por esta vía.
//   · **El tercer párrafo se fue con él.** El texto viejo tenía un tercer párrafo que decía que,
//     si el tiempo que faltaba era igual o mayor al del preaviso, "el reconocimiento de la
//     indemnización por daño suplirá al que corresponde por omisión de éste". Esa regla de
//     absorción no tiene hoy a qué aplicarse: sin daños no hay nada que absorba al preaviso. El
//     preaviso omitido queda en pie, por su propia cuenta.
//
// LA CONSECUENCIA QUE HAY QUE DECIR CON HONESTIDAD BRUTAL: para un contrato roto temprano, el
// texto nuevo casi siempre paga MENOS. Un contrato de un año roto en el tercer mes daba, con el
// texto viejo, el art. 245 sobre la antigüedad real MÁS lo que el juez fijara por la ruptura
// anticipada; hoy da el art. 245 sobre doce meses de antigüedad ficta —un sueldo— y nada más.
// Esta calculadora no publica un número inventado para el tramo viejo (los daños no tenían
// fórmula: los fijaba el juez), pero sí publica el tamaño de la ventana que se cerró: los días
// que faltaban hasta el vencimiento, expresados en sueldos.
//
// LO QUE NO CAMBIÓ Y CASI NADIE PUBLICA: **en el contrato a plazo fijo no hay período de prueba.**
// El art. 92 bis lo dice en su primera oración —"El contrato de trabajo por tiempo INDETERMINADO
// se entenderá celebrado a prueba durante los primeros seis (6) meses"— y la Ley 27.802 no lo
// tocó en ese punto. Por eso un plazo fijo roto en el mes 2 SÍ genera indemnización, mientras que
// un contrato común roto en el mes 2 no genera ninguna. Es la diferencia que más consultas mueve
// y la que más se contesta mal.
//
// ANTECEDENTES NORMATIVOS: el art. 95 no figura en la sección "Antecedentes Normativos" del texto
// actualizado. Llegó intacto desde el texto ordenado de 1976 hasta el 6/3/2026: cincuenta años de
// doctrina y de notas escritas sobre un sistema de reparación que ya no rige.
//
// FUENTES: texto actualizado de la LCT en InfoLEG (id 25552) para los arts. 92 bis, 93, 94, 95,
// 97, 247 y 250; captura del Internet Archive del 15/12/2025 del MISMO texact para recuperar el
// texto del art. 95 anterior a la sustitución; texto oficial de la Ley 27.802 (id 423680).
// Nunca una nota de prensa.

/** Fecha desde la que rige el texto nuevo (B.O. de la Ley 27.802). */
export const VIGENCIA_REFORMA = "6 de marzo de 2026";

/** ISO de esa misma fecha. */
export const VIGENCIA_REFORMA_ISO = "2026-03-06";

/** Artículo de la Ley 27.802 que sustituyó el art. 95 de la LCT. */
export const ARTICULO_SUSTITUYENTE = 28;

/** El artículo de la LCT que cambió de sistema. */
export const ARTICULO_REFORMADO = 95;

/** Tope de duración del contrato a plazo fijo (art. 93 LCT). */
export const ANIOS_MAXIMO_PLAZO = 5;

/** Preaviso del art. 94: no menor a 1 mes ni mayor a 2, respecto de la expiración del plazo. */
export const MESES_PREAVISO_MINIMO_ART94 = 1;
export const MESES_PREAVISO_MAXIMO_ART94 = 2;

/** Duración mínima del contrato para que el vencimiento con preaviso genere la indemnización del art. 247 (art. 250). */
export const ANIOS_MINIMO_ART250 = 1;

/** Duración por debajo de la cual el art. 94 no exige preavisar la expiración. */
export const MESES_SIN_DEBER_DE_PREAVISAR = 1;

export const PLAZO_FIJO_TEXTOS = {
  /** El texto vigente desde el 6/3/2026. */
  art95Vigente:
    "Despido antes del vencimiento del plazo - Indemnización. El despido injustificado dispuesto con antelación al vencimiento del plazo convenido, dará derecho al trabajador a percibir las indemnizaciones que correspondan por la extinción del contrato considerando, a ese solo efecto, la antigüedad que habría acumulado hasta la fecha de finalización del plazo originariamente pactado. Cuando la extinción del contrato se produjere mediante preaviso, y estando el contrato íntegramente cumplido, el trabajador recibirá una suma de dinero equivalente a la indemnización prevista en el artículo 250 de esta ley.",
  /** El texto anterior, recuperado de la captura del texact previa a la reforma. */
  art95Anterior:
    "Despido antes del vencimiento del plazo - Indemnización. En los contratos a plazo fijo, el despido injustificado dispuesto antes del vencimiento del plazo, dará derecho al trabajador, además de las indemnizaciones que correspondan por extinción del contrato en tales condiciones, a la de daños y perjuicios provenientes del derecho común, la que se fijará en función directa de los que justifique haber sufrido quien los alegue o los que, a falta de demostración, fije el juez o tribunal prudencialmente, por la sola ruptura anticipada del contrato. Cuando la extinción del contrato se produjere mediante preaviso, y estando el contrato íntegramente cumplido, el trabajador recibirá una suma de dinero equivalente a la indemnización prevista en el artículo 250 de esta ley. En los casos del párrafo primero de este artículo, si el tiempo que faltare para cumplir el plazo del contrato fuese igual o superior al que corresponda al de preaviso, el reconocimiento de la indemnización por daño suplirá al que corresponde por omisión de éste, si el monto reconocido fuese también igual o superior a los salarios del mismo.",
  /** La nota de sustitución que el texto actualizado trae al pie del artículo. */
  art95Nota:
    "(Artículo sustituido por art. 28 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  /** La oración que entró: el corazón del sistema nuevo. */
  oracionQueEntro:
    "considerando, a ese solo efecto, la antigüedad que habría acumulado hasta la fecha de finalización del plazo originariamente pactado",
  /** La oración que salió: el corazón del sistema viejo. */
  oracionQueSalio:
    "a la de daños y perjuicios provenientes del derecho común, la que se fijará en función directa de los que justifique haber sufrido quien los alegue o los que, a falta de demostración, fije el juez o tribunal prudencialmente, por la sola ruptura anticipada del contrato",
  /** El tercer párrafo que desapareció junto con los daños. */
  parrafoDeAbsorcion:
    "En los casos del párrafo primero de este artículo, si el tiempo que faltare para cumplir el plazo del contrato fuese igual o superior al que corresponda al de preaviso, el reconocimiento de la indemnización por daño suplirá al que corresponde por omisión de éste, si el monto reconocido fuese también igual o superior a los salarios del mismo.",
  art93:
    "Duración. El contrato de trabajo a plazo fijo durará hasta el vencimiento del plazo convenido, no pudiendo celebrarse por más de cinco (5) años.",
  art94:
    "Deber de preavisar - Conversión del contrato. Las partes deberán preavisar la extinción del contrato con antelación no menor de un (1) mes ni mayor de dos (2), respecto de la expiración del plazo convenido, salvo en aquellos casos en que el contrato sea por tiempo determinado y su duración sea inferior a un (1) mes. Aquélla que lo omitiera, se entenderá que acepta la conversión del mismo como de plazo indeterminado, salvo acto expreso de renovación de un plazo igual o distinto del previsto originariamente, y sin perjuicio de lo dispuesto en el artículo 90, segunda parte, de esta ley.",
  art97:
    "Equiparación a los contratos a plazo fijo. Permanencia. El despido sin causa del trabajador, pendientes los plazos previstos o previsibles del ciclo o temporada en los que estuviere prestando servicios, dará lugar al pago de los resarcimientos establecidos en el artículo 95, primer párrafo, de esta ley.",
  art250:
    "Monto de la indemnización. Remisión. Cuando la extinción del contrato se produjera por vencimiento del plazo asignado al mismo, mediando preaviso y estando el contrato íntegramente cumplido, se estará a lo dispuesto en el artículo 95, segundo párrafo, de esta ley, siendo el trabajador acreedor a la indemnización prevista en el artículo 247, siempre que el tiempo del contrato no haya sido inferior a un (1) año.",
  art247:
    "Monto de la indemnización. En los casos en que el despido fuese dispuesto por causa de fuerza mayor o por falta o disminución de trabajo no imputable al empleador fehacientemente justificada, el trabajador tendrá derecho a percibir una indemnización equivalente a la mitad de la prevista en el artículo 245 de esta ley.",
  /** La primera oración del art. 92 bis: por qué en el plazo fijo no hay período de prueba. */
  art92bisPrimeraOracion:
    "El contrato de trabajo por tiempo indeterminado se entenderá celebrado a prueba durante los primeros seis (6) meses de vigencia.",
} as const;

export type FuentePlazoFijo = { nombre: string; url: string; detalle: string };

export const PLAZO_FIJO_FUENTES: { consultadoEl: string; lista: FuentePlazoFijo[] } = {
  consultadoEl: "2026-08-26",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744, texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Art. 95 con su texto vigente y la nota de sustitución por el art. 28 de la Ley 27.802, más los arts. 92 bis, 93, 94, 97, 247 y 250 que lo rodean. El art. 95 no figura en los «Antecedentes Normativos»: llegó intacto desde el texto ordenado de 1976 hasta marzo de 2026.",
    },
    {
      nombre: "El art. 95 antes de la sustitución: captura del texto oficial (Internet Archive)",
      url: "https://web.archive.org/web/20251215041122/https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "La misma página de InfoLEG capturada el 15 de diciembre de 2025, antes de la reforma. De ahí sale el texto anterior del art. 95 que se cita en esta página (los tres párrafos, con los daños y perjuicios del derecho común). El texto vigente de InfoLEG ya no lo trae.",
    },
    {
      nombre: "Ley 27.802, texto oficial (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "Su art. 28 es el que sustituye el art. 95 de la LCT. La nota del artículo fija la vigencia «a partir de su publicación en el Boletín Oficial»: rige desde el 6 de marzo de 2026, no desde 2027.",
    },
    {
      nombre: "Ley 27.802 (B.O. 6/3/2026)",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339542/20260306",
      detalle:
        "La publicación de la que arranca la vigencia del texto nuevo. Un despido anticipado anterior a esa fecha se rige por el texto viejo, con los daños y perjuicios del derecho común.",
    },
  ],
};
