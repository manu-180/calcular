import type { Novedad } from "@/motor/tipos";

const OGE = {
  organismo: "Diário da República",
  titulo: "Lei n.º 14/25, de 30 de dezembro (Orçamento Geral do Estado para 2026), I Série n.º 244",
  url: "https://tcontas.ao/wp-content/uploads/2026/09/Lei-14-25-de-30-de-Dezembro-OGE-2026.pdf",
  tipo: "primaria",
  verificadoEl: "2026-10-24",
} as const;

export const novedades: readonly Novedad[] = [
  {
    id: "ao.irt-isencao-150000-2026",
    fecha: "2026-10-24",
    titulo: "IRT: isenção até 150 000 Kz em 2026",
    texto: "Desde 1 de janeiro de 2026 os rendimentos do trabalho até 150 000 Kz por mês estão isentos de IRT, com a nova tabela do Grupo A. As calculadoras de IRT e de salário líquido já a usam.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ao.calcular-irt", "ao.salario-liquido"],
    fuente: OGE,
  },
  {
    id: "ao.ceoc-2026",
    fecha: "2026-10-24",
    titulo: "Nova contribuição sobre transferências para o exterior",
    texto: "O Orçamento de 2026 criou a Contribuição Especial sobre Operações Cambiais: 2,5 % para pessoas singulares e 10 % para pessoas colectivas, cobrada pelo banco na transferência.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ao.contribuicao-cambial"],
    fuente: OGE,
  },
  {
    id: "ao.habitacao-isencao-2026",
    fecha: "2026-10-24",
    titulo: "Compra de habitação até 40 milhões sem Imposto Predial",
    texto: "Em 2026 a compra de imóveis para habitação até 40 000 000 Kz está isenta de Imposto Predial. Entre 40 e 100 milhões a taxa fica reduzida a metade.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ao.calcular-sisa"],
    fuente: OGE,
  },
];
