import { definirCasos } from "@/motor/calculo";
import salarioLiquido from "./salario-liquido";

const BR = "https://www.at.gov.mz/api/webdav?path=%2FLEGISLA%C3%87%C3%83O%2FLEGISLA%C3%87%C3%83O%20FISCAL%2FLEI%2FBR_248_I_SERIE_SUPLEMENTO_2025.pdf";

export default definirCasos(salarioLiquido, [
  {
    nombre: "50 000 MT sem dependentes",
    origen: { tipo: "recalculado", url: BR, detalle: "INSS 3 % = 1 500. IRPS: intervalo de 32 750, 1 775 + 20 % × 17 250 = 5 225. Líquido = 50 000 − 1 500 − 5 225 = 43 275." },
    fecha: "2026-10-26",
    entrada: { salario: 50000, outros: 0, dependentes: "0" },
    esperado: { inss: 1500, irps: 5225, liquido: 43275 },
  },
  {
    nombre: "25 000 MT com 2 dependentes",
    origen: { tipo: "recalculado", url: BR, detalle: "INSS 750. IRPS: intervalo de 22 250, 125 + 15 % × 2 750 = 537,50. Líquido 23 712,50." },
    fecha: "2026-10-26",
    entrada: { salario: 25000, outros: 0, dependentes: "2" },
    esperado: { inss: 750, irps: 537.5, liquido: 23712.5 },
  },
  {
    nombre: "Salário abaixo de 20 250 MT: só INSS",
    origen: { tipo: "recalculado", url: BR, detalle: "18 000 + 2 000 = 20 000, no intervalo isento. INSS 600. Líquido 19 400." },
    fecha: "2026-10-26",
    entrada: { salario: 18000, outros: 2000, dependentes: "0" },
    esperado: { bruto: 20000, irps: 0, liquido: 19400 },
  },
  {
    nombre: "200 000 MT com 4 ou mais dependentes",
    origen: { tipo: "recalculado", url: BR, detalle: "INSS 6 000. IRPS: 28 225 + 32 % × 55 250 = 45 905. Líquido 148 095." },
    fecha: "2026-10-26",
    entrada: { salario: 200000, outros: 0, dependentes: "4" },
    esperado: { inss: 6000, irps: 45905, liquido: 148095 },
  },
]);
