import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "br.isencao-ir-5-mil",
    fecha: "2025-11-27",
    titulo: "Imposto de renda zera para quem ganha até R$ 5 mil por mês",
    texto:
      "A Lei nº 15.270/2025 criou uma redução do imposto de renda a partir de janeiro de 2026. Com rendimento tributável de até R$ 5.000 por mês, o IRRF zera; entre R$ 5.000,01 e R$ 7.350, o desconto diminui aos poucos. As calculadoras de salário líquido, IRRF, 13º e férias já aplicam a regra.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["br.salario-liquido", "br.calculo-irrf", "br.decimo-terceiro", "br.calculo-de-ferias", "br.imposto-de-renda-anual"],
    fuente: {
      organismo: "Presidência da República",
      titulo: "Lei nº 15.270, de 26 de novembro de 2025",
      url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15270.htm",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "br.salario-minimo-2026",
    fecha: "2025-12-24",
    titulo: "Salário mínimo de 2026 é R$ 1.621",
    texto: "O Decreto nº 12.797/2025 fixou o salário mínimo em R$ 1.621 a partir de 1º de janeiro de 2026 (R$ 54,04 por dia e R$ 7,37 por hora).",
    vigenteDesde: "2026-01-01",
    calculadoras: ["br.salario-minimo", "br.insalubridade", "br.das-mei", "br.inss-autonomo", "br.seguro-desemprego"],
    fuente: {
      organismo: "Presidência da República",
      titulo: "Decreto nº 12.797, de 23 de dezembro de 2025",
      url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/D12797.htm",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "br.tabela-inss-2026",
    fecha: "2026-01-13",
    titulo: "Nova tabela do INSS com teto de R$ 8.475,55",
    texto: "A partir da competência janeiro de 2026, as faixas da contribuição de empregados vão até R$ 1.621, R$ 2.902,84, R$ 4.354,27 e R$ 8.475,55, com alíquotas de 7,5 % a 14 %.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["br.calculo-inss", "br.salario-liquido", "br.decimo-terceiro", "br.calculo-de-ferias"],
    fuente: {
      organismo: "INSS",
      titulo: "Tabela de contribuição mensal (Portaria Interministerial MPS/MF nº 13/2026)",
      url: "https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "br.seguro-desemprego-2026",
    fecha: "2026-01-11",
    titulo: "Seguro-desemprego tem novas faixas e teto de R$ 2.518,65",
    texto: "Para benefícios a partir de 11 de janeiro de 2026, a primeira faixa vai até R$ 2.222,17 de salário médio e quem ganhava mais de R$ 3.703,99 recebe o teto de R$ 2.518,65 por parcela.",
    vigenteDesde: "2026-01-11",
    calculadoras: ["br.seguro-desemprego"],
    fuente: {
      organismo: "Ministério do Trabalho e Emprego",
      titulo: "MTE reajusta valores do benefício Seguro-Desemprego",
      url: "https://portalfat.trabalho.gov.br/mte-reajusta-valores-do-beneficio-seguro-desemprego/",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
];
