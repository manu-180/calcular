// Convenio colectivo vencido (ultraactividad) y orden de prelación entre convenios —
// Ley 14.250 (t.o. 2004), arts. 6, 7, 18, 19 y 21, reformada por el TÍTULO XIV de la Ley 27.802
// (arts. 130 a 137) y por su art. 211 (derogaciones).
//
// Leído el 31/8/2026 (s100) en fuentes oficiales, con el diff hecho por código:
//   · InfoLEG, TEXTO ACTUALIZADO de la Ley 14.250 (id 46379) — texto VIGENTE.
//   · InfoLEG, la misma norma en la captura del 1/6/2025 (tools/ley-diff-articulo.ts) — texto
//     ANTERIOR. Es la mitad que no se puede leer en el sitio: InfoLEG muestra sólo el vigente.
//   · InfoLEG, Ley 27.802 (id 423680) — Título XIV completo, arts. 130 a 137.
//   · Boletín Oficial del 6/3/2026, avisos 339128 (la ley) y 339129 (Decreto 137/2026, el que la
//     promulga) — de ahí sale la fecha de PROMULGACIÓN, que es la que cuenta para el art. 137.
//
// POR QUÉ ESTA PÁGINA EXISTE, Y POR QUÉ CONTRADICE A LA COBERTURA:
//
//   1. **La Ley 27.802 AMPLIÓ la ultraactividad; no la eliminó.** «La reforma laboral terminó con
//      la ultraactividad» describe al DNU 70/2023 (art. 86), no a la ley vigente. El texto del DNU
//      dejaba subsistentes «las normas referidas a las condiciones de trabajo»; el art. 131 de la
//      Ley 27.802 sostiene esa frase y le AGREGA «y beneficios individuales directos del trabajo y
//      los beneficios otorgados para el trabajador». O sea que un convenio vencido conserva HOY más
//      cosas que entre diciembre de 2023 y marzo de 2026. Es el diff al revés: el texto que parece
//      más duro es el anterior.
//
//   2. **Lo que sí desapareció es la prórroga por decreto.** El texto del DNU permitía que las
//      cláusulas obligacionales siguieran «por acuerdo de partes o por la específica prórroga
//      dispuesta por el Poder Ejecutivo Nacional». La ley vigente dice, seco: «mantendrán su
//      vigencia sólo por acuerdo de partes». El Poder Ejecutivo se quedó sin esa facultad.
//
//   3. **El orden de prelación se dio vuelta entero (art. 136 → art. 19).** Antes, un convenio de
//      otro ámbito sólo desplazaba al anterior «en tanto establezca condiciones más favorables para
//      el trabajador», y la comparación se hacía «por instituciones». Hoy: «Un convenio de ámbito
//      menor prevalece (…) frente a otro de ámbito mayor, anterior o posterior», sin test de
//      favorabilidad. Y el inciso a) pasó de «puede modificar» a «modifica en cualquier sentido».
//      El convenio de empresa le gana al de actividad aunque empeore condiciones.
//
//   4. **El art. 18 se invirtió** (art. 135). Antes, el de ámbito MAYOR fijaba las formas de
//      articulación y podía delegar materias al menor. Hoy los de ámbito mayor «no podrán modificar
//      ni disponer el contenido de los convenios de ámbito menor», y quien articula es el convenio
//      de EMPRESA. La facultad cambió de manos.
//
//   5. **Dos artículos desaparecieron** (art. 211): el art. 21, que obligaba al Estado a montar un
//      mecanismo voluntario de mediación, conciliación y arbitraje justamente para los convenios
//      vigentes por ultraactividad, y el art. 10, que dejaba extender un convenio a zonas no
//      comprendidas. El primero fue reemplazado por algo distinto: el art. 137 no media, convoca —
//      y habilita a SUSPENDER la homologación.
//
// LO QUE ESTA PÁGINA NO HACE, A PROPÓSITO:
//   · **No dice si TU cláusula concreta es normativa u obligacional.** La ley da el criterio
//     («condiciones y beneficios individuales directos del trabajo») y define a las obligacionales
//     por resta; el encuadre de una cláusula puntual es discusión judicial. La página aplica el
//     criterio legal y avisa dónde termina.
//   · **No dice qué convenio te aplica por nombre.** Eso depende del ámbito personal y territorial
//     de cada convenio, que está en cada texto homologado, no en la Ley 14.250.

