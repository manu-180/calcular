import { definirCasos } from "@/motor/calculo";
import subsidioDeDesemprego from "./subsidio-de-desemprego";

const DL = "https://diariodarepublica.pt/dr/legislacao-consolidada/decreto-lei/2006-34533075";

export default definirCasos(subsidioDeDesemprego, [
  {
    nombre: "1 500 € com subsídios: limite de 75 % do líquido",
    origen: {
      tipo: "recalculado",
      url: DL,
      detalle: "R = 1500 × 14 = 21 000; referência 1750; 65 % = 1137,50. Retenção na tabela I de 1500 = 168,17 (11,21 %). Líquido 1750 × (1 − 0,11 − 0,1121) = 1361,30; 75 % = 1020,98.",
    },
    fecha: "2026-10-14",
    entrada: { salario: 1500, subsidios: true },
    esperado: { referencia: 1750, base: 1137.5, mensal: 1020.98, diario: 34.03 },
  },
  {
    nombre: "Salário mínimo: 65 % da referência",
    origen: { tipo: "recalculado", url: DL, detalle: "Referência 920 × 14 / 12 = 1073,33; 65 % = 697,67, abaixo de 75 % do líquido (716,45) e acima de 1,15 IAS (617,70)." },
    fecha: "2026-10-14",
    entrada: { salario: 920, subsidios: true },
    esperado: { mensal: 697.67 },
  },
  {
    nombre: "Salário alto: máximo de 2,5 IAS",
    origen: { tipo: "recalculado", url: DL, detalle: "75 % do líquido de 4666,67 dá 2191,02, acima de 2,5 × 537,13 = 1342,83." },
    fecha: "2026-10-14",
    entrada: { salario: 4000, subsidios: true },
    esperado: { mensal: 1342.83 },
  },
  {
    nombre: "Salário baixo sem subsídios: mínimo do IAS limitado ao líquido",
    origen: { tipo: "recalculado", url: DL, detalle: "Referência 600; 65 % = 390, sobe para o IAS (537,13) mas não pode passar o líquido 600 × 0,89 = 534 (artigo 29.º, n.º 3)." },
    fecha: "2026-10-14",
    entrada: { salario: 600, subsidios: false },
    esperado: { mensal: 534 },
  },
]);
