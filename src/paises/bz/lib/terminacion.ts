import type { FechaISO } from "@/motor/tipos";
import { aniosCompletos } from "./pago";

export const MOTIVOS_SEVERANCE = [
  { valor: "empleador", etiqueta: "My employer ended the job without dismissing me for cause" },
  { valor: "retiro", etiqueta: "I retired at 60 or older, or left on medical grounds" },
  { valor: "renuncia", etiqueta: "I resigned after at least 10 years of service" },
  { valor: "plazo", etiqueta: "My fixed-term contract ended" },
] as const;

export type MotivoSeverance = (typeof MOTIVOS_SEVERANCE)[number]["valor"];

// Sección 183(3)(i) y (ii): el servicio anterior al 1 de mayo de 2011 se paga a una semana por año
// completo y el posterior a dos, cuando el trabajador pasa de diez años.
export const CORTE_2011: FechaISO = "2011-05-01";

export interface ParametrosSeverance {
  semanasMedio: number;
  semanasLargo: number;
  aniosMinimo: number;
  aniosLargo: number;
}

export interface ResultadoSeverance {
  anios: number;
  semanas: number;
  aplica: boolean;
}

export function semanasDeSeverance(inicio: FechaISO, fin: FechaISO, motivo: MotivoSeverance, p: ParametrosSeverance): ResultadoSeverance {
  const anios = aniosCompletos(inicio, fin);
  if (anios < p.aniosMinimo) return { anios, semanas: 0, aplica: false };
  if (anios <= p.aniosLargo) {
    const aplica = motivo === "empleador" || motivo === "retiro";
    return { anios, semanas: aplica ? anios * p.semanasMedio : 0, aplica };
  }
  if (inicio >= CORTE_2011) return { anios, semanas: anios * p.semanasLargo, aplica: true };
  const antes = fin <= CORTE_2011 ? anios : aniosCompletos(inicio, CORTE_2011);
  return { anios, semanas: antes * p.semanasMedio + (anios - antes) * p.semanasLargo, aplica: true };
}
