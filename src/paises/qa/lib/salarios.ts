import { ErrorEntrada } from "@/motor/calculo";
import type { Campo } from "@/motor/tipos";

// La Ley del Trabajo fija la gratificación, las vacaciones y el preaviso en semanas o meses de salario
// básico, pero no dice cómo pasar el salario mensual a semanal: se le pregunta a la persona el método
// de su contrato en vez de elegir uno.
export const CAMPO_SEMANAL = {
  id: "metodoSemanal",
  tipo: "opcion",
  etiqueta: "How to turn a monthly wage into a weekly wage",
  ayuda: "The Labour Law sets these amounts in weeks of basic wage but doesn't say how to convert a monthly wage. Use the method in your contract or your employer's policy.",
  opciones: [
    { valor: "30", etiqueta: "Monthly wage ÷ 30 × 7" },
    { valor: "52", etiqueta: "Monthly wage × 12 ÷ 52" },
  ],
  porDefecto: "30",
} as const satisfies Campo;

export const CAMPO_DIARIO = {
  id: "metodoDiario",
  tipo: "opcion",
  etiqueta: "How to turn a monthly wage into a daily wage",
  ayuda: "The law sets this leave in days but doesn't say how to convert a monthly wage. Use the method in your contract or your employer's policy.",
  opciones: [
    { valor: "30", etiqueta: "Monthly wage ÷ 30" },
    { valor: "365", etiqueta: "Monthly wage × 12 ÷ 365" },
  ],
  porDefecto: "30",
} as const satisfies Campo;

export function salarioSemanal(mensual: number, metodo: string, campo = "basico"): number {
  if (mensual <= 0) throw new ErrorEntrada("Enter the monthly basic wage.", campo);
  return metodo === "52" ? (mensual * 12) / 52 : (mensual / 30) * 7;
}

export function salarioDiario(mensual: number, metodo: string, campo = "salario"): number {
  if (mensual <= 0) throw new ErrorEntrada("Enter the monthly wage.", campo);
  return metodo === "365" ? (mensual * 12) / 365 : mensual / 30;
}
