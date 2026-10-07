// Derechohabientes de la muerte laboral — quién cobra la prestación de la ART (Ley 24.557, art. 18)
// y por qué esa lista NO es la del art. 248 de la LCT.
//
// POR QUÉ ESTE ARCHIVO EXISTE (8/9/2026, s110). Sale de la cola de delegaciones de s108: el art. 18
// ap. 2 remite a «las personas enumeradas en el artículo 53 de la Ley Nº 24.241» y después delega
// («la reglamentación determinará el grado de parentesco requerido»). El reglamento —Decreto 334/96,
// art. 7º— no aparecía en ningún archivo del repo. Se abrió, y dice una cosa que la ley no dice.
//
// LOS TRES HALLAZGOS QUE JUSTIFICAN LA PÁGINA:
//
//   1. EL MISMO FALLECIMIENTO GENERA DOS INDEMNIZACIONES CON DOS LISTAS DISTINTAS DE BENEFICIARIOS.
//      La del art. 248 de la LCT la paga el empleador; la del art. 18 de la LRT la paga la ART. El
//      propio art. 248 aclara que son independientes. Nadie publica que las listas divergen: un
//      conviviente de tres años cobra la del empleador y NO la de la ART (le faltan dos años de
//      convivencia); un hijo de 23 que no estudia puede cobrar —en subsidio— la del empleador y no
//      la de la ART. Ese contraste es el producto de esta página.
//
//   2. EL DECRETO 334/96 art. 7º AMPLÍA: los derechohabientes son los del art. 53 de la Ley 24.241
//      «CUALQUIERA FUERA EL RÉGIMEN AL QUE EL DAMNIFICADO ESTUVIERA AFILIADO». O sea: aunque el
//      trabajador aportara a una caja provincial o a un régimen especial con su propia lista de
//      pensionados, para cobrarle a la ART se mira la lista del SIPA. La ley sola no lo dice.
//
//   3. UNA DELEGACIÓN QUE NO SE CUMPLIÓ. El art. 18 ap. 2 in fine manda que la reglamentación
//      determine «el grado de parentesco requerido para obtener el beneficio y la forma de acreditar
//      la condición de familiar a cargo» — el tercer escalón, el de los familiares a cargo cuando no
//      hay nadie del art. 53 ni padres vivos. La palabra «parentesco» NO APARECE en el texto
//      actualizado del Decreto 334/96 (verificado el 8/9/2026 contra InfoLEG id 36110). El escalón
//      existe en la ley y no tiene reglamento que diga hasta qué grado llega.
//      ⚠️ LÍMITE QUE SE DECLARA EN LA PÁGINA: esto afirma que el DECRETO REGLAMENTARIO no lo
//      determina, no que no exista ninguna norma en el universo. InfoLEG no devuelve por número las
//      resoluciones viejas de la SRT (mina de s109), así que no se afirma más que lo verificado.
//
// FUENTES, todas leídas el 8/9/2026 en el texto ACTUALIZADO de InfoLEG (nunca una nota):
//   · Ley 24.557 art. 18 — id 27971 (texto según art. 9º del Decreto 1278/2000).
//   · Ley 24.241 art. 53 — id 639.
//   · Decreto 334/96 art. 7º — id 36110.
//
// NO-GO ESCRITO (no re-auditar sin motivo): los PORCENTAJES de reparto. El art. 18 ap. 1 manda a
// los derechohabientes «a la pensión por fallecimiento prevista en el régimen previsional», que sí
// tiene porcentajes, pero la prestación de pago único que paga la ART no los tiene escritos en la
// LRT. Esta página determina QUIÉNES son derechohabientes y en qué escalón, y dice explícitamente
// que el reparto del pago único no está en la ley. Inventar un porcentaje sería exactamente lo que
// hacen las notas que esta página existe para corregir.

/** El art. 18 vigente no es el original de 1995. */
export const VIGENCIA_ART18 = {
  norma: "Ley 24.557, art. 18",
  sustituidoPor: "art. 9º del Decreto Nº 1278/2000",
  boletin: "B.O. 3 de enero de 2001",
  reglamento: "Decreto 334/96, art. 7º",
  consultadoEl: "8 de septiembre de 2026",
} as const;

