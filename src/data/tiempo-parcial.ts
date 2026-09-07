// Contrato de trabajo a TIEMPO PARCIAL — art. 92 ter de la Ley de Contrato de Trabajo 20.744,
// con el TEXTO VIGENTE tras la Ley 27.802 (B.O. 6/3/2026), que lo sustituyó entero (su art. 27).
//
// POR QUÉ ESTE ARCHIVO EXISTE (18/8/2026, s87): es la regla de s78/s83 en su forma más cara —
// la reforma no dejó un vacío: **dio vuelta las dos reglas que definían la figura**, y la web
// copiada no quedó incompleta, quedó afirmando lo contrario de la norma vigente.
//
//   1. EL TOPE DE DOS TERCIOS YA NO EXISTE. El texto de la Ley 26.474 (2009) definía el contrato
//      a tiempo parcial como el de jornada "inferior a las dos terceras (2/3) partes de la jornada
//      habitual de la actividad" y remataba: "Si la jornada pactada supera esa proporción, el
//      empleador deberá abonar la remuneración correspondiente a un trabajador de jornada
//      completa". El texto vigente dice "inferiores a la jornada legal o convencional de la
//      actividad" — y **la sanción desapareció con el tope**. Control cruzado hecho el 18/8/2026:
//      la frase "dos terceras" NO APARECE en ningún artículo del texto actualizado de la LCT.
//   2. LAS HORAS SUPLEMENTARIAS PASARON DE PROHIBIDAS A PERMITIDAS. El texto viejo decía que los
//      contratados a tiempo parcial "no podrán realizar horas suplementarias o extraordinarias,
//      salvo el caso del artículo 89", y que violar el límite obligaba a pagar la jornada completa
//      del mes. El vigente dice que "podrán realizar voluntariamente horas suplementarias respecto
//      de la jornada reducida pactada", con un único techo: no exceder la jornada legal.
//
// LO QUE NO CAMBIÓ, Y ES EL NÚMERO QUE NADIE CALCULA: el inciso 4 sigue diciendo que los aportes y
// contribuciones **de obra social** son los de un trabajador de TIEMPO COMPLETO de la categoría.
// O sea: el 3% de obra social no se prorratea. Quien trabaja media jornada aporta a la obra social
// como si trabajara la jornada entera, y por eso su descuento pesa el doble en proporción a lo que
// cobra. Los otros aportes (11% SIPA + 3% PAMI) sí van en proporción a la remuneración (inciso 3).
//
// FUENTES: texto actualizado de la LCT en InfoLEG (id 25552) y texto original de la Ley 26.474
// (id 149688) para la versión anterior, ambos leídos el 18/8/2026. Nunca una nota de prensa.

/** Fecha desde la que rige el texto actual (B.O. de la Ley 27.802). */
export const VIGENCIA_REFORMA = "6 de marzo de 2026";

/** ISO de esa misma fecha, para comparar períodos sin ambigüedad. */
export const VIGENCIA_REFORMA_ISO = "2026-03-06";

/** Artículo de la Ley 27.802 que sustituyó el art. 92 ter de la LCT. */
export const ARTICULO_SUSTITUTIVO = 27;

/**
 * Jornada máxima legal, uniforme para toda la Nación: la LCT (art. 196) remite a la Ley 11.544.
 * Es el techo del inciso 2 del art. 92 ter: por encima de la jornada legal no se puede ir ni
 * siquiera con horas suplementarias voluntarias.
 */
export const JORNADA_LEGAL_SEMANAL = 48;
export const JORNADA_LEGAL_DIARIA = 8;

/** El tope que traía el texto anterior (Ley 26.474) y que la reforma eliminó: 2/3 de la jornada. */
export const TOPE_ANTERIOR = 2 / 3;

/** Semanas promedio por mes (52/12). Es aritmética, no un número legal: sirve para pasar de la
 *  jornada semanal —que es como la fija la ley— al valor de la hora sobre un sueldo mensual. */
export const SEMANAS_POR_MES = 52 / 12;

