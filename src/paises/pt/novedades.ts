import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "pt.rmmg-2026",
    fecha: "2026-10-14",
    titulo: "O salário mínimo nacional sobe para 920 € em 2026",
    texto: "Desde 1 de janeiro de 2026 a retribuição mínima mensal garantida é de 920 €. As calculadoras de salário mínimo e de compensação já usam este valor.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["pt.salario-minimo", "pt.compensacao-por-despedimento"],
    fuente: {
      organismo: "DGERT",
      titulo: "Retribuição mínima mensal garantida para 2026 (Decreto-Lei n.º 139/2025)",
      url: "https://www.dgert.gov.pt/retribuicao-minima-mensal-garantida-para-2026",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "pt.ias-2026",
    fecha: "2026-10-14",
    titulo: "O IAS passa a 537,13 € em 2026",
    texto: "A Portaria n.º 480-A/2025/1 atualiza o indexante dos apoios sociais para 537,13 € a partir de 1 de janeiro de 2026. Muda o limite do subsídio de desemprego e a dedução específica do IRS.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["pt.valor-ias", "pt.subsidio-de-desemprego", "pt.simulador-irs"],
    fuente: {
      organismo: "Diário da República",
      titulo: "Portaria n.º 480-A/2025/1, de 30 de dezembro",
      url: "https://www.madeira.gov.pt//Portals/35/Users/116/72/372/10.%20Portaria%20n.%20480-A_2025_1%2C%20de%2030%20de%20dezembro.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "pt.irs-escaloes-2026",
    fecha: "2026-10-14",
    titulo: "Novos escalões do IRS e mínimo de existência de 12 880 €",
    texto: "O Orçamento do Estado para 2026 (Lei n.º 73-A/2025) atualiza os limites dos escalões do IRS e sobe o mínimo de existência para 12 880 €. O simulador de IRS já faz as contas com estes valores.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["pt.simulador-irs"],
    fuente: {
      organismo: "Autoridade Tributária e Aduaneira",
      titulo: "Código do IRS, artigo 68.º",
      url: "https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/codigos_tributarios/cirs_rep/Pages/irs68.aspx",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "pt.retencao-2026",
    fecha: "2026-10-14",
    titulo: "Tabelas de retenção na fonte de 2026 para o continente",
    texto: "As tabelas de retenção do IRS de 2026 deixam sem retenção os salários até 920 € (991 € para casado, único titular). O cálculo do salário líquido e da retenção na fonte usa estas tabelas.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["pt.salario-liquido", "pt.retencao-na-fonte"],
    fuente: {
      organismo: "Autoridade Tributária e Aduaneira",
      titulo: "Despacho da Secretária de Estado dos Assuntos Fiscais de 5 de janeiro de 2026",
      url: "https://info.portaldasfinancas.gov.pt/pt/informacao_fiscal/legislacao/Despachos_SEAF/Documents/Despacho-SEAF-2026-01-05-XXV.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
];