/** Edad tope de los hijos en el art. 53 de la Ley 24.241, ANTES de la extensión de la LRT. */
export const EDAD_TOPE_SIPA = 18;
/** El art. 18 ap. 2 de la LRT la extiende a 21 para la prestación de la ART. */
export const EDAD_TOPE_LRT = 21;
/** Y a 25 «en caso de tratarse de estudiantes a cargo exclusivo del trabajador fallecido». */
export const EDAD_TOPE_LRT_ESTUDIANTE = 25;

/** Años de convivencia pública en aparente matrimonio que exige el art. 53. */
export const ANIOS_CONVIVENCIA = 5;
/** Se reducen a 2 «cuando exista descendencia reconocida por ambos convivientes». */
export const ANIOS_CONVIVENCIA_CON_HIJOS = 2;

/**
 * Citas textuales del texto actualizado. Se guardan enteras a propósito: son el ancla contra la que
 * check_derechohabientes_art.ts verifica que el motor y la página no deriven hacia un resumen que
 * diga otra cosa que la norma.
 */
export const DH_TEXTOS = {
  art18ap1:
    "Los derechohabientes del trabajador accederán a la pensión por fallecimiento prevista en el régimen previsional al que estuviera afiliado el damnificado y a las prestaciones establecidas en el segundo párrafo del apartado 2 del artículo 15 de esta ley, además de la prevista en su artículo 11, apartado cuarto.",
  art18ap2Remision:
    "Se consideran derechohabientes a los efectos de esta Ley, a las personas enumeradas en el artículo 53 de la Ley Nº 24.241, quienes concurrirán en el orden de prelación y condiciones allí señaladas.",
  art18ap2Edad:
    "El límite de edad establecido en dicha disposición se entenderá extendido hasta los VEINTIUN (21) años, elevándose hasta los VEINTICINCO (25) años en caso de tratarse de estudiantes a cargo exclusivo del trabajador fallecido.",
  art18ap2Padres:
    "En ausencia de las personas enumeradas en el referido artículo, accederán los padres del trabajador en partes iguales; si hubiera fallecido uno de ellos, la prestación será percibida íntegramente por el otro.",
  art18ap2Familiares:
    "En caso de fallecimiento de ambos padres, la prestación corresponderá, en partes iguales, a aquellos familiares del trabajador fallecido que acrediten haber estado a su cargo.",
  art18ap2Delegacion:
    "La reglamentación determinará el grado de parentesco requerido para obtener el beneficio y la forma de acreditar la condición de familiar a cargo.",
  decreto334art7:
    "Se consideran derechohabientes, a los fines de la Ley Nº 24.557, las personas enumeradas en el artículo 53 de la Ley Nº 24.241, cualquiera fuera el régimen al que el damnificado estuviera afiliado.",
  art53Encabezado:
    "En caso de muerte del jubilado, del beneficiario de retiro por invalidez o del afiliado en actividad, gozarán de pensión los siguientes parientes del causante:",
  art53Hijos:
    "Los hijos solteros, las hijas solteras y las hijas viudas, siempre que no gozaran de jubilación, pensión, retiro o prestación no contributiva, salvo que optaren por la pensión que acuerda la presente, todos ellos hasta los dieciocho (18) años de edad.",
  art53Incapacidad:
    "La limitación a la edad establecida en el inciso e) no rige si los derechohabientes se encontraren incapacitados para el trabajo a la fecha de fallecimiento del causante o incapacitados a la fecha en que cumplieran dieciocho (18) años de edad.",
  art53ACargo:
    "Se entiende que el derechohabiente estuvo a cargo del causante cuando concurre en aquél un estado de necesidad revelado por la escasez o carencia de recursos personales, y la falta de contribución importa un desequilibrio esencial en su economía particular.",
  art53Convivencia:
    "En los supuestos de los incisos c) y d) se requerirá que el o la causante se hallase separado de hecho o legalmente, o haya sido soltero, viudo o divorciado y hubiera convivido públicamente en aparente matrimonio durante por lo menos cinco (5) años inmediatamente anteriores al fallecimiento. El plazo de convivencia se reducirá a dos (2) años cuando exista descendencia reconocida por ambos convivientes.",
  art53Exclusion:
    "El o la conviviente excluirá al cónyuge supérstite cuando éste hubiere sido declarado culpable de la separación personal o del divorcio. En caso contrario, y cuando el o la causante hubiere estado contribuyendo al pago de alimentos o éstos hubieran sido demandados judicialmente, o el o la causante hubiera dado causa a la separación personal o al divorcio, la prestación se otorgará al cónyuge y al conviviente por partes iguales.",
  art248Independencia:
    "Esta indemnización es independiente de la que se reconozca a los causahabientes del trabajador por el Sistema de Riesgos del Trabajo, según el caso, y de cualquier otro beneficio que, por las leyes, Convenciones Colectivas de Trabajo, seguros, actos o contratos de previsión, le fuesen concedidos a los mismos en razón del fallecimiento del trabajador.",
} as const;

