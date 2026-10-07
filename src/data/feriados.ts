// Feriados nacionales y días no laborables — Ley 27.399 y las resoluciones anuales que la aplican.
//
// POR QUÉ ESTE ARCHIVO NO ES UNA LISTA DE FECHAS: casi todo el calendario se DERIVA. Los feriados
// inamovibles tienen fecha fija en el art. 1 de la Ley 27.399; Carnaval y Semana Santa se calculan
// a partir de la Pascua (computus gregoriano); y los trasladables se mueven con la regla del
// art. 6 —martes y miércoles al lunes anterior, jueves y viernes al lunes siguiente—. Copiar a
// mano el calendario que publican los medios es el camino corto a un error silencioso; derivarlo
// y cruzarlo contra el calendario oficial es el largo, y es el que no envejece.
//
// LO ÚNICO QUE NO SE PUEDE DERIVAR son los días con fines turísticos: el art. 7 faculta al Poder
// Ejecutivo a fijar hasta TRES por año, que deben caer lunes o viernes y publicarse con 50 días de
// anticipación al fin del año calendario. Esos sí se transcriben de la norma, con su cita.
//
// VERIFICADO EL 12/8/2026:
//   · Ley 27.399 leída completa en InfoLEG (id 281835, `norma.htm` — esta ley no tiene `texact`).
//   · Días turísticos de 2026: Resolución 164/2025 de Jefatura de Gabinete, B.O. 26/12/2025 —
//     lunes 23 de marzo, viernes 10 de julio y lunes 7 de diciembre.
//   · El calendario derivado para 2026 se cruzó contra el oficial de argentina.gob.ar: los dos
//     trasladables que se mueven quedan el lunes 15 de junio (Güemes, cae miércoles) y el lunes
//     23 de noviembre (Soberanía, cae viernes). Coincide.
//
// MINA CONOCIDA — el Decreto 614/2025 (B.O. 28/8/2025) agregó una regla que NO es automática: los
// trasladables que caigan sábado o domingo PUEDEN moverse al lunes siguiente o al viernes anterior,
// "según lo determine la Autoridad de Aplicación" (la Jefatura de Gabinete). O sea: cuando un
// trasladable cae fin de semana, la fecha NO se deriva — hay que buscar la resolución. En 2026 no
// pasa (17/6 miércoles, 17/8 lunes, 12/10 lunes, 20/11 viernes), pero el motor lo marca en vez de
// inventar una fecha.

/** Feriados nacionales inamovibles con fecha fija (Ley 27.399, art. 1). */
export const INAMOVIBLES_FIJOS: { mes: number; dia: number; nombre: string }[] = [
  { mes: 1, dia: 1, nombre: "Año Nuevo" },
  { mes: 3, dia: 24, nombre: "Día Nacional de la Memoria por la Verdad y la Justicia" },
  { mes: 4, dia: 2, nombre: "Día del Veterano y de los Caídos en la Guerra de Malvinas" },
  { mes: 5, dia: 1, nombre: "Día del Trabajo" },
  { mes: 5, dia: 25, nombre: "Día de la Revolución de Mayo" },
  { mes: 6, dia: 20, nombre: "Paso a la Inmortalidad del General Manuel Belgrano" },
  { mes: 7, dia: 9, nombre: "Día de la Independencia" },
  { mes: 12, dia: 8, nombre: "Día de la Inmaculada Concepción de María" },
  { mes: 12, dia: 25, nombre: "Navidad" },
];

/** Feriados nacionales trasladables (Ley 27.399, art. 1), con su fecha de origen. */
export const TRASLADABLES: { mes: number; dia: number; nombre: string }[] = [
  { mes: 6, dia: 17, nombre: "Paso a la Inmortalidad del General Martín Miguel de Güemes" },
  { mes: 8, dia: 17, nombre: "Paso a la Inmortalidad del General José de San Martín" },
  { mes: 10, dia: 12, nombre: "Día del Respeto a la Diversidad Cultural" },
  { mes: 11, dia: 20, nombre: "Día de la Soberanía Nacional" },
];

/**
 * Días con fines turísticos del art. 7, por año. NO se derivan: los fija el Poder Ejecutivo con
 * una norma propia. Si un año no está acá, es que la norma todavía no salió — y el motor lo dice
 * en vez de suponer.
 */
export const TURISTICOS_POR_ANIO: Record<
  number,
  { fechas: string[]; norma: string; normaUrl: string; normaBO: string }
> = {
  2026: {
    fechas: ["2026-03-23", "2026-07-10", "2026-12-07"],
    norma: "Resolución 164/2025 de la Jefatura de Gabinete de Ministros",
    normaUrl: "https://www.boletinoficial.gob.ar/detalleAviso/primera/336753/20251226",
    normaBO: "Boletín Oficial del 26 de diciembre de 2025",
  },
};

/** El año más nuevo con calendario completo. Más allá, faltan los días turísticos. */
export const ANIO_MAXIMO_COMPLETO = Math.max(...Object.keys(TURISTICOS_POR_ANIO).map(Number));

export type FuenteFeriado = { nombre: string; url: string; detalle: string };

export const FERIADOS_FUENTES: { consultadoEl: string; lista: FuenteFeriado[] } = {
  consultadoEl: "2026-08-12",
  lista: [
    {
      nombre: "Ley 27.399: Régimen de feriados nacionales y días no laborables",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/280000-284999/281835/norma.htm",
      detalle:
        "B.O. 18/10/2017: art. 1 (inamovibles, trasladables y Jueves Santo como día no laborable), art. 6 (los trasladables que caen martes o miércoles pasan al lunes anterior; los que caen jueves o viernes, al lunes siguiente) y art. 7 (hasta 3 días turísticos por año, en lunes o viernes).",
    },
    {
      nombre: "Decreto 614/2025: traslado de los feriados que caen fin de semana",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/330457/20250828",
      detalle:
        "B.O. 28/8/2025: los feriados trasladables que coincidan con sábado o domingo pueden moverse al lunes siguiente o al viernes anterior, según lo determine la Jefatura de Gabinete. No es automático: cuando pasa, hay que buscar la resolución del año.",
    },
    {
      nombre: "Resolución 164/2025: días no laborables con fines turísticos 2026",
      url: "https://www.boletinoficial.gob.ar/detalleAviso/primera/336753/20251226",
      detalle:
        "B.O. 26/12/2025: fija para 2026 el lunes 23 de marzo, el viernes 10 de julio y el lunes 7 de diciembre.",
    },
    {
      nombre: "Calendario oficial de feriados: Jefatura de Gabinete",
      url: "https://www.argentina.gob.ar/jefatura/feriados-nacionales-2026",
      detalle:
        "El calendario publicado por el Estado, usado como control cruzado del calendario que este sitio deriva de la ley.",
    },
  ],
};