/** Sanción, promulgación y publicación de la Ley 27.802 — las tres fechas son distintas. */
export const LEY_27802 = {
  sancion: "2026-02-27",
  /** Decreto 137/2026. Es la fecha que cuenta para el plazo del art. 137. */
  promulgacion: "2026-03-05",
  boletinOficial: "2026-03-06",
  decretoPromulgatorio: "Decreto 137/2026",
  avisoLey: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339128/20260306",
  avisoDecreto: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339129/20260306",
} as const;

/**
 * El plazo del art. 137 corre «desde la promulgación», no desde la publicación: vence el
 * 5/3/2027, un día antes de lo que da la cuenta que casi todos hacen desde el B.O.
 */
export const PLAZO_ART_137: string = "2027-03-05";

/** Desde cuándo rige el Título XIV: la ley entra en vigencia con su publicación (art. 217). */
export const VIGENCIA_REFORMA_ISO = "2026-03-06";
export const VIGENCIA_REFORMA = "6 de marzo de 2026";

/** Desde cuándo regía el texto anterior del art. 6: el DNU 70/2023. */
export const VIGENCIA_DNU_70_ISO = "2023-12-21";
export const VIGENCIA_DNU_70 = "21 de diciembre de 2023";

export const CONSULTADO_EL = "2026-08-31";

