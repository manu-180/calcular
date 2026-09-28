// Garantía del 82% del Salario Mínimo, Vital y Móvil (art. 125 bis de la Ley 24.241).
//
// POR QUÉ ESTE ARCHIVO EXISTE — el hueco de SERP más limpio del tema previsional (verificado el
// 3/9/2026): "el 82% móvil" se publica hace ocho años como si fuera un plus que ANSES paga, y hoy
// paga CERO. La razón es aritmética y nadie la escribe: el suplemento del art. 125 bis es la
// diferencia "hasta alcanzar" el 82% del SMVM, y el haber mínimo garantizado del art. 125 hace
// rato que está MUY por encima de ese nivel. En septiembre de 2026 el 82% del SMVM es $314.716 y
// el haber mínimo es $428.633,20: el mínimo está un 36,2% arriba, así que la diferencia a pagar es
// cero. Una nota que titula "los jubilados cobran el 82% del salario mínimo" le está diciendo a un
// jubilado un número MENOR al que ya cobra.
//
// LAS TRES COSAS QUE NO SE PUBLICAN:
//   1. Es un SUPLEMENTO "hasta alcanzar", no un haber del 82%. Si tu haber ya supera ese nivel, el
//      artículo no te da un peso. No es un aumento: es un piso, y hoy es un piso más bajo que el
//      otro piso que ya te cubre.
//   2. La ley EXCLUYE por nombre a las moratorias (Ley 24.476 mod. Dec. 1454/2005, art. 6º de la
//      Ley 25.994 y Ley 26.970, con las modificaciones de los arts. 20 a 22 de la Ley 27.260).
//   3. Pero la REGLAMENTACIÓN (Res. SSS 25-E/2017) AMPLÍA el universo hacia el otro lado: entran
//      beneficios otorgados por regímenes que exigen MENOS de 30 años —diferenciales, insalubres,
//      invalidez con aportes regulares, ex cajas provinciales transferidas (Ley 24.307), pensiones
//      derivadas—. Eso es exactamente lo que pasa cuando la ley da el derecho y el reglamento dice
//      cómo se liquida (misma regla que ya pagó en /pension-no-contributiva con el Dec. 2360/90).
//
// LA MINA QUE ESTE ARCHIVO CASI PISA (3/9/2026, atrapada antes de publicar): la reglamentación le
// da a la pensión honorífica de Veteranos de Guerra un nivel de 82% de TRES SMVM ($944.148), y
// comparado contra el haber mínimo SIMPLE ($428.633,20) parece que ahí sí paga. No paga: esa
// pensión ya vale, por el Decreto 1357/2004, TRES veces el haber mínimo ($1.285.899,60). El nivel
// garantizado y el piso propio están multiplicados por el mismo número, así que la proporción es
// idéntica a la del caso general y el suplemento vuelve a dar cero. REGLA: el nivel de un beneficio
// se compara contra el piso de ESE beneficio, nunca contra el piso general — por eso cada universo
// declara su `haberesMinimos`.
//
// LA ESCALA DEL SMVM NO VIVE ACÁ: vive en `SMVM_SERIE` de `desempleo.ts`, y el haber mínimo en
// `prestaciones.ts` / `jubilaciones.ts`. Acá no se copia ni un monto: se copian REGLAS.

import { PRESTACIONES_VIGENTES } from "./prestaciones";

/** Art. 125 bis: la garantía es el 82% del SMVM vigente en cada período. */
export const FACTOR_GARANTIA = 0.82;

/** Años de servicios con aportes efectivos que exige el texto del art. 125 bis. */
export const ANIOS_SERVICIOS = 30;

