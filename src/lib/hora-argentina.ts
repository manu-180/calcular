// La hora argentina sale del tzdata (America/Argentina/Buenos_Aires), no de restar
// 3 horas: el país ya tuvo horario de verano (2007-2009) y puede volver a cambiar.
// Sólo se piden partes NUMÉRICAS a Intl: son iguales en cualquier ICU, así el texto
// que se arma con ellas no rompe la hidratación (ver panel/formato.ts).
export const ZONA_AR = "America/Argentina/Buenos_Aires";

const MIN_MS = 60_000;

const fmt = new Intl.DateTimeFormat("en-US", {
  timeZone: ZONA_AR,
  hourCycle: "h23",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

function pared(t: number): number {
  const p: Record<string, string> = {};
  for (const x of fmt.formatToParts(new Date(t))) p[x.type] = x.value;
  return Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), Number(p.hour), Number(p.minute), Number(p.second));
}

/** Offset de Argentina en `t`, en ms (hoy -3 h). */
export function offsetAR(t: number): number {
  return Math.round((pared(t) - t) / MIN_MS) * MIN_MS;
}

/** El instante corrido a la hora de pared argentina: se lee con getUTC*. */
export function enHoraAR(t: number | Date): Date {
  const ms = typeof t === "number" ? t : t.getTime();
  return new Date(ms + offsetAR(ms));
}

/** "AAAA-MM-DD" de hoy (o de `t`) en Argentina. */
export function diaAR(t: number = Date.now()): string {
  return enHoraAR(t).toISOString().slice(0, 10);
}

/** Instante de la medianoche argentina de "AAAA-MM-DD". */
export function medianocheAR(dia: string): Date {
  const p = Date.parse(`${dia}T00:00:00Z`);
  if (Number.isNaN(p)) return new Date(Number.NaN);
  return new Date(p - offsetAR(p - offsetAR(p)));
}
