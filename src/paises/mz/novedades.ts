import type { Novedad } from "@/motor/tipos";

const BR248 = {
  organismo: "Boletim da República (Autoridade Tributária)",
  titulo: "I Série n.º 248, Suplemento, de 29 de Dezembro de 2025 (Leis n.º 9/2025, 10/2025 e 11/2025)",
  url: "https://www.at.gov.mz/api/webdav?path=%2FLEGISLA%C3%87%C3%83O%2FLEGISLA%C3%87%C3%83O%20FISCAL%2FLEI%2FBR_248_I_SERIE_SUPLEMENTO_2025.pdf",
  tipo: "primaria",
  verificadoEl: "2026-10-26",
} as const;

export const novedades: readonly Novedad[] = [
  {
    id: "mz.irps-tabela-2026",
    fecha: "2026-10-26",
    titulo: "IRPS: tabela de retenção do salário passou para o Código",
    texto: "Desde 1 de Janeiro de 2026 a tabela de retenção do IRPS sobre os salários está no artigo 65-A do Código, com a Lei n.º 11/2025. Até 20 249,99 MT por mês não há retenção. As calculadoras de IRPS e de salário líquido já a usam.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["mz.calcular-irps", "mz.salario-liquido"],
    fuente: BR248,
  },
  {
    id: "mz.ispc-2026",
    fecha: "2026-10-26",
    titulo: "ISPC: novo limite de 4 milhões e taxas por actividade",
    texto: "A Lei n.º 9/2025 subiu o limite do ISPC para 4 000 000 MT de volume de negócios anual e trocou a taxa única por taxas de 3 % a 5 % no comércio, 12 % nos serviços e 15 % nas profissões liberais. O imposto é pago por trimestre.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["mz.calcular-ispc"],
    fuente: BR248,
  },
];
