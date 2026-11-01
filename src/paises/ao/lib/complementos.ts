import { ErrorEntrada } from "@/motor/calculo";

// Lei Geral do Trabalho, artigo 238.º: um mínimo legal sobre o salário-base por ano de serviço,
// proporcional aos meses completos quando não se chegou a um ano. O contrato pode pagar mais.
export function complementoAnual(
  salarioBase: number,
  percentagem: number,
  minimo: number,
  meses: number,
): { valor: number; percentagem: number; observaciones: string[] } {
  if (meses < 1 || meses > 12) throw new ErrorEntrada("Indique de 1 a 12 meses completos de serviço.", "meses");
  if (percentagem < minimo) {
    throw new ErrorEntrada(`A lei garante pelo menos ${String(minimo).replace(".", ",")} % do salário base. Indique essa percentagem ou uma maior.`, "percentagem");
  }
  const observaciones: string[] = [];
  if (meses < 12) observaciones.push(`Valor proporcional a ${meses} ${meses === 1 ? "mês completo" : "meses completos"} de serviço.`);
  return { valor: (salarioBase * percentagem * meses) / (100 * 12), percentagem, observaciones };
}
