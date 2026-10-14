import { definirCasos } from "@/motor/calculo";
import salarioLiquido from "./salario-liquido";

const DESPACHO = "https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/legislacao/Despachos_SEAF/Documents/Despacho-SEAF-2026-01-05-XXV.pdf";

export default definirCasos(salarioLiquido, [
  {
    nombre: "1 500 € sem dependentes, tabela I",
    origen: { tipo: "recalculado", url: DESPACHO, detalle: "Linha até 1 819 €: 1500 × 24,10 % − 193,33 = 168,17. Segurança Social 1500 × 11 % = 165. Líquido 1500 − 165 − 168,17 = 1166,83." },
    fecha: "2026-10-14",
    entrada: { bruto: 1500, situacao: "nao-casado", dependentes: 0 },
    esperado: { seguranca: 165, irs: 168.17, liquido: 1166.83, anual: 16335.62 },
  },
  {
    nombre: "1 000 € com um dependente, tabela II (parcela em fórmula)",
    origen: { tipo: "recalculado", url: DESPACHO, detalle: "Linha até 1 042 €: 1000 × 12,5 % − 12,5 % × 2,6 × (1273,85 − 1000) − 34,29 = 125 − 89,00 − 34,29 = 1,71. SS 110. Líquido 888,29." },
    fecha: "2026-10-14",
    entrada: { bruto: 1000, situacao: "nao-casado", dependentes: 1 },
    esperado: { irs: 1.71, seguranca: 110, liquido: 888.29 },
  },
  {
    nombre: "2 500 € casado, único titular, dois dependentes",
    origen: { tipo: "recalculado", url: DESPACHO, detalle: "Tabela III, linha até 2 773 €: 2500 × 22,77 % − 289,47 − 2 × 42,86 = 194,06. SS 275. Líquido 2030,94." },
    fecha: "2026-10-14",
    entrada: { bruto: 2500, situacao: "casado-unico", dependentes: 2 },
    esperado: { irs: 194.06, liquido: 2030.94 },
  },
  {
    nombre: "2 000 € com três dependentes (taxa menos um ponto)",
    origen: { tipo: "recalculado", url: DESPACHO, detalle: "Tabela II, linha até 2 119 €: taxa 31,10 % − 1 = 30,10 %. 2000 × 30,10 % − 320,66 − 3 × 34,29 = 602 − 320,66 − 102,87 = 178,47." },
    fecha: "2026-10-14",
    entrada: { bruto: 2000, situacao: "nao-casado", dependentes: 3 },
    esperado: { irs: 178.47 },
  },
  {
    nombre: "Salário mínimo sem retenção",
    origen: { tipo: "recalculado", url: DESPACHO, detalle: "Até 920 € a taxa é 0 %. SS 920 × 11 % = 101,20. Líquido 818,80." },
    fecha: "2026-10-14",
    entrada: { bruto: 920, situacao: "nao-casado", dependentes: 0 },
    esperado: { irs: 0, seguranca: 101.2, liquido: 818.8 },
  },
  {
    nombre: "Casado, dois titulares, 1 100 € (tabela I, 3.ª linha)",
    origen: { tipo: "recalculado", url: DESPACHO, detalle: "1100 × 15,7 % − 15,7 % × 1,35 × (1554,83 − 1100) = 172,70 − 96,40 = 76,30." },
    fecha: "2026-10-14",
    entrada: { bruto: 1100, situacao: "casado-dois", dependentes: 0 },
    esperado: { irs: 76.3 },
  },
]);
