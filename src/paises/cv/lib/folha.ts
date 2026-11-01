import { ErrorEntrada } from "@/motor/calculo";

// Código Laboral, artigo 210.º: retribuição horária = (R × 12) / (52 × N).
export function salarioHora(salarioMensal: number, horasSemanais: number, semanasAno: number): number {
  if (horasSemanais <= 0) throw new ErrorEntrada("Indique as horas do período normal de trabalho por semana.", "horasSemanais");
  return (salarioMensal * 12) / (semanasAno * horasSemanais);
}

export interface FormulaIrps {
  taxas: Readonly<Record<string, number>>;
  parcelas: Readonly<Record<string, number>>;
  limites: Readonly<Record<string, number>>;
  limiteRetencao: number;
  minima: number;
}

export type Escalao = "escalao1" | "escalao2" | "escalao3";

export function escalaoIrps(bruto: number, limites: Readonly<Record<string, number>>): Escalao {
  if (bruto <= limites.escalao1) return "escalao1";
  if (bruto <= limites.escalao2) return "escalao2";
  return "escalao3";
}

// Código do IRPS, artigo 71.º, n.os 4, 7 e 8: IR = taxa × Rm menos a parcela do escalão; sem retenção até
// ao limite de isenção; e, havendo retenção, nunca menos de 100$00.
export function retencaoIrps(bruto: number, f: FormulaIrps): { retencao: number; escalao: Escalao | null } {
  if (bruto <= f.limiteRetencao) return { retencao: 0, escalao: null };
  const escalao = escalaoIrps(bruto, f.limites);
  const formula = (bruto * f.taxas[escalao]) / 100 - f.parcelas[escalao];
  return { retencao: Math.max(f.minima, formula), escalao };
}