/** Textos verbatim. El ancla contra la que `check_garantia_82.ts` verifica que no se los resuma. */
export const GARANTIA_82_TEXTOS = {
  /** Ley 24.241, art. 125 bis, primer párrafo (incorporado por art. 5º de la Ley 27.426). */
  art125bis:
    "El Estado nacional garantiza a los beneficiarios de la Prestación Básica Universal (PBU) que acrediten treinta (30) años o más de servicios con aportes efectivos, el pago de un suplemento dinerario hasta alcanzar un haber previsional equivalente al ochenta y dos por ciento (82%) del valor del Salario Mínimo Vital y Móvil, instituido por el artículo 116 de la Ley de Contrato de Trabajo 20.744 (t.o. 1976) y sus modificatorias vigente en cada período.",
  /** Segundo párrafo: la exclusión de las moratorias, por nombre y número de ley. */
  art125bisExclusion:
    "La presente garantía no resulta aplicable a los beneficiarios que hubiesen accedido a la Prestación Básica Universal por aplicación de la ley 24.476 modificada por el decreto 1.454 del 25 de noviembre de 2005, por el artículo 6º de la ley 25.994 o por la ley 26.970, todas ellas con las modificaciones introducidas por los artículos 20 a 22 de la ley 27.260.",
  /** Ley 24.241, art. 125: el OTRO piso, el que hoy manda. */
  art125:
    "El Estado nacional garantizará a los beneficiarios del Sistema Integrado de Jubilaciones y Pensiones del Régimen Previsional Público y a los del Régimen de Capitalización que perciban componente público, el haber mínimo establecido en el artículo 17 de la citada ley.",
  /** Res. SSS 25-E/2017, art. 2º: el encabezado que amplía el universo más allá de los 30 años. */
  reglamentacionArt2:
    "Quedan comprendidos dentro de la disposición del artículo 125 bis de la Ley Nº 24.241 todos los beneficios que hubieren sido otorgados a partir del cumplimiento de los requisitos de edad y años de servicios exigidos por las normas que se detallan a continuación, aunque ellas exijan un límite de años de servicios menor a TREINTA (30)",
  /** Res. SSS 25-E/2017, art. 2º inc. h) (incorporado por Res. SSS 3/2018): veteranos de Malvinas. */
  reglamentacionIncisoH:
    "Las pensiones honoríficas de Veteranos de la Guerra del Atlántico Sur creadas por la Ley N° 23.848, sus complementarias y modificatorias (Decretos N° 1357/04 y N° 886/05), asignándole a las mismas un suplemento dinerario equivalente al ochenta y dos por ciento (82%) del valor de tres (3) Salarios Mínimos, Vitales y Móviles instituidos por el artículo 116 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificatorias.",
  /** Res. SSS 25-E/2017, art. 2º inc. i): ex soldados combatientes, y la moratoria que lo bloquea. */
  reglamentacionIncisoI:
    "Las jubilaciones otorgadas por el Régimen Previsional Especial para ex – Soldados Combatientes de la Guerra de Malvinas, Georgias y Sandwich del Sur, instituidas por la Ley N° 27.329 y su modificatorio, asignándole a las mismas un suplemento dinerario equivalente al ochenta y dos por ciento (82%) del valor de un (1) Salario Mínimo, Vital y Móvil instituido por el artículo 116 de la Ley de Contrato de Trabajo N° 20.744 (t.o. 1976) y sus modificatorias. No resulta aplicable dicho suplemento en los casos en que se hubiesen computado los diez (10) años de servicios necesarios para el logro del beneficio a través de alguna de las moratorias mencionadas en el párrafo segundo del artículo 125 bis de la Ley N° 24.241, texto incorporado por el artículo 5° de la Ley N° 27.426.",
  /** Art. 3º: quién dicta el procedimiento. Importa para no prometer una liquidación que no fijamos. */
  reglamentacionArt3:
    "Facúltase a la ADMINISTRACIÓN NACIONAL DE SEGURIDAD SOCIAL (ANSES) para emitir las normas de procedimientos relativas al alcance y contenido de la presente Resolución.",
} as const;

/**
 * Los universos de la garantía. `smvm` es cuántos SMVM define el NIVEL garantizado de cada uno
 * (art. 125 bis para el general; incisos h) e i) del art. 2º de la Res. 25-E/2017 para los de
 * Malvinas). El mecanismo es siempre el mismo: se paga la diferencia HASTA alcanzar ese nivel.
 */
export type UniversoGarantia = {
  id: "general" | "regimen-menor" | "pension-veterano" | "jubilacion-excombatiente";
  etiqueta: string;
  /** Cuántos SMVM define el nivel garantizado. */
  smvm: number;
  /**
   * Cuántos haberes mínimos vale el piso que ESE beneficio ya tiene por su propia norma. Es el
   * número contra el que hay que comparar el nivel del 82% para saber si el suplemento paga algo.
   * Comparar el nivel de un beneficio TRIPLE contra el haber mínimo SIMPLE da un "sí" falso — esta
   * columna existe justamente para tapar esa mina, que casi se publica el 3/9/2026. `null` = no hay
   * múltiplo fijo verificado y la respuesta depende del haber que la persona efectivamente cobra.
   */
  haberesMinimos: number | null;
  /** De dónde sale ese piso propio. */
  normaPiso: string | null;
  detalle: string;
  norma: string;
};

