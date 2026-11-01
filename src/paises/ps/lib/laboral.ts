import { ErrorEntrada } from "@/motor/calculo";
import type { Campo, FechaISO } from "@/motor/tipos";

// La ley no fija divisor para el jornal: se usa el mes comercial de 30 días.
export const DIAS_MES = 30;
// La ley cuenta la licencia anual y la de maternidad en semanas: el salario semanal es el mensual por 12
// meses entre 52 semanas.
export const SEMANAS_ANIO = 52;

export const CAMPO_ULTIMO_SALARIO = {
  id: "salario",
  tipo: "moneda",
  etiqueta: "آخر أجر شهري",
  ayuda: "الأجر الأساسي مع العلاوات الثابتة التي تُدفع كل شهر، دون أجر الساعات الإضافية.",
  min: 0,
  porDefecto: 3000,
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

// Fecha más N meses calendario (si el día no existe en el mes de llegada, queda el último del mes).
export function sumarMeses(fecha: FechaISO, meses: number): FechaISO {
  const a = Number(fecha.slice(0, 4));
  const m = Number(fecha.slice(5, 7)) - 1 + meses;
  const d = Number(fecha.slice(8, 10));
  const ultimo = new Date(Date.UTC(a, m + 1, 0)).getUTCDate();
  return new Date(Date.UTC(a, m, Math.min(d, ultimo))).toISOString().slice(0, 10) as FechaISO;
}

export function salarioSemanal(mensual: number): number {
  return (mensual * 12) / SEMANAS_ANIO;
}

// Años de servicio: días corridos entre 365. La ley paga las fracciones de año (art. 45).
export function aniosServicio(inicio: FechaISO, fin: FechaISO): { dias: number; anios: number } {
  const dias = diasEntre(inicio, fin);
  if (dias <= 0) throw new ErrorEntrada("يجب أن يكون تاريخ انتهاء العمل بعد تاريخ بدايته.", "fin");
  return { dias, anios: dias / 365 };
}

// Parte de la مكافأة نهاية الخدمة que cobra quien renuncia (art. 42.2): un tercio en los primeros cinco
// años, dos tercios en los cinco siguientes y entera desde los diez.
export function parteRenuncia(anios: number, limites: { third: number; full: number }): number {
  if (anios >= limites.full) return 1;
  if (anios >= limites.third) return 2 / 3;
  return 1 / 3;
}
