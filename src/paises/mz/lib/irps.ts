import { aplicarEscala } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

export const REQUISITOS_IRPS = {
  "mz.irps-retencao-0": "escala",
  "mz.irps-retencao-1": "escala",
  "mz.irps-retencao-2": "escala",
  "mz.irps-retencao-3": "escala",
  "mz.irps-retencao-4": "escala",
} as const;

export type TabelasIrps = Record<keyof typeof REQUISITOS_IRPS, readonly FilaEscala[]>;

export const OPCOES_DEPENDENTES = [
  { valor: "0", etiqueta: "Nenhum" },
  { valor: "1", etiqueta: "1" },
  { valor: "2", etiqueta: "2" },
  { valor: "3", etiqueta: "3" },
  { valor: "4", etiqueta: "4 ou mais" },
] as const;

export type Dependentes = (typeof OPCOES_DEPENDENTES)[number]["valor"];

// Artigo 65-A do Código do IRPS: valor fixo do intervalo mais o coeficiente sobre a diferença entre
// a remuneração e o limite inferior. Cada linha começa no próprio limite («De 20.250,00 até ...»),
// que é o critério de aplicarEscala.
export function retencaoIrps(tabelas: TabelasIrps, dependentes: Dependentes, remuneracao: number): number {
  return aplicarEscala(tabelas[`mz.irps-retencao-${dependentes}`], remuneracao);
}

export function linhaIrps(tabelas: TabelasIrps, dependentes: Dependentes, remuneracao: number): FilaEscala {
  const tabela = tabelas[`mz.irps-retencao-${dependentes}`];
  let fila = tabela[0];
  for (const f of tabela) if (remuneracao >= f.desde) fila = f;
  return fila;
}