/** Recargos del art. 201 de la LCT sobre el salario habitual. */
export const RECARGOS = {
  /** Días comunes. */
  comun: 0.5,
  /** Sábado después de las 13, domingo y feriados. */
  agravado: 1,
} as const;

/**
 * Citas textuales, guardadas enteras a propósito: son el ancla contra la que
 * `check_tiempo_parcial.ts` verifica que la página no derive hacia un resumen que diga otra cosa
 * que la norma, y son la prueba de la inversión (vigente vs. anterior, palabra por palabra).
 */
export const TIEMPO_PARCIAL_TEXTOS = {
  vigenteInc1:
    "El contrato de trabajo a tiempo parcial es aquel en virtud del cual el trabajador se obliga a prestar servicios durante un determinado número de horas al día o a la semana, inferiores a la jornada legal o convencional de la actividad. En este caso, la remuneración no podrá ser inferior a la proporcional que le corresponda a un trabajador a tiempo completo, establecida por ley o convenio colectivo, de la misma categoría o puesto de trabajo.",
  vigenteInc2:
    "Los trabajadores contratados a tiempo parcial podrán realizar voluntariamente horas suplementarias respecto de la jornada reducida pactada. No podrán realizar horas extraordinarias en exceso de la jornada legal, salvo el caso del artículo 89 de la presente ley.",
  vigenteInc3:
    "Las cotizaciones a la seguridad social y las demás que se recaudan con ésta, se efectuarán en proporción a la remuneración del trabajador y serán unificadas en caso de pluriempleo.",
  vigenteInc4:
    "Las prestaciones de la seguridad social se determinarán reglamentariamente teniendo en cuenta el tiempo trabajado, los aportes y las contribuciones efectuadas. Los aportes y contribuciones para la obra social será la que corresponda a un trabajador de tiempo completo de la categoría en que se desempeña el trabajador.",
  vigenteInc5:
    "Los Convenios Colectivos de Trabajo podrán determinar el porcentaje máximo de trabajadores a tiempo parcial que en cada establecimiento se desempeñarán bajo esta modalidad contractual. Asimismo, podrán establecer la prioridad de los mismos para ocupar las vacantes a tiempo completo que se produjeren en la empresa.",
  vigenteNota:
    "(Artículo sustituido por art. 27 de la Ley Nº 27.802 B.O. 6/3/2026. Vigencia: a partir de su publicación en el Boletín Oficial.)",
  anteriorInc1:
    "El contrato de trabajo a tiempo parcial es aquel en virtud del cual el trabajador se obliga a prestar servicios durante un determinado número de horas al día o a la semana, inferiores a las dos terceras (2/3) partes de la jornada habitual de la actividad. En este caso la remuneración no podrá ser inferior a la proporcional, que le corresponda a un trabajador a tiempo completo, establecida por ley o convenio colectivo, de la misma categoría o puesto de trabajo. Si la jornada pactada supera esa proporción, el empleador deberá abonar la remuneración correspondiente a un trabajador de jornada completa.",
  anteriorInc2:
    "Los trabajadores contratados a tiempo parcial no podrán realizar horas suplementarias o extraordinarias, salvo el caso del artículo 89 de la presente ley. La violación del límite de jornada establecido para el contrato a tiempo parcial, generará la obligación del empleador de abonar el salario correspondiente a la jornada completa para el mes en que se hubiere efectivizado la misma, ello sin perjuicio de otras consecuencias que se deriven de este incumplimiento.",
  art201:
    "Horas Suplementarias. El empleador deberá abonar al trabajador que prestare servicios en horas suplementarias, medie o no autorización del organismo administrativo competente, un recargo del cincuenta por ciento (50%) calculado sobre el salario habitual, si se tratare del días comunes, y del ciento por ciento (100%) en días sábado después de las trece (13) horas, domingo y feriados.",
  art196:
    "Determinación. La extensión de la jornada de trabajo es uniforme para toda la Nación y regirá por la ley 11.544, con exclusión de toda disposición provincial en contrario, salvo en los aspectos que en el presente título se modifiquen o aclaren.",
  art89:
    "Auxilios o ayudas extraordinarias. El trabajador estará obligado a prestar los auxilios que se requieran, en caso de peligro grave o inminente para las personas o para las cosas incorporadas a la empresa.",
} as const;

