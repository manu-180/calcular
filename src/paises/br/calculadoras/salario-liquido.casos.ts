import { definirCasos } from "@/motor/calculo";
import salarioLiquido from "./salario-liquido";

export default definirCasos(salarioLiquido, [
  {
    nombre: "R$ 5.000 por mês: o imposto zera com a redução",
    origen: {
      tipo: "recalculado",
      detalle:
        "INSS 2026: 1621 × 7,5 % = 121,575; (2902,84 − 1621) × 9 % = 115,3656; (4354,27 − 2902,84) × 12 % = 174,1716; (5000 − 4354,27) × 14 % = 90,4022; total 501,51. Desconto simplificado 607,20 é maior: base 4392,80 × 22,5 % − 675,49 = 312,89, zerado pela redução. Líquido 5000 − 501,51 = 4498,49.",
    },
    fecha: "2026-10-14",
    entrada: { salarioBruto: 5000, dependentes: 0, pensao: 0, outrosDescontos: 0 },
    esperado: { inss: 501.51, base: 4392.8, impostoTabela: 312.89, reducao: 312.89, irrf: 0, liquido: 4498.49 },
  },
  {
    nombre: "R$ 6.000 por mês com redução parcial",
    origen: {
      tipo: "recalculado",
      detalle:
        "INSS: 121,575 + 115,3656 + 174,1716 + (6000 − 4354,27) × 14 % = 641,51. Deduções legais 641,51 > 607,20. Base 5358,49 × 27,5 % − 908,73 = 564,85. Redução 978,62 − 0,133145 × 6000 = 179,75. IRRF 385,10. Líquido 6000 − 641,51 − 385,10 = 4973,39.",
    },
    fecha: "2026-10-14",
    entrada: { salarioBruto: 6000, dependentes: 0, pensao: 0, outrosDescontos: 0 },
    esperado: { inss: 641.51, deducao: 641.51, base: 5358.49, impostoTabela: 564.85, reducao: 179.75, irrf: 385.1, liquido: 4973.39 },
  },
  {
    nombre: "R$ 10.000 com dois dependentes: INSS no teto e sem redução",
    origen: {
      tipo: "recalculado",
      detalle:
        "INSS no teto: 121,575 + 115,3656 + 174,1716 + (8475,55 − 4354,27) × 14 % = 988,09. Deduções 988,09 + 2 × 189,59 = 1367,27. Base 8632,73 × 27,5 % − 908,73 = 1465,27. Acima de 7350 não há redução. Líquido 10000 − 988,09 − 1465,27 = 7546,64.",
    },
    fecha: "2026-10-14",
    entrada: { salarioBruto: 10000, dependentes: 2, pensao: 0, outrosDescontos: 0 },
    esperado: { inss: 988.09, deducao: 1367.27, irrf: 1465.27, liquido: 7546.64 },
  },
  {
    nombre: "Salário mínimo com vale-transporte",
    origen: { tipo: "recalculado", detalle: "INSS 1621 × 7,5 % = 121,58 (121,575 arredondado). Sem IRRF. Vale-transporte de 6 %: 97,26. Líquido 1621 − 121,58 − 97,26 = 1402,16." },
    fecha: "2026-10-14",
    entrada: { salarioBruto: 1621, dependentes: 0, pensao: 0, outrosDescontos: 97.26 },
    esperado: { inss: 121.58, irrf: 0, liquido: 1402.16 },
  },
]);
