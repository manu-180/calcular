// Muerte del trabajador — art. 248 de la Ley de Contrato de Trabajo 20.744, con el TEXTO VIGENTE
// tras la Ley 27.802 (B.O. 6/3/2026), y su remisión al art. 247 (la mitad del art. 245).
//
// POR QUÉ ESTE ARCHIVO EXISTE (16/8/2026, s85). Aplicación de la regla de s78: «un artículo
// SUSTITUIDO es un hueco de SERP casi garantizado». El art. 248 es el que decide quién cobra
// cuando un trabajador muere, y la Ley 27.802 (art. 52) lo reescribió ENTERO el 6/3/2026: cambió
// la lista de beneficiarios, cambió cómo se reparte la plata y agregó un plazo que libera al
// empleador. Toda nota anterior a marzo de 2026 —y toda nota que copie a una anterior— contesta
// esta pregunta con la lista vieja.
//
// LO QUE HAY QUE MIRAR CON LUPA (y por eso está verificado en check_muerte_trabajador.ts):
//   1. La indemnización NO es la del despido: el 248 remite al 247, que es «la mitad de la
//      prevista en el artículo 245». La confusión con el 100% es el error más caro de la página.
//   2. NO hay preaviso ni integración del mes de despido: la muerte no es un despido. Lo que sí
//      corresponde siempre es la liquidación final (SAC proporcional y vacaciones no gozadas).
//   3. El reparto es en PARTES IGUALES y «considerando cada titular del crédito como uno (1)» —
//      el texto lo dice con esas palabras. No hay porcentajes por parentesco.
//   4. Los hijos MAYORES sin CUD no concurren con el cónyuge: entran sólo si no hay ninguno de
//      los tres supuestos del primer grupo. Los padres, sólo si tampoco hay hijos mayores, y
//      únicamente si «estuvieren a cargo al momento del fallecimiento».
//   5. Es INDEPENDIENTE de lo que pague el Sistema de Riesgos del Trabajo y de cualquier seguro
//      o beneficio de convenio: el propio artículo lo aclara. Sumar o restar esas prestaciones es
//      el otro error grande.
//
// FUENTE: texto actualizado de InfoLEG (id 25552), leído el 16/8/2026. Nunca una nota.

/** Fecha desde la que rige el texto actual del art. 248 (B.O. de la Ley 27.802). */
export const VIGENCIA_REFORMA = "6 de marzo de 2026";
export const VIGENCIA_REFORMA_ISO = "2026-03-06";

/** Artículo de la Ley 27.802 que sustituyó el art. 248 de la LCT. */
export const ARTICULO_SUSTITUTIVO = 52;

/** Días que tiene el empleador para pagar y quedar liberado (art. 248, último tramo). */
export const DIAS_LIBERACION_EMPLEADOR = 30;

/** El 248 remite al 247, que manda pagar «la mitad» del art. 245. */
export const PROPORCION_ART_247 = 0.5;

/**
 * Citas textuales del texto ACTUALIZADO en InfoLEG. Se guardan enteras a propósito: son el ancla
 * contra la que check_muerte_trabajador.ts verifica que la página no derive hacia un resumen que
 * diga otra cosa que la norma.
 */
export const MUERTE_TEXTOS = {
  art248Encabezado:
    "En caso de muerte del trabajador, tendrán derecho a percibir una indemnización igual a la prevista en el artículo 247 de esta ley, las personas que se detallan a continuación:",
  art248Reparto:
    "De concurrir dos (2) o más de los supuestos detallados anteriormente, se distribuirá la indemnización en partes iguales, es decir, considerando cada titular del crédito como uno (1).",
  art248Subsidiarios:
    "En caso de ausencia de algunos de los supuestos indicados en los incisos anteriores, tendrán derecho los hijos del causante mayores de edad y, ante la falta de los beneficiarios considerando los supuestos detallados, se les reconoce este derecho a los padres del causante que estuvieren a cargo al momento del fallecimiento.",
  art248Liberacion:
    "El empleador queda liberado del pago si cancela la misma dentro de los treinta (30) días de ocurrido el deceso considerando la documentación con la que contaba y/o que le fuera entregada con motivo del mismo.",
  art248Independencia:
    "Esta indemnización es independiente de la que se reconozca a los causahabientes del trabajador por el Sistema de Riesgos del Trabajo, según el caso, y de cualquier otro beneficio que, por las leyes, Convenciones Colectivas de Trabajo, seguros, actos o contratos de previsión, le fuesen concedidos a los mismos en razón del fallecimiento del trabajador.",
  art248Nota:
    "(Artículo sustituido por art. 52 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  art247:
    "En los casos en que el despido fuese dispuesto por causa de fuerza mayor o por falta o disminución de trabajo no imputable al empleador fehacientemente justificada, el trabajador tendrá derecho a percibir una indemnización equivalente a la mitad de la prevista en el artículo 245 de esta ley.",
} as const;

/** Los tres supuestos del primer grupo (incisos a, b y c): concurren entre sí. */
export const BENEFICIARIOS_PRIMER_GRUPO: { inciso: string; texto: string }[] = [
  { inciso: "a", texto: "El cónyuge o conviviente del causante." },
  { inciso: "b", texto: "Los hijos del causante menores de edad." },
  {
    inciso: "c",
    texto: "Los hijos del causante mayores de edad con Certificado Único de Discapacidad (CUD).",
  },
];

export type FuenteMuerte = { nombre: string; url: string; detalle: string };

export const MUERTE_FUENTES: { consultadoEl: string; lista: FuenteMuerte[] } = {
  consultadoEl: "2026-08-16",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744 — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Art. 248 con el texto sustituido por el art. 52 de la Ley 27.802 (beneficiarios, reparto en partes iguales, plazo de 30 días e independencia del Sistema de Riesgos del Trabajo), art. 247 (la mitad de la del art. 245) y art. 245 (base de cálculo y tope del convenio).",
    },
    {
      nombre: "Ley 27.802 — B.O. 6/3/2026",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339542/20260306",
      detalle:
        "La reforma que sustituyó ~54 artículos de la LCT. Su art. 52 reescribió íntegramente el art. 248. Vigencia: desde la publicación, sin efecto retroactivo.",
    },
    {
      nombre: "LCT arts. 123 y 156 — liquidación final",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "SAC proporcional al semestre trabajado (art. 123) y vacaciones proporcionales no gozadas (art. 156, pagadas a sueldo ÷ 25 según el art. 155). Corresponden cualquiera sea la causa de la extinción, también la muerte.",
    },
    {
      nombre: "Ley 24.557 de Riesgos del Trabajo — prestaciones por fallecimiento",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/27971/texact.htm",
      detalle:
        "Lo que paga la ART cuando la muerte es por accidente de trabajo o enfermedad profesional. El art. 248 dice expresamente que su indemnización es independiente de esto: no se suma ni se descuenta, se cobran las dos.",
    },
  ],
};
