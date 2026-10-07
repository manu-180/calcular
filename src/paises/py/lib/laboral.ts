import { enMapa } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { aniosCumplidos, finDeServicio, sumarMeses, type Antiguedad } from "./fechas";

// Código del Trabajo, art. 87: "hasta un año", "de más de un año y hasta cinco"... Un día pasado el
// aniversario ya es "más de".
export function clavePreaviso(a: Antiguedad): string {
  const mas = (n: number) => a.anios > n || (a.anios === n && a.conFraccion);
  if (mas(10)) return "mas-10";
  if (mas(5)) return "hasta-10";
  if (mas(1)) return "hasta-5";
  return "hasta-1";
}

export function diasPreaviso(mapa: Readonly<Record<string, number>>, a: Antiguedad): number {
  return enMapa(mapa, clavePreaviso(a));
}

// Art. 218 (Ley 496): los días dependen de los años que la persona tiene al cumplir el año de servicio.
export function claveVacaciones(anios: number): string {
  if (anios > 10) return "mas-10";
  if (anios > 5) return "hasta-10";
  return "hasta-5";
}

// Art. 91 (Ley 496): "por cada año de servicio o fracción superior a seis meses".
export function aniosIndemnizables(ingreso: FechaISO, egreso: FechaISO): number {
  const fin = finDeServicio(egreso);
  const anios = aniosCumplidos(ingreso, fin);
  return fin > sumarMeses(ingreso, anios * 12 + 6) ? anios + 1 : anios;
}
