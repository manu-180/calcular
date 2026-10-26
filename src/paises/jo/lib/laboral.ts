import { ErrorEntrada } from "@/motor/calculo";
import type { Campo, FechaISO } from "@/motor/tipos";

// La ley no fija un divisor para pasar el salario mensual a diario: se usa 30, el mes comercial.
export const DIAS_MES = 30;

export const CAMPO_ULTIMO_SALARIO = {
  id: "salario",
  tipo: "moneda",
  etiqueta: "آخر أجر شهري",
  ayuda: "الأجر الذي تقاضيته آخر مرة، مع العلاوات الثابتة التي تُدفع كل شهر.",
  min: 0,
  porDefecto: 600,
} as const satisfies Campo;

const DIA_MS = 86400000;

function utc(f: FechaISO): number {
  return Date.UTC(Number(f.slice(0, 4)), Number(f.slice(5, 7)) - 1, Number(f.slice(8, 10)));
}

export function diasEntre(desde: FechaISO, hasta: FechaISO): number {
  return Math.round((utc(hasta) - utc(desde)) / DIA_MS);
}

export function sumarDias(fecha: FechaISO, dias: number): FechaISO {
  return new Date(utc(fecha) + dias * DIA_MS).toISOString().slice(0, 10) as FechaISO;
}

// Fecha más N meses calendario (el día se ajusta al último del mes si no existe).
export function sumarMeses(fecha: FechaISO, meses: number): FechaISO {
  const a = Number(fecha.slice(0, 4));
  const m = Number(fecha.slice(5, 7)) - 1 + meses;
  const d = Number(fecha.slice(8, 10));
  const ultimo = new Date(Date.UTC(a, m + 1, 0)).getUTCDate();
  return new Date(Date.UTC(a, m, Math.min(d, ultimo))).toISOString().slice(0, 10) as FechaISO;
}

// Años de servicio: días corridos ÷ 365. La ley paga las fracciones de año en proporción (art. 32).
export function aniosServicio(inicio: FechaISO, fin: FechaISO): { dias: number; anios: number } {
  const dias = diasEntre(inicio, fin);
  if (dias <= 0) throw new ErrorEntrada("يجب أن يكون تاريخ انتهاء الخدمة بعد تاريخ بدايتها.", "fin");
  return { dias, anios: dias / 365 };
}
