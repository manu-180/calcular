// Propinas y remuneración — arts. 104, 104 bis y 103 bis de la Ley de Contrato de Trabajo 20.744,
// con el TEXTO VIGENTE tras la Ley 27.802 (B.O. 6/3/2026), y la DEROGACIÓN del art. 113.
//
// POR QUÉ ESTE ARCHIVO EXISTE (15/8/2026, s83): es la aplicación más pura de la regla de s78 —
// «un artículo sustituido (o derogado) es un hueco de SERP casi garantizado». Las propinas tenían
// artículo propio en la LCT, el 113, y durante cincuenta años la respuesta a «¿las propinas son
// remunerativas?» fue "sí, si son habituales y no están prohibidas". La Ley 27.802 hizo dos cosas
// el mismo día:
//   · su art. 207 DEROGÓ el art. 113 completo (el que regulaba las propinas), y
//   · su art. 32 SUSTITUYÓ el art. 104 para decir, con todas las letras, que en ningún caso las
//     propinas son remuneración «aun cuando por los usos y costumbres de determinadas actividades
//     sean habituales».
// O sea: no se derogó la regla y se dejó el vacío — se la dio vuelta y se la escribió al revés.
// Para un mozo, un delivery o un peluquero eso cambia el aguinaldo, el día de vacaciones y, sobre
// todo, la indemnización por antigüedad, que se calcula sobre una base que ahora es más chica.
//
// LO QUE HAY QUE MIRAR CON LUPA (y por eso está verificado en check_propinas.ts):
//   1. NO ES RETROACTIVO. La nota de vigencia del propio artículo dice «a partir de su publicación
//      en el Boletín Oficial»: 6 de marzo de 2026. Lo devengado antes se sigue rigiendo por el
//      texto derogado, y eso es exactamente lo que se discute hoy en los juicios en trámite.
//   2. Lo que el art. 104 excluye es la propina, o sea lo que paga un TERCERO. Un adicional que
//      pague el empleador o que fije el convenio —aunque se lo llame «por manejo de dinero»— es
//      salario del art. 103 y no entra en esta exclusión.
//   3. La propina se sigue cobrando. Lo que cambia no es el bolsillo del mes: es la base de
//      cálculo de los rubros que se derivan de la remuneración.
//   4. El art. 245 tiene topes propios (el promedio de las remuneraciones del convenio). Por eso
//      la página muestra la DIFERENCIA de base y avisa que el tope puede achicarla, en vez de
//      fingir que liquida un juicio.
//
// FUENTE: texto actualizado de InfoLEG (id 25552), leído entero el 15/8/2026. Nunca una nota.

/** Fecha desde la que rige el texto actual (B.O. de la Ley 27.802). */
export const VIGENCIA_REFORMA = "6 de marzo de 2026";

/** ISO de esa misma fecha, para comparar períodos sin ambigüedad. */
export const VIGENCIA_REFORMA_ISO = "2026-03-06";

/** Artículo de la LCT que regulaba las propinas y que la reforma derogó. */
export const ARTICULO_DEROGADO = 113;

/** Artículo de la Ley 27.802 que lo derogó. */
export const ARTICULO_DEROGATORIO = 207;

/**
 * Citas textuales del texto ACTUALIZADO en InfoLEG. Se guardan enteras a propósito: son el ancla
 * contra la que `check_propinas.ts` verifica que la página no derive hacia un resumen que diga
 * otra cosa que la norma.
 */
