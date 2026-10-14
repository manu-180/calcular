import type { FechaISO } from "../../tipos";

const MS_DIA = 86_400_000;

// Días desde 1970-01-01 en UTC. Todas las cuentas de fechas de las universales van en este número
// entero: así no hay hora local ni cambios de horario que corran un día.
export function aDia(fecha: string): number {
  const [y, m, d] = fecha.split("-").map(Number);
  return Math.round(Date.UTC(y, m - 1, d) / MS_DIA);
}

export function aFecha(dia: number): FechaISO {
  return new Date(dia * MS_DIA).toISOString().slice(0, 10) as FechaISO;
}

// 0 = domingo … 6 = sábado (1970-01-01 fue jueves).
export function diaDeSemana(dia: number): number {
  return (((dia + 4) % 7) + 7) % 7;
}

export function esHabil(dia: number): boolean {
  const s = diaDeSemana(dia);
  return s !== 0 && s !== 6;
}

// Suma meses y, si el día no existe en el mes de llegada, toma el último (31/1 + 1 mes = 28/2 o 29/2).
export function sumarMeses(fecha: string, meses: number): number {
  const [y, m, d] = fecha.split("-").map(Number);
  const total = m - 1 + meses;
  const anio = y + Math.floor(total / 12);
  const mes = ((total % 12) + 12) % 12;
  const ultimo = new Date(Date.UTC(anio, mes + 1, 0)).getUTCDate();
  return Math.round(Date.UTC(anio, mes, Math.min(d, ultimo)) / MS_DIA);
}

// Meses enteros y días que sobran entre dos fechas (desde <= hasta).
export function mesesYDias(desde: string, hasta: string): { meses: number; dias: number } {
  const [y1, m1] = desde.split("-").map(Number);
  const [y2, m2] = hasta.split("-").map(Number);
  const fin = aDia(hasta);
  let meses = (y2 - y1) * 12 + (m2 - m1);
  if (sumarMeses(desde, meses) > fin) meses--;
  return { meses, dias: fin - sumarMeses(desde, meses) };
}

export function fechaLarga(locale: string, fecha: string): string {
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${fecha}T12:00:00Z`));
}

// Lunes a viernes en [desde, hasta): cuenta el primer día y no el último.
export function habilesEntre(desde: number, hasta: number): number {
  const n = hasta - desde;
  if (n <= 0) return 0;
  const semanas = Math.floor(n / 7);
  let total = semanas * 5;
  for (let d = desde + semanas * 7; d < hasta; d++) if (esHabil(d)) total++;
  return total;
}