export const UNIVERSOS: UniversoGarantia[] = [
  {
    id: "general",
    etiqueta: "Titular de la PBU con 30 años o más de aportes efectivos",
    smvm: 1,
    haberesMinimos: 1,
    normaPiso: "Ley 24.241, art. 125 — haber mínimo garantizado",
    detalle:
      "El caso del texto de la ley. Exige ser beneficiario de la Prestación Básica Universal y acreditar treinta años o más de servicios con aportes efectivos: aportes de verdad, no años comprados por moratoria.",
    norma: "Ley 24.241, art. 125 bis",
  },
  {
    id: "regimen-menor",
    etiqueta: "Régimen que exige menos de 30 años (diferencial, insalubre, invalidez, ex cajas)",
    smvm: 1,
    haberesMinimos: 1,
    normaPiso: "Ley 24.241, art. 125 — haber mínimo garantizado",
    detalle:
      "Lo que agrega la reglamentación y casi nadie publica: entran los beneficios otorgados por regímenes nacionales anteriores a la Ley 24.241, los diferenciales o insalubres, los especiales derogados por la Ley 23.966, los de los arts. 18 a 25 de la Ley 24.018, el retiro por invalidez con aportes regulares, los de las ex cajas provinciales o municipales transferidas en el marco de la Ley 24.307, y las pensiones directas o derivadas de todos ellos — aunque esas normas exijan menos de treinta años.",
    norma: "Res. SSS 25-E/2017, art. 2º incs. a) a g)",
  },
  {
    id: "pension-veterano",
    etiqueta: "Pensión honorífica de Veterano de Guerra del Atlántico Sur (Ley 23.848)",
    smvm: 3,
    haberesMinimos: 3,
    normaPiso: "Decreto 1357/2004, art. 2 — tres veces el haber mínimo del SIPA",
    detalle:
      "La reglamentación le asigna un nivel propio: 82% del valor de TRES salarios mínimos. Pero esta pensión ya vale, por el Decreto 1357/2004, TRES veces el haber mínimo: el numerador y el denominador quedaron multiplicados por el mismo número, así que la proporción es idéntica a la del caso general y el suplemento también da cero. Lo que sí tiene de propio, y casi no se publica, es que la pensión es compatible con cualquier otro beneficio previsional permanente (art. 3 de la Ley 23.848).",
    norma: "Res. SSS 25-E/2017, art. 2º inc. h) (texto Res. SSS 3/2018)",
  },
  {
    id: "jubilacion-excombatiente",
    etiqueta: "Jubilación del régimen especial para ex soldados combatientes (Ley 27.329)",
    smvm: 1,
    haberesMinimos: null,
    normaPiso: null,
    detalle:
      "82% de UN salario mínimo, y con un bloqueo propio: no corresponde si los diez años de servicios se computaron por alguna de las moratorias que excluye el segundo párrafo del art. 125 bis. La reglamentación aclara que este suplemento y el de la pensión honorífica son compatibles entre sí.",
    norma: "Res. SSS 25-E/2017, art. 2º inc. i) (texto Res. SSS 3/2018)",
  },
];

/** Las moratorias que el segundo párrafo del art. 125 bis excluye, por nombre y número. */
export const MORATORIAS_EXCLUIDAS = [
  "Ley 24.476, modificada por el Decreto 1.454/2005",
  "Artículo 6º de la Ley 25.994",
  "Ley 26.970",
] as const;

export type FuenteGarantia = { nombre: string; url: string; detalle: string };

export const GARANTIA_82_FUENTES: { consultadoEl: string; lista: FuenteGarantia[] } = {
  consultadoEl: "2026-09-03",
  lista: [
    {
      nombre: "Ley 24.241, arts. 125 y 125 bis — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/639/texact.htm",
      detalle:
        "El art. 125 bis fue incorporado por el art. 5º de la Ley 27.426 (B.O. 28/12/2017) y no fue sustituido desde entonces. Es el texto del que salen el 82%, los treinta años de aportes efectivos y la exclusión de las moratorias.",
    },
    {
      nombre: "Resolución 25-E/2017 — Secretaría de Seguridad Social (texto actualizado, InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/305000-309999/305749/texact.htm",
      detalle:
        "B.O. 11/1/2018 — reglamenta el art. 125 bis con vigencia desde el 1º de enero de 2018. Su art. 2º extiende la garantía a regímenes que exigen menos de treinta años, y los incisos h) e i) —incorporados por la Res. SSS 3/2018, B.O. 20/2/2018— fijan los niveles de los beneficios vinculados a la Guerra del Atlántico Sur.",
    },
    {
      nombre: "Ley 23.848 y Decreto 1357/2004 — pensión de guerra del Atlántico Sur (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/248/texact.htm",
      detalle:
        "El art. 1º (texto según Ley 24.652) fija la pensión en el 100% de la remuneración del grado de cabo del Ejército Argentino; la nota del texto actualizado recoge el Decreto 1357/2004, que puso el otorgamiento y pago a cargo de ANSES y su monto en TRES veces el haber mínimo del Régimen Previsional Público. El art. 3º la declara compatible con cualquier otro beneficio previsional permanente nacional, provincial o municipal.",
    },
    {
      nombre: "Resolución 4/2026 — Consejo Nacional del Empleo, la Productividad y el SMVM",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/346775/20260902",
      detalle:
        "B.O. 2/9/2026 — laudo que fija el salario mínimo mes a mes desde septiembre de 2026 hasta abril de 2027. Es el valor sobre el que se calcula el 82%.",
    },
    {
      nombre: `${PRESTACIONES_VIGENTES.resolucion} — haber mínimo garantizado de ${PRESTACIONES_VIGENTES.vigencia}`,
      url: PRESTACIONES_VIGENTES.resolucionUrl,
      detalle:
        `${PRESTACIONES_VIGENTES.resolucionBO} — el haber mínimo del art. 125, que es el piso que hoy efectivamente cubre a todo el mundo y está por encima del nivel del art. 125 bis.`,
    },
  ],
};