export const PROPINAS_TEXTOS = {
  art104:
    "Formas de determinar la remuneración. El salario puede fijarse por tiempo o por rendimiento del trabajo, y en este último caso por unidad de obra, comisión individual o colectiva. En ningún caso las propinas podrán ser consideradas como remuneración aun cuando por los usos y costumbres de determinadas actividades sean habituales.",
  art104Nota:
    "(Artículo sustituido por art. 32 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  art113Nota:
    "(Artículo derogado por art. 207 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  art104bis:
    "Otros componentes remunerativos. Mediante la negociación colectiva de actividad, rama, región, acuerdo de empresa y/o mediante acuerdo individual o decisión unilateral del empleador, podrán incorporarse, por encima de los salarios y/o conceptos de pago de carácter obligatorio otros componentes retributivos dinámicos adicionales, transitorios, fijos o variables, considerando para ello tanto el mérito personal del trabajador como aspectos propios de la organización. La incorporación, modificación y conservación de dichos componentes transitorios y variables podrá ser realizada por las partes, o decisión individual del empleador, con la frecuencia que ellas determinen, sin que puedan resultar de aplicación a su respecto la continuidad tácita, la ultraactividad, ni la costumbre, cualquiera fuere el tiempo transcurrido en su mantenimiento y aplicación.",
  art105:
    "Las prestaciones complementarias que no resulten beneficios sociales en los términos del artículo 103 bis de esta ley, sean en dinero o en especie, integran la remuneración del trabajador",
} as const;

/**
 * Los siete beneficios sociales del art. 103 bis (texto sustituido por el art. 31 de la Ley
 * 27.802): no son remuneración, no son salario en especie y no pagan aportes ni contribuciones.
 * Van acá porque son la otra cara de la misma pregunta —qué entra y qué no entra en el recibo—
 * y porque la lista se amplió en la misma reforma.
 */
export const BENEFICIOS_SOCIALES: { inciso: string; texto: string }[] = [
  {
    inciso: "a",
    texto:
      "Servicios de comedor y alimentación dentro del establecimiento, o en establecimientos gastronómicos cercanos contratados por el empleador durante la jornada, con los límites que fije la Autoridad de Aplicación.",
  },
  {
    inciso: "b",
    texto:
      "Reintegros de gastos médicos, odontológicos y farmacéuticos del trabajador y su grupo familiar, contra comprobantes de profesionales o establecimientos habilitados; también los planes médicos integrales o las diferencias de sus cuotas.",
  },
  {
    inciso: "c",
    texto:
      "Provisión de ropa de trabajo y de todo otro elemento de indumentaria o equipamiento necesario para la tarea.",
  },
  {
    inciso: "d",
    texto:
      "Reintegros documentados de guardería y/o sala maternal para hijos de hasta 6 años, cuando la empresa no cuenta con esas instalaciones.",
  },
  {
    inciso: "e",
    texto:
      "Útiles escolares y guardapolvos para los hijos, entregados en especie al inicio del período lectivo.",
  },
  {
    inciso: "f",
    texto:
      "Pago documentado, contra recibo, de programas, cursos o seminarios de capacitación o especialización.",
  },
  {
    inciso: "g",
    texto:
      "Pago de gastos de sepelio de familiares a cargo del trabajador, documentado con comprobante.",
  },
];

export type FuentePropinas = { nombre: string; url: string; detalle: string };

export const PROPINAS_FUENTES: { consultadoEl: string; lista: FuentePropinas[] } = {
  consultadoEl: "2026-08-15",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744, texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Art. 104 con el texto sustituido por el art. 32 de la Ley 27.802 («en ningún caso las propinas podrán ser consideradas como remuneración»), art. 104 bis incorporado por el art. 33, art. 103 bis sustituido por el art. 31, art. 105 (prestaciones complementarias) y art. 113 con su nota de derogación por el art. 207.",
    },
    {
      nombre: "Ley 27.802 (B.O. 6/3/2026)",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339542/20260306",
      detalle:
        "La reforma que sustituyó ~54 artículos de la LCT. Art. 31 (beneficios sociales), art. 32 (propinas), art. 33 (otros componentes remunerativos) y art. 207 (derogación del art. 113). Vigencia: desde la publicación, sin efecto retroactivo.",
    },
    {
      nombre: "LCT art. 245: indemnización por antigüedad",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "La base es la mejor remuneración mensual, normal y habitual. Al salir las propinas de la remuneración, salen también de esa base: es el rubro donde la reforma mueve más plata.",
    },
    {
      nombre: "Ley 24.241 art. 11, Ley 23.660 y Ley 19.032: aportes del trabajador",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/639/texact.htm",
      detalle:
        "11% de jubilación, 3% de obra social y 3% de PAMI: el 17% que se calcula sobre la remuneración y que, por definición, no se calcula sobre lo que no es remuneración.",
    },
  ],
};
