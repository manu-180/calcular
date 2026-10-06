import { calendarioDe } from "@/lib/feriados";
import { ANIO_VACACIONES } from "@/data/vacaciones";

// Fechas de la temporada de vacaciones: lo que el motor de días y pago (src/lib/vacaciones.ts) no
// hace. Es el espejo de las fórmulas de la hoja «Equipo» de scripts/gen_planilla_vacaciones.ts y
// scripts/check_planilla_vacaciones.ts evalúa el archivo contra estas funciones: si se toca una,
// se toca la otra.
//
// Para la regla del lunes (art. 151) cuentan sólo los FERIADOS de la Ley 27.399 (inamovibles y
// trasladables): los días no laborables (Jueves Santo, turísticos) los decide cada empleador y el
// artículo dice «feriado». Por eso no se usa esHabil() de lib/feriados, que los junta a todos.

const DIA_MS = 86_400_000;
export const ANTICIPACION_LEGAL = 30;
export const TRAMO_MINIMO = 7;

export function feriadosLegales(anios: number[]): { fecha: string; nombre: string }[] {
  return anios
    .flatMap((a) => calendarioDe(a).feriados)
    .filter((f) => f.tipo === "inamovible" || f.tipo === "trasladable")
    .map((f) => ({ fecha: f.fecha, nombre: f.nombre }))
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
}

const ms = (iso: string) => Date.parse(`${iso}T00:00:00Z`);
export const sumar = (iso: string, dias: number) => new Date(ms(iso) + dias * DIA_MS).toISOString().slice(0, 10);
export const diaSemana = (iso: string) => new Date(ms(iso)).getUTCDay();
export const diasEntre = (desde: string, hasta: string) => Math.round((ms(hasta) - ms(desde)) / DIA_MS);

const FERIADOS = new Set(feriadosLegales([ANIO_VACACIONES, ANIO_VACACIONES + 1]).map((f) => f.fecha));
const esFeriado = (iso: string) => FERIADOS.has(iso);

/** El día en que la licencia puede empezar esa semana: el lunes, o el hábil siguiente si es feriado. */
export function inicioValidoDeLaSemana(iso: string): string {
  const lunes = sumar(iso, -((diaSemana(iso) + 6) % 7));
  let d = lunes;
  for (let i = 0; i < 14; i++) {
    const s = diaSemana(d);
    if (s !== 0 && s !== 6 && !esFeriado(d)) return d;
    d = sumar(d, 1);
  }
  return d;
}

export const inicioValido = (iso: string) => inicioValidoDeLaSemana(iso) === iso;

/** Primer inicio válido que todavía se puede avisar con la anticipación de la ley, desde hoy. */
export function inicioSugerido(hoyISO: string, anio = ANIO_VACACIONES): string {
  const piso = sumar(hoyISO, ANTICIPACION_LEGAL);
  let d = piso < `${anio}-10-01` ? `${anio}-10-01` : piso;
  for (let i = 0; i < 6; i++) {
    const candidato = inicioValidoDeLaSemana(d);
    if (candidato >= d) return candidato;
    d = sumar(d, 7 - ((diaSemana(d) + 6) % 7));
  }
  return d;
}

export type Estado =
  | { tipo: "sin-dias" }
  | { tipo: "sin-inicio" }
  | { tipo: "no-es-lunes"; sugerido: string }
  | { tipo: "tramo-corto" }
  | { tipo: "fuera-de-periodo" }
  | { tipo: "notificado" }
  | { tipo: "aviso-vencido" }
  | { tipo: "avisar-ya"; limite: string; faltan: number }
  | { tipo: "en-regla"; limite: string };

export type Cronograma = {
  inicio: string;
  fin: string;
  vuelve: string;
  avisarAntesDe: string;
  estado: Estado;
};

/** Mismo orden de prioridad que la columna «Estado» de la hoja «Equipo». */
export function cronograma(p: {
  dias: number;
  diasTramo: number;
  inicioISO: string;
  hoyISO: string;
  notificado?: boolean;
  anio?: number;
  anticipacion?: number;
}): Cronograma {
  const anio = p.anio ?? ANIO_VACACIONES;
  const fin = sumar(p.inicioISO, p.diasTramo - 1);
  const avisarAntesDe = sumar(p.inicioISO, -(p.anticipacion ?? ANTICIPACION_LEGAL));
  const base = { inicio: p.inicioISO, fin, vuelve: sumar(fin, 1), avisarAntesDe };
  const saldo = p.dias - p.diasTramo;
  let estado: Estado;
  if (p.dias <= 0) estado = { tipo: "sin-dias" };
  else if (!inicioValido(p.inicioISO)) estado = { tipo: "no-es-lunes", sugerido: inicioValidoDeLaSemana(sumar(p.inicioISO, 7)) };
  else if (p.diasTramo < p.dias && (p.diasTramo < TRAMO_MINIMO || saldo < TRAMO_MINIMO)) estado = { tipo: "tramo-corto" };
  else if (p.inicioISO < `${anio}-10-01` || fin > `${anio + 1}-04-30`) estado = { tipo: "fuera-de-periodo" };
  else if (p.notificado) estado = { tipo: "notificado" };
  else if (p.hoyISO > avisarAntesDe) estado = { tipo: "aviso-vencido" };
  else if (diasEntre(p.hoyISO, avisarAntesDe) <= 7)
    estado = { tipo: "avisar-ya", limite: avisarAntesDe, faltan: diasEntre(p.hoyISO, avisarAntesDe) };
  else estado = { tipo: "en-regla", limite: avisarAntesDe };
  return { ...base, estado };
}

export const fechaCorta = (iso: string) => {
  const [a, m, d] = iso.split("-").map(Number);
  return `${d}/${m}/${a}`;
};

const DIAS_SEMANA = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

export const fechaLarga = (iso: string) => {
  const [a, m, d] = iso.split("-").map(Number);
  return `${DIAS_SEMANA[diaSemana(iso)]} ${d} de ${MESES[m - 1]} de ${a}`;
};

export const fechaConDia = (iso: string) => {
  const [, m, d] = iso.split("-").map(Number);
  return `${DIAS_SEMANA[diaSemana(iso)]} ${d} de ${MESES[m - 1]}`;
};

/** Texto de la columna «Estado» de la planilla (el check compara letra por letra). */
export function textoEstado(e: Estado): string {
  switch (e.tipo) {
    case "sin-dias":
      return "Todavía no generó días de vacaciones (art. 153)";
    case "sin-inicio":
      return "Falta la fecha de inicio";
    case "no-es-lunes":
      return "Tiene que empezar un lunes (o el hábil siguiente si es feriado)";
    case "tramo-corto":
      return "Cada tramo tiene que ser de 7 días o más";
    case "fuera-de-periodo":
      return "Fuera del 1/10 al 30/4: sólo con acuerdo por escrito";
    case "notificado":
      return "Notificado";
    case "aviso-vencido":
      return "Aviso fuera de plazo: notificá hoy o acordá otra fecha";
    case "avisar-ya":
      return `Notificá ya: el plazo vence el ${fechaCorta(e.limite)}`;
    case "en-regla":
      return `En regla: notificar hasta el ${fechaCorta(e.limite)}`;
  }
}