export const TEXTOS = {
  /** Art. 6 VIGENTE — sustituido por el art. 131 de la Ley 27.802. */
  art6Vigente:
    "Una convención colectiva de trabajo, cuyo término estuviere vencido, solamente mantendrá subsistentes las normas referidas a las condiciones y beneficios individuales directos del trabajo y los beneficios otorgados para el trabajador establecidas en virtud de ellas (cláusulas normativas) y hasta tanto entre en vigencia una nueva convención colectiva o exista un acuerdo de partes que la prorrogue. El resto de las cláusulas (obligacionales) mantendrán su vigencia sólo por acuerdo de partes.",
  /** Art. 6 ANTERIOR — el que puso el art. 86 del DNU 70/2023, vigente hasta el 5/3/2026. */
  art6Anterior:
    "Una convención colectiva de trabajo, cuyo término estuviere vencido, solamente mantendrá subsistentes las normas referidas a las condiciones de trabajo establecidas en virtud de ellas (cláusulas normativas) y hasta tanto entre en vigencia una nueva convención colectiva o exista un acuerdo de partes que la prorrogue. El resto de las cláusulas (obligacionales) podrán mantener su vigencia, solo por acuerdo de partes o por la específica prórroga dispuesta por el Poder Ejecutivo Nacional.",
  /** Art. 19 VIGENTE — sustituido por el art. 136. */
  art19Vigente:
    "Queda establecido el siguiente orden de prelación de normas: a) Un convenio colectivo posterior modifica en cualquier sentido a un convenio colectivo anterior de igual ámbito; b) Un convenio de ámbito menor, prevalece, dentro de su ámbito de representación personal y territorial, frente a otro convenio de ámbito mayor, anterior o posterior.",
  /** Art. 19 ANTERIOR — el del t.o. 2004. */
  art19Anterior:
    "Queda establecido el siguiente orden de prelación de normas: a) Un convenio colectivo posterior puede modificar a un convenio colectivo anterior de igual ámbito. b) Un convenio posterior de ámbito distinto, mayor o menor, modifica al convenio anterior en tanto establezca condiciones más favorables para el trabajador. A tal fin, la comparación de ambos convenios deberá ser efectuada por instituciones.",
  /** Art. 18 VIGENTE — sustituido por el art. 135. */
  art18Vigente:
    "Los Convenios Colectivos de ámbito mayor no podrán modificar ni disponer el contenido de los convenios de ámbito menor. Los Convenios Colectivos de empresa, podrán establecer formas de articulación entre unidades de negociación de ámbitos diferentes, ajustándose las partes a sus respectivas facultades de representación. Asimismo, podrán hacer remisión expresa de las materias a negociar en los Convenios de ámbito mayor que resulten aplicables en el ámbito personal y territorial del Convenio de ámbito menor.",
  /** Art. 18 ANTERIOR — el del t.o. 2004. */
  art18Anterior:
    "Los convenios colectivos de ámbito mayor podrán establecer formas de articulación entre unidades de negociación de ámbitos diferentes, ajustándose las partes a sus respectivas facultades de representación. Dichos convenios podrán determinar sus materias propias y hacer remisión expresa de las materias a negociar en los convenios de ámbito menor. Los convenios de ámbito menor, en caso de existir un convenio de ámbito mayor que los comprenda, podrán considerar: a) Materias delegadas por el convenio de ámbito mayor. b) Materias no tratadas por el de ámbito mayor. c) Materias propias de la organización de la empresa. d) Condiciones más favorables al trabajador.",
  /** Art. 137 de la Ley 27.802 — no reforma la 14.250: es una norma propia y transitoria. */
  art137:
    "En el plazo de un (1) año contado desde la promulgación de la presente ley, la Secretaría de Trabajo, Empleo y Seguridad Social, del Ministerio de Capital Humano, convocará a las partes legitimadas para negociar, y/o renegociar y/o ratificar las cláusulas de los Convenios Colectivos de Trabajo que estuvieran vencidos, acorde a lo dispuesto por el artículo 6° de la ley 14.250 (t.o. 2004) y sus modificaciones.",
  /** Art. 137, segundo párrafo — la suspensión de la homologación. */
  art137Suspension:
    "Por petición de cualquiera de las partes legitimadas para negociar un Convenio Colectivo de Trabajo, cualquiera sea su nivel, cuyas cláusulas normativas se hallaren vigentes sólo por ultraactividad, la autoridad administrativa del trabajo podrá decretar la suspensión de los efectos del acto de homologación cuando se alegare y demostrare sumariamente que su aplicación genera distorsiones económicas graves que afecten el interés general o la aplicación de otras normas dictadas en protección de toda o parte de la población. En tales condiciones, la suspensión podrá ser decretada hasta tanto concluya su cometido la comisión paritaria de negociación del nuevo convenio colectivo.",
  /** Art. 21 DEROGADO por el art. 211 — lo que había antes para destrabar un convenio ultraactivo. */
  art21Derogado:
    "Con relación a los convenios colectivos de trabajo que se encontraren vigentes por ultractividad, el MINISTERIO DE TRABAJO, EMPLEO Y SEGURIDAD SOCIAL establecerá un mecanismo voluntario de mediación, conciliación y arbitraje, destinado a superar la falta de acuerdo entre las partes para la renovación de dichos convenios.",
  /** Art. 11, NO tocado por la reforma: sigue siendo la vía para forzar la negociación. */
  art11:
    "Vencido el término de una convención o dentro de los SESENTA (60) días anteriores a su vencimiento, el MINISTERIO DE TRABAJO, EMPLEO Y SEGURIDAD SOCIAL deberá, a solicitud de cualquiera de las partes interesadas, disponer la iniciación de las negociaciones tendientes a la concertación de una nueva convención.",
  /** Art. 8, tampoco tocado: el piso del contrato individual sobrevive a todo esto. */
  art8:
    "Las normas de las convenciones colectivas homologadas serán de cumplimiento obligatorio y no podrán ser modificadas por los contratos individuales de trabajo, en perjuicio de los trabajadores. La aplicación de las convenciones colectivas no podrá afectar las condiciones más favorables a los trabajadores, estipuladas en sus contratos individuales de trabajo.",
} as const;