/** Los cinco cambios del artículo, uno por uno. Es el corazón de la página. */
export const CAMBIOS: {
  tema: string;
  antes: string;
  ahora: string;
  /** true cuando el cambio deja al trabajador en peor posición que antes. */
  peor: boolean;
}[] = [
  {
    tema: "Cuánto se puede pactar",
    antes:
      "Menos de 2/3 de la jornada habitual de la actividad (32 horas semanales sobre una jornada de 48).",
    ahora:
      "Cualquier cantidad de horas inferior a la jornada legal o convencional de la actividad. El tope de los dos tercios ya no está en el artículo.",
    peor: true,
  },
  {
    tema: "Qué pasa si se supera ese tope",
    antes:
      "El empleador debía pagar la remuneración de un trabajador de jornada completa: la sanción estaba escrita en el propio artículo.",
    ahora:
      "No hay sanción, porque no hay tope: la frase que la establecía desapareció junto con los dos tercios.",
    peor: true,
  },
  {
    tema: "Horas suplementarias",
    antes:
      "Prohibidas. Sólo se admitían en el caso del art. 89 (auxilios por peligro grave o inminente), y hacerlas obligaba a pagar el mes completo.",
    ahora:
      "Permitidas, de forma voluntaria, por encima de la jornada reducida pactada. El único techo es la jornada legal.",
    peor: false,
  },
  {
    tema: "Cupo de trabajadores a tiempo parcial",
    antes:
      "Los convenios colectivos «determinarán» el porcentaje máximo de trabajadores bajo esta modalidad.",
    ahora:
      "Los convenios «podrán determinar» ese porcentaje: pasó de obligación a facultad.",
    peor: true,
  },
  {
    tema: "Prioridad para las vacantes de jornada completa",
    antes: "El artículo ya la preveía por convenio colectivo.",
    ahora:
      "Sigue estando, y el texto la explicita: los convenios podrán establecer la prioridad de estos trabajadores para ocupar las vacantes a tiempo completo que se produzcan en la empresa.",
    peor: false,
  },
];

export type FuenteTiempoParcial = { nombre: string; url: string; detalle: string };

export const TIEMPO_PARCIAL_FUENTES: {
  consultadoEl: string;
  lista: FuenteTiempoParcial[];
} = {
  consultadoEl: "2026-08-18",
  lista: [
    {
      nombre: "Ley de Contrato de Trabajo 20.744 — texto actualizado (InfoLEG)",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm",
      detalle:
        "Art. 92 ter con el texto sustituido por el art. 27 de la Ley 27.802: la definición sin el tope de los dos tercios, las horas suplementarias voluntarias, las cotizaciones proporcionales (inc. 3) y el aporte de obra social de tiempo completo (inc. 4). También arts. 196 (jornada), 201 (recargos del 50% y 100%) y 89 (auxilios extraordinarios).",
    },
    {
      nombre: "Ley 26.474 (B.O. 23/1/2009) — el texto anterior del art. 92 ter",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/145000-149999/149688/norma.htm",
      detalle:
        "El artículo 1º de esta ley es el texto que rigió hasta el 5/3/2026 y que casi todas las notas siguen publicando: las «dos terceras (2/3) partes de la jornada habitual», la obligación de pagar jornada completa si se superaba y la prohibición de hacer horas suplementarias.",
    },
    {
      nombre: "Ley 27.802 — B.O. 6/3/2026",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/339542/20260306",
      detalle:
        "La reforma que sustituyó ~54 artículos de la LCT. Su art. 27 es el que reescribió el art. 92 ter. Vigencia: desde la publicación, sin efecto retroactivo.",
    },
    {
      nombre: "Ley 24.241 art. 11, Ley 23.660 y Ley 19.032 — aportes del trabajador",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/639/texact.htm",
      detalle:
        "11% de jubilación (SIPA), 3% de obra social y 3% de PAMI. Los dos primeros y el último van sobre la remuneración proporcional; el de obra social, por el inc. 4 del art. 92 ter, se calcula como el de un trabajador de tiempo completo de la categoría.",
    },
  ],
};
