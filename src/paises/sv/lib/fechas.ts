import { diasEntre, sumarDias } from "@/motor/vigencia";
import type { FechaISO } from "@/motor/tipos";

function diasDelMes(anio: number, mes: number): number {
  return [31, anio % 4 === 0 && (anio % 100 !== 0 || anio % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mes - 1];
}

function sumarAnios(f: FechaISO, anios: number): FechaISO {
  const [a, m, d] = f.split("-").map(Number);
  const anio = a + anios;
  return `${anio}-${String(m).padStart(2, "0")}-${String(Math.min(d, diasDelMes(anio, m))).padStart(2, "0")}` as FechaISO;
}

export interface Servicio {
  anios: number;
  diasRestantes: number;
}

// Del primer al último día trabajado, los dos incluidos: del 1/3/2020 al 28/2/2026 son 6 años justos.
// Los días que sobran después del último aniversario son la fracción de año (art. 58 del Código).
export function servicio(inicio: FechaISO, ultimoDia: FechaISO): Servicio {
  const fin = sumarDias(ultimoDia, 1);
  let anios = 0;
  while (sumarAnios(inicio, anios + 1) <= fin) anios++;
  return { anios, diasRestantes: diasEntre(sumarAnios(inicio, anios), fin) };
}

export function textoServicio(s: Servicio): string {
  const anios = `${s.anios} ${s.anios === 1 ? "año" : "años"}`;
  const dias = `${s.diasRestantes} ${s.diasRestantes === 1 ? "día" : "días"}`;
  return `${anios} y ${dias}`;
}