/** Los artículos de la Ley 14.250 que el Título XIV tocó, con qué artículo de la 27.802 lo hizo. */
export const CAMBIOS = [
  {
    articulo: "art. 4°",
    por: "art. 130",
    titulo: "Quién homologa, y qué convenios se registran en vez de homologarse",
    resumen:
      "La Autoridad de Aplicación pasa a nombrarse Secretaría de Trabajo, Empleo y Seguridad Social del Ministerio de Capital Humano, y los convenios de empresa o grupo de empresas se presentan para registro, publicación y depósito: la homologación queda a pedido de parte.",
  },
  {
    articulo: "art. 6°",
    por: "art. 131",
    titulo: "Qué sobrevive cuando el convenio vence (ultraactividad)",
    resumen:
      "Suma «y beneficios individuales directos del trabajo y los beneficios otorgados para el trabajador» a lo que queda subsistente, y elimina la prórroga de las cláusulas obligacionales por decreto del Poder Ejecutivo.",
  },
  {
    articulo: "art. 7°",
    por: "art. 132",
    titulo: "El convenio contra la ley",
    resumen:
      "La comparación de favorabilidad ahora remite expresamente a las pautas del art. 9° de la LCT. Desaparece el párrafo que validaba las cláusulas destinadas a favorecer la acción de las asociaciones de trabajadores.",
  },
  {
    articulo: "art. 9°",
    por: "art. 133",
    titulo: "Topes a los aportes y contribuciones del convenio",
    resumen:
      "0,5% de las remuneraciones para lo que va a cámaras y entidades de empleadores, 2% para lo que va a asociaciones de trabajadores. Quedan afuera la cuota de afiliación sindical y los beneficios por afiliación.",
  },
  {
    articulo: "art. 13",
    por: "art. 134",
    titulo: "Comisiones paritarias",
    resumen:
      "Los representantes tienen que ser del mismo ámbito personal y territorial del convenio: la paritaria deja de poder integrarse con gente de afuera de ese ámbito.",
  },
  {
    articulo: "art. 18",
    por: "art. 135",
    titulo: "Quién articula los convenios",
    resumen:
      "Se invierte: el de ámbito mayor ya no puede modificar ni disponer el contenido del de ámbito menor, y quien establece las formas de articulación pasa a ser el convenio de empresa.",
  },
  {
    articulo: "art. 19",
    por: "art. 136",
    titulo: "Orden de prelación entre convenios",
    resumen:
      "Cae el test de «condiciones más favorables» y la comparación por instituciones: el convenio de ámbito menor prevalece frente al de ámbito mayor, anterior o posterior.",
  },
  {
    articulo: "arts. 10 y 21",
    por: "art. 211",
    titulo: "Dos artículos derogados",
    resumen:
      "El art. 10 (extender un convenio a zonas no comprendidas) y el art. 21 (el mecanismo voluntario de mediación, conciliación y arbitraje para los convenios en ultraactividad) dejaron de existir.",
  },
] as const;

export type Ambito = "mayor" | "menor";

export const FUENTES = [
  {
    titulo: "Ley 14.250 (t.o. 2004), texto actualizado (arts. 6, 7, 8, 11, 18, 19 y 21)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=46379",
  },
  {
    titulo: "Ley 27.802: Título XIV, arts. 130 a 137, y art. 211 (derogaciones)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=423680",
  },
  {
    titulo: "Boletín Oficial del 6/3/2026: Ley 27.802",
    url: LEY_27802.avisoLey,
  },
  {
    titulo: `Boletín Oficial del 6/3/2026: ${LEY_27802.decretoPromulgatorio}, que la promulga el 5/3/2026`,
    url: LEY_27802.avisoDecreto,
  },
] as const;
