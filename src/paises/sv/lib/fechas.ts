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

// Desde el D.L. 669 de 2026 el año del aguinaldo se cuenta al 12 de diciembre (arts. 197 y 202): el
// proporcional cubre lo trabajado desde el 13 de diciembre anterior, o desde el ingreso si es posterior.
export function diasPeriodoAguinaldo(inicio: FechaISO, ultimoDia: FechaISO): number {
  const anio = Number(ultimoDia.slice(0, 4));
  const corte = `${anio}-12-12` as FechaISO;
  const desdeCorte = ultimoDia > corte ? sumarDias(corte, 1) : (`${anio - 1}-12-13` as FechaISO);
  const desde = inicio > desdeCorte ? inicio : desdeCorte;
  return diasEntre(desde, sumarDias(ultimoDia, 1));
}

export type TramoAguinaldo = "uno-a-tres" | "tres-a-diez" | "diez-o-mas";

// Con menos de un año el art. 197 paga la parte proporcional de lo que tocaría al cumplirlo: 15 días.
export function tramoAguinaldo(anios: number): TramoAguinaldo {
  if (anios >= 10) return "diez-o-mas";
  if (anios >= 3) return "tres-a-diez";
  return "uno-a-tres";
}

export function textoServicio(s: Servicio): string {
  const anios = `${s.anios} ${s.anios === 1 ? "año" : "años"}`;
  const dias = `${s.diasRestantes} ${s.diasRestantes === 1 ? "día" : "días"}`;
  return `${anios} y ${dias}`;
}
