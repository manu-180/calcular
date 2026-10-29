import type { Novedad } from "@/motor/tipos";

const OE2026 = {
  organismo: "Boletim Oficial",
  titulo: "Lei n.º 69/X/2025, de 31 de dezembro (Orçamento do Estado para 2026), I Série n.º 133, suplemento",
  url: "https://boe.incv.cv/Bulletins/DownloadAct?id=89137",
  tipo: "primaria",
  verificadoEl: "2026-10-29",
} as const;

const OE2025 = {
  organismo: "Boletim Oficial",
  titulo: "Lei n.º 45/X/2024, de 30 de dezembro (Orçamento do Estado para 2025), I Série n.º 125, suplemento, artigo 14.º",
  url: "https://boe.incv.cv/Bulletins/Download/6150",
  tipo: "primaria",
  verificadoEl: "2026-10-29",
} as const;

const PORTARIA = {
  organismo: "Boletim Oficial",
  titulo: "Portaria Conjunta n.º 28/2024, I Série n.º 66, de 16 de julho de 2024",
  url: "https://boe.incv.cv/Bulletins/Download/5858",
  tipo: "primaria",
  verificadoEl: "2026-10-29",
} as const;

export const novedades: readonly Novedad[] = [
  {
    id: "cv.iva-eletricidade-agua-2026",
    fecha: "2025-12-31",
    titulo: "IVA de 8 % na eletricidade e na água em 2026",
    texto: "O Orçamento do Estado para 2026 fixa em 8 % a taxa do IVA na eletricidade e na água fornecidas a consumidores finais. A calculadora de IVA tem agora esta taxa ao lado da taxa normal de 15 %.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["cv.calcular-iva"],
    fuente: { ...OE2026, titulo: OE2026.titulo + ", artigo 84.º" },
  },
  {
    id: "cv.salario-minimo-25000-2027",
    fecha: "2025-12-31",
    titulo: "Salário mínimo de 25 000 escudos previsto para 2027",
    texto: "O Orçamento do Estado para 2026 diz que o Governo promove as medidas para o salário mínimo nacional chegar a 25 000 escudos a partir de 2027. Até haver diploma, a calculadora usa o valor em vigor.",
    calculadoras: ["cv.salario-minimo"],
    fuente: { ...OE2026, titulo: OE2026.titulo + ", artigo 9.º" },
  },
  {
    id: "cv.salario-minimo-17000-2025",
    fecha: "2024-12-30",
    titulo: "Salário mínimo sobe para 17 000 escudos",
    texto: "A lei do Orçamento do Estado para 2025 alterou o artigo 4.º do Decreto-Lei n.º 6/2014 e fixou a retribuição mínima mensal garantida em 17 000 escudos.",
    vigenteDesde: "2025-01-01",
    calculadoras: ["cv.salario-minimo"],
    fuente: OE2025,
  },
  {
    id: "cv.inps-portaria-28-2024",
    fecha: "2024-07-16",
    titulo: "Taxa global do INPS de 24,5 %: 8,5 % do trabalhador e 16 % da empresa",
    texto: "A Portaria Conjunta n.º 28/2024 revogou a Portaria Conjunta n.º 27/2017 e fixou a taxa global de contribuições dos trabalhadores por conta de outrem em 24,5 %. As calculadoras de salário líquido, INPS e custo do trabalhador usam estas taxas.",
    vigenteDesde: "2024-07-17",
    calculadoras: ["cv.contribuicoes-inps", "cv.salario-liquido", "cv.custo-do-trabalhador"],
    fuente: PORTARIA,
  },
];
