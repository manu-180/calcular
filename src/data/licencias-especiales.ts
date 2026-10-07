// Licencias especiales del art. 158 de la Ley de Contrato de Trabajo.
//
// POR QUÉ ESTE ARCHIVO EXISTE: acá no hay ningún monto que envejezca. Lo que se publica son
// PLAZOS legales y dos reglas que casi nunca se enuncian juntas:
//
//   1. **El art. 160 no vale para todas.** El día hábil garantizado —"deberá necesariamente
//      computarse un día hábil cuando las mismas coincidieran con días domingo, feriados o no
//      laborables"— solo alcanza a los incisos a), c) y d): nacimiento y los dos fallecimientos.
//      La licencia por matrimonio (inc. b) y la de examen (inc. e) quedan afuera del artículo. Un
//      casamiento un sábado se come el fin de semana y no se recupera.
//   2. **La licencia se paga a valor día de VACACIONES, no a valor día común.** El art. 159 dice
//      que las licencias del 158 "serán pagas, y el salario se calculará con arreglo a lo dispuesto
//      en el artículo 155": para el sueldo mensual, ese artículo manda dividir por VEINTICINCO, no
//      por treinta. Son 20% más por día. Es la misma cuenta del plus vacacional, aplicada a diez
//      días de matrimonio o a tres de duelo, y prácticamente ninguna calculadora la hace.
//
// TEXTO VIGENTE VERIFICADO EL 12/8/2026 contra el texto actualizado de la LCT en InfoLEG
// (id 25552, `texact.htm`), después de la reforma de la Ley 27.802 (B.O. 6/3/2026), que tocó 65
// artículos: los artículos 155, 158, 159, 160, 161 y 164 se leyeron uno por uno, no de memoria.
//
// LO QUE ESTA PÁGINA NO PUEDE DECIR: los convenios colectivos MEJORAN estos pisos —más días,
// adicionales por distancia, causales que la LCT no tiene (mudanza, matrimonio de un hijo)— y cada
// uno tiene su propio texto. Acá está el piso legal, que es lo que rige cuando el convenio no dice
// nada. Ningún número de convenio se publica sin la circular oficial en la mano (regla del
// proyecto), así que no se listan.

/** Los cinco incisos del art. 158, tal como los enumera la ley. */
export type CausaLicencia =
  | "nacimiento"
  | "matrimonio"
  | "fallecimiento-directo"
  | "fallecimiento-hermano"
  | "examen";

export type LicenciaEspecial = {
  causa: CausaLicencia;
  /** Cómo la busca la gente. */
  nombre: string;
  /** Qué dice el inciso, en una línea. */
  detalle: string;
  /** Días que fija la ley. */
  dias: number;
  /** Si la ley dice "días corridos". El inciso d) no lo aclara: dice "un (1) día". */
  corridos: boolean;
  /** Si le alcanza la garantía de día hábil del art. 160 (solo incisos a, c y d). */
  garantizaDiaHabil: boolean;
  inciso: string;
  /** Tope anual, cuando el inciso lo pone. */
  topeAnual?: { dias: number; texto: string };
};

export const LICENCIAS_ESPECIALES: LicenciaEspecial[] = [
  {
    causa: "nacimiento",
    nombre: "Nacimiento de hijo",
    detalle:
      "Para la persona progenitora que no cursó el embarazo. Es el piso legal: muchos convenios lo amplían.",
    dias: 2,
    corridos: true,
    garantizaDiaHabil: true,
    inciso: "art. 158 inc. a)",
  },
  {
    causa: "matrimonio",
    nombre: "Matrimonio",
    detalle:
      "Diez días corridos. Es la única licencia del artículo que puede pedirse acumulada a las vacaciones, y el empleador debe concederlo (art. 164).",
    dias: 10,
    corridos: true,
    garantizaDiaHabil: false,
    inciso: "art. 158 inc. b)",
  },
  {
    causa: "fallecimiento-directo",
    nombre: "Fallecimiento de cónyuge o conviviente, hijo o padres",
    detalle:
      "Tres días corridos. El inciso incluye expresamente a la persona con la que se estuviese unido en aparente matrimonio.",
    dias: 3,
    corridos: true,
    garantizaDiaHabil: true,
    inciso: "art. 158 inc. c)",
  },
  {
    causa: "fallecimiento-hermano",
    nombre: "Fallecimiento de hermano",
    detalle:
      "Un día. El inciso no dice «corrido»: es el único del artículo que no usa esa palabra, y por el art. 160 tiene que ser un día hábil si cae en domingo, feriado o no laborable.",
    dias: 1,
    corridos: true,
    garantizaDiaHabil: true,
    inciso: "art. 158 inc. d)",
  },
  {
    causa: "examen",
    nombre: "Rendir examen (enseñanza media o universitaria)",
    detalle:
      "Dos días corridos por examen. Hay que acreditarlo con el certificado del instituto y el plan de estudios tiene que ser oficial o autorizado (art. 161).",
    dias: 2,
    corridos: true,
    garantizaDiaHabil: false,
    inciso: "art. 158 inc. e)",
    topeAnual: { dias: 10, texto: "máximo de diez días por año calendario" },
  },
];

/** Divisor del salario diario de las licencias: el del art. 155 inc. a (sueldo mensual / 25). */
export const DIVISOR_DIA_LICENCIA = 25;

/** Divisor del día "común" de un mensualizado, para mostrar la diferencia. */
export const DIVISOR_DIA_COMUN = 30;

export type FuenteLicenciaEspecial = { nombre: string; url: string; detalle: string };

export const LICENCIAS_ESPECIALES_FUENTES: {
  consultadoEl: string;
  lista: FuenteLicenciaEspecial[];
} = {
  consultadoEl: "2026-08-12",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744 (texto actualizado)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Art. 158 (las cinco licencias y sus días), art. 159 (son pagas y el salario se calcula con el art. 155), art. 155 inc. a (sueldo mensual dividido por 25), art. 160 (día hábil garantizado, solo para los incisos a, c y d), art. 161 (acreditación del examen) y art. 164, último párrafo (las vacaciones pueden acumularse a la licencia por matrimonio, y el empleador debe concederlo).",
    },
    {
      nombre: "Ley 27.399: feriados nacionales y días no laborables",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/280000-284999/281835/norma.htm",
      detalle:
        "Define qué días son feriados y no laborables, que es lo que dispara la regla del art. 160 de la LCT. El calendario de cada año se deriva de sus artículos 1 y 6.",
    },
    {
      nombre: "Resolución 164/2025: días no laborables con fines turísticos 2026",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/336753/20251226",
      detalle:
        "B.O. 26/12/2025: el lunes 23 de marzo, el viernes 10 de julio y el lunes 7 de diciembre de 2026 también son días no laborables, y por lo tanto también cuentan para el art. 160.",
    },
  ],
};
