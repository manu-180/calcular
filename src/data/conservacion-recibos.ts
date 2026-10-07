// CONSERVACIÓN DE RECIBOS DE SUELDO — art. 143 de la Ley de Contrato de Trabajo 20.744
// (t.o. Dec. 390/1976), leído el 26/8/2026 en el texto actualizado de InfoLEG (id 25552).
//
// POR QUÉ ESTE ARCHIVO EXISTE (26/8/2026, s95): el art. 40 de la Ley 27.802 sustituyó el art. 143
// el 6/3/2026 y le hizo algo que casi ninguna reforma hace: **le puso números a una regla que no
// los tenía**. Es el caso inverso al del resto de la Ley 27.802 —que suele sacar— y por eso el
// hueco en la SERP es enorme: todas las notas publicadas sobre cuánto tiempo hay que guardar los
// recibos dicen «durante el plazo de prescripción», porque eso era literalmente lo único que decía
// la ley. Hoy dice dos años y diez años, con todas las letras.
//
//   · **Texto anterior:** «El empleador deberá conservar los recibos y otras constancias de pago
//     DURANTE TODO EL PLAZO CORRESPONDIENTE A LA PRESCRIPCIÓN LIBERATORIA DEL BENEFICIO DE QUE SE
//     TRATE.» — una remisión, no un plazo. Para saber cuánto había que guardar cada papel había
//     que averiguar antes qué prescripción le corría a cada beneficio.
//   · **Texto vigente:** «(…) a fin de acreditar sus obligaciones considerando el plazo de
//     prescripción de obligaciones laborales -DOS (2) AÑOS-, y previsionales -DIEZ (10) AÑOS-.»
//
// LO QUE NO CAMBIÓ: las otras dos oraciones del artículo llegaron intactas desde el Decreto
// 70/2023 —que fue quien las puso—: que los recibos «podrán ser digitalizados, los cuales tendrán
// la misma validez que en formato papel», y que «el pago hecho por un último o ulteriores períodos
// no hace presumir el pago de los anteriores». La reforma de 2026 sólo tocó la primera.
//
// CONTROL CRUZADO (regla de siempre: un número no se publica sin anclarlo contra otra norma): los
// dos (2) años del texto nuevo coinciden con el art. 256 de la misma ley —«Prescriben a los dos
// (2) años las acciones relativas a créditos provenientes de las relaciones individuales de
// trabajo»—, que además declara ese plazo de orden público e inmodificable por convenio. El
// artículo 143 no inventó un plazo: escribió el que ya estaba en el 256.
//
// LO QUE HAY QUE DECIR PARA NO INDUCIR UN ERROR CARO: el plazo que manda en la práctica es el
// **más largo**. Un mismo recibo prueba a la vez la obligación laboral y la previsional, así que
// destruirlo a los dos años deja al empleador sin respaldo frente a los otros ocho. Y hay una
// segunda razón, de s94: desde la reforma, el art. 55 hace nacer la presunción a favor del
// trabajador de la **omisión de registración**. Quedarse sin la constancia es quedarse sin la
// prueba que la desactiva.
//
// FUENTES: texto actualizado de la LCT en InfoLEG (id 25552) para los arts. 143, 144, 145 y 256;
// captura del Internet Archive del 15/12/2025 del MISMO texact para el texto anterior del art.
// 143; texto oficial de la Ley 27.802 (id 423680) para su art. 40. Nunca una nota de prensa.

/** Fecha desde la que rige el texto nuevo (B.O. de la Ley 27.802). */
export const VIGENCIA_REFORMA = "6 de marzo de 2026";

/** ISO de esa misma fecha. */
export const VIGENCIA_REFORMA_ISO = "2026-03-06";

/** Artículo de la Ley 27.802 que sustituyó el art. 143 de la LCT. */
export const ARTICULO_SUSTITUYENTE = 40;

/** Años de conservación por obligaciones laborales, según el texto vigente del art. 143. */
export const ANIOS_LABORAL = 2;

/** Años de conservación por obligaciones previsionales, según el texto vigente del art. 143. */
export const ANIOS_PREVISIONAL = 10;

/** Tope de la interrupción por reclamo administrativo (art. 257 LCT), en meses. */
export const MESES_INTERRUPCION_ART257 = 6;

