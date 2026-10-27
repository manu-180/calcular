import { ErrorEntrada } from "@/motor/calculo";
import type { Campo, FechaISO } from "@/motor/tipos";

const DIA_MS = 86400000;

export function diasEntre(desde: FechaISO, hasta: FechaISO): number {
  const a = Date.UTC(Number(desde.slice(0, 4)), Number(desde.slice(5, 7)) - 1, Number(desde.slice(8, 10)));
  const b = Date.UTC(Number(hasta.slice(0, 4)), Number(hasta.slice(5, 7)) - 1, Number(hasta.slice(8, 10)));
  return Math.round((b - a) / DIA_MS);
}

export function sumarDias(fecha: FechaISO, dias: number): FechaISO {
  const ms = Date.UTC(Number(fecha.slice(0, 4)), Number(fecha.slice(5, 7)) - 1, Number(fecha.slice(8, 10))) + dias * DIA_MS;
  return new Date(ms).toISOString().slice(0, 10) as FechaISO;
}

// Años de servicio: días corridos ÷ 365, menos la licencia sin goce que no cuenta para la gratificación
// (arts. 80 y 83). La ley paga las fracciones de año en proporción (art. 61) sin fijar otro divisor.
export function aniosServicio(inicio: FechaISO, fin: FechaISO, sinGoce: number): { dias: number; anios: number } {
  const dias = diasEntre(inicio, fin);
  if (dias <= 0) throw new ErrorEntrada("يجب أن يكون تاريخ انتهاء الخدمة بعد تاريخ بدايتها.", "fin");
  const efectivos = dias - sinGoce;
  if (efectivos <= 0) throw new ErrorEntrada("أيام الإجازة بدون أجر أكثر من مدة الخدمة.", "sinGoce");
  return { dias: efectivos, anios: efectivos / 365 };
}

export const CAMPO_INICIO = { id: "inicio", tipo: "fecha", etiqueta: "تاريخ بداية الخدمة", porDefecto: "2020-01-01" } as const satisfies Campo;
export const CAMPO_FIN = { id: "fin", tipo: "fecha", etiqueta: "تاريخ انتهاء الخدمة", porDefecto: "hoy" } as const satisfies Campo;

export const CAMPO_SIN_GOCE = {
  id: "sinGoce",
  tipo: "entero",
  etiqueta: "أيام الإجازة الخاصة بدون أجر",
  ayuda: "تدخل في مدة الخدمة لكنها لا تُحسب في مكافأة نهاية الخدمة (المادتان 80 و83).",
  min: 0,
  porDefecto: 0,
} as const satisfies Campo;

// La ley no dice entre cuántos días se divide el salario mensual para sacar el diario. Se le pregunta a
// la persona y se propone 30, que es lo que usa este sitio si el contrato no dice otra cosa.
export const CAMPO_DIAS_MES = {
  id: "diasMes",
  tipo: "entero",
  etiqueta: "عدد الأيام التي يُقسم عليها الأجر الشهري",
  ayuda: "قانون العمل لا يحدد طريقة احتساب أجر اليوم. اكتب ما ينص عليه عقدك، وإن لم ينص على شيء فالحاسبة تفترض 30 يومًا.",
  min: 1,
  max: 31,
  porDefecto: 30,
} as const satisfies Campo;
