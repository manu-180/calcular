import { ErrorEntrada } from "@/motor/calculo";

// A Lei do Trabalho não fixa a fórmula do valor da hora. Usa-se a conta habitual: o salário de um ano
// dividido pelas horas de 52 semanas do período normal de trabalho.
export function valorHora(salarioMensal: number, horasSemanais: number): number {
  if (horasSemanais <= 0) throw new ErrorEntrada("Indique as horas do período normal de trabalho por semana.", "horasSemanais");
  return (salarioMensal * 12) / (52 * horasSemanais);
}

export const NOTA_VALOR_HORA = "A lei não fixa a fórmula do valor da hora. A calculadora usa salário × 12 ÷ (52 × horas semanais); um instrumento colectivo pode fixar outra.";