export const CONSERVACION_TEXTOS = {
  art143Vigente:
    "Conservación - Plazo. El empleador deberá conservar los recibos y otras constancias de pago a fin de acreditar sus obligaciones considerando el plazo de prescripción de obligaciones laborales -dos (2) años-, y previsionales -diez (10) años-. A efectos de la conservación de los recibos y otras constancias de pago, los mismos podrán ser digitalizados, los cuales tendrán la misma validez que en formato papel. El pago hecho por un último o ulteriores períodos no hace presumir el pago de los anteriores.",
  art143Anterior:
    "Conservación - Plazo. El empleador deberá conservar los recibos y otras constancias de pago durante todo el plazo correspondiente a la prescripción liberatoria del beneficio de que se trate. A efectos de la conservación de los recibos y otras constancias de pago, los mismos podrán ser digitalizados, los cuales tendrán la misma validez que en formato papel. El pago hecho por un último o ulteriores períodos no hace presumir el pago de los anteriores.",
  art143Nota:
    "(Artículo sustituido por art. 40 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  /** La remisión sin número que había antes. */
  reglaAnterior:
    "durante todo el plazo correspondiente a la prescripción liberatoria del beneficio de que se trate",
  /** Los dos números que entraron. */
  reglaVigente:
    "a fin de acreditar sus obligaciones considerando el plazo de prescripción de obligaciones laborales -dos (2) años-, y previsionales -diez (10) años-",
  /** La oración que sobrevivió y habilita el archivo digital. */
  digitalizacion:
    "A efectos de la conservación de los recibos y otras constancias de pago, los mismos podrán ser digitalizados, los cuales tendrán la misma validez que en formato papel.",
  /** La otra oración intacta: pagar el último mes no prueba los anteriores. */
  sinPresuncionDePagosAnteriores:
    "El pago hecho por un último o ulteriores períodos no hace presumir el pago de los anteriores.",
  art256:
    "Plazo común. Prescriben a los dos (2) años las acciones relativas a créditos provenientes de las relaciones individuales de trabajo y, en general, de disposiciones de convenios colectivos, laudos con eficacia de convenios colectivos y disposiciones legales o reglamentarias del Derecho del Trabajo. Esta norma tiene carácter de orden público y el plazo no puede ser modificado por convenciones individuales o colectivas.",
  art257:
    "Interrupción por actuaciones administrativas. Sin perjuicio de la aplicabilidad de las normas del Código Civil, la reclamación ante la autoridad administrativa del trabajo interrumpirá el curso de la prescripción durante el trámite, pero en ningún caso por un lapso mayor de seis (6) meses.",
  art144:
    "Libros y registros - Exigencia del recibo de pago. La firma que se exigiera al trabajador en libros, planillas o documentos similares no excluye el otorgamiento de los recibos de pago con el contenido y formalidades previstas en esta ley.",
  art145:
    "Renuncia. Nulidad. El recibo no debe contener renuncias de ninguna especie, ni puede ser utilizado para instrumentar la extinción de la relación laboral o la alteración de la calificación profesional en perjuicio del trabajador. Toda mención que contravenga esta disposición será nula.",
} as const;

export type FuenteConservacion = { nombre: string; url: string; detalle: string };

export const CONSERVACION_FUENTES: { consultadoEl: string; lista: FuenteConservacion[] } = {
  consultadoEl: "2026-08-26",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744, texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Art. 143 con su texto vigente y la nota de sustitución por el art. 40 de la Ley 27.802, más los arts. 144, 145, 256 y 257, que la reforma no tocó. El art. 256 es el control cruzado de los dos años.",
    },
    {
      nombre: "El art. 143 antes de la sustitución: captura del texto oficial (Internet Archive)",
      url: "https://web.archive.org/web/20251215041122/https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "La misma página de InfoLEG capturada el 15 de diciembre de 2025. Ahí se ve que el artículo remitía a «la prescripción liberatoria del beneficio de que se trate», sin ningún número. Y que su versión anterior venía del art. 77 del Decreto 70/2023.",
    },
    {
      nombre: "Ley 27.802, texto oficial (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
      detalle:
        "Su art. 40 es el que sustituye el art. 143 de la LCT. La nota fija la vigencia «a partir de su publicación en el Boletín Oficial».",
    },
    {
      nombre: "Ley 27.802 (B.O. 6/3/2026)",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339542/20260306",
      detalle:
        "La publicación de la que arranca la vigencia de los dos plazos escritos en la ley.",
    },
  ],
};
