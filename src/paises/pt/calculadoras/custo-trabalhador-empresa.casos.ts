import { definirCasos } from "@/motor/calculo";
import custoTrabalhadorEmpresa from "./custo-trabalhador-empresa";

const CC = "https://diariodarepublica.pt/dr/legislacao-consolidada/lei/2009-34514575";

export default definirCasos(custoTrabalhadorEmpresa, [
  {
    nombre: "1 500 € por mês, sem outros custos",
    origen: { tipo: "recalculado", url: CC, detalle: "TSU 1500 × 23,75 % = 356,25. Anual (1500 + 356,25) × 14 = 25 987,50. Média 2165,63." },
    fecha: "2026-10-14",
    entrada: { salario: 1500, outros: 0 },
    esperado: { tsuMensal: 356.25, mesComTsu: 1856.25, anual: 25987.5, mediaMensal: 2165.63 },
  },
  {
    nombre: "Salário mínimo com 120 € de outros custos",
    origen: { tipo: "recalculado", url: CC, detalle: "TSU 920 × 23,75 % = 218,50. (920 + 218,50) × 14 + 120 × 12 = 15 939 + 1440 = 17 379." },
    fecha: "2026-10-14",
    entrada: { salario: 920, outros: 120 },
    esperado: { tsuMensal: 218.5, anual: 17379 },
  },
]);
