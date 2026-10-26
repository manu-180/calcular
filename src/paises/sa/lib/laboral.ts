import { enMapa, ErrorEntrada } from "@/motor/calculo";
import type { Campo, FechaISO } from "@/motor/tipos";

type Mapa = Readonly<Record<string, number>>;

export const MOTIVO_FIN = {
  id: "motivo",
  tipo: "opcion",
  etiqueta: "سبب انتهاء العلاقة",
  opciones: [
    { valor: "termination", etiqueta: "انتهاء مدة العقد أو إنهاؤه من صاحب العمل" },
    { valor: "resignation", etiqueta: "استقالة العامل" },
    { valor: "full-exception", etiqueta: "ترك العمل لقوة قاهرة، أو إنهاء العاملة العقد خلال 6 أشهر من زواجها أو 3 أشهر من وضعها" },
    { valor: "article-80", etiqueta: "فسخ العقد من صاحب العمل وفق المادة الثمانين" },
  ],
  porDefecto: "termination",
} as const satisfies Campo;

export const CAMPO_SALARIO_FINAL = {
  id: "salario",
  tipo: "moneda",
  etiqueta: "آخر أجر شهري",
  ayuda: "الأجر الفعلي الأخير: الأساسي مع البدلات الثابتة مثل السكن والنقل. يجوز الاتفاق على استبعاد العمولات المتغيرة (المادة السادسة والثمانون).",
  min: 0,
  porDefecto: 12000,
} as const satisfies Campo;

const DIA_MS = 86400000;

export function diasEntre(desde: FechaISO, hasta: FechaISO): number {
  const a = Date.UTC(Number(desde.slice(0, 4)), Number(desde.slice(5, 7)) - 1, Number(desde.slice(8, 10)));
  const b = Date.UTC(Number(hasta.slice(0, 4)), Number(hasta.slice(5, 7)) - 1, Number(hasta.slice(8, 10)));
  return Math.round((b - a) / DIA_MS);
}

// Años de servicio: días corridos ÷ 365, menos las ausencias sin goce que la persona indique. La ley
// paga las fracciones de año en proporción (art. 84) y no fija otro divisor.
export function aniosServicio(inicio: FechaISO, fin: FechaISO, ausencias: number): { dias: number; anios: number } {
  const dias = diasEntre(inicio, fin);
  if (dias <= 0) throw new ErrorEntrada("يجب أن يكون تاريخ انتهاء الخدمة بعد تاريخ بدايتها.", "fin");
  const netos = Math.max(0, dias - ausencias);
  return { dias: netos, anios: netos / 365 };
}

// Art. 85: en la renuncia, un tercio entre 2 y 5 años, dos tercios de más de 5 a menos de 10, entera
// desde 10. El mapa guarda el numerador en tercios.
export function parteRenuncia(anios: number, t: Mapa): number {
  if (anios < 2) return enMapa(t, "under-2") / 3;
  if (anios <= 5) return enMapa(t, "2-to-5") / 3;
  if (anios < 10) return enMapa(t, "5-to-10") / 3;
  return enMapa(t, "10-plus") / 3;
}

export interface Eos {
  completa: number;
  factor: number;
  monto: number;
  meses: number;
}

export function mmkafaa(salario: number, anios: number, motivo: string, eos: Mapa, renuncia: Mapa): Eos {
  const meses = Math.min(anios, 5) * enMapa(eos, "first-5-years") + Math.max(0, anios - 5) * enMapa(eos, "after-5-years");
  const completa = meses * salario;
  const factor = motivo === "article-80" ? 0 : motivo === "resignation" ? parteRenuncia(anios, renuncia) : 1;
  return { completa, factor, monto: completa * factor, meses };
}

export function salarioDiario(mensual: number, diasMes: number): number {
  return mensual / diasMes;
}
