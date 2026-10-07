import { diasEntre } from "@/motor/vigencia";
import type { FechaISO } from "@/motor/tipos";

function partes(f: FechaISO): [number, number, number] {
  const [a, m, d] = f.split("-").map(Number);
  return [a, m, d];
}

export function fecha(anio: number, mes: number, dia: number): FechaISO {
  return `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}` as FechaISO;
}

export function aniosCumplidos(desde: FechaISO, hasta: FechaISO): number {
  const [a1, m1, d1] = partes(desde);
  const [a2, m2, d2] = partes(hasta);
  let anios = a2 - a1;
  if (m2 < m1 || (m2 === m1 && d2 < d1)) anios--;
  return Math.max(0, anios);
}

// "Por cada año o fracción" (Ley 10.489): un día pasado el aniversario ya suma un año entero.
export function aniosOFraccion(desde: FechaISO, hasta: FechaISO): number {
  const cumplidos = aniosCumplidos(desde, hasta);
  const [a1, m1, d1] = partes(desde);
  const aniversario = fecha(a1 + cumplidos, m1, d1);
  return aniversario < hasta ? cumplidos + 1 : Math.max(cumplidos, 1);
}

export function diasInclusive(desde: FechaISO, hasta: FechaISO): number {
  return diasEntre(desde, hasta) + 1;
}

export function mayor(a: FechaISO, b: FechaISO): FechaISO {
  return a > b ? a : b;
}
