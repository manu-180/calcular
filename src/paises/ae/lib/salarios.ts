import { ErrorEntrada } from "@/motor/calculo";
import type { Campo } from "@/motor/tipos";

// La Ley Laboral fija montos en "días de salario" pero no dice cómo pasar el salario mensual a
// diario: no se elige un método por la persona, se le pregunta el de su contrato.
export const CAMPO_DIARIO = {
  id: "metodoDiario",
  tipo: "opcion",
  etiqueta: "How to turn a monthly wage into a daily wage",
  ayuda: "The Labour Law sets these amounts in days of wage but doesn't say how to convert a monthly wage. Use the method in your contract or your employer's policy.",
  opciones: [
    { valor: "30", etiqueta: "Monthly wage ÷ 30" },
    { valor: "365", etiqueta: "Monthly wage × 12 ÷ 365" },
  ],
  porDefecto: "30",
} as const satisfies Campo;

export function salarioDiario(mensual: number, metodo: string, campo = "basico"): number {
  if (mensual <= 0) throw new ErrorEntrada("Enter the monthly wage.", campo);
  return metodo === "365" ? (mensual * 12) / 365 : mensual / 30;
}
