import { definirCasos } from "@/motor/calculo";
import calculoIrrf from "./calculo-irrf";

const EXEMPLOS = "https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/exemplos-de-aplicacao-da-lei-15-270-2025";

export default definirCasos(calculoIrrf, [
  {
    nombre: "Exemplo 1 da Receita: alíquota zero",
    origen: { tipo: "oficial", url: EXEMPLOS, detalle: "R$ 3.036,00 com INSS de R$ 257,73: desconto simplificado de R$ 607,20 e base de R$ 2.428,80 (a página da Receita escreve 2.428,00), na faixa de alíquota zero." },
    fecha: "2026-01-02",
    entrada: { rendimento: 3036, inss: 257.73, dependentes: 0, pensao: 0, outrasDeducoes: 0 },
    esperado: { deducao: 607.2, base: 2428.8, impostoTabela: 0, irrf: 0 },
  },
  {
    nombre: "Exemplo 2 da Receita: R$ 4.000 zerado pela redução",
    origen: { tipo: "oficial", url: EXEMPLOS, detalle: "Base R$ 3.392,80 × 15 % − R$ 394,16 = R$ 114,76; a redução é limitada ao imposto e o IRRF fica zero." },
    fecha: "2026-01-02",
    entrada: { rendimento: 4000, inss: 373.41, dependentes: 0, pensao: 0, outrasDeducoes: 0 },
    esperado: { base: 3392.8, impostoTabela: 114.76, reducao: 114.76, irrf: 0 },
  },
  {
    nombre: "Exemplo 3 da Receita: R$ 5.000",
    origen: { tipo: "oficial", url: EXEMPLOS, detalle: "Base R$ 4.392,80 × 22,5 % − R$ 675,49 = R$ 312,89; redução de R$ 312,89 e IRRF zero." },
    fecha: "2026-01-02",
    entrada: { rendimento: 5000, inss: 509.6, dependentes: 0, pensao: 0, outrasDeducoes: 0 },
    esperado: { base: 4392.8, impostoTabela: 312.89, reducao: 312.89, irrf: 0 },
  },
  {
    nombre: "Exemplo 4 da Receita: R$ 6.000 com redução parcial",
    origen: { tipo: "oficial", url: EXEMPLOS, detalle: "Base R$ 5.350,40 × 27,5 % − R$ 908,73 = R$ 562,63; redução R$ 978,62 − 0,133145 × 6.000 = R$ 179,75; IRRF R$ 382,88." },
    fecha: "2026-01-02",
    entrada: { rendimento: 6000, inss: 649.6, dependentes: 0, pensao: 0, outrasDeducoes: 0 },
    esperado: { deducao: 649.6, base: 5350.4, impostoTabela: 562.63, reducao: 179.75, irrf: 382.88 },
  },
  {
    nombre: "Exemplo 5 da Receita: R$ 7.607,20 sem redução",
    origen: { tipo: "oficial", url: EXEMPLOS, detalle: "Sem deduções legais: desconto simplificado, base R$ 7.000 × 27,5 % − R$ 908,73 = R$ 1.016,27. Rendimento acima de R$ 7.350, sem redução." },
    fecha: "2026-01-02",
    entrada: { rendimento: 7607.2, inss: 0, dependentes: 0, pensao: 0, outrasDeducoes: 0 },
    esperado: { base: 7000, impostoTabela: 1016.27, reducao: 0, irrf: 1016.27 },
  },
  {
    nombre: "INSS calculado pela tabela e um dependente",
    origen: {
      tipo: "recalculado",
      detalle:
        "R$ 8.000: INSS 121,575 + 115,3656 + 174,1716 + (8000 − 4354,27) × 14 % = 921,51. Deduções 921,51 + 189,59 = 1111,10. Base 6888,90 × 27,5 % − 908,73 = 985,72. Sem redução.",
    },
    fecha: "2026-10-14",
    entrada: { rendimento: 8000, inss: null, dependentes: 1, pensao: 0, outrasDeducoes: 0 },
    esperado: { inss: 921.51, deducao: 1111.1, base: 6888.9, irrf: 985.72 },
  },
]);
