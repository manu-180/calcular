// Motor del calendario de feriados. Funciones puras, sin estado ni fetch.
//
// TODA LA ARITMÉTICA DE FECHAS ES EN UTC, igual que en `lib/licencias.ts`: las fechas son cadenas
// AAAA-MM-DD y se operan como días enteros. Con fechas locales, el prerender en el servidor y el
// navegador del usuario pueden diferir en un día entero, y en una licencia eso es un error de
// cálculo, no un detalle de formato.
//
// LO QUE ESTE MÓDULO SÍ SABE: la Ley 27.399 y la resolución anual de días turísticos.
// LO QUE NO SABE, y lo dice: feriados provinciales, municipales, los días no laborables por
// religión (arts. 2 y 3, que dependen de calendarios lunares y de la confesión de cada persona) y
// los asuetos administrativos, que no son feriados y solo alcanzan a la administración pública.

import {
  ANIO_MAXIMO_COMPLETO,
  INAMOVIBLES_FIJOS,
  TRASLADABLES,
  TURISTICOS_POR_ANIO,
} from "@/data/feriados";
import { aISO, parseFechaISO, sumarDias } from "@/lib/licencias";

/** Qué es cada día, a los efectos del art. 160 de la LCT (todos son "no hábiles"). */
export type TipoFeriado =
  | "inamovible"
  | "trasladable"
  | "no-laborable"
  | "turistico";

export type Feriado = {
  /** AAAA-MM-DD en la fecha en que efectivamente se goza. */
  fecha: string;
  nombre: string;
  tipo: TipoFeriado;
  /** Si se trasladó, la fecha de origen que fija la ley. */
  fechaOriginal?: string;
};

/**
 * Domingo de Pascua del año, por el computus gregoriano (algoritmo de Meeus/Jones/Butcher).
 * De él cuelgan las cuatro fechas móviles del calendario argentino: Carnaval (lunes y martes,
 * 48 y 47 días antes), Jueves Santo (3 antes) y Viernes Santo (2 antes).
 */
export function domingoDePascua(anio: number): Date {
  const a = anio % 19;
  const b = Math.floor(anio / 100);
  const c = anio % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(anio, mes - 1, dia));
}

const iso = (anio: number, mes: number, dia: number) => aISO(new Date(Date.UTC(anio, mes - 1, dia)));

/**
 * Aplica el art. 6 de la Ley 27.399 a un feriado trasladable. Devuelve `null` cuando la fecha cae
 * sábado o domingo: ahí el Decreto 614/2025 dejó el traslado a criterio de la Jefatura de
 * Gabinete, así que la fecha NO se puede derivar y hay que ir a la resolución del año.
 */
export function trasladar(fecha: Date): { fecha: Date; movido: boolean } | null {
  const dia = fecha.getUTCDay(); // 0 domingo … 6 sábado
  if (dia === 2 || dia === 3) return { fecha: sumarDias(fecha, -(dia - 1)), movido: true }; // martes/miércoles → lunes anterior
  if (dia === 4 || dia === 5) return { fecha: sumarDias(fecha, 8 - dia), movido: true }; // jueves/viernes → lunes siguiente
  if (dia === 1) return { fecha, movido: false }; // ya es lunes
  return null; // sábado o domingo: lo decide la Autoridad de Aplicación
}

export type CalendarioAnual = {
  anio: number;
  feriados: Feriado[];
  /** True si el año tiene la resolución de días turísticos publicada. */
  completo: boolean;
  /** Trasladables que cayeron fin de semana y quedaron sin fecha derivable. */
  sinResolver: { nombre: string; fechaOriginal: string }[];
};

/** El calendario del año, derivado de la ley. Nada copiado de un medio. */
export function calendarioDe(anio: number): CalendarioAnual {
  const feriados: Feriado[] = [];
  const sinResolver: { nombre: string; fechaOriginal: string }[] = [];

  for (const f of INAMOVIBLES_FIJOS) {
    feriados.push({ fecha: iso(anio, f.mes, f.dia), nombre: f.nombre, tipo: "inamovible" });
  }

  const pascua = domingoDePascua(anio);
  feriados.push({ fecha: aISO(sumarDias(pascua, -48)), nombre: "Lunes de Carnaval", tipo: "inamovible" });
  feriados.push({ fecha: aISO(sumarDias(pascua, -47)), nombre: "Martes de Carnaval", tipo: "inamovible" });
  feriados.push({ fecha: aISO(sumarDias(pascua, -2)), nombre: "Viernes Santo", tipo: "inamovible" });
  feriados.push({ fecha: aISO(sumarDias(pascua, -3)), nombre: "Jueves Santo", tipo: "no-laborable" });

  for (const t of TRASLADABLES) {
    const original = new Date(Date.UTC(anio, t.mes - 1, t.dia));
    const r = trasladar(original);
    if (!r) {
      sinResolver.push({ nombre: t.nombre, fechaOriginal: aISO(original) });
      continue;
    }
    feriados.push({
      fecha: aISO(r.fecha),
      nombre: t.nombre,
      tipo: "trasladable",
      ...(r.movido ? { fechaOriginal: aISO(original) } : {}),
    });
  }

  const turisticos = TURISTICOS_POR_ANIO[anio];
  if (turisticos) {
    for (const fecha of turisticos.fechas) {
      feriados.push({ fecha, nombre: "Día no laborable con fines turísticos", tipo: "turistico" });
    }
  }

  feriados.sort((a, b) => a.fecha.localeCompare(b.fecha));
  return { anio, feriados, completo: Boolean(turisticos), sinResolver };
}

const cache = new Map<number, CalendarioAnual>();
function calendarioCacheado(anio: number): CalendarioAnual {
  let c = cache.get(anio);
  if (!c) {
    c = calendarioDe(anio);
    cache.set(anio, c);
  }
  return c;
}

/** El feriado o día no laborable que cae ese día, si lo hay. */
export function feriadoDe(fechaISO: string): Feriado | null {
  const anio = Number(fechaISO.slice(0, 4));
  if (!Number.isFinite(anio)) return null;
  return calendarioCacheado(anio).feriados.find((f) => f.fecha === fechaISO) ?? null;
}

/**
 * ¿Es día hábil? A los efectos del art. 160 de la LCT, no lo son el domingo, los feriados y los
 * días no laborables. El sábado SÍ es hábil para la ley —aunque en la mayoría de los convenios no
 * se trabaje—, y por eso el motor lo trata como parámetro y no como certeza.
 */
export function esHabil(fecha: Date, sabadoEsHabil: boolean): boolean {
  const dia = fecha.getUTCDay();
  if (dia === 0) return false;
  if (dia === 6 && !sabadoEsHabil) return false;
  return feriadoDe(aISO(fecha)) === null;
}

/** El primer día hábil desde la fecha dada, inclusive. */
export function primerHabilDesde(fecha: Date, sabadoEsHabil: boolean): Date {
  let d = fecha;
  // Cota dura: ningún feriado argentino encadena más de dos semanas de días no hábiles.
  for (let i = 0; i < 30; i++) {
    if (esHabil(d, sabadoEsHabil)) return d;
    d = sumarDias(d, 1);
  }
  return d;
}

/** True si el año consultado tiene el calendario completo (con los días turísticos publicados). */
export function anioCompleto(anio: number): boolean {
  return Boolean(TURISTICOS_POR_ANIO[anio]);
}

export { ANIO_MAXIMO_COMPLETO, parseFechaISO };