/** Los cinco incisos del art. 53, con su letra. Los incisos c) y d) son los que piden convivencia. */
export const INCISOS_ART53: { inciso: string; texto: string }[] = [
  { inciso: "a", texto: "La viuda." },
  { inciso: "b", texto: "El viudo." },
  { inciso: "c", texto: "La conviviente." },
  { inciso: "d", texto: "El conviviente." },
  {
    inciso: "e",
    texto:
      "Los hijos solteros, las hijas solteras y las hijas viudas, siempre que no gozaran de jubilación, pensión, retiro o prestación no contributiva.",
  },
];

/** Los tres escalones del art. 18 ap. 2. Se recorren en orden: el de abajo sólo si el de arriba está vacío. */
export const ESCALONES = [
  {
    id: "art53",
    titulo: "1º · Los del art. 53 de la Ley 24.241",
    norma: "Ley 24.557, art. 18 ap. 2 + Ley 24.241, art. 53",
    detalle:
      "Cónyuge, conviviente e hijos, con el límite de edad extendido a 21 años (25 si estudian y estaban a cargo exclusivo del trabajador fallecido).",
  },
  {
    id: "padres",
    titulo: "2º · Los padres, en partes iguales",
    norma: "Ley 24.557, art. 18 ap. 2",
    detalle:
      "Sólo en ausencia de los anteriores. Si uno falleció, el otro cobra la prestación íntegramente.",
  },
  {
    id: "familiares",
    titulo: "3º · Los familiares que estaban a cargo",
    norma: "Ley 24.557, art. 18 ap. 2 (sin reglamentar)",
    detalle:
      "Sólo si murieron ambos padres. La ley manda que la reglamentación fije el grado de parentesco, y el decreto reglamentario no lo hace.",
  },
] as const;

export const DH_FUENTES = [
  {
    nombre: "Ley 24.557, art. 18, texto actualizado",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=27971",
    detalle:
      "Muerte del damnificado. Sustituido por el art. 9º del Decreto 1278/2000 (B.O. 3/1/2001): remite al art. 53 de la Ley 24.241, extiende la edad a 21 y 25 años, y abre los escalones de padres y familiares a cargo.",
  },
  {
    nombre: "Ley 24.241, art. 53, texto actualizado",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=639",
    detalle:
      "La lista de derechohabientes a la que remite la LRT: los cinco incisos, los plazos de convivencia (5 años, 2 con descendencia reconocida por ambos) y la regla que resuelve cónyuge contra conviviente.",
  },
  {
    nombre: "Decreto 334/96, art. 7º: reglamentario del art. 18",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=36110",
    detalle:
      "El reglamento que amplía: la lista del art. 53 rige «cualquiera fuera el régimen al que el damnificado estuviera afiliado». No determina el grado de parentesco de los familiares a cargo que el art. 18 le delegó.",
  },
  {
    nombre: "Ley 20.744 (LCT), art. 248, texto actualizado",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=25552",
    detalle:
      "La otra lista, la del empleador: sustituida entera por el art. 52 de la Ley 27.802 (B.O. 6/3/2026). El propio artículo declara su indemnización independiente de la del Sistema de Riesgos del Trabajo.",
  },
] as const;
